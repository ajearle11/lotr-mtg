interface IToast {
  type: "alert-info" | "alert-success";
  selectedCards: number[];
}

const Toast = ({ type, selectedCards }: IToast) => {
  return (
    <div className="toast toast-center">
      <div className={`alert ${type}`}>
        <span>
          Selected {selectedCards.length}{" "}
          {selectedCards.length === 1 ? "card" : "cards"}
        </span>
        <button className="btn btn-neutral">Update</button>
      </div>
    </div>
  );
};

export default Toast;
