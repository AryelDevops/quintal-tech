import CryptoJS from "crypto-js/core";
import AES from "crypto-js/aes";

const SECRET_KEY = "123";

const decrypt = function decrypt(data, key = SECRET_KEY) {
  if (!data) return;
  let parsed = data;

  const decrypted = AES.decrypt(data, key);
  parsed = JSON.parse(decrypted.toString(CryptoJS.enc.Utf8));

  return parsed;
};

export default decrypt;
