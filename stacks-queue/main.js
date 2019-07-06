const Queue = capacity => {
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

const Element = title => {
  return { title };
};

function handleError(error) {
  console.error("Got error --> ", error);
  alert(error);
}

/*
  QUEUE FUNCTIONS
*/

function getQueueBoxElement() {
  return document.querySelector(".queues .box");
}

function getQueueLengthCountElement() {
  return document.querySelector(".queues .info .length");
}

function setQueueLengthCounter(count) {
  if (count >= 0) {
    const node = document.querySelector(".queues .info .length");
    node.innerHTML = count;
  }
}

function setQueueCapacityCount(count) {
  if (!isNaN(count)) {
    const queueCapacityCount = document.querySelector(
      ".queues .info .capacity"
    );
    queueCapacityCount.innerHTML = count;
  }
}

function queueElement() {
  const currentLengthOfQueue = queue.length;
  const newElement = Element(`${currentLengthOfQueue + 1}`);
  try {
    queue.enqueue(newElement);
    addNewElementToQueue(newElement);
    updateQueueLengthCounter();
  } catch (error) {
    handleError(error);
  }
}

function addNewElementToQueue(element) {
  const queueElement = getQueueBoxElement();
  const newQueueElement = document.createElement("div");
  newQueueElement.classList = "element queue in";
  newQueueElement.innerText = element.title;
  queueElement.appendChild(newQueueElement);

  setTimeout(function() {
    newQueueElement.classList = "element queue";
  });
}

function dequeueElement() {
  try {
    queue.dequeue();
    removeFirstElementFromQueue();
    updateQueueLengthCounter();
  } catch (error) {
    handleError(error);
  }
}

function removeFirstElementFromQueue() {
  const queueElement = getQueueBoxElement();
  // Animate out first child
  // Animate other childs to shift down
  const allElements = document.querySelectorAll(".element.queue");

  const firstElement = queueElement.firstChild;
  if (firstElement) {
    firstElement.classList = "element queue out";
    // should match with the animation duration specified in CSS
    setTimeout(function() {
      queueElement.removeChild(firstElement);
    }, animationTime);
  }
}

function emptyQueue() {
  try {
    queue.empty();
    emptyQueueElements();
    updateQueueLengthCounter();
  } catch (error) {
    handleError(error);
  }
}

function emptyQueueElements() {
  const queueElement = getQueueBoxElement();
  const allElements = queueElement.children;
  // Animate out all elements
  // Animate first
  for (let i = 0; i < allElements.length; i++) {
    const element = allElements[i];
    element.classList = "element queue out";
  }

  // Then
  // Remove all elements from DOM after they have animated out
  setTimeout(function() {
    while (queueElement.lastChild) {
      queueElement.removeChild(queueElement.lastChild);
    }
  }, animationTime);
}

function updateQueueLengthCounter() {
  const newQueueLength = queue.length;
  setQueueLengthCounter(newQueueLength);
}

/**
 * Main.js
 * Interface to handle all DOM events and Class function calls
 */
function Main() {
  const pushToStackBtn = document.querySelector(".stacks button.push");
  const popFromStackBtn = document.querySelector(".stacks button.pop");
  const emptyStackBtn = document.querySelector(".stacks button.empty");

  const STACK_CAPACITY = 10;
  const QUEUE_CAPACITY = 10;

  let stack = new Stack(STACK_CAPACITY);
  let queue = Queue(QUEUE_CAPACITY);

  // Add Event listeners
  pushToStackBtn.addEventListener("click", function() {
    stack.pushElementToStack();
  });

  popFromStackBtn.addEventListener("click", function() {
    stack.popElementFromStack();
  });

  emptyStackBtn.addEventListener("click", function() {
    stack.emptyStack();
  });
}

function init() {
  Main();
}
