function getStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

function setStorage(key, value) {
  const valueStr = JSON.stringify(value);
  localStorage.setItem(key, valueStr);
}

function removeStorage(key) {
  localStorage.removeItem(key);
}

export default {
  getStorage,
  setStorage,
  removeStorage
}