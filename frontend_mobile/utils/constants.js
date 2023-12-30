export const SOCIAL_MEDIA_PLATFORMS = ["fb", "ig", "snapchat", "tiktok", "wa"];
export const SOCIAL_MEDIA_PLATFORMS_NAMES = {
  fb: "Facebook",
  ig: "Instagam",
  snapchat: "Spapchat",
  tiktok: "Tik tok",
  wa: "WhatsApp",
};
export const TIME_FORMAT = "hh:mm";
export const DATE_FORMAT = "dd.mm.yyyy";
export const TIME_REGEX = /^(?:[01]\d|2[0-3]):[0-5]\d$/;
export const DATE_REGEX = /^\d{2}\.\d{2}\.\d{4}$/;
export const successColor = "rgb(52, 235, 131)";
export const errorColor = "rgb(235, 58, 52)";
export const serverURL = "127.0.0.1:8000";
export const baseURL = `http://${serverURL}`;
export const webSocketURL = `ws://${serverURL}/ws/chat/`;
