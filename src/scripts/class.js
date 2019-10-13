(() => {
  // all toggles
  const toggles = document.querySelectorAll('.toggle');
  // all toggle-header, trigger toggle-effect
  const toggleHeader = document.querySelectorAll('.toggle-head', toggles);
  // all toggle-bodies, contain the content to show/hide
  const toggleBodies = document.querySelectorAll('.toggle-body', toggles);
  // all toggle-footer, trigger toggle-effect
  const toggleFooter = document.querySelectorAll('.toggle-foot', toggles);
  const activeClass = 'open';

  const Toggler = class Toggle {
    constructor(element) {
      this.element = element;
      this.getHeight = this.getHeight.bind(this);
      this.toggle = this.toggle.bind(this);
      window.addEventListener('resize', this.getHeight);
    }

    // measures the height and paddings of the element
    getHeight() {
      this.element.setAttribute('style', 'display: block;');
      this.height = parseInt(this.element.clientHeight, 10);
      this.paddingTop = parseInt(getComputedStyle(this.element).paddingTop, 10);
      this.paddingBottom = parseInt(getComputedStyle(this.element).paddingBottom, 10);
      if (!this.element.parentNode.classList.contains(activeClass)) {
        this.element.setAttribute('style', 'display: none;');
      }
      return this.height;
    }

    // handles the toggle-effect
    toggle() {
      this.getHeight();
      const currentHeight = this.element.clientHeight;
      const time = this.height / 3 + 150;
      const [start, end] = currentHeight > this.height / 2 ? [this.height, 0] : [0, this.height];
      const difference = end - start;

      this.element.parentNode.classList[end === 0 ? 'remove' : 'add'](activeClass);
      this.element.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

      // calculating and applying the steps in px
      const initTime = new Date().getTime();
      const repeat = () => {
        const newTime = new Date().getTime() - initTime;
        const step = start + difference * newTime / time;
        const stepPaddingT = start === 0
          ? (0 + (this.paddingTop * newTime / time))
          : (this.paddingTop + (-this.paddingTop * newTime / time));
        const stepPaddingB = start === 0
          ? (0 + (this.paddingBottom * newTime / time))
          : (this.paddingBottom + (-this.paddingBottom * newTime / time));

        if (newTime <= time) {
          this.element.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
        } else {
          this.element.setAttribute('style', `display: ${end === 0 ? 'none' : 'block'}`);
        }
        const repeatLoop = requestAnimationFrame(repeat);

        // break-condition
        if (start <= end ? Math.floor(step) > end : Math.floor(step) < end) {
          cancelAnimationFrame(repeatLoop);
        }
      };

      repeat();
    }
  };

  // initialize all toggle-bodies
  toggleBodies.forEach((toggleBody) => {
    const element = toggleBody;
    element.isToggle = new Toggler(toggleBody);
  });

  // add eventListener to all toggle-header
  toggleHeader.forEach((toggleHead) => {
    toggleHead.addEventListener('click', () => {
      toggleHead.parentNode.querySelector('.toggle-body').isToggle.toggle();
    });
  });

  // add eventListener to all toggle-footer
  toggleFooter.forEach((toggleFoot) => {
    toggleFoot.addEventListener('click', () => {
      toggleFoot.parentNode.isToggle.toggle();
    });
  });
}).call(this);
