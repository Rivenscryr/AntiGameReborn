AGO.Fleet2 = {
    filterContinue: "routine holdingtime expeditiontime union retreatAfterDefenderRetreat metal crystal deuterium preferResource arrivalUnion nameUnion coordsMarked arrivalMarked".split(" "),
    routine: {2: "F60", 3: "FA0", 4: "FH0", 5: "F80", 6: "F90", 7: "F70", 10: "FL0"},
    Messages: function (a, b) {
        "Action" === a ? PAGE.Action(b) : "Continue" === a ? PAGE.Continue() : PAGE.lockedDisplay || ("clickType" === a ? PAGE.clickType() : 1 !== PAGE.updateDisplaySpeed && "Display" === a && PAGE.Display()
        )
    },
    Read: function () {
        var a, b, c;
        if ((b = document.getElementById("inhalt")
            ) &&
            AGO.Option.is("F00")) {
            PAGE.enabled = !0;
            a = PAGE.Para = OBJ.parse(AGO.Fleet.Get("Current", "Task2", 6));
            DOM.iterate(document.querySelectorAll("#contentWrapper > form input"), function (b) {
                            var c, e;
                            (c = STR.trim(b.name)
                            ) && "union" !== c && (e = NMR.parseIntAbs(c), a[200 < e ? e : c] = +b.value || 0
                            )
                        }
            );
            b = b.querySelectorAll("#fleetStatusBar li");
            3 <= b.length && (c = STR.trim(DOM.getText(b[1], null).split("]")[1]), a.planetName = 1 === a.type ? c : "", a.moonName = 3 === a.type ? c : "", a.playerHonor = AGO.Ogame.getPlayerHonor(DOM.getAttribute("span.honorRank",
                                                                                                                                                                                                                       b[2], "class"
                                                                                                                                                                                                      )
            ), a.playerStatus = AGO.Token.getPlayerStatus('span[class^="status_abbr"]', b[2]) || 21, a.playerName = STR.trim(DOM.getText(b[2], null).split(":")[1])
            );
            AGO.Task.updateShips(a);
            a["210"] && (PAGE.Mission[6] = 1
            );
            a["208"] && (PAGE.Mission[7] = 1
            );
            a["209"] && (PAGE.Mission[8] = PAGE.Type[2] = 1
            );
            a["214"] && (PAGE.Mission[9] = 1
            );
            if (2 <= a.routine || AGO.Option.is("F51")) {
                a.type = PAGE.Type.check(a.type) || AGO.Acc.type, 6 === a.routine && (b = AGO.Task.splitActive(AGO.Option.get("F91", -1), 2, 3, !0), a.type = PAGE.Type.check(b.type) || a.type
                ),
                    a.routine ? (a.mission = PAGE.Mission.check(a.mission), a.type = 8 === a.mission ? 2 : 7 === a.mission ? 1 : 9 === a.mission ? 3 : 15 === a.mission ? 1 : a.type
                    ) : a.mission = 0;
            }
            AGO.Task.updateCoords(a, 2);
            PAGE.Next = OBJ.create(a);
            AGO.Fleet.Set("Current", "Task2", "")
        }
        a = b = b = b = c = null
    },
    Run: function () {
        PAGE.enabled && (PAGE.Show(), PAGE.showShortcuts()
        )
    },
    Ready: function () {
        var a;
        a = PAGE.Para;
        PAGE.enabled && (0 < a.union ? PAGE.Action({
                                                       mission: 2,
                                                       union: a.union
                                                   }
        ) : PAGE.Display(), DOM.addEvents("speedLinks", "id", {
                                              click: PAGE.onSpeed,
                                              mouseover: PAGE.onSpeed,
                                              mouseout: PAGE.onSpeed
                                          }
        ),
            DOM.addEvents("#planet h2", null, {click: PAGE.onSummary}), DOM.addEvents("back", "id", {click: PAGE.Back}), DOM.addEventsAll("#galaxy, #system, #position", null, {blur: PAGE.onCoords}), DOM.addEvents("ago_fleet_marked", "id", {click: PAGE.onMarked}), DOM.addEventsAll("#contentWrapper .dropdown.combatunits a, #contentWrapper .dropdown.planets a", null, {click: PAGE.onDropDown})
        )
    },
    Timer: function () {
        PAGE.displayUnion();
        PAGE.displayMarked()
    },
    Show: function () {
        var a, b, c, d;
        if (a = document.querySelector("#contentWrapper > form")) {
            DOM.extendClass(a,
                            null, "ago ago_improve"
            );
            PAGE.showSummary();
            DOM.prependChild(a.querySelector("#shortcuts"), DOM.appendDIV(null, {
                                                                              id: "ago_fleet_player",
                                                                              "class": "planetname"
                                                                          }
                             )
            );
            DOM.addClass("#start .planetname", a, HTML.classType(AGO.Acc.type));
            if (c = a.querySelector(".briefing h2")) {
                b = document.createDocumentFragment(), d = DOM.appendDIV(b, {
                                                                             "class": "ago_fleet_details",
                                                                             id: "ago_fleet_union"
                                                                         }, {display: "none"}
                ), DOM.appendSPAN(d, "ago_fleet_label"), DOM.appendSPAN(d, "ago_fleet_duration"), DOM.appendSPAN(d, "ago_fleet_count"), DOM.appendSPAN(d,
                                                                                                                                                       "ago_fleet_arrival"
                ), d = DOM.appendDIV(b, {
                                         "class": "ago_fleet_details ago_panel_remove",
                                         id: "ago_fleet_marked"
                                     }, {display: "none"}
                ), DOM.appendSPAN(d, "ago_fleet_label"), DOM.appendSPAN(d, "ago_fleet_duration"), DOM.appendSPAN(d, "ago_fleet_count"), DOM.appendSPAN(d, "ago_fleet_arrival"), DOM.replaceChildren(c, b);
            }
            if (c = a.querySelector("#duration")) {
                d = DOM.appendLI(null, "", DOM.getTextChild(c.parentNode).split("(")[0] + ":"), DOM.appendSPAN(d, {
                                                                                                                   "class": "value",
                                                                                                                   id: "ago_fleet_duration_return"
                                                                                                               }
                ), DOM.after(c.parentNode, d);
            }
            (c =
             a.querySelector("#speedLinks")
            ) && DOM.removeChildren(c.parentNode, 3);
            (c = a.querySelector("#arrivalTime")
            ) && DOM.removeChildren(c.parentNode, 3);
            (c = a.querySelector("#returnTime")
            ) && DOM.removeChildren(c.parentNode, 3);
            if (a = a.querySelector("#continue > span")) {
                b = DOM.appendTABLE(null, "ago_fleet_continue_task", {width: "100%"}), c = DOM.appendTR(b), DOM.appendTD(c, {id: "ago_fleet_continue_1_coord"}).style.width = "54px", d = c.appendChild(document.createElement("td")), DOM.appendIMG(d, "/cdn/img/layout/pixel.gif", "14px").id =
                                                                                                                                                                                                                                       "ago_fleet_continue_1_type", d = c.appendChild(document.createElement("td")), DOM.appendIMG(d, "/cdn/img/layout/pixel.gif", "17px").id = "ago_fleet_continue_1_mission", a.style.lineHeight = "18px", a.appendChild(b)
            }
        }
    },
    showSummary: function () {
        function a(a, b) {
            return 0 === a ? "ago_color_blue" : a === b ? "ago_color_palered" : a === b - 1 ? "ago_color_orange" : "ago_color_lightgreen"
        }

        var b, c, d, f, e, g, h;
        if (b = document.getElementById("planet")) {
            AGO.Task.updateResources(PAGE.Para);
            c = document.createDocumentFragment();
            d = DOM.appendDIV(c, {id: "ago_summary_fleets"});
            f = AGO.Fleet.Get("Current", "fleets");
            e = AGO.Fleet.Get("Current", "fleetsSlots");
            h = a(f, e);
            d = DOM.appendA(d, {href: AGO.Uni.path + "movement", title: AGO.Label.get("E10"), "class": h + " tooltip"});
            d.textContent = AGO.Label.get("F21") + ": " + f + "/" + e;
            f = AGO.Fleet.Get("Current", "expos");
            e = AGO.Fleet.Get("Current", "exposSlots");
            h = a(f, e);
            DOM.appendSPAN(d, h, AGO.Label.get("F22") + ": " + f + "/" + e);
            d = DOM.appendDIV(c, {id: "ago_summary"});
            f = DOM.appendTABLE(d, null, null, [200, 223, 223]);
            e = DOM.appendTR(f, "ago_summary_header");
            d = DOM.appendTD(e,
                             {id: "ago_summary_routine"}, PAGE.routine[PAGE.Para.routine], 10
            );
            d = DOM.appendTD(e, {colspan: 2});
            e = DOM.appendTR(f, "ago_summary_total");
            d = DOM.appendTD(e, null, "I27", 10);
            DOM.appendSPAN(d, {id: "ago_summary_resource"}, PAGE.Para.resources, 3);
            d = DOM.appendTD(e, null, "I28", 10);
            DOM.appendSPAN(d, {id: "ago_summary_civil"}, PAGE.Para.shipsCivil, 3);
            d = DOM.appendTD(e, null, "I29", 10);
            DOM.appendSPAN(d, {id: "ago_summary_combat"}, PAGE.Para.shipsCombat, 3);
            g = {Resource: [], ShipCivil: [], ShipCombat: []};
            OBJ.iterate(g, function (a) {
                            OBJ.iterate(AGO.Item[a],
                                        function (b) {
                                            0 < PAGE.Para[b] && g[a].push(b)
                                        }
                            )
                        }
            );
            for (h = 0; 9 > h; h++) {
                if (g.Resource[h] || g.ShipCivil[h] || g.ShipCombat[h]) {
                    e = DOM.appendTR(f), d = DOM.appendTD(e, null, g.Resource[h], 11), DOM.appendSPAN(d, null, PAGE.Para[g.Resource[h]], 2), d = DOM.appendTD(e, null, g.ShipCivil[h], 11), DOM.appendSPAN(d, null, PAGE.Para[g.ShipCivil[h]], 2), d = DOM.appendTD(e, null, g.ShipCombat[h], 11), DOM.appendSPAN(d, null, PAGE.Para[g.ShipCombat[h]], 2);
                } else {
                    break;
                }
            }
            b.appendChild(c)
        }
        b = c = d = f = e = d = g = f = e = h = h = null
    },
    showShortcuts: function () {
        function a(a, b,
                   c
        ) {
            var d;
            a = DOM.appendA(a, {
                                "class": AGO.Token.getClassHover(b.type, b.owncoords),
                                rel: AGO.Task.join(b, 0)
                            }, {click: PAGE.onShortcuts, dblclick: PAGE.onShortcuts}
            );
            b.union && a.setAttribute("ago-task-union", b.union);
            d = a.appendChild(document.createElement("span"));
            d.className = "ago_shortcuts_coords";
            d.textContent = b.galaxy || b.system || b.position ? (b.galaxy || "- "
                                                                 ) + ":" + (b.system || " - "
                                                                 ) + ":" + (b.position || " -"
                                                                 ) : "";
            d = a.appendChild(document.createElement("span"));
            d.className = "ago_shortcuts_icon";
            DOM.appendIMG(d, HTML.urlTypeIcon(b.type),
                          "14px"
            );
            d = a.appendChild(document.createElement("span"));
            d.className = "ago_shortcuts_icon";
            DOM.appendIMG(d, HTML.urlMissionIcon(b.mission), "14px");
            d = a.appendChild(document.createElement("span"));
            d.className = "ago_shortcuts_speed";
            d.textContent = 0 < b.speed && 10 > b.speed ? 10 * b.speed + "%" : "";
            c && (d = a.appendChild(document.createElement("span")), d.className = "ago_shortcuts_name", d.textContent = c
            )
        }

        var b, c, d, f, e, g, h;
        if (b = document.getElementById("inhalt")) {
            d = DOM.appendDIV(null, {
                                  id: "ago_shortcuts", ago_display_status: AGO.Option.is("F15") ?
                                                                           1 : 2
                              }
            );
            f = DOM.appendDIV(d, "ago_shortcuts_header");
            f.addEventListener("click", PAGE.onShortcuts, !1);
            DOM.appendA(f, "ago_display_arrow");
            f = DOM.appendTABLE(d, "ago_shortcuts_content", {width: "637", margin: "0px auto"}, [
                                    130,
                                    10,
                                    192,
                                    10,
                                    294
                                ]
            );
            f = DOM.appendTR(f);
            e = DOM.appendTD(f);
            DOM.appendSPAN(e, "ago_shortcuts_description", "FL0", 10);
            OBJ.iterateArray(AGO.Fleet.Data.Last, function (b) {
                                 b && a(e, AGO.Task.split(b, 0, 4))
                             }
            );
            e = DOM.appendTD(f, "ago_shortcuts_spacer");
            e = DOM.appendTD(f, "");
            DOM.appendSPAN(e, "ago_shortcuts_description",
                           "F40", 10
            );
            c = "F41 F42 F43 F44 F45 F46 F47 F48 F49".split(" ");
            for (h = 0; h < c.length; h++) {
                (g = AGO.Option.get(c[h], -1)
                ) && a(e, AGO.Task.splitActive(g, 0, 4));
            }
            c = document.getElementById("aksbox");
            1 < DOM.hasChildren(c) && (DOM.appendSPAN(e, "ago_shortcuts_description", DOM.getText('#shortcuts span[id^="combatunits"]', b)), DOM.iterateChildren(c, function (b) {
                                                                                                                                                                     var c;
                                                                                                                                                                     c = (b.value || ""
                                                                                                                                                                     ).split("#");
                                                                                                                                                                     3 < c.length && (c = [
                                                                                                                                                                         c[0],
                                                                                                                                                                         c[1],
                                                                                                                                                                         c[2],
                                                                                                                                                                         c[3],
                                                                                                                                                                         2,
                                                                                                                                                                         0,
                                                                                                                                                                         0,
                                                                                                                                                                         0,
                                                                                                                                                                         c[5]
                                                                                                                                                                     ].join(":"), a(e, AGO.Task.split(c, 0, 4), b.textContent)
                                                                                                                                                                     )
                                                                                                                                                                 }
            )
            );
            e = DOM.appendTD(f, "ago_shortcuts_spacer");
            e = DOM.appendTD(f, "ago_shortcuts_own");
            DOM.set(e, null, null, null, {
                        mouseover: PAGE.onShortcuts,
                        mouseout: PAGE.onShortcuts,
                        blur: PAGE.onShortcuts
                    }
            );
            DOM.appendSPAN(e, "ago_shortcuts_description", DOM.getText('#shortcuts span[id^="shortlinks"]', b));
            AGO.Planets.iterate(1, function (a) {
                                    var b, c;
                                    b = DOM.appendA(e, {rel: a.coords}, {
                                                        click: PAGE.onShortcuts,
                                                        dblclick: PAGE.onShortcuts
                                                    }
                                    );
                                    DOM.appendSPAN(b, "ago_shortcuts_owncoords", a.coords);
                                    DOM.appendSPAN(b, "ago_shortcuts_ownname", a.name);
                                    c = DOM.appendSPAN(b, "ago_shortcuts_ownmoon");
                                    if (a = AGO.Planets.Data[a.moon]) {
                                        DOM.appendIMG(c, a.img || HTML.urlTypeIcon(3), "18px"), DOM.appendTEXT(c, a.name);
                                    }
                                    c = DOM.appendSPAN(b, "ago_shortcuts_owndebris");
                                    DOM.appendIMG(c, HTML.urlTypeIcon(2), "18px")
                                }
            );
            DOM.before(b.querySelector("#buttonz .content .footer"), d)
        }
        b = c = d = f = f = e = c = null
    },
    Display: function () {
        function a(a) {
            var b;
            return PAGE.Mission[a] ? (b = 2 === c.type ? 8 === a : 8 === a ? !1 : 15 === a ? 16 === c.position : 9 === a ? 3 === c.type : c.owncoords ? 3 === a || 4 === a : 4 !== a
                                     ) ? a : 0 : 0
        }

        var b, c, d, f, e, g;
        b = PAGE.Next;
        if ((d = document.querySelector("#contentWrapper > form")
            ) &&
            7 <= AGO.Init.status) {
            if (f = d.querySelector("#duration")) {
                f.textContent = (f.textContent || ""
                ).split(" ")[0];
            }
            PAGE.Next.duration = +AGO.Global.message({role: "getProperty", property: "duration"}) || 1;
            DOM.setText("ago_fleet_duration_return", "id", 2 * PAGE.Next.duration, 18);
            if (!PAGE.updateDisplaySpeed) {
                PAGE.lockedDisplay = !0;
                b.maxspeed = AGO.Option.is("F16") ? +AGO.Global.message({role: "maximalSpeed"}, "maximalSpeed") || 10 : 10;
                if (f = d.querySelector("#speed")) {
                    g = Math.min(b.speed, b.maxspeed), g !== +f.value && (f.value = g, DOM.iterate(d.querySelectorAll("#speedLinks a"),
                                                                                                   function (a) {
                                                                                                       DOM.removeClass(a, null, "selected")
                                                                                                   }
                    ), DOM.addClass("#speedLinks a:nth-child(" + g + ")", d, "selected"), AGO.Global.message({role: "updateVariablesTimes"})
                    );
                }
                b.lastCoords = b.coords;
                AGO.Task.updateCoords(b, 1, {
                                          galaxy: DOM.getValue("galaxy", "id", 2),
                                          system: DOM.getValue("system", "id", 2),
                                          position: DOM.getValue("position", "id", 2)
                                      }
                );
                g = PAGE.Type.check(DOM.getValue("input#type", d, 2)) || b.type;
                b.union = DOM.getValue('input[name="union"]', d, 2);
                (f = d.querySelector("#aksbox")
                ) && f.options[0] && ((e = b.union ? f.querySelector('option[value$="#' +
                                                                     b.union + '"]'
                ) : null
                                      ) && -1 < (e.value || ""
                ).indexOf([
                              b.galaxy,
                              b.system,
                              b.position,
                              g
                          ].join("#")
                ) ? (b.type = g, b.mission = 2, b.arrivalUnion = +e.getAttribute("data-arrival-time") || 0, b.nameUnion = e.textContent || ""
                                      ) : (b.union = 0, 2 === b.mission && (b.mission = PAGE.Para.mission
                ), b.arrivalUnion = 0, f.selectedIndex = 0, e = f.options[0], DOM.setValue('input[name="union"]', d, "0")
                                      ), (f = DOM.updateAttribute(".dropdown.combatunits a", f.parentNode, "data-value", e.value)
                                         ) && DOM.setText(f, null, e.textContent)
                );
                if (f = d.querySelector("#slbox")) {
                    e =
                    [
                        b.galaxy,
                        b.system,
                        b.position,
                        g
                    ].join("#"), (e = f.querySelector('option[value^="' + e + '"]')
                                 ) && b.owncoords && 2 !== g ? (f.value = e.value, 3 > b.owncoords && (b.type = g
                    )
                                 ) : (f.selectedIndex = 0, e = f.options[0]
                                 ), (f = DOM.updateAttribute(".dropdown.planets a", f.parentNode, "data-value", e.value)
                                    ) && DOM.setText(f, null, STR.check(e.getAttribute("data-html-prepend")) + STR.check(e.textContent), 9);
                }
                c = OBJ.create(b);
                g = PAGE.Para.routine || 0;
                if (2 <= g || AGO.Option.is("F51")) {
                    c.type = PAGE.Type.check(c.type) || PAGE.Para.type, c.owncoords = AGO.Planets.owncoords(c.coords,
                                                                                                            c.type
                    ), c.mission = a(c.mission), 16 === c.position ? (c.mission = 15, c.type = 1, c.owncoords && (c.owncoords = 1
                    ), VAL.check(g, 7, 6) || (g = 0
                    )
                    ) : 2 === c.type ? (c.mission = 8, VAL.check(g, 4, 6) || (g = 0
                    )
                    ) : c.owncoords && (c.type = AGO.Planets.GetByCoords(c.coords, "moon", 6) ? 3 > c.owncoords ? c.type : 1 === AGO.Acc.type ? 3 : 1 : 1, c.owncoords = AGO.Planets.owncoords(c.coords, c.type)
                    ), 2 !== g && (3 === g ? c.owncoords && (g = 0
                    ) : 4 === g ? 2 !== c.type && (g = 0
                    ) : 7 === g ? 16 !== b.position && (g = 0
                    ) : 5 === g ? 2 > b.owncoords && (g = 0
                    ) : 6 === g && (c.mission = c.mission || a(PAGE.Para.mission)
                    )
                    ), b.routine =
                       g, c.mission = c.mission || a(PAGE.Para.mission) || a(AGO.Option.is("F54") ? 4 : 3) || a(3) || a(4);
                }
                DOM.setValue('input[name="mission"]', d, c.mission);
                c.type !== DOM.getValue("input#type", d, 2) && AGO.Global.message({role: "setType", value: c.type});
                DOM.updateText("ago_fleet_continue_1_coord", "id", c.coords);
                DOM.updateAttribute("ago_fleet_continue_1_type", "id", "src", HTML.urlTypeIcon(c.type, "b"));
                DOM.updateAttribute("ago_fleet_continue_1_mission", "id", "src", HTML.urlMissionIcon(c.mission));
                DOM.updateClass("ago_summary_routine",
                                "id", g ? "on" : ""
                );
                PAGE.displayShortcuts(c);
                PAGE.displayPlayer(c);
                AGO.Init.Messages("Planets", "Action", {mode: "select", coords: c.coords, type: c.type})
            }
            PAGE.displayUnion();
            PAGE.displayMarked();
            PAGE.lockedDisplay = !1;
            d = f = f = e = null
        }
    },
    displayUnion: function () {
        var a, b, c, d, f, e;
        a = PAGE.Next;
        b = document.getElementById("ago_fleet_union");
        DOM.hasChildren(b) && (a.displayUnion !== a.arrivalUnion && (a.displayUnion = a.arrivalUnion, DOM.updateText(b.children[0], null, a.nameUnion + " (" + AGO.Label.get("F28") + ")"), DOM.updateStyle(b, null,
                                                                                                                                                                                                            "display", a.arrivalUnion ? "block" : "none"
        ), AGO.Init.Messages("Events", "highlight", a.arrivalUnion)
        ), a.arrivalUnion && (c = Math.floor(a.arrivalUnion - (AGO.Time.serverTime + AGO.Time.durationRun
                                                              ) / 1E3
        ), 0 <= c && (f = Math.floor(a.duration / 130 * 100), e = Math.floor(1.3 * c), d = a.arrivalUnion - c + e, f = a.duration < c ? 3 : c > f ? 2 : 0 < c ? 1 : 0, DOM.updateText(b.children[1], null, e, 18), a = AGO.Time.formatTime(Math.abs(a.duration - e)) + " / " + AGO.Time.formatTime(Math.abs(c - a.duration)), DOM.updateText(b.children[2], null, a), DOM.updateStyle(b.children[2],
                                                                                                                                                                                                                                                                                                                                                                                      null, "color", [
                "#FF0000",
                "#D43635",
                "#FF9600",
                "#99CC00"
            ][f]
        ), DOM.updateText(b.children[3], null, d, 17, "[d].[m].[y] [H]:[i]:[s]")
        )
        )
        )
    },
    displayMarked: function () {
        var a, b, c, d;
        a = PAGE.Next;
        b = document.getElementById("ago_fleet_marked");
        DOM.hasChildren(b) && (a.displayMarked !== a.arrivalMarked && (a.arrivalMarked = a.displayMarked = 1E3 < a.arrivalMarked ? a.arrivalMarked : 0, DOM.updateText(b.children[0], null, AGO.Label.get("I80") + ": " + (a.coordsMarked || ""
                                                                                                                                                                       )
        ), DOM.updateText(b.children[3], null, a.arrivalMarked, 17, "[d].[m].[y] [H]:[i]:[s]"),
            DOM.updateStyle(b, null, "display", a.arrivalMarked ? "block" : "none")
        ), a.arrivalMarked && (c = Math.floor(a.arrivalMarked - (AGO.Time.serverTime + AGO.Time.durationRun
                                                                ) / 1E3
        ), d = DOM.hasClass("continue", "id", "on") ? a.duration < c ? 3 : 0 < c ? 2 : 0 : 1, DOM.updateText(b.children[1], null, Math.max(c, 0), 18), DOM.updateText(b.children[2], null, Math.abs(c - a.duration), 18), DOM.updateStyle(b.children[2], null, "color", [
                                                                                                                                                                                                                                              "#FF0000",
                                                                                                                                                                                                                                              "#D43635",
                                                                                                                                                                                                                                              "#FF9600",
                                                                                                                                                                                                                                              "#99CC00"
                                                                                                                                                                                                                                          ][d]
        )
        )
        )
    },
    displayShortcuts: function (a) {
        var b;
        if (b = document.getElementById("ago_shortcuts")) {
            DOM.iterateChildren(b.querySelector(".ago_shortcuts_own"),
                                function (b) {
                                    var d, f;
                                    "A" === b.nodeName && (f = b.getAttribute("rel"), d = f === AGO.Acc.coords ? AGO.Token.getClassHighlight(AGO.Acc.type) : "", DOM.setClassGroup(b, null, "ago_highlight", d), d = f === a.coords ? " " + AGO.Token.getClassSelected(a.type, !0) : "", DOM.setClassGroup(b, null, "ago_selected", d)
                                    )
                                }
            ), DOM.iterate(b.querySelectorAll(".ago_hover[ago-task-union]"), function (b) {
                               var d;
                               d = +b.getAttribute("ago-task-union") === a.union ? " " + AGO.Token.getClassSelected(a.type, !0) : "";
                               DOM.setClassGroup(b, null, "ago_selected", d)
                           }
            );
        }
        b = null
    },
    displayPlayer: function (a) {
        function b(a) {
            var b, c, d, k;
            b = PAGE.Next;
            16 === b.position ? (d = AGO.Label.get("LM15"), k = AGO.Option.get("C15", 20)
            ) : b.owncoords ? k = OBJ.get(AGO.Styles.colorType, a) : b.coords === PAGE.Para.coords ? (c = HTML.getPlayer(PAGE.Para.playerName, PAGE.Para.playerStatus, PAGE.Para.playerHonor), d = VAL.choose(a, PAGE.Para.planetName, "", PAGE.Para.moonName)
            ) : b.coords === b.playerCoords && b.playerId ? (c = HTML.getPlayer(b.playerName, b.playerStatus, b.playerHonor), d = VAL.choose(a, b.planetName, "", b.moonName)
            ) : (c = "?",
                d = 2 === a ? "" : "?"
                );
            d && DOM.setText("targetPlanetName", "id", d, 9);
            DOM.setStyleColor("targetPlanetName", "id", k || "#8C9EAA");
            DOM.setText("ago_fleet_player", "id", c, 9)
        }

        var c, d;
        c = PAGE.Next;
        d = a.type;
        b(d);
        AGO.DataBase.enabled && c.coords !== c.playerCoords && !c.owncoords && (c.playerCoords = c.coords, c.playerId = 0, AGB.message("DataBase", "GetPlanet", {
                                                                                                                                           keyUni: AGO.App.keyUni,
                                                                                                                                           coords: c.coords
                                                                                                                                       }, function (a) {
                                                                                                                                           OBJ.get(a, "playerId") && (OBJ.copy(a, PAGE.Next), b(d)
                                                                                                                                           )
                                                                                                                                       }
        )
        );
        c = null
    },
    Action: function (a) {
        var b, c, d;
        b = PAGE.Next;
        (c = document.querySelector("#contentWrapper > form")
        ) &&
        AGO.Init.status && a && (PAGE.lockedDisplay = !0, a.arrival && (b.coordsMarked = a.coords || "", b.arrivalMarked = +a.arrival || 0
        ), a.union && ((d = c.querySelector('#aksbox option[value$="#' + a.union + '"]')
                       ) && 2 === a.mission ? DOM.setValue(d.parentNode, null, d.value, 0, "change") : a.union = 0
        ), a.union || (d = [
            a.galaxy,
            a.system,
            a.position,
            a.type
        ].join("#"), (d = c.querySelector('#slbox option[value^="' + d + '"]')
                     ) ? (DOM.setValue(d.parentNode, null, d.value, 0, "change"), b.type = a.type
                     ) : (a.galaxy && DOM.updateValue("galaxy", "id", a.galaxy, 0, "change"),
        a.system && DOM.updateValue("system", "id", a.system, 0, "change"), a.position && DOM.updateValue("position", "id", a.position, 0, "change"), a.type && (b.type = PAGE.Type.check(a.type) || b.type, AGO.Global.message({
                                                                                                                                                                                                                                    role: "setType",
                                                                                                                                                                                                                                    value: b.type
                                                                                                                                                                                                                                }
        )
        )
                     ), b.mission = PAGE.Mission.check(a.mission) || b.mission || PAGE.Para.mission
        ), NMR.isMinMax(a.speed, 1, 10) && (b.speed = a.speed
        ), PAGE.Display(), window.setTimeout(DOM.setFocus, 10, "#continue")
        )
    },
    clickType: function () {
        var a, b;
        b = DOM.getAttribute("ago_global_data", "id", "ago-data-type", 2);
        a =
        PAGE.Type.check(b) || PAGE.Next.type;
        a === b ? PAGE.Next.type = a : DOM.setAttribute("ago_global_data", "id", "ago-data-type", "")
    },
    Continue: function () {
        var a;
        DOM.hasClass("continue", "id", "on") && (a = {}, DOM.addClass("continue", "id", "ago_selected_button"), OBJ.iterateFilter(PAGE.Next, function (b) {
                                                                                                                                      a[b] = PAGE.Next[b]
                                                                                                                                  }, PAGE.filterContinue
        ), AGO.Fleet.Set("Current", {Task3: JSON.stringify(a)}), window.setTimeout(function () {
                                                                                       AGO.Init.status && DOM.removeClass("continue", "id", "ago_selected_button")
                                                                                   }, 1500
        )
        );
        a = null
    },
    Back: function () {
        var a;
        a = {};
        DOM.addClass("back", "id", "ago_selected_button");
        OBJ.iterateFilter(PAGE.Next, function (b) {
                              a[b] = PAGE.Next[b]
                          }, PAGE.filterContinue
        );
        AGO.Fleet.Set("Current", {Task1: JSON.stringify(a)});
        a = null
    },
    Mission: {
        1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 15: 1, check: function (a) {
            return this[a] ? a : 0
        }
    },
    Type: {
        1: 1, 3: 1, check: function (a) {
            return this[a] ? a : 0
        }
    },
    onKeydown: function (a) {
        if (document.activeElement.classList.contains('chat_box_textarea')) return;
        return 13 === a.keyCode ? (DOM.hasClass("continue", "id", "on") && DOM.click("#continue.on"), !1
        ) : !0
    },
    onSwipe: function (a) {
        "left" === a && DOM.click("#back");
        "right" === a && DOM.click("#continue.on")
    },
    onSummary: function (a) {
        a && a.target && "click" === a.type && a.currentTarget && "H2" === a.target.nodeName && DOM.click("#planet .toggleHeader")
    },
    onMarked: function () {
        PAGE.Action({arrival: -1})
    },
    onShortcuts: function (a) {
        var b, c, d;
        if (c = a && a.target ? a.type : "") {
            "click" === c && a.currentTarget ? "ago_shortcuts_header" === a.currentTarget.className ? (b = 1 < DOM.getAttribute("ago_shortcuts", "id", "ago_display_status", 2) ? 1 : 2, DOM.setAttribute("ago_shortcuts", "id", "ago_display_status", b, 8), AGO.Option.set("F15", 2 !== b, 1)
            ) : (b = a.currentTarget.rel ||
                     "", DOM.hasClass(a.currentTarget.parentNode, null, "ago_shortcuts_own") && (d = "SPAN" === a.target.nodeName ? a.target.className : a.target.parentNode.className, b += ":" + ("ago_shortcuts_ownmoon" === d ? 3 : "ago_shortcuts_owndebris" === d ? 2 : 1
            )
            ), PAGE.Action(AGO.Task.split(b, 0, 4))
                                               ) : "dblclick" === c ? AGO.Option.is("U34") && DOM.click("#fleet2 #continue") : ("A" === a.target.nodeName ? b = a.target : "SPAN" === a.target.nodeName ? (d = a.target.className, b = a.target.parentNode
            ) : "SPAN" === a.target.parentNode.nodeName && (d = a.target.parentNode.className,
                b = a.target.parentNode.parentNode
            ), b && "A" === b.nodeName && DOM.setClassGroup(b, null, "ago_hover", AGO.Token.getClassHover("ago_shortcuts_ownmoon" === d ? 3 : "ago_shortcuts_owndebris" === d ? 2 : 1, "own"))
            )
        }
    },
    onCoords: function (a) {
        var b;
        a && a.currentTarget && !NMR.parseIntAbs(a.currentTarget.value) && (b = a.currentTarget.getAttribute("ago_value")
        ) && (a.currentTarget.value = b, AGO.Global.message({role: "checkOk"}), PAGE.Display()
        )
    },
    onDropDown: function (a) {
        if (a = (a = this.getAttribute("rel")
                ) ? document.getElementById(a) : null) {
            DOM.iterate(a.querySelectorAll("li a"),
                        function (a) {
                            DOM.removeClass(a, null, "focus")
                        }
            ), DOM.addClass('li a[data-value="' + DOM.getAttribute(this, null, "data-value") + '"]', a, "focus")
        }
    },
    onSpeed: function (a) {
        var b;
        b = a && a.target ? a.type : "";
        "click" === b ? (PAGE.updateDisplaySpeed = 0, PAGE.Action({speed: +a.target.getAttribute("data-value")})
        ) : "mouseover" === b ? PAGE.updateDisplaySpeed = 2 : "mouseout" === b && (PAGE.updateDisplaySpeed = 1, window.setTimeout(function () {
                                                                                                                                      1 === PAGE.updateDisplaySpeed && (PAGE.updateDisplaySpeed = 0, PAGE.Display()
                                                                                                                                      )
                                                                                                                                  }, 10
        )
        )
    }
};