app.controller("TTRController",['$scope','$timeout','AgeCalculator','TaxRateCalculator','SGCRate','WithoutSSCalculator','WithSSCalculator','ChartServiceHc',function($scope,$timeout,AgeCalculator,TaxRateCalculator,SGCRate,WithoutSSCalculator,WithSSCalculator,ChartServiceHc){

  String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };

   var dt = new Date();

  $scope.fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear()-1;

  $scope.chartOneOpen = true;

    $scope.fy = fy;

    $scope.age = age;

    $scope.cses = cses;

    $scope.thp = thp;

    // $scope.maxTHP2 = 0;

    $scope.nra = nra;

    $scope.nrp = nrp;

    $scope.tfp = tfp;

    $scope.beforeTTR = balance;

    $scope.unattainableTHP = false;

    $scope.attainableTHP = false;

    $scope.needSS = false;

    $scope.submitForm2 = function(isValid){

      if(isValid){

        $scope.resultWithoutSS = WithoutSSCalculator.getFinalAmount($scope.age,$scope.fy,$scope.cses,$scope.beforeTTR,
          $scope.tfp,$scope.nra,$scope.nrp,$scope.thp);
        // console.log("max thp ss is",$scope.maxTakeHomeSS());
        $scope.resultWithSS = WithSSCalculator.getResults($scope.age,
          $scope.fy,$scope.cses,$scope.beforeTTR,$scope.tfp,$scope.nra,$scope.nrp,$scope.thp,false);
        $scope.unattainableTHP = $scope.resultWithSS[5];
        $scope.attainableTHP = !$scope.unattainableTHP;
        $scope.favourableDD = $scope.resultWithSS[3];
        $scope.favourableSS = $scope.resultWithSS[4];
        if($scope.resultWithSS[2] - $scope.resultWithoutSS[2] > 0){
          $scope.needSS = true;
        }else{
          $scope.needSS = false;
        }
                // if($scope.attainableTHP && !$scope.unattainableTHPS){
          // ChartService.createChart(Number($scope.thpWithoutSS.toFixed(2)),Number($scope.thpWithSS.toFixed(2)),Number(($scope.taxWithoutSS - $scope.taxWithSS).toFixed(2)), Number($scope.optimisedSS.toFixed(2)));
          ChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)),Number($scope.resultWithSS[2].toFixed(2)),Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

          // DonutChartServiceHc.createChart(Number($scope.resultWithoutSS[2].toFixed(2)),Number($scope.resultWithSS[2].toFixed(2)),Number(Math.abs($scope.resultWithoutSS[2] - $scope.resultWithSS[2]).toFixed(2)));

        // }
        $timeout(0);
        console.log($scope.resultWithSS.toString());
        // console.log("complete");
      }
    }
    
    $scope.submitForm2(true);


    }]);
