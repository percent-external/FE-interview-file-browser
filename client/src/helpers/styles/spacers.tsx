import { toVW } from "@helpers/methods";

const SPACER_BASE = 8; // the designs use this value as base unit

/**
 * spaceBase - helper method to create a valid spacing base required to
 * calculate paddings, margins, etc. to match the design system (8 - based)
 *
 * @param {number} multiplier - the multiplier for the base value
 * @returns {number} - the user input multiplied by base spacer and remified
 */

const spaceBase = (multiplier: number) => {
  const isValidValue = multiplier % 1 === 0 || multiplier % 0.5 === 0;

  if (!isValidValue)
    throw new Error(
      "The spacer helper input is wrong. Please use halves or fulls: 0.5, 1, 2"
    );
  return multiplier * SPACER_BASE;
};

const spaceVW = (multiplier: number, screenType: string) =>
  toVW(spaceBase(multiplier), screenType);

/**
 * spaceMb & spaceDt - helper methods designed to return a proper, scallable (VW based) space amount
 * for attributes like margin, padding, line-height, etc.
 *
 * They both use a spaceVW helper as a calculator.
 *
 * "Mb" - stands for mobile screen type. It's not a breakpoint.
 * "Dt" - stands for desktop screen type. It's not a breakpoint.
 *
 * How it should be used?
 *
 * istead of a single attribute:
 * .myClass {
 *  margin: 24px;
 * }
 *
 * you should use the following setup:
 * .myClass-vw {
 *  margin: ${spaceMb(3)}; 3 * 8 (our system) / 360 (source mobile screen width in Figma) * 100
 *
 *  ${screenMin('lg')} {
 *    margin: ${spaceDt(3)}; 3 * 8 (our system) / 360 (source desktop screen width in Figma) * 100
 *  }
 * }
 *
 * A single helper wasn't created, because it's not flexbile enough for in-CSS usage.
 *
 */

/**
 * spaceMb - returns VW values for mobile screens (see screen.js more more details on pixel size used for calc.)
 * @param {number} - only halves and full numbers: 0.5, 1, 1.5, 13.5 ...
 * @returns {string} - VW value ready for in-CSS usage
 */
const spaceMb = (multiplier: number) => spaceVW(multiplier, "mobile");

/**
 * spaceDt - returns VW values for desktop screens (see screen.js more more details on pixel size used for calc.)
 * @param {number} - only halves and full numbers: 0.5, 1, 1.5, 13.5 ...
 * @returns {string} - VW value ready for in-CSS usage
 */
const spaceDt = (multiplier: number) => spaceVW(multiplier, "desktop");

export { spaceMb, spaceDt };
