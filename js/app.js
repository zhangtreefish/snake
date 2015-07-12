var canvas, ctx;
// Try other values!
var numberOfSegments = 15;
// Length of each segment of the snake
var segLength = 25;

// Arrays of w,y positions of each coordinate system
// one for each segment
// Trick to create arrays filled with zero values
var x = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf,0);

var y = Array.apply(null, Array(numberOfSegments)).map(Number.prototype.valueOf,0);var mousePos;
var imagesToLoad = {
				skin: 'http://spidermex.net/clock1/images/skin1.jpg',
				tail: 'http://spidermex.net/clock1/images/rattle.jpg',
				head: 'http://spidermex.net/clock1/images/head1.png',
                backgd: 'http://spidermex.net/clock1/images/lawn1.png',
                bkg2: 'http://spidermex.net/clock1/images/lawn0.png'
			};

function loadImages(imagesToBeLoaded, drawCallback) {
   var imagesLoaded = {};
   var loadedImages = 0;
   var numberOfImagesToLoad = 0;

	// get num of sources
	for(var name1 in imagesToBeLoaded) {
		numberOfImagesToLoad++;
	}

	for(var name in imagesToBeLoaded) {
		imagesLoaded[name] = new Image();
		imagesLoaded[name].onload = function() {
		if(++loadedImages >= numberOfImagesToLoad) {
			drawCallback(imagesLoaded);
		}
	    };
	    imagesLoaded[name].src = imagesToBeLoaded[name];
	  }
 }

function init() {
  canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext('2d');

   loadImages(imagesToLoad, function(imagesLoaded) {
      patSkin = ctx.createPattern(imagesLoaded.skin, 'repeat');
	  patTail = ctx.createPattern(imagesLoaded.tail, 'repeat');
      patBack = ctx.createPattern(imagesLoaded.backgd, 'repeat');
      headObj = imagesLoaded.head;
      fondo = imagesLoaded.bkg2;
   });

  canvas.addEventListener('mousemove', function (evt) {
    mousePos = getMousePos(canvas, evt);
  }, false);


  // starts animation
  requestAnimationFrame(animate);
}


function getMousePos(canvas, evt) {
   // necessary to take into account CSS boundaries
   var rect = canvas.getBoundingClientRect();
   return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
   };
}

function animate() {
   ctx.clearRect(0, 0, canvas.width, canvas.height);

  // ADD A NICE BACKGROUND HERE?
  //ctx.drawImage(fondo,0,0,100,100);

  // draw the snake, only when the mouse entered at
  // least once the canvas surface
  if(mousePos !== undefined) {
     drawSnake(mousePos.x, mousePos.y);
  }

  // DRAW EXTRA THINGS HERE?

  requestAnimationFrame(animate);
}

function drawSnake(posX, posY) {
      // DRAW BETTER HEAD HERE?

      dragSegment(0, posX - 8, posY - 8);

      for(var i=0; i < x.length-1; i++) {
         dragSegment(i+1, x[i], y[i]);
      }

      // DRAW BETTER TAIL HERE ?
}

function dragSegment(i,  xin,  yin) {
   dx = xin - x[i];
   dy = yin - y[i];

   angle = Math.atan2(dy, dx);

   x[i] = xin - Math.cos(angle) * segLength;
   y[i] = yin - Math.sin(angle) * segLength;

  ctx.save();
  ctx.translate(x[i], y[i]);
  ctx.rotate(angle);

  var segColor;

  // Generate funny colors, CHANGE THIS IF YOU LIKE
  if (i % 3 == 1)
    segColor = getRandomColor();
  else if (i % 3 == 2)
    segColor = getRandomColor();
  else
    segColor = getRandomColor();
  ctx.lineCap='round';
  ctx.lineJoin='round';
  if (i<1){ctx.drawImage(headObj,0,-14);}
  else
    {drawLine(0, 0, segLength, 0, patSkin, 28-i);}
  if (i>numberOfSegments-2) {
    drawLine(0, 0, segLength, 0, patTail, 28-i);
  }

  ctx.restore();
}

function drawLine(x1, y1, x2, y2, color, width) {
  ctx.save();
  ctx.strokeStyle = color;
  ctx.lineWidth = width;

  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
  ctx.restore();
}

// http://stackoverflow.com/a/1527820
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomColor() {
  var r = getRandomInt(0, 250);
  var g = getRandomInt(20, 250);
  var b = getRandomInt(40, 250);
  return "rgb(" + r + "," + g + "," + b + ")";
}


