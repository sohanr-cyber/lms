const url =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_PRODUCTION_URL
    : process.env.BASE_URL;

    
export default url;
