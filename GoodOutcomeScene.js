function GoodOutcomeScene() {
    
    //I should do some cool background for this.
    Scene.call(this);//this maybe equals a super.. fucking Javascript;
    var button = new PIXI.Sprite(game.sprites['button'].texture);
    button.click = button.tap = function (data) {
        game.changeScene('level');
    }
    button.interactive = true;
     var message = new PIXI.Text(
    "play again!",
    {font: "32px sans-serif", fill: "black"}
    );
    button.addChild(message);
    
    
    button.position.x = 100;
    button.position.y = 100;
    this.addChild(button);

    this.interactive = true;
}
GoodOutcomeScene.constructor = GoodOutcomeScene;
GoodOutcomeScene.prototype = Object.create(Scene.prototype);