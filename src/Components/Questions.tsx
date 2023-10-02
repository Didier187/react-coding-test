import useSwr from "swr";
import styles from "../styles/Questions.module.css";
import { useBoundStore } from "../store";
import { useSearchParams } from "react-router-dom";
import Question from "./Question";

type Args = [string, { "x-auth-token": string }] & URL & HeadersInit;

const fetcher = (...args: Array<Args>) => {
  const [url, headers] = args[0];
  return fetch(url, {
    headers: headers,
  }).then((res) => res.json());
};
export interface QuestionProps {
  _id: string;
  level: string;
  prompt: string;
}

export default function Questions() {
  const [searchParams, setSearchParams] = useSearchParams();
  const filter = [
    { level: "Beginner" },
    { level: "Intermediate" },
    { level: "Advanced" },
  ];
  const token = useBoundStore((state) => state.token);
  const questionUrl =
    `${import.meta.env.VITE_SERVER_URL}/questions?` +
    new URLSearchParams({
      level: searchParams.get("level") ?? "",
    }).toString();

  const { data, error, isLoading } = useSwr(
    [questionUrl, { "x-auth-token": token }],
    fetcher
  );
  const resetSearchParams = () => {
    setSearchParams("");
  };

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  return (
    <div className={styles["questions-page"]}>
      <div className={styles.filters}>
        <strong>
          <span className="material-symbols-outlined">filter_alt</span> Filter
          by
        </strong>{" "}
        :
        <div className={styles["filter-btn-container"]}>
          {filter.map((item) => (
            <button
              onClick={() => setSearchParams(item)}
              key={item.level}
              className={
                styles["filter-btn"] +
                " " +
                (searchParams.get("level") === item.level
                  ? styles["filter-active"]
                  : "")
              }
            >
              {item.level}
            </button>
          ))}

          {searchParams.get("level") && (
            <button
              onClick={resetSearchParams}
              className={styles["reset-filter-btn"]}
            >
              <span className="material-symbols-outlined">clear</span>
            </button>
          )}
        </div>
      </div>
      <h2>Questions</h2>
      <ul>
        {data?.map((question: QuestionProps) => (
          <Question question={question} key={question._id} />
        ))}
      </ul>
    </div>
  );
}
