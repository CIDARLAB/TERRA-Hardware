(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict';

var _viewManager = require('./viewManager');

var _viewManager2 = _interopRequireDefault(_viewManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var viewmanager = new _viewManager2.default();

},{"./viewManager":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ViewManager = function ViewManager() {
  _classCallCheck(this, ViewManager);

  //initialize variables
  var outputArray = []; //store outputs
  var openArray = []; //store open syringes per output
  var closeArray = []; //store close syringes per output
  var vessel = void 0;
  var outputNumber = void 0;
  var vesselOptions = void 0;
  var currentOutput = 0;

  //methods
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  };

  function str2ab(str) {
    str = str + '\n';
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    };
    return buf;
  };

  function str2ab_2(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    };
    return buf;
  }

  //buttons
  this.inputButton = document.getElementById("inputButton");
  this.nextButton = document.getElementById("configureButton");
  this.submitButton = document.getElementById("submitProtocol");
  this.openButton = document.getElementById("openEnter");
  this.closeButton = document.getElementById("closeEnter");
  this.durationButton = document.getElementById("durationEnter");

  //event handlers
  this.inputButton.addEventListener('click', function (event) {
    document.getElementById('currentOutput').innerHTML = currentOutput;
    vessel = document.getElementById('selectVessel').value;
    outputNumber = document.getElementById('outputNumber').value;
    openArray = [outputNumber]; //store open syringes per output
    closeArray = [outputNumber]; //store close syringes per output

    //create table for output vessel image
    //create 24-well plate
    if (vessel == 24) {
      var thead_insert = "<th scope='col'> </th>";
      for (var i = 1; i < 7; i++) {
        thead_insert += "<th scope='col'>" + i + "</th>";
      };
      thead_insert += "</tr>";

      var tbody_insert = "";
      var letters = ["A", "B", "C", "D"];
      for (var i = 0; i < 4; i++) {
        tbody_insert += "<tr>";
        tbody_insert += "<th scope='row'>" + letters[i] + "</th>";
        for (var j = 1; j < 7; j++) {
          var coordinate = letters[i] + j;
          tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='" + coordinate + "' value='" + coordinate + "' id='" + coordinate + "'>" + coordinate + "</button></td>";
        };
        tbody_insert += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = tbody_insert;
      document.getElementById('thead_insert').innerHTML = thead_insert;
    };

    //create 96-well plate
    if (vessel == 96) {
      var _thead_insert = "<th scope='col'> </th>";
      for (var i = 1; i < 13; i++) {
        _thead_insert += "<th scope='col'>" + i + "</th>";
      };
      _thead_insert += "</tr>";

      var _tbody_insert = "";
      var _letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
      for (var i = 0; i < 7; i++) {
        _tbody_insert += "<tr>";
        _tbody_insert += "<th scope='row'>" + _letters[i] + "</th>";
        for (var j = 1; j < 13; j++) {
          var _coordinate = _letters[i] + j;
          _tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='" + _coordinate + "' value='" + _coordinate + "' id='" + _coordinate + "'>" + _coordinate + "</button></td>";
        };
        _tbody_insert += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = _tbody_insert;
      document.getElementById('thead_insert').innerHTML = _thead_insert;
    };

    //create 384-well plate
    if (vessel == 384) {
      var _thead_insert2 = "<th scope='col'> </th>";
      for (var i = 1; i < 25; i++) {
        _thead_insert2 += "<th scope='col'>" + i + "</th>";
      };
      _thead_insert2 += "</tr>";

      var _tbody_insert2 = "";
      var _letters2 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
      for (var i = 0; i < 15; i++) {
        _tbody_insert2 += "<tr>";
        _tbody_insert2 += "<th scope='row'>" + _letters2[i] + "</th>";
        for (var j = 1; j < 25; j++) {
          var _coordinate2 = _letters2[i] + j;
          _tbody_insert2 += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='" + _coordinate2 + "' value='" + _coordinate2 + "' id='" + _coordinate2 + "'>" + _coordinate2 + "</button></td>";
        };
        _tbody_insert2 += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = _tbody_insert2;
      document.getElementById('thead_insert').innerHTML = _thead_insert2;
    };
    /*socket.emit("send-raw", {
        "name": '/dev/cu.usbmodem1421',
        "payload": str2ab(outputNumber)
    })*/
  });

  this.nextButton.addEventListener('click', function (event) {
    if (currentOutput == 0 || currentOutput != outputNumber - 1) {
      document.getElementById('currentOutput').innerHTML = currentOutput;
      currentOutput = currentOutput + 1;
    } else {
      document.getElementById('currentOutput').innerHTML = currentOutput;
    };
  });

  this.openButton.addEventListener('click', function (event) {
    var data = document.getElementById('openEnter');
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(data)
    });
  });

  this.closeButton.addEventListener('click', function (event) {
    var data = document.getElementById('closeEnter');
    /*socket.emit("send-raw", {
        "name": '/dev/cu.usbmodem1421',
        "payload": str2ab(data)
    });*/
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBSSxZQUhPLEVBR1gsQ0FIVyxDQUdXO0FBQ3RCLE1BQUksYUFKTyxFQUlYLENBSlcsQ0FJVztBQUN0QixNQUFBLGVBQUE7QUFDQSxNQUFBLHFCQUFBO0FBQ0EsTUFBQSxzQkFBQTtBQUNBLE1BQUksZ0JBQUosQ0FBQTs7QUFHQTtBQUNBLFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7QUFDakIsV0FBTyxPQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFnQyxJQUFBLFVBQUEsQ0FBdkMsR0FBdUMsQ0FBaEMsQ0FBUDtBQUNIOztBQUVELFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7QUFDakIsVUFBTSxNQUFOLElBQUE7QUFDQSxRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRlQsTUFFUCxDQUFWLENBRmlCLENBRXNCO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJQUF6QixNQUFBLEVBQXFDLElBQXJDLE1BQUEsRUFBQSxHQUFBLEVBQXNEO0FBQ2xELGNBQUEsQ0FBQSxJQUFhLElBQUEsVUFBQSxDQUFiLENBQWEsQ0FBYjtBQUNIO0FBQ0QsV0FBQSxHQUFBO0FBQ0g7O0FBRUQsV0FBQSxRQUFBLENBQUEsR0FBQSxFQUFzQjtBQUNwQixRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRE4sTUFDVixDQUFWLENBRG9CLENBQ21CO0FBQ3ZDLFFBQUksVUFB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Y2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBWaWV3TWFuYWdlciBmcm9tICcuL3ZpZXdNYW5hZ2VyJztcblxubGV0IHZpZXdtYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICAvL2luaXRpYWxpemUgdmFyaWFibGVzXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107IC8vc3RvcmUgb3V0cHV0c1xuICAgIGxldCBvcGVuQXJyYXkgPSBbXTsgICAvL3N0b3JlIG9wZW4gc3lyaW5nZXMgcGVyIG91dHB1dFxuICAgIGxldCBjbG9zZUFycmF5ID0gW107ICAvL3N0b3JlIGNsb3NlIHN5cmluZ2VzIHBlciBvdXRwdXRcbiAgICBsZXQgdmVzc2VsO1xuICAgIGxldCBvdXRwdXROdW1iZXI7XG4gICAgbGV0IHZlc3NlbE9wdGlvbnM7XG4gICAgbGV0IGN1cnJlbnRPdXRwdXQgPSAwO1xuXG5cbiAgICAvL21ldGhvZHNcbiAgICBmdW5jdGlvbiBhYjJzdHIoYnVmKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWIoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciArICdcXG4nO1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0cjJhYl8yKHN0cil7XG4gICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICB9O1xuICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9XG5cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLm5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvdG9jb2xcIik7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuRW50ZXJcIik7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFbnRlclwiKTtcbiAgICB0aGlzLmR1cmF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvbkVudGVyXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIHZlc3NlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RWZXNzZWwnKS52YWx1ZTtcbiAgICAgIG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcbiAgICAgIG9wZW5BcnJheSA9IFtvdXRwdXROdW1iZXJdOyAgIC8vc3RvcmUgb3BlbiBzeXJpbmdlcyBwZXIgb3V0cHV0XG4gICAgICBjbG9zZUFycmF5ID0gW291dHB1dE51bWJlcl07ICAvL3N0b3JlIGNsb3NlIHN5cmluZ2VzIHBlciBvdXRwdXRcblxuICAgICAgLy9jcmVhdGUgdGFibGUgZm9yIG91dHB1dCB2ZXNzZWwgaW1hZ2VcbiAgICAgIC8vY3JlYXRlIDI0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMjQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA0OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgbmFtZT0nXCIrY29vcmRpbmF0ZStcIicgdmFsdWU9J1wiK2Nvb3JkaW5hdGUrXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDk2LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gOTYpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEzOyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAxMzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBuYW1lPSdcIitjb29yZGluYXRlK1wiJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcblxuICAgICAgLy9jcmVhdGUgMzg0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuICAgICAgLypzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKG91dHB1dE51bWJlcilcbiAgICAgIH0pKi9cbiAgICB9KTtcblxuICAgIHRoaXMubmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYoY3VycmVudE91dHB1dCA9PSAwIHx8IGN1cnJlbnRPdXRwdXQgIT0gKG91dHB1dE51bWJlciAtIDEpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgICAgY3VycmVudE91dHB1dCA9IGN1cnJlbnRPdXRwdXQgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbkVudGVyJyk7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uIChldmVudCl7XG4gICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUVudGVyJyk7XG4gICAgICAvKnNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MjEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoZGF0YSlcbiAgICAgIH0pOyovXG4gICAgfSk7XG4gIH07XG59O1xuIl19
