import "./styles.css";
import { useState, useEffect } from "react";
import InputFields from "./components/InputFields";
import RevolvingCreditFacility from "./components/RevolvingCreditFacility";
import BusinessLoan from "./components/BusinessLoan";
import runErrorCheck from "./components/runErrorCheck";
import LoanInputData from "./shared/types";
import CalculatedLoanData from "./shared/types";

const REVOLVING = "REVOLVING";
const BUSINESS = "BUSINESS";

export default function App() {
  const [loanRestrictions, setLoanRestrictions] = useState({
    revolving_credit_facility: [],
    business_loan: []
  });
  const [calculatedLoanData, setCalculatedLoanData] = useState<
    CalculatedLoanData
  >();
  const [calculatedBusinessLoanData, setCalculatedBusinessLoanData] = useState<
    CalculatedLoanData
  >();

  const [loanInputData, setLoanInputData] = useState({
    amountRequested: 0,
    loanDuration: 0,
    interestRate: 0,
    loanType: REVOLVING
  });

  const [businessLoanInputData, setBusinessLoanInputData] = useState({
    amountRequested: 0,
    loanDuration: 0,
    interestRate: 0,
    loanType: BUSINESS
  });

  const between = (x, min, max) => {
    if (x >= min && x <= max) {
      return true;
    } else {
      return false;
    }
  };

  async function fetchData() {
    try {
      const response = await fetch(
        "https://www.mocky.io/v2/5d4aa9e93300006f000f5ea9"
      );
      const json = await response.json();
      return json;
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    fetchData().then((restrictions) => setLoanRestrictions(restrictions));
  }, []);

  useEffect(() => {
    if (
      between(
        loanInputData.amountRequested,
        loanRestrictions?.revolving_credit_facility?.amount_min,
        loanRestrictions?.revolving_credit_facility?.amount_max
      ) &&
      between(
        loanInputData.loanDuration,
        loanRestrictions?.revolving_credit_facility?.duration_min,
        loanRestrictions?.revolving_credit_facility?.duration_max
      )
    ) {
      setCalculatedLoanData(calculatedLoanData);
    } else {
      setLoanInputData({
        amountRequested: 0,
        loanDuration: 0,
        interestRate: 0,
        loanType: REVOLVING
      });
      // alert("The values you have entered are not valid for this type of loan");
    }
  }, [calculatedLoanData]);

  useEffect(() => {
    if (
      between(
        businessLoanInputData.amountRequested,
        loanRestrictions?.business_loan?.amount_min,
        loanRestrictions?.business_loan?.amount_max
      ) &&
      between(
        businessLoanInputData.loanDuration,
        loanRestrictions?.business_loan?.duration_min,
        loanRestrictions?.business_loan?.duration_max
      )
    ) {
      setCalculatedBusinessLoanData(calculatedBusinessLoanData);
    } else {
      setBusinessLoanInputData({
        amountRequested: 0,
        loanDuration: 0,
        interestRate: 0,
        loanType: BUSINESS
      });
      // alert("The values you have entered are not valid for this type of loan");
    }
  }, [calculatedBusinessLoanData]);

  return (
    <div className="App">
      <h1>Iwoca Loan Calculator</h1>
      <br />
      <h2>Revolving Credit Facility</h2>
      <div className="grid-container revolvingCreditFacility">
        <InputFields
          loanInputData={loanInputData}
          setLoanInputData={setLoanInputData}
          setCalculatedLoanData={setCalculatedLoanData}
        />
        <RevolvingCreditFacility calculatedLoanData={calculatedLoanData} />
      </div>

      <h2>Business Loan</h2>
      <div className="grid-container businessLoan">
        <InputFields
          loanInputData={businessLoanInputData}
          setLoanInputData={setBusinessLoanInputData}
          setCalculatedLoanData={setCalculatedBusinessLoanData}
        />
        <BusinessLoan calculatedBusinessLoanData={calculatedBusinessLoanData} />
      </div>
    </div>
  );
}
