var videoBox = $("#videoBox")[0];
var close = $(".close")[0];
var video = $("video")[0];
var boxs = $("h3");
var Mycanvas = $("#Mycanvas")[0];
var cont = Mycanvas.getContext("2d");
var flag = false;
var wWidth = window.innerWidth;
var wHeight = window.innerHeight;

Mycanvas.width = wWidth;
Mycanvas.height = wHeight;
var img = new Image()
img.src = "./img/start.gif";
cont.drawImage(img, 0, 0, wWidth, wHeight)
document.addEventListener("WeixinJSBridgeReady", function () {
  video.play();
  drawCancas(document);
}, false);

//视频结束触发
video.addEventListener("ended", function () {
  this.style.display = "none";
  $(".content").show();
  animation();
})
/**
 * 三个盒子动画
 */
function animation() {
  boxs.eq(0).animate({
    transform: "translateX(-50%)",
    opacity: 1
  }, 1000, "linear");
  boxs.eq(1).animate({
    transform: "translateX(-50%)",
    opacity: 1
  }, 2000, "linear");
  boxs.eq(2).animate({
    transform: "translateX(-50%)",
    opacity: 1
  }, 3000, "linear");
}

//在canvas中进行描绘
function draw(v, c, c2, w, h) {
  if (v.ended || flag) {
    cancelAnimationFrame(stop);
    return false;
  }
  c.fillStyle = "#000";
  c.fillRect(0,0,window.width,window.height);
  c.drawImage(v, 0, 0, wWidth, wHeight);
  var stop = requestAnimationFrame(function () {
    draw(v, c, c2, wWidth, wHeight);
  });
}
/**
 * 画布同步视频
 */
function drawCancas(doc) {
  
  var Myvideo = $("#mvideo")[0];
  Mycanvas.width = wWidth;
  Mycanvas.height = wHeight;

  var cont2;
  draw(Myvideo, cont, cont2, wWidth, wHeight);
  Myvideo.addEventListener("canplay", function () {
    $(".start").hide()
    draw(this, cont, cont2, wWidth, wHeight);
  }, false)
}

//点击重置
$(".reset").on("click", function () {
  window.location.reload()
})

//点击分享
$(".share").on("click", function () {
  $(".mask").show();
})
// mask隐藏
$(".mask").on("click", function () {
  $(this).hide()
})

$(".show").on("click", function () {
  $(".erweima").fadeIn(200)
})
$(window).on("click",function (){
  $(".start").hide();

  video.play();

  drawCancas(document, wWidth, wHeight);
})
window.addEventListener("orientationchange", function () {
  if (wWidth < wHeight) {
    $(".tips").fadeIn(1000);
    setTimeout(() => {
      $(".tips").fadeOut(1000);
    }, 1200);
  }
}, false);
$(window).on("resize", function (){
  wWidth = this.innerWidth;
  wHeight = this.innerHeight;
  drawCancas(document, wWidth, wHeight);
})








