import AWS from "aws-sdk";

// const hostname = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
// const s3 = new AWS.S3({
//   region: "sgp1",
//   endpoint: hostname,
//   accessKeyId: "UAT4XP74G5KN63HKRKN5",
//   secretAccessKey: "6CqnIOKef6Pt3Yc04TKDbeBbmZ6UA6YSFXhIjvc5WMQ",
// });
const s3 = new AWS.S3({
  region: "ap-south-1",
  accessKeyId: "AKIASAV4GXWRSVPDR2DN",
  secretAccessKey: "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",
});

export const uploadStoreImageDO = async (file) => {
  const params = {
    Bucket: "saav-s3-bucket/profile-images",
    Key: file.name,
    ContentType: "image/jpg",
    Body: file,
  };

  s3.putObject(params, function (err, data) {
    if (err) {
      console.log(err, err.stack);
    } else {
      console.log(data);
    }
  });
};
export const deleteStoreImageDO = async (file) => {
  s3.putObject(
    { Bucket: "saav-s3-bucket/profile-images", Key: file },
    function (err, data) {
      if (err) {
        console.log(err, err.stack);
      } else {
        console.log(data);
      }
    }
  );
};

export const uploadProductImageDO = async (filesArr) => {
  try {
    for (const image of filesArr) {
      console.log(image);
      const params = {
        Bucket: "saav-s3-bucket/product-images",
        Key: image.image.name,
        ContentType: "image/jpg",
        Body: image.image,
      };
      const paramsMin = {
        Bucket: "saav-s3-bucket/product-images/min",
        Key: image.imagemin.name,
        ContentType: "image/jpg",
        Body: image.imagemin,
      };

      s3.putObject(params, (err, data) => {
        if (err) console.log(err, err.stack);
      });
      s3.putObject(paramsMin, (err, data) => {
        if (err) console.log(err, err.stack);
      });
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export const deleteProductImageDO = async (filesArr) => {
  try {
    for (const image of filesArr) {
      s3.deleteObject(
        { Bucket: "saav-s3-bucket/product-images", Key: image.product_image },
        (err, data) => {
          if (err) console.log(err, err.stack);
        }
      );
      s3.deleteObject(
        {
          Bucket: "saav-s3-bucket/product-images/min",
          Key: image.product_image,
        },
        (err, data) => {
          if (err) console.log(err, err.stack);
        }
      );
    }
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
