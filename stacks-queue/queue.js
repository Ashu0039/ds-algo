const Queue_DS = capacity => {
  const OVERFLOW = capacity;
  let arr = [];

  return {
    get length() {
      return arr.length;
    },
    enqueue: function(element) {
      if (this.length < OVERFLOW) {
        arr = [...arr, element];
      } else {
        throw new Error("Queue overflow");
      }
    },
    dequeue: function() {
      if (this.length > 0) {
        const dequeuedElement = arr[0];
        arr = [...arr.slice(1)];
        return dequeuedElement;
      } else {
        throw new Error("Queue is empty");
      }
    },
    empty: function() {
      if (this.length > 0) {
        arr = [];
      } else {
        throw new Error("Queue is already empty");
      }
    }
  };
};

class Queue {
  constructor(queue_capacity) {
    this.queue = Queue_DS(queue_capacity);
    this.updateQueueLengthCounter();
    this.setQueueCapacityCount(queue_capacity);
  }

  enqueueElement() {
    const currentLengthOfQueue = this.queue.length;
    const newElement = Element(`${currentLengthOfQueue + 1}`);
    try {
      this.queue.enqueue(newElement);
      this.addNewElementToQueue(newElement);
      this.updateQueueLengthCounter();
    } catch (error) {
      handleError(error);
    }
  }

  addNewElementToQueue(element) {
    const queueDiv = this.getQueueBoxElement();
    const newQueueElement = document.createElement("div");
    newQueueElement.classList = "element queue in";
    newQueueElement.innerText = element.title;
    queueDiv.appendChild(newQueueElement);

    setTimeout(function() {
      newQueueElement.classList = "element queue";
    });
  }

  updateQueueLengthCounter() {
    const newQueueLength = this.queue.length;
    this.setQueueLengthCounter(newQueueLength);
  }

  getQueueBoxElement() {
    return document.querySelector(".queues .box");
  }

  setQueueLengthCounter(count) {
    if (count >= 0) {
      const node = document.querySelector(".queues .info .length");
      node.innerHTML = count;
    }
  }

  setQueueCapacityCount(count) {
    if (!isNaN(count)) {
      const queueCapacityCount = document.querySelector(
        ".queues .info .capacity"
      );
      queueCapacityCount.innerHTML = count;
    }
  }
}
