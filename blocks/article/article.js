export default function decorate(block) {
  console.log(block);
  const pageUrl = new URL(window.location.href);
  const params = new URLSearchParams(pageUrl.search);
  let selectedArticle = null;
  if (params.has('article')) {
    selectedArticle = params.get('article');
    window.location.href = `/magazine/${selectedArticle}`;
  }
}
