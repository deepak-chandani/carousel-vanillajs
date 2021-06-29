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
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var slides = document.getElementsByClassName("carousel-item");
var slidePosition = 0;
var oldSlidePosition = void 0,
    intervalId = void 0,
    userInterruptedAtTimestamp = void 0;
var TOTAL_SLIDES = slides.length;

var btnNext = document.querySelector("#carousel-button-next");
btnNext.addEventListener("click", slideNext);
var btnPrev = document.querySelector("#carousel-button-prev");
btnPrev.addEventListener("click", slidePrev);

function slideNext(e) {
    if (e) {
        userInterruptedAtTimestamp = Date.now();
        clearAutomatedTransition();
        observe();
    }

    oldSlidePosition = slidePosition;
    if (slidePosition < TOTAL_SLIDES - 1) {
        slidePosition++;
    } else {
        slidePosition = 0;
    }

    slides[oldSlidePosition].classList.remove('carousel-item-visible');
    slides[slidePosition].classList.add("carousel-item-visible");
}

function slidePrev(e) {
    if (e) {
        userInterruptedAtTimestamp = Date.now();
        clearAutomatedTransition();
        observe();
    }

    oldSlidePosition = slidePosition;
    if (slidePosition > 0) {
        slidePosition--;
    } else {
        slidePosition = TOTAL_SLIDES - 1;
    }

    slides[oldSlidePosition].classList.remove("carousel-item-visible");
    slides[slidePosition].classList.add("carousel-item-visible");
}

// automated slide transition
document.addEventListener("DOMContentLoaded", setupAutomatedTransition);

function setupAutomatedTransition() {
    intervalId = setInterval(slideNext, 1700);
}

function clearAutomatedTransition() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
}

function observe() {
    setTimeout(function () {
        var diff = Date.now() - userInterruptedAtTimestamp;
        if (diff >= 5000 && intervalId == null) {
            setupAutomatedTransition();
        }
    }, 5000);
}

/***/ })
/******/ ]);