import { Link, Outlet, useNavigate } from "react-router-dom";
import Logo from "../header/Logo";
import styles from "./Home.module.css";
import { useBoundStore } from "../../store";

export default function Home() {
  const navigate = useNavigate();
  const alreadyLoggedIn = useBoundStore((state) => state.validLogin);
  const handleAcountClick = () => {
    if (alreadyLoggedIn) {
      navigate("/questions");
    } else {
      navigate("/login");
    }
  };

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
              <button onClick={handleAcountClick}>Account</button>
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
