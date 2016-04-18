function MenuScene() {
    Scene.call(this);//this maybe equals a super.. fucking Javascript;
    var button = new PIXI.Sprite(game.sprites['button'].texture);
    button.click = button.tap = function (data) {
        game.changeScene('level');
    }
    button.interactive = true;
    button.position.x = 100;
    button.position.y = 100;
    var message = new PIXI.Text(
    "play!",
    {font: "32px sans-serif", fill: "black"}
    );
    button.addChild(message);
    
    this.addChild(button);

    this.interactive = true;
}
MenuScene.constructor = MenuScene;
MenuScene.prototype = Object.create(Scene.prototype);

