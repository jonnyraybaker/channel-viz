xively.setKey( "UNlTns1Yd5nPeXNYk1Xq3zNlpP0Du2stvtL0WSq5QaJ5asS7" );  

var startOfYesterday = moment().subtract("day", 1).startOf('day');
var endOfYesterday = moment().startOf('day');

console.log(startOfYesterday);
console.log(endOfYesterday);

var query = { 
  start: startOfYesterday.toJSON(), 
  end: endOfYesterday.toJSON(), 
  interval: 60, 
  limit: 1000 
};

xively.datastream.history( "2134151370", "NO2_00-04-a3-37-cc-cb_0", query, loadData);  

function loadData(data) {  
  var unit = data.unit.label;
  var series = [];
  var filtedData = data.datapoints.filter(function(x) { return (x.value < 1000); });
  for (var i=0; i < filtedData.length; i++ ) {
    var date = moment(filtedData[i].at);
    var value = parseInt(filtedData[i].value);
    series[i] = {x: date.unix(), y: value};
  }
  drawGraph(series, unit);
}

function drawGraph(data, unit) {
  var graph = new Rickshaw.Graph( {
    element: document.querySelector("#chart"),
    width: 640,
    height: 400,
    renderer: 'line',
    series: [
      {
        data: data,
        color: '#6060c0',
        name: unit
      }
    ]
  } );
  graph.render();

  var hoverDetail = new Rickshaw.Graph.HoverDetail( {
    graph: graph
  } );

  var legend = new Rickshaw.Graph.Legend( {
    graph: graph,
    element: document.getElementById('legend')
  } );

  var shelving = new Rickshaw.Graph.Behavior.Series.Toggle( {
    graph: graph,
    legend: legend
  } );


  var axes = new Rickshaw.Graph.Axis.Time( {
    graph: graph
  });
  axes.render();
  
  var yAxis = new Rickshaw.Graph.Axis.Y({
      graph: graph
  });

  yAxis.render();
}
