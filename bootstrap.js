// =======================================================================
// AntiGameReborn by RiV- (based on the work of Francolino)
// =======================================================================
/*global chrome */
'use strict';
// bootstrap.js: Exactly the same Final, Beta and Alpha
// manifest.json: Different for Final, Beta and Alpha

AGB.Config = {
    id: '',
    beta: 0,					// 0 final,		1 beta, log		2  alpha, log + constant.js		3 alpha, log + constant.js +  log content to background
    version: '',
    pathSkin: ''
};


AGB.Core = {
    Log: function (text, force) {
        if (AGB.Config.beta || force) {
            let date = new Date();
            let hours = STR.trimZero(date.getHours(), 2);
            let minutes = STR.trimZero(date.getMinutes(), 2);
            let seconds = STR.trimZero(date.getSeconds(), 2);
            window.console.log(`AntiGameRebornX:  ${hours}:${minutes}:${seconds}  ${text}`);
        }
    },
    setTimeout: function (callback, delay) {
        return window.setTimeout(callback, delay);
    },
    clearTimeout: function (timer) {
        if (timer) {
            window.clearTimeout(timer);
            timer = null;
        }
    },
    // TODO: Find a solution for synchronous requests
    resourceFile: function (file) {
        var request;

        if (file) {
            try {
                request = new XMLHttpRequest();
                request.open('GET', chrome.extension.getURL(file), false);
                request.overrideMimeType('text/plain');														//	"text/plain;charset=UTF-8"
                request.send(null);																			// Synchron !

                return request.responseText || '';
            }
            catch (e) {
                return '';
            }
        }
        return '';
    }
};


window.setTimeout(function () {
    if (AGB.Manager) {
        AGB.Manager.Start();
    }
}, 1000);							// Use a timeout
