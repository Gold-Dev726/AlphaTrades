class StoreClass {
  get(key) {
    return localStorage.getItem(key);
  }

  set(key, value) {
    localStorage.setItem(key, value);
  }

  remove(key) {
    localStorage.removeItem(key);
  }

  clearAll() {
    localStorage.clear();
  }
}

export default new StoreClass();
