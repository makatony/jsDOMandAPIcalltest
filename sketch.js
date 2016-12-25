var randomText;
var spacepeople;
loadCallback = function(){ };
loadErrorCallback = function(e){ alert("a"); console.log("error"); };


function preload() {
	preloadRandomText();
	preloadSpacePeople();
}


function setup() {
	noCanvas();

	setupRandomText();
	setupSpacePeople();
	setupDOMmanipulations();
	
}

// ############################
// #### UTIL: MOUSE EVENTS ####
// ############################

mouseListeners = [];
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


// ###########################
// #### DOM MANIPULATIONS ####
// ###########################

var setupDOMmanipulations = function() {
	var someIDP = select("#someID");
	someIDP.html("aaa");
	someIDP.style("color: red");

	var someClassP = selectAll(".someClass");
	someClassP.forEach(function (elt) {
		elt.style("color: red");
		elt.mouseOver(mouseOverEvent);
		console.log(printR(elt));
	});

	console.log(printR(someClassP));
	console.log(someClassP);

	createA("https://www.quora.com/What-is-the-difference-between-JSON-and-JSONP","JSON vs JSONP");
}

var mouseOverEvent = function () {
	this.style("color: pink");
}



// ########################
// #### RANDOMTEXT API ####
// ########################

var preloadRandomText = function() {
	var url = 'http://www.randomtext.me/api/'; //this API doesnt support JSONP
	randomText = loadJSON(url,loadCallback,loadErrorCallback,"json");
}
var setupRandomText = function() {
	if (randomText) {
		randomTextP = createP("randomText");
		randomTextP.html(randomText.text_out);
		Object.assign(randomText, { a: { b: "text", c: "some text" } })
		console.log(printR(randomText));
	}
}





// #########################
// #### SPACEPEOPLE API ####
// #########################

var preloadSpacePeople = function(){
	var url = 'http://api.open-notify.org/astros.json';
	spacepeople = loadJSON(url,loadCallback,loadErrorCallback,"jsonp");
}
var setupSpacePeople = function(){
	if (spacepeople) {
		spacePeopleP = createP("spacepeople");
		spacePeopleP.html(printR(spacepeople));
		print(printR(spacepeople));
	}
}