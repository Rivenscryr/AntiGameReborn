if (!AGB) {
    var AGB = {};
}
AGB.App = {
    Data: {},
    Player: {},
    Page: {
        overview: {page: "Overview", js: ["pages"], css: "pages"},
        resources: {page: "Resources", js: ["pages"], css: "pages"},
        resourcesettings: {page: "ResourcesSettings", js: ["pages"], css: "pages"},
        station: {page: "Station", js: ["pages"], css: "pages"},
        traderoverview: {page: "Trader", js: ["pages"], css: "pages"},
        research: {page: "Research", js: ["pages"], css: "pages"},
        techtree: {page: "Techtree", js: ["pages"], css: "pages"},
        shipyard: {page: "Shipyard", js: ["pages"], css: "pages"},
        defense: {page: "Defense", js: ["pages"], css: "pages"},
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
        "ogniter.org": 1,
        "infuza.com": 1,
        "savecr.com": 1
    },
    Messages: function (a, b, c, d) {
        "Start" === a ? AGB.App.Start(b, c, d) : "Update" === a ? AGB.App.Update(b, c) : "Refresh" ===
                                                                                         a ? AGB.App.Refresh(b, c) : "Script" === a && OBJ.is(b) && AGB.Manager.loadScripts(b.scripts, d)
    },
    Check: function (a) {
        var b, c;
        a = STR.check(a).toLowerCase();
        c = (a.split("//")[1] || ""
            ).split("/")[0] || "";
        return a ? (b = {
            href: a,
            host: c
        }, a.match(/http||https:\/\/.+\.ogame.gameforge.com\/game\/index\.php\?+.*page=*/i) ? b.mode = 3 : OBJ.iterate(AGB.App.Extern, function (a) {
                                                                                                                    if (c === a || -1 < c.indexOf("." + a)) {
                                                                                                                        b.mode = AGB.App.Extern[a]
                                                                                                                    }
                                                                                                                }
        ), b
        ) : null
    },
    Start: function (a, b, c) {
        var d;
        OBJ.is(a) && a.page && b && (AGB.Manager.loadScripts(OBJ.get(AGB.App.Page[a.page],
                                                                     "js"
                                                             ) || ["pages"], c
        ), 2 === a.mode ? b({
                                Page: OBJ.get(AGB.App.Page[a.page], "page") || "Page",
                                Label: AGB.Label.Data[a.abbrCom],
                                Background: AGB.Background.Data
                            }
        ) : 3 <= a.mode && a.accountId && a.keyCom && a.keyUni && a.keyPlayer && AGB.Com.Check(a.abbrCom) && a.abbrUni && a.urlUni && (d = a.keyPlayer, OBJ.is(AGB.App.Player[a.keyUni]) || (AGB.App.Player[a.keyUni] = {
            abbrUni: a.abbrUni,
            urlUni: a.urlUni
        }
        ), AGB.App.Player[a.keyUni].keyPlayer = d, OBJ.is(AGB.App.Player[d]) || (AGB.App.Player[d] = {
            accountId: a.accountId, abbrCom: a.abbrCom, abbrUni: a.abbrUni,
            keyCom: a.keyCom, keyUni: a.keyUni, urlUni: a.urlUni
        }
        ), a.reload = a.reload || 1 !== AGB.App.Player[d].status, AGB.App.Player[d].status = 1, AGB.Core.clearTimeout(AGB.App.Player[d].timeout), AGB.App.Player[d].timeout = AGB.Core.setTimeout(function () {
                                                                                                                                                                                                      AGB.status && AGB.App.Stop(d)
                                                                                                                                                                                                  }, 5E3
        ), AGB.Data.Init(a, function (c) {
                             b({
                                   Page:   OBJ.get(AGB.App.Page[a.page], "page") || "Page",
                                   reload: a.reload || c,
                                   keyPlayer: d,
                                   Option: AGB.Option.Data[d],
                                   DataBase: AGB.DataBase.Status(a),
                                   Label: AGB.Label.Data[d],
                                   Item: AGB.Item.Data[d],
                                   App: AGB.App.Data[d],
                                   Uni: AGB.Uni.Data[d],
                                   Panel: AGB.Panel.Data[d],
                                   Box: AGB.Box.Data[d],
                                   Token: "galaxy" === a.page ? AGB.Token.Data[d] : AGB.Token.Data[d].Info,
                                   Units: AGB.Units.Start(d),
                                   Fleet: AGB.Fleet.Data[d],
                                   Background: AGB.Background.Data
                               }
                             )
                         }
        )
        )
        )
    },
    Stop: function (a) {
    },
    Update: function (a, b) {
        var c;
        (c = AGB.App.getPlayer(a, "copy")
        ) && (a.reload || 2E3 < AGB.Time.timestamp() - (+AGB.App.Player[c].timestampUpdate || 0
        )
        ) && (AGB.App.Player[c].timestampUpdate = AGB.Time.timestamp(), AGB.App.Load(a), AGB.Uni.Load(a), AGB.Label.Load(a), AGB.DataBase.Init(a), b &&
                                                                                                                                                   b()
        )
    },
    Refresh: function (a, b) {
        var c;
        (c = AGB.App.getPlayer(a)
        ) && b && b({
                        Option: AGB.Option.Data[c],
                        Panel: AGB.Panel.Data[c],
                        Box: AGB.Box.Data[c],
                        Fleet: AGB.Fleet.Data[c],
                        Background: AGB.Background.Data
                    }
        )
    },
    Init: function (a, b) {
        var c, d, g;
        g = AGB.Data.get("App", "Data", "version");
        if (d = AGB.App.getPlayer(a, "copy")) {
            c = OBJ.parse(b[AGB.Data.getKey(d, "App", "Data")]), AGB.App.Data[d] = c.version === g ? c : {version: g}, AGB.App.Data[d].storage = AGB.Storage.status
        }
    },
    Load: function (a) {
        var b, c;
        if (c = AGB.App.getPlayer(a, "copy")) {
            b = new XMLHttpRequest,
                b.open("POST", "https://antigame.de/antigame/ago_appdata.php", !0), b.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), b.onerror = b.onload = function () {
                var c, g, e;
                g = AGB.App.getPlayer(a);
                c = AGB.App.Data[g];
                g && c && (c.storage = AGB.Storage.status, e = OBJ.parse(200 === +b.status ? b.responseText : ""), e.versionFinal && (c.versionLoca = e.versionLoca, c.versionLocaMenu = e.versionLocaMenu, c.versionUpdate = 1 < AGB.Config.beta ? "" : 1 === AGB.Config.beta ? e.versionPreview : e.versionFinal, AGB.App.Save({player: g})
                ), AGB.Core.Log("Update   - App      : " +
                                c.versionUpdate + "https://antigame.de/antigame/ago_appdata.php" + (e.versionFinal ? "" : " - failed !"
                                ), !0
                )
                )
            }, b.send("domain=antigame.de&loca=" + a.abbrCom + "&locamenu=" + (AGB.Option.Get(c, "A10") || a.abbrCom
                      )
            )
        }
    },
    Save: function (a) {
        a = AGB.App.getPlayer(a);
        AGB.Data.isStorage(a, "App", "Data") && OBJ.is(AGB.App.Data[a]) && AGB.Data.setStorage(a, "App", "Data", AGB.App.Data[a])
    },
    Get: function (a, b, c) {
        var d;
        a && AGB.App.Data[a] && b && (d = AGB.App.Data[a][b]
        );
        return 6 === c ? STR.check(d) : +d || 0
    },
    Set: function (a, b, c, d) {
        a && AGB.App.Data[a] && c &&
        AGB.App.Data[a][c] !== d && (AGB.App.Data[a][c] = d, AGB.App.Save({player: a})
        )
    },
    getUni: function (a) {
        return AGB.status && a && a.keyUni && AGB.App.Player[a.keyUni] ? (a.keyPlayer = AGB.App.Player[a.keyUni].keyPlayer, a.abbrUni = AGB.App.Player[a.keyUni].abbrUni, a.urlUni = AGB.App.Player[a.keyUni].urlUni, a.keyUni
        ) : ""
    },
    getPlayer: function (a, b) {
        return AGB.status && a && a.keyPlayer && AGB.App.Player[a.keyPlayer] && 1 === AGB.App.Player[a.keyPlayer].status ? (b && (a.accountId = AGB.App.Player[a.keyPlayer].accountId, a.abbrCom = AGB.App.Player[a.keyPlayer].abbrCom,
            a.abbrUni = AGB.App.Player[a.keyPlayer].abbrUni, a.keyCom = AGB.App.Player[a.keyPlayer].keyCom, a.keyUni = AGB.App.Player[a.keyPlayer].keyUni, a.urlUni = AGB.App.Player[a.keyPlayer].urlUni
        ), a.keyPlayer
        ) : ""
    }
};
AGB.Background = {
    Data: {}, Messages: function (a, b) {
        "Set" === a && AGB.Background.Set(b)
    }, Set: function (a) {
        OBJ.is(a) && a.key && (AGB.Background.Data[a.key] = a.value || ""
        )
    }
};
AGB.Data = {
    Status: {}, Info: {
        App: {Data: {storage: 1, version: 3, tab: 2}},
        Uni: {Data: {storage: 1, version: 3, tab: 2}},
        Option: {Data: {storage: 4, version: 12, upgrade: 1}, Local: {storage: 1}},
        Label: {Loca: {storage: 1, version: 1, key: 0}, Api: {storage: 1, version: 1, key: 2}},
        Units: {Data: {storage: 2, version: 2}},
        Fleet: {Data: {storage: 2, version: 2}, Routine: {tab: 2}, Expo: {tab: 2}, Last: {tab: 3}, Cooldown: {tab: 2}},
        Token: {
            Alliance: {storage: 3, version: 3, tab: 2},
            Player: {storage: 3, version: 3, tab: 2},
            Target: {storage: 3, version: 3, tab: 2},
            Current: {
                storage: 3,
                version: 3, tab: 2
            },
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
        Box: {Cache: {tab: 1}},
        Construction: {Data: {storage: 2, version: 1}}
    }, Messages: function (a, b, c) {
        "Backup" === a ? AGB.Data.Backup(b, c) : "Restore" === a ? AGB.Data.Restore(b, c) : "Remove" === a ? AGB.Data.Remove(b,
                                                                                                                             c
        ) : "List" === a && AGB.Data.List(b)
    }, Init: function (a, b) {
        var c, d;
        (c = AGB.App.getPlayer(a)
        ) && (!AGB.Data.Status[c] || a.reload && 1 === AGB.Data.Status[c]
        ) ? (AGB.Data.Status[c] = 3, d = {}, OBJ.iterate(AGB.Data.Info, function (b) {
                                                             OBJ.iterate(AGB.Data.Info[b], function (e) {
                                                                             var f;
                                                                             1 <= AGB.Data.Info[b][e].storage && (f = 2 === AGB.Data.Info[b][e].key ? a.keyCom : 1 === AGB.Data.Info[b][e].key ? a.keyUni : c, d[AGB.Data.getKey(f, b, e)] = e
                                                                             )
                                                                         }
                                                             )
                                                         }
        ), AGB.Storage.Get({key: d}, function (d) {
                               d = OBJ.is(d) ? d : {};
                               AGB.App.Init(a, d);
                               AGB.Uni.Init(a, d);
                               AGB.Option.Init(a,
                                               d
                               );
                               AGB.Label.Init(a, d);
                               AGB.Units.Init(a, d);
                               AGB.Fleet.Init(a, d);
                               AGB.Token.Init(a, d);
                               AGB.Panel.Init(a, d);
                               AGB.Box.Init(a, d);
                               AGB.Construction.Init(a, d);
                               AGB.Item.Init(a);
                               AGB.Data.Status[c] = 1;
                               b && b(!0)
                           }
        )
        ) : b && b(!1)
    }, Change: function () {
        AGB.Core.clearTimeout(AGB.Data.changeTimeout);
        AGB.Data.changeTimeout = AGB.Core.setTimeout(function () {
                                                         AGB.status && AGB.Data.Save()
                                                     }, 3E3
        )
    }, Save: function (a, b) {
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
    }, Sync: function (a) {
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
    }, Backup: function (a, b) {
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
            AGB.Storage.Set({sync: !0, data: c}, function (c) {
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
    }, Restore: function (a, b) {
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
    }, List: function (a) {
        OBJ.is(a) && AGB.Storage.List(a)
    }, Remove: function (a, b) {
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
    }, removeStorageGroup: function (a,
                                     b
    ) {
        OBJ.is(a) && AGB.Data.Info[b] && AGB.Data.iterate(b, function (c, d) {
                                                              var g;
                                                              1 <= c.storage && (g = 2 === c.key ? a.keyCom : 1 === c.key ? a.keyUni : a.keyPlayer, AGB.Storage.Remove({key: AGB.Data.getKey(g, b, d)})
                                                              )
                                                          }
        )
    }, setStorage: function (a, b, c, d) {
        a && (d = OBJ.is(d) ? JSON.stringify(d) : d || "", AGB.Storage.Set({key: AGB.Data.getKey(a, b, c), data: d})
        )
    }, iterate: function (a, b) {
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
    }, getKey: function (a, b, c) {
        return AGB.Data.Info[b] && AGB.Data.Info[b][c] ? a + "_" + b + "_" + c : ""
    }, get: function (a, b, c, d) {
        return AGB.Data.Info[a] && AGB.Data.Info[a][b] ? 6 === d ? STR.check(AGB.Data.Info[a][b][c] || "") : +AGB.Data.Info[a][b][c] || 0 : 6 === d ? "" : 0
    }, getTab: function (a, b) {
        return a && a.tab && AGB.Data.Info[b] && AGB.Data.Info[b][a.tab] && AGB.Data.Info[b][a.tab].tab ? a.tab : ""
    }, set: function (a, b, c, d) {
        AGB.Data.Info[a] && AGB.Data.Info[a][b] && (AGB.Data.Info[a][b][c] = +d || 0
        )
    }, isStorage: function (a, b, c) {
        return a && AGB.Data.Status[a] &&
               b && AGB.Data.Info[b] && AGB.Data.Info[b][c] ? AGB.Data.Info[b][c].storage : 0
    }, isBackup: function (a, b, c, d) {
        return Boolean(a && AGB.Data.Status[a] && b && AGB.Data.Info[b] && AGB.Data.Info[b][c] && AGB.Data.Info[b][c].storage >= d)
    }, isStatus: function (a) {
        return a && 1 === AGB.Data.Status[a]
    }
};
AGB.Com = {
    Data: {
        AE: {
            infuzaServer: "ae.ogame.org",
            websim: "en",
            osimulate: "ae",
            dragosim: "english",
            warriders: "",
            infuza: "fr",
            ogniter: "en"
        },
        AR: {
            infuzaServer: "ogame.com.ar",
            websim: "sp",
            osimulate: "ar",
            dragosim: "spanish",
            warriders: "",
            infuza: "es",
            ogniter: "ar"
        },
        BA: {
            infuzaServer: "ba.ogame.org",
            websim: "ba",
            osimulate: "hr",
            dragosim: "bosnian",
            warriders: "",
            infuza: "en",
            ogniter: "yu"
        },
        BR: {
            infuzaServer: "ogame.com.br",
            websim: "pt",
            osimulate: "br",
            dragosim: "brazilian",
            warriders: "",
            infuza: "pt",
            ogniter: "br"
        },
        CZ: {
            infuzaServer: "ogame.cz",
            websim: "cz", osimulate: "cz", dragosim: "czech", warriders: "", infuza: "cs", ogniter: "cz"
        },
        DE: {
            infuzaServer: "ogame.de",
            websim: "de",
            osimulate: "de",
            dragosim: "german",
            warriders: "de",
            infuza: "de",
            ogniter: "de"
        },
        DK: {
            infuzaServer: "ogame.dk",
            websim: "dk",
            osimulate: "dk",
            dragosim: "danish",
            warriders: "",
            infuza: "da",
            ogniter: "dk"
        },
        EN: {
            infuzaServer: "ogame.org",
            websim: "en",
            osimulate: "en",
            dragosim: "english",
            warriders: "org",
            infuza: "en",
            ogniter: "en"
        },
        ES: {
            infuzaServer: "ogame.com.es", websim: "sp", osimulate: "es", dragosim: "spanish",
            warriders: "es", infuza: "es", ogniter: "es"
        },
        FI: {
            infuzaServer: "fi.ogame.org",
            websim: "fi",
            osimulate: "fi",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "fi"
        },
        FR: {
            infuzaServer: "ogame.fr",
            websim: "fr",
            osimulate: "fr",
            dragosim: "french",
            warriders: "fr",
            infuza: "fr",
            ogniter: "fr"
        },
        GR: {
            infuzaServer: "ogame.gr",
            websim: "gr",
            osimulate: "gr",
            dragosim: "greek",
            warriders: "",
            infuza: "en",
            ogniter: "gr"
        },
        HR: {
            infuzaServer: "ogame.com.hr",
            websim: "ba",
            osimulate: "hr",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "hr"
        },
        HU: {
            infuzaServer: "ogame.hu",
            websim: "hu", osimulate: "hu", dragosim: "hungarian", warriders: "", infuza: "hu", ogniter: "hu"
        },
        IT: {
            infuzaServer: "ogame.it",
            websim: "it",
            osimulate: "it",
            dragosim: "italian",
            warriders: "",
            infuza: "it",
            ogniter: "it"
        },
        JP: {
            infuzaServer: "ogame.jp",
            websim: "ja",
            osimulate: "jp",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "jp"
        },
        MX: {
            infuzaServer: "mx.ogame.org",
            websim: "sp",
            osimulate: "mx",
            dragosim: "spanish",
            warriders: "",
            infuza: "es",
            ogniter: "mx"
        },
        NL: {
            infuzaServer: "ogame.nl", websim: "nl", osimulate: "nl", dragosim: "dutch",
            warriders: "", infuza: "nl", ogniter: "nl"
        },
        NO: {
            infuzaServer: "ogame.no",
            websim: "no",
            osimulate: "no",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "no"
        },
        PL: {
            infuzaServer: "ogame.pl",
            websim: "pl",
            osimulate: "pl",
            dragosim: "polish",
            warriders: "pl",
            infuza: "pl",
            ogniter: "pl"
        },
        PT: {
            infuzaServer: "ogame.com.pt",
            websim: "pt",
            osimulate: "pt",
            dragosim: "portuguese",
            warriders: "",
            infuza: "pt",
            ogniter: "pt"
        },
        RO: {
            infuzaServer: "ogame.ro",
            websim: "ro",
            osimulate: "ro",
            dragosim: "romanian",
            warriders: "",
            infuza: "ro",
            ogniter: "ro"
        },
        RU: {
            infuzaServer: "ogame.ru",
            websim: "ru", osimulate: "ru", dragosim: "russian", warriders: "", infuza: "ru", ogniter: "ru"
        },
        SE: {
            infuzaServer: "ogame.se",
            websim: "sv",
            osimulate: "se",
            dragosim: "swedish",
            warriders: "",
            infuza: "sv",
            ogniter: "se"
        },
        SI: {
            infuzaServer: "ogame.si",
            websim: "si",
            osimulate: "si",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "si"
        },
        SK: {
            infuzaServer: "ogame.sk",
            websim: "sk",
            osimulate: "sk",
            dragosim: "slovak",
            warriders: "",
            infuza: "en",
            ogniter: "sk"
        },
        TR: {
            infuzaServer: "tr.ogame.org", websim: "tr", osimulate: "tr", dragosim: "turkish",
            warriders: "", infuza: "en", ogniter: "tr"
        },
        TW: {
            infuzaServer: "ogame.tw",
            websim: "tw",
            osimulate: "tw",
            dragosim: "taiwanese",
            warriders: "",
            infuza: "en",
            ogniter: "tw"
        },
        US: {
            infuzaServer: "ogame.us",
            websim: "en",
            osimulate: "us",
            dragosim: "english",
            warriders: "us",
            infuza: "en",
            ogniter: "us"
        },
        ORIGIN: {
            infuzaServer: "pioneers.ogame.org",
            websim: "en",
            osimulate: "en",
            dragosim: "english",
            warriders: "",
            infuza: "en",
            ogniter: "en"
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