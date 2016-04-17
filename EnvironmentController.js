/**
 * this class handles enemies.
 */
function EnvironmentController(levelScene, _difficulty) {
    PIXI.Container.call(this);//this maybe equals a super();
    this.difficulty = _difficulty;
    this.playerRunner = levelScene.playerRunner;

    //probably i will need also...
    this.hud = levelScene.hud;
    this.reset();
}
EnvironmentController.prototype = Object.create(PIXI.Container.prototype);

EnvironmentController.prototype.createEnemy = function () {
    var xPos = this.playerRunner.position.x - game.width/2;
    this.enemyJogger = new EnemyJogger(xPos, this.difficulty, this.playerRunner);
    var thisObject = this;
    this.enemyJogger.onWin = function () {
        thisObject.hud.showMessage("you were defeated!", 1000);
        thisObject.gameRules.bonus(-1);
    }
    this.enemyJogger.onLose = function () {
        thisObject.hud.showMessage("you defeated your enemy!", 1000);
        thisObject.gameRules.bonus(1);

    }

    this.addChild(this.enemyJogger);
}

EnvironmentController.prototype.update = function () {

    if (this.enemyJogger) {
        this.enemyJogger.update();
        var enemyDistance = this.enemyJogger.runner.position.x - this.playerRunner.position.x;
        if (enemyDistance > game.width*2 || enemyDistance < -game.width*2) {
            this.removeChild(this.enemyJogger);
            this.enemyJogger = null;
        }
    }
    else {
        var now = Date.now();
        if (now - (this.lastTimeEnemy) > 10 * 1000) {
            this.createEnemy();
            this.lastTimeEnemy = now;
        }
    }
}

EnvironmentController.prototype.reset = function () {
    this.lastTimeEnemy = Date.now();
    if (this.enemyJogger) {
        this.removeChild(this.enemyJogger);
        this.enemyJogger = null;
    }
}
