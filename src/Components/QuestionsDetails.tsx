import { useParams } from "react-router-dom";
import useSwr from "swr";
import { useBoundStore } from "../store";
import { Navigate } from "react-router-dom";
import styles from "../styles/Questions.module.css";


type Args = [string, { "x-auth-token": string }] & URL & HeadersInit;

const fetcher = (...args: Array<Args>) => {
  const [url, headers] = args[0];
  return fetch(url, {
    headers: headers,
  }).then((res) => res.json());
};

export default function QuestionsDetails() {
  const { id } = useParams();
  const token = useBoundStore((state) => state.token);
  const { data, error, isLoading } = useSwr(
    [
      `${import.meta.env.VITE_SERVER_URL}/questions/${id}`,
      { "x-auth-token": token },
    ],
    fetcher
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <Navigate to="/invalid-question-id" />;

  return (
    <div className={styles["questions-page"]}>
      <h2>Question Details</h2>
      <span>
        Level: <span>{data?.level}</span>
      </span>
      <div>
        Prompt:
        <div dangerouslySetInnerHTML={{ __html: data?.prompt }} />
      </div>
    </div>
  );
}
