import "../App.css";

function OutputPanel({ output }) {
  console.log(output);
  return (
    <>
      <div className="bg-light output-panel mx-auto my-5 text-center d-flex flex-column p-4">
        <h2 className="mb-5">Output Panel</h2>
        <section className="d-flex flex-column gap-3">
          {Object.keys(output).map((key) => {
            return <h3>{`${key}: ${output[key]}`}</h3>;
          })}
        </section>
      </div>
    </>
  );
}

export default OutputPanel;
