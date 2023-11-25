import decrypt from "./decrypt";
import encrypt from "./encrypt";

function loadStorage(key) {
  if (!key) return null;

  const data = window.localStorage.getItem(key);

  if (!data || data === "null") return null;

  try {
    const value = decrypt(data);
    return typeof value === "string" ? JSON.parse(value) : value;
  } catch (err) {
    console.error(err);
  }
}

function setStorage(key, value) {
  value = JSON.stringify(value);

  if (value !== "null") value = encrypt(value);
  window.localStorage.setItem(key, value);
}

export default {
  loadStorage,
  setStorage,
};
