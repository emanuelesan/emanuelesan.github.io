 function ParallaxThing(x,y,sprite,_distanceFromFocus)
{
   
   PIXI.extras.TilingSprite.call(this,sprite,game.width,game.height);

   this.position.x = x;
   this.position.y = y;
   this.tilePosition.x = 0;
   this.tilePosition.y = 0;
   this.distanceFromFocus=_distanceFromFocus;
}

ParallaxThing.constructor = ParallaxThing;
ParallaxThing.prototype = Object.create(PIXI.extras.TilingSprite.prototype);
ParallaxThing.prototype.update =function(deltaX)
{
   this.tilePosition.x += deltaX*this.distanceFromFocus;
}