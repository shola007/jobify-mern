const FormRowSelect = ({ name, labelText, defaultValue, list, onChange }) => {
  return (
    <div className="form-row">
      <label htmlFor={name} className="form-label">
        {labelText}
      </label>
      <select
        className="form-select"
        id={name}
        name={name}
        defaultValue={defaultValue || ""}
        onChange={onChange}
      >
        {list.map((itemvalue) => {
          return (
            <option key={itemvalue} value={itemvalue}>
              {itemvalue}
            </option>
          );
        })}
      </select>
    </div>
  );
};
export default FormRowSelect;
