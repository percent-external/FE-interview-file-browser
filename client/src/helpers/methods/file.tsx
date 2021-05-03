export const getType = (
  typeName: "File" | "Directory" | undefined,
  name: string
) => {
  if (typeName === "File") {
    const arr = name.split(".");
    if (arr.length < 2) return typeName;
    return `${arr[arr.length - 1].toUpperCase()} File`;
  }
  return typeName;
};

export const numberWithCommas = (x: number) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const getFileSize = (size: number | null) => {
  return size ? numberWithCommas(Math.ceil(size / 1024)) + "KB" : null;
};
