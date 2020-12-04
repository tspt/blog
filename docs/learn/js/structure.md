---
title: Structure
meta:
  - name: description
    content: Sth. I Like
  - name: keywords
    content: js,structure
---


# Structure

## 链表
```js
/**
 * 节点
 */
class Node {
  constructor (data) {
    this.value = data;
    this.prev = null;
    this.next = null;
  }
}
```

### 单链表
```js
/**
 * 单链表
 */
class SingleNode {
  constructor () {
    this.len = 0;
    this.head = new Node('head');
    this.currentNode = null;
  }
  // 获取长度
  getLength () {
    return this.len;
  }
  // 查找指定节点
  find (val) {
    var node = this.head;
    while (node.value !== val) {
      node = node.next;
    }
    return node;
  }
  // 查找指定节点前一个节点
  findPrev (val) {
    var node = this.head;
    while (node.next && node.next.value !== val) {
      node = node.next;
    }
    return node;
  }
  // 查找最后一个节点
  findLast () {
    var node = this.head;
    while (node.next) {
      node = node.next;
    }
    return node;
  }
  // 添加一个节点
  append (newVal) {
    var node = this.findLast();
    if (!node) return;
    var newNode = new Node(newVal);
    node.next = newNode;
    this.len++;
  }
  // 插入一个节点
  insert (newVal, val) {
    var node = this.find(val);
    if (!node) return;
    var newNode = new Node(newVal);
    newNode.next = node.next;
    node.next = newNode;
    this.len++;
  }
  // 获取所有的节点
  getAll () {
    var arr = [],
        node = this.head.next;
    while (node) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }
  // 修改一个节点
  modify (newVal, val) {
    var node = this.find(val);
    if (!node) return;
    node.value = newVal;
  }
  // 移除一个节点
  remove (val) {
    var node = this.findPrev(val);
    if (!node) return;
    if (node.next) {
      node.next = node.next.next ? node.next.next : null;
    }
    this.len--;
  }
  // 清除所有的节点
  clear () {
    this.head.next = null;
    this.len = 0;
  }
}

var singleNode = new SingleNode();
for (var i = 1; i < 10; i++) {
  singleNode.append(i + '');
}
singleNode.insert('6.6', '6');
singleNode.insert('7.7', '7');
singleNode.remove('4');
singleNode.remove('9');
console.log(singleNode);
console.log(singleNode.getAll());
singleNode.clear();
```

### 单向循环链表
```js
/**
 * 单向循环链表
 */
class SingleCircleNode extends SingleNode {
  constructor (data) {
    super();
  }
  // 查找最后一个节点
  findLast () {
    var node = this.head;
    var len = 0;
    while (len++ !== this.len) {
      node = node.next;
    }
    return node;
  }
  // 添加一个节点
  append (newVal) {
    var node = this.findLast();
    if (!node) return;
    var newNode = new Node(newVal);
    node.next = newNode;
    newNode.next = this.head.next;
    this.len++;
  }
  // 插入一个节点
  insert (newVal, val) {
    var node = this.find(val);
    if (!node) return;
    var newNode = new Node(newVal);
    if (val === 'head') {
      var lastNode = this.findLast();
      newNode.next = this.head.next;
      this.head.next = newNode;
      lastNode.next = newNode;
      this.len++;
      return;
    }
    newNode.next = node.next;
    node.next = newNode;
    this.len++;
  }
  // 获取所有的节点
  getAll () {
    var arr = [],
        node = this.head.next,
        count = 0;
    while (count++ !== this.len && node.next) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }
  // 移除一个节点
  remove (val) {
    var node = this.findPrev(val);
    if (!node) return;
    if (node.value === 'head') {
      var lastNode = this.findLast();
      if (this.len === 1) {
        this.head.next = null;
      } else {
        this.head.next = this.head.next.next;
        lastNode.next = this.head.next;
      }
      this.len--;
      return;
    }
    node.next = node.next.next;
    this.len--;
  }
}

var singleCircle = new SingleCircleNode();
for (var i = 1; i < 10; i++) {
  singleCircle.append(i + '');
}
singleCircle.insert('6.6', '6');
singleCircle.insert('0', 'head');
singleCircle.remove('4');
singleCircle.remove('0');
console.log(singleCircle);
console.log(singleCircle.getAll());
singleCircle.clear();
```

