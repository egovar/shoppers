function isVisible(el) {
  return (
    el.getBoundingClientRect().y <= window.innerHeight &&
    el.getBoundingClientRect().y >= -el.clientHeight
  );
}

export { isVisible };
