import { Button } from "../../components/";
import { FormProps } from "../../interfaces/";
import "./index.css";

const InputForm = ({ onSubmit, handleEmail, handlePassword }: FormProps) => {
  return (
    <form onSubmit={onSubmit}>
      <div className="input-container">
        <input type="mail" onChange={handleEmail} required />
        <label>Username</label>
      </div>
      <div className="input-container">
        <input type="password" onChange={handlePassword} required />
        <label>Password</label>
      </div>
      <Button text="Submit" />
    </form>
  );
};

export default InputForm;
