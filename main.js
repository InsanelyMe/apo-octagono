const FR = 30; // Frame Rate

let testTrig;
let canvasCenterX;
let canvasCenterY;
let octaRadius;
let octaSide;
let smallImgLongSide;
let smallImgShortSide;
let bigImgLongSide;
let bigImgShortSide;
let mainHugeImageShortSide;
// let mainHugeImageLongSide;

let xTransform, yTransform;

let testOctagon;

let activeTrig;
let bigImgsList = [];

let enlargedImage = null;

//  --------------------- Octagon Presentation ------------------------

// because all of this is client-side, we can't load everything in a pretty and efficient loop, oh no....
// ugly ass column of stupid variables required :(
// why? you ask... well damned images must follow damned order as per requirements. 'art'
var img_E_Big,img_E_00,img_E_01,img_E_02,img_E_03,img_E_04,img_E_10,img_E_11,img_E_12,img_E_13,img_E_m1,img_E_m2;
var img_N_Big,im_N_00,im_N_11,im_N_12,im_N_13,im_N_14,im_N_21,im_N_31,im_N_41,im_N_m1,im_N_m2;
var img_NE_Big,img_NE_00,img_NE_01,img_NE_02,img_NE_03,img_NE_04,img_NE_10,img_NE_11,img_NE_12,img_NE_m0,img_NE_m01,img_NE_m10;
var img_NW_Big,img_NW_00,img_NW_01,img_NW_02,img_NW_03,img_NW_10,img_NW_20,img_NW_m1,img_NW_m2;
var img_S_Big,img_S_00,img_S_11,img_S_01,img_S_02,img_S_12,img_S_13,img_S_m1,img_S_m2;
var img_SE_Big,img_SE_00,img_SE_01,img_SE_02,img_SE_10,img_SE_11;
var img_SW_Big,img_SW_00,img_SW_01,img_SW_02,img_SW_10,img_SW_11,img_SW_m0;
var img_W_Big,img_W_00,img_W_11,img_W_22,img_W_t0,img_W_t1,img_W_t2,img_W_b0,img_W_b1,img_W_b2,img_W_m0,img_W_m1,img_W_mt,img_W_mb;

//
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
  im_N_00   = loadImage("imgs/N/BACK STAGE SESION 6 CON FLASH_10A6840-1 copia.jpg");
  im_N_11   = loadImage("imgs/N/SESION 6 CON FLASH_10A6824-1 copia.jpg");
  im_N_12   = loadImage("imgs/N/SESION 6 CON FLASH_10A6831-1 copia.jpg");
  im_N_13   = loadImage("imgs/N/SESION 6 CON FLASH_10A6830-1 copia.jpg");
  im_N_14   = loadImage("imgs/N/SESION 6 CON FLASH_10A6839-1 copia.jpg");
  im_N_21   = loadImage("imgs/N/SESION 6 CON FLASH_10A6841-1 copia.jpg");
  im_N_31   = loadImage("imgs/N/SESION 6 CON FLASH_10A6825-1 copia.jpg");
  im_N_41   = loadImage("imgs/N/SESION 6 CON FLASH_10A6836-1 copia.jpg");
  im_N_m1   = loadImage("imgs/N/SESION 6 CON FLASH_10A6832-1 copia.jpg");
  im_N_m2   = loadImage("imgs/N/SESION 6 CON FLASH_10A6838-1 copia.jpg");
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
  img_SE_Big = loadImage("imgs/SE/novena sesion 2 parte_10A6905-1 copia 2.jpg");
  img_SE_00 = loadImage("imgs/SE/novena sesion 2 parte_10A6898-1.jpg");
  img_SE_01 = loadImage("imgs/SE/SESION__9_10A6885-1 copia.jpg");
  img_SE_02 = loadImage("imgs/SE/SESION_9_10A6895-1 copia.jpg");
  img_SE_10 = loadImage("imgs/SE/SESION_9_10A6877-1.jpg");
  img_SE_11 = loadImage("imgs/SE/novena sesion 2 parte_10A6910-1 copia.jpg");
  // Southwestern trig imgs
  img_SW_Big = loadImage("imgs/SW/_10A6025.jpg");
  img_SW_00 = loadImage("imgs/SW/novena sesion 2 parte_10A6897-1 copia.jpg");
  img_SW_01 = loadImage("imgs/SW/SESION 2_10A6067-1 copia.jpg");
  img_SW_02 = loadImage("imgs/SW/_10A6017.jpg");
  img_SW_10 = loadImage("imgs/SW/PENELOPE_R_ copia.jpg");
  img_SW_11 = loadImage("imgs/SW/PENELOPE_P_ copia.jpg");
  img_SW_m0 = loadImage("imgs/SW/novena sesion 2 parte_10A6896-1 copia.jpg");
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

  octaRadius = width/5;
  octaSide = floor(octaRadius * 0.8);

  smallImgLongSide = octaSide * 0.16;
  smallImgShortSide = octaSide * 0.125;
  bigImgLongSide = octaSide * 0.35;
  bigImgShortSide = octaSide * 0.26;

  // mainHugeImageLongSide = octaRadius * 2.5;
  // mainHugeImageShortSide = octaRadius * 2;

  xTransform = 0;
  yTransform = 0;

  testOctagon = new Octagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);

  testOctagon.linkBoundImgs();

  enlargedImage = new OctaImage("Mega Image", null, 0,0,1,1);
}




