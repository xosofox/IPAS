// ==UserScript==
// @id             iitc-plugin-ipas-link@graphracer
// @name           IITC plugin: simulate attack on portal
// @version        0.1.0.20130403.120000
// @namespace      https://github.com/xosofox/IPAS
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==

function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};


// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
window.plugin.ipasLink = function() {};

window.plugin.ipasLink.setupCallback = function() {
      addHook('portalDetailsUpdated', window.plugin.ipasLink.addLink);
}

window.plugin.ipasLink.addLink = function(d) {
    $('.linkdetails').append('<aside><a href="http://ipas.graphracer.com/index.html#' + window.plugin.ipasLink.getHash(d) + '" target="ipaswindow">attack!</a></aside>');
    console.log(d.resonatorArray.resonators[0]);
}

window.plugin.ipasLink.getHash = function(d) {
    return "1,35,1000;1,38,900;2,24,850;3,31,1200;1,35,1000;1,38,900;2,24,850;3,31,1200|r,c,0,v";
}

var setup =  function() {
  window.plugin.ipasLink.setupCallback();
}

// PLUGIN END //////////////////////////////////////////////////////////

if(window.iitcLoaded && typeof setup === 'function') {
  setup();
} else {
  if(window.bootPlugins)
    window.bootPlugins.push(setup);
  else
    window.bootPlugins = [setup];
}
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ wrapper +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
