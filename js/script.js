  
var flg = true;

function toggle(a,e) {
    e.classList.toggle("fa-angle-up");
    e.classList.toggle("fa-angle-down");
    var x = document.getElementById(a);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }

function morestyles() {
    var imgcontent = document.querySelector(".img-content");

    if( flg ){
        flg = false;
        imgcontent.style.overflow = "auto";
    }else{
        flg = true;
        imgcontent.style.overflow = "hidden";
    }
    // imgcontent.style.height = "500px";

}

function morecolors() {
    
}

function on_load() {
    var inputsRy = {
        sliderWidth: 0,
        minRange: 0,
        maxRange: 4060, 
        thumbWidth: 18, // thumb width
        thumbBorderWidth: 4,
        trackHeight: 4,
        theValue: [0, 4060] // theValue[0] < theValue[1]
      };
      var isDragging0 = false;
      var isDragging1 = false;
      
      var range = inputsRy.maxRange - inputsRy.minRange;
      var container = document.querySelector(".slider-container");
      inputsRy.sliderWidth = container.offsetWidth;
      var rangeK = inputsRy.sliderWidth / range;

      
      // styles
      var slider = document.querySelector(".slider");
      
      slider.style.height = inputsRy.trackHeight + "px";
      slider.style.width = inputsRy.sliderWidth + "px";
      slider.style.paddingLeft = (inputsRy.theValue[0] - inputsRy.minRange) * rangeK + "px";
      slider.style.paddingRight = inputsRy.sliderWidth - inputsRy.theValue[1] * rangeK + "px";
      
      var track = document.querySelector(".track");
      track.style.width = inputsRy.theValue[1] * rangeK - inputsRy.theValue[0] * rangeK + "px";
      
      var thumbs = document.querySelectorAll(".thumb");
      for (var i = 0; i < thumbs.length; i++) {
      
        thumbs[i].style.width = thumbs[i].style.height = inputsRy.thumbWidth + "px";
        thumbs[i].style.left = (inputsRy.theValue[i] - inputsRy.minRange) * rangeK + "px";
      
      }
      var pricemax = document.querySelector("#price-max");
      var pricemin = document.querySelector("#price-min");
      //events
      
      thumbs[0].addEventListener("mousedown", function(evt) {
        isDragging0 = true;
      }, false);
      thumbs[1].addEventListener("mousedown", function(evt) {
        isDragging1 = true;
      }, false);
      container.addEventListener("mouseup", function(evt) {
        isDragging0 = false;
        isDragging1 = false;
      }, false);
      container.addEventListener("mouseout", function(evt) {
        isDragging0 = false;
        isDragging1 = false;
      }, false);
      
      container.addEventListener("mousemove", function(evt) {
        var mousePos = oMousePos(this, evt);
        var thumbx = mousePos.x-inputsRy.thumbWidth/2;
        var theValue0 = (isDragging0) ? Math.round(thumbx / rangeK) + inputsRy.minRange : inputsRy.theValue[0];
        var theValue1 = (isDragging1) ? Math.round(thumbx / rangeK) + inputsRy.minRange : inputsRy.theValue[1];
        if (isDragging0) {
      
          if ( thumbx >= 0) {
            inputsRy.theValue[0] = theValue0;
            thumbs[0].style.left = thumbx + "px";
            pricemin.value = theValue0;
            slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.thumbWidth/2 + "px";
            track.style.width = (theValue1 - theValue0) * rangeK + "px";
      
          }
        } else if (isDragging1) {    
            if (thumbx <= inputsRy.sliderWidth) {
            inputsRy.theValue[1] = theValue1;
            thumbs[1].style.left = thumbx + "px";
            pricemax.value = theValue1;
            slider.style.paddingLeft = (theValue0 - inputsRy.minRange) * rangeK - inputsRy.thumbWidth/2 + "px";
            track.style.width = (theValue1 - theValue0) * rangeK + "px";
      
          }
        }
      
      }, false);
      
}

function resize() {
    on_load();
}

on_load();

  
function oMousePos(elmt, evt) {
var ClientRect = elmt.getBoundingClientRect();
return { //objeto
    x: Math.round(evt.clientX - ClientRect.left),
    y: Math.round(evt.clientY - ClientRect.top)
}
}

  window.addEventListener("resize", resize);

