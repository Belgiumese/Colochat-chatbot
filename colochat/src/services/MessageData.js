// Expects ID, action, text, source
export default (data) => {
  // For now, just create a clone of the object. Later, will add functions
  // and other class-based things to this
  console.log(data);
  const instance = Object.assign({}, data);
  return instance;
};