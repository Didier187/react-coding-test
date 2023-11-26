import styles from "./TaskScreen.module.css";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { theme } from "../../utils/skeletonTheme";
export default function Loading() {
  return (
    <SkeletonTheme
      baseColor={theme.baseColor}
      highlightColor={theme.highlightColor}
    >
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles["header-container"]}>
            <p>
              <Skeleton width={300} />
            </p>
            <Skeleton
              width={100}
              height={32}
              className={styles["submit-btn"]}
            />
          </div>
        </div>
        <div className={styles["main"]}>
          <div className={styles["sandbox-container"]}>
            <Skeleton height={750} width={650} />
            <Skeleton height={750} width={650} />
          </div>
        </div>
      </div>
    </SkeletonTheme>
  );
}
