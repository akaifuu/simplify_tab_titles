function removeFavicons() {
  const faviconLinks = document.querySelectorAll(
    "link[rel~='icon'], link[rel='shortcut icon']"
  );
  faviconLinks.forEach((link) => link.parentNode.removeChild(link));
}

removeFavicons();
