const Button = (props) => {
  return (
    <div className="flex justify-between mt-6">
      <button
        onClick={props.onSave}
        type="button"
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        {props.verde}
      </button>
      <button
        onClick={props.onCancel}
        type="button"
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        {props.vermelho}
      </button>
    </div>
  );
};

export default Button;
