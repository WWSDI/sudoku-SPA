import "./Button.css";

export const Button = ({ num }) => {
  return (
    <div className="Button" num={num}>
      {num}
    </div>
  );
};
