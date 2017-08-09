var FactFindSchema = new mongooseSchema({
    user: {
        type: mongooseSchema.ObjectId,
        ref: 'User'
    },
    pdfFile: {
        type: String
    },
    docFile: {
        type: String
    },
    healthOption: {
        type: String,
        default: 'Excellent'
    },
    spouseOption: {
        type: String,
        default: 'No'
    },
    diseaseOption: {
        type: String,
        default: 'Yes'
    },
    hospitalCoverOption: {
        type: String,
        default: 'Full Cover'
    },
    willOption: {
        type: String,
        default: 'No'
    },
    spouseDetails_firstName: {
        type: String,
        default: 'Rachel'
    },
    spouseDetails_lastName: {
        type: String,
        default: 'Payne'
    },
    genderOptionSpouse: {
        type: String,
        default: 'Female'
    },
    dobSpouse: {
        type: String,
        default: 'Sun Jan 01 1984 04: 09: 09 GMT + 0530(IST)'
    },
    spouseDetails_mobile: {
        type: String,
        default: '4123333333'
    },
    fy: {
        type: String,
        default: '2016'
    },
    annualSalary: {
        type: String,
        default: '$260,000'
    },
    grossAnnualIncome: {
        type: String,
        default: '$120,000'
    },
    superBalance: {
        type: String,
        default: '$100,000'
    },
    cashAtBank: {
        type: String,
        default: '$20,000'
    },
    salarySacrifice: {
        type: String,
        default: '$10,384'
    },
    ncc: {
        type: String,
        default: '$10,000'
    },
    superTaxRate: {
        type: String,
        default: '15.00%'
    },
    thp: {
        type: String,
        default: '$45,000'
    },
    insurancePremium: {
        type: String,
        default: '$0'
    },
    investmentReturn: {
        type: String,
        default: '$5,000'
    },
    variableFee: {
        type: String,
        default: '1.11%'
    },
    fixedFee: {
        type: String,
        default: '$300'
    },
    employerContributionLevel: {
        type: String,
        default: '9.50%'
    },
    inflation: {
        type: String,
        default: '2%'
    },
    wageIncrease: {
        type: String,
        default: '4.00%'
    },
    rateOfReturn: {
        type: String,
        default: '5%'
    },
    retirementAge: {
        type: String,
        default: '65'
    },
    pensionStart: {
        type: String,
        default: '57'
    },
    showPensionOption: {
        type: String,
        default: 'Select Your Own Value'
    },
    pensionDrawdownBase: {
        type: String,
        default: '$40,000'
    },
    target: {
        type: String,
        default: '$40,000'
    },
    annualSalarySpouse: {
        type: String,
        default: '$90,000'
    },
    superBalanceSpouse: {
        type: String,
        default: '$200,000'
    },
    salarySacrificeSpouse: {
        type: String,
        default: '$5,000'
    },
    insurancePremiumSpouse: {
        type: String,
        default: '$0'
    },
    investmentReturnSpouse: {
        type: String,
        default: '5.30%'
    },
    variableFeeSpouse: {
        type: String,
        default: '1.11%'
    },
    fixedFeeSpouse: {
        type: String,
        default: '$300'
    },
    employerContributionLevelSpouse: {
        type: String,
        default: '9.50%'
    },
    inflationSpouse: {
        type: String,
        default: '3.50%'
    },
    wageIncreaseSpouse: {
        type: String,
        default: '4.00%'
    },
    retirementAgeSpouse: {
        type: String,
        default: '70'
    },
    pensionStartSpouse: {
        type: String,
        default: '65'
    },
    showPensionOptionSpouse: {
        type: String,
        default: 'Minimum Pension Only'
    },
    pensionDrawdownBaseSpouse: {
        type: String,
        default: '$30,000'
    },
    spFundAType: {
        type: String,
        default: 'MySuper Fund'
    },
    spFundBType: {
        type: String,
        default: 'MySuper Fund'
    },
    spFundAName: {
        type: String,
        default: 'Asgard Infinity Ewrap Super'
    },
    spFundBName: {
        type: String,
        default: 'ING Direct Living Super'
    },
    netReturn: {
        type: String,
        default: '2.9'
    },
    fundNameA: {
        type: String,
        default: 'Fund A'
    },
    contributionFeeA: {
        type: String,
        default: '1.50%'
    },
    adminFeeA: {
        type: String,
        default: '$100'
    },
    indirectCostRationA: {
        type: String,
        default: '1.50%'
    },
    fundNameB: {
        type: String,
        default: 'Fund B'
    },
    contributionFeeB: {
        type: String,
        default: '1.50%"'
    },
    adminFeeB: {
        type: String,
        default: '$100'
    },
    indirectCostRationB: {
        type: String,
        default: '1.50%'
    },
    homeMortgage: {
        type: String,
        default: '$500,000'
    },
    investmentPropertyMortgage: {
        type: String,
        default: '$0'
    },
    creditCardDebt: {
        type: String,
        default: '$2,000'
    },
    carLoan: {
        type: String,
        default: '$20,000'
    },
    personalLoan: {
        type: String,
        default: '$0'
    },
    otherLoan: {
        type: String,
        default: '$0'
    },
    numChildren: {
        type: String,
        default: '2'
    },
    ageChildren1: {
        type: String,
        default: '3'
    },
    ageChildren2: {
        type: String,
        default: '5'
    },
    ageChildren3: {
        type: String,
        default: '10'
    },
    ageChildren4: {
        type: String,
        default: '10'
    },
    ageChildren5: {
        type: String,
        default: '10'
    },
    funeralCost: {
        type: String,
        default: '$20,000'
    },
    spEducationOption: {
        type: String,
        default: '$5,000'
    },
    spState: {
        type: String,
        default: '$90,000'
    },
    spSchoolType: {
        type: String,
        default: '$250,000'
    },
    spSchoolName: {
        type: String,
        default: '$0'
    },
    educationExpensePerYearPerChild: {
        type: String,
        default: '$0'
    },
    familyLivingCostPerYear: {
        type: String,
        default: '$0'
    },
    buyOption: {
        type: String,
        default: '10'
    },
    valueOfNewProperty: {
        type: String,
        default: '$800,000'
    },
    moneyToBeBorrowed: {
        type: String,
        default: '$50,000'
    },
    ecLife: {
        type: String,
        default: '$0'
    },
    ecTPD: {
        type: String,
        default: '$2,000'
    },
    ecIP: {
        type: String,
        default: '$20,000'
    },
    ecTrauma: {
        type: String,
        default: '$0'
    },
    sickLeaves: {
        type: String,
        default: '$0'
    },
    lifeOption: {
        type: String,
        default: '$60,000'
    },
    homeValue: {
        type: String,
        default: '$20,000'
    },
    homeContents: {
        type: String,
        default: '$0'
    },
    vehicleCost: {
        type: String,
        default: '$0'
    },
    investmentProperty: {
        type: String,
        default: '$0'
    },
    bankAssets: {
        type: String,
        default: '6%'
    },
    listedInvestment: {
        type: String,
        default: '2%'
    },
    marginLoans: {
        type: String,
        default: '7%'
    },
    allocatedPension: {
        type: String,
        default: '$50,000'
    },
    otherInvestment: {
        type: String,
        default: '$50,000'
    },
    netRentalIncome: {
        type: String,
        default: '10%'
    },
    otherIncome: {
        type: String,
        default: '10%'
    },
    pensionIncome: {
        type: String,
        default: '10%'
    },
    nra: {
        type: String,
        default: '10%'
    },
    tfp: {
        type: String,
        default: '10%'
    },
    nrp: {
        type: String,
        default: '10%'
    },
    beforeTTR: {
        type: String,
        default: '10%'
    },
    cses: {
        type: String,
        default: '10%'
    },
    initialInvestmentAmount: {
        type: String,
        default: '20%'
    },
    australianShares1: {
        type: String,
        default: '100%'
    },
    internationalShares1: {
        type: String,
        default: 'No'
    },
    internationalSharesHedged1: {
        type: String,
        default: '5'
    },
    usShares1: {
        type: String,
        default: '10%'
    },
    australianBonds1: {
        type: String,
        default: '10%'
    },
    internationalBondsHedged1: {
        type: String,
        default: '10%'
    },
    cash1: {
        type: String,
        default: '10%'
    },
    australianListedProperty1: {
        type: String,
        default: '10%'
    },
    internationalListedProperty1: {
        type: String,
        default: '10%'
    },
    asset1Total: {
        type: String,
        default: '10%'
    },
    alterOption: {
        type: String,
        default: '10%'
    },
    alterYear: {
        type: String,
        default: '20%'
    },
    australianShares2: {
        type: String,
        default: '100%'
    },
    internationalShares2: {
        type: String,
        default: '2017'
    },
    internationalSharesHedged2: {
        type: String,
        default: '2017'
    },
    usShares2: {
        type: String,
        default: 'Conservative Cautious'
    },
    australianBonds2: {
        type: String,
        default: 'Max'
    },
    internationalBondsHedged2: {
        type: String,
        default: 'Yes'
    },
    cash2: {
        type: String,
        default: '2017'
    },
    australianListedProperty2: {
        type: String,
        default: '6'
    },
    internationalListedProperty2: {
        type: String,
        default: 'Major in Commerce'
    },
    asset2Total: {
        type: String,
        default: 'Monica'
    },
    begnYearInvestment: {
        type: String,
        default: 'Yes'
    },
    contStartYear: {
        type: String,
        default: '2017'
    },
    investmentReturnAmount: {
        type: String,
        default: '6'
    },
    spPort: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    c1Name: {
        type: String,
        default: 'Adele'
    },
    spStudyingOption1: {
        type: String,
        default: 'Yes'
    },
    schoolYear1: {
        type: String,
        default: '2017'
    },
    schoolDuration1: {
        type: String,
        default: '6'
    },
    schoolSelected1: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    majorSelected1: {
        type: String,
        default: 'Major in Commerce'
    },
    c2Name: {
        type: String,
        default: 'Rita'
    },
    spStudyingOption2: {
        type: String,
        default: 'Yes'
    },
    schoolYear2: {
        type: String,
        default: '2017'
    },
    schoolDuration2: {
        type: String,
        default: '6'
    },
    schoolSelected2: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    majorSelected2: {
        type: String,
        default: 'Major in Commerce'
    },
    c3Name: {
        type: String,
        default: 'Tom'
    },
    spStudyingOption3: {
        type: String,
        default: 'Yes'
    },
    schoolYear3: {
        type: String,
        default: '2017'
    },
    schoolDuration3: {
        type: String,
        default: '6'
    },
    schoolSelected3: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    majorSelected3: {
        type: String,
        default: 'Major in Commerce'
    },
    c4Name: {
        type: String,
        default: 'Select from the list of high schools in the living state.'
    },
    spStudyingOption4: {
        type: String,
        default: 'NSW'
    },
    schoolYear4: {
        type: String,
        default: 'Private School'
    },
    schoolDuration4: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    schoolSelected4: {
        type: String,
        default: 'Yes'
    },
    majorSelected4: {
        type: String,
        default: '$500,000'
    },
    c5Name: {
        type: String,
        default: '$400,000'
    },
    spStudyingOption5: {
        type: String,
        default: 'Sydney Grammar School Darlinghurst'
    },
    schoolYear5: {
        type: String,
        default: 'Major in Commerce'
    },
    schoolDuration5: {
        type: String,
        default: 'Yes'
    },
    schoolSelected5: {
        type: String,
        default: '$3000'
    },
    majorSelected5: {
        type: String,
        default: '$20,000'
    },
    goalBasedAdvice_0_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_1_severity: {
        type: String,
        default: 'Low'
    },
    goalBasedAdvice_2_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_3_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_4_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_5_severity: {
        type: String,
        default: 'Medium'
    },
    goalBasedAdvice_6_severity: {
        type: String,
        default: 'High'
    },
    goalBasedAdvice_7_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_8_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_9_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_10_severity: {
        type: String,
        default: 'false'
    },
    goalBasedAdvice_11_severity: {
        type: String,
        default: 'false'
    },
    houseOption: {
        type: String,
        default: 'Yes'
    },
    smokeOption: {
        type: String,
        default: 'No'
    },
    genderOption: {
        type: String,
        default: 'Male'
    },
    personalDetails_postalCode: {
        type: String,
        default: '1234'
    },
    spouseWorkOption: {
        type: String,
        default: 'Yes'
    },
    dayOfBirth: {
        type: String,
        default: '10'
    },
    monthOfBirth: {
        type: String,
        default: '10'
    },
    yearOfBirth: {
        type: String,
        default: '1985'
    },
    dayOfBirthSpouse: {
        type: String,
        default: '02'
    },
    monthOfBirthSpouse: {
        type: String,
        default: '05'
    },
    yearOfBirthSpouse: {
        type: String,
        default: '1987'
    },

});

var FactFind = mongoose.model('FactFind', FactFindSchema);
module.exports = FactFind;
