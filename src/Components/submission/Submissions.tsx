import useSwr from "swr";
import { useBoundStore } from "../../store";
import styles from "./Submissions.module.css";
import SubmissionCard, { SubmissionI } from "./SubmissionCard";
import { useSearchParams } from "react-router-dom";
import LoadingSubmissions from "./LoadingSubmissions";
import Arrow from "../icons/Arrow";
type Args = [string, { "x-auth-token": string }] & URL & HeadersInit;

const fetcher = (...args: Array<Args>) => {
  const [url, headers] = args[0];
  return fetch(url, {
    headers: headers,
  }).then((res) => res.json());
};
const tabs = [
  { stat: "all" },
  { stat: "submitted" },
  { stat: "pending" },
  { stat: "archived" },
];

export default function Submissions() {
  const [searchParams, setSearchParams] = useSearchParams({
    stat: "all",
    order: "newest",
  });
  const token = useBoundStore((state) => state.token);

  const updateSearchParams = (newParams: {
    stat: string | null;
    order?: string;
  }) => {
    setSearchParams((params) => {
      const updatedParams = new URLSearchParams(params);
      Object.entries(newParams).forEach(([key, value]) => {
        if (value) {
          updatedParams.set(key, value);
        } else {
          updatedParams.delete(key);
        }
      });
      return updatedParams.toString();
    });
  };
  const submissionUrl =
    `${import.meta.env.VITE_SERVER_URL}/tasks/me?` +
    new URLSearchParams({
      stat: searchParams.get("stat") ?? "",
      order: searchParams.get("order") ?? "",
    }).toString();

  const { data, error, isLoading } = useSwr(
    [submissionUrl, { "x-auth-token": token }],
    fetcher
  );
  console.log(searchParams);
  if (isLoading) return <LoadingSubmissions />;
  if (error) return <div>error getting the submissions...</div>;

  return (
    <div className={styles["page"]}>
      <h2>My tasks and Submissions</h2>
      <div className={styles.filters}>
        <div className={styles.tabs}>
          {tabs.map((item) => (
            <button
              onClick={() => updateSearchParams(item)}
              key={item.stat}
              className={
                searchParams.get("stat") === item.stat ? styles.active : ""
              }
            >
              {item.stat}
            </button>
          ))}
        </div>
        <div className={styles["date-filters"]}>
          <strong>Filter by date:</strong>
          <button
            className={styles["filter-btn-date"]}
            onClick={() =>
              updateSearchParams({
                stat: searchParams.get("stat"),
                order: "newest",
              })
            }
          >
            <Arrow direction="up" />
          </button>
          <button
            className={styles["filter-btn-date"]}
            onClick={() =>
              updateSearchParams({
                stat: searchParams.get("stat"),
                order: "oldest",
              })
            }
          >
            <Arrow direction="down" />
          </button>
        </div>
      </div>

      <div>
        {data.map((item: SubmissionI) => (
          <SubmissionCard key={item._id} {...item} />
        ))}
      </div>
    </div>
  );
}
