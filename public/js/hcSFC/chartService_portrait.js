app.service('ChartServiceHcSFC',function(){
  this.createChart = function(container,fundA,fundB,saving,changeTheme, chartOne, dateArray){


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
    if (chartOne) {
            $(container).highcharts({
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
                    text: 'Fund Fee Comparison',
                    style: {
           color:'#5e5e5e',
           fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
       }
                },

                exporting: {
                    enabled: false
                },
                colors:["#4095de", "#f9245e" , "#f7830d", "#219211"],
                // subtitle: {
                //     text: 'Click the columns to view versions. Source: <a href="http://netmarketshare.com">netmarketshare.com</a>.'
                // },
                xAxis: {
                    type: 'category',
                    labels: {
                        autoRotation: false,
                        style: {
                          color:'#5e5e5e',
                          fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                        }
                    },
                    gridLineColor: 'transparent',
                },
                yAxis: {
                    title: {
                        text: 'Amount ($)',
                        style: {
                          color:'#5e5e5e',
                          fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                        }
                    },
                    labels:{
                      style: {
                        color:'#5e5e5e',
                        fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                      }
                    }

                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        // dataLabels: {
                        //     enabled: true,
                        //     format: '{point.y:.1f}%'
                        // }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
                    // pointFormat: '<b>$ {point.y:.2f}</b><br/>'
                    pointFormatter: function() {
                        return '<b>' + 'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)), 2, '.') + '</b>';

                    }
                },
                credits: {
                    enabled: false
                },

                series: [{
                    // name: 'Brands',
                    colorByPoint: true,
                    data: [{
                        name: 'Fund A',
                        y: fundA,
                        // drilldown: 'Microsoft Internet Explorer'
                    }, {
                        name: 'Fund B',
                        y: fundB,
                        // drilldown: 'Chrome'
                    }, {
                        name: 'Savings',
                        y: saving
                        // drilldown: 'Chrome'
                    }]
                }],
            });
        } else {
            $(container).highcharts({
                chart: {
                    type: 'column',
                    /*options3d: {
              enabled: true,
                 alpha: 7,
                 beta: 18,
                 depth: 47,
                 viewDistance: 25
   }*/
                },
                title: {
                    text: 'Fund Balance Projection',
                    margin: 30,
                    style: {
                      color:'#5e5e5e',
                      fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                    }
                },
                colors: ["#4095de", "#f9245e" , "#f7830d", "#219211"],
                xAxis: {
                    categories: dateArray,
                    gridLineColor: 'transparent',
                    labels:{
                      style: {
                        color:'#5e5e5e',
                        fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                      }
                    }
                },
                yAxis: {
                    title: {
                        text: 'Amount($)',
                        style: {
                          color:'#5e5e5e',
                          fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                        }
                    },
                    labels:{
                      style: {
                        color:'#5e5e5e',
                        fontFamily:'PTPRAGMATICACYRILLIC-REGULAR'
                      }
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                },
                plotOptions: {
                    series: {
                        borderWidth: 0,
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-weight:700;font-size:14px;">{series.name}</span><br><span style="font-weight:700;font-size:13px;">Year: {point.key}</span><br>',
                    pointFormat: '<b>Amount: $ {point.y:.2f}</b><br/>'
                },

                legend: {
                    layout: 'horizontal',
                    align: 'left',
                    verticalAlign: 'bottom',
                    borderWidth: 0,
                    x: 12
                },
                series: [{
                    type: 'column',
                    name: 'Fund A',
                    data: fundA
                }, {
                    type: 'column',
                    name: 'Fund B',
                    data: fundB
                }]
            });
        }

}});
