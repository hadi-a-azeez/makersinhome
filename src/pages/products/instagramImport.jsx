import axios from "axios";
import React, { useState, useEffect } from "react";

const InstagramImport = () => {
  const getInstaPosts = async () => {
    const rx =
      /(?:(?:http|https):\/\/)?(?:www\.)?(?:instagram\.com|instagr\.am)\/([A-Za-z0-9-_\.]+)/im;
    let match = rx.exec("https://www.instagram.com/p/COXK9q0Ax32/");
    // let user = response.graphql.user;
    // let posts = user.edge_owner_to_timeline_media.edges;
    console.log(match);
  };

  useEffect(() => {
    getInstaPosts();
  }, []);

  return <h1>Hi</h1>;
};

export default InstagramImport;
