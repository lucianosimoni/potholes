import Logo from "./logo.js";
import "./App.css";
import Map from "./Map";
import { useState } from "react";
import AddForm from "./AddForm";
import { Helmet, HelmetProvider } from "react-helmet-async";

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [mapClick, setMapClick] = useState({
    active: false,
    location: { lat: null, lng: null },
  });

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Pothole Report</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
          />
        </Helmet>
      </HelmetProvider>

      <div className="App">
        {showAddForm && (
          <AddForm
            darkMode={darkMode}
            setShowAddForm={setShowAddForm}
            mapClick={mapClick}
            setMapClick={setMapClick}
          />
        )}

        {/* Navigation */}
        <nav className={darkMode ? "nav-dark nav" : "nav-light nav"}>
          <section className="section-header">
            <Logo fill={darkMode ? "#fffcf2" : "#252422"} />
            <h2 className="nav-title">Pothole Report</h2>
          </section>

          <section className="section-actions">
            <div
              className="nav-add-report noselect"
              onClick={() => setShowAddForm(true)}
            >
              <span className="material-symbols-outlined">add</span>
            </div>
          </section>
        </nav>

        {/* Map */}
        <main className="App-main">
          <Map
            darkMode={darkMode}
            mapClick={mapClick}
            setMapClick={setMapClick}
          />
        </main>

        {/* Dark Mode Button */}
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
