import{useEffect} from "react";
import useQuestionPreviewStandalone from "../../store/questionPreviewStandalone";
import Toggler from "../toggler/Toggler";

type FileItem = {
  directory?: Record<string, FileItem>;
};

const PreviewFileStructure = <T extends Record<string, FileItem>>({
  structure,
  path = [],
}: {
  structure: T;
  path: string[];
}) => {
  const changeCurrentFile = useQuestionPreviewStandalone(
    (state) => state.setCurrentFilePreviewPath
  );
  const selectedFile = useQuestionPreviewStandalone(
    (state) => state.currentFilePreviewPath
  );
  const setCurrentFileContents = useQuestionPreviewStandalone(
    (state) => state.setCurrentFileContents
  );
  // change the current file to the first file in the file structure
  useEffect(() => {
    const firstFile = Object.keys(structure)[0];
    const newPath = [...path, firstFile];
    changeCurrentFile(newPath.join("/"));
    setCurrentFileContents(structure[firstFile].file.contents);
  }, []);

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
                        <PreviewFileStructure
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
                    console.log({ newPath, structure });
                    setCurrentFileContents(structure[newPath[0]].file.contents);
                    console.log({ "": structure[newPath[0]].file.contents });
                  }}
                >
                  {name.replace("_", ".")}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default PreviewFileStructure;
