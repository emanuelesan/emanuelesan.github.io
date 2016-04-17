function HUD(playerRunner) {
    PIXI.Container.call(this);//this maybe equals a super.. fucking Javascript;
    this.playerRunner = playerRunner;

 
    this.healthBar = this.createBar(game.width-170,6,0xFF3300);
    this.selfEsteem = this.createBar(game.width-170,20,0x00BBFF);
    
}
HUD.constructor = HUD;
HUD.prototype = Object.create(PIXI.Container.prototype);
HUD.prototype.update=function()
{
    this.healthBar.width = this.playerRunner.stamina/100.0 * 128.0;
    this.selfEsteem.width=this.playerRunner.selfEsteem/100.0*128;
}
HUD.prototype.createBar=function(x,y,color)
{
    
    //Create the health bar
    var healthBar = new PIXI.Container();
    healthBar.position.set(x, y)
    this.addChild(healthBar);

    //Create the black background rectangle
    var innerBar = new PIXI.Graphics();
    innerBar.beginFill(0x000000);
    innerBar.drawRect(0, 0, 128, 8);
    innerBar.endFill();
    healthBar.addChild(innerBar);

    //Create the front red rectangle
    var outerBar = new PIXI.Graphics();
    outerBar.beginFill(color);
    outerBar.drawRect(0, 0, 128, 8);
    outerBar.endFill();
    healthBar.addChild(outerBar);
    
    return outerBar;
}
HUD.prototype.showMessage=function(text,durationMillis)
{
    var message = new PIXI.Text(
    text,
    {font: "32px sans-serif", fill: "white"}
    );

    message.position.set(54, 96);
    this.addChild(message);
    var thisObject = this;
    setTimeout(function(){
        thisObject.removeChild(message);
    },durationMillis);
}