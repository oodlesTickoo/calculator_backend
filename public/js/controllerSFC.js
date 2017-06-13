app.controller("SFCController", ['$scope', '$timeout', 'AgeCalculator', 'ChartServiceHcSFC', function($scope, $timeout, AgeCalculator, ChartServiceHc) {

    
     sfcObj = {
        "age": 47,
        "retirementAge": 67,
        "annualSalary": 60000,
        "superBalance": 100000,
        "cc": 10000,
        "ncc": 10000,
        "ecLevel": 9.5,
        "inflation": 2.5,
        "wageIncrease": 3.5,
        "insurancePremiumPerYear": 200,
        "netReturn": 2.90,
        "fundASelectedId": 0,
        "fundNameA": "Special fund 1",
        "contributionFeeA": 1.50,
        "adminFeeA": 100,
        "indirectCostRationA": 1.50,
        "fundBSelectedId": 1,
        "fundNameB": "Special fund 2",
        "contributionFeeB": 1.50,
        "adminFeeB": 100,
        "indirectCostRationB": 1.50,

    };
    
    $scope.fundsOb = [{ id: 0, name: "AMG Super ", annualPercentageFee: 0.01134 },
        { id: 1, name: "AMP No.1 Retirement Trust ", annualPercentageFee: 0.0085696 },
        { id: 2, name: "Brookfield Australia AMP super Savings Trust ", annualPercentageFee: 0.0053 },
        { id: 3, name: "Macquarie Group AMP super Savings Trust ", annualPercentageFee: 0.0079 },
        { id: 4, name: "Woolworths Group AMP super Savings Trust ", annualPercentageFee: 0.00611 },
        { id: 5, name: "ANZ Staff Australian super Scheme ", annualPercentageFee: 0.0053 },
        { id: 6, name: "Balanced Australian Catholic super and Retirement Fund ", annualPercentageFee: 0.00956 },
        { id: 7, name: "ADF Australian Defence Force super Scheme ", annualPercentageFee: 0.0093 },
        { id: 8, name: "Balanced accumulation Australian Ethical Retail super Fund ", annualPercentageFee: 0.01404 },
        { id: 9, name: "AMIST Australian Meat Industry super Trust ", annualPercentageFee: 0.00758 },
        { id: 10, name: "AustralianSuper ", annualPercentageFee: 0.00796 },
        { id: 11, name: "IBM Super Plan AustralianSuper ", annualPercentageFee: 0.00952 },
        { id: 12, name: "Komatsu Super Plan AustralianSuper ", annualPercentageFee: 0.01086 },
        { id: 13, name: "Balanced Austsafe super Fund ", annualPercentageFee: 0.00892 },
        { id: 14, name: "AvSuper Growth Fund ", annualPercentageFee: 0.0112 },
        { id: 15, name: "Betros Bros super Fund No 2 ", annualPercentageFee: 0.0108 },
        { id: 16, name: "BOC Gases super Fund ", annualPercentageFee: 0.01268 },
        { id: 17, name: "BUSSQ Building Unions super Scheme Queensland ", annualPercentageFee: 0.00896 },
        { id: 18, name: "CareSuper ", annualPercentageFee: 0.01136 },
        { id: 19, name: "My Ethical Super Christian ", annualPercentageFee: 0.01268 },
        { id: 20, name: "Club Plus Super Scheme ", annualPercentageFee: 0.007472 },
        { id: 21, name: "Club Super ", annualPercentageFee: 0.01272 },
        { id: 22, name: "Combined Fund Super ", annualPercentageFee: 0.01052 },
        { id: 23, name: "Accumulate Plus Balanced Commonwealth Bank Group Super ", annualPercentageFee: 0.006973 },
        { id: 24, name: "Balanced Concept One The Industry super Fund ", annualPercentageFee: 0.01152 },
        { id: 25, name: "Growth Cbus Construction & Building Unions super ", annualPercentageFee: 0.00996 },
        { id: 26, name: "Active Balanced DuluxGroup Employees super Fund ", annualPercentageFee: 0.01222 },
        { id: 27, name: "Balanced Elphinstone Group super Fund ", annualPercentageFee: 0.0157 },
        { id: 28, name: "EmPlus super Fund ", annualPercentageFee: 0.010456 },
        { id: 29, name: "Balanced Energy Industries super SchemePool A ", annualPercentageFee: 0.0063 },
        { id: 30, name: "Energy Super ", annualPercentageFee: 0.00944 },
        { id: 31, name: "Equipsuper ", annualPercentageFee: 0.00926 },
        { id: 32, name: "First Super ", annualPercentageFee: 0.00886 },
        { id: 33, name: "Goldman Sachs & JBWere super Fund Product ", annualPercentageFee: 0.016 },
        { id: 34, name: "Core Pool Health Employees super Trust Australia ", annualPercentageFee: 0.0096 },
        { id: 35, name: "Balanced option HOSTPLUS super Fund ", annualPercentageFee: 0.01356 },
        { id: 36, name: "IAG & NRMA super Plan ", annualPercentageFee: 0.0104 },
        { id: 37, name: "Active Balanced Incitec Pivot Employees super Fund ", annualPercentageFee: 0.01276 },
        { id: 38, name: "Intrust Super Fund ", annualPercentageFee: 0.01046 },
        { id: 39, name: "IOOF Portfolio Service super Fund ", annualPercentageFee: 0.01084 },
        { id: 40, name: "Kinetic Super Growth super Fund ", annualPercentageFee: 0.008612 },
        { id: 41, name: "Balanced Labour Union CoOperative Retirement Fund ", annualPercentageFee: 0.00846 },
        { id: 42, name: "Balanced legalsuper ", annualPercentageFee: 0.011152 },
        { id: 43, name: "LESF Super ", annualPercentageFee: 0.012932 },
        { id: 44, name: "Vision Local Authorities super Fund ", annualPercentageFee: 0.00946 },
        { id: 45, name: "Balanced Option Compliant Lutheran Super ", annualPercentageFee: 0.00902 },
        { id: 46, name: "Moderate investment option Maritime Super ", annualPercentageFee: 0.01246 },
        { id: 47, name: "Max Super Fund ", annualPercentageFee: 0.01126 },
        { id: 48, name: "MIESF Meat Industry Employees super Fund ", annualPercentageFee: 0.0069 },
        { id: 49, name: "Balanced investment option accumulation Media Super ", annualPercentageFee: 0.00864 },
        { id: 50, name: "Mercer Santos Super Trust ", annualPercentageFee: 0.0091336 },
        { id: 51, name: "Mercy Super ", annualPercentageFee: 0.010644 },
        { id: 52, name: "MLC Super Fund ", annualPercentageFee: 0.01206 },
        { id: 53, name: "NAB Staff MLC Super Fund ", annualPercentageFee: 0.01036 },
        { id: 54, name: "My AutoSuper MTAA super Fund ", annualPercentageFee: 0.00996 },
        { id: 55, name: "MyCatholicSuper MyLifeMyMoney super Fund ", annualPercentageFee: 0.01126 },
        { id: 56, name: "NSF Nationwide super Fund ", annualPercentageFee: 0.0121 },
        { id: 57, name: "NESS Super ", annualPercentageFee: 0.00984 },
        { id: 58, name: "Diversified NGS Super ", annualPercentageFee: 0.0077 },
        { id: 59, name: "Perpetual Perpetual's Select super Fund ", annualPercentageFee: 0.0137 },
        { id: 60, name: "Pitcher Retirement Plan ", annualPercentageFee: 0.02072 },
        { id: 61, name: "Prime Super ", annualPercentageFee: 0.01416 },
        { id: 62, name: "PSSap Balanced Public Sector super Accumulation Plan ", annualPercentageFee: 0.0093 },
        { id: 63, name: "QIEC Queensland Independent Education & Care super Trust ", annualPercentageFee: 0.01092 },
        { id: 64, name: "Trustee Super Balanced Rei ", annualPercentageFee: 0.008516 },
        { id: 65, name: "REST Super Retail Employees super Trust ", annualPercentageFee: 0.008144 },
        { id: 66, name: "Rio Tinto Fund Growth Option Product Staff super ", annualPercentageFee: 0.00902 },
        { id: 67, name: "General Division Russell Investments Master Trust ", annualPercentageFee: 0.01314 },
        { id: 68, name: "SmartSave Balanced Smartsave 'Member's Choice' super Master Plan ", annualPercentageFee: 0.01272 },
        { id: 69, name: "Statewide super Trust ", annualPercentageFee: 0.00936 },
        { id: 70, name: "MyLife The Executive super Fund ", annualPercentageFee: 0.0133452 },
        { id: 71, name: "VISSF Balanced Option Product The Victorian Independent Schools super Fund ", annualPercentageFee: 0.00914 },
        { id: 72, name: "Growth Toyota Super ", annualPercentageFee: 0.00984 },
        { id: 73, name: "Balanced TWU super Fund ", annualPercentageFee: 0.01236 },
        { id: 74, name: "UniSuper Balanced Unisuper ", annualPercentageFee: 0.00692 },
        { id: 75, name: "Balanced United Technologies Corporation Retirement Plan ", annualPercentageFee: 0.0098 },
        { id: 76, name: "Growth Victorian super Fund ", annualPercentageFee: 0.00986 },
        { id: 77, name: "My WA Super Local Government super Plan ", annualPercentageFee: 0.01246 },
        { id: 78, name: "Growth Water Corporation super Plan ", annualPercentageFee: 0.01144 },
        { id: 79, name: "AFLPA & AFL. Industry 1950s ", annualPercentageFee: 0.011808 },
        { id: 80, name: "AFLPA & AFL. Industry 1960s ", annualPercentageFee: 0.011908 },
        { id: 81, name: "AFLPA & AFL. Industry 1970s ", annualPercentageFee: 0.010908 },
        { id: 82, name: "AFLPA & AFL. Industry 1980s ", annualPercentageFee: 0.010408 },
        { id: 83, name: "AFLPA & AFL. Industry 1990s ", annualPercentageFee: 0.009908 },
        { id: 84, name: "AFLPA & AFL. Industry Capital Stable ", annualPercentageFee: 0.009708 },
        { id: 85, name: "AMP No.2 1950s ", annualPercentageFee: 0.0136472 },
        { id: 86, name: "AMP No.2 1960s ", annualPercentageFee: 0.0141472 },
        { id: 87, name: "AMP No.2 1970s ", annualPercentageFee: 0.0146472 },
        { id: 88, name: "AMP No.2 1980s ", annualPercentageFee: 0.0155472 },
        { id: 89, name: "AMP No.2 1990s ", annualPercentageFee: 0.0155472 },
        { id: 90, name: "AMP No.2 Capital Stable ", annualPercentageFee: 0.0134472 },
        { id: 91, name: "Anglican National ANS RIL Balanced ", annualPercentageFee: 0.0099662 },
        { id: 92, name: "Anglican National ANS RIL Conservative ", annualPercentageFee: 0.008948 },
        { id: 93, name: "Anglican National ANS RIL Growth ", annualPercentageFee: 0.010948 },
        { id: 94, name: "Anglican National ANS RIL High Growth ", annualPercentageFee: 0.011948 },
        { id: 95, name: "Australia Post 1950s ", annualPercentageFee: 0.010436 },
        { id: 96, name: "Australia Post 1960s ", annualPercentageFee: 0.009536 },
        { id: 97, name: "Australia Post 1970s ", annualPercentageFee: 0.008536 },
        { id: 98, name: "Australia Post 1980s ", annualPercentageFee: 0.009036 },
        { id: 99, name: "Australia Post 1990s ", annualPercentageFee: 0.010536 },
        { id: 100, name: "Australia Post Capital Stable ", annualPercentageFee: 0.008336 },
        { id: 101, name: "CCA Future Directions Balanced ", annualPercentageFee: 0.0065616 },
        { id: 102, name: "CCA Future Directions Conservative ", annualPercentageFee: 0.0052744 },
        { id: 103, name: "CCA Future Directions Growth ", annualPercentageFee: 0.0071618 },
        { id: 104, name: "CCA Future Directions High Growth ", annualPercentageFee: 0.0072642 },
        { id: 105, name: "CCA Future Directions Moderately Cons ", annualPercentageFee: 0.0058672 },
        { id: 106, name: "Aon Defensive ", annualPercentageFee: 0.00942 },
        { id: 107, name: "Aon High Growth ", annualPercentageFee: 0.00942 },
        { id: 108, name: "Aon 43 ", annualPercentageFee: 0.00942 },
        { id: 109, name: "Aon 44 ", annualPercentageFee: 0.00942 },
        { id: 110, name: "Aon 45 ", annualPercentageFee: 0.00942 },
        { id: 111, name: "Aon 46 ", annualPercentageFee: 0.00942 },
        { id: 112, name: "Aon 47 ", annualPercentageFee: 0.00942 },
        { id: 113, name: "Aon 48 ", annualPercentageFee: 0.00942 },
        { id: 114, name: "Aon 49 ", annualPercentageFee: 0.00942 },
        { id: 115, name: "Aon 50 ", annualPercentageFee: 0.00942 },
        { id: 116, name: "Aon 51 ", annualPercentageFee: 0.00942 },
        { id: 117, name: "Aon 52 ", annualPercentageFee: 0.00942 },
        { id: 118, name: "Aon 53 ", annualPercentageFee: 0.00942 },
        { id: 119, name: "Aon 54 ", annualPercentageFee: 0.00942 },
        { id: 120, name: "Aon 55 ", annualPercentageFee: 0.00942 },
        { id: 121, name: "Aon 56 ", annualPercentageFee: 0.00942 },
        { id: 122, name: "Aon 57 ", annualPercentageFee: 0.00942 },
        { id: 123, name: "Aon 58 ", annualPercentageFee: 0.00942 },
        { id: 124, name: "Aon 59 ", annualPercentageFee: 0.00942 },
        { id: 125, name: "Aon 60 ", annualPercentageFee: 0.00942 },
        { id: 126, name: "Aon 61 ", annualPercentageFee: 0.00942 },
        { id: 127, name: "Aon 62 ", annualPercentageFee: 0.00942 },
        { id: 128, name: "Aon 63 ", annualPercentageFee: 0.00942 },
        { id: 129, name: "Aon 64 ", annualPercentageFee: 0.00942 },
        { id: 130, name: "Aon 65 ", annualPercentageFee: 0.00942 },
        { id: 131, name: "Aon 66 ", annualPercentageFee: 0.00942 },
        { id: 132, name: "Asgard Employee 1940s LifeStage ", annualPercentageFee: 0.01354 },
        { id: 133, name: "Asgard Employee 1950s LifeStage ", annualPercentageFee: 0.01344 },
        { id: 134, name: "Asgard Employee 1960s LifeStage ", annualPercentageFee: 0.01334 },
        { id: 135, name: "Asgard Employee 1970s LifeStage ", annualPercentageFee: 0.01334 },
        { id: 136, name: "Asgard Employee 1980s LifeStage ", annualPercentageFee: 0.01334 },
        { id: 137, name: "Asgard Employee 1990s LifeStage ", annualPercentageFee: 0.01334 },
        { id: 138, name: "Asgard Employee 2000s Lifestage ", annualPercentageFee: 0.01334 },
        { id: 139, name: "Colonial First State FirstChoice super Lifestage 1945 49 ", annualPercentageFee: 0.0112 },
        { id: 140, name: "Colonial First State FirstChoice super Lifestage 1950 54 ", annualPercentageFee: 0.0112 },
        { id: 141, name: "Colonial First State FirstChoice super Lifestage 1955 59 ", annualPercentageFee: 0.0112 },
        { id: 142, name: "Colonial First State FirstChoice super Lifestage 1960 64 ", annualPercentageFee: 0.0112 },
        { id: 143, name: "Colonial First State FirstChoice super Lifestage 1965 69 ", annualPercentageFee: 0.0112 },
        { id: 144, name: "Colonial First State FirstChoice super  Lifestage 1970 74 ", annualPercentageFee: 0.0112 },
        { id: 145, name: "Colonial First State FirstChoice super  Lifestage 1975 79 ", annualPercentageFee: 0.0112 },
        { id: 146, name: "Colonial First State FirstChoice super  Lifestage 1980 84 ", annualPercentageFee: 0.0112 },
        { id: 147, name: "Colonial First State FirstChoice super  Lifestage 1985 89 ", annualPercentageFee: 0.0112 },
        { id: 148, name: "Colonial First State FirstChoice super  Lifestage 1990 94 ", annualPercentageFee: 0.0112 },
        { id: 149, name: "Colonial First State FirstChoice super  Lifestage 1995 ", annualPercentageFee: 0.0112 },
        { id: 150, name: "Colonial First State FirstChoice super  Lifestage 2000 04 ", annualPercentageFee: 0.0112 },
        { id: 151, name: "Commonwealth Essential Super Essential Lifestage 1940's option ", annualPercentageFee: 0.0094112 },
        { id: 152, name: "Commonwealth Essential Super Essential Lifestage 1950's option ", annualPercentageFee: 0.0094112 },
        { id: 153, name: "Commonwealth Essential Super Essential Lifestage 1960's option ", annualPercentageFee: 0.0094112 },
        { id: 154, name: "Commonwealth Essential Super Essential Lifestage 1970's option ", annualPercentageFee: 0.0094112 },
        { id: 155, name: "Commonwealth Essential Super Essential Lifestage 1980's option ", annualPercentageFee: 0.0094112 },
        { id: 156, name: "Commonwealth Essential Super Essential Lifestage 1990's option ", annualPercentageFee: 0.0094112 },
        { id: 157, name: "First State Super LifecycleBalanced ", annualPercentageFee: 0.00754 },
        { id: 158, name: "First State Super LifecycleDiversified ", annualPercentageFee: 0.00794 },
        { id: 159, name: "Guild Retirement Fund Building ", annualPercentageFee: 0.0112 },
        { id: 160, name: "Guild Retirement Fund Consolidating ", annualPercentageFee: 0.0094 },
        { id: 161, name: "Guild Retirement Fund Growing ", annualPercentageFee: 0.0103 },
        { id: 162, name: "Age Based Investment Strategy Balanced ", annualPercentageFee: 0.00626 },
        { id: 163, name: "Age Based Investment Strategy Balanced Growth ", annualPercentageFee: 0.00666 },
        { id: 164, name: "Age Based Investment Strategy Conservative ", annualPercentageFee: 0.00576 },
        { id: 165, name: "Age Based Investment Strategy High Growth ", annualPercentageFee: 0.00706 },
        { id: 166, name: "LGIASuper Lifecycle75 Plus ", annualPercentageFee: 0.0064 },
        { id: 167, name: "LGIASuper LifecycleUnder 75 ", annualPercentageFee: 0.0072 },
        { id: 168, name: "Mercer SmartPath1929 to 1933 ", annualPercentageFee: 0.0121696 },
        { id: 169, name: "Mercer SmartPath1934 to 1938 ", annualPercentageFee: 0.0121696 },
        { id: 170, name: "Mercer SmartPath1939 to 1943 ", annualPercentageFee: 0.0121696 },
        { id: 171, name: "Mercer SmartPath1944 to 1948 ", annualPercentageFee: 0.0123696 },
        { id: 172, name: "Mercer SmartPath1949 to 1953 ", annualPercentageFee: 0.0122696 },
        { id: 173, name: "Mercer SmartPath1954 to 1958 ", annualPercentageFee: 0.0123696 },
        { id: 174, name: "Mercer SmartPath1959 to 1963 ", annualPercentageFee: 0.0132696 },
        { id: 175, name: "Mercer SmartPath1964 to 1968 ", annualPercentageFee: 0.0135696 },
        { id: 176, name: "Mercer SmartPath1969 to 1973 ", annualPercentageFee: 0.0135696 },
        { id: 177, name: "Mercer SmartPath1974 to 1978 ", annualPercentageFee: 0.0135696 },
        { id: 178, name: "Mercer SmartPath1979 to 1983 ", annualPercentageFee: 0.0135696 },
        { id: 179, name: "Mercer SmartPath1984 to 1988 ", annualPercentageFee: 0.0135696 },
        { id: 180, name: "Mercer SmartPath1989 to 1993 ", annualPercentageFee: 0.0135696 },
        { id: 181, name: "Mercer SmartPath1994 to 1998 ", annualPercentageFee: 0.0135696 },
        { id: 182, name: "Mercer SmartPath1999 to 2003 ", annualPercentageFee: 0.0135696 },
        { id: 183, name: "Mercer SmartPathBorn prior to 1929 ", annualPercentageFee: 0.0121696 },
        { id: 184, name: "Mercer WGSP 1929 to 1933 ", annualPercentageFee: 0.0080696 },
        { id: 185, name: "Mercer WGSP 1934 to 1938 ", annualPercentageFee: 0.0080696 },
        { id: 186, name: "Mercer WGSP 1939 to 1943 ", annualPercentageFee: 0.0080696 },
        { id: 187, name: "Mercer WGSP 1944 to 1948 ", annualPercentageFee: 0.0082696 },
        { id: 188, name: "Mercer WGSP 1949 to 1953 ", annualPercentageFee: 0.0081696 },
        { id: 189, name: "Mercer WGSP 1954 to 1958 ", annualPercentageFee: 0.0082696 },
        { id: 190, name: "Mercer WGSP 1959 to 1963 ", annualPercentageFee: 0.0091696 },
        { id: 191, name: "Mercer WGSP 1964 to 1968 ", annualPercentageFee: 0.0094696 },
        { id: 192, name: "Mercer WGSP 1969 to 1973 ", annualPercentageFee: 0.0094696 },
        { id: 193, name: "Mercer WGSP 1974 to 1978 ", annualPercentageFee: 0.0094696 },
        { id: 194, name: "Mercer WGSP 1979 to 1983 ", annualPercentageFee: 0.0094696 },
        { id: 195, name: "Mercer WGSP 1984 to 1988 ", annualPercentageFee: 0.0094696 },
        { id: 196, name: "Mercer WGSP 1989 to 1993 ", annualPercentageFee: 0.0094696 },
        { id: 197, name: "Mercer WGSP 1994 to 1998 ", annualPercentageFee: 0.0094696 },
        { id: 198, name: "Mercer WGSP 1999 to 2003 ", annualPercentageFee: 0.0094696 },
        { id: 199, name: "Mercer WGSP Born prior to 1929 ", annualPercentageFee: 0.0080696 },
        { id: 200, name: "Virgin Money 1949 to 1953 ", annualPercentageFee: 0.00656 },
        { id: 201, name: "Virgin Money 1954 to 1958 ", annualPercentageFee: 0.00646 },
        { id: 202, name: "Virgin Money 1959 to 1963 ", annualPercentageFee: 0.00656 },
        { id: 203, name: "Virgin Money 1964 to 1968 ", annualPercentageFee: 0.00656 },
        { id: 204, name: "Virgin Money 1969 to 1973 ", annualPercentageFee: 0.00656 },
        { id: 205, name: "Virgin Money 1974 to 1978 ", annualPercentageFee: 0.00656 },
        { id: 206, name: "Virgin Money 1979 to 1983 ", annualPercentageFee: 0.00656 },
        { id: 207, name: "Virgin Money 1984 to 1988 ", annualPercentageFee: 0.00656 },
        { id: 208, name: "Virgin Money 1989 to 1993 ", annualPercentageFee: 0.00656 },
        { id: 209, name: "Virgin Money 1994 to 1998 ", annualPercentageFee: 0.00656 },
        { id: 210, name: "Virgin Money 1999 to 2003 ", annualPercentageFee: 0.00656 },
        { id: 211, name: "Virgin Money 2004 to 2008 ", annualPercentageFee: 0.00656 },
        { id: 212, name: "Virgin Money 2009 to 2013 ", annualPercentageFee: 0.00656 },
        { id: 213, name: "Virgin Money 2014 to 2018 ", annualPercentageFee: 0.00656 },
        { id: 214, name: "Virgin Money BORN PRIOR to 1949 ", annualPercentageFee: 0.00656 },
        { id: 215, name: "Default Lifecycle Aggressive ", annualPercentageFee: 0.01068 },
        { id: 216, name: "Default Lifecycle Balanced ", annualPercentageFee: 0.00938 },
        { id: 217, name: "Default Lifecycle Growth ", annualPercentageFee: 0.01028 },
        { id: 218, name: "Default Lifecycle Stable ", annualPercentageFee: 0.00828 },
        { id: 219, name: "ANZ Smart Choice Super 1940s ", annualPercentageFee: 0.006 },
        { id: 220, name: "ANZ Smart Choice Super 1950s ", annualPercentageFee: 0.006 },
        { id: 221, name: "ANZ Smart Choice Super 1960s ", annualPercentageFee: 0.006 },
        { id: 222, name: "ANZ Smart Choice Super 1970s ", annualPercentageFee: 0.006 },
        { id: 223, name: "ANZ Smart Choice Super 1980s ", annualPercentageFee: 0.006 },
        { id: 224, name: "ANZ Smart Choice Super 1990s ", annualPercentageFee: 0.006 },
        { id: 225, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1940s ", annualPercentageFee: 0.0054 },
        { id: 226, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1950s ", annualPercentageFee: 0.0054 },
        { id: 227, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1960s ", annualPercentageFee: 0.0054 },
        { id: 228, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1970s ", annualPercentageFee: 0.0054 },
        { id: 229, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1980s ", annualPercentageFee: 0.0054 },
        { id: 230, name: "ANZ Smart Choice Super For QBE Management Services PTY LTD and their employees 1990s ", annualPercentageFee: 0.0054 },
        { id: 231, name: "GlidepathAltitude ", annualPercentageFee: 0.01108 },
        { id: 232, name: "GlidepathCruising ", annualPercentageFee: 0.01088 },
        { id: 233, name: "GlidepathDestination ", annualPercentageFee: 0.01058 },
        { id: 234, name: "GlidepathTake Off ", annualPercentageFee: 0.01138 },
        { id: 235, name: "BT Super for Life  Lifetime Employer 1940s LifeStage ", annualPercentageFee: 0.012 },
        { id: 236, name: "BT Super for Life  Lifetime Employer 1950s LifeStage ", annualPercentageFee: 0.0119 },
        { id: 237, name: "BT Super for Life  Lifetime Employer 1960s LifeStage ", annualPercentageFee: 0.0118 },
        { id: 238, name: "BT Super for Life  Lifetime Employer 1970s LifeStage ", annualPercentageFee: 0.0118 },
        { id: 239, name: "BT Super for Life  Lifetime Employer 1980s LifeStage ", annualPercentageFee: 0.0118 },
        { id: 240, name: "BT Super for Life  Lifetime Employer 1990s LifeStage ", annualPercentageFee: 0.0118 },
        { id: 241, name: "BT Super for Life  Lifetime Employer 2000s Lifestage ", annualPercentageFee: 0.0118 },
        { id: 242, name: "Westpac Group Plan 1940s LifeStage ", annualPercentageFee: 0.0075 },
        { id: 243, name: "Westpac Group Plan 1950s LifeStage ", annualPercentageFee: 0.0074 },
        { id: 244, name: "Westpac Group Plan 1960s LifeStage ", annualPercentageFee: 0.0073 },
        { id: 245, name: "Westpac Group Plan 1970s LifeStage ", annualPercentageFee: 0.0073 },
        { id: 246, name: "Westpac Group Plan 1980s LifeStage ", annualPercentageFee: 0.0073 },
        { id: 247, name: "Westpac Group Plan 1990s LifeStage ", annualPercentageFee: 0.0073 },
        { id: 248, name: "Westpac Group Plan 2000s LifeStage ", annualPercentageFee: 0.0073 },
        { id: 249, name: "QSuper LifetimeAspire 1 Group ", annualPercentageFee: 0.007 },
        { id: 250, name: "QSuper LifetimeAspire 2 Group ", annualPercentageFee: 0.007 },
        { id: 251, name: "QSuper LifetimeFocus 1 Group ", annualPercentageFee: 0.0063 },
        { id: 252, name: "QSuper LifetimeFocus 2 Group ", annualPercentageFee: 0.0063 },
        { id: 253, name: "QSuper LifetimeFocus 3 Group ", annualPercentageFee: 0.0063 },
        { id: 254, name: "QSuper LifetimeOutlook ", annualPercentageFee: 0.0079 },
        { id: 255, name: "QSuper LifetimeSustain Group 1 ", annualPercentageFee: 0.0049 },
        { id: 256, name: "QSuper LifetimeSustain Group 2 ", annualPercentageFee: 0.0049 },
        { id: 257, name: "Suncorp Lifestage FundsSuncorp 1934 Prior ", annualPercentageFee: 0.01006 },
        { id: 258, name: "Suncorp Lifestage FundsSuncorp 1935 1939 ", annualPercentageFee: 0.01006 },
        { id: 259, name: "Suncorp Lifestage FundsSuncorp 1940 1944 ", annualPercentageFee: 0.01006 },
        { id: 260, name: "Suncorp Lifestage FundsSuncorp 1945 1949 ", annualPercentageFee: 0.01006 },
        { id: 261, name: "Suncorp Lifestage FundsSuncorp 1950 1954 ", annualPercentageFee: 0.01006 },
        { id: 262, name: "Suncorp Lifestage FundsSuncorp 1955 1959 ", annualPercentageFee: 0.01006 },
        { id: 263, name: "Suncorp Lifestage FundsSuncorp 1960 1964 ", annualPercentageFee: 0.01006 },
        { id: 264, name: "Suncorp Lifestage FundsSuncorp 1965 1969 ", annualPercentageFee: 0.01006 },
        { id: 265, name: "Suncorp Lifestage FundsSuncorp 1970 1974 ", annualPercentageFee: 0.01006 },
        { id: 266, name: "Suncorp Lifestage FundsSuncorp 1975 1979 ", annualPercentageFee: 0.01006 },
        { id: 267, name: "Suncorp Lifestage FundsSuncorp 1980 1984 ", annualPercentageFee: 0.01006 },
        { id: 268, name: "Suncorp Lifestage FundsSuncorp 1985 1989 ", annualPercentageFee: 0.01006 },
        { id: 269, name: "Suncorp Lifestage FundsSuncorp 1990 1994 ", annualPercentageFee: 0.01006 },
        { id: 270, name: "Suncorp Lifestage FundsSuncorp 1995 1999 ", annualPercentageFee: 0.01006 },
        { id: 271, name: "Suncorp Lifestage FundsSuncorp 2000 2004 ", annualPercentageFee: 0.01006 },
        { id: 272, name: "Sunsuper for LifeAge 54 and under ", annualPercentageFee: 0.00736 },
        { id: 273, name: "Sunsuper for LifeAge 55 ", annualPercentageFee: 0.00736 },
        { id: 274, name: "Sunsuper for LifeAge 56 ", annualPercentageFee: 0.00736 },
        { id: 275, name: "Sunsuper for LifeAge 57 ", annualPercentageFee: 0.00736 },
        { id: 276, name: "Sunsuper for LifeAge 58 ", annualPercentageFee: 0.00736 },
        { id: 277, name: "Sunsuper for LifeAge 59 ", annualPercentageFee: 0.00736 },
        { id: 278, name: "Sunsuper for LifeAge 60 ", annualPercentageFee: 0.00736 },
        { id: 279, name: "Sunsuper for LifeAge 61 ", annualPercentageFee: 0.00736 },
        { id: 280, name: "Sunsuper for LifeAge 62 ", annualPercentageFee: 0.00736 },
        { id: 281, name: "Sunsuper for LifeAge 63 ", annualPercentageFee: 0.00736 },
        { id: 282, name: "Sunsuper for LifeAge 64 ", annualPercentageFee: 0.00736 },
        { id: 283, name: "Sunsuper for LifeAge 65 and over ", annualPercentageFee: 0.00736 },
        { id: 284, name: "AMP No.3AMP SDF 1950s ", annualPercentageFee: 0.0145472 },
        { id: 285, name: "AMP No.3AMP SDF 1960s ", annualPercentageFee: 0.0150472 },
        { id: 286, name: "AMP No.3AMP SDF 1970s ", annualPercentageFee: 0.0155472 },
        { id: 287, name: "AMP No.3AMP SDF 1980s ", annualPercentageFee: 0.0164472 },
        { id: 288, name: "AMP No.3AMP SDF 1990s ", annualPercentageFee: 0.0164472 },
        { id: 289, name: "AMP No.3AMP SDF Capital Stable ", annualPercentageFee: 0.0143472 },
        { id: 290, name: "Tasplan Ontrack Build ", annualPercentageFee: 0.00926 },
        { id: 291, name: "Tasplan Ontrack Control ", annualPercentageFee: 0.00856 },
        { id: 292, name: "Tasplan Ontrack Maintain ", annualPercentageFee: 0.00786 },
        { id: 293, name: "Tasplan Ontrack Sustain ", annualPercentageFee: 0.00896 },
        { id: 294, name: "Telstra Super Balanced ", annualPercentageFee: 0.01076 },
        { id: 295, name: "Telstra Super Conservative ", annualPercentageFee: 0.00816 },
        { id: 296, name: "Telstra Super Growth ", annualPercentageFee: 0.01096 },
        { id: 297, name: "Bendigo Balanced Index Fund ", annualPercentageFee: 0.00626 },
        { id: 298, name: "Bendigo Conservative Index Fund ", annualPercentageFee: 0.00608 },
        { id: 299, name: "Bendigo Growth Index Fund ", annualPercentageFee: 0.00654 },
        { id: 300, name: "BT Business 1940s LifeStage ", annualPercentageFee: 0.0118 },
        { id: 301, name: "BT Business 1950s LifeStage ", annualPercentageFee: 0.0119 },
        { id: 302, name: "BT Business 1960s LifeStage ", annualPercentageFee: 0.0119 },
        { id: 303, name: "BT Business 1970s LifeStage ", annualPercentageFee: 0.012 },
        { id: 304, name: "BT Business 1980s LifeStage ", annualPercentageFee: 0.012 },
        { id: 305, name: "BT Business 1990s LifeStage ", annualPercentageFee: 0.012 },
        { id: 306, name: "BT Business 2000s LifeStage", annualPercentageFee: 0.012 },
        { id: 307, name: "Asgard Infinity Ewrap", contributionFee: 0, adminFee: 0, indirectCostRation: 1.16 },
        { id: 308, name: "SMSI Non Advice", contributionFee: 0, adminFee: 2499, indirectCostRation: 0 },
        { id: 309, name: "SMSI Advice", contributionFee: 0, adminFee: 259, indirectCostRation: 0.53 },
        { id: 310, name: "Australian Super direct share portfolio platform", contributionFee: 0, adminFee: 2673, indirectCostRation: 0 },
        { id: 311, name: "Investor's own", contributionFee: 0.01134, adminFee: 0, indirectCostRation: 0 }
    ];

    var dt = new Date();

    var fy = dt.getMonth() > 5 ? dt.getFullYear() : dt.getFullYear() - 1;

    // console.log(sfcObj);

    var age = sfcObj.age;

    var annualSalary = sfcObj.annualSalary;

    var retirementAge = sfcObj.retirementAge;

    var superBalance = sfcObj.superBalance;

    var cc = sfcObj.cc;

    var ncc = sfcObj.ncc;

    var employerContributionLevel = sfcObj.ecLevel;

    var inflation = sfcObj.inflation;

    var wageIncrease = sfcObj.wageIncrease;

    var insurancePremium = sfcObj.insurancePremiumPerYear;

    var netReturnRate = sfcObj.netReturnRate;
    var superTaxRate = 15;

    $scope.contributionFeeA = sfcObj.contributionFeeA;
    $scope.adminFeeA = sfcObj.adminFeeA;
    $scope.indirectCostRationA = sfcObj.indirectCostRationA;


    $scope.contributionFeeB = sfcObj.contributionFeeB;
    $scope.adminFeeB = sfcObj.adminFeeB;
    $scope.indirectCostRationB = sfcObj.indirectCostRationB;

    $scope.fundASelectedId = sfcObj.fundASelectedId;
    if (Number($scope.fundASelectedId) >= 307) {
        if (Number($scope.fundASelectedId) == 311) {
            $scope.fundA = {
                name: sfcObj.fundNameA,
                annualPercentageFee: Number(sfcObj.contributionFeeA),
                adminFee: Number(sfcObj.adminFeeA),
                indirectCostRation: Number(sfcObj.indirectCostRationA)
            };
        } else {
            $scope.fundA = {
                name: $scope.fundsOb[$scope.fundASelectedId].name,
                annualPercentageFee: $scope.fundsOb[$scope.fundASelectedId].contributionFee,
                adminFee: $scope.fundsOb[$scope.fundASelectedId].adminFee,
                indirectCostRation: $scope.fundsOb[$scope.fundASelectedId].indirectCostRation
            };
        }
    } else {
        $scope.fundA = $scope.fundsOb[$scope.fundASelectedId];
    }


    $scope.fundBSelectedId = sfcObj.fundBSelectedId;
    if (Number($scope.fundBSelectedId) >= 307) {
        if (Number($scope.fundBSelectedId) == 311) {
            $scope.fundB = {
                name: sfcObj.fundNameB,
                annualPercentageFee: Number(sfcObj.contributionFeeB),
                adminFee: Number(sfcObj.adminFeeB),
                indirectCostRation: Number(sfcObj.indirectCostRationB)
            };
        } else {
            $scope.fundB = {
                name: $scope.fundsOb[$scope.fundBSelectedId].name,
                annualPercentageFee: $scope.fundsOb[$scope.fundBSelectedId].contributionFee,
                adminFee: $scope.fundsOb[$scope.fundBSelectedId].adminFee,
                indirectCostRation: $scope.fundsOb[$scope.fundBSelectedId].indirectCostRation
            };
        }
    } else {
        $scope.fundB = $scope.fundsOb[$scope.fundBSelectedId];
    }

    $scope.netReturn = sfcObj.netReturn;




    function fundCalculation(fundReturn, fundFee, fundFound) {

        $scope.year = 0;

        var yearLimit = retirementAge - age;

        var cpi;

        var adjustedSalary, netContribution, earning, taxation, drawdown, fAndI, balance, balanceCpi, paymentFactor, ageL;

        var count = 0;

        ageL = age;

        var balanceArray = [superBalance];

        var biArray = [];

        for (count = 0; count <= yearLimit; count++) {
            cpi = Math.pow(1 + (inflation / 100), $scope.year);
            adjustedSalary = annualSalary * Math.pow(1 + (wageIncrease / 100), $scope.year);
            netContribution = (adjustedSalary * employerContributionLevel / 100 + cc) * (1 - superTaxRate / 100) + ncc;
            earnings = balanceArray[count] * (Math.pow(1 + (fundReturn / 100), 0.5) - 1) + ((balanceArray[count] * Math.pow(1 + (fundReturn / 100), 0.5) + netContribution) * (Math.pow(1 + (fundReturn / 100), 0.5) - 1));

            if (fundFee.annualPercentageFee > 100) {
                fees = fundFee.annualPercentageFee;
            } else {
                if (fundFound<307) {
                    fees = balanceArray[count] * (fundFee.annualPercentageFee );
                } else {
                    fees = (balanceArray[count] * ((fundFee.annualPercentageFee / 100) + (fundFee.indirectCostRation / 100))) + fundFee.adminFee;
                }
            }
            /*console.log("fundFound:", fundFound);
            console.log("fees:", fees);
            console.log("fundFee.annualPercentageFee:", fundFee.annualPercentageFee);
*/            tax = (earnings - insurancePremium - fees) * superTaxRate / 100;
            balance = balanceArray[count] + netContribution + earnings - fees - insurancePremium - tax;

            balanceCpi = 1 / cpi;

            balanceIndexed = balance * balanceCpi;

            balanceArray.push(balance);

            biArray.push(balanceIndexed);

            $scope.year++;

        }

        return [biArray, biArray.slice(-1)[0]];
    }

    function calculateFinal() {

        $scope.resultFundOne = fundCalculation($scope.netReturn, $scope.fundA, $scope.fundASelectedId)[1];

        $scope.resultFundTwo = fundCalculation($scope.netReturn, $scope.fundB, $scope.fundBSelectedId)[1];

        $scope.resultFundOneArray = fundCalculation($scope.netReturn, $scope.fundA, $scope.fundASelectedId)[0];
            $scope.resultFundTwoArray = fundCalculation($scope.netReturn, $scope.fundB, $scope.fundBSelectedId)[0];
 
            /*console.log("resultFundOne", $scope.resultFundOne);
            console.log("resultFundTwo", $scope.resultFundTwo);*/
 
            $scope.finalFundA=$scope.fundA;
            $scope.finalFundB=$scope.fundB;

        if ($scope.resultFundTwo > $scope.resultFundOne) {
            $scope.savings = $scope.resultFundTwo - $scope.resultFundOne;
            $scope.savingsName = $scope.fundB.name;
        } else {
            $scope.savings = $scope.resultFundOne - $scope.resultFundTwo;
            $scope.savingsName = $scope.fundA.name;
        }
        var num=Number($scope.resultFundOne.toFixed(2));

        ChartServiceHc.createChart("#container", Number($scope.resultFundOne.toFixed(2)), Number($scope.resultFundTwo.toFixed(2)), Number($scope.savings.toFixed(2)), false, true, $scope.year);
        ChartServiceHc.createChart("#containerA", $scope.resultFundOneArray, $scope.resultFundTwoArray, 0, false, false, $scope.year);
    }

    calculateFinal();



}]);
