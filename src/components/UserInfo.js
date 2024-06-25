export default class UserInfo {
  constructor(profNameSelect, profJobSelect) {
    this._profNameSelect = profNameSelect;
    this._profJobSelect = profJobSelect;
  }

  getUserInfo() {
    return {
      title: this._profNameSelect.textContent,
      description: this._profJobSelect.textContent,
    };
  }

  setUserInfo(userData) {
    if (this._profNameSelect) {
      this._profNameSelect.textContent = userData.title;
    }
    if (this._profJobSelect) {
      this._profJobSelect.textContent = userData.description;
    }
  }
}
