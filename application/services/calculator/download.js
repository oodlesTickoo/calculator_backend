$scope.hitLink=function() {
        $('#myModal4').modal('hide');
        $rootScope.isLoading = true;
        console.log("kartik is great again");
        var http = new XMLHttpRequest();
        var url = "http://180.151.85.194:3001/htmlPDF";
        var params = { 'name': 'binny' };
        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

        http.onreadystatechange = function() { //Call a function when the state changes.
            if (http.readyState == 4 && http.status == 200) {

                var yut = JSON.parse(http.response);
                console.log(yut.filePath);
                console.log(yut.fileName);
                SaveToDisk(yut.filePath, yut.fileName);
            }
        };
        http.send(params);
    };


    $scope.calculatePdf = function() {
            $("#myModal4").modal('show');

    };

    function SaveToDisk(fileURL, fileName) {
        var link = document.createElement('a');
        document.body.appendChild(link);
        link.href = fileURL;
        link.target='_blank';
        link.click();
        $rootScope.isLoading = false;
        $timeout(0);
    }