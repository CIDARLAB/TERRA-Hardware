export default class ViewManager{
  constructor(){
    //initialize variables
    let outputArray = []; //store outputs
    let openArray = [];   //store open syringes per output
    let closeArray = [];  //store close syringes per output
    let vessel;
    let outputNumber;
    let vesselOptions;
    let currentOutput = 0;


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

    function str2ab_2(str){
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
      openArray = [outputNumber];   //store open syringes per output
      closeArray = [outputNumber];  //store close syringes per output

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
              tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='"+coordinate+"' value='"+coordinate+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
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
        for (var i = 0;i < 7; i++){
          tbody_insert += "<tr>";
          tbody_insert += "<th scope='row'>"+letters[i]+"</th>";
            for (var j = 1; j < 13; j++) {
              let coordinate = letters[i]+j;
              tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='"+coordinate+"' value='"+coordinate+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
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
              tbody_insert += "<td><button type='button' data-toggle='button' class='btn btn-primary btn-sm' name='"+coordinate+"' value='"+coordinate+"' id='"+coordinate+"'>"+coordinate+"</button></td>";
            };
          tbody_insert += "</tr>";
        };
        document.getElementById('tbody_insert').innerHTML = tbody_insert;
        document.getElementById('thead_insert').innerHTML = thead_insert;
      };
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1421',
          "payload": str2ab(outputNumber)
      })
    });

    this.nextButton.addEventListener('click',function(event){
      if(currentOutput == 0 || currentOutput != (outputNumber - 1)) {
        document.getElementById('currentOutput').innerHTML = currentOutput;
        currentOutput = currentOutput + 1;
      } else {
        document.getElementById('currentOutput').innerHTML = currentOutput;
      };
    });

    this.openButton.addEventListener('click', function (event) {
      let data = document.getElementById('openEnter');
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1421',
          "payload": str2ab(data)
      });
    });

    this.closeButton.addEventListener('click',function (event){
      let data = document.getElementById('closeEnter');
      socket.emit("send-raw", {
          "name": '/dev/cu.usbmodem1421',
          "payload": str2ab(data)
      });
    });
  };
};
