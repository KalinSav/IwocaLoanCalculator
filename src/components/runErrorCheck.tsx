const between = (x, min, max) => {
  if (x >= min && x <= max) {
    return true;
  } else {
    return false;
  }
};

const runErrorCheck = async (data, restructions) => {
  let calculatorRestrictions = restructions;
  // await fetch("https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9")
  //   .then((response) => response.json())
  //   .then((data) => {
  //     calculatorRestrictions = data;
  //   });
  if (data.loanType === "REVOLVING") {
    if (
      between(
        data.amountRequested,
        calculatorRestrictions.revolving_credit_facility.amount_min,
        calculatorRestrictions.revolving_credit_facility.amount_max
      ) &&
      between(
        data.loanDuration,
        calculatorRestrictions.revolving_credit_facility.duration_min,
        calculatorRestrictions.revolving_credit_facility.duration_max
      )
    ) {
      return true;
    } else {
      return false;
    }
  } else if (data.loanType === "BUSINESS") {
    if (
      between(
        data.amountRequested,
        calculatorRestrictions.business_loan.amount_min,
        calculatorRestrictions.business_loan.amount_max
      ) &&
      between(
        data.loanDuration,
        calculatorRestrictions.business_loan.duration_min,
        calculatorRestrictions.business_loan.duration_max
      )
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
};

export default runErrorCheck;
