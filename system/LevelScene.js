function LevelScene() {
    Scene.call(this);//this maybe equals a super.. fucking Javascript;


    this.world = new PIXI.Container();
    this.addChild(this.world);
    //parallax things
    this.parallaxPanels = [];


    this.playerRunner = new Runner(game.sprites['player'].texture, 100);
    this.world.addChild(this.playerRunner);

    //parallaxes;
    var ground = new ParallaxThing(0, game.height - 20, game.sprites['ground'].texture, 1);
    this.parallaxPanels.push(ground);
    this.addChild(ground);

    //HUD
    this.hud = new HUD(this.playerRunner);
    this.addChild(this.hud);

    this.environmentController = new EnvironmentController(this, 1);
    this.world.addChild(this.environmentController);


}
LevelScene.constructor = LevelScene;
LevelScene.prototype = Object.create(Scene.prototype);
LevelScene.prototype.start = function () {

    this.playerRunner.reset();
    //game rules
    this.gameRules = new GameRules(this);
    this.gameRules.startLevel();
    this.environmentController.gameRules=this.gameRules;

    this.environmentController.reset();

}


LevelScene.prototype.update = function () {
    this.gameRules.state();
    this.environmentController.update();
    this.playerRunner.update();

    //little soft camera panning
    var targetx = game.width/2 - this.playerRunner.position.x;
    var currX = this.world.position.x;
    var deltaX = (targetx - currX) * .1;
    this.world.position.x = currX + deltaX;

    for (var key in this.parallaxPanels) {
        this.parallaxPanels[key].update(deltaX);
    }

    this.hud.update();

}
