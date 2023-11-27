const installEvent = () => {
  self.addEventListener("install", () => {
    console.debug("service worker installed");
  });
};
installEvent();

const activateEvent = () => {
  self.addEventListener("activate", () => {
    console.debug("service worker activated");
  });
};
activateEvent();
