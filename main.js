const FR = 30; // Frame Rate

let testTrig;
let canvasCenterX;
let canvasCenterY;
let octaRadius;
let octaSide;
let testOctagon;

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

    this.OGverts = [AX, AY, BX, BY, CX, CY];
    this.currentVerts = [];

    this.growthRate = 13; // found this value after testing many different ones :P
    // should we be increasing in size?
    this.growing = false;
    // how many pixels can one of our points be displaced?
    this.maxGrowth = 69;

    // images contained by this triangle
    this.boundIMGs = []
  }


  updateVerts() {
      this.currentVerts = [this.AX, this.AY, this.BX, this.BY, this.CX, this.CY];
  }

  bigAsCanBe() {
    for (let i = 0; i < this.OGverts.length; i++) {
      if (abs(this.OGverts[i] - this.currentVerts[i]) > this.maxGrowth) {
        return true;
      }
    }
    return false;
  }

  smallAsCanBe(){
    for (let i = 0; i < this.OGverts.length; i++) {
      if (abs(this.OGverts[i] - this.currentVerts[i]) > 0) {
        return false;
      }
    }
    return true;
  }

  grow(){
    // need to check heading so we can grow in the appropiate direction
    switch (this.heading) {
      case "N":
        this.AY += this.growthRate;
        this.BX += this.growthRate;
        this.BY -= this.growthRate;
        this.CX -= this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "NE":
        this.AX -= this.growthRate;
        this.AY += this.growthRate;
        this.BX += this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "E":
        this.AX -= this.growthRate;
        this.BX += this.growthRate;
        this.BY -= this.growthRate;
        this.CX += this.growthRate;
        this.CY += this.growthRate;
        break;
      case "SE":
        this.AX -= this.growthRate;
        this.AY -= this.growthRate;
        this.BX += this.growthRate;
        this.CY += this.growthRate;
        break;
      case "S":
        this.AY -= this.growthRate;
        this.BX += this.growthRate;
        this.BY += this.growthRate;
        this.CX -= this.growthRate;
        this.CY += this.growthRate;
        break;
      case "SW":
        this.AX += this.growthRate;
        this.AY -= this.growthRate;
        this.BX -= this.growthRate;
        this.CY += this.growthRate;
        break;
      case "W":
        this.AX += this.growthRate;
        this.BX -= this.growthRate;
        this.BY -= this.growthRate;
        this.CX -= this.growthRate;
        this.CY += this.growthRate;
        break;
      case "NW":
        this.AX += this.growthRate;
        this.AY += this.growthRate;
        this.BX -= this.growthRate;
        this.CY -= this.growthRate;
        break;
      default:
        console.log("somehow attempted to grow a triangle that should not exist...");
      }
  }

  unGrow(){
    // need to check heading so we can ungrow in the appropiate direction
    switch (this.heading) {
      case "N":
        this.AY -= this.growthRate;
        this.BX -= this.growthRate;
        this.BY += this.growthRate;
        this.CX += this.growthRate;
        this.CY += this.growthRate;
        break;
      case "NE":
        this.AX += this.growthRate;
        this.AY -= this.growthRate;
        this.BX -= this.growthRate;
        this.CY += this.growthRate;
        break;
      case "E":
        this.AX += this.growthRate;
        this.BX -= this.growthRate;
        this.BY += this.growthRate;
        this.CX -= this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "SE":
        this.AX += this.growthRate;
        this.AY += this.growthRate;
        this.BX -= this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "S":
        this.AY += this.growthRate;
        this.BX -= this.growthRate;
        this.BY -= this.growthRate;
        this.CX += this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "SW":
        this.AX -= this.growthRate;
        this.AY += this.growthRate;
        this.BX += this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "W":
        this.AX -= this.growthRate;
        this.BX += this.growthRate;
        this.BY += this.growthRate;
        this.CX += this.growthRate;
        this.CY -= this.growthRate;
        break;
      case "NW":
        this.AX -= this.growthRate;
        this.AY -= this.growthRate;
        this.BX += this.growthRate;
        this.CY += this.growthRate;
        break;
      default:
        console.log("somehow attempted to ungrow a triangle that should not exist...");
      }
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
    // temp gray color so I can see them...
    fill(50,50,50,91);
    // noStroke();
    triangle(this.AX,this.AY,this.BX,this.BY,this.CX,this.CY);
  }

  drawBoundImgs(){
    // we have to draw each image in a specific point in each triangle:
    switch (this.heading) {
      case "N":
        break;
      case "E":
        image(img_E_Big, testOctagon.trig_E.CX, testOctagon.trig_E.AY-(octaSide/6), octaSide/4, octaSide/3);
        image(img_E_00, testOctagon.trig_E.AX+(octaSide/3), testOctagon.trig_E.AY-(octaSide/16), octaSide/7.5, octaSide/8);
        break;
      case "S":
        break;
      case "W":
        break;
      case "NE":
        break;
      case "NW":
        break;
      case "SE":
        break;
      case "SW":
        break;
      default:
        console.log("broken image rendering in 'drawBoundImgs'");

    }
  }
}



// ----------------- Create Octagon -----------------------------------

class Octagon {
  constructor(cX, cY, rad, a) {
    this.cX = cX;
    this.cY = cY;
    this.rad = rad;
    this.A = a/2;

    this.trig_N = undefined;
    this.trig_E = undefined;
    this.trig_S = undefined;
    this.trig_W = undefined;
    this.trig_NE = undefined;
    this.trig_NW = undefined;
    this.trig_SE = undefined;
    this.trig_SW = undefined;

    this.trigs = this.makeOctagon(cX, cY, rad, a/2);
  }

