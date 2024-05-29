/**
 * Represents a min-heap. 
 * Encapsulates jsav binary tree and jsav variable that holds the current heap size.
 * Provides methods to insert, remove, and update nodes in the min-heap and 
 * takes care of restoring the min-heap property after each operation.
 * Also updates the visualization of the binary tree after each operation.
 * @class
 */
class MinHeapInterface {
  /**
   * @constructor
   * @param {JSAV object} jsav - The jsav instance that this min-heap will belong to.
   * @param {Object} jsavProps - The parameters that are passed to jsav binary tree when creating it.
  */
  constructor(jsav, jsavProps) {
    this._btree = jsav.ds.binarytree(jsavProps);
    this._heapSizeJsav = jsav.variable(0); // is JSAV object!
    this._btree.layout();
  }

  /**
   * @returns {JSAV binarytree} The jsav binary tree object.
  */
  get btree() {
    return this._btree;
  }
  /**
   * @returns {JSAV binary tree node} The current root node of the binary tree.
  */
  get rootNode() {
    return this._btree.root();
  }
  /**
   * @param {JSAV binary tree node} newRootNode - The new root node of the binary tree.
   */
  set rootNode(newRootNode) {
    this._btree.root(newRootNode);
  }
  /**
   * @returns {number} The current heap size.
   */
  get heapSize() {
    return this._heapSizeJsav.value();
  }
  /**
   * Increments the heap size by 1.
   */
  _incrementHeapSize() {
    this._heapSizeJsav.value(this._heapSizeJsav.value() + 1);
  }
  /**
   * Decrements the heap size by 1.
   */
  _decrementHeapSize() {
    this._heapSizeJsav.value(this._heapSizeJsav.value() - 1);
  }
  /**
   * Swaps the values of two binary tree nodes.
   * @param {JSAV binary tree node} node1 
   * @param {JSAV binary tree node} node2 
   */
  _swapNodeValues(node1, node2) {
    const val1 = node1.value();
    const val2 = node2.value();
    node1.value(val2); // Calling value with argument will replace old value.
    node2.value(val1);
  }
  /**
   * Clears the binary tree and sets the heap size to 0. 
   * Should only be called when the current min-heap is no longer needed.
   */
  clearHeap() {
    this._btree.clear();
    this._heapSizeJsav.value(0);
    this._btree.layout();
  }

