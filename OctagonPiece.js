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
  }

  getCenter() {
    let
    centerX, centerY,
    sideA, sideB, sideC,
    perimeter;

    sideA = this.getSideLen(this.AX, this.AY, this.BX, this.BY);
    sideB = this.getSideLen(this.AX, this.AY, this.CX, this.CY);
    sideC = this.getSideLen(this.BX, this.BY, this.CX, this.CY);

    perimeter = sideA + sideB + sideC;

    centerX = (sideA*this.AX + sideB*this.BX + sideC*this.CX) / perimeter;
    centerY = (sideA*this.AY + sideB*this.BY + sideC*this.CY) / perimeter;

    return [centerX, centerY];
  }

  getSideLen(ax,ay,bx,by){
    return sqrt(sq(bx-ax) + sq(by-ay));
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
      for (var i = 0; i < this.boundIMGs.length; i++) {
        this.boundIMGs[i].move(1);
        this.boundIMGs[i].grow();
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
      for (var i = 0; i < this.boundIMGs.length; i++) {
        this.boundIMGs[i].move(-1);
        this.boundIMGs[i].unGrow();
      }
  }

  isMouseInMe() {
    // store mouse position in case some twitchy user moves it faster than this function runs...
    let mX = mouseX;
    let mY = mouseY;
    // substract translation so mouse coordinates match what we see...
    mX -= xTransform;
    mY -= yTransform;
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
    push();
    if (this.growing) {
      fill(50,50,50);
    } else {
      fill(50,50,50, 91);
    }
    triangle(this.AX,this.AY,this.BX,this.BY,this.CX,this.CY);
    pop();
    this.drawBoundImgs();
  }

  drawBoundImgs(){
    for (var i = 0; i < this.boundIMGs.length; i++) {
      let img = this.boundIMGs[i];
      if (typeof img === "undefined") {
        console.log(this.heading + " trig has undefined images...");
      } else {
        img.drawMe();
      }
    }
  }
}
