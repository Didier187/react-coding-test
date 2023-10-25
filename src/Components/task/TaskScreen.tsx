import useSwr from "swr";
import { useSearchParams } from "react-router-dom";
import styles from "./TaskScreen.module.css";
import {
  useSandpack,
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
} from "@codesandbox/sandpack-react";
import { autocompletion } from "@codemirror/autocomplete";

const fetcher = (...args: string[]) => {
  return fetch(args[0]).then((res) => res.json());
};

function TaskScreen() {
  const [searchParam] = useSearchParams();

  const {
    data,
    error,
    isLoading: loadingData,
  } = useSwr(
    `${import.meta.env.VITE_SERVER_URL}/tasks?ttkn=${searchParam.get("ttkn")}`,
    fetcher
  );
  const file = {
    "App.js": {
      code: ` import React from "react";
              import ReactMarkdown from 'react-markdown'
              export default function App() {
              return (
                <ReactMarkdown>
                 # Hello, *world*!
                </ReactMarkdown>
                );
                }`,
      active: true,
    },
    "/public/index.html": {
      code: `<div id="root"></div>`,
      active: true,
    },
    "index.js": {
      code: `import React from "react";
            import ReactDOM from "react-dom";
            import App from "./App";
            ReactDOM.render(<App />, document.getElementById("root"));`,
      active: true,
    },
    "index.css": {
      code: `body {
              margin: 0;
              padding: 0;
              font-family: sans-serif;
              background-color: #282c34;
              color: white;
            }`,
      active: true,
    },

    "package.json": {
      code: `{
              "dependencies": {
                "react": "latest",
                "react-dom": "latest","react-markdown": "latest" 
              }
            }`,
      active: true,
    },
  };

  if (loadingData) return <div>Getting assignment content...</div>;
  if (error) return <div>Oops, something went wrong, contact us</div>;
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div className={styles["header-container"]}>
          <p>Hi {data?.name.split(" ")[0]}, welcome to your assignment! </p>
        </div>
      </div>
      <div className={styles["main"]}>
        <SandpackProvider
          theme="dark"
          template="react"
          files={file}
          options={{
            classes: {
              "sp-wrapper": "custom-wrapper",
            },
          }}
        >
          <SandpackLayout>
            <CustomCodeEditor />
            <SandpackPreview
              showNavigator
              className="sandbox-preview"
              showRefreshButton={false}
              showOpenInCodeSandbox={false}
            />
          </SandpackLayout>
        </SandpackProvider>
      </div>
    </div>
  );
}

export default TaskScreen;

const CustomCodeEditor = () => {
  const { sandpack } = useSandpack();
  const { files } = sandpack;
  const submit = () => {
    console.log(files);
  };
  return (
    <div
      style={{
        width: "60%",
        height: "100%",
      }}
    >
      <SandpackCodeEditor
        showInlineErrors
        showLineNumbers
        closableTabs
        wrapContent
        className="sandbox-editor"
        extensions={[autocompletion()]}
      />
      <button onClick={submit}>SubmitFiles</button>
    </div>
  );
};
