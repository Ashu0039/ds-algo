const Stack_DS = capacity => {
  let arr = [];
  const OVERFLOW = capacity;

  return {
    get length() {
      return arr.length;
    },
    pop: function() {
      if (arr.length > 0) {
        const lastElement = arr[arr.length - 1];
        arr = [...arr.slice(0, arr.length - 1)];
        return lastElement;
      } else {
        throw new Error("Stack is empty");
      }
    },
    push: function(element) {
      // can we add one more element
      if (arr.length < OVERFLOW) {
        arr = [...arr, element];
        return true;
      } else {
        throw new Error("Stack overflow");
      }
    },
    empty: function() {
      if (arr.length) {
        arr = [];
        return true;
      } else {
        throw new Error("Stack is already empty");
      }
    }
  };
};

class Stack {
  constructor(stack_capacity) {
    this.stack = Stack_DS(stack_capacity);
    this.updateStackLengthCounter();
    this.setStackCapacityCount(stack_capacity);
  }

  animationTime = 500;

  pushElementToStack() {
    const currentLengthOfStack = this.stack.length;
    // Just pushing numbers into stack
    const newElement = Element(`${currentLengthOfStack + 1}`);
    try {
      this.stack.push(newElement);
      this.addNewElementToStack(newElement);
      this.updateStackLengthCounter();
    } catch (error) {
      handleError(error);
    }
  }

  addNewElementToStack(element) {
    const stackElement = this.getStackBoxElement();
    const newStackElement = document.createElement("div");
    newStackElement.classList = "element stack out";
    newStackElement.innerText = element.title;
    stackElement.appendChild(newStackElement);

    setTimeout(function() {
      newStackElement.classList = "element stack";
    });
  }

  popElementFromStack() {
    try {
      this.stack.pop();
      this.removeLastElementFromStack();
      this.updateStackLengthCounter();
    } catch (error) {
      handleError(error);
    }
  }

  removeLastElementFromStack() {
    const stackElement = this.getStackBoxElement();
    const lastStackElement = stackElement.lastChild;
    if (lastStackElement) {
      lastStackElement.classList = "element stack out";
      // should match with the animation duration specified in CSS
      setTimeout(function() {
        stackElement.removeChild(lastStackElement);
      }, this.animationTime);
    }
  }

  emptyStack() {
    try {
      this.stack.empty();
      this.emptyStackElements();
      this.updateStackLengthCounter();
    } catch (error) {
      handleError(error);
    }
  }

  emptyStackElements() {
    const stackElement = this.getStackBoxElement();
    const allStacks = stackElement.children;
    // Animate out all stacks
    for (let i = 0; i < allStacks.length; i++) {
      const stackElement = allStacks[i];
      stackElement.classList = "element stack out";
    }

    // Remove all stacks from DOM after they have animated out
    setTimeout(function() {
      while (stackElement.lastChild) {
        stackElement.removeChild(stackElement.lastChild);
      }
    }, this.animationTime);
  }

  updateStackLengthCounter() {
    const newStackLength = this.stack.length;
    this.setStackLengthCounter(newStackLength);
  }

  setStackLengthCounter(count) {
    if (count >= 0) {
      const counterElement = this.getStackLengthCountElement();
      counterElement.innerHTML = count;
    }
  }

  getStackLengthCountElement() {
    return document.querySelector(".stacks .info .length");
  }

  getStackBoxElement() {
    return document.querySelector(".stacks .box");
  }

  setStackCapacityCount(count) {
    const stackCapacityCount = document.querySelector(
      ".stacks .info .capacity"
    );
    stackCapacityCount.innerHTML = count;
  }
}
