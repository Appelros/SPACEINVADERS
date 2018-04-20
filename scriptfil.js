var position = 295;  //skeppets position
var flyttaSkeppHöger = false;
var flyttaSkeppVänster = false;
var skeppTimeout;
var kanSkjuta = true; ;
var skottPositionTop = 420;
var y = 420;
var points = 0;
var xSkott = 0;



/*Sätter css för skeppets position. Den har redan en position i style.css
men måste sätta den till samma i javascript för att det ska fungera.*/
function start() {
	document.getElementById("skepp").style.left = 295 + "px";
	document.getElementById("skott").style.top = 420 + "px";
	document.getElementById("monster").style.left = 0 + "px";
}

setTimeout(function(){ 
if(document.getElementById("monster").style.left.replace('px', '') * 1 < 5000){
		document.getElementById("monster").style.left = document.getElementById("monster").style.left.replace('px', '') * 1 + 20 + "px";
	}
 }, 30);


/*Funktionen kollar vilken knapp som trycks ned. Om knappen är A eller D aktiveras en boolean.
Är knappen inte A eller D händer ingenting.
 */
onkeydown = function (e) {
	if ((e.keyCode) == 68) {
		flyttaSkeppHöger = true;
		flyttaSkeppVänster = false;
		clearTimeout(skeppTimeout);
		flyttaSkepp();
	} else if ((e.keyCode) == 65) {
		flyttaSkeppHöger = false;
		flyttaSkeppVänster = true;
		clearTimeout(skeppTimeout);
		flyttaSkepp();
	} else if ((e.keyCode) == 32) {
		if (kanSkjuta == true) {
			document.getElementById("skott").style.backgroundColor = "white";
			document.getElementById("skott").style.left = x + 20 + "px";
			document.getElementById("skott").style.top = 420 + "px";
			xSkott = x;
			skottPositionTop = 420;  //placerar skottet vid skeppets mynning
			kanSkjuta = false; //gör så att man bara kan skjuta ett skott åt gången och inte spamma
			skjut();
		}
	}
}
//Om någon piltangent släpps kommer skeppet sluta åka åt det hållet.
onkeyup = function (e) {
	if ((e.keyCode) === 65 || (e.keyCode) === 68) {
		clearTimeout(skeppTimeout);
	}
}
var x = 295;
//Flyttar skeppet
function flyttaSkepp() {
	//x är till för att underlätta jämförelserna nedan
	x = document.getElementById("skepp").style.left.replace('px', '') * 1;

	//Flyttar skeppet en pixel varannan sekund
	skeppTimeout = setTimeout(function () {
			//Kollar om skeppet är längst åt höger, isf går det ej att åka mer åt det hållet
			if (x < 590) {
				if (flyttaSkeppHöger === true) {
					position = position + 1;
					document.getElementById("skepp").style.left = position + "px";
				}

			}
			//Kollar om skeppet är på vänsterkanten, isf går det ej att åka mer åt det hållet
			if (x > 0) {
				if (flyttaSkeppVänster === true) {
					position = position - 1;
					document.getElementById("skepp").style.left = position + "px";
				}
			}
			flyttaSkepp();
		}, 2);
}



function skjut() {
	y = document.getElementById("skott").style.top.replace('px', '') * 1;  
	if (y <= 0) { //är skottet längst upp på kanten försvinner skottet
		document.getElementById("skott").style.backgroundColor = "black";
		clearTimeout(skjutaTimeout);
		kanSkjuta = true;
	} else if(kanSkjuta == false){ 
		document.getElementById("skott").style.backgroundColor = "white";
		skjutaTimeout = setTimeout(function () { //flyttar skottet uppåt 5 pixlar var 10:e ms
				if (y > 0) {
					krockCheck();
					skottPositionTop = skottPositionTop - 5;
					x = document.getElementById("skepp").style.left.replace('px', '') * 1;
					document.getElementById("skott").style.top = skottPositionTop + "px";
					skjut();
				}
			}, 10);
	}
}

function krockCheck(){
	if(document.getElementById("monster").style.left.replace('px', '') > xSkott && xSkott > document.getElementById("monster").style.left.replace('px', '')){ //kollar om skottets x-koordinater är inline med monstret
		if(skottPositionTop<74){ //kollar om skottet har nått upp till monstrets höjd
			document.getElementById("skott").style.backgroundColor = "black";
			clearTimeout(skjutaTimeout);
			kanSkjuta = true;  //kan skjuta igen
			points = points + 5;
			document.getElementById("points").innerHTML = "Score: " + points;
		}
	}
	
}