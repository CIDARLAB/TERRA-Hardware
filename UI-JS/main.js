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

  //buttons
  this.inputButton = document.getElementById("inputButton");
  this.configureButton = document.getElementById("configureButton");
  this.submitProtocol = document.getElementById("submitProtocol");

  //event handlers
  this.inputButton.addEventListener('click', function (event) {
    var vessel = document.getElementById('selectVessel').value;
    var outputNumber = document.getElementById('outputNumber').value;
    var vesselOptions = "";

    for (var i = 1; i < outputNumber; i++) {
      vesselOptions += "<option value='" + i + "'>" + i + "</option>";
    };
    vesselOptions += "<option value='" + outputNumber + "'>" + outputNumber + "</option>";
    document.getElementById('selectOutput').innerHTML = vesselOptions;

    console.log(vessel);
    console.log(outputNumber);

    //create table for output vessel image
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
  });

  this.configureButton.addEventListener('click', function (event) {
    var selectOutput = document.getElementById('selectOutput').value;
    var openSyringe = document.getElementById('openSyringe').value;
    var closeSyringe = document.getElementById('closeSyringe').value;
    var duration = document.getElementById('duration').value;
    console.log(selectOutput);
    console.log(openSyringe);
    console.log(closeSyringe);
    console.log(duration);
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxPQUFBLFdBQUEsR0FBbUIsU0FBQSxjQUFBLENBQW5CLGFBQW1CLENBQW5CO0FBQ0EsT0FBQSxlQUFBLEdBQXVCLFNBQUEsY0FBQSxDQUF2QixpQkFBdUIsQ0FBdkI7QUFDQSxPQUFBLGNBQUEsR0FBc0IsU0FBQSxjQUFBLENBQXRCLGdCQUFzQixDQUF0Qjs7QUFFQTtBQUNBLE9BQUEsV0FBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEyQyxVQUFBLEtBQUEsRUFBaUI7QUFDMUQsUUFBSSxTQUFTLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBYixLQUFBO0FBQ0EsUUFBSSxlQUFlLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBbkIsS0FBQTtBQUNBLFFBQUksZ0JBQUosRUFBQTs7QUFFQSxTQUFLLElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLFlBQUEsRUFBQSxHQUFBLEVBQXVDO0FBQ3JDLHVCQUFpQixvQkFBQSxDQUFBLEdBQUEsSUFBQSxHQUFBLENBQUEsR0FBakIsV0FBQTtBQUNEO0FBQ0QscUJBQWlCLG9CQUFBLFlBQUEsR0FBQSxJQUFBLEdBQUEsWUFBQSxHQUFqQixXQUFBO0FBQ0EsYUFBQSxjQUFBLENBQUEsY0FBQSxFQUFBLFNBQUEsR0FBQSxhQUFBOztBQUVBLFlBQUEsR0FBQSxDQUFBLE1BQUE7QUFDQSxZQUFBLEdBQUEsQ0FBQSxZQUFBOztBQUVBO0FBQ0EsUUFBSSxVQUFKLEVBQUEsRUFBa0I7QUFDaEIsVUFBSSxlQUFKLHdCQUFBO0FBQ0EsV0FBSyxJQUFJLElBQVQsQ0FBQSxFQUFnQixJQUFoQixDQUFB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LElBQUksSUFBVCxDQUFBLEVBQWdCLElBQWhCLEVBQUEsRUFBQSxHQUFBLEVBQTZCO0FBQzNCLGNBQUksZUFBYSxVQUFBLENBQUEsSUFBakIsQ0FBQTtBQUNBLDRCQUFnQix5RkFBQSxZQUFBLEdBQUEsV0FBQSxHQUFBLFlBQUEsR0FBQSxRQUFBLEdBQUEsWUFBQSxHQUFBLElBQUEsR0FBQSxZQUFBLEdBQWhCLGdCQUFBO0FBQ0Q7QUFDSCwwQkFBQSxPQUFBO0FBQ0Q7QUFDRCxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGNBQUE7QUFDQSxlQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQUEsU0FBQSxHQUFBLGNBQUE7QUFDRDtBQS9FSCxHQUFBOztBQWtGQSxPQUFBLGVBQUEsQ0FBQSxnQkFBQSxDQUFBLE9BQUEsRUFBK0MsVUFBQSxLQUFBLEVBQWlCO0FBQzlELFFBQUksZUFBZSxTQUFBLGNBQUEsQ0FBQSxjQUFBLEVBQW5CLEtBQUE7QUFDQSxRQUFJLGNBQWMsU0FBQSxjQUFBLENBQUEsYUFBQSxFQUFsQixLQUFBO0FBQ0EsUUFBSSxlQUFlLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBbkIsS0FBQTtBQUNBLFFBQUksV0FBVyxTQUFBLGNBQUEsQ0FBQSxVQUFBLEVBQWYsS0FBQTtBQUNBLFlBQUEsR0FBQSxDQUFBLFlBQUE7QUFDQSxZQUFBLEdBQUEsQ0FBQSxXQUFBO0FBQ0EsWUFBQSxHQUFBLENBQUEsWUFBQTtBQUNBLFlBQUEsR0FBQSxDQUFBLFFBQUE7QUFSRixHQUFBO0FBVUQsQzs7a0JBcEdZLFc7QUFxR2QiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIHIoZSxuLHQpe2Z1bmN0aW9uIG8oaSxmKXtpZighbltpXSl7aWYoIWVbaV0pe3ZhciBjPVwiZnVuY3Rpb25cIj09dHlwZW9mIHJlcXVpcmUmJnJlcXVpcmU7aWYoIWYmJmMpcmV0dXJuIGMoaSwhMCk7aWYodSlyZXR1cm4gdShpLCEwKTt2YXIgYT1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK2krXCInXCIpO3Rocm93IGEuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixhfXZhciBwPW5baV09e2V4cG9ydHM6e319O2VbaV1bMF0uY2FsbChwLmV4cG9ydHMsZnVuY3Rpb24ocil7dmFyIG49ZVtpXVsxXVtyXTtyZXR1cm4gbyhufHxyKX0scCxwLmV4cG9ydHMscixlLG4sdCl9cmV0dXJuIG5baV0uZXhwb3J0c31mb3IodmFyIHU9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZSxpPTA7aTx0Lmxlbmd0aDtpKyspbyh0W2ldKTtyZXR1cm4gb31yZXR1cm4gcn0pKCkiLCJpbXBvcnQgVmlld01hbmFnZXIgZnJvbSAnLi92aWV3TWFuYWdlcic7XG5cbmxldCB2aWV3bWFuYWdlciA9IG5ldyBWaWV3TWFuYWdlcigpO1xuIiwiZXhwb3J0IGRlZmF1bHQgY2xhc3MgVmlld01hbmFnZXJ7XG4gIGNvbnN0cnVjdG9yKCl7XG4gICAgLy9idXR0b25zXG4gICAgdGhpcy5pbnB1dEJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiaW5wdXRCdXR0b25cIik7XG4gICAgdGhpcy5jb25maWd1cmVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNvbmZpZ3VyZUJ1dHRvblwiKTtcbiAgICB0aGlzLnN1Ym1pdFByb3RvY29sID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzdWJtaXRQcm90b2NvbFwiKTtcblxuICAgIC8vZXZlbnQgaGFuZGxlcnNcbiAgICB0aGlzLmlucHV0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBsZXQgdmVzc2VsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdFZlc3NlbCcpLnZhbHVlO1xuICAgICAgbGV0IG91dHB1dE51bWJlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvdXRwdXROdW1iZXInKS52YWx1ZTtcbiAgICAgIGxldCB2ZXNzZWxPcHRpb25zID0gXCJcIjtcblxuICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBvdXRwdXROdW1iZXI7IGkrKykge1xuICAgICAgICB2ZXNzZWxPcHRpb25zICs9IFwiPG9wdGlvbiB2YWx1ZT0nXCIraStcIic+XCIraStcIjwvb3B0aW9uPlwiO1xuICAgICAgfTtcbiAgICAgIHZlc3NlbE9wdGlvbnMgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIitvdXRwdXROdW1iZXIrXCInPlwiK291dHB1dE51bWJlcitcIjwvb3B0aW9uPlwiO1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdE91dHB1dCcpLmlubmVySFRNTCA9IHZlc3NlbE9wdGlvbnM7XG5cbiAgICAgIGNvbnNvbGUubG9nKHZlc3NlbCk7XG4gICAgICBjb25zb2xlLmxvZyhvdXRwdXROdW1iZXIpO1xuXG4gICAgICAvL2NyZWF0ZSB0YWJsZSBmb3Igb3V0cHV0IHZlc3NlbCBpbWFnZVxuICAgICAgaWYgKHZlc3NlbCA9PSAyNCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgNzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDQ7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgNzsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBuYW1lPSdcIitjb29yZGluYXRlK1wiJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcblxuICAgICAgaWYgKHZlc3NlbCA9PSA5Nikge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMTM7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCA3OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDEzOyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuXG4gICAgICBpZiAodmVzc2VsID09IDM4NCkge1xuICAgICAgICBsZXQgdGhlYWRfaW5zZXJ0ID0gXCI8dGggc2NvcGU9J2NvbCc+IDwvdGg+XCI7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgMjU7IGkrKyl7XG4gICAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdjb2wnPlwiK2krXCI8L3RoPlwiO1xuICAgICAgICB9O1xuICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuXG4gICAgICAgIGxldCB0Ym9keV9pbnNlcnQgPSBcIlwiO1xuICAgICAgICBsZXQgbGV0dGVycyA9IFtcIkFcIixcIkJcIixcIkNcIixcIkRcIixcIkVcIixcIkZcIixcIkdcIixcIkhcIixcIklcIixcIkpcIixcIktcIixcIkxcIixcIk1cIixcIk5cIixcIk9cIixcIlBcIl07XG4gICAgICAgIGZvciAodmFyIGkgPSAwO2kgPCAxNTsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCAyNTsgaisrKSB7XG4gICAgICAgICAgICAgIGxldCBjb29yZGluYXRlID0gbGV0dGVyc1tpXStqO1xuICAgICAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGQ+PGJ1dHRvbiB0eXBlPSdidXR0b24nIGRhdGEtdG9nZ2xlPSdidXR0b24nIGNsYXNzPSdidG4gYnRuLXByaW1hcnkgYnRuLXNtJyBuYW1lPSdcIitjb29yZGluYXRlK1wiJyB2YWx1ZT0nXCIrY29vcmRpbmF0ZStcIicgaWQ9J1wiK2Nvb3JkaW5hdGUrXCInPlwiK2Nvb3JkaW5hdGUrXCI8L2J1dHRvbj48L3RkPlwiO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8L3RyPlwiO1xuICAgICAgICB9O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGJvZHlfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGJvZHlfaW5zZXJ0O1xuICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhlYWRfaW5zZXJ0JykuaW5uZXJIVE1MID0gdGhlYWRfaW5zZXJ0O1xuICAgICAgfTtcbiAgICB9KTtcblxuICAgIHRoaXMuY29uZmlndXJlQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICBsZXQgc2VsZWN0T3V0cHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NlbGVjdE91dHB1dCcpLnZhbHVlO1xuICAgICAgbGV0IG9wZW5TeXJpbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5TeXJpbmdlJykudmFsdWU7XG4gICAgICBsZXQgY2xvc2VTeXJpbmdlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Nsb3NlU3lyaW5nZScpLnZhbHVlO1xuICAgICAgbGV0IGR1cmF0aW9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2R1cmF0aW9uJykudmFsdWU7XG4gICAgICBjb25zb2xlLmxvZyhzZWxlY3RPdXRwdXQpO1xuICAgICAgY29uc29sZS5sb2cob3BlblN5cmluZ2UpO1xuICAgICAgY29uc29sZS5sb2coY2xvc2VTeXJpbmdlKTtcbiAgICAgIGNvbnNvbGUubG9nKGR1cmF0aW9uKTtcbiAgICB9KTtcbiAgfTtcbn07XG4iXX0=
