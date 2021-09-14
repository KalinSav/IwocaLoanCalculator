import Calculate from "./Calculate";
import CalculatedLoanData from "../shared/types";

const BusinessLoan = ({ calculatedBusinessLoanData }: CalculatedLoanData) => {
  return Calculate(calculatedBusinessLoanData);
};

export default BusinessLoan;