### 双向链表
```js
/**
 * 双向链表
 */
class DoubleCircle extends SingleCircleNode {
  constructor (data) {
    super();
  }
  // 添加一个节点
  append (newVal) {
    var node = this.findLast();
    if (!node) return;
    var newNode = new Node(newVal);
    node.next = newNode;
    newNode.prev = node;
    this.len++;
  }
  // 插入一个节点
  insert (newVal, val) {
    var node = this.find(val);
    if (!node) return;
    var newNode = new Node(newVal);
    newNode.next = node.next;
    node.prev = newNode;
    node.next = newNode;
    newNode.prev = node;
  }
  getAll () {
    var arr = [],
        node = this.head.next;
    while (node) {
      arr.push(node.value);
      node = node.next;
    }
    return arr;
  }
  // 移除一个节点
  remove (val) {
    var node = this.findPrev(val);
    if (!node) return;
    if (node.next) {
      node.next = node.next.next ? node.next.next : null;
      if (node.next) {
        node.next.prev = node.next;
      }
    } else {
      node.next = null;
    }
    this.len--;
  }
}

var doubleCircle = new DoubleCircle();
for (var i = 1; i < 10; i++) {
  doubleCircle.append(i + '');
}
doubleCircle.insert('6.6', '6');
doubleCircle.insert('7.7', '7');
doubleCircle.remove('4');
doubleCircle.remove('9');
console.log(doubleCircle);
console.log(doubleCircle.getAll());
doubleCircle.clear();
```


## 二叉树
```js
/**
 * 二叉树
 */
class TreeNode {
  constructor (data) {
    this.value = data;
    this.left = null;
    this.right = null;
  }
}

class TwoTreeNode {
  constructor () {
    this.root = null;
  }

  findParent (newVal) {
    var node = this.root,
        pNode = null,
        dir = '';

    while (node) {
      pNode = node;
      if (node.value >= newVal) {
        node = node.left;
        dir = 'left';
      } else {
        node = node.right;
        dir = 'right';
      }
    }
    return [pNode, dir];
  }

  removeNode (node, val) {
    if (!node) return null;
    if (node.value === val) {
      if (!node.left && !node.right) {
        return null;
      } else if (!node.left) {
        return node.right;
      } else if (!node.right) {
        return node.left;
      }
      let tempNode = node.right;
      while (tempNode.left) {
        tempNode = tempNode.left;
      }
      node.value = tempNode.value;
      node.right = this.removeNode(node.right, tempNode.value);
      return node;
    } else if (node.value > val) {
      node.left = this.removeNode(node.left, val);
      return node;
    } else {
      node.right = this.removeNode(node.right, val);
      return node;
    }
  }

  insert (newVal) {
    if (this.root) {
      let arr = this.findParent(newVal);
      arr[0][arr[1]] = new TreeNode(newVal);
    } else {
      this.root = new TreeNode(newVal);
    }
  }

  remove (val) {
    this.root = this.removeNode(this.root, val);
    console.log(this.root);
  }

  getMin () {
    let node = this.root;
    while (node.left) {
      node = node.left;
    }
    return node.value;
  }

  getMax () {
    let node = this.root;
    while (node.right) {
      node = node.right;
    }
    return node.value;
  }
}

let twoTreeNode = new TwoTreeNode();
twoTreeNode.insert(10);
twoTreeNode.insert(12);
twoTreeNode.insert(3);
twoTreeNode.insert(4);
twoTreeNode.insert(6);
twoTreeNode.insert(7);
twoTreeNode.insert(16);
twoTreeNode.insert(1);
twoTreeNode.insert(8);
twoTreeNode.remove(3);
console.log(twoTreeNode);

/*
  前序： 根 左 右
  中序： 左 根 右
  后序： 左 右 根
*/
```