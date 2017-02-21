if (!AGO) {
    var AGO = {};
}
AGO.Main = {
    Messages: function (a, b) {
        "Display" === a && AGO.Main.Display(b)
    }, Read: function () {
        var a;
        a = {commander: 0, admiral: 0, engineer: 0, geologist: 0, technocrat: 0};
        DOM.iterateChildren(document.getElementById("officers"), function (b) {
                                var d = b.className || "";
                                HTML.hasClass(d, "on") && OBJ.iterate(a, function (b) {
                                                                          HTML.hasClass(d, b) && (a[b] = 1
                                                                          )
                                                                      }
                                )
                            }
        );
        OBJ.iterate(a, function (b) {
                        AGO.Option.set(b, a[b])
                    }
        );
        document.getElementById("officers").classList.contains("all") ? AGO.Option.set("comstaff", 1) : AGO.Option.set("comstaff", 0);
    }, Run: function () {
        var a, b, d, c;
        if (a = document.getElementById("menuTableTools")) {
            b = document.createDocumentFragment(), AGO.Main.addVersionCheck(b),
                d = b.appendChild(document.createElement("li")), c = DOM.appendSPAN(d, "menu_icon"), DOM.appendA(c, {
                                                                                                                     id: "ago_menubutton_logo",
                                                                                                                     "class": "ago_menubutton_logo_inactive"
                                                                                                                 }, {click: AGO.Main.clickIcon}
            ), c = DOM.appendA(d, {
                                   id: "ago_menubutton",
                                   "class": "menubutton"
                               }, {click: AGO.Main.clickButton}
            ), d = 1 < AGO.App.beta ? "AGOalpha" : AGO.App.beta ? "AGObeta" : "AGO", DOM.appendSPAN(c, "textlabel", d), DOM.appendSPAN(c, {id: "ago_menubutton_coords"}), DOM.prependChild(a, b), !AGO.App.disabled && 30 < AGO.Notify.problem && DOM.setStyleColor("ago_menubutton",
                                                                                                                                                                                                                                                                    "id", "#FF0000"
            );
        }
        if (20 > AGO.Notify.problem) {
            a = document.getElementById("logoLink");
            b = ["", "fleet1", "movement", "galaxy", "messages"][AGO.Option.get("O03", 2)];
            a && b && (a.parentNode.href = AGO.Uni.path + b
            );
            if (a = document.getElementById("playerName")) {
                if (3 !== a.childNodes[0].nodeType ? DOM.prependChild(a, document.createTextNode(AGO.App.title + " ")) : a.childNodes[0].textContent = AGO.App.title + " ", (d = a.querySelector(".status_abbr_outlaw")
                                                                                                                                                                            ) && d.title) {
                    b = "";
                    for (d = d.title; c = /\d{1,2}\D/g.exec(d);) {
                        b += c[0] + " ", d = d.split(c[0]).join("");
                    }
                    DOM.appendTEXT(a, b)
                }
            }
            AGO.Main.modeTitle = AGO.Option.is("O04") ? 3 : 0;
            AGO.Main.Display()
        }
    }, Complete: function () {
        AGO.Main.updateTitle();
        AGO.Main.checkVersionCheck();
        AGO.Main.Check()
    }, onKeydown: function (a) {
        var b;
        return 112 <= a.keyCode && 123 >= a.keyCode && AGO.Option.is("U32") ? ((b = document.querySelectorAll("#planetList .smallplanet a.planetlink")
                                                                               ) && b[a.keyCode - 112] && DOM.click(a.shiftKey ? "a.moonlink" : "a.planetlink", b[a.keyCode - 112].parentNode), !1
        ) : !0
    }, onSwipe: function (a, b) {
        if (12 === b) {
            AGO.Panel.onSwipe(a);
        } else if (15 ===
                   b) {
            AGO.Planets.onSwipe(a)
        }
    }, Display: function () {
        var a, b, d;
        d = "inactive";
        AGO.Option.is("I83") && (a = AGO.Panel.GetActive("Target", "coords", 6), b = AGO.Task.cutCoords(a), a = OBJ.get(AGO.Styles.colorType, +a.split(":")[3] || 1) || "", d = b || AGO.Panel.GetActive("Target", "time") ? "autocopy" : "coords"
        );
        DOM.updateText("ago_menubutton_coords", "id", b);
        DOM.setStyleColor("ago_menubutton_coords", "id", a);
        DOM.updateClass("ago_menubutton_logo", "id", "ago_menubutton_logo_" + d)
    }, clickButton: function () {
        AGO.App.disabled ? AGO.App.Save({disabled: !1}) :
        20 > AGO.Notify.problem && AGO.Option.Menu()
    }, updateButton: function () {
        5 < AGO.Init.status && DOM.setStyleColor("ago_menubutton", "id", AGO.Notify.color || "")
    }, updateInfo: function (a, b, d) {
        var c;
        if (5 < AGO.Init.status && a) {
            AGO.Main.statusInfo = 2;
            if (!(c = document.getElementById("ago_menubutton_info")
                )) {
                var e, f;
                (e = document.getElementById("ago_menubutton")
                ) ? (f = document.createElement("li"), f.className = "ago_menubutton_info", c = f.appendChild(document.createElement("div")), c.id = "ago_menubutton_info", DOM.after(e.parentNode,
                                                                                                                                                                                      f
                )
                ) : c = void 0
            }
            c && (DOM.hasChildren(c) || (c.parentNode.style.display = "list-item", window.setTimeout(AGO.Main.hideInfo, AGO.Notify.loading ? 4E3 : 2E3)
            ), a = document.getElementById("ago_menubutton_info_" + a) || DOM.append(c, "span", {id: "ago_menubutton_info_" + a}, {display: "block"}), DOM.updateText(a, null, b), DOM.updateStyle(a, null, "color", d)
            )
        }
    }, hideInfo: function () {
        var a;
        AGO.Main.statusInfo = Math.max(AGO.Main.statusInfo - 1, 0);
        if (AGO.Main.statusInfo) {
            window.setTimeout(AGO.Main.hideInfo, AGO.Notify.loading ? 4E3 : 2E3);
        } else if (AGO.Notify.set("Hide"),
                a = document.getElementById("ago_menubutton_info")) {
            DOM.removeChildren(a), DOM.setStyleDisplay(a.parentNode)
        }
    }, clickIcon: function () {
        AGO.Option.set("I83", !AGO.Option.is("I83"), 1);
        AGO.Init.Messages("Main", "Display");
        AGO.Init.Messages("Panel", "Display")
    }, updateTitle: function () {
        if (AGO.Option.is('O04')) 
            if ((AGO.Main.modeTitle > 0) && DOM.getProperty("eventboxBlank", "id", "offsetHeight", 2)) {
                document.title = AGO.App.title;
                AGO.Main.modeTitle--;
            } else {
                var missionCounter = DOM.getText("tempcounter", "id");
                var missionType = DOM.getText("#eventboxFilled .next_event + .next_event .undermark");
                if (missionCounter && missionType) {
                    document.title = AGO.App.title + " - " + missionCounter + " - " + missionType;
                } else {
                    document.title = AGO.App.title;
                }
            }
    }, Check: function () { 
    }, addVersionCheck: function (a) {
        var b, d, c, e;
        c = NMR.parseVersion(AGO.App.versionOGameMax) >= NMR.parseVersion(AGO.App.versionOGame);
        b = document.getElementById("oGameVersionCheckData");
        b || (a = a.appendChild(document.createElement("li")), b = DOM.appendDIV(a, {id: "oGameVersionCheckData"}, {display: "none"}), d = DOM.appendA(a, {
                                                                                                                                                           id: "oGameVersionCheckMenuButton",
                                                                                                                                                           "class": "menubutton"
                                                                                                                                                       }, {click: AGO.Main.clickVersionCheck}
        ), e = {
                   BA: "Skripte",
                   CZ: "Skripty",
                   GR: "\u03a3\u03b5\u03bd\u03ac\u03c1\u03b9\u03b1",
                   HU: "Szkriptek",
                   JP: "\u30b9\u30af\u30ea\u30d7\u30c8",
                   NO: "Skript",
                   PL: "Skrypty",
                   RO: "Scripturi",
                   RU: "\u0441\u0446\u0435\u043d\u0430\u0440\u0438\u0438",
                   SE: "Skript",
                   SI: "Skripti",
                   SK: "Skripty",
                   TR: "Scriptler",
                   TW: "\u811a\u672c"
               }[AGO.Uni.lang] || "Scripts", DOM.appendSPAN(d, "textlabel", e), c && AGO.Option.is("O02") && DOM.setStyleDisplay(a)
        );
        a = document.createElement("span");
        DOM.appendSPAN(a, "", "AntiGameOrigin");
        DOM.appendSPAN(a, "", AGO.App.versionOGameMax);
        DOM.appendSPAN(a, "", "https://antigame.de/home.php?page=home");
        DOM.appendSPAN(a,
                       "", c
        );
        DOM.appendChild(b, a);
        (d = d || document.getElementById("oGameVersionCheckMenuButton")
        ) && !c && (b = 6, window.localStorage && (c = window.localStorage.getItem("OGameVersionCheck") || "", b = parseInt(c.split("|")[1], 10) || 0, c.split("|")[0] !== AGO.ogameVersion && (b = 0
        )
        ), 6 > b && "#FF4B00" !== d.style.color && (window.localStorage && window.localStorage.setItem("OGameVersionCheck", AGO.App.versionOGame + "|" + (b + 1
                                                                                                       )
        ), d.style.color = "#FF4B00"
        )
        )
    }, checkVersionCheck: function () {
        var a, b;
        (a = document.getElementById("oGameVersionCheckData")
        ) &&
        AGO.Option.is("O02") && (DOM.iterateChildren(a, function (a) {
                                                         "true" !== DOM.getText(DOM.getChildren(a, 3)) && (b = !0
                                                         )
                                                     }
        ), DOM.setStyleDisplay(a.parentNode, null, b ? "list-item" : "none")
        )
    }, clickVersionCheck: function () {
        var a, b, d, c, e, f, g;
        a = document.getElementById("contentWrapper");
        b = document.getElementById("oGameVersionCheck");
        e = document.getElementById("oGameVersionCheckData");
        if (a) {
            if (DOM.setStyleDisplay("inhalt", "id", b ? "block" : "none"), b) {
                a.removeChild(b);
            } else {
                c = (b = document.querySelector("#oGameVersionCheckMenuButton span")
                    ) ?
                    b.textContent : "";
                b = DOM.appendDIV(null, {id: "oGameVersionCheck"});
                d = DOM.appendDIV(b, null, {
                                      background: 'url("' + document.location.protocol + '//gf1.geo.gfsrv.net/cdn63/10e31cd5234445e4084558ea3506ea.gif") no-repeat scroll 0px 0px transparent',
                                      height: "28px",
                                      marginTop: "8px",
                                      position: "relative",
                                      textAlign: "center"
                                  }
                );
                DOM.appendDIV(d, null, {
                                  font: "700 12px/23px Verdana,Arial,Helvetica,sans-serif",
                                  color: "rgb(111, 159, 200)",
                                  paddingTop: "3px"
                              }
                ).textContent = c;
                d = DOM.appendDIV(b, null, {
                                      background: 'url("' + document.location.protocol + '//gf1.geo.gfsrv.net/cdn9e/4f73643e86a952be4aed7fdd61805a.gif") repeat-y scroll 5px 0px transparent',
                                      color: "rgb(132, 132, 132)",
                                      margin: "0px",
                                      padding: "17px 0px 10px",
                                      width: "100%",
                                      textAlign: "center"
                                  }
                );
                if (e) {
                    for (g = 0; g < e.childNodes.length; g++) {
                        f = e.childNodes[g].childNodes[2].textContent, c = DOM.append(d, "p", null, {
                                                                                          padding: "3px 0px",
                                                                                          color: "true" === e.childNodes[g].childNodes[3].textContent ? "#008000" : "#FF4B00"
                                                                                      }
                        ), DOM.appendTEXT(c, e.childNodes[g].childNodes[0].textContent), DOM.appendA(c, {
                                                                                                         href: f,
                                                                                                         target: "_blank"
                                                                                                     }
                        ).textContent = " ( link ) ";
                    }
                }
                DOM.appendDIV(b, null, {
                                  background: 'url("' + document.location.protocol + '//gf1.geo.gfsrv.net/cdn30/aa3e8edec0a2681915b3c9c6795e6f.gif") no-repeat scroll 2px 0px transparent',
                                  height: "17px"
                              }
                );
                DOM.prependChild(a, b)
            }
        }
    }
};
AGO.Planets = {
    status: 0,
    updateDisplayStatus: 0,
    Data: {},
    ByIndex: [],
    ByCoords: {},
    ByCoordstype: {},
    Task: {},
    Messages: function (a, b) {
        "Action" === a ? AGO.Planets.Action(b) : "Display" === a && AGO.Planets.Display()
    },
    Timer: function () {
        0 < AGO.Planets.updateDisplayStatus && AGO.Planets.Display()
    },
    onSwipe: function (a) {
        "left" === a ? AGO.Planets.Action({mode: "set", type: 1}) : "right" === a ? AGO.Planets.Action({
                                                                                                           mode: "set",
                                                                                                           type: 3
                                                                                                       }
        ) : VAL.check(a, "up", "down") && AGO.Planets.Action({scroll: a})
    },
    Read: function () {
        var a, b, d, c, e, f, g = 0, h;
        a = document.getElementById("planetList");
        b = DOM.getText("#countColonies .textCenter span").split("/");
        AGO.Planets.count = NMR.parseIntAbs(b[0]);
        AGO.Planets.possible = NMR.parseIntAbs(b[1]);
        if (a && DOM.hasChildren(a) >= AGO.Planets.count) {
            for (AGO.Planets.status = 1, a = a.firstChild; a; a = a.nextSibling) {
                if (1 === a.nodeType && (h = STR.check(NMR.parseIntAbs(a.id))
                    )) {
                    g++;
                    c = {index: g, type: 1};
                    e = {index: g, type: 3, planet: h};
                    for (b = a.firstChild; b; b = b.nextSibling) {
                        if (1 === b.nodeType) {
                            if (f = b.className || "", -1 < f.indexOf("planetlink")) {
                                for (f = b.title || "", c.name = (f.split("[", 1)[0].split("<b>",
                                                                                           2
                                )[1] || ""
                                ).trim(), c.temp = NMR.parseInt((f.match(/<br\/>.*<br>[^\d\-]*([\d\-]+)/i) || []
                                                                )[1]
                                ), d = b.firstChild; d; d = d.nextSibling) {
                                    1 === d.nodeType && (f = d.className || "", -1 < f.indexOf("planetPic") ? c.img = d.src : -1 < f.indexOf("planet-koords") && (c.coords = (d.textContent || ""
                                    ).replace(/[^\d\:]/g, "")
                                    )
                                    );
                                }
                            } else if (-1 < f.indexOf("moonlink")) {
                                for (f = b.title || "", c.moon = STR.check(NMR.parseIntAbs(STR.getParameter("cp", b.href))), e.name = (f.split("[", 1)[0].split("<b>", 2)[1] || ""
                                ).trim(), d = b.firstChild; d; d = d.nextSibling) {
                                    1 === d.nodeType &&
                                    (f = d.className || "", -1 < f.indexOf("icon-moon") && (e.img = d.src
                                    )
                                    );
                                }
                            } else {
                                -1 < f.indexOf("constructionIcon") && (d = b.querySelector(".icon_wrench_red") ? -1 : 1, -1 < f.indexOf("moon") ? e.construction = d : c.construction = d
                                );
                            }
                        }
                    }
                    c.coords && (c.coordstype = c.coords + ":1", AGO.Planets.Data[h] = c, AGO.Planets.ByCoords[c.coords] = h, AGO.Planets.ByIndex[c.index] = h, AGO.Planets.ByCoordstype[c.coordstype] = h, c.moon && (e.coords = c.coords, e.coordstype = c.coords + ":3", AGO.Planets.Data[c.moon] = e, AGO.Planets.ByCoordstype[e.coordstype] = c.moon
                    )
                    )
                }
            }
        } else {
            AGO.Planets.status =
            0, AGO.Planets.count && AGB.Log("Planets - Error - Something wrong with the planetlist !", !0)
        }
    },
    Run: function () {
        var a, b, d;
        b = AGO.Option.is("O53");
        d = AGO.Option.isAnd("U32", "O54");
        (a = document.getElementById("rechts")
        ) && AGO.Option.is("O50") && (AGO.Planets.enabled = !0, AGO.Planets.improve = AGO.Option.is("O51"), AGO.Planets.coloring = AGO.Option.isAnd("CS0", "O55"), AGO.Option.is("O52") && DOM.extendClass(a, null, "ago_planets_shrink"), a = document.createDocumentFragment(), DOM.appendSPAN(a, "ago_planets_arrow_planet"), DOM.appendSPAN(a,
                                                                                                                                                                                                                                                                                                                                                "ago_planets_arrow_moon"
        ), DOM.appendChild(document.getElementById("countColonies"), a), DOM.iterateChildren(document.getElementById("planetList"), function (a) {
                                                                                                 var e, f;
                                                                                                 DOM.setAttribute(".activity img", a, "src", "/cdn/img/galaxy/activity15.gif");
                                                                                                 f = STR.check(NMR.parseIntAbs(a.id));
                                                                                                 AGO.Planets.Data[f] && (AGO.Planets.coloring && AGO.Acc.coords === AGO.Planets.Data[f].coords && DOM.extendClass(a, null, AGO.Token.getClassHighlight(AGO.Acc.type)), d && DOM.appendSPAN(a, "ago_planets_shortcut", AGO.Planets.Data[f].index), b &&
                                                                                                                                                                                                                                                                                                                                                  (AGO.Planets.Data[f].construction && (e = (a.querySelector(".constructionIcon:not(.moon)") || {}
                                                                                                                                                                                                                                                                                                                                                  ).title, DOM.appendSPAN(a, "ago_planets_construction", e)
                                                                                                                                                                                                                                                                                                                                                  ), AGO.Planets.Data[f].moon && AGO.Planets.Data[AGO.Planets.Data[f].moon].construction && (e = (a.querySelector(".constructionIcon.moon") || {}
                                                                                                                                                                                                                                                                                                                                                  ).title, DOM.appendSPAN(a, "ago_planets_construction_moon", e)
                                                                                                                                                                                                                                                                                                                                                  )
                                                                                                                                                                                                                                                                                                                                                  )
                                                                                                 )
                                                                                             }
        ), AGO.Planets.coloring && DOM.addEvents("rechts", "id", {
                                                     click: AGO.Planets.click,
                                                     mouseover: AGO.Planets.hover,
                                                     mouseout: AGO.Planets.hover
                                                 }
        ), DOM.addEvents("countColonies",
                         "id", {click: AGO.Planets.clickArrow}
        ), AGO.Planets.Display(!0)
        );
        a = a = null
    },
    Display: function (a) {
        var b, d, c, e, f;
        if (b = document.getElementById("planetList")) {
            if (a || 0 < AGO.Planets.updateDisplayStatus) {
                AGO.Planets.updateDisplayStatus--, AGO.Planets.iterate(3, function (a, h) {
                                                                           if (c = AGO.Fleet.Get("Cooldown", h, 2)) {
                                                                               c = 3600 / AGO.Uni.speedFleet - (AGO.Time.timestamp() - Math.max(c, 1E4)
                                                                               ), 0 <= c ? (AGO.Planets.updateDisplayStatus = 5, e = "ago_planets_cooldown" + (60 >= c ? " ago_planets_cooldown_seconds" : ""
                                                                               ), f = 60 < c ? Math.ceil(c / 60) : Math.floor(c) ||
                                                                                                                   "", (d = b.querySelector("#planet-" + a.planet + " .ago_planets_cooldown")
                                                                                                                       ) ? (DOM.updateText(d, null, f), DOM.updateClass(d, null, e)
                                                                                                                       ) : (d = b.querySelector("#planet-" + a.planet + " .moonlink")
                                                                                                                           ) && DOM.appendSPAN(d, e, f)
                                                                               ) : AGO.Fleet.Get("Cooldown", h, 0, 2)
                                                                           }
                                                                       }
                );
            }
            AGO.Planets.coloring && AGO.Planets.Task.coords && AGO.Planets.Task.coordstype !== AGO.Planets.Task.coords + ":" + AGO.Planets.Task.type && DOM.iterateChildren(b, function (a) {
                                                                                                                                                                                var b, c;
                                                                                                                                                                                (b = STR.check(NMR.parseIntAbs(a.id))
                                                                                                                                                                                ) && AGO.Planets.Data[b] && AGO.Planets.Data[b].coords === AGO.Planets.Task.coords &&
                                                                                                                                                                                (3 !== AGO.Planets.Task.type || AGO.Planets.Data[b].moon || (AGO.Planets.Task.type = 1
                                                                                                                                                                                ), c = AGO.Token.getClassSelected(AGO.Planets.Task.type)
                                                                                                                                                                                );
                                                                                                                                                                                DOM.setClassGroup(a, null, "ago_selected", c)
                                                                                                                                                                            }
            )
        }
        b = d = null
    },
    Get: function (a, b, d) {
        b = (a = AGO.Planets.GetId(a)
            ) && AGO.Planets.Data[a] && b ? AGO.Planets.Data[a][b] : "";
        return 6 === d ? STR.check(b) : +b || 0
    },
    GetByCoords: function (a, b, d) {
        return AGO.Planets.Get(AGO.Planets.ByCoords[a], b, d)
    },
    GetByIndex: function (a, b, d) {
        return AGO.Planets.Get(AGO.Planets.ByIndex[a], b, d)
    },
    GetId: function (a) {
        return a &&
               AGO.Planets.Data[a] ? a : "active" === a ? AGO.Acc.planetId : AGO.Planets.ByCoordstype[a] || ""
    },
    getHome: function () {
        var a;
        AGO.Planets.iterate(1, function (b, d) {
                                if (!a || +d < a) {
                                    a = +d
                                }
                            }
        );
        return a
    },
    owncoords: function (a, b) {
        return AGO.Planets.ByCoords[a] ? a === AGO.Acc.coords ? b === AGO.Acc.type ? 4 : AGO.Planets.ByCoordstype[a + ":" + b] ? 3 : 1 : AGO.Planets.ByCoordstype[a + ":" + b] ? 2 : 1 : 0
    },
    click: function (a) {
        var b;
        a && a.target && (a = "A" === a.target.nodeName ? a.target : "A" === a.target.parentNode.nodeName ? a.target.parentNode : null
        ) && (b = -1 < (a.className ||
                        ""
        ).indexOf("moon") ? 3 : 1, DOM.removeClassGroup(a.parentNode, null, "ago_highlight"), DOM.extendClass(a.parentNode, null, AGO.Token.getClassHighlight(b, "active"))
        )
    },
    clickArrow: function (a) {
        a && a.target && (a = DOM.hasClass(a.target, null, "ago_planets_arrow_moon") ? 3 : DOM.hasClass(a.target, null, "ago_planets_arrow_planet") ? 1 : 0
        ) && AGO.Planets.Action({scroll: "down", type: a})
    },
    hover: function (a) {
        var b;
        a && a.target && (b = "A" === a.target.nodeName ? a.target : "A" === a.target.parentNode.nodeName ? a.target.parentNode : null
        ) && (a = "mouseover" ===
                  a.type && -1 < (b.className || ""
        ).indexOf("moon") ? "ago_hover_S3" : "ago_hover_S1", DOM.setClassGroup(b.parentNode, null, "ago_hover", a)
        )
    },
    Action: function (a) {
        var b, d, c;
        if (OBJ.is(a)) {
            b = d = AGO.Planets.Get("active", "index");
            if (a.scroll) {
                a.type = a.type || AGO.Acc.type;
                a.mode = "set";
                do {
                    if ("down" === a.scroll ? (b++, b >= AGO.Planets.ByIndex.length && (b = 1
                        )
                        ) : (b--, 1 > b && (b = AGO.Planets.ByIndex.length - 1
                        )
                        ), 1 === a.type) {
                        break;
                    } else if (c = AGO.Planets.ByIndex[b], AGO.Planets.Data[c].moon) {
                        break;
                    }
                } while (b !== d)
            }
            "set" === a.mode ? (b = document.querySelectorAll("#planetList .smallplanet a.planetlink")[b -
                                                                                                       1]
                               ) && DOM.click(1 === a.type ? "a.planetlink" : "a.moonlink", b.parentNode) : "select" === a.mode && AGO.Planets.coloring && (AGO.Planets.Task.coords = a.coords, AGO.Planets.Task.type = a.type, AGO.Planets.Display()
            )
        }
    },
    iterate: function (a, b) {
        var d, c;
        for (c = 1; c < AGO.Planets.ByIndex.length; c++) {
            d = AGO.Planets.ByIndex[c], AGO.Planets.Data[d] && (a && 1 !== a || b(AGO.Planets.Data[d], d), d = AGO.Planets.Data[d].moon, !d || a && 3 !== a || b(AGO.Planets.Data[d], d)
            )
        }
    }
};
AGO.Panel = {
    displayStatus: 0, mouseStatus: !1, mouseCount: 0, Data: {}, Messages: function (a, b) {
        "Display" === a ? AGO.Panel.Display(b) : "updateTab" === a ? AGO.Panel.updateTab(b) : "Action" === a ? AGO.Panel.Action(b) : "hover" === a && AGO.Panel.hoverExtern(b)
    }, Timer: function () {
    }, Init: function (a, b) {
        AGO.Panel.Data = OBJ.is(a) ? a : {};
        b && (AGO.Panel.Display(), window.setTimeout(function () {
                                                         var a;
                                                         a = AGO.Background.Get("Panel_Target", 6).split("|");
                                                         AGO.Background.Set("Panel_Target", "");
                                                         AGO.Option.is("I81") && (a[0] || a[1]
                                                         ) && AGO.Init.Messages("Token",
                                                                                "Action", {
                                                                 action: "set",
                                                                 tab: "Target",
                                                                 token: 81,
                                                                 coords: a[0],
                                                                 time: a[1],
                                                                 marked: 1
                                                             }
                                                         )
                                                     }, 200
        )
        )
    }, Run: function () {
        AGO.Option.is("I00") && (AGO.Panel.enabled = !0, AGO.Panel.place = Math.ceil(Math.max((+document.body.clientWidth || 0
                                                                                              ) - 1E3, 2
                                                                                     ) / 2
        ), AGO.Option.is("I03") ? (AGO.Panel.width = Math.min(AGO.Option.get("I03", 2), AGO.Panel.place + 190), AGO.Panel.space = NMR.minMax(Math.ceil((AGO.Panel.place - AGO.Panel.width
                                                                                                                                                       ) / 2
                                                                                                                                             ), 3, 40
        )
        ) : (AGO.Panel.space = NMR.minMax(Math.ceil((AGO.Panel.place - 220
                                                    ) / 3
                                          ), 3, 40
        ), AGO.Panel.width = NMR.minMax(AGO.Panel.place -
                                        4 - 2 * AGO.Panel.space, 190, 290
        )
           ), AGO.Panel.innerWidth = AGO.Panel.width - 8, AGO.Panel.left = -(AGO.Panel.width + AGO.Panel.space + 4
        ), AGO.Panel.slideLeft = -(AGO.Panel.place - 1
        ), AGO.Panel.height = NMR.minMax(AGO.Option.get("I04", 2) || (+window.innerHeight || 0
                                                                     ) - (AGO.Option.is("commander") ? 55 : 90
                                                                     ), 400, 1200
        ), AGO.Option.is("T00") || AGO.Panel.set("Tools", "label", ""), AGO.Panel.Show()
        );
        AGO.Box.Run()
    }, onSwipe: function (a) {
        "left" === a && window.setTimeout(function () {
                                              AGO.Panel.panelInactive(!0)
                                          }, 333
        );
        "right" === a && AGO.Panel.panelActive(3)
    },
    Show: function () {
        var a, b, d, c, e, f;
        if (a = document.getElementById("box")) {
            b = document.createDocumentFragment(), d = (AGO.Panel.left < AGO.Panel.slideLeft ? "ago_panel_slide " : ""
                                                       ) + (OBJ.get(AGO.Styles.classVisible, AGO.Option.get("I02", 2)) || ""
                                                       ), d = DOM.appendDIV(b, {
                                                                                "class": d,
                                                                                id: "ago_panel_button"
                                                                            }
            ), DOM.appendSPAN(d, "ago_panel_arrow"), f = DOM.appendDIV(b, {id: "ago_panel"}, {left: AGO.Panel.left + "px"}), c = DOM.appendDIV(f, {"class": "ago_panel_wrapper"}, {
                                                                                                                                                   width:     AGO.Panel.width + "px",
                                                                                                                                                   minHeight: AGO.Panel.height + "px"
                                                                                                                                               }
            ), DOM.appendSPAN(c,
                              "ago_panel_arrow"
            ), OBJ.iterate(AGO.Panel.Data, function (a) {
                               if (AGO.Panel.Get(a, "label", 6) && (e = DOM.appendDIV(c, {id: "ago_panel_" + a}), f = DOM.appendDIV(e, {
                                                                                                                                        "class": "ago_panel_tab",
                                                                                                                                        "ago-data": JSON.stringify({
                                                                                                                                                                       update: {
                                                                                                                                                                           tab: a,
                                                                                                                                                                           status: "toggle"
                                                                                                                                                                       }
                                                                                                                                                                   }
                                                                                                                                        )
                                                                                                                                    }
                                   ), f.textContent = AGO.Label.get(AGO.Panel.Get(a, "label", 6)), DOM.appendSPAN(f, "ago_panel_tab_info"), DOM.appendDIV(e, "ago_panel_tab_header"), DOM.appendDIV(e, "ago_panel_tab_content"), DOM.appendDIV(e, "ago_panel_tab_footer"), AGO.Panel.Get(a, "status")
                                   )) {
                                   if ("Settings" === a) {
                                       AGO.Panel.createSettings(e,
                                                                a, ""
                                       );
                                   } else {
                                       AGO.Panel["create" + a](e, a, AGO.Panel.Get(a, "data", 6), AGO.Panel.Data.Cache);
                                   }
                                   DOM.updateClass(e, null, "ago_panel_tab_open")
                               }
                           }
            ), DOM.appendSPAN(c, "ago_panel_arrow"), a.appendChild(b), AGO.Panel.updateTab(), DOM.addEventsAll("#ago_panel_button, #ago_panel .ago_panel_wrapper", null, {
                                                                                                                   click: AGO.Panel.click,
                                                                                                                   mouseover: AGO.Panel.hover,
                                                                                                                   mouseout: AGO.Panel.hover
                                                                                                               }
            );
        }
        a = b = d = c = e = f = null
    }, set: function (a, b, d, c) {
        a && b && AGO.Panel.Data[a] && (AGO.Panel.Data[a][b] = d, c || AGB.message("Panel", "Set", {
                                                                                       tab: a,
                                                                                       key: b,
                                                                                       value: d
                                                                                   }
        )
        )
    }, Get: function (a,
                      b, d
    ) {
        a = a && AGO.Panel.Data[a] && b ? AGO.Panel.Data[a][b] : "";
        return 6 === d ? STR.check(a) : +a || 0
    }, GetActive: function (a, b, d) {
        a = a && AGO.Panel.Data[a] ? OBJ.get(AGO.Panel.Data[a].active, b) : "";
        return 6 === d ? STR.check(a) : +a || 0
    }, Display: function (a) {
        var b, d;
        if (5 < AGO.Init.status && !AGO.Panel.updateDisplayLock) {
            AGO.Panel.updateDisplayLock = !0;
            b = OBJ.parse(a);
            AGO.Panel.enabled && !b.tab && OBJ.iterate(AGO.Panel.Data, function (a) {
                                                           AGO.Panel.Get(a, "label", 6) && "Settings" !== a && AGO.Panel.Get(a, "status") && (b.tab = a
                                                           )
                                                       }
            );
            if (b.tab && AGO.Panel.Data[b.tab]) {
                "Settings" !==
                b.tab && ("data"in b ? AGO.Panel.set(b.tab, "data", b.data) : b.data = AGO.Panel.Get(b.tab, "data", 6)
                );
                d = document.getElementById("ago_panel_" + b.tab);
                if (AGO.Panel.enabled && DOM.getChildren(d, 2)) {
                    b.status = "status"in b ? "toggle" !== b.status ? b.status : AGO.Panel.Get(b.tab, "status") ? 0 : 1 : 1;
                    AGO.Panel.set(b.tab, "status", b.status);
                    OBJ.iterate(AGO.Panel.Data, function (a) {
                                    var d;
                                    AGO.Panel.Get(a, "label", 6) && ((d = AGO.Panel.Get(a, "status")
                                                                     ) && "Settings" !== a && "Settings" !== b.tab && a !== b.tab && (d = 0, AGO.Panel.set(a, "status", d)
                                                                     ), DOM.updateClass("ago_panel_" +
                                                                                        a, "id", d ? "ago_panel_tab_open" : ""
                                    )
                                    )
                                }
                    );
                    if ("Settings" !== b.tab) {
                        AGO.Panel["create" + b.tab](d, b.tab, b.data);
                    }
                    a && AGO.Panel.panelActive(2)
                }
                AGO.Panel.Get("Settings", "status") && AGO.Panel.createSettings(document.getElementById("ago_panel_Settings"), b.tab, b.data)
            }
            window.setTimeout(function () {
                                  AGO.Panel.updateDisplayLock = !1
                              }, 50
            )
        }
    }, updateTab: function (a) {
        var b;
        AGO.Init.status && (a = OBJ.get(a, "tab"), a && "Flights" !== a || (a = AGO.Fleet.Get("Current", "fleets"), (b = AGO.Fleet.Get("Current", "fleetsSlots")
                                                                                                                    ) && DOM.updateText("#ago_panel_Flights .ago_panel_tab_info",
                                                                                                                                        null, a + "/" + b
        )
        )
        )
    }, createSettings: function (a, b, d, c) {
        function e(a, b, d, c, e, f, t, y) {
            var w;
            w = AGO.Option.get(a, 2);
            b = AGO.Label.get(b || a);
            d = DOM.appendTR(g, e ? "ago_panel_content_disabled" : "", {setting: {id: a}, update: d, message: c});
            DOM.appendTD(d, b.length > h / 7 ? {
                             "class": "tooltip",
                             title: b
                         } : null, (f ? "\u2009\u2009 " : "\u2022\u2009"
                                   ) + b
            );
            b = DOM.appendTD(d);
            b = DOM.append(b, "input", {type: t || "checkbox"}, null, {change: AGO.Panel.changeSetting});
            "radio" === t ? (b.name = "ago_panel_settings_" + a, b.checked = w === y, b.value = y
            ) : "text" === t ? b.value =
                               w || "" : b.checked = Boolean(w)
        }

        function f(a, b, d, c, e) {
            var f, t, y;
            y = AGO.Option.get(a, 2);
            b && (b = AGO.Label.get(b), f = DOM.appendTR(g), t = b.length > h / 7 ? {
                "class": "tooltip",
                title: b
            } : null, DOM.appendTD(f, t).innerHTML = "&bull;&thinsp;" + b, DOM.appendTD(f)
            );
            f = DOM.appendTR(g, "ago_panel_settings_select", {setting: {id: a}, update: d, message: c});
            a = DOM.appendTD(f, {colspan: 2});
            DOM.appendSELECT(a, "dropdownInitialized", e, STR.zero(y), {change: AGO.Panel.changeSetting})
        }

        var g, h;
        h = AGO.Panel.innerWidth - 25;
        d = document.createDocumentFragment();
        g = DOM.appendTABLE(d, "ago_panel_settings", {width: AGO.Panel.innerWidth + "px"}, [h, 25]);
        if (c) {
            switch (b) {
                case "Account":
                    e("I21", "I21", {tab: b, data: ""}, "", "", "", "radio", 1);
                    e("I21", "I41", {tab: b, data: ""}, "", "", "", "radio", 2);
                    e("I22", "", {tab: b}, "", 2 === AGO.Option.get("I21", 2));
                    break;
                case "Flights":
                    e("I41", "I21", {tab: b, data: ""}, "", "", "", "radio", 1);
                    e("I41", "I41", {tab: b, data: ""}, "", "", "", "radio", 2);
                    e("I42", "I22", {tab: b}, "", 2 === AGO.Option.get("I41", 2));
                    break;
                case "Construction":
                    e("I31", "", {tab: b});
                    e("I32", "I22", {tab: b});
                    e("I35", "", {tab: b});
                    break;
                case "Target":
                    e("I82", "", {tab: b}, {page: "Main", role: "Display"});
                    e("I83", "", {tab: b}, {page: "Main", role: "Display"});
                    break;
                case "Tools":
                    e("T01", "", {tab: b}), e("", "T05")
            }
        } else {
            switch (AGO.App.page) {
                case "resources":
                case "station":
                case "research":
                    e("B11", "", {tab: "Settings"}, {page: "Page", role: "Display"});
                    e("B12", "", {tab: "Settings"}, {page: "Page", role: "Display"}, !AGO.Option.is("B11"), "indent");
                    break;
                case "shipyard":
                case "defense":
                    e("B11", "", {tab: "Settings"}, {page: "Page", role: "Display"});
                    break;
                case "fleet2":
                    e("F16");
                    break;
                case "fleet3":
                    e("F18");
                    break;
                case "movement":
                    e("E14");
                    break;
                case "messages":
                    e("M51", "", "", {page: "Page", role: "toggleSpiohelper"}), e("M53"), f("M30", "M30", "", {
                                                                                                page: "Page",
                                                                                                role: "changeStatus"
                                                                                            }, {
                                                                                                0: " - ",
                                                                                                1: "M31",
                                                                                                2: "M32",
                                                                                                3: "M33",
                                                                                                4: "M34",
                                                                                                5: "M35"
                                                                                            }
                    )
            }
        }
        DOM.replaceChildren(DOM.getChildren(a, 1), d);
        d = g = null
    }, changeSetting: function (a) {
        var b;
        a && a.currentTarget && (b = DOM.getData(a.currentTarget, null, 2), OBJ.is(b.setting) && (a = "checkbox" !== a.currentTarget.type ? +a.currentTarget.value || 0 :
                                                                                                      a.currentTarget.checked ? 1 : 0, AGO.Option.set(b.setting.id, a, 2), OBJ.is(b.update) && AGO.Panel.Display(b.update), OBJ.is(b.message) && ("data"in b.message || (b.message.data = a
        ), AGO.Init.Messages(b.message.page, b.message.role, b.message.data)
        )
        )
        )
    }, createAccount: function (a, b, d) {
        var c, e;
        d && AGO.Option.set("I21", 0, 2);
        2 === AGO.Option.get("I21", 2) ? c = "account" : (c = AGO.Planets.GetId(d) || AGO.Planets.GetId("active"), AGO.Option.is("I22") && (e = AGO.Planets.Get(c, "moon", 6) || AGO.Planets.Get(c, "planet", 6)
        )
        );
        AGB.message("Panel", "ListAccount",
                    {planet: c, moon: e}, function (c) {
                var e, h, p, k, n, l, m, q, t, y;
                c && c.tab && (d && AGO.Option.set("I21", 0, 2), AGO.Panel.createSettings(a, b, d, "intern"), t = 2 === AGO.Option.get("I21", 2) ? "account" : AGO.Planets.GetId(d) || AGO.Planets.GetId("active"), y = "account" === t ? "account" : AGO.Planets.Get(t, AGO.Option.is("I22") ? "coords" : "coordstype", 6), e = document.createDocumentFragment(), h = DOM.appendTABLE(e, "ago_panel_overview", {width: AGO.Panel.innerWidth + "px"}, [
                                                                                                                                                                                                                                                                                                                                                                                            58,
                                                                                                                                                                                                                                                                                                                                                                                            AGO.Panel.innerWidth - 96,
                                                                                                                                                                                                                                                                                                                                                                                            38
                                                                                                                                                                                                                                                                                                                                                                                        ]
                ), AGO.Planets.iterate(1, function (a, d) {
                                           q = a.moon;
                                           m = d === t ? "ago_color_planet" : q === t ? "ago_color_moon" : "";
                                           p = DOM.appendTR(h, m, {tab: b, data: a.coordstype});
                                           m = 9 <= a.coords.length ? "ago_panel_overview_coords_small" : "ago_panel_overview_coords";
                                           DOM.appendTD(p, m, a.coords);
                                           DOM.appendTD(p, "ago_panel_overview_name", a.name);
                                           k = DOM.appendTD(p, "ago_panel_overview_status");
                                           DOM.appendSPAN(k).style.backgroundColor = c.statusColor[d] || "#6A0A0A";
                                           q && (DOM.setData(k, null, {
                                                                 tab: b,
                                                                 data: AGO.Planets.Data[q].coordstype
                                                             }
                                           ), DOM.appendSPAN(k).style.backgroundColor = c.statusColor[q] || "#6A0A0A",
                                               DOM.appendIMG(k, AGO.Planets.Data[q].img)
                                           )
                                       }
                ), n = AGO.Events.calculate("ownership"), l = n[y] ? n[y].own : null, n = n[y] ? n[y].neutral : null, l && AGO.Option.is("I24") && (AGO.Task.addResources(c.Units, l), AGO.Task.addShips(c.Units, l)
                ), n && AGO.Option.is("I26") && AGO.Task.addResources(c.Units, n), AGO.Panel.appendUnits(e, c.Units, "I27", !0, b, 3, 2), AGO.Panel.appendUnits(e, l, "I24", "I24", b, 2, 1, "ago_color_own"), AGO.Panel.appendUnits(e, n, "I26", "I26", b, 1, 0, "ago_color_neutral"), DOM.replaceChildren(DOM.getChildren(a, 2), e), e = h = p = k = null
                )
            }
        )
    },
    appendUnits: function (a, b, d, c, e, f, g, h) {
        function p(a, b, d, c, e) {
            a = DOM.appendLI(n, b, d, 10);
            0 < e ? DOM.appendSPAN(a, "ago_panel_content_value", c, 3) : (d = 0 > e ? "I0E" : "I0A", DOM.appendSPAN(a, {
                                                                                                                        "class": "tooltip ago_panel_content_value ago_panel_content_unavailable",
                                                                                                                        title: AGO.Label.get("I0B")
                                                                                                                    }, d, 10
            )
            );
            return a
        }

        function k(a, b, d, c) {
            for (var e in d) {
                if (b[e] || c) {
                    d = DOM.appendLI(a, "", e, 11), DOM.appendSPAN(d, "ago_panel_content_value", b[e], 2)
                }
            }
        }

        var n, l, m, q;
        if (b) {
            q = "string" === typeof c ? AGO.Option.is(c) : c;
            n = document.createElement("ul");
            n.className = "ago_panel_content";
            m = q ? "ago_panel_content_header" : "ago_panel_content_header ago_panel_content_disabled";
            m = h ? m + " " + h : m;
            f && (2 <= f || b.resources || b.timeShip
            ) && (l = p(n, m, d, b.resources, b.timeResource), "string" === typeof c && (DOM.setData(l, null, {
                                                                                                         setting: {id: c},
                                                                                                         update: {tab: e}
                                                                                                     }
            ), DOM.append(l, "input", {type: "checkbox"}, {display: "none"}, {change: AGO.Panel.changeSetting}, {checked: Boolean(q)})
            ), q && b.timeResource && (3 <= f || b.resources
            ) && k(n, b, AGO.Item.Resource, 3 <= f)
            );
            if (g && q) {
                if (2 <= g || b.shipsCivil) {
                    l = p(n, m,
                          "I28", b.shipsCivil, b.timeShip
                    ), b.shipsCivil && k(n, b, AGO.Item.ShipCivil);
                }
                if (2 <= g || b.shipsCombat) {
                    l = p(n, m, "I29", b.shipsCombat, b.timeShip), b.shipsCombat && k(n, b, AGO.Item.ShipCombat)
                }
            }
            l && a.appendChild(n)
        }
        n = l = null
    }, createFlights: function (a, b, d) {
        function c(a, b, d) {
            DOM.appendSPAN(a, OBJ.get(AGO.Styles.classFleet, d), b && b.fleets ? b.fleets : "\u2009\u2009")
        }

        var e, f, g, h, p, k, n, l, m, q;
        d && AGO.Option.set("I41", 0, 2);
        AGO.Panel.createSettings(a, b, d, "intern");
        e = document.createDocumentFragment();
        f = DOM.appendTABLE(e, "ago_panel_overview",
                            {width: AGO.Panel.innerWidth + "px"}, [58, AGO.Panel.innerWidth - 130, 72]
        );
        k = AGO.Events.calculate("flights");
        if (k.account) {
            if (q = 2 !== AGO.Option.get("I41", 2) && AGO.Option.is("I42"), d = k[d] ? d : "", m = 2 === AGO.Option.get("I41", 2) ? "account" : AGO.Planets.Get(d || "active", "coordstype", 6) || d, l = "account" === m ? "account" : q ? AGO.Task.cutCoords(m) : m, AGO.Planets.iterate(0, function (a) {
                                                                                                                                                                                                                                                                                               if (p = k[a.coordstype]) {
                                                                                                                                                                                                                                                                                                   n = l === a.coords || m === a.coordstype ? HTML.classType(a.type) : "", g = DOM.appendTR(f, n, {
                                                                                                                                                                                                                                                                                                                                                                                                tab: b,
                                                                                                                                                                                                                                                                                                                                                                                                data: a.coordstype
                                                                                                                                                                                                                                                                                                                                                                                            }
                                                                                                                                                                                                                                                                                                   ), n = 9 <= a.coords.length ?
                                                                                                                                                                                                                                                                                                          "ago_panel_overview_coords_small" : "ago_panel_overview_coords", h = DOM.appendTD(g, n, a.coords), n = m === a.coordstype ? "ago_panel_overview_name" : "ago_panel_overview_name ago_color_normal", h = DOM.appendTD(g, n), 3 === a.type && DOM.appendIMG(h, a.img, "11px"), DOM.appendTEXT(h, a.name), h = DOM.appendTD(g, "ago_panel_fleets"), c(h, p.hostile, 1), c(h, p.neutral, 2), c(h, p.back, 4), c(h, p.own, 3)
                                                                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                                                                           }
                ), l && k[l]) {
                if ("account" === l || q) {
                    g = DOM.append(e, "ul", "ago_panel_content"), h = DOM.appendLI(g, "ago_panel_content_header", "I47", 10), d = DOM.appendSPAN(h,
                                                                                                                                                 "ago_panel_content_value ago_panel_fleets"
                    ), c(d, k[l].hostile, 1), c(d, k[l].neutral, 2), c(d, k[l].back, 4), c(d, k[l].own, 3), c(d, k[l].friend, 5), c(d, k[l].enemy, 6);
                }
                AGO.Panel.appendUnits(e, k[l].own, "I24", !0, b, 2, 1, "ago_color_own");
                AGO.Panel.appendUnits(e, k[l].back, "I25", !0, b, 2, 1, "ago_color_reverse");
                AGO.Panel.appendUnits(e, k[l].neutral, "I26", !0, b, 1, 1, "ago_color_neutral");
                AGO.Panel.appendUnits(e, k[l].hostile, "I26", !0, b, 0, 1, "ago_color_hostile")
            }
        } else {
            g = DOM.appendTR(f), h = DOM.appendTD(g, {colspan: 3}), h.style.textAlign =
                                                                    "right", DOM.appendSPAN(h, {
                                                                                                "class": "tooltip ago_panel_content_unavailable",
                                                                                                title: AGO.Label.get("I0D")
                                                                                            }, "I0C", 10
            );
        }
        DOM.replaceChildren(DOM.getChildren(a, 2), e);
        e = f = g = h = d = null
    }, createConstruction: function (a, b, d, c) {
        function e(a) {
            var b;
            b = Math.max(a.level + a.increase, 200 > a.id ? 0 : 1);
            return (a = VAL.status(a.increase, -1 * a.range, 0, a.range)
                   ) ? b + "-" + (b + a
            ) : b || "0"
        }

        function f(a, b, d, c, e, f, g, p) {
            var l, n, m;
            m = {metal: 0, crystal: 0, deuterium: 0, resources: 0};
            for (n in AGO.Item.Resource) {
                if (0 < k[n] || !k.resources) {
                    m[n] = b ? +b[n] || 0 : 0, m.resources +=
                                               m[n];
                }
            }
            if (e || m.resources) {
                if (e = "string" === typeof c ? AGO.Option.is(c) : c, d && (l = e ? "ago_panel_content_header" : "ago_panel_content_header ago_panel_content_disabled", d = DOM.appendLI(a, p ? l + " " + p : l, d, 10), p = b && b.timeResource ? DOM.appendSPAN(d, "ago_panel_content_value", m.resources, 3) : DOM.appendSPAN(d, {
                                                                                                                                                                                                                                                                                                                                     "class": "tooltip ago_panel_content_value ago_panel_content_unavailable",
                                                                                                                                                                                                                                                                                                                                     title: AGO.Label.get("I0B")
                                                                                                                                                                                                                                                                                                                                 }, "I0A", 10
                    ), "string" === typeof c && (DOM.setData(d, null, {
                                                                 setting: {id: c},
                                                                 update: {tab: "Construction"}
                                                             }
                    ), DOM.append(p, "input",
                                  {type: "checkbox"}, {display: "none"}, {change: AGO.Panel.changeSetting}, {checked: Boolean(e)}
                    )
                    )
                    ), m && m.resources && e && b.timeResource) {
                    for (n in AGO.Item.Resource) {
                        m[n] && (e && f && (h[n] = Math.max(h[n] - (m[n] || 0
                                                            ), 0
                        )
                        ), l = e ? "" : "ago_panel_content_disabled", d = DOM.appendLI(a, l, n, 11), l = g ? 0 < h[n] ? "ago_panel_content_value ago_color_palered" : "ago_panel_content_value ago_color_lightgreen" : "ago_panel_content_value", DOM.appendSPAN(d, l, m[n], 2)
                        )
                    }
                }
            }
        }

        var g, h, p, k, n, l, m, q, t;
        AGO.Panel.createSettings(a, b, "", "intern");
        k = {
            metal: 0, crystal: 0,
            deuterium: 0, resources: 0, count: 0
        };
        AGO.Task.updateCoordsType(k, d);
        n = OBJ.create(k);
        p = OBJ.create(k);
        p.routine = 2;
        q = AGO.Option.is("I31");
        t = AGO.Option.is("I35");
        l = k.coordstype;
        m = AGO.Option.is("I32") ? k.coords : l;
        c = {active: AGO.Acc.planetId};
        t ? c.planet = "account" : (c.planet = AGO.Planets.GetId(l), AGO.Option.is("I32") && (c.moon = AGO.Planets.Get(c.planet, "moon", 6) || AGO.Planets.Get(c.planet, "planet", 6)
        )
        );
        AGB.message("Construction", "List", c, function (c) {
                        var w, s, u, A, D, x, r, F, v, B, z, C, E;
                        c = c || {};
                        E = c.list || {};
                        w = document.createDocumentFragment();
                        s = DOM.appendTABLE(w, "ago_panel_overview", {width: AGO.Panel.innerWidth + "px"}, [
                                                58,
                                                AGO.Panel.innerWidth - 96,
                                                38
                                            ]
                        );
                        AGO.Planets.iterate(0, function (a) {
                                                z = a.coordstype;
                                                if (OBJ.is(E[z])) {
                                                    for (C = 0; C < E[z].length; C++) {
                                                        if (v = "", r = E[z][C]) {
                                                            if (m === a.coords || l === a.coordstype) {
                                                                if (d === a.coordstype + ":" + C && (r.selected = 1, OBJ.copy({
                                                                                                                                  id: r.id,
                                                                                                                                  level: r.level,
                                                                                                                                  increase: r.increase,
                                                                                                                                  range: r.range,
                                                                                                                                  reserved: r.reserved
                                                                                                                              }, k
                                                                    )
                                                                    ), OBJ.iterate(AGO.Item.Resource, function (a) {
                                                                                       if (r[a]) {
                                                                                           if (r.reserved) {
                                                                                               n[a] += r[a], r.selected && !q && (k[a] = r[a]
                                                                                               );
                                                                                           } else if (r.selected ||
                                                                                                      q) {
                                                                                               k[a] += r[a]
                                                                                           }
                                                                                       }
                                                                                   }
                                                                    ), v = r.reserved ? "ago_color_reserved" : "", r.selected || q) {
                                                                    k.count++, v = v || HTML.classType(a.type);
                                                                }
                                                            }
                                                            u = DOM.appendTR(s, v, {
                                                                                 tab: b,
                                                                                 data: a.coordstype + ":" + C
                                                                             }
                                                            );
                                                            A = DOM.appendTD(u, "ago_panel_overview_coords", a.coords);
                                                            v = r.selected ? "ago_panel_overview_name" : "ago_panel_overview_name ago_color_normal";
                                                            A = DOM.appendTD(u, v);
                                                            3 === a.type && DOM.appendIMG(A, HTML.urlTypeIcon(3), "11px");
                                                            DOM.appendTEXT(A, r.id, 11);
                                                            v = 200 > r.id ? "ago_panel_overview_count " + HTML.classStatus(r.increase) : "ago_panel_overview_count ago_color_normal";
                                                            A = DOM.appendTD(u, v);
                                                            r.reserved && (B = 0 > r.increase ? "icon_reserved_red.gif" : "icon_reserved.gif", DOM.appendIMG(A, HTML.urlImage(B), "11px")
                                                            );
                                                            DOM.appendTEXT(A, e(r))
                                                        }
                                                    }
                                                }
                                            }
                        );
                        k.count && (AGO.Task.updateResources(k), AGO.Task.updateResources(n), h = OBJ.create(k), s = DOM.append(w, "ul", "ago_panel_content"), v = k.reserved ? "ago_panel_content_action ago_panel_content_reserved" : "ago_panel_content_action", u = DOM.appendLI(s, v), v = 0 > k.increase ? "ago_icon_reserved_red" : "ago_icon_reserved", DOM.appendA(u, v, null, {
                                                                                                                                                                                                                                                                                                                                                                                action: {
                                                                                                                                                                                                                                                                                                                                                                                    action: "reserve",
                                                                                                                                                                                                                                                                                                                                                                                    tab: b,
                                                                                                                                                                                                                                                                                                                                                                                    value: d
                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                                                                            }
                        ), DOM.appendA(u, "icon icon_skip_back", null, {
                                           action: {
                                               action: "decreaseRange",
                                               tab: b,
                                               value: d
                                           }
                                       }
                        ), DOM.appendA(u, "icon icon_rewind", null, {
                                           action: {
                                               action: "decrease",
                                               tab: b,
                                               value: d
                                           }
                                       }
                        ), v = 200 > k.id ? HTML.classStatus(k.increase) : "ago_color_normal", DOM.appendSPAN(u, v, e(k)), DOM.appendA(u, "icon icon_fastforward", null, {
                                                                                                                                           action: {
                                                                                                                                               action: "increase",
                                                                                                                                               tab: b,
                                                                                                                                               value: d
                                                                                                                                           }
                                                                                                                                       }
                        ), DOM.appendA(u, "icon icon_skip", null, {
                                           action: {
                                               action: "increaseRange",
                                               tab: b,
                                               value: d
                                           }
                                       }
                        ), DOM.appendA(u, "icon icon_delete", null, {
                                           action: {
                                               action: "remove",
                                               tab: b, value: d
                                           }
                                       }
                        ), F = 1 < k.count ? "I3B" : k.reserved ? "I37" : "I3A", f(s, k, F, !0, "always"), t && (s = DOM.append(w, "ul", "ago_panel_content"), DOM.appendLI(s, "ago_panel_content_action", "Account")
                        ), x = c.Units || {}, f(s, x, "I23", "I33", "always", "reduce", "colorize", "ago_color_stationed"), g = AGO.Events.calculate("ownership"), z = t ? "account" : m, x = g[z] && OBJ.is(g[z].own) ? g[z].own : {}, x.timeResource = g.account ? 1 : 0, f(s, x, "I24", "I34", "", "reduce", "colorize", "ago_color_own"), x = g[z] && OBJ.is(g[z].neutral) ? g[z].neutral : {}, x.timeResource = g.account ?
                                                                                                                                                                                                                                                                                                                                                                                                                     1 : 0, f(s, x, "I26", "I36", "", "reduce", "colorize", "ago_color_neutral"), f(s, n, "I37", "I37", "", "reduce", "colorize", "ago_color_reserved"), l === AGO.Acc.coordstype || t || (s = DOM.append(w, "ul", "ago_panel_content"), x = c.Active || {}, AGO.Option.is("I38") && (p.mode = !0, OBJ.iterate(AGO.Item.Resource, function (a) {
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   p[a] = Math.max(Math.min(h[a], x[a]), 0);
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   p.resources += p[a]
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               }
                        )
                        ), f(s, x, "I38", "I38", "always", "reduce", "colorize"), v = p.mode ? "ago_panel_content_header" : "ago_panel_content_header ago_panel_content_disabled", u = DOM.appendLI(s,
                                                                                                                                                                                                    v
                        ), B = AGO.Uni.path + "fleet1", OBJ.iterateFilter(p, function (a) {
                                                                              B += STR.addParameter(a, p[a])
                                                                          }, "galaxy system position type metal crystal deuterium routine".split(" ")
                        ), D = DOM.appendA(u, {
                                               "class": "btn_blue",
                                               href: B
                                           }, null, null, !p.mode
                        ), DOM.appendTEXT(D, "F60", 10), DOM.appendSPAN(u, "ago_panel_content_value", p.resources, 2), f(s, p, "", p.mode, "always", "", "colorize")
                        ), q && k.resources || !k.reserved
                        ) && (s = DOM.append(w, "ul", "ago_panel_content"), f(s, h, "I39", !0, "always", "", "colorize"), AGO.Task.updateResources(h), h.resources &&
                                                                                                                                                       (DOM.appendLI(s), x = {
                                                                                                                                                           202: 0,
                                                                                                                                                           203: 0,
                                                                                                                                                           209: 0,
                                                                                                                                                           214: 0
                                                                                                                                                       }, OBJ.iterate(x, function (a) {
                                                                                                                                                                          r = {action: 10};
                                                                                                                                                                          r[a] = Math.ceil(h.resources / AGO.Item[a].capacity);
                                                                                                                                                                          u = DOM.appendLI(s, {
                                                                                                                                                                                               "ago-data": JSON.stringify({
                                                                                                                                                                                                                              message: {
                                                                                                                                                                                                                                  page: ["Fleet1"],
                                                                                                                                                                                                                                  role: "Action",
                                                                                                                                                                                                                                  data: r
                                                                                                                                                                                                                              }
                                                                                                                                                                                                                          }
                                                                                                                                                                                               )
                                                                                                                                                                                           }, a, 11
                                                                                                                                                                          );
                                                                                                                                                                          D = DOM.appendSPAN(u, "ago_panel_content_value", r[a], 2)
                                                                                                                                                                      }
                                                                                                                                                       )
                                                                                                                                                       )
                        );
                        DOM.replaceChildren(DOM.getChildren(a, 2), w);
                        w = s = u = A = D = null
                    }
        )
    }, createAlliance: function (a, b, d, c) {
        function e(b) {
            var d, c, e;
            b && b.tab && (e = AGO.Panel.GetActive("Alliance", "id", 6), d = document.createDocumentFragment(), c =
                                                                                                                AGO.Panel.appendTable(d), AGO.Panel.appendToken(c, "Alliance", b.token, b.listTab), c = AGO.Panel.appendTable(d), AGO.Panel.appendAlliance(c, "Alliance", b.token, e, b.listToken), DOM.replaceChildren(DOM.getChildren(a, 2), d)
            )
        }

        OBJ.get(c, "tab") === b ? e(c) : AGB.message("Token", "List", {tab: b, token: +d || 0}, e)
    }, createPlayer: function (a, b, d, c) {
        function e(b) {
            var d, c, e;
            b && b.tab && (e = AGO.Panel.GetActive("Player", "id", 6), d = document.createDocumentFragment(), c = AGO.Panel.appendTable(d), AGO.Panel.appendToken(c, b.tab, b.token, b.listTab),
                c = AGO.Panel.appendTable(d), AGO.Panel.appendPlayer(c, b.token, e, b.listToken), DOM.replaceChildren(DOM.getChildren(a, 2), d)
            )
        }

        "Player" === OBJ.get(c, "tab") ? e(c) : AGB.message("Token", "List", {
                                                                tab: "Player",
                                                                token: AGO.Panel.Get("Player", "data")
                                                            }, e
        )
    }, createTarget: function (a, b, d, c) {
        function e(b) {
            var d, c, e;
            b && b.tab && (e = AGO.Panel.GetActive("Target", "id", 6), d = document.createDocumentFragment(), c = AGO.Panel.appendTable(d), AGO.Panel.appendToken(c, "Target", b.token, b.listTab), c = AGO.Panel.appendTable(d), AGO.Panel.appendTarget(c,
                                                                                                                                                                                                                                                         b.token, e, b.listToken
            ), DOM.replaceChildren(DOM.getChildren(a, 2), d)
            )
        }

        var f, g, h;
        AGO.Panel.createSettings(a, b, "", "intern");
        (f = DOM.getChildren(a, 3)
        ) && 0 === DOM.hasChildren(f) && (g = DOM.appendTABLE(null, "ago_panel_settings", {width: AGO.Panel.innerWidth + "px"}), h = DOM.appendTR(g), h = DOM.appendTD(h), DOM.append(h, "textarea", {
                                                                                                                                                                                          id: "ago_panel_textparser",
                                                                                                                                                                                          "class": "markItUpEditor"
                                                                                                                                                                                      }, null, {
                                                                                                                                                                                          dblclick: AGO.Panel.parseTarget,
                                                                                                                                                                                          blur: AGO.Panel.parseTarget
                                                                                                                                                                                      }
        ), f.appendChild(g)
        );
        OBJ.get(c, "tab") === b ? e(c) : AGB.message("Token", "List", {
                                                         tab: b,
                                                         token: +d || 0, sort: AGO.Option.get("I84")
                                                     }, e
        )
    }, appendToken: function (a, b, d, c) {
        var e;
        OBJ.iterate(c, function (f) {
                        var g, h;
                        80 < f && !e && (e = !0, g = DOM.appendTR(a, {colspan: 3}), DOM.append(g, "TD", null, {
                                                                                                   height: "10px",
                                                                                                   lineHeight: "10px"
                                                                                               }
                        )
                        );
                        0 < c[f] && (h = +f === d ? HTML.classType(1) : "", g = {
                            tab: b,
                            data: f
                        }, g = DOM.appendTR(a, h, g), DOM.appendTD(g, "ago_panel_overview_coords"), DOM.appendTD(g, "ago_panel_overview_name " + AGO.Token.getClass(f), AGO.Token.getLabel(f)), DOM.appendTD(g, "ago_panel_overview_count", Math.max(c[f], 0))
                        )
                    }
        );
        2 > DOM.hasChildren(a) &&
        DOM.setStyleDisplay(a)
    }, appendAlliance: function (a, b, d, c, e) {
        var f;
        f = DOM.appendTR(a);
        DOM.appendTD(f, "ago_panel_overview_coords");
        DOM.appendTD(f, "ago_panel_overview_name", "\u2207");
        f = DOM.appendTD(f, "ago_panel_overview_count");
        DOM.appendA(f, "icon icon_delete", "", {action: {action: "icon", tab: "Alliance", icon: "remove"}});
        OBJ.iterateArray(e, function (e) {
                             if (OBJ.is(e)) {
                                 var f, p;
                                 p = c === e.id ? HTML.classType(1) : "";
                                 f = {action: {action: "toggle", tab: b, token: d, id: e.id}};
                                 f = DOM.appendTR(a, p, f);
                                 DOM.appendTD(f, "ago_panel_overview_coords");
                                 DOM.appendTD(f, "ago_panel_overview_name", e.name || e.id);
                                 p = DOM.appendTD(f, "ago_panel_overview_count");
                                 "remove" === AGO.Panel.Get("Alliance", "icon", 6) && (f = {
                                     message: {
                                         page: "Token",
                                         role: "Action",
                                         data: {action: "remove", tab: "Alliance", token: d, id: e.id}
                                     }
                                 }, DOM.appendA(p, "icon icon_delete", "", f)
                                 )
                             }
                         }
        );
        2 > DOM.hasChildren(a) && DOM.setStyleDisplay(a)
    }, appendPlayer: function (a, b, d, c) {
        var e;
        e = DOM.appendTR(a);
        DOM.appendTD(e, "ago_panel_overview_coords");
        DOM.appendTD(e, "ago_panel_overview_name", "\u2207");
        e = DOM.appendTD(e, "ago_panel_overview_count");
        DOM.appendA(e, "icon icon_delete", "", {action: {action: "icon", tab: "Player", icon: "remove"}});
        OBJ.iterateArray(c, function (c) {
                             if (OBJ.is(c)) {
                                 var e, h;
                                 h = d === c.id ? HTML.classType(1) : "";
                                 e = {action: {action: "toggle", tab: "Player", token: b, id: c.id}};
                                 e = DOM.appendTR(a, h, e);
                                 DOM.appendTD(e, "ago_panel_overview_coords");
                                 DOM.appendTD(e, "ago_panel_overview_name", c.name || c.id);
                                 h = DOM.appendTD(e, "ago_panel_overview_count");
                                 "remove" === AGO.Panel.Get("Player", "icon", 6) && (e = {
                                     message: {
                                         page: "Token", role: "Action", data: {
                                             action: "remove",
                                             tab: "Player", token: b, id: c.id
                                         }
                                     }
                                 }, DOM.appendA(h, "icon icon_delete", "", e)
                                 )
                             }
                         }
        );
        2 > DOM.hasChildren(a) && DOM.setStyleDisplay(a)
    }, appendTable: function (a) {
        return DOM.appendTABLE(a, "ago_panel_overview", {width: AGO.Panel.innerWidth + "px"}, [
                                   60,
                                   AGO.Panel.innerWidth - 85,
                                   25
                               ]
        )
    }, appendTarget: function (a, b, d, c) {
        var e, f, g, h;
        h = AGO.Option.get("I84", 2);
        g = AGO.Option.get("I85", 2);
        2 === h && 10 > g && (h = 1
        );
        e = DOM.appendTR(a);
        f = DOM.appendTD(e, "ago_panel_overview_coords", ["", "\u2207", "\u2207 " + g][h]);
        DOM.setData(f, null, {
                        action: {
                            action: "sort",
                            tab: "Target", value: 1 === h ? 2 : 1
                        }
                    }
        );
        f = DOM.appendTD(e, "ago_panel_overview_name", h ? "" : "\u2207");
        DOM.setData(f, null, {action: {action: "sort", tab: "Target", value: 0}});
        f = DOM.appendTD(e, "ago_panel_overview_count");
        DOM.appendA(f, "icon icon_delete", "", {action: {action: "icon", tab: "Target", icon: "remove"}});
        OBJ.iterateArray(c, function (c) {
                             if (OBJ.is(c)) {
                                 var e, f, l;
                                 l = STR.check(c.coords).split(":");
                                 if (2 > h || AGO.Acc.galaxy === +l[0] && NMR.isMinMax(+l[1], AGO.Acc.system - g, AGO.Acc.system + g)) {
                                     l = +l[3] || 1, f = d === c.id ? HTML.classType(l) :
                                                         "", e = {
                                         tab: "Target",
                                         data: b,
                                         action: {action: "toggle", tab: "Target", token: b, id: c.id}
                                     }, e = DOM.appendTR(a, f, e), DOM.appendTD(e, "ago_panel_overview_coords", AGO.Task.cutCoords(c.coords)), f = DOM.appendTD(e, "ago_panel_overview_name"), 1 < l && DOM.appendIMG(f, HTML.urlTypeIcon(l), "11px"), c.time ? DOM.appendTEXT(f, c.time, 17) : DOM.appendTEXT(f, c.name), f = DOM.appendTD(e, "ago_panel_overview_count"), "remove" === AGO.Panel.Get("Target", "icon", 6) && (e = {
                                         message: {
                                             page: "Token", role: "Action", data: {
                                                 action: "remove", tab: "Target", token: b,
                                                 id: c.id
                                             }
                                         }
                                     }, DOM.appendA(f, "icon icon_delete", "", e)
                                     )
                                 }
                             }
                         }
        );
        2 > DOM.hasChildren(a) && DOM.setStyleDisplay(a)
    }, parseTarget: function (a) {
        a && a.target && ("dblclick" === a.type ? a.target.value = "" : (a = AGO.Task.parseTarget(a.target.value), (a.coords || a.time
                                                                                                                   ) && AGO.Token.Action({
                                                                                                                                             action: "set",
                                                                                                                                             tab: "Target",
                                                                                                                                             coords: a.coordstype || a.coords,
                                                                                                                                             time: a.time,
                                                                                                                                             token: 81,
                                                                                                                                             marked: 1
                                                                                                                                         }
        )
        )
        )
    }, createTools: function (a, b) {
        var d, c, e, f, g, h, p;
        if (AGO.Option.is("T00")) {
            AGO.Panel.createSettings(a, b, "", "intern");
            d = document.createDocumentFragment();
            for (h = 1; 9 >=
                        h; h++) {
                c = document.createElement("ul");
                c.className = "ago_panel_links";
                DOM.appendLI(c, "ago_panel_links_header", "T" + h + "0", 10);
                for (p = 0; p < AGO.Tools.List.length; p++) {
                    g = "T" + h + AGO.Tools.List[p], AGO.Option.is(g) && (e = DOM.appendLI(c), f = {
                        message: {
                            page: "Tools",
                            role: "Action",
                            data: {tab: "Player", id: g}
                        }
                    }, DOM.appendA(e, "", null, f).textContent = AGO.Option.getPair(g)[0] || AGO.Label.get(g)
                    );
                }
                1 < DOM.hasChildren(c) && d.appendChild(c)
            }
            DOM.replaceChildren(DOM.getChildren(a, 2), d)
        }
    }, Action: function (a) {
        var b, d;
        b = OBJ.get(a, "tab");
        "Construction" ===
        b ? AGB.message("Construction", "Action", {
                            action: a.action,
                            value: a.value,
                            coords: AGO.Acc.coordstype
                        }, AGO.Panel.Display
        ) : VAL.check(b, "Alliance", "Player", "Target") && ("sort" === a.action ? (AGO.Option.set("I84", a.value, 2), AGO.Panel.Display()
        ) : "icon" === a.action ? (a.icon = AGO.Panel.Get(b, "icon", 6) === a.icon ? "" : a.icon, AGO.Panel.set(b, "icon", a.icon, !0), AGO.Init.Messages("Main", "Display"), AGO.Panel.Display()
        ) : 2 === a.marked || a.marked && !AGO.Option.is("I82") ? AGO.Panel.Display({
                                                                                        tab: b,
                                                                                        data: a.token
                                                                                    }
        ) : ("toggle" === a.action &&
             (a.action = AGO.Panel.GetActive(b, "id", 6) === a.id ? "deselect" : "select", "Target" === b && VAL.check(AGO.App.page, "fleet1", "fleet2") && (a.action = "select"
             )
             ), d = VAL.check(a.action, "remove", "deselect") ? "" : a.id, AGB.message("Token", "Get", {
                                                                                           tab: b,
                                                                                           token: a.token,
                                                                                           id: d
                                                                                       }, function (c) {
                                                                                           var d;
                                                                                           AGO.Panel.set(b, "active", c);
                                                                                           AGO.Panel.Display({
                                                                                                                 tab: b,
                                                                                                                 data: a.token
                                                                                                             }
                                                                                           );
                                                                                           d = {arrival: +OBJ.get(c, "time") || 0};
                                                                                           AGO.Task.updateCoordsType(d, OBJ.get(c, "coords"));
                                                                                           OBJ.copy(d, a);
                                                                                           "Player" === b ? AGO.Init.Messages("Box", "Action", {tab: b}) : "Target" === b && (AGO.Init.Messages("Main",
                                                                                                                                                                                                "Display"
                                                                                           ), AGO.Init.Messages([
                                                                                                                    "Fleet1",
                                                                                                                    "Fleet2",
                                                                                                                    "Fleet3"
                                                                                                                ], "Action", d
                                                                                           )
                                                                                           );
                                                                                           AGO.Init.Messages(["Galaxy"], "Action", a)
                                                                                       }
        )
            )
        )
    }, click: function (a) {
        var b;
        if (a && a.target) {
            b = DOM.getData(a.target, null, 2);
            if (AGO.Panel.updateDisplayLock || a.target.hasAttribute("disabled")) {
                return a.stopPropagation(), a.preventDefault(), !1;
            }
            OBJ.is(b.setting) ? "INPUT" !== a.target.nodeName && DOM.click("input", "LI" === a.target.nodeName ? a.target : a.target.parentNode) : (OBJ.is(b.message) && ("Tools" === b.message.page && OBJ.set(b.message.data, "shiftKeys",
                                                                                                                                                                                                                a.shiftKey || a.ctrlKey
            ), AGO.Init.Messages(b.message.page, b.message.role, b.message.data)
            ), OBJ.is(b.action) ? AGO.Panel.Action(b.action) : OBJ.is(b.update) ? AGO.Panel.Display(b.update) : b.tab && AGO.Panel.Display(b), "ago_panel_button" === a.target.id || "ago_panel_arrow" === a.target.className ? (a = DOM.getAttribute("ago_panel_button", "id", "ago_display_status", 2), 2 <= a ? AGO.Panel.panelInactive(!0) : AGO.Panel.panelActive(3)
            ) : AGO.Panel.panelActive(2)
            )
        }
    }, hover: function (a) {
        var b;
        a && a.target && (b = AGO.Panel.hoverStatus, AGO.Panel.mouseStatus =
                                                     "mouseover" === a.type, AGO.Panel.mouseStatus && (!AGO.Option.is("I02") && VAL.check("ago_panel_button", a.target.id, a.target.parentNode.id) || AGO.Panel.panelActive(1), AGO.Panel.hoverStatus = 2 > AGO.Panel.displayStatus ? 1 : "ago_panel_button" === a.target.id || "ago_panel_arrow" === a.target.className ? 1 : 0
        ), b !== AGO.Panel.hoverStatus && DOM.updateAttribute("ago_panel_button", "id", "ago_hover_status", b, 8)
        )
    }, hoverExtern: function (a) {
        AGO.Panel.enabled && 2 <= AGO.Panel.displayStatus && (AGO.Panel.mouseStatus = Boolean(a)
        )
    }, panelActive: function (a) {
        AGO.Panel.displayStatus =
        AGO.Panel.displayStatus || DOM.getAttribute("ago_panel_button", "id", "ago_display_status", 2);
        AGO.Panel.enabled && AGO.Panel.displayStatus < a && (0 >= AGO.Panel.mouseCount && window.setTimeout(AGO.Panel.panelInactive, 500), AGO.Panel.mouseCount = 5, AGO.Panel.displayStatus = a, AGO.Panel.slideLeft = -(Math.ceil(Math.max((+document.body.clientWidth || 0
                                                                                                                                                                                                                                             ) - 1E3, 2
                                                                                                                                                                                                                                    ) / 2
        ) - 1
        ), 2 <= a && AGO.Panel.left < AGO.Panel.slideLeft && DOM.updateStyle("ago_panel", "id", "left", AGO.Panel.slideLeft + "px"), DOM.updateAttribute("ago_panel_button", "id", "ago_display_status",
                                                                                                                                                         NMR.minMax(a, 0, 2), 8
        )
        )
    }, panelInactive: function (a) {
        AGO.Panel.enabled && (AGO.Panel.mouseStatus || AGO.Panel.mouseCount--, a || 0 >= AGO.Panel.mouseCount && 3 > AGO.Panel.displayStatus ? (AGO.Panel.displayStatus = 0, DOM.updateAttribute("ago_panel_button", "id", "ago_display_status", 0, 8), DOM.updateStyle("ago_panel", "id", "left", AGO.Panel.left + "px")
        ) : 3 > AGO.Panel.displayStatus && window.setTimeout(AGO.Panel.panelInactive, 500)
        )
    }
};
AGO.Box = {
    Data: {}, Messages: function (a, b) {
        "Action" === a && AGO.Box.Action(b)
    }, Init: function (a, b) {
        AGO.Box.enabled = !0;
        AGO.Box.Data = OBJ.is(a) ? a : {};
        b && AGO.Box.Display()
    }, Run: function () {
        var a;
        a = AGO.Panel.Get("Box", "data", 6);
        AGO.Box.enabled && a && (OBJ.get(AGO.Box.Data.Cache, "tab") ? AGO.Box.Show(AGO.Box.Data.Cache) : AGO.Box.Display()
        )
    }, Show: function (a) {
        var b, d, c, e, f, g;
        if (a && a.playerName && Array.isArray(a.planets)) {
            d = document.createDocumentFragment();
            for (b = 0; b < a.planets.length; b++) {
                if (e = a.planets[b]) {
                    f = AGO.Task.splitCoords(e.coords),
                        f.tab = "Target", f.id = e.coords, f.type = 1, f.action = "set", g = "&galaxy=" + f.galaxy + "&system=" + f.system + "&position=" + f.position, c = e.planetId === a.planetHome ? "ago_box_homeplanet" : "", c = DOM.appendDIV(d, c), "galaxy" === AGO.App.page ? DOM.appendA(c, null, null, {
                                                                                                                                                                                                                                                                                                          message: {
                                                                                                                                                                                                                                                                                                              page: "Page",
                                                                                                                                                                                                                                                                                                              role: "Action",
                                                                                                                                                                                                                                                                                                              data: f
                                                                                                                                                                                                                                                                                                          }
                                                                                                                                                                                                                                                                                                      }
                    ).textContent = e.coords : DOM.appendA(c, {href: "index.php?page=galaxy" + g}).textContent = e.coords, VAL.check(AGO.App.page, "fleet1", "fleet2", "fleet3") ? (DOM.appendA(c, null, null, {
                                                                                                                                                                                                    message: {
                                                                                                                                                                                                        page: "Page",
                                                                                                                                                                                                        role: "Action",
                                                                                                                                                                                                        data: f
                                                                                                                                                                                                    }
                                                                                                                                                                                                }
                    ).textContent =
                                                                                                                                                                                    e.planetName, e.moonId && (f.type = 3, c = DOM.appendA(c, null, null, {
                                                                                                                                                                                                                                               message: {
                                                                                                                                                                                                                                                   page: "Page",
                                                                                                                                                                                                                                                   role: "Action",
                                                                                                                                                                                                                                                   data: f
                                                                                                                                                                                                                                               }
                                                                                                                                                                                                                                           }
                    ), DOM.appendIMG(c, HTML.urlTypeIcon(3, "a"), "14px")
                    )
                    ) : (DOM.appendA(c, {href: "index.php?page=fleet1" + g + "&type=1"}).textContent = e.planetName, e.moonId && (c = DOM.appendA(c, {href: "index.php?page=fleet1" + g + "&type=3"}), DOM.appendIMG(c, HTML.urlTypeIcon(3, "a"), "14px")
                    )
                                                                                                                           );
                }
            }
            e = a.playerName + "|Planets: " + a.planets.length + "<BR>";
            (b = document.getElementById("ago_box")
            ) ? (DOM.setAttribute("ago_box_title", "id", "title", e),
                DOM.setText("ago_box_title", "id", a.playerName), DOM.replaceChildren(document.getElementById("ago_box_content"), d), DOM.setStyleDisplay(b, null, "block")
            ) : d && (b = DOM.appendDIV(null, {
                                            "class": "ago_box",
                                            id: "ago_box"
                                        }, {fontSize: "9px"}
            ), c = DOM.appendDIV(b, {id: "ago_box_header"}), DOM.appendA(c, "ago_box_icon22 galaxy highlighted", {click: AGO.Box.clickGalaxy}), DOM.appendA(c, "ago_box_icon22 galaxy highlighted", null, {task: "home"}), DOM.appendSPAN(c, {
                                                                                                                                                                                                                                              id: "ago_box_title",
                                                                                                                                                                                                                                              "class": "tooltipHTML",
                                                                                                                                                                                                                                              title: e
                                                                                                                                                                                                                                          }, a.playerName
            ), DOM.appendA(c,
                           "ago_icon_close", null, {action: {action: "remove"}}
            ), c = DOM.appendDIV(b, {id: "ago_box_content"}), c.appendChild(d), DOM.appendChild(document.getElementById("toolLinksWrapper"), b), DOM.addEvents("ago_box", "id", {click: AGO.Box.click})
            )
        } else {
            DOM.setStyleDisplay("ago_box", "id")
        }
    }, Display: function () {
        var a, b;
        a = AGO.Panel.Get("Box", "data", 6);
        b = AGO.Panel.GetActive(a, "id", 6);
        "Player" === a && b ? AGB.message("Box", "List", {tab: a, id: b, planets: 1}, AGO.Box.Show) : AGO.Box.Show()
    }, click: function (a) {
        a && a.target && (a = DOM.getData(a.target,
                                          null, 2
        ), "home" === a.task && DOM.click("#ago_box_content .ago_box_homeplanet a:first-child"), OBJ.is(a.action) && AGO.Box.Action(a.action), OBJ.is(a.message) && AGO.Init.Messages(a.message.page, a.message.role, a.message.data)
        )
    }, Action: function (a) {
        AGO.Box.enabled && OBJ.is(a) && ("remove" === a.action && (AGB.message("Box", "List", {tab: a.tab}), a.tab = ""
        ), AGO.Panel.set("Box", "data", a.tab), AGO.Box.Display()
        )
    }
};
AGO.Events = {
    status: 0, included: !1, Messages: function (a, b) {
        "highlight" === a && AGO.Events.displayHighlight(b)
    }, Run: function () {
        var a, b;
        AGO.Events.status = 1;
        AGO.Option.is("E30") && (AGO.Events.enabled = !0, AGO.Events.improve = AGO.Option.is("E31"), AGO.Events.modeAbbreviation = AGO.Option.is("E32"), AGO.Events.modeColorMissions = AGO.Option.is("CM0")
        );
        if (a = document.getElementById("eventboxContent")) {
            AGO.Events.included = Boolean(document.getElementById("eventListWrap")), AGO.Events.enabled && (b = !AGO.Events.included && 5 > AGO.Events.modeBehavior ?
                                                                                                                " ago_eventlist_hide" : "", DOM.extendClass(a, null, "ago" + b), b = AGO.Events.modeBehavior ? VAL.check(AGO.Events.modeBehavior, 2, 4, 6, 8) ? 3 : AGO.Option.is("E34") ? 2 : 1 : AGO.Events.included ? 1 : 0, a.setAttribute("ago_display_status", b), AGO.Events.modeBehavior && (DOM.getChildren(a.parentNode, 0) === a ? AGO.Events.modeBehaviorAbove || a.parentNode.appendChild(a) : AGO.Events.modeBehaviorAbove && DOM.prependChild(a.parentNode, a), AGO.Styles.set("#eventboxContent:not(:first-child), #eventboxContent:first-child { display: inherit; }")
            )
            ),
            AGO.Events.included && AGO.Events.Content()
        }
    }, Ready: function () {
        AGO.Events.enabled && AGO.Events.modeBehavior && 5 > AGO.Events.modeBehavior && (DOM.setStyleDisplay("eventboxContent", "id"), AGO.Styles.set("#eventboxContent, #eventboxContent #eventListWrap { display: block; }")
        )
    }, Content: function () {
        var a, b, d, c, e, f, g, h;
        e = 1;
        AGO.Events.eData = {};
        AGO.Events.last = 0;
        a = document.getElementById("eventboxContent");
        b = document.getElementById("eventListWrap");
        if (AGO.Events.status && a && b && DOM.updateAttribute(b, null, "ago-status",
                                                               1, 8
            )) {
            AGO.Events.status = 2;
            AGO.Events.enabled && (DOM.removeClass(a, null, "ago_eventlist_hide"), a = b.querySelector("#eventHeader")
            ) && (c = document.createDocumentFragment(), d = DOM.appendA(c, null, {
                                                                             click: function () {
                                                                                 AGO.Global.message({role: "reloadEvents"})
                                                                             }
                                                                         }
            ), d = DOM.appendSPAN(d, "icon icon_reload ago_eventlist_reload"), AGO.Events.improve && (DOM.appendSPAN(c, "ago_display_arrow"), a.addEventListener("click", AGO.Events.toggleEvents, !1)
            ), DOM.prependChild(a, c)
            );
            a = b.querySelectorAll("table#eventContent > tbody > tr");
            for (d = 0; d < a.length; d++) {
                c = NMR.parseIntAbs(a[d].getAttribute("data-mission-type")), HTML.hasClass(a[d].className, "allianceAttack") ? (g = STR.check(NMR.parseIntAbs(a[d].className)), f = "F" + g, h = 1
                ) : HTML.hasClass(a[d].className, "partnerInfo") ? (g = STR.check(NMR.parseIntAbs(a[d].className)), f = DOM.getAttribute(".icon_movement span", a[d], "data-federation-user-id", 7), h = g === f ? 2 : 3
                ) : (h = g = 0, f = STR.check(NMR.parseIntAbs(a[d].id))
                    ), AGO.Events.eData[f] = {
                    id: f,
                    mission: c,
                    arrival: +a[d].getAttribute("data-arrival-time") || 0,
                    union:   g ||
                               "",
                    unionType: h || 0,
                    reverse:   "true" === a[d].getAttribute("data-return-flight")
                }, AGO.Events.modeColorMissions && AGO.Events.eData[f].reverse && (a[d].className += " ago_events_reverse"
                ), a[d].addEventListener("click", AGO.Events.clickRow, !1), AGO.Events.parseRow(a[d], AGO.Events.eData[f]), 1 !== h && (AGO.Task.updateShips(AGO.Events.eData[f]), AGO.Task.updateResources(AGO.Events.eData[f]), 3 <= AGO.Events.eData[f].fleetType && 1 !== h && 4 !== c && (AGO.Events.eData[f].pair = AGO.Events.eData[f].reverse ? AGO.Events.eData[f - 1] ? AGO.Events.eData[f -
                                                                                                                                                                                                                                                                                                                                                                                                   1].pair : "" : (5 === c || 15 === c
                                                                                                                                                                                                                                                                                                                                                                                                                  ) && AGO.Events.eData[f - 1] && AGO.Events.eData[f - 1].pair ? AGO.Events.eData[f - 1].pair : e++
                ), AGO.Events.improve && (AGO.Events.eData[f].pair && (a[d].setAttribute("ago-events-pair", AGO.Events.eData[f].pair), a[d].addEventListener("mouseover", AGO.Events.displayPair, !1), a[d].addEventListener("mouseout", AGO.Events.displayPair, !1)
                ), AGO.Events.createDetails(a[d], AGO.Events.eData[f])
                )
                );
            }
            for (f in AGO.Events.eData) {
                AGO.Events.eData.hasOwnProperty(f) && (1 === AGO.Events.eData[f].unionType && (AGO.Task.updateShips(AGO.Events.eData[f]),
                    AGO.Task.updateResources(AGO.Events.eData[f]), AGO.Events.improve && AGO.Events.createDetails(b.querySelector("table#eventContent tr.union" + AGO.Events.eData[f].union), AGO.Events.eData[f])
                ), 2 === AGO.Events.eData[f].fleetType && 5 === AGO.Events.eData[f].mission && AGO.Events.eData[f - 1] && (AGO.Events.eData[f].nocalc = !0
                )
                );
            }
            a = b = a = d = a = c = null
        }
    }, parseRow: function (a, b) {
        DOM.iterateChildren(a, function (a) {
                                var c;
                                c = a.className;
                                if (HTML.hasClass(c, "countDown")) {
                                    DOM.addClass(a, null, HTML.classMission(b.mission)), a.className +=
                                                                                         " ago_panel_add", b.fleetType = HTML.hasClass(c, "neutral") ? 2 : HTML.hasClass(c, "hostile") ? 1 : b.reverse ? 4 : 3;
                                } else if (HTML.hasClass(c, "arrivalTime")) {
                                    c = (a.textContent || ""
                                    ).split(" ")[0], a.textContent = AGO.Time.convertLocal(c, "[H]:[i]:[s]");
                                } else if (HTML.hasClass(c, "missionFleet")) {
                                    b.missionName = 2 <= b.unionType ? "" : b.unionType ? AGO.Label.get("LM02") : DOM.getAttribute("img", a, "title", 7).split("|")[1];
                                } else if (HTML.hasClass(c, "originFleet")) {
                                    if (c = a.querySelector("figure")) {
                                        b.typeOrigin = HTML.hasClass(c.className, "moon") ?
                                                       3 : HTML.hasClass(c.className, "tf") ? 2 : 1
                                    }
                                } else if (HTML.hasClass(c, "coordsOrigin")) {
                                    if (c = a.querySelector("a")) {
                                        b.coordsOrigin = AGO.Task.trimCoords(c.textContent), b.owncoordsOrigin = AGO.Planets.owncoords(b.coordsOrigin, b.typeOrigin), b.owncoordsOrigin && (b.reverse || (5 === b.mission || 15 === b.mission
                                                                                                                                                                                                         ) && AGO.Events.last === +b.id - 1 || (AGO.Events.last = Math.max(AGO.Events.last, +b.id || 0)
                                                                                                                                                                                            ), DOM.addClass(c, null, AGO.Token.getClassSelection(b.typeOrigin)), 3 <= b.owncoordsOrigin && DOM.extendClass(a, null, AGO.Token.getClassHighlight(b.typeOrigin))
                                        )
                                    }
                                } else if (-1 <
                                           c.indexOf("icon_movement")) {
                                    if ((c = a.querySelector("span")
                                        ) && 1 !== b.unionType) {
                                        a = c.title;
                                        var e;
                                        if (a) {
                                            for (a = a.split("<td>"), 2 <= b.unionType && AGO.Events.eData["F" + b.union] && (AGO.Events.eData["F" + b.union].fleets = (AGO.Events.eData["F" + b.union].fleets || 0
                                                                                                                                                                       ) + 1
                                            ), c = 1; c < a.length; c++) {
                                                if (e = (a[c].split("</td>", 1)[0] || ""
                                                    ).replace(/\:/g, "").trim(), e = AGO.Item.getByName(e)) {
                                                    b[e] = NMR.parseIntAbs(a[c].split(">", 3)[2]), b[e] && 2 <= b.unionType && AGO.Events.eData["F" + b.union] && (AGO.Events.eData["F" + b.union][e] = (AGO.Events.eData["F" +
                                                                                                                                                                                                                          b.union][e] || 0
                                                                                                                                                                                                        ) + b[e]
                                                    )
                                                }
                                            }
                                        }
                                    }
                                } else if (HTML.hasClass(c, "destFleet")) {
                                    if (c = a.querySelector("figure")) {
                                        b.type = HTML.hasClass(c.className, "moon") ? 3 : HTML.hasClass(c.className, "tf") ? 2 : 1
                                    }
                                } else if (HTML.hasClass(c, "destCoords")) {
                                    if (c = a.querySelector("a")) {
                                        b.coords = AGO.Task.trimCoords(c.textContent), b.owncoords = AGO.Planets.owncoords(b.coords, b.type), b.owncoords && (DOM.addClass(c, null, AGO.Token.getClassSelection(b.type)), 3 <= b.owncoords && DOM.extendClass(a, null, AGO.Token.getClassHighlight(b.type))
                                        )
                                    }
                                } else {
                                    HTML.hasClass(c, "sendMail") &&
                                    (b.nick = DOM.getAttribute(DOM.getChildnodeByName(a, "A"), null, "title", 7)
                                    )
                                }
                            }
        )
    }, createDetails: function (a, b) {
        var d, c, e;
        1 === b.unionType && b.fleets && DOM.setText(".originFleet", a, b.fleets + " / 16");
        2 <= b.unionType && DOM.setText(".descFleet", a);
        2 === b.unionType && DOM.setText(".countDown", a, "E28", 10);
        d = document.createElement("td");
        d.className = "ago_eventlist_activity";
        3 > b.fleetType ? DOM.appendIMG(d, 1 === b.fleetType ? "/cdn/img/galaxy/activity15.gif" : "/cdn/img/galaxy/activity.gif", "14px") : d.textContent = b.pair ||
                                                                                                                                                            "";
        DOM.prependChild(a, d);
        d = document.createElement("tr");
        d.className = "ago_eventlist";
        b.pair && (d.setAttribute("ago-events-pair", b.pair), d.addEventListener("mouseover", AGO.Events.displayPair, !1), d.addEventListener("mouseout", AGO.Events.displayPair, !1)
        );
        c = DOM.appendTD(d);
        c.setAttribute("colspan", 12);
        e = DOM.appendDIV(c, "ago_eventlist_left");
        b.nick && !b.owncoordsOrigin && DOM.appendSPAN(e, "ago_eventlist_player", b.nick);
        DOM.appendSPAN(e, HTML.classMission(b.mission), b.missionName);
        e = DOM.appendDIV(c, "ago_eventlist_fleet");
        (function (a, b) {
            function c(a, b, d, e) {
                a = DOM.appendTD(a);
                b && d && (DOM.appendSPAN(a, "ago_eventlist_label", b, e), DOM.appendTEXT(a, d, 2)
                )
            }

            var d, e, n, l, m, q;
            n = AGO.Option.is("E32") ? 12 : 11;
            l = {ShipCivil: [], ShipCombat: [], Resource: []};
            d = a.appendChild(document.createElement("table"));
            e = DOM.appendTR(d);
            c(e, "I28", b.shipsCivil || "0", 10);
            c(e, "I29", b.shipsCombat || "0", 10);
            c(e, "I27", b.resources || "0", 10);
            for (m in l) {
                if (l.hasOwnProperty(m)) {
                    for (q in AGO.Item[m]) {
                        AGO.Item[m].hasOwnProperty(q) && 0 < b[q] && l[m].push(q);
                    }
                }
            }
            for (m = 0; 9 > m; m++) {
                if (l.ShipCivil[m] ||
                    l.ShipCombat[m] || l.Resource[m]) {
                    e = DOM.appendTR(d), c(e, l.ShipCivil[m], b[l.ShipCivil[m]], n), c(e, l.ShipCombat[m], b[l.ShipCombat[m]], n), c(e, l.Resource[m], b[l.Resource[m]], n);
                } else {
                    break;
                }
            }
            d = e = null
        }
        )(e, b);
        e = DOM.appendDIV(c, "ago_eventlist_right");
        b.nick && !b.owncoords && DOM.appendSPAN(e, "ago_eventlist_player", b.nick);
        DOM.after(a, d);
        d = c = e = null
    }, toggleEvents: function (a) {
        !a.target || "H4" !== a.target.nodeName && "ago_display_arrow" !== a.target.className || (a = DOM.getAttribute("eventboxContent", "id", "ago_display_status",
                                                                                                                       2
        ) + 1, DOM.setAttribute("eventboxContent", "id", "ago_display_status", 3 < a ? 1 : a, 8)
        )
    }, clickRow: function (a) {
        var b;
        a && a.target && HTML.hasClass(a.target.className, "countDown") && (b = NMR.parseIntAbs(a.target.id)
        ) && AGO.Events.eData[b] && (a = {
            action: "set",
            tab: "Target",
            marked: 1,
            token: 81,
            time: AGO.Events.eData[b].arrival,
            name: AGO.Events.eData[b].nick
        }, a.coords = AGO.Events.eData[b].reverse ? AGO.Events.eData[b].coordsOrigin + ":" + AGO.Events.eData[b].typeOrigin : AGO.Events.eData[b].coords + ":" + AGO.Events.eData[b].type, AGO.Init.Messages("Token",
                                                                                                                                                                                                             "Action", a
        )
        )
    }, displayPair: function (a) {
        var b, d;
        d = this.getAttribute("ago-events-pair");
        (b = document.getElementById("eventboxContent")
        ) && 0 < d && ("mouseover" === a.type ? DOM.iterate(b.querySelectorAll('.eventFleet[ago-events-pair="' + d + '"], .ago_eventlist[ago-events-pair="' + d + '"]'), function (a) {
                                                                DOM.addClass(a, null, "ago_eventlist_pair")
                                                            }
        ) : DOM.iterate(b.querySelectorAll(".eventFleet, .ago_eventlist"), function (a) {
                            DOM.removeClass(a, null, "ago_eventlist_pair")
                        }
        )
        )
    }, displayHighlight: function (a) {
        AGO.Events.highlightCurrent =
        a || 0
    }, calculate: function (a) {
        function b(a, b, c) {
            a[b] || (a[b] = {}
            );
            a[b][c] || (a[b][c] = {
                metal: 0,
                crystal: 0,
                deuterium: 0,
                resources: 0,
                fleets: 0,
                shipment: 0,
                ships: 0,
                shipsCivil: 0,
                shipsCombat: 0,
                reverse: 0,
                timeResource: 1,
                timeShip: 1
            }
            );
            return a[b][c]
        }

        function d(a, b, c, d, e) {
            function f(a, b, c, d, e) {
                c[a] = (c[a] || 0
                       ) + b;
                d[a] = (d[a] || 0
                       ) + b;
                e[a] = (e[a] || 0
                       ) + b
            }

            var g;
            if (!e || "resources" === e) {
                for (g in AGO.Item.Resource) {
                    a[g] && (f(g, a[g], b, c, d), f("resources", a[g], b, c, d)
                    );
                }
            }
            if (!e || "ships" === e) {
                for (g in AGO.Item.Ship) {
                    a[g] && (f(g, a[g], b, c, d), f("ships",
                                                    a[g], b, c, d
                    ), g in AGO.Item.ShipCivil && f("shipsCivil", a[g], b, c, d), g in AGO.Item.ShipCombat && f("shipsCombat", a[g], b, c, d)
                    );
                }
                f("fleets", 1, b, c, d)
            }
        }

        var c, e, f, g, h, p, k;
        c = {};
        if (2 <= AGO.Events.status) {
            for (f in c.account = {}, AGO.Events.eData) {
                0 < +f && (e = AGO.Events.eData[f], "ownership" === a ? e.reverse ? (k = "own", h = e.coordsOrigin, g = e.coordsOrigin + ":" + e.typeOrigin, p = e.typeOrigin, d(e, b(c, "account", k), b(c, h, k), b(c, g, k), "ships"), 3 === e.mission && e.pair && (h = e.coords, g = e.coords + ":" + e.type, p = e.type
                ), d(e, b(c, "account", k), b(c, h, k),
                     b(c, g, k), "resources"
                )
                ) : (h = e.coords, g = e.coords + ":" + e.type, p = e.type, (k = 2 === e.fleetType && 3 === e.mission ? "neutral" : 3 <= e.fleetType && 4 === e.mission ? "own" : ""
                                                                            ) && d(e, b(c, "account", k), b(c, h, k), b(c, g, k))
                                                                        ) : (e.reverse ? (h = e.coordsOrigin, g = e.coordsOrigin + ":" + e.typeOrigin, p = e.typeOrigin, k = e.pair ? "" : "back"
                ) : (h = e.coords, g = e.coords + ":" + e.type, p = e.type, k = e.nocalc || !e.fleetType ? "" : 1 === e.fleetType ? "hostile" : 2 === e.fleetType ? "neutral" : e.owncoords ? "own" : ""
                                                                             ), k && d(e, b(c, "account", k), b(c, h, k), b(c, g, k))
                                                    ), k && (c[g][k].coords = h, c[g][k].coordstype =
                                                                                 g, c[g][k].type = p
                )
                );
            }
        }
        return c
    }
};
	
	// AGO.Detect = {
		// Run: function(){
			// if (document.location.href.match(/http:\/\/.+\.ogame\..+\/game\/index\.php\?page=*/i)) this.ogame = true;
			// else this.ogame = false;
		// }
		
// };

/* AGO.Chat = {
    chatBar: 0,
    Data: {
        filteronline: 0,
        filterchatactive: 0,
        buddies_expanded: 1,
        ally_expanded: 1,
        strangers_expanded: 1
    },
    Run: function () {
        var a;
        AGO.Option.is("O60") && (AGO.Chat.popupsDeactivated = AGO.Option.is("O61"));
        DOM.addObserver(DOM.query("body"), { childList: true }, function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if(mutation.addedNodes.length && "id" in mutation.addedNodes[0] && mutation.addedNodes[0].id === "chatBar") {
                    AGO.Chat.Content();
                }
            }
        });
    },
    Content: function () {
        AGO.Chat.chatBar = document.getElementById("chatBar");
        AGO.Chat.popupsDeactivated && AGO.Chat.removePopups();
        
        DOM.appendSCRIPT("window.setTimeout(function () {$('.js_playerlist').off('click','.playerlist_item');}, 1000);");
        DOM.addObserver(AGO.Chat.chatBar, { childList: true, subtree: true }, function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.addedNodes.length && "id" in mutation.addedNodes[0] && mutation.addedNodes[0].id === "mCSB_3") {
                    AGO.Chat.Ready();
                }
            }
        });
    },
    Ready: function () {
        AGO.Chat.Load();
        AGO.Chat.popupsDeactivated && AGO.Chat.createLinks();
        
        if (AGO.Chat.Data.filteronline) DOM.query("#filteronline").click();
        if (AGO.Chat.Data.filterchatactive) DOM.query("#filterchatactive").click();
        if (!AGO.Chat.Data.buddies_expanded) DOM.queryAll(".ui-accordion-header")[0].click();
        if (!AGO.Chat.Data.ally_expanded) DOM.queryAll(".ui-accordion-header")[1].click();
        if (!AGO.Chat.Data.strangers_expanded) DOM.queryAll(".ui-accordion-header")[2].click();
        DOM.iterate(DOM.queryAll("#filteronline, #filterchatactive, .ui-accordion-header"), function (obj) {
            obj.addEventListener("click", AGO.Chat.Save, false);
        });
    },
    Load: function () {
        var a; OBJ.hasProperties(a = AGO.Data.getStorage(AGO.App.keyPlayer + "_CHAT_DATA", "JSON")) ? AGO.Chat.Data = a : AGO.Data.setStorage(AGO.App.keyPlayer + "_CHAT_DATA", AGO.Chat.Data);
    },
    Save: function () {
        AGO.Chat.Data.filteronline = DOM.query("#filteronline").checked;
        AGO.Chat.Data.filterchatactive = DOM.query("#filterchatactive").checked;
        AGO.Chat.Data.buddies_expanded = ("true" === DOM.queryAll(".ui-accordion-header")[0].getAttribute("aria-expanded"));
        AGO.Chat.Data.ally_expanded = ("true" === DOM.queryAll(".ui-accordion-header")[1].getAttribute("aria-expanded"));
        AGO.Chat.Data.strangers_expanded = ("true" === DOM.queryAll(".ui-accordion-header")[2].getAttribute("aria-expanded"));
        console.log(AGO.Chat.Data);
        AGO.Data.setStorage(AGO.App.keyPlayer + "_CHAT_DATA", AGO.Chat.Data);
    },
    createLinks: function () {
        DOM.iterate(DOM.queryAll(".playerlist_item", AGO.Chat.chatBar), function (obj) {
            obj.onclick = function (e) { window.location.href = "index.php?page=chat&playerId=" + obj.dataset.playerid; return; };
        });
    },
    removePopups: function () {
        DOM.appendSCRIPT("window.setTimeout(function () {window.visibleChats = [];},0);");
    }
}; */