import fs from "fs";

function pathIsDirectory(path) {
  return fs.lstatSync(path).isDirectory();
}

/**
 * Retrieves all files under
 * a directory path and returns
 * an array of file paths
 * @param {string} directoryPath
 * @returns {string[]}
 */
function getAllFilesPathUnderDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  return files.map((file) => `${directoryPath}/${file}`);
}

export { pathIsDirectory, getAllFilesPathUnderDirectory };
