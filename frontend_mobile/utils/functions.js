import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

export const printSuccessMessage = (
  response,
  setSuccessMessageCallback,
  successMessage
) => {
  if (response.status >= 200 && response.status < 300) {
    setSuccessMessageCallback(successMessage);
  }
};

export const transformEventData = (eventData) => {
  const newEventData = {};
  Object.entries(eventData).forEach(([key, value]) => {
    if (key == "start_date" || key == "end_date") {
      const [d, t] = value.split(" ");
      newEventData[key == "start_date" ? "startDate" : "endDate"] = d;
      newEventData[key == "start_date" ? "startTime" : "endTime"] = t;
    } else {
      newEventData[key] = value;
    }
  });
  return newEventData;
};

export const mergeObjectsWithArrays = (o1, o2) => {
  const newO = o1;
  Object.entries(o2).forEach(([key, value]) => {
    if (o1.hasOwnProperty(key)) {
      const o1Value = o1[key];
      const o2Value = value;
      newO[key] = mergeArrays(o1Value, o2Value);
    } else {
      newO[key] = value;
    }
  });
  return newO;
};

export const mergeArrays = (a1, a2) => {
  let mergedArray = [];
  if (a1 && a2) {
    mergedArray = a1.concat(a2);
  } else if (a1) {
    mergedArray = a1;
  } else if (a2) {
    mergedArray = a2;
  }
  return mergedArray;
};

export const isEmptyObject = (o) => Object.keys(o).length === 0;

export const getStringErrorMessage = (errorObj) => {
  let message = "";
  Object.entries(errorObj).forEach(([key, value]) => {
    value.forEach((item) => {
      message += `${item} (${key}), `;
    });
  });
  return message;
};

export const isTokenExpired = (parsedAuthTokens) => {
  const tokenData = jwtDecode(parsedAuthTokens.access);
  const expirationDate = dayjs.unix(tokenData.exp);
  const nowDate = dayjs();
  return expirationDate.isBefore(nowDate);
}
