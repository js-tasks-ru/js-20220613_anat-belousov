export default class SortableTable {
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;

    this.render();
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

  renderHeader(column, direction) {
    this.subElements.header.innerHTML = this.headerConfig.map(item => {
      return `
      <div class="sortable-table__cell" data-id="${item.id}" data-sortable="${item.sortable}" ${direction && column === item.id ? `data-order="${direction}"` : ''} >
        <span>${item.title}</span>
        ${column === item.id ? this.renderArrow() : ''}
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
    const directions = {
      'asc': 1,
      'desc': -1
    };
    const copyData = this.data;
    copyData.sort((a, b) => {
      return directions[direction] * a[field].toString().localeCompare(b[field].toString(), ['ru', 'en'], { caseFirst: 'upper', numeric: 'true' });
    });

    this.renderHeader(field, direction);
    this.renderBody(copyData);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }

}

// const data = [
//   {
//     'id': 'soska-(pustyshka)-nuk-10729357',
//     'title': 'Соска (пустышка) NUK 10729357',
//     'price': 3,
//     'sales': 14
//   },
//   {
//     'id': 'tv-tyuner-d-color--dc1301hd',
//     'title': 'ТВ тюнер D-COLOR  DC1301HD',
//     'price': 15,
//     'sales': 13
//   },
//   {
//     'id': 'detskiy-velosiped-lexus-trike-racer-trike',
//     'title': 'Детский велосипед Lexus Trike Racer Trike',
//     'price': 53,
//     'sales': 11
//   },
//   {
//     'id': 'soska-(pustyshka)-philips-scf182/12',
//     'title': 'Соска (пустышка) Philips SCF182/12',
//     'price': 9,
//     'sales': 11
//   },
//   {
//     'id': 'powerbank-akkumulyator-hiper-sp20000',
//     'title': 'Powerbank аккумулятор Hiper SP20000',
//     'price': 30,
//     'sales': 11
//   },
// ];

// export const header = [
//   {
//     id: 'title',
//     title: 'Name',
//     sortable: true,
//     sortType: 'string'
//   },
//   {
//     id: 'price',
//     title: 'Price',
//     sortable: true,
//     sortType: 'number'
//   },
//   {
//     id: 'sales',
//     title: 'Sales',
//     sortable: true,
//     sortType: 'number'
//   },
// ];

// let sortableTable = new SortableTable(header, data);