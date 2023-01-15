import ClassNames from "classnames";
import Spinner from "../Spinner";

const Button = ({ type, onClick, buttonText, disabled, styles = "" }) => {
  return (
    <button
      disabled={disabled}
      type={type}
      onClick={onClick}
      className={ClassNames(
        "bg-blue-700 text-white font-medium text-sm px-5 py-3 text-center rounded-lg mt-4 w-full",
        disabled ? "bg-gray-400 cursor-not-allowed" : "hover:bg-blue-800",
        styles
      )}
    >
      {disabled ? <Spinner /> : buttonText}
    </button>
  );
};

export default Button;
