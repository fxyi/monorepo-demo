class BrakeBanner {
  constructor(selector) {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      resizeTo: window,
    });

    document.querySelector(selector).appendChild(this.app.view);

    this.stage = this.app.stage;

    this.loader = new PIXI.Loader();

    this.loader.add("btn.png", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e0b75de1-90c7-4c11-9d12-a8bc84c4d081/ded419de-2dcc-4484-a3e6-d5e2e0ab7c2e.png");
    this.loader.add("btn_circle.png", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e0b75de1-90c7-4c11-9d12-a8bc84c4d081/ee86689b-0a1e-4ca7-89bf-1e771c5c8a44.png");
    this.loader.add("brake_bike.png", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e0b75de1-90c7-4c11-9d12-a8bc84c4d081/dc9ccb62-380d-42a6-9b60-c93eb6606374.png");
    this.loader.add("brake_handlerbar.png", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e0b75de1-90c7-4c11-9d12-a8bc84c4d081/d32142dd-1443-4731-bd79-543a49293b56.png");
    this.loader.add("brake_lever.png", "https://vkceyugu.cdn.bspapp.com/VKCEYUGU-e0b75de1-90c7-4c11-9d12-a8bc84c4d081/c67a7471-6e79-4c98-a459-42a92bc46732.png");

    this.loader.load();

    this.loader.onComplete.add(() => {
      this.show();
    });
  }

  show() {
    let actionButton = this.createActionButton();
    actionButton.x = actionButton.y = 300;

    const bikeContainer = new PIXI.Container();
    this.stage.addChild(bikeContainer);

    bikeContainer.scale.x = bikeContainer.scale.y = 0.3;

    const bikeImage = new PIXI.Sprite(this.loader.resources["brake_bike.png"].texture);
    bikeContainer.addChild(bikeImage);

    const bikeLeverImage = new PIXI.Sprite(this.loader.resources["brake_lever.png"].texture);
    bikeContainer.addChild(bikeLeverImage);

    bikeLeverImage.pivot.x = 455;
    bikeLeverImage.pivot.y = 455;

    bikeLeverImage.x = 722;
    bikeLeverImage.y = 900;

    const bikeHandlerbarImage = new PIXI.Sprite(this.loader.resources["brake_handlerbar.png"].texture);
    bikeContainer.addChild(bikeHandlerbarImage);

    this.stage.addChild(actionButton);

    actionButton.interactive = true;
    actionButton.buttonMode = true;

    actionButton.on("mousedown", () => {
      // bikeLeverImage.rotation = Math.PI/180*-30;
      gsap.to(bikeLeverImage, { duration: 0.4, rotation: (Math.PI / 180) * -30 });
      pause();
    });
    actionButton.on("mouseup", () => {
      // bikeLeverImage.rotation = 0;
      gsap.to(bikeLeverImage, { duration: 0.4, rotation: 0 });
      start();
    });

    let resize = () => {
      bikeContainer.x = window.innerWidth - bikeContainer.width;
      bikeContainer.y = window.innerHeight - bikeContainer.height;
    };
    window.addEventListener("resize", resize);
    resize();

    //创建粒子
    let particleContainer = new PIXI.Container();
    this.stage.addChild(particleContainer);

    particleContainer.pivot.x = window.innerWidth / 2;
    particleContainer.pivot.y = window.innerHeight / 2;

    particleContainer.x = window.innerWidth / 2;
    particleContainer.y = window.innerHeight / 2;

    particleContainer.rotation = (35 * Math.PI) / 180;

    let particles = [];
    const colors = [0xf1cf54, 0xb5cea8, 0xf1cf54, 0x818181, 0x000000];
    for (let i = 0; i < 10; i++) {
      let gr = new PIXI.Graphics();

      gr.beginFill(colors[Math.floor(Math.random() * colors.length)]);

      gr.drawCircle(0, 0, 6);

      gr.endFill();

      let pItem = {
        sx: Math.random() * window.innerWidth,
        sy: Math.random() * window.innerHeight,
        gr: gr,
      };

      gr.x = pItem.sx;
      gr.y = pItem.sy;

      particleContainer.addChild(gr);

      particles.push(pItem);
    }

    let speed = 0;
    function loop() {
      speed += 0.5;
      speed = Math.min(speed, 20);

      for (let i = 0; i < particles.length; i++) {
        let pItem = particles[i];

        pItem.gr.y += speed;

        if (speed >= 20) {
          pItem.gr.scale.y = 40;
          pItem.gr.scale.x = 0.03;
        }

        if (pItem.gr.y > window.innerHeight) pItem.gr.y = 0;
      }
    }

    function start() {
      speed = 0;
      gsap.ticker.add(loop);
    }
    function pause() {
      gsap.ticker.remove(loop);

      for (let i = 0; i < particles.length; i++) {
        let pItem = particles[i];

        pItem.gr.scale.y = 1;
        pItem.gr.scale.x = 1;

        gsap.to(pItem.gr, { duration: 0.6, x: pItem.sx, y: pItem.sy, ease: "elastic.out" });
      }
    }
    start();

    //粒子有多个颜色
    //向某一个角度持续移动
    //超出边界后回到顶部继续移动
    //按住鼠标停止
    //停止的时候还有一点回弹的效果
    //松开鼠标继续
  }

  createActionButton() {
    let actionButton = new PIXI.Container();

    let btnImage = new PIXI.Sprite(this.loader.resources["btn.png"].texture);

    let btnCircle = new PIXI.Sprite(this.loader.resources["btn_circle.png"].texture);

    let btnCircle2 = new PIXI.Sprite(this.loader.resources["btn_circle.png"].texture);

    actionButton.addChild(btnImage);
    actionButton.addChild(btnCircle);
    actionButton.addChild(btnCircle2);

    btnImage.pivot.x = btnImage.pivot.y = btnImage.width / 2;
    btnCircle.pivot.x = btnCircle.pivot.y = btnCircle.width / 2;
    btnCircle2.pivot.x = btnCircle2.pivot.y = btnCircle2.width / 2;

    btnCircle.scale.x = btnCircle.scale.y = 0.8;
    gsap.to(btnCircle.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 });
    gsap.to(btnCircle, { duration: 1, alpha: 0, repeat: -1 });

    return actionButton;
  }
}

function init() {
  let banner = new BrakeBanner("#brakebanner");
}

init();
