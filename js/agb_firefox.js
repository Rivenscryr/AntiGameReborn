if (!AGB) {
    var AGB = {};
}
AGB.Manager = {
    Messages: function (a, b, c, d, e) {
        a && OBJ.is(AGB[a]) && "function" === typeof AGB[a].Messages && ("function" === typeof d ? AGB[a].Messages(b, JSON.parse(c || "{}"), function (a) {
                                                                                                                       d(JSON.stringify(a || ""))
                                                                                                                   }, e
        ) : AGB[a].Messages(b, JSON.parse(c || "{}"), null, e)
        )
    }, Start: function () {
        AGB.Core.Log("Manager - Start", !0);
        var a;
        AGB.status = 1;
        AGB.Config.pathSkin = "chrome://skin/content/";
        a = AGB.Core.resourceFile("install.rdf");
        AGB.Config.name = STR.getAttribute(a, "em:name");
        AGB.Config.beta = -1 < AGB.Config.name.indexOf("Alpha") ? AGB.Config.beta :
                          -1 < AGB.Config.name.indexOf("Beta") ? 1 : 0;
        AGB.DataBase ? AGB.DataBase.Start(AGB.Core.global) : AGB.DataBase = {};
        try {
            AGB.Core.Services.scriptloader.loadSubScript(AGB.Config.path + "js/api_firefox.js", AGB.API.prototype, "UTF-8")
        } catch (b) {
            AGB.Core.reportError(b, "API js/api_firefox.js")
        }
        AGB.Storage.Start(function () {
                              AGB.Core.Log("Start  Storage: " + AGB.Storage.status + "  DataBase: " + AGB.DataBase.status + (1 < AGB.Config.beta ? "  - Development mode" : ""
                                           ), !0
                              )
                          }
        );
        AGB.Core.Services.obs.addObserver(AGB.Manager.Check, "content-document-global-created",
                                          !1
        );
        AGB.Core.Services.obs.addObserver(AGB.Manager.Stop, "quit-application", !1)
    }, Stop: function (a) {
        var b;
        AGB.Core.Services.obs.removeObserver(AGB.Manager.Check, "content-document-global-created", !1);
        AGB.Core.Services.obs.removeObserver(AGB.Manager.Stop, "quit-application", !1);
        AGB.App.Stop();
        AGB.status = 0;
        for (b in AGB) {
            AGB.hasOwnProperty(b) && "object" === typeof AGB[b] && "Config" !== b && "Core" !== b && "Manager" !== b && "Storage" !== b && (AGB[b].Data && (AGB[b].Data = null
            ), AGB[b].Player && (AGB[b].Player = null
            ), AGB[b].Status &&
               (AGB[b].Status = null
               ), AGB[b] = null
            )
        }
    }, WindowListener: {
        setupBrowserUI: function (a) {
            AGB.Core.Log("AntiGameOrigin:  New Window", !0)
        }, tearDownBrowserUI: function (a) {
        }, onOpenWindow: function (a) {
            AGB.Core.Log("AntiGameOrigin:  New Window", !0)
        }, onCloseWindow: function (a) {
        }, onWindowTitleChange: function (a, b) {
        }
    }, Check: function (a, b, c) {
        var d;
        !a.AGO_started && a.location.href && a.top === a.self && c && "content-document-global-created" === b && ("about:blank" === a.location.href ? a.addEventListener("DOMContentLoaded", function f() {
                                                                                                                                                                             a.removeEventListener("DOMContentLoaded",
                                                                                                                                                                                                   f, !1
                                                                                                                                                                             );
                                                                                                                                                                             "about:blank" === a.location.href || a.AGO_started || (d = AGB.App.Check(a.location.href), OBJ.is(d) && d.mode && AGB.Manager.Load(d, a)
                                                                                                                                                                             )
                                                                                                                                                                         }, !1
        ) : (d = AGB.App.Check(a.location.href), OBJ.is(d) && d.mode && AGB.Manager.Load(d, a)
                                                                                                                  )
        )
    }, Load: function (a, b) {
        var c, d, e;
        b.AGO_started = 1;
        d = Components.utils.Sandbox(b, {sandboxPrototype: b});
        new AGB.API(d);
        3 === a.mode ? (c = [
            "js/basics.js",
            "js/common.js",
            "js/overlays.js",
            "js/main.js",
            "js/init.js"
        ], 2 <= AGB.Config.beta && c.unshift("js/constant.js")
        ) : 2 === a.mode ? (c = [
            "js/basics.js", "js/common.js",
            "js/init.js"
        ], 2 <= AGB.Config.beta && c.unshift("js/constant.js")
        ) : c = ["js/coordinates.js"];
        for (e = 0; e < c.length; e++) {
            try {
                AGB.Core.Services.scriptloader.loadSubScript(AGB.Config.path + c[e], d, "UTF-8")
            } catch (f) {
                AGB.Core.reportError(f, "AGO " + c[e])
            }
        }
    }, loadScripts: function (a, b) {
        var c;
        if (OBJ.is(a) && b) {
            for (c = 0; c < a.length; c++) {
                try {
                    AGB.Core.Services.scriptloader.loadSubScript(AGB.Config.path + "js/" + a[c] + ".js", b, "UTF-8")
                } catch (d) {
                    AGB.Core.reportError(d, "AGO " + a[c])
                }
            }
        }
    }, message: function (a, b, c, d) {
        var e, f, l, g, h, m, n, k;
        if (f = AGB.App.getPlayer(a)) {
            try {
                for (l =
                     Components.classes["@mozilla.org/appshell/window-mediator;1"].getService(Components.interfaces.nsIWindowMediator).getEnumerator("navigator:browser"); l.hasMoreElements();) {
                    if ((g = l.getNext().gBrowser
                        ) && g.browsers) {
                        for (n = g.browsers.length, k = 0; k < n; k++) {
                            h = g.getBrowserAtIndex(k), -1 < (h.currentURI.spec || ""
                            ).indexOf("ogame.gameforge.com/") && (e = h.contentDocument.getElementById("ago_global_data")
                                                        ) && e.getAttribute("ago-data-key") === f && (a = {
                                detail: JSON.stringify({
                                                           player: f,
                                                           page: b || "",
                                                           role: c || "",
                                                           data: d || ""
                                                       }
                                )
                            }, m = h.contentDocument.defaultView,
                                m.dispatchEvent(new m.CustomEvent("ago_global_send", a))
                                                        )
                        }
                    }
                }
            } catch (p) {
            }
        }
    }
};
AGB.Storage = {
    status: 0, Start: function (a) {
        var b;
        AGB.Storage.status = 0;
        AGB.Storage.local = AGB.Core.Services.prefs.getBranch("extensions." + AGB.Config.id + ".");
        AGB.Storage.sync = AGB.Core.Services.prefs.getBranch("services.sync.prefs.sync.extensions." + AGB.Config.id + ".");
        if (AGB.Storage.local) {
            b = Math.floor(Date.now() / 1E3);
            try {
                AGB.Storage.local.setIntPref("App_Start", b), AGB.Storage.status = b === +AGB.Storage.local.getIntPref("App_Start") ? 1 : 0
            } catch (c) {
            }
        }
        a()
    }, Set: function (a, b) {
        var c, d;
        if (OBJ.is(a) && (a.key ? (c = {}, c[a.key] =
                                           a.data
            ) : c = a.data, OBJ.is(c) && Object.keys(c).length
            )) {
            try {
                OBJ.iterate(c, function (a) {
                                var b;
                                b = Components.classes["@mozilla.org/supports-string;1"].createInstance(Components.interfaces.nsISupportsString);
                                b.data = c[a] ? STR.check(c[a]) : "";
                                AGB.Storage.local.setComplexValue(a, Components.interfaces.nsISupportsString, b)
                            }
                ), d = 1
            } catch (e) {
                d = -1
            }
        }
        b && b(d)
    }, Get: function (a, b) {
        function c(a) {
            var b;
            try {
                b = AGB.Storage.local.getPrefType(a);
                if (b === Components.interfaces.nsIPrefBranch.PREF_STRING) {
                    return AGB.Storage.local.getComplexValue(a,
                                                             Components.interfaces.nsISupportsString
                    ).data;
                }
                if (b === Components.interfaces.nsIPrefBranch.PREF_INT) {
                    return AGB.Storage.local.getIntPref(a);
                }
                if (b === Components.interfaces.nsIPrefBranch.PREF_BOOL) {
                    return AGB.Storage.local.getBoolPref(a)
                }
            } catch (c) {
            }
            return ""
        }

        var d = "";
        OBJ.is(a) && a.key && b && (OBJ.is(a.key) ? (d = {}, OBJ.iterate(a.key, function (a) {
                                                                             d[a] = c(a)
                                                                         }
        )
        ) : d = c(a.key)
        );
        b && b(d)
    }, Remove: function (a) {
        if (OBJ.is(a) && a.key) {
            AGB.Core.Log("Delete - storage  - " + a.key, !0);
            try {
                AGB.Storage.local.prefHasUserValue(a.key) && AGB.Storage.local.clearUserPref(a.key)
            } catch (b) {
            }
        }
    },
    List: function (a) {
        var b;
        OBJ.is(a) && (b = AGB.Storage.local.getChildList("", {}), OBJ.iterateArray(b, function (b) {
                                                                                       b && (a.filter && 0 !== STR.check(b).indexOf(a.filter) || AGB.Core.Log("List - storage  - " + b, !0)
                                                                                       )
                                                                                   }
        ), b = AGB.Storage.sync.getChildList("", {}), OBJ.iterateArray(b, function (b) {
                                                                           b && (a.filter && 0 !== STR.check(b).indexOf(a.filter) || AGB.Core.Log("List - syncflag  - " + b, !0)
                                                                           )
                                                                       }
        )
        )
    }, RemoveFilter: function (a) {
        var b;
        OBJ.is(a) && (b = AGB.Storage.local.getChildList("", {}), OBJ.iterateArray(b, function (b) {
                                                                                       if (b && (!a.filter || 0 ===
                                                                                                              STR.check(b).indexOf(a.filter)
                                                                                           )) {
                                                                                           AGB.Core.Log("Delete - storage  - " + b, !0);
                                                                                           try {
                                                                                               AGB.Storage.local.clearUserPref(b)
                                                                                           } catch (d) {
                                                                                           }
                                                                                       }
                                                                                   }
        ), b = AGB.Storage.sync.getChildList("", {}), OBJ.iterateArray(b, function (b) {
                                                                           if (b && (!a.filter || 0 === STR.check(b).indexOf(a.filter)
                                                                               )) {
                                                                               AGB.Core.Log("Delete - syncflag  - " + b, !0);
                                                                               try {
                                                                                   AGB.Storage.sync.clearUserPref(b)
                                                                               } catch (d) {
                                                                               }
                                                                           }
                                                                       }
        )
        )
    }, Sync: function (a) {
        OBJ.is(a) && OBJ.iterate(a.key, function (b) {
                                     a.key[b] ? 0 === AGB.Storage.sync.getPrefType(b) && (AGB.Core.Log("AntiGame:  Sync - Set Sync flag " +
                                                                                                       b
                                     ), AGB.Storage.sync.setBoolPref(b, !0)
                                     ) : AGB.Storage.sync.getPrefType(b) && (AGB.Core.Log("AntiGame:  Sync - Remove flag " + b), AGB.Storage.sync.clearUserPref(b)
                                     )
                                 }
        )
    }
};
AGB.API = function (a) {
    a.API = Components.utils.cloneInto(this.API, a, {cloneFunctions: true});
};