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
    this.boundIMGs = [];
    // should imgs be big?
    this.bigImgs = false;
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
    let smallImgLongSide = octaSide * 0.16;
    let smallImgShortSide = octaSide * 0.125;
    let bigImgLongSide = octaSide * 0.3;
    let bigImgShortSide = octaSide * 0.25;
    switch (this.heading) {
      case "N":
        image(img_N_Big, this.AX-(bigImgLongSide*0.5), this.AY-(octaRadius+bigImgShortSide*0.3))
        image(im_N_00, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_11, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_12, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_13, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_14, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_21, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_31, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_41, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_m1, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        image(im_N_m2, this.AX, this.AY, smallImgLongSide, smallImgShortSide);
        break;
      case "E":
        image(img_E_Big, this.AX+(octaRadius+(octaSide*0.3)), this.AY-(octaSide*0.16), octaSide*0.25, octaSide*0.3);
        image(img_E_00, this.AX+(octaRadius*0.2), this.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide);
        image(img_E_01, ((this.AX+this.CX)*0.5)-(smallImgShortSide*1.8), ((this.AY+this.CY)*0.5)-(smallImgLongSide*1.4), smallImgShortSide, smallImgLongSide-10);
        image(img_E_02, ((this.AX+this.CX)*0.5)-(smallImgShortSide*0.5), ((this.AY+this.CY)*0.5)-(smallImgLongSide*1.2), smallImgShortSide, smallImgLongSide);
        image(img_E_03, ((this.AX+this.CX)*0.5)+(smallImgShortSide*1.2), ((this.AY+this.CY)*0.5)-(smallImgLongSide*0.8), smallImgShortSide+5, smallImgLongSide+5);
        image(img_E_04, ((this.AX+this.CX)*0.5)+(smallImgShortSide*3.2), ((this.AY+this.CY)*0.5)-(smallImgLongSide*0.3), smallImgShortSide+8, smallImgLongSide+8);
        image(img_E_10, ((this.AX+this.BX)*0.5)-(smallImgShortSide*1.8), ((this.AY+this.BY)*0.5)+(smallImgLongSide*0.6), smallImgShortSide, smallImgLongSide);
        image(img_E_11, ((this.AX+this.BX)*0.5)-(smallImgShortSide*0.5), ((this.AY+this.BY)*0.5)+(smallImgLongSide*0.3), smallImgShortSide, smallImgLongSide);
        image(img_E_12, ((this.AX+this.BX)*0.5)+(smallImgShortSide*1.2), ((this.AY+this.BY)*0.5)-(smallImgLongSide*0.3), smallImgShortSide+5, smallImgLongSide+5);
        image(img_E_13, ((this.AX+this.BX)*0.5)+(smallImgShortSide*3.2), ((this.AY+this.BY)*0.5)-(smallImgLongSide*1), smallImgShortSide+8, smallImgLongSide+8);
        image(img_E_m1, this.AX+(octaRadius-(smallImgShortSide*3.5)), this.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide);
        image(img_E_m2, this.AX+(octaRadius-(smallImgShortSide*2)), this.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide);
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
    if (this.growing) {
      this.boundIMGs.forEach((img) => {
        img.resize(img.width*2, img.height*2);
      });
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

  linkBoundImgs(){
    this.trigs.forEach((trig) => {
      switch (trig.heading) {
        case "N":
          trig.boundIMGs.push(img_N_Big);
          trig.boundIMGs.push(im_N_00);
          trig.boundIMGs.push(im_N_11);
          trig.boundIMGs.push(im_N_12);
          trig.boundIMGs.push(im_N_13);
          trig.boundIMGs.push(im_N_14);
          trig.boundIMGs.push(im_N_21);
          trig.boundIMGs.push(im_N_31);
          trig.boundIMGs.push(im_N_41);
          trig.boundIMGs.push(im_N_m1);
          trig.boundIMGs.push(im_N_m2);
          break;
        case "E":
          trig.boundIMGs.push(img_E_Big);
          trig.boundIMGs.push(img_E_00);
          trig.boundIMGs.push(img_E_01);
          trig.boundIMGs.push(img_E_02);
          trig.boundIMGs.push(img_E_03);
          trig.boundIMGs.push(img_E_04);
          trig.boundIMGs.push(img_E_10);
          trig.boundIMGs.push(img_E_11);
          trig.boundIMGs.push(img_E_12);
          trig.boundIMGs.push(img_E_13);
          trig.boundIMGs.push(img_E_m1);
          trig.boundIMGs.push(img_E_m2);
          break;
        case "S":
          trig.boundIMGs.push(img_S_Big);

          break;
        case "W":
        trig.boundIMGs.push(img_W_Big);

          break;
        case "NE":
        trig.boundIMGs.push(img_NE_Big);

          break;
        case "NW":
        trig.boundIMGs.push(img_NW_Big);

          break;
        case "SE":
        trig.boundIMGs.push(img_SE_Big);

          break;
        case "SW":
        trig.boundIMGs.push(img_SW_Big);

          break;
        default:

      }
    });

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
  // Eastern trig imgs
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
  // Northern trig imgs
  img_N_Big = loadImage("imgs/N/SESION 6 CON FLASH_10A6829-1 copia.jpg");
  im_N_00 = loadImage("imgs/N/BACK STAGE SESION 6 CON FLASH_10A6840-1 copia.jpg");
  im_N_11 = loadImage("imgs/N/SESION 6 CON FLASH_10A6824-1 copia.jpg");
  im_N_12 = loadImage("imgs/N/SESION 6 CON FLASH_10A6831-1 copia.jpg");
  im_N_13 = loadImage("imgs/N/SESION 6 CON FLASH_10A6830-1 copia.jpg");
  im_N_14 = loadImage("imgs/N/SESION 6 CON FLASH_10A6839-1 copia.jpg");
  im_N_21 = loadImage("imgs/N/SESION 6 CON FLASH_10A6841-1 copia.jpg");
  im_N_31 = loadImage("imgs/N/SESION 6 CON FLASH_10A6825-1 copia.jpg");
  im_N_41 = loadImage("imgs/N/SESION 6 CON FLASH_10A6836-1 copia.jpg");
  im_N_m1 = loadImage("imgs/N/SESION 6 CON FLASH_10A6832-1 copia.jpg");
  im_N_m2 = loadImage("imgs/N/SESION 6 CON FLASH_10A6838-1 copia.jpg");
  // Northeastern Trig imgs
  img_NE_Big = loadImage("imgs/NE/FAHR_03.jpg");
  img_NE_00 = loadImage("imgs/NE/FAHR_10.jpg");
  img_NE_01 = loadImage("imgs/NE/FAHR_08.jpg");
  img_NE_02 = loadImage("imgs/NE/FAHR_12.jpg");
  img_NE_03 = loadImage("imgs/NE/FAHR_07.jpg");
  img_NE_04 = loadImage("imgs/NE/FAHR_06.jpg");
  img_NE_10 = loadImage("imgs/NE/FAHR_11.jpg");
  img_NE_11 = loadImage("imgs/NE/FAHR_09.jpg");
  img_NE_12 = loadImage("imgs/NE/FAHR_04.jpg");
  img_NE_m0 = loadImage("imgs/NE/FAHR_13.jpg");
  img_NE_m01 = loadImage("imgs/NE/FAHR_14.jpg");
  img_NE_m10 = loadImage("imgs/NE/FAHR_05.jpg");
  // Northwestern trig imgs
  img_NW_Big = loadImage("imgs/NW/_10A5996.jpg");
  img_NW_00 = loadImage("imgs/NW/_10A6035.jpg");
  img_NW_01 = loadImage("imgs/NW/_10A6528.jpg");
  img_NW_02 = loadImage("imgs/NW/_10A6521.jpg");
  img_NW_03 = loadImage("imgs/NW/_10A6528.jpg");
  img_NW_10 = loadImage("imgs/NW/7 SESION_10A6498-1.jpg");
  img_NW_20 = loadImage("imgs/NW/_10A6045.jpg");
  img_NW_m1 = loadImage("imgs/NW/_10A5981.jpg");
  img_NW_m2 = loadImage("imgs/NW/7 SESION_10A6730-3.jpg");
  // Southern trig imgs
  img_S_Big = loadImage("imgs/S/edith azul_z.jpg");
  img_S_00 = loadImage("imgs/S/DISTORSION AZUL Y ROJO SEGUNDA SESION_ddd copia.jpg");
  img_S_11 = loadImage("imgs/S/_10A6819-1.jpg");
  img_S_01 = loadImage("imgs/S/SESION 6 CON FLASH_10A6813-1 copia.jpg");
  img_S_02 = loadImage("imgs/S/7 SESION_10A5960-1 copia.jpg");
  img_S_12 = loadImage("imgs/S/LUZ DE LUNA_AA copia.jpg");
  img_S_13 = loadImage("imgs/S/7 SESION_10A5965-1 copia.jpg");
  img_S_m1 = loadImage("imgs/S/7 SESION_10A6403-1.jpg");
  img_S_m2 = loadImage("imgs/S/7 SESION_10A5956-1 copia.jpg");
  // Southeastern trig imgs
  img_SE_Big = loadImage("imgs/SE/_10A6025.jpg");
  img_SE_00 = loadImage("imgs/SE/novena sesion 2 parte_10A6897-1 copia.jpg");
  img_SE_01 = loadImage("imgs/SE/SESION 2_10A6067-1 copia.jpg");
  img_SE_02 = loadImage("imgs/SE/_10A6017.jpg");
  img_SE_10 = loadImage("imgs/SE/PENELOPE_R_ copia.jpg");
  img_SE_11 = loadImage("imgs/SE/PENELOPE_P_ copia.jpg");
  img_SE_m0 = loadImage("imgs/SE/novena sesion 2 parte_10A6896-1 copia.jpg");
  // Southwestern trig imgs
  img_SW_Big = loadImage("imgs/SW/");
  img_SW_00 = loadImage("imgs/SW/");
  img_SW_01 = loadImage("imgs/SW/");
  img_SW_02 = loadImage("imgs/SW/");
  img_SW_10 = loadImage("imgs/SW/");
  img_SW_11 = loadImage("imgs/SW/");
  // Western trig buttload of imgs :')
  img_W_Big = loadImage("imgs/W/00_A y E_ copia-1.jpg");
  img_W_00 = loadImage("imgs/W/PENELOPE_M_ copia.jpg");
  img_W_11 = loadImage("imgs/W/PENELOPE_Q_ copia.jpg");
  img_W_22 = loadImage("imgs/W/_10A6014.jpg");
  img_W_t0 = loadImage("imgs/W/_10A6524.jpg");
  img_W_t1 = loadImage("imgs/W/Angel y edith copia.jpg");
  img_W_t2 = loadImage("imgs/W/DISTORSION AZUL Y ROJO SEGUNDA SESION_BB copia.jpg");
  img_W_b0 = loadImage("imgs/W/7 SESION_10A6594-1 copia.jpg");
  img_W_b1 = loadImage("imgs/W/PENELOPE_N_ copia.jpg");
  img_W_b2 = loadImage("imgs/W/_10A6026.jpg");
  img_W_m0 = loadImage("imgs/W/PENELOPE_s_ copia.jpg");
  img_W_m1 = loadImage("imgs/W/fahr distorsion azul y roja 2 sesion.jpg");
  img_W_mt = loadImage("imgs/W/AZUL Y ROSA SEGUNDA SESION_AA copia.jpg");
  img_W_mb = loadImage("imgs/W/escultura_1 copia.jpg");
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

  testOctagon.linkBoundImgs();

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

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasCenterX = width/2;
  canvasCenterY = height/2;
  octaRadius = width/5;
  octaSide = floor(octaRadius * 0.8);
  testOctagon = new Octagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);
}
