import "./Button.css";

export const Button = ({ id }: { id: number }) => {
  return (
    <div className="Button" id={String(id)}>
      {id}
    </div>
  );
};
