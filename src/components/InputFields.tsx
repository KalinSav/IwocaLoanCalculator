import { useState, useEffect } from "react";
import InputBlock from "./InputBlock";
import LoanInputData from "../shared/types";
import getLoanCalculation from "./getLoanCalculation";

interface InputFieldsInterface {
  loanInputData: LoanInputData;
  setLoanInputData: React.Dispatch<
    React.SetStateAction<{
      amountRequested: number;
      loanDuration: number;
      interestRate: number;
      loanType: string;
    }>
  >;
  setCalculatedLoanData: React.Dispatch<
    React.SetStateAction<LoanInputData | undefined>
  >;
}

const InputFields = ({
  loanInputData,
  setLoanInputData,
  setCalculatedLoanData
}: InputFieldsInterface) => {
  const [amountRequested, setAmountRequested] = useState(0);
  const [loanDuration, setLoanDuration] = useState(0);
  const [interestRate, setInterestRate] = useState(0);

  useEffect(() => {
    setLoanInputData({
      ...loanInputData,
      amountRequested: amountRequested,
      loanDuration: loanDuration,
      interestRate: interestRate
    });
  }, [amountRequested, loanDuration, interestRate]);

  useEffect(() => {
    setCalculatedLoanData(getLoanCalculation(loanInputData));
  }, [loanInputData]);

  return (
    <>
      <InputBlock
        name={"Amount requested"}
        additionalText={"(in £)"}
        loanDataProperty={amountRequested}
        setLoanDataProperty={setAmountRequested}
      />
      <InputBlock
        name={"Duration"}
        additionalText={"(in months)"}
        loanDataProperty={loanDuration}
        setLoanDataProperty={setLoanDuration}
      />
      <InputBlock
        name={"Interest rate"}
        additionalText={"(in %)"}
        loanDataProperty={interestRate}
        setLoanDataProperty={setInterestRate}
      />
    </>
  );
};

export default InputFields;
