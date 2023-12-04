import utils from '../../scripts/utils.js';

const socialIcons = {
  facebook: 'facebook',
  instagram: 'instagram',
  twitter: 'twitter',
};

function applySocialIcon(element) {
  if (element && element.textContent) {
    const content = element.textContent.toLowerCase();
    if (socialIcons[content]) {
      element.classList.add(`wkndicon-${content}-icon`);
    }
  }
}

export default function decorate(block, mode) {
  if (block) {
    if (mode) {
      block.classList.add('social-icons-parent');
    } else {
      debugger;
      const parentEl = block.querySelector(':scope > div > div');
      parentEl.classList.add('social-icons-parent');
      [...parentEl.children].forEach((element) => {
        utils.unwrap(element.children[0]);
        applySocialIcon(element);
      });
    }
  }
}