  /**
   * Helper function to extract the distance from a binary tree node that has label 
   * of format: "x<br>D (S)", where x is the distance, D is the destination node label 
   * and S is the source node label
   * @param {JSAV binary tree node} node - node whose distance is being extracted
   * @returns {Number} the distance
  */
  extractDistFromNode(node) {
    return this.extractDistFromLabel(node.value());
  }
  /**
   * Helper function to extract the distance from a string of format: "x<br>D (S)", 
   * where x is the distance, D is the destination node label and S is the source node label
   * @param {String} nodeLabel 
   * @returns {Number}
   */
  extractDistFromLabel(nodeLabel) {
    const integerMatches = nodeLabel.match(/\d+/);
    const firstMatch = integerMatches[0];
    return Number(firstMatch);
  }
  /**
   * Helper function to extract the destination from a binary tree node that has label 
   * of format: "x<br>D (S)", where x is the distance, D is the destination node label 
   * and S is the source node label
   * @param {JSAV binary tree node} node - node whose destination is being extracted
   * @returns {String} the destination, a single character
  */
  extractDest(node) {
    const charMatches = node.value().match(/[A-Z]/);
    const destination = charMatches[0];
    return destination;
  }
  /**
   * Restores min-heap property after node insert or update. Calls itself recursively.
   * @param {JSAV binary tree node} currentNode - The node that is being compared to its parent.
   * @param {Number} distance - The distance of the current node, 
   *  which corresponds to the inserted/updated distance before applying upheap.
   * @param {String} destination - The destination of the current node (single character describing graph node),
   *  which corresponds to the inserted/updated destination before applying upheap.
  */
  upheap(currentNode, distance, destination) { 
    const currentParent = currentNode.parent();
    if (!currentParent) {
      return; // reached root
    }
    const parentDist = this.extractDistFromNode(currentParent);
    const parentDest = this.extractDest(currentParent);
    // Swap also if nodes have equal distances but new node's destination comes first in alphabets.
    if (parentDist > distance || (parentDist === distance && destination < parentDest)) {
      this._swapNodeValues(currentNode, currentParent);
      // Upheap again so that parent is the currentNode.
      this.upheap(currentParent, distance, destination);
    }
  }
  /**
   * Restores min-heap property after node removal or update. Calls itself recursively.
   * @param {JSAV binary tree node} subtreeRootNode - The node that is being compared to its children.
   */
  downheap(subtreeRootNode) {
    if (!subtreeRootNode) {
      return;
    }
    const left = subtreeRootNode.left();
    const right = subtreeRootNode.right();
    let smallest = subtreeRootNode;

    if (left && this.extractDistFromNode(left) < this.extractDistFromNode(smallest)) { // left is smaller
      smallest = left;
    }
    if (left && this.extractDistFromNode(left) === this.extractDistFromNode(smallest) &&
      this.extractDest(left) < this.extractDest(smallest)) { // equal but left first in alphabets
      smallest = left;
    }
    if (right && this.extractDistFromNode(right) < this.extractDistFromNode(smallest)) {
      smallest = right;
    }
    if (right && this.extractDistFromNode(right) === this.extractDistFromNode(smallest) &&
      this.extractDest(right) < this.extractDest(smallest)) {
      smallest = right;
    }
    if (smallest != subtreeRootNode) {
      this._swapNodeValues(smallest, subtreeRootNode);
      // Make recursive call.
      this.downheap(smallest);
    }
  }
  /**
   * Finds the parent node of the node at the given index.
   * Traverses the binary tree up and down to find the parent node as 
   * JSAV does not allow accessing nodes by index.
   * (If nodes could be accessed by index, result would be node at index (nodeIdx - 1) / 2.)
   * @param {Number} nodeIdx - index of the node whose parent will be found 
   * @returns {JSAV binary tree node} the parent node of the node at the given index or null if nodeIdx is 0 (root)
   */
  findParent(nodeIdx) {
    if (nodeIdx === 0) {
      return null;
    }
    // Will be filled with indices of parameter node's ancestors excluding root node.
    const ancestorChain = []; 
    let i = nodeIdx;
    while (i > 0) {
      i = Math.floor((i - 1) / 2);
      ancestorChain.unshift(i);
    }

    let parentNode = this.rootNode;
    for (let j = 1; j < ancestorChain.length; j++) {
      const parentIdx = ancestorChain[j - 1];
      const childIdx = ancestorChain[j];
      // Make child the new parent for next iteration.
      if (parentIdx * 2 + 1 === childIdx) {
        parentNode = parentNode.left();
      } else {
        parentNode = parentNode.right();
      }
    }
    return parentNode;
  }
  getLastNode() {
    const lastNodeIdx = this.heapSize - 1;
    if (lastNodeIdx < 0) {
      return null;
    }
    if (lastNodeIdx === 0) {
      return this.rootNode;
    }
    const lastNodeParent = this.findParent(lastNodeIdx);
    return (lastNodeIdx % 2 === 1)
      ? lastNodeParent.left() : lastNodeParent.right();
  }