// --------------------- scene transformations ------------------------

function displayBigImage(bigImage) {
  let translationModifier = 1.6;
  xTransform = translationModifier * (activeTrig.AX - ((activeTrig.BX+activeTrig.CX)/2));
  yTransform = translationModifier * (activeTrig.AY - ((activeTrig.BY+activeTrig.CY)/2));



  if (bigIMG.isPortrait) {
    enlargedImage = new OctaImage("mega-"+bigImage.id, bigImage.image, (width*0.1)-xTransform, (height*0.075)-yTransform, width*0.55, height*0.9);
  } else {
    enlargedImage = new OctaImage("mega-"+bigImage.id, bigImage.image, (width*0.1)-xTransform, (height*0.075)-yTransform, width*0.8, height*0.75);
  }
  // enlargedImage.selected = true;
}



// ---------------------  EVENT HANDLERS ------------------------------

function mouseMoved(){
  // console.log("mX: "+mouseX+" mY: "+mouseY);
// check triangles for collision with mouse
  let trig;
  // last drawn object is foremost in ui, se we check trigs in reverse in order to stop the loop in case trigs overlap...
  for (var i = testOctagon.trigs.length; i --> 0;) {
    trig = testOctagon.trigs[i];
    if (trig.isMouseInMe()) {
      // we are in a triangle, so we put it at the en of our list
      testOctagon.trigs.push(testOctagon.trigs.splice(testOctagon.trigs.indexOf(trig), 1)[0]);
      trig.growing = true;
      // set global ref to the trig we have the mouse in
      activeTrig = trig;
      // check for collision in images within that triangle
      for (var i = trig.boundIMGs.length; i --> 0;) {
        let img = trig.boundIMGs[i];
        if (img.isMouseInMe()) {
          // same thing, put that image at the end of its array
          trig.boundIMGs.push(trig.boundIMGs.splice(trig.boundIMGs.indexOf(img), 1)[0]);
          img.hovered = true;
          break;
        } else {
          img.hovered = false;
        }
      }
      break;
    } else {
      trig.growing = false;
      trig.boundIMGs.forEach((img) => {
        img.hovered = false;
        img.selected = false;
      });
    }
  }
  bigImgsList.forEach((bigIMG) => {
    if (bigIMG.isMouseInMe()) {
      bigIMG.hovered = true;
    } else {
      bigIMG.hovered = false;
    }
  });
}

function mousePressed(){
  // check if we clicked anywhere inside the octagon so we can reset transform in case we didn't
  let shouldReset = true;
  for (var i = 0; i < testOctagon.trigs.length; i++) {
    let trig = testOctagon.trigs[i];
    if (trig.isMouseInMe()) {
      shouldReset = false;
    }
  }
  if (shouldReset) {
    console.log("reset transform");
    xTransform = 0;
    yTransform = 0;
    enlargedImage = null;
  }
  try {
    activeTrig.boundIMGs.forEach((img) => {
      if (img.hovered) {
        // console.log("mouse clicked on image: "+img.id);
        img.selected = true;
        displayBigImage(img);
      } else {
        img.selected = false;
      }
    });
  } catch (e) {
    console.log("problems with active trig...");
    console.log(e);
  }
  return false;
}

function keyPressed(){
  // if(keyCode === 32){ // 32 is p5 keycode for space
  //   xTransform = 0;
  //   yTransform = 0;
  //   console.log("reset scene transform");
  //   return false;
  // }
  if (key === "w") {
    yTransform -= 100;
  }
  if (key === "s") {
    yTransform += 100;
  }
  if (key === "a") {
    xTransform -= 100;
  }
  if (key === "d") {
    xTransform += 100;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  canvasCenterX = width/2;
  canvasCenterY = height/2;

  octaRadius = width/5;
  octaSide = floor(octaRadius * 0.8);

  smallImgLongSide = octaSide * 0.16;
  smallImgShortSide = octaSide * 0.125;
  bigImgLongSide = octaSide * 0.35;
  bigImgShortSide = octaSide * 0.26;

  // mainHugeImageLongSide = octaRadius * 2.5;
  // mainHugeImageShortSide = octaRadius * 2;

  testOctagon = new Octagon(canvasCenterX, canvasCenterY, octaRadius, octaSide);
  testOctagon.linkBoundImgs();
}


function draw() {
  background(13,13,13);
  translate(xTransform, yTransform);
  // image(img_E_Big,0,0,200,400);
  for (var i = 0; i < testOctagon.trigs.length; i++) {
    let trig = testOctagon.trigs[i];
    // console.log("drawing "+trig.heading);
    if (trig.growing) {
      // console.log("trig should be growing");
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
  }
  if (enlargedImage != null) {
    enlargedImage.drawMe();
  }
}
