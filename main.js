const FR = 30; // Frame Rate

let testTrig = "";
let canvasCenterX = 0;
let canvasCenterY = 0;
let octaRadius = 0;
let octaSide = 0;
let testOctagon = [];

//  --------------------- Octagon Presentation ------------------------

class OctagonPiece {
  constructor(heading, AX, AY, BX, BY, CX, CY) {
    // heading is a string identifying the triangle's orientation
    // possible values: N NE E SE S SW W NW
    this.heading = heading;
    // rest of params are point coordinates for each of the 3 triangles' vertices
    this.AX = AX;
    this.AY = AY;
    this.BX = BX;
    this.BY = BY;
    this.CX = CX;
    this.CY = CY;

    this.vertices = [AX, AY, BX, BY, CX, CY];

    this.scale = 1.0;
    this.maxScale = 1.125;

    this.growing = false;
  }

  isMouseInMe() {
    // store mouse position in case some twitchy user moves it faster than this function runs...
    let mX = mouseX;
    let mY = mouseY;
    // get area of myself
    let areaOrig = floor(abs((this.BX - this.AX) * (this.CY - this.AY) - (this.CX - this.AX) * (this.BY - this.AY)));
    // console.log(this.heading + " triangle area: " + areaOrig);
    // make new triangles from the original's vertices to the point in question
    // get their areas too
    let area1 = floor(abs((this.AX - mX) * (this.BY - mY) - (this.BX - mX) * (this.AY - mY)));
    let area2 = floor(abs((this.BX - mX) * (this.CY - mY) - (this.CX - mX) * (this.BY - mY)));
    let area3 = floor(abs((this.CX - mX) * (this.AY - mY) - (this.AX - mX) * (this.CY - mY)));
    // console.log("Sum of other triangles areas: " + (area1 + area2 + area3));
    // if the sum of the 3 new areas fits in the original, then we are inside that triangle
    if((area1+area2+area3) <= areaOrig){
      return true;
    }
    return false;
  }

  drawMe(){
    if (this.growing){
      this.scale += 0.05;
      if(this.scale > this.maxScale){
        this.scale = this.maxScale;
      }
    } else {
      this.scale -= 0.04;
      if (this.scale < 1) {
        this.scale = 1;
      }
    }

    // temp gray color so I can see them...
    fill(50);
    // need to check heading so we can grow in the appropiate direction
    switch (this.heading) {
      case "N":
        triangle(this.AX,this.AY*this.scale,this.BX*this.scale,this.BY/this.scale,this.CX/this.scale,this.CY/this.scale);
        break;
      case "NE":
        // scale(this.scale)
        triangle(this.AX/this.scale,this.AY*this.scale,this.BX*this.scale,this.BY,this.CX,this.CY/this.scale);
        break;
      case "E":
        triangle(this.AX/this.scale,this.AY,this.BX*this.scale,this.BY/this.scale,this.CX*this.scale,this.CY*this.scale);
        break;
      case "SE":
        triangle(this.AX/this.scale,this.AY/this.scale,this.BX*this.scale,this.BY,this.CX,this.CY*this.scale);
        break;
      case "S":
        triangle(this.AX,this.AY/this.scale,this.BX*this.scale,this.BY*this.scale,this.CX/this.scale,this.CY*this.scale);
        break;
      case "SW":
        triangle(this.AX*this.scale,this.AY/this.scale,this.BX/this.scale,this.BY,this.CX,this.CY*this.scale);
        break;
      case "W":
        triangle(this.AX*this.scale,this.AY,this.BX/this.scale,this.BY/this.scale,this.CX/this.scale,this.CY*this.scale);
        break;
      case "NW":
        triangle(this.AX*this.scale,this.AY*this.scale,this.BX/this.scale,this.BY,this.CX,this.CY/this.scale);
        break;
      default:
        console.log("somehow attempted to draw a triangle that should not exist...");

    }
    // triangle(this.AX,this.AY,this.BX,this.BY,this.CX,this.CY);
  }
}

function makeOctagon(centerX, centerY, radius, arista) {
  let octaPieces = [];
  let a = arista/2;
  // N
  octaPieces.push(new OctagonPiece("N", centerX, centerY, centerX+a, centerY-radius, centerX-a, centerY-radius));
  // E
  octaPieces.push(new OctagonPiece("E", centerX, centerY, centerX+radius, centerY-a, centerX+radius, centerY+a));
  // S
  octaPieces.push(new OctagonPiece("S", centerX, centerY, centerX+a, centerY+radius, centerX-a, centerY+radius));
  // W
  octaPieces.push(new OctagonPiece("W", centerX, centerY, centerX-radius, centerY-a, centerX-radius, centerY+a));
  // NE
  octaPieces.push(new OctagonPiece("NE", centerX, centerY, centerX+radius, centerY-a, centerX+a, centerY-radius));
  // NW
  octaPieces.push(new OctagonPiece("NW", centerX, centerY, centerX-radius, centerY-a, centerX-a, centerY-radius));
  // SE
  octaPieces.push(new OctagonPiece("SE", centerX, centerY, centerX+radius, centerY+a, centerX+a, centerY+radius));
  // SW
  octaPieces.push(new OctagonPiece("SW", centerX, centerY, centerX-radius, centerY+a, centerX-a, centerY+radius));

  return octaPieces;
}

// --------------------------- main P5 functions ----------------------

function setup() {
  // get the p5 canvas into a div the fits with the rest of the page
  var splashContainer = document.getElementById("splashContainer");
  var splashCanvas = createCanvas(windowWidth,windowHeight);
  splashCanvas.parent(splashContainer);

  frameRate(FR);

  canvasCenterX = width/2;
  canvasCenterY = height/2;

  octaRadius = 350;
  octaSide = 280;
  // background(52,13,13);
  testOctagon = makeOctagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);
}


function draw() {
  background(25);



  // testTrig.drawMe();
  testOctagon.forEach((trig) => {
    trig.drawMe();
  });


  // temp visualize center point in canvas
  // fill(255);
  // noStroke();
  // ellipse(canvasCenterX, canvasCenterY, 5,5);
}

// ---------------------  EVENT HANDLERS ------------------------------

function mouseMoved(){
  // test octagon collision
  testOctagon.forEach((trig) => {
    if (trig.isMouseInMe()) {
      // console.log("triangle "+ trig.heading + " scale: "+ trig.scale);
      // we need this triangle at the end of the array so it gets drawn in front of all others...
      testOctagon.push(testOctagon.splice(testOctagon.indexOf(trig), 1)[0])
      trig.growing = true;
    } else {
      trig.growing = false;
    }
  });
}

function mousePressed(){
  // fill(13,91,13);
  // ellipse(mouseX, mouseY, 13,13);
}

function keyPressed(){
  // console.log("key: "+ key);
  // console.log("keyCode: "+ keyCode);
  if(keyCode === 32){ // 32 is p5 keycode for space
    clear();
    return false;
  }
}
