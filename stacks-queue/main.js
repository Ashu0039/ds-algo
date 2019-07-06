const Element = title => {
  return { title };
};

function handleError(error) {
  console.error("Got error --> ", error);
  alert(error);
}

/**
 * Main.js
 * Interface to handle all DOM events and Class function calls
 */
function Main() {
  const pushToStackBtn = document.querySelector(".stacks button.push");
  const popFromStackBtn = document.querySelector(".stacks button.pop");
  const emptyStackBtn = document.querySelector(".stacks button.empty");

  const addElementToQueueBtn = document.querySelector(".queues button.enqueue");
  const removeElementFromQueueBtn = document.querySelector(
    ".queues button.dequeue"
  );
  const emptyQueueBtn = document.querySelector(".queues button.empty");

  const STACK_CAPACITY = 10;
  const QUEUE_CAPACITY = 10;

  let stack = new Stack(STACK_CAPACITY);
  let queue = new Queue(QUEUE_CAPACITY);

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

  addElementToQueueBtn.addEventListener("click", function() {
    queue.enqueueElement();
  });

  removeElementFromQueueBtn.addEventListener("click", function() {
    queue.dequeueElement();
  });

  emptyQueueBtn.addEventListener("click", function() {
    queue.emptyQueue();
  });
}

function init() {
  Main();
}
