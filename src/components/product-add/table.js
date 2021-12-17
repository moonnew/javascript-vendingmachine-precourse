import Component from '../../essential/component.js';
import * as CONSTANTS from '../../utils/constants.js';
import { loadFromStorage, saveToStorage } from '../../utils/storage.js';

const HEAD = `
<h3>상품 현황</h3>
  <table>
    <thead>
        <th>상품명</th>
        <th>가격</th>
        <th>수량</th>
        <th>삭제</th>
    </thead>
    <tbody>
`;

const BODY = products => `
  ${products
    .map(
      ({ name, price, quantity }, index) => `
      <tr class="product-manage-item">
        <td class="product-manage-name">${name}</td>
        <td class="product-manage-price">${price}</td>
        <td class="product-manage-quantity">${quantity}</td>
        <td
        data-product-index="${index}" data-product-name="${name}"
        data-product-price="${price}" data-product-quantity="${quantity}">
        <input type="button" class="remove-button" value="삭제하기" />
      </td>
      </tr>
  `,
    )
    .join('')}
`;

const TAIL = `
    </tbody>
  </table>
`;

export default class Table extends Component {
  setup() {
    this.$state = {
      products: loadFromStorage(CONSTANTS.STORAGE_PRODUCTS_KEY),
    };

    this.applyProps();
  }

  applyProps() {
    if (this.$props && this.$props.product) {
      let product = this.$props.product;

      this.$state.products.push(product);
      saveToStorage(CONSTANTS.STORAGE_PRODUCTS_KEY, this.$state.products);

      delete this.$props.product;
    }
  }

  template() {
    return HEAD + BODY(this.$state.products) + TAIL;
  }

  setEvent() {
    this.addEvent('click', '.remove-button', ({ target }) => {
      let index = target.parentElement.dataset.productIndex;
      let products = this.$state.products;
      //let products = loadFromStorage(CONSTANTS.STORAGE_PRODUCTS_KEY);

      products[index].quantity -= 1;

      if (products[index].quantity == 0) {
        products.splice(index, 1);
      }

      saveToStorage(CONSTANTS.STORAGE_PRODUCTS_KEY, this.$state.products);
      this.render();
    });
  }
}
