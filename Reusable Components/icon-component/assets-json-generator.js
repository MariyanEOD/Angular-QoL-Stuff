// var fs = require("fs")

// function readFiles(dirname, saveDirectory, onError) {
//    const iconList = {}
//    fs.readdir(dirname, function (err, filenames) {
//       if (err) {
//          onError(err)
//          return
//       }
//       console.log(" 1 --------- Icons in the folder: ", filenames.length)
//       filenames.forEach(function (filename, i) {
//          fs.readFile(dirname + filename, "utf-8", function (err, content) {
//             if (err) {
//                onError(err)
//                return
//             }
//             iconList[filename.slice(0, filename.length - 4)] = content

//             if (i === filenames.length - 1) {
//                const exportStatement = `export const iconList = ${formatAsObject(
//                   iconList,
//                )};`
//                fs.writeFile(saveDirectory, exportStatement, (err) => {
//                   if (err) {
//                      onError(err)
//                      return
//                   }
//                   console.log(
//                      ` 2 --------- Icons file generated successfully! Total icons: ${
//                         Object.keys(iconList).length
//                      }`,
//                   )
//                })
//             }
//          })
//       })
//    })
// }

// function formatAsObject(obj) {
//    const formattedEntries = Object.entries(obj).map(([key, value]) => {
//       return `'${key}': \`${value}\``
//    })
//    return `{\n  ${formattedEntries.join(",\n  ")}\n}`
// }
// readFiles("src/assets/svgs/", "src/app/shared/icons.ts", (err) =>
//    console.log("[ERROR]: ", err),
// )

import { promises as fsPromises } from "fs"
import path from "path"

function formatAsObject(obj) {
   const formattedEntries = Object.entries(obj).map(([key, value]) => {
      return `'${key}': \`${value}\``
   })
   return `{\n  ${formattedEntries.join(",\n  ")}\n}`
}
readFiles("src/assets/svgs/", "src/app/shared/icons.ts", (err) =>
   console.log("[ERROR]: ", err),
)

async function readFiles(dirname, saveDirectory) {
   const iconList = {}
   try {
      const filenames = await fsPromises.readdir(dirname)

      console.log(" 1 --------- Icons in the folder: ", filenames.length)
      for (const filename of filenames) {
         const content = await fsPromises.readFile(
            path.join(dirname, filename),
            "utf-8",
         )
         iconList[filename.slice(0, filename.length - 4)] = content
      }

      const exportStatement = `
    export type IconKey = ${Object.keys(iconList)
       .map((x) => `"${x}"`)
       .join(" | ")};
    \n
    export const iconList = ${formatAsObject(iconList)};`
      await fsPromises.writeFile(saveDirectory, exportStatement)
      console.log(
         ` 2 --------- Icons file generated successfully! Total icons: `,
         Object.keys(iconList).length,
      )
      console.log(
         "!!! Possibility of not generating all icons. Run the script twice just in case.",
      )
   } catch (err) {
      console.error("[ERROR]: ", err)
   }
}
