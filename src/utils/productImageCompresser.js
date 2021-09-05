import Compressor from "compressorjs";

export const productImageCompresser = async (image, imageName) => {
  return {
    normal: await compressSingleImage(image, imageName, {
      quality: 0.8,
      maxSizeMB: 0.8,
      maxWidth: 1080,
      maxHeight: 1080,
    }),
    min: await compressSingleImage(image, imageName, {
      quality: 0.5,
      maxSizeMB: 0.15,
      maxWidth: 480,
      maxHeight: 480,
    }),
  };
};

export const compressSingleImage = (image, imageName, options) => {
  return new Promise((resolve, reject) => {
    new Compressor(image, {
      ...options,

      success: (resultImage) => {
        let imageFile = new File([resultImage], imageName, {
          type: image.type,
          lastModified: Date.now(),
        });
        resolve(imageFile);
      },
      error: reject,
    });
  });
};
