import { useState } from "react";
import "./AddForm.css";

function AddForm({ darkMode, setShowAddForm }) {
  const [animating, setAnimating] = useState("false");
  const [loadingImage, setLoadingImage] = useState({
    load: false,
    err: false,
  });
  const [data, setData] = useState([
    {
      title: "Test Hole",
      images: [null, null, null],
      description: "Test Description",
      authorId: 1,
      location: {
        lat: 0,
        lng: 0,
      },
    },
  ]);

  function waitForCloseAnim() {
    setAnimating("true");
    setTimeout(() => {
      setShowAddForm(false);
    }, 500);
  }

  //   Waits for getBase64 promise
  function saveImage(file, imageIndex) {
    setLoadingImage({ load: true, err: false });

    getBase64(file)
      .then((resBlob) => {
        const newData = [...data];
        newData[0].images = newData[0].images.map((image, index) => {
          if (index === imageIndex) {
            return resBlob;
          } else {
            return image;
          }
        });
        setData([newData]);
        setLoadingImage({ load: false, err: false });
      })
      .catch((error) => {
        setLoadingImage({ load: false, err: true });
        console.error("Error bro: ", error);
      });
  }
  //   uses Promise
  function getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) =>
        reject("Error getting base 64 from image: ", error);
    });
  }

  return (
    <div
      className={
        darkMode ? "dark-panel add-form-panel" : "light-panel add-form-panel"
      }
      onAnimationEnd={() => setAnimating("false")}
      animating={animating}
    >
      {/* Loading Screen */}
      {loadingImage.load && !loadingImage.err ? (
        <div className="loading-screen">
          <h1>Loading image...</h1>
        </div>
      ) : !loadingImage.load && loadingImage.err ? (
        <div className="loading-screen">
          <h1>Loading Failed!</h1>
          <span>Try again or contact the developer</span>
          <button onClick={() => setLoadingImage([false, false])}>Close</button>
        </div>
      ) : null}

      {/* Close Panel */}
      <div
        className={
          darkMode
            ? "dark-close add-form-close noselect"
            : "light-close add-form-close noselect"
        }
        onClick={waitForCloseAnim}
      >
        <span className="material-symbols-outlined">close</span>
      </div>

      <form className="form-style">
        <h1>Report a Pothole</h1>
        <section className="section-upload-pictures">
          <h2>Picture upload</h2>
          <span>Maximum of 3 images</span>
          <ul className="images-wrapper">
            {/* First Image */}
            <li className="image-item">
              <label htmlFor="image-upload-1" className="upload-image-button">
                <input
                  id="image-upload-1"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple={false}
                  onChange={(event) => {
                    saveImage(event.target.files[0], 0);
                  }}
                />
                Select an Image
              </label>
            </li>
            {/* Second Image */}
            <li className="image-item">
              <label htmlFor="image-upload-2" className="upload-image-button">
                <input
                  id="image-upload-2"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple={false}
                  onChange={(event) => {
                    saveImage(event.target.files[0], 1);
                  }}
                />
                Select an Image
              </label>
            </li>
            {/* Third Image */}
            <li className="image-item">
              <label htmlFor="image-upload-3" className="upload-image-button">
                <input
                  id="image-upload-3"
                  type="file"
                  accept="image/png, image/jpeg"
                  multiple={false}
                  onChange={(event) => {
                    saveImage(event.target.files[0], 2);
                  }}
                />
                Select an Image
              </label>
            </li>
          </ul>
        </section>
      </form>
    </div>
  );
}

export default AddForm;
