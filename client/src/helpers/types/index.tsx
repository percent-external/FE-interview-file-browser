import PropTypes from "prop-types";

export const TYPE_COMPONENT = PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
  PropTypes.elementType,
]);
