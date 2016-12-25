var randomText;
var spacepeople;
loadCallback = function(){ };
loadErrorCallback = function(e){ alert("a"); console.log("error"); };


function preload() {
	var url = 'http://www.randomtext.me/api/'; //this API doesnt support JSONP
	randomText = loadJSON(url,loadCallback,loadErrorCallback,"json");
	var url = 'http://api.open-notify.org/astros.json';
	spacepeople = loadJSON(url,loadCallback,loadErrorCallback,"jsonp");
}


function setup() {
	noCanvas();
	if (randomText) {
		randomTextP = createP("randomText");
		randomTextP.html(randomText.text_out);
		Object.assign(randomText, { a: { b: "text", c: "some text" } })
		console.log(printR(randomText));
	}
	
	if (spacepeople) {
		spacePeopleP = createP("spacepeople");
		spacePeopleP.html(printR(spacepeople));
		print(printR(spacepeople));
	}
	
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

function mouseOverEvent() {
	this.style("color: pink");
}


function printR(obj) {
	return JSON.stringify(obj, null, 4);
}

