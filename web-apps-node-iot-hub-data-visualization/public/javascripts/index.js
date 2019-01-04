$(document).ready(function () {
  var timeData = [],
      temperatureData = [],
      humidityData = [];
  var data = {
      labels: timeData,
      datasets: [
          {
              fill: false,
              label: 'HeartBeat',
              yAxisID: 'Temperature',
              borderColor: "rgba(255, 0, 0, 1)",
              pointBoarderColor: "rgba(255, 0, 0, 1)",
              backgroundColor: "rgba(255, 0, 0, 0.4)",
              pointHoverBackgroundColor: "rgba(255, 0, 0, 1)",
              pointHoverBorderColor: "rgba(255, 0, 0, 1)",
              data: temperatureData
          }
      ]
  }

  var basicOption = {
      title: {
          display: true,
          text: 'Heartbeat Monitoring System',
          fontSize: 36
      },
      scales: {
          yAxes: [{
              id: 'Temperature',
              type: 'linear',
              scaleLabel: {
                  labelString: 'Beats Per Minute',
                  display: true
              },
              position: 'left',
          }
	]
      }
  }

  //Get the context of the canvas element we want to select
  var ctx = document.getElementById("myChart").getContext("2d");
  var optionsNoAnimation = { animation: false }
  var myLineChart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: basicOption
  });

  var ws = new WebSocket('wss://' + location.host);
  ws.onopen = function () {
      console.log('Successfully connect WebSocket');
  }
  ws.onmessage = function (message) {
      console.log('receive message' + message.data);
      try {
          var obj = JSON.parse(message.data);
          if (!obj.time || !obj.temperature) {
              return;
          }
          timeData.push(obj.time);
          temperatureData.push(obj.temperature);
	
	if (obj.temperature > 70){
	document.getElementById("heartbeatindicator").innerHTML = "RUNNNING HEARTBEAT"
      }
        else if (obj.temperature < 70 && obj.temperature > 60){
	document.getElementById("heartbeatindicator").innerHTML = "RESTING HEARTBEAT"
      }
        else{
	document.getElementById("heartbeatindicator").innerHTML = "SLEEPING HEARTBEAT"
      }	 

          // only keep no more than 50 points in the line chart
          const maxLen = 50;
          var len = timeData.length;
          if (len > maxLen) {
              timeData.shift();
              temperatureData.shift();
          }

          myLineChart.update();
      } catch (err) {
          console.error(err);
      }
  }
});
