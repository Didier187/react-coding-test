import { FieldError } from "react-hook-form";
import styles from "./FormError.module.css";

interface Props {
  isVisible: FieldError | undefined;
  errorMessage: string;
}

export default function FormError({ isVisible, errorMessage }: Props) {
  return <>{isVisible && <span className={styles.error} role="alert">{errorMessage}</span>}</>;
}
