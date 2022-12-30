import ClassNames from "classnames";

const Button = ({ type, onClick, buttonText, styles = "" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={ClassNames(
        "bg-blue-700 hover:bg-blue-800 text-white font-medium text-sm px-5 py-3 text-center rounded-lg mt-4 w-full",
        styles
      )}
    >
      {buttonText}
    </button>
  );
};

export default Button;
