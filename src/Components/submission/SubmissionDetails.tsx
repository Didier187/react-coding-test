import useSWR from "swr";
import { useParams } from "react-router-dom";
import { useBoundStore } from "../../store";
// import styles from "./Submissions.module.css";

type Args = [string, { "x-auth-token": string }] & URL & HeadersInit;

const fetcher = (...args: Array<Args>) => {
  const [url, headers] = args[0];
  console.log(url, headers);
  return fetch(url, {
    headers: headers,
  }).then((res) => res.json());
};

export default function SubmissionDetails() {
  const { id } = useParams();
  const token = useBoundStore((state) => state.token);
  const { data, error, isLoading } = useSWR(
    [
      `${import.meta.env.VITE_SERVER_URL}/tasks/submissions/${id}`,
      { "x-auth-token": token },
    ],
    fetcher
  );
  console.log(data);
  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error getting the submissions...</div>;
  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
