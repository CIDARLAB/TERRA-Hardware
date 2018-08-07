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
  var vessel = void 0;
  var outputNumber = void 0;
  var vesselOptions = void 0;
  var currentOutput = 0;

  //methods
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  };

  function str2ab_newline(str) {
    str = str + '\n';
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    };
    return buf;
  };

  function str2ab(str) {
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    };
    return buf;
  };

  function appendXY(button) {
    xy.push(button.value);
    console.log(xy);
  };

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
          tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + j + "' id='" + coordinate + "'>" + coordinate + "</button></td>";
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
          _tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + j + "' id='" + _coordinate + "'>" + _coordinate + "</button></td>";
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
          _tbody_insert2 += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + j + "' id='" + _coordinate2 + "'>" + _coordinate2 + "</button></td>";
        };
        _tbody_insert2 += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = _tbody_insert2;
      document.getElementById('thead_insert').innerHTML = _thead_insert2;
    };
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab_newline(outputNumber)
    });
  });

  this.nextButton.addEventListener('click', function (event) {
    if (currentOutput == 0 || currentOutput != outputNumber - 1) {
      document.getElementById('currentOutput').innerHTML = currentOutput;
      currentOutput = currentOutput + 1;
    } else {
      document.getElementById('currentOutput').innerHTML = currentOutput;
    };
    console.log(xy);
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(xy)
    });
  });

  this.openButton.addEventListener('click', function (event) {
    var data = document.getElementById('openSyringe').value;
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(data)
    });
  });

  this.closeButton.addEventListener('click', function (event) {
    var data = document.getElementById('closeSyringe').value;
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(data)
    });
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBQSxlQUFBO0FBQ0EsTUFBQSxxQkFBQTtBQUNBLE1BQUEsc0JBQUE7QUFDQSxNQUFJLGdCQUFKLENBQUE7O0FBRUE7QUFDQSxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFdBQU8sT0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBZ0MsSUFBQSxVQUFBLENBQXZDLEdBQXVDLENBQWhDLENBQVA7QUFDSDs7QUFFRCxXQUFBLGNBQUEsQ0FBQSxHQUFBLEVBQTZCO0FBQ3pCLFVBQU0sTUFBTixJQUFBO0FBQ0EsUUFBSSxNQUFNLElBQUEsV0FBQSxDQUFnQixJQUZELE1BRWYsQ0FBVixDQUZ5QixDQUVjO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJQUF6QixNQUFBLEVBQXFDLElBQXJDLE1BQUEsRUFBQSxHQUFBLEVBQXNEO0FBQ2xELGNBQUEsQ0FBQSxJQUFhLElBQUEsVUFBQSxDQUFiLENBQWEsQ0FBYjtBQUNIO0FBQ0QsV0FBQSxHQUFBO0FBQ0g7O0FBRUQsV0FBQSxNQUFBLENBQUEsR0FBQSxFQUFxQjtBQUNqQixRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRFQsTUFDUCxDQUFWLENBRGlCLENBQ3NCO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJ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RUFBWCxLQUFBO0FBQ0EsV0FBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVyxPQUFBLElBQUE7QUFGUyxLQUF4QjtBQUZGLEdBQUE7QUFPRCxDOztrQkE1SlksVztBQTZKZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBWaWV3TWFuYWdlciBmcm9tICcuL3ZpZXdNYW5hZ2VyJztcblxubGV0IHZpZXdtYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICAvL2luaXRpYWxpemUgdmFyaWFibGVzXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107IC8vc3RvcmUgb3V0cHV0c1xuICAgIGxldCB2ZXNzZWw7XG4gICAgbGV0IG91dHB1dE51bWJlcjtcbiAgICBsZXQgdmVzc2VsT3B0aW9ucztcbiAgICBsZXQgY3VycmVudE91dHB1dCA9IDA7XG5cbiAgICAvL21ldGhvZHNcbiAgICBmdW5jdGlvbiBhYjJzdHIoYnVmKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWJfbmV3bGluZShzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyICsgJ1xcbic7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3RyMmFiKHN0cikge1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFhZKGJ1dHRvbikge1xuICAgICAgeHkucHVzaChidXR0b24udmFsdWUpO1xuICAgICAgY29uc29sZS5sb2coeHkpO1xuICAgIH07XG5cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLm5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvdG9jb2xcIik7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuRW50ZXJcIik7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFbnRlclwiKTtcbiAgICB0aGlzLmR1cmF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvbkVudGVyXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIHZlc3NlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RWZXNzZWwnKS52YWx1ZTtcbiAgICAgIG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcblxuICAgICAgLy9jcmVhdGUgdGFibGUgZm9yIG91dHB1dCB2ZXNzZWwgaW1hZ2VcbiAgICAgIC8vY3JlYXRlIDI0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMjQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA0OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitqK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuXG4gICAgICAvL2NyZWF0ZSA5Ni13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDk2KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitqK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuXG4gICAgICAvL2NyZWF0ZSAzODQtd2VsbCBwbGF0ZVxuICAgICAgaWYgKHZlc3NlbCA9PSAzODQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDI1OyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCIsXCJJXCIsXCJKXCIsXCJLXCIsXCJMXCIsXCJNXCIsXCJOXCIsXCJPXCIsXCJQXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgMTU7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMjU7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitqK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuICAgICAgc29ja2V0LmVtaXQoXCJzZW5kLXJhd1wiLCB7XG4gICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQyMScsXG4gICAgICAgICAgXCJwYXlsb2FkXCI6IHN0cjJhYl9uZXdsaW5lKG91dHB1dE51bWJlcilcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGlmKGN1cnJlbnRPdXRwdXQgPT0gMCB8fCBjdXJyZW50T3V0cHV0ICE9IChvdXRwdXROdW1iZXIgLSAxKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudE91dHB1dCcpLmlubmVySFRNTCA9IGN1cnJlbnRPdXRwdXQ7XG4gICAgICAgIGN1cnJlbnRPdXRwdXQgPSBjdXJyZW50T3V0cHV0ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIH07XG4gICAgICBjb25zb2xlLmxvZyh4eSk7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKHh5KVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlblN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MjEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoZGF0YSlcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VTeXJpbmdlJykudmFsdWU7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuICB9O1xufTtcbiJdfQ==
