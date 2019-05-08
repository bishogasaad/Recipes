/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./resources/assets/js/animate.js":
/*!****************************************!*\
  !*** ./resources/assets/js/animate.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var open = false;
var menu = false;

var open_back = function open_back() {
  $("body").toggleClass("hidden");
  $(".1").toggleClass("he-100 d-15");
  $(".2").toggleClass("he-100 we-100 d-5 d-10");
};

var white_back = function white_back(type) {
  if (type == 1) {
    $("#white_background").removeClass("w-md-100 height_trans all_trans col-md-2 bg-white");
    $("#white_background").addClass("h-100 width_trans col-12 d-3");

    if (open) {
      $("#white_background").addClass("d-10 w-md-100");
      $("#white_background").removeClass("d-3");
    }

    $("#white_background").toggleClass("d-10 w-md-100 d-3");
  } else if (type == 2) {
    $("#white_background").removeClass("h-100 width_trans all_trans col-12");
    $("#white_background").addClass("height_trans col-md-2 d-3 bg-white w-md-100");

    if (open) {
      $("#white_background").addClass("h-100 d-10");
      $("#white_background").removeClass("d-3");
    }

    $("#white_background").toggleClass("h-100 d-3 d-10");
  } else if (type == 3) {
    $("#white_background").removeClass("d-10 d-3 height_trans width_trans");
    $("#white_background").addClass("all_trans w-md-100");
    $("#white_background").toggleClass("col-12 col-md-2 bg-white");
  }
};

var menu_content = function menu_content(type) {
  if (type == 1) {
    $("#menu_content").removeClass("d-5 none");
    if (open) $("#menu_content").addClass("d-15");
    $("#menu_content").toggleClass("op-100 op-0 d-15");
  } else if (type == 2) {
    $("#menu_content").addClass("none");
  } else if (type == 3) {
    $("#menu_content").removeClass("d-15");
    if (menu) $("#menu_content").addClass("d-5");
    $("#menu_content").toggleClass("op-100 op-0 d-5 none");
  }
};

var bars_switch = function bars_switch(type) {
  if (type == 1) {} else if (type == 2) {
    if (open) $("#bars_switch").addClass("d-15");
    $("#bars_switch").removeClass("d-3");
    $("#bars_switch").toggleClass("op-100 op-0 d-15 pointer all");
  } else if (type == 3) {
    $("#bars_switch").removeClass("d-15");
    if (!menu) $("#bars_switch").addClass("d-3 pointer all");
    $("#bars_switch").toggleClass("op-100 op-0 d-3 pointer all");
  }
};

var search_back = function search_back(type) {
  if (type == 1) {
    $("#search_container").removeClass("w-100 h-90 col-md-9 search_bg pt-3 py-md-2 px-2 mr-md-4");
    $("#search_container").addClass("h-100");
    $("#search_back").removeClass("pt-5 px-1 px-md-3 pb-0");
    if (!open) $("#search_container").addClass("d-10");
    $("#search_container").toggleClass("op-100 op-0 d-10");
  } else if (type == 2) {
    $("#search_back").addClass("pt-5 px-1 px-md-3 pb-0");
    $("#search_container").removeClass("d-10 h-100");
    $("#search_container").addClass("d-3 h-90");

    if (open) {
      $("#search_container").addClass("d-10");
      $("#search_container").removeClass("d-3");
      $("#search_content").addClass("d-15");
    }

    $("#search_container").toggleClass("op-100 op-0 d-10 d-3 col-md-9");
    $("#search_container").addClass("w-100 search_bg pt-3 py-md-2 px-2 mr-md-4");
  } else if (type == 3) {
    $("#search_container").removeClass("d-10 d-3");
    $("#search_container").toggleClass("h-100 h-90 w-100 col-md-9 search_bg pt-3 py-md-2 px-2 mr-md-4");
    $("#search_back").toggleClass("pt-5 px-1 px-md-3 pb-0");
  }
};

var search_bar = function search_bar(type) {
  if (type == 1) {
    $("#search_bar").addClass("col-12 h-100 w-100 justify-content-end");
    $("#search_bar").removeClass("justify-content-between py-md-2 col");
    $("#filter").removeClass("d-md-flex");
  } else if (type == 2) {
    $("#search_bar").removeClass("h-100 justify-content-end col-12");
    $("#search_bar").addClass("col w-100 py-md-2 justify-content-between");
    $("#search_input").removeClass("d-10");
    $("#filter").addClass("d-md-flex");
    if (open) $("#search_input").addClass("d-15");
    $("#search_input").toggleClass("op-0 op-100 invisible d-15");
  } else if (type == 3) {
    $("#search_bar").toggleClass("col py-md-2 col-12 h-100 w-100 justify-content-end justify-content-between");
    $("#search_input").removeClass("d-15");
    $("#filter").toggleClass("d-md-flex");

    if (!menu) {
      $("#search_input").addClass("d-10");
    }

    $("#search_input").toggleClass("op-0 op-100 invisible d-10");
  }
};

var search_switch = function search_switch(type) {
  if (type == 1) {
    $("#search_switch").removeClass("d-10-search fa-2x fa h-100 d-flex p-3 p-md-2");
    if (open) $("#search_switch").addClass("h-100");
    $("#search_switch").toggleClass("h-100 d-10-search d-3");
    if (!open) $("#search_switch").removeClass("d-3");else $("#search_switch").removeClass("d-10-search");
    $("#search_switch").addClass("op-80 col-1 col-md-2 fa-5x d-none");
    $("#search_icon").toggleClass("op-0 op-100 d-15");
  } else if (type == 2) {
    $("#search_switch").removeClass("op-80 col-1 col-md-2 fa-5x d-none p-0");
    $("#search_switch").addClass("op-100 fa-2x p-3 p-md-2");
    $("#search_switch").toggleClass("d-10-search h-100");
    $("#search_icon").toggleClass("op-0 op-100 d-15");
    $("#search_content").removeClass("d-10");
    $("#search_content").toggleClass("op-0 op-100 d-none d-15");
  } else if (type == 3) {
    if (menu) {
      $("#search_switch").addClass("op-80 fa-5x d-none");
      $("#search_switch").removeClass("op-100 fa-2x");
    }

    $("#search_content").removeClass("d-15");
    $("#search_switch").addClass("h-100");
    if (!menu) $("#search_content").addClass("d-10");
    $("#search_content").toggleClass("op-0 op-100 d-none d-10");
    $("#search_switch").removeClass("d-10-search d-3");
    $("#search_switch").toggleClass("col-1 col-md-2 op-80 op-100 fa-5x fa-2x d-none d-flex p-3 p-md-2 p-0");
  }
};

var toggle_menu = function toggle_menu() {
  open_back();
  white_back(1);
  menu_content(1);
  bars_switch(1);
  search_back(1);
  search_bar(1);
  search_switch(1);
  menu = true;
  open = !open;
};

var toggle_search = function toggle_search() {
  open_back();
  white_back(2);
  menu_content(2);
  bars_switch(2);
  search_back(2);
  search_bar(2);
  search_switch(2);
  menu = false;
  open = !open;
};

var cross_switch = function cross_switch() {
  white_back(3);
  menu_content(3);
  bars_switch(3);
  search_back(3);
  search_bar(3);
  search_switch(3);
  menu = !menu;
};

clicked = 0;

var state = function state() {
  if (menu) {
    $("#open_menu").addClass("gradient-1 text-white");
    $("#open_search").removeClass("gradient-1 text-white");
  } else {
    $("#open_search").addClass("gradient-1 text-white op-100");
    $("#open_search").removeClass("op-80");
    $("#open_menu").removeClass("gradient-1 text-white");
  }

  if (!open) {
    $("#open_search").addClass("op-80");
    $("#open_menu").removeClass("gradient-1 text-white");
    $("#open_search").addClass("gradient-1 text-white");
  } else $("#open_search").removeClass("op-80");
};

var hover = function hover(element, on) {
  if (on) {
    $(element).addClass("gradient-1 text-white");
    $(element).siblings().removeClass("gradient-1 text-white");
  } else {
    $(element).removeClass("gradient-1 text-white");
    $(element).siblings().addClass("gradient-1 text-white");
  }
};

var toggle_bars = function toggle_bars() {
  $("#header .bars").toggleClass("fa-bars fa-times");
};

var toggle_searchi = function toggle_searchi() {
  $("#header .search").toggleClass("fa-search fa-times");
};

$("#open_menu").click(function () {
  if (menu || !open) {
    toggle_menu();
    toggle_searchi();
  } else cross_switch();

  toggle_bars();
  toggle_searchi();
  clicked = 1;
  state();
}).hover(function () {
  hover($(this), 1);
}, function () {
  if (open) state();else hover($(this), 0);
});
$("#open_search").click(function () {
  if (!menu || !open) {
    toggle_search();
    toggle_bars();
    $("#open_search").toggleClass("op-80");
  } else cross_switch();

  clicked = 0;
  toggle_bars();
  toggle_searchi();
  state();
}).hover(function () {
  hover($(this), 1);
}, function () {
  state();
});
$(".toggle").click(function () {
  if (!menu && $(this).hasClass("gradient-1")) alert("search");else {
    cross_switch();
    toggle_bars();
    toggle_searchi();
  }
  clicked = !clicked;
  state();
});

/***/ }),

