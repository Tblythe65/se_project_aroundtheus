export default class UserInfo {
  constructor(profNameSelect, profJobSelect, profAvatarSelect) {
    this._profNameSelect = profNameSelect;
    this._profJobSelect = profJobSelect;
    this._profAvatarSelect = profAvatarSelect;
  }

  getUserInfo() {
    return {
      name: this._profNameSelect.textContent,
      about: this._profJobSelect.textContent,
    };
  }

  setUserInfo(userData) {
    if (this._profNameSelect) {
      this._profNameSelect.textContent = userData.name;
    }
    if (this._profJobSelect) {
      this._profJobSelect.textContent = userData.about;
    }
  }

  setAvatar(avatar) {
    this._profAvatarSelect.src = avatar;
  }
}
