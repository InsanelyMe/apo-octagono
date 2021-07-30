class OctaImage {
  constructor( someID, someIMG, someX, someY, someWidth, someHeight, daddy) {
    this.image = someIMG;
    this.id = someID;
    this.xPos = someX;
    this.yPos = someY;
    this.xSize = someWidth;
    this.ySize = someHeight;

    this.parentTrig = daddy;

    // this.centerX = this.xPos + (this.xSize/2);
    // this.centerY = this.yPos + (this.ySize/2);

    [this.centerX, this.centerY] = this.getCenter();
    // make sure this one is never not even
    this.maxGrowth = 2;

    this.selected = false;
    this.hovered = false;
  }

  getCenter(){
    return [this.xPos + (this.xSize/2), this.yPos + (this.ySize/2)];
  }

  move(whichWay) {
    let distX, distY;
    distX = this.centerX - testOctagon.cX;
    distY = this.centerY - testOctagon.cY;

    let movementFactor = 69;
    let moveX = abs(distX/movementFactor) * whichWay;
    let movey = abs(distY/movementFactor) * whichWay;

    if (distX > 0) {
      this.xPos -= moveX;
      // this.xPos += moveX;
    }
    if (distX < 0) {
      this.xPos += moveX;
      // this.xPos -= moveX;
    }
    if (distY > 0) {
      this.yPos -= movey;
      // this.yPos += movey;
    }
    if(distY < 0) {
      this.yPos += movey;
      // this.yPos -= movey;
    }
  }

  grow(){
    this.xSize += this.maxGrowth;
    this.ySize += this.maxGrowth;
    this.xPos -= this.maxGrowth/2;
    this.yPos -= this.maxGrowth/2;
  }

  unGrow(){
    this.xSize -= this.maxGrowth;
    this.ySize -= this.maxGrowth;
    this.xPos  += this.maxGrowth/2;
    this.yPos  += this.maxGrowth/2;
  }

  isMouseInMe(){
    let mX = mouseX;
    let mY = mouseY;
    mX -= xTransform;
    mY -= yTransform;
    if (((mX > this.xPos && mX < this.xPos+this.xSize) && (mY > this.yPos && mY < this.yPos+this.ySize))) {
      // console.log("mouse is IN");
      return true;
    }
    // console.log("mouse is OUT");
    return false;
  }

  drawMe(){
    try {
      image(this.image, this.xPos, this.yPos, this.xSize, this.ySize);
    } catch (e) {
      // console.log("failed to draw an image... replacing with primitive");
      // console.log(e);
      push();
      if (this.selected) {
        strokeWeight(1);
        stroke(255);
        fill(0,69,0);
      } else if (this.hovered) {
        strokeWeight(2);
        stroke(91,91,91);
        fill(200,0,0);
      } else {
        noStroke();
        fill(200,0,0,69);
      }
      rect(this.xPos, this.yPos, this.xSize, this.ySize);
      pop();
    }
  }
}
