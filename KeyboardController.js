function KeyboardController() {
    var rightAscii = 39;
    var leftAscii = 37;
    this.rightKey = keyboard(rightAscii);
    this.leftKey = keyboard(leftAscii);
    var thisObject = this;
    this.rightKey.press = function () { thisObject.act(); }
    this.leftKey.press = function () { thisObject.act();  }
  

}
KeyboardController.constructor = KeyboardController;
KeyboardController.prototype.bind = function (_runner) {
    this.runner=_runner;
}
KeyboardController.prototype.unbind = function () {
   this.runner=null;
}
KeyboardController.prototype.bindScene=function(levelScene)
{   var thisObject=this;
    levelScene.interactive=true;
    //add transparent screen on top of everything.
    
    var innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, game.width, game.height);
    innerBar.endFill();
    innerBar.alpha=.0;
    innerBar.interactive=true;
    
    levelScene.addChild(innerBar);

    
    innerBar.click=innerBar.tap = function (data) {
        thisObject.act();
    }
}

KeyboardController.prototype.act=function()
{
    if(this.runner)
    {
        this.runner.footDown();
    }
}

function keyboard(keyCode) {
    var key = {};
    key.code = keyCode;
    key.isDown = false;
    key.isUp = true;
    key.press = undefined;
    key.release = undefined;
    //The `downHandler`
    key.downHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isUp && key.press) key.press();
            key.isDown = true;
            key.isUp = false;
        }
        event.preventDefault();
    };

    //The `upHandler`
    key.upHandler = function (event) {
        if (event.keyCode === key.code) {
            if (key.isDown && key.release) key.release();
            key.isDown = false;
            key.isUp = true;
        }
        event.preventDefault();
    };

    //Attach event listeners
    window.addEventListener(
        "keydown", key.downHandler.bind(key), false
    );
    window.addEventListener(
        "keyup", key.upHandler.bind(key), false
    );
    return key;
}

