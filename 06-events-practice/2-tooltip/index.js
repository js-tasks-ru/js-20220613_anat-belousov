class Tooltip {
  static isComponentExist;
  constructor() {
    if (Tooltip.isComponentExist) {
      return Tooltip.isComponentExist;
    } else {
      Tooltip.isComponentExist = this;
    }
    this.initialize();
  }

  initialize () {
    document.addEventListener('pointerover', this.pointeroverHandler);
  }

  render() {
    this.element = document.createElement('div');
    this.element.className = 'tooltip';
    document.body.append(this.element);
  }

  pointeroverHandler = event => {
    this.target = event.target.closest('[data-tooltip]');
    if (this.target) {
      this.target.addEventListener('pointermove', this.pointermoveHandler);
      this.target.addEventListener('pointerout', this.pointeroutHandler);
      this.render();
      this.element.textContent = this.target.dataset.tooltip;
    }
  }

  pointermoveHandler = () => {
    const shift = 10;
    this.element.style.left = event.clientX + shift + 'px';
    this.element.style.top = event.clientY + shift + 'px';
  }

  pointeroutHandler = () => {
    this.target.removeEventListener('pointermove', this.pointermoveHandler);
    this.target.removeEventListener('pointerout', this.pointeroutHandler);
    this.target = null;
    this.element.remove();
  }
  remove() {
    this.element.remove();
  }

  destroy() {
    if (this.target) {
      this.target.removeEventListener('pointerover', this.pointeroutHandler);
      this.target.removeEventListener('pointermove', this.pointermoveHandler);
      this.target.removeEventListener('pointerout', this.pointeroutHandler);
    }
    this.remove();
  }
}

export default Tooltip;
