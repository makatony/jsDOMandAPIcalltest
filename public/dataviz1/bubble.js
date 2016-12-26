function Bubble (obj) {
	this.r = obj.r||10;
	this.pos = obj.pos||createVector(10,10);
	this.mag = obj.mag||1;
	this.col = obj.col||120;
	this.family = obj.family||"";
	this.members = obj.members||[];
	
	this.isAsteroid = false;
	this.velocity = createVector(0,0);
	
	this.intersectsMouse = function () {
		return (dist(this.pos.x, this.pos.y, mouseX, mouseY) < this.r);
	}
	
	this.isColliding = function (obj) {
		return (dist(this.pos.x, this.pos.y, obj.pos.x, obj.pos.y) < this.r + obj.r);
	}
	this.update = function () {
		this.pos.add(this.velocity); //adds the velocity to current position.
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
	
	
	this.drawAsteroid = function () {
		push();
		stroke(255);
		noFill();
		translate(this.pos.x, this.pos.y);
		beginShape();
		for (var i = 0; i < this.pointCount; i++) {
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
		// this.originalPos = this.pos;
		this.velocity = p5.Vector.random2D();
		this.pointCount = random(5,15);
		this.edges = [];
		for (var i=0; i<this.pointCount;i++) {
			this.edges.push(random(-this.r/2,this.r/2));
		}
		
		this.isAsteroid = true;
	}
	
	this.resetBubble = function (){
		this.pos = this.originalPos;
		this.velocity = createVector(0,0);
		this.isAsteroid = false;
	}
	
	
}