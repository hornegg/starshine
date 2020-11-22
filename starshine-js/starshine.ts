import * as globalJsDom from 'jsdom-global';
import * as fs from 'fs';
import {PNG} from 'pngjs';

globalJsDom();

import * as p5 from 'p5';

new p5((p: p5) => {

  const writeGraphicsToPng = (g: any, filename: string) => {
    g.loadPixels();
    const png = new PNG({width: g.width, height: g.height});
    png.data = Buffer.from(g.pixels);
    var buffer = PNG.sync.write(png);
    fs.writeFileSync(filename, buffer);
  };

  const star = (x: number, y: number, radius: number, alpha: number) => {
    p.push();
    p.stroke(255, alpha);
    p.fill(255, alpha);
    p.translate(x, y);
    p.beginShape();
    p.rotate(p.HALF_PI);
    for (let angle = 0; angle <= 4*p.PI; angle += (4*p.PI) / 5) {
      p.vertex(radius * p.cos(angle), radius * p.sin(angle));   
    }
    p.endShape();
    p.pop();
  };
  
  p.setup = () => {
    p.createCanvas(512, 800);
    p.background(0);

    for (let t = 0; t <= 1; t += 0.01) {
      star(
        p.map(t, 0, 1, p.width * 0.4, p.width * 0.6),
        p.map(t, 0, 1, p.height * 0.3, p.height * 0.7),
        p.map(t, 0, 1, 60, 120),
        p.map(p.pow(t, 0.1), 0, 1, 255, 0)
      );
    }
  
    writeGraphicsToPng(p, 'starshine.png');
    process.exit(0);
  };
});

