export default class SortableTable {

  isSortLocally = true;

  constructor(headersConfig, {
    data = [],
    sorted = {}
  } = {}) {
    this.headerConfig = headersConfig;
    this.data = data;
    this.sorted = sorted;

    this.render();
    this.sortOnClient(this.sorted.id, this.sorted.order);
    this.initEventListeners();
  }
  
  get template() {
    return `
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
          </div>
          <div data-element="body" class="sortable-table__body">
          </div>
        </div>
      </div>
    `;
  }

  render() {
    const wrapper = document.createElement('div');
    wrapper.innerHTML = this.template;
    this.element = wrapper.firstElementChild;
    document.body.append(this.element);

    this.renderHeader();
    this.renderBody();
  }

  renderHeader() {
    this.subElements.header.innerHTML = this.headerConfig.map(item => {
      return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" ${this.sorted.id === item.id ? `data-order="${this.sorted.order}"` : ''} >
        <span>${item.title}</span>
        ${this.sorted.id === item.id ? this.renderArrow() : ''}
      </div>
      `;
    }).join('');
  }

  renderBody(data = this.data) {
    this.subElements.body.innerHTML = data.map(itemData => {
      return `
          <a href="${itemData.id}" class="sortable-table__row">
            ${this.renderTableRow(itemData)}
          </a>
        `;
    }).join('');
  }

  renderTableRow(itemData) {
    return this.headerConfig.map(itemConfig => {
      const div = `<div class="sortable-table__cell" >${itemData[itemConfig.id]}</div>`;
      return itemConfig.template ? itemConfig.template(itemData.images) : div;
    }).join('');
  }

  renderArrow() {
    return `
      <span data-element="arrow" class="sortable-table__sort-arrow">
        <span class="sort-arrow"></span>
      </span>
    `;
  }

  get subElements() {
    const result = {};
    const elements = this.element.querySelectorAll('[data-element]');
    for (const element of elements) {
      const name = element.dataset.element;
      result[name] = element;
    }
    return result;
  }

  sort(field, direction) {
    if (this.isSortLocally) {
      this.sortOnClient(field, direction);
    } else {
      this.sortOnServer();
    }
  }

  sortOnClient(field, direction) {
    const directions = {
      'asc': 1,
      'desc': -1
    };
    const copyData = this.data;
    copyData.sort((a, b) => {
      return directions[direction] * a[field].toString().localeCompare(b[field].toString(), ['ru', 'en'], { caseFirst: 'upper', numeric: 'true' });
    });

    const sortedColumnHeader = this.subElements.header.querySelector(`[data-id=${field}]`);
    sortedColumnHeader.dataset.order = direction;
    sortedColumnHeader.append(this.subElements.arrow);
    this.renderBody(copyData);
  }

  sortHendler = event => {
    const column = event.target.closest('[data-sortable=true]')?.dataset;
    if (column) {
      const direction = this.toggleDirection(column.order);
      this.sort(column.id, direction);
    }
  }

  toggleDirection(dir = 'asc') {
    const directions = {
      'asc': 'desc',
      'desc': 'asc',
    };
    return directions[dir];
  }

  initEventListeners() {
    this.subElements.header.addEventListener('pointerdown', this.sortHendler);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}
