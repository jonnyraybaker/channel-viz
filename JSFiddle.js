$(function() {

	$.getJSON('http://api.xively.com/v2/feeds/2134151370/datastreams/Aeon_Home_Energy_Meter_energymeter.power.json?duration=2days&interval=3600?key=UNlTns1Yd5nPeXNYk1Xq3zNlpP0Du2stvtL0WSq5QaJ5asS7', function(data) {

        var xively_datapoints = data.datapoints;
        var chartdata = [];
        
        for (i = 0; i < xively_datapoints.length; i++) {
            chartdata.push([
                Date.parse(xively_datapoints[i].at),
                parseFloat(xively_datapoints[i].value)
            ]);
        }
        
		// Create the chart
		$('#container').highcharts('StockChart', {
			

			rangeSelector : {
				selected : 1
			},

			 exporting: {
                  
                    chartOptions:{		               
	                   yAxis: {
		                    labels: {
		                        style: {
		                            color: '#000',
                                    fontSize: '14px'
		                        }
		                    }
	                    }
	                   
		            }
             },
			
			series : [{
				name : 'api.xively.com/v2/feeds/4038/datastreams/9',
				data : chartdata,
				tooltip: {
					valueDecimals: 2
				}
			}]
		});
	});

});
