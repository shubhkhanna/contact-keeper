import ClassName from "classnames";

const InputField = ({ inputStyles, error, ...props }) => {
  return (
    <div className={ClassName("relative mt-5 w-full", inputStyles)}>
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        {props.icon}
      </div>

      <input
        {...props}
        className={ClassName(
          "bg-white ring-1 ring-gray-300 text-gray-900 text-sm rounded-lg focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 focus:outline-none block w-full pl-10 p-2.5 placeholder:text-sm",
          error ? "focus:ring-red-500" : "focus:ring-blue-500"
        )}
      />
    </div>
  );
};

export default InputField;
