app.controller("IAController", ['$scope', '$timeout', 'AgeCalculator', 'ChartServiceHc', function($scope, $timeout, AgeCalculator, ChartServiceHc) {

    $scope.grossAnnualIncome = insObj.grossAnnualIncome;
    $scope.homeMortgage = insObj.liabilities.homeMortgage;
    $scope.investmentPropertyMortgage = insObj.liabilities.investmentPropertyMortgage;
    $scope.creditCardDebt = insObj.liabilities.creditCardDebt;
    $scope.carLoan = insObj.liabilities.carLoan;
    $scope.personalLoan = insObj.liabilities.personalLoan;
    $scope.otherLoan = insObj.liabilities.otherLoan;
    $scope.homeValue = insObj.assets.homeValue;
    $scope.cashAtBank = insObj.assets.cashAtBank;
    $scope.otherInvestment = insObj.assets.otherInvestment;
    $scope.superBalance = insObj.assets.superBalance;
    $scope.ecLife = insObj.existingCovers.life;
    $scope.ecTPD = insObj.existingCovers.TPD;
    $scope.ecIP = insObj.existingCovers.IP;
    $scope.ecTrauma = insObj.existingCovers.trauma;
    $scope.numChildren = insObj.childrenDetails.numChildren;
    $scope.funeralCost = insObj.funeralCost;
    $scope.educationExpensePerYearPerChild = insObj.childrenDetails.educationExpensePerYearPerChild;
    $scope.familyLivingCostPerYear = insObj.familyLivingCostPerYear;
    $scope.inflation = insObj.assumptions.inflation;
    $scope.rateOfReturn = insObj.assumptions.rateOfReturn;
    $scope.moneyToBeBorrowed = insObj.spouseDetails.moneyToBeBorrowed;
    $scope.valueOfNewProperty = insObj.spouseDetails.valueOfNewProperty;
    $scope.ageSpouse = insObj.spouseDetails.age;
    $scope.spouseSalary = insObj.spouseDetails.salary;

    // $scope.genderOption = true;
    $scope.spouseOption = insObj.hasSpouse;
    // $scope.smokeOption = false;
    $scope.spouseWorkOption = insObj.spouseDetails.isWorking;
    $scope.buyOption = insObj.hasSpouse && insObj.spouseDetails.moveToSmallerProperty;


    $scope.sickLeaves = insObj.sickLeaves;

    $scope.calculateWaitingPeriod = function(leaves) {
        if (leaves <= 30) {
            return 30;
        }
        if (leaves > 30 && leaves <= 60) {
            return 60;
        }
        if (leaves > 60) {
            return 90;
        }
    }

    $scope.waitingPeriod = $scope.calculateWaitingPeriod($scope.sickLeaves);

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

    $scope.fy = 2016;

    $scope.age = insObj.age;

    function calculateFinal() {

        $scope.ecL = $scope.ecLife;
        $scope.ecT = $scope.ecTPD;
        $scope.ecI = $scope.ecIP;
        $scope.ecTr = $scope.ecTrauma;

        function PV(rate, periods, payment, future, type) {
            // Initialize type
            var type = (typeof type === 'undefined') ? 0 : type;

            // Evaluate rate and periods (TODO: repersonalLoanace with secure expression evaluator)
            rate = eval(rate);
            periods = eval(periods);

            // Return present value
            if (rate === 0) {
                return -payment * periods - future;
            } else {
                return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type) - future) / Math.pow(1 + rate, periods);
            }
        }

        var PVExpenseSpouse;
        $scope.realRateOfReturn = (1 + ($scope.rateOfReturn / 100)) / (1 + ($scope.inflation / 100)) - 1;


        if (!$scope.spouseOption) {
            PVExpenseSpouse = 0;
        } else {
            if (!$scope.spouseWorkOption) {
                PVExpenseSpouse = Math.abs(PV($scope.realRateOfReturn, 65 - $scope.ageSpouse, $scope.familyLivingCostPerYear, 0, 0));
            } else {
                PVExpenseSpouse = Math.abs(PV($scope.realRateOfReturn, 65 - $scope.ageSpouse, $scope.familyLivingCostPerYear - $scope.spouseSalary, 0, 0));
            }
        }
        //PVExpenseSpouse=1243994.6;
        // console.log("PVExpenseSpouse", PVExpenseSpouse);
        var PVExpenseChildren = 0;
        var ageChild = insObj.childrenDetails.ages;

        if ($scope.numChildren == 0) {
            PVExpenseChildren = 0;
        } else {

            for (var i = 0; i < $scope.numChildren; i++) {
                var temp = Math.abs(PV($scope.realRateOfReturn, 25 - ageChild[i], $scope.educationExpensePerYearPerChild, 0, 0));

                PVExpenseChildren = PVExpenseChildren + temp;
            }
        }
        // PVExpenseChildren=80156.1983032635+74793.54924005;
        // console.log("PVExpenseChildren", PVExpenseChildren);

        $scope.D34 = Math.pow(1 + $scope.rateOfReturn / 100, Number((100 / 1200).toFixed(2))) - 1;
        $scope.saleProceeds = $scope.homeValue - $scope.homeMortgage;


        //ScenarioOneInputs
        var sAssets = $scope.cashAtBank + $scope.otherInvestment + $scope.superBalance;
        var sLiability = $scope.homeMortgage + $scope.investmentPropertyMortgage + $scope.creditCardDebt +
            $scope.carLoan + $scope.personalLoan + $scope.otherLoan;
        var PVExpenseLife = PVExpenseSpouse + PVExpenseChildren + $scope.funeralCost;
        var PVExpenseTPD = PVExpenseLife - $scope.funeralCost;
        var IP1 = Number((($scope.grossAnnualIncome * 0.75) / 12).toFixed(2));
        var IP2 = Math.abs(PV($scope.D34, (65 - $scope.age) * 12, IP1, 0, 0));
        var Trauma1 = 225000;
        var Trauma2 = Math.abs(PV($scope.D34, 24, 0.25 * $scope.grossAnnualIncome / 12, 0, 0));

        $scope.resultS1 = calculateResult(sAssets, sLiability, PVExpenseLife, PVExpenseTPD, IP1, IP2, Trauma1, Trauma2, $scope.ecLife, $scope.ecTPD, $scope.ecIP, $scope.ecTrauma);


        //ScenarioTwo
        var additionalAssets;
        if ($scope.moneyToBeBorrowed + $scope.saleProceeds > $scope.valueOfNewProperty) {
            additionalAssets = $scope.moneyToBeBorrowed + $scope.saleProceeds - $scope.valueOfNewProperty;
        } else {
            additionalAssets = 0;
        }
        var s2Assets = $scope.cashAtBank + $scope.otherInvestment + $scope.superBalance + additionalAssets;
        var s2Liability = $scope.investmentPropertyMortgage + $scope.creditCardDebt +
            $scope.carLoan + $scope.personalLoan + $scope.otherLoan + $scope.moneyToBeBorrowed;
        var PVExpenseLife2 = PVExpenseSpouse + PVExpenseChildren;
        var PVExpenseTPD2 = PVExpenseLife2;

        $scope.resultS2 = calculateResult(s2Assets, s2Liability, PVExpenseLife2, PVExpenseTPD2, IP1, IP2, Trauma1, Trauma2, $scope.ecLife, $scope.ecTPD, $scope.ecIP, $scope.ecTrauma);

        function calculateResult(asset, liability, PVExpenseLife, PVExpenseTPD, IP1, IP2, Trauma1, Trauma2, ecLife, ecTPD, ecIP, ecTrauma) {
            var requiredLifeCover = PVExpenseLife + liability - asset;
            var requiredTPDCover = PVExpenseTPD + liability - asset - IP2;
            var requiredIPCover = IP1;
            var requiredTraumaCover = Trauma1 + Trauma2;
            return {
                life: requiredLifeCover,
                TPD: requiredTPDCover,
                IP: requiredIPCover,
                trauma: requiredTraumaCover,
                waiting: 30
            };
        };
        // console.log("Result 1", $scope.resultS1);
        // console.log("Result 2", $scope.resultS2);

        $scope.resultTemp = $scope.buyOption ? $scope.resultS2 : $scope.resultS1;

        $scope.needLife1 = $scope.resultS1.life >= $scope.ecLife ? true : false;

        $scope.needLife2 = $scope.resultS2.life >= $scope.ecLife ? true : false;

        $scope.sfLife1 = Math.abs($scope.resultS1.life - $scope.ecLife);

        $scope.sfLife2 = Math.abs($scope.resultS2.life - $scope.ecLife);

        $scope.needTPD1 = $scope.resultS1.TPD >= $scope.ecTPD ? true : false;

        $scope.needTPD2 = $scope.resultS2.TPD >= $scope.ecTPD ? true : false;

        $scope.sfTPD1 = Math.abs($scope.resultS1.TPD - $scope.ecTPD);

        $scope.sfTPD2 = Math.abs($scope.resultS2.TPD - $scope.ecTPD);

        $scope.needIP1 = $scope.resultS1.IP >= $scope.ecIP ? true : false;

        $scope.needIP2 = $scope.resultS2.IP >= $scope.ecIP ? true : false;

        $scope.sfIP1 = Math.abs($scope.resultS1.IP - $scope.ecIP);

        $scope.sfIP2 = Math.abs($scope.resultS2.IP - $scope.ecIP);

        $scope.needTrauma1 = $scope.resultS1.trauma >= $scope.ecTrauma ? true : false;

        $scope.needTrauma2 = $scope.resultS2.trauma >= $scope.ecTrauma ? true : false;

        $scope.sfTrauma1 = Math.abs($scope.resultS1.trauma - $scope.ecTrauma);

        $scope.sfTrauma2 = Math.abs($scope.resultS2.trauma - $scope.ecTrauma);


        if ($scope.buyOption) {
            document.getElementById("containerS").style.display = 'none';
            document.getElementById("containerB").style.display = 'block';
            ChartServiceHc.createChart('#containerB', 'Death Cover', $scope.ecLife, $scope.resultS1.life, $scope.resultS2.life, false, true);
            // ChartServiceHc.createChart('#containerR', 'Death Cover', ecLife1, $scope.resultS1.life, $scope.resultS2.life , true,true);
        } else {
            document.getElementById("containerB").style.display = 'none';
            document.getElementById("containerS").style.display = 'block';
            ChartServiceHc.createChart('#containerS', 'Death Cover', $scope.ecLife, $scope.resultS1.life, {}, false, false);
            // ChartServiceHc.createChart('#containerR', 'Death Cover', ecLife1, $scope.resultS1.life,{}, true,false);
        }

        if ($scope.buyOption) {
            document.getElementById("containerS2").style.display = 'none';
            document.getElementById("containerB2").style.display = 'block';
            ChartServiceHc.createChart('#containerB2', 'TPD Cover', $scope.ecTPD, $scope.resultS1.TPD, $scope.resultS2.TPD, false, true);
            // ChartServiceHc.createChart('#containerR2', 'TPD Cover', ecTPD1, $scope.resultS1.TPD, $scope.resultS2.TPD , true,true);
        } else {
            document.getElementById("containerB2").style.display = 'none';
            document.getElementById("containerS2").style.display = 'block';
            ChartServiceHc.createChart('#containerS2', 'TPD Cover', $scope.ecTPD, $scope.resultS1.TPD, {}, false, false);
            // ChartServiceHc.createChart('#containerR2', 'TPD Cover', ecTPD1, $scope.resultS1.TPD,{}, true,false);
        }

        if ($scope.buyOption) {
            document.getElementById("containerS3").style.display = 'none';
            document.getElementById("containerB3").style.display = 'block';
            ChartServiceHc.createChart('#containerB3', 'Income Protection Cover', $scope.ecIP, $scope.resultS1.IP, $scope.resultS2.IP, false, true);
            // ChartServiceHc.createChart('#containerR3', 'Income Protection Cover', ecIP1, $scope.resultS1.IP, $scope.resultS2.IP , true,true);
        } else {
            document.getElementById("containerB3").style.display = 'none';
            document.getElementById("containerS3").style.display = 'block';
            ChartServiceHc.createChart('#containerS3', 'Income Protection Cover', $scope.ecIP, $scope.resultS1.IP, {}, false, false);
            // ChartServiceHc.createChart('#containerR3', 'Income Protection Cover', ecIP1, $scope.resultS1.IP,{}, true,false);
        }

        if ($scope.buyOption) {
            document.getElementById("containerS4").style.display = 'none';
            document.getElementById("containerB4").style.display = 'block';
            ChartServiceHc.createChart('#containerB4', 'Trauma Cover', $scope.ecTrauma, $scope.resultS1.trauma, $scope.resultS2.trauma, false, true);
            // ChartServiceHc.createChart('#containerR4', 'Trauma Cover', $scope.ecTrauma, $scope.resultS1.trauma, $scope.resultS2.trauma , true,true);
        } else {
            document.getElementById("containerB4").style.display = 'none';
            document.getElementById("containerS4").style.display = 'block';
            ChartServiceHc.createChart('#containerS4', 'Trauma Cover', $scope.ecTrauma, $scope.resultS1.trauma, {}, false, false);
            // ChartServiceHc.createChart('#containerR4', 'Trauma Cover', ecTrauma1, $scope.resultS1.trauma,{}, true,false);
        }


    }
    calculateFinal();
}]);
