const AGB = {};

AGB.App = {
    Data: {},
    Player: {},
    Page: {
        overview: {page: "Overview", js: ["pages"], css: "pages"},
        resources: {page: "Resources", js: ["pages"], css: "pages"}, // #MCO
        supplies: {page: "Resources", js: ["pages"], css: "pages"},
        resourcesettings: {page: "ResourcesSettings", js: ["pages"], css: "pages"},
        station: {page: "Station", js: ["pages"], css: "pages"},
        traderoverview: {page: "Trader", js: ["pages"], css: "pages"},
        research: {page: "Research", js: ["pages"], css: "pages"},
        techtree: {page: "Techtree", js: ["pages"], css: "pages"},
        shipyard: {page: "Shipyard", js: ["pages"], css: "pages"},
        defense: {page: "Defense", js: ["pages"], css: "pages"},
        fleetdispatch: {page: "Fleet1", js: ["fleetdispatch"], css: "pages_fleetdispatch"},
        fleet1: {page: "Fleet1", js: ["fleet1"], css: "pages_fleet1"},
        fleet2: {page: "Fleet2", js: ["fleet2"], css: "pages_fleet2"},
        fleet3: {page: "Fleet3", js: ["fleet3"], css: "pages_fleet3"},
        movement: {page: "Movement", js: ["movement"], css: "pages_movement"},
        galaxy: {page: "Galaxy", js: ["jquery", "messages", "galaxy"], css: "pages_galaxy"},
        empire: {page: "Empire", js: ["jquery", "empire"], css: "pages_empire"},
        alliance: {page: "Alliance", js: ["pages"], css: "pages"},
        messages: {page: "Messages", js: ["jquery", "messages"], css: "pages_messages"},
        websim: {page: "Websim", js: ["simulators"], css: ""},
        osimulate: {page: "Osimulate", js: ["simulators"], css: ""}
    },
    Extern: {
        "speedsim.net": 2,
        "osimulate.com": 2,
        "gamestats.org": 1,
        "ogametools.com": 1,
        "oraiders.com": 1,
        "ghiroblu.com": 1,
        "projet-alternative.fr": 1,
        "galaxy.ddns.us": 1,
        "logserver.net": 1,
        "war-riders.de": 1,
        "kb.un1matr1x.de": 1,
        "savekb.de": 1,
        "drago-sim.com": 1,
        "mmorpg-stat.eu": 0,
        "infuza.com": 1,
        "savecr.com": 1
    },
    Messages: function (role, para, response, tabID) {
        if ("Start" === role)
            AGB.App.Start(para, response, tabID);
        else if ("Update" === role)
            AGB.App.Update(para, response);
        else if ("Refresh" === role)
            AGB.App.Refresh(para, response);
        else if ("Script" === role)
            OBJ.is(para) && AGB.Manager.loadScripts(para.scripts, tabID);
    },
    Check: function (url) {
        let tabData, host;
        url = STR.check(url).toLowerCase();
        host = (url.split("//")[1] || "").split("/")[0] || "";
        if (url) {
            tabData = {
                href: url,
                host: host
            };
            if (url.match(/https:\/\/.+\.ogame.gameforge.com\/game\/index\.php\?+.*page=*/i)) {
                tabData.mode = 3;
            } else {
                OBJ.iterate(AGB.App.Extern, function (app) {
                    if (host === app || -1 < host.indexOf("." + app)) {
                        tabData.mode = AGB.App.Extern[app]
                    }
                });
            }
            return tabData;
        } else {
            return null;
        }
    },
    Start: function (para, response, tabID) {
        let keyPlayer;

        if (OBJ.is(para) && para.page && response) {
            AGB.Manager.loadScripts(OBJ.get(AGB.App.Page[para.page], "js") || ["pages"], tabID);

            if (2 === para.mode) {
                response({
                    Page: OBJ.get(AGB.App.Page[para.page], "page") || "Page",
                    Label: AGB.Label.Data[para.abbrCom],
                    Background: AGB.Background.Data
                });
            } else if (3 <= para.mode && para.accountId && para.keyCom && para.keyUni && para.keyPlayer && AGB.Com.Check(para.abbrCom) && para.abbrUni && para.urlUni) {
                keyPlayer = para.keyPlayer;
                if (!OBJ.is(AGB.App.Player[para.keyUni])) {
                    AGB.App.Player[para.keyUni] = {
                        abbrUni: para.abbrUni,
                        urlUni: para.urlUni
                    };
                }

                AGB.App.Player[para.keyUni].keyPlayer = keyPlayer;
                if (!OBJ.is(AGB.App.Player[keyPlayer])) {
                    AGB.App.Player[keyPlayer] = {
                        accountId: para.accountId, abbrCom: para.abbrCom, abbrUni: para.abbrUni,
                        keyCom: para.keyCom, keyUni: para.keyUni, urlUni: para.urlUni
                    };
                }

                para.reload = para.reload || 1 !== AGB.App.Player[keyPlayer].status;
                AGB.App.Player[keyPlayer].status = 1;
                AGB.Core.clearTimeout(AGB.App.Player[keyPlayer].timeout);
                AGB.App.Player[keyPlayer].timeout = AGB.Core.setTimeout(function () {
                    AGB.status && AGB.App.Stop(keyPlayer)
                }, 5E3);
                AGB.Data.Init(para, function (forceReload) {
                    response({
                        Page: OBJ.get(AGB.App.Page[para.page], "page") || "Page",
                        reload: para.reload || forceReload,
                        keyPlayer: keyPlayer,
                        Option: AGB.Option.Data[keyPlayer],
                        DataBase: AGB.DataBase.Status(para),
                        Label: AGB.Label.Data[keyPlayer],
                        Item: AGB.Item.Data[keyPlayer],
                        App: AGB.App.Data[keyPlayer],
                        Uni: AGB.Uni.Data[keyPlayer],
                        Panel: AGB.Panel.Data[keyPlayer],
                        Box: AGB.Box.Data[keyPlayer],
                        Token: "galaxy" === para.page ? AGB.Token.Data[keyPlayer] : AGB.Token.Data[keyPlayer].Info,
                        Units: AGB.Units.Start(keyPlayer),
                        Fleet: AGB.Fleet.Data[keyPlayer],
                        Background: AGB.Background.Data
                    });
                });
            }
        }
    },
    Stop: function (a) {},
    Update: function (para, response) {
        let keyPlayer = AGB.App.getPlayer(para, "copy");
        if (keyPlayer && (para.reload || 2E3 < AGB.Time.timestamp() - (+AGB.App.Player[keyPlayer].timestampUpdate || 0))) {
            AGB.App.Player[keyPlayer].timestampUpdate = AGB.Time.timestamp();
            //AGB.App.Load(para);    #TODO: Server for updates
            AGB.Uni.Load(para);
            AGB.Label.Load(para);
            AGB.DataBase.Init(para);
            response && response();
        }
    },
    Refresh: function (para, response) {
        let keyPlayer = AGB.App.getPlayer(para);
        if (keyPlayer && response) {
            response({
                Option: AGB.Option.Data[keyPlayer],
                Panel: AGB.Panel.Data[keyPlayer],
                Box: AGB.Box.Data[keyPlayer],
                Fleet: AGB.Fleet.Data[keyPlayer],
                Background: AGB.Background.Data
            });
        }
    },
    Init: function (para, storage) {
        let appData, keyPlayer, appVersion;
        keyPlayer  = AGB.App.getPlayer(para, "copy");
        appVersion = AGB.Data.get("App", "Data", "version");
        if (keyPlayer) {
            appData = OBJ.parse(storage[AGB.Data.getKey(keyPlayer, "App", "Data")]);
            AGB.App.Data[keyPlayer] = appData.version === appVersion ? appData : {version: appVersion};
            AGB.App.Data[keyPlayer].storage = AGB.Storage.status;
        }
    },
    Load: function (app) {
        let keyPlayer;
        if (keyPlayer = AGB.App.getPlayer(app, "copy")) {
            let req;
            req = new XMLHttpRequest;
            req.open("POST", "https://###########/ago_appdata.php", true);
            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            req.onerror = req.onload = function () {
                let appData, keyPlayer, resObj;
                keyPlayer = AGB.App.getPlayer(app);
                appData = AGB.App.Data[keyPlayer];
                if (keyPlayer && appData) {
                    appData.storage = AGB.Storage.status;
                    resObj = OBJ.parse(200 === +req.status ? req.responseText : "");

                    if (resObj.versionFinal) {
                        appData.versionLoca = resObj.versionLoca;
                        appData.versionLocaMenu = resObj.versionLocaMenu;
                        appData.versionUpdate = 1 < AGB.Config.beta ? "" : 1 === AGB.Config.beta ? resObj.versionPreview : resObj.versionFinal;
                        AGB.App.Save({player: keyPlayer});
                    }

                    AGB.Core.Log("Update   - App      : " + appData.versionUpdate + "https://##################/ago_appdata.php" + (resObj.versionFinal ? "" : " - failed !"), true);
                }
            };
            req.send("domain=antigame.de&loca=" + app.abbrCom + "&locamenu=" + (AGB.Option.Get(keyPlayer, "A10") || app.abbrCom));
        }
    },
    Save: function (keyPlayer) {
        keyPlayer = AGB.App.getPlayer(keyPlayer);
        if (AGB.Data.isStorage(keyPlayer, "App", "Data") && OBJ.is(AGB.App.Data[keyPlayer]))
            AGB.Data.setStorage(keyPlayer, "App", "Data", AGB.App.Data[keyPlayer]);
    },
    Get: function (keyPlayer, key, c) {
        let value;
        if (keyPlayer && AGB.App.Data[keyPlayer] && key)
            value = AGB.App.Data[keyPlayer][key];
        return 6 === c ? STR.check(value) : +value || 0
    },
    Set: function (keyPlayer, key, value) {
        if (keyPlayer && AGB.App.Data[keyPlayer] && key && AGB.App.Data[keyPlayer][key] !== value) {
            AGB.App.Data[keyPlayer][key] = value;
            AGB.App.Save({player: keyPlayer});
        }
    },
    getUni: function (app) {
        if (AGB.status && app && app.keyUni && AGB.App.Player[app.keyUni]) {
            app.keyPlayer = AGB.App.Player[app.keyUni].keyPlayer;
            app.abbrUni = AGB.App.Player[app.keyUni].abbrUni;
            app.urlUni = AGB.App.Player[app.keyUni].urlUni;
            return app.keyUni;
        } else
            return "";
    },
    getPlayer: function (data, copy) {
        if (AGB.status && data && data.keyPlayer && AGB.App.Player[data.keyPlayer] && 1 === AGB.App.Player[data.keyPlayer].status) {
            if (copy) {
                data.accountId = AGB.App.Player[data.keyPlayer].accountId;
                data.abbrCom = AGB.App.Player[data.keyPlayer].abbrCom;
                data.abbrUni = AGB.App.Player[data.keyPlayer].abbrUni;
                data.keyCom = AGB.App.Player[data.keyPlayer].keyCom;
                data.keyUni = AGB.App.Player[data.keyPlayer].keyUni;
                data.urlUni = AGB.App.Player[data.keyPlayer].urlUni;
            }

            return data.keyPlayer;
        } else
            return "";
    }
};
AGB.Background = {
    Data: {},
    Messages: function (role, data) {
        if ("Set" === role) {
            AGB.Background.Set(data);
        }
    },
    Set: function (data) {
        if (OBJ.is(data) && data.key) {
            AGB.Background.Data[data.key] = data.value || "";
        }
    }
};
AGB.Data = {
    Status: {},
    Info: {
        App: {
            Data: {storage: 1, version: 3, tab: 2}
        },
        Uni: {
            Data: {storage: 1, version: 3, tab: 2}
        },
        Option: {
            Data: {storage: 4, version: 12, upgrade: 1},
            Local: {storage: 1}
        },
        Label: {
            Loca: {storage: 1, version: 1, key: 0},
            Api: {storage: 1, version: 1, key: 2}
        },
        Units: {
            Data: {storage: 2, version: 2}
        },
        Fleet: {
            Data: {storage: 2, version: 2},
            Routine: {tab: 2}, Expo: {tab: 2},
            Last: {tab: 3},
            Cooldown: {tab: 2}
        },
        Token: {
            Alliance: {storage: 3, version: 3, tab: 2},
            Player: {storage: 3, version: 3, tab: 2},
            Target: {storage: 3, version: 3, tab: 2},
            Current: {storage: 3, version: 3, tab: 2},
            Info: {tab: 1}
        },
        Panel: {
            Data: {storage: 2, version: 1},
            Settings: {tab: 2, label: "I10"},
            Account: {tab: 2, label: "I20"},
            Flights: {tab: 2, label: "I40"},
            Construction: {tab: 2, label: "I30"},
            Alliance: {tab: 2, label: "I60"},
            Player: {tab: 2, label: "I70"},
            Target: {tab: 2, label: "I80"},
            Tools: {tab: 2, label: "I90"},
            Box: {tab: 2},
            Cache: {tab: 1}
        },
        Box: {
            Cache: {tab: 1}
        },
        Construction: {
            Data: {storage: 2, version: 1}
        }
    },
    Messages: function (role, para, response) {
        if ("Backup" === role)
            AGB.Data.Backup(para, response);
        else if ("Restore" === role)
            AGB.Data.Restore(para, response);
        else if ("Remove" === role)
            AGB.Data.Remove(para, response);
        else if ("List" === role)
            AGB.Data.List(para);
    },
    Init: function (para, callback) {
        let keyPlayer, dataKeys;
        if ((keyPlayer = AGB.App.getPlayer(para)) && (!AGB.Data.Status[keyPlayer] || para.reload && 1 === AGB.Data.Status[keyPlayer])) {
            AGB.Data.Status[keyPlayer] = 3;
            dataKeys = {};
            OBJ.iterate(AGB.Data.Info, function (dataKey) {
                OBJ.iterate(AGB.Data.Info[dataKey], function (subKey) {
                    let key;
                    if (1 <= AGB.Data.Info[dataKey][subKey].storage) {
                        if (2 === AGB.Data.Info[dataKey][subKey].key) {
                            key = para.keyCom;
                        } else if (1 === AGB.Data.Info[dataKey][subKey].key) {
                            key = para.keyUni;
                        } else {
                            key = keyPlayer;
                        }
                        dataKeys[AGB.Data.getKey(key, dataKey, subKey)] = subKey;
                    }
                });
            });
            AGB.Storage.Get({key: dataKeys}, function (data) {
                data = OBJ.is(data) ? data : {};
                AGB.App.Init(para, data);
                AGB.Uni.Init(para, data);
                AGB.Option.Init(para, data);
                AGB.Label.Init(para, data);
                AGB.Units.Init(para, data);
                AGB.Fleet.Init(para, data);
                AGB.Token.Init(para, data);
                AGB.Panel.Init(para, data);
                AGB.Box.Init(para, data);
                AGB.Construction.Init(para, data);
                AGB.Item.Init(para);
                AGB.Data.Status[keyPlayer] = 1;
                callback && callback(true);
            });
        } else {
            callback && callback(false);
        }
    },
    Change: function () {
        AGB.Core.clearTimeout(AGB.Data.changeTimeout);
        AGB.Data.changeTimeout = AGB.Core.setTimeout(function () {
                AGB.status && AGB.Data.Save()
            }, 3E3
        )
    },
    Save: function (a, b) {
        function c(a) {
            var c;
            AGB.Data.isStatus(a) && (c = {keyPlayer: a, save: {}}, b && (c.backup = {}
                ), OBJ.iterate(AGB.Data.Info, function (a) {
                        AGB[a] &&
                        "function" === typeof AGB[a].Save && "App" !== a && AGB[a].Save(c)
                    }
                ), b ? AGB.Storage.Set({data: c.save}, function () {
                        b(c.backup)
                    }
                ) : AGB.Storage.Set({data: c.save})
            )
        }

        AGB.App.getPlayer(a) ? c(a.keyPlayer) : OBJ.iterate(AGB.Data.Status, c)
    },
    Sync: function (a) {
        var b, c, d;
        b = AGB.App.getPlayer(a);
        AGB.Data.isStatus(b) && (d = Boolean(AGB.Option.Get(b, "D60") && 3 === AGB.Option.Get(b, "D61")), c = {}, c[b + "_SYNC_Sync_Data"] = d, AGB.Data.iterate("", function (a, e) {
                    2 <= AGB.Data.get(a, e, "storage") && (c[b + "_SYNC_" + a + "_" + e] = d
                    )
                }
            ), AGB.Storage.Sync({
                    sync: !0,
                    mode: d, key: c
                }
            )
        )
    },
    Backup: function (a, b) {
        function c(a, b) {
            var c, d;
            d = "com=" + a.abbrCom + "&uni=" + a.abbrUni + "&user_id=" + a.accountId + "&ident=" + a.ident + "&type=Sync&action=put&domain=antigame.de&string=" + encodeURIComponent(JSON.stringify(a.data)) + "&header=" + encodeURIComponent(JSON.stringify(a.data.Sync_Data));
            c = new XMLHttpRequest;
            c.open("POST", "https://antigame.de/antigame/usave/ago_sync.php", !0);
            c.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            c.onerror = c.onload = function () {
                b && (a.status =
                        200 === +c.status && 7 <= +c.responseText ? 1 : -1, a.error = -1 === a.status, a.data = null, a.error || AGB.App.Set(a.keyPlayer, "timestampSync", a.timestamp), b(a)
                )
            };
            c.send(d)
        }

        function d(a, b) {
            var c = {};
            OBJ.iterate(a.data, function (b) {
                    c[a.keyPlayer + "_SYNC_" + b] = JSON.stringify(a.data[b])
                }
            );
            AGB.Storage.Set({sync: true, data: c}, function (c) {
                    b && (a.status = c, a.error = -1 === c, a.data = null, a.error || AGB.App.Set(a.keyPlayer, "timestampSync", a.timestamp), b(a)
                    )
                }
            )
        }

        var g, e, f, h;
        g = AGB.App.getPlayer(a, "copy");
        AGB.Data.isStatus(g) && (e = a.tab, h = OBJ.create(a),
                h.timestamp = AGB.Time.timestamp(), h.list = {}, h.data = {}, h.timestampLocal = AGB.App.Get(g, "timestampSync"), h.data.Sync_Data = {
                com: a.abbrCom,
                uni: a.abbrUni,
                player: a.accountId,
                timestamp: h.timestamp
            }, f = 3 === e ? 4E3 : 2 === e ? 1E4 : 3E5, AGB.Data.Save(a, function (a) {
                    OBJ.iterate(a, function (b) {
                            var c;
                            c = OBJ.parse(a[b]);
                            STR.check(a[b]).length > f ? (h.data[b] = {version: 0}, h.data.Sync_Data[b] = 1, h.list[b] = -1
                            ) : (h.data[b] = c.version ? c : {version: 1}, h.data.Sync_Data[b] = STR.hash(JSON.stringify(h.data[b])), h.list[b] = 1
                            )
                        }
                    );
                    1 === e ? b && b(h) : 2 ===
                    e ? c(h, b) : 3 === e && d(h, b)
                }
            )
        )
    },
    Restore: function (a, b) {
        function c(c, d) {
            var e;
            e = {tab: a.tab, list: {}};
            if (OBJ.is(c) && !c.error) {
                e.universal = d = 1 === a.tab && d;
                e.timestampLocal = AGB.App.Get(g, "timestampSync");
                e.timestamp = +c.timestamp || 0;
                e.com = c.com === a.abbrCom ? 1 : c.com && !d ? -1 : 0;
                e.uni = c.uni === a.abbrUni ? 1 : c.uni && !d ? -1 : 0;
                e.player = +c.player === +a.accountId ? 1 : c.player && !d ? -1 : 0;
                e.status = e.timestamp ? e.timestamp === e.timestampLocal ? 1 : e.timestamp > e.timestampLocal ? 4 : 3 : -1;
                if (1 === a.tab) {
                    -1 === e.com && (a.type = Math.max(a.type, 3)
                    ), -1 ===
                    e.uni && (a.type = Math.max(a.type, 4)
                    ), -1 === e.player && (a.type = 9
                    );
                } else if (1 !== e.com || 1 !== e.uni || 1 !== e.player) {
                    a.type = 0;
                }
                2 <= a.type ? AGB.Data.Save(a, function (d) {
                        AGB.Data.iterate("", function (b, g) {
                                var f;
                                AGB.Data.get(b, g, "storage") >= a.type && (f = b + "_" + g, e.list[f] = c[f] ? 1 === c[f] ? -1 : c[f] === STR.hash(d[f]) ? 1 : 2 : 0
                                )
                            }
                        );
                        b && b(e)
                    }
                ) : (e.status = -1, b && b(e)
                )
            } else {
                e.status = -1, b && b(e)
            }
        }

        function d(c, d) {
            var e, f;
            f = {tab: a.tab, list: {}, data: {}};
            if (OBJ.is(c) && !c.error && OBJ.is(c.Sync_Data)) {
                e = c.Sync_Data;
                f.universal = d = 1 === a.tab && d;
                f.timestamp =
                    +e.timestamp || 0;
                f.com = e.com === a.abbrCom ? 1 : e.com && !d ? -1 : 0;
                f.uni = e.uni === a.abbrUni ? 1 : e.uni && !d ? -1 : 0;
                f.player = +e.player === +a.accountId ? 1 : e.player && !d ? -1 : 0;
                if (1 === a.tab) {
                    -1 === f.com && (a.type = Math.max(a.type, 3)
                    ), -1 === f.uni && (a.type = Math.max(a.type, 4)
                    ), -1 === f.player && (a.type = 9
                    );
                } else if (1 !== f.com || 1 !== f.uni || 1 !== f.player) {
                    a.type = 9;
                }
                AGB.Data.iterate("", function (b, d) {
                        var e;
                        e = b + "_" + d;
                        AGB.Data.get(b, d, "storage") >= a.type && 1 <= +OBJ.get(c[e], "version") && (f.list[e] = 1, f.data[g + "_" + e] = JSON.stringify(c[e])
                        )
                    }
                );
                Object.keys(f.data).length ?
                    AGB.Storage.Set({data: f.data}, function (a) {
                            1 === a && AGB.App.Set(g, "timestampSync", +f.timestamp || AGB.Time.timestamp());
                            AGB.Data.Status[g] = 0;
                            f.status = a;
                            f.data = null;
                            b && b(f)
                        }
                    ) : (f.status = 0, f.data = null, b && b(f)
                    )
            } else {
                f.status = -1, b && b(f)
            }
        }

        var g, e, f;
        g = AGB.App.getPlayer(a, "copy");
        AGB.Data.isStatus(g) && (1 === a.tab ? "restore" === a.action ? d(OBJ.parse(a.value), a.universal) : c(OBJ.parse(a.value).Sync_Data, a.universal) : 2 === a.tab ? (f = "com=" + a.abbrCom + "&uni=" + a.abbrUni + "&user_id=" + a.accountId + "&ident=" + a.ident + "&type=Sync&action=" +
                    ("restore" === a.action ? "get" : "header"
                    ) + "&domain=antigame.de", e = new XMLHttpRequest, e.open("POST", "https://antigame.de/antigame/usave/ago_sync.php", !0), e.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), e.onerror = e.onload = function () {
                    var b;
                    b = 200 === +e.status && e.responseText ? OBJ.parse(e.responseText) : {error: !0};
                    "restore" === a.action ? d(b) : c(b)
                }, e.send(f)
            ) : 3 === a.tab && (f = {}, f[g + "_SYNC_Sync_Data"] = "Sync_Data", AGB.Data.iterate("", function (a, b) {
                        2 <= AGB.Data.get(a, b, "storage") && (f[g + "_SYNC_" +
                            a + "_" + b] = a + "_" + b
                        )
                    }
                ), AGB.Storage.Get({sync: !0, key: f}, function (b) {
                        var e = {};
                        OBJ.iterate(b, function (a) {
                                var c = STR.check(a).split("_SYNC_")[1];
                                c && (e[c] = OBJ.parse(b[a])
                                )
                            }
                        );
                        "restore" === a.action ? d(e) : c(e.Sync_Data)
                    }
                )
            )
        )
    },
    List: function (a) {
        OBJ.is(a) && AGB.Storage.List(a)
    },
    Remove: function (a, b) {
        var c, d, g, e;
        c = AGB.App.getPlayer(a, "copy");
        if (AGB.Data.isStatus(c)) {
            d = a.mode;
            e = (g = VAL.check(d, "acc", "ago")
            ) || !1;
            if (g || "Account" === d) {
                e = !0, AGB.Data.removeStorageGroup(a, "App"), AGB.Data.removeStorageGroup(a, "Label"), AGB.Data.removeStorageGroup(a,
                    "Units"
                ), AGB.Data.removeStorageGroup(a, "Fleet"), AGB.Data.removeStorageGroup(a, "Messages");
            }
            if (g || "Token" === d) {
                e = !0, AGB.Data.removeStorageGroup(a, "Token");
            }
            if (g || "Panel" === d) {
                e = !0, AGB.Data.removeStorageGroup(a, "Panel"), AGB.Data.removeStorageGroup(a, "Construction");
            }
            if (g || "Option" === d) {
                e = !0, AGB.Data.removeStorageGroup(a, "Option");
            }
            (g || "DataBase" === d
            ) && AGB.DataBase.Remove(a);
            "acc" === d && AGB.Storage.RemoveFilter({filter: c});
            "ago" === d && AGB.Storage.RemoveFilter({filter: ""});
            e && (AGB.Data.Status[c] = 0
            )
        }
        b && b(e)
    },
    removeStorageGroup: function (a, b) {
        OBJ.is(a) && AGB.Data.Info[b] && AGB.Data.iterate(b, function (c, d) {
                var g;
                1 <= c.storage && (g = 2 === c.key ? a.keyCom : 1 === c.key ? a.keyUni : a.keyPlayer, AGB.Storage.Remove({key: AGB.Data.getKey(g, b, d)})
                )
            }
        )
    },
    setStorage: function (a, b, c, d) {
        a && (d = OBJ.is(d) ? JSON.stringify(d) : d || "", AGB.Storage.Set({key: AGB.Data.getKey(a, b, c), data: d})
        )
    },
    iterate: function (a, b) {
        var c;
        if (AGB.Data.Info[a]) {
            for (c in AGB.Data.Info[a]) {
                AGB.Data.Info[a].hasOwnProperty(c) && b(AGB.Data.Info[a][c], c);
            }
        } else if (!a) {
            for (a in AGB.Data.Info) {
                if (AGB.Data.Info.hasOwnProperty(a)) {
                    for (c in AGB.Data.Info[a]) {
                        AGB.Data.Info[a].hasOwnProperty(c) &&
                        b(a, c)
                    }
                }
            }
        }
    },
    getKey: function (a, b, c) {
        return AGB.Data.Info[b] && AGB.Data.Info[b][c] ? a + "_" + b + "_" + c : ""
    },
    get: function (a, b, c, d) {
        return AGB.Data.Info[a] && AGB.Data.Info[a][b] ? 6 === d ? STR.check(AGB.Data.Info[a][b][c] || "") : +AGB.Data.Info[a][b][c] || 0 : 6 === d ? "" : 0
    },
    getTab: function (a, b) {
        return a && a.tab && AGB.Data.Info[b] && AGB.Data.Info[b][a.tab] && AGB.Data.Info[b][a.tab].tab ? a.tab : ""
    },
    set: function (a, b, c, d) {
        AGB.Data.Info[a] && AGB.Data.Info[a][b] && (AGB.Data.Info[a][b][c] = +d || 0
        )
    },
    isStorage: function (a, b, c) {
        return a && AGB.Data.Status[a] &&
        b && AGB.Data.Info[b] && AGB.Data.Info[b][c] ? AGB.Data.Info[b][c].storage : 0
    },
    isBackup: function (a, b, c, d) {
        return Boolean(a && AGB.Data.Status[a] && b && AGB.Data.Info[b] && AGB.Data.Info[b][c] && AGB.Data.Info[b][c].storage >= d)
    },
    isStatus: function (a) {
        return a && 1 === AGB.Data.Status[a]
    }
};
AGB.Com = {
    Data: {
        AR: {
            infuzaServer: "ogame.com.ar",
            websim: "sp",
            osimulate: "ar",
            dragosim: "spanish",
            warriders: "",
            infuza: "es",
            mmorpgStat: "7",
            trashsim: "es"
        },
        BA: {
            infuzaServer: "ba.ogame.org",
            websim: "ba",
            osimulate: "hr",
            dragosim: "bosnian",
            warriders: "",
            infuza: "en",
            mmorpgStat: "27",
            trashsim: "hr"
        },
        BR: {
            infuzaServer: "ogame.com.br",
            websim: "pt",
            osimulate: "br",
            dragosim: "brazilian",
            warriders: "",
            infuza: "pt",
            mmorpgStat: "13",
            trashsim: "pt-BR"
        },
        CZ: {
            infuzaServer: "ogame.cz",
            websim: "cz", osimulate: "cz", dragosim: "czech", warriders: "", infuza: "cs", mmorpgStat: "17",
            trashsim: "cs"
        },
        DE: {
            infuzaServer: "ogame.de",
            websim: "de",
            osimulate: "de",
            dragosim: "german",
            warriders: "de",
            infuza: "de",
            mmorpgStat: "1",
            trashsim: "de"
        },
        DK: {
            infuzaServer: "ogame.dk",
            websim: "dk",
            osimulate: "dk",
            dragosim: "danish",
            warriders: "",
            infuza: "da",
            mmorpgStat: "21",
            trashsim: "da"
        },
        EN: {
            infuzaServer: "ogame.org",
            websim: "en",
            osimulate: "en",
            dragosim: "english",
            warriders: "org",
            infuza: "en",
            mmorpgStat: "2",
            trashsim: "en"
        },
        ES: {
            infuzaServer: "ogame.com.es", websim: "sp", osimulate: "es", dragosim: "spanish",
            warriders: "es", infuza: "es", mmorpgStat: "3",
            trashsim: "es"
        },
        FI: {
            infuzaServer: "fi.ogame.org",
            websim: "fi",
            osimulate: "fi",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "10",
            trashsim: "sv"
        },
        FR: {
            infuzaServer: "ogame.fr",
            websim: "fr",
            osimulate: "fr",
            dragosim: "french",
            warriders: "fr",
            infuza: "fr",
            mmorpgStat: "0",
            trashsim: "fr"
        },
        GR: {
            infuzaServer: "ogame.gr",
            websim: "gr",
            osimulate: "gr",
            dragosim: "greek",
            warriders: "",
            infuza: "en",
            mmorpgStat: "12",
            trashsim: "el"
        },
        HR: {
            infuzaServer: "ogame.com.hr",
            websim: "ba",
            osimulate: "hr",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "15",
            trashsim: "hr"
        },
        HU: {
            infuzaServer: "ogame.hu",
            websim: "hu", osimulate: "hu", dragosim: "hungarian", warriders: "", infuza: "hu", mmorpgStat: "25",
            trashsim: "hu"
        },
        IT: {
            infuzaServer: "ogame.it",
            websim: "it",
            osimulate: "it",
            dragosim: "italian",
            warriders: "",
            infuza: "it",
            mmorpgStat: "5",
            trashsim: "it"
        },
        JP: {
            infuzaServer: "ogame.jp",
            websim: "ja",
            osimulate: "jp",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "26",
            trashsim: "en"
        },
        MX: {
            infuzaServer: "mx.ogame.org",
            websim: "sp",
            osimulate: "mx",
            dragosim: "spanish",
            warriders: "",
            infuza: "es",
            mmorpgStat: "8",
            trashsim: "es"
        },
        NL: {
            infuzaServer: "ogame.nl", websim: "nl", osimulate: "nl", dragosim: "dutch",
            warriders: "", infuza: "nl", mmorpgStat: "14",
            trashsim: "nl"
        },
        NO: {
            infuzaServer: "ogame.no",
            websim: "no",
            osimulate: "no",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "22",
            trashsim: "en"
        },
        PL: {
            infuzaServer: "ogame.pl",
            websim: "pl",
            osimulate: "pl",
            dragosim: "polish",
            warriders: "pl",
            infuza: "pl",
            mmorpgStat: "4",
            trashsim: "pl"
        },
        PT: {
            infuzaServer: "ogame.com.pt",
            websim: "pt",
            osimulate: "pt",
            dragosim: "portuguese",
            warriders: "",
            infuza: "pt",
            mmorpgStat: "20",
            trashsim: "pt"
        },
        RO: {
            infuzaServer: "ogame.ro",
            websim: "ro",
            osimulate: "ro",
            dragosim: "romanian",
            warriders: "",
            infuza: "ro",
            mmorpgStat: "18",
            trashsim: "ro"
        },
        RU: {
            infuzaServer: "ogame.ru",
            websim: "ru", osimulate: "ru", dragosim: "russian", warriders: "", infuza: "ru", mmorpgStat: "6",
            trashsim: "ru"
        },
        SE: {
            infuzaServer: "ogame.se",
            websim: "sv",
            osimulate: "se",
            dragosim: "swedish",
            warriders: "",
            infuza: "sv",
            mmorpgStat: "23",
            trashsim: "sv"
        },
        SI: {
            infuzaServer: "ogame.si",
            websim: "si",
            osimulate: "si",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "24",
            trashsim: "en"
        },
        SK: {
            infuzaServer: "ogame.sk",
            websim: "sk",
            osimulate: "sk",
            dragosim: "slovak",
            warriders: "",
            infuza: "en",
            mmorpgStat: "16",
            trashsim: "en"
        },
        TR: {
            infuzaServer: "tr.ogame.org", websim: "tr", osimulate: "tr", dragosim: "turkish",
            warriders: "", infuza: "en", mmorpgStat: "9",
            trashsim: "tr"
        },
        TW: {
            infuzaServer: "ogame.tw",
            websim: "tw",
            osimulate: "tw",
            dragosim: "taiwanese",
            warriders: "",
            infuza: "en",
            mmorpgStat: "11",
            trashsim: "zh"
        },
        US: {
            infuzaServer: "ogame.us",
            websim: "en",
            osimulate: "us",
            dragosim: "english",
            warriders: "us",
            infuza: "en",
            mmorpgStat: "19",
            trashsim: "en"
        },
        ORIGIN: {
            infuzaServer: "pioneers.ogame.org",
            websim: "en",
            osimulate: "en",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            mmorpgStat: "en",
            trashsim: "en"
        }
    }, Get: function (a, b) {
        return a && AGB.Com.Data[a] ? AGB.Com.Data[a][b] || "" : ""
    }, Check: function (a) {
        return a && a in AGB.Com.Data
    }
};
AGB.Uni = {
    Data: {},
    Info: {
        status: 2,
        speed: 1,
        speedFleet: 1,
        galaxies: 50,
        systems: 499,
        positions: 17,
        rapidFire: 1,
        acs: 1,
        defToTF: 0,
        debrisFactor: .3,
        debrisFactorDef: .3,
        repairFactor: .7,
        newbieProtectionLimit: 0,
        newbieProtectionHigh: 0,
        topScore: 0,
        donutGalaxy: 0,
        donutSystem: 0,
        probeCargo: 0,
        globalDeuteriumSaveFactor: 1,
        cargoHyperspaceTechMultiplier: 2,
        resourceBuggyEnergyConsumptionPerUnit: 50,
        name: ""
    },
    Init: function (a, b) {
        var c, d, g;
        g = AGB.Data.get("Uni", "Data", "version");
        if (d = AGB.App.getPlayer(a)) {
            AGB.Uni.Data[d] = OBJ.create(AGB.Uni.Info), AGB.Uni.Data[d].version = g, c = OBJ.parse(b[AGB.Data.getKey(d, "Uni", "Data")]), c.version === g && OBJ.copy(c, AGB.Uni.Data[d])
        }
    },
    Save: function (a) {
        a = AGB.App.getPlayer(a);
        AGB.Data.isStatus(a) && OBJ.is(AGB.Uni.Data[a]) && AGB.Data.setStorage(a, "Uni", "Data", AGB.Uni.Data[a])
    },
    Load: function (a) {
        var b;
        AGB.App.getPlayer(a, "copy") && (b = new XMLHttpRequest, b.open("GET", a.urlUni + "/api/serverData.xml?nocache=" + AGB.Time.timestamp(), !0), b.overrideMimeType("text/html"), b.setRequestHeader("Cache-Control", "no-cache"), b.setRequestHeader("Pragma", "no-cache"), b.onerror = b.onload = function () {
                var c, d, g;
                d = AGB.App.getPlayer(a);
                c = AGB.Uni.Data[d];
                d && c && (200 === +b.status && b.responseText && OBJ.iterate(AGB.Uni.Info,
                        function (a) {
                            var d;
                            d = b.responseText.split("<" + a + ">");
                            2 === d.length && (g = 1, d = (d[1] || ""
                                ).split("<")[0], d = (d || ""
                                ).trim(), c[a] = "number" === typeof AGB.Uni.Info[a] ? +d || 0 : d
                            )
                        }
                    ), 1 === g && (c.status = 1, AGB.Uni.Save(a)
                    ), AGB.Core.Log("Update   - Uni      : " + a.urlUni + "/api/serverData.xml" + (g = 1, ""
                    ), !0
                    )
                )
            }, b.send(null)
        )
    },
    Get: function (a, b, c) {
        var d;
        a && AGB.Uni.Data[a] && b && (d = AGB.Uni.Data[a][b]
        );
        return 6 === c ? STR.check(d) : +d || 0
    }
};