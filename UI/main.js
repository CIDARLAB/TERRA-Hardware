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
  var currentOutput = 1;
  var check = "";
  var re = /\d*\w/;
  var well_24 = [];
  var well_96 = [];
  var well_384 = [];
  var counter = 0;
  var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  well_24[0] = 1;
  for (var i = 1; i < 384; i++) {
    well_24[i] = i + 1;
  };

  well_96[0] = 1;
  for (var i = 1; i < 96; i++) {
    well_96[i] = i + 1;
  };

  well_384[0] = 1;
  for (var i = 1; i < 384; i++) {
    well_384[i] = i + 1;
  }

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
      var _letters = ["A", "B", "C", "D"];
      for (var i = 0; i < 4; i++) {
        tbody_insert += "<tr>";
        tbody_insert += "<th scope='row'>" + _letters[i] + "</th>";
        for (var j = 1; j < 7; j++) {
          var coordinate = _letters[i] + j;
          tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + j + "' id='" + coordinate + "'>" + coordinate + "</button></td>";
        };
        tbody_insert += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = tbody_insert;
      document.getElementById('thead_insert').innerHTML = thead_insert;
      counter = 0;
      for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 7; j++) {
          var identifier = _letters[i] + j;
          document.getElementById(identifier).value = well_24[counter];
          counter = counter + 1;
        }
      }
    };

    //create 96-well plate
    if (vessel == 96) {
      var _thead_insert = "<th scope='col'> </th>";
      for (var i = 1; i < 13; i++) {
        _thead_insert += "<th scope='col'>" + i + "</th>";
      };
      _thead_insert += "</tr>";

      var _tbody_insert = "";
      var _letters2 = ["A", "B", "C", "D", "E", "F", "G", "H"];

      for (var i = 0; i < 8; i++) {
        _tbody_insert += "<tr>";
        _tbody_insert += "<th scope='row'>" + _letters2[i] + "</th>";
        for (var j = 1; j < 13; j++) {
          var _coordinate = _letters2[i] + j;
          _tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + _coordinate + "' id='" + _coordinate + "'>" + _coordinate + "</button></td>";
        };
        _tbody_insert += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = _tbody_insert;
      document.getElementById('thead_insert').innerHTML = _thead_insert;
      counter = 0;
      for (var i = 0; i < 7; i++) {
        for (var j = 1; j < 13; j++) {
          var _identifier = _letters2[i] + j;
          document.getElementById(_identifier).value = well_96[counter];
          counter = counter + 1;
        }
      }
    };

    //create 384-well plate
    if (vessel == 384) {
      var _thead_insert2 = "<th scope='col'> </th>";
      for (var i = 1; i < 25; i++) {
        _thead_insert2 += "<th scope='col'>" + i + "</th>";
      };
      _thead_insert2 += "</tr>";

      var _tbody_insert2 = "";
      var _letters3 = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
      for (var i = 0; i < 15; i++) {
        _tbody_insert2 += "<tr>";
        _tbody_insert2 += "<th scope='row'>" + _letters3[i] + "</th>";
        for (var j = 1; j < 25; j++) {
          var _coordinate2 = _letters3[i] + j;
          _tbody_insert2 += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + _coordinate2 + "' id='" + _coordinate2 + "'>" + _coordinate2 + "</button></td>";
        };
        _tbody_insert2 += "</tr>";
      };
      document.getElementById('tbody_insert').innerHTML = _tbody_insert2;
      document.getElementById('thead_insert').innerHTML = _thead_insert2;
    };
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1411',
      "payload": str2ab_newline(outputNumber)
    });
  });

  this.nextButton.addEventListener('click', function (event) {
    if (currentOutput < outputNumber) {
      currentOutput = currentOutput + 1;
      document.getElementById('currentOutput').innerHTML = currentOutput;
    } else if (currentOutput == outputNumber - 1) {
      currentOutput = outputNumber;
      document.getElementById('currentOutput').innerHTML = currentOutput;
    };

    console.log(xy.slice(0, -1));
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1411',
      "payload": str2ab(xy)
    });
  });

  this.openButton.addEventListener('click', function (event) {
    var data = document.getElementById('openSyringe').value;
    console.log(re.test(data));
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1411',
      "payload": str2ab(data)
    });
  });

  this.closeButton.addEventListener('click', function (event) {
    var data = document.getElementById('closeSyringe').value;
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1411',
      "payload": str2ab(data)
    });
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBQSxlQUFBO0FBQ0EsTUFBQSxxQkFBQTtBQUNBLE1BQUEsc0JBQUE7QUFDQSxNQUFJLGdCQUFKLENBQUE7QUFDQSxNQUFJLFFBQUosRUFBQTtBQUNBLE1BQUksS0FBSixPQUFBO0FBQ0EsTUFBSSxVQUFKLEVBQUE7QUFDQSxNQUFJLFVBQUosRUFBQTtBQUNBLE1BQUksV0FBSixFQUFBO0FBQ0EsTUFBSSxVQUFKLENBQUE7QUFDQSxNQUFJLFVBQVUsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWQsR0FBYyxDQUFkOztBQUVBLFVBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxPQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEdBQUEsRUFBQSxHQUFBLEVBQStCO0FBQzdCLFlBQUEsQ0FBQSxJQUFhLElBQWIsQ0FBQTtBQUNEOztBQUVELFVBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxPQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEVBQUEsRUFBQSxHQUFBLEVBQTZCO0FBQzNCLFlBQUEsQ0FBQSxJQUFhLElBQWIsQ0FBQTtBQUNEOztBQUVELFdBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxPQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEdBQUEsRUFBQSxHQUFBLEVBQThCO0FBQzVCLGFBQUEsQ0FBQSxJQUFjLElBQWQsQ0FBQTtBQUNEOztBQUVEO0FBQ0Es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LE9BQUEsRUFBMEMsVUFBQSxLQUFBLEVBQWlCO0FBQ3pELFFBQUksT0FBTyxTQUFBLGNBQUEsQ0FBQSxhQUFBLEVBQVgsS0FBQTtBQUNBLFlBQUEsR0FBQSxDQUFZLEdBQUEsSUFBQSxDQUFaLElBQVksQ0FBWjtBQUNBLFdBQUEsSUFBQSxDQUFBLFVBQUEsRUFBd0I7QUFDcEIsY0FEb0Isc0JBQUE7QUFFcEIsaUJBQVcsT0FBQSxJQUFBO0FBRlMsS0FBeEI7QUFIRixHQUFBOztBQVNBLE9BQUEsV0FBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEwQyxVQUFBLEtBQUEsRUFBZ0I7QUFDeEQsUUFBSSxPQUFPLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBWCxLQUFBO0FBQ0EsV0FBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVyxPQUFBLElBQUE7QUFGUyxLQUF4QjtBQUZGLEdBQUE7QUFPRCxDOztrQkF0TVksVztBQXVNZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBWaWV3TWFuYWdlciBmcm9tICcuL3ZpZXdNYW5hZ2VyJztcblxubGV0IHZpZXdtYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICAvL2luaXRpYWxpemUgdmFyaWFibGVzXG4gICAgbGV0IG91dHB1dEFycmF5ID0gW107IC8vc3RvcmUgb3V0cHV0c1xuICAgIGxldCB2ZXNzZWw7XG4gICAgbGV0IG91dHB1dE51bWJlcjtcbiAgICBsZXQgdmVzc2VsT3B0aW9ucztcbiAgICBsZXQgY3VycmVudE91dHB1dCA9IDE7XG4gICAgbGV0IGNoZWNrID0gXCJcIjtcbiAgICBsZXQgcmUgPSAvXFxkKlxcdy87XG4gICAgbGV0IHdlbGxfMjQgPSBbXTtcbiAgICBsZXQgd2VsbF85NiA9IFtdO1xuICAgIGxldCB3ZWxsXzM4NCA9IFtdO1xuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIl07XG5cbiAgICB3ZWxsXzI0WzBdID0gMVxuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMzg0IDsgaSsrKSB7XG4gICAgICB3ZWxsXzI0W2ldID0gaSsxO1xuICAgIH07XG5cbiAgICB3ZWxsXzk2WzBdID0gMTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDk2OyBpKyspIHtcbiAgICAgIHdlbGxfOTZbaV0gPSBpKzE7XG4gICAgfTtcblxuICAgIHdlbGxfMzg0WzBdID0gMTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDM4NDsgaSsrKSB7XG4gICAgICB3ZWxsXzM4NFtpXSA9IGkrMTtcbiAgICB9XG5cbiAgICAvL21ldGhvZHNcbiAgICBmdW5jdGlvbiBhYjJzdHIoYnVmKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWJfbmV3bGluZShzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyICsgJ1xcbic7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3RyMmFiKHN0cikge1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFhZKGJ1dHRvbikge1xuICAgICAgeHkucHVzaChidXR0b24udmFsdWUpO1xuICAgICAgY29uc29sZS5sb2coeHkpO1xuICAgIH07XG5cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLm5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvdG9jb2xcIik7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuRW50ZXJcIik7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFbnRlclwiKTtcbiAgICB0aGlzLmR1cmF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvbkVudGVyXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIHZlc3NlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RWZXNzZWwnKS52YWx1ZTtcbiAgICAgIG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcblxuICAgICAgLy9jcmVhdGUgdGFibGUgZm9yIG91dHB1dCB2ZXNzZWwgaW1hZ2VcbiAgICAgIC8vY3JlYXRlIDI0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMjQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA0OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitqK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCA3OyBqKyspe1xuICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudGlmaWVyKS52YWx1ZSA9IHdlbGxfMjRbY291bnRlcl07XG4gICAgICAgICAgICBjb3VudGVyID0gY291bnRlciArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvL2NyZWF0ZSA5Ni13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDk2KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCAxMzsgaisrKXtcbiAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRlbnRpZmllcikudmFsdWUgPSB3ZWxsXzk2W2NvdW50ZXJdO1xuICAgICAgICAgICAgY291bnRlciA9IGNvdW50ZXIgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy9jcmVhdGUgMzg0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG9uY2xpY2s9J2FwcGVuZFhZKHRoaXMpJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWJfbmV3bGluZShvdXRwdXROdW1iZXIpXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoY3VycmVudE91dHB1dCA8IG91dHB1dE51bWJlcikge1xuICAgICAgICBjdXJyZW50T3V0cHV0ID0gY3VycmVudE91dHB1dCArIDE7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudE91dHB1dCA9PSAob3V0cHV0TnVtYmVyIC0gMSkpIHtcbiAgICAgICAgY3VycmVudE91dHB1dCA9IG91dHB1dE51bWJlcjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgfTtcblxuICAgICAgY29uc29sZS5sb2coeHkuc2xpY2UoMCwtMSkpXG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDExJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKHh5KVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlblN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIGNvbnNvbGUubG9nKHJlLnRlc3QoZGF0YSkpO1xuICAgICAgc29ja2V0LmVtaXQoXCJzZW5kLXJhd1wiLCB7XG4gICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQxMScsXG4gICAgICAgICAgXCJwYXlsb2FkXCI6IHN0cjJhYihkYXRhKVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uIChldmVudCl7XG4gICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoZGF0YSlcbiAgICAgIH0pXG4gICAgfSk7XG4gIH07XG59O1xuIl19
