function EnemyJogger(xpos,_difficulty,_playerRunner) {
   PIXI.Container.call(this);//this maybe equals a super();
   this.difficulty=_difficulty;
   this.playerRunner=_playerRunner;
   
   this.runner=new Runner(game.sprites['enemyRunner'].texture,xpos);
   this.runner.recoveryRate=5;
   this.addChild(this.runner);
   this.lastTime=Date.now();
   this.firstTime=Date.now();
   console.log("enemy create at: "+xpos);

}
EnemyJogger.constructor = EnemyJogger;
EnemyJogger.prototype = Object.create(PIXI.Container.prototype);

var _enemyJogger_active= function()
{
    var now = Date.now();
    if(now-this.lastTime>250)
    {
        this.runner.currentSpeed+=5;
        this.lastTime=now;
    }
    if (now-this.firstTime>this.difficulty*1000*10)
    {this.state=_enemyJogger_defeated;
        this.onLose();    
    }
    if(this.runner.position.x>this.playerRunner.position.x)
    {
        this.state=_enemyJogger_winner;
        this.onWin();
    }
}

var _enemyJogger_defeated= function()
{
}

var _enemyJogger_winner= function()
{
    var now = Date.now();
    if(now-this.lastTime>200)
    {
        this.runner.currentSpeed+=5;
        this.lastTime=now;
    }
   
}


EnemyJogger.prototype.state = _enemyJogger_active;
EnemyJogger.prototype.update = function()
{
    this.state();
    this.runner.update();
}
EnemyJogger.prototype.onWin=function(){}
EnemyJogger.prototype.onLose=function(){}

