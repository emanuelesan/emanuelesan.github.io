function Runner(_texture, xpos) {
    PIXI.Container.call(this);//this maybe equals a super();
   
    //fin troppo pecoreccio...
    textureArray=[];
    for (var i=0;i<12;i++)
    {    
        var txt=new PIXI.Texture(_texture.baseTexture);
 
        txt.frame=new PIXI.Rectangle(i*122, 0, 122, 157);
        textureArray.push(txt);
    }
    this.sprite = new PIXI.MovieClip(textureArray);    
    
    this.addChild(this.sprite);
    this.position.x = xpos;
    this.position.y = game.height
        - 20//ground
        - 157 * this.scale.y;
    this.reset();

    this.nextStep = 0;
    this.footNterr = false;
    
    
    this.passo = 13;
    this.numeroFrame=12;
    this.startingPosition=xpos;
}
Runner.constructor = Runner;
Runner.prototype = Object.create(PIXI.Container.prototype);
Runner.prototype.reset = function () {
    this.currentSpeed = 0;
    this.selfEsteem = 50;
    this.recoveryRate = .8;
    this.stamina = 100;
    this.baseSpeed=1;
}
Runner.prototype.footDown =
    function () {
        if (!this.footNterr ) {
            this.footNterr = true;
            this.currentSpeed += 5;
            var thisObject=this;
            setTimeout(function () {
                thisObject.footNterr = false;
            }, 35);
        }
    }

Runner.prototype.update = function () {
    var totalSpeed = this.currentSpeed+this.baseSpeed;
    this.position.x += totalSpeed;
    
    this.currentSpeed -= .5;
    if (this.currentSpeed < 0)
    { this.currentSpeed = 0; }

    this.stamina += this.recoveryRate - this.currentSpeed / 1.5;
    if (this.stamina > 100)
    { this.stamina = 100; }
    if (this.stamina<0)
    {
        this.currentSpeed=0;
    }

    //add selfEsteem based on running speed;
    var selfEsteemDelta = (totalSpeed-1) * .016;
    this.selfEsteem += selfEsteemDelta;
    
    this.sprite.gotoAndStop(((this.position.x-this.startingPosition)/this.passo)%this.numeroFrame);

}