import logo from "./logo.svg";
import "./App.css";
import Map from "./components/Map";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Pothole Report</h2>
      </header>

      <main>
        <Map />
      </main>
    </div>
  );
}

export default App;
