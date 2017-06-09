app.controller("TTRController", ['$scope', '$timeout','LineChartService', function($scope, $timeout, LineChartService) {

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.split(search).join(replacement);
    };


    $scope.schoolObjects = [
        { id: 0, name: "Sydney Grammar School Darlinghurst", address: "College St- Darlinghurst NSW 2010", state: "NSW", upfrontFee: 5489, annualFee: 32644 },
        { id: 1, name: "PLC Sydney", address: "Boundary St- Croydon NSW 2132", state: "NSW", upfrontFee: 3415, annualFee: 24411 },
        { id: 2, name: "SCEGGS Darlinghurst", address: "215 Forbes St- Darlinghurst NSW 2010", state: "NSW", upfrontFee: 4950, annualFee: 28348 },
        { id: 3, name: "The Scotts College Sydney", address: "Victoria Rd- Bellevue Hill NSW 2023", state: "NSW", upfrontFee: 5500, annualFee: 33925 },
        { id: 4, name: "Pymble Ladies College", address: "Avon Rd- Pymble NSW 2073", state: "NSW", upfrontFee: 3430, annualFee: 24002 },
        { id: 5, name: "Ascham School", address: "188 New South Head Rd- Edgecliff- NSW 2027", state: "NSW", upfrontFee: 6300, annualFee: 32000 },
        { id: 6, name: "Abbotsleigh", address: "1666 Pacific Highway- Wahroonga- NSW 2076", state: "NSW", upfrontFee: 1970, annualFee: 28640 },
        { id: 7, name: "St Aloysius College", address: "47 Upper Pitt Street- Milsons Point 2061 NSW Australia", state: "NSW", upfrontFee: 2650, annualFee: 16278 },
        { id: 8, name: "Meridan School", address: "10-12 Redmyre Road- Strathfield NSW 2135", state: "NSW", upfrontFee: 1825, annualFee: 28340 },
        { id: 9, name: "Sydney Church of England Grammar School (SHORE)", address: "Blue Street- North Sydney- NSW- 2060- Australia", state: "NSW", upfrontFee: 2400, annualFee: 24126 },
        { id: 10, name: "Cranbrook School", address: "5 Victoria Road- Bellevue Hill NSW 2023 Australia", state: "NSW", upfrontFee: 7300, annualFee: 28325 },
        { id: 11, name: "Knox Grammar School", address: "7 Woodville Ave- Wahroonga 2076 NSW Australia", state: "NSW", upfrontFee: 3000, annualFee: 29430 },
        { id: 12, name: "The Kings School", address: "87-129 PENNANT HILLS ROAD- NORTH PARRAMATTA- NSW 2151- AUSTRALIA", state: "NSW", upfrontFee: 3850, annualFee: 25345 },
        { id: 13, name: "ST Ignatius' College", address: "1 Tambourine Bay Road- NSW Lane Cove", state: "NSW", upfrontFee: 4530, annualFee: 23880 },
        { id: 14, name: "St Joseph's College", address: "Mark Street- Hunters Hill- NSW 2110", state: "NSW", upfrontFee: 3300, annualFee: 29040 },
        { id: 15, name: "Loreto Normanhurst", address: "91-93 Pennant Hills Road- Normanhurst- Sydney- NSW 2076", state: "NSW", upfrontFee: 3330, annualFee: 19179 },
        { id: 16, name: "Loreto Kirribilli", address: "85 Carabella Street- Kirribilli NSW 2061- Australia", state: "NSW", upfrontFee: 3220, annualFee: 15645 },
        { id: 17, name: "Queenswood School for Girls", address: "47 Mandolong Rd- Mosman NSW 2088", state: "NSW", upfrontFee: 4220, annualFee: 25171 },
        { id: 18, name: "Roseville College", address: "27 Bancroft Avenue Roseville NSW 2069 Australia", state: "NSW", upfrontFee: 1220, annualFee: 20735 },
        { id: 19, name: "Parramatta Marist High School", address: "2 DARCY ROAD- WESTMEAD NSW AUSTRALIA 2145", state: "NSW", upfrontFee: 1220, annualFee: 4473 },
        { id: 20, name: "Barker College", address: "91 Pacific Highway Hornsby NSW 2077", state: "NSW", upfrontFee: 3800, annualFee: 25140 },
        { id: 21, name: "Ruyton Girls' School, Kew.", address: "12 Selbourne Rd- Kew VIC 3101", state: "VIC", upfrontFee: 1610, annualFee: 22360 },
        { id: 22, name: "Shelford Girls' Grammar, Caulfield.", address: "3 Hood Cres- Caulfield VIC 3161", state: "VIC", upfrontFee: 1100, annualFee: 25518 },
        { id: 23, name: "Fintona Girls' School, Balwyn.", address: "79 Balwyn Rd- Balwyn VIC 3103", state: "VIC", upfrontFee: 1150, annualFee: 20399 },
        { id: 24, name: "Lauriston Girls' School, Aramadale.", address: "38 Huntingtower Rd- Armadale VIC 3143", state: "VIC", upfrontFee: 1100, annualFee: 27160 },
        { id: 25, name: "Loreto Mandeville Hall, Toorak.", address: "10 Mandeville Cres- Toorak VIC 3142", state: "VIC", upfrontFee: 1900, annualFee: 22398 },
        { id: 26, name: "Prebyterian Ladies' College, Burwood.", address: "141 Burwood Hwy- Burwood VIC 3125", state: "VIC", upfrontFee: 1300, annualFee: 23479 },
        { id: 27, name: "Camberwell Girls' Grammar School, Canterbury.", address: " 2 Torrington St- Canterbury VIC 3126", state: "VIC", upfrontFee: 1100, annualFee: 19051 },
        { id: 28, name: "Melbourne Girls Grammar School, South Yarra.", address: "86 Anderson St- South Yarra VIC 3141", state: "VIC", upfrontFee: 1650, annualFee: 27746 },
        { id: 29, name: "Mentone Girls' Grammar School, Mentone.", address: "11 Mentone Parade- Mentone VIC 3194", state: "VIC", upfrontFee: 1100, annualFee: 22354 },
        { id: 30, name: "Korowa Anglican Girls' School Glen Iris.", address: "10-16 Ranfurlie Cres- Glen Iris VIC 3146", state: "VIC", upfrontFee: 900, annualFee: 27138 },
        { id: 31, name: "Camberwell Grammar School, Canterbury.", address: "55 Mont Albert Rd- Canterbury VIC 3126", state: "VIC", upfrontFee: 1330, annualFee: 25600 },
        { id: 32, name: "Scotch College, Hawthorn. ", address: "1 Morrison St- Hawthorn VIC 3122", state: "VIC", upfrontFee: 1600, annualFee: 29912 },
        { id: 33, name: "Melbourne Grammar School, South Yarra.", address: "355 St Kilda Rd- Melbourne VIC 3004", state: "VIC", upfrontFee: 3900, annualFee: 24885 },
        { id: 34, name: "Caulfield Grammar School, St Kilda", address: "217 Glen Eira Road- East St. Kilda- Melbourne- Victoria 3183", state: "VIC", upfrontFee: 2100, annualFee: 23789 },
        { id: 35, name: "Haileybury College, Keysborough.", address: "855 Springvale Road Keysborough VIC 3173", state: "VIC", upfrontFee: 2500, annualFee: 24702 },
        { id: 36, name: "Xavier College, Kew.", address: "135 Barkers Road- Melbourne- Kew- Victoria", state: "VIC", upfrontFee: 945, annualFee: 21957 },
        { id: 37, name: "Trinity Grammar School, Kew.", address: "40 Charles St- Kew- Melbourne Victoria 3101", state: "VIC", upfrontFee: 2360, annualFee: 26349 },
        { id: 38, name: "St Kevin's College, Toorak.", address: "31 Moonga Rd- Toorak VIC 3142", state: "VIC", upfrontFee: 3000, annualFee: 16290 },
        { id: 39, name: "Brighton Grammar School, Brighton", address: "90 Outer Cres- Brighton VIC 3186", state: "VIC", upfrontFee: 2200, annualFee: 25247 },
        { id: 40, name: "Firbank Grammar School, Brighton", address: "51 Outer Crescent- Brighton VIC 3186", state: "VIC", upfrontFee: 1100, annualFee: 24769 },
        { id: 41, name: "St Leonard's College, Brighton East.", address: "163 South Road- Brighton East VIC 3187", state: "VIC", upfrontFee: 1800, annualFee: 23415 },
        { id: 42, name: "Brisbane Grammar School", address: "24 Gregory Terrace- Spring Hill QLD 4000", state: "QLD", upfrontFee: 2550, annualFee: 23000 },
        { id: 43, name: "Brisbane Girls Grammer School", address: "70 Gregory Terrace- Spring Hill QLD 4000", state: "QLD", upfrontFee: 2040, annualFee: 22520 },
        { id: 44, name: "Ormiston College", address: "97 Dundas St W- Ormiston QLD 4160", state: "QLD", upfrontFee: 795, annualFee: 2527 },
        { id: 45, name: "Somerville House", address: "17 Graham St- South Brisbane QLD 4101", state: "QLD", upfrontFee: 1530, annualFee: 18292 },
        { id: 46, name: "Brisbane Boys College", address: "Kensington Terrace- Toowong QLD 4066", state: "QLD", upfrontFee: 1960, annualFee: 18434 },
        { id: 47, name: "St Aidan's Anglican Girls School", address: "11 Ruthven St- Corinda QLD 4075", state: "QLD", upfrontFee: 1300, annualFee: 17272 },
        { id: 48, name: "Anglican Church Grammar School", address: "Oaklands Parade- East Brisbane QLD 4169", state: "QLD", upfrontFee: 1930, annualFee: 18813 },
        { id: 49, name: "Clayfield College", address: "23 Gregory Street- Clayfield QLD 4011", state: "QLD", upfrontFee: 1135, annualFee: 17031 },
        { id: 50, name: "Cannon Hill Anglican College", address: "Junction Rd- Cannon Hill QLD 4170", state: "QLD", upfrontFee: 1250, annualFee: 10386 },
        { id: 51, name: "Sheldon College", address: "Taylor Road- Sheldon- QLD 4157", state: "QLD", upfrontFee: 660, annualFee: 11479 },
        { id: 52, name: "St Margarets Anglican Girls School", address: "11 Petrie St- Ascot QLD 4007", state: "QLD", upfrontFee: 1220, annualFee: 17762 },
        { id: 53, name: "Hillbrook Anglican School", address: "45 Hurdcotte Street Enoggera QLD 4051", state: "QLD", upfrontFee: 1610, annualFee: 11092 },
        { id: 54, name: "st peters lutheran college", address: "66 Harts Rd- Indooroopilly QLD 4068", state: "QLD", upfrontFee: 1100, annualFee: 15806 },
        { id: 55, name: "Moreton Bay College", address: "450 Wondall Rd- Manly West QLD 4179", state: "QLD", upfrontFee: 1100, annualFee: 12532 },
        { id: 56, name: "St Rita's College, Clayfield", address: "41 Enderley Rd- Clayfield QLD 4011", state: "QLD", upfrontFee: 1100, annualFee: 7120 },
        { id: 57, name: "The Southport School", address: "2 Winchester St- Southport QLD 4215", state: "QLD", upfrontFee: 1500, annualFee: 15030 },
        { id: 58, name: "St Joseph's College Gregory Terrace", address: "Gregory Terrace- Brisbane- QLD 4000- Australia", state: "QLD", upfrontFee: 2420, annualFee: 8215 },
        { id: 59, name: "The Lakes College", address: "2 College St- North Lakes QLD 4509", state: "QLD", upfrontFee: 500, annualFee: 8415 },
        { id: 60, name: "Redeemer Lutheran College", address: "745 Rochedale Rd- Rochedale QLD 4123", state: "QLD", upfrontFee: 700, annualFee: 8979 },
        { id: 61, name: "Moreton Bay Boys College", address: "302 Manly Rd- Manly West QLD 4179", state: "QLD", upfrontFee: 1100, annualFee: 11023 },
        { id: 62, name: "Wilderness School, Medindie.", address: "30 Hawkers Rd- Medindie SA 5081", state: "SA", upfrontFee: 1050, annualFee: 18888 },
        { id: 63, name: "St Peter's College ", address: "57 Hackney Rd- Hackney SA 5069", state: "SA", upfrontFee: 2600, annualFee: 20520 },
        { id: 64, name: "St Peter's Girls Collegiate Girls' School", address: "Stonyfell Rd- Stonyfell SA 5066", state: "SA", upfrontFee: 970, annualFee: 17285 },
        { id: 65, name: "Walford Anglican School for Girls", address: "316 Unley Rd- Hyde Park SA 5061", state: "SA", upfrontFee: 1095, annualFee: 19301 },
        { id: 66, name: "Prince Alfred College", address: "23 Dequetteville Terrace- Kent Town SA 5067", state: "SA", upfrontFee: 1100, annualFee: 17319 },
        { id: 67, name: "Seymour College", address: "546 Portrush Rd- Glen Osmond SA 5064", state: "SA", upfrontFee: 1050, annualFee: 19679 },
        { id: 68, name: "Pulteney Grammar School", address: "190 South Terrace ADELAIDE SA 5000", state: "SA", upfrontFee: 850, annualFee: 18946 },
        { id: 69, name: "St Aloysius College, Adelaide", address: "53 Wakefield St- Adelaide SA 5000", state: "SA", upfrontFee: 600, annualFee: 7636 },
        { id: 70, name: "St Dominics Priory College", address: "119/139 Molesworth St- North Adelaide SA 5006", state: "SA", upfrontFee: 0, annualFee: 6674 },
        { id: 71, name: "St John's Grammar School", address: "29 Gloucester Ave- Belair SA 5052", state: "SA", upfrontFee: 688, annualFee: 11811 },
        { id: 72, name: "Woodcroft College", address: "143-173 Bains Rd- Morphett Vale SA 5162", state: "SA", upfrontFee: 755, annualFee: 6297 },
        { id: 73, name: "St Ignatious College, Adelaide", address: "2 Manresa Ct- Athelstone SA 5076", state: "SA", upfrontFee: 975, annualFee: 14013 },
        { id: 74, name: "Pedare Christian College", address: "2-30 Surrey Farm Dr- Golden Grove SA 5125", state: "SA", upfrontFee: 150, annualFee: 7502 },
        { id: 75, name: "Westminster School", address: "1-27 Alison Avenue- Marion- South Australia ", state: "SA", upfrontFee: 800, annualFee: 17932 },
        { id: 76, name: "Kings Baptist Grammar School", address: "no address", state: "SA", upfrontFee: 175, annualFee: 0 },
        { id: 77, name: "Scotch College Adelaide", address: "Carruth Road- Torrens Park South Australia 5062", state: "SA", upfrontFee: 1150, annualFee: 19668 },
        { id: 78, name: "Concordia College", address: "45 Cheltenham St- Highgate SA 5063", state: "SA", upfrontFee: 75, annualFee: 8820 },
        { id: 79, name: "Pembroke School", address: "342 The Parade- Kensington Park SA 5068", state: "SA", upfrontFee: 860, annualFee: 19690 },
        { id: 80, name: "Loreto College, Marryatville", address: "316 Portrush Rd- Marryatville SA 5068", state: "SA", upfrontFee: 745, annualFee: 14664 },
        { id: 81, name: "Trinity College, Gawler", address: "Alexander Ave- Evanston South SA 5116", state: "SA", upfrontFee: 540, annualFee: 4622 },
        { id: 82, name: "Hale School", address: "160 Hale Rd- Wembley Downs WA 6019", state: "WA", upfrontFee: 8250, annualFee: 21450 },
        { id: 83, name: "Christ Church Grammar School", address: "Queenslea Dr- Claremont WA 6010", state: "WA", upfrontFee: 6700, annualFee: 23088 },
        { id: 84, name: "All Saints College", address: "Ewing Ave.- Bull Creek WA 6149", state: "WA", upfrontFee: 5423, annualFee: 16534 },
        { id: 85, name: "St Mary's Anglican Girls School", address: "75 Elliott Rd- Karrinyup WA 6018", state: "WA", upfrontFee: 5545, annualFee: 18394 },
        { id: 86, name: "St Hilda's Anglican Girls School", address: "26 Bay View Terrace- Mosman Park WA 6012", state: "WA", upfrontFee: 4959, annualFee: 20284 },
        { id: 87, name: "Presbyterian Ladies' College, Perth", address: "14 McNeil St- Peppermint Grove WA 6011", state: "WA", upfrontFee: 4950, annualFee: 20982 },
        { id: 88, name: "Perth College", address: "31 Lawley Crescent- Mount Lawley WA 6050", state: "WA", upfrontFee: 5742, annualFee: 18701 },
        { id: 89, name: "Guildford Grammar School ", address: "11 Terrace Rd- Guildford WA 6055", state: "WA", upfrontFee: 2925, annualFee: 18073 },
        { id: 90, name: "Penrhos College", address: "6 Morrison Street- Como WA 6152", state: "WA", upfrontFee: 5489, annualFee: 19442 },
        { id: 91, name: "Scotch College, Perth", address: "76 Shenton Rd- Swanbourne WA 6010", state: "WA", upfrontFee: 6687, annualFee: 23499 },
        { id: 92, name: "John XXIII College, Perth", address: "Mooro Dr- Mount Claremont WA 6010", state: "WA", upfrontFee: 2110, annualFee: 7710 },
        { id: 93, name: "Santa Maria College", address: "18 Stoneham Rd- Attadale WA 6156", state: "WA", upfrontFee: 1020, annualFee: 10521 },
        { id: 94, name: "Wesley College, Perth", address: "40 Coode St- South Perth WA 6151", state: "WA", upfrontFee: 7276, annualFee: 20001 },
        { id: 95, name: "Methodist Ladies College, Perth", address: "356 Stirling Hwy- Claremont WA 6010", state: "WA", upfrontFee: 5320, annualFee: 21203 },
        { id: 96, name: "St Marks Anglican Community School", address: "St Marks Dr- Hillarys WA 6025", state: "WA", upfrontFee: 2030, annualFee: 7251 },
        { id: 97, name: "Aquinas College, Perth", address: "58 Mount Henry Rd- Salter Point WA 6152", state: "WA", upfrontFee: 2832, annualFee: 14013 },
        { id: 98, name: "Trinity College, Perth", address: "2 Trinity Ave- East Perth WA 6004", state: "WA", upfrontFee: 2243, annualFee: 13602 },
        { id: 99, name: "Sacred Heart College", address: "Hocking Parade- Sorrento WA 6020", state: "WA", upfrontFee: 805, annualFee: 8220 },
        { id: 100, name: "Newman College Perth", address: "216 Empire Ave- Churchlands WA 6018", state: "WA", upfrontFee: 1110, annualFee: 5715 },
        { id: 101, name: "Kingsway Christian College", address: "157 Kingsway- Darch WA 6065", state: "WA", upfrontFee: 1320, annualFee: 7288 },
        { id: 102, name: "Canberra Grammar School", address: "40 Monaro Cres- Red Hill ACT 2603", state: "ACT", upfrontFee: 2975, annualFee: 18753 },
        { id: 103, name: "Radford College", address: "1 College St- Bruce ACT 2617", state: "ACT", upfrontFee: 950, annualFee: 12307 },
        { id: 104, name: "Canberra Girls Grammar School", address: "Melbourne Ave- Deakin ACT 2600", state: "ACT", upfrontFee: 150, annualFee: 16942 },
        { id: 105, name: "Burgmann Anglican School", address: "Gungahlin Dr & The Valley Avenue- Gungahlin ACT 291", state: "ACT", upfrontFee: 875, annualFee: 8413 },
        { id: 106, name: "Brindabella Christian College", address: "136 Brigalow St- Lyneham ACT 2602", state: "ACT", upfrontFee: 700, annualFee: 5874 },
        { id: 107, name: "Marist College", address: "27 Marr St- Pearce ACT 2607", state: "ACT", upfrontFee: 400, annualFee: 8644 },
        { id: 108, name: "Orana Steiner School", address: "Unwin Place- ACT 2611", state: "ACT", upfrontFee: 550, annualFee: 6467 },
        { id: 109, name: "Merici College", address: "Wise St- Braddon ACT 2612", state: "ACT", upfrontFee: 50, annualFee: 6277 },
        { id: 110, name: "Emmaus Christian School", address: "73 Davenport St- Dickson ACT 2602", state: "ACT", upfrontFee: 300, annualFee: 6292 },
        { id: 111, name: "The Friends School, Hobart", address: "23 Commercial Rd- North Hobart TAS 7000", state: "TAS", upfrontFee: 1200, annualFee: 14254 },
        { id: 112, name: "Fahan School", address: "Fisher Avenue- Lower Sandy Bay TAS 7005", state: "TAS", upfrontFee: 2100, annualFee: 12412 },
        { id: 113, name: "St Michael's Collegiate School", address: "218 Macquarie St- Hobart TAS 7000", state: "TAS", upfrontFee: 1110, annualFee: 12908 },
        { id: 114, name: "The Hutchins School", address: "71 Nelson Rd- Sandy Bay TAS 7005", state: "TAS", upfrontFee: 1610, annualFee: 13400 },
        { id: 115, name: "St Mary's College, Hobart", address: "164 Harrington St- Hobart TAS 7000", state: "TAS", upfrontFee: 0, annualFee: 3958 },
        { id: 116, name: "Launceston Chruch Grammar School", address: "36 Button St- Mowbray TAS 7248", state: "TAS", upfrontFee: 100, annualFee: 12900 },
        { id: 117, name: "Launceston Christian School", address: " 452A W Tamar Hwy- Riverside TAS 7250", state: "TAS", upfrontFee: 1300, annualFee: 4802 }
    ];

    $scope.portfolioListOb = [{ id: 0, name: "Conservative Cautious" },
        { id: 1, name: "Balanced Optimistic" },
        { id: 2, name: "Growth Ambitious" }
    ];

    $scope.forms = {};
    $scope.c1Name = privateSchoolObj.firstChild.c1Name;
    $scope.c2Name = privateSchoolObj.secondChild.c2Name;
    $scope.c3Name = privateSchoolObj.thirdChild.c3Name;
    $scope.c4Name = privateSchoolObj.fourthChild.c4Name;
    $scope.c5Name = privateSchoolObj.fifthChild.c5Name;
    $scope.c6Name = privateSchoolObj.sixthChild.c6Name;
    $scope.nameArray = [$scope.c1Name, $scope.c2Name, $scope.c3Name, $scope.c4Name, $scope.c5Name, $scope.c6Name];
    $scope.chartOneOpen = true;
    $scope.alterOption = false;

    $scope.studyingOption1 = false;
    $scope.studyingOption2 = false;
    $scope.studyingOption3 = false;
    $scope.studyingOption4 = false;
    $scope.studyingOption5 = false;
    $scope.studyingOption6 = false;

    $scope.indexlevel = 0.04;

    $scope.spPort=privateSchoolObj.spPort;
    $scope.spState=privateSchoolObj.spState;

    $scope.portAnnualReturn = [0.0456, 0.0853, 0.1165, 0.06];

/*    var spState = "0",
        spPort = "0",*/
         var school1 = "0",
        school2 = "0",
        school3 = "0",
        school4 = "0",
        school5 = "0",
        school6 = "0";
    var schoolArray = [school1, school2, school3, school4, school5, school6];
    var publicSchol_avgCostArray = [1615.33, 1395, 471.25, 762.5, 950, 357.14, 390];
    $scope.publicSchoolFees = publicSchol_avgCostArray[Number($scope.spState)];
    // $scope.showPortfolioOption = false;
    $scope.publicSchoolFees = publicSchol_avgCostArray[$scope.spState];

    schoolArray[0]= privateSchoolObj.firstChild.schoolId1; 
    schoolArray[1]= privateSchoolObj.secondChild.schoolId2;
    schoolArray[2] = privateSchoolObj.thirdChild.schoolId3;
    schoolArray[3] = privateSchoolObj.fourthChild.schoolId4;
    schoolArray[4] = privateSchoolObj.fifthChild.schoolId5;
    schoolArray[5] = privateSchoolObj.sixthChild.schoolId6;


    var initDate = new Date();
    $scope.begnYearInvestment = privateSchoolObj.begnYearInvestment;
    $scope.numChildren = privateSchoolObj.numChildren;
    $scope.contStartYear = privateSchoolObj.contStartYear;
    $scope.schoolYear1 = privateSchoolObj.firstChild.schoolYear1;
    $scope.schoolDuration1 = privateSchoolObj.firstChild.schoolDuration1;
    $scope.schoolYear2 = privateSchoolObj.secondChild.schoolYear2;
    $scope.schoolDuration2 = privateSchoolObj.secondChild.schoolDuration2;
    $scope.schoolYear3 = privateSchoolObj.thirdChild.schoolYear3;
    $scope.schoolDuration3 = privateSchoolObj.thirdChild.schoolDuration3;
    $scope.schoolYear4 = privateSchoolObj.fourthChild.schoolYear4;
    $scope.schoolDuration4 = privateSchoolObj.fourthChild.schoolDuration4;
    $scope.schoolYear5 = privateSchoolObj.fifthChild.schoolYear5;
    $scope.schoolDuration5 = privateSchoolObj.fifthChild.schoolDuration5;
    $scope.schoolYear6 = privateSchoolObj.sixthChild.schoolYear6;
    $scope.schoolDuration6 = privateSchoolObj.sixthChild.schoolDuration6;
    $scope.endYearInvestment = Number($scope.schoolYear2) + Number($scope.schoolDuration2);



/*    $scope.studyingOption1Change = function(studying1) {
        $scope.studyingOption1 = studying1;
        if (studying1) {
            schoolYear1Input.value = $scope.begnYearInvestment;
            schoolYear1Slider.noUiSlider.set(schoolYear1Input.value);
        } else {
            schoolYear1Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear1Slider.noUiSlider.set(schoolYear1Input.value);
        }
        //calculate();
        $timeout(0);
    }
    $scope.studyingOption2Change = function(studying2) {
        $scope.studyingOption2 = studying2;
        if (studying2) {
            schoolYear2Input.value = $scope.begnYearInvestment;
            schoolYear2Slider.noUiSlider.set(schoolYear2Input.value);
        } else {
            schoolYear2Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear2Slider.noUiSlider.set(schoolYear2Input.value);
        }
        //calculate();
        $timeout(0);
    }
    $scope.studyingOption3Change = function(studying3) {
        $scope.studyingOption3 = studying3;
        if (studying3) {
            schoolYear3Input.value = $scope.begnYearInvestment;
            schoolYear3Slider.noUiSlider.set(schoolYear3Input.value);
        } else {
            schoolYear3Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear3Slider.noUiSlider.set(schoolYear3Input.value);
        }
        //calculate();
        $timeout(0);
    }
    $scope.studyingOption4Change = function(studying4) {
        $scope.studyingOption4 = studying4;
        if (studying4) {
            schoolYear4Input.value = $scope.begnYearInvestment;
            schoolYear4Slider.noUiSlider.set(schoolYear4Input.value);
        } else {
            schoolYear4Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear4Slider.noUiSlider.set(schoolYear4Input.value);
        }
        //calculate();
        $timeout(0);
    }
    $scope.studyingOption5Change = function(studying5) {
        $scope.studyingOption5 = studying5;
        if (studying5) {
            schoolYear5Input.value = $scope.begnYearInvestment;
            schoolYear5Slider.noUiSlider.set(schoolYear5Input.value);
        } else {
            schoolYear5Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear5Slider.noUiSlider.set(schoolYear5Input.value);
        }
        //calculate();
        $timeout(0);
    }
    $scope.studyingOption6Change = function(studying6) {
        $scope.studyingOption6 = studying6;
        if (studying6) {
            schoolYear6Input.value = $scope.begnYearInvestment;
            schoolYear6Slider.noUiSlider.set(schoolYear6Input.value);
        } else {
            schoolYear6Input.value = Number($scope.begnYearInvestment) + 1;
            schoolYear6Slider.noUiSlider.set(schoolYear6Input.value);
        }
        //calculate();
        $timeout(0);
    }

    */

    function changeMax(tempEndYear) {
        var numChildren = Number($scope.numChildren);
        var schoolYear1 = Number($scope.schoolYear1);
        var schoolDuration1 = Number($scope.schoolDuration1);
        var schoolYear2 = Number($scope.schoolYear2);
        var schoolDuration2 = Number($scope.schoolDuration2);
        var schoolYear3 = Number($scope.schoolYear3);
        var schoolDuration3 = Number($scope.schoolDuration3);
        var schoolYear4 = Number($scope.schoolYear4);
        var schoolDuration4 = Number($scope.schoolDuration4);
        var schoolYear5 = Number($scope.schoolYear5);
        var schoolDuration5 = Number($scope.schoolDuration5);
        var schoolYear6 = Number($scope.schoolYear6);
        var schoolDuration6 = Number($scope.schoolDuration6);
        var childSchoolArray = [schoolYear1, schoolYear2, schoolYear3, schoolYear4, schoolYear5, schoolYear6];
        var childDurationArray = [schoolDuration1, schoolDuration2, schoolDuration3, schoolDuration4, schoolDuration5, schoolDuration6];
        var childGradArray = [$scope.schoolEnd1, $scope.schoolEnd2, $scope.schoolEnd3, $scope.schoolEnd4, $scope.schoolEnd5, $scope.schoolEnd6];

        for (i = 0; i < numChildren; i++) {
            childGradArray[i] = childSchoolArray[i] + childDurationArray[i] - 1;
        }
        $scope.endYearInvestment = childGradArray[0];
        for (i = 1; i < numChildren; i++) {
            $scope.endYearInvestment = $scope.endYearInvestment > childGradArray[i] ? $scope.endYearInvestment : childGradArray[i];
        }



        if (Number(initDate.getFullYear()) == Number($scope.endYearInvestment)) {
            $scope.begnYearInvestment = Number($scope.endYearInvestment);
            $scope.contStartYear = Number($scope.endYearInvestment);
            begnYearInvestmentSlider.setAttribute('disabled', true);
            contStartYearSlider.setAttribute('disabled', true);
        } else {
            begnYearInvestmentSlider.removeAttribute('disabled');
            contStartYearSlider.removeAttribute('disabled');
            begnYearInvestmentSlider.noUiSlider.updateOptions({
                range: {
                    'min': initDate.getFullYear(),
                    'max': $scope.endYearInvestment
                }
            });
            contStartYearSlider.noUiSlider.updateOptions({
                range: {
                    'min': initDate.getFullYear(),
                    'max': $scope.endYearInvestment
                }
            });
        }

    }

    function PV(rate, periods, payment, future, type) {
        var type1 = (typeof type === 'undefined') ? 0 : type;
        rate = eval(rate);
        periods = eval(periods);
        if (rate === 0) {
            return -payment * periods - future;
        } else {
            return (((1 - Math.pow(1 + rate, periods)) / rate) * payment * (1 + rate * type1) - future) / Math.pow(1 + rate, periods);
        }
    }

    function NPV(rate, args) {
        var value = 0;
        for (var j = 0; j < args.length; j++) {
            value += args[j] / Math.pow(1 + rate, j + 1);
        }
        return value;
    }

    function FV(rate, nper, pmt, pv, type) {
        var pow = Math.pow(1 + rate, nper),
            fv;

        pv = pv || 0;
        type = type || 0;

        if (rate) {
            fv = (pmt * (1 + rate * type) * (1 - pow) / rate) - pv * pow;
        } else {
            fv = -1 * (pv + pmt * nper);
        }
        return fv;
    }

    var realRateReturn = 0.0156;
    $scope.majorFeesListObj = [{ id: 0, name: "Major in Commerce" },
        { id: 1, name: "Major in Medical Science" },
        { id: 2, name: "Major in Art" }
    ];

    var majorSelectedArray = [0, 0, 0, 0, 0, 0];
    var publicSchol_avgCostArray = [1615.33, 1395, 471.25, 762.5, 950, 357.14, 390];
    var commerceFeeArray = [10596, 10596, 10597, 10429, 13176, 10596, 10596];
    var medicalScienceFeeArray = [9823, 10596, 9782, 9439.33, 9896, 10596, 10596];
    var artFeeArray = [7511, 6349, 4239.67, 6935.67, 6524, 6349, 6349];
    var majorFeesArray = [commerceFeeArray, medicalScienceFeeArray, artFeeArray];
    var majorSubject;
    var loanValuationRatio = 0.8;
    var avgSchool_AnnualFee;
    var presentValue_PrivateSchoolFeeArray = [];
    var presentValue_PublicSchoolFeeArray = [];
    var savingFeeArray = [];
    var savingAccumulationArray = [];
    var univCostArray = [];
    var projectedUnivFeeArray = [];
    var remainderUnivFeeArray = [];
    var propertyPurchasingPowerArray = [];

    
    
    majorSelectedArray[0] = privateSchoolObj.firstChild.major1;
    majorSelectedArray[1] = privateSchoolObj.secondChild.major2;
    majorSelectedArray[2] = privateSchoolObj.thirdChild.major3;
    majorSelectedArray[3] = privateSchoolObj.fourthChild.major4;
    majorSelectedArray[4] = privateSchoolObj.fifthChild.major5;
    majorSelectedArray[5] = privateSchoolObj.sixthChild.major6;
    
    






    $scope.calculate = function() {

        

            var begnYearInvestment = Number($scope.begnYearInvestment);
            var numChildren = Number($scope.numChildren);
            var contStartYear = Number($scope.contStartYear);
            var schoolYear1 = Number($scope.schoolYear1);
            var schoolDuration1 = Number($scope.schoolDuration1);
            var schoolYear2 = Number($scope.schoolYear2);
            var schoolDuration2 = Number($scope.schoolDuration2);
            var schoolYear3 = Number($scope.schoolYear3);
            var schoolDuration3 = Number($scope.schoolDuration3);
            var schoolYear4 = Number($scope.schoolYear4);
            var schoolDuration4 = Number($scope.schoolDuration4);
            var schoolYear5 = Number($scope.schoolYear5);
            var schoolDuration5 = Number($scope.schoolDuration5);
            var schoolYear6 = Number($scope.schoolYear6);
            var schoolDuration6 = Number($scope.schoolDuration6);
                    
            
            
            studyingOption1 = privateSchoolObj.firstChild.studyingOption1;
            studyingOption2 = privateSchoolObj.secondChild.studyingOption2;
            studyingOption3 = privateSchoolObj.thirdChild.studyingOption3;
            studyingOption4 = privateSchoolObj.fourthChild.studyingOption4;
            studyingOption5 = privateSchoolObj.fifthChild.studyingOption5;
            studyingOption6 = privateSchoolObj.sixthChild.studyingOption6;
            
            
           
            var childStudyingArray = [$scope.studyingOption1, $scope.studyingOption2, $scope.studyingOption3, $scope.studyingOption4, $scope.studyingOption5, $scope.studyingOption6];
            var childSchoolArray = [schoolYear1, schoolYear2, schoolYear3, schoolYear4, schoolYear5, schoolYear6];
            var childDurationArray = [schoolDuration1, schoolDuration2, schoolDuration3, schoolDuration4, schoolDuration5, schoolDuration6];
            var childGradArray = [$scope.schoolEnd1, $scope.schoolEnd2, $scope.schoolEnd3, $scope.schoolEnd4, $scope.schoolEnd5, $scope.schoolEnd6];
            var f1Array = [],
                f2Array = [],
                f3Array = [],
                f4Array = [],
                f5Array = [],
                f6Array = [];
            var feeArray = [f1Array, f2Array, f3Array, f4Array, f5Array, f6Array];
            var yearArray = [],
                totalFeeArray = [],
                pInvestArray = [],
                pBalArray = [];
            var oneFeeArray = [],
                annualFeeArray = [];

            for (i = 0; i < numChildren; i++) {
                childGradArray[i] = childSchoolArray[i] + childDurationArray[i] - 1;
                oneFeeArray[i] = $scope.schoolObjects[Number(schoolArray[i])].upfrontFee;
                annualFeeArray[i] = $scope.schoolObjects[Number(schoolArray[i])].annualFee;
            }



            $scope.endYearInvestment = childGradArray[0];
            for (i = 1; i < numChildren; i++) {
                $scope.endYearInvestment = $scope.endYearInvestment > childGradArray[i] ? $scope.endYearInvestment : childGradArray[i];
            }

            min = begnYearInvestment;
            max = $scope.endYearInvestment;

            diff = max - min;


            for (i = 0; i <= diff; i++) {
                yearArray.push(min + i);
                totalFeeArray.push(0);
            }


            var temp;

            for (i = 0; i < numChildren; i++) {
                if (childStudyingArray[i] === true) {
                    for (j = 0; j < childDurationArray[i]; j++) {
                        feeArray[i][j] = annualFeeArray[i] * (Math.pow(1 + $scope.indexlevel, yearArray[j] - begnYearInvestment));
                    }
                } else {
                    temp = childSchoolArray[i] - min;
                    feeArray[i][0] = (annualFeeArray[0] + oneFeeArray[0]) * (Math.pow(1 + $scope.indexlevel, temp));
                    for (j = 1; j < childDurationArray[i]; j++) {
                        feeArray[i][j] = annualFeeArray[i] * (Math.pow(1 + $scope.indexlevel, temp + j));
                    }
                }
            }


            for (i = 0; i < numChildren; i++) {
                 temp = childSchoolArray[i] - min;
                for (j = 0; j < feeArray[i].length; j++) {
                    totalFeeArray[temp + j] = totalFeeArray[temp + j] + feeArray[i][j];
                }
            }



            pInvestArray[0] = 50000 * (Math.pow(1 + $scope.portAnnualReturn[Number($scope.spPort)], 0.5) - 1) + (Math.pow(50000 * (Math.pow((1 + $scope.portAnnualReturn[Number($scope.spPort)]), 0.5)) + 5000 - totalFeeArray[0], Math.pow((1 + $scope.portAnnualReturn[Number($scope.spPort)]), 0.5) - 1));
            pBalArray[0] = 50000 + 5000 + pInvestArray[0] - totalFeeArray[0];

            for (i = 1; i < yearArray.length; i++) {
                pInvestArray[i] = pBalArray[i - 1] * (Math.pow(1 + $scope.portAnnualReturn[Number($scope.spPort)], 0.5) - 1) + (pBalArray[i - 1] * Math.pow(1 + $scope.portAnnualReturn[Number($scope.spPort)], 0.5) + 5000 - totalFeeArray[i]) * (Math.pow(1 + $scope.portAnnualReturn[Number($scope.spPort)], 0.5) - 1);
                pBalArray[i] = pBalArray[i - 1] + 5000 + pInvestArray[i] - totalFeeArray[i];
            }


            childSchoolStart = childSchoolArray[0];
            for (i = 1; i < childSchoolArray.length; i++) {
                childSchoolStart = childSchoolStart > childSchoolArray[i] ? childSchoolArray[i] : childSchoolStart;
            }

            totalSchoolYears = max - childSchoolStart + 1;


            rateOfReturn = $scope.portAnnualReturn[Number($scope.spPort)];

            expctdPrsntValue = NPV(rateOfReturn, totalFeeArray) * Math.pow(1 + rateOfReturn, contStartYear - begnYearInvestment);

            estmtdAnnualCont = expctdPrsntValue / (Math.abs(PV(rateOfReturn, childSchoolStart + totalSchoolYears - 1 - contStartYear + 1, 1, 0, 0)));


            var q = childSchoolStart + totalSchoolYears - 1 - contStartYear + 1;

            //console.log("q", q);
            var dataYearArray = [];
            var dataContribMoney = [];
            var dataCashFlow = [];
            var dataInvestReturn = [];
            var dataPortBalance = [];

            for (i = 1; i <= q; i++) {
                dataYearArray[i - 1] = contStartYear + i - 1;
                dataContribMoney[i - 1] = estmtdAnnualCont;

                if (yearArray[0] > contStartYear) {
                    dataCashFlow[i - 1] = 0;
                } else {
                    dataCashFlow[i - 1] = totalFeeArray[dataYearArray[i - 1] - yearArray[0]];
                }

                if ((i - 1) === 0) {
                    dataInvestReturn[i - 1] = 0;
                    dataPortBalance[i - 1] = dataContribMoney[i - 1] - dataCashFlow[i - 1] + dataInvestReturn[i - 1];
                } else {
                    dataInvestReturn[i - 1] = dataPortBalance[i - 2] * rateOfReturn;
                    dataPortBalance[i - 1] = dataPortBalance[i - 2] + dataContribMoney[i - 1] - dataCashFlow[i - 1] + dataInvestReturn[i - 1];
                }

            }

            var countFeeArray = [0, 0, 0, 0, 0, 0];
            for (i = 0; i < numChildren; i++) {
                temp = 0;
                for (j = 0; j < feeArray[i].length; j++) {
                    temp = temp + feeArray[i][j];
                }
                countFeeArray[i] = temp;
            }


            for (i = 0; i < numChildren; i++) {
                avgSchool_AnnualFee = publicSchol_avgCostArray[$scope.spState];
                presentValue_PrivateSchoolFeeArray[i] = (Math.abs(PV(realRateReturn, childDurationArray[i], annualFeeArray[i], 0, 0))) * (Math.pow((1 + realRateReturn), (childSchoolArray[i] - min))) + (oneFeeArray[i]) * (Math.pow((1 + realRateReturn), (childSchoolArray[i] - min)));
                presentValue_PublicSchoolFeeArray[i] = (Math.abs(PV(realRateReturn, childDurationArray[i], avgSchool_AnnualFee, 0, 0))) * (Math.pow((1 + realRateReturn), (childSchoolArray[i] - min)));
                savingFeeArray[i] = presentValue_PrivateSchoolFeeArray[i] - presentValue_PublicSchoolFeeArray[i];
                savingAccumulationArray[i] = (savingFeeArray[i]) * Math.pow((1 + realRateReturn), (childGradArray[i] - begnYearInvestment));
                univCostArray[i] = majorFeesArray[majorSelectedArray[i]][$scope.spState];
                projectedUnivFeeArray[i] = Math.abs(FV(realRateReturn, 3, (univCostArray[i]) * (Math.pow((1 + $scope.indexlevel), (childGradArray[i] - begnYearInvestment)))));
                remainderUnivFeeArray[i] = (savingAccumulationArray[i] * Math.pow((1 + realRateReturn), 3)) - projectedUnivFeeArray[i];
                propertyPurchasingPowerArray[i] = remainderUnivFeeArray[i] / (1 - loanValuationRatio);
            }

            LineChartService.createChart(dataYearArray, dataContribMoney, dataCashFlow, dataInvestReturn, dataPortBalance);
            LineChartService.createChart2(presentValue_PrivateSchoolFeeArray, presentValue_PublicSchoolFeeArray, savingFeeArray, numChildren, $scope.nameArray);
            LineChartService.createChart3(propertyPurchasingPowerArray, remainderUnivFeeArray, projectedUnivFeeArray, numChildren, $scope.nameArray);

     

    };

    $scope.calculate();

}]);