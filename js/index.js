var videoBox = $("#videoBox")[0];
var close = $(".close")[0];
var video = $("video")[0];
var boxs = $("h3");

drawCancas(document, window.innerWidth, window.innerHeight);
document.addEventListener("WeixinJSBridgeReady", function () {
  video.play();
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

/**
 * 画布同步视频
 */
function drawCancas(doc, cw, ch) {
  var Mycanvas = $("#Mycanvas")[0]
  var cont = Mycanvas.getContext("2d")
  var Myvideo = $("#mvideo")[0]
  Mycanvas.width = cw;
  Mycanvas.height = ch;
  Myvideo.addEventListener("canplay", function () {
    var cont2 = cerateCanvas(cw, ch).getContext("2d");
    draw(this, cont, cont2, cw, ch);
  }, false)

  //创建canvas
  function cerateCanvas(w, h) {
    var cr = doc.createElement("canvas");
    cr.width = w;
    cr.height = h;
    return cr;
  }

  //在canvas中进行描绘
  function draw(v, c, c2, w, h) {
    if (v.paused || v.ended) {
      cancelAnimationFrame(stop);
      return false;
    }
    c2.drawImage(v, 0, 0, w, h);
    var idata = c2.getImageData(0, 0, w, h);
    // var data = idata.data;
    c.putImageData(idata, 0, 0);
    var stop = requestAnimationFrame(function () {
      draw(v, c, c2, w, h);
    });
  }
}

//点击重置
$(".reset").on("click", function () {
  window.location.reload();
})

//点击分享
$(".share").on("click", function () {
  $(".mask").show();
})
// mask隐藏
$(".mask").on("click", function () {
  $(this).hide()
})

$(window).on("load", function () {
  video.play();
})
$(".show").on("click", function () {
  $(".erweima").fadeIn(200)
})

window.addEventListener("orientationchange", function () {
  if (window.innerWidth < window.innerHeight) {
    $(".tips").fadeIn(1000);
    setTimeout(() => {
      $(".tips").fadeOut(1000);
    }, 1200);
  }
}, false);