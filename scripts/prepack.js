#!/usr/bin/env node
const fs = require('fs');

const packagesDir = 'packages';
const outDir = 'out';

const getDirectories = source =>
  fs.readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)


const copyPackageJson = () => {
  const directories = getDirectories(packagesDir);

  directories.forEach(directory => {
    const src = `${packagesDir}/${directory}/package.json`;
    const dest = `${packagesDir}/${directory}/${outDir}/package.json`;
  
    fs.copyFile(src, dest, (err) => {
      if (err) {
        // eslint-disable-next-line no-undef
        console.log("Error Found:", err);
      }
      else {
        // eslint-disable-next-line no-undef
        console.log("\npackage.json copied to: " + src);
      }
    });
  });
}

copyPackageJson();