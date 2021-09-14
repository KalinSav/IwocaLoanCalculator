const getLoanCalculation = require("./getLoanCalculation");

test("check that Revolving Credit Facility calculator receives amountRequested 10000, duration 4 and interestRate 3 and returns object with totalCombinedPayments 10750", () => {
  expect(
    getLoanCalculation({
      amountRequested: 10000,
      loanDuration: 4,
      interestRate: 3
    })
  ).toBe({
    principalRepayments: [2500, 2500, 2500, 2500],
    interestRepayments: [300, 225, 150, 75],
    totalRepayments: [2800, 2725, 2650, 2575],
    amountRequested: 10000,
    totalInterestRepayments: 750,
    totalCombinedRepayments: 10750
  });
});

test("check that Revolving Credit Facility calculator receives amountRequested 10000 and returns principal amounts that are equally 2500", () => {
  expect(
    getLoanCalculation({
      amountRequested: 10000,
      loanDuration: 4,
      interestRate: 3
    })
  ).toBe({ principalRepayments: [2500, 2500, 2500, 2500] });
});

test("check that Revolving Credit Facility calculator receives a negative amount and returns undefined", () => {
  expect(
    getLoanCalculation({
      amountRequested: 10000,
      loanDuration: -4,
      interestRate: 3
    })
  ).toBe(undefined);
});
