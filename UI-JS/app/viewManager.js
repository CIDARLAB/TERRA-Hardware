export default class ViewManager{
  constructor(){
    //buttons
    this.inputButton = document.getElementById("inputButton");
    this.configureButton = document.getElementById("configureButton");
    this.submitProtocol = document.getElementById("submitProtocol");

    //event handlers
    this.inputButton.addEventListener('click', function (event) {
      let vessel = document.getElementById('selectVessel').value;
      let outputNumber = document.getElementById('outputNumber').value;
      let vesselOptions = "";

      for (var i = 1; i < outputNumber; i++) {
        vesselOptions += "<option value='"+i+"'>"+i+"</option>";
      };
      vesselOptions += "<option value='"+outputNumber+"'>"+outputNumber+"</option>";
      document.getElementById('selectOutput').innerHTML = vesselOptions;

      console.log(vessel);
      console.log(outputNumber);

      //create table for output vessel image
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
    });

    this.configureButton.addEventListener('click', function (event) {
      let selectOutput = document.getElementById('selectOutput').value;
      let openSyringe = document.getElementById('openSyringe').value;
      let closeSyringe = document.getElementById('closeSyringe').value;
      let duration = document.getElementById('duration').value;
      console.log(selectOutput);
      console.log(openSyringe);
      console.log(closeSyringe);
      console.log(duration);
    });
  };
};
