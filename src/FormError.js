import "./FormError.css";
function FormError({ title, msg, setShowError }) {
  const closePanel = () => {
    setShowError({ active: false, title: "", msg: "" });
  };

  return (
    <div className="form-error-panel noselect" onClick={closePanel}>
      <div className="form-error-dark-panel">
        {/* Close Button */}
        <div className="form-error-close-button" onClick={closePanel}>
          <span className="material-symbols-outlined">close</span>
        </div>

        <span className="material-symbols-outlined error-icon">error</span>
        <h1>{title}</h1>
        <p>{msg}</p>
      </div>
    </div>
  );
}

export default FormError;
