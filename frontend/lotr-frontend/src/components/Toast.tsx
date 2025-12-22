interface IToast {
  type: "alert-info" | "alert-success";
}

const Toast = ({ type }: IToast) => {
  return (
    <div className="toast toast-center">
      <div className={`alert ${type}`}>
        <span>New mail arrived.</span>
      </div>
    </div>
  );
};

export default Toast;
