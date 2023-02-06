import store from 'store';

class Storage {
  private static _instance: Storage;

  constructor() {
    if (Storage._instance) return Storage._instance;
  }

  public static get instance() {
    if (!Storage._instance) Storage._instance = new Storage();

    return Storage._instance;
  }

  public setItem(key: string, value: unknown) {
    store.set(key, value);
  }

  public getItem(key: string, defaultValue?: unknown) {
    return store.get(key, defaultValue);
  }
}

export default Storage;
