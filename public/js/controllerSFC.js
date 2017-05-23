app.controller("SFCController", ['$scope', '$timeout', 'AgeCalculator', 'ChartServiceHcSFC', function($scope, $timeout, AgeCalculator, ChartServiceHc) {

    $scope.fundsOb = [
        { id: 0, name: 'Asgard Infinity Ewrap Super', annualPercentageFee: 1.25 },
        { id: 1, name: 'ING Direct Living Super', annualPercentageFee: 0 },
        { id: 2, name: 'ING Direct Living Super (Balanced) with benefits', annualPercentageFee: 260 },
        { id: 3, name: 'SMSF (Non advice service)', annualPercentageFee: 2240 },
        { id: 4, name: 'SMSF (Advice Service)', annualPercentageFee: 0.95 },
        { id: 5, name: 'Building Unions Super Scheme Queensland BUSSQ', annualPercentageFee: 1.31 },
        { id: 6, name: 'First Super', annualPercentageFee: 0.89 },
        { id: 7, name: 'QSuper Lifetime Aspire 1 Group', annualPercentageFee: 0.61 },
        { id: 8, name: 'QSuper Lifetime Outlook', annualPercentageFee: 0.66 },
        { id: 9, name: 'QSuper Lifetime Sustain Group 1', annualPercentageFee: 0.45 },
        { id: 10, name: 'Local Government Strategy AgeBased Investment Conservative', annualPercentageFee: 0.58 },
        { id: 11, name: 'QSuper Lifetime Focus 1 Group', annualPercentageFee: 0.56 },
        { id: 12, name: 'QSuper Lifetime Sustain Group 2', annualPercentageFee: 0.45 },
        { id: 13, name: 'Construction & Building Unions Super Growth Cbus', annualPercentageFee: 1 },
        { id: 14, name: 'Meat Industry Employees Super MIESF', annualPercentageFee: 0.63 },
        { id: 15, name: 'QSuper Lifetime Focus 2 Group', annualPercentageFee: 0.56 },
        { id: 16, name: 'Suncorp Funds 1934 Prior', annualPercentageFee: 1.01 },
        { id: 17, name: 'QSuper Lifetime Aspire 2 Group', annualPercentageFee: 0.61 },
        { id: 18, name: 'Aon Defensive', annualPercentageFee: 0.92 },
        { id: 19, name: 'Suncorp Funds 1935 to 1939', annualPercentageFee: 1.01 },
        { id: 20, name: 'Statewide Super', annualPercentageFee: 0.91 },
        { id: 21, name: 'Suncorp Funds 1950 to 1954', annualPercentageFee: 1.01 },
        { id: 22, name: 'Suncorp Funds 1945 to 1949', annualPercentageFee: 1.01 },
        { id: 23, name: 'QSuper Lifetime Focus 3 Group', annualPercentageFee: 0.56 },
        { id: 24, name: 'Suncorp Funds 1955 to 1959', annualPercentageFee: 1.01 },
        { id: 25, name: 'Suncorp Funds 1940 to 1944', annualPercentageFee: 1.01 },
        { id: 26, name: 'Local Government Strategy AgeBased Investment Balanced', annualPercentageFee: 0.63 },
        { id: 27, name: 'Suncorp Funds 1960 to 1964', annualPercentageFee: 1.01 },
        { id: 28, name: 'Aon 66', annualPercentageFee: 0.92 },
        { id: 29, name: 'Suncorp Funds 1965 to 1969', annualPercentageFee: 1.01 },
        { id: 30, name: 'MTAA Super My AutoSuper', annualPercentageFee: 0.84 },
        { id: 31, name: 'Suncorp Funds 1970 to 1974', annualPercentageFee: 1.01 },
        { id: 32, name: 'Telstra Super Conservative', annualPercentageFee: 0.82 },
        { id: 33, name: 'Suncorp Funds 1975 to 1979', annualPercentageFee: 1.01 },
        { id: 34, name: 'Aon 65', annualPercentageFee: 0.92 },
        { id: 35, name: 'MyLifeMyMoney Super MyCatholicSuper', annualPercentageFee: 1.04 },
        { id: 36, name: 'AustralianSuper', annualPercentageFee: 0.73 },
        { id: 37, name: 'HOSTPLUS Super Balanced', annualPercentageFee: 1.1 },
        { id: 38, name: 'AustralianSuper Komatsu Plan', annualPercentageFee: 0.83 },
        { id: 39, name: 'Suncorp Funds 1980 to 1984', annualPercentageFee: 1.01 },
        { id: 40, name: 'AustralianSuper IBM Plan', annualPercentageFee: 0.84 },
        { id: 41, name: 'Suncorp Funds 1995 to 1999', annualPercentageFee: 1.01 },
        { id: 42, name: 'Suncorp Funds 1985 to 1989', annualPercentageFee: 1.01 },
        { id: 43, name: 'Energy Super', annualPercentageFee: 1.12 },
        { id: 44, name: 'Suncorp Funds 1990 to 1994', annualPercentageFee: 1.01 },
        { id: 45, name: 'Suncorp Funds 2000 to 2004', annualPercentageFee: 1.01 },
        { id: 46, name: 'Rei Super ee Balanced', annualPercentageFee: 0.87 },
        { id: 47, name: 'Aon 64', annualPercentageFee: 0.92 },
        { id: 48, name: 'LGIASuper Lifecycle 75 Plus', annualPercentageFee: 0.64 },
        { id: 49, name: 'Care Super', annualPercentageFee: 1.22 },
        { id: 50, name: 'Prime Super', annualPercentageFee: 1.12 },
        { id: 51, name: 'Asgard Employee 1950s', annualPercentageFee: 1.35 },
        { id: 52, name: 'Mine Wealth and Wellbeing Stable', annualPercentageFee: 0.94 },
        { id: 53, name: 'CCA Future Directions Conservative', annualPercentageFee: 0.53 },
        { id: 54, name: 'ANZ Smart Choice SuperFor QBE employees 1940s', annualPercentageFee: 0.54 },
        { id: 55, name: 'Maritime Super Moderate investment', annualPercentageFee: 1.11 },
        { id: 56, name: 'Aon 63', annualPercentageFee: 0.92 },
        { id: 57, name: 'ANZ Smart Choice Super 1940s', annualPercentageFee: 0.6 },
        { id: 58, name: 'Asgard Employee 1970s', annualPercentageFee: 1.35 },
        { id: 59, name: 'Asgard Employee 1960s', annualPercentageFee: 1.35 },
        { id: 60, name: 'Bendigo Conservative Index Fund', annualPercentageFee: 0.61 },
        { id: 61, name: 'Aon 62', annualPercentageFee: 0.92 },
        { id: 62, name: 'Asgard Employee 1980s', annualPercentageFee: 1.35 },
        { id: 63, name: 'Local Government Strategy AgeBased Investment Balanced Growth', annualPercentageFee: 0.67 },
        { id: 64, name: 'WA Local Government Super', annualPercentageFee: 1.16 },
        { id: 65, name: 'LGIASuper Lifecycle Under 75', annualPercentageFee: 0.72 },
        { id: 66, name: 'Sunsuper for Life Age 64', annualPercentageFee: 0.76 },
        { id: 67, name: 'BT Business 1940s', annualPercentageFee: 1.18 },
        { id: 68, name: 'Sunsuper for Life Age 61', annualPercentageFee: 0.76 },
        { id: 69, name: 'Sunsuper for Life Age 65 and over', annualPercentageFee: 0.76 },
        { id: 70, name: 'Sunsuper for Life Age 60', annualPercentageFee: 0.76 },
        { id: 71, name: 'Sunsuper for Life Age 62', annualPercentageFee: 0.76 },
        { id: 72, name: 'Sunsuper for Life Age 58', annualPercentageFee: 0.76 },
        { id: 73, name: 'Sunsuper for Life Age 59', annualPercentageFee: 0.76 },
        { id: 74, name: 'Sunsuper for Life Age 63', annualPercentageFee: 0.76 },
        { id: 75, name: 'Sunsuper for Life Age 55', annualPercentageFee: 0.76 },
        { id: 76, name: 'Sunsuper for Life Age 56', annualPercentageFee: 0.76 },
        { id: 77, name: 'AMP Super Savings Woolworths Group', annualPercentageFee: 0.61 },
        { id: 78, name: 'Sunsuper for Life Age 57', annualPercentageFee: 0.76 },
        { id: 79, name: 'Sunsuper for Life Age 54 and under', annualPercentageFee: 0.76 },
        { id: 80, name: 'Mine Wealth and Wellbeing Balanced', annualPercentageFee: 1.04 },
        { id: 81, name: 'Aon 61', annualPercentageFee: 0.92 },
        { id: 82, name: "Commonwealth Essential Super 1940's option", annualPercentageFee: 0.94 },
        { id: 83, name: 'UniSuper UniSuper Balanced', annualPercentageFee: 0.77 },
        { id: 84, name: 'Health Employees Super Australia Core Pool', annualPercentageFee: 0.96 },
        { id: 85, name: 'Pitcher Retirement Plan', annualPercentageFee: 2.01 },
        { id: 86, name: 'Westpac Group Plan 1940s', annualPercentageFee: 0.75 },
        { id: 87, name: 'Virgin Super Essentials Tracker Balanced Over 60S Mix', annualPercentageFee: 1.11 },
        { id: 88, name: "Commonwealth Essential Super 1950's option", annualPercentageFee: 0.94 },
        { id: 89, name: 'Queensland Independent Education & Care Super QIEC', annualPercentageFee: 1.13 },
        { id: 90, name: 'Aon 60', annualPercentageFee: 0.92 },
        { id: 91, name: 'CCA Future Directions Moderately Cons', annualPercentageFee: 0.59 },
        { id: 92, name: 'Asgard Employee 1990s', annualPercentageFee: 1.35 },
        { id: 93, name: 'Australia Post 1960s', annualPercentageFee: 0.9 },
        { id: 94, name: 'First State Super Lifecycle Balanced', annualPercentageFee: 0.7 },
        { id: 95, name: 'Colonial First State FirstChoice Superannuation Trust 194549', annualPercentageFee: 1.12 },
        { id: 96, name: 'Intrust Super', annualPercentageFee: 1.04 },
        { id: 97, name: 'TWU Super Balanced', annualPercentageFee: 1.24 },
        { id: 98, name: 'Mercer WGSP Born prior to 1929', annualPercentageFee: 0.81 },
        { id: 99, name: 'Colonial First State FirstChoice Superannuation Trust 195054', annualPercentageFee: 1.12 },
        { id: 100, name: 'AFLPA & Industry 1960s', annualPercentageFee: 1.04 },
        { id: 101, name: 'Guild Retirement Fund Consolidating', annualPercentageFee: 0.94 },
        { id: 102, name: 'Australia Post Capital Stable', annualPercentageFee: 0.83 },
        { id: 103, name: 'Mercy Super', annualPercentageFee: 1.12 },
        { id: 104, name: 'Media Super Balanced investment accumulation', annualPercentageFee: 0.85 },
        { id: 105, name: 'The Transport Industry Super TIS', annualPercentageFee: 1.79 },
        { id: 106, name: 'Commonwealth Bank Group Super Accumulate Plus Balanced', annualPercentageFee: 0.73 },
        { id: 107, name: 'Club Plus Super Scheme', annualPercentageFee: 0.74 },
        { id: 108, name: 'The Flexible Benefits Super FlexibleSuper Active Balanced', annualPercentageFee: 0.94 },
        { id: 109, name: 'Aon 59', annualPercentageFee: 0.92 },
        { id: 110, name: 'Mine Wealth and Wellbeing Growth', annualPercentageFee: 1.13 },
        { id: 111, name: 'AFLPA & Industry Capital Stable', annualPercentageFee: 0.97 },
        { id: 112, name: 'BT Super for Life Employer Super 1940s', annualPercentageFee: 1.2 },
        { id: 113, name: 'Mercer WGSP 1944 to 1948', annualPercentageFee: 0.83 },
        { id: 114, name: 'ANZ Smart Choice SuperFor QBE employees 1950s', annualPercentageFee: 0.54 },
        { id: 115, name: 'ANZ Smart Choice Super 1950s', annualPercentageFee: 0.6 },
        { id: 116, name: 'Australian Meat Industry Super AMIST', annualPercentageFee: 0.77 },
        { id: 117, name: 'Mercer WGSP 1929 to 1933', annualPercentageFee: 0.81 },
        { id: 118, name: 'Australia Post 1950s', annualPercentageFee: 0.85 },
        { id: 119, name: 'DuluxGroup Employees Super Active Balanced', annualPercentageFee: 1.11 },
        { id: 120, name: 'Bendigo Balanced Index Fund', annualPercentageFee: 0.63 },
        { id: 121, name: 'Incitec Pivot Employees Super Active Balanced', annualPercentageFee: 1.11 },
        { id: 122, name: 'AMP No.2 1960s', annualPercentageFee: 1.41 },
        { id: 123, name: 'Local Authorities Super Vision', annualPercentageFee: 1.02 },
        { id: 124, name: 'Mercer WGSP 1934 to 1938', annualPercentageFee: 0.81 },
        { id: 125, name: 'Mercer WGSP 1939 to 1943', annualPercentageFee: 0.81 },
        { id: 126, name: 'Mercer SmartPath Born prior to 1929', annualPercentageFee: 1.22 },
        { id: 127, name: 'Anglican National ANS RIL Conservative', annualPercentageFee: 0.89 },
        { id: 128, name: 'Christian Super My Ethical', annualPercentageFee: 1.25 },
        { id: 129, name: 'AFLPA & Industry 1950s', annualPercentageFee: 0.99 },
        { id: 130, name: 'NGS Super Diversified', annualPercentageFee: 0.9 },
        { id: 131, name: 'Aon 58', annualPercentageFee: 0.92 },
        { id: 132, name: 'Tasplan Super', annualPercentageFee: 1.01 },
        { id: 133, name: 'National Australia Bank Group Super NABGSF', annualPercentageFee: 1.17 },
        { id: 134, name: 'AMP No.2 Capital Stable', annualPercentageFee: 1.34 },
        { id: 135, name: 'AMP No.3 SDF 1960s', annualPercentageFee: 1.5 },
        { id: 136, name: 'ANZ Australian Staff Super Scheme', annualPercentageFee: 0.58 },
        { id: 137, name: 'AMP No.3 SDF Capital Stable', annualPercentageFee: 1.43 },
        { id: 138, name: 'Australian Ethical Retail Super Balanced accumulation', annualPercentageFee: 1.72 },
        { id: 139, name: 'CCA Future Directions Balanced', annualPercentageFee: 0.66 },
        { id: 140, name: 'Mercer SmartPath 1944 to 1948', annualPercentageFee: 1.24 },
        { id: 141, name: 'legalSuper Balanced', annualPercentageFee: 0.95 },
        { id: 142, name: 'Mercer SmartPath 1929 to 1933', annualPercentageFee: 1.22 },
        { id: 143, name: 'Mercer WGSP 1949 to 1953', annualPercentageFee: 0.82 },
        { id: 144, name: 'equipSuper EquipSuper', annualPercentageFee: 1.09 },
        { id: 145, name: 'Quadrant Super Scheme MyChoices_ Investment', annualPercentageFee: 1.31 },
        { id: 146, name: 'Retail Employees Super REST', annualPercentageFee: 0.88 },
        { id: 147, name: 'Austsafe Super Balanced', annualPercentageFee: 0.9 },
        { id: 148, name: 'Aon 57', annualPercentageFee: 0.92 },
        { id: 149, name: 'AMP No.2 1950s', annualPercentageFee: 1.36 },
        { id: 150, name: 'Virgin Super Essentials Tracker Balanced 50S Mix', annualPercentageFee: 1.11 },
        { id: 151, name: 'Rio Tinto Staff Super Growth Product', annualPercentageFee: 0.95 },
        { id: 152, name: 'Boc Gases Super BOC', annualPercentageFee: 1.18 },
        { id: 153, name: 'Mercer SmartPath 1934 to 1938', annualPercentageFee: 1.22 },
        { id: 154, name: 'Mercer SmartPath 1939 to 1943', annualPercentageFee: 1.22 },
        { id: 155, name: 'Asgard Employee 1940s', annualPercentageFee: 1.36 },
        { id: 156, name: 'Glidepath Altitude', annualPercentageFee: 1.15 },
        { id: 157, name: 'AMP No.3 SDF 1950s', annualPercentageFee: 1.45 },
        { id: 158, name: 'Colonial First State FirstChoice Superannuation Trust 195559', annualPercentageFee: 1.12 },
        { id: 159, name: 'AvSuper Growth', annualPercentageFee: 1.12 },
        { id: 160, name: 'Local Government Strategy AgeBased Investment High Growth', annualPercentageFee: 0.71 },
        { id: 161, name: 'Australia Post 1970s', annualPercentageFee: 0.95 },
        { id: 162, name: "Perpetual's Select Super", annualPercentageFee: 1.38 },
        { id: 163, name: 'Glidepath Destination', annualPercentageFee: 1.09 },
        { id: 164, name: "Smartsave 'Member's Choice' Super Master Plan SmartSave Balanced", annualPercentageFee: 1.25 },
        { id: 165, name: 'Public Sector Super Accumulation Plan PSSap Balanced', annualPercentageFee: 0.86 },
        { id: 166, name: 'AFLPA & Industry 1970s', annualPercentageFee: 1.09 },
        { id: 167, name: 'Aon 56', annualPercentageFee: 0.92 },
        { id: 168, name: 'Toyota Australia Super Plan Growth', annualPercentageFee: 0.98 },
        { id: 169, name: 'Toyota Employees Super Growth', annualPercentageFee: 0.98 },
        { id: 170, name: 'Mercer SmartPath 1949 to 1953', annualPercentageFee: 1.23 },
        { id: 171, name: 'Westpac Group Plan 1950s', annualPercentageFee: 0.74 },
        { id: 172, name: 'Kinetic Super Growth', annualPercentageFee: 0.97 },
        { id: 173, name: 'Mercer WGSP 1954 to 1958', annualPercentageFee: 0.83 },
        { id: 174, name: 'Mine Wealth and Wellbeing Aggressive', annualPercentageFee: 1.19 },
        { id: 175, name: 'NESS Super', annualPercentageFee: 1 },
        { id: 176, name: 'Glidepath Cruising', annualPercentageFee: 1.12 },
        { id: 177, name: 'Australia Post 1980s', annualPercentageFee: 1.05 },
        { id: 178, name: 'Australia Post 1990s', annualPercentageFee: 1.04 },
        { id: 179, name: 'Combined Super', annualPercentageFee: 1.17 },
        { id: 180, name: 'Russell Supersolution Master General Division', annualPercentageFee: 1.33 },
        { id: 181, name: 'Club Super', annualPercentageFee: 1.26 },
        { id: 182, name: 'Mercer Super Santos', annualPercentageFee: 0.91 },
        { id: 183, name: 'Aon 55', annualPercentageFee: 0.92 },
        { id: 184, name: 'AMP No.2 1970s', annualPercentageFee: 1.46 },
        { id: 185, name: 'AFLPA & Industry 1980s', annualPercentageFee: 1.19 },
        { id: 186, name: "Commonwealth Essential Super 1960's option", annualPercentageFee: 0.94 },
        { id: 187, name: 'AFLPA & Industry 1990s', annualPercentageFee: 1.18 },
        { id: 188, name: 'Telstra Super Balanced', annualPercentageFee: 1.06 },
        { id: 189, name: 'Worsley Alumina Super WASF Default', annualPercentageFee: 0.68 },
        { id: 190, name: 'AMG Super', annualPercentageFee: 1.13 },
        { id: 191, name: 'BT Business 1950s', annualPercentageFee: 1.19 },
        { id: 192, name: 'EmPlus Super', annualPercentageFee: 1.04 },
        { id: 193, name: 'Asgard Employee 2000s', annualPercentageFee: 1.35 },
        { id: 194, name: 'Glidepath Take Off', annualPercentageFee: 1.18 },
        { id: 195, name: 'Bendigo Growth Index Fund', annualPercentageFee: 0.65 },
        { id: 196, name: 'BT Super for Life Employer Super 1950s', annualPercentageFee: 1.19 },
        { id: 197, name: 'Mercer SmartPath 1954 to 1958', annualPercentageFee: 1.24 },
        { id: 198, name: 'First State Super Lifecycle Diversified', annualPercentageFee: 0.72 },
        { id: 199, name: 'AMP No.3 SDF 1970s', annualPercentageFee: 1.55 },
        { id: 200, name: 'Aon 54', annualPercentageFee: 0.92 },
        { id: 201, name: 'BHP Billiton Super Default', annualPercentageFee: 1.06 },
        { id: 202, name: 'AMP No.2 1980s', annualPercentageFee: 1.55 },
        { id: 203, name: 'Energy Industries Super Scheme-Pool A Balanced', annualPercentageFee: 0.95 },
        { id: 204, name: 'AMP No.2 1990s', annualPercentageFee: 1.55 },
        { id: 205, name: 'Guild Retirement Fund Growing', annualPercentageFee: 1.04 },
        { id: 206, name: 'AMP Retirement No.1', annualPercentageFee: 0.85 },
        { id: 207, name: 'Mercer WGSP 1959 to 1963', annualPercentageFee: 0.92 },
        { id: 208, name: 'Victorian Super Growth', annualPercentageFee: 0.97 },
        { id: 209, name: 'IOOF Portfolio Service Super', annualPercentageFee: 1.08 },
        { id: 210, name: 'ANZ Smart Choice SuperFor QBE employees 1960s', annualPercentageFee: 0.54 },
        { id: 211, name: 'ANZ Smart Choice Super 1960s', annualPercentageFee: 0.6 },
        { id: 212, name: 'CCA Future Directions Growth', annualPercentageFee: 0.72 },
        { id: 213, name: "Commonwealth Essential Super 1990's option", annualPercentageFee: 0.94 },
        { id: 214, name: 'The Universal Super Scheme MLC', annualPercentageFee: 1.23 },
        { id: 215, name: 'Plum Super', annualPercentageFee: 1.24 },
        { id: 216, name: 'AMP Super Savings Brookfield Australia', annualPercentageFee: 0.53 },
        { id: 217, name: "Commonwealth Essential Super 1980's option", annualPercentageFee: 0.94 },
        { id: 218, name: 'AMP No.3 SDF 1980s', annualPercentageFee: 1.64 },
        { id: 219, name: 'Nationwide Super NSF', annualPercentageFee: 1.31 },
        { id: 220, name: 'Aon 53', annualPercentageFee: 0.92 },
        { id: 221, name: "Commonwealth Essential Super 1970's option", annualPercentageFee: 0.94 },
        { id: 222, name: 'Concept One The Industry Super Balanced', annualPercentageFee: 0.95 },
        { id: 223, name: 'AMP No.3 SDF 1990s', annualPercentageFee: 1.64 },
        { id: 224, name: 'Mercer SmartPath 1959 to 1963', annualPercentageFee: 1.33 },
        { id: 225, name: 'IAG & NRMA Super Plan', annualPercentageFee: 1.12 },
        { id: 226, name: 'AMP Super Savings Macquarie Group', annualPercentageFee: 0.79 },
        { id: 227, name: 'Max Super', annualPercentageFee: 1.09 },
        { id: 228, name: 'Labour Union Co-Operative Retirement Balanced', annualPercentageFee: 0.95 },
        { id: 229, name: 'Goldman Sachs & JBWere Super Product', annualPercentageFee: 1.67 },
        { id: 230, name: 'Aon 52', annualPercentageFee: 0.92 },
        { id: 231, name: 'Westpac Group Plan 2000s', annualPercentageFee: 0.74 },
        { id: 232, name: 'Westpac Group Plan 1960s', annualPercentageFee: 0.74 },
        { id: 233, name: 'Mercer WGSP 1964 to 1968', annualPercentageFee: 0.95 },
        { id: 234, name: 'Mercer WGSP 1969 to 1973', annualPercentageFee: 0.95 },
        { id: 235, name: 'Guild Retirement Fund Building', annualPercentageFee: 1.13 },
        { id: 236, name: 'CCA Future Directions High Growth', annualPercentageFee: 0.73 },
        { id: 237, name: 'Mercer WGSP 1974 to 1978', annualPercentageFee: 0.95 },
        { id: 238, name: 'Mercer WGSP 1979 to 1983', annualPercentageFee: 0.95 },
        { id: 239, name: 'Mercer WGSP 1984 to 1988', annualPercentageFee: 0.95 },
        { id: 240, name: 'Aon 51', annualPercentageFee: 0.92 },
        { id: 241, name: 'ANZ Smart Choice SuperFor QBE employees 1970s', annualPercentageFee: 0.54 },
        { id: 242, name: 'Telstra Super Growth', annualPercentageFee: 1.09 },
        { id: 243, name: 'Mercer WGSP 1989 to 1993', annualPercentageFee: 0.95 },
        { id: 244, name: 'Mercer WGSP 1994 to 1998', annualPercentageFee: 0.95 },
        { id: 245, name: 'United Technologies Corporation Retirement Plan Balanced', annualPercentageFee: 1.21 },
        { id: 246, name: 'ANZ Smart Choice Super 1970s', annualPercentageFee: 0.6 },
        { id: 247, name: 'BT Super for Life Employer Super 2000s', annualPercentageFee: 1.19 },
        { id: 248, name: 'Water Corporation Super Plan Growth', annualPercentageFee: 0.97 },
        { id: 249, name: 'The Executive Super MyLife', annualPercentageFee: 1.08 },
        { id: 250, name: 'BT Super for Life Employer Super 1960s', annualPercentageFee: 1.19 },
        { id: 251, name: 'Mercer SmartPath 1964 to 1968', annualPercentageFee: 1.36 },
        { id: 252, name: 'Mercer SmartPath 1969 to 1973', annualPercentageFee: 1.36 },
        { id: 253, name: 'Aon 50', annualPercentageFee: 0.92 },
        { id: 254, name: 'Virgin Super Essentials Tracker Balanced 40S Mix', annualPercentageFee: 1.11 },
        { id: 255, name: 'Mercer WGSP 1999 to 2003', annualPercentageFee: 0.95 },
        { id: 256, name: 'Mercer SmartPath 1974 to 1978', annualPercentageFee: 1.36 },
        { id: 257, name: 'Mercer SmartPath 1979 to 1983', annualPercentageFee: 1.36 },
        { id: 258, name: 'Mercer SmartPath 1984 to 1988', annualPercentageFee: 1.36 },
        { id: 259, name: 'Colonial First State FirstChoice Superannuation Trust 196064', annualPercentageFee: 1.12 },
        { id: 260, name: 'Anglican National ANS RIL Balanced', annualPercentageFee: 1 },
        { id: 261, name: 'Mercer SmartPath 1989 to 1993', annualPercentageFee: 1.36 },
        { id: 262, name: 'Mercer SmartPath 1994 to 1998', annualPercentageFee: 1.36 },
        { id: 263, name: 'Betros Bros Super No 2', annualPercentageFee: 1.07 },
        { id: 264, name: 'ANZ Smart Choice SuperFor QBE employees 1980s', annualPercentageFee: 0.54 },
        { id: 265, name: 'Westpac Group Plan 1970s', annualPercentageFee: 0.74 },
        { id: 266, name: 'ANZ Smart Choice Super 1980s', annualPercentageFee: 0.6 },
        { id: 267, name: 'EquitySuper', annualPercentageFee: 1.35 },
        { id: 268, name: 'ANZ Smart Choice SuperFor QBE employees 1990s', annualPercentageFee: 0.54 },
        { id: 269, name: 'Aon 49', annualPercentageFee: 0.92 },
        { id: 270, name: 'ANZ Smart Choice Super 1990s', annualPercentageFee: 0.6 },
        { id: 271, name: 'LESF Super', annualPercentageFee: 1.32 },
        { id: 272, name: 'Lutheran Super Balanced Compliant', annualPercentageFee: 0.89 },
        { id: 273, name: 'Mercer SmartPath 1999 to 2003', annualPercentageFee: 1.36 },
        { id: 274, name: 'BT Business 1960s', annualPercentageFee: 1.19 },
        { id: 275, name: 'Westpac Group Plan 1980s', annualPercentageFee: 0.74 },
        { id: 276, name: 'Aon 48', annualPercentageFee: 0.92 },
        { id: 277, name: 'BT Super for Life Employer Super 1970s', annualPercentageFee: 1.19 },
        { id: 278, name: 'Westpac Group Plan 1990s', annualPercentageFee: 0.74 },
        { id: 279, name: 'Australian Catholic Super and Retirement Balanced', annualPercentageFee: 0.95 },
        { id: 280, name: 'Aon 47', annualPercentageFee: 0.92 },
        { id: 281, name: 'Elphinstone Group Super Balanced', annualPercentageFee: 1.21 },
        { id: 282, name: 'BT Super for Life Employer Super 1980s', annualPercentageFee: 1.19 },
        { id: 283, name: 'BT Super for Life Employer Super 1990s', annualPercentageFee: 1.19 },
        { id: 284, name: 'BT Business 2000s', annualPercentageFee: 1.2 },
        { id: 285, name: 'Colonial First State FirstChoice Superannuation Trust 196569', annualPercentageFee: 1.12 },
        { id: 286, name: 'Aon 46', annualPercentageFee: 0.92 },
        { id: 287, name: 'Virgin Super Essentials Tracker Balanced Under 40S Mix', annualPercentageFee: 1.11 },
        { id: 288, name: 'Colonial First State FirstChoice Superannuation Trust 197074', annualPercentageFee: 1.12 },
        { id: 289, name: 'Colonial First State FirstChoice Superannuation Trust 199599', annualPercentageFee: 1.12 },
        { id: 290, name: 'BT Business 1970s', annualPercentageFee: 1.2 },
        { id: 291, name: 'Colonial First State FirstChoice Superannuation Trust 198589', annualPercentageFee: 1.12 },
        { id: 292, name: 'Colonial First State FirstChoice Superannuation Trust 197579', annualPercentageFee: 1.12 },
        { id: 293, name: 'Colonial First State FirstChoice Superannuation Trust 198084', annualPercentageFee: 1.12 },
        { id: 294, name: 'Aon 45', annualPercentageFee: 0.92 },
        { id: 295, name: 'Colonial First State FirstChoice Superannuation Trust 199094', annualPercentageFee: 1.12 },
        { id: 296, name: 'Aon 44', annualPercentageFee: 0.92 },
        { id: 297, name: 'The Victorian Independent Schools Super VISSF Balanced', annualPercentageFee: 0.92 },
        { id: 298, name: 'BT Business 1990s', annualPercentageFee: 1.2 },
        { id: 299, name: 'BT Business 1980s', annualPercentageFee: 1.2 },
        { id: 300, name: 'Aon 43', annualPercentageFee: 0.92 },
        { id: 301, name: 'Anglican National ANS RIL Growth', annualPercentageFee: 1.09 },
        { id: 302, name: 'Aon High Growth', annualPercentageFee: 0.92 },
        { id: 303, name: 'Anglican National ANS RIL High Growth', annualPercentageFee: 1.19 }
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

    var specifiedFundA = sfcObj.specifiedFundA;

    var specifiedFundB = sfcObj.specifiedFundB;

    var specifiedAnnualPercFeeA = sfcObj.specifiedAnnualPercFeeA;

    var specifiedAnnualPercFeeB = sfcObj.specifiedAnnualPercFeeB;

    var specifiedAdminFeeA = sfcObj.specifiedAdminFeeA;

    var specifiedAdminFeeB = sfcObj.specifiedAdminFeeB;

    var specifiedIndirectCostA = sfcObj.specifiedIndirectCostA;

    var specifiedIndirectCostB = sfcObj.specifiedIndirectCostB;

    var specifiedNameA = sfcObj.specifiedNameA;

    var specifiedNameB = sfcObj.specifiedNameB;

    var fundIndexA = sfcObj.fundIndexA;

    var fundIndexB = sfcObj.fundIndexB;

    var superTaxRate = 15;

    $scope.fundA;

    $scope.fundB;

    $scope.chartOneOpen = true;

    if (!specifiedFundA) {
        $scope.fundA = $scope.fundsOb[fundIndexA];
    } else {
        $scope.fundA = {
            name: specifiedNameA,
            annualPercentageFee: specifiedAnnualPercFeeA,
            adminFee: specifiedAdminFeeA,
            indirectCostRation: specifiedIndirectCostA
        };
    }

    if (!specifiedFundB) {
        $scope.fundB = $scope.fundsOb[fundIndexB];
    } else {
        $scope.fundB = {
            name: specifiedNameB,
            annualPercentageFee: specifiedAnnualPercFeeB,
            adminFee: specifiedAdminFeeB,
            indirectCostRation: specifiedIndirectCostB
        };
    }



    function fundCalculation(fundReturn, fundFee, fundFound) {

        var year = 0;

        var yearLimit = retirementAge - age;

        var cpi;

        var adjustedSalary, netContribution, earning, taxation, drawdown, fAndI, balance, balanceCpi, paymentFactor, ageL;

        var count = 0;

        ageL = age;

        var balanceArray = [superBalance];

        var biArray = [];

        for (count = 0; count <= yearLimit; count++) {
            cpi = Math.pow(1 + (inflation / 100), year);
            adjustedSalary = annualSalary * Math.pow(1 + (wageIncrease / 100), year);
            netContribution = (adjustedSalary * employerContributionLevel / 100 + cc) * (1 - superTaxRate / 100) + ncc;
            earnings = balanceArray[count] * (Math.pow(1 + (fundReturn / 100), 0.5) - 1) + ((balanceArray[count] * Math.pow(1 + (fundReturn / 100), 0.5) + netContribution) * (Math.pow(1 + (fundReturn / 100), 0.5) - 1));
            
            if (fundFee.annualPercentageFee > 100) {
                fees = fundFee.annualPercentageFee;
            } else {
                if (!fundFound) {
                    fees = balanceArray[count] * (fundFee.annualPercentageFee / 100);
                } else {
                    fees = (balanceArray[count] * ((fundFee.annualPercentageFee / 100) + (fundFee.indirectCostRation / 100))) + fundFee.adminFee;
                }
            }
            console.log("fundFound:",fundFound);
            console.log("fees:",fees);
            console.log("fundFee.annualPercentageFee:",fundFee.annualPercentageFee);
            tax = (earnings - insurancePremium - fees) * superTaxRate / 100;
            balance = balanceArray[count] + netContribution + earnings - fees - insurancePremium - tax;

            balanceCpi = 1 / cpi;

            balanceIndexed = balance * balanceCpi;

            balanceArray.push(balance);

            biArray.push(balanceIndexed);

            year++;

        }

        return biArray.slice(-1)[0];
    }

    function calculateFinal() {

        $scope.resultFundOne = fundCalculation(netReturnRate, $scope.fundA, specifiedFundA);

        $scope.resultFundTwo = fundCalculation(netReturnRate, $scope.fundB, specifiedFundB);

        if ($scope.resultFundTwo > $scope.resultFundOne) {
            $scope.savings = $scope.resultFundTwo - $scope.resultFundOne;
            $scope.savingsName = $scope.fundB.name;
        } else {
            $scope.savings = $scope.resultFundOne - $scope.resultFundTwo;
            $scope.savingsName = $scope.fundA.name;
        }

        ChartServiceHc.createChart("#container", Number($scope.resultFundOne.toFixed(2)), Number($scope.resultFundTwo.toFixed(2)), Number($scope.savings.toFixed(2)), false);

    }

    calculateFinal();



}]);
