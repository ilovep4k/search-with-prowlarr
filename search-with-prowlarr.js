// ==UserScript==
// @name         Search with Prowlarr
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Search highlighted text with Prowlarr from any website
// @author       You
// @match        *://*/*
// @grant        GM_registerMenuCommand
// @grant        GM_xmlhttpRequest
// @grant        GM_openInTab
// ==/UserScript==

(function() {
    'use strict';

    document.addEventListener('mouseup', function(e) {
        var selection = window.getSelection().toString().trim();
        if (selection.length > 0) {
            document.oncontextmenu = function() {
                const customMenu = document.createElement('menu');
                customMenu.id = 'prowlarrSearchMenu';
                customMenu.type = 'context';
                customMenu.innerHTML = '<menuitem label="Search with Prowlarr"></menuitem>';
                document.body.appendChild(customMenu);

                const menuItem = customMenu.querySelector('menuitem');
                menuItem.addEventListener('click', function() {
                    const query = encodeURIComponent(selection);
                    const url = `http://10.0.0.9:9696/api/v1/search?query=${query}&type=search&limit=100&offset=0`;
                    GM_openInTab(url, {active: true});
                });

                e.target.setAttribute('contextmenu', 'prowlarrSearchMenu');
            };
        }
    });

    document.addEventListener('click', function() {
        const existingMenu = document.getElementById('prowlarrSearchMenu');
        if (existingMenu) {
            existingMenu.remove();
        }
        document.oncontextmenu = null;
    });
})();
