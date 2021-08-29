class Node {
    constructor(val) {
      this.val = val;
      this.next = null;
      this.prev = null;
    }
}

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  push(obj) {
      let newNode = new Node(obj);
      if(this.head === null) this.head = newNode;
      if (this.tail !== null) {
          this.tail.next = newNode;
          newNode.prev = this.tail;
      }  
      this.tail = newNode;
      this.length++
  }
  
  remove(obj){
      let currNode = this.head
      while(currNode.next !== null){
          if(currNode.val === obj){
              if(currNode === this.head){ 
                  this.head = currNode.next 
              }else {
                  currNode.prev.next = currNode.next
              }
              this.length--
              break;
          }
      }
  }
}