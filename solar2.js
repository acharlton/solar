var chart;
var currSeries = 0;

$(document).ready(function () {
    $("#start-stop").on("click", function () {
	$('#heading').html("Raspberry Battery Statistics");
        $el = $(this);
        $el.toggleClass("reading");
        if ($el.hasClass("reading")) {
            chart.addSeries({name: "Testing", data: []});
            currSeries++;
            startReading();
        } else {
            stopReading();
        }
    });
    $("#all-data").on("click", function () {
	$('#heading').html("Raspberry Battery Statistics (All)");
        $el2 = $(this);
        $el2.toggleClass("all");
        if ($el2.hasClass("all")) {
            chart.addSeries({name: "Testing2", data: []});
            currSeries++;
            startReadingAll();
        } else {
            stopReadingAll();
        }
    });

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });
    
    chart = new Highcharts.Chart({
        chart: {
            renderTo: 'container',
	    height: 800,
            backgroundColor: null,
            borderRadius: 0,
            marginBottom: 60,
            marginLeft: 60,
            marginRight: 0,
            marginTop: 50,
            showAxes: true,
	    zoomType:'x',
            type: 'areaspline'
        },
        title: {
            text: null
        },
        credits: {
            enabled: false
        },
        xAxis: {
            type: 'datetime'
        },
        yAxis: {
            gridLineWidth: 0,
            labels: {
                style: {
                    color: '#999',
                    fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
                    fontSize: '16px'
                }
            },
            lineWidth: 1,
            min: 0,
            tickWidth: 1,
            title: {
                text: null
            }
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        plotOptions: {
            series: {
                lineWidth: 5,
                marker: {
                    enabled: false,
                    radius: 4,
                    fillColor: '#2f3135',
                    lineWidth: 3,
                    lineColor: null,
                    symbol: 'circle'
                },
                states: {
                    hover: {
                        enabled: false
                    }
                },
                shadow: false
            }
        },
        series: []
    });
});


function startReading() {
    plotReading();
    window.readingTimer = setTimeout(startReading, 10000);
}
function startReadingAll() {
    plotReadingAll();
    window.readingTimer2 = setTimeout(startReadingAll, 10000);
}

function stopReading() {
    clearTimeout(window.readingTimer2);
}
function stopReadingAll() {
    clearTimeout(window.readingTimer2);
}

function plotReading() {
    var x = (new Date()).getTime();
    $.getJSON ('/cgi-bin/current_battery.pl', function (data) {
    	var x = new Date().getTime(); // current timei
	var y = data[0];
       	$('#battery').html(data[0] + 'V DC');
    	var shiftFlag =  chart.series[currSeries-1].data.length > 100;
    	var point = [x,y];    
    	chart.series[currSeries-1].addPoint(point, false, shiftFlag);
	var dur = .1 * 3600 * 1000;
    	chart.xAxis[0].setExtremes(x - dur, x, false);
    	chart.redraw();
    });
}
function plotReadingAll() {
    var x = (new Date()).getTime();
    $.getJSON('/cgi-bin/data_first_load.pl?data=battery&resolution=10&interval=-2hours', function(data) {
	console.log(data); 
    	var x = new Date().getTime(); // current timei
	//var y = data[1];
       	//$('#battery').html(data[1] + 'V DC');
    	var shiftFlag =  chart.series[currSeries-1].data.length > 100;
    	var point = data;   
    	//chart.series[currSeries-1].addSet(point, false, shiftFlag);
    	chart.series[0].data = data;
	//var dur = .1 * 3600 * 1000;
    	//chart.xAxis[0].setExtremes(x - dur, x, false);
    	chart.redraw();
    });
}

