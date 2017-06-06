app.service('DonutChartServiceHc', function() {
    this.createChart = function(taxOnIncome, netIncomePerAnnum) {

        var total = taxOnIncome + netIncomePerAnnum;

        var netIncomePerAnnumPercentage = (netIncomePerAnnum / total) * 100;

        var taxOnIncomePercentage = taxOnIncome / total * 100;

        $('#donutContainer').highcharts({
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            title: {
                text: '',

                y: 25
            },
            tooltip: {
                enabled: false,
                headerFormat: '<span style="font-weight:700; font-size:14px;">{point.key}</span><br>',
                pointFormatter: function() {
                    return '<span ></span><b>' + 'Amount : $' + Highcharts.numberFormat((((this.y / 100) * total).toFixed(2)), 2, '.') + '</b>';

                }
            },
            plotOptions: {

                pie: {
                    slicedOffset: 10,
                    dataLabels: {
                        enabled: false,
                        distance: -40,
                        style: {
                            fontWeight: 'bold',
                            color: 'white',
                            textShadow: '2px 2px 2px'
                        }
                    },

                    startAngle: 90,
                    endAngle: 450,
                    center: ['50%', '45%'],
                    point: {
                        events: {
                            mouseOver: function() {
                                var chart = this.series.chart;
                                if (!chart.lbl) {
                                    chart.lbl = chart.renderer.label('')
                                        .attr({})
                                        .css({
                                            color: '#000',
                                            textAlign: 'left',
                                        })
                                        .add();
                                }
                                chart.lbl
                                    .show()
                                    .attr({
                                        verticalAlign: 'middle',
                                        y: (chart.chartHeight * 0.4),
                                        x: (chart.chartWidth * 0.33),
                                        text: '<span style="font-weight:700; font-size:14px;">' + this.series.data[this.x].name + '</span><br><span style="text-align:center; width=100px;">    $  ' + Highcharts.numberFormat((((this.y / 100) * total).toFixed(2)), 2, '.') + '</span>'
                                    });
                                var point = this,
                                    points = this.series.points;

                                for (var key in points) {
                                    if (points[key].sliced) {
                                        points[key].slice(false);
                                    }
                                }

                                if (!point.selected) {
                                    point.slice(true);
                                }
                            },
                            mouseOut: function(chart) {
                                var chart = this.series.chart;
                                var point = this,
                                    points = this.series.points;
                                for (var key in points) {
                                    if (points[key].sliced) {
                                        points[key].slice(false);
                                    }
                                }

                                chart.lbl
                                    .show()
                                    .attr({
                                        y: (chart.chartHeight * 0.4),
                                        x: (chart.chartWidth * 0.33),
                                        text: '<span style="font-weight:700; font-size:14px;">' + 'Income Tax Calculator' + '</span>'
                                    });
                            }
                        }
                    }
                }
            },
            series: [{
                type: 'pie',
                name: 'Amount',
                innerSize: '70%',
                colorByPoint: true,
                data: [
                    ['Net Income Per Annum', netIncomePerAnnumPercentage],
                    ['Tax On Income', taxOnIncomePercentage]
                ]
            }]
        }, function(chart) {
            chart.lbl = chart.renderer.label('')
                .attr({})
                .css({
                    color: '#000',
                    textAlign: 'left',
                    // width: '130px',
                })
                .add();

            chart.lbl
                .show()
                .attr({
                    y: (chart.chartHeight * 0.4),
                    x: (chart.chartWidth * 0.33),
                    text: '<span style="font-weight:700; font-size:14px;">' + 'Income Tax Calculator' + '</span>'
                });

        });



    }
});
