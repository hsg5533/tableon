!(function ($, window, document, undefined) {
  $.fn.extend({
    scrollspy: function (options) {
      var defaults = {
        namespace: "scrollspy",
        activeClass: "active",
        animate: !1,
        duration: 1e3,
        offset: 0,
        container: window,
        replaceState: !1,
      };
      options = $.extend({}, defaults, options);
      var add = function (ex1, ex2) {
          return parseInt(ex1, 10) + parseInt(ex2, 10);
        },
        findElements = function (links) {
          for (var elements = [], i = 0; i < links.length; i++) {
            var link = links[i],
              hash = $(link).attr("href"),
              element = $(hash);
            if (element.length > 0) {
              var top = Math.floor(element.offset().top),
                bottom = top + Math.floor(element.outerHeight());
              elements.push({
                element: element,
                hash: hash,
                top: top,
                bottom: bottom,
              });
            }
          }
          return elements;
        },
        findLink = function (links, hash) {
          for (var i = 0; i < links.length; i++) {
            var link = $(links[i]);
            if (link.attr("href") === hash) return link;
          }
        },
        resetClasses = function (links) {
          for (var i = 0; i < links.length; i++)
            $(links[i]).parent().removeClass(options.activeClass);
        },
        scrollArea = "";
      return this.each(function () {
        for (
          var element = this,
            container = $(options.container),
            links = $(element).find("a"),
            i = 0;
          i < links.length;
          i++
        ) {
          var link = links[i];
          $(link).on("click", function (e) {
            var target = $(this).attr("href"),
              $target = $(target);
            if ($target.length > 0) {
              var top = add($target.offset().top, options.offset);
              options.animate
                ? $("html, body").animate({ scrollTop: top }, options.duration)
                : window.scrollTo(0, top),
                e.preventDefault();
            }
          });
        }
        resetClasses(links);
        var elements = findElements(links),
          trackChanged = function () {
            for (
              var link,
                position = {
                  top: add($(this).scrollTop(), Math.abs(options.offset)),
                  left: $(this).scrollLeft(),
                },
                i = 0;
              i < elements.length;
              i++
            ) {
              var current = elements[i];
              if (
                position.top >= current.top &&
                position.top < current.bottom
              ) {
                var hash = current.hash;
                if ((link = findLink(links, hash))) {
                  options.onChange &&
                    scrollArea !== hash &&
                    (options.onChange(current.element, $(element), position),
                    (scrollArea = hash)),
                    options.replaceState &&
                      history.replaceState({}, "", "/" + hash),
                    resetClasses(links),
                    link.parent().addClass(options.activeClass);
                  break;
                }
              }
            }
            !link &&
              "exit" !== scrollArea &&
              options.onExit &&
              (options.onExit($(element), position),
              resetClasses(links),
              (scrollArea = "exit"),
              options.replaceState && history.replaceState({}, "", "/"));
          };
        container.bind("scroll." + options.namespace, function () {
          trackChanged();
        }),
          $(document).ready(function (e) {
            trackChanged();
          });
      });
    },
  });
})(jQuery, window, document);
