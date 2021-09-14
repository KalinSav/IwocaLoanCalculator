interface InputBlockInterface {
  name: string;
  additionalText: string;
  loanDataProperty: number;
  setLoanDataProperty: React.Dispatch<React.SetStateAction<number>>;
}

const InputBlock = ({
  name,
  additionalText,
  loanDataProperty,
  setLoanDataProperty
}: InputBlockInterface) => (
  <div className="inputItem">
    <div>{name}</div>
    <div>
      <input
        onChange={(e) => setLoanDataProperty(Number(e.target.value))}
        value={loanDataProperty}
      />
    </div>
    <div>{additionalText}</div>
  </div>
);

export default InputBlock;
