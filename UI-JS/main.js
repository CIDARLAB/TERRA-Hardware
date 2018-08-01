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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBQSxlQUFBO0FBQ0EsTUFBQSxxQkFBQTtBQUNBLE1BQUEsc0JBQUE7QUFDQSxNQUFJLGdCQUFKLENBQUE7O0FBRUE7QUFDQSxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFdBQU8sT0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBZ0MsSUFBQSxVQUFBLENBQXZDLEdBQXVDLENBQWhDLENBQVA7QUFDSDs7QUFFRCxXQUFBLGNBQUEsQ0FBQSxHQUFBLEVBQTZCO0FBQ3pCLFVBQU0sTUFBTixJQUFBO0FBQ0EsUUFBSSxNQUFNLElBQUEsV0FBQSxDQUFnQixJQUZELE1BRWYsQ0FBVixDQUZ5QixDQUVjO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJQUF6QixNQUFBLEVBQXFDLElBQXJDLE1BQUEsRUFBQSxHQUFBLEVBQXNEO0FBQ2xELGNBQUEsQ0FBQSxJQUFhLElBQUEsVUFBQSxDQUFiLENBQWEsQ0FBYjtBQUNIO0FBQ0QsV0FBQSxHQUFBO0FBQ0g7O0FBRUQsV0FBQSxNQUFBLENBQUEsR0FBQSxFQUFxQjtBQUNqQixRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRFQsTUFDUCxDQUFWLENBRGlCLENBQ3NCO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJQUF6QixNQUFBLEVBQXFDLElBQXJDLE1BQUEsRUFBQSxHQUFBLEVBQXNEO0FBQ2xELGNBQUEsQ0FBQSxJQUFhLElBQUEsVUFBQSxDQUFiLENBQWEsQ0FBYjtBQUNIO0FBQ0QsV0FBQSxHQUFBO0FBQ0g7O0FBRUQsV0FBQSxRQUFBLENBQUEsTUFBQSxFQUEwQjtBQUN4QixPQUFBLElBQUEsQ0FBUSxPQUFSLEtBQUE7QUFDQSxZQUFBLEdBQUEsQ0FBQSxFQUFBO0FBQ0Q7O0FBRUQ7QUFDQSxPQUFBLFdBQUEsR0FBbUIsU0FBQSxjQUFBLENBQW5CLGFBQW1CLENBQW5CO0FBQ0EsT0FBQSxVQUFBLEdBQWtCLFNBQUEsY0FBQSxDQUFsQixpQkFBa0IsQ0FBbEI7QUFDQSxPQUFBLFlBQUEsR0FBb0IsU0FBQSxjQUFBLENBQXBCLGdCQUFvQixDQUFwQjtBQUNBLE9BQUEsVUFBQSxHQUFrQixTQUFBLGNBQUEsQ0FBbEIsV0FBa0IsQ0FBbEI7QUFDQSxPQUFBLFdBQUEsR0FBbUIsU0FBQSxjQUFBLENBQW5CLFlBQW1CLENBQW5CO0FBQ0EsT0FBQSxjQUFBLEdBQXNCLFNBQUEsY0FBQSxDQUF0QixlQUFzQixDQUF0Qjs7QUFFQTtBQUNBLE9BQUEsV0FBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEyQyxVQUFBLEtBQUEsRUFBaUI7QUFDMUQsYUFBQSxjQUFBLENBQUEsZUFBQSxFQUFBLFNBQUEsR0FBQSxhQUFBO0FBQ0EsYUFBUyxTQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQVQsS0FBQTtBQUNBLG1CQUFlLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBZixLQUFBOztBQUVBO0FBQ0E7QUFDQSxRQUFJLFVBQUosRUFBQSxFQUFrQjtBQUNoQixVQUFJLGVBQUosd0JBQUE7QUFDQSxXQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLENBQUEsRUFBQSxHQUFBLEVBQTJCO0FBQ3pCLHdCQUFnQixxQkFBQSxDQUFBLEdBQWhCLE9BQUE7QUFDRDtBQUNELHNCQUFBLE9BQUE7O0FBRUEsVUFBSSxlQUFKLEVBQUE7QUFDQSxVQUFJLFVBQVUsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBZCxHQUFjLENBQWQ7QUFDQSxXQUFLLElBQUksSUFBVCxDQUFBLEVBQWUsSUFBZixDQUFBLEVBQUEsR0FBQSxFQUEwQjtBQUN4Qix3QkFBQSxNQUFBO0FBQ0Esd0JBQWdCLHFCQUFtQixRQUFuQixDQUFtQixDQUFuQixHQUFoQixPQUFBO0FBQ0UsYUFBSyxJQUFJLElBQVQsQ0FBQSxFQUFnQixJQUFoQixDQUFBLEVBQUEsR0FBQSxFQUE0QjtBQUMxQixjQUFJLGFBQWEsUUFBQSxDQUFBLElBQWpCLENBQUE7QUFDQSwwQkFBZ0IsbUhBQUEsQ0FBQSxHQUFBLFFBQUEsR0FBQSxVQUFBLEdBQUEsSUFBQSxHQUFBLFVBQUEsR0FBaEIsZ0JBQUE7QUFDRDtBQUNILHdCQUFBLE9BQUE7QUFDRDtBQUNELGVBQUEsY0FBQSxDQUFBLGNBQUEsRUFBQSxTQUFBLEdBQUEsWUFBQTtBQUNBLGVBQUEsY0FBQSxDQUFBLGNBQUEsRUFBQSxTQUFBLEdBQUEsWUFBQTtBQUNEOztBQUVEO0FBQ0EsUUFBSSxVQUFKLEVBQUEsRUFBa0I7QUFDaEIsVUFBSSxnQkFBSix3QkFBQTtBQUNBLFdBQUssSUFBSSxJQUFULENBQUEsRUFBZ0IsSUFBaEIsRUFBQSxFQUFBLEdBQUEsRUFBNEI7QUFDMUIseUJBQWdCLHFCQUFBLENBQUEsR0FBaEIsT0FBQTtBQUNEO0FBQ0QsdUJBQUEsT0FBQTs7QUFFQSxVQUFJLGdCQUFKLEVBQUE7QUFDQSxVQUFJLFdBQVUsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWQsR0FBYyxDQUFkO0FBQ0EsV0FBSyxJQUFJLElBQVQsQ0FBQSxFQUFlLElBQWYsQ0FBQSxFQUFBLEdBQUEsRUFBMEI7QUFDeEIseUJBQUEsTUFBQTtBQUNBLHlCQUFnQixxQkFBbUIsU0FBbkIsQ0FBbUIsQ0FBbkIsR0FBaEIsT0FBQTtBQUNFLGFBQUssSUFBSSxJQUFULENBQUEsRUFBZ0IsSUFBaEIsRUFBQSxFQUFBLEdBQUEsRUFBNkI7QUFDM0IsY0FBSSxjQUFhLFNBQUEsQ0FBQSxJQUFqQixDQUFBO0FBQ0EsMkJBQWdCLG1IQUFBLENBQUEsR0FBQSxRQUFBLEdBQUEsV0FBQSxHQUFBLElBQUEsR0FBQSxXQUFBLEdBQWhCLGdCQUFBO0FBQ0Q7QUFDSCx5QkFBQSxPQUFBO0FBQ0Q7QUFDRCxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGFBQUE7QUFDQSxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGFBQUE7QUFDRDs7QUFFRDtBQUNBLFFBQUksVUFBSixHQUFBLEVBQW1CO0FBQ2pCLFVBQUksaUJBQUosd0JBQUE7QUFDQSxXQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEVBQUEsRUFBQSxHQUFBLEVBQTRCO0FBQzFCLDBCQUFnQixxQkFBQSxDQUFBLEdBQWhCLE9BQUE7QUFDRDtBQUNELHdCQUFBLE9BQUE7O0FBRUEsVUFBSSxpQkFBSixFQUFBO0FBQ0EsVUFBSSxZQUFVLENBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWQsR0FBYyxDQUFkO0FBQ0EsV0FBSyxJQUFJLElBQVQsQ0FBQSxFQUFlLElBQWYsRUFBQSxFQUFBLEdBQUEsRUFBMkI7QUFDekIsMEJBQUEsTUFBQTtBQUNBLDBCQUFnQixxQkFBbUIsVUFBbkIsQ0FBbUIsQ0FBbkIsR0FBaEIsT0FBQTtBQUNFLGFBQUssSUFBSSxJQUFULENBQUEsRUFBZ0IsSUFBaEIsRUFBQSxFQUFBLEdBQUEsRUFBNkI7QUFDM0IsY0FBSSxlQUFhLFVBQUEsQ0FBQSxJQUFqQixDQUFBO0FBQ0EsNEJBQWdCLG1IQUFBLENBQUEsR0FBQSxRQUFBLEdBQUEsWUFBQSxHQUFBLElBQUEsR0FBQSxZQUFBLEdBQWhCLGdCQUFBO0FBQ0Q7QUFDSCwwQkFBQSxPQUFBO0FBQ0Q7QUFDRCxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGNBQUE7QUFDQSxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGNBQUE7QUFDRDtBQUNELFdBQUEsSUFBQSxDQUFBLFVBQUEsRUFBd0I7QUFDcEIsY0FEb0Isc0JBQUE7QUFFcEIsaUJBQVcsZUFBQSxZQUFBO0FBRlMsS0FBeEI7QUExRUYsR0FBQTs7QUFnRkEsT0FBQSxVQUFBLENBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQXlDLFVBQUEsS0FBQSxFQUFlO0FBQ3RELFFBQUcsaUJBQUEsQ0FBQSxJQUFzQixpQkFBa0IsZUFBM0MsQ0FBQSxFQUE4RDtBQUM1RCxlQUFBLGNBQUEsQ0FBQSxlQUFBLEVBQUEsU0FBQSxHQUFBLGFBQUE7QUFDQSxzQkFBZ0IsZ0JBQWhCLENBQUE7QUFGRixLQUFBLE1BR087QUFDTCxlQUFBLGNBQUEsQ0FBQSxlQUFBLEVBQUEsU0FBQSxHQUFBLGFBQUE7QUFDRDtBQUNELFlBQUEsR0FBQSxDQUFBLEVBQUE7QUFQRixHQUFBOztBQVVBLE9BQUEsVUFBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEwQyxVQUFBLEtBQUEsRUFBaUI7QUFDekQsUUFBSSxPQUFPLFNBQUEsY0FBQSxDQUFBLGFBQUEsRUFBWCxLQUFBO0FBQ0EsV0FBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVyxPQUFBLElBQUE7QUFGUyxLQUF4QjtBQUZGLEdBQUE7O0FBUUEsT0FBQSxXQUFBLENBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQTBDLFVBQUEsS0FBQSxFQUFnQjtBQUN4RCxRQUFJLE9BQU8sU0FBQSxjQUFBLENBQUEsY0FBQSxFQUFYLEtBQUE7QUFDQSxXQUFBLElBQUEsQ0FBQSxVQUFBLEVBQXdCO0FBQ3BCLGNBRG9CLHNCQUFBO0FBRXBCLGlCQUFXLE9BQUEsSUFBQTtBQUZTLEtBQXhCO0FBRkYsR0FBQTtBQU9ELEM7O2tCQXhKWSxXO0FBeUpkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gJy4vdmlld01hbmFnZXInO1xuXG5sZXQgdmlld21hbmFnZXIgPSBuZXcgVmlld01hbmFnZXIoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNYW5hZ2Vye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIC8vaW5pdGlhbGl6ZSB2YXJpYWJsZXNcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTsgLy9zdG9yZSBvdXRwdXRzXG4gICAgbGV0IHZlc3NlbDtcbiAgICBsZXQgb3V0cHV0TnVtYmVyO1xuICAgIGxldCB2ZXNzZWxPcHRpb25zO1xuICAgIGxldCBjdXJyZW50T3V0cHV0ID0gMDtcblxuICAgIC8vbWV0aG9kc1xuICAgIGZ1bmN0aW9uIGFiMnN0cihidWYpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0cjJhYl9uZXdsaW5lKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgKyAnXFxuJztcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWIoc3RyKSB7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kWFkoYnV0dG9uKSB7XG4gICAgICB4eS5wdXNoKGJ1dHRvbi52YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZyh4eSk7XG4gICAgfTtcblxuICAgIC8vYnV0dG9uc1xuICAgIHRoaXMuaW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0QnV0dG9uXCIpO1xuICAgIHRoaXMubmV4dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlndXJlQnV0dG9uXCIpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRQcm90b2NvbFwiKTtcbiAgICB0aGlzLm9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5FbnRlclwiKTtcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUVudGVyXCIpO1xuICAgIHRoaXMuZHVyYXRpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uRW50ZXJcIik7XG5cbiAgICAvL2V2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5pbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgdmVzc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdFZlc3NlbCcpLnZhbHVlO1xuICAgICAgb3V0cHV0TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dE51bWJlcicpLnZhbHVlO1xuXG4gICAgICAvL2NyZWF0ZSB0YWJsZSBmb3Igb3V0cHV0IHZlc3NlbCBpbWFnZVxuICAgICAgLy9jcmVhdGUgMjQtd2VsbCBwbGF0ZVxuICAgICAgaWYgKHZlc3NlbCA9PSAyNCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDQ7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBvbmNsaWNrPSdhcHBlbmRYWSh0aGlzKScgdmFsdWU9J1wiK2orXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDk2LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gOTYpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEzOyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAxMzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBvbmNsaWNrPSdhcHBlbmRYWSh0aGlzKScgdmFsdWU9J1wiK2orXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDM4NC13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDM4NCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMjU7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIixcIklcIixcIkpcIixcIktcIixcIkxcIixcIk1cIixcIk5cIixcIk9cIixcIlBcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCAxNTsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAyNTsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBvbmNsaWNrPSdhcHBlbmRYWSh0aGlzKScgdmFsdWU9J1wiK2orXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiX25ld2xpbmUob3V0cHV0TnVtYmVyKVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMubmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYoY3VycmVudE91dHB1dCA9PSAwIHx8IGN1cnJlbnRPdXRwdXQgIT0gKG91dHB1dE51bWJlciAtIDEpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgICAgY3VycmVudE91dHB1dCA9IGN1cnJlbnRPdXRwdXQgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKHh5KTtcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlblN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MjEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoZGF0YSlcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VTeXJpbmdlJykudmFsdWU7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuICB9O1xufTtcbiJdfQ==
