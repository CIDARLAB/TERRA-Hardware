export default class ViewManager{
  constructor(){
    //initialize variables
    let outputArray = []; //store outputs
    let vessel;
    let outputNumber;
    let vesselOptions;
    let currentOutput = 1;
    let check = "";
    let re = /\d*\w/;
    let well_24 = [];
    let well_96 = [];
    let well_384 = [];
    let counter = 0;
    let letters = ["A","B","C","D","E","F","G","H"];

    well_24[0] = 1
    for (var i = 1; i < 384 ; i++) {
      well_24[i] = i+1;
    };

    well_96[0] = 1;
    for (var i = 1; i < 96; i++) {
      well_96[i] = i+1;
    };

    well_384[0] = 1;
    for (var i = 1; i < 384; i++) {
      well_384[i] = i+1;
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
        let thead_insert = "<th scope='col'> </th>";
        for (var i = 1; i < 7; i++){
          thead_insert += "<th scope='col'>"+i+"</th>";
        };
        thead_insert += "</tr>";

        let tbody_insert = "";
        let letters = ["A","B","C","D"];
        for (var i = 0;i < 4; i++){
          tbody_insert += "<tr>";
          tbody_insert += "<th scope='row'>"+letters[i]+"</th>";
            for (var j = 1; j < 7; j++) {
              let coordinate = letters[i]+j;
              tbody_insert += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='"+j+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
        counter = 0;
        for (var i = 0; i < 4; i++) {
          for(var j = 1; j < 7; j++){
            let identifier = letters[i]+j;
            document.getElementById(identifier).value = well_24[counter];
            counter = counter + 1;
          }
        }
      };

      //create 96-well plate
      if (vessel == 96) {
        let thead_insert = "<th scope='col'> </th>";
        for (var i = 1; i < 13; i++){
          thead_insert += "<th scope='col'>"+i+"</th>";
        };
        thead_insert += "</tr>";

        let tbody_insert = "";
        let letters = ["A","B","C","D","E","F","G","H"];

        for (var i = 0; i < 8; i++){
          tbody_insert += "<tr>";
          tbody_insert += "<th scope='row'>"+letters[i]+"</th>";
            for (var j = 1; j < 13; j++) {
              let coordinate = letters[i]+j;
              tbody_insert += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='"+coordinate+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
        counter = 0;
        for (var i = 0; i < 7; i++) {
          for(var j = 1; j < 13; j++){
            let identifier = letters[i]+j;
            document.getElementById(identifier).value = well_96[counter];
            counter = counter + 1;
          }
        }
      };

      //create 384-well plate
      if (vessel == 384) {
        let thead_insert = "<th scope='col'> </th>";
        for (var i = 1; i < 25; i++){
          thead_insert += "<th scope='col'>"+i+"</th>";
        };
        thead_insert += "</tr>";

        let tbody_insert = "";
        let letters = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P"];
        for (var i = 0;i < 15; i++){
          tbody_insert += "<tr>";
          tbody_insert += "<th scope='row'>"+letters[i]+"</th>";
            for (var j = 1; j < 25; j++) {
              let coordinate = letters[i]+j;
              tbody_insert += "<td><button type='button' class='btn btn-primary btn-sm' onclick='appendXY(this)' value='"+coordinate+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
      };
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab_newline(outputNumber)
      })
    });

    this.nextButton.addEventListener('click',function(event){
      if (currentOutput < outputNumber) {
        currentOutput = currentOutput + 1;
        document.getElementById('currentOutput').innerHTML = currentOutput;
      } else if (currentOutput == (outputNumber - 1)) {
        currentOutput = outputNumber;
        document.getElementById('currentOutput').innerHTML = currentOutput;
      };

      console.log(xy.slice(0,-1))
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab(xy)
      })
    });

    this.openButton.addEventListener('click', function (event) {
      let data = document.getElementById('openSyringe').value;
      console.log(re.test(data));
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab(data)
      })
    });

    this.closeButton.addEventListener('click',function (event){
      let data = document.getElementById('closeSyringe').value;
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1411',
          "payload": str2ab(data)
      })
    });
  };
};
