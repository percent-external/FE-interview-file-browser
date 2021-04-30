/**
 * BASE_SCREEN_SIZE - our designs are created
 * for 2 viewport widths: 1440, and 360. In order to keep all
 * the relations between UI elements as designed, I am using those
 * values as a base for the space and size related calculations
 */
const BASE_SCREEN_SIZE: { [key: string]: number } = Object.freeze({
  desktop: 1440,
  mobile: 360,
});
const SCREEN_SIZES = Object.keys(BASE_SCREEN_SIZE);

const isValidScreenType = (screenType: string) => {
  if (!SCREEN_SIZES.includes(screenType))
    throw new Error(
      `The @param screenSize can only have the following values: ${Object.keys(
        BASE_SCREEN_SIZE
      )}. Value received: ${screenType}`
    );
};

const getScreenTypeSize = (screenType: string) => BASE_SCREEN_SIZE[screenType];

export { isValidScreenType, getScreenTypeSize };
