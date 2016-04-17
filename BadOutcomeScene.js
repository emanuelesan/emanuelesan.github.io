function BadOutcomeScene() {
    
    //I should do some cool background for this.
    Scene.call(this);//this maybe equals a super.. fucking Javascript;
    var button = new PIXI.Sprite(game.sprites['button'].texture);
    button.click = button.tap = function (data) {
        game.changeScene('menu');
    }
    button.interactive = true;
     var message = new PIXI.Text(
    "back to the Menu",
    {font: "32px sans-serif", fill: "black"}
    );
    button.addChild(message);
    
    
    button.position.x = 100;
    button.position.y = 100;
   
    this.addChild(button);
        
        

    this.interactive = true;
}
BadOutcomeScene.constructor = BadOutcomeScene;
BadOutcomeScene.prototype = Object.create(Scene.prototype);