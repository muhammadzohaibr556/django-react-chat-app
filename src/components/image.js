import React, { Fragment, useState } from "react";
import AvatarEditor from "react-avatar-editor";

const Image = (props) => {
  const [editor, setEditor] = useState(null);
  const [scaleValue, setScaleValue] = useState(1);
  const onEditor = (editor) => setEditor(editor);

  const onCrop = () => {
    if (editor != null) {
      const url = editor.getImageScaledToCanvas().toDataURL();
      props.onImageUrl(url);
    }
  };
  const onScaleChange = (scaleValueEvent) => {
    const scaleValue = parseFloat(scaleValueEvent.target.value);
    setScaleValue(scaleValue);
  };
  const onClickClose = () => {
    props.onCloseImage();
    setScaleValue(1);
    setEditor(null);
  };
  return (
    <Fragment>
      {props.image === null || props.image === "" ? null : (
        <div className="bg-light">
          <div onClick={onCrop}>
            <AvatarEditor
              image={props.image}
              width={props.width}
              height={props.height}
              border={50}
              color={[255, 255, 255, 0.4]} // RGBA
              scale={scaleValue}
              rotate={0}
              ref={onEditor}
            />
            <br />
            <div className="col-6 d-flex">
              <label className="mr-3">Zoom</label>
              <input
                className="custom-range"
                id="customRange"
                type="range"
                value={props.scaleValue}
                min="1"
                max="10"
                onChange={onScaleChange}
              />
            </div>
          </div>
          <div className="close-image-btn">
            {props.closeButtonHide === false ? (
              <button
                onClick={onClickClose}
                className="btn btn-danger text-white"
              >
                x
              </button>
            ) : null}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default Image;
