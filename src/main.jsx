import { CssBaseline } from "@mui/material";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import GlobalStyle from "./components/GlobalStyle";
import "./index.css";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  // Provide the store with the react-redux
  <BrowserRouter>
    <Provider store={store}>
      <CssBaseline />
      <GlobalStyle />
      <App />
    </Provider>
  </BrowserRouter>,
);
