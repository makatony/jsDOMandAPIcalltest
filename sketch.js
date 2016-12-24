var randomText;

function preload() {
  var url = 'http://www.randomtext.me/api/';
  randomText = loadJSON(url);
}


function setup() {
	noCanvas();
	randomTextP = createP("randomText");
	randomTextP.html(randomText.text_out);
	Object.assign(randomText, { a: { b: "text", c: "some text" } })
	console.log(JSON.stringify(randomText, null, 4));
	
}

