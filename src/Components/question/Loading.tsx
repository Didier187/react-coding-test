import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Questions.module.css";
import { theme } from "../../utils/skeletonTheme";

export default function Loading() {
  return (
    <SkeletonTheme
      baseColor={theme.baseColor}
      highlightColor={theme.highlightColor}
    >
      <div className={styles.page}>
        <div className={styles.filters}>
          <strong>
            <Skeleton width={20} />
            <Skeleton width={75} />
          </strong>
          :
          <div className={styles["filter-btn-container"]}>
            <Skeleton width={100} className={styles["filter-btn-muted"]} />
            <Skeleton width={100} className={styles["filter-btn-muted"]} />
            <Skeleton width={100} className={styles["filter-btn-muted"]} />
          </div>
        </div>
        <h2>
          <Skeleton width={94} />
        </h2>
        <p>
          <Skeleton width={200} />
        </p>
        <ul className={styles["questions-container"]}>
          <Skeleton
            height={285}
            count={4}
            className={styles["question"] + " " + styles["question-loading"]}
          />
        </ul>
      </div>
    </SkeletonTheme>
  );
}
