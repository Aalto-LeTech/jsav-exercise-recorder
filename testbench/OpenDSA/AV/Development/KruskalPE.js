/*global graphUtils */
(function() {
  "use strict";
  var exercise,
      graph,
      edgeList,
      config = ODSA.UTILS.loadConfig(),
      interpret = config.interpreter,
      settings = config.getSettings(),
      jsav = new JSAV($(".avcontainer"), {settings: settings});

  /**
   * Simple implementation of the Union-Find data structure with path compression.
   * Used for model solution Kruskal's algorithm and for checking the goodness of
   * the randomly generated graph.
  */
  class UnionFind {
    constructor() {
      // Stores the parent of each node. If the node is a root, the parent is the node itself.
      this.parent = {};
    }
    /**
     * Makes a new set with one element.
     * @param {*} x - the element to make a set of
     */
    makeSet(x) {
      this.parent[x] = x;
    }

    /**
     * Finds the representative of the set that x belongs to.
     * Does path compression.
     * @param {*} x - the element to find the set of
     * @returns {*} - the representative of the set that x belongs to
     */
    find(x) {
      // Find the root (representative) of x.
      let root = x;
      while (this.parent[root] !== root) {
        root = this.parent[root];
      }

      // Do path compression by traversing the path from x to the root
      // and updating the parent of each node to be the root.
      let current = x;
      while (current !== root) {
        const nextNode = this.parent[current];
        // Update the parent of the current node to to be the root.
        this.parent[current] = root;
        // Move to the next node in the path.
        current = nextNode;
      }

      // Return the representative of the set.
      return root;
    }

    /**
     * Unions the sets that contain x and y.
     * @param {*} x - element in the first set
     * @param {*} y - element in the second set
     */
    union(x, y) {
      const xRoot = this.find(x);
      const yRoot = this.find(y);
      this.parent[xRoot] = yRoot;
    }
  }

  /*
   * Old exercise initialiser. Creates a random graph which has messy output
   * at 50% probability.
   */
  function init_old() {
    // create the graph
    if (graph) {
      graph.clear();
    }
    graph = jsav.ds.graph({
      width: 400,
      height: 400,
      layout: "automatic",
      directed: false
    });
    graphUtils.generate(graph, {
      weighted: true,
      nodes: 6,
      edges: 12
    }); // Randomly generate the graph with weights
    graph.layout();

    jsav.displayInit();
    return graph;
  }

  /*
   * New exercise initializer. Creates a random graph with nodes and edges
   * placed in a fixed grid, two connected components.
   */
  function init() {
    // Clear old elements if reset is clicked.
    graph?.clear();
    edgeList?.clear();

    // Settings for input.
    // It is safest to generate one connected component that has more edges
    // than vertices. This is always a valid input.
    const width = 500, height = 400,  // pixels
        weighted = true,
        directed = false,
        nVertices = [11],
        nEdges = [14];
    // nVertices = [11, 4],
    // nEdges = [15, 3];

    // First create a random planar graph instance in neighbour list format
    let nlGraph,
        bestNlGraph,
        bestResult = {score: 0},
        trials = 0;

    nlGraph = graphUtils.generatePlanarNl(nVertices, nEdges, weighted,
                                          directed, width, height);

    // Create a JSAV graph instance
    graph = jsav.ds.graph({
      width: width,
      height: height,
      layout: "manual",
      directed: directed
    });
    graphUtils.nlToJsav(nlGraph, graph);
    graph.layout();

    const edgeMatrixValues = createEdgeMatrix(graph.edges());
    edgeList = jsav.ds.matrix(edgeMatrixValues, {
      style: "table",
      autoresize: false,
      left: 30,
      top: 80
    });

    jsav.displayInit();
    return graph;
  }

  function fixState(modelGraph) {
    var graphEdges = graph.edges(),
        modelEdges = modelGraph.edges();

    // compare the edges between exercise and model
    for (var i = 0; i < graphEdges.length; i++) {
      var edge = graphEdges[i],
          modelEdge = modelEdges[i];
      if (modelEdge.hasClass("spanning") && !edge.hasClass("spanning")) {
        // mark the edge that is marked in the model, but not in the exercise
        markEdge(edge);
        break;
      }
    }
  }

  /*
   * Creates step-by-step visualisation of the model solution.
   */
  function model(modeljsav) {
    // create the model
    var modelGraph = modeljsav.ds.graph({
      width: 500,
      height: 400,
      layout: "automatic",
      directed: false
    });

    // copy the graph and its weights
    graphUtils.copy(graph, modelGraph, {weights: true});
    var modelNodes = modelGraph.nodes();

    var modelEdges = modelGraph.edges();

    const edgeMatrixValues = createEdgeMatrix(modelEdges);

    const edgeMatrix = modeljsav.ds.matrix(edgeMatrixValues, {
      style: "table",
      autoresize: false,
      top: 0,
      left: 10
    });

    modeljsav.displayInit();

    // start the algorithm
    kruskal(modelNodes, modelEdges, edgeMatrix, modeljsav);

    modeljsav.umsg(interpret("av_ms_mst"));
    // hide all edges that are not part of the spanning tree
    for (let i = 0; i < modelGraph.edges().length; i++) {
      if (!modelEdges[i].hasClass("spanning")) {
        modelEdges[i].hide();
      }
    }
    modeljsav.step();

    return modelGraph;
  }

  /*
   * Kruskal's algorithm implementation for the correct (model) solution.
  */
  function kruskal(modelNodes, modelEdges, edgeMatrix, modeljsav) {
    // Add all the nodes to the Union-Find data structure.
    const sets = new UnionFind();
    modelNodes.forEach(function(node) {
      sets.makeSet(node.value());
    });

    // Helper functions that use the Union-Find data structure.

    // Checks if adding the edge would create a cycle in the spanning tree
    function createsCycle(edge) {
      const start = edge.start().value();
      const end = edge.end().value();
      // Check if the start and end nodes are in the same connected component.
      return sets.find(start) === sets.find(end);
    }

    // Connect two sets of vertices with an edge (the UNION operation).
    function addEdge(edge) {
      const start = edge.start().value();
      const end = edge.end().value();
      // Union the two sets
      sets.union(start, end);
    }

    // Helper that finds the index of the edge in the edge matrix for marking purposes.
    function edgeIndex(edge) {
      var eName = "(" + edgeName(edge, ", ") + ")";
      // Edge matrix has one extra row for the header
      const edgeMatrixLen = modelEdges.length + 1;

      for (let i = 1; i < edgeMatrixLen; i++) {
        if (edgeMatrix.value(i, 0) === eName) { return i; }
      }
      return -1;
    }

    // Main algorithm

    // sort edges according to weight and alphabetical order
    modelEdges.sort(compareEdges);

    modelEdges.forEach(function(currentEdge) {
      modeljsav.umsg(interpret("av_ms_processing"), {fill: {edge: edgeName(currentEdge, ", ")}});
      const matrixIndex = edgeIndex(currentEdge);

      if (!createsCycle(currentEdge)) {
        // Add to MST
        modeljsav.umsg(interpret("av_ms_adding"), {preserve: true});
        addEdge(currentEdge);
        edgeMatrix.addClass(matrixIndex, 0, "spanning");
        edgeMatrix.addClass(matrixIndex, 1, "spanning");
        markEdge(currentEdge, modeljsav);
      } else {
        // Discard the edge
        modeljsav.umsg(interpret("av_ms_dismiss"), {preserve: true});
        currentEdge.addClass("discarded");
        edgeMatrix.addClass(matrixIndex, 0, "discarded");
        edgeMatrix.addClass(matrixIndex, 1, "discarded");
        modeljsav.step();
      }
    });
  }

  /**
 * Creates a 2D array of string representations of the edges and their weights.
 * The edges are sorted alphabetically and the first row is a header row.
 * If one sorts the edges of the matrix by weight (stable sort that preservers
 * alphabetic order of equal weights), the order of the edges will be the same
 * as processing order in the model solution.
 * @param {Array} edges - Array of JSAV edges of the graph
 * @returns {Array} - 2D array of string representation of the edges and their weights
 */
  function createEdgeMatrix(edges) {
    // Sort the edges alphabetically.
    const edgesAlphabetical = edges.toSorted(function(a, b) {
      const nameA = edgeName(a);
      const nameB = edgeName(b);
      return nameA < nameB ? -1 : 1;
    });
    // Header row for the edge list
    // "Weight" would probably be better than "w" but I do not
    // know how to make the table column wide enough for it.
    const edgeMatrix = [["Edge", "w"]];
    edgesAlphabetical.forEach(function(edge) {
      const eName = "(" + edgeName(edge, ", ") + ")";
      edgeMatrix.push([eName, edge.weight()]);
    });

    return edgeMatrix;
  }

  function markEdge(edge, av) {
    edge.addClass("spanning");
    edge.start().addClass("spanning");
    edge.end().addClass("spanning");
    if (av) {
      av.gradeableStep();
    } else {
      exercise.gradeableStep();
    }
  }

  function getValue(node) { return node.value(); }

  function edgeName(edge, separator) {
    var s = separator || "";
    return [edge.start(), edge.end()].map(getValue).sort().join(s);
  }

  /*
   * Comparator function for two weighted edges in a JSAV graph.
   */
  function compareEdges(a, b) {
    const weightDiff = a.weight() - b.weight();
    if (weightDiff !== 0) {
      return weightDiff;
    }
    // Weights are equal, sort alphabetically.
    const nameA = edgeName(a);
    const nameB = edgeName(b);
    return nameA < nameB ? -1 : 1;
  }

  // Process About button: Pop up a message with an Alert
  function about() {
    window.alert(ODSA.AV.aboutstring(interpret(".avTitle"), interpret("av_Authors")));
  }

  exercise = jsav.exercise(model, init, {
    compare: {class: "spanning"},
    controls: $(".jsavexercisecontrols"),
    resetButtonTitle: interpret("reset"),
    fix: fixState
  });
  exercise.reset();

  $(".jsavcontainer").on("click", ".jsavedge", function() {
    var edge = $(this).data("edge");
    if (!edge.hasClass("spanning")) {
      markEdge(edge);
    }
  });

  $(".jsavcontainer").on("click", ".jsavgraphnode", function() {
    alert("Please click on graph edges from the array to the left NOT graph nodes");
  });

  $("#about").click(about);
})();
