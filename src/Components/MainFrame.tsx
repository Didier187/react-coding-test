import { Outlet } from "react-router-dom";
import Header from "./Header.1";
export default function MainFrame() {
  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}
