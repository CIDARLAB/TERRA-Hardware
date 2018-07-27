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

  //methods
  function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
  }

  function str2ab(str) {
    str = str + '\n';
    var buf = new ArrayBuffer(str.length); // 2 bytes for each char
    var bufView = new Uint8Array(buf);
    for (var i = 0, strLen = str.length; i < strLen; i++) {
      bufView[i] = str.charCodeAt(i);
    }
    return buf;
  }
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

  this.submitProtocol.addEventListener('click', function (event) {
    var data = document.getElementById('openSyringe').value;
    data = str2ab(data);
    console.log(data);
    socket.emit("send-raw", {
      "name": '/dev/cu.usbmodem1421',
      "payload": data
    });
    console.log(data);
  });
};

exports.default = ViewManager;
;

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJhcHAvc2V0dXAuanMiLCJhcHAvdmlld01hbmFnZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7OztBQ0VBLElBQUksY0FBYyxJQUFsQixxQkFBa0IsRUFBbEI7Ozs7Ozs7Ozs7O0lDRmUsVyxHQUNiLHVCQUFhO0FBQUE7O0FBQ1g7QUFDQSxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFdBQU8sT0FBQSxZQUFBLENBQUEsS0FBQSxDQUFBLElBQUEsRUFBZ0MsSUFBQSxVQUFBLENBQXZDLEdBQXVDLENBQWhDLENBQVA7QUFDSDs7QUFFRCxXQUFBLE1BQUEsQ0FBQSxHQUFBLEVBQXFCO0FBQ2pCLFVBQU0sTUFBTixJQUFBO0FBQ0EsUUFBSSxNQUFNLElBQUEsV0FBQSxDQUFnQixJQUZULE1BRVAsQ0FBVixDQUZpQixDQUVzQjtBQUN2QyxRQUFJLFVBQVUsSUFBQSxVQUFBLENBQWQsR0FBYyxDQUFkO0FBQ0EsU0FBSyxJQUFJLElBQUosQ0FBQSxFQUFXLFNBQVMsSUFBekIsTUFBQSxFQUFxQyxJQUFyQyxNQUFBLEVBQUEsR0FBQSxFQUFzRDtBQUNsRCxjQUFBLENBQUEsSUFBYSxJQUFBLFVBQUEsQ0FBYixDQUFhLENBQWI7QUFDSDtBQUNELFdBQUEsR0FBQTtBQUNIO0FBQ0Q7QUFDQSxPQUFBLFdBQUEsR0FBbUIsU0FBQSxjQUFBLENBQW5CLGFBQW1CLENBQW5CO0FBQ0EsT0FBQSxlQUFBLEdBQXVCLFNBQUEsY0FBQSxDQUF2QixpQkFBdUIsQ0FBdkI7QUFDQSxPQUFBLGNBQUEsR0FBc0IsU0FBQSxjQUFBLENBQXRCLGdCQUFzQixDQUF0Qjs7QUFFQTtBQUNBLE9BQUEsV0FBQSxDQUFBLGdCQUFBLENBQUEsT0FBQSxFQUEyQyxVQUFBLEtBQUEsRUFBaUI7QUFDMUQsUUFBSSxTQUFTLFNBQUEsY0FBQSxDQUFBLGNBQUEsRUFBYixLQUFBO0FBQ0EsUUFB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QSxJQUFBLENBQUEsVUFBQSxFQUF3QjtBQUNwQixjQURvQixzQkFBQTtBQUVwQixpQkFBVztBQUZTLEtBQXhCO0FBSUEsWUFBQSxHQUFBLENBQUEsSUFBQTtBQVJGLEdBQUE7QUFVRCxDOztrQkFsSFksVztBQW1IZCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gcihlLG4sdCl7ZnVuY3Rpb24gbyhpLGYpe2lmKCFuW2ldKXtpZighZVtpXSl7dmFyIGM9XCJmdW5jdGlvblwiPT10eXBlb2YgcmVxdWlyZSYmcmVxdWlyZTtpZighZiYmYylyZXR1cm4gYyhpLCEwKTtpZih1KXJldHVybiB1KGksITApO3ZhciBhPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIraStcIidcIik7dGhyb3cgYS5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGF9dmFyIHA9bltpXT17ZXhwb3J0czp7fX07ZVtpXVswXS5jYWxsKHAuZXhwb3J0cyxmdW5jdGlvbihyKXt2YXIgbj1lW2ldWzFdW3JdO3JldHVybiBvKG58fHIpfSxwLHAuZXhwb3J0cyxyLGUsbix0KX1yZXR1cm4gbltpXS5leHBvcnRzfWZvcih2YXIgdT1cImZ1bmN0aW9uXCI9PXR5cGVvZiByZXF1aXJlJiZyZXF1aXJlLGk9MDtpPHQubGVuZ3RoO2krKylvKHRbaV0pO3JldHVybiBvfXJldHVybiByfSkoKSIsImltcG9ydCBWaWV3TWFuYWdlciBmcm9tICcuL3ZpZXdNYW5hZ2VyJztcblxubGV0IHZpZXdtYW5hZ2VyID0gbmV3IFZpZXdNYW5hZ2VyKCk7XG4iLCJleHBvcnQgZGVmYXVsdCBjbGFzcyBWaWV3TWFuYWdlcntcbiAgY29uc3RydWN0b3IoKXtcbiAgICAvL21ldGhvZHNcbiAgICBmdW5jdGlvbiBhYjJzdHIoYnVmKSB7XG4gICAgICAgIHJldHVybiBTdHJpbmcuZnJvbUNoYXJDb2RlLmFwcGx5KG51bGwsIG5ldyBVaW50OEFycmF5KGJ1ZikpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0cjJhYihzdHIpIHtcbiAgICAgICAgc3RyID0gc3RyICsgJ1xcbic7XG4gICAgICAgIHZhciBidWYgPSBuZXcgQXJyYXlCdWZmZXIoc3RyLmxlbmd0aCk7IC8vIDIgYnl0ZXMgZm9yIGVhY2ggY2hhclxuICAgICAgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50OEFycmF5KGJ1Zik7XG4gICAgICAgIGZvciAodmFyIGkgPSAwLCBzdHJMZW4gPSBzdHIubGVuZ3RoOyBpIDwgc3RyTGVuOyBpKyspIHtcbiAgICAgICAgICAgIGJ1ZlZpZXdbaV0gPSBzdHIuY2hhckNvZGVBdChpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYnVmO1xuICAgIH1cbiAgICAvL2J1dHRvbnNcbiAgICB0aGlzLmlucHV0QnV0dG9uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJpbnB1dEJ1dHRvblwiKTtcbiAgICB0aGlzLmNvbmZpZ3VyZUJ1dHRvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY29uZmlndXJlQnV0dG9uXCIpO1xuICAgIHRoaXMuc3VibWl0UHJvdG9jb2wgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInN1Ym1pdFByb3RvY29sXCIpO1xuXG4gICAgLy9ldmVudCBoYW5kbGVyc1xuICAgIHRoaXMuaW5wdXRCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgIGxldCB2ZXNzZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0VmVzc2VsJykudmFsdWU7XG4gICAgICBsZXQgb3V0cHV0TnVtYmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ291dHB1dE51bWJlcicpLnZhbHVlO1xuICAgICAgbGV0IHZlc3NlbE9wdGlvbnMgPSBcIlwiO1xuXG4gICAgICBmb3IgKHZhciBpID0gMTsgaSA8IG91dHB1dE51bWJlcjsgaSsrKSB7XG4gICAgICAgIHZlc3NlbE9wdGlvbnMgKz0gXCI8b3B0aW9uIHZhbHVlPSdcIitpK1wiJz5cIitpK1wiPC9vcHRpb24+XCI7XG4gICAgICB9O1xuICAgICAgdmVzc2VsT3B0aW9ucyArPSBcIjxvcHRpb24gdmFsdWU9J1wiK291dHB1dE51bWJlcitcIic+XCIrb3V0cHV0TnVtYmVyK1wiPC9vcHRpb24+XCI7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2VsZWN0T3V0cHV0JykuaW5uZXJIVE1MID0gdmVzc2VsT3B0aW9ucztcblxuICAgICAgY29uc29sZS5sb2codmVzc2VsKTtcbiAgICAgIGNvbnNvbGUubG9nKG91dHB1dE51bWJlcik7XG5cbiAgICAgIC8vY3JlYXRlIHRhYmxlIGZvciBvdXRwdXQgdmVzc2VsIGltYWdlXG4gICAgICBpZiAodmVzc2VsID09IDI0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCA3OyBpKyspe1xuICAgICAgICAgIHRoZWFkX2luc2VydCArPSBcIjx0aCBzY29wZT0nY29sJz5cIitpK1wiPC90aD5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgdGhlYWRfaW5zZXJ0ICs9IFwiPC90cj5cIjtcblxuICAgICAgICBsZXQgdGJvZHlfaW5zZXJ0ID0gXCJcIjtcbiAgICAgICAgbGV0IGxldHRlcnMgPSBbXCJBXCIsXCJCXCIsXCJDXCIsXCJEXCJdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDtpIDwgNDsgaSsrKXtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dHI+XCI7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRoIHNjb3BlPSdyb3cnPlwiK2xldHRlcnNbaV0rXCI8L3RoPlwiO1xuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDE7IGogPCA3OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuXG4gICAgICBpZiAodmVzc2VsID09IDk2KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAxMzsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDc7IGkrKyl7XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRyPlwiO1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0aCBzY29wZT0ncm93Jz5cIitsZXR0ZXJzW2ldK1wiPC90aD5cIjtcbiAgICAgICAgICAgIGZvciAodmFyIGogPSAxOyBqIDwgMTM7IGorKykge1xuICAgICAgICAgICAgICBsZXQgY29vcmRpbmF0ZSA9IGxldHRlcnNbaV0rajtcbiAgICAgICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPHRkPjxidXR0b24gdHlwZT0nYnV0dG9uJyBkYXRhLXRvZ2dsZT0nYnV0dG9uJyBjbGFzcz0nYnRuIGJ0bi1wcmltYXJ5IGJ0bi1zbScgbmFtZT0nXCIrY29vcmRpbmF0ZStcIicgdmFsdWU9J1wiK2Nvb3JkaW5hdGUrXCInIGlkPSdcIitjb29yZGluYXRlK1wiJz5cIitjb29yZGluYXRlK1wiPC9idXR0b24+PC90ZD5cIjtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgdGJvZHlfaW5zZXJ0ICs9IFwiPC90cj5cIjtcbiAgICAgICAgfTtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Rib2R5X2luc2VydCcpLmlubmVySFRNTCA9IHRib2R5X2luc2VydDtcbiAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoZWFkX2luc2VydCcpLmlubmVySFRNTCA9IHRoZWFkX2luc2VydDtcbiAgICAgIH07XG5cbiAgICAgIGlmICh2ZXNzZWwgPT0gMzg0KSB7XG4gICAgICAgIGxldCB0aGVhZF9pbnNlcnQgPSBcIjx0aCBzY29wZT0nY29sJz4gPC90aD5cIjtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCAyNTsgaSsrKXtcbiAgICAgICAgICB0aGVhZF9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J2NvbCc+XCIraStcIjwvdGg+XCI7XG4gICAgICAgIH07XG4gICAgICAgIHRoZWFkX2luc2VydCArPSBcIjwvdHI+XCI7XG5cbiAgICAgICAgbGV0IHRib2R5X2luc2VydCA9IFwiXCI7XG4gICAgICAgIGxldCBsZXR0ZXJzID0gW1wiQVwiLFwiQlwiLFwiQ1wiLFwiRFwiLFwiRVwiLFwiRlwiLFwiR1wiLFwiSFwiLFwiSVwiLFwiSlwiLFwiS1wiLFwiTFwiLFwiTVwiLFwiTlwiLFwiT1wiLFwiUFwiXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7aSA8IDE1OyBpKyspe1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0cj5cIjtcbiAgICAgICAgICB0Ym9keV9pbnNlcnQgKz0gXCI8dGggc2NvcGU9J3Jvdyc+XCIrbGV0dGVyc1tpXStcIjwvdGg+XCI7XG4gICAgICAgICAgICBmb3IgKHZhciBqID0gMTsgaiA8IDI1OyBqKyspIHtcbiAgICAgICAgICAgICAgbGV0IGNvb3JkaW5hdGUgPSBsZXR0ZXJzW2ldK2o7XG4gICAgICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjx0ZD48YnV0dG9uIHR5cGU9J2J1dHRvbicgZGF0YS10b2dnbGU9J2J1dHRvbicgY2xhc3M9J2J0biBidG4tcHJpbWFyeSBidG4tc20nIG5hbWU9J1wiK2Nvb3JkaW5hdGUrXCInIHZhbHVlPSdcIitjb29yZGluYXRlK1wiJyBpZD0nXCIrY29vcmRpbmF0ZStcIic+XCIrY29vcmRpbmF0ZStcIjwvYnV0dG9uPjwvdGQ+XCI7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIHRib2R5X2luc2VydCArPSBcIjwvdHI+XCI7XG4gICAgICAgIH07XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0Ym9keV9pbnNlcnQnKS5pbm5lckhUTUwgPSB0Ym9keV9pbnNlcnQ7XG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGVhZF9pbnNlcnQnKS5pbm5lckhUTUwgPSB0aGVhZF9pbnNlcnQ7XG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgdGhpcy5zdWJtaXRQcm90b2NvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgbGV0IGRhdGEgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlblN5cmluZ2UnKS52YWx1ZTtcbiAgICAgIGRhdGEgPSBzdHIyYWIoZGF0YSk7XG4gICAgICBjb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHNvY2tldC5lbWl0KFwic2VuZC1yYXdcIiwge1xuICAgICAgICAgIFwibmFtZVwiOiAnL2Rldi9jdS51c2Jtb2RlbTE0MjEnLFxuICAgICAgICAgIFwicGF5bG9hZFwiOiBkYXRhXG4gICAgICB9KVxuICAgICAgY29uc29sZS5sb2coZGF0YSk7XG4gICAgfSk7XG4gIH07XG59O1xuIl19
