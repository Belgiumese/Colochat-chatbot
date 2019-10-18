// Expects ID, action, text, source
export default (data) => {
  // For now, just create a clone of the object. Later, will add functions
  // and other class-based things to this
  const instance = Object.assign({}, data);
  return instance;
};