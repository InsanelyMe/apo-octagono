
let navButts = document.getElementsByClassName("navBarButton");

for (let butt of navButts) {
  butt.onclick = () => {
    console.log(butt.id);
    switch (butt.id) {
      case "sectionOneButton":
        document.getElementById("sectionOne").scrollIntoView();
        break;
      case "sectionTwoButton":
        document.getElementById("sectionTwo").scrollIntoView();
        break;
      case "sectionThreeButton":
        document.getElementById("sectionThree").scrollIntoView();
        break;
      default:
        console.log("mananged to click a button that doesn't exist...");
    }
  }
}

let logoButt = document.getElementById("navBarLogo");

logoButt.onclick = () => {
  console.log(logoButt.id);
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

window.onload = () => {
  logoButt.click();
}
