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

  const currentFile = useQuestionPreviewStandalone(
    (state) => state.currentFileContents
  );

  if (isLoading) return <div>loading...</div>;
  if (error) return <Navigate to="/invalid-question-id" />;

  return (
    <div className={styles["questions-page"]}>
      <h2 className={styles.headline}>Question Details</h2>
      <span>
        Level: <span>{data?.level}</span>
      </span>
      <div>
        Prompt:
        <div dangerouslySetInnerHTML={{ __html: data?.prompt }} />
      </div>
      <h2 className={styles.headline}>
        Starter files
      </h2>
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
      showPrintMargin={true}
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
