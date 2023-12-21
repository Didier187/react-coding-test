import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { SkeletonTheme } from "react-loading-skeleton";
import { theme } from "../src/utils/skeletonTheme";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <SkeletonTheme
    baseColor={theme.baseColor}
    highlightColor={theme.highlightColor}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SkeletonTheme>
);
