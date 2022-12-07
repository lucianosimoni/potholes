import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import { useState } from "react";
import { Helmet } from "react-helmet";

function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <>
      <Helmet>
        <title>Pothole Report</title>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        />
      </Helmet>

      <div className="App">
        <nav className="nav">
          <section className="section-header">
            <img src={logo} className="nav-logo noselect" alt="logo" />
            <h2 className="nav-title">Pothole Report</h2>
          </section>

          <section className="section-actions">
            <div className="nav-add-report noselect">
              <span class="material-symbols-outlined">add</span>
            </div>
          </section>
        </nav>

        <main className="App-main">
          <Map darkMode={darkMode} />
        </main>

        <div
          className={
            darkMode === true
              ? "dark-mode-button noselect"
              : "light-mode-button noselect"
          }
          onClick={() => setDarkMode(!darkMode)}
        >
          <span className="material-symbols-outlined">dark_mode</span>
        </div>
      </div>
    </>
  );
}

export default App;