  /**
   * Insert the new node into the min-heap and restore the min-heap property.
   * Parameters are used to create the label of the new node.
   * @param srcLabel label of the source node
   * @param dstLabel label of the destination node
   * @param distance distance to be inserted.
   */
  insert(srcLabel, dstLabel, distance) {
    const newNodeIdx = this.heapSize;
    this._incrementHeapSize();

    const nodeLabel = `${distance}<br>${dstLabel} (${srcLabel})`;
    const newNode = this._btree.newNode(nodeLabel);

    if (newNodeIdx === 0) {
      this.rootNode = newNode;
    } else {
      const parent = this.findParent(newNodeIdx);
      if (newNodeIdx % 2 === 1) {
        parent.left(newNode);
        newNode.parent(parent);
      } else {
        parent.right(newNode);
        newNode.parent(parent);
      }
    }
    // Restore min-heap property.
    this.upheap(newNode, distance, dstLabel);
  
    this._btree.layout();
  }
  /**
   * Remove the minimum node from the min-heap and restore the min-heap property.
   * @returns the label of the minimum node that was removed or null if the heap is empty.
   */
  removeMin() {
    if (this.heapSize === 0) { // empty heap
      return null;
    }
    const minNode = this.rootNode; // to be removed
    const minLabel = minNode.value(); // to be returned

    const lastNode = this.getLastNode();

    this._swapNodeValues(minNode, lastNode);

    lastNode.remove();
    this._decrementHeapSize();

    // Restore min-heap property.
    if (this.heapSize > 1) {
      this.downheap(this.rootNode); // last node is now root
    }

    this._btree.layout();

    return minLabel;
  }

  /**
   * Preorder traversal the JSAV binary tree to get an array of JSAV binary tree nodes.
   * There is no function for this in the JSAV library.
   * @returns an array containing the nodes of the JSAV binary tree
   */
  getTreeNodeArr() {

    // Inner recursive function to get all children of a node.
    const getChildren = (node) => {
      if (!node) {
        return []; // No more children.
      }
      const leftChildren = getChildren(node.left());
      const rightChildren = getChildren(node.right());
      const nodeAndChildren = [node, ...leftChildren, ...rightChildren];

      return nodeAndChildren;
    };
    // Start with the root node.
    const treeNodes = getChildren(this.rootNode, []);
    console.log("Built list of treenodes:", treeNodes);
    return treeNodes;
  }

  /**
   * Updates the label of a node with the given old label to the new label.
   * @param {String} oldLabel 
   * @param {String} newLabel 
   * @returns true if the node was found and updated, false otherwise.
   */
  updateNodeWithLabel(oldLabel, newLabel) {
    const allNodesArr = this.getTreeNodeArr();
    // Grab first node with the correct destination.
    const nodeToUpdate = allNodesArr.find(node => node.value() === oldLabel);

    if (!nodeToUpdate) {
      return false;
    }
    nodeToUpdate.value(newLabel);
    return true;
  }

  /**
   * Updates the label of a node with the given destination label and restores the min-heap property.
   * @param {String} dest - the destination label of the node that will be updated 
   * @param {String} newLabel - the new label for the node
   * @returns the old label of the node that was updated.
   */
  updateNodeWithDest(dest, newLabel) {
    const nodeToUpdate = this.getNodeByDest(dest);
    if (!nodeToUpdate) {
      return;
    }
    const oldDist = this.extractDistFromNode(nodeToUpdate);
    const oldLabel = nodeToUpdate.value();
    const newDist = this.extractDistFromLabel(newLabel);
    
    nodeToUpdate.value(newLabel);

    if (newDist > oldDist) {
      this.downheap(nodeToUpdate);
    } else {
      this.upheap(nodeToUpdate, newDist, this.extractDest(nodeToUpdate));
    }
    this.btree.layout();
    return oldLabel;
  }

  /**
   * 
   * @param {String} dest - the destination label of the node that will be returned
   * @returns {JSAV binary tree node} the node with the given destination label
   */
  getNodeByDest(dest) {
    const allNodesArr = this.getTreeNodeArr();
    // Grab first node with the correct destination.
    const node = allNodesArr.find(node => 
      node.value().charAt(node.value().length - 5) === dest);
    
    return node;
  }
}

