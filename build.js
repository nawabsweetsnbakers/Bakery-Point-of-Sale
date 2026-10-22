const electronInstaller = require('electron-winstaller');
const path = require('path');

const rootPath = path.join('./');

resultPromise = electronInstaller.createWindowsInstaller({
    appDirectory: './release-builds/NawabSweetsBakersPOS-win32-x64',
    outputDirectory: './installers',
    authors: 'Nawab Sweets & Bakers',
    noMsi: true,
    exe: 'NawabSweetsBakersPOS.exe',
    setupExe: 'NawabSweetsBakersPOSInstaller.exe',
    setupIcon: path.join(rootPath, 'assets', 'images', 'icon.ico')
  });

resultPromise.then(() => console.log("It worked!"), (e) => console.log(`No dice: ${e.message}`));