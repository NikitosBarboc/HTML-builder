const  fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'project-dist');
const assetsPath =  path.join(__dirname, 'assets');
const newAssets =  path.join(distPath, '\\assets');



// async function listObjects(path){
//   // console.log(path);
//   fs.readdir(path, async (err, files) => {
//     let stat =  await fs.promises.lstat(path);
//     let isFile = stat.isFile();
//     if(isFile) {
//       fs.unlink(path, (error) => {
//         // console.log(error);
//       });
//     } else {
//       for (let file of files){ 
      
//         let isDerectory = stat.isDirectory();
//         if(isDerectory){
//           console.log(path );
//           console.log(file);
//           listObjects(path + '/' + file);
//           fs.rmdir(path + '/' + file, () => {});
//         }
//         else {
//           fs.unlink(path, (error) => {
//             console.log(error);
//           });
//         }
//       // console.log(stat);
//       }}
//   });
// }

// listObjects(distPath);



async function createAssetsFolder() {await fs.promises.mkdir(newAssets);}
async function copyFile(folder) {
  let fullPath = assetsPath + '\\' + folder;
  fs.readdir(fullPath, async (error, fullPath) => {

    for(let file of fullPath) {

      let fileInfo = await fs.promises.lstat(`${assetsPath}\\${folder}\\${file}`);
      let isDirectory = await fileInfo.isDirectory();

      if(isDirectory !== true) {
        fs.copyFile(`${assetsPath}\\${folder}\\${file}`, newAssets + '\\' +  folder + '\\' + file, (err) => {});
      } else {
        await copyFolder(fullPath);
      }
    }
  });
}
async function copyFolder(assetsPath) {
  fs.readdir(assetsPath, async (error, folder) => {
    console.log(folder);
    for(let file of folder) {
      let fileInfo = await fs.promises.lstat(assetsPath + '\\' + file);
      let isDirectory = await fileInfo.isDirectory();
      if(isDirectory === true) {
        await fs.promises.mkdir(newAssets + '\\' + file);
        // currFolder = await file;
        await copyFile(file);
      } else {
        fs.copyFile(assetsPath + '\\' + file, newAssets + '\\'  + file, (err) => {});
      }
    }
    
  }); 
}

async function createDist() {
  await fs.promises.mkdir(distPath);
  await createAssetsFolder();
  await copyFolder(assetsPath);
}
createDist();
