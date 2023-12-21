import styles from "./Home.module.css";
interface Props {
  title: string;
  description: string;
}
export default function Feature(props: Props) {
  const { title, description } = props;
  return (
    <div className={styles.feature}>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
  );
}
