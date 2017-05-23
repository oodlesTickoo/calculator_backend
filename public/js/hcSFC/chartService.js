app.service('ChartServiceHcSFC',function(){
  this.createChart = function(container,fundA,fundB,saving,changeTheme){


    if (changeTheme) {
            Highcharts.theme.chart.style.fontFamily = 'Arial';
            Highcharts.theme.title.style.fontWeight = 'normal';
            Highcharts.theme.title.style.fontSize = '15px';
            Highcharts.theme.xAxis.labels.style.fontWeight = 'normal';
            Highcharts.theme.yAxis.labels.style.fontWeight = 'normal';
            Highcharts.theme.yAxis.title.style.fontWeight = 'normal';
            Highcharts.setOptions(Highcharts.theme);
        } else {
            Highcharts.theme.chart.style.fontFamily = 'Dosis, sans-serif';
            Highcharts.theme.title.style.fontWeight = 'bold';
            Highcharts.theme.title.style.fontSize = '20px';
            Highcharts.theme.xAxis.labels.style.fontWeight = 'bold';
            Highcharts.theme.yAxis.labels.style.fontWeight = 'bold';
            Highcharts.theme.yAxis.title.style.fontWeight = 'bold';
            Highcharts.setOptions(Highcharts.theme);
        }
    
    Highcharts.setOptions({lang: {
            thousandsSep: ','
        }});

    // Create the chart
    $(container).highcharts({
        chart: {
            type: 'column'
        },
        title: {
            text: 'Super Fund Comparison'
        },
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
            }
        },
        yAxis: {
            title: {
                text: 'Amount ($)'
            }

        },
        legend: {
            enabled: false
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
            // name: 'Brands',
            colorByPoint: true,
            data: [{
                name: 'Discounted Super Balance Fund A',
                y: fundA,
                // drilldown: 'Microsoft Internet Explorer'
            }, {
                name: 'Discounted Super Balance Fund B',
                y: fundB,
                // drilldown: 'Chrome'
            }, {
                name: 'Total Saving',
                y: saving,
                // drilldown: 'Firefox'
            }]
        }],
        
    });

}});

