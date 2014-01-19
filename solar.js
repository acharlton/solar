var pollChart;
$(function() {
	var resolution = '10',
		interval = '-2hours';
        main(resolution,interval);
        $('#heading').html("Raspberry Battery Statistics");
        
	// clicking the buttons
/*        $('.btn').click(function() {
                var name = this.title;
                var ds = this.id;
                var chart = $('#container').highcharts();
                chart.showLoading('Loading data from server...');
		$.getJSON('/cgi-bin/load_ds.pl?rrd=' + name + '&ds=' + ds + '&resolution=' + resolution + '&interval=' + interval, function(data) {
                        $('#container').highcharts().addSeries({
                                name: ds,
                                data: data
                        });
                        $('#container').highcharts().hideLoading();
                });
                $(this).attr('disabled', true);
                setInterval(function(){
        		$.getJSON ('/cgi-bin/current_ds.pl?ds='+name, function (data) {
				//var series = $('#container').highcharts().series[1];
                        	var x = new Date().getTime(); // current time
                            	$('#container').highcharts().series[1].addPoint([x, data[0]], true, true);
			});
		},10000);*/
        });
});

function main(resolution,interval){
	Highcharts.setOptions({
		global: {
			useUTC: false
		}
	});
	
	var seriesOptions = [],
		yAxisOptions = [],
		seriesCounter = 0,
		names = ['battery','cpu_temp','ram_total','ram_used','ram_free','disk_total','disk_free','disk_perc'],
		//names = ['battery','cpu_temp'],
		colors = Highcharts.getOptions().colors;
	$.each(names, function(i, name) {
		$.getJSON('/cgi-bin/data_first_load.pl?data='+name.toLowerCase() + '&resolution=' + resolution + '&interval=' + interval, function(data) {
			seriesOptions[i] = {
				name: name,
				data: data
			};

			seriesCounter++;
			if(seriesCounter == names.length){
				createChart();
			}
		});
	});
	function createChart() {
		$('#container').highcharts('StockChart',{
		    chart: {
			height: 680,
			type: 'areaspline',
			zoomType: 'x'
			/*events: {
				load: function(){
					var series = this.series[0];
                        		setInterval(function() {
        					$.getJSON ('/cgi-bin/current_battery.pl', function (data) {
                            				var x = new Date().getTime(); // current time
							var t = dateToYMD(x);
                					$('#time_stat').html(t);
                					$('#battery').html(data[0] + 'V DC');
                					//$('#ambient_temp').html(data[1]  + ' C');
                					$('#cpu_temp').html(data[2]  + ' C');
                					//$('#cpu_usage').html(data[3]  + ' %');
                					$('#ram_used').html(data[4]  + 'MB');
                					$('#disk_perc').html(data[8]  + ' %');
                            				series.addPoint([x, data[0]], true, true);
        					});
                        		}, 10000);
				}
			}*/
		    },
		    navigator: {
		    	adaptToUpdatedData: false,
		    },
		    title: {
			text: 'Raspberry Battery Statistics' 
		    },
		    legend: {
                        enabled: true,
                        align: 'right',
                        backgroundColor: '#FFF',
                        borderColor: 'black',
                        borderWidth: 2,
                        layout: 'vertical',
                        verticalAlign: 'top',
                        y: 200,
                        shadow: true
                    },
                    rangeSelector: {
                        buttonTheme: { // styles for the buttons
                                fill: 'none',
                                width: 15,
                                stroke: 'none',
                                'stroke-width': 0,
                                r: 2,
                                style: {
                                        color: '#777',
                                        fontWeight: 'normal'
                                },
                                states: {
                                        hover: {
                                                fill: '#efefef',
                                        },
                                        select: {
                                                fill: '#eee',
                                                style: {
                                                        color: 'white'
                                                }
                                        }
                                }
                        },
                        //buttons:ibut,
                        buttonSpacing: 20,
                        //selected: sel
                    },
		    yAxis: {
			min: 0,
			title:{
				text: 'DC voltage'
			}
		    },
		    xAxis:{
		    	events: {
                                //afterSetExtremes: afterSetExtremes
                        },
                        type:'datetime',
                        // initial view is 2 hour
                        //range: 24*3600*1000,
                        //minRange: 3600 * 1000 // one hour
		    },
		    plotOptions: {
		    	series: {
				fillOpacity: 0.35,
				marker: {
					enabled: false
				}
		    	}
		    }, 
		    tooltip: {
		    	pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b><br/>',
		    	valueDecimals: 2
		    },		    
		    series: seriesOptions
                },function(chart){
                       /* setTimeout(function() {
                                $('input.highcharts-range-selector', $(chart.container).parent())
                                        .datepicker();
                        }, 0);*/
                });
	};
}

function dateToYMD(date) {
    var dat = new Date(date);
    var min = dat.getMinutes();
    var sec = dat.getSeconds();
    var h = dat.getHours();
    var d = dat.getDate();
    var m = dat.getMonth() + 1;
    var y = dat.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d) + ' ' + (h <= 9 ? '0' + h : h) + ':' + (min <=9 ? '0' + min : min) + ':' + (sec <= 9 ? '0' + sec : sec);
}

