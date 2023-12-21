import { Outlet } from "react-router-dom";
import Header from "../header/Header.1";
import styles from "./MainFrame.module.css";
export default function MainFrame() {
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Outlet />
      </div>
    </>
  );
}
