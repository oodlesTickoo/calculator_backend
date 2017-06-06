app.service('LineChartService', function() {
    this.createChart = function(dataYearArray, dataContribMoney, dataCashFlow, dataInvestReturn, dataPortBalance) {

        $('#container').highcharts({
            chart: {
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
                text: 'School Fee and Portfolio Analysis',
                margin: 30,
                x: -20 //center
            },
            // subtitle: {
            //     text: 'Source: WorldClimate.com',
            //     x: -20
            // },
            xAxis: {
                categories: dataYearArray
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
                    lineWidth: 3,
                    animation:false,
                    marker: {
                        enabled: false
                    }
                }
            },
            // tooltip: {
            //     valueSuffix: '°C'
            // },
            tooltip: {
                headerFormat: '<span style="font-weight:700;font-size:14px;">{point.key}</span><br>',
                pointFormat: '<b>{series.name} $ {point.y:.2f}</b><br/>'
                    // pointFormatter: function(){
                    // return '<span>{point.key}</span>' + Highcharts.numberFormat((((this.y)).toFixed(2)),2,'.')+'</b>';

                // }
            },
            legend: {
                layout: 'horizontal',
                align: 'left',
                verticalAlign: 'bottom',
                borderWidth: 0,
                width: 700,
                x: 12
                    // x: -12
                    // floating:true,
            },
            series: [{
                name: 'Contributions In',
                data: dataContribMoney
            }, {
                name: 'Cash Outflow',
                data: dataCashFlow
            }, {
                name: 'Investment Return',
                data: dataInvestReturn
            }, {
                name: 'Portfolio Balance',
                data: dataPortBalance
            }]
        });

    };

    this.createChart2 = function(presentValue_PrivateSchoolFeeArray, presentValue_PublicSchoolFeeArray, savingFeeArray, numChildren, nameArray) {
        $('#containerA').highcharts({
            chart: {

                type: 'column',
                height: 400,
                renderTo: 'container',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                },
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
                text: 'Private VS Public School Cost Comparison',
                margin: 30,
            },
            xAxis: {
                gridLineColor: 'black',
                 lineColor: 'black',
                labels: {
                    style: {
                        color: 'black'
                    }
                },
                categories: nameArray.slice(0, numChildren)
            },
            yAxis: {
                gridLineColor: 'black',
                labels: {
                    style: {
                        color: 'black'
                    }
                },
                lineColor: 'black',
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
                name: 'Present value of private school fee as at the analysis date (total)',
                data: presentValue_PrivateSchoolFeeArray
            }, {
                type: 'column',
                name: 'Present value of public school fee as at the analysis date for (total)',
                data: presentValue_PublicSchoolFeeArray
            }, {
                type: 'column',
                name: 'Saving of the school fee in terms of the present value (total)',
                data: savingFeeArray
            }]
        });

    };

    this.createChart3 = function(propertyPurchasingPowerArray, remainderUnivFeeArray, projectedUnivFeeArray, numChildren, nameArray) {
        $('#containerB').highcharts({
            chart: {
                type: 'bar',
                height: 400,
                renderTo: 'container',
                options3d: {
                    enabled: true,
                    alpha: 15,
                    beta: 15,
                    depth: 50,
                    viewDistance: 25
                },
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
                text: 'Property Purchasing Power',
                margin: 30,
            },
            xAxis: {
                categories: nameArray.slice(0, numChildren)
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
                name: "You are able to purchase a property worth $x in today's dollar'",
                data: propertyPurchasingPowerArray
            }, {
                type: 'column',
                name: 'Remainder after paying off the university fee',
                data: remainderUnivFeeArray
            }, {
                type: 'column',
                name: 'Projected Total University Fee(accumulation)',
                data: projectedUnivFeeArray
            }]
        });

    };





});
