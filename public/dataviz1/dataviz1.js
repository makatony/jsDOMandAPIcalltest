bubbles = [];
mouseListeners = [];
mode = "Bubble";

function preload() {
	birdsAmerica = loadJSON("birds_north_america.json");
}


function setup() {
	createCanvas(750,600);
	
	var maxMagnitude = 0;
	var minMagnitude = 0;
	for (var i = 1; i < birdsAmerica.birds.length; i++) {
		if (i == 1) minMagnitude = birdsAmerica.birds[i].members.length
		thisMagnitude = birdsAmerica.birds[i].members.length;
		bubbles.push(new Bubble({ mag: thisMagnitude, family: birdsAmerica.birds[i].family, members: birdsAmerica.birds[i].members }));
		if (thisMagnitude > maxMagnitude) maxMagnitude = thisMagnitude;
		if (thisMagnitude < minMagnitude) minMagnitude = thisMagnitude;
	}
	// console.log(bubbles);

	//defines position vector without overlapping the ones that have been created yet
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].r = map(bubbles[i].mag,minMagnitude,maxMagnitude,0,25);
		bubbles[i].col = map(bubbles[i].mag,minMagnitude,maxMagnitude,100,255);
		
		var overlaps = true;
		while (overlaps) { //setting X and Y positions
			overlaps = false;
			bubbles[i].pos = createVector(random(bubbles[i].r,width-bubbles[i].r),random(bubbles[i].r,height-bubbles[i].r));
			for (var j = 0; j < i; j++) {
				if (bubbles[i].isColliding(bubbles[j])) overlaps = true;
			}
		}
	}
}

function draw () {
	background (0);
	noStroke();
	
	for (var i = 0; i < bubbles.length; i++) {
		bubbles[i].update();
		bubbles[i].draw();
	}

}

mouseListeners.push({ type:"mousePressed", fn:function () {
	console.log(mouseX);
}});


function keyPressed() {
	if (keyCode == 32) { //spacebar
		if (mode == "Asteroid") mode = "Bubble";
		else mode = "Asteroid";
		console.log(mode);
		if (mode == "Asteroid") {
			for (var i = 0; i < bubbles.length; i++) {
				if (bubbles[i].r > 5) bubbles[i].resetAsteroid();
			}
		} 
		else {
			for (var i = 0; i < bubbles.length; i++) {
				bubbles[i].resetBubble(); // -> POS is being set to UNDEFINED for some reason
			}
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



