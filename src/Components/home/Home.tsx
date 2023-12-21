import styles from "./Home.module.css";
import Feature from "./Feature";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const navigate = useNavigate();
  const features = [
    {
      title: "Efficient Testing",
      description:
        "Streamline your hiring process with coding tests tailored to your needs.",
    },
    {
      title: "Customizable Assessments",
      description:
        "Create and customize coding assessments to evaluate candidates effectively.",
    },
    {
      title: "Insightful Reports",
      description:
        "Receive detailed reports to make informed decisions and hire the right talent.",
    },
  ];
  return (
    <div className={styles["container-landing"]}>
      <header className={styles.header}>
        <h1>Hire with Confidence</h1>
        <p>Send coding tests to prospective candidates effortlessly.</p>
      </header>
      <section className={styles.features}>
        {features.map((feature, index) => (
          <Feature
            key={index}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </section>
      <footer className={styles.footer}>
        <p>Ready to hire with confidence? Get started now!</p>
        <button
          className={styles.getStartedButton}
          onClick={() => {
            navigate("/questions");
          }}
        >
          Get Started
        </button>
      </footer>
    </div>
  );
}
