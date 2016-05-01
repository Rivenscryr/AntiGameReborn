if (!AGO) {
    var AGO = {};
}
AGO.Label.InitMenu = function () {
    var a;
    AGO.Label.Menu = OBJ.create(AGO.Label.Data);
    OBJ.copy(OBJ.parse(AGB.Resource("loca/EN_menu.json")), AGO.Label.Menu);
    OBJ.copy(OBJ.parse(AGB.Resource("loca/EN_help.json")), AGO.Label.Menu);
    OBJ.copy(OBJ.parse(AGB.Resource("loca/" + AGO.Menu.lang + "_menu.json")), AGO.Label.Menu);
    OBJ.copy(OBJ.parse(AGB.Resource("loca/" + AGO.Menu.lang + "_help.json")), AGO.Label.Menu);
    AGO.App.beta && (a = AGO.Data.getStorage(AGO.App.keyPlayer + "_Label_Menu", "JSON"), AGO.Menu.lang === a.A08 && (OBJ.copy(a, AGO.Label.Menu),
        OBJ.copy(AGO.Data.getStorage(AGO.App.keyPlayer + "_Label_Help", "JSON"), AGO.Label.Menu)
    )
    )
};
AGO.Label.updateLoca = function () {
    var a, b, c;
    a = NMR.parseVersion(AGO.Label.get("A02")) < NMR.parseVersion(AGO.App.versionLoca) || AGO.Label.get("A03") !== AGO.Uni.lang;
    b = NMR.parseVersion(AGO.Label.get("A07")) < NMR.parseVersion(AGO.App.versionLocaMenu) || AGO.Label.get("A08") !== AGO.Menu.lang;
    AGO.Init.status && AGO.App.beta && (a || b
    ) && (AGO.Notify.set("D02", 3), c = new XMLHttpRequest, c.open("POST", "https://antigame.de/antigame/ago_apploca.php", !0), c.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), c.onerror =
                                                                                                                                                                                                        c.onload = function () {
                                                                                                                                                                                                            var a, b = -1;
                                                                                                                                                                                                            AGO.Init.status && (200 === +c.status && c.responseText && (b = 4, a = STR.check(c.responseText).split("{{{{X}}}}"), 1 <= a.length && (a[0] && AGO.Data.setStorage(AGO.App.keyPlayer + "_Label_Game", STR.trim(a[0]).substring(a.indexOf("{"))), a[1] && AGO.Data.setStorage(AGO.App.keyPlayer + "_Label_Menu", STR.trim(a[1]).substring(a.indexOf("{"))), a[2] && AGO.Data.setStorage(AGO.App.keyPlayer + "_Label_Help", STR.trim(a[2]).substring(a.indexOf("{")))
                                                                                                                                                                                                            )
                                                                                                                                                                                                            ), AGB.Log("Label - Update Translation", !0), AGO.Notify.set("D02",
                                                                                                                                                                                                                                                                         b
                                                                                                                                                                                                            )
                                                                                                                                                                                                            )
                                                                                                                                                                                                        }, c.send("domain=" + AGO.Uni.domain + "&loca=" + AGO.Uni.lang + "&locamenu=" + AGO.Menu.lang)
    )
};
AGO.Label.get = function (a, b) {
    return a ? (b && (a = (2 === b ? "K" : "L"
                          ) + (AGO.Item.ResourceEnergy[a] ? AGO.Item.ResourceEnergy[a] : 1 === a.length ? "00" + a : 2 === a.length ? "0" + a : a
                          )
    ), 5 <= AGO.Menu.status ? a in AGO.Label.Menu ? (AGO.Label.Menu[a] || ""
    ).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"') : a : a in AGO.Label.Data ? (AGO.Label.Data[a] || ""
    ).replace(/&amp;/g, "&") : a
    ) : ""
};
AGO.Label.parse = function (a) {
    var b;
    if (a = STR.check(a)) {
        a = a.split("|");
        for (b = 0; b < a.length; b++) {
            a[b] = AGO.Label.get(a[b]);
        }
        return a.join("").trim() || "\u2009"
    }
    return ""
};
AGO.Label.is = function (a) {
    return 5 <= AGO.Menu.status ? a in AGO.Label.Menu ? (AGO.Label.Menu[a] || ""
    ).replace(/&amp;/g, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"') : "" : a in AGO.Label.Data ? (AGO.Label.Data[a] || ""
    ).replace(/&amp;/g, "&") : ""
};
AGO.Styles.setFile = function (a) {
    STR.check(a) && (DOM.append(document.head, "style", {
                                    type: "text/css",
                                    media: "screen"
                                }
    ).textContent = '@import url("' + AGO.App.pathSkin + "ago/" + a + '.css");\n'
    )
};
HTML.IMG = function (a, b) {
    return '<img width="' + b + '" height="' + b + '" src="' + (a || "/cdn/img/layout/pixel.gif"
        ) + '" />'
};
HTML.css = function (a, b, c) {
    return b ? c ? a + ": " + b + " !important;" : a + ": " + b + ";" : ""
};
AGO.Menu = {
    status: 1,
    selectHighlight1: {
        0: "-",
        1: "H01",
        2: "H02",
        5: "H05",
        6: "H06",
        10: "H10",
        13: "H13",
        15: "H15",
        16: "H16",
        18: "H18"
    },
    selectHighlight2: {0: "-", 1: "H01", 2: "H02", 6: "H06", 13: "H13", 15: "H15", 16: "H16", 18: "H18"},
    selectHighlight3: {0: "-", 1: "H01", 2: "H02", 6: "H06", 16: "H16", 18: "H18"},
    selectHighlight5: {0: "-", 1: "H01", 5: "H05", 10: "H10"},
    selectHighlight6: {0: "-", 1: "H01", 13: "H13", 15: "H15"},
    selectHighlight7: {0: "-", 1: "H01", 16: "H16", 18: "H18"},
    selectHighlight9: {0: "-", 1: "H21"},
    selectEvents: "E70 E71 E72 E73 E74 E75 E76 E77 E78".split(" "),
    selectTooltip: {0: " - ", 2: "0.2", 4: "0.4", 6: "0.6", 8: "0.8", 10: "1.0", 15: "1.5", 20: "2.0", 100: "10"},
    selectRoutineTranport: {
        0: "-",
        208: "L208",
        209: "L209",
        204: "L204",
        205: "L205",
        206: "L206",
        207: "L207",
        211: "L211",
        213: "L213",
        214: "L214",
        215: "L215"
    },
    Info: {
        General: "A00",
        Data: "D00",
        Usability: "U00",
        Coloring: "C00",
        Tools: "T00",
        Main: "O00",
        Buildings: "B00",
        Fleet: "F00",
        Events: "E00",
        Other: "G00",
        Messages: "M00"
    },
    selectLang: {
        "-": " - ",
        AR: "Espa\u00f1ol (AR)",
        BA: "Bosnian",
        BR: "Portugu\u00eas (BR)",
        CZ: "\u010ce\u0161tina",
        DE: "Deutsch",
        DK: "Dansk",
        EN: "English",
        ES: "Espa\u00f1ol",
        FI: "Finnish",
        FR: "Fran\u00e7ais",
        GR: "\u0395\u03bb\u03bb\u03b7\u03bd\u03b9\u03ba\u03ac",
        HR: "Hrvatski",
        HU: "Magyar",
        IT: "Italiano",
        JP: "\u65e5\u672c\u8a9e",
        MX: "Espa\u00f1ol (MX)",
        NL: "Dutch",
        NO: "Norsk",
        PL: "Polski",
        PT: "Portugu\u00eas",
        RO: "Romana",
        RU: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439",
        SE: "Svenska",
        SI: "Slovenian",
        SK: "Sloven\u010dina",
        TR: "T\u00fcrk\u00e7e",
        TW: "\u7e41\u9ad4\u4e2d\u6587",
        US: "English (US)"
    },
    Messages: function (a, b) {
        "Hide" === a ? AGO.Menu.Hide(b) : "Display" ===
                                          a ? AGO.Menu.Display(b) : "Install" === a && AGO.Menu.Install(b)
    },
    onKeydown: function () {
        return !0
    },
    Init: function () {
        2 > AGO.Menu.status && (AGO.Menu.status = 2, AGO.Menu.updatePath = AGO.isChrome ? AGO.App.beta ? "https://antigame.de/antigame/scripts/antigameorigin_beta.crx" : "https://chrome.google.com/webstore/detail/antigameorigin/ldbahlcmhmlpomdepooifmhnalokdhgm" : AGO.App.beta ? "https://antigame.de/antigame/scripts/antigameorigin_beta.xpi" : "https://antigame.de/antigame/scripts/antigameorigin.xpi", AGO.Styles.setFile("menu"),
            AGO.Para.Init(function () {
                              AGO.Menu.lang = AGO.Para.get("A10") || AGO.Uni.lang;
                              AGO.Label.InitMenu();
                              AGO.Menu.Show()
                          }
            )
        )
    },
    Hide: function (a) {
        var b;
        if (b = document.getElementById("ago_menu")) {
            AGO.Observer.set("mousedown"), a && (AGO.Menu.Save(), AGO.Para.Save()
            ), b.parentNode.removeChild(b);
        }
        AGO.Menu.status = 2;
        if (DOM.query("#inhalt")) DOM.setStyleDisplay("inhalt", "id", "block");
        else if (DOM.query("#buttonz")) DOM.setStyleDisplay("buttonz", "id", "block");
    },
    Save: function () {
        OBJ.iterate(AGO.Para.Info, function (a) {
                        var b, c, f;
                        if ((c = AGO.Para.getType(a)
                            ) && AGO.Para.getStore(a) && (b = document.getElementById(AGO.Menu.id(a))
                            )) {
                            if (1 === c) {
                                AGO.Para.set(a,
                                             DOM.getProperty(b, null, "checked", 1)
                                );
                            } else if (2 === c) {
                                AGO.Para.set(a, DOM.getValue(b, null, 2));
                            } else if (6 === c) {
                                AGO.Para.set(a, DOM.getValue(b, null, 7));
                            } else if (VAL.check(c, 20, 21, 22, 23)) {
                                b = DOM.getData(b, null, 0), AGO.Para.set(a, [
                                                                              b.color || "",
                                                                              b.opacity || "",
                                                                              b.condition || "",
                                                                              b.limit || "",
                                                                              b.name || ""
                                                                          ].join("|")
                                );
                            } else if (25 === c) {
                                AGO.Para.set(a, DOM.getValue(b, null) + "|" + DOM.getValue(AGO.Menu.id(a, 1), "id"));
                            } else if (-1 === c) {
                                c = "";
                                for (f = 0; b;) {
                                    b = DOM.getData(b, null, 0), b.name && b.data && (c += b.name + "=" + b.data + ";"
                                    ), f++, b = document.getElementById(AGO.Menu.id(a,
                                                                                    f
                                                                        )
                                    );
                                }
                                AGO.Para.set(a, c)
                            }
                        }
                    }
        );
        "-" === AGO.Para.get("A10") && AGO.Para.set("A10", "")
    },
    Install: function (a) {
        a ? "update_available" !== a || AGO.Menu.reload ? AGO.Menu.reload = 1 : (AGO.Menu.reload = 1, AGO.Menu.updateButton("A53", "A53| ......", "#FF9600"), window.setInterval(function () {
                                                                                                                                                                                     5 < AGO.Menu.reload++ ? AGO.Init.Location() : AGB.message("Update", "Check", {})
                                                                                                                                                                                 }, 1500
        )
        ) : AGB.message("Update", "Check", {})
    },
    Update: function () {
        AGO.Menu.updateCounter || (AGO.Menu.updateCounter = 1, AGO.Units.Update(function (a) {
                                                                                    AGO.Units.Data.status = a;
                                                                                    -1 !== a &&
                                                                                    AGO.Notify.set("Problem", -12);
                                                                                    AGO.Menu.Show("Data")
                                                                                }
        ), AGO.Label.Update(), AGB.message("App", "Update", {reload: !0}, function () {
                                           }
        )
        )
    },
    Tooltip: function (a) {
        function b(a) {
            function b(a) {
                return (a && 3 === a.length ? AGO.Label.is(a.toUpperCase()) : ""
                       ) || a || ""
            }

            var l, k, m, n, r, w, x, h, y = 0, z;
            l = DOM.appendDIV(null);
            a = STR.check(a).replace(/\"/g, "").split("[");
            for (x = 0; x < a.length; x++) {
                n && 0 < y ? y-- : n = null, r = a[x].split("]", 2), h = r[0].toUpperCase(), "NOPARSE" === h ? z = !0 : z ? h ? (k || (k = DOM.append(l, "OL"), m = null
                ), m || (m = DOM.appendLI(k), n = null
                ),
                    DOM.appendTEXT(n || m, "[" + r[0] + "]")
                ) : z = !1 : c[h] ? (DOM.append(l, "H2").textContent = AGO.Label.get(c[h]), k = DOM.append(l, "OL"), n = m = null
                ) : "*" === h || f[h] ? (k || (k = DOM.append(l, "OL")
                ), m = DOM.appendLI(k, f[h]), n = null, r[1] && (n = DOM.appendSPAN(m, f[h], b(r[1])), r[1] = "", y = 1
                )
                ) : h && (k || (k = DOM.append(l, "OL"), m = null
                ), m || (m = DOM.appendLI(k), n = null
                ), "BR" === h ? DOM.append(n || m, "BR") : g[h] ? DOM.appendSPAN(n || m, "ago_menu_help_ogame", g[h], 10) : d[h] ? (w = "PLANET" === h ? "ago_menu_help_planet" : "MOON" === h ? "ago_menu_help_moon" : "DEBRIS" === h ? "ago_menu_help_debris" :
                                                                                                                                                                                                                        "ago_menu_help_ogame", DOM.appendSPAN(n || m, w, d[h], 10)
                ) : e[h] ? (n = DOM.appendSPAN(m, e[h] || ""), y = 1, r[1] && ("ITEM" === h && (r[1] = AGO.Label.is("L" + r[1].toUpperCase()) || r[1]
                ), n.textContent = 3 === r[1].length && AGO.Label.is(r[1].toUpperCase()) ? AGO.Label.get(r[1].toUpperCase()) : r[1], r[1] = ""
                )
                ) : AGO.Label.is(r[0].toLowerCase()) ? DOM.appendTEXT(n || m, AGO.Label.get(r[0].toLowerCase())) : AGO.Para.Info[h] ? DOM.appendTEXT(n || m, h, 10) : r[0] && DOM.appendTEXT(n || m, r[0])
                ), r[1] && (k || (k = DOM.append(l, "OL"), m = null
                ), m || (m = DOM.appendLI(k),
                    n = null
                ), DOM.appendTEXT(m, r[1])
                );
            }
            return l.innerHTML || ""
        }

        var c, f, e, g, d, k, p, q, l;
        c = {
            STANDARD: "AH5",
            GENERAL: "A00",
            TIP: "AH2",
            HINT: "AH3",
            DETAILS: "AH8",
            EXPLANATION: "AH1",
            SHORTCUTS: "AH9"
        };
        f = {
            HEADLINE: "ago_menu_help_headline",
            OPTION: "ago_menu_help_option",
            SHORTCUT: "ago_menu_help_shortcut",
            LIST: "ago_menu_help_list"
        };
        e = {
            SECTION: "ago_color_blue",
            SETTING: "ago_color_blue",
            OGAME: "ago_color_white",
            PAGE: "ago_color_white",
            BUTTON: "ago_menu_help_button",
            ITEM: "ago_menu_help_item",
            BLUE: "ago_color_blue",
            RED: "ago_color_palered",
            ORANGE: "ago_color_orange",
            LIMEORANGE: "ago_color_limeorange",
            GREEN: "ago_color_green",
            LIGHTGREEN: "ago_color_lightgreen",
            LIMEGREEN: "ago_color_limegreen",
            GREY: "ago_color_menu",
            WHITE: "ago_color_white",
            NORMAL: "ago_color_light"
        };
        g = {
            ATTACK: "LM01",
            ACSATTACK: "LM02",
            TRANSPORT: "LM03",
            DEPLOYMENT: "LM04",
            ACSDEFEND: "LM05",
            ESPIONAGE: "LM06",
            COLONIZATION: "LM07",
            HARVEST: "LM08",
            MOONDESTRUCTION: "LM09",
            EXPEDITION: "LM15"
        };
        d = {
            METAL: "L091",
            CRYSTAL: "L092",
            DEUTERIUM: "L093",
            ENERGY: "L094",
            PLANET: "L081",
            MOON: "L083",
            DEBRIS: "L082"
        };
        a = document.querySelector('#ago_menu .tooltipHTML[ago-tooltip="' + a + '"]');
        k = DOM.getData(a, null, 0);
        if (a && OBJ.is(k) && STR.check(k.id)) {
            p = "";
            if (k.section) {
                for (k = STR.check(AGO.Label.is(k.id.toLowerCase() + "0")).split("["), l = 0; l < k.length; l++) {
                    q = k[l].split("]")[0].trim(), c[q.toUpperCase()] ? p += "[" + q.toUpperCase() + "]" : q && (p += AGO.Label.is(q.toLowerCase()) || AGO.Label.is(q.toUpperCase()) || ""
                    );
                }
            } else {
                for (p = AGO.Label.is(k.id.toLowerCase()), k = STR.check(p).split("["), l = 0; l < k.length; l++) {
                    q = k[l].split("]")[0].trim(), AGO.Label.is(q) &&
                                                   (p = p.split("[" + q + "]").join(AGO.Label.get(q))
                                                   );
                }
            }
            p && (a.title += b(p)
            )
        }
    },
    Display: function (a) {
        var b, c;
        AGO.Main.updateButton();
        if (OBJ.is(a) && "show" === a.action) {
            AGO.Menu.Save(), AGO.Menu.Show(a.tab);
        } else if (b = document.getElementById("ago_menu")) {
            AGO.Menu.get("D71"), AGO.Menu.updateButton("AM3", "AM3", "inherit"), AGO.Menu.changeSection("A50", {action: AGO.App.upgradeAvailable ? 1 : 0}), AGO.Menu.updateButton("A53", "A53| " + AGO.App.versionUpdate), AGO.Menu.updateButton("A52", "A52| " + AGO.App.versionUpdate), c = (AGO.Uni.speed !==
                                                                                                                                                                                                                                                                                               AGO.Uni.speedFleet ? AGO.Uni.speed + "/" + AGO.Uni.speedFleet + "x, " : AGO.Uni.speed + "x, "
                                                                                                                                                                                                                                                                                              ) + AGO.Uni.galaxies + ":" + AGO.Uni.systems + ", " + AGO.Uni.debrisFactor + ", " + AGO.Uni.repairFactor + ", " + (AGO.Uni.rapidFire ? AGO.Label.get("S25") + ", " : ""
                                                                                                                                                                                                                                                                                              ) + (AGO.Uni.acs ? AGO.Label.get("S26") + ", " : ""
                                                                                                                                                                                                                                                                                              ) + (AGO.Uni.defToTF ? AGO.Label.get("S27") + ", " : ""
                                                                                                                                                                                                                                                                                              ) + AGO.Para.chooseTopscore("<100k", "<1m", "<5m", "<25m", "<50m", "<75m", "<100m", ">100m"), AGO.Menu.updateDetail("S21", c), AGO.Menu.updateLabel("S29", "", "", AGO.Para.get("S29") ? "#008000" : "inherit"),
                AGO.Menu.updateLabel("D41", "", "", HTML.colorStatusData(AGO.Units.Data.status)), AGO.Menu.updateDetail("D41", AGO.Units.get("timeResearch"), 17), AGO.Menu.updateLabel("D22", "", "", HTML.colorStatusData(OBJ.get(AGO.DataBase.Data.Player, "status"))), AGO.Menu.updateDetail("D22", OBJ.get(AGO.DataBase.Data.Player, "timestamp"), 17), AGO.Menu.updateLabel("D23", "", "", HTML.colorStatusData(OBJ.get(AGO.DataBase.Data.Universe, "status"))), AGO.Menu.updateDetail("D23", OBJ.get(AGO.DataBase.Data.Universe, "timestamp"), 17), AGO.Menu.changeSection("D60",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  {display: AGO.Menu.get("D61")}
            ), AGO.Menu.updateButton("D70", [
                                         "",
                                         "D77",
                                         "D78",
                                         "D79"
                                     ][AGO.Menu.get("D61")]
            ), AGO.Menu.updateButton("D80", [
                                         "",
                                         "D87",
                                         "D88",
                                         "D89"
                                     ][AGO.Menu.get("D61")]
            ), DOM.setValue("#ago_menu_D9C", b, ""), OBJ.is(a) && a.tab && AGO.Menu.action({
                                                                                               role: "Tab",
                                                                                               action: "show",
                                                                                               id: a.tab
                                                                                           }
            )
        }
    },
    updateLabel: function (a, b, c, f) {
        a = document.getElementById("ago_menu_label_" + a);
        OBJ.is(b) ? DOM.replaceChildren(a, b) : b && DOM.setText(a, null, b, c);
        f && DOM.setStyleColor(a, null, f)
    },
    updateDetail: function (a, b, c, f) {
        a = document.getElementById("ago_menu_detail_" +
                                    a
        );
        OBJ.is(b) ? DOM.replaceChildren(a, b) : DOM.setText(a, null, b, c);
        f && DOM.setStyleColor(a, null, f)
    },
    updateButton: function (a, b, c) {
        DOM.setText("#ago_menu_button_" + a, null, AGO.Label.parse(b));
        c && DOM.setStyleColor("#ago_menu_button_" + a, null, c)
    },
    click: function (a) {
        var b;
        a && a.target && (b = DOM.getData(a.target, null, 2), b.pageX = a.pageX, b.pageY = a.pageY, "action" !== b.type && b.type || AGO.Menu.action(b), OBJ.is(b.message) && AGO.Init.Messages(b.message.page, b.message.role, b.message.data)
        )
    },
    change: function (a) {
        a && a.target && (a =
                          DOM.getData(a.target, null, 2), a.id && "change" === a.type && AGO.Menu.action(a)
        )
    },
    action: function (a) {
        var b, c, f, e;
        if ((b = document.getElementById("ago_menu")
            ) && OBJ.is(a)) {
            if ("Tab" === a.role) {
                c = DOM.hasClass("#ago_menu_" + a.id, b, "ago_menu_tab_open"), DOM.iterate(b.querySelectorAll(".ago_menu_tab"), function (a) {
                                                                                               DOM.removeClass(a, null, "ago_menu_tab_open")
                                                                                           }
                ), ("show" === a.action || "toggle" === a.action && !c
                   ) && DOM.addClass("#ago_menu_" + a.id, b, "ago_menu_tab_open");
            } else if ("Section" === a.role) {
                c = "set" === a.action ? Boolean(a.data) :
                    AGO.Menu.get(a.id), f = a.id === a.group ? 'table.ago_menu_section[rel="' + a.id + '"]' : "table.ago_menu_section#ago_menu_section_" + a.id, e = a.id === a.group ? "ago_menu_group_disabled" : "ago_menu_section_disabled", DOM.iterate(b.querySelectorAll(f), function (a) {
                                                                                                                                                                                                                                                                 c ? DOM.removeClass(a, null, e) : DOM.addClass(a, null, e)
                                                                                                                                                                                                                                                             }
                );
            } else if ("Label" === a.role) {
                AGO.Menu.Display({
                                     tab: "General",
                                     action: "show"
                                 }
                );
            } else if ("Display" === a.role) {
                AGO.Menu.Display(a.data);
            } else if ("Sync" === a.role) {
                AGO.Menu.Sync(a);
            } else if ("Task" === a.role) {
                "show" === a.action ?
                AGO.Menu.showTask(a) : AGO.Menu.hideTask(a);
            } else if ("Picker" === a.role) {
                "show" === a.action ? AGO.Menu.showPicker(a) : AGO.Menu.hidePicker(a);
            } else {
                switch (a.action) {
                    case "update":
                        AGO.Menu.Update(!0);
                        break;
                    case "install":
                        AGO.Menu.Install();
                        break;
                    case "preset":
                        c = AGO.Menu.get("D04");
                        NMR.isMinMax(c, 1, 3) && (AGO.Para.Preset(c), AGO.Menu.Show("Data")
                        );
                        break;
                    case "reset":
                        a = AGO.Menu.get(a.id);
                        b = {
                            Account: "D45",
                            Panel: "D49",
                            Token: "D47",
                            DataBase: "D29",
                            Option: "D15",
                            acc: "D11",
                            ago: "D12"
                        }[a];
                        a && b && (b = "AntiGameOrigin \n \n " + AGO.Label.get("D10") +
                                       "\n \n " + ("ago" === a ? "" : AGO.Uni.lang + " " + AGO.Uni.abbr + " " + AGO.Acc.name + "\n \n "
                        ) + AGO.Label.get(b) + ("DataBase" === a ? "\n \n - " + AGO.Label.get("D19") : ""
                                       ), window.confirm(b) ? AGO.Data.Remove(a) : AGB.message("Data", "List", {filter: "ago" === a ? "" : AGO.App.keyPlayer})
                        );
                        break;
                    case "topscore":
                        c = AGO.Para.get("S29") >= AGO.Uni.topScore ? 0 : AGO.Para.chooseTopscore(1E5, 1E6, 5E6, 25E6, 5E7, 75E6, 1E8, 0);
                        AGO.Para.set("S29", c);
                        AGO.Init.Messages("Menu", "Display", {tab: "Data"});
                        break;
                    case "disable":
                        window.confirm("AntiGameOrigin \n \n " +
                                       AGO.Label.get("A11") + "\n \n" + AGO.Label.get("a11").replace(/\[BR\]/g, "")
                        ) && AGO.App.Save({disabled: !0})
                }
            }
        }
    },
    get: function (a, b) {
        var c, f;
        if (f = AGO.Para.getType(a)) {
            if (c = document.getElementById(AGO.Menu.id(a, b))) {
                if (1 === f) {
                    return DOM.getProperty(c, null, "checked", 1);
                }
                if (2 === f) {
                    return DOM.getValue(c, null, 2);
                }
                if (6 === f) {
                    return DOM.getValue(c, null, 7)
                }
            }
        }
        return ""
    },
    id: function (a, b) {
        return a ? "ago_menu_" + a + (b ? "_" + b : ""
        ) : ""
    },
    setPosition: function (a, b) {
        var c, f, e, g, d;
        if (c = document.getElementById(a)) {
            f = DOM.getProperty(c, null, "clientHeight",
                                2
            ), e = 142 + DOM.getProperty("ago_menu", "id", "offsetTop", 2), g = DOM.getProperty("ago_menu", "id", "clientHeight", 2), d = window.scrollY + window.innerHeight - (AGO.Option.is("commander") ? 30 : 65
            ) - f - e, e = Math.min(d, +b - e - f / 2), e = Math.min(e, g - f - 10), DOM.set(c, null, null, {top: e + "px"})
        }
    },
    appendHeader: function () {
        var a, b, c;
        AGO.Menu.menuNode = DOM.appendDIV(null, {id: "ago_menu"});
        AGO.Menu.menuNode.addEventListener("click", AGO.Menu.click, !1);
        DOM.appendDIV(AGO.Menu.menuNode, {id: "ago_menu_picker", "class": "ago_menu_selected"});
        DOM.appendDIV(AGO.Menu.menuNode,
                      {id: "ago_menu_edit", "class": "ago_menu_selected"}
        );
        a = DOM.appendDIV(AGO.Menu.menuNode, {id: "ago_menu_header"});
        b = DOM.appendDIV(a, "ago_menu_header_title");
        b.textContent = AGO.Label.get("AM0") + " - " + AGO.App.versionAGO + (AGO.App.beta ? " - This version is only for AGO testers!" : ""
        );
        DOM.appendSPAN(b, "ago_color_limeorange", "by Shole");
        b = DOM.appendDIV(a, "ago_menu_header_button");
        a = DOM.appendTABLE(b, null, null, [434, 220]);
        a = DOM.appendTR(a);
        b = DOM.appendTD(a);
		c ='<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="ZFKCSNHL69CKE"><table><tr><td><input type="hidden" name="on0" value="Donate different amounts:">Donate different amounts:</td></tr><tr><td><select name="os0"><option value="Amount 1">Amount 1 €1.00 EUR</option><option value="Amount 2">Amount 2 €3.00 EUR</option><option selected value="Amount 3">Amount 3 €5.00 EUR</option><option value="Amount 4">Amount 4 €10.00 EUR</option><option value="Amount 5">Amount 5 €15.00 EUR</option><option value="Amount 6">Amount 6 €20.00 EUR</option></select> </td></tr></table><input type="hidden" name="currency_code" value="EUR"><input type="image" src="https://www.paypalobjects.com/en_GB/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - The safer, easier way to pay online!" style="margin: 0px 0px 0px 32px"><img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1"></form>';
		DOM.setText(b, null, c, 9);
        AGO.Menu.appendButton(b, "AM2", "AM2", {message: {page: "Menu", role: "Hide"}});
        b = DOM.appendTD(a);
        AGO.Menu.appendButton(b, "AM3", "AM3", {message: {page: "Menu", role: "Hide", data: "save"}});
        AGO.Menu.contentNode = DOM.appendDIV(AGO.Menu.menuNode, {id: "ago_menu_content"})
    },
    appendTab: function (a) {
        var b;
        AGO.Menu.Info[a] &&
        (AGO.Menu.tabNode = DOM.appendDIV(AGO.Menu.contentNode, {
                                              id: AGO.Menu.id(a),
                                              "class": "ago_menu_tab"
                                          }
        ), b = DOM.appendDIV(AGO.Menu.tabNode, "ago_menu_tab_header"), DOM.setData(b, null, {
                                                                                       role: "Tab",
                                                                                       action: "toggle",
                                                                                       id: a
                                                                                   }
        ), DOM.appendSPAN(b, "ago_menu_tab_arrow_close", "\u25bc"), DOM.appendSPAN(b, "ago_menu_tab_arrow_open", "\u25b2"), DOM.appendTEXT(b, AGO.Menu.Info[a], 10)
        )
    },
    appendSection: function (a, b, c, f) {
        var e, g;
        c = AGO.Para.getType(c) ? c : AGO.Para.getType(a) ? a : "";
        e = "ago_menu_section";
        c && (a === c ? e += " ago_menu_group" : AGO.Para.getType(a) && !AGO.Para.get(a) && (e += " ago_menu_section_disabled"
        ), AGO.Para.get(c) || (e += " ago_menu_group_disabled"
        )
        );
        AGO.Menu.sectionNode = DOM.appendTABLE(AGO.Menu.tabNode, {
                                                   id: "ago_menu_section_" + a,
                                                   "class": e,
                                                   rel: c
                                               }, null, [434, 220]
        );
        e = DOM.appendTR(AGO.Menu.sectionNode, "ago_menu_section_header");
        g = DOM.append(e, "th", "ago_menu_section_title");
        b = AGO.Label.parse(b || a);
        g = DOM.appendSPAN(g, "", b);
        a && (g.id = "ago_menu_label_" + a
        );
        AGO.Label.is(STR.check(a).toLowerCase() + "0") ? (g.title = b + "|", g.className = "tooltipHTML ago_menu_help",
            DOM.setData(g, null, {id: a, section: !0})
        ) : 50 < b.length && (g.title = b, g.className = "tooltip"
        );
        g = DOM.append(e, "th");
        2 === AGO.Para.getType(a) ? (g = DOM.appendSPAN(g, "ago_menu_section_input"), b = DOM.appendSELECT(g, {id: AGO.Menu.id(a)}, f, STR.zero(AGO.Para.get(a))), DOM.setData(b, null, {
                                                                                                                                                                                   type: "change",
                                                                                                                                                                                   role: "Section",
                                                                                                                                                                                   action: "change",
                                                                                                                                                                                   id: a,
                                                                                                                                                                                   group: c || a
                                                                                                                                                                               }
        ), b.addEventListener("change", AGO.Menu.change, !1)
        ) : AGO.Para.getType(a) && (g = DOM.appendSPAN(g, "ago_menu_section_input"), b = DOM.append(g, "input", {
                                                                                                        id: AGO.Menu.id(a),
                                                                                                        type: "checkbox"
                                                                                                    },
                                                                                                    null, null, {checked: Boolean(AGO.Para.get(a))}
        ), DOM.setData(b, null, {
                           role: "Section",
                           action: "toggle",
                           id: a,
                           group: c || a
                       }
        ), DOM.appendTEXT(g, a === c ? "A81" : "A82", 10)
        )
    },
    changeSection: function (a, b) {
        var c;
        (c = document.getElementById("ago_menu_section_" + a)
        ) && OBJ.is(b) && ("display"in b && DOM.setAttribute(c, null, "ago_display_status", b.display, 8), "action"in b && (b.action ? DOM.setAttribute(c, null, "ago_menu_action", b.action) : DOM.removeAttribute(c, null, "ago_menu_action")
        )
        )
    },
    appendRow: function (a, b, c, f, e, g) {
        var d;
        a = STR.check(a);
        d = DOM.appendTR(AGO.Menu.sectionNode, g);
        g = VAL.choose((+c || 0
                       ) + 1, "ago_menu_label_bullet", "ago_menu_label", "ago_menu_label_indent"
        );
        c = DOM.appendTD(d, g);
        c = DOM.appendSPAN(c);
        f && (c.style.color = f
        );
        a && (c.id = "ago_menu_label_" + a
        );
        "object" === typeof b ? (f = AGO.Label.parse(a), DOM.appendChild(c, b)
        ) : (f = AGO.Label.parse(b), c.textContent = f
        );
        f && (AGO.Label.is(a.toLowerCase()) && -1 === f.indexOf("<") ? (DOM.set(c, null, {
                                                                                    "class": "tooltipHTML ago_menu_help_label",
                                                                                    title: f + "|"
                                                                                }
        ), DOM.setData(c, null, {id: a})
        ) : 65 < f.length && DOM.set(c,
                                     null, {"class": "tooltip", title: f}
        )
        );
        c = DOM.appendTD(d);
        "string" === typeof e ? c.innerHTML = e : "object" === typeof e && DOM.appendChild(c, e)
    },
    appendRowContent: function (a, b, c, f, e) {
        var g;
        g = DOM.appendTR(AGO.Menu.sectionNode, f);
        f = VAL.choose((+c || 0
                       ) + 1, "ago_menu_label_bullet", "ago_menu_label", "ago_menu_label_indent"
        );
        c = DOM.appendTD(g, f);
        e && (c.style.color = e
        );
        "string" === typeof a ? c.innerHTML = a : "object" === typeof a && DOM.appendChild(c, a);
        b ? (c = DOM.appendTD(g), "string" === typeof b ? c.innerHTML = b : "object" === typeof b && DOM.appendChild(c,
                                                                                                                     b
        )
        ) : DOM.setAttribute(c, null, "colspan", 2)
    },
    appendButton: function (a, b, c, f, e) {
        a = STR.check(f) ? DOM.appendA(a, {
                                           "class": "btn_blue ago_menu_button",
                                           href: f,
                                           target: e || "_blank"
                                       }
        ) : DOM.appendA(a, {"class": "btn_blue ago_menu_button"}, null, f);
        a.textContent = AGO.Label.parse(c);
        b && (a.id = "ago_menu_button_" + b
        );
        return a
    }
};
AGO.Menu.Show = function (a) {
    function b(a, b, c, d, h, e, g, f) {
        g && AGO.Menu.appendRow(a, b || a, d, e, AGO.Menu.appendButton(null, a, c, g, f), h)
    }

    function c(a, b, c, d, h, e, g) {
        var f;
        f = DOM.appendSPAN(null);
        g && (f.style.color = g
        );
        a && (f.id = "ago_menu_detail_" + a
        );
        OBJ.is(c) ? f.appendChild(c) : c && (f.textContent = c
        );
        AGO.Menu.appendRow(a, b || a, d, e, f, h)
    }

    function f(a, b) {
        var c;
        c = document.createDocumentFragment();
        DOM.appendSPAN(c, "", a, 10);
        DOM.appendSPAN(c, "", b, 10);
        AGO.Menu.appendRowContent(c, null, -1, "ago_menu_title")
    }

    function e(a, b) {
        var c;
        a = (a || "8"
            ) + "px";
        c = DOM.appendTR(AGO.Menu.sectionNode, b);
        c = DOM.appendTD(c, "ago_menu_space", "");
        DOM.set(c, null, {colspan: 2}, {fontSize: a, height: a, lineHeight: a})
    }

    function g(a, b, c, d, h, e, g, f) {
        VAL.check(AGO.Para.getType(a), 2, 6) && (c = DOM.appendSELECT(null, {id: AGO.Menu.id(a)}, c, (f || ""
                                                                                                     ) + STR.zero(AGO.Para.get(a))
        ), OBJ.is(g) && (g.id = a, DOM.setData(c, null, g), c.addEventListener("change", AGO.Menu.change, !1)
        ), AGO.Menu.appendRow(a, b || a, d, e, c, h)
        )
    }

    function d(a, b, c, d, h) {
        var e, g, f, l;
        e = OBJ.is(a) ? a : [a || ""];
        if (OBJ.is(e) && AGO.Para.getType(e[0])) {
            b =
            b || e[0];
            a = document.createDocumentFragment();
            for (l = 0; l < e.length; l++) {
                if (f = e[l], g = AGO.Para.getType(f)) {
                    if (c = 1 === e.length ? null : DOM.append(a, "span", null, {
                                                                   display: "inline-block",
                                                                   width: Math.floor(100 / e.length) + "%"
                                                               }
                        ), 1 === g && DOM.append(c || a, "input", {
                                                     id: AGO.Menu.id(f),
                                                     type: "checkbox"
                                                 }, null, null, {checked: Boolean(AGO.Para.get(f))}
                        ), 2 === g || 6 === g) {
                        g = 2 === g ? "" : "ago_menu_input_string", DOM.append(c || a, "input", {
                                                                                   id: AGO.Menu.id(f),
                                                                                   "class": g,
                                                                                   type: "text",
                                                                                   value: STR.check(AGO.Para.get(f))
                                                                               }, g
                        );
                    }
                }
            }
            DOM.hasChildren(a) && AGO.Menu.appendRow(e[0],
                                                     b, d, "", a, h
            )
        }
    }

    function k(a, b, c, e, h) {
        var g, f;
        if (a) {
            for (f = 65; 75 > f; f++) {
                if (g = a + String.fromCharCode(f), AGO.Para.Info[g]) {
                    d(g, b, "", c, e, h);
                } else {
                    break
                }
            }
        }
    }

    function p(a, b, c, d, h, e) {
        if (25 === AGO.Para.getType(a) && (c = AGO.Para.getPair(a), c[0] || c[0] || e
            )) {
            return h = h || a, a = DOM.append(null, "input", {
                                                  id: AGO.Menu.id(h),
                                                  "class": "ago_menu_input_name",
                                                  type: "text",
                                                  value: c[0]
                                              }
            ), h = DOM.append(null, "input", {
                                  id: AGO.Menu.id(h, 1),
                                  "class": "ago_menu_input_string",
                                  type: "text",
                                  value: c[1]
                              }
            ), AGO.Menu.appendRowContent(a, h, b), !0
        }
    }

    function q(a, b, c,
               d
    ) {
        var h, e;
        h = 1;
        if (a) {
            for (e = 1; 10 > e; e++) {
                p(a + e, b, c, d, a + h) && h++;
            }
            10 > h && p(a + 9, b, c, d, a + h, !0)
        }
    }

    function l(a, b, c, d, h, e) {
        var g, f, l, k, m;
        l = AGO.Para.get(a, 6).split("|");
        b = b || a;
        g = AGO.Para.getType(a);
        VAL.check(g, 20, 21, 22, 23) && ((f = {
            role: "Picker",
            id: a,
            label:          c || b,
            action: "show",
            mode: g,
            color: l[0],
            opacity: l[1],
            opacityDefault: AGO.Para.get(h) || AGO.Styles.opacity,
            condition: l[2],
            limit: l[3],
            name: l[4],
            options: e
        }, f.colorDefault = STR.check(AGO.Para.getDefaultValue(f.id)), f.darken = "INHERIT" === f.color, k = f.darken ? f.colorDefault :
                                                                                                             f.color, m = (20 < g ? "ago_menu_color_meta" : "ago_menu_color"
                                                                                                                          ) + (k ? "" : " ago_menu_color_disabled"
                                                                                                                          ), h = DOM.appendA(null, {
                                                                                                                                                 id: AGO.Menu.id(a),
                                                                                                                                                 "class": m
                                                                                                                                             }, null, f
        ), 20 === g
                                         ) ? (k && (h.style.color = k
        ), c && DOM.setText(h, null, c, 10), AGO.Menu.appendRow(a, b, d, "", h)
                                         ) : (m = k ? "" : "ago_menu_color_disabled", b = (23 === g ? l[4] : ""
                                                                                          ) || AGO.Label.get(b), c = DOM.appendSPAN(null, m, b), c.id = "ago_menu_label_" + a, k && (c.style.color = k, 21 === g || 22 <= g && f.condition
        ) && (f.darken ? h.style.opacity = (f.opacity || f.opacityDefault || 100
                                           ) / 100 : h.style.backgroundColor = HTML.color(k,
                                                                                          f.opacity || f.opacityDefault || 0
        )
                                                                                                                                                                               ), 22 <= g && (e = "selectHighlight" + STR.check(e), b = k && e && OBJ.is(AGO.Menu[e]) ? AGO.Menu[e][f.condition] : "", DOM.appendSPAN(h, "ago_menu_color_condition", b, 10), DOM.appendSPAN(h, "ago_menu_color_limit", b ? f.limit : "", 2)
        ), AGO.Menu.appendRowContent(c, h, d)
                                         )
        )
    }

    function u(a, b, c, d, h) {
        var e, f;
        e = 0;
        for (f = 1; 10 > f; f++) {
            AGO.Para.get(a + f, 6) && (e = f
            );
        }
        h || (e = 10
        );
        for (f = 1; 10 > f; f++) {
            f <= e && l(a + f, "", "", b, c, d);
        }
        9 > e && l(a + (e + 1
                   ), "\u2009", "", b, c, d
        )
    }

    function v(a, b, c, e) {
        function h(a, b, c, h, d, e) {
            var f, g;
            g = AGO.Task.split(e,
                               2, 4
            );
            e && h && (b = document.createDocumentFragment(), DOM.appendTEXT(b, AGO.Label.parse("F08") + ":"), f = DOM.appendSPAN(b, "ago_menu_task_name", AGO.Task.cutCoords(d)), "3" === d.split(":")[3] && DOM.appendIMG(f, HTML.urlTypeIcon(3), "14px")
            );
            c = DOM.appendA(null, {id: AGO.Menu.id(a, h), "class": "ago_menu_task"}, null, {
                                role: "Task",
                                action: "show",
                                id: a,
                                index: h,
                                name: d,
                                mode: c,
                                data: e
                            }
            );
            e && DOM.setText(c, null, AGO.Menu.createTask(g), 9);
            AGO.Menu.appendRow(h ? "" : a, b, h ? 2 : 0, "", c)
        }

        var d, f;
        d = OBJ.split(AGO.Para.get(a, 6));
        b = b || a;
        a = e || a;
        f = 1;
        -1 === AGO.Para.getType(a) && (h(a, b, c, 0, "standard", d.standard || ""), AGO.Planets.iterate(0, function (b) {
                                                                                                            b = b.coordstype;
                                                                                                            d[b] && (h(a, "", c, f, b, d[b]), f++
                                                                                                            )
                                                                                                        }
        ), d[AGO.Acc.coordstype] || 3 !== AGO.Acc.type && -1 !== (c || ""
        ).indexOf("M") || h(a, "F09", c, f, AGO.Acc.coordstype, "")
        )
    }

    function s(a, b, c) {
        var d, h;
        for (h = d = 1; 10 > h; h++) {
            -1 === AGO.Para.getType(a + h) && AGO.Para.get(a + h, 6) && (v(a + h, b + "| " + d, c, a + d), e(4), d++
            );
        }
        10 > d && v("", b + "| " + d, c, a + d)
    }

    var t, m;
    if (t = document.getElementById("contentWrapper")) {
        AGO.Menu.status = 5, AGO.Menu.appendHeader(),
            AGO.Menu.appendTab("General"), AGO.Notify.Problem[17] && (AGO.Menu.appendSection("S80"), b("S81", "", "A51", 0, "", "", "https://antigame.de/home.php?lang=" + AGO.Menu.lang.toLowerCase()), e(12), AGO.Menu.appendRowContent(AGO.Label.get("S82"), null, 0, "", "#008000"), e(6), AGO.Menu.appendRowContent(AGO.Label.get("S83"), null, 0, "", "#008000"), e(6), AGO.Menu.appendRowContent(AGO.Label.get("S84"), null, 0, "", "#008000"), e(6), AGO.Menu.appendRowContent(AGO.Label.get("S85"), null, 0, "", "#008000")
        ), 5 <= AGO.Notify.problem && (AGO.Menu.appendSection("S40"),
        AGO.Notify.Problem[15] && (e(12), b("S55", "", "S40", 0, "", "#FF4B00", "http://board.origin.ogame.gameforge.com/index.php?page=Thread&threadID=6239")
        ), AGO.Notify.Problem[17] && (e(12), c("S57", "", "", 0, "", "#FF4B00")
        ), AGO.Notify.Problem[18] && (e(12), c("S58", "", "", 0, "", "#FF4B00")
        ), AGO.Notify.Problem[11] && (e(12), b("S51", "", "S40", 0, "", "#FF4B00", "http://board.origin.ogame.gameforge.com/index.php?page=Thread&threadID=6030")
        ), AGO.Notify.Problem[12] && (e(12), c("S52", "", "", 2, "", "#FF4B00")
        ), AGO.Notify.Problem[13] && (e(12),
            b("S53", "", "S40", 0, "", "#FF4B00", "http://board.origin.ogame.gameforge.com/index.php?page=Thread&threadID=5547")
        ), AGO.Notify.Problem[5] && (e(12), b("S45", "", "A51", 0, "", "#FF9600", "https://antigame.de/home.php?lang=" + AGO.Menu.lang.toLowerCase()), d("S45", "S41", "", 2)
        ), AGO.Notify.Problem[6] && (e(12), b("S46", "", "A51", 0, "", "#FF9600", "https://antigame.de/home.php?lang=" + AGO.Menu.lang.toLowerCase()), d("S46", "S41", "", 2)
        ), AGO.Notify.Problem[8] && (e(12), b("S48", "", "S40", 0, "", "#FF9600", "http://board.origin.ogame.gameforge.com/index.php?page=Thread&threadID=5168"),
            d("S48", "S41", "", 2)
        )
        ), AGO.Menu.appendSection("A00", "A80"), g("A10", "", AGO.Menu.selectLang, 0, "", "", {
                                                       type: "change",
                                                       role: "Label",
                                                       action: "change"
                                                   }
        ), b("A11", "", "A83", 0, "", "", {action: "disable"}), AGO.Menu.appendSection("A30"), d("A31"), d("A32", "", "", 2), d("A34"), AGO.Menu.appendSection("A50"), b("A53", "", "", 0, "ago_menu_action", "", AGO.isFirefox ? AGO.Menu.updatePath : {action: "install"}, "_self"), d("S44", "S41", "", 2, "ago_menu_action"), b("A52", "", "", 0, "ago_menu_action", "", "https://antigame.de/home.php?page=changelog" +
                                                                                                                                                                                                                                                                                                                                                                             (AGO.App.beta ? "&beta" : ""
                                                                                                                                                                                                                                                                                                                                                                             )
        ), b("A51", "", "A51", 0, "", "", "https://antigame.de/home.php?lang=" + AGO.Menu.lang.toLowerCase()), b("A55", "", "A55", 0, "", "", "http://board.origin.ogame.de/board203/"), b("A54", "", "A54", 0, "", "", "http://board.origin.ogame.de/board176/"), b("A56", "", "A57", 0, "", "", "https://antigame.de/antigame/translations/?lang=" + AGO.Menu.lang.toLowerCase()), b("S50", "", "S40", 0, "", "", "http://board.origin.ogame.de/board183/"), AGO.Menu.appendTab("Data"), AGO.Menu.appendSection("D00", "A80"), b("D01", "", "D0B",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 0, "", "", {action: "update"}
        ), e(12), g("D10", "", {
                        X0: " - ",
                        Account: "D45",
                        Panel: "D49",
                        Token: "D47",
                        DataBase: "D29",
                        Option: "D15",
                        X2: " - - - - - - - - - ",
                        acc: "D11",
                        ago: "D12"
                    }, 0, "", "", {type: "change", action: "reset"}
        ), e(12), g("D04", "", {
                        1: "D05",
                        2: "D06",
                        3: "D07"
                    }, 0, "", 17 === AGO.Notify.problem ? "#FF4B00" : "", {type: "change", action: "preset"}
        ), 17 === AGO.Notify.problem && c("S57", "", "", 2, "", "#FF4B00"), e(12), c("S21", "S21| (" + AGO.Uni.lang + " - " + AGO.Uni.abbr + " - " + AGO.Menu.selectLang[AGO.Uni.lang] + ")"), d("S24", "", "", 2), (AGO.Para.chooseTopscore(1,
                                                                                                                                                                                                                                             1, 1, 1, 1, 1, 1, 0
        ) || AGO.Para.get("S29")
                                                                                                                                                                                                                    ) && b("S29", "", "S2B", 2, "", "", {action: "topscore"}), e(12), c("D41"), c("D22"), c("D23"), d("D20", "", "", 2), 0 > AGO.DataBase.status && (c("S48", "", "", 0, "", "#FF9600"), d("S48", "S41", "", 2)
        ), AGO.Menu.appendSection("D60"), g("D61", "", {1: "D67", 2: "D68", 3: "D69"}, 0, "", "", {
                                                type: "change",
                                                role: "Sync",
                                                action: "change"
                                            }
        ), d("D62", "", "", 0, "ago_menu_display_2"), e(20), b("D70", "", "", 0, "", "", {
                                                                   role: "Sync",
                                                                   action: "backup"
                                                               }
        ), e(20), b("D80", "", "", 0, "", "", {role: "Sync", action: "list"}), d("D85", "", "", 2), e(20,
                                                                                                      "ago_menu_display_0"
        ), AGO.Menu.appendRowContent(DOM.create("textarea", {id: "ago_menu_D9C"}), "", 1, "ago_menu_sync_text ago_menu_display_1"), c("D9D", " ", "", 1, "ago_menu_sync_hint ago_menu_action"), c("D91", " ", "", 1, "ago_menu_sync_title ago_menu_action"), c("D95", " ", "", 1, "ago_menu_sync_info ago_menu_action"), m = document.createDocumentFragment(), AGO.Menu.appendButton(m, "D9E", "D8A", {
                                                                                                                                                                                                                                                                                                                                                                                          role: "Sync",
                                                                                                                                                                                                                                                                                                                                                                                          action: "restore"
                                                                                                                                                                                                                                                                                                                                                                                      }
        ), AGO.Menu.appendButton(m, "D9F", "AM2", {
                                     role: "Sync",
                                     action: "cancel"
                                 }
        ), c("D9B", " ", m, 1, "ago_menu_sync_list ago_menu_action"),
            AGO.Menu.appendTab("Usability"), AGO.Menu.appendSection("U10"), g("U11", "", {
                                                                                  0: " - ",
                                                                                  1: "OGame",
                                                                                  2: "U13",
                                                                                  3: "U14",
                                                                                  7: "U18"
                                                                              }
        ), l("U19", "", "CA5", 2), d("U22"), AGO.Menu.appendSection("U30"), d("U31"), d("U32", "", "", 2), d("U33", "", "", 2), d("U34"), d("U41"), g("U51", "", [
                                                                                                                                                          " - ",
                                                                                                                                                          "AI1",
                                                                                                                                                          "AI2"
                                                                                                                                                      ]
        ), g("U52", "", [
                 " - ",
                 "AI1",
                 "AI2"
             ]
        ), AGO.Menu.appendSection("U60"), d("U61"), g("U62", "", AGO.Menu.selectTooltip), g("U66", "", AGO.Menu.selectTooltip), g("U67", "", AGO.Menu.selectTooltip), g("U65", "", AGO.Menu.selectTooltip), AGO.Menu.appendTab("Coloring"),
            AGO.Menu.appendSection("CS0"), l("CS1", "", "", 0, "", 9), l("CS2", "", "", 0, "", 9), l("CS3", "", "", 0, "", 9), e(6), l("CS5", "", "CS5"), e(6), l("CSA", "", "CSA"), e(20), AGO.Menu.appendSection("CE0"), l("C94", "", "", 0, "", 6), l("C95", "", "", 0, "", 6), l("C96", "", "", 0, "", 6), l("C97", "", "", 0, "", 7), l("C98", "", "", 0, "", 7), l("C99", "", "", 0, "", 7), e(20), AGO.Menu.appendSection("CT0"), d("CT2"), f("C20", "CA4"), u("C2", 0, "CT2", 3), f("C40", "CA4"), u("C4", 0, "CT2", 2, "append"), f("C50", "CA4"), u("C5", 0, "CT2", 2, "append"),f("C60", "CA4"),u("C6", 0, "CT2",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             1, "append"
        ),u("C7", 0, "CT2", 1, "append"),e(20),AGO.Menu.appendSection("CM0"),d("CM3"),e(8),OBJ.iterate(AGO.Item.Mission, function (a) {
                                                                                                           l(a.replace(/M/, "C"), " ", "L" + a, 1)
                                                                                                       }
        ),AGO.Menu.appendTab("Tools"),AGO.Menu.appendSection("T00", "A80"),d("T01"),d("T02"),d("T03", "", "", 2),d("T05"),v("T06", "T06", "S"),AGO.Menu.appendSection("T10", "", "T00"),k("T1"),q("T1"),AGO.Menu.appendSection("T20", "", "T00"),k("T2"),q("T2"),AGO.Menu.appendSection("T30", "", "T00"),k("T3"),q("T3"),AGO.Menu.appendSection("T40", "", "T00"),k("T4"),
        q("T4"),AGO.Menu.appendSection("T50", "", "T00"),k("T5"),q("T5"),AGO.Menu.appendSection("T60", "", "T00"),k("T6"),q("T6"),AGO.Menu.appendSection("T70", "", "T00"),k("T7"),q("T7"),AGO.Menu.appendSection("T80", "", "T00"),k("T8"),q("T8"),AGO.Menu.appendSection("T90", "", "T00"),k("T9"),q("T9"),AGO.Menu.appendTab("Main"),AGO.Menu.appendSection("O00", "A80"),d("O02"),d("O04"),g("O03", "", [
                                                                                                                                                                                                                                                                                                                                                                                                     "B40",
                                                                                                                                                                                                                                                                                                                                                                                                     "F00",
                                                                                                                                                                                                                                                                                                                                                                                                     "E10",
                                                                                                                                                                                                                                                                                                                                                                                                     "G40",
                                                                                                                                                                                                                                                                                                                                                                                                     "M00"
                                                                                                                                                                                                                                                                                                                                                                                                 ]
        ),AGO.Menu.appendSection("I00"),g("I02", "", {0: "A90", 1: "A91", 4: "A94", 5: "A95", 6: "A96", 9: "A99"}),d([
                                                                                                                         "I03",
                                                                                                                         "I04"
                                                                                                                     ], "I03"
        ),d("I05"),AGO.Menu.appendSection("I80"),d("I81"),d("I82", "", "", 2),d("I83"),d("I85"),AGO.Menu.appendSection("O50"),d("O51"),d("O53"),d("O52"),d("O54"),d("O55"),AGO.Menu.appendTab("Buildings"),AGO.Menu.appendSection("A80"),d("B01"),d("B02"),d("B31"),g("B35", "", [
                                                                                                                                                                                                                                                                          "L091",
                                                                                                                                                                                                                                                                          "L092",
                                                                                                                                                                                                                                                                          "L093"
                                                                                                                                                                                                                                                                      ], 2
        ),d("B32", "", "", 2),AGO.Menu.appendSection("B00"),d("B11"),d("B12", "", "", 2),d("B15", "", "", 2),g("B21", "", [
                                                                                                                   " - ",
                                                                                                                   "B22",
                                                                                                                   "B23",
                                                                                                                   "B24"
                                                                                                               ]
        ),d("B04"),AGO.Menu.appendTab("Fleet"),AGO.Menu.appendSection("F00", "A80"),d("F01"),
        d("F03"),g("F02", "", [
                       " - ",
                       "B22",
                       "B23",
                       "B24"
                   ]
        ),d("F16"),d("F18"),e(12),v("F31", "F31", "RS"),AGO.Menu.appendSection("F50", "", "F00"),d("F51"),d("F52"),d("F53"),d("F54"),AGO.Menu.appendSection("F60", "", "F00"),g("F62", "ATC", [
                                                                                                                                                                                    "L202",
                                                                                                                                                                                    "L203",
                                                                                                                                                                                    "F63"
                                                                                                                                                                                ]
        ),g("F63", "", AGO.Menu.selectRoutineTranport),AGO.Menu.appendSection("FA0", "", "F00", {
                                                                                  1: "A91",
                                                                                  2: "A99",
                                                                                  3: "F06"
                                                                              }
        ),d("FA2"),g("FA1", "", {0: " - ", 1: "L081", 3: "L083"}),g("FA3", "", {
                                                                        0: " - ",
                                                                        2: "2 %",
                                                                        4: "4 %",
                                                                        7: "7 %",
                                                                        10: "10 %",
                                                                        14: "14 %",
                                                                        20: "20 %"
                                                                    }
        ),AGO.Menu.appendSection("FH0",
                                 "", "F00", {1: "A91", 2: "A99", 3: "F06"}
        ),AGO.Menu.appendSection("F80", "", "F00", {
                                     0: " - ",
                                     2: "A99",
                                     3: "F07"
                                 }
        ),v("F81", "F81", "TPCR"),AGO.Menu.appendSection("F90", "", "F00", {
                                                             0: " - ",
                                                             2: "A99",
                                                             3: "F07"
                                                         }
        ),v("F91", "F91", "TFRS"),AGO.Menu.appendSection("F70", "", "F00", {
                                                             0: " - ",
                                                             2: "A99",
                                                             3: "F07"
                                                         }
        ),d("F73"),v("F71", "F71", "TE"),AGO.Menu.appendSection("FL0", "", "F00", {
                                                                    0: " - ",
                                                                    2: "A99",
                                                                    3: "F07"
                                                                }
        ),d("FL2"),AGO.Menu.appendSection("F40", "", "F00"),s("F4", "F40", "T"),AGO.Menu.appendTab("Events"),AGO.Menu.appendSection("E10"),d("E11",
                                                                                                                                             "E01"
        ),d("E13"),d("E14"),AGO.Menu.appendSection("E20"),d("E21", "E01"),d("E22", "E02", "", 2),AGO.Menu.appendSection("E30"),AGO.Events.included || (c("S46", "", "", 0, "", "#FF9600"), d("S46", "S41", "", 2), e(12)
        ),d("E31", "E01"),d("E32", "E02", "", 2),d("E34", "", "", 2),g("E41", "B40", AGO.Menu.selectEvents),g("E47", "", AGO.Menu.selectEvents),g("E48", "B80", AGO.Menu.selectEvents),g("E42", "F00| I", AGO.Menu.selectEvents),g("E43", "F00| II", AGO.Menu.selectEvents),g("E44", "F00| III", AGO.Menu.selectEvents),g("E45", "E10", AGO.Menu.selectEvents),
        g("E46", "G40", AGO.Menu.selectEvents),g("E49", "", AGO.Menu.selectEvents),AGO.Menu.appendTab("Other"),AGO.Menu.appendSection("G40"),d("G41"),g("G42", "", [
                                                                                                                                                            " - ",
                                                                                                                                                            "1",
                                                                                                                                                            "2",
                                                                                                                                                            "3"
                                                                                                                                                        ]
        ),g("G45", "", [
                " - ",
                "G46",
                "G47",
                "G48"
            ]
        ),d("G43"),d("G44"),d("G51"),d("G58"),AGO.Menu.appendSection("G30"),d("G31"),d("G32"),d("G33"),d("G34"),d("G35"),v("G38", "G38", "S"),AGO.Menu.appendSection("G20"),d("G21"),AGO.Menu.appendTab("Messages"),AGO.Menu.appendSection("M00", "A80"),d("M04"),d("M05", "", "", 2),d("M88", "M80", "", 2),d("M89", "M80",
                                                                                                                                                                                                                                                                                                               "", 2
        ),d("M90", "M80", "", 2),AGO.Menu.appendSection("M70", "", "M00"),d("M74"),AGO.Menu.appendSection("M10", "", "M00"),d("M51"),d("M53", "", "", 2),d("M12"
        ),d("M16"),d("M14"),d("M20"),/*d("M28", "", "", 2),*/d("M30"),d("M36", "", "", 2),d("M37", "", "", 2),DOM.setStyleDisplay("#inhalt", t),DOM.setStyleDisplay("#buttonz", t),(m = t.querySelector("#ago_menu")
                                                                                                                                                                                      ) && m.parentNode.removeChild(m),DOM.prependChild(t, AGO.Menu.menuNode),a = a ? a : AGO.Notify.problem ? "General" : AGO.Menu.updateCounter ?
                                                                                                                                                                                                                                                                                                           "Data" : "overview" === AGO.App.page ? "Main" : VAL.check(AGO.App.page, "resources", "resourcesettings", "station", "research", "shipyard", "defense") ? "Buildings" : VAL.check(AGO.App.page, "fleet1", "fleet2", "fleet3") ? "Fleet" : "movement" === AGO.App.page ? "Events" : "galaxy" === AGO.App.page ? "Other" : "messages" === AGO.App.page ? "Messages" : "",AGO.Menu.Display({tab: a}),AGO.Menu.status = 8,t = m = null
    }
};
AGO.Menu.showTask = function (a) {
    function b() {
        var a;
        a = DOM.getValue("#ago_menu_edit_mission", q, 2);
        DOM.setAttribute(q, null, "ago_display_status", 5 === a ? 1 : 15 === a ? 2 : 0, 8)
    }

    function c() {
        var b, c;
        b = DOM.appendTR(u, "ago_menu_edit_header");
        b = DOM.appendTD(b, {colspan: 2}, "AT0", 10);
        "standard" === a.name ? DOM.appendSPAN(b, "", "AT1", 10) : (c = STR.check(a.name).split(":"), DOM.appendSPAN(b).innerHTML = STR.check(c[0]) + ":" + STR.check(c[1]) + ":" + STR.check(c[2]) + ("3" === c[3] ? " " + HTML.IMG(HTML.urlTypeIcon(3), 14) : ""
        )
        )
    }

    function f() {
        var b;
        b = DOM.appendTABLE(l);
        v = DOM.appendTR(b, "ago_menu_edit_footer");
        b = DOM.appendTD(v);
        DOM.appendA(b, "icon icon_delete ago_menu_edit_delete", null, {
                        role: "Task",
                        action: "delete",
                        id: a.id,
                        index: a.index
                    }
        );
        b = DOM.appendTD(v);
        AGO.Menu.appendButton(b, "", "AM2", {role: "Task", action: "cancel", id: a.id, index: a.index});
        b = DOM.appendTD(v);
        AGO.Menu.appendButton(b, "", "AM3", {role: "Task", action: "save", id: a.id, index: a.index})
    }

    function e(a, b) {
        var c;
        c = DOM.appendTR(u, "ago_menu_edit_section");
        DOM.appendTD(c, "ago_menu_edit_title", a,
                     10
        );
        DOM.appendTD(c, "ago_menu_edit_title", b)
    }

    function g(a, b) {
        var c;
        c = DOM.appendTR(u);
        DOM.appendTD(c, "ago_menu_edit_label", a, 10);
        c = DOM.appendTD(c, "ago_menu_edit_input");
        DOM.append(c, "input", {id: "ago_menu_edit_" + b, type: "text", value: STR.check(s[b])})
    }

    function d(a, b) {
        var c, d, h;
        b ? (h = {"-": " - "}, AGO.Planets.iterate(1, function (a) {
                                                       h[a.coords] = a.coords
                                                   }
        ), k("AT4", "coords", s.coords, h)
        ) : (c = DOM.appendTR(u), d = DOM.appendTD(c, "ago_menu_edit_label", a, 10), d = DOM.appendTD(c, "ago_menu_edit_input"), DOM.append(d, "input",
                                                                                                                                            {
                                                                                                                                                id: "ago_menu_edit_galaxy",
                                                                                                                                                type: "text",
                                                                                                                                                value: STR.check(s.galaxy)
                                                                                                                                            }, {width: "20px"}
        ), DOM.append(d, "input", {
                          id: "ago_menu_edit_system",
                          type: "text",
                          value: STR.check(s.system)
                      }, {width: "30px"}
        ), DOM.append(d, "input", {
                          id: "ago_menu_edit_position",
                          type: "text",
                          value: STR.check(s.position)
                      }, {width: "20px"}
        )
        )
    }

    function k(a, b, c, d, h) {
        h = DOM.appendTR(u, h);
        DOM.appendTD(h, "ago_menu_edit_label", a, 10);
        a = DOM.appendTD(h, "ago_menu_edit_input");
        DOM.appendSELECT(a, {id: "ago_menu_edit_" + b}, d, STR.zero(c))
    }

    function p(a) {
        var b;
        a = (a ||
             "8"
            ) + "px";
        b = DOM.appendTR(u);
        b = DOM.appendTD(b, "ago_menu_space", "");
        DOM.set(b, null, {colspan: 2}, {fontSize: a, height: a, lineHeight: a})
    }

    var q, l, u, v, s, t, m;
    AGO.Menu.hideTask();
    (q = document.getElementById("ago_menu_edit")
    ) && -1 === AGO.Para.getType(a.id) && (t = STR.check(a.mode) || "TRS", s = AGO.Task.split(a.data, 2, 4), 0 <= t.indexOf("E") && OBJ.copy({
                                                                                                                                                 type: 0,
                                                                                                                                                 mission: 15
                                                                                                                                             }, s
    ), "active" === s.detail && (s.coords = "active"
    ), DOM.addClass(AGO.Menu.id(a.id, a.index), "id", "ago_menu_selected"), DOM.setData(q, null, {
                                                                                            id: a.id,
                                                                                            index: a.index
                                                                                        }
    ), AGO.Observer.set("mousedown",
                        "ago_menu_edit", function () {
            AGO.Menu.hideTask({action: "save"})
        }
    ), l = document.createDocumentFragment(), u = DOM.appendTABLE(l), u.innerHTML = '<colgroup><col style="width: 240px;"></col><col style="width: 150px;"></col></colgroup>', c(), 0 <= t.indexOf("T") && (d("AT4", 0 <= t.indexOf("P")), 0 <= t.indexOf("E") ? (g("ATT", "detail2"), k("AT6", "mission", s.mission, {15: "LM15"}, "ago_menu_edit_hidden")
    ) : (k("AT5", "type", s.type, [" - ", "L081", "L082", "L083"]), m = 0 <= t.indexOf("C") ? {
        0: " - ",
        3: "LM03",
        4: "LM04"
    } : {
                                                                            0: " - ",
                                                                            1: "LM01",
                                                                            2: "LM02",
                                                                            3: "LM03",
                                                                            4: "LM04",
                                                                            5: "LM05",
                                                                            6: "LM06",
                                                                            7: "LM07",
                                                                            8: "LM08",
                                                                            9: "LM09",
                                                                            15: "LM15"
                                                                        }, k("AT6", "mission", s.mission, m)
                                                                                                                                                                                                                                           ), k("AT7", "speed", s.speed, " - ;10%;20%;30%;40%;50%;60%;70%;80%;90%;100%".split(";")), k("AT8", "holdingtime", s.holdingtime, {
                                                                                                                                                                                                                                                                                                                                           0: " - ",
                                                                                                                                                                                                                                                                                                                                           "-1": "0",
                                                                                                                                                                                                                                                                                                                                           1: "1",
                                                                                                                                                                                                                                                                                                                                           2: "2",
                                                                                                                                                                                                                                                                                                                                           4: "4",
                                                                                                                                                                                                                                                                                                                                           8: "8",
                                                                                                                                                                                                                                                                                                                                           16: "16",
                                                                                                                                                                                                                                                                                                                                           32: "32"
                                                                                                                                                                                                                                                                                                                                       }, "ago_menu_display_1"
    ), m = " - ;1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24;25".split(";"), k("AT9", "expeditiontime", s.expeditiontime, m, "ago_menu_display_2"), 0 <= t.indexOf("E") || 0 <= t.indexOf("C")
    ) && (p(),
        k("ATC", "preferCargo", s.preferCargo, {
              0: " - ",
              202: "L202",
              203: "L203"
          }
        ), 0 <= t.indexOf("E") && k("ATS", "preferShip", s.preferShip, {
                                        0: " - ",
                                        204: "L204",
                                        205: "L205",
                                        206: "L206",
                                        207: "L207",
                                        211: "L211",
                                        213: "L213",
                                        215: "L215"
                                    }
    )
                                                                                                                                                                                    ), 0 <= t.indexOf("R") && (e("AT2"), g("L091", "metal"), g("L092", "crystal"), g("L093", "deuterium"), p(), k("ATR", "preferResource", s.preferResource, [
                                                                                                                                                                                                                                                                                                      " - ",
                                                                                                                                                                                                                                                                                                      "L091",
                                                                                                                                                                                                                                                                                                      "L092",
                                                                                                                                                                                                                                                                                                      "L093"
                                                                                                                                                                                                                                                                                                  ]
    )
    ), 0 <= t.indexOf("S") && (e("AT3"), OBJ.iterate(AGO.Item.ShipCivil, function (a) {
                                                         g("L" + a, a)
                                                     }
    ), p(12), OBJ.iterate(AGO.Item.ShipCombat, function (a) {
                              g("L" +
                                a, a
                              )
                          }
    )
    ), f(), DOM.replaceChildren(q, l), DOM.setStyleDisplay(q, null, "block"), AGO.Menu.setPosition("ago_menu_edit", a.pageY), DOM.addEvents("#ago_menu_edit #ago_menu_edit_mission", null, {change: b}), b()
    )
};
AGO.Menu.hideTask = function (a) {
    var b, c, f, e, g, d;
    AGO.Observer.set("mousedown");
    if (b = document.getElementById("ago_menu_edit")) {
        f = OBJ.is(a) ? a.action : "";
        a = DOM.getData(b, null, 2);
        c = a.id ? document.getElementById(AGO.Menu.id(a.id, a.index)) : null;
        DOM.setData(b, null, {});
        DOM.removeClass(c, null, "ago_menu_selected");
        if (c && -1 === AGO.Para.getType(a.id) && VAL.check(f, "save", "delete")) {
            a = DOM.getData(c, null, 0);
            "delete" === f && (a.data = ""
            );
            if ("save" === f) {
                e = {};
                f = b.querySelectorAll("input, select");
                for (d = 0; d < f.length; d++) {
                    g = DOM.getAttribute(f[d],
                                         null, "id", 7
                    ).split("_")[3], "coords" === g ? (g = DOM.getValue(f[d], null, 7), AGO.Task.updateCoordsType(e, g), e.detail = "active" === g ? "active" : ""
                    ) : g && (e[g] = DOM.getValue(f[d], null, 2)
                    );
                }
                5 !== e.mission && (e.holdingtime = 0
                );
                15 !== e.mission && (e.expeditiontime = 0
                );
                a.data = AGO.Task.join(e, 2);
                35 === a.data.length && (a.data = ""
                )
            }
            DOM.setText(c, null, AGO.Menu.createTask(AGO.Task.split(a.data, 2, 4)), 9);
            DOM.setData(c, null, a)
        }
        DOM.setStyleDisplay(b, null)
    }
};
AGO.Menu.createTask = function (a) {
    return (a.galaxy || a.system || a.position ? '<span style="width: 52px">' + (a.galaxy || "- "
        ) + ":" + (a.system || " - "
                                                 ) + ":" + (a.position || " -"
                                                 ) + "</span>" : '<span style="width: 52px"> </span>'
           ) + "<span>" + HTML.IMG(HTML.urlTypeIcon(a.type), 14) + "</span><span>" + HTML.IMG(HTML.urlMissionIcon(a.mission), 14) + '</span><span style="font-size: 9px; width: 30px">' + (0 < a.speed && 10 > a.speed ? 10 * a.speed + "%" : ""
           ) + '</span><span style="width: 20px">' + (a.resources ? "R" : ""
           ) + '</span><span style="width: 20px">' +
           (a.ships ? "S" : ""
           ) + "</span>"
};
AGO.Menu.showPicker = function (a) {
    function b() {
        a.condition = DOM.getValue("ago_menu_picker_condition", "id", 2);
        VAL.check(a.condition, 2, 6, 13, 16) ? DOM.removeAttribute("ago_menu_picker_limit", "id", "disabled") : DOM.setAttribute("ago_menu_picker_limit", "id", "disabled", "disabled")
    }

    function c() {
        a.darken = DOM.getProperty("ago_menu_picker_darken", "id", "checked", 1);
        e(a.colorDefault, !0)
    }

    function f() {
        var b, c;
        DOM.setData("ago_menu_picker", "id", {id: a.id, color: a.color, opacity: a.opacity});
        if (b = document.getElementById("ago_menu_picker_h-marker")) {
            c =
            6.28 * a.hsl[0], b.style.left = Math.round(Math.sin(c) * a.radius + a.width / 2) + "px", b.style.top = Math.round(-Math.cos(c) * a.radius + a.width / 2) + "px";
        }
        if (b = document.getElementById("ago_menu_picker_sl-marker")) {
            b.style.left = Math.round(a.square * (.5 - a.hsl[1]
                                      ) + a.width / 2
            ) + "px", b.style.top = Math.round(a.square * (.5 - a.hsl[2]
                                               ) + a.width / 2
            ) + "px";
        }
        if (b = document.getElementById("ago_menu_picker_square")) {
            b.style.backgroundColor = v(s([a.hsl[0], 1, .5]));
        }
        if (b = document.getElementById("ago_menu_picker_name")) {
            b.style.color = a.color;
        }
        if (b = document.getElementById("ago_menu_picker_color")) {
            b.style.backgroundColor =
            a.darken ? "#FFFFFF" : HTML.color(a.color, a.opacity || a.opacityDefault), b.style.color = .5 < a.hsl[2] ? "#111" : "#ddd", b.value = a.color.toUpperCase().replace(/#/g, "");
        }
        if (b = document.getElementById("ago_menu_picker_opacity")) {
            b.value = a.opacity || "";
        }
        if (b = document.getElementById(x)) {
            b.style.color = a.color;
        }
        (b = document.getElementById(AGO.Menu.id(a.id))
        ) && a.status && (b.style.backgroundColor = a.darken ? "#13181D" : HTML.color(a.color, a.opacity || a.opacityDefault), b.style.opacity = a.darken ? (a.opacity || a.opacityDefault
                                                                                                                                                            ) / 100 : 1
        )
    }

    function e(b,
               c
    ) {
        b = "#" + STR.check(b).replace(/#/g, "");
        if (a.color !== b || c) {
            a.color = b;
            var d;
            d = a.color;
            d = 7 === d.length ? [
                parseInt(d.substring(1, 3), 16) / 255,
                parseInt(d.substring(3, 5), 16) / 255,
                parseInt(d.substring(5, 7), 16) / 255
            ] : 4 === d.length ? [
                parseInt(d.substring(1, 2), 16) / 15,
                parseInt(d.substring(2, 3), 16) / 15,
                parseInt(d.substring(3, 4), 16) / 15
            ] : [0, 0, 0];
            a.rgb = d;
            var e = a.rgb, g, l, k, m, n, p;
            d = e[0];
            n = e[1];
            p = e[2];
            g = Math.min(d, Math.min(n, p));
            e = Math.max(d, Math.max(n, p));
            l = e - g;
            m = k = 0;
            g = (g + e
                ) / 2;
            0 < g && 1 > g && (m = l / (.5 > g ? 2 * g : 2 - 2 * g
            )
            );
            0 < l && (e === d &&
                      e !== n && (k += (n - p
                                       ) / l
            ), e === n && e !== p && (k += 2 + (p - d
                                               ) / l
            ), e === p && e !== d && (k += 4 + (d - n
                                               ) / l
            ), k /= 6
            );
            a.hsl = [k, m, g];
            f()
        }
    }

    function g(b) {
        b = NMR.minMax(+b, 0, 100);
        a.opacity !== b && (a.opacity = b, f()
        )
    }

    function d(b) {
        a.darken || b[0] === a.hsl[0] && b[1] === a.hsl[1] && b[2] === a.hsl[2] || (a.hsl = b, a.rgb = s(b), a.color = v(a.rgb), f()
        )
    }

    function k(b) {
        var c;
        b && (b.preventDefault(), document.ago_menu_dragging || (document.ago_menu_dragging = !0, document.addEventListener("mousemove", p, !1), document.addEventListener("mouseup", q, !1)
        ), c = l(b), a.circleDrag = 2 *
                                    Math.max(Math.abs(c.x), Math.abs(c.y)) > a.square, p(b)
        );
        return !1
    }

    function p(b) {
        var c;
        b && (b.preventDefault(), c = l(b), a.circleDrag ? (b = Math.atan2(c.x, -c.y) / 6.28, 0 > b && (b += 1
        ), d([b, a.hsl[1], a.hsl[2]])
        ) : (b = Math.max(0, Math.min(1, -(c.x / a.square
                                      ) + .5
                          )
        ), c = Math.max(0, Math.min(1, -(c.y / a.square
                                    ) + .5
                        )
        ), d([a.hsl[0], b, c])
                                            )
        );
        return !1
    }

    function q() {
        document.ago_menu_dragging = !1;
        document.removeEventListener("mousemove", p, !1);
        document.removeEventListener("mouseup", q, !1)
    }

    function l(b) {
        var c;
        c = u(document.getElementById("ago_menu_picker_wheel"));
        return {x: b.pageX - c.x - a.width / 2, y: b.pageY - c.y - a.width / 2}
    }

    function u(a) {
        var b;
        b = {x: a.offsetLeft, y: a.offsetTop};
        a.offsetParent && (a = u(a.offsetParent), b.x += a.x, b.y += a.y
        );
        return b
    }

    function v(a) {
        var b, c;
        b = Math.round(255 * a[0]);
        c = Math.round(255 * a[1]);
        a = Math.round(255 * a[2]);
        return "#" + (16 > b ? "0" : ""
            ) + b.toString(16) + (16 > c ? "0" : ""
               ) + c.toString(16) + (16 > a ? "0" : ""
               ) + a.toString(16)
    }

    function s(a) {
        var b, c;
        c = a[0];
        b = a[1];
        a = a[2];
        b = .5 >= a ? a * (b + 1
        ) : a + b - a * b;
        a = 2 * a - b;
        return [t(a, b, c + .33333), t(a, b, c), t(a, b, c - .33333)]
    }

    function t(a, b,
               c
    ) {
        c = 0 > c ? c + 1 : 1 < c ? c - 1 : c;
        return 1 > 6 * c ? a + (b - a
                               ) * c * 6 : 1 > 2 * c ? b : 2 > 3 * c ? a + (b - a
                                                                           ) * (.66666 - c
                                                                           ) * 6 : a
    }

    var m, n, r, w, x;
    AGO.Menu.hidePicker();
    (m = document.getElementById("ago_menu_picker")
    ) && OBJ.is(a) && AGO.Para.getType(a.id) && (x = 20 === a.mode ? AGO.Menu.id(a.id) : "ago_menu_label_" + a.id, a.status = 22 <= a.mode ? 2 : 21 <= a.mode ? 1 : 0, a.radius = 84, a.square = 100, a.width = 194, a.colorDefault = STR.check(AGO.Para.getDefault(a.id, AGO.Menu.get("D04"))).split("|")[0] || "", a.colorDefault = !a.colorDefault || VAL.check(a.colorDefault.toUpperCase(), "INHERIT",
                                                                                                                                                                                                                                                                                                                                                                   "DISABLE"
    ) ? STR.check(AGO.Para.getDefaultValue(a.id)) : a.colorDefault, a.label = AGO.Label.get(a.label), a.color || (a.color = a.colorDefault, a.opacity = STR.check(AGO.Para.getDefault(a.id, AGO.Menu.get("D04"))).split("|")[1] || "", a.condition = STR.check(AGO.Para.getDefault(a.id, AGO.Menu.get("D04"))).split("|")[2] || "", a.limit = STR.check(AGO.Para.getDefault(a.id, AGO.Menu.get("D04"))).split("|")[3] || ""
    ), a.opacity = a.status ? +a.opacity || 0 : 100, a.condition = a.status ? +a.condition || 0 : 0, a.limit = a.status ? +a.limit || 0 : 0, DOM.setData(m,
                                                                                                                                                         null, {id: a.id}
    ), DOM.setAttribute(m, null, "ago_display_status", a.status, 8), DOM.addClass(AGO.Menu.id(a.id), "id", "ago_menu_selected"), DOM.removeClass(x, "id", "ago_menu_color_disabled"), w = document.createDocumentFragment(), n = DOM.appendDIV(w, "ago_menu_picker_header"), 23 <= a.mode ? DOM.append(n, "input", {
                                                                                                                                                                                                                                                                                                           type: "text",
                                                                                                                                                                                                                                                                                                           id: "ago_menu_picker_name",
                                                                                                                                                                                                                                                                                                           value: a.name || a.label
                                                                                                                                                                                                                                                                                                       }
    ) : DOM.appendSPAN(n, {id: "ago_menu_picker_name"}, a.label), DOM.append(n, "input", {
                                                                                 type: "text",
                                                                                 id: "ago_menu_picker_color"
                                                                             }
    ), n = DOM.appendDIV(w, "ago_menu_picker_wrapper"),
        DOM.appendDIV(n, {id: "ago_menu_picker_square"}), DOM.appendDIV(n, {id: "ago_menu_picker_wheel"}), DOM.appendDIV(n, "ago_menu_picker_overlay"), DOM.appendDIV(n, {id: "ago_menu_picker_h-marker"}), DOM.appendDIV(n, {id: "ago_menu_picker_sl-marker"}), n = DOM.appendDIV(w, "ago_menu_picker_opacity ago_picker_display_1"), DOM.appendSPAN(n, null, "CA6", 10), DOM.append(n, "input", {
                                                                                                                                                                                                                                                                                                                                                                                          type: "text",
                                                                                                                                                                                                                                                                                                                                                                                          id: "ago_menu_picker_opacity",
                                                                                                                                                                                                                                                                                                                                                                                          value: a.opacity || ""
                                                                                                                                                                                                                                                                                                                                                                                      }
    ), n = DOM.appendDIV(w, "ago_menu_picker_title ago_picker_display_2"), DOM.appendTEXT(n, "CA4",
                                                                                          10
    ), n = DOM.appendDIV(w, "ago_menu_picker_meta ago_picker_display_2"), r = DOM.appendDIV(n), DOM.appendSELECT(r, {id: "ago_menu_picker_condition"}, AGO.Menu["selectHighlight" + STR.check(a.options)], STR.zero(a.condition)), DOM.append(r, "input", {
                                                                                                                                                                                                                                                  type: "text",
                                                                                                                                                                                                                                                  id: "ago_menu_picker_limit",
                                                                                                                                                                                                                                                  value: a.limit || ""
                                                                                                                                                                                                                                              }
    ), r = DOM.appendDIV(n), DOM.appendSPAN(r, null, "CA7", 10), DOM.append(r, "input", {
                                                                                type: "checkbox",
                                                                                id: "ago_menu_picker_darken"
                                                                            }, null, null, {checked: a.darken}
    ), n = DOM.appendDIV(w, "ago_menu_picker_footer"), DOM.appendA(n, "icon icon_delete",
                                                                   null, {role: "Picker", action: "delete", id: a.id}
    ), AGO.Menu.appendButton(n, "", "AM2", {
                                 role: "Picker",
                                 action: "cancel",
                                 id: a.id
                             }
    ), AGO.Menu.appendButton(n, "", "AM3", {
                                 role: "Picker",
                                 action: "save",
                                 id: a.id
                             }
    ), DOM.replaceChildren(m, w), DOM.addEvents("ago_menu_picker_condition", "id", {change: b}), DOM.addEvents("ago_menu_picker_color", "id", {
                                                                                                                   keyup: function () {
                                                                                                                       e(this.value)
                                                                                                                   },
                                                                                                                   dblclick: function () {
                                                                                                                       e("")
                                                                                                                   }
                                                                                                               }
    ), DOM.addEvents("ago_menu_picker_opacity", "id", {
                         keyup: function () {
                             g(this.value)
                         }, dblclick: function () {
                             g("")
                         }
                     }
    ), DOM.addEvents("ago_menu_picker_darken",
                     "id", {change: c}
    ), DOM.addEvents("input#ago_menu_picker_name", null, {
                         click: function () {
                             this.value === a.label && (this.value = ""
                             )
                         }, dblclick: function () {
                             this.value = ""
                         }
                     }
    ), DOM.addEventsAll("#ago_menu_picker .ago_menu_picker_wrapper *", null, {mousedown: k}), AGO.Observer.set("mousedown", "ago_menu_picker", AGO.Menu.hidePicker), b(), e(a.color || "#FFFFFF", "force"), DOM.setStyleDisplay(m, null, "block"), AGO.Menu.setPosition("ago_menu_picker", a.pageY), m = n = r = w = null
    )
};
AGO.Menu.hidePicker = function (a) {
    var b, c, f, e, g, d;
    AGO.Observer.set("mousedown");
    if (b = document.getElementById("ago_menu_picker")) {
        e = OBJ.is(a) ? a.action : "", a = DOM.getData(b, null, 0), g = STR.check(a.color), d = NMR.minMax(+a.opacity, 0, 100), DOM.setData(b, null, {}), AGO.Para.getType(a.id) && (c = document.getElementById("ago_menu_label_" + a.id), f = document.getElementById(AGO.Menu.id(a.id)), c && f && (DOM.removeClass(f, null, "ago_menu_selected"), a = DOM.getData(f, null, 0), VAL.check(AGO.Para.getType(a.id), 20, 21, 22, 23) && ("cancel" !==
                                                                                                                                                                                                                                                                                                                                                                                                                                         e && (a.darken = DOM.getProperty("ago_menu_picker_darken", "id", "checked", 1), a.color = "delete" === e ? "" : a.darken ? "INHERIT" : g, a.opacity = d, a.condition = DOM.getValue("ago_menu_picker_condition", "id", 2), a.name = DOM.getValue("ago_menu_picker_name", "id", 7), a.limit = DOM.getValue("ago_menu_picker_limit", "id", 3), a.limit = 16 === a.condition ? NMR.minMax(a.limit, 1, 60) : VAL.check(a.condition, 2, 6, 13) ? NMR.minMax(a.limit, 1, 99999999) : 0, DOM.setData(f, null, a), 23 === a.mode && a.name && DOM.setText(c, null, a.name), 21 <= a.mode && (e = "selectHighlight" +
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  STR.check(a.options), e = a.color && a.condition && e && OBJ.is(AGO.Menu[e]) ? AGO.Menu[e][a.condition] : "", DOM.setText(".ago_menu_color_condition", f, e, 10), DOM.setText(".ago_menu_color_limit", f, e ? a.limit : "", 2)
        )
                                                                                                                                                                                                                                                                                                                                                                                                                                         ), 20 === a.mode ? DOM.setStyleColor(f, null, a.color) : (DOM.setStyleColor(c, null, "INHERIT" === a.color ? a.colorDefault : a.color), f.style.backgroundColor = a.color && "INHERIT" !== a.color && (21 === a.mode || a.condition
        ) ? HTML.color(a.color, a.opacity || a.opacityDefault || 0) : "#13181D", "INHERIT" !== a.color && (f.style.opacity = 1
        )
        ), a.color ||
           DOM.addClass(20 === a.mode ? f : c, null, "ago_menu_color_disabled")
        )
        )
        ), DOM.setStyleDisplay(b, null)
    }
};
AGO.Menu.Sync = function (a) {
    function b(a) {
        var b;
        document.getElementById("ago_menu") && a && a.tab && (AGO.Menu.changeSection("D60", {action: 1}), AGO.Menu.updateLabel("D91", " "), AGO.Menu.updateDetail("D91", " "), AGO.Menu.updateLabel("D95", " "), AGO.Menu.updateDetail("D95", " "), AGO.Menu.updateLabel("D9B", " "), 1 === a.tab ? DOM.setValue("ago_menu_D9C", "id", JSON.stringify(a.data)) : a.error ? AGO.Menu.updateDetail("D91", "I0C", 10, "#FF4B00") : (AGO.Menu.updateLabel("D91", [
                                                                                                                                                                                                                                                                                                                                                                                                                                                          "",
                                                                                                                                                                                                                                                                                                                                                                                                                                                          "D77",
                                                                                                                                                                                                                                                                                                                                                                                                                                                          "D78",
                                                                                                                                                                                                                                                                                                                                                                                                                                                          "D79"
                                                                                                                                                                                                                                                                                                                                                                                                                                                      ][a.tab], 10, "#00B000"
        ), AGO.Menu.updateDetail("D91",
                                 a.timestamp, 17, "inherit"
        ), AGO.Menu.updateLabel("D95", "D95", 10), a.timestampLocal ? AGO.Menu.updateDetail("D95", a.timestampLocal, 17, "inherit") : AGO.Menu.updateDetail("D95", "I0C", 10, "inherit"), b = DOM.create("ul"), OBJ.iterate(a.list, function (c) {
                                                                                                                                                                                                                                a.list[c] && DOM.appendLI(b, HTML.classStatusData(a.list[c]), c)
                                                                                                                                                                                                                            }
        ), AGO.Menu.updateLabel("D9B", b)
        )
        )
    }

    function c(a) {
        var b, c;
        if (document.getElementById("ago_menu") && a && a.tab) {
            if (AGO.Menu.changeSection("D60", {action: 2}), AGO.Menu.updateLabel("D91", " "), AGO.Menu.updateDetail("D91",
                                                                                                                    " "
                ), AGO.Menu.updateLabel("D95", " "), AGO.Menu.updateDetail("D95", " "), AGO.Menu.updateLabel("D9B", " "), AGO.Menu.updateButton("D9E", "D8A", "#FFFFFF"), -1 === a.status) {
                AGO.Menu.updateDetail("D91", "I0C", 10, "#FF4B00");
            } else {
                c = 1 === a.status ? "D91" : 4 === a.status ? "D92" : 3 === a.status ? "D93" : "I0C";
                AGO.Menu.updateLabel("D91", c, 10, HTML.colorStatusData(a.status));
                a.timestamp ? AGO.Menu.updateDetail("D91", a.timestamp, 17, "inherit") : AGO.Menu.updateDetail("D91", "I0C", 10, "#FF4B00");
                AGO.Menu.updateLabel("D95", "D95", 10);
                a.timestampLocal ?
                AGO.Menu.updateDetail("D95", a.timestampLocal, 17, "inherit") : AGO.Menu.updateDetail("D95", "I0C", 10, "inherit");
                b = DOM.create("ul");
                if (1 === a.tab) {
                    if (a.universal) {
                        DOM.appendLI(b, "ago_menu_sync_universal", "D90", 10);
                    } else if (-1 === a.com || -1 === a.uni || -1 === a.player) {
                        c = DOM.appendLI(b), AGO.Menu.appendButton(c, "D90", "D90", {
                                                                       role: "Sync",
                                                                       action: "list",
                                                                       universal: !0
                                                                   }
                        );
                    }
                }
                c = DOM.appendLI(b);
                DOM.appendSPAN(c, HTML.classStatusData(a.com), AGO.Uni.lang);
                DOM.appendSPAN(c, "", "\u2009\u2009\u2009");
                DOM.appendSPAN(c, HTML.classStatusData(a.uni),
                               AGO.Uni.abbr
                );
                DOM.appendSPAN(c, "", "\u2009\u2009\u2009");
                DOM.appendSPAN(c, HTML.classStatusData(a.player), AGO.Acc.name);
                c = DOM.appendLI(b, "", "  ");
                OBJ.iterate(a.list, function (c) {
                                a.list[c] && DOM.appendLI(b, HTML.classStatusData(a.list[c]), c)
                            }
                );
                AGO.Menu.updateLabel("D9B", b)
            }
        }
    }

    function f(a) {
        1 === a.tab && DOM.setValue("ago_menu_D9C", "id", "");
        1 === a.status ? (AGO.Menu.updateButton("D9E", "D8A", "#00B000"), AGO.Init.Location("", 800)
        ) : AGO.Menu.updateButton("D9E", "D8A", "#FF0000")
    }

    var e, g, d, k, p, q;
    OBJ.is(a) && (e = AGO.Menu.get("D61"),
        k = a.action, p = STR.check(AGO.Menu.get("D62")), p = NMR.isMinMax(p.length, 4, 30) ? p : AGO.Planets.getHome(), "backup" === k ? AGO.Init.Valid(function () {
                                                                                                                                                             AGB.message("Data", "Backup", {
                                                                                                                                                                             tab: e,
                                                                                                                                                                             ident: p
                                                                                                                                                                         }, b
                                                                                                                                                             )
                                                                                                                                                         }
    ) : "list" === k ? (g = AGO.Menu.get("D85") ? 4 : 2, d = 1 === e ? DOM.getValue("#ago_menu_section_D60 #ago_menu_D9C", null, 7) : "", q = Boolean(1 === e && a.universal), AGO.Init.Valid(function () {
                                                                                                                                                                                                  AGB.message("Data", "Restore", {
                                                                                                                                                                                                                  action: "list",
                                                                                                                                                                                                                  tab: e,
                                                                                                                                                                                                                  type: g,
                                                                                                                                                                                                                  value: d,
                                                                                                                                                                                                                  ident: p,
                                                                                                                                                                                                                  universal: q
                                                                                                                                                                                                              }, c
                                                                                                                                                                                                  )
                                                                                                                                                                                              }
    )
    ) : "restore" === k ? (g = AGO.Menu.get("D85") ? 4 : 2, d = 1 === e ? DOM.getValue("#ago_menu_section_D60 #ago_menu_D9C",
                                                                                       null, 7
    ) : "", q = Boolean(1 === e && document.querySelector("#ago_menu_label_D9B .ago_menu_sync_universal")), AGO.Init.Valid(function () {
                                                                                                                               AGO.Menu.updateButton("D9E", "D8A| ......", "#FF9600");
                                                                                                                               AGB.message("Data", "Restore", {
                                                                                                                                               action: "restore",
                                                                                                                                               tab: e,
                                                                                                                                               type: g,
                                                                                                                                               value: d,
                                                                                                                                               ident: p,
                                                                                                                                               universal: q
                                                                                                                                           }, f
                                                                                                                               )
                                                                                                                           }, function () {
                                                                                                                               AGO.Menu.updateButton("D9E", "D8A", "#FF0000")
                                                                                                                           }
    )
    ) : "change" === k && (AGO.Menu.changeSection("D60", {action: 0}), AGO.Menu.Display()
    )
    )
};
AGO.Para = {
    Data: {}, Info: {}, Init: function (a) {
        AGB.message("Option", "Menu", {}, function (b) {
                        b && OBJ.is(b.Para) && OBJ.is(b.Data) && (AGO.Para.Limit = b.Limit || {}, AGO.Para.Info = b.Para || {}, AGO.Para.Data = b.Data || {}
                        );
                        AGO.Para.get("S29") <= AGO.Uni.topScore && AGO.Para.set("S29", 0);
                        "function" === typeof a && a()
                    }
        )
    }, Save: function () {
        AGO.Init.Valid(function () {
                           AGB.message("Option", "Save", {data: AGO.Para.Data}, function (a) {
                                           a && (AGO.Option.Init(a), AGO.Option.Save(), AGO.Styles.Load(!0), AGO.Notify.set("Problem", -17), AGO.Notify.set("D03",
                                                                                                                                                            4
                                           ), AGO.Init.Messages("Panel", "Display"), AGO.Init.Messages("Main", "Display")
                                           )
                                       }
                           )
                       }
        )
    }, Preset: function (a) {
        NMR.isMinMax(a, 1, 3) && OBJ.iterate(AGO.Para.Info, function (b) {
                                                 AGO.Para.Info[b][0] && 4 <= AGO.Para.Info[b].length && AGO.Para.set(b, AGO.Para.getDefault(b, a))
                                             }
        )
    }, set: function (a, b) {
        var c;
        a = AGO.Para.valid(a);
        c = OBJ.get(AGO.Para.Info[a], 0);
        a && c && (1 === c ? AGO.Para.Data[a] = b && "0" !== b ? 1 : 0 : 2 === c ? (b = NMR.parseIntFormat(b), a in AGO.Para.Limit && (b = Math.max(Math.min(b, AGO.Para.Limit[a][1]), AGO.Para.Limit[a][0])
        ), AGO.Para.Data[a] =
           b
        ) : AGO.Para.Data[a] = -1 === c ? AGO.Para.validTask(b) : AGO.Para.valid(b)
        )
    }, get: function (a, b) {
        var c;
        a = AGO.Para.valid(a);
        c = OBJ.get(AGO.Para.Info[a], 0);
        return a && c ? 1 === c ? AGO.Para.Data[a] ? 1 : 0 : 2 === c ? +AGO.Para.Data[a] || 0 : STR.check(AGO.Para.Data[a]) : 6 === b ? "" : 0
    }, is: function (a) {
        return Boolean(a && AGO.Para.Info[a] && AGO.Para.Info[a][0] && AGO.Para.Data[a])
    }, getPair: function (a) {
        return AGO.Para.Info[a] && AGO.Para.Info[a][0] ? "string" === typeof AGO.Para.Data[a] && -1 < AGO.Para.Data[a].indexOf("|") ? AGO.Para.Data[a].split("|",
                                                                                                                                                             2
        ) : [STR.check(AGO.Para.Data[a]), ""] : ["", ""]
    }, getColor: function (a, b) {
        var c, f;
        c = OBJ.get(AGO.Para.Info[a], 0);
        if (a && c) {
            f = STR.check(AGO.Para.Data[a]);
            if (20 === c) {
                return HTML.color(f);
            }
            if (21 === c) {
                return c = f.split("|"), HTML.color(c[0], +c[1] || +b || 0)
            }
        }
        return ""
    }, getType: function (a) {
        return a && AGO.Para.Info[a] ? AGO.Para.Info[a][0] : 0
    }, getStore: function (a) {
        return a && AGO.Para.Info[a] ? AGO.Para.Info[a][1] : 0
    }, getDefaultValue: function (a) {
        return a && AGO.Para.Info[a] && AGO.Para.Info[a][0] ? AGO.Para.Info[a][2] : ""
    }, getDefault: function (a,
                             b
    ) {
        var c;
        c = OBJ.get(AGO.Para.Info[a], 0);
        return a && c && NMR.isMinMax(b, 1, 3) ? (b = NMR.minMax(AGO.Para.Info[a].length - 3, 0, +b || 0), AGO.Para.Info[a][2 + b] || ""
        ) : ""
    }, chooseTopscore: function (a, b, c, f, e, g, d, k) {
        var p = Math.max(AGO.Uni.topScore, AGO.Para.get("S29"));
        return 1E5 > p ? a : 1E6 > p ? b : 5E6 > p ? c : 25E6 > p ? f : 5E7 > p ? e : 75E6 > p ? g : 1E8 > p ? d : k
    }, valid: function (a) {
        return STR.check(a).replace(/[\"\;]/g, "").trim()
    }, validTask: function (a) {
        return STR.check(a).replace(/\"/g, "").replace(/^\;*/g, "").replace(/\;*$/g, "").trim()
    }
};
AGO.Menu.Init();