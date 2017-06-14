app.service('ChartServiceHc', function() {
    this.createChart = function(balanceArray) {

        Highcharts.setOptions({
            lang: {
                thousandsSep: ','
            }
        });

        //console.log(balanceArray.length);

        var infoData = [];
        if (balanceArray.length > 30) {
            for (var i = 0; i < balanceArray.length; i++) {
                infoData.push({
                    name: i,
                    y: balanceArray[i]
                });
            }
        } else {
            for (var i = 0; i < balanceArray.length; i++) {

                infoData.push({
                    name: i,
                    y: balanceArray[i]
                });
            }
        }




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
                       },
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
                text: 'Super Balance Projection'
            },
                colors: ['#071520', '#0d2f47', '#195c8d', '#1a74b7', '#2599f0'],
            exporting: {
                enabled: false
            },

            xAxis: {
                type: 'category',
                labels: {
                    autoRotation: false,                 
                },
                     gridLineColor: 'transparent',
                                   
                tickLength: 0,
                title: {
                    text: 'Years',
                    margin: 10,
                    style: {
                        fontSize: 14,
                        fontWeight: "bold",
                        color: "#000"
                    }
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
                }
            },
            tooltip: {
                headerFormat: '<span style="font-weight:700;font-size:14px;">Super Balance</span><br>',
                pointFormatter: function() {
                    return '<b>' + 'Amount : $' + Highcharts.numberFormat((((this.y)).toFixed(2)), 2, '.') + '</b>';

                },
                headerFormat: '<span style="font-weight:700;font-size:14px;"> Income distribution year {point.key}</span><br>'

            },
            credits: {
                enabled: false
            },

            series: [{
                data: infoData,
            }],

        });

    }
});