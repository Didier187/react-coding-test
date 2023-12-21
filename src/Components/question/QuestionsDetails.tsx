import { Sandpack } from "@codesandbox/sandpack-react";
import { Navigate, useParams } from "react-router-dom";
import useSwr from "swr";
import { useBoundStore } from "../../store";
import styles from "./Questions.module.css";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import AddTask from "../icons/AddTask";
import AddedTask from "../icons/AddedTask";

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
  const questions = useBoundStore((state) => state.questions);

  const addQuestionToAssignment = useBoundStore((state) => state.addQuestion);
  const removeQuestionFromAssignment = useBoundStore(
    (state) => state.removeQuestion
  );

  const handleAddQuestion = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    if (questions.includes(data)) {
      removeQuestionFromAssignment(data._id);
    } else {
      addQuestionToAssignment(data);
    }
  };

  const isInAssignment = questions.some((item) => item._id === data?._id);

  if (isLoading) return <div>loading...</div>;
  if (error) return <Navigate to="/invalid-question-id" />;
  /*
Allow user to send the question from this page
Allow user to send the question from questions page


*/
  return (
    <div className={styles["questions-page"]}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
        className={styles.headline}
      >
        <h2>Question Details</h2>
        <button
          onClick={handleAddQuestion}
          className={
            styles["detail-add-btn"] +
            " " +
            `${isInAssignment && styles.selected}`
          }
        >
          {isInAssignment ? <AddedTask /> : <AddTask />}
          {isInAssignment ? "Remove from " : "Add to"} my questions
        </button>
      </div>
      <span>
        Level: <span>{data?.level}</span>
      </span>
      <div>
        Prompt:
        <div dangerouslySetInnerHTML={{ __html: data?.prompt }} />
      </div>
      <h2 className={styles.headline}>Starter files</h2>
      <Sandpack
        template="react"
        files={data.files}
        theme={"auto"}
        options={{
          showLineNumbers: true,
          readOnly: true,
          wrapContent: true,
        }}
      />
    </div>
  );
}
