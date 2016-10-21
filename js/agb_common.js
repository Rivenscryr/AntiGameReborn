if (!AGB) {
    var AGB = {};
}
AGB.Option = {
    Data: {},
    Limit: {
        U11: [0, 7],
        U62: [0, 100],
        U65: [0, 20],
        U66: [0, 100],
        U67: [0, 100],
        B21: [0, 3],
        B35: [0, 2],
        CM3: [0, 100],
        I05: [1, 100],
        CT2: [0, 100],
        D04: [1, 3],
        D61: [1, 3],
        D71: [0, 2],
        D81: [0, 2],
        O03: [0, 4],
        I02: [0, 9],
        I85: [0, 500],
        F02: [0, 3],
        F70: [0, 3],
        F80: [0, 3],
        F90: [0, 3],
        FA0: [0, 3],
        FA1: [0, 3],
        FH0: [0, 3],
        FL0: [0, 3],
        FL2: [0, 6],
        E23: [1, 2],
        E41: [0, 8],
        E42: [0, 8],
        E43: [0, 8],
        E44: [0, 8],
        E45: [0, 8],
        E46: [0, 8],
        E47: [0, 8],
        E48: [0, 8],
        E49: [0, 8],
        G42: [0, 3],
        G45: [0, 3],
        M12: [0, 4],
        M28: [1, 9],
        M30: [0, 5]
    },
    Messages: function (a, b, c) {
        "Set" === a ? AGB.Option.Set(b,
                                     c
        ) : "Menu" === a ? AGB.Option.Menu(b, c) : "Save" === a && AGB.Option.MenuSave(b, c)
    },
    Init: function (a, b) {
        var c, d, e, f, g, h;
        if (e = AGB.App.getPlayer(a)) {
            AGB.Option.Data[e] = {status: 2};
            c = OBJ.parse(OBJ.get(b, AGB.Data.getKey(e, "Option", "Data")));
            d = OBJ.parse(OBJ.get(b, AGB.Data.getKey(e, "Option", "Local")));
            if (c.version) {
                AGB.Option.Data[e].version = c.version;
                AGB.Option.Data[e].status = NMR.minMax(c.status, 1, 2);
                g = STR.check(c.empty).split(",");
                for (h = 0; h < g.length; h++) {
                    c[g[h]] = "";
                }
                g = STR.check(c.one).split(",");
                for (h = 0; h < g.length; h++) {
                    c[g[h]] =
                    1;
                }
                c.version === d.version && OBJ.parseCopy(d, c)
            }
            f = AGB.Option.get(c, "D04");
            f = NMR.isMinMax(f, 1, 3) ? f : NMR.minMax(AGB.Option.getDefault("D04", 0), 1, 3);
            OBJ.iterate(AGB.Para, function (a) {
                            AGB.Para[a][0] && (AGB.Option.set(AGB.Option.Data[e], a, AGB.Option.getDefault(a, f)), a in c && AGB.Option.set(AGB.Option.Data[e], a, c[a])
                            )
                        }
            );
            AGB.Option.Upgrade(AGB.Option.Data[e])
        }
    },
    Upgrade: function (a) {
        var b;
        b = AGB.Data.get("Option", "Data", "version");
        a.version && 12 > a.version && (AGB.Core.Log("Option - Upgrade version 12 ", !0), a.F01 = 0, a.F13 =
                                                                                                     a.FH0 = 1, a.F70 = 2, a.FA0 = 3, a.F80 = a.F90 = a.FL0 = 4, a.F63 = ""
        );
        a.version !== b && (a.version = b, a.changed = !0, AGB.Data.Change()
        )
    },
    Save: function (a) {
        var b, c, d, e, f, g;
        c = AGB.App.getPlayer(a);
        b = AGB.Option.Data[c];
        AGB.Data.isStatus(c) && b && (a.backup || b.changed
        ) && (delete b.changed, f = [], g = [], d = {version: AGB.Data.get("Option", "Data", "version")}, e = {version: AGB.Data.get("Option", "Data", "version")}, OBJ.iterate(AGB.Para, function (a) {
                                                                                                                                                                                    AGB.Para[a][1] && (b[a] ? 1 === b[a] ? g.push(a) : d[a] = b[a] : f.push(a), 3 === AGB.Para[a][1] && (e[a] = b[a]
                                                                                                                                                                                    )
                                                                                                                                                                                    )
                                                                                                                                                                                }
        ),
            d.empty = f.join(","), d.one = g.join(","), a.save && (a.save[c + "_Option_Data"] = JSON.stringify(d), a.save[c + "_Option_Local"] = JSON.stringify(e)
        ), a.backup && AGB.Data.isBackup(c, "Option", "Data", 2) && (a.backup.Option_Data = JSON.stringify(d)
        )
        )
    },
    Menu: function (a, b) {
        var c;
        c = AGB.App.getPlayer(a);
        AGB.Data.isStatus(c) && b && b({Limit: AGB.Option.Limit, Para: AGB.Para, Data: AGB.Option.Data[c]})
    },
    MenuSave: function (a, b) {
        var c, d;
        d = AGB.App.getPlayer(a);
        c = AGB.Option.Data[d];
        AGB.Data.isStatus(d) && c && (OBJ.is(a.data) && (OBJ.iterate(AGB.Para,
                                                                     function (b) {
                                                                         AGB.Para[b][0] && b in a.data && AGB.Option.set(c, b, a.data[b])
                                                                     }
        ), c.status = 1
        ), a.data = null, c.changed = !0, AGB.Data.Change(d), AGB.Token.InitInfo(a), AGB.Data.Sync(a), b && b(c)
        )
    },
    Set: function (a, b) {
        var c, d, e;
        d = AGB.App.getPlayer(a);
        c = AGB.Option.Data[d];
        d && c && ((e = AGB.Option.valid(a.id)
                   ) && AGB.Para[e] && AGB.Para[e][0] ? (d = AGB.Option.get(c, e), e = {
            id: e,
            value: AGB.Option.set(c, e, a.value)
        }, d !== e.value && (c.changed = !0, AGB.Data.Change()
        ), b && b(e)
                   ) : e && (c[e] = a.value
        )
        )
    },
    Get: function (a, b) {
        return (b = AGB.Option.valid(b)
               ) &&
               a && OBJ.is(AGB.Option.Data[a]) ? AGB.Option.get(AGB.Option.Data[a], b) : ""
    },
    set: function (a, b, c) {
        var d;
        d = OBJ.get(AGB.Para[b], 0);
        if (a && b && d) {
            if (1 === d) {
                a[b] = c && "0" !== c ? 1 : 0;
            } else if (2 === d) {
                c = NMR.parseIntFormat(c), b in AGB.Option.Limit && (c = Math.max(Math.min(c, AGB.Option.Limit[b][1]), AGB.Option.Limit[b][0])
                ), a[b] = c;
            } else if (6 === d) {
                a[b] = AGB.Option.valid(c);
            } else if (VAL.check(d, 20, 21, 22, 23)) {
                c = STR.check(c).split("|");
                c[0] = AGB.Option.valid(c[0]);
                c[1] = 21 <= d ? NMR.minMax(+c[1], 0, 100) || "" : "";
                c[2] = 22 <= d ? NMR.minMax(+c[2], 0,
                                            19
                ) || "" : "";
                c[3] = c[2] ? +c[3] || "" : "";
                c[4] = 23 <= d ? AGB.Option.valid(c[4]) : "";
                for (c = c[0] ? c.join("|") : ""; c.length && "|" === c[c.length - 1];) {
                    c = c.substring(0, c.length - 1);
                }
                a[b] = AGB.Option.valid(c)
            } else if (25 === d) {
                c = (STR.check(c) + "|"
                ).split("|", 2).join("|").trim();
                if ("|" === c || "0|" === c || "0" === c) {
                    c = "";
                }
                a[b] = AGB.Option.valid(c)
            } else {
                -1 === d && (a[b] = AGB.Option.validTask(c)
                );
            }
            return a[b]
        }
    },
    get: function (a, b) {
        var c;
        c = OBJ.get(AGB.Para[b], 0);
        return a && b ? 1 === c ? a[b] ? 1 : 0 : 2 === c ? +a[b] || 0 : c ? "string" === typeof a[b] ? a[b] : "number" === typeof a[b] ?
                                                                                                              (a[b] || ""
                                                                                                              ) + "" : "" : a[b] : ""
    },
    getDefault: function (a, b) {
        var c;
        c = OBJ.get(AGB.Para[a], 0);
        return a && c ? (b = NMR.minMax(AGB.Para[a].length - 3, 0, +b || 0), AGB.Para[a][2 + b] || ""
        ) : ""
    },
    valid: function (a) {
        return STR.check(a).replace(/[\"\;]/g, "").trim()
    },
    validTask: function (a) {
        return STR.check(a).replace(/\"/g, "").replace(/^\;*/g, "").replace(/\;*$/g, "").trim()
    }
};
AGB.Label = {
    Data: {}, Messages: function (a, b) {
        "Update" === a && AGB.Label.Update(b)
    }, Init: function (a, b) {
        var c, d;
        d = AGB.App.getPlayer(a, "copy");
        c = AGB.Label.Data;
        d && (c[d] = {status: 2}, OBJ.parseCopy(AGB.Core.resourceFile("loca/EN.json"), c[d]), OBJ.parseCopy(AGB.Core.resourceFile("loca/" + a.abbrCom + ".json"), c[d]), c[a.abbrCom] = OBJ.create(c[d]), OBJ.parseCopy(OBJ.get(b, AGB.Data.getKey(d, "Label", "Loca")), c[d]), OBJ.parseCopy(OBJ.get(b, AGB.Data.getKey(a.keyCom, "Label", "Api")), c[d])
        )
    }, Load: function (a) {
        var b;
        AGB.App.getPlayer(a,
                          "copy"
        ) && (b = new XMLHttpRequest, b.open("GET", a.urlUni + "/api/localization.xml?nocache=" + AGB.Time.timestamp(), !0), b.overrideMimeType("text/html"), b.setRequestHeader("Cache-Control", "no-cache"), b.setRequestHeader("Pragma", "no-cache"), b.onerror = b.onload = function () {
            var c, d, e, f, g, h, l, p;
            d = AGB.App.getPlayer(a);
            c = {};
            if (d && AGB.Label.Data[d]) {
                if (200 === +b.status && b.responseText) {
                    for (e = STR.check(b.responseText).split("<name"), p = 0; p < e.length; p++) {
                        if (f = STR.check(e[p])) {
                            c.status = 1, l = STR.getAttribute(f, "id"), h = STR.check((f.split(">")[1] ||
                                                                                        ""
                                                                                       ).split("<")[0]
                            ).trim(), +l && h && ("techs" === g && (c["L" + STR.trimZero(l, 3)] = h
                            ), "missions" === g && (c["LM" + STR.trimZero(l, 2)] = h
                            )
                            ), -1 < f.indexOf("<techs>") && (g = "techs"
                            ), -1 < f.indexOf("<missions>") && (g = "missions"
                            );
                        }
                    }
                }
                1 === c.status && (OBJ.copy(c, AGB.Label.Data[d]), AGB.Item.Init(a), AGB.Data.setStorage(a.keyCom, "Label", "Api", c)
                );
                AGB.Core.Log("Update   - Label    : " + a.urlUni + "/api/localization.xml" + (c.status = 1, ""
                             ), !0
                )
            }
        }, b.send(null)
        )
    }, Update: function (a) {
        var b, c, d, e, f;
        (c = AGB.App.getPlayer(a)
        ) && OBJ.is(a.data) && (b = {},
            d = OBJ.is(a.data.localization) ? a.data.localization : {}, e = OBJ.is(d.timeunits) && d.timeunits["short"] ? d.timeunits["short"] : {}, b.KU0S = d.thousandSeperator || ".", b.KU0C = "." === d.thousandSeperator ? "," : ".", b.KU0K = d.unitKilo || "k", b.KU0M = d.unitMega || "m", b.KU0B = d.unitMilliard || "b", b.KD0Y = e.year || "y", b.KD0W = e.week || "w", b.KD0D = e.day || "d", b.KD0H = e.hour || "h", b.KD0M = e.minute || "m", b.KD0S = e.second || "s", d = OBJ.is(a.data.production) ? a.data.production : {}, f = {
            metal: "091",
            crystal: "092",
            deuterium: "093",
            energy: "094"
        }, OBJ.iterate(f,
                       function (a) {
                           OBJ.is(d[a]) && (b["L" + f[a]] = (STR.check(d[a].tooltip).split("|")[0] || ""
                                                            ).trim() || a
                           )
                       }
        ), AGB.Core.Log("Update   - Label    : " + b.KU0B + ":" + b.KU0M + ":" + b.KU0K + " - " + b.KD0Y + ":" + b.KD0W + ":" + b.KD0D + " - " + b.KD0H + ":" + b.KD0M + ":" + b.KD0S, !0), AGB.Data.setStorage(c, "Label", "Loca", b), OBJ.copy(b, AGB.Label.Data[c]), AGB.Item.Init(a)
        )
    }, Get: function (a, b, c) {
        return (a = AGB.App.getPlayer(a)
               ) && AGB.Label.Data[a] && b ? (c && (b = 1 === b.length ? "L00" + b : 2 === b.length ? "L0" + b : "L" + b
        ), b in AGB.Label.Data[a] ? AGB.Label.Data[a][b] || "" :
           b
               ) : ""
    }
};
AGB.Styles = {
    Data: {},
    opacity: 33,
    colorType: ["", "#99CC00", "#FFFFFF", "#FD8A1C"],
    classType: ["", "ago_color_planet", "ago_color_debris", "ago_color_moon"],
    colorStatusUnits: "#6A0A0A #640 #640 #640 #004A00 #170 #0D0".split(" "),
    Messages: function (a, b, c) {
        "Init" === a && AGB.Styles.Init(b, c)
    },
    Init: function (a, b) {
        function c(a, b) {
            function c(a, e, f, h, m) {
                m || e && !AGB.Option.Get(d, e) ? (e = "", f = 0
                ) : (e = OBJ.get(AGB.App.Page[a], "css") || "", f = +AGB.Option.Get(d, f) || 0
                );
                e !== b.Page.file && (b[a] || (b[a] = {}
                ), b[a].file = e
                );
                f !== b.Page.improve && (b[a] ||
                                         (b[a] = {}
                                         ), b[a].improve = f
                );
                b.Events && h && (h = +AGB.Option.Get(d, h) || 0, h !== b.Page.events && (b[a] || (b[a] = {}
                ), b[a].events = h
                )
                )
            }

            var d, e, m, k;
            d = a.keyPlayer;
            b.Main = "main";
            AGB.Option.Get(d, "O50") && (b.Planets = AGB.Option.Get(d, "O51") ? "main_planets_improve" : "main_planets"
            );
            AGB.Option.Get(d, "E30") && (b.Events = AGB.Option.Get(d, "E31") ? "main_events_improve" : "main_events"
            );
            a.mobile && (b.Mobile = "ogame_mobile"
            );
            if (e = AGB.Option.Get(d, "U11")) {
                k = "  middle dark    color".split(" ")[e], m = AGB.Option.Get(d, "U19"), b.Skin = '@import url("' +
                                                                                                   AGB.Config.pathSkin + 'cache/cache.css");' + (k ? '@import url("' + AGB.Config.pathSkin + "cache/" + k + '.css");' : ""
                ) + (7 === e && m ? "body { background: " + m + " !important; }" : ""
                                                                                                   );
            }
            b.Page = {file: "pages", improve: 0, events: +AGB.Option.Get(d, "E49") || 0};
            c("overview", "B01", "B01", "E41");
            c("resources", "B00", "B00", "E47");
            c("resourcesettings", "", "B00", "E47");
            c("station", "B00", "B00", "E47");
            c("research", "B00", "B00", "");
            c("shipyard", "B00", "B00", "E48");
            c("defense", "B00", "B00", "E48");
            c("fleet1", "F00", "", "E42");
            c("fleet2", "F00", "", "E43");
            c("fleet3", "F00", "", "E44");
            c("movement", "E10", "E11", "E45", a.mobile);
            c("galaxy", "G40", "G41", "E46", a.mobile);
            c("empire", "G20", "G21", "");
            c("messages", "", "M12", "")
        }

        function d(a, b) {
            var c, d, e, m, k, n;
            c = a.keyPlayer;
            d = [];
            e = [];
            OBJ.copy(AGB.Styles.colorType, e);
            AGB.Option.Get(c, "CM0") && (OBJ.iterate(AGB.Item.Mission, function (a) {
                                                         d.push(".ago_color_" + a + "{color:" + AGB.Option.Get(c, a.replace(/M/, "C")) + "!important;}")
                                                     }
            ), m = AGB.Option.Get(c, "CM3"), NMR.isMinMax(m, 1, 99) && d.push("#eventContent .ago_events_reverse, #eventContent .ago_events_reverse + .ago_eventlist, #inhalt div.fleetDetails[ago_events_reverse] > span{opacity:" +
                                                                              AGB.Styles.getOpacity(m) + "!important;}"
            )
            );
            if (AGB.Option.Get(c, "CT0")) {
                for (m = 21; 80 > m; m++) {
                    (k = AGB.Token.getColor(c, m)
                    ) && "INHERIT" !== k && d.push("." + AGB.Token.getClass(c, m) + "{color:" + k + "!important;}");
                }
            }
            if (AGB.Option.Get(c, "CE0")) {
                for (m = 91; 100 > m; m++) {
                    (k = AGB.Token.getColor(c, m)
                    ) && "INHERIT" !== k && d.push("." + AGB.Token.getClass(c, m) + "{color:" + k + "!important;}");
                }
            }
            if (AGB.Option.Get(c, "CS0")) {
                (k = AGB.Token.getColor(c, "S5")
                ) && d.push(".ago_selected_S5{box-shadow: 0 0 3px 2px " + k + ", 0 0 1px 1px " + k + " inset;}");
                for (n = 1; 3 >=
                            n; n++) {
                    if (m = "S" + n, k = AGB.Token.getColor(c, m)) {
                        e[n] = k, d.push(".ago_selection_" + m + "{color:" + k + "!important;}"), d.push(".ago_selected_" + m + "{box-shadow: 0 0 0 1px " + k + " inset;}"), d.push(".ago_selected_" + m + "_own{box-shadow: 0 0 0 1px " + k + " inset;color:" + k + "!important;}"), d.push(".ago_hover_" + m + ":hover{box-shadow: 0 0 1px 0 " + k + " inset;}"), d.push(".ago_hover_" + m + "_own:hover{color:" + k + "!important;box-shadow: 0 0 1px 0 " + k + " inset;}"), AGB.Token.getCondition(c, m) && (d.push(".ago_highlight_" + m + "{background-color:" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        AGB.Token.getColorOpacity(c, m) + ";}"
                        ), d.push(".ago_highlight_" + m + "_active{background-color:" + AGB.Token.getColorOpacity(c, m, "active") + ";}")
                        );
                    }
                }
                if (AGB.Option.Get(c, "O55")) {
                    if (k = AGB.Token.getColor(c, "S1")) {
                        d.push("#rechts .ago_highlight .planet-name, #rechts .ago_highlight .planet-koords{color:" + k + "!important;}"), d.push("#rechts .smallplanet:hover .planet-name, #rechts .smallplanet:hover .planet-koords{color:" + k + "!important;}");
                    }
                    if (k = AGB.Token.getColor(c, "S3")) {
                        d.push("#rechts .ago_highlight_S3 .planet-name, #rechts .ago_highlight_S3 .planet-koords{color:" +
                               k + "!important;}"
                        ), d.push("#rechts .ago_highlight_S3_active .planet-name, #rechts .ago_highlight_S3_active .planet-koords{color:" + k + "!important;}"), d.push("#rechts .ago_hover_S3:hover .planet-name, #rechts .ago_hover_S3:hover .planet-koords{color:" + k + "!important;}")
                    }
                }
                (k = AGB.Token.getColor(c, "SA")
                ) && d.push(".ago_selected_SA{outline:" + k + " thin solid;}")
            }
            for (n = 1; 3 >= n; n++) {
                d.push("." + AGB.Styles.classType[n] + "{color:" + e[n] + "!important;}");
            }
            b.colorType = e;
            b.Color = d.join("")
        }

        var e;
        (e = AGB.App.getPlayer(a)
        ) &&
        b && 1 === AGB.Data.Status[e] && (e = {}, c(a, e), d(a, e), b(e)
        )
    },
    getOpacity: function (a) {
        return "0." + (10 > a ? "0" + a : a
            )
    },
    getImport: function (a) {
        return a ? '@import url("' + AGB.Config.pathSkin + "ago/" + a + '.css");' : ""
    },
    getColor: function (a, b) {
        return !a || 4 !== a.length && 7 !== a.length ? "" : 0 < b && 100 > b ? (a = 7 === a.length ? parseInt(a.substring(1, 3), 16) + "," + parseInt(a.substring(3, 5), 16) + "," + parseInt(a.substring(5, 7), 16) : parseInt(a.substring(1, 2), 16) + "," + parseInt(a.substring(2, 3), 16) + "," + parseInt(a.substring(3, 4), 16), "rgba(" + a + (10 > b ? ",0.0" :
                                                                                                                                                                                                                                                                                                                                                        ",0."
        ) + b + ")"
        ) : a
    }
};
AGB.Item = {
    Data: {},
    Info: {
        timeResource: {index: 0},
        metal: {index: 1},
        crystal: {index: 2},
        deuterium: {index: 3},
        energy: {index: 4},
        timeMining: {index: 31},
        timeStation: {index: 32},
        1: {index: 33, metal: 60, crystal: 15, deuterium: 0, factor: 1.5},
        2: {index: 34, metal: 48, crystal: 24, deuterium: 0, factor: 1.6},
        3: {index: 35, metal: 225, crystal: 75, deuterium: 0, factor: 1.5},
        4: {index: 36, metal: 75, crystal: 30, deuterium: 0, factor: 1.5},
        12: {index: 37, metal: 900, crystal: 360, deuterium: 180, factor: 1.8},
        14: {index: 38, metal: 400, crystal: 120, deuterium: 200, factor: 2},
        15: {index: 39, metal: 1E6, crystal: 5E5, deuterium: 1E5, factor: 2},
        21: {index: 41, metal: 400, crystal: 200, deuterium: 100, factor: 2},
        22: {index: 42, metal: 1E3, crystal: 0, deuterium: 0, factor: 2},
        23: {index: 43, metal: 1E3, crystal: 500, deuterium: 0, factor: 2},
        24: {index: 44, metal: 1E3, crystal: 1E3, deuterium: 0, factor: 2},
        25: {index: 45, metal: 2645, crystal: 0, deuterium: 0, factor: 2.3},
        26: {index: 46, metal: 2645, crystal: 1322, deuterium: 0, factor: 2.3},
        27: {index: 47, metal: 2645, crystal: 2645, deuterium: 0, factor: 2.3},
        31: {
            index: 48, metal: 200, crystal: 400,
            deuterium: 200, factor: 2
        },
        33: {index: 49, metal: 0, crystal: 5E4, deuterium: 1E5, factor: 2},
        34: {index: 50, metal: 2E4, crystal: 4E4, deuterium: 0, factor: 2},
        41: {index: 51, metal: 2E4, crystal: 4E4, deuterium: 2E4, factor: 2},
        42: {index: 52, metal: 2E4, crystal: 4E4, deuterium: 2E4, factor: 2},
        43: {index: 53, metal: 2E6, crystal: 4E6, deuterium: 2E6, factor: 2},
        44: {index: 54, metal: 2E4, crystal: 2E4, deuterium: 1E3, factor: 2},
        timeResearch: {index: 31},
        106: {index: 32, metal: 200, crystal: 1E3, deuterium: 200, factor: 2},
        108: {
            index: 33, metal: 0, crystal: 400, deuterium: 600,
            factor: 2
        },
        109: {index: 34, metal: 800, crystal: 200, deuterium: 0, factor: 2},
        110: {index: 35, metal: 200, crystal: 600, deuterium: 0, factor: 2},
        111: {index: 36, metal: 1E3, crystal: 0, deuterium: 0, factor: 2},
        113: {index: 37, metal: 0, crystal: 800, deuterium: 400, factor: 2},
        114: {index: 38, metal: 0, crystal: 4E3, deuterium: 2E3, factor: 2},
        115: {index: 39, metal: 400, crystal: 0, deuterium: 600, factor: 2},
        117: {index: 40, metal: 2E3, crystal: 4E3, deuterium: 600, factor: 2},
        118: {index: 41, metal: 1E4, crystal: 2E4, deuterium: 6E3, factor: 2},
        120: {
            index: 42, metal: 200, crystal: 100,
            deuterium: 0, factor: 2
        },
        121: {index: 43, metal: 1E3, crystal: 300, deuterium: 100, factor: 2},
        122: {index: 44, metal: 2E3, crystal: 4E3, deuterium: 1E3, factor: 2},
        123: {index: 45, metal: 24E4, crystal: 4E5, deuterium: 16E4, factor: 2},
        124: {index: 46, metal: 4E3, crystal: 8E3, deuterium: 4E3, factor: 1.75},
        199: {index: 47, metal: 0, crystal: 0, deuterium: 0, factor: 3},
        timeShip: {index: 5},
        202: {
            index: 6,
            metal: 2E3,
            crystal: 2E3,
            deuterium: 0,
            retreat: 1E3,
            drive: "115",
            speed: 5E3,
            capacity: 5E3,
            consumption: 20
        },
        203: {
            index: 7, metal: 6E3, crystal: 6E3, deuterium: 0, retreat: 3E3,
            drive: "115", speed: 7500, capacity: 25E3, consumption: 50
        },
        204: {
            index: 8,
            metal: 3E3,
            crystal: 1E3,
            deuterium: 0,
            retreat: 4E3,
            drive: "115",
            speed: 12500,
            capacity: 50,
            consumption: 20
        },
        205: {
            index: 9,
            metal: 6E3,
            crystal: 4E3,
            deuterium: 0,
            retreat: 1E4,
            drive: "117",
            speed: 1E4,
            capacity: 100,
            consumption: 75
        },
        206: {
            index: 10,
            metal: 2E4,
            crystal: 7E3,
            deuterium: 2E3,
            retreat: 29E3,
            drive: "117",
            speed: 15E3,
            capacity: 800,
            consumption: 300
        },
        207: {
            index: 11,
            metal: 45E3,
            crystal: 15E3,
            deuterium: 0,
            retreat: 6E4,
            drive: "118",
            speed: 1E4,
            capacity: 1500,
            consumption: 500
        },
        208: {
            index: 12,
            metal: 1E4,
            crystal: 2E4,
            deuterium: 1E4,
            retreat: 1E4,
            drive: "117",
            speed: 2500,
            capacity: 7500,
            consumption: 1E3
        },
        209: {
            index: 13,
            metal: 1E4,
            crystal: 6E3,
            deuterium: 2E3,
            retreat: 4500,
            drive: "115",
            speed: 2E3,
            capacity: 2E4,
            consumption: 300
        },
        210: {
            index: 14,
            metal: 0,
            crystal: 1E3,
            deuterium: 0,
            retreat: 0,
            drive: "115",
            speed: 1E8,
            capacity: 0,
            consumption: 1
        },
        211: {
            index: 15,
            metal: 5E4,
            crystal: 25E3,
            deuterium: 15E3,
            retreat: 9E4,
            drive: "117",
            speed: 4E3,
            capacity: 500,
            consumption: 1E3
        },
        212: {
            index: 16, metal: 0, crystal: 2E3, deuterium: 500, retreat: 0,
            drive: 0, speed: 0, capacity: 0, consumption: 0
        },
        213: {
            index: 17,
            metal: 6E4,
            crystal: 5E4,
            deuterium: 15E3,
            retreat: 125E3,
            drive: "118",
            speed: 5E3,
            capacity: 2E3,
            consumption: 1E3
        },
        214: {
            index: 18,
            metal: 5E6,
            crystal: 4E6,
            deuterium: 1E6,
            retreat: 1E7,
            drive: "118",
            speed: 100,
            capacity: 1E6,
            consumption: 1
        },
        215: {
            index: 19,
            metal: 3E4,
            crystal: 4E4,
            deuterium: 15E3,
            retreat: 85E3,
            drive: "118",
            speed: 1E4,
            capacity: 750,
            consumption: 250
        },
        timeDefense: {index: 20},
        401: {index: 21, metal: 2E3, crystal: 0, deuterium: 0, retreat: 2E3},
        402: {
            index: 22, metal: 1500, crystal: 500,
            deuterium: 0, retreat: 2E3
        },
        403: {index: 23, metal: 6E3, crystal: 2E3, deuterium: 0, retreat: 8E3},
        404: {index: 24, metal: 2E4, crystal: 15E3, deuterium: 2E3, retreat: 37E3},
        405: {index: 25, metal: 2E3, crystal: 6E3, deuterium: 0, retreat: 8E3},
        406: {index: 26, metal: 5E4, crystal: 5E4, deuterium: 3E4, retreat: 13E4},
        407: {index: 27, metal: 1E4, crystal: 1E4, deuterium: 0, retreat: 2E4},
        408: {index: 28, metal: 5E4, crystal: 5E4, deuterium: 0, retreat: 1E5},
        502: {index: 29, metal: 8E3, crystal: 0, deuterium: 2E3, retreat: 0},
        503: {
            index: 30, metal: 12500, crystal: 2500, deuterium: 1E4,
            retreat: 0
        }
    },
    Mining: {1: 1, 2: 1, 3: 1, 4: 1, 12: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 212: 1},
    Station: {14: 1, 15: 1, 21: 1, 31: 1, 33: 1, 34: 1, 41: 1, 42: 1, 43: 1, 44: 1},
    Ship: {
        202: 1,
        203: 1,
        204: 2,
        205: 2,
        206: 2,
        207: 2,
        208: 1,
        209: 1,
        210: 1,
        211: 2,
        212: 3,
        213: 2,
        214: 2,
        215: 2
    },
    ShipCivil: {202: 1, 203: 1, 208: 1, 209: 1, 210: 1},
    ShipCombat: {204: 2, 205: 2, 206: 2, 207: 2, 215: 2, 211: 2, 213: 2, 214: 2},
    ShipTransport: {203: 1, 202: 1, 209: 1, 214: 1},
    Defense: {401: 1, 402: 1, 403: 1, 404: 1, 405: 1, 406: 1, 407: 1, 408: 1, 502: 2, 503: 2},
    Resource: {metal: "091", crystal: "092", deuterium: "093"},
    ResourceEnergy: {
        metal: "091",
        crystal: "092", deuterium: "093", energy: "094"
    },
    Coordinates: {galaxy: 1, system: 1, position: 1},
    Research: {
        106: 8,
        108: 10,
        109: 3,
        110: 6,
        111: 2,
        113: 12,
        114: -8,
        115: 6,
        117: 6,
        118: 8,
        120: -12,
        121: 5,
        122: 7,
        123: 0,
        124: 8,
        199: -1
    },
    ByName: {},
    Mission: {M15: 0, M07: 0, M08: 0, M03: 0, M04: 0, M06: 0, M05: 0, M01: 0, M02: 0, M09: 0},
    Init: function (a) {
        var b, c;
        (c = AGB.App.getPlayer(a)
        ) && 1 === +OBJ.get(AGB.Label.Data[c], "status") && (AGB.Item.Data[c] = {}, b = AGB.Item.Data[c], OBJ.iterate(AGB.Item.Ship, function (c) {
                                                                                                                          b[AGB.Label.Get(a, c, 1) || c] = c
                                                                                                                      }
        ), OBJ.iterate(AGB.Item.Defense,
                       function (c) {
                           b[AGB.Label.Get(a, c, 1) || c] = c
                       }
        ), OBJ.iterate(AGB.Item.Research, function (c) {
                           b[AGB.Label.Get(a, c, 1) || c] = c
                       }
        ), OBJ.iterate(AGB.Item.ResourceEnergy, function (c) {
                           b[AGB.Label.Get(a, AGB.Item.ResourceEnergy[c], 1) || c] = c
                       }
        )
        )
    },
    valid: function (a) {
        return a in AGB.Item.Info ? a : ""
    }
};
AGB.Units = {
    Data: {}, Messages: function (a, b, c) {
        "Action" === a ? AGB.Units.Action(b, c) : "Update" === a ? AGB.Units.Update(b, c) : "List" === a && AGB.Units.List(b, c)
    }, Start: function (a) {
        var b, c;
        c = {};
        (b = AGB.Units.Data[a]
        ) && b.account && (c.status = b.status, c.timeResearch = AGB.Time.timestampMinuteConvert(b.account.timeResearch), OBJ.iterate(AGB.Item.Research, function (a) {
                                                                                                                                          c[a] = +b.account[a] || 0
                                                                                                                                      }
        )
        );
        return c
    }, Init: function (a, b) {
        var c, d, e, f, g;
        f = AGB.Data.get("Units", "Data", "version");
        if (e = AGB.App.getPlayer(a)) {
            AGB.Units.Data[e] = {
                status: 2,
                version: f
            }, c = AGB.Units.Data[e], c.account = {}, d = OBJ.parse(b[AGB.Data.getKey(e, "Units", "Data")]), d.version === f && (c.status = d.status || 2, d.account && (g = STR.check(d.account).split(","), AGB.Item.Info.timeResearch && (c.account.timeResearch = +g[AGB.Item.Info.timeResearch.index] || 0
            ), OBJ.iterate(AGB.Item.Research, function (a) {
                               AGB.Item.Info[a] && (c.account[a] = +g[AGB.Item.Info[a].index] || 0
                               )
                           }
            )
            ), OBJ.iterate(d, function (a) {
                               if (0 < +a) {
                                   var b;
                                   c[a] = {};
                                   b = STR.check(d[a]).split(",");
                                   OBJ.iterate(AGB.Item.Info, function (d) {
                                                   100 < +d &&
                                                   200 > +d || "timeResearch" === d || (c[a][d] = +b[AGB.Item.Info[d].index] || 0
                                                   )
                                               }
                                   )
                               }
                           }
            )
            ), AGB.Units.SummarizePlanets(a)
        }
    }, Save: function (a) {
        var b, c, d, e;
        d = AGB.App.getPlayer(a);
        b = AGB.Units.Data[d];
        AGB.Data.isStatus(d) && b && (a.backup || b.changed
        ) && (e = {
            version: b.version,
            status: b.status
        }, delete b.changed, b.account && (c = [], AGB.Item.Info.timeResearch && (c[AGB.Item.Info.timeResearch.index] = +b.account.timeResearch || ""
        ), OBJ.iterate(AGB.Item.Research, function (a) {
                           AGB.Item.Info[a] && (c[AGB.Item.Info[a].index] = +b.account[a] || ""
                           )
                       }
        ), e.account =
           c.join(",")
        ), AGB.Units.iterate(d, function (a, b) {
                                 var c, d;
                                 c = [];
                                 OBJ.iterate(AGB.Item.Info, function (b) {
                                                 100 < +b && 200 > +b || "timeResearch" === b || (c[AGB.Item.Info[b].index] = +a[b] || ""
                                                 )
                                             }
                                 );
                                 for (d = c.length; 0 < d && !c[d - 1];) {
                                     d--;
                                 }
                                 c.length = d;
                                 e[b] = c.join(",")
                             }
        ), a.save && (a.save[d + "_Units_Data"] = JSON.stringify(e)
        ), a.backup && AGB.Data.isBackup(d, "Units", "Data", 2) && (a.backup.Units_Data = JSON.stringify(e)
        )
        )
    }, Update: function (a, b) {
        var c, d, e;
        d = AGB.App.getPlayer(a);
        c = AGB.Units.Data[d];
        d && c && OBJ.is(a.data) && (e = [
            {
                planet: a.planet, tabs: ["Resource"],
                data: a.data
            }
        ], (c = {
            research: "Research",
            resources: "Mining",
            station: "Station",
            shipyard: "Ship",
            defense: "Defense",
            fleet1: "Ship"
        }[a.data.page]
           ) && e.push({
                           planet: "Research" === c ? "account" : a.planet,
                           tabs: [c],
                           data: a.data
                       }
        ), AGB.Units.Action({keyPlayer: d, list: e}, b)
        )
    }, Action: function (a, b) {
        function c(a, b, c, d) {
            var f, k;
            if (("account" === a || 0 < +a
                ) && Array.isArray(b) && OBJ.is(d)) {
                for (OBJ.is(e[a]) || (e[a] = {}
                ), f = e[a], k = 0; k < b.length; k++) {
                    a = b[k], "Resource" === a ? (OBJ.iterate(AGB.Item.ResourceEnergy, function (a) {
                                                                  f[a] = +d[a] || 0
                                                              }
                    ), f.resources =
                       f.metal + f.crystal + f.deuterium, f.timeResource = AGB.Time.timestampMinute()
                    ) : "Ship" === a ? (f.shipsCivil = 0, f.shipsCombat = 0, OBJ.iterate(AGB.Item.Ship, function (a) {
                                                                                             var b = +d[a] || 0;
                                                                                             f[a] = "add" === c ? (+f[a] || 0
                                                                                                                  ) + b : "remove" === c ? Math.max((+f[a] || 0
                                                                                                                                                    ) - b, 0
                                                                                             ) : b;
                                                                                             a in AGB.Item.ShipCivil && (f.shipsCivil += f[a]
                                                                                             );
                                                                                             a in AGB.Item.ShipCombat && (f.shipsCombat += f[a]
                                                                                             )
                                                                                         }
                    ), f.ships = f.shipsCivil + f.shipsCombat, f.timeShip = AGB.Time.timestampMinute()
                    ) : "Research" === a ? (OBJ.iterate(AGB.Item.Research, function (a) {
                                                            f[a] = +d[a] || 0
                                                        }
                    ), f.timeResearch = AGB.Time.timestampMinute(),
                        e.status = 1
                    ) : AGB.Item[a] && (OBJ.iterate(AGB.Item[a], function (a) {
                                                        f[a] = +d[a] || 0
                                                    }
                    ), f["time" + a] = 1
                    )
                }
            }
        }

        function d(a) {
            var b, c;
            c = 0;
            b = {account: 1, status: 1, version: 1, changed: 1};
            OBJ.iterate(a, function (d) {
                            var f;
                            c++;
                            f = a[d];
                            b[f] = d;
                            OBJ.is(e[f]) || (e[f] = {}
                            )
                        }
            );
            c && OBJ.iterate(e, function (a) {
                                 a in b || (e[a] = ""
                                 )
                             }
            )
        }

        var e, f;
        f = AGB.App.getPlayer(a);
        e = AGB.Units.Data[f];
        f && e && Array.isArray(a.list) && (OBJ.iterateArray(a.list, function (a) {
                                                                 a && c(a.planet, a.tabs, a.action, a.data)
                                                             }
        ), a.planets && (d(a.planets), AGB.Units.SummarizePlanets(a)
        ), e.changed = !0, AGB.Data.Change()
        );
        b && b()
    }, List: function (a, b) {
        var c, d, e;
        d = AGB.App.getPlayer(a);
        c = AGB.Units.Data[d];
        d && c && (e = {}, "summarized" === a.action && OBJ.iterate(c, function (a) {
                                                                        if (0 < +a) {
                                                                            var b;
                                                                            b = c[a];
                                                                            e[a] = {
                                                                                ships: b.ships,
                                                                                shipsCivil: b.shipsCivil,
                                                                                shipsCombat: b.shipsCombat,
                                                                                timeShip: b.timeShip
                                                                            }
                                                                        }
                                                                    }
        )
        );
        b && b(e)
    }, Get: function (a, b, c, d) {
        var e;
        a && AGB.Units.Data[a] && b && AGB.Units.Data[a][b] && c && (e = AGB.Units.Data[a][b][c]
        );
        return 6 === d ? STR.check(e) : +e || 0
    }, XXsummarizeAccount: function (a) {
        var b, c;
        a = AGB.App.getPlayer(a);
        b = AGB.Units.Data[a];
        a && b && (b.account || (b.account = {}
        ), c = b.account, c.resources = 0, OBJ.iterate(AGB.Item.Resource, function (a) {
                                                           c[a] = 0
                                                       }
        ), c.ships = 0, c.shipsCivil = 0, c.shipsCombat = 0, OBJ.iterate(AGB.Item.Ship, function (a) {
                                                                             c[a] = 0
                                                                         }
        ), OBJ.iterate(b, function (a) {
                           if (0 < +a) {
                               var e;
                               e = b[a];
                               OBJ.iterate(AGB.Item.Resource, function (a) {
                                               c[a] += +e[a] || 0
                                           }
                               );
                               c.resources += +c.resources || 0;
                               OBJ.iterate(AGB.Item.Ship, function (a) {
                                               c[a] += +e[a] || 0
                                           }
                               );
                               c.ships += +e.ships || 0;
                               c.shipsCivil += +e.shipsCivil || 0;
                               c.shipsCombat += +e.shipsCombat || 0
                           }
                       }
        )
        )
    }, SummarizePlanets: function (a) {
        var b;
        b = AGB.App.getPlayer(a);
        a = AGB.Units.Data[b];
        b && a && AGB.Units.iterate(b, function (a) {
                                        a.resources = 0;
                                        OBJ.iterate(AGB.Item.Resource, function (b) {
                                                        a.resources += +a[b] || 0
                                                    }
                                        );
                                        a.shipsCivil = 0;
                                        a.shipsCombat = 0;
                                        OBJ.iterate(AGB.Item.ShipCivil, function (b) {
                                                        a.shipsCivil += +a[b] || 0
                                                    }
                                        );
                                        OBJ.iterate(AGB.Item.ShipCombat, function (b) {
                                                        a.shipsCombat += +a[b] || 0
                                                    }
                                        );
                                        a.ships = a.shipsCivil + a.shipsCombat
                                    }
        )
    }, SummarizePosition: function (a) {
        function b(a) {
            h[a] = f ? (+e[a] || 0
                       ) + (+f[a] || 0
                       ) : +e[a] || 0
        }

        function c(b) {
            var c, d;
            c = +OBJ.get(e, b) || 0;
            d = +OBJ.get(f,
                         b
            ) || 0;
            h[b] = a.moon ? c && d ? c : c || d ? -1 : 0 : c
        }

        var d, e, f, g, h;
        g = AGB.App.getPlayer(a);
        d = AGB.Units.Data[g];
        h = {};
        g && d && (e = d[a.planet] || {}, f = d[a.moon], OBJ.iterate(AGB.Item.Resource, b), OBJ.iterate(AGB.Item.Ship, b), OBJ.iterate({
                                                                                                                                           resources: 0,
                                                                                                                                           ships: 0,
                                                                                                                                           shipsCivil: 0,
                                                                                                                                           shipsCombat: 0
                                                                                                                                       }, b
        ), c("timeResource"), c("timeShip")
        );
        return h
    }, SummarizeAccount: function (a) {
        var b, c;
        b = AGB.App.getPlayer(a);
        a = AGB.Units.Data[b];
        b && a && (c = {
            resources: 0,
            ships: 0,
            shipsCivil: 0,
            shipsCombat: 0,
            timeResource: 0,
            timeShip: 0
        }, OBJ.iterate(AGB.Item.Resource, function (a) {
                           c[a] =
                           0
                       }
        ), OBJ.iterate(AGB.Item.Ship, function (a) {
                           c[a] = 0
                       }
        ), AGB.Units.iterate(b, function (a) {
                                 a.timeResource && (c.timeResource = 1
                                 );
                                 a.timeShip && (c.timeShip = 1
                                 );
                                 OBJ.iterate(AGB.Item.Resource, function (b) {
                                                 c[b] += +a[b] || 0
                                             }
                                 );
                                 c.resources += +a.resources || 0;
                                 OBJ.iterate(AGB.Item.Ship, function (b) {
                                                 c[b] += +a[b] || 0
                                             }
                                 );
                                 c.ships += +a.ships || 0;
                                 c.shipsCivil += +a.shipsCivil || 0;
                                 c.shipsCombat += +a.shipsCombat || 0
                             }
        )
        );
        return c
    }, create: function (a, b, c) {
        var d;
        d = AGB.Units.Data[a];
        return a && d && b ? OBJ.createFilter(AGB.Units.Data[a][b], c) : {}
    }, iterate: function (a,
                          b
    ) {
        var c, d;
        c = AGB.Units.Data[a];
        if (a && c) {
            for (d in c) {
                c.hasOwnProperty(d) && 0 < +d && b(c[d], d)
            }
        }
    }
};
AGB.Task = {
    splitActive: function (a, b, c) {
        var d, e;
        a = OBJ.split(a);
        if (a.standard && a[c]) {
            d = AGO.Task.split(a.standard, b, -1);
            b = AGO.Task.split(a[c], b, -1);
            for (e in b) {
                b[e] && (d[e] = "string" === typeof b[e] ? b[e] : Math.max(b[e], 0)
                );
            }
            d.ships = 0;
            OBJ.iterate(AGB.Item.Ship, function (a) {
                            d.ships += +d[a] || 0
                        }
            );
            return d
        }
        return AGB.Task.split(a[c] || a.standard, b)
    }, split: function (a, b) {
        var c, d, e, f;
        d = STR.check(a).split(":");
        c = {
            galaxy:      +d[0] || 0,
            system:      +d[1] || 0,
            position:    +d[2] || 0,
            type:        +d[3] || 0,
            mission:     +d[4] || 0,
            speed:       +d[5] || 0,
            holdingtime: +d[6] ||
                         0
        };
        c.expeditiontime = +d[7] || 0;
        c.union = +d[8] || 0;
        c.routine = +d[9] || 0;
        c.name = d[10] || "";
        c.detail = d[11] || "";
        c.detail2 = +d[12] || 0;
        c.preferCargo = d[13] || "";
        c.preferShip = d[14] || "";
        c.arrival = +d[15] || 0;
        1 <= b && (c.metal = +d[16] || 0, c.crystal = +d[17] || 0, c.deuterium = +d[18] || 0, c.preferResource = +d[19] || 0, c.timeResource = +d[20] || 0, c.resources = c.metal + c.crystal + c.deuterium
        );
        if (2 <= b) {
            for (c.timeShip = +d[21] || 0, c.ships = 0, f = 22; 35 >= f; f++) {
                if (e = +d[f] || 0, c[String(f + 180)] = e) {
                    c.ships += e;
                }
            }
        }
        return c
    }, join: function (a, b) {
        var c, d;
        if (OBJ.is(a)) {
            c =
            [
                a.galaxy || "",
                a.system || "",
                a.position || "",
                a.type || "",
                a.mission || "",
                a.speed || "",
                a.holdingtime || ""
            ];
            c[7] = a.expeditiontime || "";
            c[8] = a.union || "";
            c[9] = a.routine || "";
            c[10] = a.name || "";
            c[11] = a.detail || "";
            c[12] = a.detail2 || "";
            c[13] = a.preferCargo || "";
            c[14] = a.preferShip || "";
            c[15] = a.arrival || "";
            1 <= b && (c[16] = a.metal || "", c[17] = a.crystal || "", c[18] = a.deuterium || "", c[19] = a.preferResource || "", c[20] = a.timeResource || ""
            );
            if (2 <= b) {
                for (c[21] = a.timeShip || "", d = 22; 35 >= d; d++) {
                    a[String(d + 180)] && (c[d] = a[String(d + 180)] || ""
                    );
                }
            }
            for (d =
                 c.length; 0 < d && !c[d - 1];) {
                d--;
            }
            c.length = d;
            return c.join(":")
        }
        return ""
    }, splitCoords: function (a) {
        a = STR.check(a).split(":");
        return {galaxy: +a[0] || 0, system: +a[1] || 0, position: +a[2] || 0}
    }, checkCoords: function (a, b, c) {
        return 1 <= a && a <= AGB.Uni.Info.galaxies && 1 <= b && b <= AGB.Uni.Info.systems && 1 <= c && c <= AGB.Uni.Info.positions
    }, checkCoordsType: function (a, b, c, d) {
        return 1 <= a && a <= AGB.Uni.Info.galaxies && 1 <= b && b <= AGB.Uni.Info.systems && 1 <= c && c <= AGB.Uni.Info.positions && 1 <= d && 3 >= d
    }, getCoordsType: function (a) {
        return OBJ.is(a) && AGB.Task.checkCoordsType(a.galaxy,
                                                     a.system, a.position, a.type
        ) ? a.galaxy + ":" + a.system + ":" + a.position + ":" + a.type : ""
    }, updateCoordsType: function (a, b) {
        var c;
        b = STR.check(b);
        OBJ.is(a) && b && (c = b.split(":"), NMR.isMinMax(+c[3], 1, 3) && (a.type = +c[3] || 0
        ), AGB.Task.checkCoords(+c[0], +c[1], +c[2]) && (a.galaxy = +c[0] || 0, a.system = +c[1] || 0, a.position = +c[2] || 0, a.coords = a.galaxy + ":" + a.system + ":" + a.position, a.coordstype = a.type ? a.coords + ":" + a.type : ""
        )
        )
    }, cut: function (a, b) {
        return "string" === typeof a ? a.split(":", b).join(":") : ""
    }, cutSystem: function (a) {
        return "string" === typeof a ? a.split(":", 2).join(":") : ""
    }, cutCoords: function (a) {
        return "string" === typeof a ? a.split(":", 3).join(":") : ""
    }, cutCoordsType: function (a) {
        return "string" === typeof a ? a.split(":", 4).join(":") : ""
    }
};
AGB.Construction = {
    Data: {}, Messages: function (a, b, c) {
        "List" === a ? AGB.Construction.List(b, c) : "Action" === a && AGB.Construction.Action(b, c)
    }, Init: function (a, b) {
        var c, d;
        if (c = AGB.App.getPlayer(a)) {
            d = OBJ.parse(b[AGB.Data.getKey(c, "Construction", "Data")]), AGB.Construction.Data[c] = {version: d.version}, OBJ.iterate(d, function (a) {
                                                                                                                                           Array.isArray(d[a]) && (AGB.Construction.Data[c][a] = [], d[a].forEach(function (b) {
                                                                                                                                                                                                                      AGB.Construction.Data[c][a].push(AGB.Construction.split(b))
                                                                                                                                                                                                                  }
                                                                                                                                           )
                                                                                                                                           )
                                                                                                                                       }
            ), AGB.Construction.Upgrade(AGB.Construction.Data[c])
        }
    },
    Upgrade: function (a) {
        var b;
        b = AGB.Data.get("Construction", "Data", "version");
        a.version !== b && (a.changed = !0, a.version = b, AGB.Data.Change()
        )
    }, Save: function (a) {
        var b, c, d;
        d = AGB.App.getPlayer(a);
        b = AGB.Construction.Data[d];
        AGB.Data.isStatus(d) && b && (a.backup || b.changed
        ) && (delete b.changed, c = {version: AGB.Data.get("Construction", "Data", "version")}, OBJ.iterate(b, function (a) {
                                                                                                                Array.isArray(b[a]) && b[a].length && (c[a] = [], b[a].forEach(function (b) {
                                                                                                                                                                                   c[a].push(AGB.Construction.join(b))
                                                                                                                                                                               }
                                                                                                                )
                                                                                                                )
                                                                                                            }
        ), a.save && (a.save[d + "_Construction_Data"] =
                      JSON.stringify(c)
        ), a.backup && AGB.Data.isBackup(d, "Construction", "Data", 2) && (a.backup.Construction_Data = JSON.stringify(c)
        )
        )
    }, Action: function (a, b) {
        var c, d, e, f, g, h, l;
        d = AGB.App.getPlayer(a);
        c = AGB.Construction.Data[d];
        if (d && c && a.value) {
            if (e = a.action, "set" === e) {
                OBJ.get(a.value, "id") && (f = OBJ.create(a.value), f.time = 0, g = AGB.Task.getCoordsType(f)
                ) && (AGB.Construction.update(d, f), OBJ.is(c[g]) ? c[g].unshift(f) : c[g] = [f], c.changed = !0, AGB.Data.Change(), b({
                                                                                                                                           tab: "Construction",
                                                                                                                                           data: g + ":0"
                                                                                                                                       }
                )
                );
            } else if ("remove" === e) {
                g = AGB.Construction.getKey(a.value),
                    h = AGB.Construction.getIndex(a.value), OBJ.is(c[g]) && c[g][h] && (c[g].splice(h, 1), c.changed = !0, AGB.Data.Change(), b({
                                                                                                                                                    tab: "Construction",
                                                                                                                                                    data: g + ":" + h
                                                                                                                                                }
                )
                );
            } else if ("reserve" === e) {
                g = AGB.Construction.getKey(a.value), h = AGB.Construction.getIndex(a.value), OBJ.is(c[g]) && c[g][h] && (f = OBJ.create(c[g][h]), OBJ.get(f, "id") && g !== a.coords && f.reserved && (AGB.Task.updateCoordsType(f, a.coords), f.coordstype === a.coords && (c[g].splice(h, 1), g = f.coordstype, OBJ.is(c[g]) ? c[g].push(f) : c[g] = [f], h = c[g].length - 1, c.changed = !0, AGB.Data.Change(),
                    b({tab: "Construction", data: g + ":" + h})
                )
                )
                );
            } else if (VAL.check(e, "increase", "decrease", "increaseRange", "decreaseRange") && (g = AGB.Construction.getKey(a.value), h = AGB.Construction.getIndex(a.value), OBJ.is(c[g]) && c[g][h] && (f = OBJ.create(c[g][h]), OBJ.get(f, "id")
                )
                )) {
                if (200 > +f.id) {
                    if (l = {increase: 1, decrease: -1}[e] || 0) {
                        f.increase += l;
                    }
                    (l = {increaseRange: 1, decreaseRange: -1}[e] || 0
                    ) && f.increase && (f.range += l
                    )
                } else if (l = {increase: 1, decrease: -1, increaseRange: 10, decreaseRange: -10}[e] || 0) {
                    f.level += l;
                }
                AGB.Construction.update(d,
                                        f
                );
                c[g][h] = f;
                c.changed = !0;
                AGB.Data.Change();
                b({tab: "Construction", data: g + ":" + h})
            }
        }
    }, update: function (a, b) {
        var c, d, e, f, g, h, l;
        if (OBJ.is(b) && AGB.Item.valid(b.id)) {
            if (c = b.id, OBJ.copy({
                                       metal: 0,
                                       crystal: 0,
                                       deuterium: 0,
                                       resources: 0,
                                       duration: 0
                                   }, b
                ), c in AGB.Item.Ship || c in AGB.Item.Defense) {
                b.level = Math.max(b.level, 1), b.duration = b.time * b.level, b.range = 0, b.increase = 0, OBJ.iterate(AGB.Item.Resource, function (a) {
                                                                                                                            var d;
                                                                                                                            d = OBJ.get(AGB.Item.Info[c], a);
                                                                                                                            b[a] = d ? d * b.level : 0
                                                                                                                        }
                ), b.resources = b.metal + b.crystal + b.deuterium;
            } else if (c in
                       AGB.Item.Mining || c in AGB.Item.Station || c in AGB.Item.Research) {
                d = OBJ.get(AGB.Item.Info[c], "factor"), b.increase = c in AGB.Item.Research ? Math.max(b.increase || 0, 0) : Math.max(b.increase || 0, -1 * b.level), b.range = b.reserved ? 0 : 0 > b.increase ? Math.max(Math.min(b.level + b.increase, b.range || 0), 0) : Math.max(b.range || 0, 0), 0 > b.increase ? (f = Math.max(b.level + b.increase, 0), e = Math.max(f - b.range, 0), g = 4 * AGB.Units.Get(a, "account", "121")
                ) : (0 < b.increase ? (e = b.level + b.increase, f = e + b.range
                ) : e = f = b.level, g = 0
                                                                                                                                                                                                                                                                                                          ), b.start = e, b.stop = f, h = {
                    metal: 0,
                    crystal: 0
                }, OBJ.iterate(AGB.Item.Resource, function (a) {
                                   var m;
                                   if (m = OBJ.get(AGB.Item.Info[c], a)) {
                                       for (l = e; l <= f; l++) {
                                           b[a] += Math.floor(m * Math.pow(d, l - 1));
                                       }
                                       h[a] = b[a];
                                       g && (b[a] = Math.floor(b[a] - b[a] / 100 * g)
                                       )
                                   }
                               }
                ), b.duration = Math.floor((h.metal + h.crystal
                                           ) * b.time
                ), b.resources = b.metal + b.crystal + b.deuterium
            }
        }
    }, List: function (a, b) {
        var c, d, e;
        d = AGB.App.getPlayer(a);
        c = AGB.Construction.Data[d];
        d && c && (e = {tab: "Construction", list: c}, e.Active = AGB.Units.SummarizePosition({
                                                                                                  keyPlayer: d,
                                                                                                  planet: a.active
                                                                                              }
        ), e.Units = a.planet && "account" !==
                                 a.planet ? AGB.Units.SummarizePosition(a) : AGB.Units.SummarizeAccount(a)
        );
        AGB.Panel.Cache(a, e);
        b && b(e)
    }, split: function (a) {
        a = STR.check(a).split(":");
        a = {
            galaxy:         +a[0] || 0,
            system:         +a[1] || 0,
            position:       +a[2] || 0,
            type:           +a[3] || 0,
            mission:        +a[4] || 0,
            speed:          +a[5] || 0,
            holdingtime:    +a[6] || 0,
            disabled:       +a[7] || 0,
            time:           +a[8] || 0,
            id:             a[10] || "",
            level:          +a[11] || 0,
            increase:       +a[12] || 0,
            range:          +a[13] || 0,
            reserved:       +a[14] || 0,
            arrival:        +a[15] || 0,
            metal:          +a[16] || 0,
            crystal:        +a[17] || 0,
            deuterium:      +a[18] || 0,
            preferResource: +a[19] || 0,
            timeResource:   +a[20] || 0
        };
        a.resources = a.metal + a.crystal + a.deuterium;
        return a
    }, join: function (a) {
        var b;
        if (OBJ.is(a)) {
            a = [
                a.galaxy || "",
                a.system || "",
                a.position || "",
                a.type || "",
                a.mission || "",
                a.speed || "",
                a.holdingtime || "",
                a.disabled || "",
                a.time || "",
                "",
                a.id || "",
                a.level || "",
                a.increase || "",
                a.range || "",
                a.reserved || "",
                a.arrival || "",
                a.metal || "",
                a.crystal || "",
                a.deuterium || "",
                a.preferResource || "",
                a.timeResource || ""
            ];
            for (b = a.length; 0 < b && !a[b - 1];) {
                b--;
            }
            a.length = b;
            return a.join(":")
        }
        return ""
    }, getKey: function (a) {
        return STR.check(a).split(":", 4).join(":")
    },
    getIndex: function (a) {
        return +STR.check(a).split(":")[4] || 0
    }
};
AGB.Token = {
    Data: {}, Sort: {}, Info: {
        21: {cls: "active"},
        22: {cls: "inactive"},
        23: {cls: "longinactive"},
        24: {cls: "noob"},
        25: {cls: "strong"},
        26: {cls: "honorableTarget"},
        27: {cls: "outlaw"},
        28: {cls: "banned"},
        29: {cls: "vacation"},
        30: {cls: "admin"},
        41: {cls: "ally_own"},
        42: {},
        43: {},
        44: {},
        45: {},
        46: {},
        47: {},
        48: {},
        49: {},
        51: {cls: "buddy"},
        52: {},
        53: {},
        54: {},
        55: {},
        56: {},
        57: {},
        58: {},
        59: {},
        61: {},
        62: {},
        63: {},
        64: {},
        65: {},
        66: {},
        67: {},
        68: {},
        69: {},
        71: {},
        72: {},
        73: {},
        74: {},
        75: {},
        76: {},
        77: {},
        78: {},
        79: {},
        81: {},
        91: {},
        92: {},
        94: {},
        95: {},
        96: {},
        97: {},
        98: {},
        99: {},
        S1: {},
        S2: {},
        S3: {},
        S4: {},
        S5: {},
        S6: {},
        S7: {},
        S8: {},
        S9: {},
        SA: {},
        SB: {},
        SC: {}
    }, Messages: function (a, b, c) {
        "Get" === a ? AGB.Token.Get(b, c) : "Action" === a ? AGB.Token.Action(b, c) : "List" === a && AGB.Token.List(b, c)
    }, Init: function (a, b) {
        var c;
        if (c = AGB.App.getPlayer(a)) {
            AGB.Token.Data[c] = {}, AGB.Token.Sort[c] = {}, AGB.Data.iterate("Token", function (a, e) {
                                                                                 2 <= a.tab ? (AGB.Token.Data[c][e] = OBJ.parse(b[AGB.Data.getKey(c, "Token", e)]), AGB.Token.Upgrade(c, e)
                                                                                 ) : a.tab && (AGB.Token.Data[c][e] = {}
                                                                                 )
                                                                             }
            ), AGB.Token.InitInfo(a)
        }
    },
    InitInfo: function (a) {
        var b, c;
        (c = AGB.App.getPlayer(a)
        ) && AGB.Token.Data[c] && (AGB.Token.Data[c].Info = {}, b = AGB.Token.Data[c].Info, OBJ.iterate(AGB.Token.Info, function (a) {
                                                                                                            var e;
                                                                                                            b[a] = {};
                                                                                                            AGB.Token.Info[a].cls && (b[a].cls = AGB.Token.Info[a].cls
                                                                                                            );
                                                                                                            (e = AGB.Option.Get(c, "C" + a)
                                                                                                            ) && "string" === typeof e && (e = e.split("|"), e[0] && (b[a].color = e[0], e[1] && (b[a].opacity = +e[1]
                                                                                                            ), e[2] && (b[a].condition = +e[2]
                                                                                                            ), e[3] && (b[a].limit = +e[3]
                                                                                                            ), e[4] && (b[a].name = e[4]
                                                                                                            )
                                                                                                            )
                                                                                                            )
                                                                                                        }
        )
        )
    }, Upgrade: function (a, b) {
        var c, d;
        d = AGB.Data.get("Token", b, "version");
        c =
        AGB.Token.Data[a];
        OBJ.is(c[b]) || (c[b] = {}
        );
        c[b].version !== d && (c[b].changed = !0, c[b].version = d, AGB.Data.Change()
        )
    }, Save: function (a) {
        var b, c;
        c = AGB.App.getPlayer(a);
        b = AGB.Token.Data[c];
        OBJ.iterate(b, function (d) {
                        AGB.Data.isStorage(c, "Token", d) && (a.backup || b[d].changed
                        ) && (delete b[d].changed, a.save && (a.save[AGB.Data.getKey(c, "Token", d)] = JSON.stringify(b[d])
                        ), a.backup && AGB.Data.isBackup(c, "Token", d, 2) && (a.backup["Token_" + d] = JSON.stringify(b[d])
                        )
                        )
                    }
        )
    }, Action: function (a, b) {
        var c, d, e, f, g, h, l, p;
        d = AGB.App.getPlayer(a);
        e = AGB.Token.getTab(a);
        c = AGB.Token.Data[d];
        f = +a.token || 0;
        f = -1 === f ? f : "Alliance" !== e || !NMR.isMinMax(f, 41, 49) && 81 !== f ? "Player" === e && NMR.isMinMax(f, 51, 89) ? f : "Target" === e && NMR.isMinMax(f, 61, 89) ? f : 0 : f;
        d && e && c && f && (g = STR.check(a.id), "Target" === e && (1E8 < a.time ? g = AGB.Task.cutCoordsType(a.coords) || a.time : (a.time = 0, g = g || AGB.Task.cutCoords(a.coords)
        )
        ), p = {
            tab: e,
            action: a.action,
            id: g,
            token: f
        }, "set" === a.action && (h = f + "|" + STR.check(a.name), "Alliance" === e && a.tag && (h += "|" + a.tag
        ), "Target" === e && (h += "|" + STR.check(a.coords),
        a.time && (h += "|" + a.time
        )
        )
        ), 80 > f ? "set" === a.action ? (p.changed = !0, c[e].changed = !0, c[e][g] = h
        ) : "remove" === a.action && g in c[e] && (p.changed = !0, c[e].changed = !0, delete c[e][g]
        ) : 81 === f && OBJ.is(c.Current) && (g = e[0] + g, "set" === a.action ? (p.changed = !0, c.Current.changed = !0, c.Current[g] = h, l = 0, OBJ.iterate(c.Current, function (a) {
                                                                                                                                                                   a[0] === e[0] && l++
                                                                                                                                                               }
        ), l = Math.max(0, l - AGB.Option.Get(d, "I05")), OBJ.iterate(c.Current, function (a) {
                                                                          0 < l && a[0] === e[0] && (l--, delete c.Current[a]
                                                                          )
                                                                      }
        )
        ) : "remove" === a.action && g in c.Current && (p.changed = !0, c.Current.changed = !0, delete c.Current[g]
        )
        ), p.changed && (OBJ.is(AGB.Token.Sort[d]) && (AGB.Token.Sort[d][e] = null
        ), a.refresh && (p.Data = c
        ), AGB.Data.Change()
        )
        );
        b && b(p)
    }, List: function (a, b) {
        var c, d, e, f, g;
        e = AGB.App.getPlayer(a);
        f = AGB.Token.getTab(a);
        c = AGB.Token.Data[e];
        f && OBJ.is(c) && (AGB.Token.Sort[e] || (AGB.Token.Sort[e] = {}
        ), d = AGB.Token.Sort[e], d[f] || (d[f] = {}, OBJ.iterate(c[f], function (a) {
                                                                      if ("version" !== a && "changed" !== a) {
                                                                          var b;
                                                                          b = STR.check(c[f][a]).split("|")[0];
                                                                          41 <= b && 79 >= b && (d[f][b] ? d[f][b].push(a) : d[f][b] = [a]
                                                                          )
                                                                      }
                                                                  }
        ), OBJ.iterate(c.Current,
                       function (a) {
                           if ("version" !== a && "changed" !== a) {
                               var b;
                               b = STR.check(c.Current[a]).split("|")[0];
                               a[0] === f[0] && 81 <= b && 89 >= b && (a = a.slice(1), d[f][b] ? d[f][b].push(a) : d[f][b] = [a]
                               )
                           }
                       }
        )
        ), g = {tab: f, token: a.token, listTab: {}, listToken: []}, OBJ.iterate(d[f], function (a) {
                                                                                     g.listTab[a] = d[f][a].length
                                                                                 }
        ), a.token && (OBJ.iterateArray(d[f][a.token], function (b) {
                                            (b = AGB.Token.get(c, f, a.token, b)
                                            ) && g.listToken.push(b)
                                        }
        ), "Target" === f && a.sort ? g.listToken.sort(function (a, b) {
                                                           var c = (OBJ.get(a, "coords") || ""
                                                           ).split(":"), d = (OBJ.get(b, "coords") ||
                                                                              ""
                                                           ).split(":");
                                                           return +c[0] < +d[0] ? -1 : +c[0] > +d[0] ? 1 : +c[1] < +d[1] ? -1 : +c[1] > +d[1] ? 1 : +c[2] < +d[2] ? -1 : +c[2] > +d[2] ? 1 : 0
                                                       }
        ) : g.listToken.sort(function (a, b) {
                                 var c = (OBJ.get(a, "name") || ""
                                 ).toLowerCase(), d = (OBJ.get(b, "name") || ""
                                 ).toLowerCase();
                                 return c < d ? -1 : c === d ? 0 : 1
                             }
        )
        )
        );
        AGB.Panel.Cache(a, g);
        b && b(g)
    }, Get: function (a, b) {
        var c, d, e;
        c = AGB.App.getPlayer(a);
        (d = AGB.Token.getTab(a)
        ) && (e = AGB.Token.get(AGB.Token.Data[c], d, a.token, a.id)
        );
        if (b) {
            b(e);
        } else {
            return e || ""
        }
    }, get: function (a, b, c, d) {
        var e;
        OBJ.is(a) && b && d && (80 > c ? OBJ.is(a[b]) &&
                                         a[b][d] && (e = {
            id: d,
            name: AGB.Token.getName(a[b], d)
        }, "Alliance" === b && (e.tag = AGB.Token.getTag(a[b], d)
        ), "Target" === b && (e.coords = AGB.Token.getCoords(a[b], d), e.time = AGB.Token.getTime(a[b], d)
        )
        ) : 81 === c && OBJ.is(a.Current) && a.Current[b[0] + d] && (e = {
            id: d,
            name: AGB.Token.getName(a.Current, b[0] + d)
        }, "Alliance" === b && (e.tag = AGB.Token.getTag(a.Current, b[0] + d)
        ), "Target" === b && (e.coords = AGB.Token.getCoords(a.Current, b[0] + d), e.time = AGB.Token.getTime(a.Current, b[0] + d)
        )
        )
        );
        return e || ""
    }, getName: function (a, b) {
        return OBJ.is(a) &&
               b ? STR.check(a[b]).split("|")[1] || "" : ""
    }, getCoords: function (a, b) {
        return OBJ.is(a) && b ? STR.check(a[b]).split("|")[2] || "" : ""
    }, getTag: function (a, b) {
        return OBJ.is(a) && b ? STR.check(a[b]).split("|")[2] || "" : ""
    }, getTime: function (a, b) {
        var c;
        return OBJ.is(a) && b ? (c = +STR.check(a[b]).split("|")[3] || 0, 1E8 < c ? c : 0
        ) : 0
    }, getColor: function (a, b) {
        return AGB.Token.is(a, "Info") && AGB.Token.Data[a].Info[b] ? AGB.Token.Data[a].Info[b].color || "" : ""
    }, getClass: function (a, b) {
        return AGB.Token.is(a, "Info") && AGB.Token.Data[a].Info[b] ? "status_abbr_" +
                                                                      (AGB.Token.Data[a].Info[b].cls || b
                                                                      ) : ""
    }, getCondition: function (a, b) {
        return AGB.Token.is(a, "Info") && AGB.Token.Data[a].Info[b] ? +AGB.Token.Data[a].Info[b].condition || 0 : 0
    }, getOpacity: function (a, b) {
        return AGB.Token.is(a, "Info") && AGB.Token.Data[a].Info[b] ? +AGB.Token.Data[a].Info[b].opacity || 0 : 0
    }, getColorOpacity: function (a, b, c) {
        var d, e;
        d = AGB.Token.getColor(a, b);
        e = AGB.Token.getOpacity(a, b);
        return d ? (e = e || (80 > b ? AGB.Option.Get(a, "CT2") : AGB.Styles.opacity
        ) || 100, "INHERIT" === d ? e / 100 : AGB.Styles.getColor(d, c ? 2 * e :
                                                                     e
        )
        ) : ""
    }, getTab: function (a) {
        return OBJ.is(a) && a.keyPlayer && AGB.Token.Data[a.keyPlayer] && a.tab && OBJ.is(AGB.Token.Data[a.keyPlayer][a.tab]) ? a.tab : ""
    }, is: function (a, b) {
        return a && b && AGB.Token.Data[a] && OBJ.is(AGB.Token.Data[a][b]) ? b : ""
    }
};
AGB.Fleet = {
    Data: {}, Messages: function (a, b) {
        "Set" === a ? AGB.Fleet.Set(b) : "Action" === a && AGB.Fleet.Action(b)
    }, Init: function (a, b) {
        var c, d, e, f;
        if (e = AGB.App.getPlayer(a)) {
            c = AGB.Fleet.Data[e] = {version: AGB.Data.get("Fleet", "Data", "version")}, d = OBJ.parse(b[AGB.Data.getKey(e, "Fleet", "Data")]), f = c.version !== d.version, AGB.Data.iterate("Fleet", function (a, b) {
                                                                                                                                                                                                  2 <= a.tab ? c[b] = OBJ.is(d[b]) && !f ? d[b] : 3 === a.tab ? [] : {} : a.tab && (c[b] = {}
                                                                                                                                                                                                  )
                                                                                                                                                                                              }
            ), f && (c.changed = !0, AGB.Data.Change()
            );
        }
        c = d = e = f = null
    }, Save: function (a) {
        var b, c;
        c = AGB.App.getPlayer(a);
        b = AGB.Fleet.Data[c];
        AGB.Data.isStatus(c) && b && (a.backup || b.changed
        ) && (delete b.changed, a.save && (a.save[c + "_Fleet_Data"] = JSON.stringify(b)
        ), a.backup && AGB.Data.isBackup(c, "Fleet", "Data", 2) && (a.backup.Fleet_Data = JSON.stringify(b)
        )
        )
    }, Set: function (a) {
        var b, c, d, e;
        c = AGB.App.getPlayer(a);
        d = AGB.Data.getTab(a, "Fleet");
        b = AGB.Fleet.Data[c];
        c && d && b && (OBJ.is(b[d]) || (b[d] = {}
        ), OBJ.iterate(a.data, function (c) {
                           b[d][c] !== a.data[c] && (b[d][c] = a.data[c], e = !0
                           )
                       }
        ), e && (b.changed = !0, AGB.Data.Change()
        )
        );
        b = c = d = e = null
    }, Action: function (a) {
        var b,
            c, d, e, f;
        c = AGB.App.getPlayer(a);
        d = AGB.Data.getTab(a, "Fleet");
        b = AGB.Fleet.Data[c];
        if (c && d && b && "Last" === d && OBJ.get(a.data, "coords")) {
            if (Array.isArray(b.Last) || (b.Last = []
                ), d = a.data, e = +d.routine || 0, f = d.mission, d.routine = 0, !e || VAL.check(e, 1, 2, 3, 4)) {
                1 !== f && delete d.retreatAfterDefenderRetreat;
                5 !== f && delete d.holdingtime;
                15 !== f && delete d.expeditiontime;
                2 !== f && delete d.union;
                if (3 === e) {
                    1 === f && (d.routine = 3
                    ), d.metal = d.crystal = d.deuterium = 0;
                } else if (4 === e) {
                    8 === f && (d.routine = 4
                    ), d.metal = d.crystal = d.deuterium = 0;
                } else if (2 ===
                           e || d.resources) {
                    !d.resources || 3 !== f && 4 !== f ? d.metal = d.crystal = d.deuterium = 0 : d.routine = 2;
                }
                e = [AGB.Task.join(d, 2)];
                for (c = 0; c < b.Last.length; c++) {
                    a = AGB.Task.split(b.Last[c], 2), a.mission && (d.coordstype === AGB.Task.cutCoordsType(b.Last[c]) && f === a.mission && d.routine === a.routine || e.push(b.Last[c])
                    );
                }
                b.Last = [];
                for (c = 0; c < e.length && !(e[c] && b.Last.push(e[c]), 8 < b.Last.length
                ); c++) {
                    ;
                }
                b.changed = !0;
                AGB.Data.Change()
            } else {
                5 === e ? (a = AGB.Task.split(OBJ.get(b.Routine, "Collect")), a.routine && (d.routine = a.routine, e = AGB.Task.cut(AGB.Task.join(d),
                                                                                                                                    10
                ), AGB.Fleet.Set({keyPlayer: c, tab: "Routine", data: {Collect: e}})
                )
                ) : 6 === e ? (a = AGB.Task.split(OBJ.get(b.Routine, "Save")), a.routine && (d.routine = a.routine, e = AGB.Task.cut(AGB.Task.join(d), 10), AGB.Fleet.Set({
                                                                                                                                                                              keyPlayer: c,
                                                                                                                                                                              tab: "Routine",
                                                                                                                                                                              data: {Save: e}
                                                                                                                                                                          }
                )
                )
                ) : 7 === e && (e = AGB.Task.cutSystem(a.coords), 15 === f && e && AGB.Fleet.Set({
                                                                                                     keyPlayer: c,
                                                                                                     tab: "Expo",
                                                                                                     data: OBJ.createKey(e, (+OBJ.get(b.Expo, e) || 0
                                                                                                                            ) + 1
                                                                                                     )
                                                                                                 }
                )
                )
            }
        }
    }
};
AGB.DataBase = {
    status: 0,
    readLimit: 2E3,
    Info: {
        Player: {keyPath: "I", hour: 24, url: "/api/players.xml", split: "<player "},
        Universe: {keyPath: "pI", hour: 168, url: "/api/universe.xml", split: "<planet "}
    },
    Data: {},
    Cache: {},
    Messages: function (a, b, c) {
        OBJ.is(b) && ("Remove" === a ? AGB.DataBase.Remove(b) : "Set" === a ? AGB.DataBase.Set(b, c) : "GetPlayer" === a ? AGB.DataBase.GetPlayer(b, c) : "GetPlanet" === a && AGB.DataBase.GetPlanet(b, c)
        )
    },
    Start: function (a) {
        OBJ.is(a.indexedDB) && "function" === typeof a.IDBKeyRange && (AGB.DataBase.indexedDB = a.indexedDB,
            AGB.DataBase.IDBKeyRange = a.IDBKeyRange, AGB.DataBase.status = 1
        )
    },
    Init: function (a) {
        var b;
        if (b = AGB.App.getUni(a)) {
            OBJ.is(AGB.DataBase.Data[b]) || (AGB.DataBase.Data[b] = {
                status: 0,
                keyUni: a.keyUni,
                urlUni: a.urlUni
            }
            ), b = AGB.DataBase.Data[b], 0 <= b.status && 2 >= b.status && (b.status = 3, b.keyPlayer = a.keyPlayer, b.api = AGB.Option.Get(a.keyPlayer, "D20"), AGB.DataBase.Open(OBJ.create(b), "Player")
            )
        }
    },
    Status: function (a) {
        var b, c;
        (c = AGB.App.getUni(a)
        ) && AGB.DataBase.Data[c] && (b = {
            status: AGB.DataBase.Data[c].status,
            tab: a.tab
        }, OBJ.iterate(AGB.DataBase.Info,
                       function (a) {
                           var e;
                           e = AGB.DataBase.Data[c + "_" + a] || {};
                           b[a] = {
                               status:    +e.status || 0,
                               timestamp: +e.timestamp || 0,
                               loading:   +e.loading || 0,
                               entries:   +e.entries || 0
                           }
                       }
        )
        );
        return b
    },
    Close: function (a) {
        if (OBJ.is(AGB.DataBase.Data[a])) {
            if (OBJ.is(AGB.DataBase.Data[a].db)) {
                try {
                    AGB.DataBase.Data[a].db.close()
                } catch (b) {
                }
            }
            AGB.DataBase.Data[a].db = null
        }
    },
    Remove: function (a) {
        function b(a, b) {
            var c;
            AGB.App.getUni({keyUni: a}) && AGB.DataBase.Info[b] && (AGB.Core.Log("DataBase - Remove   : " + a + "_" + b, !0), c = !0, AGB.DataBase.set(a + "_" + b, "status",
                                                                                                                                                       0
            ), OBJ.iterate(AGB.DataBase.Info, function (b) {
                               -3 === AGB.DataBase.get(a + "_" + b, "status") && (c = !1
                               )
                           }
            ), c && AGB.DataBase.set(a, "status", 0)
            )
        }

        var c;
        if (c = AGB.App.getUni(a)) {
            AGB.DataBase.set(c, "status", -3), OBJ.iterate(AGB.DataBase.Info, function (a) {
                                                               var e;
                                                               e = c + "_" + a;
                                                               AGB.DataBase.Close(e);
                                                               AGB.DataBase.Data[e] = {status: -3};
                                                               AGB.DataBase.indexedDB.deleteDatabase(e).onsuccess = function () {
                                                                   b(c, a)
                                                               }
                                                           }
            )
        }
    },
    set: function (a, b, c) {
        a && b && OBJ.is(AGB.DataBase.Data[a]) && (AGB.DataBase.Data[a][b] = c
        )
    },
    get: function (a, b) {
        return a && b && OBJ.is(AGB.DataBase.Data[a]) ?
               AGB.DataBase.Data[a][b] : 0
    },
    isStatus: function (a, b) {
        var c, d;
        if ((c = AGB.App.getUni(a)
            ) && b && AGB.DataBase.Info[b]) {
            if (1 === AGB.DataBase.get(c, "status")) {
                return c = c + "_" + b, d = AGB.DataBase.get(c, "status"), 1 === d || 2 === d ? c : "";
            }
            a.error = !0
        }
        return ""
    },
    ObjectStore: function (a, b, c, d) {
        if (a && OBJ.is(AGB.DataBase.Data[a].db)) {
            try {
                d(AGB.DataBase.Data[a].db.transaction(b, c || "readonly").objectStore(b))
            } catch (e) {
                AGB.DataBase.indexedDB.open(a).onsuccess = function (e) {
                    try {
                        AGB.DataBase.Data[a].db = e.target.result
                    } catch (g) {
                        AGB.DataBase.Data[a].db =
                        null
                    }
                    try {
                        d(AGB.DataBase.Data[a].db.transaction(b, c || "readonly").objectStore(b))
                    } catch (h) {
                        d(null)
                    }
                }
            }
        } else {
            d(null)
        }
    },
    Set: function (a) {
        var b;
        OBJ.is(a) && OBJ.is(a.data) && (b = AGB.DataBase.isStatus(a, "Player"), a.api = AGB.DataBase.get(a.keyUni, "api"), b && OBJ.is(a.data.Player) && AGB.DataBase.ObjectStore(b, "I", "readwrite", function (b) {
                                                                                                                                                                                      b && OBJ.iterate(a.data.Player, function (d) {
                                                                                                                                                                                                           var e;
                                                                                                                                                                                                           e = a.data.Player[d];
                                                                                                                                                                                                           e.I && (b.get(+d).onsuccess = function (d) {
                                                                                                                                                                                                               d = d.target.result;
                                                                                                                                                                                                               d && e.N === d.N && e.s === d.s && e.aI === d.aI || (a.api && AGB.Core.Log("Galaxy - Update Player " +
                                                                                                                                                                                                                                                                                          e.N
                                                                                                                                                                                                               ), b.put(e)
                                                                                                                                                                                                               )
                                                                                                                                                                                                           }
                                                                                                                                                                                                           )
                                                                                                                                                                                                       }
                                                                                                                                                                                      )
                                                                                                                                                                                  }
        ), (b = AGB.DataBase.isStatus(a, "Universe")
           ) && OBJ.is(a.data.Planet) && AGB.DataBase.ObjectStore(b, "pI", "readwrite", function (b) {
                                                                      b && OBJ.iterate(a.data.Planet, function (d) {
                                                                                           var e;
                                                                                           e = a.data.Planet[d];
                                                                                           b.index("c").get(d).onsuccess = function (f) {
                                                                                               f = f.target.result;
                                                                                               if (e && !f) {
                                                                                                   a.api && AGB.Core.Log("Galaxy - New planet: " + d), b.put(e);
                                                                                               } else if (e && f) {
                                                                                                   if (e.I !== f.I) {
                                                                                                       AGB.Core.Log("Galaxy - Different player: " + d + " - Player " + f.I), f.c = "moved", b.put(f), b.put(e);
                                                                                                   } else if (e.pI !== f.pI) {
                                                                                                       AGB.Core.Log("Galaxy - Different planet: " +
                                                                                                                    d
                                                                                                       ), f.c = "moved", b.put(f), b.put(e);
                                                                                                   } else {
                                                                                                       if (e.pN !== f.pN || e.mI !== f.mI || e.mN !== f.mN) {
                                                                                                           AGB.Core.Log("Galaxy - Update planet: " + d), b.put(e)
                                                                                                       }
                                                                                                   }
                                                                                               } else {
                                                                                                   !e && f && (AGB.Core.Log("Galaxy - Missing planet: " + d + " - Player " + f.I), f.c = "moved", b.put(f)
                                                                                                   )
                                                                                               }
                                                                                           }
                                                                                       }
                                                                      )
                                                                  }
        )
        )
    },
    GetPlayer: function (a, b) {
        function c(c) {
            a.error && b(a);
            a.planets ? (c = c || {}, AGB.DataBase.getPlanetsByPlayerId(a, function (e) {
                                                                            c.planets = e;
                                                                            Array.isArray(c.planets) && (OBJ.iterateArray(c.planets, function (a) {
                                                                                                                              a && (!c.planetHome || +a.planetId < +c.planetHome
                                                                                                                              ) && (c.planetHome = a.planetId
                                                                                                                              )
                                                                                                                          }
                                                                            ),
                                                                                1 === a.planets ? c.planets.sort(function (a, b) {
                                                                                                                     var c, d;
                                                                                                                     c = STR.check(a.coords).split(":");
                                                                                                                     d = STR.check(b.coords).split(":");
                                                                                                                     return +c[0] < +d[0] ? -1 : +c[0] > +d[0] ? 1 : +c[1] < +d[1] ? -1 : +c[1] > +d[1] ? 1 : +c[2] < +d[2] ? -1 : +c[2] > +d[2] ? 1 : 0
                                                                                                                 }
                                                                                ) : 2 === a.planets && c.planets.sort(function (a, b) {
                                                                                                                          STR.check(a.planetName);
                                                                                                                          STR.check(b.planetName);
                                                                                                                          return a < b ? -1 : a === b ? 0 : 1
                                                                                                                      }
                                                                                )
                                                                            );
                                                                            b(c)
                                                                        }
            )
            ) : b(c)
        }

        "function" === typeof b && (a.id ? AGB.DataBase.getPlayerById(a, c) : a.coords ? AGB.DataBase.getPlanetByCoords(a, function (b) {
                                                                                                                            a.id = OBJ.get(b, "playerId");
                                                                                                                            AGB.DataBase.getPlayerById(a,
                                                                                                                                                       c
                                                                                                                            )
                                                                                                                        }
        ) : b()
        )
    },
    GetPlanet: function (a, b) {
        "function" === typeof b && (a.id ? b() : a.coords ? AGB.DataBase.getPlanetByCoords(a, function (c) {
                                                                                               c = c || {};
                                                                                               a.id = c.playerId;
                                                                                               AGB.DataBase.getPlayerById(a, function (a) {
                                                                                                                              OBJ.copy(a, c);
                                                                                                                              b(c)
                                                                                                                          }
                                                                                               )
                                                                                           }
        ) : b()
        )
    },
    getPlayerById: function (a, b) {
        var c;
        if ("function" === typeof b) {
            if (c = AGB.DataBase.isStatus(a, "Player")) {
                try {
                    AGB.DataBase.ObjectStore(c, "I", "readonly", function (c) {
                                                 c && +a.id ? c.get(+a.id).onsuccess = function (a) {
                                                     var c;
                                                     a = a.target.result;
                                                     OBJ.is(a) && a.I && (c = {
                                                         playerId: (a.I || ""
                                                                   ) + "",
                                                         playerName: a.N || "",
                                                         playerStatus: a.s || "",
                                                         allianceId: (a.aI || ""
                                                                   ) + ""
                                                     }
                                                     );
                                                     b(c)
                                                 } : b()
                                             }
                    )
                } catch (d) {
                    b()
                }
            } else {
                b()
            }
        }
    },
    getPlanetsByPlayerId: function (a, b) {
        var c;
        if ("function" === typeof b) {
            if (c = AGB.DataBase.isStatus(a, "Universe")) {
                try {
                    AGB.DataBase.ObjectStore(c, "pI", "readonly", function (c) {
                                                 var d;
                                                 c && +a.id ? (d = [], c.index("I").openCursor(AGB.DataBase.IDBKeyRange.only(+a.id)).onsuccess = function (a) {
                                                     var c, e;
                                                     a.target.result ? (e = a.target.result.value, OBJ.get(e, "pI") && (c = {
                                                         coords: e.c || "",
                                                         planetId: (e.pI || ""
                                                                 ) + "",
                                                         planetName: e.pN || ""
                                                     }, e.mI && (c.moonId = (e.mI ||
                                                                             ""
                                                                            ) + "", c.moonName = e.mN || ""
                                                     ), d.push(c)
                                                     ), a.target.result["continue"]()
                                                     ) : b(d)
                                                 }
                                                 ) : b()
                                             }
                    )
                } catch (d) {
                    b()
                }
            } else {
                b()
            }
        }
    },
    getPlanetByCoords: function (a, b) {
        var c;
        if ("function" === typeof b) {
            if (c = AGB.DataBase.isStatus(a, "Universe")) {
                try {
                    AGB.DataBase.ObjectStore(c, "pI", "readonly", function (c) {
                                                 c && a.coords ? c.index("c").get(a.coords).onsuccess = function (a) {
                                                     var c;
                                                     a = a.target.result;
                                                     OBJ.is(a) && a.pI && (c = {
                                                         playerId: (a.I || ""
                                                                   ) + "",
                                                         coords: a.c || "",
                                                         planetId: (a.pI || ""
                                                                   ) + "",
                                                         planetName: a.pN || "",
                                                         moonId: (a.mI || ""
                                                                   ) + "",
                                                         moonName: a.mN || ""
                                                     }
                                                     );
                                                     b(c)
                                                 } :
                                                 b()
                                             }
                    )
                } catch (d) {
                    b()
                }
            } else {
                b()
            }
        }
    },
    Open: function (a, b) {
        function c(b, c, e) {
            d.timestamp = +e || 1;
            d.status = c ? c : "blocked" === b.type ? -1 : -2;
            try {
                d.db = b.target.result
            } catch (f) {
                d.db = null
            }
            AGB.DataBase.Check(a)
        }

        var d, e, f;
        f = -3;
        AGB.App.getUni(a) && b && (a.key = "", a.tab = b, AGB.DataBase.Info[a.tab] && (a.key = a.keyUni + "_" + a.tab, OBJ.is(AGB.DataBase.Data[a.key]) || (AGB.DataBase.Data[a.key] = {}
        ), d = AGB.DataBase.Data[a.key], f = +d.status || 0, f = -1 > f ? f : 1 === f || 2 === f ? f : 0, d.status = f
        )
        );
        0 > f ? AGB.DataBase.Check(a) : OBJ.is(d.db) && d.timestamp ? AGB.DataBase.Check(a) :
                                        (d.status = 4, AGB.DataBase.Close(a.key), e = AGB.DataBase.indexedDB.open(a.key, 2), e.onblocked = c, e.onerror = c, e.onupgradeneeded = function (d) {
                                            var f, l;
                                            f = AGB.DataBase.Info[a.tab].keyPath;
                                            e.onsuccess = null;
                                            l = d.target.result;
                                            l.onerror = c;
                                            l.objectStoreNames.contains("info") || l.createObjectStore("info");
                                            l.objectStoreNames.contains(f) || (f = l.createObjectStore(f, {keyPath: f}), "Universe" === b && (f.createIndex("I", "I", {unique: !1}), f.createIndex("c", "c", {unique: !1})
                                            )
                                            );
                                            c(d, 2)
                                        }, e.onsuccess = function (a) {
                                            var b;
                                            try {
                                                b = a.target.result.transaction("info").objectStore("info").get("timestampServer"),
                                                    b.onerror = c, b.onsuccess = function (b) {
                                                    c(a, 1, b.target.result)
                                                }
                                            } catch (d) {
                                                c(a, -2)
                                            }
                                        }
                                        )
    },
    isRead: function (a) {
        return AGB.status && a.api && a.key && 3 <= AGB.DataBase.get(a.keyUni, "status") ? AGB.DataBase.Data[a.key].status : 0
    },
    Check: function (a) {
        var b, c, d;
        1 <= AGB.DataBase.isRead(a) ? (b = AGB.DataBase.Data[a.key], b.status = 1 !== b.status ? b.status : 1E3 > b.timestamp ? 2 : AGB.Time.timestamp() - b.timestamp > 3600 * AGB.DataBase.Info[a.tab].hour ? 2 : 1, 2 <= b.status && (a.load || !b.timestampRead || AGB.Time.timestamp() - b.timestampRead > AGB.DataBase.readLimit
        ) ?
                                                                                                                                                                                                                       (c = new XMLHttpRequest, c.timeout = 2E3, c.open("HEAD", a.urlUni + AGB.DataBase.Info[a.tab].url, !0), c.onerror = c.onload = function () {
                                                                                                                                                                                                                           AGB.DataBase.isRead(a) && (b.timestampRead = AGB.Time.timestamp(), b.timestampHeader = Math.floor((new Date(c.getResponseHeader("Last-Modified"))
                                                                                                                                                                                                                                                                                                                             ).getTime() / 1E3
                                                                                                                                                                                                                           ), 200 === +c.status && 1E4 < b.timestampHeader ? b.status = b.timestamp / 100 < b.timestampHeader / 100 ? 3 : 1 : (b.timestampHeader = 0, AGB.Core.Log("DataBase   - ########## Problem: These OGame API is not available - " + a.tab, !0)
                                                                                                                                                                                                                           )
                                                                                                                                                                                                                           );
                                                                                                                                                                                                                           AGB.DataBase.Read(a)
                                                                                                                                                                                                                       },
                                                                                                                                                                                                                           c.send(null)
                                                                                                                                                                                                                       ) : AGB.DataBase.Read(a)
        ) : (d = AGB.DataBase.get(a.key, "status"), -1 === d && AGB.Core.Log("DataBase   - Problem: Please restart your browser (" + a.key + ")", !0), -2 === d && AGB.Core.Log("DataBase   - Problem: Please delete the database " + a.tab + " for the universe " + a.keyUni, !0), AGB.DataBase.Read(a)
        )
    },
    Read: function (a) {
        function b(b, d) {
            function g() {
                var b, d;
                q++;
                if (3 !== AGB.DataBase.isRead(a)) {
                    c();
                } else if (q < k.length) {
                    d = " " + k[q];
                    b = +STR.getAttribute(d, "id") || q;
                    var f = STR.getAttribute(d, "name"), h = STR.getAttribute(d,
                                                                              "status"
                    ), l = 21;
                    h && (h[0] && (l = Math.max(+t[h[0]] || 0, l)
                    ), h[1] && (l = Math.max(+t[h[1]] || 0, l)
                    ), h[2] && (l = Math.max(+t[h[2]] || 0, l)
                    )
                    );
                    b = {I: b, N: f, s: l};
                    if (d = +STR.getAttribute(d, "alliance") || 0) {
                        b.aI = d;
                    }
                    0 === q % Math.ceil(k.length / 100) && (e.loading = Math.ceil(q / (k.length / 100
                                                                                  )
                    ) || 1, AGB.Manager.message(a, "DataBase", "Notify", {tab: a.tab, loading: e.loading})
                    );
                    s.add(b).onsuccess = g
                }
            }

            function m() {
                var b, d;
                q++;
                3 !== AGB.DataBase.isRead(a) ? c() : q < k.length && (d = (" " + k[q]
                ).split("<moon"), b = {
                    pI: +STR.getAttribute(d[0], "id") || q, I: +STR.getAttribute(d[0],
                                                                                 "player"
                    )   || 2, pN: STR.getAttribute(d[0], "name"), c: STR.getAttribute(d[0], "coords")
                }, d[1] && (b.mI = +STR.getAttribute(d[1], "id") || 0, b.mN = STR.getAttribute(d[1], "name")
                ), 0 === q % Math.ceil(k.length / 100) && (e.loading = Math.ceil(q / (k.length / 100
                                                                                 )
                ) || 1, AGB.Manager.message(a, "DataBase", "Notify", {tab: a.tab, loading: e.loading})
                ), s.add(b).onsuccess = m
                )
            }

            var k, n, s, t, r, q;
            q = 0;
            k = d.split(AGB.DataBase.Info[a.tab].split);
            t = {a: 30, v: 29, b: 28, o: 27, h: 26, I: 23, i: 22};
            r = b.target.result;
            e.db = b.target.result;
            e.entries = k.length;
            e.timestamp =
            e.timestampHeader || +STR.getAttribute(k[0], "timestamp") || AGB.Time.timestamp();
            r.objectStoreNames.contains("info") && r.objectStoreNames.contains(f.keyPath) ? (n = r.transaction("info", "readwrite"), n.objectStore("info").put(0, "timestampServer"), n.objectStore("info").put(0, "entries"), n = r.transaction(f.keyPath, "readwrite"), n.onabort = function () {
                c(1)
            }, n.ontimeout = c, n.oncomplete = function () {
                k = null;
                3 === AGB.DataBase.isRead(a) && (n = r.transaction("info", "readwrite"), n.objectStore("info").put(e.timestamp, "timestampServer"),
                    n.objectStore("info").put(e.entries, "entries"), c(1)
                )
            }, s = n.objectStore(f.keyPath), s.clear(), "Player" === a.tab ? g() : "Universe" === a.tab && m()
            ) : c(-2)
        }

        function c(b) {
            e.status = b || -1;
            e.loading = 0;
            try {
                e.db.close()
            } catch (c) {
            }
            AGB.Manager.message(a, "DataBase", "Notify", AGB.DataBase.Status(a));
            AGB.Core.Log("DataBase - Read     : " + a.key + " - Finished with entries: " + (e.entries || ""
                         ) + " (" + b + ")", !0
            );
            d(a)
        }

        function d(a) {
            "Player" === a.tab ? AGB.DataBase.Open(a, "Universe") : "Universe" === a.tab && a.keyUni && (AGB.DataBase.Data[a.keyUni].status =
                                                                                                         1, OBJ.iterate(AGB.DataBase.Info, function (b) {
                                                                                                                            b = +AGB.DataBase.get(a.keyUni + "_" + b, "status") || 0;
                                                                                                                            0 >= b && (AGB.DataBase.Data[a.keyUni].status = -1
                                                                                                                            );
                                                                                                                            3 <= b && -1 !== AGB.DataBase.Data[a.keyUni].status && (AGB.DataBase.Data[a.keyUni].status = 3
                                                                                                                            )
                                                                                                                        }
            )
            )
        }

        var e, f, g;
        3 === AGB.DataBase.isRead(a) ? (AGB.Core.Log("DataBase - Read     : " + a.key, !0), f = AGB.DataBase.Info[a.tab], e = AGB.DataBase.Data[a.key], e.loading = 0, AGB.Manager.message(a, "DataBase", "Notify", {
                                                                                                                                                                                               tab: a.tab,
                                                                                                                                                                                               loading: e.loading
                                                                                                                                                                                           }
        ), g = new XMLHttpRequest, g.open("GET", a.urlUni + f.url,
                                          !0
        ), g.overrideMimeType("text/html"), g.onerror = g.onload = function () {
            var d, e;
            AGB.DataBase.isRead(a) && (d = g.responseText || "", 200 === +g.status && -1 < d.indexOf(f.split) ? (AGB.DataBase.Close(a.key), e = AGB.DataBase.indexedDB.open(a.key), e.onerror = c, e.onblocked = c, e.onsuccess = function (a) {
                b(a, d || "")
            }
            ) : (AGB.Core.Log("DataBase   - ########## Problem: These OGame API is not available - " + f.url, !0), c()
                                                                 )
            );
            g = null
        }, g.send(null)
        ) : d(a)
    }
};
AGB.Tools = {
    Data: {},
    List: ["A", "B", "C", "D", "E", "F", 1, 2, 3, 4, 5, 6, 7, 8, 9],
    Links: {
        T3A: "http://proxyforgame.com/ogame/calc/trade.php",
        T3B: "http://ogamespec.com/tools/trade.php",
        T4A: "http://proxyforgame.com/ogame/calc/flight.php",
        T4B: "http://www.toolsforogame.com/battle/batalla_ACS_SAC.aspx",
        T4C: "http://snaquekiller.free.fr/ogame/tableau.html",
        T7A: "http://kb.un1matr1x.de/save.php",
        T7B: "http://logserver.net/index.php",
        T9A: "http://wiki.ogame.org/",
        T9B: "http://board.origin.ogame.de/index.php?page=Thread&threadID=104"
    },
    Messages: function (a, b, c) {
        "Action" === a && AGB.Tools.Action(b, c)
    },
    Action: function (a, b) {
        var c, d, e;
        if (d = AGB.App.getPlayer(a, "copy")) {
            e = {id: a.id};
            AGB.Option.Get(d, "T05") && (c = AGB.Task.splitActive(AGB.Option.Get(d, "T06"), 2, a.coordstype), c.ships ? a.Ships = OBJ.createFilter(c, AGB.Item.Ship) : a.planetId && (a.Ships = AGB.Units.create(d, a.planetId, AGB.Item.ShipCombat)
            )
            );
            if (OBJ.is(a.Search)) {
                switch (a.tab = a.Search.tab, a.tab) {
                    case "Alliance":
                        a.searchAlliance = a.Search.id;
                        a.searchAllianceName = a.Search.name;
                        a.searchAllianceTag =
                        a.Search.tag;
                        break;
                    case "Player":
                        a.searchPlayer = a.Search.id;
                        a.searchPlayerName = a.Search.name;
                        break;
                    case "Target":
                        a.searchTarget = a.Search.id, a.searchTargetCoords = a.Search.coords
                }
            } else {
                a.searchAlliance = AGB.Panel.getActive(d, "Alliance", "id", 6), a.searchAllianceName = AGB.Panel.getActive(d, "Alliance", "name", 6), a.searchAllianceTag = AGB.Panel.getActive(d, "Alliance", "tag", 6), a.searchPlayer = AGB.Panel.getActive(d, "Player", "id", 6), a.searchPlayerName = AGB.Panel.getActive(d, "Player", "name", 6), a.searchTarget = AGB.Panel.getActive(d,
                                                                                                                                                                                                                                                                                                                                                                                             "Target", "id", 6
                ), a.searchTargetCoords = AGB.Panel.getActive(d, "Target", "coords", 6);
            }
            -1 < STR.check(a.searchTarget).indexOf(":") && (a.searchTarget = ""
            );
            a.searchTargetMoon = 3 === +STR.check(a.searchTargetCoords).split(":")[3];
            a.searchTargetCoords = AGB.Task.cutCoords(a.searchTargetCoords);
            switch (a.id) {
                case "T1A":
                    AGB.Tools.createOgniter(a);
                    break;
                case "T1B":
                    AGB.Tools.createInfuza(a);
                    break;
                case "T1C":
                    AGB.Tools.createWarRiders(a);
                    break;
                case "T2A":
                    AGB.Tools.createCumulative(a);
                    break;
                case "T2B":
                    AGB.Tools.createOcalcAmortisation(a);
                    break;
                case "T5A":
                    AGB.Tools.createOsimulate(a);
                    break;
                case "T5B":
                    AGB.Tools.createWebsim(a);
                    break;
                case "T5C":
                    AGB.Tools.createDragosim(a);
                    break;
                default:
                    AGB.Tools.createLink(a)
            }
            e.href = a.href
        }
        b && b(e)
    },
    createLink: function (a) {
        var b;
        b = AGB.App.getPlayer(a, "copy");
        b = AGB.Tools.Links[a.id] || STR.check(AGB.Option.Get(b, a.id)).split("|", 2)[1];
        if (b = STR.check(b).trim()) {
            "http:/" !== b.slice(0, 6).toLowerCase() && "https:/" !== b.slice(0, 7).toLowerCase() && (b = "http://" + b
            ), b = b.replace(/\[UNI\]/g, NMR.parseIntAbs(a.abbrUni) || ""),
                b = b.replace(/\[ALLIANCE\]/g, a.searchAlliance || ""), b = b.replace(/\[ALLIANCENAME\]/g, a.searchAllianceName || ""), b = b.replace(/\[ALLIANCETAG\]/g, a.searchAllianceTag || ""), b = b.replace(/\[PLAYER\]/g, a.searchPlayer || ""), b = b.replace(/\[PLAYERNAME\]/g, a.searchPlayerName || ""), b = b.replace(/\[TARGET\]/g, a.searchTarget || ""), b = b.replace(/\[TARGETCOORDS\]/g, a.searchTargetCoords || ""), b = b.replace(/\[TARGETMOON\]/g, a.searchTargetMoon || ""), a.href = b
        }
    },
    createWarRiders: function (a) {
        var b, c;
        if (c = AGB.Com.Get(a.abbrCom, "warriders")) {
            b =
            "Alliance" === a.tab ? "&page=details&type=ally&name=" + (a.searchAllianceTag || ""
            ) : "Player" === a.tab ? "&page=details&type=player&name=" + (a.searchPlayerName || ""
            ) : "", a.href = "http://ogame.gamestats.org/?lang=" + c + "&uni=" + (a.abbrUni || ""
            ).toLowerCase() + encodeURI(b)
        }
    },
    createInfuza: function (a) {
        var b;
        b = "Alliance" === a.tab ? "&pora=alliances&value=" + (a.searchAllianceTag || ""
        ) : "Player" === a.tab ? "&pora=players&value=" + (a.searchPlayerName || ""
        ) : "";
        a.href = "http://www.infuza.com/" + AGB.Com.Get(a.abbrCom, "infuza") + "/Search?server=" +
                 AGB.Com.Get(a.abbrCom, "infuzaServer") + encodeURI(b)
    },
    createOgniter: function (a) {
        var b;
        b = "Alliance" === a.tab ? "/alliance/" + (a.searchAlliance || ""
        ) : "Player" === a.tab ? "/player/" + (a.searchPlayer || ""
        ) : "";
        a.href = "http://www.ogniter.org/" + AGB.Com.Get(a.abbrCom, "ogniter") + "/" + AGB.Com.Get(a.abbrCom, "ogniter") + NMR.parseIntAbs(a.abbrUni) + encodeURI(b)
    },
    createCumulative: function (a) {
        var b, c;
        b = AGB.App.getPlayer(a, "copy");
        c = "http://calc.antigame.de/?lang=" + (a.abbrCom || ""
        ).toLowerCase() + "&coords=" + (a.coords || ""
            ) + "&type=" +
            (a.type || ""
            ) + "&name=" + (a.planetName || ""
            ) + "&uni_speed=" + AGB.Uni.Get(b, "speed") + "&robo=" + AGB.Units.Get(b, a.planetId, "14") + "&nanite=" + AGB.Units.Get(b, a.planetId, "15") + "&rlab=" + AGB.Units.Get(b, a.planetId, "31") + (AGB.Option.Get(b, "technocrat") ? "&technocrat=1" : ""
            );
        OBJ.iterate(AGB.Item.Mining, function (d) {
                        c += STR.addUrlPara(d + "c", AGB.Units.Get(b, a.planetId, d))
                    }
        );
        OBJ.iterate(AGB.Item.Station, function (d) {
                        c += STR.addUrlPara(d + "c", AGB.Units.Get(b, a.planetId, d))
                    }
        );
        OBJ.iterate(AGB.Item.Research, function (a) {
                        c += STR.addUrlPara(a +
                                            "c", AGB.Units.Get(b, "account", a)
                        )
                    }
        );
        a.href = c
    },
    createOcalcAmortisation: function (a) {
        var b, c, d;
        b = AGB.App.getPlayer(a, "copy");
        d = AGB.Option.Get(b, "commander") && AGB.Option.Get(b, "admiral") && AGB.Option.Get(b, "engineer") && AGB.Option.Get(b, "geologist") && AGB.Option.Get(b, "technocrat") ? "1.12" : AGB.Option.Get(b, "geologist") ? "1.1" : "1";
        c = "http://www.o-calc.com/?sec=_amortisation&lang=" + (a.abbrCom || ""
        ).toLowerCase() + "&p=" + AGB.Units.Get(b, "account", "122") + "&g=" + d + "&em=2&ec=1&ed=1&s=" + AGB.Uni.Get(b, "speed") + "&d=";
        OBJ.iterate(a.Planets, function (d) {
                        c += encodeURI(OBJ.get(a.Planets[d], "name")) + "." + ((+OBJ.get(a.Planets[d], "temp") || 0
                                                                               ) + 40
                        ).toString(36) + "." + AGB.Units.Get(b, d, "1").toString(36) + "." + AGB.Units.Get(b, d, "2").toString(36) + "." + AGB.Units.Get(b, d, "3").toString(36) + "+"
                    }
        );
        a.href = c
    },
    createOsimulate: function (a) {
        var b, c, d;
        c = AGB.App.getPlayer(a, "copy");
        b = a.Task;
        d = "http://www.osimulate.com/?ref=antigame&lang=" + AGB.Com.Get(a.abbrCom, "osimulate") + "&uni=" + a.abbrCom + "_" + a.abbrUni + "&uni_speed=" + AGB.Uni.Get(c, "speedFleet") +
            "&fleet_debris=" + 100 * AGB.Uni.Get(c, "debrisFactor") + "&defense_debris=" + (AGB.Uni.Get(c, "defToTF") ? 100 * AGB.Uni.Get(c, "debrisFactorDef") : "0"
        ) + "&rapidfire=" + (AGB.Uni.Get(c, "rapidFire") ? 1 : 0
            ) + "&start_pos=" + (a.coords || ""
            ) + "&engine0_0=" + AGB.Units.Get(c, "account", "115") + "&engine0_1=" + AGB.Units.Get(c, "account", "117") + "&engine0_2=" + AGB.Units.Get(c, "account", "118");
        d = b && !b.timeResearch && AGB.Option.Get(c, "T03") ? d + "&del_techs=1" : d + ("&tech_a0_0=" + AGB.Units.Get(c, "account", "109") + "&tech_a0_1=" + AGB.Units.Get(c, "account",
                                                                                                                                                                            "110"
        ) + "&tech_a0_2=" + AGB.Units.Get(c, "account", "111")
        );
        OBJ.iterate(a.Ships, function (b) {
                        d += STR.addUrlPara("ship_a0_" + ((+b || 0
                                                          ) - 202
                                            ) + "_b", a.Ships[b]
                        )
                    }
        );
        b && (d += "&tech_d0_0=" + (+b["109"] || 0
        ) + "&tech_d0_1=" + (+b["110"] || 0
                   ) + "&tech_d0_2=" + (+b["111"] || 0
                   ) + "&enemy_metal=" + (+b.metal || 0
                   ) + "&enemy_crystal=" + (+b.crystal || 0
                   ) + "&enemy_deut=" + (+b.deuterium || 0
                   ) + "&enemy_name=" + (b.name || ""
                   ) + "&enemy_pos=" + (b.coords || ""
                   ) + "&enemy_type=" + (b.type || ""
                   ) + "&enemy_player=" + (b.detail || ""
                   ) + "&enemy_status=" + (b.status || ""
                   ) + "&report_time=" +
                   (b.time || ""
                   ) + "&plunder_perc=" + (b.plunder || ""
                   ) + STR.addUrlPara("abm_b", b["502"]), OBJ.iterate(AGB.Item.Ship, function (a) {
                                                                          d += STR.addUrlPara("ship_d0_" + ((+a || 0
                                                                                                            ) - 202
                                                                                              ) + "_b", b[a]
                                                                          )
                                                                      }
        ), OBJ.iterate(AGB.Item.Defense, function (a) {
                           1 === AGB.Item.Defense[a] && (d += STR.addUrlPara("ship_d0_" + ((+a || 0
                                                                                           ) - 387
                                                                             ) + "_b", b[a]
                           )
                           )
                       }
        )
        );
        a.href = d
    },
    createWebsim: function (a) {
        var b, c, d;
        c = AGB.App.getPlayer(a, "copy");
        b = a.Task;
        d = "http://websim.speedsim.net/index.php?version=1&ref=antigame&lang=" + AGB.Com.Get(a.abbrCom, "websim") + "&uni=" + a.abbrCom +
            "_" + a.abbrUni + "&uni_speed=" + AGB.Uni.Get(c, "speedFleet") + "&perc-df=" + 100 * AGB.Uni.Get(c, "debrisFactor") + "&def_to_df=" + (AGB.Uni.Get(c, "defToTF") ? 1 : 0
        ) + "&rf=" + (AGB.Uni.Get(c, "rapidFire") ? 1 : 0
            ) + "&start_pos=" + (a.coords || ""
            ) + "&engine0_0=" + AGB.Units.Get(c, "account", "115") + "&engine0_1=" + AGB.Units.Get(c, "account", "117") + "&engine0_2=" + AGB.Units.Get(c, "account", "118");
        d = b && !b.timeResearch && AGB.Option.Get(c, "T03") ? d + "&del_techs=1" : d + ("&tech_a0_0=" + AGB.Units.Get(c, "account", "109") + "&tech_a0_1=" + AGB.Units.Get(c, "account",
                                                                                                                                                                            "110"
        ) + "&tech_a0_2=" + AGB.Units.Get(c, "account", "111")
        );
        OBJ.iterate(a.Ships, function (b) {
                        d += STR.addUrlPara("ship_a0_" + ((+b || 0
                                                          ) - 202
                                            ) + "_b", a.Ships[b]
                        )
                    }
        );
        b && (d += "&tech_d0_0=" + (+b["109"] || 0
        ) + "&tech_d0_1=" + (+b["110"] || 0
                   ) + "&tech_d0_2=" + (+b["111"] || 0
                   ) + "&enemy_metal=" + (+b.metal || 0
                   ) + "&enemy_crystal=" + (+b.crystal || 0
                   ) + "&enemy_deut=" + (+b.deuterium || 0
                   ) + "&enemy_name=" + (b.name || ""
                   ) + "&enemy_pos=" + (b.coords || ""
                   ) + "&enemy_type=" + (b.type || ""
                   ) + "&enemy_player=" + (b.detail || ""
                   ) + "&enemy_status=" + (b.status || ""
                   ) + "&report_time=" +
                   (b.time || ""
                   ) + "&plunder_perc=" + (b.plunder || ""
                   ) + STR.addUrlPara("abm_b", b["502"]), OBJ.iterate(AGB.Item.Ship, function (a) {
                                                                          d += STR.addUrlPara("ship_d0_" + ((+a || 0
                                                                                                            ) - 202
                                                                                              ) + "_b", b[a]
                                                                          )
                                                                      }
        ), OBJ.iterate(AGB.Item.Defense, function (a) {
                           1 === AGB.Item.Defense[a] && (d += STR.addUrlPara("ship_d0_" + ((+a || 0
                                                                                           ) - 387
                                                                             ) + "_b", b[a]
                           )
                           )
                       }
        )
        );
        a.href = d
    },
    createDragosim: function (a) {
        var b, c, d, e;
        c = AGB.App.getPlayer(a, "copy");
        b = a.Task;
        e = {
            202: "k_t",
            203: "g_t",
            204: "l_j",
            205: "s_j",
            206: "kr",
            207: "sc",
            208: "ko",
            209: "re",
            210: "sp",
            211: "bo",
            212: "so",
            213: "z",
            214: "t",
            215: "sk",
            401: "ra",
            402: "l_l",
            403: "s_l",
            404: "g",
            405: "i",
            406: "p",
            407: "k_s",
            408: "g_s"
        };
        d = "http://drago-sim.com/index.php?ref=antigame&lang=" + AGB.Com.Get(a.abbrCom, "dragosim") + "&uni=" + a.abbrCom + "_" + a.abbrUni + "&uni_speed=" + AGB.Uni.Get(c, "speedFleet") + "&debris_ratio=" + AGB.Uni.Get(c, "debrisFactor") + "&def_tf=" + Boolean(AGB.Uni.Get(c, "defToTF")) + "&rapid_fire=" + (AGB.Uni.Get(c, "rapidFire") ? 1 : 0
        );
        d = b && !b.timeResearch && AGB.Option.Get(c, "T03") ? d + "&del_techs=1" : d + ("&techs[0][0][w_t]=" + AGB.Units.Get(c, "account", "109") +
                                                                                         "&techs[0][0][s_t]=" + AGB.Units.Get(c, "account", "110") + "&techs[0][0][r_p]=" + AGB.Units.Get(c, "account", "111")
        );
        OBJ.iterate(a.Ships, function (b) {
                        d += STR.addUrlPara("numunits[0][0][" + e[b] + "]", a.Ships[b])
                    }
        );
        b && (d += "&techs[1][0][w_t]=" + (+b["109"] || 0
        ) + "&techs[1][0][s_t]=" + (+b["110"] || 0
                   ) + "&techs[1][0][r_p]=" + (+b["111"] || 0
                   ) + "&v_met=" + (+b.metal || 0
                   ) + "&v_kris=" + (+b.crystal || 0
                   ) + "&v_deut=" + (+b.deuterium || 0
                   ) + "&v_planet=" + (b.name || ""
                   ) + "&v_coords=" + (b.coords || ""
                   ) + "&enemy_type=" + (b.type || ""
                   ) + "&enemy_player=" + (b.detail ||
                                           ""
                   ) + "&enemy_status=" + (b.status || ""
                   ) + "&report_time=" + (b.time || ""
                   ) + "&plunder_perc=" + (b.plunder || ""
                   ) + STR.addUrlPara("missiles_available_v", b["502"]), OBJ.iterate(AGB.Item.Ship, function (a) {
                                                                                         d += STR.addUrlPara("numunits[1][0][" + e[a] + "]", b[a])
                                                                                     }
        ), OBJ.iterate(AGB.Item.Defense, function (a) {
                           1 === AGB.Item.Defense[a] && (d += STR.addUrlPara("numunits[1][0][" + e[a] + "]", b[a])
                           )
                       }
        )
        );
        a.href = d
    }
};
