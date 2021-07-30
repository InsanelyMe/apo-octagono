
let navButts = document.getElementsByClassName("navBarButton");

for (let butt of navButts) {
  butt.onclick = () => {
    var target;
    // console.log(butt.id);
    switch (butt.id) {
      case "sectionOneButton":
        target = document.getElementById("sectionOne");
        break;
      case "sectionTwoButton":
        target = document.getElementById("sectionTwo");
        break;
      case "sectionThreeButton":
        target = document.getElementById("sectionThree");
        break;
      case "sectionFourButton":
        target = document.getElementById("sectionFour");
        break;
      default:
        console.log("mananged to click a button that doesn't exist...");
    }
    target.scrollIntoView();
  }
}

let logoButt = document.getElementById("navBarLogo");

logoButt.onclick = () => {
  // console.log(logoButt.id);
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.onload = () => {
  logoButt.click();
}
