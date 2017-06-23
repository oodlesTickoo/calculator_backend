app.service('ChartServiceHc',function(){
  this.createChart = function(taxOnIncome,netIncomePerAnnum){

    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

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
            text: 'Income Tax Calculator',
            style: {
           color:'#5e5e5e',
           fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
       }
        },
        colors: ["#4095de", "#f9245e" , "#f7830d", "#219211"],
        exporting:{
            enabled:false
        },
        xAxis: {
            type: 'category',
            labels:{
                autoRotation : false,
                style: {
           color:'#5e5e5e',
            fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
       }
            },
            gridLineColor: 'transparent',
        },
        yAxis: {
            title: {
                text: 'Amount ($)',
                style: {
           color:'#5e5e5e',
            fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
       }
     },
     labels:{
       style: {
                color: '#5e5e5e',
                 fontFamily: 'PTPRAGMATICACYRILLIC-REGULAR'
              }
     }


        },
        legend: {
            enabled: false,

        },
        plotOptions: {
            series: {
                borderWidth: 0,
                animation:false
            }
        },
        tooltip: {
            headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
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
                name: 'Net Income Per Annum',
                y: netIncomePerAnnum,
            }, {
                name: 'Tax On Income',
                y: taxOnIncome,
            }]
        }],

    });

}});
