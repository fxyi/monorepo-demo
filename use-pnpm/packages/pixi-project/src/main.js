import "./assets/style.css";

import * as PIXI from "pixi.js";

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
  backgroundColor: 0xffe89d,
  antialias: true,
  resolution: window.devicePixelRatio,
});
window.app = app;
console.log('app', app);
console.log('app.view', app.view);

document.querySelector("#app").appendChild(app.view);

const skewStyle = new PIXI.TextStyle({
  fontFamily: "Arial",
  dropShadow: true,
  dropShadowAlpha: 0.8,
  dropShadowAngle: 2.1,
  dropShadowBlur: 4,
  dropShadowColor: "0x111111",
  dropShadowDistance: 10,
  fill: ["#ffffff"],
  stroke: "#004620",
  fontSize: 60,
  fontWeight: "lighter",
  lineJoin: "round",
  strokeThickness: 12,
});
// 创建一个文本类型
const skewText = new PIXI.Text("Hello PixiJS", skewStyle);
// 将文本倾斜
skewText.skew.set(0.1, -0.1);
// 定义文本在舞台（app）中的位置
skewText.x = 10;
skewText.y = 100;
// 将文本添加到舞台（app）中
app.stage.addChild(skewText);

const luFei = PIXI.Sprite.from("https://img1.baidu.com/it/u=2082729884,1583333066&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=711");
// 把精灵的原点设置为图片的中心点
luFei.anchor.set(0.5);
// 把精灵缩小0.5倍
luFei.scale.set(0.5);
// 把精灵定位在画布的中心
luFei.x = app.screen.width / 2;
luFei.y = app.screen.height / 2;
// 把图像精灵添加到舞台（app）上
app.stage.addChild(luFei);
// 为舞台添加一个更新循环的方法
app.ticker.add(() => {
  // 让图像精灵每次更新旋转0.01度
  luFei.rotation += 0.01;
});
