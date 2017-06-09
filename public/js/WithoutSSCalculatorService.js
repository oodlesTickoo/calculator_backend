//var WithoutSSCalculatorService = angular.module('WithoutSSCalculatorService', [])
app.service('WithoutSSCalculator', ['TaxRateCalculator', 'SGCRate', 'AgeCalculator', function(TaxRateCalculator, SGCRate, AgeCalculator) {
    
      this.getFinalAmountSSO = function(age, fy, excludeSGC) {
        // var age = AgeCalculator.getAge(dob,datePension.getFullYear());
        var datePension = new Date;
        datePension.setYear(fy);
        datePension.setDate(2);
        datePension.setMonth(6);
        // console.log(datePension);
        var sgc = SGCRate.calculateSGCRate(datePension) * excludeSGC > 19615.60 ? 19615.60 : SGCRate.calculateSGCRate(datePension) * excludeSGC;
        var concessionalContributionCap;
        concessionalContributionCap = age < 49 ? 30000 : 35000;
        var concessionalContributionTax = 0.15;
        var excessContributionTax = 0.32;
        var grossAnnualIncomebeforeSGC = excludeSGC;
        var additionalConcessionalContribution = 0;
        var assessableAnnualIncome = grossAnnualIncomebeforeSGC - additionalConcessionalContribution;
        var personalTax = TaxRateCalculator.getTaxBase(assessableAnnualIncome) + TaxRateCalculator.getTaxRate(assessableAnnualIncome) * (assessableAnnualIncome - 1 - TaxRateCalculator.getLowerBoundValue(assessableAnnualIncome));
        var takehomePay = assessableAnnualIncome - personalTax;

        var concessionalContribution = additionalConcessionalContribution + sgc;
        if (concessionalContribution > concessionalContributionCap) {
            var contributionTax = concessionalContribution * concessionalContributionTax + ((concessionalContribution - concessionalContributionCap) * excessContributionTax);
        } else {
            var contributionTax = concessionalContribution * concessionalContributionTax + 0;
        }
        var boostUpSuperBalanceBy = concessionalContribution - contributionTax;
        var finalAmount = takehomePay + boostUpSuperBalanceBy;
        var ttakehomePay = personalTax + contributionTax;

        // var unattainableTHPS = takehomePay < minTakeHomePay;

        // if(maxTHPCalculation){
        //     console.log("taxwss",ttakehomePay);
        //     return takehomePay;
        // }

        //   if(unattainableTHPS){
        //   return [0,0,0,unattainableTHPS];
        // }else{
        return [takehomePay, ttakehomePay, finalAmount, false];
        // }
    };

    this.getFinalAmountTTR = function(age, fy, currentSalaryExcludeSuper, beforeTTR, taxFreePercent, netReturnInAccumulation, netReturnInPension, minTakeHomePay) {

        var datePension = new Date;
        datePension.setYear(fy);
        datePension.setDate(2);
        datePension.setMonth(6);

        taxFreePercent /= 100;
        netReturnInAccumulation /= 100;
        netReturnInPension /= 100;
        var concessionalContributionTax = 0.15;
        var excessContributionTax = 0.32;
        // var age = AgeCalculator.getAge(dob,datePension.getFullYear());
        var concessionalContributionCap;
        concessionalContributionCap = age < 49 ? 30000 : 35000;
        // var financialYear=datePension.getFullYear()+1;s
        var drawdownValue = 0.04;
        var salaryExcludeSGC = currentSalaryExcludeSuper;
        var assessablePensionIncome = 0;
        var concessionalContribution = salaryExcludeSGC * SGCRate.calculateSGCRate(datePension) > 19615.60 ? 19615.60 : salaryExcludeSGC * SGCRate.calculateSGCRate(datePension);
        var taxableIncome = salaryExcludeSGC + assessablePensionIncome;
        var taxMediLevy = TaxRateCalculator.getTaxRate(taxableIncome) * (taxableIncome + 1 - TaxRateCalculator.getLowerBoundValue(taxableIncome)) + TaxRateCalculator.getTaxBase(taxableIncome);
        var rebate = 0;
        var afterTaxReturn = taxableIncome - taxMediLevy;
        var exemptPensionIncome = 0;
        var takeHomePay = afterTaxReturn + exemptPensionIncome;
        var pensionStartBalance = 0;
        var pensionPayment = 0;
        var pensionEndBalance = 0;
        var accumulateBeinningBalance = beforeTTR;
        var netConcessionalContribution;
        if (concessionalContribution < concessionalContributionCap) {
            netConcessionalContribution = concessionalContribution - (concessionalContribution * concessionalContributionTax);
        } else {
            netConcessionalContribution = concessionalContribution - (concessionalContributionCap * concessionalContributionTax + excessContributionTax * (concessionalContribution - concessionalContributionCap));
        }
        var investmentIncome = accumulateBeinningBalance * netReturnInAccumulation + netConcessionalContribution * (netReturnInAccumulation / 2);
        var accumulationEndBalance = accumulateBeinningBalance + netConcessionalContribution + investmentIncome;
        var finalAmount = accumulationEndBalance + takeHomePay + pensionEndBalance;
        // console.log("salaryExcludeSGC:",salaryExcludeSGC);
        // console.log("concessionalContribution:",concessionalContribution);
        // console.log("taxableIncome:",taxableIncome);
        // console.log("taxMediLevy:",taxMediLevy);
        // console.log("afterTaxReturn:",afterTaxReturn);
        // console.log("takeHomePay:",takeHomePay);
        // console.log("accumulateBeinningBalance:",accumulateBeinningBalance);
        // console.log("netConcessionalContribution:",netConcessionalContribution);
        // console.log("investmentIncome:",investmentIncome);
        // console.log("accumulationEndBalance:",accumulationEndBalance);
        // console.log("finalAmount:",finalAmount);
        return [takeHomePay, accumulationEndBalance, finalAmount];
    };

}]);
