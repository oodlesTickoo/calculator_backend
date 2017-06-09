app.controller("TTRController", ['$scope', '$timeout', 'LineChartService', function($scope, $timeout, LineChartService) {

    $scope.australianShares1 = assetObj.initial.australianShares1;
    $scope.internationalShares1 = assetObj.initial.internationalShares1;
    $scope.internationalSharesHedged1 = assetObj.initial.internationalSharesHedged1;
    $scope.usShares1 = assetObj.initial.usShares1;
    $scope.australianBonds1 = assetObj.initial.australianBonds1;
    $scope.internationalBondsHedged1 = assetObj.initial.internationalBondsHedged1;
    $scope.cash1 = assetObj.initial.cash1;
    $scope.australianListedProperty1 = assetObj.initial.australianListedProperty1;
    $scope.internationalListedProperty1 = assetObj.initial.internationalListedProperty1;

    $scope.australianShares2 = assetObj.altered.australianShares2;
    $scope.internationalShares2 = assetObj.altered.internationalShares2;
    $scope.internationalSharesHedged2 = assetObj.altered.internationalSharesHedged2;
    $scope.usShares2 = assetObj.altered.usShares2;
    $scope.australianBonds2 = assetObj.altered.australianBonds2;
    $scope.internationalBondsHedged2 = assetObj.altered.internationalBondsHedged2;
    $scope.cash2 = assetObj.altered.cash2;
    $scope.australianListedProperty2 = assetObj.altered.australianListedProperty2;
    $scope.internationalListedProperty2 = assetObj.altered.internationalListedProperty2;

    $scope.birthYear = assetObj.birthYear;
    $scope.birthMonth = assetObj.birthMonth;
    $scope.birthDay = assetObj.birthDay;
    $scope.initialInvestmentAmount = assetObj.initialInvestmentAmount;
    $scope.alterOption = assetObj.alterOption;
    $scope.alterYear = assetObj.alterYear;

    $scope.getAge = function(birthYear,birthMonth,birthDay, year) {
        thisYear = year;
        thisMonth = 6;
        thisDay = 1;
        var age = thisYear - birthYear;
        if (thisMonth < birthMonth) {
            age--;
        }
        if (birthMonth === thisMonth && thisDay < birthDay) {
            age--;
        }
        return age;
    };

    var dt = new Date();
    $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;
    $scope.age = $scope.getAge($scope.birthYear,$scope.birthMonth,$scope.birthDay, $scope.fy);

    $scope.compYear = 2016;
    $scope.begngInvstmntPrd = Math.max(1991, $scope.birthYear + 18);
    $scope.invstmntHorzn = $scope.compYear - $scope.begngInvstmntPrd;

    $scope.calculate = function() {

        var investments1 = [5.9, 13.3, 9.9, 18.5, 5.7, 15.8, 26.6, 1.6, 15.3, 13.7, 8.8, -4.5, -1.1, 22.4, 24.7, 24.2, 30.3, -12.1, -22.1, 13.8, 12.2, -7, 20.7, 17.6, 5.7, 2];
        var investments2 = [-2, 7.1, 31.8, 0, 14.2, 6.7, 28.6, 42.2, 8.2, 23.8, -6, -23.5, -18.5, 19.4, 0.1, 19.9, 7.8, -21.3, -16.3, 5.2, 2.7, -0.5, 33.1, 20.4, 25.2, 0.4];
        var investments3 = [-5.8, -3, 17.3, 6.7, 3.7, 27.7, 26, 22.1, 15.9, 12.6, -16, -19.3, -6.2, 20.2, 9.8, 15, 21.4, -15.7, -26.6, 11.5, 22.3, -2.1, 21.3, 21.9, 8.5, -2.7];
        var investments4 = [10.3, 16.3, 26.6, -6.5, 30, 12.9, 42.6, 58.2, 14.2, 18.2, 0.5, -26.3, -15.2, 15.4, -4.1, 11.6, 5.6, -23.4, -12.5, 8.9, 3.7, 11.1, 32.5, 22.7, 31.8, 7.5];
        var investments5 = [22.4, 22, 13.9, -1.1, 11.9, 9.5, 16.8, 10.9, 3.3, 6.2, 7.4, 6.2, 9.8, 2.3, 7.8, 3.4, 4, 4.4, 10.8, 7.9, 5.5, 12.4, 2.8, 6.1, 5.6, 7];
        var investments6 = [15.3, 15.8, 14.7, 2.1, 13.1, 11.2, 12.1, 11, 5.5, 5, 9, 8, 12.2, 3.5, 12.3, 1.2, 5.2, 8.6, 11.5, 9.3, 5.7, 11.9, 4.4, 7.2, 6.3, 10.8];
        var investments7 = [13.5, 9, 5.9, 4.9, 7.1, 7.8, 6.8, 5.1, 5, 5.6, 6.1, 4.7, 5, 5.3, 5.6, 5.8, 6.4, 7.4, 5.5, 3.9, 5, 4.7, 3.3, 2.7, 2.6, 2.2];
        var investments8 = [7.7, 14.7, 17.1, 9.8, 7.9, 3.6, 28.5, 10, 4.3, 12.1, 14.1, 15.5, 12.1, 17.2, 18.1, 18, 25.9, -36.3, -42.3, 20.4, 5.8, 11, 24.2, 11.1, 20.3, 24.6];
        var investments9 = [-15.9, 6.9, 28.3, 8.4, 7.5, 2.4, 35.7, 25, -6.8, 14.1, 38.2, 7.5, -5.2, 28.7, 21.2, 24.2, 3, -28.6, -31.2, 31.3, 9.2, 7.5, 24.3, 11.8, 23.1, 20.4];

        var year91 = [5.9, -2, -5.8, 10.3, 22.4, 15.3, 13.5, 7.7, -15.9];
        var year92 = [13.3, 7.1, -3, 16.3, 22, 15.8, 9, 14.7, 6.9];
        var year93 = [9.9, 31.8, 17.3, 26.6, 13.9, 14.7, 5.9, 17.1, 28.3];
        var year94 = [18.5, 0, 6.7, -6.5, -1.1, 2.1, 4.9, 9.8, 8.4];
        var year95 = [5.7, 14.2, 3.7, 30, 11.9, 13.1, 7.1, 7.9, 7.5];
        var year96 = [15.8, 6.7, 27.7, 12.9, 9.5, 11.2, 7.8, 3.6, 2.4];
        var year97 = [26.6, 28.6, 26, 42.6, 16.8, 12.1, 6.8, 28.5, 35.7];
        var year98 = [1.6, 42.2, 22.1, 58.2, 10.9, 11, 5.1, 10, 25];
        var year99 = [15.3, 8.2, 15.9, 14.2, 3.3, 5.5, 5, 4.3, -6.8];
        var year00 = [13.7, 23.8, 12.6, 18.2, 6.2, 5, 5.6, 12.1, 14.1];
        var year01 = [8.8, -6, -16, 0.5, 7.4, 9, 6.1, 14.1, 38.2];
        var year02 = [-4.5, -23.5, -19.3, -26.3, 6.2, 8, 4.7, 15.5, 7.5];
        var year03 = [-1.1, -18.5, -6.2, -15.2, 9.8, 12.2, 5, 12.1, -5.2];
        var year04 = [22.4, 19.4, 20.2, 15.4, 2.3, 3.5, 5.3, 17.2, 28.7];
        var year05 = [24.7, 0.1, 9.8, -4.1, 7.8, 12.3, 5.6, 18.1, 21.2];
        var year06 = [24.2, 19.9, 15, 11.6, 3.4, 1.2, 5.8, 18, 24.2];
        var year07 = [30.3, 7.8, 21.4, 5.6, 4, 5.2, 6.4, 25.9, 3];
        var year08 = [-12.1, -21.3, -15.7, -23.4, 4.4, 8.6, 7.4, -36.3, -28.6];
        var year09 = [-22.1, -16.3, -26.6, -12.5, 10.8, 11.5, 5.5, -42.3, -31.2];
        var year10 = [13.8, 5.2, 11.5, 8.9, 7.9, 9.3, 3.9, 20.4, 31.3];
        var year11 = [12.2, 2.7, 22.3, 3.7, 5.5, 5.7, 5, 5.8, 9.2];
        var year12 = [-7, -0.5, -2.1, 11.1, 12.4, 11.9, 4.7, 11, 7.5];
        var year13 = [20.7, 33.1, 21.3, 32.5, 2.8, 4.4, 3.3, 24.2, 24.3];
        var year14 = [17.6, 20.4, 21.9, 22.7, 6.1, 7.2, 2.7, 11.1, 11.8];
        var year15 = [5.7, 25.2, 8.5, 31.8, 5.6, 6.3, 2.6, 20.3, 23.1];
        var year16 = [2, 0.4, -2.7, 7.5, 7, 10.8, 2.2, 24.6, 20.4];

        var portfolio1 = [0.1, 0.1, 0, 0, 0, 0.3, 0.4, 0.1, 0];
        var portfolio2 = [0.1, 0.2, 0, 0.1, 0, 0.2, 0.3, 0.1, 0];
        var portfolio3 = [0.1, 0.2, 0, 0.25, 0, 0.1, 0.1, 0.15, 0.1];
        var portfolio4 = [];
        var portfolio5 = [];

        portfolio4[0] = Number($scope.australianShares1) / 100;
        portfolio4[1] = Number($scope.internationalShares1) / 100;
        portfolio4[2] = Number($scope.internationalSharesHedged1) / 100;
        portfolio4[3] = Number($scope.usShares1) / 100;
        portfolio4[4] = Number($scope.australianBonds1) / 100;
        portfolio4[5] = Number($scope.internationalBondsHedged1) / 100;
        portfolio4[6] = Number($scope.cash1) / 100;
        portfolio4[7] = Number($scope.australianListedProperty1) / 100;
        portfolio4[8] = Number($scope.internationalListedProperty1) / 100;

        portfolio5[0] = Number($scope.australianShares2) / 100;
        portfolio5[1] = Number($scope.internationalShares2) / 100;
        portfolio5[2] = Number($scope.internationalSharesHedged2) / 100;
        portfolio5[3] = Number($scope.usShares2) / 100;
        portfolio5[4] = Number($scope.australianBonds2) / 100;
        portfolio5[5] = Number($scope.internationalBondsHedged2) / 100;
        portfolio5[6] = Number($scope.cash2) / 100;
        portfolio5[7] = Number($scope.australianListedProperty2) / 100;
        portfolio5[8] = Number($scope.internationalListedProperty2) / 100;


        var bonds1 = [],
            bonds2 = [],
            bonds3 = [],
            bonds4 = [],
            bonds5 = [],
            bonds6 = [],
            bonds7 = [],
            bonds8 = [],
            bonds9 = [],
            bonds10 = [];

        var result1 = [],
            result2 = [],
            result3 = [],
            result4 = [],
            result5 = [],
            result6 = [],
            result7 = [],
            result8 = [],
            result9 = [],
            result10 = [],
            result11 = [],
            result12 = [],
            result13 = [],
            result14 = [],
            result15 = [],
            result16 = [],
            result17 = [],
            result18 = [],
            result19 = [];

        var final1 = [],
            final2 = [],
            final3 = [],
            final4 = [],
            final5 = [],
            final6 = [],
            final7 = [],
            final8 = [],
            final9 = [];

        var dateArray = [];

        var bondsArray = [bonds1, bonds2, bonds3, bonds4, bonds5, bonds6, bonds7, bonds8, bonds9, bonds10],
            yearArray = [year91, year92, year93, year94, year95, year96, year97, year98, year99, year00, year01, year02, year03, year04, year05, year06, year07, year08, year09, year10, year11, year12, year13, year14, year15, year16],
            porfolioArray = [portfolio1, portfolio2, portfolio3, portfolio4, portfolio5],
            resultArray = [result1, result2, result3, result4, result5, result6, result7, result8, result9],
            finalArray = [final1, final2, final3, final4, final5, final6, final7, final8, final9],
            investmentsArray = [investments1, investments2, investments3, investments4, investments5, investments6, investments7, investments8, investments9];


        var yr0 = 1991;
        var yr1 = $scope.begngInvstmntPrd;
        var mvdown = yr1 - yr0;
        var count1 = mvdown;

        var rng1 = yearArray[count1];
        var k = 0;
        var temp1 = 0,
            temp2 = 0,
            temp3 = 0;
        var i;

        for (i = count1; i < yearArray.length; i++) {
            temp1 = 0;
            temp2 = 0; 
             temp3 = 0;
            for (j = 0; j < portfolio1.length; j++) {
                temp1 = temp1 + (yearArray[i][j] * porfolioArray[0][j]);
                temp2 = temp2 + (yearArray[i][j] * porfolioArray[1][j]);
                temp3 = temp3 + (yearArray[i][j] * porfolioArray[2][j]);
            }
            resultArray[0][k] = temp1;
            resultArray[1][k] = temp2;
            resultArray[2][k] = temp3;
            k++;
        }

        if ($scope.alterOption === false) {
            k = 0;
            for (i = count1; i < yearArray.length; i++) {
                temp1 = 0;
                for (j = 0; j < portfolio1.length; j++) {
                    temp1 = temp1 + (yearArray[i][j] * porfolioArray[3][j]);
                }
                resultArray[3][k] = temp1;
                k++;
            }
        } else {
            var mid = $scope.alterYear;
            k = 0;
            for (i = count1; i < count1 + mid; i++) {
                temp1 = 0;
                for (j = 0; j < portfolio1.length; j++) {
                    temp1 = temp1 + (yearArray[i][j] * porfolioArray[3][j]);
                }
                resultArray[3][k] = temp1;
                k++;
            }
            for (i = count1 + mid; i < yearArray.length; i++) {
                temp1 = 0;
                for (j = 0; j < portfolio1.length; j++) {
                    temp1 = temp1 + (yearArray[i][j] * porfolioArray[4][j]);
                }
                resultArray[3][k] = temp1;
                k++;
            }
        }
        k = 0;
        for (i = count1; i < yearArray.length; i++) {
            if (i == count1) {
                resultArray[4][k] = Number($scope.initialInvestmentAmount);
                resultArray[5][k] = resultArray[4][k] * (1 + (resultArray[0][k] / 100));
                resultArray[6][k] = resultArray[4][k] * (1 + (resultArray[1][k] / 100));
                resultArray[7][k] = resultArray[4][k] * (1 + (resultArray[2][k] / 100));
                resultArray[8][k] = resultArray[4][k] * (1 + (resultArray[3][k] / 100));
            } else {
                resultArray[4][k] = 0;
                resultArray[5][k] = resultArray[5][k - 1] * (1 + (resultArray[0][k] / 100));
                resultArray[6][k] = resultArray[6][k - 1] * (1 + (resultArray[1][k] / 100));
                resultArray[7][k] = resultArray[7][k - 1] * (1 + (resultArray[2][k] / 100));
                resultArray[8][k] = resultArray[8][k - 1] * (1 + (resultArray[3][k] / 100));
            }
            k++;
        }


        for (j = 0; j < 9; j++) {
            k = 0;
            for (i = count1; i < yearArray.length; i++) {
                if (i == count1) {
                    finalArray[j][k] = (1 + (investmentsArray[j][i] / 100)) * (Number($scope.initialInvestmentAmount));
                } else {
                    finalArray[j][k] = (1 + (investmentsArray[j][i] / 100)) * (finalArray[j][k - 1]);
                }
                k++;
            }
        }

        var p = 0;
        for (var j = $scope.begngInvstmntPrd; j <= $scope.compYear; j++) {
            dateArray[p] = j;
            p++;
        }

        LineChartService.createChart(dateArray, finalArray, resultArray, true);
        LineChartService.createChart(dateArray, finalArray, resultArray, false);
    };

    $scope.calculate();


}]);
