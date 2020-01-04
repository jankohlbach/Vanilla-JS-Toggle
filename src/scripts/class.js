(() => {
  class Toggle {
    constructor(element) {
      this.toggleElement = element;
      this.toggleBody = element.querySelector('.toggle-body');
      this.getHeight = this.getHeight.bind(this);
      this.toggle = this.toggle.bind(this);

      this.initEventListeners();
    }

    initEventListeners() {
      const toggleHead = this.toggleElement.querySelector('.toggle-head');
      const toggleFoot = this.toggleBody.querySelector('.toggle-foot');
      toggleHead.addEventListener('click', this.toggle);
      toggleFoot.addEventListener('click', this.toggle);
    }

    // measures the height and paddings of the element
    getHeight() {
      if (!this.toggleElement.classList.contains(Toggle.ACTIVE_CLASS)) {
        this.toggleBody.setAttribute('style', 'display: block;');
      }
      this.height = parseInt(getComputedStyle(this.toggleBody).height, 10);
      this.paddingTop = parseInt(getComputedStyle(this.toggleBody).paddingTop, 10);
      this.paddingBottom = parseInt(getComputedStyle(this.toggleBody).paddingBottom, 10);
      if (!this.toggleElement.classList.contains(Toggle.ACTIVE_CLASS)) {
        this.toggleBody.setAttribute('style', 'display: none;');
      }
    }

    // handles the toggle-effect
    toggle() {
      this.getHeight();
      const currentHeight = this.toggleBody.clientHeight;
      const time = this.height / 3 + 150;
      const [start, end] = currentHeight > this.height / 2 ? [this.height, 0] : [0, this.height];
      const difference = end - start;

      this.toggleElement.classList[end === 0 ? 'remove' : 'add'](Toggle.ACTIVE_CLASS);
      this.toggleBody.setAttribute('style', 'overflow: hidden; display: block; padding-top: 0; padding-bottom: 0;');

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
          this.toggleBody.setAttribute('style', `overflow: hidden; display: block; padding-top: ${stepPaddingT}px; padding-bottom: ${stepPaddingB}px; height: ${step}px`);
        } else {
          this.toggleBody.setAttribute('style', `display: ${end === 0 ? 'none' : 'block'}`);
        }
        const repeatLoop = requestAnimationFrame(repeat);

        // break-condition
        if (start <= end ? Math.floor(step) > end : Math.floor(step) < end) {
          cancelAnimationFrame(repeatLoop);
        }
      };

      repeat();
    }
  }

  Toggle.ACTIVE_CLASS = 'open';

  // all toggles
  const toggles = document.querySelectorAll('.toggle');

  toggles.forEach((toggle) => {
    // eslint-disable-next-line no-new
    new Toggle(toggle);
  });
})();
