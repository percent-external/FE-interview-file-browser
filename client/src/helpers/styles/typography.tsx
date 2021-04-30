import { css } from "styled-components";
import { toVW } from "@helpers/methods";
import { isValidScreenType } from "@helpers/methods/screen"; // dependency cycle
import colors from "./colors";
import { screenMin } from "./breakpoints";

const font = {
  regular: "sans-serif",
};

interface Interface_Typography {
  [key: string]: {
    [key: string]: {
      fontFamily: string;
      fontSize: number;
      lineHeight: number;
      color?: string;
    };
  };
}

const typography: Interface_Typography = {
  "callout-1": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 36,
      lineHeight: 43,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 100,
      lineHeight: 100,
    },
  },
  "heading-1": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 32,
      lineHeight: 40,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 70,
      lineHeight: 80,
    },
  },
  "heading-2": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 32,
      lineHeight: 42,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 65,
      lineHeight: 80,
    },
  },
  "heading-3": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 22,
      lineHeight: 30,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 40,
      lineHeight: 54,
    },
  },
  "heading-4": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 15,
      lineHeight: 21,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 22,
      lineHeight: 30,
    },
  },
  "body-1": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 13,
      lineHeight: 19,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 25,
      lineHeight: 40,
    },
  },
  "body-2": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 13,
      lineHeight: 19,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 18,
      lineHeight: 26,
    },
  },
  "body-3": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 13,
      lineHeight: 19,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 15,
      lineHeight: 21,
    },
  },
  "body-4": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 11,
      lineHeight: 20,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 15,
      lineHeight: 21,
    },
  },
  "body-5": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 7,
      lineHeight: 16,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 11,
      lineHeight: 18,
    },
  },
  "body-5-tight": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 7,
      lineHeight: 8,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 11,
      lineHeight: 12,
    },
  },
  "gray-description": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 15,
      lineHeight: 21,
      color: colors.text.secondary,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 15,
      lineHeight: 21,
      color: colors.text.secondary,
    },
  },
  "number-on-pad": {
    mobile: {
      fontFamily: font.regular,
      fontSize: 40,
      lineHeight: 54,
      color: colors.text.black,
    },
    desktop: {
      fontFamily: font.regular,
      fontSize: 65,
      lineHeight: 80,
      color: colors.text.black,
    },
  },
};

/**
 * getFontSet - helper function that allows to get only single, specific set of font style
 * rules
 * @param {string} name
 * @param {string} screenType - either desktop or mobile
 * @param {string} screenTypeBase - base for VW calculation. In majority of cases
 * it should be equal to @param screenType, however sometimes you do require extra
 * flexibility in order to create pixel perfect design
 */

const getFontSet = (
  name: string,
  screenType = "mobile",
  screenTypeBase = screenType
) => {
  const choice = typography[name];
  const choiceScreenType = choice[screenType];

  if (!choice)
    throw new Error(
      'Something went wrong. Check the "name" @param. We could not find it.'
    );
  isValidScreenType(screenType);
  isValidScreenType(screenTypeBase);

  return css`
    font-family: ${choiceScreenType.fontFamily};
    color: ${choiceScreenType.color};
    font-size: ${toVW(choiceScreenType.fontSize, screenTypeBase)};
    line-height: ${toVW(choiceScreenType.lineHeight, screenTypeBase)};
  `;
};

/**
 * getTypography - helper function, behavior similar to SCSS @mixin
 * @param {string} name - enter the property name from the typography object
 */

const getTypography = (name: string) => {
  return css`
    ${getFontSet(name, "mobile")}

    ${screenMin("lg")} {
      ${getFontSet(name, "desktop")}
    }
  `;
};

export { getTypography, getFontSet };
