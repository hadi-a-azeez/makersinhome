import AWS from "aws-sdk";

const hostname = new AWS.Endpoint("sgp1.digitaloceanspaces.com");
const s3 = new AWS.S3({
  region: "sgp1",
  endpoint: hostname,
  accessKeyId: "UAT4XP74G5KN63HKRKN5",
  secretAccessKey: "6CqnIOKef6Pt3Yc04TKDbeBbmZ6UA6YSFXhIjvc5WMQ",
});

export const uploadStoreImageDO = async (file) => {
  const params = {
    Bucket: "saav/profile-images",
    Key: file.name,
    ContentType: "image/jpg",
    Body: file,
    ACL: "public-read",
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
    { Bucket: "saav/profile-images", Key: file },
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
        Bucket: "saav/product-images",
        Key: image.image.name,
        ContentType: "image/jpg",
        Body: image.image,
        ACL: "public-read",
      };
      const paramsMin = {
        Bucket: "saav/product-images/min",
        Key: image.imagemin.name,
        ContentType: "image/jpg",
        Body: image.imagemin,
        ACL: "public-read",
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
        { Bucket: "saav/product-images", Key: image.product_image },
        (err, data) => {
          if (err) console.log(err, err.stack);
        }
      );
      s3.deleteObject(
        { Bucket: "saav/product-images/min", Key: image.product_image },
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
