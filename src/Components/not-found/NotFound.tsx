import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";
import Dissatisfied from "../icons/Dissatisfied";

export default function NotFound() {
  return (
    <div className={styles["not-found-page"]}>
      <div>
        <h1>
          4
          <Dissatisfied />4
        </h1>
        <p>Page Not Found</p>
        <Link to="/">Go Home</Link>
      </div>
    </div>
  );
}
