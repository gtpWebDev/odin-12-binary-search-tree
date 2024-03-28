// currently using code from
//https://www.geeksforgeeks.org/implementation-queue-javascript/

class Queue {
  constructor() {
    this.items = {};
    this.frontIndex = 0;
    this.backIndex = 0;
  }

  // add item to back
  enqueue(item) {
    this.items[this.backIndex] = item;
    this.backIndex++;
    return item + " inserted";
  }

  // remove front item
  dequeue() {
    const item = this.items[this.frontIndex];
    delete this.items[this.frontIndex];
    this.frontIndex++;
    return item;
  }

  // get front item
  peek() {
    return this.items[this.frontIndex];
  }

  // print queue
  get printQueue() {
    return this.items;
  }
}

export { Queue as default };
