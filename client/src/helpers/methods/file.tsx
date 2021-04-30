export const getType = (typeName: string, name: string) => {
  if (typeName === "File") {
    const arr = name.split(".");
    if (arr.length < 2) return typeName;
    return `${arr[arr.length - 1].toUpperCase()} File`;
  }
  return typeName;
};
