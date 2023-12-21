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
      <div className={styles.tabs}>
        <Skeleton width={35} className={styles["filter-btn-loading"]} />
        <Skeleton width={100} className={styles["filter-btn-loading"]} />
        <Skeleton width={100} className={styles["filter-btn-loading"]} />
        <Skeleton width={100} className={styles["filter-btn-loading"]} />
      </div>

      <Skeleton height={235} count={2} className={styles.cards} />
    </div>
  );
}
