const  fs = require('fs');
const path = require('path');
const distPath = path.join(__dirname, 'project-dist');
const components = path.join(__dirname, 'components');
const assetsPath =  path.join(__dirname, 'assets');
const newAssets =  path.join(distPath, '\\assets');
const html = path.join(distPath, '\\index.html');
const template = path.join(__dirname, 'template.html');
const bunbel = path.join(__dirname, '/project-dist/style.css');
const styles = path.join(__dirname, 'styles');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const rmdir = promisify(fs.rmdir);
const unlink = promisify(fs.unlink);
async function rmFolder(dir) {
  let entries = await readdir(dir, { withFileTypes: true });
  await Promise.all(entries.map(entry => {
    let fullPath = path.join(dir, entry.name);
    return entry.isDirectory() ? rmFolder(fullPath) : unlink(fullPath);
  }));
  await rmdir(dir);
}
let arrResult = [];
async function getInfo(stylesFolder) {
  let stylesFile;
  for (const file of stylesFolder) {
    if(file.slice(file.length - 4, file.length) !== '.css') continue;
    stylesFile = await fs.promises.readFile(`${styles}/${file}`, 'utf8');
    arrResult.push(stylesFile);
  }
}
async function createCSS() {
  const stylesFolder = await fs.promises.readdir(styles);
  await getInfo(stylesFolder);
  await fs.promises.writeFile(bunbel, arrResult.join('\n'), () => {});
}

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
async function createHTML() {
  let arrHTML = [];
  await fs.readdir(components, async (error, fullPath) => {
    new Promise( (resolve) => {
      fs.readFile(template, 'utf8', async (err, data) => {
        await arrHTML.push(data);
        resolve(arrHTML);
      });
    }).then( async (arrHTML) => {
      for(let file of fullPath) {
        let componentName = file.slice(0, file.length -5);
        if(arrHTML.join('').includes(`{{${componentName}}}`)) {
          await fs.readFile(components + '//' + file, 'utf8', async (err, data) => {
            arrHTML = arrHTML.join('');
            arrHTML = arrHTML.replace(`{{${componentName}}}`, data);
            // console.log(arrHTML);
            await fs.writeFile(html, arrHTML, async () => {});
            // console.log(arrHTML);
            arrHTML = arrHTML.split('');
          });
        }
      }
    });
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
        await copyFile(file);
      } else {
        fs.copyFile(assetsPath + '\\' + file, newAssets + '\\'  + file, (err) => {});
      }
    }
    
  }); 
}

async function createDist() {
  await fs.access(distPath, async error => {

    if (!error) {
      await rmFolder(distPath);
      await fs.promises.mkdir(distPath);
      await createHTML();
      await createCSS();
      await createAssetsFolder();
      await copyFolder(assetsPath);
      
    } else {
      await fs.promises.mkdir(distPath);
      await createHTML();
      await createCSS();
      await createAssetsFolder();
      await copyFolder(assetsPath);
      
    }
  });

}
createDist();
