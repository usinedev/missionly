function Button({
  children,
  variant = "primary",
  size = "big",
  Icon = null,
  iconPosition = "left",
  type = "button",
  onClick,
  disabled = false,
  ...props
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${variant} btn-${size}`}
      {...props}
    >
      {Icon && iconPosition === "left" && (
        <Icon className="btn-icon" />
      )}

      {children && (
        <span className="btn-label">{children}</span>
      )}

      {Icon && iconPosition === "right" && (
        <Icon className="btn-icon" />
      )}
    </button>
  )
}

export default Button
