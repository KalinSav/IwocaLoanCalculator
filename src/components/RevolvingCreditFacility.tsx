import Calculate from "./Calculate";
import CalculatedLoanData from "../shared/types";

const RevolvingCreditFacility = ({
  calculatedLoanData
}: CalculatedLoanData) => {
  return Calculate(calculatedLoanData);
};

export default RevolvingCreditFacility;
