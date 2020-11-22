import * as globalJsDom from 'jsdom-global';
import * as fs from 'fs';
import {PNG} from 'pngjs';

globalJsDom();

import * as p5 from 'p5';

const sk = new p5((p: p5) => {

  const writeGraphicsToPng = (g: any, filename: string) => {
    g.loadPixels();
    const png = new PNG({width: g.width, height: g.height});
    png.data = Buffer.from(g.pixels);
    var buffer = PNG.sync.write(png);
    fs.writeFileSync(filename, buffer);
  };

  p.setup = () => {
    const render = p.createCanvas(100, 100);
    p.background(255, 128, 64);
    p.rect(50, 50, 25, 25);

    writeGraphicsToPng(p, 'out.png');
    process.exit(0);
  };
});

