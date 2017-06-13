app.service('LineChartService', function() {
    this.createChart = function(dateArray, finalArray,resultArray, flag) {
        if (flag) {
            $('#container').highcharts({
                chart: {
                    type: 'spline',
             
                    height: 400,
                    events: {
                        beforePrint: function() {
                            this.oldhasUserSize = this.hasUserSize;
                            this.resetParams = [this.chartWidth, this.chartHeight, false];
                            this.setSize(600, 400, false);
                        },
                        afterPrint: function() {
                            this.setSize.apply(this, this.resetParams);
                            this.hasUserSize = this.oldhasUserSize;
                        }
                    }
                },
                title: {
                    text: 'Single Asset Performance 1991-2016',
                    margin: 30
                },
                xAxis: {
                    categories: dateArray
                },
                yAxis: {
                    title: {
                        text: 'Amount($)'
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
                        animation:false,
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
                    pointFormat: '<b>{series.name} $ {point.y:.2f}</b><br/>'
                },
                legend: {
                    layout: 'horizontal',
                    align: 'left',
                    verticalAlign: 'bottom',
                    borderWidth: 0,
                    x: 12
                },

                series: [{
                    type: 'line',
                    name: 'Australian Shares',
                    data: finalArray[0]
                }, {
                    type: 'line',
                    name: 'International Shares',
                    data: finalArray[1]
                }, {
                    type: 'line',
                    name: 'International Shares (Hedged)',
                    data: finalArray[2]
                }, {
                    type: 'line',
                    name: 'US Shares',
                    data: finalArray[3]
                }, {
                    type: 'line',
                    name: 'Australian Bonds',
                    data: finalArray[4]
                }, {
                    type: 'line',
                    name: 'International Bonds (Hedged)',
                    data: finalArray[5]
                }, {
                    type: 'line',
                    name: 'Cash',
                    data: finalArray[6]
                }, {
                    type: 'line',
                    name: 'Australian Listed Property',
                    data: finalArray[7]
                }, {
                    type: 'line',
                    name: 'International Listed Property',
                    data: finalArray[8]
                }]
            });

        } else {
            $('#containerA').highcharts({
                chart: {
                    type: 'spline',
                   
                    height: 400,
                    events: {
                        beforePrint: function() {
                            this.oldhasUserSize = this.hasUserSize;
                            this.resetParams = [this.chartWidth, this.chartHeight, false];
                            this.setSize(600, 400, false);
                        },
                        afterPrint: function() {
                            this.setSize.apply(this, this.resetParams);
                            this.hasUserSize = this.oldhasUserSize;
                        }
                    }
                },
                title: {
                    text: 'Portfolio Performance 1991-2016',
                    margin: 30,
                },
                xAxis: {
                    categories: dateArray
                },
                yAxis: {
                    title: {
                        text: 'Amount($)'
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
                        animation:false,
                        marker: {
                            enabled: false
                        }
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
                    pointFormat: '<b>{series.name} $ {point.y:.2f}</b><br/>'
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
                    name: 'Portfolio balance of FC Conservative',
                    data: resultArray[5]
                }, {
                    type: 'column',
                    name: 'Portfolio balance of FC Balanced',
                    data: resultArray[6]
                }, {
                    type: 'column',
                    name: 'Portfolio balance of FC Growth',
                    data: resultArray[7]
                }, {
                    type: 'column',
                    name: "Portfolio balance of investor's choice",
                    data: resultArray[8]
                }, {
                    type: 'line',
                    name: 'Australian Shares',
                    data: finalArray[0],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'International Shares',
                    data: finalArray[1],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'International Shares (Hedged)',
                    data: finalArray[2],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'US Shares',
                    data: finalArray[3],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'Australian Bonds',
                    data: finalArray[4],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'International Bonds (Hedged)',
                    data: finalArray[5],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'Cash',
                    data: finalArray[6],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'Australian Listed Property',
                    data: finalArray[7],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }, {
                    type: 'line',
                    name: 'International Listed Property',
                    data: finalArray[8],
                    marker: {
                        lineWidth: 2,
                        lineColor: Highcharts.getOptions().colors[3],
                        fillColor: 'white'
                    }
                }]
            });

        }
    }
});
