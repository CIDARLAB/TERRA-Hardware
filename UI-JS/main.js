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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBSSxZQUhPLEVBR1gsQ0FIVyxDQUdXO0FBQ3RCLE1BQUksYUFKTyxFQUlYLENBSlcsQ0FJVztBQUN0QixNQUFBLGVBQUE7QUFDQSxNQUFBLHFCQUFBO0FBQ0EsTUFBQSxzQkFBQTtBQUNBLE1BQUksZ0JBQUosQ0FBQTs7QUFHQTtBQUNBLFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7QUFDakIsV0FBTyxPQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFnQyxJQUFBLFVBQUEsQ0FBdkMsR0FBdUMsQ0FBaEMsQ0FBUDtBQUNIOztBQUVELFdBQUEsY0FBQSxDQUFBLEdBQUEsRUFBNkI7QUFDekIsVUFBTSxNQUFOLElBQUE7QUFDQSxRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRkQsTUFFZixDQUFWLENBRnlCLENBRWM7QUFDdkMsUUFBSSxVQUFVLElBQUEsVUFBQSxDQUFkLEdBQWMsQ0FBZDtBQUNBLFNBQUssSUFBSSxJQUFKLENBQUEsRUFBVyxTQUFTLElBQXpCLE1BQUEsRUFBcUMsSUFBckMsTUFBQSxFQUFBLEdBQUEsRUFBc0Q7QUFDbEQsY0FBQSxDQUFBLElBQWEsSUFBQSxVQUFBLENBQWIsQ0FBYSxDQUFiO0FBQ0g7QUFDRCxXQUFBLEdBQUE7QUFDSDs7QUFFRCxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFFBQUksTUFBTSxJQUFBLFdBQUEsQ0FBZ0IsSUFEVCxNQUNQLENBQVYsQ0FEaUIsQ0FDc0I7QUFDdkMsUUFBSSxVQUFV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QUFBLEVBQVgsS0FBQTtBQUNBLFdBQUEsSUFBQSxDQUFBLFVBQUEsRUFBd0I7QUFDcEIsY0FEb0Isc0JBQUE7QUFFcEIsaUJBQVcsT0FBQSxJQUFBO0FBRlMsS0FBeEI7QUFGRixHQUFBO0FBT0QsQzs7a0JBdkpZLFc7QUF3SmQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSAnLi92aWV3TWFuYWdlcic7XG5cbmxldCB2aWV3bWFuYWdlciA9IG5ldyBWaWV3TWFuYWdlcigpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgLy9pbml0aWFsaXplIHZhcmlhYmxlc1xuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdOyAvL3N0b3JlIG91dHB1dHNcbiAgICBsZXQgb3BlbkFycmF5ID0gW107ICAgLy9zdG9yZSBvcGVuIHN5cmluZ2VzIHBlciBvdXRwdXRcbiAgICBsZXQgY2xvc2VBcnJheSA9IFtdOyAgLy9zdG9yZSBjbG9zZSBzeXJpbmdlcyBwZXIgb3V0cHV0XG4gICAgbGV0IHZlc3NlbDtcbiAgICBsZXQgb3V0cHV0TnVtYmVyO1xuICAgIGxldCB2ZXNzZWxPcHRpb25zO1xuICAgIGxldCBjdXJyZW50T3V0cHV0ID0gMDtcblxuXG4gICAgLy9tZXRob2RzXG4gICAgZnVuY3Rpb24gYWIyc3RyKGJ1Zikge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShidWYpKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3RyMmFiX25ld2xpbmUoc3RyKSB7XG4gICAgICAgIHN0ciA9IHN0ciArICdcXG4nO1xuICAgICAgICB2YXIgYnVmID0gbmV3IEFycmF5QnVmZmVyKHN0ci5sZW5ndGgpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiAgICAgICAgdmFyIGJ1ZlZpZXcgPSBuZXcgVWludDhBcnJheShidWYpO1xuICAgICAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgICBidWZWaWV3W2ldID0gc3RyLmNoYXJDb2RlQXQoaSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBidWY7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHN0cjJhYihzdHIpIHtcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH07XG5cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLm5leHRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwic3VibWl0UHJvdG9jb2xcIik7XG4gICAgdGhpcy5vcGVuQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJvcGVuRW50ZXJcIik7XG4gICAgdGhpcy5jbG9zZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2xvc2VFbnRlclwiKTtcbiAgICB0aGlzLmR1cmF0aW9uQnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJkdXJhdGlvbkVudGVyXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIHZlc3NlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZWxlY3RWZXNzZWwnKS52YWx1ZTtcbiAgICAgIG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcbiAgICAgIG9wZW5BcnJheSA9IFtvdXRwdXROdW1iZXJdOyAgIC8vc3RvcmUgb3BlbiBzeXJpbmdlcyBwZXIgb3V0cHV0XG4gICAgICBjbG9zZUFycmF5ID0gW291dHB1dE51bWJlcl07ICAvL3N0b3JlIGNsb3NlIHN5cmluZ2VzIHBlciBvdXRwdXRcblxuICAgICAgLy9jcmVhdGUgdGFibGUgZm9yIG91dHB1dCB2ZXNzZWwgaW1hZ2VcbiAgICAgIC8vY3JlYXRlIDI0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMjQpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA0OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDc7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgbmFtZT0nXCIrY29vcmRpbmF0ZStcIicgdmFsdWU9J1wiK2Nvb3JkaW5hdGUrXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDk2LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gOTYpIHtcbiAgICAgICAgbGV0IHRoZWFkX2luc2VydCA9IFwiPHRoIHNjb3BlPSdjb2wnPiA8L3RoPlwiO1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IDEzOyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCIsXCJFXCIsXCJGXCIsXCJHXCIsXCJIXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAxMzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBuYW1lPSdcIitjb29yZGluYXRlK1wiJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcblxuICAgICAgLy9jcmVhdGUgMzg0LXdlbGwgcGxhdGVcbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuICAgICAgc29ja2V0LmVtaXQoXCJzZW5kLXJhd1wiLCB7XG4gICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQyMScsXG4gICAgICAgICAgXCJwYXlsb2FkXCI6IHN0cjJhYl9uZXdsaW5lKG91dHB1dE51bWJlcilcbiAgICAgIH0pXG4gICAgfSk7XG5cbiAgICB0aGlzLm5leHRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uKGV2ZW50KXtcbiAgICAgIGlmKGN1cnJlbnRPdXRwdXQgPT0gMCB8fCBjdXJyZW50T3V0cHV0ICE9IChvdXRwdXROdW1iZXIgLSAxKSkge1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudE91dHB1dCcpLmlubmVySFRNTCA9IGN1cnJlbnRPdXRwdXQ7XG4gICAgICAgIGN1cnJlbnRPdXRwdXQgPSBjdXJyZW50T3V0cHV0ICsgMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICB0aGlzLm9wZW5CdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGxldCBkYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5TeXJpbmdlJykudmFsdWU7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KVxuICAgIH0pO1xuXG4gICAgdGhpcy5jbG9zZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24gKGV2ZW50KXtcbiAgICAgIGxldCBkYXRhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlU3lyaW5nZScpLnZhbHVlO1xuICAgICAgc29ja2V0LmVtaXQoXCJzZW5kLXJhd1wiLCB7XG4gICAgICAgICAgXCJuYW1lXCI6ICcvZGV2L2N1LnVzYm1vZGVtMTQyMScsXG4gICAgICAgICAgXCJwYXlsb2FkXCI6IHN0cjJhYihkYXRhKVxuICAgICAgfSlcbiAgICB9KTtcbiAgfTtcbn07XG4iXX0=
