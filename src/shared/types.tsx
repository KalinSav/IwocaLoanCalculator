export default interface LoanInputData {
  amountRequested: number;
  loanDuration: number;
  interestRate: number;
  loanType: string;
}

export default interface CalculatedLoanData {
  principalRepayments: number[];
  interestRepayments: number[];
  totalRepayments: number[];
  amountRequested: number;
  totalInterestRepayments: number;
  totalCombinedRepayments: number;
}
