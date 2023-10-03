import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles["not-found-page"]}>
      <div>
        <h1>
          4
          <span className="material-symbols-outlined">
            sentiment_very_dissatisfied
          </span>
          4
        </h1>
        <p>Page Not Found</p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
