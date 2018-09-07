const idMap = new Map();

export default {
  getUniqueId(key) {
    const lastId = idMap.get(key) || -1;
    idMap.set(key, lastId + 1);
  }
};