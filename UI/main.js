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
  var vessel = void 0;
  var outputNumber = void 0;
  var vesselOptions = void 0;
  var currentOutput = 1;
  var check = "";
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
  console.log(well_96);

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

  function checkString(str) {
    var regex_1 = /\d+\s/;
    var regex_2 = /\d+/;
    if (str.search(regex_1, str) == 0) {
      str = str.replace(regex_1, "");
      while (str.search(regex_1, str) == 0) {
        str = str.replace(regex_1, "");
      };
      if (str.search(regex_2, str) == 0) {
        document.getElementById("openSyringe").style.borderColor = "green";
        document.getElementById("openSyringe").style.borderWidth = "0.15rem";
        return true;
      } else {
        document.getElementById("openSyringe").style.borderColor = "red";
        document.getElementById("openSyringe").style.borderWidth = "0.15rem";
        return false;
      }
    } else {
      document.getElementById("openSyringe").style.borderColor = "red";
      document.getElementById("openSyringe").style.borderWidth = "0.15rem";
      return false;
    };
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
          tbody_insert += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + j + "' id='" + coordinate + "'>" + coordinate + "</button></td>";
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
          _tbody_insert += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + _coordinate + "' id='" + _coordinate + "'>" + _coordinate + "</button></td>";
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
          _tbody_insert2 += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='" + _coordinate2 + "' id='" + _coordinate2 + "'>" + _coordinate2 + "</button></td>";
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
    console.log(xy);
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1411',
      "payload": str2ab(xy)
    });
  });

  this.openButton.addEventListener('click', function (event) {
    var data = document.getElementById('openSyringe').value;
    if (checkString(data)) {
      socket.emit("send-raw", {
        "name": '/dev/cu.usbmodem1411',
        "payload": str2ab(data)
      });
    } else {
      console.log("Try again");
    }
  });

  this.closeButton.addEventListener('click', function (event) {
    var data = document.getElementById('closeSyringe').value;
    checkString(data);
    if (checkString(data)) {
      socket.emit("send-raw", {
        "name": '/dev/cu.usbmodem1411',
        "payload": str2ab(data)
      });
    } else {
      console.log("Try again");
    }
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFBLGVBQUE7QUFDQSxNQUFBLHFCQUFBO0FBQ0EsTUFBQSxzQkFBQTtBQUNBLE1BQUksZ0JBQUosQ0FBQTtBQUNBLE1BQUksUUFBSixFQUFBO0FBQ0EsTUFBSSxVQUFKLEVBQUE7QUFDQSxNQUFJLFVBQUosRUFBQTtBQUNBLE1BQUksV0FBSixFQUFBO0FBQ0EsTUFBSSxVQUFKLENBQUE7QUFDQSxNQUFJLFVBQVUsQ0FBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQSxHQUFBLEVBQWQsR0FBYyxDQUFkOztBQUVBLFVBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxPQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEdBQUEsRUFBQSxHQUFBLEVBQStCO0FBQzdCLFlBQUEsQ0FBQSxJQUFhLElBQWIsQ0FBQTtBQUNEOztBQUVELFVBQUEsQ0FBQSxJQUFBLENBQUE7QUFDQSxPQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEVBQUEsRUFBQSxHQUFBLEVBQTZCO0FBQzNCLFlBQUEsQ0FBQSxJQUFhLElBQWIsQ0FBQTtBQUNEO0FBQ0QsVUFBQSxHQUFBLENBQUEsT0FBQTs7QUFFQSxXQUFBLENBQUEsSUFBQSxDQUFBO0FBQ0EsT0FBSyxJQUFJLElBQVQsQ0FBQSxFQUFnQixJQUFoQixHQUFBLEVBQUEsR0FBQSxFQUE4QjtBQUM1QixhQUFBLENBQUEsSUFBYyxJQUFkLENBQUE7QUFDRDs7QUFFRDtBQUNBLFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7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QUEsRUFBZ0I7QUFDeEQsUUFBSSxPQUFPLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBWCxLQUFBO0FBQ0EsZ0JBQUEsSUFBQTtBQUNBLFFBQUksWUFBSixJQUFJLENBQUosRUFBdUI7QUFDckIsYUFBQSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixnQkFEb0Isc0JBQUE7QUFFcEIsbUJBQVcsT0FBQSxJQUFBO0FBRlMsT0FBeEI7QUFERixLQUFBLE1BS087QUFDTCxjQUFBLEdBQUEsQ0FBQSxXQUFBO0FBQ0Q7QUFWSCxHQUFBO0FBWUQsQzs7a0JBL05ZLFc7QUFnT2QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSAnLi92aWV3TWFuYWdlcic7XG5cbmxldCB2aWV3bWFuYWdlciA9IG5ldyBWaWV3TWFuYWdlcigpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgLy9pbml0aWFsaXplIHZhcmlhYmxlc1xuICAgIGxldCB2ZXNzZWw7XG4gICAgbGV0IG91dHB1dE51bWJlcjtcbiAgICBsZXQgdmVzc2VsT3B0aW9ucztcbiAgICBsZXQgY3VycmVudE91dHB1dCA9IDE7XG4gICAgbGV0IGNoZWNrID0gXCJcIjtcbiAgICBsZXQgd2VsbF8yNCA9IFtdO1xuICAgIGxldCB3ZWxsXzk2ID0gW107XG4gICAgbGV0IHdlbGxfMzg0ID0gW107XG4gICAgbGV0IGNvdW50ZXIgPSAwO1xuICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcblxuICAgIHdlbGxfMjRbMF0gPSAxXG4gICAgZm9yICh2YXIgaSA9IDE7IGkgPCAzODQgOyBpKyspIHtcbiAgICAgIHdlbGxfMjRbaV0gPSBpKzE7XG4gICAgfTtcblxuICAgIHdlbGxfOTZbMF0gPSAxO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgOTY7IGkrKykge1xuICAgICAgd2VsbF85NltpXSA9IGkrMTtcbiAgICB9O1xuICAgIGNvbnNvbGUubG9nKHdlbGxfOTYpO1xuXG4gICAgd2VsbF8zODRbMF0gPSAxO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMzg0OyBpKyspIHtcbiAgICAgIHdlbGxfMzg0W2ldID0gaSsxO1xuICAgIH1cblxuICAgIC8vbWV0aG9kc1xuICAgIGZ1bmN0aW9uIGFiMnN0cihidWYpIHtcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnQ4QXJyYXkoYnVmKSk7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0cjJhYl9uZXdsaW5lKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgKyAnXFxuJztcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWIoc3RyKSB7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIGJ1ZjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gY2hlY2tTdHJpbmcoc3RyKXtcbiAgICAgIHZhciByZWdleF8xID0gL1xcZCtcXHMvO1xuICAgICAgbGV0IHJlZ2V4XzIgPSAvXFxkKy87XG4gICAgICBpZiAoc3RyLnNlYXJjaChyZWdleF8xLHN0cikgPT0gMCl7XG4gICAgICAgIHN0ciA9IHN0ci5yZXBsYWNlKHJlZ2V4XzEsXCJcIik7XG4gICAgICAgIHdoaWxlIChzdHIuc2VhcmNoKHJlZ2V4XzEsc3RyKSA9PSAwKSB7XG4gICAgICAgICAgc3RyID0gc3RyLnJlcGxhY2UocmVnZXhfMSxcIlwiKTtcbiAgICAgICAgfTtcbiAgICAgICAgaWYgKHN0ci5zZWFyY2gocmVnZXhfMixzdHIpID09IDApIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5TeXJpbmdlXCIpLnN0eWxlLmJvcmRlckNvbG9yID0gXCJncmVlblwiO1xuICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3BlblN5cmluZ2VcIikuc3R5bGUuYm9yZGVyV2lkdGggPSBcIjAuMTVyZW1cIjtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5TeXJpbmdlXCIpLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5TeXJpbmdlXCIpLnN0eWxlLmJvcmRlcldpZHRoID0gXCIwLjE1cmVtXCI7XG4gICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcIm9wZW5TeXJpbmdlXCIpLnN0eWxlLmJvcmRlckNvbG9yID0gXCJyZWRcIjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuU3lyaW5nZVwiKS5zdHlsZS5ib3JkZXJXaWR0aCA9IFwiMC4xNXJlbVwiO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9O1xuICAgIH07XG5cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLm5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvdG9jb2xcIik7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuRW50ZXJcIik7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFbnRlclwiKTtcbiAgICB0aGlzLmR1cmF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvbkVudGVyXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIHZlc3NlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RWZXNzZWwnKS52YWx1ZTtcbiAgICAgIG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcblxuICAgICAgLy9jcmVhdGUgdGFibGUgZm9yIG91dHB1dCB2ZXNzZWwgaW1hZ2VcbiAgICAgIC8vY3JlYXRlIDI0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMjQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA0OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitqK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCA3OyBqKyspe1xuICAgICAgICAgICAgbGV0IGlkZW50aWZpZXIgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZGVudGlmaWVyKS52YWx1ZSA9IHdlbGxfMjRbY291bnRlcl07XG4gICAgICAgICAgICBjb3VudGVyID0gY291bnRlciArIDE7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICAvL2NyZWF0ZSA5Ni13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDk2KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDg7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgb25jbGljaz0nYXBwZW5kWFkodGhpcyknIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICAgIGNvdW50ZXIgPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICAgIGZvcih2YXIgaiA9IDE7IGogPCAxMzsgaisrKXtcbiAgICAgICAgICAgIGxldCBpZGVudGlmaWVyID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWRlbnRpZmllcikudmFsdWUgPSB3ZWxsXzk2W2NvdW50ZXJdO1xuICAgICAgICAgICAgY291bnRlciA9IGNvdW50ZXIgKyAxO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfTtcblxuICAgICAgLy9jcmVhdGUgMzg0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG9uY2xpY2s9J2FwcGVuZFhZKHRoaXMpJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWJfbmV3bGluZShvdXRwdXROdW1iZXIpXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5uZXh0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJyxmdW5jdGlvbihldmVudCl7XG4gICAgICBpZiAoY3VycmVudE91dHB1dCA8IG91dHB1dE51bWJlcikge1xuICAgICAgICBjdXJyZW50T3V0cHV0ID0gY3VycmVudE91dHB1dCArIDE7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudE91dHB1dCA9PSAob3V0cHV0TnVtYmVyIC0gMSkpIHtcbiAgICAgICAgY3VycmVudE91dHB1dCA9IG91dHB1dE51bWJlcjtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgfTtcbiAgICAgIGNvbnNvbGUubG9nKHh5KTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MTEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIoeHkpXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5vcGVuQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuU3lyaW5nZScpLnZhbHVlO1xuICAgICAgaWYgKGNoZWNrU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQxMScsXG4gICAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICAgIH0pXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zb2xlLmxvZyhcIlRyeSBhZ2FpblwiKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uIChldmVudCl7XG4gICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZVN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIGNoZWNrU3RyaW5nKGRhdGEpO1xuICAgICAgaWYgKGNoZWNrU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQxMScsXG4gICAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJUcnkgYWdhaW5cIik7XG4gICAgICB9XG4gICAgfSk7XG4gIH07XG59O1xuIl19
