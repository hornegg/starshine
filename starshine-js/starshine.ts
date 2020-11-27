import createHeadlessP5 from './createHeadlessP5';
import * as p5 from 'p5';

createHeadlessP5((p: p5, writeGraphicsToPng) => {

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
  
    p.filter(p.BLUR, 1.5);

    writeGraphicsToPng(p, 'starshine.png').then(() => {
      process.exit(0);
    });
  };
});

