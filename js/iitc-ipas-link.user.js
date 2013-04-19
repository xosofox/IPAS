// ==UserScript==
// @id             iitc-plugin-ipas-link@graphracer
// @name           IITC Plugin: simulate an attack on portal
// @version        0.3.0.20130420.000000
// @namespace      https://github.com/xosofox/IPAS
// @updateURL      http://ipas.graphracer.com/js/iitc-ipas-link.meta.js
// @downloadURL    http://ipas.graphracer.com/js/iitc-ipas-link.user.js
// @include        https://www.ingress.com/intel*
// @include        http://www.ingress.com/intel*
// @match          https://www.ingress.com/intel*
// @match          http://www.ingress.com/intel*
// ==/UserScript==


function wrapper() {
// ensure plugin framework is there, even if iitc is not yet loaded
    if (typeof window.plugin !== 'function') window.plugin = function () {
    };

// PLUGIN START ////////////////////////////////////////////////////////

// use own namespace for plugin
    window.plugin.ipasLink = function () {
    };

    window.plugin.ipasLink.setupCallback = function () {
        addHook('portalDetailsUpdated', window.plugin.ipasLink.addLink);
    }

    window.plugin.ipasLink.addLink = function (d) {
        $('.linkdetails').append('<aside style="text-align: center; display: block"><a href="http://ipas.graphracer.com/index.html#' + window.plugin.ipasLink.getHash(d.portalDetails) + '" target="ipaswindow">simulate attack with IPAS</a></aside>');
    }

    window.plugin.ipasLink.getHash = function (d) {
        var hashParts = [];
        $.each(d.resonatorArray.resonators, function (ind, reso) {
            if (reso) {
                hashParts.push(reso.level + "," + reso.distanceToPortal + "," + reso.energyTotal);
            } else {
                hashParts.push("1,20,0");
            }
        });
        var resos = hashParts.join(";");

        hashParts = [];
        $.each(d.portalV2.linkedModArray, function (ind, mod) {
            //shields only, so far...
            var s = "0";
            if (mod) {
                if (mod.type === "RES_SHIELD") {
                    s = mod.rarity.charAt(0).toLowerCase();
                }
            }
            hashParts.push(s);
        });
        var shields = hashParts.join(",");
        return resos + "|" + shields;
    }

    var setup = function () {
        window.plugin.ipasLink.setupCallback();
    }

// PLUGIN END //////////////////////////////////////////////////////////

    if (window.iitcLoaded && typeof setup === 'function') {
        setup();
    } else {
        if (window.bootPlugins)
            window.bootPlugins.push(setup);
        else
            window.bootPlugins = [setup];
    }
} // wrapper end
// inject code into site context
var script = document.createElement('script');
script.appendChild(document.createTextNode('(' + wrapper + ')();'));
(document.body || document.head || document.documentElement).appendChild(script);

