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
    this._heapSize = jsav.variable(0);
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
    console.log("get root", this._btree.root());
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
    return this._heapSize.value();
  }
  /**
   * Increments the heap size by 1.
   */
  _incrementHeapSize() {
    this._heapSize.value(this._heapSize.value() + 1);
  }
  /**
   * Decrements the heap size by 1.
   */
  _decrementHeapSize() {
    this._heapSize.value(this._heapSize.value() - 1);
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
   */
  clearHeap() {
    this._btree.clear();
    this._heapSize.value(0);
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
   * @param {String} dstLabel - The destination label of the current node,
   *  which corresponds to the inserted/updated destination before applying upheap.
  */
  upheap(currentNode, distance, dstLabel) { 
    const currentParent = currentNode.parent();
    if (!currentParent) {
      return; // reached root
    }
    const parentDist = this.extractDistFromNode(currentParent);
    const parentDest = this.extractDest(currentParent);
    // Swap also if nodes have equal distances but new node's destination comes first in alphabets.
    if (parentDist > distance || (parentDist === distance && dstLabel < parentDest)) {
      this._swapNodeValues(currentNode, currentParent);
      // Upheap again so that parent is the currentNode.
      this.upheap(currentParent, distance, dstLabel);
    }
  }
  /**
   * Restores min-heap property after node removal or update. Calls itself recursively.
   * @param {JSAV binary tree node} subtreeRootNode - The node that is being compared to its children.
   */
  downheap(subtreeRootNode) {
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
   * 
   * @param {Number} nodeIdx - index of the node whose parent will be found 
   * @returns the parent node of the node at the given index.
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

    return parentNode;
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
   * @returns the label of the minimum node that was removed.
   */
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
      this.downheap(this.rootNode);
    } else {
      this.rootNode.remove();
    }
    this._btree.layout();
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

  /**
   * Updates the label of a node with the given destination label and restores the min-heap property.
   * @param {String} dest - the destination label of the node that will be updated 
   * @param {String} newLabel - the new label for the node
   * @returns the old label of the node that was updated.
   */
  updateNodeWithDest(dest, newLabel) {
    console.log("now we should update ")
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
    const allNodesArr = this.getWholeTreeNodeList();
    // Grab first node with the correct destination.
    const node = allNodesArr.find(node => 
      node.value().charAt(node.value().length - 5) === dest);

    console.log("got node", node);
    
    return node;
  }
}

