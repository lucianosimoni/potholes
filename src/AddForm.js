import { useState } from "react";
import "./AddForm.css";
import PreviewImage from "./PreviewImage";

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
  const [previewImage, setPreviewImage] = useState({
    viewing: false,
    imgIndex: null,
  });

  function waitForCloseAnim() {
    setAnimating("true");
    setTimeout(() => {
      setShowAddForm(false);
    }, 500);
  }

  //   Waits for getBase64 promise
  function saveImage(file, imageIndex) {
    setLoadingImage({ load: true, err: false });
    console.log("File: ", file, "\n\n ImageIndex: ", imageIndex);

    getBase64(file)
      .then((resBlob) => {
        console.log("\nResBlob arrived\n");
        const newData = [...data];
        console.log("newData: ", newData);
        newData[0].images = newData[0].images.map((image, index) => {
          console.log("\n- - Looping though index: ", index);
          if (index === imageIndex) {
            return resBlob;
          } else {
            return image;
          }
        });
        setData([...newData]);
        setLoadingImage({ load: false, err: false });
      })
      .catch((error) => {
        setLoadingImage({ load: false, err: true });
        console.error("Error bro: ", error);
      });
  }
  //   uses Promise
  function getBase64(file) {
    console.log("Getting base 64 of file");
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("- Base resolved");
        resolve(reader.result);
      };
      reader.onerror = (error) =>
        reject("Error getting base 64 from image: ", error);
    });
  }

  const uploadButtonClassName = darkMode
    ? "dark-upload upload-image-button noselect"
    : "light-upload upload-image-button noselect";
  const previewButtonClassName = darkMode
    ? "dark-preview-button image-preview-button noselect"
    : "light-preview-button image-preview-button noselect";

  return (
    <div
      className={
        darkMode ? "dark-panel add-form-panel" : "light-panel add-form-panel"
      }
      onAnimationEnd={() => setAnimating("false")}
      animating={animating}
    >
      {/* Loading Image Screen */}
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

      {/* Preview Image call */}
      {previewImage.viewing && (
        <PreviewImage
          imageUrl={data[0].images[previewImage.imgIndex]}
          setPreviewImage={setPreviewImage}
        />
      )}

      {/* Close Button */}
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
          <h2 className="section-upload-header">Picture upload</h2>
          <span>Take a good picture of the pothole!</span>

          <ul className="images-wrapper">
            {/* First Image */}
            <li className="image-item">
              <label htmlFor="image-upload-1" className={uploadButtonClassName}>
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
              {/* If image selected */}
              {data[0].images[0] && (
                <div
                  className={previewButtonClassName}
                  onClick={() =>
                    setPreviewImage({ viewing: true, imgIndex: 0 })
                  }
                >
                  <span className="material-symbols-outlined">fullscreen</span>
                  <span>Preview</span>
                </div>
              )}
            </li>
            {/* Second Image */}
            <li className="image-item">
              <label htmlFor="image-upload-2" className={uploadButtonClassName}>
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
              {/* If image selected */}
              {data[0].images[1] && (
                <div
                  className={previewButtonClassName}
                  onClick={() =>
                    setPreviewImage({ viewing: true, imgIndex: 1 })
                  }
                >
                  <span className="material-symbols-outlined">fullscreen</span>
                  <span>Preview</span>
                </div>
              )}
            </li>
            {/* Third Image */}
            <li className="image-item">
              <label htmlFor="image-upload-3" className={uploadButtonClassName}>
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
              {/* If image selected */}
              {data[0].images[2] && (
                <div
                  className={previewButtonClassName}
                  onClick={() =>
                    setPreviewImage({ viewing: true, imgIndex: 2 })
                  }
                >
                  <span className="material-symbols-outlined">fullscreen</span>
                  <span>Preview</span>
                </div>
              )}
            </li>
          </ul>
        </section>
      </form>
    </div>
  );
}

export default AddForm;
