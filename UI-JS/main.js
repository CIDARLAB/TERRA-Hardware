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
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(outputNumber)
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
    var data = document.getElementById('openEnter');
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(data)
    });
  });

  this.closeButton.addEventListener('click', function (event) {
    var data = document.getElementById('closeEnter');
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": str2ab(data)
    });
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxNQUFJLGNBRk8sRUFFWCxDQUZXLENBRVc7QUFDdEIsTUFBSSxZQUhPLEVBR1gsQ0FIVyxDQUdXO0FBQ3RCLE1BQUksYUFKTyxFQUlYLENBSlcsQ0FJVztBQUN0QixNQUFBLGVBQUE7QUFDQSxNQUFBLHFCQUFBO0FBQ0EsTUFBQSxzQkFBQTtBQUNBLE1BQUksZ0JBQUosQ0FBQTs7QUFHQTtBQUNBLFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7QUFDakIsV0FBTyxPQUFBLFlBQUEsQ0FBQSxLQUFBLENBQUEsSUFBQSxFQUFnQyxJQUFBLFVBQUEsQ0FBdkMsR0FBdUMsQ0FBaEMsQ0FBUDtBQUNIOztBQUVELFdBQUEsTUFBQSxDQUFBLEdBQUEsRUFBcUI7QUFDakIsVUFBTSxNQUFOLElBQUE7QUFDQSxRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRlQsTUFFUCxDQUFWLENBRmlCLENBRXNCO0FBQ3ZDLFFBQUksVUFBVSxJQUFBLFVBQUEsQ0FBZCxHQUFjLENBQWQ7QUFDQSxTQUFLLElBQUksSUFBSixDQUFBLEVBQVcsU0FBUyxJQUF6QixNQUFBLEVBQXFDLElBQXJDLE1BQUEsRUFBQSxHQUFBLEVBQXNEO0FBQ2xELGNBQUEsQ0FBQSxJQUFhLElBQUEsVUFBQSxDQUFiLENBQWEsQ0FBYjtBQUNIO0FBQ0QsV0FBQSxHQUFBO0FBQ0g7O0FBRUQsV0FBQSxRQUFBLENBQUEsR0FBQSxFQUFzQjtBQUNwQixRQUFJLE1BQU0sSUFBQSxXQUFBLENBQWdCLElBRE4sTUFDVixDQUFWLENBRG9CLENBQ21CO0FBQ3ZDLFFBQUksVUFB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Q0FBWDtBQUNBLFdBQUEsSUFBQSxDQUFBLFVBQUEsRUFBd0I7QUFDcEIsY0FEb0Isc0JBQUE7QUFFcEIsaUJBQVcsT0FBQSxJQUFBO0FBRlMsS0FBeEI7QUFGRixHQUFBO0FBT0QsQzs7a0JBdkpZLFc7QUF3SmQiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSAnLi92aWV3TWFuYWdlcic7XG5cbmxldCB2aWV3bWFuYWdlciA9IG5ldyBWaWV3TWFuYWdlcigpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgLy9pbml0aWFsaXplIHZhcmlhYmxlc1xuICAgIGxldCBvdXRwdXRBcnJheSA9IFtdOyAvL3N0b3JlIG91dHB1dHNcbiAgICBsZXQgb3BlbkFycmF5ID0gW107ICAgLy9zdG9yZSBvcGVuIHN5cmluZ2VzIHBlciBvdXRwdXRcbiAgICBsZXQgY2xvc2VBcnJheSA9IFtdOyAgLy9zdG9yZSBjbG9zZSBzeXJpbmdlcyBwZXIgb3V0cHV0XG4gICAgbGV0IHZlc3NlbDtcbiAgICBsZXQgb3V0cHV0TnVtYmVyO1xuICAgIGxldCB2ZXNzZWxPcHRpb25zO1xuICAgIGxldCBjdXJyZW50T3V0cHV0ID0gMDtcblxuXG4gICAgLy9tZXRob2RzXG4gICAgZnVuY3Rpb24gYWIyc3RyKGJ1Zikge1xuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShidWYpKTtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc3RyMmFiKHN0cikge1xuICAgICAgICBzdHIgPSBzdHIgKyAnXFxuJztcbiAgICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICAgIHZhciBidWZWaWV3ID0gbmV3IFVpbnQ4QXJyYXkoYnVmKTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDAsIHN0ckxlbiA9IHN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuICAgICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzdHIyYWJfMihzdHIpe1xuICAgICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKTsgLy8gMiBieXRlcyBmb3IgZWFjaCBjaGFyXG4gICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICBmb3IgKHZhciBpID0gMCwgc3RyTGVuID0gc3RyLmxlbmd0aDsgaSA8IHN0ckxlbjsgaSsrKSB7XG4gICAgICAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuICAgICAgfTtcbiAgICAgIHJldHVybiBidWY7XG4gICAgfVxuXG4gICAgLy9idXR0b25zXG4gICAgdGhpcy5pbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRCdXR0b25cIik7XG4gICAgdGhpcy5uZXh0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjb25maWd1cmVCdXR0b25cIik7XG4gICAgdGhpcy5zdWJtaXRCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFByb3RvY29sXCIpO1xuICAgIHRoaXMub3BlbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwib3BlbkVudGVyXCIpO1xuICAgIHRoaXMuY2xvc2VCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNsb3NlRW50ZXJcIik7XG4gICAgdGhpcy5kdXJhdGlvbkJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZHVyYXRpb25FbnRlclwiKTtcblxuICAgIC8vZXZlbnQgaGFuZGxlcnNcbiAgICB0aGlzLmlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY3VycmVudE91dHB1dCcpLmlubmVySFRNTCA9IGN1cnJlbnRPdXRwdXQ7XG4gICAgICB2ZXNzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0VmVzc2VsJykudmFsdWU7XG4gICAgICBvdXRwdXROdW1iZXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3V0cHV0TnVtYmVyJykudmFsdWU7XG4gICAgICBvcGVuQXJyYXkgPSBbb3V0cHV0TnVtYmVyXTsgICAvL3N0b3JlIG9wZW4gc3lyaW5nZXMgcGVyIG91dHB1dFxuICAgICAgY2xvc2VBcnJheSA9IFtvdXRwdXROdW1iZXJdOyAgLy9zdG9yZSBjbG9zZSBzeXJpbmdlcyBwZXIgb3V0cHV0XG5cbiAgICAgIC8vY3JlYXRlIHRhYmxlIGZvciBvdXRwdXQgdmVzc2VsIGltYWdlXG4gICAgICAvL2NyZWF0ZSAyNC13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDI0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA3OyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgNDsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuXG4gICAgICAvL2NyZWF0ZSA5Ni13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDk2KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgbmFtZT0nXCIrY29vcmRpbmF0ZStcIicgdmFsdWU9J1wiK2Nvb3JkaW5hdGUrXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIC8vY3JlYXRlIDM4NC13ZWxsIHBsYXRlXG4gICAgICBpZiAodmVzc2VsID09IDM4NCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMjU7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIixcIklcIixcIkpcIixcIktcIixcIkxcIixcIk1cIixcIk5cIixcIk9cIixcIlBcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCAxNTsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAyNTsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBuYW1lPSdcIitjb29yZGluYXRlK1wiJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MjEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBzdHIyYWIob3V0cHV0TnVtYmVyKVxuICAgICAgfSlcbiAgICB9KTtcblxuICAgIHRoaXMubmV4dEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsZnVuY3Rpb24oZXZlbnQpe1xuICAgICAgaWYoY3VycmVudE91dHB1dCA9PSAwIHx8IGN1cnJlbnRPdXRwdXQgIT0gKG91dHB1dE51bWJlciAtIDEpKSB7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjdXJyZW50T3V0cHV0JykuaW5uZXJIVE1MID0gY3VycmVudE91dHB1dDtcbiAgICAgICAgY3VycmVudE91dHB1dCA9IGN1cnJlbnRPdXRwdXQgKyAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2N1cnJlbnRPdXRwdXQnKS5pbm5lckhUTUwgPSBjdXJyZW50T3V0cHV0O1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMub3BlbkJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbkVudGVyJyk7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIHRoaXMuY2xvc2VCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLGZ1bmN0aW9uIChldmVudCl7XG4gICAgICBsZXQgZGF0YSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjbG9zZUVudGVyJyk7XG4gICAgICBzb2NrZXQuZW1pdChcInNlbmQtcmF3XCIsIHtcbiAgICAgICAgICBcIm5hbWVcIjogJy9kZXYvY3UudXNibW9kZW0xNDIxJyxcbiAgICAgICAgICBcInBheWxvYWRcIjogc3RyMmFiKGRhdGEpXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfTtcbn07XG4iXX0=
