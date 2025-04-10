const useBreadcrums = (currentLocation, contextObject) => {
  let arrayOfUriPath = [];
  let currentLocationLabel = "";

  arrayOfUriPath = currentLocation.split("/");
  arrayOfUriPath.splice(0, 1, "inicio"); // replace the first element of the array, 0 to 1, with "inicio"

  if (contextObject) {
    currentLocationLabel = contextObject;
    return { arrayOfUriPath, currentLocationLabel };
  }
  return { arrayOfUriPath };
};

export default useBreadcrums;
