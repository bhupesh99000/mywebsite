export default function decorate(block, mode) {
  debugger
  if (block) {
    if (mode) {
      block.classList.add('social-icons-parent');
    } else {
      const parentEl = block.querySelector(':scope > div > div');
      parentEl.classList.add('social-icons-parent');
    }
  }
}
