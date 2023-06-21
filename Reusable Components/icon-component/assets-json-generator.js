var fs = require("fs");

function readFiles(dirname, saveDirectory, onError) {
  const iconList = {};
  fs.readdir(dirname, function (err, filenames) {
    if (err) {
      onError(err);
      return;
    }
    filenames.forEach(function (filename, i) {
      fs.readFile(dirname + filename, "utf-8", function (err, content) {
        if (err) {
          onError(err);
          return;
        }
        iconList[filename.slice(0, filename.length - 4)] = content;

        if (i === filenames.length - 1) {
          const exportStatement = `export const iconList = ${formatAsObject(
            iconList
          )};`;
          fs.writeFile(saveDirectory, exportStatement, (err) => {
            if (err) {
              onError(err);
              return;
            }
            console.log("Icons file generated successfully!");
          });
        }
      });
    });
  });
}

function formatAsObject(obj) {
  const formattedEntries = Object.entries(obj).map(([key, value]) => {
    return `'${key}': \`${value}\``;
  });
  return `{\n  ${formattedEntries.join(",\n  ")}\n}`;
}
readFiles("src/assets/svgs/", "src/app/shared/icons.ts", (err) =>
  console.log("[ERROR]: ", err)
);
