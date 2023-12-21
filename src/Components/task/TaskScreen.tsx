import { useSearchParams } from "react-router-dom";
import styles from "./TaskScreen.module.css";
import {
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore

import { SandpackFileExplorer } from "sandpack-file-explorer";
import axios from "axios";
import useTaskStore from "../../store/taskStore";
import { ReactNode, useEffect } from "react";
import Done from "../icons/Done";
import Submitted from "./Submitted";
import Loading from "./Loading";

function Task() {
  const [searchParam] = useSearchParams();

  const fetchTask = useTaskStore((state) => state.fetch);

  const assignment = useTaskStore((state) => state.assignment);

  const error = useTaskStore((state) => state.error);

  const isFetching = useTaskStore((state) => state.isFetching);

  const { sandpack } = useSandpack();
  const { files } = sandpack;

  useEffect(() => {
    fetchTask(searchParam.get("ttkn"));
  }, [searchParam, fetchTask]);

  const handleSubmitAssignment = async () => {
    if (!assignment) return;

    const submittable = assignment.assignedQuestion[0];
    // create new files object with filtered items
    const withoutEmptyDirectories = Object.keys(files)
      .filter((item) => files[item].code !== ".emptyDir")
      .reduce(
        (obj, key) => {
          obj[key] = files[key];
          return obj;
        },
        {} as Record<
          string,
          {
            code: string;
            active?: boolean;
            hidded?: boolean;
          }
        >
      );

    axios
      .post(
        `${import.meta.env.VITE_SERVER_URL}/tasks/submit/${assignment._id}`,
        {
          assignedQuestion: [
            {
              level: submittable.level,
              prompt: submittable.prompt,
              _id: submittable._id,
              files: {
                ...withoutEmptyDirectories,
              },
            },
          ],
        }
      )
      .then(function (response) {
        // TODO notify the user of success
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);

        // TODO notify the user of the error
      });
  };
  if (isFetching) return <Loading />;
  if (error) return <Submitted message={error} />;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles["header-container"]}>
          <p>
            Hi <strong>{assignment?.name.split(" ")[0]}</strong> , welcome to
            your assignment!{" "}
          </p>
          <button
            onClick={async () => {
              await handleSubmitAssignment();
            }}
          >
            <Done />
            Submit
          </button>
        </div>
      </div>
      <div className={styles["main"]}>
        <SandpackFileExplorer />

        <SandpackLayout
          style={{
            width: "100%",
          }}
        >
          <SandpackCodeEditor
            style={{
              minHeight: "100%",
              maxHeight: "100%",
              overflow: "auto",
            }}
            showInlineErrors
            showLineNumbers
            closableTabs
            wrapContent
          />
          <SandpackPreview
            showNavigator
            className="sandbox-preview"
            showRefreshButton={false}
            showOpenInCodeSandbox={false}
          />
        </SandpackLayout>
      </div>
    </div>
  );
}
const TaskScreen = () => {
  return (
    <SandBoxProviderWrapper>
      <Task />
    </SandBoxProviderWrapper>
  );
};

export default TaskScreen;

const SandBoxProviderWrapper = ({ children }: { children: ReactNode }) => {
  const [searchParam] = useSearchParams();
  const fetchTask = useTaskStore((state) => state.fetch);
  const assignment = useTaskStore((state) => state.assignment);

  useEffect(() => {
    fetchTask(searchParam.get("ttkn"));
  }, [searchParam, fetchTask]);

  return (
    <>
      <SandpackProvider
        theme="light"
        template="react"
        files={assignment?.assignedQuestion[0]?.files}
        options={{
          classes: {
            "sp-wrapper": "custom-wrapper",
          },
        }}
      >
        {children}
      </SandpackProvider>
    </>
  );
};
