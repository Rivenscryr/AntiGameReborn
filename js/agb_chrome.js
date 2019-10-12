AGB.Manager = {
    Start: function () {
        AGB.status = 1;
        AGB.Config.pathSkin = chrome.extension.getURL("/skin/");
        AGB.Config.id = chrome.runtime.id;
        AGB.Config.version = chrome.runtime.getManifest().version;
        AGB.Config.name = STR.check(chrome.runtime.getManifest().name);
        AGB.Config.beta = -1 < AGB.Config.name.indexOf("Alpha") ? 2 : -1 < AGB.Config.name.indexOf("Beta") ? 1 : 0;

        if (AGB.DataBase)
            AGB.DataBase.Start(window);
        else
            AGB.DataBase = {};

        AGB.Storage.Start(function () {
            let statusText;
            statusText = 1 < AGB.Config.beta ? "  - Development mode" : "";
            statusText += AGB.Storage.status ? "  Storage Quota: local " + chrome.storage.local.QUOTA_BYTES + "  sync " + chrome.storage.local.QUOTA_BYTES : "  Something wrong with chrome.storage";
            AGB.Core.Log("Start  Storage: " + AGB.Storage.status + "  DataBase: " + AGB.DataBase.status + (statusText || ""), !0)
        });
    },
    Check: function (tabID, changeInfo, tab) {
        if (OBJ.is(tab) && OBJ.is(changeInfo) && "loading" === changeInfo.status) {
            let tabData = AGB.App.Check(tab.url);
            OBJ.is(tabData) && tabData.mode && AGB.Manager.Load(tabData, tabID);
        }
    },
    Load: function (tabData, tabID) {
        1 === tabData.mode && chrome.tabs.executeScript(tabID, {file: "js/coordinates.js", runAt: "document_start"});
    },
    loadScripts: function (scripts, tabID) {
        if (OBJ.is(scripts) && tabID) {
            for (let i = 0; i < scripts.length; i++) {
                scripts[i] && chrome.tabs.executeScript(tabID, { file: "js/" + scripts[i] + ".js", runAt: "document_start"});
            }
        }
    },
    message: function (para, page, role, data) {
        let keyPlayer = AGB.App.getPlayer(para);
        keyPlayer && chrome.tabs.query({url: "*://*.ogame.gameforge.com/*"}, function (tabs) {
            for (let i = 0; i < tabs.length; i++) {
                tabs[i] && tabs[i].id && chrome.tabs.sendMessage(tabs[i].id, {
                    player: keyPlayer,
                    page: page,
                    role: role,
                    data: data
                });
            }
        });
    }
};
chrome.tabs.onUpdated.addListener(AGB.Manager.Check);
chrome.runtime.onMessage.addListener(function (message, sender, response) {
    response = "function" === typeof response ? response : null;
    sender = "object" === typeof sender && sender.tab ? sender.tab.id : "";
        if (sender && "object" === typeof message) {
            if ("Log" === message.page) {
                window.console.log("AntiGameReborn:  " + message.para);
            } else if ("Storage" === message.page) {
                if ("Set" === message.role)
                    AGB.Storage.Set(message.para);
                else if ("Get" === message.role)
                    AGB.Storage.Get(message.para, response);
                else if ("Remove" === message.role)
                    AGB.Storage.Remove(message.para);
                else if ("RemoveFilter" === message.role)
                    AGB.Storage.RemoveFilter(message.para, response)
            } else if ("Update" === message.page && "Check" === message.role) {
                chrome.runtime.requestUpdateCheck(function (update) {
                    AGB.Manager.message(message.para, "Menu", "Install", update);
                });
            } else if (message.page && OBJ.is(AGB[message.page]) && "function" === typeof AGB[message.page].Messages)
                AGB[message.page].Messages(message.role, message.para, response, sender);

            if (response) return true;
        }
    }
);
AGB.Storage = {
    status: 0,
    Start: function (callback) {
        let appStart;
        AGB.Storage.status = 0;
        if (chrome.storage && chrome.storage.local) {
            appStart = Math.floor(Date.now() / 1E3);
            chrome.storage.local.set({App_Start: appStart}, function () {
                chrome.storage.local.get(["App_Start"], function (res) {
                    AGB.Storage.status = OBJ.is(res) && +res.App_Start === appStart ? 1 : 0;
                    callback();
                });
            });
        } else
            callback();
    },
    Set: function (para, callback) {
        let storageType, data;
        if (OBJ.is(para)) {
            storageType = para.sync ? "sync" : "local";

            if (para.key) {
                data = {};
                data[para.key] = para.data;
            } else {
                data = para.data;
            }

            if (OBJ.is(data) && Object.keys(data).length) {
                if (callback) {
                    chrome.storage[storageType].set(data, function () {
                        callback(chrome.runtime.lastError ? -1 : 1)
                    });
                } else {
                    chrome.storage[storageType].set(data);
                }
            }

        }
    },
    Get: function (para, callback) {
        let storageType;
        if (callback) {
            if (OBJ.is(para) && para.key) {
                storageType = para.sync ? "sync" : "local";
                if (OBJ.is(para.key))
                    chrome.storage[storageType].get(Object.keys(para.key), callback);
                else
                    chrome.storage[storageType].get(para.key, function (data) {
                        callback(OBJ.is(data) ? data[para.key] || "" : "")
                    });
            } else {
                callback("");
            }
        }
    },
    Remove: function (para) {
        let storageType;
        if (OBJ.is(para) && para.key) {
            storageType = para.sync ? "sync" : "local";
            AGB.Core.Log("Delete - storage  - " + para.key, !0);
            chrome.storage[storageType].remove(para.key);
        }
    },
    List: function (data) {
        if (OBJ.is(data)) {
            chrome.storage.local.get(null, function (items) {
                OBJ.iterate(items, function (key) {
                    if (!data.filter || 0 === STR.check(key).indexOf(data.filter))
                        AGB.Core.Log("List - storage  - " + key, true);
                });
            });
            chrome.storage.sync.get(null, function (items) {
                OBJ.iterate(items, function (key) {
                    if (!data.filter || 0 === STR.check(key).indexOf(data.filter))
                        AGB.Core.Log("List - sync  - " + key, true);
                })
            });
        }
    },
    RemoveFilter: function (data) {
        if (OBJ.is(data)) {
            chrome.storage.local.get(null, function (items) {
                OBJ.iterate(items, function (key) {
                    if (!data.filter || 0 === STR.check(key).indexOf(data.filter)) {
                        AGB.Core.Log("Delete - storage  - " + key, true);
                        chrome.storage.local.remove(key);
                    }
                })
            });
            chrome.storage.sync.get(null, function (key) {
                OBJ.iterate(key, function (key) {
                    if (!data.filter || 0 === STR.check(key).indexOf(data.filter)) {
                        AGB.Core.Log("Delete - sync  - " + key, true);
                        chrome.storage.sync.remove(key);
                    }
                })
            });
        }
    },
    Sync: function (a) {}
};