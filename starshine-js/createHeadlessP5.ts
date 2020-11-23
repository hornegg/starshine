import * as globalJsDom from 'jsdom-global';
import * as fs from 'fs';
import {PNG} from 'pngjs';

globalJsDom();

import * as p5 from 'p5';

const createHeadlessP5 = (
  sketch: (
    p: p5,
    writeGraphicsToPng: (g: p5.Graphics | p5, filename: string) => void
  ) => void
) => {

  const writeGraphicsToPng = (g: p5.Graphics | p5, filename: string) => {
    g.loadPixels();
    const png = new PNG({width: g.width, height: g.height});
    png.data = Buffer.from(g.pixels);
    var buffer = PNG.sync.write(png);
    fs.writeFileSync(filename, buffer);
  };

  return new p5((p: p5) => {
    sketch(p, writeGraphicsToPng);
  });
};

export default createHeadlessP5;

