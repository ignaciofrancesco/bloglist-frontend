import { Alert } from "@mui/material";
import { useSelector } from "react-redux";

const Notification = () => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return <div style={{ height: "2.2rem" }}></div>;
  }

  return (
    <div style={{ height: "2.2rem" }}>
      <Alert severity={`${notification.messageType}`}>
        {notification.message}
      </Alert>
    </div>
  );
};

export default Notification;
