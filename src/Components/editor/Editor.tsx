import { WebContainer } from "@webcontainer/api";

export default function Editor({
  indexFromDb,
  writeIndexJS,
  wCInstance,
}: {
  indexFromDb: string | undefined;
  writeIndexJS: (content: string, container: WebContainer | null) => void;
  wCInstance: WebContainer | null;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const content = e.currentTarget.value;
    writeIndexJS(content, wCInstance);
  };

  return (
    <div className="editor">
      <textarea
        className="editor__textarea"
        value={indexFromDb}
        onChange={handleChange}
      ></textarea>
    </div>
  );
}