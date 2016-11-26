var settings = {
  "zoom":         "1",
  "font":         "Arial",
  "ahide":        true,
  "view":         "d",
  "color":        "u",
  "col-font":     "#fff",
  "col-back":     "#050814",
  "col-board":    "#0c1327",
  "col-button":   "#018bff",
  "col-link":     "#5385ff",
  "col-logo":     "#000000",
  "col-logoback": "#000000",
  "bgImgO":       0,
  "bgImgS":       "n",
  "useMilli":     false,
  "timeFormat":   "h",
  "useMouse":     false,
  "useIns":       false,
  "voiceIns":     "1",
  "input":        "t",
  "timeU":        "c",
  "preTime":      "0",
  "phases":       1,
  "showAvg":      true,
  "timerSize":    20,
  "smallADP":     true,
  "scrSize":      15,
  "scrMono":      true,
  "scrLim":       true,
  "scrAlign":     "c",
  "preScr":       "",
  "scrType":      "333",
  "scramble":     true,
  "disPrec":      "a",
  "statsum":      true,
  "printScr":     true,
  "imrename":     false,
  "scr2ss":       false,
  "ss2scr":       true,
  "stat1t":       0,
  "stat1l":       5,
  "stat2t":       0,
  "stat2l":       12,
  "delmul":       false,
  "sessionN":     15,
  "session":      1,
  "stats":        true,
  "imgSize":      10,
  "tools":        true,
  "useKSC":       true,
  "sessionName":  "{\"1\":1,\"2\":2,\"3\":3,\"4\":4,\"5\":5,\"6\":6,\"7\":7,\"8\":8,\"9\":9,\"10\":10,\"11\":11,\"12\":12,\"13\":13,\"14\":14,\"15\":15}",
  "sessionScr":   "{\"1\":\"333\",\"2\":\"333\",\"3\":\"333\",\"4\":\"333\",\"5\":\"333\",\"6\":\"333\",\"7\":\"333\",\"8\":\"333\",\"9\":\"333\",\"10\":\"333\",\"11\":\"333\",\"12\":\"333\",\"13\":\"333\",\"14\":\"333\",\"15\":\"333\"}"
}

function applySettings() {
  var existingProperties = JSON.parse(localStorage.getItem('properties'));
  Object.assign(existingProperties, settings)
  localStorage.setItem('properties', JSON.stringify(existingProperties));
}

function injectLink(rel, type, href){
  elem      = document.createElement('link');
  elem.rel  = rel;
  elem.type = type;
  elem.href = href;

  document.documentElement.appendChild(elem);
}

function enforceSSL(){
  if (window.location.protocol != 'https:') {
    window.location.protocol = 'https:';
  }
}

// We restyle the sidebar and this results in it only filling half the
// page. CSTimer automatically resizes the sidebar on window resize events
// so we manually trigger changes after our other changes are injected
function fixSidebar(){
  var event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, false);
  document.dispatchEvent(event);
}

function main() {
  enforceSSL();

  injectLink(
    'stylesheet',
    'text/css',
    chrome.extension.getURL('styles.css')
  );

  injectLink(
    'icon',
    'image/x-icon',
    chrome.extension.getURL('img/favicon.png')
  );

  applySettings();

  fixSidebar();
}

main()
