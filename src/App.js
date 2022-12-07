import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";

function App() {
  return (
    <div className="App">
      <nav className="nav">
        <section className="section-header">
          <img src={logo} className="nav-logo" alt="logo" />
          <h2 className="nav-title">Pothole Report</h2>
        </section>

        <section className="section-actions">
          <button className="nav-add-report">Add Report</button>
        </section>
      </nav>

      <main className="App-main">
        <Map />
      </main>
    </div>
  );
}

export default App;
