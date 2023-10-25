import AceEditor from "react-ace";
import "ace-builds/src-noconflict/ext-language_tools";
import { config } from "ace-builds";
config.set('basePath', '/node_modules/ace-builds/src-min-noconflict');
export default function Editor({
  content,
  language,
  onChange,
}: {
  content: string;
  language: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div>
      <AceEditor
        mode={language}
        theme="monokai"
        name="blah2"
        // onLoad={this.onLoad}
        onChange={onChange}
        fontSize={14}
        showPrintMargin={false}
        showGutter={true}
        highlightActiveLine={true}
        value={content}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        style={{ width: "900px"}}
      />
    </div>
  );
}
