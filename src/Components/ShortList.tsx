import { useBoundStore } from "../store";
import Question from "./Question";
import styles from "../styles/ShortList.module.css";

export default function ShortList() {
  const shortList = useBoundStore((state) => state.shortList);
  return (
    <div className={styles.page}>
      <h2>Short List</h2>
      <ul>
        {shortList.map((item, index) => (
          <Question question={item} key={`${index}-${item._id}`} />
        ))}
      </ul>
    </div>
  );
}
