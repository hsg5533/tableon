(function ($) {
  "use strict";

  // AOS ANIMATIONS
  AOS.init();

  // BG SLIDE
  $(document).ready(function () {
    $("#slide > div:gt(0)").hide();

    setInterval(function () {
      $("#slide > div:first")
        .fadeOut(1000)
        .next()
        .fadeIn(1000)
        .end()
        .appendTo("#slide");
    }, 3000);
  });

  //SCROLL TEST
  $(document).ready(function () {
    var navHeight = $(".img-service").height();

    $(".top").hide();

    $(window).scroll(function () {
      var rollIt = $(this).scrollTop() >= navHeight;

      if (rollIt) {
        $(".top").show().css({ position: "fixed" });
      } else {
        $(".top").hide();
      }
    });
  });

  // Page loading animation
  $(window).on("load", function () {
    if ($(".cover").length) {
      $(".cover").parallax({
        imageSrc: $(".cover").data("image"),
        zIndex: "1",
      });
    }

    $("#preloader").animate(
      {
        opacity: "0",
      },
      600,
      function () {
        setTimeout(function () {
          $("#preloader").css("visibility", "hidden").fadeOut();
        }, 300);
      }
    );
  });

  // NAVBAR
  $(".navbar-nav .nav-link").click(function () {
    $(".navbar-collapse").collapse("hide");
  });

  // NEWS IMAGE RESIZE
  function NewsImageResize() {
    $(".navbar").scrollspy({ offset: -76 });

    var LargeImage = $(".large-news-image").height();

    var MinusHeight = LargeImage - 6;

    $(".news-two-column").css({ height: MinusHeight - LargeImage / 2 + "px" });
  }

  $(window).on("resize", NewsImageResize);
  $(document).on("ready", NewsImageResize);

  $('a[href*="#"]').click(function (event) {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        event.preventDefault();
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 66,
          },
          1000
        );
      }
    }
  });
})(window.jQuery);
