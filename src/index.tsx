import ReactDOM from "react-dom/client";
import "./index.scss";
import "./assets/scss/variable.css";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/index";
import { initAxios } from "./services/axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;

initAxios(BASE_URL);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
