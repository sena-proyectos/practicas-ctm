export const Form = ({ label, type, placeholder }) => {
  return (
    <form>
      <label>
        {label}
        <input type={type} placeholder={placeholder} autoComplete="off" />
      </label>
    </form>
  );
};

export const Section = ({ label, placeholder, option }) => {
  return (
    <form>
      <label>
        {label}
        <select placeholder={placeholder} autoComplete="off">
          {option.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </label>
    </form>
  );
};
