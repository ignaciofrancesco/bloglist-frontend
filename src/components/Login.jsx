import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../reducers/userReducer";

const Login = (props) => {
  /* REDUX */
  const dispatch = useDispatch(); // to dispatch redux actions to change the state

  /* STATE */
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (event) => {
    event.preventDefault();
    // HERE DISPATCH A REDUX ACTION TO login USER
    dispatch(loginUser(username, password));
    // Set new state
    setUsername("");
    setPassword("");
  };

  return (
    <Box
      component="div"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h2>Please, login</h2>
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root, .MuiButton-root": { width: "20rem" },
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
        noValidate
        onSubmit={handleLogin}
        data-testid="login-form"
      >
        <div>
          <TextField
            id="username"
            type="text"
            label="username"
            variant="outlined"
            size="small"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            data-testid="username"
          />
        </div>
        <div>
          <TextField
            id="password"
            type="password"
            value={password}
            label="password"
            variant="outlined"
            size="small"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            data-testid="password"
          />
        </div>
        <Button variant="contained" type="submit">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
