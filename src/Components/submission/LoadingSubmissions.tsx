// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "./Submissions.module.css";

export default function LoadingSubmissions() {
  return (
    <div className={styles.page}>
      <h2>
        <Skeleton width={230} />
      </h2>
      <div className={styles.filters}>
        <div className={styles.tabs}>
          <Skeleton width={35} className={styles["filter-btn-loading"]} />
          <Skeleton width={100} className={styles["filter-btn-loading"]} />
          <Skeleton width={100} className={styles["filter-btn-loading"]} />
          <Skeleton width={100} className={styles["filter-btn-loading"]} />
        </div>
        <div className={styles["date-filters"]}>
          <Skeleton width={90} />
          <Skeleton width={20} className={styles["filter-btn-loading"]} />
          <Skeleton width={20} className={styles["filter-btn-loading"]} />
        </div>
      </div>

      <Skeleton height={235} count={2} className={styles.cards} />
    </div>
  );
}
