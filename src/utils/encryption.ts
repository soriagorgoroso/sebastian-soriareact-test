import CryptoJS from "crypto-js";

const secretKey = "your-secret-key";

export const encryptData = (data: string): string => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

export const decryptData = (encryptedData: string): string => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
