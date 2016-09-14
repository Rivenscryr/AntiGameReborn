if (!AGO) {
    var AGO = {};
}
AGO.Notify = {
    status: 0, Problem: [], problem: 0, Run: function () {
        AGO.App.reload || (AGO.App.upgradeAvailable && AGO.Notify.set("Problem", 4), AGO.Events.included || AGO.Notify.set("Problem", 6), 1 !== AGO.Uni.status && AGO.Notify.set("Problem", 11), 1 !== AGO.Units.Data.status && AGO.Notify.set("Problem", 12), 1 !== AGO.Label.Data.status && AGO.Notify.set("Problem", 13), 1 !== AGO.App.storage && AGO.Notify.set("Problem", 15), 1 !== AGO.Option.Data.status && AGO.Notify.set("Problem", 17), AGO.App.twice && AGO.Notify.set("Problem", 18)
        )
    }, set: function (a,
                      b, c
    ) {
        var d, e;
        if ("Problem" === a) {
            AGO.Notify.problem = 0;
            b = 4 === b && AGO.Option.is("S44") || 5 === b && AGO.Option.is("S45") || 6 === b && (AGO.Option.is("S46") || !AGO.Option.is("E30")
            ) || 8 === b && AGO.Option.is("S48") ? 0 : b;
            0 < b ? AGO.Notify.Problem[b] = b : 0 > b && (AGO.Notify.Problem[Math.abs(b)] = 0
            );
            for (b = 0; b < AGO.Notify.Problem.length; b++) {
                AGO.Notify.Problem[b] > AGO.Notify.problem && (AGO.Notify.problem = b
                );
            }
            b = 0
        }
        5 < AGO.Init.status && ("Hide" === a && (AGO.Notify.loading = !1
        ), 3 === b && (AGO.Notify.loading = !0
        ), e = HTML.colorStatusData(b), 3 !== b && (AGO.Notify.color =
                                                    20 <= AGO.Notify.problem ? "#FF0000" : 10 < AGO.Notify.problem ? "#FF4B00" : AGO.Notify.loading ? "#FF4B00" : 5 <= AGO.Notify.problem ? "#FF9600" : 4 <= AGO.Notify.problem ? "#FFB500" : AGO.Notify.problem ? "#00B000" : "", AGO.Main.updateButton()
        ), "Notify" === a ? (NMR.isMinMax(AGO.Notify.problem, 1, 19) && (d = AGO.Label.is("S" + (AGO.Notify.problem + 60
                                                                                          )
        )
        ), e = AGO.Notify.color
        ) : d = AGO.Label.is(a), 5 < AGO.Init.status && d && AGO.Main.updateInfo(a, d + (c || ""
                                                                                 ), e
        )
        )
    }
};
AGO.Option = {
    Data: {}, Start: function () {
        3 <= AGO.App.mode && (AGO.Option.Data = AGO.Data.getStorage(AGO.App.keyPlayer + "_Option", "JSON")
        )
    }, Init: function (a) {
        AGO.Option.Data = OBJ.is(a) ? a : {};
        AGO.Init.mobile = AGO.Option.is("U51") && (AGO.isMobile || 1 < AGO.Option.get("U51", 2)
        );
        AGO.Init.touch = AGO.Option.is("U52") && (AGO.isMobile || AGO.Init.mobile || 1 < AGO.Option.get("U52", 2)
        );
        AGO.App.reload && AGO.Option.Save()
    }, Save: function () {
        AGO.Data.setStorage(AGO.App.keyPlayer + "_Option", {
                                O04: AGO.Option.is("O04"), U31: AGO.Option.is("U31"),
                                U32: AGO.Option.isAnd("U31", "U32")
                            }
        )
    }, set: function (a, b, c) {
        a && (b = 6 <= c ? STR.check(b) : 1 === c ? b ? 1 : 0 : +b || 0, AGO.Option.Data[a] = b, AGB.message("Option", "Set", {
                                                                                                                 id: a,
                                                                                                                 value: b
                                                                                                             }, function (a) {
                                                                                                                 a && (AGO.Option.Data[a.id] = a.value
                                                                                                                 )
                                                                                                             }
        )
        )
    }, get: function (a, b) {
        return b ? 2 === b ? +AGO.Option.Data[a] || 0 : 1 === b ? Boolean(AGO.Option.Data[a]) : a in AGO.Option.Data ? "string" === typeof AGO.Option.Data[a] ? AGO.Option.Data[a] : STR.check(AGO.Option.Data[a]) : "" : a in AGO.Option.Data ? AGO.Option.Data[a] : ""
    }, is: function (a) {
        return Boolean(AGO.Option.Data[a])
    },
    isAnd: function (a, b) {
        return Boolean(AGO.Option.Data[a] && AGO.Option.Data[b])
    }, getPair: function (a) {
        a = STR.check(AGO.Option.Data[a]).split("|", 2);
        return 2 === a.length ? a : ""
    }, Menu: function () {
        document.getElementById("ago_menu") || AGB.message("App", "Script", {scripts: ["menu"]})
    }
};
AGO.Label = {
    Data: {}, Init: function (a) {
        AGO.Label.Data = OBJ.is(a) ? a : {}
    }, Update: function () {
        var a;
        AGO.App.OgameMain && (a = {
            localization: AGO.Global.message({
                                                 role: "getProperty",
                                                 property: "LocalizationStrings"
                                             }
            ), production: OBJ.parse(AGO.Init.Script("production"))
        }, AGB.message("Label", "Update", {data: a})
        )
    }, get: function (a, b) {
        return a ? (b && (a = (2 === b ? "K" : "L"
                              ) + (AGO.Item.ResourceEnergy[a] ? AGO.Item.ResourceEnergy[a] : 1 === a.length ? "00" + a : 2 === a.length ? "0" + a : a
                              )
        ), a in AGO.Label.Data ? (AGO.Label.Data[a] || ""
        ).replace(/&amp;/g,
                  "&"
        ) : a
        ) : ""
    }, is: function (a) {
        return a in AGO.Label.Data ? (AGO.Label.Data[a] || ""
        ).replace(/&amp;/g, "&") : ""
    }
};
AGO.Styles = {
    status: 0,
    Data: null,
    opacity: 33,
    colorStatusData: "#FF0000 #FF0000  #008000 #FFB500 #FF4B00 #00B000".split(" "),
    classStatusData: "ago_color_red ago_color_red  ago_color_green ago_color_lightorange ago_color_darkorange ago_color_lightgreen".split(" "),
    classType: ["", "ago_color_planet", "ago_color_debris", "ago_color_moon"],
    classVisible: "ago_visible_hide ago_visible_hide ago_visible_weakest ago_visible_weaker ago_visible_weak ago_visible_middle ago_visible_strong ago_visible_stronger ago_visible_strongest ago_visible_show".split(" "),
    classFleet: " ago_color_hostile ago_color_neutral ago_color_own ago_color_reverse ago_color_friend ago_color_enemy".split(" "),
    Start: function () {
        function a(a) {
            return a ? '@import url("' + AGO.App.pathSkin + "ago/" + a + '.css' + (AGO.App.beta ? '?' + (new Date()).getTime() : '') + '");' : ""
        }

        var b, c, d = [];
        3 <= AGO.App.mode && AGO.App.keyPlayer && (document.documentElement.style.overflowY = "scroll", c = AGO.Data.getStorage(AGO.App.keyPlayer + "_Styles", "JSON"), "Color"in c && (AGO.Styles.status = 1, AGO.Styles.Data = c, OBJ.is(c.colorType) && (AGO.Styles.colorType = c.colorType
        ), OBJ.is(c.Page) || (c.Page = {}
        ), b = AGO.App.page, OBJ.is(c[b]) && ("file"in c[b] && (c.Page.file = c[b].file
        ), "improve"in c[b] && (c.Page.improve = c[b].improve
        ),
        "events"in c[b] && (c.Page.events = c[b].events
        )
        ), c.Events && (AGO.Events.modeBehavior = +c.Page.events || 0, AGO.Events.modeBehaviorAbove = VAL.check(AGO.Events.modeBehavior, 1, 2, 5, 6), AGO.Events.modeBehavior && (AGO.Events.modeBehaviorAbove ? d.push("#eventboxContent:not(:first-child){display:none;}") : d.push("#eventboxContent:first-child{display:none;}"), 5 > AGO.Events.modeBehavior && d.push("#eventboxContent, #eventboxContent #eventListWrap{ display: none; }")
        )
        ), c.Styles = d.join(""), b = document.createDocumentFragment(),
            DOM.append(b, "style", {
                           type: "text/css",
                           media: "screen"
                       }
            ).textContent = a(c.Main) + a(c.Planets) + a(c.Events) + a(c.Page.file) + a(c.Mobile) + (c.Skin || ""
            ) + (c.Color || ""
                            ), AGO.isFirefox && document.head && 3 > AGO.App.beta ? DOM.appendChild(document.head, b) : DOM.prependChild(document.documentElement, b), window.setTimeout(AGO.Styles.preload, 5)
        )
        )
    },
    Init: function () {
        var a;
        a = document.createDocumentFragment();
        AGO.Styles.Sheet = DOM.append(a, "style", {type: "text/css", media: "screen"});
        AGO.App.Ogame && OBJ.is(AGO.Styles.Data) && (OBJ.get(AGO.Styles.Data.Page,
                                                             "improve"
        ) && ("overview" === AGO.App.page && 1 !== AGO.Acc.type || DOM.extendClass(document.body, null, "ago_improve")
                                                     ), AGO.Styles.set(AGO.Styles.Data.Styles)
        );
        document.head.appendChild(a)
    },
    Load: function (a) {
        AGO.App.Ogame && (1 !== AGO.Styles.status || AGO.App.reload || a
        ) && (AGB.Log("Update   - Styles   :", !0), AGB.message("Styles", "Init", {mobile: AGO.App.OgameMobile}, function (a) {
                                                                    AGO.Data.setStorage(AGO.App.keyPlayer + "_Styles", a);
                                                                    1 !== AGO.Styles.status && (AGO.Styles.Start(), AGO.Styles.Init()
                                                                    )
                                                                }
        )
        )
    },
    set: function (a) {
        STR.check(a) &&
        AGO.Styles.Sheet && AGO.Styles.Sheet.appendChild(document.createTextNode(a))
    },
    preload: function () {
        var a, b;
        a = ["menu_logo.png"];
        for (b = 0; b < a.length; b++) {
            (new window.Image
            ).src = HTML.urlImage(a[b]);
        }
        if (VAL.check(AGO.App.page, "fleet1", "fleet2")) {
            a = ["0", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 13, 15];
            for (b = 0; b < a.length; b++) {
                (new window.Image
                ).src = HTML.urlImage("task/mission-" + a[b] + ".gif");
            }
            a = "0a 0b 1a 1b 1c 2a 2b 3a 3b 3c".split(" ");
            for (b = 0; b < a.length; b++) {
                (new window.Image
                ).src = HTML.urlImage("task/type-" + a[b] + ".gif")
            }
        } else {
            "fleet3" ===
            AGO.App.page && ((new window.Image
                             ).src = HTML.urlImage("fleet3_send_green.gif"), (new window.Image
                                                                             ).src = HTML.urlImage("fleet3_send_orange.gif")
            ), (new window.Image
               ).src = HTML.urlImage("task/type-3a.gif")
        }
    }
};
AGO.Item = {
    1: {metal: 60, crystal: 15, deuterium: 0, factor: 1.5},
    2: {metal: 48, crystal: 24, deuterium: 0, factor: 1.6},
    3: {metal: 225, crystal: 75, deuterium: 0, factor: 1.5},
    4: {metal: 75, crystal: 30, deuterium: 0, factor: 1.5},
    12: {metal: 900, crystal: 360, deuterium: 180, factor: 1.8},
    14: {metal: 400, crystal: 120, deuterium: 200, factor: 2},
    15: {metal: 1E6, crystal: 5E5, deuterium: 1E5, factor: 2},
    21: {metal: 400, crystal: 200, deuterium: 100, factor: 2},
    22: {metal: 1E3, crystal: 0, deuterium: 0, factor: 2},
    23: {metal: 1E3, crystal: 500, deuterium: 0, factor: 2},
    24: {
        metal: 1E3,
        crystal: 1E3, deuterium: 0, factor: 2
    },
    25: {metal: 2645, crystal: 0, deuterium: 0, factor: 2.3},
    26: {metal: 2645, crystal: 1322, deuterium: 0, factor: 2.3},
    27: {metal: 2645, crystal: 2645, deuterium: 0, factor: 2.3},
    31: {metal: 200, crystal: 400, deuterium: 200, factor: 2},
    33: {metal: 0, crystal: 5E4, deuterium: 1E5, factor: 2},
    34: {metal: 2E4, crystal: 4E4, deuterium: 0, factor: 2},
    36: {metal: 200, crystal: 0, deuterium: 50, factor: 5},
    41: {metal: 2E4, crystal: 4E4, deuterium: 2E4, factor: 2},
    42: {metal: 2E4, crystal: 4E4, deuterium: 2E4, factor: 2},
    43: {metal: 2E6, crystal: 4E6, deuterium: 2E6, factor: 2},
    44: {
        metal: 2E4, crystal: 2E4,
        deuterium: 1E3, factor: 2
    },
    106: {metal: 200, crystal: 1E3, deuterium: 200, factor: 2},
    108: {metal: 0, crystal: 400, deuterium: 600, factor: 2},
    109: {metal: 800, crystal: 200, deuterium: 0, factor: 2},
    110: {metal: 200, crystal: 600, deuterium: 0, factor: 2},
    111: {metal: 1E3, crystal: 0, deuterium: 0, factor: 2},
    113: {metal: 0, crystal: 800, deuterium: 400, factor: 2},
    114: {metal: 0, crystal: 4E3, deuterium: 2E3, factor: 2},
    115: {metal: 400, crystal: 0, deuterium: 600, factor: 2},
    117: {metal: 2E3, crystal: 4E3, deuterium: 600, factor: 2},
    118: {
        metal: 1E4, crystal: 2E4, deuterium: 6E3,
        factor: 2
    },
    120: {metal: 200, crystal: 100, deuterium: 0, factor: 2},
    121: {metal: 1E3, crystal: 300, deuterium: 100, factor: 2},
    122: {metal: 2E3, crystal: 4E3, deuterium: 1E3, factor: 2},
    123: {metal: 24E4, crystal: 4E5, deuterium: 16E4, factor: 2},
    124: {metal: 4E3, crystal: 8E3, deuterium: 4E3, factor: 1.75},
    199: {metal: 0, crystal: 0, deuterium: 0, factor: 3},
    202: {
        metal: 2E3,
        crystal: 2E3,
        deuterium: 0,
        retreat: 1E3,
        drive: "115",
        speed: 5E3,
        capacity: 5E3,
        consumption: 10
    },
    203: {
        metal: 6E3, crystal: 6E3, deuterium: 0, retreat: 3E3, drive: "115", speed: 7500, capacity: 25E3,
        consumption: 50
    },
    204: {
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
        metal: 1E4, crystal: 2E4, deuterium: 1E4, retreat: 1E4, drive: "117", speed: 2500,
        capacity: 7500, consumption: 1E3
    },
    209: {
        metal: 1E4,
        crystal: 6E3,
        deuterium: 2E3,
        retreat: 4500,
        drive: "115",
        speed: 2E3,
        capacity: 2E4,
        consumption: 300
    },
    210: {metal: 0, crystal: 1E3, deuterium: 0, retreat: 0, drive: "115", speed: 1E8, capacity: 0, consumption: 1},
    211: {
        metal: 5E4,
        crystal: 25E3,
        deuterium: 15E3,
        retreat: 9E4,
        drive: "117",
        speed: 4E3,
        capacity: 500,
        consumption: 1E3
    },
    212: {metal: 0, crystal: 2E3, deuterium: 500, retreat: 0, drive: 0, speed: 0, capacity: 0, consumption: 0},
    213: {
        metal: 6E4, crystal: 5E4, deuterium: 15E3, retreat: 125E3, drive: "118", speed: 5E3,
        capacity: 2E3, consumption: 1E3
    },
    214: {
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
        metal: 3E4,
        crystal: 4E4,
        deuterium: 15E3,
        retreat: 85E3,
        drive: "118",
        speed: 1E4,
        capacity: 750,
        consumption: 250
    },
    401: {metal: 2E3, crystal: 0, deuterium: 0, retreat: 2E3},
    402: {metal: 1500, crystal: 500, deuterium: 0, retreat: 2E3},
    403: {metal: 6E3, crystal: 2E3, deuterium: 0, retreat: 8E3},
    404: {metal: 2E4, crystal: 15E3, deuterium: 2E3, retreat: 37E3},
    405: {metal: 2E3, crystal: 6E3, deuterium: 0, retreat: 8E3},
    406: {metal: 5E4, crystal: 5E4, deuterium: 3E4, retreat: 13E4},
    407: {metal: 1E4, crystal: 1E4, deuterium: 0, retreat: 2E4},
    408: {metal: 5E4, crystal: 5E4, deuterium: 0, retreat: 1E5},
    502: {metal: 8E3, crystal: 0, deuterium: 2E3, retreat: 0},
    503: {metal: 12500, crystal: 2500, deuterium: 1E4, retreat: 0},
    Mining: {1: 1, 2: 1, 3: 1, 4: 1, 12: 1, 22: 1, 23: 1, 24: 1, 25: 1, 26: 1, 27: 1, 212: 1},
    Station: {14: 1, 15: 1, 21: 1, 31: 1, 33: 1, 34: 1, 36: 1, 41: 1, 42: 1, 43: 1, 44: 1},
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
    ShipCivil: {
        202: 1, 203: 1,
        208: 1, 209: 1, 210: 1
    },
    ShipCombat: {204: 2, 205: 2, 206: 2, 207: 2, 215: 2, 211: 2, 213: 2, 214: 2},
    ShipTransport: {203: 1, 202: 1, 209: 1, 214: 1},
    Defense: {401: 1, 402: 1, 403: 1, 404: 1, 405: 1, 406: 1, 407: 1, 408: 1, 502: 2, 503: 2},
    Resource: {metal: "091", crystal: "092", deuterium: "093"},
    ResourceEnergy: {metal: "091", crystal: "092", deuterium: "093", energy: "094"},
    Coordinates: {galaxy: 1, system: 1, position: 1},
    CoordinatesType: {galaxy: 1, system: 1, position: 1, type: 1},
    Type: {1: "planet", 2: "debris", 3: "moon"},
    Research: {
        106: 8, 108: 10, 109: 3, 110: 6, 111: 2, 113: 12, 114: -8,
        115: 6, 117: 6, 118: 8, 120: -12, 121: 5, 122: 7, 123: 0, 124: 8, 199: -1
    },
    ByName: {},
    Mission: {M15: 0, M07: 0, M08: 0, M03: 0, M04: 0, M06: 0, M05: 0, M01: 0, M02: 0, M09: 0},
    Init: function (a) {
        AGO.Item.ByName = a || {}
    },
    getByName: function (a) {
        return a ? AGO.Item.ByName[a] || "" : ""
    },
    check: function (a, b, c) {
        return (a = STR.check(a)
               ) && b && a in b ? a : STR.check(c)
    },
    valid: function (a) {
        return 1 <= +a && 503 >= +a && a in AGO.Item ? a : ""
    },
    create: function (a) {
        var b, c = {};
        "string" === typeof a && (a = [a]
        );
        for (b = 0; b < a.length; b++) {
            AGO.Item[a[b]] && OBJ.iterate(AGO.Item[a[b]], function (a) {
                                              c[a] =
                                              0
                                          }
            );
        }
        return c
    }
};
AGO.Ogame = {
    getFleetDistance: function (a, b) {
        var c;
        if (OBJ.is(a) && OBJ.is(b)) {
            if (c = Math.abs(a.galaxy - b.galaxy)) {
                if (AGO.Uni.donutGalaxy)
                    c > Math.floor(AGO.Uni.galaxies / 2) ? c = Math.abs(c - AGO.Uni.galaxies) : '';
                return 2E4 * c;
            }
            if (c = Math.abs(a.system - b.system)) {
                if (AGO.Uni.donutSystem)
                    c > Math.floor(AGO.Uni.systems / 2) ? c = Math.abs(c - AGO.Uni.systems) : '';
                return 95 * c + 2700;
            }
            if (c = Math.abs(a.position - b.position)) {
                return 5 * c + 1E3
            }
        }
        return 5
    }, getFleetDuration: function (a, b, c) {
        return a in AGO.Item.Ship && b ? Math.round((35E3 / (c || 10
                                                    ) * Math.sqrt(10 * b / AGO.Ogame.getShipSpeed(a)) + 10
                                                    ) / (+AGO.Uni.speedFleet || 1
                                                    )
        ) : 0
    }, getShipConsumption: function (a, b, c) {
        return a in AGO.Item.Ship && AGO.Item[a].consumption && b && c ? (c = 35E3 / (c * AGO.Uni.speedFleet -
                                                                                      10
        ) * Math.sqrt(10 * b / AGO.Ogame.getShipSpeed(a)), AGO.Item[a].consumption * b / 35E3 * (c / 10 + 1
        ) * (c / 10 + 1
                                                           )
        ) : 0
    }, getShipCapacity: function (a, b) {
        return AGO.Item[a].capacity;
    }, getShipSpeed: function (a) {
        AGO.Ogame.initShipSpeed && (AGO.Ogame.initShipSpeed(), AGO.Ogame.initShipSpeed = null
        );
        return AGO.Item[a].speed
    }, initShipSpeed: function () {
        var a = 5070900 <= NMR.parseVersion(AGO.App.versionOGame);
        OBJ.iterate(AGO.Item.Ship, function (b) {
                        var c,
                            d, e, f;
                        "202" === b && 5 <= AGO.Units.get("117") ? (c = 1E4, d = "117", f = 20
                        ) : "209" === b && 15 <= AGO.Units.get("118") ? a && (c = 6E3, d = "118", f = 900
                        ) : "209" === b && 17 <= AGO.Units.get("117") ? a && (c = 4E3, d = "117", f = 600
                        ) : "211" === b && 8 <= AGO.Units.get("118") ? (c = 5E3, d = "118", f = 1000
                        ) : (c = AGO.Item[b].speed, d = AGO.Item[b].drive, f = AGO.Item[b].consumption
                            );
                        d && (e = "115" === d ? .1 : "117" === d ? .2 : .3, AGO.Item[b].speed = Math.floor(c * (10 + AGO.Units.get(d) * e * 10) / 10), AGO.Item[b].consumption = f)
                    }
        )
    }, getDebris: function (a, b) {
        var c, d, e, f, g;
		var h = {}
		OBJ.copy(a, h);
        c = {metal: 0, crystal: 0};
        if (OBJ.is(h)) {
            for (e in b = b && AGO.Uni.defToTF, d = AGO.Uni.debrisFactor || .3, f = AGO.Uni.debrisFactorDef || .3, g = AGO.Uni.repairFactor || .7, h) {
                h[e] && (AGO.Item.Ship[e] ||
                         (b && 1 === AGO.Item.Defense[e] && (d = f) && (h[e] = h[e] * (1-g)))
                ) && (c.metal += Math.floor(h[e] * Math.floor(AGO.Item[e].metal * d)), c.crystal += Math.floor(h[e] * Math.floor(AGO.Item[e].crystal * d))
                );
            }
        }
        c.total = c.metal + c.crystal;
        c.recs = Math.ceil(c.total / 2E4);
        c.enough = 0 < c.total && c.total >= 1E3 * AGO.Option.get("M37", 2);
        return c
    }, chooseTopscore: function (a, b, c, d, e, f, g, k) {
        var h = Math.max(AGO.Uni.topScore, AGO.Option.get("S29", 2));
        return 1E5 > h ? a : 1E6 > h ? b : 5E6 > h ? c : 25E6 > h ? d : 5E7 > h ? e : 75E6 > h ? f : 1E8 > h ? g : k
    }, getConsumptionDeuterium: function (a, b) {
        var c;
        c = "12" === a ? 10 * b * Math.pow(1.1, b) : 0;
        return Math.floor(c) *
               AGO.Uni.speed
    }, getConsumptionEnergy: function (a, b) {
        var c;
        "1" === a ? Math.pow(1.1, b) : "2" === a ? Math.pow(1.1, b) : "3" === a && Math.pow(1.1, b);
        return (c = "1" === a || "2" === a ? 10 : "3" === a ? 20 : 0
               ) && 0 <= b ? Math.floor(c * b * Math.pow(1.1, b)) : 0
    }, getProductionEnergy: function (a, b) {
        var c, d;
        c = "4" === a ? 20 * b * Math.pow(1.1, b) : "12" === a ? 30 * b * Math.pow(1.05 + .01 * AGO.Units.get("113"), b) : "212" === a ? Math.round(Math.floor((AGO.Planets.Get("active", "temp") + 40 + 140
                                                                                                                                                    ) / 6
        ) * b) : 0;
        AGO.Option.is("comstaff") ? d = 1.12 : AGO.Option.is("engineer") ? d = 1.1 : d = 1;
        return Math.round(d * c)
    }, getProductionResources: function (a,
                                         b
    ) {
        var c, d;
        c = "1" === a ? 30 * b * Math.pow(1.1, b) : "2" === a ? 20 * b * Math.pow(1.1, b) : "3" === a ? 10 * b * Math.pow(1.1, b) * (1.28 - .004 * AGO.Planets.Get("active", "temp")
        ) : 0;
        AGO.Option.is("comstaff") ? d = 1.12 : AGO.Option.is("geologist") ? d = 1.1 : d = 1;
        return Math.floor(d * c) * AGO.Uni.speed
    }, getStandardUnitsCache: null,
    getStandardUnits: function (a, b) {
        if (!AGO.Task.getStandardUnitsCache) {
            var c = AGO.Option.get("B32", 6).split(":");
            AGO.Task.getStandardUnitsCache = {
                metal: NMR.minMax((+c[0] || 2), 1, 5),
                crystal: NMR.minMax((+c[1] || 1), 1, 5),
                deuterium: NMR.minMax((+c[2] || 1), 1, 5)
            }
        }

        if (OBJ.is(a)) {
            switch (b) {
                case 1:
                    // crystal standard units
                    return Math.ceil((+a.metal || 0) * AGO.Task.getStandardUnitsCache.crystal / AGO.Task.getStandardUnitsCache.metal)
                        + (+a.crystal || 0)
                        + Math.ceil((+a.deuterium || 0) * AGO.Task.getStandardUnitsCache.crystal / AGO.Task.getStandardUnitsCache.deuterium);
                case 2:
                    // deuterium standard units
                    return Math.ceil((+a.metal || 0) * AGO.Task.getStandardUnitsCache.deuterium / AGO.Task.getStandardUnitsCache.metal)
                        + Math.ceil((+a.crystal || 0) * AGO.Task.getStandardUnitsCache.deuterium / AGO.Task.getStandardUnitsCache.crystal)
                        + (+a.deuterium || 0);
                default:
                    // metal standard units
                    return (+a.metal || 0)
                        + Math.ceil((+a.crystal || 0) * AGO.Task.getStandardUnitsCache.metal / AGO.Task.getStandardUnitsCache.crystal)
                        + Math.ceil((+a.deuterium || 0) * AGO.Task.getStandardUnitsCache.metal / AGO.Task.getStandardUnitsCache.deuterium);
            }
        }

        return 0;
    }, getAmortisation: function (a, b, c) {
        return OBJ.is(b) && 0 < c && (a = AGO.Ogame.getStandardUnits(b, +a - 1), 0 < a
        ) ? Math.floor(a / c * 3600) : 0
    }, getStorageCapacity: function (a) {
        return 5E3 * Math.floor(2.5 * Math.pow(Math.E, 20 * a / 33))
    }, getPlayerHonor: function (a) {
        if (a && 6 < a.length) {
            if (-1 <
                a.indexOf("rank_starlord1")) {
                return 1;
            }
            if (-1 < a.indexOf("rank_starlord2")) {
                return 2;
            }
            if (-1 < a.indexOf("rank_starlord3")) {
                return 3;
            }
            if (-1 < a.indexOf("rank_bandit1")) {
                return 5;
            }
            if (-1 < a.indexOf("rank_bandit2")) {
                return 6;
            }
            if (-1 < a.indexOf("rank_bandit3")) {
                return 7
            }
        }
        return 0
    }, getHonorClass: function (a) {
        return a ? " rank_starlord1 rank_starlord2 rank_starlord3  rank_bandit1 rank_bandit2 rank_bandit3".split(" ")[a] : ""
    }
};
AGO.Units = {
    status: 0, Data: {}, Init: function (a) {
        AGO.Units.Data = a || {}
    }, Read: function () {
        OBJ.iterate(AGO.Item.ResourceEnergy, function (a) {
                        AGO.Units.Data[a] = AGO.Units.Data[a + "Start"] = DOM.getText("resources_" + a, "id", 2)
                    }
        );
        AGO.Units.Data.resources = AGO.Units.Data.metal + AGO.Units.Data.crystal + AGO.Units.Data.deuterium
    }, Run: function () {
        AGB.message("Units", "Update", {planet: AGO.Acc.planetId, data: AGO.Units.Data}, function () {
                        AGO.Units.status = 1
                    }
        )
    }, Timer: function () {
        OBJ.iterate(AGO.Item.Resource, function (a) {
                        AGO.Units.Data[a] =
                        DOM.getText("resources_" + a, "id", 2)
                    }
        );
        AGO.Units.Data.resources = AGO.Units.Data.metal + AGO.Units.Data.crystal + AGO.Units.Data.deuterium
    }, Update: function (a) {
        var b;
        b = new XMLHttpRequest;
        b.open("GET", AGO.Uni.url + "/game/index.php?page=fetchTechs&ajax=1", !0);
        b.setRequestHeader("Cache-Control", "no-cache");
        b.setRequestHeader("Pragma", "no-cache");
        b.overrideMimeType("text/html");
        b.onerror = b.onload = function () {
            var c, d;
            AGO.Init.status && (d = -1, 200 === +b.status && STR.check(b.responseText)[0] === String.fromCharCode(123) &&
                                        (d = 4, c = {
                                            planet: "account",
                                            tabs: ["Research"],
                                            data: OBJ.parse(b.responseText)
                                        }, AGB.message("Units", "Action", {
                                                           planets: AGO.Planets.ByCoordstype,
                                                           list: [c]
                                                       }
                                        )
                                        ), AGB.Log("Update   - Units    : Research " + (-1 === d ? " failed !" : ""
                                                   )
            ), a && a(d)
            )
        };
        b.send(null)
    }, get: function (a) {
        return +AGO.Units.Data[a] || 0
    }, set: function (a, b) {
        a && (AGO.Units.Data[a] = +b || 0
        )
    }, activeResources: function (a) {
        OBJ.is(a) && (OBJ.iterate(AGO.Item.Resource, function (b) {
                                      a[b] = +AGO.Units.Data[b] || 0
                                  }
        ), a.resources = AGO.Units.Data.resources
        )
    }, activeProduction: function () {
        var a;
        a = OBJ.parse(AGO.Init.Script("production"));
        OBJ.iterate(AGO.Item.ResourceEnergy, function (b) {
                        a[b] && OBJ.is(a[b].resources) && (AGO.Units.Data[b + "Storage"] = +a[b].resources.max || 0, AGO.Units.Data[b + "Production"] = +a[b].resources.production || 0
                        )
                    }
        )
    }
};
AGO.Time = {
    status: 0,
    serverTime: 0,
    ogameTime: 0,
    timeZoneDelta: 0,
    localTime: Date.now(),
    localTimeDelta: 0,
    localTimeRun: 0,
    duration: 0,
    durationRun: 0,
    Read: function () {
        var a;
        AGO.Time.serverTime = (new Date
        ).setTime(1E3 * AGO.Acc.timestamp);
        AGO.Time.localTimeDelta = AGO.Time.localTime - AGO.Time.serverTime;
        AGO.Time.localTimeDeltaAverage = AGO.Time.localTimeDelta;
        AGO.Time.localTimeRun = Date.now();
        AGO.Time.pageDeltaRun = AGO.Time.localTimeRun - AGO.Time.localTime;
        (a = AGO.App.login ? 0 : AGO.Option.get("delta", 2)
        ) && 1200 > Math.abs(AGO.Time.localTimeDeltaAverage -
                             a
        ) && (AGO.Time.localTimeDeltaAverage = Math.floor((9 * a + AGO.Time.localTimeDeltaAverage
                                                          ) / 10
        )
        );
        AGO.Option.set("delta", AGO.Time.localTimeDeltaAverage);
        if (a = (a = document.getElementById("bar")
                ) ? a.querySelector(".OGameClock") : null) {
            AGO.Time.status = 1, AGO.Time.ogameTime = AGO.Time.parse(a.textContent).getTime(), AGO.Time.timeZoneDelta = -(1E4 * Math.round((AGO.Time.ogameTime - AGO.Time.serverTime
                                                                                                                                           ) / 1E4
            )
            )
        }
    },
    Run: function () {
        var a, b, c, d, e;
        if (b = (a = document.getElementById("bar")
                ) ? a.querySelector(".OGameClock") : null) {
            if (AGO.Option.is("A31") &&
                AGO.Time.timeZoneDelta && (AGO.Time.status = 2, b.innerHTML = AGO.Time.format(AGO.Time.ogameTime, "[d].[m].[Y] <span>[H]:[i]:[s]</span>"), AGO.Option.is("A32") && (AGO.Time.status = 3, d = AGO.Time.format(AGO.Time.ogameTime, "[d].[m].[Y] [H]:[i]:[s]", !0)
                ), b.title = AGO.Label.get("A38"), DOM.addClass(b, null, "tooltip"), c = document.createElement("li"), c.setAttribute("style", "float: right; color: #848484; font-weight: 700;"), c.textContent = b.title[0], DOM.after(b, c)
                ), AGO.Option.is("A34") && (e = (0 < AGO.Time.localTimeDelta ? " (+" :
                                                 " (-"
                                                ) + Math.floor(Math.abs(AGO.Time.localTimeDelta) / 100) / 10 + (AGO.Label.is("KD0S") || "s"
                                                ) + ")  " + AGO.Time.format(AGO.Time.ogameTime, "[H]:[i]:[s]")
                ), d || e) {
                b = document.createElement("div"), b.className = "ago_clock", e && (c = b.appendChild(document.createElement("span")), c.textContent = e
                ), d && (c = b.appendChild(document.createElement("span")), c.id = "ago_clock_server", c.className = "tooltip", c.title = AGO.Label.get("A39"), c.textContent = d
                ), DOM.appendChild(a, b)
            }
        }
    },
    Display: function () {
        var a;
        a = Date.now();
        AGO.Time.duration = a - AGO.Time.localTime;
        AGO.Time.durationRun = AGO.Time.duration - AGO.Time.pageDeltaRun;
        3 === AGO.Time.status && (a = a - AGO.Time.localTimeDelta - AGO.Time.timeZoneDelta, DOM.setText("ago_clock_server", "id", AGO.Time.format(a, "[d].[m].[Y] [H]:[i]:[s]", !0))
        )
    },
    timestamp: function () {
        return Math.floor(Date.now() / 1E3)
    },
    timestampMinute: function () {
        return Math.floor((Date.now() - 1381E9
                          ) / 6E4
        )
    },
    getFinishTime: function (a) {
        return (new Date
        ).setTime(AGO.Time.ogameTime + AGO.Time.duration + 1E3 * (+a || 0
                  )
        )
    },
    format: function (a, b, c) {
        function d(a) {
            return 0 > a || 9 <
                            a ? a : "0" + a
        }

        return a ? (!OBJ.is(a) && 500 < a && (a = new Date(a)
        ), 1 < AGO.Time.status && !c && a.setTime(a.getTime() + AGO.Time.timeZoneDelta), b || (b = new Date, b = b.getFullYear() !== a.getFullYear() ? "[d].[m].[Y] [H]:[i]:[s]" : b.getMonth() !== a.getMonth() || b.getDate() !== a.getDate() ? "[d].[m] [H]:[i]:[s]" : "[H]:[i]:[s]"
        ), b.split("[d]").join(d(a.getDate())).split("[m]").join(d(a.getMonth() + 1)).split("[Y]").join(a.getFullYear()).split("[y]").join(a.getFullYear().toString().substr(2, 4)).split("[H]").join(d(a.getHours())).split("[i]").join(d(a.getMinutes())).split("[s]").join(d(a.getSeconds()))
        ) :
               ""
    },
    formatTimestamp: function (a, b) {
        return 1E6 < a ? AGO.Time.format(1E3 * a, b || "[d].[m].[Y] [H]:[i]:[s]", !0) : ""
    },
    formatTime: function (a, b) {
        var c, d, e, f, g, k, h;
        h = a;
        b && (d = Math.floor(h / 86400 / 365), h -= 31536E3 * d, e = Math.floor(h / 86400 / 7), h -= 604800 * e, f = Math.floor(h / 86400), h -= 86400 * f
        );
        g = Math.floor(h / 3600);
        h -= 3600 * g;
        k = Math.floor(h / 60);
        h -= 60 * k;
        return b ? (AGO.Time.formatTimeCacheCreate(), c = [], d && c.push(d + AGO.Time.formatTimeCache.years), e && c.push(e + AGO.Time.formatTimeCache.weeks), f && c.push(f + AGO.Time.formatTimeCache.days),
        g && 3 > c.length && c.push(g + AGO.Time.formatTimeCache.hours), k && 3 > c.length && c.push(k + AGO.Time.formatTimeCache.minutes), h && 3 > c.length && c.push(h + AGO.Time.formatTimeCache.seconds), c.join(" ")
        ) : (0 > g || 9 < g ? g : "0" + g
            ) + ":" + (0 > k || 9 < k ? k : "0" + k
            ) + ":" + (0 > h || 9 < h ? h : "0" + h
            )
    },
    parseFormatedTime: function (a) {
        var b = 0, c, d, e;
        if (a) {
            for (AGO.Time.formatTimeCacheCreate(), a = a.trim().split(" ").reverse(), e = 0; e < a.length; e++) {
                d = NMR.parseIntAbs(a[e]), c = (a[e] || ""
                ).replace(/\d/g, "").trim(), c === AGO.Time.formatTimeCache.seconds && 0 === e ? b += d : c ===
                                                                                                          AGO.Time.formatTimeCache.minutes ? b += 60 * d : c === AGO.Time.formatTimeCache.hours ? b += 3600 * d : c === AGO.Time.formatTimeCache.days ? b += 86400 * d : c === AGO.Time.formatTimeCache.weeks ? b += 604800 * d : c === AGO.Time.formatTimeCache.years && (b += 31536E3 * d
                );
            }
        }
        return b
    },
    formatTimeCacheCreate: function () {
        AGO.Time.formatTimeCache || (AGO.Time.formatTimeCache = {
            years:   AGO.Label.is("KD0Y") || "y",
            weeks:   AGO.Label.is("KD0W") || "w",
            days:    AGO.Label.is("KD0D") || "d",
            hours:   AGO.Label.is("KD0H") || "h",
            minutes: AGO.Label.is("KD0M") || "m",
            seconds: AGO.Label.is("KD0S") ||
                     "s"
        }
        )
    },
    parseTime: function (a) {
        a = "string" === typeof a ? a.replace(/[^0-9:]/g, "").split(":") : [];
        return 3 === a.length ? 3600 * (+a[0] || 0
        ) + 60 * (+a[1] || 0
        ) + (+a[2] || 0
                                ) : 0
    },
    convertLocal: function (a, b) {
        var c;
        return a && 1 < AGO.Time.status ? (b || (b = "[d].[m].[Y] [H]:[i]:[s]"
        ), (c = AGO.Time.parse(a, b)
           ) ? AGO.Time.format(c, b) : a || ""
        ) : a || ""
    },
    parse: function (a, b) {
        b || (b = "[d].[m].[Y] [H]:[i]:[s]"
        );
        a = a.toString();
        var c = b.match(/\[[dmyYHis]\]/g);
        if (!c || !c.length) {
            return null;
        }
        var d;
        d = b.replace(/\./g, "\\.");
        d = d.replace(/\//g, "\\/");
        d = d.replace(/\-/g,
                      "\\-"
        );
        for (var e = {}, f = 0; f < c.length; f++) {
            var g = c[f];
            d = "[Y]" === g ? d.replace(g, "(\\d{4,4})") : "[y]" === g ? d.replace(g, "(\\d{2,2})") : d.replace(g, "(\\d{1,2})");
            g = g.substr(1, 1);
            e[g] = f + 1
        }
        c = a.match(new RegExp(d, ""));
        if (!c || !c.length) {
            return null;
        }
        d = new Date;
        d.setMilliseconds(0);
        d.setSeconds(0);
        d.setMinutes(0);
        d.setHours(0);
        c[e.s] && d.setSeconds(c[e.s]);
        c[e.i] && d.setMinutes(c[e.i]);
        c[e.H] && d.setHours(c[e.H]);
        c[e.Y] ? d.setFullYear(c[e.Y]) : c[e.y] && (f = d.getFullYear(), f = 100 * Math.floor(f / 100) + c[e.y], f > d.getFullYear() &&
                                                                                                                 (f -= 100
                                                                                                                 ), d.setFullYear(f)
        );
        c[e.d] && d.setDate(1);
        c[e.m] && d.setMonth(c[e.m] - 1);
        c[e.d] && d.setDate(c[e.d]);
        return d
    },
    parseDateTime: function (a, b) {
        var c, d, e;
        if (a = STR.check(a)) {
            if (d = a.match(/([^\d:]|\b)\d{1,2}\.\d{1,2}(\.\d{2}|\.\d{4})*\s+\d{1,2}:\d{1,2}:\d{1,2}([^\d:]|\b)/)) {
                d = STR.check(d[0]).replace(/[^\d:\.\s]/g, "").replace(/ +/g, " ").trim().split(" "), c = STR.check(d[0]).split("."), e = STR.check(d[1]).split(":");
            } else if (d = a.match(/([^\d:]|\b)\d{1,2}:\d{1,2}:\d{1,2}([^\d:]|\b)/)) {
                c = [], e = STR.check(d[0]).replace(/[^\d:]/g,
                                                    ""
                ).trim().split(":");
            }
            if (OBJ.is(e) && e.length && 24 > e[0] && 60 > e[1] && 60 > e[2] && (d = new Date, d.setMilliseconds(0), d.setSeconds(+e[2] || 0), d.setMinutes(+e[1] || 0), d.setHours(+e[0] || 0), 3 === c.length && (2E3 < c[2] ? d.setFullYear(+c[2] || 0) : 100 > c[2] && (e = 100 * Math.floor(d.getFullYear() / 100) + (+c[2] || 0
                ), e > d.getFullYear() && (e -= 100
                ), d.setFullYear(e)
                )
                ), 2 <= c.length && (d.setDate(1), d.setMonth((+c[1] || 0
                                                              ) - 1
                ), d.setDate(+c[0] || 0)
                ), c = Math.floor(d.getTime() / 1E3), 1E9 < c
                )) {
                return b ? c : d
            }
        }
        return 0
    }
};
AGO.Task = {
    Info: "galaxy system position type mission speed holdingtime expeditiontime union routine name detail detail2 preferCargo preferShip arrival metal crystal deuterium preferResource timeResource timeShip 202 203 204 205 206 207 208 209 210 211 212 213 214 215".split(" "),
    valid: function (a) {
        return STR.check(a).replace(/[\"\:]/g, "").trim()
    },
    create: function (a, b) {
        var c = {}, d;
        a = a || {};
        for (d = 0; 15 >= d; d++) {
            c[AGO.Task.Info[d]] = 10 > d || 12 === d || 15 === d ? +a[AGO.Task.Info[d]] || 0 : a[AGO.Task.Info[d]] || "";
        }
        if (1 <= b) {
            for (d =
                 16; 20 >= d; d++) {
                c[AGO.Task.Info[d]] = +a[AGO.Task.Info[d]] || 0;
            }
        }
        if (2 <= b) {
            for (d = 21; 35 >= d; d++) {
                c[AGO.Task.Info[d]] = +a[AGO.Task.Info[d]] || 0;
            }
        }
        return c
    },
    splitActive: function (a, b, c, d) {
        var e, f;
        e = OBJ.split(a);
        if (e.standard && e[AGO.Acc.coordstype]) {
            a = AGO.Task.split(e.standard, b, -1);
            b = AGO.Task.split(e[AGO.Acc.coordstype], b, -1);
            for (f in b) {
                b[f] && (a[f] = d || "string" === typeof b[f] ? b[f] : Math.max(b[f], 0)
                );
            }
            AGO.Task.updateCoords(a, c);
            a.resources = a.metal + a.crystal + a.deuterium;
            a.ships = 0;
            for (f in AGO.Item.Ship) {
                0 < a[f] && (a.ships += a[f]
                );
            }
            return a
        }
        return AGO.Task.split(e[AGO.Acc.coordstype] || e.standard, b, c)
    },
    split: function (a, b, c) {
        var d, e;
        d = STR.check(a).split(":");
        a = {
            galaxy:         +d[0] || 0,
            system:         +d[1] || 0,
            position:       +d[2] || 0,
            type:           +d[3] || 0,
            mission:        +d[4] || 0,
            speed:          +d[5] || 0,
            holdingtime:    +d[6] || 0,
            expeditiontime: +d[7] || 0,
            union:          +d[8] || 0,
            routine:        +d[9] || 0,
            name:           d[10] || "",
            detail:         d[11] || "",
            detail2:        +d[12] || 0,
            preferCargo:    d[13] || "",
            preferShip:     d[14] || "",
            arrival:        +d[15] || 0
        };
        0 <= c && AGO.Task.updateCoords(a, c);
        1 <= b && (a.metal = +d[16] || 0, a.crystal = +d[17] || 0, a.deuterium =
                                                                   +d[18] || 0, a.preferResource = +d[19] || 0, a.timeResource = +d[20] || 0, a.resources = a.metal + a.crystal + a.deuterium
        );
        if (2 <= b) {
            for (a.ships = 0, a.shipsCivil = 0, a.shipsCombat = 0, a.timeShip = +d[21] || 0, e = 22; 35 >= e; e++) {
                c = String(e + 180), b = +d[e] || 0, (a[c] = b
                                                     ) && "212" !== c && (a.ships += b, c in AGO.Item.ShipCivil && (a.shipsCivil += b
                ), c in AGO.Item.ShipCombat && (a.shipsCombat += b
                )
                                                     );
            }
        }
        return a
    },
    splitCoords: function (a) {
        a = STR.check(a).split(":");
        return {galaxy: +a[0] || 0, system: +a[1] || 0, position: +a[2] || 0}
    },
    join: function (a, b) {
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
                a.holdingtime || "",
                a.expeditiontime || "",
                a.union || "",
                a.routine || "",
                a.name || "",
                a.detail || "",
                a.detail2 || "",
                a.preferCargo || "",
                a.preferShip || "",
                a.arrival || ""
            ];
            1 <= b && (c[16] = a.metal || "", c[17] = a.crystal || "", c[18] = a.deuterium || "", c[19] = a.preferResource || "", c[20] = a.timeResource || ""
            );
            if (2 <= b) {
                for (c[21] = a.timeShip || "", d = 22; 35 >= d; d++) {
                    c[d] = a[String(d + 180)] || "";
                }
            }
            return c.join(":") || ""
        }
        return ""
    },
    updateCoords: function (a, b, c) {
        OBJ.is(a) && (!c &&
                      AGO.Task.checkCoords(a.galaxy, a.system, a.position) ? a.coords = a.galaxy + ":" + a.system + ":" + a.position : OBJ.is(c) && AGO.Task.checkCoords(c.galaxy, c.system, c.position) ? (a.galaxy = c.galaxy, a.system = c.system, a.position = c.position, a.coords = a.galaxy + ":" + a.system + ":" + a.position
        ) : b && (c || (c = a
        ), 2 >= b ? (a.galaxy = 2 === b ? AGO.Acc.galaxy : 0, a.system = 2 === b ? AGO.Acc.system : 0, a.position = 2 === b ? AGO.Acc.position : 0
        ) : (a.galaxy = NMR.isMinMax(c.galaxy, 1, AGO.Uni.galaxies) ? c.galaxy : 3 === b ? AGO.Acc.galaxy : 0, a.system = NMR.isMinMax(c.system, 1,
                                                                                                                                       AGO.Uni.systems
        ) ? c.system : 3 === b ? AGO.Acc.system : 0, a.position = NMR.isMinMax(c.position, 1, AGO.Uni.positions) ? c.position : 3 === b ? AGO.Acc.position : 0
           ), a.coords = 1 === b ? "" : a.galaxy + ":" + a.system + ":" + a.position
        ), a.owncoords = AGO.Planets.owncoords(a.coords, a.type), a.coordstype = a.coords && a.type ? a.coords + ":" + a.type : ""
        )
    },
    updateCoordsType: function (a, b) {
        var c;
        b = STR.check(b);
        OBJ.is(a) && (c = b.split(":"), NMR.isMinMax(+c[3], 1, 3) && (a.type = +c[3] || 0
        ), AGO.Task.checkCoords(+c[0], +c[1], +c[2]) ? (a.galaxy = +c[0] || 0, a.system = +c[1] ||
                                                                                          0, a.position = +c[2] || 0, a.coords = a.galaxy + ":" + a.system + ":" + a.position, a.coordstype = a.type ? a.coords + ":" + a.type : "", a.owncoords = AGO.Planets ? AGO.Planets.owncoords(a.coords, a.type) : 0
        ) : (delete a.coords, delete a.coordstype, delete a.owncoords
           )
        )
    },
    updateResources: function (a) {
        OBJ.is(a) && (a.metal = +a.metal || 0, a.crystal = +a.crystal || 0, a.deuterium = +a.deuterium || 0, a.resources = a.metal + a.crystal + a.deuterium, a.timeResource = +a.timeResource || 1
        )
    },
    updateStandardUnits: function (a) {
        OBJ.is(a) && (a.standardunits = AGO.Ogame.getStandardUnits(a,
                                                                   AGO.Option.get("B35", 2)
        )
        )
    },
    addResources: function (a, b) {
        OBJ.is(a) && (OBJ.is(b) && b.timeResource ? (OBJ.iterate(AGO.Item.Resource, function (c) {
                                                                     a[c] = (a[c] || 0
                                                                            ) + (b[c] || 0
                                                                            )
                                                                 }
        ), a.resources = a.metal + a.crystal + a.deuterium, a.timeResource = a.timeResource || -1
        ) : a.timeResource = a.timeResource ? -1 : 0
        )
    },
    addShips: function (a, b) {
        OBJ.is(a) && (OBJ.is(b) && b.timeShip ? (a.shipsCivil = 0, a.shipsCombat = 0, OBJ.iterate(AGO.Item.ShipCivil, function (c) {
                                                                                                      a[c] = (a[c] || 0
                                                                                                             ) + (b[c] || 0
                                                                                                             );
                                                                                                      a.shipsCivil += a[c]
                                                                                                  }
        ), OBJ.iterate(AGO.Item.ShipCombat, function (c) {
                           a[c] =
                           (a[c] || 0
                           ) + (b[c] || 0
                           );
                           a.shipsCombat += a[c]
                       }
        ), a.ships = a.shipsCivil + a.shipsCombat, a.timeShip = a.timeShip || -1
        ) : a.timeShip = a.timeShip ? -1 : 0
        )
    },
    updateShips: function (a) {
        var b;
        if (OBJ.is(a)) {
            for (b in a.ships = 0, a.shipsCivil = 0, a.shipsCombat = 0, AGO.Item.Ship) {
                a[b] && "212" !== b ? (a.ships += a[b], b in AGO.Item.ShipCivil && (a.shipsCivil += a[b]
                ), b in AGO.Item.ShipCombat && (a.shipsCombat += a[b]
                )
                ) : a[b] = 0
            }
        }
    },
    checkCoords: function (a, b, c) {
        return 1 <= a && a <= AGO.Uni.galaxies && 1 <= b && b <= AGO.Uni.systems && 1 <= c && c <= AGO.Uni.positions
    },
    checkCoordsPart: function (a,
                               b
    ) {
        return NMR.minMax(a, 1, {
                                    galaxy: AGO.Uni.galaxies,
                                    system: AGO.Uni.systems,
                                    position: AGO.Uni.positions
                                }[b] || 0
        )
    },
    cutSystem: function (a) {
        return "string" === typeof a ? a.split(":", 2).join(":") : ""
    },
    cutCoords: function (a) {
        return "string" === typeof a ? a.split(":", 3).join(":") : ""
    },
    cutCoordsType: function (a) {
        return "string" === typeof a ? a.split(":", 4).join(":") : ""
    },
    parseTarget: function (a) {
        var b = {}, c, d;
        if (a = STR.check(a)) {
            (c = a.match(/([^\d:]|\b)t\s{0,2}\d{1,2}:\d{1,3}:\d{1,2}(:\d)*([^\d:]|\b)/i)
            ) && c[0] && (d = c[0], a = ""
            ), (c = a.match(/([^\d:]|\b)\d{1,2}\.\d{1,2}(\.\d{2}|\.\d{4})*([^\d:]|\b)/)
               ) &&
               c[0] && (d = c[0] + " " + a.split(c[0])[1], a = a.split(c[0])[0]
            ), (c = a.match(/([^\d:]|\b)\d{1,2}:\d{1,3}:\d{1,2}(:\d)*([^\d:]|\b)/)
               ) && c[0] && (d || (d = a.split(c[0])[1]
            ), AGO.Task.updateCoordsType(b, c[0].replace(/[^\d:]/g, ""))
               ), d && (b.time = AGO.Time.parseDateTime(d, !0)
            );
        }
        return b
    },
    trimCoords: function (a) {
        var b, c;
        return (a = STR.check(a)
               ) ? (b = a.lastIndexOf("["), c = a.lastIndexOf("]"), a.slice(-1 < b ? b + 1 : 0, -1 < c ? c : a.length).trim()
               ) : ""
    }
};
AGO.Token = {
    Info: {}, Messages: function (a, b) {
        "Action" === a && AGO.Token.Action(b)
    }, Init: function (a, b) {
        OBJ.is(a) && (OBJ.is(a.Info) ? (AGO.Token.Data = a, AGO.Token.Info = a.Info
        ) : AGO.Token.Info = a
        );
        b && (AGO.Token.getPlayerStatusList = null
        )
    }, Action: function (a) {
        OBJ.is(a) && (a.keyPlayer = AGO.App.keyPlayer, a.refresh = "galaxy" === AGO.App.page, AGB.message("Token", "Action", a, function (b) {
                                                                                                              b && b.changed && (b.marked = a.marked, b.Data && (AGO.Token.Data = b.Data, b.Data = null
                                                                                                              ), AGO.Init.Messages("Panel", "Action", b)
                                                                                                              )
                                                                                                          }
        )
        )
    }, getPlayerStatus: function (a,
                                  b
    ) {
        var c, d, e, f, g, k;
        if (!AGO.Token.getPlayerStatusList) {
            for (AGO.Token.getPlayerStatusList = {}, g = 21; 30 >= g; g++) {
                AGO.Token.Info[g] && AGO.Token.Info[g].cls && (AGO.Token.getPlayerStatusList["status_abbr_" + AGO.Token.Info[g].cls] = g
                );
            }
        }
        e = 0;
        c = DOM.queryAll(a, b);
        for (k = 0; k < c.length; k++) {
            for (d = (c[k].className || ""
            ).split(" "), g = 0; g < d.length; g++) {
                (f = (d[g] || ""
                ).trim()
                ) && (e = Math.max(AGO.Token.getPlayerStatusList[f], e)
                );
            }
        }
        return e
    }, getClass: function (a) {
        return a && AGO.Token.Info[a] ? "status_abbr_" + (AGO.Token.Info[a].cls || a
        ) : ""
    }, getClassSelection: function (a) {
        return 3 >=
               a ? "ago_selection_S" + a : "ago_selection_" + a
    }, getClassSelected: function (a, b) {
        return "ago_selected ago_selected_" + (3 >= a ? "S" + a : a
            ) + (b ? "_own" : ""
               )
    }, getClassHover: function (a, b) {
        return "ago_hover ago_hover_" + (3 >= a ? "S" + a : a
            ) + (b ? "_own" : ""
               )
    }, getClassHighlight: function (a, b) {
        return "ago_highlight ago_highlight_" + (3 >= a ? "S" + a : a
            ) + (b ? "_active" : ""
               )
    }, getColor: function (a) {
        return a && AGO.Token.Info[a] ? AGO.Token.Info[a].color || "" : ""
    }, getCondition: function (a) {
        return a && AGO.Token.Info[a] ? AGO.Token.Info[a].condition : 0
    }, getLimit: function (a) {
        return a &&
               AGO.Token.Info[a] ? AGO.Token.Info[a].limit : 0
    }, getLabel: function (a) {
        return a && AGO.Token.Info[a] ? AGO.Token.Info[a].name || AGO.Label.get("C" + a) : ""
    }, valid: function (a) {
        return a ? (a + ""
        ).replace(/\|/g, "") : ""
    }, getColorOpacity: function (a, b) {
        var c;
        return a && AGO.Token.Info[a] && AGO.Token.Info[a].color ? (c = +AGO.Token.Info[a].opacity || (80 > a ? AGO.Option.get("CT2", 2) : AGO.Styles.opacity
        ) || 100, "INHERIT" === AGO.Token.Info[a].color ? c / 100 : HTML.color(AGO.Token.Info[a].color, b ? 2 * c : c)
        ) : ""
    }
};
AGO.Fleet = {
    Data: {}, Task: {}, Next: {}, Init: function (a) {
        AGO.Fleet.Data = a || {};
        AGO.Fleet.Data.Current = AGO.Data.getStorage(AGO.App.keyPlayer + "_Fleet_Current", "JSON")
    }, Content: function (a, b, c, d) {
        b = OBJ.parse(d);
        "fetcheventbox" === a ? "friendly"in b && (AGO.Fleet.Set("Current", "fleets", +b.friendly || 0), AGO.Init.Messages("Panel", "updateTab", {tab: "Flights"})
        ) : "minifleet" === a && b.response && ("slots"in b.response && (AGO.Fleet.Set("Current", "fleets", +OBJ.get(b.response, "slots") || 0), AGO.Init.Messages("Panel", "updateTab", {tab: "Flights"})
        ),
            AGO.Init.Messages("Page", "sendShips", {mode: "finish", success: b.response.success})
        )
    }, Set: function (a, b, c) {
        a && AGO.Fleet.Data[a] && (b = "string" === typeof b ? OBJ.createKey(b, c) : b, OBJ.iterate(b, function (c) {
                                                                                                        AGO.Fleet.Data[a][c] = b[c]
                                                                                                    }
        ), "Current" === a ? AGO.Data.setStorage(AGO.App.keyPlayer + "_Fleet_Current", AGO.Fleet.Data.Current) : AGB.message("Fleet", "Set", {
                                                                                                                                 tab: a,
                                                                                                                                 data: b
                                                                                                                             }
        )
        )
    }, Get: function (a, b, c) {
        a = a && AGO.Fleet.Data[a] && (b || 0 === b
        ) ? AGO.Fleet.Data[a][b] : "";
        return 6 === c ? STR.check(a) : +a || 0
    }
};
AGO.DataBase = {
    status: 0, enabled: !1, Data: {}, Info: {Player: "D36", Universe: "D37"}, Messages: function (a, b) {
        "Notify" === a && AGO.DataBase.Notify(b)
    }, Init: function (a) {
        AGO.DataBase.Data = OBJ.is(a) ? a : {};
        AGO.DataBase.status = AGO.DataBase.Data.status || 0;
        AGO.DataBase.enabled = 1 === AGO.DataBase.Data.status
    }, Notify: function (a) {
        var b;
        OBJ.is(a) && (b = AGO.DataBase.Info[a.tab]
        ) && ("loading"in a ? AGO.Notify.set(b, 3, " " + a.loading + " %") : (AGO.DataBase.Init(a), AGO.Notify.set(b, 4, " (" + OBJ.get(AGO.DataBase.Data[a.tab], "entries") + ")")
        )
        )
    }
};
AGO.Tools = {
    List: ["A", "B", "C", "D", "E", "F", 1, 2, 3, 4, 5, 6, 7, 8, 9], Messages: function (a, b) {
        "Action" === a && AGO.Tools.Action(b)
    }, Action: function (a) {
        a && (a.keyPlayer = AGO.App.keyPlayer, a.planetId = AGO.Acc.planetId, a.coords = AGO.Acc.coords, a.coordstype = AGO.Acc.coordstype, a.type = AGO.Acc.type, a.planetName = AGO.Acc.planetName, a.Planets = {}, AGO.Planets.iterate(1, function (b, c) {
                                                                                                                                                                                                                                              a.Planets[c] = {
                                                                                                                                                                                                                                                  name: b.name,
                                                                                                                                                                                                                                                  temp: b.temp
                                                                                                                                                                                                                                              }
                                                                                                                                                                                                                                          }
        ), AGB.message("Tools", "Action", a, function (b) {
                           var c;
                           b && b.href && (c = document.getElementById("ago_tools_send") ||
                                               document.body.appendChild(document.createElement("a")), c.id = "ago_tools_send", c.href = b.href, c.style.display = "none", c.target = a.shiftKeys || AGO.Option.is("T01") ? "_blank" : "ago_tools_" + b.id, DOM.click(c)
                           )
                       }
        )
        )
    }
};