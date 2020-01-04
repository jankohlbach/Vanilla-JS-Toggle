(() => {
  const ACTIVE_CLASS = 'open';

  const getHeight = (element) => {
    if (!element.parentNode.classList.contains(ACTIVE_CLASS)) {
      element.setAttribute('style', 'display: block;');
    }
    let { height, paddingTop, paddingBottom } = getComputedStyle(element);
    height = parseInt(height, 10);
    paddingTop = parseInt(paddingTop, 10);
    paddingBottom = parseInt(paddingBottom, 10);
    if (!element.parentNode.classList.contains(ACTIVE_CLASS)) {
      element.setAttribute('style', 'display: none;');
    }
    return { height, paddingTop, paddingBottom };
  };

  const toggle = (element) => {
    const { height, paddingTop, paddingBottom } = getHeight(element);
    const currentHeight = element.clientHeight;
    const time = height / 3 + 150;
    const [start, end] = currentHeight > height / 2 ? [height, 0] : [0, height];
    const difference = end - start;

    element.parentNode.classList[end === 0 ? 'remove' : 'add'](ACTIVE_CLASS);
    element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

    const initTime = new Date().getTime();
    const repeat = () => {
      const newTime = new Date().getTime() - initTime;
      const step = start + difference * newTime / time;
      const stepPaddingT = start === 0
        ? (0 + (paddingTop * newTime / time))
        : (paddingTop + (-paddingTop * newTime / time));
      const stepPaddingB = start === 0
        ? (0 + (paddingBottom * newTime / time))
        : (paddingBottom + (-paddingBottom * newTime / time));

      if (newTime <= time) {
        element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
      } else {
        element.setAttribute('style', `display: ${end === 0 ? 'none' : 'block'}`);
      }

      const repeatLoop = requestAnimationFrame(repeat);

      if (start <= end ? Math.floor(step) > end : Math.floor(step) < end) {
        cancelAnimationFrame(repeatLoop);
      }
    };

    return repeat();
  };

  // all toggles
  const toggles = document.querySelectorAll('.toggle');
  // all toggle-header, trigger toggle-effect
  const toggleHeader = document.querySelectorAll('.toggle-head', toggles);
  // all toggle-footer, trigger toggle-effect
  const toggleFooter = document.querySelectorAll('.toggle-foot', toggles);

  toggleHeader.forEach((toggleHead) => {
    toggleHead.addEventListener('click', () => {
      toggle(toggleHead.parentNode.querySelector('.toggle-body'));
    });
  });

  toggleFooter.forEach((toggleFoot) => {
    toggleFoot.addEventListener('click', () => {
      toggle(toggleFoot.parentNode);
    });
  });
})();
