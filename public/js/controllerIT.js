app.controller("TTRController", ['$scope', '$timeout', 'TaxRateCalculator', 'ChartServiceHc', 'DonutChartServiceHc', function($scope, $timeout, TaxRateCalculator, ChartServiceHc, DonutChartServiceHc) {

    $scope.result = {};

    $scope.forms = {};

    $scope.personalDetails = {};
    $scope.personalDetails = {
        firstName: "Amit",
        lastName: "Kumar",
        email: "iamitkrs@gmail.com",
        mobile: 412121212,
        postalCode: 1234
    };

    $scope.chartOneOpen = true;
    //$scope.tempp;
    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };
    $scope.infoShow = function(value) {
        if (value) {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "visible";
            document.getElementsByClassName("information-overlay")[0].style.zIndex = "9999";
            document.getElementsByClassName("information-overlay")[0].style.position = "inline-block";
            document.getElementsByClassName("information-overlay")[0].style.height = "" + (document.getElementsByClassName("otrp-calculator")[0].clientHeight - 10) + "px";
        } else {
            document.getElementsByClassName("information-overlay")[0].style.visibility = "hidden";
        }
    };
    $scope.listOb = [{ id: 0, name: "Week" },
        { id: 1, name: "Fortnight" },
        { id: 2, name: "Month" }
    ];
    var paymentFrequency = incomeTaxObj.paymentFrequency;
/*    $timeout(function() {
        $('.selectpicker').selectpicker({
            style: 'btn-info',
            size: 2,
        });
        $('.selectpicker option[value="1"]').attr("selected", true);
        $('.selectpicker').selectpicker('refresh');
    });

    $('.selectpicker').on('change', function() {
        paymentFrequency = $('.selectpicker option:selected').val();
        // calculateFinal();
        $timeout(0);
    });*/

    $scope.annualSalary = incomeTaxObj.annualSalary;
    /*var annualSalarySlider = document.getElementById('annualSalarySlider');
    noUiSlider.create(annualSalarySlider, {
        start: [$scope.annualSalary],
        range: {
            'min': [0],
            'max': [2000000]
        },
        step: 500,
        format: wNumb({
            decimals: 0,
            prefix: '$',
            thousand: ','

        }),
        connect: 'lower'
    });
    var annualSalaryInput = document.getElementById('annualSalaryInput');

    annualSalarySlider.noUiSlider.on('update', function(values, handle) {
        annualSalaryInput.value = values[handle];
        $scope.annualSalary = (values[handle]);
    });

    annualSalaryInput.addEventListener("change", function() {
        annualSalarySlider.noUiSlider.set($scope.annualSalary);
    });

    annualSalarySlider.noUiSlider.on('set', function(values, handle) {
        // calculateFinal();
        $timeout(0);
    });*/

    // annualSalarySlider.noUiSlider.on('set', function(values, handle) {
    //     annualSalaryInput.value = values[handle];
    //     $scope.annualSalary = (values[handle]);
    // });

    $scope.calculateFinal = function(isValid) {
        if (isValid) {
            var salary = Number($scope.annualSalary);
            var taxOnIncome = TaxRateCalculator.getTaxBase(salary) +
                (salary - TaxRateCalculator.getLowerBoundValue(salary) + 1) * TaxRateCalculator.getTaxRate(salary);
            var netAnnualIncomeAfterTax = salary - taxOnIncome;
            var netPaymentPerPeriod = netAnnualIncomeAfterTax / (TaxRateCalculator.getPeriods(paymentFrequency));

            $scope.result.taxOnIncome = taxOnIncome;
            $scope.result.netAnnualIncomeAfterTax = netAnnualIncomeAfterTax;
            $scope.result.netPaymentPerPeriod = netPaymentPerPeriod;

            switch (paymentFrequency) {
                case 0:
                    $scope.result.paymentFrequency = "Week";
                    break;
                case 1:
                    $scope.result.paymentFrequency = "Fortnight";
                    break;
                case 2:
                    $scope.result.paymentFrequency = "Month";
                    break;

            }

            // console.log("1.",taxOnIncome);
            // console.log("2.",netAnnualIncomeAfterTax);
            // console.log("3.",netPaymentPerPeriod);

            ChartServiceHc.createChart(Number(taxOnIncome.toFixed(2)), Number(netAnnualIncomeAfterTax.toFixed(2)), false);
            DonutChartServiceHc.createChart(Number(taxOnIncome.toFixed(2)), Number(netAnnualIncomeAfterTax.toFixed(2)));
            //PdfMaker.createChart($scope.personalDetails,Number($scope.annualSalary.replaceAll('$', '').replaceAll(',', '')),$scope.result);


        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    };

    $scope.calculateFinal(true);

    

}]);
