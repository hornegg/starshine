import * as globalJsDom from 'jsdom-global';
import * as fs from 'fs';
import {PNG} from 'pngjs';
import * as Canvas from 'canvas';

globalJsDom();
global.ImageData = Canvas.ImageData;
window.ImageData = Canvas.ImageData;

import * as p5 from 'p5';

const createHeadlessP5 = (
  sketch: (
    p: p5,
    writeGraphicsToPng: (g: p5.Graphics | p5, filename: string) => Promise<void>
  ) => void
) => {

  const writeGraphicsToPng = (g: p5.Graphics | p5, filename: string): Promise<void> => {
    return new Promise((resolve) => {

      g.loadPixels();
      const png = new PNG({width: g.width, height: g.height});
      png.data = Buffer.from(g.pixels);

      const writeStream = fs.createWriteStream(filename);
      writeStream.on('close', resolve)
      png.pack().pipe(writeStream);
    });
  };

  return new p5((p: p5) => {
    sketch(p, writeGraphicsToPng);
  });
};

export default createHeadlessP5;

