const idMap = new Map();

export default {
  getUniqueId(key) {
    const lastId = idMap.get(key) || -1;
    idMap.set(key, lastId + 1);
  },

  getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
  },

  getRandomInt(min, max) {
    return Math.round(this.getRandomNum(min, max));
  },

  getRandArrayVal(arr) {
    const i = this.getRandomInt(0, arr.length - 1);
    console.log(`i: ${i}`);
    return arr[i];
  }
};