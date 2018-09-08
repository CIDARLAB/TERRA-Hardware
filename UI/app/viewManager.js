export default class ViewManager {
  constructor() {
    //initialize variables
    let vessel;
    let outputNumber;
    let vesselOptions;
    let currentOutput = 1;
    let check = "";
    let well_24 = [];
    let well_96 = [];
    let well_384 = [];
    let counter = 0;
    let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];
    let flowRate = 0;
    let volume = 0;
    let density = 0;

    well_24[0] = 1
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

    function dps(flow) {

    }

    function checkString(str,id) {
      let str_num = parseInt(str,10);
      if (str_num > 0) {
        document.getElementById(id).style.borderColor = "green";
        document.getElementById(id).style.borderWidth = "0.15rem";
        return true;
      } else {
        document.getElementById(id).style.borderColor = "red";
        document.getElementById(id).style.borderWidth = "0.15rem";
        return false;
      }


    };

    //buttons
    this.inputButton = document.getElementById("inputButton");


    //event handlers
    this.inputButton.addEventListener('click', function(event) {
      vessel = document.getElementById('selectVessel').value;
      outputNumber = document.getElementById('outputNumber').value;
      flowRate = document.getElementById('inputFlow').value;
      volume = document.getElementById('inputVolume').value;
      density = document.getElementById('inputDensity').value;

      //create output tabs
      let nav = "";
      let nav_content = "";
      let vessel_ID = "";
      let thead_ID = "";
      let tbody_ID = "";
      let thead_array = [];
      let tbody_array = [];
      for (let k = 0; k < outputNumber; k++) {
        let output_insert = "Output" + (k + 1);
        let output_btn_ID = "Submit" + (k + 1);
        let output_btn_text = "Submit Output " + (k + 1);
        let navID = output_insert + "tab";
        let href_insert = "#" + output_insert;

        vessel_ID = "vessel" + k;
        thead_ID = "thead" + k;
        tbody_ID = "tbody" + k;

        thead_array.push(thead_ID)
        tbody_array.push(tbody_ID);
        nav += "<a class='nav-item nav-link text-dark' id='" + navID + "' data-toggle='tab' href='" + href_insert + "' role='tab' aria-controls='" + output_insert + "' aria-selected='false'>" + (k + 1) + "</a>";
        nav_content += "<div class='tab-pane fade' id='" + output_insert + "' role='tabpanel' aria-labelledby='" + navID + "'><table class='table table-bordered table-sm' id='" + vessel_ID + "'><thead id='" + thead_ID + "'></thead><tbody id='" + tbody_ID + "'></tbody></table><button class='btn btn-success' id='" + output_btn_ID + "'>" + output_btn_text + "</button></div>";
      };

      console.log(tbody_array[0]);
      document.getElementById('navTabs').innerHTML = nav;
      document.getElementById('navContent').innerHTML = nav_content;

      //create table for output vessel image
      //create 24-well plate
      if (vessel == 24) {
        for (var k = 0; k < outputNumber; k++) {
          let thead_insert = "<th scope='col'> </th>";
          for (var i = 1; i < 7; i++) {
            thead_insert += "<th scope='col'>" + i + "</th>";
          };
          thead_insert += "</tr>";

          let tbody_insert = "";
          let letters = ["A", "B", "C", "D"];
          for (let i = 0; i < 4; i++) {
            tbody_insert += "<tr>";
            tbody_insert += "<th scope='row'>" + letters[i] + "</th>";
            for (let j = 1; j < 7; j++) {
              let coordinate = letters[i] + j;
              let btnID = coordinate + k;
              tbody_insert += "<td><button type='button' class='grid-button btn btn-sm text-white' onclick='appendXY(this)' value='" + j + "' id='" + btnID + "'>" + coordinate + "</button></td>";
            };
            tbody_insert += "</tr>";
          };

          document.getElementById(tbody_array[k]).innerHTML = tbody_insert;
          document.getElementById(thead_array[k]).innerHTML = thead_insert;
        };

        counter = 0;
        for (var k = 0; k < outputNumber; k++) {
          for (let i = 0; i < 4; i++) {
            for (let j = 1; j < 7; j++) {
              let identifier = letters[i] + j + k;
              document.getElementById(identifier).value = well_24[counter];
              counter = counter + 1;
            }
          }
        }
      };

      //create 96-well plate
      if (vessel == 96) {
        for (var k = 0; k < outputNumber; k++) {
          let thead_insert = "<th scope='col'> </th>";
          for (var i = 1; i < 13; i++) {
            thead_insert += "<th scope='col'>" + i + "</th>";
          };
          thead_insert += "</tr>";

          let tbody_insert = "";
          let letters = ["A", "B", "C", "D", "E", "F", "G", "H"];

          for (var i = 0; i < 8; i++) {
            tbody_insert += "<tr>";
            tbody_insert += "<th scope='row'>" + letters[i] + "</th>";
            for (var j = 1; j < 13; j++) {
              let coordinate = letters[i] + j;
              let btnID = coordinate + k;
              tbody_insert += "<td><button type='button' class='grid-button btn btn-sm text-white' onclick='appendXY(this)' value='" + coordinate + "' id='" + btnID + "'>" + coordinate + "</button></td>";
            };
            tbody_insert += "</tr>";
          };

          document.getElementById(tbody_array[k]).innerHTML = tbody_insert;
          document.getElementById(thead_array[k]).innerHTML = thead_insert;
        };

        counter = 0;
        for (let k = 0; k < outputNumber; k++) {
          for (var i = 0; i < 7; i++) {
            for (var j = 1; j < 13; j++) {
              let identifier = letters[i] + j;
              document.getElementById(identifier).value = well_96[counter];
              counter = counter + 1;
            };
          };
        };
      };

      //create 384-well plate
      if (vessel == 384) {
        for (var k = 0; k < outputNumber; k++) {
          let thead_insert = "<th scope='col'> </th>";
          for (var i = 1; i < 25; i++) {
            thead_insert += "<th scope='col'>" + i + "</th>";
          };
          thead_insert += "</tr>";

          let tbody_insert = "";
          let letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P"];
          for (var i = 0; i < 15; i++) {
            tbody_insert += "<tr>";
            tbody_insert += "<th scope='row'>" + letters[i] + "</th>";
            for (var j = 1; j < 25; j++) {
              let coordinate = letters[i] + j;
              tbody_insert += "<td><button type='button' class='grid-button btn btn-sm text-white' onclick='appendXY(this)' value='" + coordinate + "' id='" + coordinate + "'>" + coordinate + "</button></td>";
            };
            tbody_insert += "</tr>";
          };
          document.getElementById(tbody_array[k]).innerHTML = tbody_insert;
          document.getElementById(thead_array[k]).innerHTML = thead_insert;
        };
      };

      if (checkString(outputNumber,"outputNumber")) {
        socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab_newline(outputNumber)
        });
        console.log("Good");
      } else {
        console.log("Not working");
      };

      if (checkString(flowRate,"inputFlow")) {
        socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab_newline(flowRate)
        });
        console.log("Good");
      } else {
        console.log("Not Working");
      };

      if (checkString(volume,"inputVolume")) {
        socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab_newline(volume)
        });
        console.log("Good");
      } else {
        console.log("Not Working");
      };

      if (checkString(density,"inputDensity")) {
        socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab_newline(density)
        });
        console.log("Good");
      } else {
        console.log("Not Working");
      };

    });
  };
};
