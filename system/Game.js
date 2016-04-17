function Game() {
  this.mainContainer = new PIXI.Container();
  this.width = 512;
  this.height = 384;
  this.renderer = PIXI.autoDetectRenderer(
    this.width,
    this.height,
    { view: document.getElementById("game-canvas") }
  );
  this.renderer.backgroundColor = 0x66FF99;
  this.currentScene = null;
  this.scenes = {};
  this.totalLoaded = 0;
  this.toBeLoaded = 0;
  this.sprites = {};

  PIXI.BaseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
}

var changeScene = function (newSceneLabel) {
  console.log("changing scene to " + newSceneLabel);
  if (this.currentScene != null) {
    console.log("removing scene: " + this.currentScene);
    this.mainContainer.removeChild(this.currentScene);
    this.currentScene.stop();
  }
  this.currentScene = this.scenes[newSceneLabel];
  this.mainContainer.addChild(this.currentScene);
  this.currentScene.start();
}
Game.constructor = Game;

Game.prototype.play = function () {

  PIXI.loader
    .add('player', 'resources/runCycle2.png')
    .add('ground', 'resources/groundTexture.png')
    .add('button', 'resources/buttonTexture.png')
    .add('enemyRunner', 'resources/runCycle2.png')
    .on('progress', function () { console.log("still loading..."); })
    // .on('complete', function () { 
    //   })
    .load(function (loader, resources) {
      for(var resourceName in resources)
      {
        game.sprites[resourceName]=new PIXI.Sprite(resources[resourceName].texture);
      }
      console.log('finished loading!!');
      game.startGame();
    });
}
Game.prototype.startGame = function () {

  this.scenes['menu'] = new MenuScene();
  this.scenes['level'] = new LevelScene();
  this.scenes['goodOutcome'] = new GoodOutcomeScene();
  this.scenes['badOutcome'] = new BadOutcomeScene();


  this.changeScene('menu');
  updateCycle();
}
Game.prototype.changeScene = changeScene;

/**
 * update is done so that updating the scene will be done 
 * every x frames per second;
 */
var fps = 60;
var now;
var then = Date.now();
var interval = 1000 / fps;
var delta;
Game.prototype.update = function () {
  now = Date.now();
  delta = now - then;
  if (delta > interval) {
    this.currentScene.update();
    this.renderer.render(this.mainContainer);
    then = now - (delta % interval);
  }
}

function updateCycle() {

  game.update();
  requestAnimationFrame(updateCycle);
}
