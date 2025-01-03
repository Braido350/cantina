export default function Buttons({ verde, vermelho }) {
  return (
    <div className="flex justify-between mt-6">
      <button
        type="submit"
        className="px-6 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
      >
        {verde}
      </button>
      <button
        type="submit"
        className="px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        {vermelho}
      </button>
    </div>
  );
}
