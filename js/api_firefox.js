// =======================================================================
// API Firefox - content script - injected in sandbox
// =======================================================================
// ==ClosureCompiler==
// @output_file_name api_firefox.js
// @compilation_level SIMPLE_OPTIMIZATIONS
// ==/ClosureCompiler==
/*global AGB */
'use strict';


var API = {												// Important ! Keep __exposedProps__ up to date !


    Messages: function (page, role, para, callback, context) {
        if (AGB && AGB.status) {
            AGB.Manager.Messages(page, role, para, callback, context);
        }
    },


    // OK 5.8
    App: function () {
        if (AGB) {
            return JSON.stringify({versionAGO: AGB.Config.version, name: AGB.Config.name});
        }
    },


    // OK 5.8
    Resource: function (para) {
        if (AGB && AGB.status) {
            return AGB.Core.resourceFile(para);
        }
    },


    __exposedProps__: {Messages: 'r', App: 'r', Resource: 'r'}
};
