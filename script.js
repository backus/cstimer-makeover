// ==UserScript==
// @name       Make cstimer less ugly
// @namespace  lessugly.cstimer
// @version    0.1
// @description  Make cstimer less ugly
// @match      http://*.cstimer.net/
// @match      https://*.cstimer.net/
// @include    http://*.cstimer.net/
// @include    https://*.cstimer.net/
// @copyright  2014 John Backus
/*// @require http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js*/
// @run-at document-end
// ==/UserScript==

// the guts of this userscript
function main() {
  var style = document.createElement('link');
  style.rel = 'stylesheet';
  style.type = 'text/css';
  style.href = chrome.extension.getURL('styles.css');
  (document.head||document.documentElement).appendChild(style);
}

main()
