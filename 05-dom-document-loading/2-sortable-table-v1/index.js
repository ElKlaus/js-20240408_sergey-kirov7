export default class SortableTable {
  element;
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
  }

  createHeader() {
    console.log(this.data, this.headerConfig);
    return this.headerConfig.reduce((acc, headerItem, index) => {
      const {id, title, sortable, template} = headerItem;
      const arrow = `
        <span data-element="arrow" class="sortable-table__sort-arrow">
          <span class="sort-arrow"></span>
        </span>`;
      const res = acc + `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${id}">
          <span>${title}</span>
          ${id === 'title' ? arrow : ''}
        </div>`;
  
      return res;
    }, '');
  }

  createBody() {
    return this.data.reduce((acc, dataItem, index) => {
      const {id, title, quantity, price, sales, images} = dataItem;
      const res = acc + `
        <a href="/products/3d-ochki-epson-elpgs03" class="sortable-table__row">
          <div class="sortable-table__cell">
            <img class="sortable-table-image" alt="Image" src="http://magazilla.ru/jpg_zoom1/246743.jpg">
          </div>
          <div class="sortable-table__cell">${title}</div>

          <div class="sortable-table__cell">${quantity}</div>
          <div class="sortable-table__cell">${price}</div>
          <div class="sortable-table__cell">${sales}</div>
        </a>`;
  
      return res;
    }, '');
  }

  createElement(template) {
    const element = document.createElement('div');

    element.innerHTML = template;

    return element.firstElementChild;
  }

  createTemplate() {
    return (`
      <div data-element="productsContainer" class="products-list__container">
        <div class="sortable-table">
          <div data-element="header" class="sortable-table__header sortable-table__row">
            ${this.createHeader()}
          </div>
          
          <div data-element="body" class="sortable-table__body">
            ${this.createBody()}
          </div>
          <div data-element="loading" class="loading-line sortable-table__loading-line"></div>
      
          <div data-element="emptyPlaceholder" class="sortable-table__empty-placeholder">
            <div>
              <p>No products satisfies your filter criteria</p>
              <button type="button" class="button-primary-outline">Reset all filters</button>
            </div>
          </div>
      
        </div>
      </div>`);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
  }
}

