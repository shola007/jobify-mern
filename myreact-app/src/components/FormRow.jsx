const FormRow = (props) => {
  // eslint-disable-next-line react/prop-types
  const { type, name, defaultValue, labelText, onChange } = props;
  return (
    <div className="form-row">
      <label className="form-label" htmlFor={name}>
        {labelText}
      </label>
      <input
        type={type}
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
        required
        className="form-input"
      />
    </div>
  );
};
export default FormRow;
