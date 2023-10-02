import { useBoundStore } from "../store";
import Toggler from "./Toggler";

type FileItem = {
  directory?: Record<string, FileItem>;
};

const FileStructure = <T extends Record<string, FileItem>>({
  structure,
  path = [],
}: {
  structure: T;
  path: string[];
}) => {
  const changeCurrentFile = useBoundStore(
    (state) => state.changeCurrentEditableFile
  );
  const selectedFile = useBoundStore((state) => state.currentEditableFile);
  return (
    <div className="file-structure-container">
      <ul className="file-structure">
        {Object.keys(structure).map((name, index) => {
          const item = structure[name];
          const newPath = [...path, name];
          return (
            <li key={index}>
              {item.directory ? (
                <Toggler>
                  {({ isToggled, setIsToggled }) => (
                    <div className="nested">
                      <button
                        onClick={() => setIsToggled(!isToggled)}
                        className={`directory-btn ${
                          isToggled ? "directory-btn__active" : ""
                        }`}
                      >
                        {name}
                      </button>
                      {isToggled && item.directory && (
                        <FileStructure
                          structure={item.directory}
                          path={newPath}
                        />
                      )}
                    </div>
                  )}
                </Toggler>
              ) : (
                <span
                  className={
                    selectedFile === newPath.join("/")
                      ? "selected file-structure__item"
                      : "file-structure__item"
                  }
                  onClick={() => {
                    changeCurrentFile(newPath.join("/"));
                  }}
                >
                  {name}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FileStructure;
