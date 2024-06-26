export default class Section {
  constructor({ data, renderer }, container) {
    this._data = data;
    this._renderer = renderer;
    this._container = container;
  }

  renderItems() {
    this._data.forEach((item) => {
      this.addItem(item);
    });
  }

  addItem(item) {
    const renderedItem = this._renderer(item);
    this._container.prepend(renderedItem);
  }
}
