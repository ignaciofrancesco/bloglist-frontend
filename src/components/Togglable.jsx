import { forwardRef, useState, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
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
          New blog
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

export default Togglable;
