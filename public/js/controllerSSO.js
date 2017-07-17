app.controller("SSOController", ['$scope', '$timeout', 'AgeCalculator', 'TaxRateCalculator', 'SGCRate', 'WithoutSSCalculator', 'WithSSCalculator', 'ChartServiceHc', function($scope, $timeout, AgeCalculator, TaxRateCalculator, SGCRate, WithoutSSCalculator, WithSSCalculator, ChartServiceHc) {


    
    
     var ageq = ssoObj.age;
    var csesq = ssoObj.cses;
    var thpq = ssoObj.thp;
    var fyq = ssoObj.fy;
    console.log("affffff");


    $scope.resultWithSS = [0, 0, 0];
    $scope.resultWithoutSS = [0, 0, 0];
    $scope.unattainableTHP = false;
    $scope.attainableTHP = false;
    $scope.unattainableTHPS = false;
    $scope.needSS = true;

    $scope.submitForm2 = function(isValid) {
        if (isValid) {

            $scope.needSS = true;
            $scope.calculationsDone = true;
            $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmountSSO(ageq, fyq, csesq);
            console.log("rw/oss", $scope.resultWithoutSS.toString());
            $scope.thpWithoutSS = $scope.resultWithoutSS[0];
            $scope.taxWithoutSS = $scope.resultWithoutSS[1];
            $scope.finalAmountWithoutSS = $scope.resultWithoutSS[2];
            $scope.unattainableTHPS = $scope.resultWithoutSS[3];
            $scope.resultWithSS = WithSSCalculator.getFinalAmount(ageq, fyq, csesq, thpq);
            console.log("rwss", $scope.resultWithSS.toString());
            $scope.thpWithSS = $scope.resultWithSS[0];
            $scope.taxWithSS = $scope.resultWithSS[1];
            $scope.finalAmountWithSS = $scope.resultWithSS[2];
            // $scope.finalSS = $scope.resultWithSS[3];
            $scope.optimisedSS = $scope.resultWithSS[3];
            $scope.unattainableTHP = $scope.resultWithSS[4];
            $scope.attainableTHP = !$scope.unattainableTHP;
            if (($scope.resultWithoutSS[2] - $scope.resultWithSS[2]) > 0) {
                $scope.needSS = false;
            }
            if ($scope.attainableTHP && !$scope.unattainableTHPS) {
                ChartServiceHc.createChart(Number($scope.thpWithoutSS.toFixed(2)), Number($scope.thpWithSS.toFixed(2)), Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
            }
            $timeout(0);
            console.log("complete2");
        } else {
            console.log("has errors");
        }
    };

    $scope.submitForm2(true);


}]);
