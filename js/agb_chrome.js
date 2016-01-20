if (!AGB) {
    var AGB = {};
}
AGB.Manager = {
    Start: function () {
        var a;
        AGB.status = 1;
        AGB.Config.pathSkin = chrome.extension.getURL("/skin/");
        AGB.Config.id = chrome.runtime.id;
        AGB.Config.version = chrome.runtime.getManifest().version;
        AGB.Config.name = STR.check(chrome.runtime.getManifest().name);
        AGB.Config.beta = -1 < AGB.Config.name.indexOf("Alpha") ? 2 : -1 < AGB.Config.name.indexOf("Beta") ? 1 : 0;
        AGB.DataBase ? AGB.DataBase.Start(window) : AGB.DataBase = {};
        AGB.Storage.Start(function () {
                              a = 1 < AGB.Config.beta ? "  - Development mode" : "";
                              a += AGB.Storage.status ? "  Storage Quota: local " +
                                                        chrome.storage.local.QUOTA_BYTES + "  sync " + chrome.storage.local.QUOTA_BYTES : "  Something wrong with chrome.storage";
                              AGB.Core.Log("Start  Storage: " + AGB.Storage.status + "  DataBase: " + AGB.DataBase.status + (a || ""
                                           ), !0
                              )
                          }
        )
    }, Check: function (a, c, b) {
        OBJ.is(b) && OBJ.is(c) && "loading" === c.status && (c = AGB.App.Check(b.url), OBJ.is(c) && c.mode && AGB.Manager.Load(c, a)
        )
    }, Load: function (a, c) {
        1 === a.mode && chrome.tabs.executeScript(c, {file: "js/coordinates.js", runAt: "document_start"})
    }, loadScripts: function (a, c) {
        var b;
        if (OBJ.is(a) &&
            c) {
            for (b = 0; b < a.length; b++) {
                a[b] && chrome.tabs.executeScript(c, {
                                                      file: "js/" + a[b] + ".js",
                                                      runAt: "document_start"
                                                  }
                )
            }
        }
    }, message: function (a, c, b, d) {
        var f;
        (f = AGB.App.getPlayer(a)
        ) && chrome.tabs.query({url: "*://*.ogame.gameforge.com/*"}, function (a) {
                                   var e;
                                   for (e = 0; e < a.length; e++) {
                                       a[e] && a[e].id && chrome.tabs.sendMessage(a[e].id, {
                                                                                      player: f,
                                                                                      page: c,
                                                                                      role: b,
                                                                                      data: d
                                                                                  }
                                       )
                                   }
                               }
        )
    }
};
chrome.tabs.onUpdated.addListener(AGB.Manager.Check);
chrome.runtime.onMessage.addListener(function (a, c, b) {
                                         b = "function" === typeof b ? b : null;
                                         if ((c = "object" === typeof c && c.tab ? c.tab.id : ""
                                             ) && "object" === typeof a && ("Log" === a.page ? window.console.log("AntiGameOrigin:  " + a.para) : "Storage" === a.page ? "Set" === a.role ? AGB.Storage.Set(a.para) : "Get" === a.role ? AGB.Storage.Get(a.para, b) : "Remove" === a.role ? AGB.Storage.Remove(a.para) : "RemoveFilter" === a.role && AGB.Storage.RemoveFilter(a.para, b) : "Update" === a.page ? "Check" === a.role && chrome.runtime.requestUpdateCheck(function (c) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              AGB.Manager.message(a.para,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  "Menu", "Install", c
                                                                                                                                                                                                                                                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                                                                                                                                                                                                                                                          }
                                             ) : a.page && OBJ.is(AGB[a.page]) && "function" === typeof AGB[a.page].Messages && AGB[a.page].Messages(a.role, a.para, b, c), b
                                             )) {
                                             return !0
                                         }
                                     }
);
AGB.Storage = {
    status: 0, Start: function (a) {
        var c;
        AGB.Storage.status = 0;
        chrome.storage && chrome.storage.local ? (c = Math.floor(Date.now() / 1E3), chrome.storage.local.set({App_Start: c}, function () {
                                                                                                                 chrome.storage.local.get(["App_Start"], function (b) {
                                                                                                                                              AGB.Storage.status = OBJ.is(b) && +b.App_Start === c ? 1 : 0;
                                                                                                                                              a()
                                                                                                                                          }
                                                                                                                 )
                                                                                                             }
        )
        ) : a()
    }, Set: function (a, c) {
        var b, d;
        OBJ.is(a) && (b = a.sync ? "sync" : "local", a.key ? (d = {}, d[a.key] = a.data
        ) : d = a.data, OBJ.is(d) && Object.keys(d).length && (c ? chrome.storage[b].set(d, function () {
                                                                                             c(chrome.runtime.lastError ? -1 :
                                                                                               1
                                                                                             )
                                                                                         }
        ) : chrome.storage[b].set(d)
        )
        )
    }, Get: function (a, c) {
        var b;
        OBJ.is(a) && a.key && c ? (b = a.sync ? "sync" : "local", OBJ.is(a.key) ? chrome.storage[b].get(Object.keys(a.key), c) : chrome.storage[b].get(a.key, function (b) {
                                                                                                                                                           c(OBJ.is(b) ? b[a.key] || "" : "")
                                                                                                                                                       }
        )
        ) : c && c("")
    }, Remove: function (a) {
        var c;
        OBJ.is(a) && a.key && (c = a.sync ? "sync" : "local", AGB.Core.Log("Delete - storage  - " + a.key, !0), chrome.storage[c].remove(a.key)
        )
    }, List: function (a) {
        OBJ.is(a) && (chrome.storage.local.get(null, function (c) {
                                                   OBJ.iterate(c, function (b) {
                                                                   a.filter && 0 !==
                                                                               STR.check(b).indexOf(a.filter) || AGB.Core.Log("List - storage  - " + b, !0)
                                                               }
                                                   )
                                               }
        ), chrome.storage.sync.get(null, function (c) {
                                       OBJ.iterate(c, function (b) {
                                                       a.filter && 0 !== STR.check(b).indexOf(a.filter) || AGB.Core.Log("List - sync  - " + b, !0)
                                                   }
                                       )
                                   }
        )
        )
    }, RemoveFilter: function (a) {
        OBJ.is(a) && (chrome.storage.local.get(null, function (c) {
                                                   OBJ.iterate(c, function (b) {
                                                                   a.filter && 0 !== STR.check(b).indexOf(a.filter) || (AGB.Core.Log("Delete - storage  - " + b, !0), chrome.storage.local.remove(b)
                                                                   )
                                                               }
                                                   )
                                               }
        ), chrome.storage.sync.get(null, function (c) {
                                       OBJ.iterate(c,
                                                   function (b) {
                                                       a.filter && 0 !== STR.check(b).indexOf(a.filter) || (AGB.Core.Log("Delete - sync  - " + b, !0), chrome.storage.sync.remove(b)
                                                       )
                                                   }
                                       )
                                   }
        )
        )
    }, Sync: function (a) {
    }
};