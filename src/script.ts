const fixedSettings = {
  "showAvg":      true,
  "timerSize":    20,
  "scrSize":      15,
  "disPrec":      "a",
  "statsum":      true,
  "printScr":     true,
  "stats":        true,
  "imgSize":      10,
  "tools":        true
};

function applySettings() {
  const existingProperties = JSON.parse(localStorage.getItem("properties"));
  Object.assign(existingProperties, fixedSettings);
  localStorage.setItem("properties", JSON.stringify(existingProperties));
}

function injectLink(rel: string, type: string, href: string) {
  let elem  = document.createElement("link");
  elem.rel  = rel;
  elem.type = type;
  elem.href = href;

  document.documentElement.appendChild(elem);
}

function enforceSSL() {
  if (window.location.protocol !== "https:") {
    window.location.protocol = "https:";
  }
}

// We restyle the sidebar and this results in it only filling half the
// page. CSTimer automatically resizes the sidebar on window resize events
// so we manually trigger changes after our other changes are injected
function fixSidebar() {
  const event = document.createEvent("HTMLEvents");
  event.initEvent("resize", true, false);
  document.dispatchEvent(event);
}

function main() {
  enforceSSL();

  injectLink(
    "stylesheet",
    "text/css",
    chrome.extension.getURL("styles.css")
  );

  injectLink(
    "icon",
    "image/x-icon",
    chrome.extension.getURL("img/favicon.png")
  );

  applySettings();

  fixSidebar();
}

main();