  makeOctagon(centerX, centerY, radius, a) {
    let octaPieces = [];
    // N
    this.trig_N = new OctagonPiece("N", centerX, centerY, centerX+a, centerY-radius, centerX-a, centerY-radius);
    octaPieces.push(this.trig_N);
    // E
    this.trig_E = new OctagonPiece("E", centerX, centerY, centerX+radius, centerY-a, centerX+radius, centerY+a);
    octaPieces.push(this.trig_E);
    // // S
    this.trig_S = new OctagonPiece("S", centerX, centerY, centerX+a, centerY+radius, centerX-a, centerY+radius);
    octaPieces.push(this.trig_S);
    // // W
    this.trig_W = new OctagonPiece("W", centerX, centerY, centerX-radius, centerY-a, centerX-radius, centerY+a);
    octaPieces.push(this.trig_W);
    // // NE
    this.trig_NE = new OctagonPiece("NE", centerX, centerY, centerX+radius, centerY-a, centerX+a, centerY-radius);
    octaPieces.push(this.trig_NE);
    // // NW
    this.trig_NW = new OctagonPiece("NW", centerX, centerY, centerX-radius, centerY-a, centerX-a, centerY-radius);
    octaPieces.push(this.trig_NW);
    // // SE
    this.trig_SE = new OctagonPiece("SE", centerX, centerY, centerX+radius, centerY+a, centerX+a, centerY+radius);
    octaPieces.push(this.trig_SE);
    // // SW
    this.trig_SW = new OctagonPiece("SW", centerX, centerY, centerX-radius, centerY+a, centerX-a, centerY+radius);
    octaPieces.push(this.trig_SW);

    return octaPieces;
  }
}




// --------------------------- main P5 functions ----------------------


// because all of this is client-side, we can't load everything in a pretty and efficient loop, oh no....
// ugly ass column of stupid variables required :(
// why? you ask... well damned images must follow damned order as per requirements. 'art'
// images that'll go in East triangle:
var img_E_Big,img_E_00,img_E_01,img_E_02,img_E_03,img_E_04,img_E_10,img_E_11,img_E_12,img_E_13,img_E_m1,img_E_m2;

function preload() {
  // loading our damned images... blame the artist for the amazing significant file-names ¬¬
  img_E_Big = loadImage("imgs/E/_10A6219-1.jpg");
  img_E_00 = loadImage("imgs/E/FAHR_02.jpg");
  img_E_01 = loadImage("imgs/E/FAHR_01.jpg");
  img_E_02 = loadImage("imgs/E/FAHR_00.jpg");
  img_E_03 = loadImage("imgs/E/_10A6217.jpg");
  img_E_04 = loadImage("imgs/E/LUZ DE LUNA_BB copia.jpg");
  img_E_10 = loadImage("imgs/E/PENELOPE_O_ .jpg");
  img_E_11 = loadImage("imgs/E/_10A6230.jpg");
  img_E_12 = loadImage("imgs/E/_10A6232.jpg");
  img_E_13 = loadImage("imgs/E/_10A6231.jpg");
  img_E_m1 = loadImage("imgs/E/_10A6233.jpg");
  img_E_m2 = loadImage("imgs/E/SESION 4_10A6234-1.jpg");
}

function setup() {
  // get the p5 canvas into a div the fits with the rest of the page
  var splashContainer = document.getElementById("splashContainer");
  var splashCanvas = createCanvas(windowWidth,windowHeight);
  splashCanvas.parent(splashContainer);

  frameRate(FR);

  canvasCenterX = width/2;
  canvasCenterY = height/2;

  // octaRadius = 350;
  // octaSide = 280;
  octaRadius = width/5;
  octaSide = floor(octaRadius * 0.8);
  // background(52,13,13);
  testOctagon = new Octagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);



  // loadImage('imgs/E/_10A6217.jpg', img => {
  //   testImg = img;
  //   image(img, 0, 0);
  // });

}


function draw() {
  background(25);
  // image(img_E_Big,0,0,200,400);


  // testTrig.drawMe();
  testOctagon.trigs.forEach((trig) => {
    // console.log(trig.OGverts);
    // console.log(trig.currentVerts);
    if (trig.growing) {
      // console.log("trig should be growing");
      // console.log(trig.bigAsCanBe());
      if (!trig.bigAsCanBe()) {
        // console.log("not at max size");
        trig.grow();
      }
    } else {
      // console.log("trig should NOT be growing");
      if (!trig.smallAsCanBe()) {
        // console.log("trig not at min size");
        trig.unGrow();
      }
    }
    trig.updateVerts();
    trig.drawMe();
    trig.drawBoundImgs();
  });
  // temp visualize center point in canvas
  // fill(255);
  // noStroke();
  // ellipse(canvasCenterX, canvasCenterY, 5,5);
}

// ---------------------  EVENT HANDLERS ------------------------------

function mouseMoved(){
  // test octagon collision
  testOctagon.trigs.forEach((trig) => {
    if (trig.isMouseInMe()) {
      // we need this triangle at the end of the array so it gets drawn in front of all others...
      testOctagon.trigs.push(testOctagon.trigs.splice(testOctagon.trigs.indexOf(trig), 1)[0])
      // console.log(trig.heading+" growing");
      trig.growing = true;
    } else {
      // console.log(trig.heading+" shrinking");
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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasCenterX = width/2;
  canvasCenterY = height/2;
  octaRadius = width/5;
  octaSide = floor(octaRadius * 0.8);
  testOctagon = new Octagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);
}
