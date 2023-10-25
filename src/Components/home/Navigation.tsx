import { Link, Outlet } from "react-router-dom";
import Logo from "../header/Logo";
import styles from "./Home.module.css";

export default function Home() {
  return (
    <div>
      <div className={styles.container}>
        <Logo />
        <nav>
          <ul className={styles["nav-container"]}>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/login">Account</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className={styles["main-content"]}>
        <Outlet />
      </div>
    </div>
  );
}
