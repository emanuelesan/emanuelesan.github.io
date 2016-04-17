function Scene() {
    PIXI.Container.call(this);//this maybe equals a super();
}
Scene.constructor = Scene;
Scene.prototype = Object.create(PIXI.Container.prototype);
Scene.prototype.update = function() {}
Scene.prototype.start = function () { }
Scene.prototype.stop = function () { }
