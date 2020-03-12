/* https://stackoverflow.com/questions/17534661/make-anchor-link-go-some-pixels-above-where-its-linked-to */
// The function actually applying the offset
function offsetAnchor() {
  if (location.hash.length !== 0) {
    window.scrollTo(window.scrollX, window.scrollY - 70);
  }
}

// Set the offset when entering page with hash present in the url
window.setTimeout(offsetAnchor, 0);

window.onhashchange = offsetAnchor;
