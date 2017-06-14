app.controller("ITController", ['$scope', '$timeout', 'TaxRateCalculator', 'ChartServiceHc', function($scope, $timeout, TaxRateCalculator, ChartServiceHc) {
    
    
 incomeTaxObj = {
        "annualSalary": 60000,
        "paymentFrequency": 1
    };

    $scope.result = {};

    $scope.forms = {};

    
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
            $timeout(0);

            

            ChartServiceHc.createChart(Number(taxOnIncome.toFixed(2)), Number(netAnnualIncomeAfterTax.toFixed(2)), false);
            


        } else {
            $("#myModal").modal('show');
            $("html, body").animate({ scrollTop: 0 }, "slow");
        }
    };

    $scope.calculateFinal(true);

    

}]);
