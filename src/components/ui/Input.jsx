import SearchIcon from "../../assets/icons/Search-Icon.svg?react";

function Input({
  variant = "form", // "form" | "search"
  value,
  onChange,
  placeholder,
  name,
  id,
  type = "text",
  disabled = false,
  autoComplete,
  className = "",
  ...props
}) {
  const isSearch = variant === "search";

  const finalPlaceholder = isSearch
    ? "Recherchez une mission, une compétence, ..."
    : placeholder;

  return (
    <div className={`input ${isSearch ? "input-search" : "input-form"} ${className}`}>
      {isSearch && <SearchIcon className="input-icon" aria-hidden="true" />}

      <input
        id={id}
        name={name}
        type={isSearch ? "search" : type}
        value={value}
        onChange={onChange}
        placeholder={finalPlaceholder}
        disabled={disabled}
        autoComplete={autoComplete}
        className="input-field"
        {...props}
      />
    </div>
  );
}

export default Input;
