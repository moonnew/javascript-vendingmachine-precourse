import Component from '../../essential/component.js';
import * as CONSTANTS from '../../utils/constants.js';
import { loadFromStorage, saveToStorage } from '../../utils/storage.js';

const CONTENT = inserted => `
  <br/>투입한 금액: <span id="charge-amount">${inserted}</span>원
`;

export default class Inserted extends Component {
  setup() {
    this.$state = {
      inserted: loadFromStorage(CONSTANTS.STORAGE_INSERTED_KEY),
    };

    this.applyProps();
  }

  applyProps() {
    if (this.$props && this.$props.inserted) {
      let inserted = this.$props.inserted;
      this.$state.inserted += inserted;
      console.log('구매한건데?');
      saveToStorage(CONSTANTS.STORAGE_INSERTED_KEY, this.$state.inserted);

      delete this.$props.inserted;
    }

    if (this.$props && this.$props.purchased) {
      let purchased = this.$props.purchased;

      this.$state.inserted -= purchased;
      saveToStorage(CONSTANTS.STORAGE_INSERTED_KEY, this.$state.inserted);

      delete this.$props.purchased;
    }

    if (this.$props && this.$props.change) {
      let change = this.$props.change;

      this.$state.inserted -= change;
      saveToStorage(CONSTANTS.STORAGE_INSERTED_KEY, this.$state.inserted);

      delete this.$props.change;
    }
  }

  template() {
    return CONTENT(this.$state.inserted);
  }
}
