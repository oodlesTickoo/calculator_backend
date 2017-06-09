app.service('WithSSCalculator', ['TaxRateCalculator', 'SGCRate', 'AgeCalculator', function(TaxRateCalculator, SGCRate, AgeCalculator) {
    this.getFinalAmount = function(age, fy, excludeSGC, minTakeHomePay) {
        var datePension = new Date;
        datePension.setYear(fy);
        datePension.setDate(2);
        datePension.setMonth(5);
        var concessionalContributionCap;
        concessionalContributionCap = age < 49 ? 30000 : 35000;
        var concessionalContributionTax = 0.15;
        var excessContributionTax = 0.32;

        var totalEmployerContribution = SGCRate.calculateSGCRate(datePension) * excludeSGC;

        var upperSS;

        upperSS = concessionalContributionCap - totalEmployerContribution;

        var grossAnnualIncomebeforeSGC = excludeSGC;

        var minTax = excludeSGC;

        var optimisedSS = 0;

        var optimisedTakeHomePay = 0;

        var finalAmountWithSS = 0;

        for (ss = 100; ss <= upperSS; ss++) {
            var additionalConcessionalContribution = ss;
            var assessableAnnualIncome = grossAnnualIncomebeforeSGC - additionalConcessionalContribution;
            var personalTax = TaxRateCalculator.getTaxBase(assessableAnnualIncome) + TaxRateCalculator.getTaxRate(assessableAnnualIncome) * (assessableAnnualIncome - 1 - TaxRateCalculator.getLowerBoundValue(assessableAnnualIncome));
            var takehomePay = assessableAnnualIncome - personalTax;
            if (takehomePay >= minTakeHomePay) {
                var concessionalContribution = additionalConcessionalContribution + totalEmployerContribution;
                if (concessionalContribution > concessionalContributionCap) {
                    var contributionTax = concessionalContribution * concessionalContributionTax + ((concessionalContribution - concessionalContributionCap) * excessContributionTax);
                } else {
                    var contributionTax = concessionalContribution * concessionalContributionTax + 0;
                }
                var boostUpSuperBalanceBy = concessionalContribution - contributionTax;
                var finalAmount = takehomePay + boostUpSuperBalanceBy;
                var totalTaxPaid = personalTax + contributionTax;

                // if(totalTaxPaid < taxWithoutSS && totalTaxPaid < minTax){
                if (totalTaxPaid < minTax) {
                    minTax = totalTaxPaid;
                    optimisedSS = additionalConcessionalContribution;
                    optimisedTakeHomePay = takehomePay;
                    finalAmountWithSS = finalAmount;
                }
            }
        }

        return [optimisedTakeHomePay, minTax, finalAmountWithSS, optimisedSS, false];

    };

}]);
