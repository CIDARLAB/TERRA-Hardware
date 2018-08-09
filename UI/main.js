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
  var check = "";
  var re = /\d*\w/;
  var well = [];
  var counter = 0;
  var letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

  well[0] = 1;
  for (var i = 1; i < 96; i++) {
    well[i] = i + 1;
  };

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

      for (var i = 0; i < 7; i++) {
        for (var j = 1; j < 13; j++) {
          var identifier = _letters2[i] + j;
          document.getElementById(identifier).value = well[counter];
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
    if (currentOutput == 0 || currentOutput != outputNumber - 1) {
      document.getElementById('currentOutput').innerHTML = currentOutput;
      currentOutput = currentOutput + 1;
    } else {
      document.getElementById('currentOutput').innerHTML = currentOutput;
    };

    //console.log(xy);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBQSxlQUFBO0FBQ0EsTUFBQSxxQkFBQTtBQUNBLE1BQUEsc0JBQUE7QUFDQSxNQUFJLGdCQUFKLENBQUE7QUFDQSxNQUFJLFFBQUosRUFBQTtBQUNBLE1BQUksS0FBSixPQUFBO0FBQ0EsTUFBSSxPQUFKLEVBQUE7QUFDQSxNQUFJLFVBQUosQ0FBQTtBQUNBLE1BQUksVUFBVSxDQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBZCxHQUFjLENBQWQ7O0FBRUEsT0FBQSxDQUFBLElBQUEsQ0FBQTtBQUNBLE9BQUssSUFBSSxJQUFULENBQUEsRUFBZ0IsSUFBaEIsRUFBQSxFQUFBLEdBQUEsRUFBNkI7QUFDM0IsU0FBQSxDQUFBLElBQVUsSUFBVixDQUFBO0FBQ0Q7O0FBRUQ7QUFDQSxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFdBQU8sT0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBZ0MsSUFBQSxVQUFBLENBQXZDLEdBQXVDLENBQWhDLENBQVA7QUFDSDs7QUFFRCxXQUFBLGNBQUEsQ0FBQSxHQUFBLEVBQTZCO0FBQ3pCLFVBQU0sTUFBTixJQUFBO0FBQ0EsUUFBSSxNQUFNLElBQUEsV0FBQSxDQUFnQixJQUZELE1BRWYsQ0FBVixDQUZ5QixDQUVjO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFB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OEQ7QUFDNUQsZUFBQSxjQUFBLENBQUEsZUFBQSxFQUFBLFNBQUEsR0FBQSxhQUFBO0FBQ0Esc0JBQWdCLGdCQUFoQixDQUFBO0FBRkYsS0FBQSxNQUdPO0FBQ0wsZUFBQSxjQUFBLENBQUEsZUFBQSxFQUFBLFNBQUEsR0FBQSxhQUFBO0FBQ0Q7O0FBRUQ7O0FBRUEsV0FBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVyxPQUFBLEVBQUE7QUFGUyxLQUF4QjtBQVZGLEdBQUE7O0FBZ0JBLE9BQUEsVUFBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEwQyxVQUFBLEtBQUEsRUFBaUI7QUFDekQsUUFBSSxPQUFPLFNBQUEsY0FBQSxDQUFBLGFBQUEsRUFBWCxLQUFBO0FBQ0EsWUFBQSxHQUFBLENBQVksR0FBQSxJQUFBLENBQVosSUFBWSxDQUFaO0FBQ0EsV0FBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVyxPQUFBLElBQUE7QUFGUyxLQUF4QjtBQUhGLEdBQUE7O0FBU0EsT0FBQSxXQUFBLENBQUEsZ0JBQUEsQ0FBQSxPQUFBLEVBQTBDLFVBQUEsS0FBQSxFQUFnQjtBQUN4RCxRQUFJLE9BQU8sU0FBQSxjQUFBLENBQUEsY0FBQSxFQUFYLEtBQUE7QUFDQSxXQUFBLElBQUEsQ0FBQSxVQUFBLEVBQXdCO0FBQ3BCLGNBRG9CLHNCQUFBO0FBRXBCLGlCQUFXLE9BQUEsSUFBQTtBQUZTLEtBQXhCO0FBRkYsR0FBQTtBQU9ELEM7O2tCQWxMWSxXO0FBbUxkIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiByKGUsbix0KXtmdW5jdGlvbiBvKGksZil7aWYoIW5baV0pe2lmKCFlW2ldKXt2YXIgYz1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlO2lmKCFmJiZjKXJldHVybiBjKGksITApO2lmKHUpcmV0dXJuIHUoaSwhMCk7dmFyIGE9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitpK1wiJ1wiKTt0aHJvdyBhLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsYX12YXIgcD1uW2ldPXtleHBvcnRzOnt9fTtlW2ldWzBdLmNhbGwocC5leHBvcnRzLGZ1bmN0aW9uKHIpe3ZhciBuPWVbaV1bMV1bcl07cmV0dXJuIG8obnx8cil9LHAscC5leHBvcnRzLHIsZSxuLHQpfXJldHVybiBuW2ldLmV4cG9ydHN9Zm9yKHZhciB1PVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmUsaT0wO2k8dC5sZW5ndGg7aSsrKW8odFtpXSk7cmV0dXJuIG99cmV0dXJuIHJ9KSgpIiwiaW1wb3J0IFZpZXdNYW5hZ2VyIGZyb20gJy4vdmlld01hbmFnZXInO1xuXG5sZXQgdmlld21hbmFnZXIgPSBuZXcgVmlld01hbmFnZXIoKTtcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIFZpZXdNYW5hZ2Vye1xuICBjb25zdHJ1Y3Rvcigpe1xuICAgIC8vaW5pdGlhbGl6ZSB2YXJpYWJsZXNcbiAgICBsZXQgb3V0cHV0QXJyYXkgPSBbXTsgLy9zdG9yZSBvdXRwdXRzXG4gICAgbGV0IHZlc3NlbDtcbiAgICBsZXQgb3V0cHV0TnVtYmVyO1xuICAgIGxldCB2ZXNzZWxPcHRpb25zO1xuICAgIGxldCBjdXJyZW50T3V0cHV0ID0gMDtcbiAgICBsZXQgY2hlY2sgPSBcIlwiO1xuICAgIGxldCByZSA9IC9cXGQqXFx3LztcbiAgICBsZXQgd2VsbCA9IFtdO1xuICAgIGxldCBjb3VudGVyID0gMDtcbiAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIl07XG5cbiAgICB3ZWxsWzBdID0gMTtcbiAgICBmb3IgKHZhciBpID0gMTsgaSA8IDk2OyBpKyspIHtcbiAgICAgIHdlbGxbaV0gPSBpKzE7XG4gICAgfTtcblxuICAgIC8vbWV0aG9kc1xuICAgIGZ1bmN0aW9uIGFiMnN0cihidWYpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0cjJhYl9uZXdsaW5lKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgKyAnXFxuJztcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWIoc3RyKSB7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kWFkoYnV0dG9uKSB7XG4gICAgICB4eS5wdXNoKGJ1dHRvbi52YWx1ZSk7XG4gICAgICBjb25zb2xlLmxvZyh4eSk7XG4gICAgfTtcblxuICAgIC8vYnV0dG9uc1xuICAgIHRoaXMuaW5wdXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImlucHV0QnV0dG9uXCIpO1xuICAgIHRoaXMubmV4dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlndXJlQnV0dG9uXCIpO1xuICAgIHRoaXMuc3VibWl0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRQcm90b2NvbFwiKTtcbiAgICB0aGlzLm9wZW5CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5FbnRlclwiKTtcbiAgICB0aGlzLmNsb3NlQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjbG9zZUVudGVyXCIpO1xuICAgIHRoaXMuZHVyYXRpb25CdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImR1cmF0aW9uRW50ZXJcIik7XG5cbiAgICAvL2V2ZW50IGhhbmRsZXJzXG4gICAgdGhpcy5pbnB1dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgdmVzc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdFZlc3NlbCcpLnZhbHVlO1xuICAgICAgb3V0cHV0TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dE51bWJlcicpLnZhbHVlO1xuXG4gICAgICAvL2NyZWF0ZSB0YWJsZSBmb3Igb3V0cHV0IHZlc3NlbCBpbWFnZVxuICAgICAgLy9jcmVhdGUgMjQtd2VsbCBwbGF0ZVxuICAgICAgaWYgKHZlc3NlbCA9PSAyNCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDQ7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBvbmNsaWNrPSdhcHBlbmRYWSh0aGlzKScgdmFsdWU9J1wiK2orXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDk2LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gOTYpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEzOyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCJdO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgODsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAxMzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBvbmNsaWNrPSdhcHBlbmRYWSh0aGlzKScgdmFsdWU9J1wiK2Nvb3JkaW5hdGUrXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCAxMzsgaisrKXtcbiAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRlbnRpZmllcikudmFsdWUgPSB3ZWxsW2NvdW50ZXJdO1xuICAgICAgICAgICAgY291bnRlciA9IGNvdW50ZXIgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy9jcmVhdGUgMzg0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG9uY2xpY2s9J2FwcGVuZFhZKHRoaXMpJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWJfbmV3bGluZShvdXRwdXROdW1iZXIpXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihldmVudCl7XG4gICAgICBpZihjdXJyZW50T3V0cHV0ID09IDAgfHwgY3VycmVudE91dHB1dCAhPSAob3V0cHV0TnVtYmVyIC0gMSkpIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgICBjdXJyZW50T3V0cHV0ID0gY3VycmVudE91dHB1dCArIDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudE91dHB1dCcpLmlubmVySFRNTCA9IGN1cnJlbnRPdXRwdXQ7XG4gICAgICB9O1xuXG4gICAgICAvL2NvbnNvbGUubG9nKHh5KTtcblxuICAgICAgc29ja2V0LmVtaXQoXCJzZW5kLXJhd1wiLCB7XG4gICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQxMScsXG4gICAgICAgICAgXCJwYXlsb2FkXCI6IHN0cjJhYih4eSlcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGxldCBkYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5TeXJpbmdlJykudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhyZS50ZXN0KGRhdGEpKTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoZGF0YSlcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLmNsb3NlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbiAoZXZlbnQpe1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2xvc2VTeXJpbmdlJykudmFsdWU7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDExJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuICB9O1xufTtcbiJdfQ==
