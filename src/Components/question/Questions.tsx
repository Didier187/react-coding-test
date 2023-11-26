import { useSearchParams } from "react-router-dom";
import useSwr from "swr";
import { useBoundStore } from "../../store";
import Question from "./Question";
import styles from "./Questions.module.css";
import Filter from "../icons/Filter";
import Clear from "../icons/Clear";
import Loading from "./Loading";

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
  
  if (isLoading) return <Loading/>;
  if (error) return <div>error getting the questions...</div>;
  return (
    <div className={styles["page"]}>
      <div className={styles.filters}>
        <strong>
          <Filter /> Filter by
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
              <Clear />
            </button>
          )}
        </div>
      </div>
      <h2>Questions</h2>
      <p>Click on a question to view details</p>
      <ul>
        {data?.map((question: QuestionProps) => (
          <Question question={question} key={question._id} />
        ))}
      </ul>
    </div>
  );
}
