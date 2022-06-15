import fs from 'fs/promises';
import path from 'path';
import plistParser from 'plist';
import sharp from 'sharp';

const filesPath = path.join(process.cwd(), 'plist-files');
const outputDirPath = path.join(process.cwd(), 'static/images/plist');

const main = async () => {
  const files = await fs.readdir(filesPath);
  for (const fileName of files) {
    if (fileName.match('png')) continue;
    // console.log(fileName);
    const filePath = path.join(filesPath, fileName);
    const fileData = await fs.readFile(filePath, 'utf8');
    const jsonData = plistParser.parse(fileData);
    const baseImagePath = filePath.replace('.plist', '.png');
    for (const imgInGamePath of Object.keys(jsonData.frames)) {
      const imgData = jsonData.frames[imgInGamePath];
      const position = imgData.frame.replace(/\{|\}/g, '').split(',');
      const rotation = imgData.rotated;
      const extract = {
        left: +position[0],
        top: +position[1],
      };
      if (rotation) {
        extract.width = +position[3];
        extract.height = +position[2];
      } else {
        extract.width = +position[2];
        extract.height = +position[3];
      }
      try {
        await sharp(baseImagePath)
          .extract(extract)
          .rotate(rotation ? 270 : 0)
          .toFile(path.join(outputDirPath, path.basename(imgInGamePath)));
      } catch (err) {
        console.log(err);
      }
    }
  }
};

main();
