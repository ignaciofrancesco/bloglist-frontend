import { Button } from "@mui/material";
import PropTypes from "prop-types";
import { forwardRef, useImperativeHandle, useState } from "react";

const Togglable = forwardRef((props, refs) => {
  /* PROPS */
  const { buttonLabel } = props;

  /* STATE */
  const [isVisible, setIsVisible] = useState(false);

  /* REFS */
  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  /* HANDLERS */
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  /* VIEW */

  // Create the styles for showing and hiding the proper html
  const showWhenVisible = { display: isVisible ? "" : "none" };
  const showWhenNotVisible = { display: isVisible ? "none" : "" };

  return (
    <>
      <div style={showWhenNotVisible}>
        <Button variant="outlined" onClick={toggleVisibility}>
          {buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="text" onClick={toggleVisibility}>
          Cancel
        </Button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
