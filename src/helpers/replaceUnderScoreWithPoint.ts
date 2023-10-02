import { DirectoryNode, FileNode, FileSystemTree } from "@webcontainer/api";

export default  function transformFilesFromDb(filesFromDb: FileSystemTree) {
    if (!filesFromDb.initialFiles) {
      return {};
    }

    const transformKey = (key: string) => key.replace(/_/g, ".");

    const transformObject = <Obj extends DirectoryNode | FileNode>(obj: Obj )=> {
      const transformed = {} as Obj;
      for (const key in obj) {
        if (key in obj) {
          transformed[transformKey(key)] =
            typeof obj[key] === "object" ? transformObject(obj[key]) : obj[key];
        }
      }
      return transformed;
    };

    return transformObject(filesFromDb.initialFiles);
  }