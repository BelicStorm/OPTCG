import { useState, useRef } from 'react';
import TextRecognition from './textRecognition.component';
import { chain, difference } from "lodash";
import Tesseract from "tesseract.js";

const VALID_WORDS = ["ebo"];
const ImageUploader = () => {
    const inputRef = useRef<any>(null);
    const [hasImage, setHasImage] = useState(false);
    const [imageSrc, setImageSrc] = useState("");
    const [message, setMessage] = useState("");
  
    const handleSelectFileClick = () => {
      if (inputRef?.current) {
        inputRef.current.click();
      }
    };
    const handleClearImageClick = () => {
      setHasImage(false);
      setImageSrc("");
      setMessage("");
    };
    const handleFileSelectionChange = (event:any) => {
      const newFile = event.target.files[0];
  
      setHasImage(true);
      recognizeText(newFile);
  
      const fileReader = new FileReader();
      fileReader.readAsDataURL(newFile);
      fileReader.onload = (event:any) => {
        setImageSrc(event.target.result);
      };
    };
  
    const recognizeText = async (imageFile:any) => {
      setMessage("Identifying text in image...");
      const response = await Tesseract.recognize(imageFile, "eng", {
        logger: (m) => console.log(m)
      });
  
      const { data } = response;
      if (data?.text) {
        const text = chain(data?.text)
          .replace(/(\r\n|\n|\r)/gm, " ")
          .replace(/,/g, "")
          .replace(/\./g, "")
          .trim()
          .lowerCase()
          .value();
  
        const words = chain(text)
          .split(" ")
          .map((item) => {
            if (item) {
              return item;
            }
          })
          .value();
  
        console.log("words > ", words);
  
        if (difference(VALID_WORDS, words)?.length === 0) {
          setMessage("Image has valid words.");
        } else {
          setMessage("Could not find required text in the image. "+ data.text);
        }
      } else {
        setMessage("Could not find any text in image.");
      }
    };
  
    return (
      <div className="App" style={{height:"200px"}}>
        <div>
          <div className="image-container">
            {!hasImage ? (
              <div className="upload-container" onClick={handleSelectFileClick}>
                <input
                  style={{ display: "none" }}
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelectionChange}
                />
                <div>Click here to select a image with text</div>
              </div>
            ) : (
              <div
                className="selected-image-container"
                
              >
                <div style={{ backgroundImage: `url(${imageSrc})`, height:"100px" }}></div>
                <span
                  onClick={handleClearImageClick}
                >Borrar</span>
              </div>
            )}
          </div>
          <div className="message">{message}</div>
        </div>
      </div>
    );
  };
// const ImageUploader = () => {
//   const [selectedImage, setSelectedImage] = useState<any>(null);
//   const handleImageUpload = (event:any) => {
//     const image = event.target.files[0];
//     setSelectedImage(URL.createObjectURL(image));
//   };
//   return (
//     <div>
//       <input type="file" accept="image/*" onChange={handleImageUpload} />
//       {/* {selectedImage && <img src={selectedImage} alt="Selected" />} */}
//       <TextRecognition selectedImage={selectedImage}/>
//     </div>
//   );
// };
export default ImageUploader;