import React, { useContext, useMemo, useState } from "react";
import Dropzone from "react-dropzone";
import imageDrop from "../../../assets/imageDrop.svg";
import imageDropFocus from "../../../assets/imageDropFocus.svg";
import { addLocationReducer } from "../../../reducers/addLocationReducer";

const imageMaxSize = 5000000;
const acceptedFileTypes =
  "image/x-png, image/png, image/jpg, image/jpeg, image/gif";
const acceptedFileTypesArray = acceptedFileTypes.split(",").map(item => {
  return item.trim();
});

const DropzoneImage = props => {
  const { dispatch } = useContext(addLocationReducer);
  const [imgSrc, setImgSrc] = useState(null);

  const verifyFile = files => {
    if (files && files.length > 0) {
      const currentFile = files[0];
      const currentFileType = currentFile.type;
      const currentFileSize = currentFile.size;
      if (currentFileSize > imageMaxSize) {
        alert(
          "This file is not allowed. " + currentFileSize + " bytes is too large"
        );
        return false;
      }
      if (!acceptedFileTypesArray.includes(currentFileType)) {
        alert("This file is not allowed. Only images are allowed.");
        return false;
      }
      return true;
    }
  };

  const handleOnDrop = (files, rejectedFiles) => {
    if (rejectedFiles && rejectedFiles.length > 0) {
      verifyFile(rejectedFiles);
    }

    if (files && files.length > 0) {
      const isVerified = verifyFile(files);
      if (isVerified) {
        const currentFile = files[0];

        const myFileItemReader = new FileReader();
        myFileItemReader.addEventListener(
          "load",
          () => {
            const myResult = myFileItemReader.result;
            setImgSrc(myResult);
            dispatch({ type: "SET_IMAGE", image: files[0] });
          },
          false
        );

        myFileItemReader.readAsDataURL(currentFile);
      }
    }
  };

  const renderComponent = () => (
    <Dropzone accept="image/*" multiple={false} onDrop={handleOnDrop}>
      {({ getRootProps, getInputProps, isDragActive }) => {
        if (imgSrc === null) {
          return (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                {isDragActive ? (
                  <img src={imageDropFocus} alt="" className="image-upload" />
                ) : (
                  <p>
                    <img src={imageDrop} alt="" className="image-upload" />
                  </p>
                )}
              </div>
            </section>
          );
        } else {
          return (
            <div className="uploaded-wrapper">
              <img src={imgSrc} alt="" className="uploaded-image" />
              <input
                {...getInputProps()}
                style={{ display: "block" }}
                className="change-uploaded-image"
              />
            </div>
          );
        }
      }}
    </Dropzone>
  );
  return useMemo(renderComponent, [imgSrc]);
};

export default DropzoneImage;
