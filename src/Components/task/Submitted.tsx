import styles from "./TaskScreen.module.css";
import EmptyBattery from "../icons/EmptyBattery";
export default function Submitted({ message }: { message: string }) {
  return (
    <div className={styles["submitted-container"]}>
      <div>
        <strong>{message}</strong>
        <EmptyBattery />
      </div>
    </div>
  );
}
