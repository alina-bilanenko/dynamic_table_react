import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({
  buttonClass,
  cellSize,
  propertyStyle = 'left',
  valueStyle = cellSize,
  text = '+',
  buttonClick,
}) => {
  return (
    <button
      className={buttonClass}
      style={{
        width: cellSize,
        height: cellSize,
        [propertyStyle]: valueStyle,
      }}
      onClick={buttonClick}
    >
      {text}
    </button>
  );
};

Button.propTypes = {
  buttonClass: PropTypes.string,
  cellSize: PropTypes.number,
  propertyStyle: PropTypes.string,
  valueStyle: PropTypes.number,
  text: PropTypes.string,
  buttonClick: PropTypes.func,
};
