familyData = [];
mouseListeners = [];
// maxMagnitude = 0;

function preload() {
	birdsAmerica = loadJSON("birds_north_america.json");
}


function setup() {
	createCanvas(750,750);
	
	var maxMagnitude = 0;
	var minMagnitude = 0;
	for (var i = 1; i < birdsAmerica.birds.length; i++) {
		if (i == 1) minMagnitude = birdsAmerica.birds[i].members.length
		thisMagnitude = birdsAmerica.birds[i].members.length;
		familyData.push(new Bubble({ mag: thisMagnitude, family: birdsAmerica.birds[i].family, members: birdsAmerica.birds[i].members }));
		if (thisMagnitude > maxMagnitude) maxMagnitude = thisMagnitude;
		if (thisMagnitude < minMagnitude) minMagnitude = thisMagnitude;
	}
	// console.log(familyData);
	
	for (var i = 0; i < familyData.length; i++) {
		var radius = map(familyData[i].mag,minMagnitude,maxMagnitude,0,25);
		familyData[i].r = radius;
		familyData[i].col = map(familyData[i].mag,minMagnitude,maxMagnitude,100,255);
		var overlaps = true;
		
		while (overlaps) {
		
			familyData[i].x = random(familyData[i].r,width-familyData[i].r);
			familyData[i].y = random(familyData[i].r,height-familyData[i].r);
			overlaps = false;
			
			for (var j = 0; j < i; j++) {
				if (familyData[i].isColliding(familyData[j])) overlaps = true;
			}
		}
	}
}

function draw () {
	background (0);
	noStroke();
	
	for (var i = 1; i < familyData.length; i++) {
		familyData[i].update();
		familyData[i].draw();
	}

}

mouseListeners.push({ type:"mousePressed", fn:function () {
		console.log(mouseX);
	}});


function Bubble (obj) {
	this.r = obj.r||10;
	this.x = obj.x||10;
	this.y = obj.y||10;
	this.mag = obj.mag||1;
	this.col = obj.col||120;
	this.family = obj.family||"";
	this.members = obj.members||[];
	// this.speed = obj.speed||p5.Vector.random2D();
	
	this.intersect = function () {
		return (dist(this.x, this.y, mouseX, mouseY) < this.r);
	}
	
	this.isColliding = function (obj) {
		return (dist(this.x, this.y, obj.x, obj.y) < this.r + obj.r);
	}
	this.update = function () {
	}
	
	this.draw = function () {
		fill(this.col);
		ellipse(this.x,this.y,this.r*2,this.r*2);
		if (this.intersect()) {
			fill(255);
			rect(mouseX,mouseY,150,30);
			fill(0);
			text(this.family,mouseX,mouseY,150,30);
		}
	}
}



// ############################
// #### UTIL: MOUSE EVENTS ####
// ############################

var doubleClickMS = 0;
var isDoubleClick = false;
var isMouseDrag = false;
var mousePressed = function () {
	this.isDoubleClick = (floor(millis()-doubleClickMS) <= 500?true:false); //for some reason this.isDoubleClick is passed to the functions without problems
	doubleClickMS = millis(); //resets doubleclick timer
	
	mouseEventCallHandlers("mousePressed",arguments);
	this.isMouseDrag = false;
}
var mouseClicked = function () { mouseEventCallHandlers("mouseClicked",arguments); this.isMouseDrag = false; }
var mouseReleased = function() { mouseEventCallHandlers("mouseReleased",arguments); this.isMouseDrag = false; }
var mouseDragged = function() {	this.isMouseDrag = true; mouseEventCallHandlers("mouseDragged",arguments); }
var mouseEventCallHandlers = function (type,arguments) { mouseListeners.forEach(function (elt) { if (elt.type == type) elt.fn.apply(this, arguments); } ); }


// #########################
// #### UTIL: UTILITIES ####
// #########################

function printR(obj) {
	return JSON.stringify(obj, null, 4);
}



