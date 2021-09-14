import LoanInputData from "../shared/types";

const getLoanCalculation = ({
  amountRequested,
  loanDuration,
  interestRate,
  loanType
}: LoanInputData) => {
  const isNumber = (value: any) => {
    return !isNaN(parseFloat(value)) && isFinite(value);
  };

  if (
    amountRequested > 0 &&
    isNumber(amountRequested) &&
    loanDuration > 0 &&
    isNumber(loanDuration) &&
    interestRate > 0 &&
    isNumber(interestRate)
  ) {
    const monthlyAmount = amountRequested / loanDuration;
    const principalRepayments = [];
    const interestRepayments = [];
    const totalRepayments = [];
    let amountLeftToPay = amountRequested;

    for (let i = 0; i < loanDuration; i++) {
      principalRepayments.push(Number(monthlyAmount.toFixed()));

      let interestRepayment;
      if (i === 0 && loanType === "BUSINESS") {
        interestRepayment =
          (amountLeftToPay * interestRate) / 100 + amountRequested * 0.1;
      } else {
        interestRepayment = (amountLeftToPay * interestRate) / 100;
      }

      amountLeftToPay = amountLeftToPay - monthlyAmount;

      interestRepayments.push(Number(interestRepayment.toFixed()));

      let totalRepayment = monthlyAmount + interestRepayment;
      totalRepayments.push(Number(totalRepayment.toFixed()));
    }

    const totalInterestRepayments = interestRepayments.reduce(
      (prevValue, currentValue) => prevValue + currentValue,
      0
    );

    const totalCombinedRepayments = amountRequested + totalInterestRepayments;
    return {
      principalRepayments,
      interestRepayments,
      totalRepayments,
      amountRequested,
      totalInterestRepayments,
      totalCombinedRepayments
    };
  }
};

export default getLoanCalculation;
