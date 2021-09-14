import CalculatedLoanData from "../shared/types";

const calculateDates = (numberOfMonths: number) => {
  const addMonths = (date: Date, months: number) => {
    const d = date.getDate();
    date.setMonth(date.getMonth() + +months);
    if (date.getDate() != d) {
      date.setDate(0);
    }
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const today = new Date();
  const dd = String(today.getDate()).padStart(2, "0");
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const yyyy = today.getFullYear();

  return addMonths(new Date(yyyy, mm, dd), numberOfMonths).toString();
};

const Calculate = (data: CalculatedLoanData) => {
  const principalRepayments = data?.principalRepayments;
  const interestRepayments = data?.interestRepayments;
  const totalRepayments = data?.totalRepayments;
  const amountRequested = data?.amountRequested;
  let mapTableRow;

  const tableData = [];
  let totalInterestRepayments = 0;
  let totalCombinedRepayments = 0;
  for (let i = 0; i < principalRepayments?.length; i++) {
    const paymentDate = calculateDates(i);

    let tableRow = [
      paymentDate,
      principalRepayments[i],
      interestRepayments[i],
      totalRepayments[i]
    ];
    tableData.push(tableRow);

    totalInterestRepayments = totalInterestRepayments + interestRepayments[i];
    totalCombinedRepayments = totalCombinedRepayments + totalRepayments[i];
  }

  tableData.push([
    "Total",
    amountRequested,
    totalInterestRepayments,
    totalCombinedRepayments
  ]);

  mapTableRow = tableData.map((nested) => (
    <div key={nested[1]} className="tableRow">
      {nested.map((item, index) => (
        <div key={item}>{item}</div>
      ))}
    </div>
  ));

  return (
    <div className="calculatorTable">
      <div className="loanBreakdownTable">
        <div className="tableRow">
          <div className="tableTitle">Repayment date</div>
          <div className="tableTitle">Principal</div>
          <div className="tableTitle">Interest</div>
          <div className="tableTitle">Total repayment</div>
        </div>
        {mapTableRow}
      </div>
    </div>
  );
};

export default Calculate;
