type Variant = "primary" | "secondary" | "danger";

type Props = {
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  text: string;
  className?: string;
};

const Button = ({
  onClick,
  type = "button",
  variant = "primary",
  text = "",
  className = "",
}: Props) => {
  const base = "px-4 py-2 rounded text-white transition";

  const styles = {
    primary: "bg-blue-600 hover:bg-blue-700",
    secondary: "bg-gray-400 hover:bg-gray-500",
    danger: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${styles[variant]} ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
