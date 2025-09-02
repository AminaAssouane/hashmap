export default class HashMap {
  constructor(loadFactor, capacity) {
    this.hashMap = new Array(capacity);
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    for (let i = 0; i < capacity; i++) {
      this.hashMap[i] = new LinkedList();
    }
  }

  hash(key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }

    return hashCode;
  }

  set(key, value) {
    // We first check if the hash map has exceeded its load factor
    if (this.keys().length / this.capacity >= this.loadFactor) {
      this.capacity *= 2;
      let newArray = new Array(capacity);
      // We create a new array
      for (i = 0; i < this.capacity; i++) {
        newArray[i] = new LinkedList();
      }

      let tmp = this.hashMap;
      // We loop through the original array
      for (let i = 0; i < capacity / 2; i++) {
        // We loop through the bucket (the linked list) and append the nodes using the new hash code given by the hash() function
        while (tmp[i]) {
          newArray[this.hash(tmp[i].key)].append(tmp[i].key, tmp[i].value);
          tmp = tmp.next;
        }
      }
    }

    // When there's still place (below the load factor), we append the new node using the hash code
    let hashCode = this.hash(key);
    if (!this.hashMap[hashCode]) {
      this.hashMap[hashCode] = new LinkedList();
      this.hashMap[hashCode].append(value);
    } else {
      if (this.hashMap[hashCode].contains(key)) {
        this.hashMap[hashCode].find(key).value = value;
      } else {
        this.hashMap[hashCode].append(key, value);
      }
    }
  }

  get(key) {
    let hashCode = hash(key);
    if (!this.hashMap[hashCode].contains(key)) return null;
    else return this.hashMap[hashCode].find(key).value;
  }

  has(key) {
    let hashCode = hash(key);
    return this.hashMap[hashCode].contains(key);
  }

  remove(key) {
    if (!this.has(key)) return false;
    else {
      let hashCode = hash(key);
      let prev = null;
      let cur = this.hashMap[hashCode].head;
      while (cur.next && cur.key != key) {
        prev = cur;
        cur = cur.next;
      }
      prev = cur.next;
      cur.next = null;
      return true;
    }
  }

  length() {
    let size = 0;
    for (let i = 0; i < this.capacity; i++) {
      if (this.hashMap[i].size()) size += this.hashMap[i].size();
    }
    return size;
  }

  clear() {
    for (let i = 0; i < this.capacity; i++) this.hashMap[i] = null;
  }

  keys() {
    let arrayKeys = new Array(length());
    for (let i = 0; i < this.capacity; i++) {
      let tmp = this.hashMap[i];
      while (tmp) {
        arrayKeys.push(tmp.key);
        tmp = tmp.next;
      }
    }
    return arrayKeys;
  }

  values() {
    let arrayValues = new Array(length());
    for (let i = 0; i < this.capacity; i++) {
      let tmp = this.hashMap[i];
      while (tmp) {
        arrayValues.push(tmp.value);
        tmp = tmp.next;
      }
    }
    return arrayValues;
  }

  entries() {
    let array = new Array(length());
    for (let i = 0; i < this.capacity; i++) {
      let tmp = this.hashMap[i];
      while (tmp) {
        array.push(tmp.key, tmp.value);
        tmp = tmp.next;
      }
    }
  }
}

// Dealing with collisions : implementing a Linked List
class Node {
  constructor(key, value, next) {
    this.key = key;
    this.value = value;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(key, value) {
    if (this.head === null) this.head = new Node(key, value, null);
    else {
      let tmp = this.head;
      while (tmp.next !== null) {
        tmp = tmp.next;
      }
      tmp.next = new Node(key, value, null);
    }
  }

  contains(key) {
    if (this.head === null) return false;
    else {
      let tmp = this.head;
      while (tmp !== null && tmp.key !== key) {
        tmp = tmp.next;
      }
      if (tmp === null) return false;
      else return true;
    }
  }

  // find returns the node of the linked list given the key
  find(key) {
    if (this.head === null) return null;
    else {
      let tmp = this.head;
      while (tmp !== null && tmp.key !== key) {
        tmp = tmp.next;
      }
      if (tmp === null) return null;
      else return tmp;
    }
  }

  size() {
    if (this.head === null) return 0;
    let tmp = this.head;
    let i = 0;
    while (tmp !== null) {
      i++;
      tmp = tmp.next;
    }
    return i;
  }
}
