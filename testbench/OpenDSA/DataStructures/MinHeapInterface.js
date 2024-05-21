class MinHeapInterface {
  constructor(jsav, jsavProps) {
    this._heap = jsav.ds.binarytree(jsavProps);
    this._heapSize = jsav.variable(0);
    this._heap.layout();
  }

  get rootNode() {
    console.log("get root", this._heap.root());
    return this._heap.root();
  }
  set rootNode(newRootNode) {
    console.log("set new root:", newRootNode);
    this._heap.root(newRootNode);
    this._heap.layout();
  }
  get heapSize() {
    console.log("get heap size:", this._heapSize.value());
    return this._heapSize.value();
  }
  get heap() {
    return this._heap;
  }

  _incrementHeapSize() {
    console.log("increment heap size to:", this._heapSize.value() + 1);
    this._heapSize.value(this._heapSize.value() + 1);
  }

  _decrementHeapSize() {
    console.log("decrement heap size to: ", this._heapSize.value() - 1);
    this._heapSize.value(this._heapSize.value() - 1);
  }

  _swapNodeValues(node1, node2) {
    const val1 = node1.value();
    const val2 = node2.value();
    node1.value(val2); // Calling value with argument will replace old value.
    node2.value(val1);
    // No layout update here!
  }
  
  clearHeap() {
    console.log("clear heap");
    this._heap.clear();
    this._heapSize.value(0);
    this._heap.layout();
  }

  extractDist(node) {
    const integerMatches = node.value().match(/\d+/);
    const firstMatch = integerMatches[0];
    return Number(firstMatch);
  }

  extractDest(node) {
    const charMatches = node.value().match(/[A-Z]/);
    const destination = charMatches[0];
    return destination;
  }
  /**
   * Restores min-heap property after node insert. Calls itself recursively.
   * @param {Object} currentNode 
   * @param {number} currentIdx 
   * @param {number} distance
   * @param {string} dstLabel
  */
  upheap(currentNode, distance, dstLabel) { 
    const currentParent = currentNode.parent();
    if (!currentParent) {
      return; // reached root
    }
    const parentDist = this.extractDist(currentParent);
    const parentDest = this.extractDest(currentParent);
    // Swap also if nodes have equal distances but new node's destination comes first in alphabets.
    if (parentDist > distance || (parentDist === distance && dstLabel < parentDest)) {
      this._swapNodeValues(currentNode, currentParent);
      // Upheap again so that parent is the currentNode.
      this.upheap(currentParent, distance, dstLabel);
    }
  }
  // Also called Min-Heapify.
  downheap(subtreeRootNode) {
    const left = subtreeRootNode.left();
    const right = subtreeRootNode.right();
    let smallest = subtreeRootNode;

    if (left && this.extractDist(left) < this.extractDist(smallest)) { // left is smaller
      smallest = left;
    }
    if (left && this.extractDist(left) === this.extractDist(smallest) &&
      this.extractDest(left) < this.extractDest(smallest)) { // equal but left first in alphabets
      smallest = left;
    }
    if (right && this.extractDist(right) < this.extractDist(smallest)) {
      smallest = right;
    }
    if (right && this.extractDist(right) === this.extractDist(smallest) &&
      this.extractDest(right) < this.extractDest(smallest)) {
      smallest = right;
    }
    if (smallest != subtreeRootNode) {
      this._swapNodeValues(smallest, subtreeRootNode);
      // Make recursive call.
      this.downheap(smallest);
    }
  }

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
    console.log(parentNode);
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

    console.log("Found this parent in method findParent", parentNode);

    return parentNode;
  }

  insert(srcLabel, dstLabel, distance) {
    const newNodeIdx = this.heapSize;
    this._incrementHeapSize();

    const nodeLabel = `${distance}<br>${dstLabel} (${srcLabel})`;
    const newNode = this._heap.newNode(nodeLabel);

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
  
    this._heap.layout();
  }

  removeMin() {
    const heapSize = this.heapSize;
    console.log(heapSize);
    if (heapSize === 0) {
      return;
    } 
    const lastNodeIdx = heapSize - 1;
    this._decrementHeapSize();

    const lastNodeParent = this.findParent(lastNodeIdx);
    const rootVal = this.rootNode.value();

    if (lastNodeParent) { // is the last node root or not?
      const lastNode = (lastNodeIdx % 2 === 1)
        ? lastNodeParent.left() : lastNodeParent.right();

      console.log("last node:", lastNode);

      this._swapNodeValues(this.rootNode, lastNode);
      lastNode.remove();
      this.downheap(this.heap.root());
    } else {
      this.rootNode.remove();
    }
    this._heap.layout();
    return rootVal;
  }

    /**
   * Preorder traversal to get node list of the tree
   * Since there is no function for this in the JSAV library
   * @param node the root node to start the traversal at
   * @param arr array to store the nodes in. Optional parameter
   * an empty array is initialized if none is supplied.
   * @returns an array containing the nodes of the tree.
   */
  getPartialTreeNodeList(node, arr) {
    let nodeArr = arr || [];

    if (node) {
      nodeArr.push(node);
      nodeArr = this.getPartialTreeNodeList(node.left(), nodeArr);
      nodeArr = this.getPartialTreeNodeList(node.right(), nodeArr);
    }
    return nodeArr;
  }
  /**
   * 
   * @returns {Array}
   */
  getWholeTreeNodeList() {
    return this.getPartialTreeNodeList(this.rootNode);
  }
  /**
   * 
   * @param {string} oldLabel 
   * @param {string} newLabel 
   * @returns 
   */
  updateNodeWithLabel(oldLabel, newLabel) {
    const allNodesArr = this.getWholeTreeNodeList();
    // Grab first node with the correct destination.
    const nodeToUpdate = allNodesArr.find(node => node.value() === oldLabel);

    if (!nodeToUpdate) {
      return false;
    }
    nodeToUpdate.value(newLabel);
    return true;
  }

  findNodeWithCharAtRelativeIndex(char, relativeIdx) {
    const allNodesArr = this.getWholeTreeNodeList();
    const node = allNodesArr.find(node => 
      node.value().charAt(node.value().length - relativeIdx) === char);
    return node;
  }

}

