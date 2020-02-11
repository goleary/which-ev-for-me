class API {
  //prodBaseUrl = "https://us-central1-autosplit-270a6.cloudfunctions.net/";
  getBaseUrl() {
    if (this.isProd()) {
      return this.prodBaseUrl;
    } else {
      return this.getFirebaseLocalHost() + "/which-ev-for-me/us-central1/";
    }
  }
  getFirebaseLocalHost() {
    return "http://localhost:5000";
  }
  isProd() {
    return process.env.NODE_ENV === "production"; // force localhost to use prod services
  }
}

export default new API();
