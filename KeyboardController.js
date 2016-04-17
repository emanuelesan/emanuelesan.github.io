function KeyboardController() {
    var rightAscii = 39;
    var leftAscii = 37;
    this.rightKey = keyboard(rightAscii);
    this.leftKey = keyboard(leftAscii);
    
  

}
KeyboardController.constructor = KeyboardController;
KeyboardController.prototype.bind = function (runner) {
    this.rightKey.press = function () { runner.rightFootDown() }
    this.rightKey.release = function () { runner.footUp() }
    this.leftKey.press = function () { runner.leftFootDown() }
    this.leftKey.release = function () { runner.footUp() }
}
KeyboardController.prototype.unbind = function () {
    this.rightKey.press = function () { }
    this.rightKey.release = function () { }
    this.leftKey.press = function () { }
    this.leftKey.release = function () {  }
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

