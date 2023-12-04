import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';
import utils from '../../scripts/utils.js';
import socialIconBlock from '../social-icons/social-icons.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // fetch footer content
  const footerPath = cfg.footer || '/footer';
  const resp = await fetch(`${footerPath}.plain.html`, window.location.pathname.endsWith('/footer') ? { cache: 'reload' } : {});

  if (resp.ok) {
    const html = await resp.text();

    // decorate footer DOM
    const footer = document.createElement('div');
    footer.innerHTML = html;
    let isFound = false;
    const footerElms = [...footer.children[0].children].reduce(((elements, curEl) => {
      const currentContent = curEl.textContent.trim() || curEl.innerHTML;
      if (currentContent === 'Ⓒ 2019, WKND Site.') {
        isFound = true;
      }

      if (currentContent && !isFound) {
        elements.push(curEl);
      }
      return elements;
    }), []);

    const footerElmsParent = document.createElement('div');
    footerElmsParent.classList.add('footer-links');
    utils.wrapAll(footerElms, footerElmsParent);

    const footerLinkEls = [...footerElmsParent.children];
    const halfLength = Math.ceil(footerLinkEls.length / 2);

    const firstElSet = footerLinkEls.splice(0, halfLength);
    const secondElSet = footerLinkEls;

    const footerLinksLeft = document.createElement('div');
    footerLinksLeft.classList.add('footer-links-left');
    const footerLinksRight = document.createElement('div');
    footerLinksRight.classList.add('footer-links-right');

    utils.wrapAll(firstElSet, footerLinksLeft);
    utils.wrapAll(secondElSet, footerLinksRight);

    const socialIconsWrapper = footerLinksRight.children[1];
    socialIconsWrapper.classList.add('social-icons-parent');
    socialIconBlock(socialIconsWrapper, 'footer');

    decorateIcons(footer);
    block.append(footer);
  }
}
