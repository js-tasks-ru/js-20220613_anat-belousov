export default class ColumnChart {
  constructor(param) {
    this.empty = arguments.length === 0;
    this.data = param?.data || [];
    this.label = param?.label || '';
    this.value = param?.value || 0;
    this.link = param?.link || '';
    this.formatHeading = param?.formatHeading || (val => val);

    this.chartHeight = 50;
    this.maxValue = this.data ? Math.max(...this.data) : 1;
    this.scale = this.chartHeight / this.maxValue;

    this.render();
    this.initEventListeners();
  }

  getTemplate() {
    return `
      <div class="column-chart" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">${this.formatHeading(this.value.toLocaleString())}</div>
          <div data-element="body" class="column-chart__chart"></div>
        </div>
      </div>
    `;
  }

  render() {
    const element = document.createElement('div');
    element.innerHTML = this.getTemplate();
    if (this.link) {
      element.querySelector('.column-chart__title').innerHTML += `<a href="${this.link}" class="column-chart__link">View all</a>`;
    }
    this.element = element.firstElementChild;
    this.renderData();
  }

  update(newData) {
    this.element.querySelector('.column-chart__chart').innerHTML = ''; 
    this.renderData();
  }

  renderData() {
    if (this.empty) {
      this.renderSkeleton();
    } else {
      for (let dataItem of this.data) {
        this.element.querySelector('.column-chart__chart').innerHTML += `<div style="--value: ${Math.floor(dataItem * this.scale)}" data-tooltip="${(dataItem / this.maxValue * 100).toFixed(0)}%"></div>`;
      }
      if (this.element.classList.contains('column-chart_loading')) {
        this.element.classList.remove('column-chart_loading');
      }
    }
  }

  renderSkeleton () {
    if (!this.element.classList.contains('column-chart_loading')) {
      this.element.classList.add('column-chart_loading');
    }
    this.element.querySelector('.column-chart__chart').innerHTML = '';
    this.element.querySelector('.column-chart__chart').innerHTML += `<img src="charts-skeleton.svg"/>`;
  }
  
  initEventListeners() {

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
  
}
