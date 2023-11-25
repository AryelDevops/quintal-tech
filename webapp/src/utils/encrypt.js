import AES from "crypto-js/aes";

const SECRET_KEY = "123";

const encrypt = function encrypt(data) {
  if (typeof data !== "string") return;

  let parsed = data;

  const encrypted = AES.encrypt(data, SECRET_KEY);
  parsed = encrypted.toString();

  return parsed;
};

export default encrypt;
