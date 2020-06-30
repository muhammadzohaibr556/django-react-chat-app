export const updateObject = (oldObject, updatedProperties) => {
  return {
    ...oldObject,
    ...updatedProperties,
  };
};

export const DataURLtoFile = (dataurl, filename) => {
  let arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
};

export const endpoint = "http://127.0.0.1:8000";
export const clientEndpoint = "http://localhost:3000";

export const renderTimestamp = (timestamp) => {
  let prefix = "";
  const timeDiff = Math.round(
    (new Date().getTime() - new Date(timestamp).getTime()) / 60000
  );
  if (timeDiff < 1) {
    // less than one minute ago
    prefix = "just now...";
  } else if (timeDiff < 60 && timeDiff > 1) {
    // less than sixty minutes ago
    prefix = `${timeDiff} minutes ago`;
  } else if (timeDiff < 24 * 60 && timeDiff > 60) {
    // less than 24 hours ago
    prefix = `${Math.round(timeDiff / 60)} hours ago`;
  } else if (timeDiff < 31 * 24 * 60 && timeDiff > 24 * 60) {
    // less than 7 days ago
    prefix = `${Math.round(timeDiff / (60 * 24))} days ago`;
  } else {
    prefix = `${new Date(timestamp)}`;
    prefix = prefix.length > 24 ? prefix.substring(0, 24) : prefix;
  }
  return prefix;
};
