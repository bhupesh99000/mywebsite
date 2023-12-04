function utilsFn() {
  return {
    wrap(el, wrapper) {
      if (el && el.parentNode) {
        el.parentNode.insertBefore(wrapper, el);
        wrapper.appendChild(el);
      }
    },
    wrapAll(elmCollection, wrapper) {
      if (elmCollection && elmCollection.length) {
        elmCollection[0].parentNode.insertBefore(wrapper, elmCollection[0]);
        elmCollection.forEach((element) => {
          wrapper.appendChild(element);
        });
      }
    },
    unwrap(el) {
      if (el && el.parentNode) {
        // move all children out of the element
        while (el.firstChild) {
          el.parentNode.insertBefore(el.firstChild, el);
        }
        // remove the empty element
        el.remove();
      }
    },
  };
}

const utils = utilsFn();
export default utils;
