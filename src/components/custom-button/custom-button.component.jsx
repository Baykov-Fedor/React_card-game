import React from "react";

import "./custom-button.styles.scss";

const CustomButton = ({ disabled, children, ...otherProps }) => (
  <button
    disabled={disabled}
    className={`${disabled ? "disabled" : null} custom-button`}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
