class Storage {
  static getItem(key: string): any | null {
    const data = localStorage.getItem(`${process.env.REACT_APP_NAME}:${key}`);
    return data ? JSON.parse(data) : null;
  }

  static setItem(key: string, value: any): void {
    localStorage.setItem(
      `${process.env.REACT_APP_NAME}:${key}`,
      JSON.stringify(value)
    );
  }

  static clear() {
    localStorage.clear();
  }
}

export default Storage;
