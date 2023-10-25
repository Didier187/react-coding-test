import { Navigate, useParams } from "react-router-dom";
import useSwr from "swr";
import { useBoundStore } from "../../store";
import styles from "./Questions.module.css";
import PreviewFileStructure from "./PreviewFileStructure";
import useQuestionPreviewStandalone from "../../store/questionPreviewStandalone";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ace";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import AddedTask from "../icons/AddedTask";
import AddTask from "../icons/AddTask";
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

  const currentFile = useQuestionPreviewStandalone(
    (state) => state.currentFileContents
  );
  const isInAssignment = questions.some((item) => item._id === data?._id);

  if (isLoading) return <div>loading...</div>;
  if (error) return <Navigate to="/invalid-question-id" />;

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
      <div className={styles["file-preview"]}>
        <div className={styles["question-files"]}>
          <PreviewFileStructure structure={data?.initialFiles} path={[]} />
        </div>
        <div className={styles["question-file-contents"]}>
          <Editor currentFile={currentFile} />
        </div>
      </div>
    </div>
  );
}

const Editor = ({ currentFile }: { currentFile: string }) => {
  return (
    <AceEditor
      mode="javascript"
      theme="monokai"
      name="code-preview"
      fontSize={13}
      showPrintMargin={false}
      showGutter={true}
      highlightActiveLine={true}
      value={currentFile}
      style={{ width: "100%", height: "100%" }}
      setOptions={{
        showLineNumbers: true,
        tabSize: 2,
        blockScrolling: Infinity,
      }}
      readOnly={true}
    />
  );
};
