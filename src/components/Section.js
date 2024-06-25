export default class Section {
  constructor({ data, renderer }, containerSelector) {
    this._data = data;
    this._renderer = renderer;
    this._containerSelector = containerSelector;
  }

  renderItems() {
    this._data.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const newCard = this._renderer(item);
    this._containerSelector.prepend(newCard);
  }
}
