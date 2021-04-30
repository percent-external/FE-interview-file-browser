const breakpoints: { [key: string]: number } = {
  xs: 320,
  sm: 540,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

const breakpoint = (type: string, size: string) => {
  if (type !== "min" && type !== "max")
    throw new Error('The media call type can only take "min" or "max" value.');

  return `@media screen and (${type}-width: ${
    type === "min" ? breakpoints[size] : breakpoints[size] - 1
  }px)`;
};

const screenMin = (size: string) => breakpoint("min", size);
const screenMax = (size: string) => breakpoint("max", size);

export { screenMin, screenMax, breakpoints };
