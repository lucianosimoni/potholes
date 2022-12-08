import { useState } from "react";
import "./AddForm.css";
import { wait } from "@testing-library/user-event/dist/utils/misc/wait";

function AddForm({ darkMode, setShowAddForm }) {
  const [animating, setAnimating] = useState("false");
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

  function saveImage(file, imageIndex) {
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
      })
      .catch((error) => console.error(error));
  }

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

      <form>
        <h1>Report a Pothole</h1>
        <section className="section-upload-pictures">
          <h2>Picture upload</h2>
          <span>Maximum of 3 images</span>
          <input
            type="file"
            accept="image/png, image/jpeg"
            multiple={false}
            onChange={(event) => {
              saveImage(event.target.files[0], 0);
            }}
          />
        </section>
      </form>
    </div>
  );
}

export default AddForm;
