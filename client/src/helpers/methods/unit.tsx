import { isValidScreenType, getScreenTypeSize } from "./screen";

/**
 * toVW - a helper method, that returns
 * @param {number} - pixel based value
 * @param {string} - screenType: either desktop or mobile
 * @returns {string | number} - string vw value for CSS OR number value for calculations
 */

export const toVW = (valuePx: number, screenType = "mobile") => {
  isValidScreenType(screenType);

  if (Number.isNaN(valuePx))
    throw new Error(
      `@param valuePx or @param screenType is not a number. Received value: ${valuePx}`
    );

  const screenTypeSize = getScreenTypeSize(screenType);
  const valueVW = (valuePx / screenTypeSize) * 100;

  return `${valueVW}vw`;
};