/***/ "./resources/assets/js/custom.js":
/*!***************************************!*\
  !*** ./resources/assets/js/custom.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! ./animate */ "./resources/assets/js/animate.js");

var custom = __webpack_require__(/*! ./custom_lib */ "./resources/assets/js/custom_lib.js");

var fix_row_at = function fix_row_at(br, element_id) {
  if ($(window).width() > br) {
    while ($("." + element_id + ">.item").length > 0) {
      $("." + element_id + ">.item:eq(0),." + element_id + ">.item:eq(1)").wrapAll("<div/>");
    }

    ;
  }
};
/*Z$(document).ready(function(){
    $("#main_sec").parallax({
        imageSrc: './images/alternate.jpg',
        speed:0.5,
        positionX:"left",
        positionY:"top",
        bleed:50
        });
    $("#product_sec").parallax({
        imageSrc: './images/products_sec.jpg',
        speed:0.1,
        bleed:100
    });
});
/*if(document.getElementById("featured")!==null)
    document.getElementById("featured").addEventListener("wheel", scroll_slide);
if(document.getElementById("products")!==null)
    document.getElementById("products").addEventListener("wheel", scroll_slide);
if(document.getElementById("search")!==null)
    document.getElementById("search").addEventListener("wheel", scroll_slide);
function scroll_slide(e) {
    if(window.innerWidth>767)
    if(
        !($(e.currentTarget).find(".slick-slide:last-child").hasClass("slick-active")&&e.deltaY>0)
        &&
        !($(e.currentTarget).find(".slick-slide:first-child").hasClass("slick-active")&&e.deltaY<0)
        )
    {e.preventDefault();
    var e = window.event;
    if(e.deltaY>0){$(e.currentTarget).slick("slickNext");}
    else {$(e.currentTarget).slick("slickPrev");}}
}*/

/***/ }),

/***/ "./resources/assets/js/custom_lib.js":
/*!*******************************************!*\
  !*** ./resources/assets/js/custom_lib.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var array = $(".img-square").toArray();

var square = function square() {
  array.forEach(function (element) {
    element.height = element.width;
  });
};

$(document).ready(function () {
  var array = $(".img-square").toArray();
  square();
  window.addEventListener("resize", function () {
    square();
  }, false);
});
module.exports = {
  square: square
};

/***/ }),

/***/ "./resources/assets/sass/app.scss":
/*!****************************************!*\
  !*** ./resources/assets/sass/app.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),

/***/ 0:
/*!******************************************************************************!*\
  !*** multi ./resources/assets/js/custom.js ./resources/assets/sass/app.scss ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! /var/www/html/Recipes/resources/assets/js/custom.js */"./resources/assets/js/custom.js");
module.exports = __webpack_require__(/*! /var/www/html/Recipes/resources/assets/sass/app.scss */"./resources/assets/sass/app.scss");


/***/ })

/******/ });