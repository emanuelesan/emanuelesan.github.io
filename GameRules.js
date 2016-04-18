/**
 * this class controls the game and orchestrates START,END,
 * time countdown etc.
 * 
 */
function GameRules(levelScene) {
    this.playerRunner = levelScene.playerRunner;
    this.hud = levelScene.hud;
    this.playerController= new KeyboardController();
    this.playerController.bindScene(levelScene);
    this.secondsToGo=0;
}


var _gameRule_none = function()
{}

var _gameRule_play = function()
{
    var win = (this.playerRunner.stamina>0 && this.playerRunner.selfEsteem>=100);
    var lose = (this.playerRunner.stamina<=0|| this.playerRunner.selfEsteem<=0);
    
    if(win || lose)
    {
        this.playerController.unbind();
        this.state=_gameRule_none;
        
    }
    if (win)
    {
          this.hud.showMessage("run session completed!",1000);
          setTimeout(function(){ 
                game.changeScene('goodOutcome');
            }, 3000);
    } 
    else if(lose)
    {
        this.hud.showMessage("you lose, you loser!",3000);
                  setTimeout(function(){ 
                game.changeScene('badOutcome');
            }, 3000);
    }
}

GameRules.constructor = GameRules;
GameRules.prototype.startLevel=function()
{
    var thisObject= this;
    this.hud.showMessage("ready...",1000);
    setTimeout(function(){ 
        thisObject.hud.showMessage("set...",1000);
     }, 1000);
    setTimeout(function(){ 
        thisObject.hud.showMessage("go!",1000);
        thisObject.playerController.bind(thisObject.playerRunner);
        thisObject.state=_gameRule_play;
     }, 2000);
}

GameRules.prototype.state =_gameRule_none;
GameRules.prototype.bonus=function(b)
{
    this.playerRunner.selfEsteem+=b*20;
    this.playerRunner.stamina+=b*20;
}
