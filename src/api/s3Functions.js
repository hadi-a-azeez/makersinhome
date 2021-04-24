import S3FileUpload from "react-s3";

const config = {
  bucketName: "saav-product-images",
  region: "ap-south-1",
  accessKeyId: "AKIAQAQK67QGOKWSOMKA",
  secretAccessKey: "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",
};

export const uploadProductImageS3 = async (imagesArr) => {
  try {
    for (const image of imagesArr) {
      await S3FileUpload.uploadFile(image.image, {
        ...config,
        dirName: "product",
      });
      await S3FileUpload.uploadFile(image.imagemin, {
        ...config,
        dirName: "product/min",
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteProductImagesS3 = async (images) => {
  try {
    for (const image of images) {
      await S3FileUpload.deleteFile(image.product_image, {
        ...config,
        dirName: "product",
      });
      await S3FileUpload.deleteFile(image.product_image, {
        ...config,
        dirName: "product/min",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const uploadProfileImageS3 = async (file) => {
  try {
    const response = await S3FileUpload.uploadFile(file, {
      ...config,
      dirName: "profile",
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const deleteProfileImageS3 = async (fileName) => {
  try {
    await S3FileUpload.deleteFile(fileName, {
      ...config,
      dirName: "profile",
    });
  } catch (error) {}
};
