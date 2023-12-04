import utils from '../../scripts/utils.js';
import socialIconBlock from '../social-icons/social-icons.js';

export default function decorate(block) {
  [...block.children].forEach((element) => {
    if (element) {
      element.classList.add('author-list-item');
      const authorImgElm = element.children[0];
      const authorInfoElm = element.children[1];

      authorImgElm.classList.add('author-list-item__img-wrap');
      authorInfoElm.classList.add('author-list-item__info-wrap');

      const socialIcons = authorInfoElm.querySelectorAll(':scope >p');
      const socialIconsWrapper = document.createElement('div');
      // socialIconsWrapper.classList.add('social-icons-wrapper');
      socialIcons.forEach((elm) => {
        utils.unwrap(elm.children[0]);
      });
      utils.wrapAll(socialIcons, socialIconsWrapper);
      socialIconBlock(socialIconsWrapper, 'fragment');
    }
  });
}
