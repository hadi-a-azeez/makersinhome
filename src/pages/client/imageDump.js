import Axios from "axios";
import React, { useEffect, useState } from "react";
import { apiRoot } from "../../config";

const ImagesDump = () => {
  const [images, setImages] = useState([]);
  useEffect(() => {
    const getImages = async () => {
      const imagesResp = await Axios.get(`${apiRoot}/imagesdump`);
      setImages(imagesResp.data);
    };
    getImages();
  });

  return (
    <div>
      {images &&
        images.map((img) => (
          <img
            src={`https://firebasestorage.googleapis.com/v0/b/saav-9c29f.appspot.com/o/product_images%2Fmin%2F${img.product_image}?alt=media`}
            width="50px"
          />
        ))}
    </div>
  );
};

export default ImagesDump;
