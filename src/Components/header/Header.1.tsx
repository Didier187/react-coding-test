import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Dropdown } from "./Header";
import Logo from "./Logo";
import Received from "../icons/Received";

export default function Header() {
  return (
    <div className={styles.container}>
      <div className={styles["layout"]}>
        <Logo />
        <div className={styles.right}>
          <Link to="/submissions-tasks">
            <Received />
            Submissions
          </Link>
          <Dropdown />
        </div>
      </div>
    </div>
  );
}
