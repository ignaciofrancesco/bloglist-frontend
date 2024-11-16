const Notification = (props) => {
  const { notification } = props;

  if (notification === null) {
    return null;
  }

  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
