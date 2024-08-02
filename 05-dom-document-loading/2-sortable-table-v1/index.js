export default class SortableTable {
  static subElements = document.querySelectorAll('.sortable-table__row');
  static dataOrder = '';
  static sortArrow = `
    <span data-element="arrow" class="sortable-table__sort-arrow">
      <span class="sort-arrow"></span>
    </span>`;
  constructor(headerConfig = [], data = []) {
    this.headerConfig = headerConfig;
    this.data = data;
    this.element = this.createElement(this.createTemplate());
  }
  
  // sortStrings(arr, param = 'asc') {
  //   const res = new Array(...arr);
  
  //   return res.sort((a, b) => {
  //     if (param === 'asc') {
  //       return a.localeCompare(b, ["ru", "en"], { caseFirst: 'upper' });
  //     }
  //     return b.localeCompare(a, ["ru", "en"], { caseFirst: 'upper' });
  //   });
  // }

  sort(fieldValue, orderValue) {
    this.resetSort();
    const sortElem = document.querySelector(`[data-id=${fieldValue}]`);
    sortElem.setAttribute('data-order', orderValue);

    this.data.sort((a, b) => {
      if (orderValue === 'asc') {
        return a[fieldValue].localeCompare(b[fieldValue], ["ru", "en"], { caseFirst: 'upper' });
      }
      return b[fieldValue].localeCompare(a[fieldValue], ["ru", "en"], { caseFirst: 'upper' });
    });

    this.createBody(this.data)

    console.log(this.data)
  }

  resetSort() {
    const sortedElem = document.querySelectorAll('[data-order]');
    sortedElem.forEach(element => {
      element.setAttribute('data-order', '');
    });    
  }

  createHeader() {
    return this.headerConfig.reduce((acc, headerItem, index) => {
      const {id, title, sortable, template} = headerItem;
      const res = acc + `
        <div class="sortable-table__cell" data-id="${id}" data-sortable="${sortable}" data-order="${SortableTable.dataOrder}">
          <span>${title}</span>
        </div>`;
  
      return res;
    }, '');
  }

  createBody(data = this.data) {
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

