import { Fragment } from "react/jsx-runtime";
import type { TField, TFormButton } from "../types";

interface IForm {
  title: string;
  fields: Array<TField>;
  buttons: Array<TFormButton>;
}

const Form = ({ title, fields, buttons }: IForm) => {
  return (
    <fieldset className="fieldset rounded-box w-xs border border-[#666] p-4">
      <legend className="fieldset-legend">{title}</legend>

      {fields.map((f, i) => {
        return (
          <Fragment key={i}>
            <label className="label">{f.label}</label>
            <input
              type={f.type}
              className="input mb-2"
              placeholder={f.placeholder}
            />
          </Fragment>
        );
      })}

      {buttons.map((b, i) => {
        return (
          <button key={i} onClick={b.onClick} className="btn btn-primary mt-4">
            {b.title}
          </button>
        );
      })}
    </fieldset>
  );
};

export default Form;
