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
      let anchorX, anchorY;
      switch (trig.heading) {
        case "N":
          trig.boundIMGs.push(new OctaImage("img_N_Big", img_N_Big, trig.AX-((bigImgLongSide+15)*0.5), trig.AY-((octaRadius*1.05)+bigImgShortSide), bigImgLongSide+15, bigImgShortSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("im_N_00", im_N_00, trig.AX-(smallImgShortSide/2), trig.AY-(octaRadius*0.32), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_11", im_N_11, trig.AX-(smallImgShortSide/2), trig.AY-(octaRadius*0.5), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("im_N_12", im_N_12, anchorX, anchorY-(smallImgLongSide), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_13", im_N_13, anchorX-(smallImgShortSide*0.5), anchorY-(smallImgLongSide*2.3), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_14", im_N_14, anchorX-(smallImgShortSide*1.2), anchorY-(smallImgLongSide*3.6), smallImgLongSide, smallImgShortSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("im_N_21", im_N_21, anchorX-(smallImgLongSide), anchorY-(smallImgLongSide*1.15), smallImgLongSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_31", im_N_31, anchorX-(smallImgShortSide*0.4), anchorY-(smallImgLongSide*2.3), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_41", im_N_41, anchorX-(smallImgShortSide*0.1), anchorY-(smallImgLongSide*3.4), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_m1", im_N_m1,  trig.AX-(smallImgLongSide/2), trig.AY-(octaRadius*0.79), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("im_N_m2", im_N_m2,  trig.AX-(smallImgLongSide/2), trig.AY-(octaRadius*0.91), smallImgLongSide, smallImgShortSide, trig));
          break;
        case "E":
          trig.boundIMGs.push(new OctaImage("img_E_Big", img_E_Big, trig.AX+(octaRadius+(octaSide*0.05)), trig.AY-(bigImgLongSide*0.5), bigImgShortSide, bigImgLongSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_E_00", img_E_00, trig.AX+(octaRadius*0.2), trig.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_E_01", img_E_01, anchorX-(smallImgShortSide*1.8), anchorY-(smallImgLongSide*1.4), smallImgShortSide, smallImgLongSide-10, trig));
          trig.boundIMGs.push(new OctaImage("img_E_02", img_E_02, anchorX-(smallImgShortSide*0.5), anchorY-(smallImgLongSide*1.2), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_E_03", img_E_03, anchorX+(smallImgShortSide*1.2), anchorY-(smallImgLongSide*0.8), smallImgShortSide+5, smallImgLongSide+5, trig));
          trig.boundIMGs.push(new OctaImage("img_E_04", img_E_04, anchorX+(smallImgShortSide*3.2), anchorY-(smallImgLongSide*0.3), smallImgShortSide+8, smallImgLongSide+8, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_E_10", img_E_10, anchorX-(smallImgShortSide*1.8), anchorY+(smallImgLongSide*0.6), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_E_11", img_E_11, anchorX-(smallImgShortSide*0.5), anchorY+(smallImgLongSide*0.3), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_E_12", img_E_12, anchorX+(smallImgShortSide*1.2), anchorY-(smallImgLongSide*0.3), smallImgShortSide+5, smallImgLongSide+5, trig));
          trig.boundIMGs.push(new OctaImage("img_E_13", img_E_13, anchorX+(smallImgShortSide*3.2), anchorY-(smallImgLongSide), smallImgShortSide+8, smallImgLongSide+8, trig));
          trig.boundIMGs.push(new OctaImage("img_E_m1", img_E_m1, trig.AX+(octaRadius-(smallImgShortSide*3.5)), trig.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_E_m2", img_E_m2, trig.AX+(octaRadius-(smallImgShortSide*2)), trig.AY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          break;
        case "S":
          trig.boundIMGs.push(new OctaImage("img_S_Big", img_S_Big, trig.AX-(bigImgLongSide/2), trig.AY+(octaRadius*1.05), bigImgLongSide, bigImgShortSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_S_00", img_S_00, trig.AX-(smallImgLongSide/2),  trig.AY+(octaRadius*0.2), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_S_11", img_S_11, trig.AX-(smallImgLongSide/2),  trig.AY+(octaRadius*0.32), smallImgLongSide, smallImgShortSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_S_01", img_S_01, anchorX,  anchorY+(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_S_02", img_S_02, anchorX-smallImgShortSide,  anchorY+(smallImgLongSide*2.5), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_S_12", img_S_12, anchorX-(smallImgShortSide*0.9),  anchorY+(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_S_13", img_S_13, anchorX,  anchorY+(smallImgLongSide*2.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_S_m1", img_S_m1, trig.AX-(smallImgShortSide/2),  trig.AY+(smallImgLongSide*4.6), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_S_m2", img_S_m2, trig.AX-(smallImgLongSide/2),  trig.AY+(smallImgShortSide*8.5), smallImgLongSide, smallImgShortSide, trig));
          break;
        case "W":
          trig.boundIMGs.push(new OctaImage("img_W_Big", img_W_00, trig.AX-((octaRadius*1.05)+bigImgShortSide), trig.AY-(bigImgLongSide/2), bigImgShortSide, bigImgLongSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_W_00", img_W_00, trig.AX-(smallImgLongSide+(octaRadius*0.21))+(smallImgLongSide/2), trig.AY-(smallImgShortSide/2), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_11", img_W_11, trig.AX-(smallImgShortSide+(octaRadius*0.32))+(smallImgShortSide*0.4), trig.AY-(smallImgLongSide/2), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_22", img_W_22, trig.AX-(smallImgShortSide+(octaRadius*0.43))+(smallImgShortSide*0.4), trig.AY-(smallImgLongSide/2), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_W_t0", img_W_t0, anchorX-(smallImgLongSide*1.1), anchorY+(smallImgShortSide*0.1), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_t1", img_W_t1, anchorX-(smallImgShortSide*3.1), anchorY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_t2", img_W_t2, anchorX-(smallImgShortSide*4.8), anchorY-(smallImgLongSide*1.1), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_W_b0", img_W_b0, anchorX-(smallImgLongSide*1.1), anchorY-(smallImgShortSide*1.1), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_b1", img_W_b1, anchorX-(smallImgShortSide*3.1), anchorY-(smallImgLongSide*0.5), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_b2", img_W_b2, anchorX-(smallImgShortSide*4.8), anchorY, smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_m0", img_W_m0, trig.AX-(smallImgLongSide*5.05), trig.AY-(smallImgShortSide/2), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_m1", img_W_m1, trig.AX-(smallImgLongSide*6.5), trig.AY-(smallImgLongSide/2), smallImgLongSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_mt", img_W_mt, trig.AX-(octaRadius*0.98), trig.AY-(smallImgLongSide*1.2), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_W_mb", img_W_mb, trig.AX-(octaRadius*0.98), trig.AY+(smallImgLongSide*0.2), smallImgShortSide, smallImgLongSide, trig));
          break;
        case "NE":
          trig.boundIMGs.push(new OctaImage("img_NE_Big", img_NE_Big, trig.AX+(octaRadius*0.72), trig.AY-(octaRadius*0.72)-bigImgLongSide, bigImgShortSide, bigImgLongSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          anchorX = trig.AX+(octaRadius*0.2);
          anchorY = trig.AY-(octaRadius*0.2);
          trig.boundIMGs.push(new OctaImage("img_NE_00", img_NE_00, anchorX-(smallImgShortSide/2), anchorY-(smallImgShortSide/2), smallImgShortSide, smallImgLongSide, trig));
          anchorX = trig.AX+(octaRadius*0.3);
          anchorY = trig.AY-(octaRadius*0.3);
          trig.boundIMGs.push(new OctaImage("img_NE_01", img_NE_01, anchorX-(smallImgShortSide*0.35), anchorY+(smallImgShortSide*0.05), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_NE_02", img_NE_02, anchorX-(smallImgLongSide*0.9), anchorY-(smallImgShortSide*1.2), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NE_03", img_NE_03, anchorX+(smallImgShortSide*0.5), anchorY-(smallImgLongSide*1.7), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NE_04", img_NE_04, anchorX+(smallImgLongSide*2.1), anchorY-(smallImgShortSide*2.8), smallImgLongSide, smallImgShortSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_NE_10", img_NE_10, anchorX+(smallImgShortSide*0.2), anchorY+(smallImgLongSide*0.25), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NE_11", img_NE_11, anchorX+(smallImgShortSide*0.9), anchorY-(smallImgLongSide*1.1), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NE_12", img_NE_12, anchorX+(smallImgShortSide*1.8), anchorY-(smallImgLongSide*2.9), smallImgShortSide, smallImgLongSide, trig));
          anchorX = trig.AX+(octaRadius*0.42);
          anchorY = trig.AY-(octaRadius*0.44);
          trig.boundIMGs.push(new OctaImage("img_NE_m0", img_NE_m0, anchorX-(smallImgShortSide*0.5), anchorY-(smallImgShortSide*0.5), smallImgLongSide, smallImgLongSide, trig));
          anchorX = trig.AX+(octaRadius*0.6);
          anchorY = trig.AY-(octaRadius*0.6);
          trig.boundIMGs.push(new OctaImage("img_NE_m01", img_NE_m01, anchorX-(smallImgLongSide), anchorY-(smallImgLongSide*0.9), smallImgLongSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NE_m10", img_NE_m10, anchorX+(smallImgLongSide*0.2), anchorY+(smallImgLongSide*0.1), smallImgLongSide, smallImgLongSide, trig));
          break;
        case "NW":
          trig.boundIMGs.push(new OctaImage("img_NW_Big", img_NW_Big, trig.AX-(octaRadius*0.72)-bigImgLongSide, trig.AY-(octaRadius*0.72)-bigImgShortSide, bigImgLongSide, bigImgShortSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_NE_00", img_NW_00, trig.AX-(octaRadius*0.2), trig.AY-(octaRadius*0.2), smallImgShortSide, smallImgShortSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_NW_01", img_NW_01, anchorX-(smallImgShortSide*0.8), anchorY+(smallImgLongSide*0.6), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NW_02", img_NW_02, anchorX-(smallImgShortSide*1.9), anchorY-(smallImgLongSide*1.1), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NW_03", img_NW_03, anchorX-(smallImgShortSide*2.9), anchorY-(smallImgShortSide*3.5), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_NW_10", img_NW_10, anchorX+(smallImgShortSide*0.2), anchorY-(smallImgLongSide*1.1), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NW_20", img_NW_20, anchorX-(smallImgLongSide*2.4), anchorY-(smallImgLongSide*2.3), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NW_m1", img_NW_m1, trig.AX-(octaRadius*0.46), trig.AY-(octaRadius*0.49), smallImgLongSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_NW_m2", img_NW_m2, trig.AX-(octaRadius*0.65), trig.AY-(octaRadius*0.65), smallImgShortSide, smallImgLongSide, trig));
          break;
        case "SE":
          trig.boundIMGs.push(new OctaImage("img_SE_Big", img_SE_Big, trig.AX+(octaRadius*0.72), trig.AY+(octaRadius*0.72), bigImgShortSide, bigImgLongSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_SE_00", img_SE_00, trig.AX+(octaRadius*0.1), trig.AY+(octaRadius*0.09), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_SE_01", img_SE_01, anchorX-(smallImgLongSide*0.5), anchorY+(smallImgLongSide*0.4), smallImgLongSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_SE_02", img_SE_02, anchorX+(smallImgLongSide*1.5), anchorY+(smallImgShortSide*1.8), smallImgLongSide, smallImgShortSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_SE_10", img_SE_10, anchorX+(smallImgShortSide*0.5), anchorY-(smallImgLongSide*1.1), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_SE_11", img_SE_11, anchorX+(smallImgShortSide*1.6), anchorY+(smallImgLongSide*1.4), smallImgShortSide, smallImgLongSide, trig));
          break;
        case "SW":
          trig.boundIMGs.push(new OctaImage("img_SW_Big", img_SW_Big, trig.AX-(octaRadius*0.72)-bigImgLongSide, trig.AY+(octaRadius*0.72), bigImgLongSide, bigImgShortSide, trig));
          bigImgsList.push(trig.boundIMGs[0]);
          trig.boundIMGs.push(new OctaImage("img_SW_00", img_SW_00, trig.AX-(octaRadius*0.12)-smallImgShortSide, trig.AY+(octaRadius*0.12), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.BX)/2;
          anchorY = (trig.AY+trig.BY)/2;
          trig.boundIMGs.push(new OctaImage("img_SW_01", img_SW_01, anchorX, anchorY+(smallImgShortSide*0.3), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_SW_02", img_SW_02, anchorX-(smallImgLongSide*1.8), anchorY+(smallImgShortSide*1.5), smallImgShortSide, smallImgLongSide, trig));
          anchorX = (trig.AX+trig.CX)/2;
          anchorY = (trig.AY+trig.CY)/2;
          trig.boundIMGs.push(new OctaImage("img_SW_10", img_SW_10, anchorX-(smallImgShortSide+1.2), anchorY-(smallImgLongSide*1.2), smallImgShortSide, smallImgLongSide, trig));
          trig.boundIMGs.push(new OctaImage("img_SW_11", img_SW_11, anchorX-(smallImgLongSide*2.2), anchorY+(smallImgShortSide*1.6), smallImgLongSide, smallImgShortSide, trig));
          trig.boundIMGs.push(new OctaImage("img_SW_m0", img_SW_m0, trig.AX-(octaRadius*0.45)-smallImgShortSide, trig.AY+(octaRadius*0.45), smallImgShortSide, smallImgLongSide, trig));
          break;
        default:
          console.log("tried to link images to a triangle that doesn't exist :')'");
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
