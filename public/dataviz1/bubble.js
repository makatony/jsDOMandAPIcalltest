invincibilityThreshold = 100; //miliseconds of time to ignore further collisions when a collision is detected
maxVelocity = 2; //because bounciness of asteroids is based on their mass,eventuallly one gets very fast asteroids (assuming no friction)

function Bubble (obj) {
	this.r = obj.r||10;
	this.pos = obj.pos||createVector(10,10);
	this.mag = obj.mag||1;
	this.col = obj.col||120;
	this.strokeCol = 255;
	this.family = obj.family||"";
	this.members = obj.members||[];
	

	this.isAsteroid = false;
	this.velocity = createVector(0,0);
	this.invincible = 0;
	
	this.setInitPosition = function (pos) {
		this.pos = pos;
		this.initPos = pos.copy();
	}
	
	
	
	this.intersectsMouse = function () {
		return (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.r);
	}
	
	this.isColliding = function (obj) {
		if (millis() - this.invincible < invincibilityThreshold) return false;
		return (dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y) < this.r + obj.r);
	}
	this.update = function () {
		this.pos.add(this.velocity); //adds the velocity to current position.
		
		this.windowBorder();
	}
	
	this.draw = function (){
		if (this.isAsteroid) this.drawAsteroid();
		else this.drawBubble();
	}
	
	this.drawBubble = function () {
		fill(this.col);
		ellipse(this.pos.x,this.pos.y,this.r*2,this.r*2);
		if (this.intersectsMouse()) {
			fill(255);	rect(mouseX,mouseY,150,30);
			fill(0); 	text(this.family,mouseX,mouseY,150,30);
		}
	}
	
	this.resetBubble = function (){
		this.pos = this.initPos.copy(); //needs to add copy or else INITPOS will be changed every time that POS changes
		this.velocity = createVector(0,0);
		this.isAsteroid = false;
	}
	
	this.drawAsteroid = function () {
		push();
		stroke(this.strokeCol);
		noFill();
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (var i = 0; i < this.pointCount; i++) { //formulas: shiffman
			var angle = map(i, 0, this.pointCount, 0, TWO_PI);
			var r = this.r + this.edges[i];
			var x = r * cos(angle);
			var y = r * sin(angle);
			vertex(x, y);
		}
		endShape(CLOSE);
		pop();
	}
	
	this.resetAsteroid = function (){
		this.velocity = p5.Vector.random2D();
		this.pointCount = max(5,floor(this.r/2));
		this.edges = [];
		for (var i=0; i<this.pointCount;i++) {
			this.edges.push(random(-this.r/3,this.r/3));
		}
		this.isAsteroid = true;
	}
	
	this.explode = function (bubble) {
		this.invincible = millis();
	}
	
	this.bounces = function (bubble) {
		bubble.invincible = millis(); this.invincible = millis();
		
		//formulas: https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
		var collisionPointX = ((this.pos.x * bubble.r) + (bubble.pos.x * this.r)) / (this.r + bubble.r);
		var collisionPointY = ((this.pos.y * bubble.r) + (bubble.pos.y * this.r)) / (this.r + bubble.r);		
		fill(255,0,0);
		ellipse(collisionPointX,collisionPointY,10,10);

		//formulas: https://gamedevelopment.tutsplus.com/tutorials/when-worlds-collide-simulating-circle-circle-collisions--gamedev-769
		//formulas do not consider the tangent of the circle. only the angle of the vectors of the two objects		
		thisMass = this.r;
		bubbleMass = bubble.r;
		// if (bubbleMass > thisMass) bubbleMass *= .5; else thisMass *= .5;
		var thisNewVelX = (this.velocity.x * (thisMass - bubbleMass) + (2 * bubbleMass * bubble.velocity.x)) / (thisMass + bubbleMass);
		var thisNewVelY = (this.velocity.y * (thisMass - bubbleMass) + (2 * bubbleMass * bubble.velocity.y)) / (thisMass + bubbleMass);
		var bubbleNewVelX = (bubble.velocity.x * (bubbleMass - thisMass) + (2 * thisMass * this.velocity.x)) / (thisMass + bubbleMass);
		var bubbleNewVelY = (bubble.velocity.y * (bubbleMass - thisMass) + (2 * thisMass * this.velocity.y)) / (thisMass + bubbleMass);
		
		this.velocity.x = constrain(thisNewVelX,-1 * maxVelocity,maxVelocity);
		this.velocity.y = constrain(thisNewVelY,-1 * maxVelocity,maxVelocity);
		bubble.velocity.x = constrain(bubbleNewVelX,-1 * maxVelocity,maxVelocity);
		bubble.velocity.y = constrain(bubbleNewVelY,-1 * maxVelocity,maxVelocity);
	}
	
	this.windowBorder = function () {
		if (this.pos.x > width + this.r) {
			this.pos.x = -this.r;
		} else if (this.pos.x < -this.r) {
			this.pos.x = width + this.r;
		}
		if (this.pos.y > height + this.r) {
			this.pos.y = -this.r;
		} else if (this.pos.y < -this.r) {
			this.pos.y = height + this.r;
		}
	}
	
}