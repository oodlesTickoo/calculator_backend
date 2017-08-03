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
        default: 'Goood'
    },
    spouseOption: {
        type: String
    },
    diseaseOption: {
        type: String
    },
    hospitalCoverOption: {
        type: String
    },
    willOption: {
        type: String
    },
    spouseDetails_firstName: {
        type: String
    },
    spouseDetails_lastName: {
        type: String
    },
    genderOptionSpouse: {
        type: String
    },
    dobSpouse: {
        type: String
    },
    spouseDetails_mobile: {
        type: String
    },
    fy: {
        type: String
    },
    annualSalary: {
        type: String
    },
    grossAnnualIncome: {
        type: String
    },
    superBalance: {
        type: String
    },
    cashAtBank: {
        type: String
    },
    salarySacrifice: {
        type: String
    },
    ncc: {
        type: String
    },
    superTaxRate: {
        type: String
    },
    thp: {
        type: String
    },
    insurancePremium: {
        type: String
    },
    investmentReturn: {
        type: String
    },
    variableFee: {
        type: String
    },
    fixedFee: {
        type: String
    },
    employerContributionLevel: {
        type: String
    },
    inflation: {
        type: String
    },
    wageIncrease: {
        type: String
    },
    rateOfReturn: {
        type: String
    },
    retirementAge: {
        type: String
    },
    pensionStart: {
        type: String
    },
    showPensionOption: {
        type: String
    },
    pensionDrawdownBase: {
        type: String
    },
    target: {
        type: String
    },
    annualSalarySpouse: {
        type: String
    },
    superBalanceSpouse: {
        type: String
    },
    salarySacrificeSpouse: {
        type: String
    },
    insurancePremiumSpouse: {
        type: String
    },
    investmentReturnSpouse: {
        type: String
    },
    variableFeeSpouse: {
        type: String
    },
    fixedFeeSpouse: {
        type: String
    },
    employerContributionLevelSpouse: {
        type: String
    },
    inflationSpouse: {
        type: String
    },
    wageIncreaseSpouse: {
        type: String
    },
    retirementAgeSpouse: {
        type: String
    },
    pensionStartSpouse: {
        type: String
    },
    showPensionOptionSpouse: {
        type: String
    },
    pensionDrawdownBaseSpouse: {
        type: String
    },
    spFundAType: {
        type: String
    },
    spFundBType: {
        type: String
    },
    spFundAName: {
        type: String
    },
    spFundBName: {
        type: String
    },
    netReturn: {
        type: String
    },
    fundNameA: {
        type: String
    },
    contributionFeeA: {
        type: String
    },
    adminFeeA: {
        type: String
    },
    indirectCostRationA: {
        type: String
    },
    fundNameB: {
        type: String
    },
    contributionFeeB: {
        type: String
    },
    adminFeeB: {
        type: String
    },
    indirectCostRationB: {
        type: String
    },
    homeMortgage: {
        type: String
    },
    investmentPropertyMortgage: {
        type: String
    },
    creditCardDebt: {
        type: String
    },
    carLoan: {
        type: String
    },
    personalLoan: {
        type: String
    },
    otherLoan: {
        type: String
    },
    numChildren: {
        type: String
    },
    ageChildren1: {
        type: String
    },
    ageChildren2: {
        type: String
    },
    ageChildren3: {
        type: String
    },
    ageChildren4: {
        type: String
    },
    ageChildren5: {
        type: String
    },
    funeralCost: {
        type: String
    },
    spEducationOption: {
        type: String
    },
    spState: {
        type: String
    },
    spSchoolType: {
        type: String
    },
    spSchoolName: {
        type: String
    },
    educationExpensePerYearPerChild: {
        type: String
    },
    familyLivingCostPerYear: {
        type: String
    },
    buyOption: {
        type: String
    },
    valueOfNewProperty: {
        type: String
    },
    moneyToBeBorrowed: {
        type: String
    },
    ecLife: {
        type: String
    },
    ecTPD: {
        type: String
    },
    ecIP: {
        type: String
    },
    ecTrauma: {
        type: String
    },
    sickLeaves: {
        type: String
    },
    lifeOption: {
        type: String
    },
    homeValue: {
        type: String
    },
    homeContents: {
        type: String
    },
    vehicleCost: {
        type: String
    },
    investmentProperty: {
        type: String
    },
    bankAssets: {
        type: String
    },
    listedInvestment: {
        type: String
    },
    marginLoans: {
        type: String
    },
    allocatedPension: {
        type: String
    },
    otherInvestment: {
        type: String
    },
    netRentalIncome: {
        type: String
    },
    otherIncome: {
        type: String
    },
    pensionIncome: {
        type: String
    },
    nra: {
        type: String
    },
    tfp: {
        type: String
    },
    nrp: {
        type: String
    },
    beforeTTR: {
        type: String
    },
    cses: {
        type: String
    },
    initialInvestmentAmount: {
        type: String
    },
    australianShares1: {
        type: String
    },
    internationalShares1: {
        type: String
    },
    internationalSharesHedged1: {
        type: String
    },
    usShares1: {
        type: String
    },
    australianBonds1: {
        type: String
    },
    internationalBondsHedged1: {
        type: String
    },
    cash1: {
        type: String
    },
    australianListedProperty1: {
        type: String
    },
    internationalListedProperty1: {
        type: String
    },
    asset1Total: {
        type: String
    },
    alterOption: {
        type: String
    },
    alterYear: {
        type: String
    },
    australianShares2: {
        type: String
    },
    internationalShares2: {
        type: String
    },
    internationalSharesHedged2: {
        type: String
    },
    usShares2: {
        type: String
    },
    australianBonds2: {
        type: String
    },
    internationalBondsHedged2: {
        type: String
    },
    cash2: {
        type: String
    },
    australianListedProperty2: {
        type: String
    },
    internationalListedProperty2: {
        type: String
    },
    asset2Total: {
        type: String
    },
    begnYearInvestment: {
        type: String
    },
    contStartYear: {
        type: String
    },
    investmentReturnAmount: {
        type: String
    },
    spPort: {
        type: String
    },
    c1Name: {
        type: String
    },
    spStudyingOption1: {
        type: String
    },
    schoolYear1: {
        type: String
    },
    schoolDuration1: {
        type: String
    },
    schoolSelected1: {
        type: String
    },
    majorSelected1: {
        type: String
    },
    c2Name: {
        type: String
    },
    spStudyingOption2: {
        type: String
    },
    schoolYear2: {
        type: String
    },
    schoolDuration2: {
        type: String
    },
    schoolSelected2: {
        type: String
    },
    majorSelected2: {
        type: String
    },
    c3Name: {
        type: String
    },
    spStudyingOption3: {
        type: String
    },
    schoolYear3: {
        type: String
    },
    schoolDuration3: {
        type: String
    },
    schoolSelected3: {
        type: String
    },
    majorSelected3: {
        type: String
    },
    c4Name: {
        type: String
    },
    spStudyingOption4: {
        type: String
    },
    schoolYear4: {
        type: String
    },
    schoolDuration4: {
        type: String
    },
    schoolSelected4: {
        type: String
    },
    majorSelected4: {
        type: String
    },
    c5Name: {
        type: String
    },
    spStudyingOption5: {
        type: String
    },
    schoolYear5: {
        type: String
    },
    schoolDuration5: {
        type: String
    },
    schoolSelected5: {
        type: String
    },
    majorSelected5: {
        type: String
    },
    goalBasedAdvice_0_severity: {
        type: String
    },
    goalBasedAdvice_1_severity: {
        type: String
    },
    goalBasedAdvice_2_severity: {
        type: String
    },
    goalBasedAdvice_3_severity: {
        type: String
    },
    goalBasedAdvice_4_severity: {
        type: String
    },
    goalBasedAdvice_5_severity: {
        type: String
    },
    goalBasedAdvice_6_severity: {
        type: String
    },
    goalBasedAdvice_7_severity: {
        type: String
    },
    goalBasedAdvice_8_severity: {
        type: String
    },
    goalBasedAdvice_9_severity: {
        type: String
    },
    goalBasedAdvice_10_severity: {
        type: String
    },
    goalBasedAdvice_11_severity: {
        type: String
    },
    houseOption: {
        type: String
    },
    smokeOption: {
        type: String
    },
    genderOption: {
        type: String
    },
    personalDetails_postalCode: {
        type: String
    },
    spouseWorkOption: {
        type: String
    },
    dayOfBirth: {
        type: String
    },
    monthOfBirth: {
        type: String
    },
    yearOfBirth: {
        type: String
    },
    dayOfBirthSpouse: {
        type: String
    },
    monthOfBirthSpouse: {
        type: String
    },
    yearOfBirthSpouse: {
        type: String
    },

});

var FactFind = mongoose.model('FactFind', FactFindSchema);
module.exports = FactFind;