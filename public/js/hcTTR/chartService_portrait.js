app.service('ChartServiceHc',function(){
  this.createChart = function(finalWSS,finalSS,taxSaving){

    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

        // Make monochrome colors and set them as default for all pies
    // Highcharts.getOptions().plotOptions.column.colors = (function () {
    //     var colors = [],
    //         base = Highcharts.getOptions().colors[0],
    //         i;

    //     for (i = 0; i < 10; i += 1) {
    //         // Start out with a darkened base color (negative brighten), and end
    //         // up with a much brighter color
    //         colors.push(Highcharts.Color(base).brighten((i - 3) / 7).get());
    //     }
    //     return colors;
    // }());

    // Create the chart
    $('#container').highcharts({
        chart: {
            type: 'column',
              options3d: {
                        enabled: true,
                        alpha: 7,
                        beta: 18,
                        depth: 47,
                        viewDistance: 25
                       }
        },
        title: {
            text: 'Transition to Retirement',
            style: {
           fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR',
           color:'#5e5e5e'
       }
        },

        colors: ["#4095de", "#f9245e" , "#f7830d", "#219211"],

        exporting:{
            enabled:false
        },
        // subtitle: {
        //     text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
        // },
        xAxis: {
            type: 'category',
            labels:{
                autoRotation : false,
                style: {
                color: '#5e5e5e',
                fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
              }
            },

            gridLineColor: 'transparent',
        },
        yAxis: {
            title: {
                text: 'Amount ($)',
                style: {
                color: '#5e5e5e',
                fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
              }
            },
            labels:{

                style: {
                color: '#5e5e5e',
                fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
              }
            },

        },
        legend: {
            enabled: false,

        },
        plotOptions: {
            series: {
                borderWidth: 0,
                animation:false
                // dataLabels: {
                //     enabled: true,
                //     format: '{point.y:.1f}%'
                // }
            }
        },
        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
            // pointFormat: '<b>$ {point.y:.2f}</b><br/>'
            pointFormatter: function(){
                return '<b>'+'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

            }
        },
        credits: {
            enabled: false
        },

        series: [{
            colorByPoint: true,
            data: [{
                name: 'Final Amount Without Salary Sacrifice',
                y: finalWSS,
            }, {
                name: 'Final Amount With Salary Sacrifice',
                y: finalSS,
            }, {
                name: 'Tax Saving',
                y: taxSaving,
            }]
        }],

    });

}});
