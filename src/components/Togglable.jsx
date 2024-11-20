import { forwardRef, useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";

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
        <button type="button" onClick={toggleVisibility}>
          {buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button type="button" onClick={toggleVisibility}>
          Cancel
        </button>
      </div>
    </>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
};

Togglable.displayName = "Togglable";

export default Togglable;
