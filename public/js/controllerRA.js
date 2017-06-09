app.controller("RAController", ['$scope', '$timeout', 'AgeCalculator', 'ChartServiceHc', 'AreaChartService', function($scope, $timeout, AgeCalculator, ChartServiceHc, AreaChartService) {

    var maleExpectancy = [80.3, 79.6, 78.6, 77.6, 76.6, 75.6, 74.6, 73.6, 72.7, 71.7, 70.7, 69.7, 68.7, 67.7, 66.7, 65.7, 64.7, 63.7, 62.8, 61.8, 60.8, 59.9, 58.9, 57.9, 57, 56, 55, 54.1, 53.1, 52.2, 51.2, 50.2, 49.3, 48.3, 47.3, 46.4, 45.4, 44.5, 43.5, 42.6, 41.6, 40.7, 39.8, 38.8, 37.9, 37, 36, 35.1, 34.2, 33.3, 32.4, 31.4, 30.5, 29.6, 28.8, 27.9, 27, 26.1, 25.3, 24.4, 23.5, 22.7, 21.9, 21, 20.2, 19.4, 18.6, 17.8, 17, 16.3, 15.5, 14.8, 14, 13.3, 12.6, 11.9, 11.2, 10.6, 9.9, 9.3, 8.7, 8.2, 7.6, 7.1, 6.6, 6.1, 5.7, 5.3, 4.9, 4.5, 4.2, 3.9, 3.6, 3.4, 3.2, 3, 2.8, 2.6, 2.5, 2.4, 2.3];

    var femaleExpectancy = [84.4, 83.7, 82.7, 81.7, 80.7, 79.7, 78.7, 77.7, 76.8, 75.8, 74.8, 73.8, 72.8, 71.8, 70.8, 69.8, 68.8, 67.8, 66.8, 65.9, 64.9, 63.9, 62.9, 61.9, 60.9, 60, 59, 58, 57, 56, 55, 54.1, 53.1, 52.1, 51.1, 50.1, 49.2, 48.2, 47.2, 46.3, 45.3, 44.3, 43.4, 42.4, 41.4, 40.5, 39.5, 38.6, 37.6, 36.7, 35.8, 34.8, 33.9, 33, 32, 31.1, 30.2, 29.3, 28.4, 27.5, 26.6, 25.7, 24.8, 23.9, 23, 22.2, 21.3, 20.4, 19.6, 18.8, 17.9, 17.1, 16.3, 15.5, 14.7, 13.9, 13.2, 12.4, 11.7, 11, 10.3, 9.6, 9, 8.3, 7.7, 7.2, 6.6, 6.1, 5.7, 5.2, 4.8, 4.4, 4.1, 3.8, 3.5, 3.3, 3, 2.9, 2.7, 2.5, 2.4];

    var dt = new Date();

    $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;


    // var RAObj = {
    //     userDetails: {
    //         age: 56,
    //         retirementAge: 65,
    //         annualSalary: 260000,
    //         gender: "male",
    //         superBalance: 500000,
    //         salarySacrifice: 15384,
    //         pensionStartAge: 57
    //     },
    //     userAssumptions: {
    //         insurancePremium: 0,
    //         investmentReturn: 5.30,
    //         variableFee: 1.11,
    //         fixedFee: 300,
    //         employerContributionLevel: 9.50,
    //         inflation: 3.50,
    //         wageIncrease: 4.00,
    //         pensionDrawdown: 1,
    //         pensionDrawdownBase: 40000
    //     },
    //     spouseDetails: {
    //         gender: "female",
    //         age: 50,
    //         retirementAge: 70,
    //         annualSalary: 90000,
    //         superBalance: 200000,
    //         salarySacrifice: 5000,
    //         pensionStartAge: 65
    //     },
    //     spouseAssumptions: {
    //         insurancePremium: 0,
    //         investmentReturn: 5.30,
    //         variableFee: 1.11,
    //         fixedFee: 300,
    //         employerContributionLevel: 9.50,
    //         inflation: 3.50,
    //         wageIncrease: 4.00,
    //         pensionDrawdown: 1,
    //         pensionDrawdownBase: 30000
    //     },
    //     otherAssets: {
    //         homeContents: 50000,
    //         vehicleCost: 0,
    //         investmentProperty: 2000,
    //         bankAssets: 20000,
    //         listedInvestments: 0,
    //         marginLoans: 0,
    //         otherInvestment: 20000,
    //         netRentalIncome: 0,
    //         otherIncome: 0,
    //         pensionIncome: 0,
    //         allocatedPension: 60000
    //     },
    //     spouseOption: true,
    //     houseOption: true,
    //     targetIncome: 40000
    // };

    //House and Spouse Option
    $scope.spouseOption = RAObj.spouseOption;
    $scope.houseOption = RAObj.houseOption;
    $scope.target = RAObj.targetIncome;

    // User Details
    $scope.age = RAObj.userDetails.age;
    $scope.genderOption = RAObj.userDetails.gender == "male";
    $scope.retirementAge = RAObj.userDetails.retirementAge;
    $scope.annualSalary = RAObj.userDetails.annualSalary;
    $scope.superBalance = RAObj.userDetails.superBalance;
    $scope.salarySacrifice = RAObj.userDetails.salarySacrifice;
    $scope.pensionStart = RAObj.userDetails.pensionStartAge;

    // User Assumptions
    $scope.employerContributionLevel = RAObj.userAssumptions.employerContributionLevel;
    $scope.showPensionOption = RAObj.userAssumptions.pensionDrawdown === 1;
    $scope.pensionDrawdownBase = $scope.showPensionOption ? RAObj.userAssumptions.pensionDrawdownBase : 0;
    $scope.inflation = RAObj.userAssumptions.inflation;
    $scope.wageIncrease = RAObj.userAssumptions.wageIncrease;
    $scope.insurancePremium = RAObj.userAssumptions.insurancePremium;
    $scope.investmentReturn = RAObj.userAssumptions.investmentReturn;
    $scope.variableFee = RAObj.userAssumptions.variableFee;
    $scope.fixedFee = RAObj.userAssumptions.fixedFee;

    if($scope.spouseOption){
    //Spouse Details
    $scope.ageSpouse = RAObj.spouseDetails.age;
    $scope.genderOptionSpouse = RAObj.spouseDetails.gender == "male";
    $scope.retirementAgeSpouse = RAObj.spouseDetails.retirementAge;
    $scope.annualSalarySpouse = RAObj.spouseDetails.annualSalary;
    $scope.superBalanceSpouse = RAObj.spouseDetails.superBalance;
    $scope.salarySacrificeSpouse = RAObj.spouseDetails.salarySacrifice;
    $scope.pensionStartSpouse = RAObj.spouseDetails.pensionStartAge;

    // Spouse Assumptions
    $scope.showPensionOptionSpouse = RAObj.spouseAssumptions.pensionDrawdown === 1;
    $scope.insurancePremiumSpouse = RAObj.spouseAssumptions.insurancePremium;
    $scope.investmentReturnSpouse = RAObj.spouseAssumptions.investmentReturn;
    $scope.variableFeeSpouse = RAObj.spouseAssumptions.variableFee;
    $scope.fixedFeeSpouse = RAObj.spouseAssumptions.fixedFee;
    $scope.pensionDrawdownBaseSpouse = $scope.showPensionOptionSpouse ? RAObj.spouseAssumptions.pensionDrawdownBase : 0;
    $scope.employerContributionLevelSpouse = RAObj.spouseAssumptions.employerContributionLevel;
    $scope.inflationSpouse = RAObj.spouseAssumptions.inflation;
    $scope.wageIncreaseSpouse = RAObj.spouseAssumptions.wageIncrease;
    }

    // Other Assets
    $scope.homeContents = RAObj.otherAssets.homeContents;
    $scope.vehicleCost = RAObj.otherAssets.vehicleCost;
    $scope.investmentProperty = RAObj.otherAssets.investmentProperty;
    $scope.bankAssets = RAObj.otherAssets.bankAssets;
    $scope.listedInvestment = RAObj.otherAssets.listedInvestments;
    $scope.marginLoans = RAObj.otherAssets.marginLoans;
    $scope.allocatedPension = RAObj.otherAssets.allocatedPension;
    $scope.otherInvestment = RAObj.otherAssets.otherInvestment;
    $scope.netRentalIncome = RAObj.otherAssets.netRentalIncome;
    $scope.otherIncome = RAObj.otherAssets.otherIncome;
    $scope.pensionIncome = RAObj.otherAssets.pensionIncome;

    var leMember1 = $scope.genderOption ? maleExpectancy[$scope.age] : femaleExpectancy[$scope.age];

    if($scope.spouseOption){
    var leMember2 = $scope.genderOptionSpouse ? maleExpectancy[$scope.ageSpouse] : femaleExpectancy[$scope.ageSpouse];
}


    function calculateMinPension(age) {
        if (age >= 56 && age <= 64) {
            return 4;
        }
        if (age >= 65 && age <= 74) {
            return 5;
        }
        if (age >= 75 && age <= 79) {
            return 6;
        }
        if (age >= 80 && age <= 84) {
            return 7;
        }
        if (age >= 85 && age <= 89) {
            return 9;
        }
        if (age >= 90 && age <= 94) {
            return 11;
        }
        if (age >= 95) {
            return 14;
        }
    }

    function cLookUp(sal) {
        if (sal <= 249999) {
            return 0.15;
        } else {
            return 0.3;
        }
    }


    function biCount(spouse) {

        if (!spouse) {
            var annualSalary = $scope.annualSalary;

            var superBalance = $scope.superBalance;

            var wageIncrease = $scope.wageIncrease;

            var inflation = $scope.inflation;

            var investmentReturn = $scope.investmentReturn;

            var variableFee = $scope.variableFee;

            var employerContributionLevel = $scope.employerContributionLevel;

            var salarySacrifice = $scope.salarySacrifice;

            var fixedFee = $scope.fixedFee;

            var insurancePremium = $scope.insurancePremium;

            var retirementAge = $scope.retirementAge;

            var pensionStart = $scope.pensionStart;

            var minPension = !$scope.showPensionOption;


            var ddBase = $scope.pensionDrawdownBase;

            var ageL = $scope.age;

        } else {
            var annualSalary = $scope.annualSalarySpouse;

            var superBalance = $scope.superBalanceSpouse;

            var wageIncrease = $scope.wageIncreaseSpouse;

            var inflation = $scope.inflationSpouse;

            var investmentReturn = $scope.investmentReturnSpouse;

            var variableFee = $scope.variableFeeSpouse;

            var employerContributionLevel = $scope.employerContributionLevelSpouse;

            var salarySacrifice = $scope.salarySacrificeSpouse;

            var fixedFee = $scope.fixedFeeSpouse;

            var insurancePremium = $scope.insurancePremiumSpouse;

            var retirementAge = $scope.retirementAgeSpouse;


            var pensionStart = $scope.pensionStartSpouse;

            var minPension = !$scope.showPensionOptionSpouse;

            var ddBase = $scope.pensionDrawdownBaseSpouse;

            var ageL = $scope.ageSpouse;
        }



        var biArray = [];

        var baArray = [];

        var penArray = [];

        var ageArray = [];

        var balanceIndexed = 0;

        var year = 0;

        var cpi;

        var adjustedSalary, concessionalCo, earning, taxation, drawdown, fAndI, balance, balanceCpi, paymentFactor;

        var count = 0;

        while (balanceIndexed >= 0 && (leMember1>count || leMember2>count)) {
            cpi = Math.pow(1 + (inflation / 100), year);
            adjustedSalary = ageL < retirementAge ? annualSalary * Math.pow(1 + (wageIncrease / 100), year) : 0;
            if (year === 0) {
                concessionalCo = 0;
            } else {
                if (ageL < retirementAge) {
                    var concessionalCap = ageL >= 49 ? 35000 : 30000;
                    // console.log("cCap",concessionalCap);
                    concessionalCo = Math.min(Math.min(adjustedSalary * (employerContributionLevel / 100), 19615.60) + salarySacrifice, concessionalCap);
                } else {
                    concessionalCo = 0;
                }
            }
            balanceCpi = 1 / cpi;
            // var temp1 = 0;
            if (year === 0) {
                earnings = taxation = drawdown = fAndI = 0;
                balance = superBalance;

            } else {
                if (minPension) {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = baArray[year - 1] * (calculateMinPension(ageL) / 100)
                    }
                } else {
                    if (ageL < pensionStart) {
                        drawdown = 0;
                    } else {
                        drawdown = ddBase * Math.pow(1 + (inflation / 100), ageL - pensionStart);
                    }
                }
                minDrawdown = drawdown;


                fAndI = baArray[year - 1] * (variableFee / 100.00) + fixedFee + insurancePremium;


                earnings = baArray[year - 1] * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1) + (baArray[year - 1] * Math.pow(1 + (investmentReturn / 100), 0.5) + concessionalCo - fAndI - drawdown) * (Math.pow(1 + (investmentReturn / 100), 0.5) - 1);


                if (ageL >= 60 && ageL >= pensionStart) {
                    taxation = cLookUp(annualSalary) * concessionalCo;
                } else {
                    taxation = cLookUp(annualSalary) * concessionalCo + earnings * 0.15;
                }

                balance = baArray[year - 1] + concessionalCo + earnings - taxation - drawdown - fAndI;

                // console.log("cc",concessionalCo);
                // console.log("txn",taxation);
                // console.log("dd",drawdown);
                // console.log("FI",fAndI);
                // console.log("cc",concessionalCo);
            }

            balanceIndexed = balance * balanceCpi;

            baArray.push(balance);

            penArray.push(drawdown);

            biArray.push(balanceIndexed);

            ageArray.push(ageL);

            year++;

            ageL++;

            count++;

            // console.log([balance,balanceCpi,balanceIndexed]);

        }

        // console.log(biArray);

        // console.log({
        //     count: count - 1,
        //     biArray: biArray,
        //     penArray: penArray,
        //     ageArray: ageArray
        // });

        return {
            count: count - 1,
            biArray: biArray,
            penArray: penArray,
            ageArray: ageArray
        }

    }

    function entitledAgedPension(superFunds, assetCalculationObj, ageMember1, ageMember2) {
        var homeContents = $scope.homeContents;
        var vehicleCost = $scope.vehicleCost;
        var investmentProperty = $scope.investmentProperty;
        var bankAssets = $scope.bankAssets;
        var listedInvestment = $scope.listedInvestment;
        var marginLoans = $scope.marginLoans;
        var allocatedPension = $scope.allocatedPension;
        var otherInvestment = $scope.otherInvestment;
        var employmentIncome = $scope.annualSalary;
        var employmentIncomePartner = $scope.spouseOption ? $scope.annualSalarySpouse : 0;
        var netRentalIncome = $scope.netRentalIncome;
        var otherIncome = $scope.otherIncome;
        var pensionIncome = $scope.pensionIncome;

        // console.log("super" , superFunds);

        if (ageMember1 >= $scope.retirementAge) {
            employmentIncome = 0;
        }

        if (ageMember2 >= $scope.retirementAgeSpouse) {
            employmentIncomePartner = 0;
        }



        var temp, temp2, temp3, deemingRate;

        if ($scope.spouseOption) {
            //deemingRate = (($scope.age < $scope.pensionStart) && ($scope.ageSpouse < $scope.pensionStartSpouse)) ? 40300 : 80600;
            deemingRate = (($scope.age < $scope.pensionStart) && ($scope.ageSpouse < $scope.pensionStartSpouse)) ? 40800 : 81600;
        } else {
            //deemingRate = 48600;
            deemingRate = 49200;
        }

        if(superFunds < 0){
          superFunds = 0;
        }


        var totalAsset = homeContents + vehicleCost + investmentProperty;
        var totalInvestment = bankAssets + listedInvestment + marginLoans + allocatedPension + superFunds + otherInvestment;
        var totalIncome = employmentIncome + employmentIncomePartner + netRentalIncome + otherIncome + pensionIncome;

        // console.log("tip", totalIncome , memberN);

        if (totalInvestment <= deemingRate) {
            temp = totalInvestment * (1.75 / 100);
        } else {
            temp = deemingRate * (1.75 / 100) + (totalInvestment - deemingRate) * (3.25 / 100);
        }

        var totalCalcIncome = totalIncome + temp;


        var fortnightIncome = totalCalcIncome / 26;


        if (fortnightIncome <= assetCalculationObj.itCheck) {
            temp2 = assetCalculationObj.default;
        } else {
            temp2 = assetCalculationObj.default-assetCalculationObj.percent * (fortnightIncome - assetCalculationObj.itCheck);
        }

        var maxAgedPensionIncome = temp2;

        var totalCalcAsset = totalAsset + totalInvestment;

        if (totalCalcAsset <= assetCalculationObj.low) {
            temp3 = assetCalculationObj.default;
        } else {
            if (totalCalcAsset > assetCalculationObj.high) {
                temp3 = 0;
            } else {
                temp3 = assetCalculationObj.default-(assetCalculationObj.default / (assetCalculationObj.high - assetCalculationObj.low)) * (totalCalcAsset - assetCalculationObj.low);
            }
        }

        //var maxAgedPensionAsset = temp3;
        var maxAgedPensionAsset = temp3 > 0 ? temp3 : 0;


        var entitledAgedPension = maxAgedPensionIncome > maxAgedPensionAsset ? maxAgedPensionAsset : maxAgedPensionIncome;

        // return entitledAgedPension;

        return entitledAgedPension > 0 ? entitledAgedPension : 0;
    }


    $scope.calculateFinal = function(isValid) {

        if (isValid) {

            // console.log('chaling');
            var targetIncome = $scope.target;
            //console.log(targetIncome);
            var isCouple = $scope.spouseOption;
            var ctm;
            var object1 = biCount(false);
            var object2;

            if (isCouple) {
                object2 = biCount(true);
                ctm = Math.max(object1.count, object2.count);
            } else {
                ctm = object1.count;
            }

            var last = Math.max(object1.penArray[object1.count] + object1.biArray[object1.count], 0);

            object1.penArray.pop();

            object1.penArray.push(last);

            // console.log("array",object1.penArray);

            if ($scope.spouseOption) {

                var last = Math.max(object2.penArray[object2.count] + object2.biArray[object2.count], 0);

                object2.penArray.pop();

                object2.penArray.push(last);

                // console.log("array2",object2.penArray);

            }

            if (isCouple) {
                fillArray();
            }

            function fillArray() {
                if (object1.count < object2.count) {
                    for (var i = 0; i < object2.count - object1.count; i++) {
                        object1.penArray.push(0);
                        object1.biArray.push(0);
                        object1.ageArray.push(object1.ageArray[object1.count + i] + 1);
                    }
                } else {
                    for (var i = 0; i < object1.count - object2.count; i++) {
                        object2.penArray.push(0);
                        object2.biArray.push(0);
                        object2.ageArray.push(object2.ageArray[object2.count + i] + 1);
                    }
                }
            }

            // console.log("obj1",object1);
            // console.log("obj2",object2);


            var assetCalculationObj = {};

            if ($scope.spouseOption && $scope.houseOption) {
                // assetCalculationObj.high = 1163000;
                assetCalculationObj.high = 816000;
                // assetCalculationObj.low = 291500;
                assetCalculationObj.low = 375000;
                // assetCalculationObj.default = 653.5;
                assetCalculationObj.default = 661.2;
                // assetCalculationObj.itCheck = 288;
                assetCalculationObj.itCheck = 288;
                assetCalculationObj.percent = 0.25;
            }
 
            if ($scope.spouseOption && !$scope.houseOption) {
                // assetCalculationObj.high = 1312000;
                // assetCalculationObj.low = 440500;
                // assetCalculationObj.default = 653.5;
                assetCalculationObj.high = 1016000;
                assetCalculationObj.low = 575000;
                assetCalculationObj.default = 661.2;
                assetCalculationObj.itCheck = 288;
                assetCalculationObj.percent = 0.25;
            }
 
            if (!$scope.spouseOption && $scope.houseOption) {
                // assetCalculationObj.high = 783500;
                // assetCalculationObj.low = 205500;
                // assetCalculationObj.default = 867;
                assetCalculationObj.high = 542500;
                assetCalculationObj.low = 25000;
                assetCalculationObj.default = 877.1;
                assetCalculationObj.itCheck = 162;
                assetCalculationObj.percent = 0.5;
            }
 
            if (!$scope.spouseOption && !$scope.houseOption) {
                // assetCalculationObj.high = 932500;
                // assetCalculationObj.low = 354500;
                // assetCalculationObj.default = 867;
                assetCalculationObj.high = 742500;
                assetCalculationObj.low = 375000;
                assetCalculationObj.default = 877.1;
                assetCalculationObj.itCheck = 162;
                assetCalculationObj.percent = 0.5;
            }

            var superFund;

            var member1BalanceArray = object1.biArray;

            // console.log(cArray);

            var member2BalanceArray = $scope.spouseOption ? object2.biArray : [];

            // console.log(eArray);

            var member1PensionArray = object1.penArray;

            var member2PensionArray = $scope.spouseOption ? object2.penArray : [];



            var member1EPArray = [];

            var member2EPArray = [];

            var member1APArray = [];

            var member2APArray = [];

            var totalSuperBalanceArray = [];

            var totalAnnualIncomeArray = [];

            for (i = 0; i <= ctm; i++) {
                if ($scope.spouseOption) {
                    superFund = object1.biArray[i] > 0 ? object1.biArray[i] : 0 + object2.biArray[i] > 0 ? object2.biArray[i] : 0;
                    if (object2.ageArray[i] < 65) {
                        member2EPArray.push(0);
                    } else {
                        // if(i > object2.count){
                        //     member2EPArray.push(0);
                        // }else{
                        member2EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object2.ageArray[i]));
                        // }
                    }

                    if (object1.ageArray[i] < 65) {
                        member1EPArray.push(0);
                    } else {
                        // if(i > object1.count){
                        // member1EPArray.push(0);
                        // }else{
                        member1EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object2.ageArray[i]));
                        // }
                    }
                    member2APArray.push(member2EPArray[i] * 26);
                    member1APArray.push(member1EPArray[i] * 26);
                    totalSuperBalanceArray.push(member1BalanceArray[i] + member2BalanceArray[i]);
                    totalAnnualIncomeArray.push(member1APArray[i] + member2APArray[i] + member1PensionArray[i] + member2PensionArray[i]);
                } else {
                    superFund = object1.biArray[i] > 0 ? object1.biArray[i] : 0;
                    if (object1.ageArray[i] < 65) {
                        member1EPArray.push(0);
                    } else {
                        member1EPArray.push(entitledAgedPension(superFund, assetCalculationObj, object1.ageArray[i], object1.ageArray[i]));
                    }
                    member2EPArray.push(0);
                    member2APArray.push(member2EPArray[i] * 26);
                    member1APArray.push(member1EPArray[i] * 26);
                    totalSuperBalanceArray.push(member1BalanceArray[i]);
                    totalAnnualIncomeArray.push(member1APArray[i] + member1PensionArray[i]);
                }



            }

            // console.log('j', member1APArray);
            // console.log('k', member2APArray);
            // console.log('l',totalSuperBalanceArray);
            // console.log('m', totalAnnualIncomeArray);

            // console.log(assetCalculationObj);




            if (!$scope.spouseOption) {
                while (member1APArray.length <= Math.ceil(leMember1)) {
                    member1APArray.push(0);
                }
                while (member1PensionArray.length <= Math.ceil(leMember1)) {
                    member1PensionArray.push(0);
                }
                ChartServiceHc.createChart(totalSuperBalanceArray.slice(0, 5 + Math.ceil(leMember1)));
                AreaChartService.createChart(member1APArray.slice(0, 5 + Math.ceil(leMember1)), [], member1PensionArray.slice(0, 5 + Math.ceil(leMember1)), [], leMember1, 0, false, targetIncome);
            } else {
                while (member1APArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member1APArray.push(0);
                }
                while (member1PensionArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member1PensionArray.push(0);
                }
                while (member2PensionArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member2PensionArray.push(0);
                }
                while (member2APArray.length <= Math.max(Math.ceil(leMember1), Math.ceil(leMember2))) {
                    member2APArray.push(0);
                }
                ChartServiceHc.createChart(totalSuperBalanceArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))));
                AreaChartService.createChart(member1APArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member2APArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member1PensionArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), member2PensionArray.slice(0, 5 + Math.max(Math.ceil(leMember1), Math.ceil(leMember2))), leMember1, leMember2, true, targetIncome);


            }
        }


    }

    $scope.calculateFinal(true);

}]);
