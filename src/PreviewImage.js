import "./PreviewImage.css";
function PreviewImage({ imageUrl, setPreviewImage }) {
  const closePanel = () => {
    setPreviewImage({ viewing: false, imageIndex: null });
  };

  return (
    <div className="preview-image-panel noselect" onClick={closePanel}>
      <div className="preview-image-dark-panel">
        {/* Close Button */}
        <div className="preview-image-close-button" onClick={closePanel}>
          <span className="material-symbols-outlined">close</span>
        </div>

        <img className="image-preview" src={imageUrl} alt="second uploaded" />
      </div>
    </div>
  );
}

export default PreviewImage;
