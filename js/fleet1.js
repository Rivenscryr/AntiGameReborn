AGO.Fleet1 = {
    filterContinue: "routine holdingtime expeditiontime union retreatAfterDefenderRetreat metal crystal deuterium preferResource arrivalUnion nameUnion coordsMarked arrivalMarked".split(" "),
    Messages: function (a, e) {
        "Action" === a ? PAGE.Action(e) : "Continue" === a ? PAGE.Continue() : PAGE.lockedDisplay || "Display" === a && PAGE.Display()
    },
    Read: function () {
        var a, e, h, f, c, b;
        e = AGO.Fleet1.Para = {};
        a = AGO.Units.Data;
        a.ships = a.shipsCivil = a.shipsCombat = a.capacity = 0;
        OBJ.iterate(AGO.Item.Ship, function (b) {
                        a[b] = 0
                    }
        );
        PAGE.layout =
        AGO.Option.is("F01");
        if (h = document.getElementById("inhalt")) {
            if (a.page = AGO.App.page, DOM.iterate(h.querySelectorAll('#buttonz li[id^="button"]'), function (b) {
                                                       var c;
                                                       c = STR.check(NMR.parseIntAbs(b.id));
                                                       b = DOM.getTextChild(".level", b, 3);
                                                       c in AGO.Item.Ship && (a[c] = b, a.ships += b, a.capacity += b * AGO.Item[c].capacity
                                                       )
                                                   }
                ), f = h.querySelector(".fleetStatus #slots")) {
                f = f.querySelectorAll("span.tooltip"), 2 === f.length && (b = (DOM.getText(f[0]).split(":")[1] || ""
                ).trim().split("/"), AGO.Fleet.Set("Current", {
                                                       fleets: +b[0] || 0, fleetsSlots: +b[1] ||
                                                               0
                                                   }
                ), b = (DOM.getText(f[1]).split(":")[1] || ""
                ).trim().split("/"), AGO.Fleet.Set("Current", {expos: +b[0] || 0, exposSlots: +b[1] || 0})
                );
            }
        }
        h && AGO.Option.is("F00") && (PAGE.enabled = !0, DOM.iterate(document.querySelectorAll('#buttonz .content > form input[type="hidden"]'), function (a) {
                                                                         var b, d;
                                                                         if (b = STR.trim(a.name)) {
                                                                             d = NMR.parseIntAbs(b), e[200 < d ? d : b] = +a.value || 0
                                                                         }
                                                                     }
        ), f = h.querySelectorAll("#fleetStatusBar li"), 3 <= f.length && (h = STR.trim(DOM.getText(f[1], null).split("]")[1]), e.planetName = 1 === e.type ? h : "", e.moonName = 3 === e.type ?
                                                                                                                                                                                   h : "", e.playerHonor = AGO.Ogame.getPlayerHonor(DOM.getAttribute("span.honorRank", f[2], "class")), e.playerStatus = AGO.Token.getPlayerStatus('span[class^="status_abbr"]', f[2]) || 21, e.playerName = STR.trim(DOM.getText(f[2], null).split(":")[1])
        ), h = STR.check(document.location.search), -1 < h.indexOf("mission=") || -1 < h.indexOf("routine=") ? (c = STR.splitParameter(h), OBJ.iterate(c, function (a) {
                                                                                                                                                           var b = NMR.parseIntAbs(a);
                                                                                                                                                           e[200 < b ? b : a] = +c[a] || 0
                                                                                                                                                       }
        )
        ) : (h = AGO.Background.Get("Fleet_Task", 6) || AGO.Fleet.Get("Current", "Task1", 6)
            ) && OBJ.copy(OBJ.parse(h),
                          e
        ), AGO.Task.updateResources(e), AGO.Task.updateShips(e), a["210"] && (PAGE.Mission[6] = 1
        ), a["208"] && (PAGE.Mission[7] = 1
        ), a["209"] && (PAGE.Mission[8] = PAGE.Type[2] = 1
        ), a["214"] && (PAGE.Mission[9] = 1
        ), e.action = 0, e.type = PAGE.Type.check(e.type) || AGO.Acc.type, AGO.Task.updateCoords(e, 2), 4 === e.owncoords && (e.type = 0
        ), e.mission = PAGE.Mission.check(e.mission), PAGE.Next = OBJ.create(e), PAGE.Next.mission = 0, PAGE.Mini = AGO.Task.splitActive(AGO.Option.get("F31", -1), 2, 0), PAGE[1] = {status: e.mission && !e.routine ? 1 : 0}, PAGE.Init(2), PAGE.Init(3),
            PAGE.Init(4), PAGE.Init(5), PAGE.Init(6), PAGE.Init(7), PAGE.Init(10), e.calculator = AGO.Fleet.Get("Current", "Calculator"), e.calculator = PAGE.getRoutine(e.routine) ? e.routine : 1 === e.mission ? 3 : 8 === e.mission ? 4 : e.mission || e.resources ? 2 : PAGE.getRoutine(e.calculator) ? e.calculator : 2, AGO.Background.Set("Fleet_Task", ""), AGO.Fleet.Set("Current", "Task1", "")
        );
        a = e = c = h = f = f = h = h = b = null
    },
    Init: function (a, e, h) {
        function f(a) {
            return AGO.Item.Ship[a] ? (AGO.Item[a].metal + AGO.Item[a].crystal
                                      ) / 200 : 0
        }

        var c, b, g, k, d, l;
        c = AGO.Units.Data;
        switch (a) {
            case 2:
                b = PAGE[2] = {group: 1, label: AGO.Label.get("F60")};
                b.mode = 3;
                b.freight = 0;
                OBJ.iterate(AGO.Item.Resource, function (a) {
                                b.freight += Math.max(c[a] - PAGE.Mini[a], 1)
                            }
                );
                b.mission = AGO.Option.is("F54") ? 4 : 3;
                b.thirdShip = AGO.Item.check(AGO.Option.get("F63", 6), AGO.Item.Ship);
                b.thirdShip = VAL.check(b.thirdShip, "202", "203") ? 0 : b.thirdShip;
                b.preferShip = ["202", "203"][AGO.Option.get("F62", 2)] || b.thirdShip || "203";
                b.preferCargo = "202" === b.preferShip ? "202" : "203";
                b.secondCargo = "203" === b.preferCargo ? "202" : "203";
                b.need_smallCargo =
                Math.ceil(b.freight / 5E3);
                b.need_largeCargo = Math.ceil(b.freight / 25E3);
                b.need_thirdShip = Math.ceil(b.freight / AGO.Item[b.thirdShip || "209"].capacity);
                a = "203" === b.preferCargo ? b.need_largeCargo : b.need_smallCargo;
                b.status = a <= c[b.preferCargo] ? 3 : b.need_smallCargo <= c["202"] + 5 * c["203"] ? 2 : c.ships ? 1 : 0;
                break;
            case 3:
                a = PAGE[3] = {
                    group: 1,
                    mode: AGO.Option.get("FA0"),
                    label: AGO.Label.get("FA0"),
                    status: c.ships ? 3 : 0
                };
                a.preferShip = AGO.Option.is("FA2") ? "202" : "203";
                break;
            case 4:
                a = PAGE[4] = {
                    group: 1, mode: AGO.Option.get("FH0"), label: AGO.Label.get("FH0"),
                    status: c["209"] ? 3 : 0
                };
                break;
            case 5:
                g = PAGE[5] = AGO.Task.splitActive(AGO.Option.get("F81", -1), 1);
                e && AGO.Fleet.Set("Routine", {Collect: 1 === e ? "::::3:10::::1" : 2 === e ? h + "::::::2" : ""});
                l = AGO.Task.split(AGO.Fleet.Get("Routine", "Collect", 6), 0, 1);
                l.routine && (g.last = l.routine, l.routine = 0, OBJ.iterate(l, function (a) {
                                                                                 l[a] && (g[a] = l[a]
                                                                                 )
                                                                             }
                )
                );
                1 === g.last ? AGO.Task.updateCoordsType(g, AGO.Acc.coords + ":3") : (g.type = PAGE.Type.check(g.type) || 1, AGO.Task.updateCoords(g, 2)
                );
                g.group = 2;
                g.mode = AGO.Option.get("F80");
                g.label = AGO.Label.get("F80");
                g.mission = 4 === g.mission ? 4 : 3;
                g.preferCargo = "202" === g.preferCargo ? "202" : "203";
                g.secondCargo = "203" === g.preferCargo ? "202" : "203";
                g.freight = 0;
                OBJ.iterate(AGO.Item.Resource, function (a) {
                                g.freight += Math.max(c[a] - g[a], 1)
                            }
                );
                g.need_smallCargo = Math.ceil(g.freight / 5E3);
                g.need_largeCargo = Math.ceil(g.freight / 25E3);
                a = "203" === g.preferCargo ? g.need_largeCargo : g.need_smallCargo;
                g.status = c.ships ? 2 > g.owncoords || 4 <= g.owncoords ? 1 : a <= c[g.preferCargo] ? 3 : g.need_smallCargo <= c["202"] + 5 * c["203"] ? 2 : 1 : 0;
                g[g.preferCargo] = Math.min(a,
                                            c[g.preferCargo]
                );
                g[g.secondCargo] = c[g.preferCargo] < a ? Math.ceil((a - c[g.preferCargo]
                                                                    ) * AGO.Item[g.preferCargo].capacity / AGO.Item[g.secondCargo].capacity
                ) : 0;
                break;
            case 6:
                k = PAGE[6] = AGO.Task.splitActive(AGO.Option.get("F91", -1), 2, 3, !0);
                k.group = 2;
                k.mode = AGO.Option.get("F90");
                k.label = AGO.Label.get("F90");
                e && (e = 1 === e ? "::::2:1::::1" : "", AGO.Fleet.Set("Routine", {Save: e})
                );
                l = AGO.Task.split(AGO.Fleet.Get("Routine", "Save", 6), 0);
                l.routine && (k.last = l.routine, k.speed = l.speed || 1
                );
                1 === k.last && (AGO.Task.updateCoordsType(k,
                                                           AGO.Acc.coords + ":2"
                ), k.mission = 8
                );
                a = k.mission;
                k.type = PAGE.Type.check(k.type) || 1;
                k.mission = PAGE.Mission.check(k.mission);
                k.freight = 0;
                OBJ.iterate(AGO.Item.Resource, function (a) {
                                k.freight += Math.max(c[a] - k[a], 1)
                            }
                );
                k.status = c.capacity > k.freight && (k.mission || !a
                ) ? 3 : c.ships ? 1 : 0;
                OBJ.iterate(AGO.Item.Ship, function (a) {
                                k[a] = 0 < k[a] ? Math.max(c[a] - k[a], 0) : c[a]
                            }
                );
                (a = {6: "210", 7: "208", 8: "209", 9: "214"}[k.mission]
                ) && !k[a] && (k[a] = 1
                );
                break;
            case 7:
                d = PAGE[7] = AGO.Task.splitActive(AGO.Option.get("F71", -1), 0, 3);
                d.group = 2;
                d.mode =
                AGO.Option.get("F70");
                d.label = AGO.Label.get("F70");
                d.position = 16;
                d.rangeCoords = d.detail2;
                d.points = AGO.Ogame.chooseTopscore(2500, 6E3, 9E3, 12E3, 15E3, 18E3, 21E3, 25E3);
                d.preferCargo = "202" === d.preferCargo ? "202" : "203";
                d.secondCargo = "203" === d.preferCargo ? "202" : "203";
                d.preferShip = AGO.Item.Ship[d.preferShip] ? d.preferShip : "";
                e = d.points;
                if (1 <= d.rangeCoords) {
                    d.next = AGO.Fleet.Get("Expo", AGO.Task.cutSystem(AGO.Acc.coords));
                    if (d.next > d.system + d.rangeCoords || d.next > AGO.Uni.systems || d.next < d.system - d.rangeCoords || 1 >
                                                                                                                              d.next) {
                        d.next = NMR.minMax(d.system - d.rangeCoords, 1, AGO.Uni.systems), AGO.Fleet.Set("Expo", AGO.Task.cutSystem(AGO.Acc.coords), d.next);
                    }
                    d.system = d.next
                }
                AGO.Option.is("F73") && c["210"] && (d["210"] = 1, e -= 5
                );
                d.preferShip && (a = "204 205 206 207 215 211 213".split(" "), 207 <= +d.preferShip && a.reverse(), a.unshift(d.preferShip), OBJ.iterateArray(a, function (a) {
                                                                                                                                                                  !d.combatShip && c[a] && (d.combatShip = a
                                                                                                                                                                  )
                                                                                                                                                              }
                ), d.combatShip && (d[d.combatShip] = 1, e -= Math.ceil(f(d.combatShip))
                )
                );
                d[d.preferCargo] = Math.min(Math.ceil(e / f(d.preferCargo)),
                                            c[d.preferCargo]
                );
                e -= Math.ceil(d[d.preferCargo] * f(d.preferCargo));
                0 >= e ? d.status = d.preferShip && d.preferShip !== d.combatShip ? 2 : 3 : (d.status = c.ships ? 1 : 0, d[d.secondCargo] = Math.min(Math.ceil(e / f(d.secondCargo)), c[d.secondCargo])
                );
                break;
            case 10:
                for (e = 0; 6 > e; e++) {
                    a = PAGE[10 + e] = AGO.Task.split(AGO.Fleet.Get("Last", e, 6), 2, 1), a.status = a.coords && c.ships ? 3 : 0;
                }
                PAGE[10].group = 3;
                PAGE[10].mode = AGO.Option.get("FL0");
                PAGE[10].label = AGO.Label.get("FL0")
        }
        c = a = b = g = k = d = a = a = l = a = e = a = e = null
    },
    Run: function () {
        PAGE.enabled && PAGE.Show()
    },
    Ready: function () {
        var a; (AGO.Option.is("E14") && (a = AGO.Fleet.Get("Current", "Routine"))) ? ((5 == a || 6 == a) ? (AGO.Fleet.Set("Current", "Routine", 0), AGO.Init.Messages("Planets", "Action", {
                                                                                                                                                                        scroll: "down",
                                                                                                                                                                        type: AGO.Acc.type
                                                                                                                                                                      })) : 0) : 0;

        var a, e;
        a = PAGE.Para;
        PAGE.enabled && (a.sendingEnabled = +AGO.Global.message({
                                                                    role: "getProperty",
                                                                    property: "sendingEnabled"
                                                                }
        ) || 0, 2 <= PAGE.getRoutine(a.calculator) ? 3 <= PAGE.getRoutine(a.calculator, "mode") && (e = AGO.Task.create(PAGE[a.calculator], 0), e.routine = 0
        ) : 1 === PAGE.getRoutine(a.routine) ? e = AGO.Task.create(a, 2) : AGO.Option.is("I83") && AGO.Acc.coords === a.coords && AGO.Panel.GetActive("Target", "id", 6) && (e = {arrival: AGO.Panel.GetActive("Target", "time")}, AGO.Task.updateCoordsType(e, AGO.Panel.GetActive("Target",
                                                                                                                                                                                                                                                                                    "coords", 6
                                                                                                                                                                                                                                                             )
        )
        ), PAGE.Action(e)
        )
    },
    Timer: function () {
        DOM.updateText("ago_info_resources", "id", AGO.Units.Data.resources, 3)
    },
    Show: function () {
        function a(a, b, c) {
            var f, g;
            f = {action: 10};
            f[b] = c;
            g = e[b] ? c <= e[b] ? "ago_color_lightgreen" : 1 <= h.status ? "ago_color_orange" : "ago_color_darkorange" : "ago_color_palered";
            a = DOM.appendLI(a, {"ago-data": JSON.stringify(f)}, b, 12);
            DOM.appendSPAN(a, g, c, 2)
        }

        var e, h, f, c, b, g;
        if (f = document.getElementById("inhalt")) {
            if (e = AGO.Units.Data, h = PAGE[2], DOM.extendClass(f, null, "ago ago_improve"), PAGE.showSummary(),
                (b = f.querySelector(".fleetStatus #slots")
                ) && AGO.Option.is("F03") && DOM.setStyleDisplay(b.parentNode), b = f.querySelector("#buttonz .header"), DOM.appendSPAN(b, {id: "ago_info_combat"}), DOM.appendSPAN(b, {id: "ago_info_civil"}), g = AGO.Option.get("F02", 2), DOM.iterate(f.querySelectorAll('#buttonz li[id^="button"]'), function (a) {
                                                                                                                                                                                                                                                              var b, c;
                                                                                                                                                                                                                                                              c = STR.check(NMR.parseIntAbs(a.id));
                                                                                                                                                                                                                                                              a = a.querySelector(".level");
                                                                                                                                                                                                                                                              g && c in AGO.Item.Ship && a && (b = document.createDocumentFragment(), VAL.check(g, 1, 3) && DOM.appendSPAN(b, "ago_items_textName ago_items_text ago_text_background",
                                                                                                                                                                                                                                                                                                                                                                           c, 11
                                                                                                                                                                                                                                                              ), VAL.check(g, 2, 3) && DOM.appendSPAN(b, "ago_items_textInfo ago_items_text ago_text_background", AGO.Ogame.getShipSpeed(c), 2), DOM.appendSPAN(b, {
                                                                                                                                                                                                                                                                                                                                                                                                                    "class": "ago_items_textCount ago_items_text ago_text_background",
                                                                                                                                                                                                                                                                                                                                                                                                                    id: "anti_ship_" + c
                                                                                                                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                              ), a.parentNode.parentNode.appendChild(b)
                                                                                                                                                                                                                                                              )
                                                                                                                                                                                                                                                          }
                ), c = f.querySelector("#allornone .allornonewrap")) {
                DOM.addEvents(c, null, {click: PAGE.onBriefing});
                if (b = c.querySelector(".send_all")) {
                    DOM.setData(b, null, {action: 11}), DOM.setData(".send_none", c, {action: 13}), f = DOM.append(null, "span", "send_most",
                                                                                                                   null, null, null, {action: 12}
                    ), DOM.appendA(f, {
                                       id: "sendmost",
                                       "class": "tooltip js_hideTipOnMobile",
                                       title: AGO.Label.get("F37")
                                   }
                    ), DOM.after(b, f);
                }
                if (b = c.querySelector("#continue")) {
                    DOM.setData(b, null, {action: "continue"}), c = DOM.create("ul", "ago_cargos"), a(c, "202", h.need_smallCargo), a(c, "203", h.need_largeCargo), DOM.after(b, c), b = b.firstElementChild, f = DOM.appendTABLE(null, "ago_continue", {width: "100%"}), c = DOM.appendTR(f), DOM.appendTD(c).id = "ago_continue_coords", DOM.appendIMG(DOM.appendTD(c), "/cdn/img/layout/pixel.gif",
                                                                                                                                                                                                                                                                                                                                                         "14px"
                    ).id = "ago_continue_type", DOM.appendIMG(DOM.appendTD(c), "/cdn/img/layout/pixel.gif", "17px").id = "ago_continue_mission", b.style.lineHeight = "18px", b.appendChild(f)
                }
            } else {
                c = DOM.append(null, "ul", "ago_cargos"), DOM.appendSPAN(DOM.appendLI(c, null, "202", 11), "ago_color_palered", h.need_smallCargo, 2), DOM.appendSPAN(DOM.appendLI(c, null, "203", 11), "ago_color_palered", h.need_largeCargo, 2), DOM.appendSPAN(DOM.appendLI(c, null, h.thirdShip || "209", 11), "ago_color_palered", h.need_thirdShip, 2), DOM.appendChild(f.querySelector("#warning"),
                                                                                                                                                                                                                                                                                                                                                                               c
                );
            }
        }
        PAGE.showShortcuts();
        e = h = f = c = b = f = c = f = g = null
    },
    showSummary: function () {
        function a(a, b, d) {
            a = DOM.appendDIV(a);
            a.textContent = AGO.Label.get(d);
            DOM.appendSPAN(a, {id: "ago_info_" + b})
        }

        function e(a, b) {
            DOM.append(a, "input", {
                           id:    "ago_" + b,
                           type: "text",
                           "class": "ago_keys_arrows",
                           value: PAGE.Next[b] || "0"
                       }, null, {focus: PAGE.onCalculator, blur: PAGE.onCalculator}, null, {id: b}
            )
        }

        function h(a, b) {
            return 0 === a ? "ago_color_blue" : a === b ? "ago_color_palered" : a === b - 1 ? "ago_color_orange" : "ago_color_lightgreen"
        }

        var f, c, b, g, k, d, l, m, q;
        if (f =
            document.getElementById("planet")) {
            AGO.Task.updateResources(PAGE.Para), c = document.createDocumentFragment(), b = AGO.Fleet.Get("Current", "fleets"), k = AGO.Fleet.Get("Current", "fleetsSlots"), g = h(b, k), d = DOM.appendA(c, {
                                                                                                                                                                                                              href:    AGO.Uni.path + "movement",
                                                                                                                                                                                                              title: AGO.Label.get("E10"),
                                                                                                                                                                                                              "class": "ago_movement tooltip " + g
                                                                                                                                                                                                          }
            ), d.textContent = AGO.Label.get("F21") + ": " + b + "/" + k, b = AGO.Fleet.Get("Current", "expos"), k = AGO.Fleet.Get("Current", "exposSlots"), g = h(b, k), DOM.appendSPAN(d, g, AGO.Label.get("F22") + ": " + b + "/" + k), PAGE.layout && (f.appendChild(c),
                f.style.height = "23px", c = document.createDocumentFragment()
            ), b = DOM.appendDIV(c, {
                                     id: "ago_summary",
                                     "class": "ago_routine_" + PAGE.Para.calculator,
                                     ago_display_status: AGO.Option.is("F13") ? 1 : 2
                                 }
            ), DOM.addEvents(b, null, {
                                 click: PAGE.onCalculator,
                                 dblclick: PAGE.onCalculator,
                                 keyup: PAGE.onCalculator,
                                 mousedown: PAGE.onCalculator
                             }
            ), g = DOM.appendTABLE(b, null, null, PAGE.layout ? [200, 407, 30] : [
                                       200,
                                       417,
                                       30
                                   ]
            ), k = DOM.appendTR(g), d = DOM.appendTD(k, "ago_info"), a(d, "resources", "I27"), a(d, "capacity", "F23"), a(d, "freight", "F24"), a(d, "expo",
                                                                                                                                                  "F26"
            ), d = DOM.appendTD(k, {id: "ago_routine"}), d.colSpan = 2, m = q = 0, l = AGO.Label.get("F05") + ": ", OBJ.iterateArray([
                                                                                                                                         2,
                                                                                                                                         3,
                                                                                                                                         4,
                                                                                                                                         5,
                                                                                                                                         6,
                                                                                                                                         7,
                                                                                                                                         10
                                                                                                                                     ], function (a) {
                                                                                                                                         var b;
                                                                                                                                         b = "";
                                                                                                                                         q++;
                                                                                                                                         if (2 <= PAGE[a].mode || PAGE.Para.calculator === a) {
                                                                                                                                             if (3 < q && !m || 7 === q) {
                                                                                                                                                 m = b = "ago_routine_space";
                                                                                                                                             }
                                                                                                                                             b = DOM.appendDIV(d, b);
                                                                                                                                             b = DOM.appendA(b, {
                                                                                                                                                                 id:    "ago_routine_" + a,
                                                                                                                                                                 "class": "tooltip",
                                                                                                                                                                 title: l + PAGE[a].label
                                                                                                                                                             }, null, {routine: a}
                                                                                                                                             );
                                                                                                                                             DOM.appendSPAN(b, "ago_routine_check");
                                                                                                                                             if (5 === a || 6 === a) {
                                                                                                                                                 DOM.appendIMG(b, "", "18px").className = "ago_routine_last"
                                                                                                                                             }
                                                                                                                                         }
                                                                                                                                     }
            ), k = DOM.appendTR(g), d = DOM.appendTD(k,
                                                     "ago_coords"
            ), e(d, "galaxy"), e(d, "system"), e(d, "position"), g = DOM.appendA(d, {id: "ago_type"}), DOM.append(g, "span", AGO.Item.Type[1], null, null, null, {
                                                                                                                      type: 1,
                                                                                                                      action: 42
                                                                                                                  }
            ), DOM.append(g, "span", AGO.Item.Type[3], null, null, null, {
                              type: 3,
                              action: 42
                          }
            ), DOM.appendTD(k).id = "ago_details", d = DOM.appendTD(k), DOM.appendA(d, "ago_display_arrow"), PAGE.showCalculator(b), PAGE.layout ? DOM.appendChild(document.querySelector("#buttonz .allornonewrap"), c) : f.appendChild(c);
        }
        f = c = b = g = k = d = b = k = l = g = m = q = null
    },
    showCalculator: function (a) {
        function e(a) {
            DOM.appendTD(a,
                         "ago_calc_info"
            ).colSpan = 3
        }

        function h(a, b, d, c, e, f) {
            b && b.coords && (c = AGO.Token.getClassHover(b.type) + (c ? " " + AGO.Token.getClassSelected(b.type) : ""
            ), a = DOM.appendA(a, "ago_target " + c, null, d), c = DOM.appendSPAN(a, "ago_target_coords", b.coords), 2 === e && (d.target = 1, DOM.setData(c, null, d)
            ), DOM.appendIMG(DOM.appendSPAN(a, "ago_target_icon"), HTML.urlTypeIcon(b.type), "14px"), DOM.appendIMG(DOM.appendSPAN(a, "ago_target_icon"), HTML.urlMissionIcon(b.mission), "14px"), DOM.appendSPAN(a, "ago_target_speed", 10 * b.speed + "%"), e &&
                                                                                                                                                                                                                                                              (d = b.routine ? "R" : "", DOM.appendSPAN(a, "ago_target_name", d), DOM.appendSPAN(a, "ago_target_ships", b.ships, 2), DOM.appendSPAN(a, "ago_target_res", b.resources, 2)
                                                                                                                                                                                                                                                              ), 2 <= f && DOM.appendSPAN(a, "ago_routine_check ago_routine_check_" + f)
            )
        }

        function f(a, b) {
            var d;
            d = DOM.appendTD(a, "ago_calc_available");
            d = DOM.appendA(d, null, null, {action: 28, id: b});
            DOM.appendSPAN(d, "ago_calc_available_icon " + b, "\u2009");
            DOM.appendSPAN(d, {id: "ago_calc_available_" + b})
        }

        function c(a, b) {
            DOM.append(DOM.appendTD(a), "input", {
                           id: "ago_calc_resource_" +
                               b, type: "text", "class": "ago_keys_arrows", value: PAGE.Next[b] || "0"
                       }, null, {focus: PAGE.onCalculator, blur: PAGE.onCalculator}, null, {id: b}
            )
        }

        function b(a, b, d, c) {
            a = DOM.appendTD(a, "ago_calc_ships");
            a = DOM.appendA(a, null, null, {action: 19, id: d});
            DOM.appendSPAN(a, "btn_blue", d, 12);
            DOM.appendSPAN(a, {id: "ago_calc_ships_" + b})
        }

        function g(a, b, d) {
            DOM.appendSPAN(DOM.appendTD(a, "", d, 10), {id: b})
        }

        function k(a) {
            a.status && (OBJ.iterate(AGO.Item.Resource, function (b) {
                                         a[b] && a[b] > AGO.Units.Data[b] && (a.status = 2
                                         )
                                     }
            ), OBJ.iterate(AGO.Item.Ship,
                           function (b) {
                               a[b] && a[b] > AGO.Units.Data[b] && (a.status = 1
                               )
                           }
            )
            );
            return a.status
        }

        var d, l, m, q, p, r, w, x, n, u, v, s, t;
        p = PAGE.Para.calculator;
        r = 2 === p;
        w = 4 === p;
        x = 3 === p;
        3 <= PAGE[p].mode && AGO.Fleet.Set("Current", {Calculator: p});
        a || (d = document.getElementById("ago_calc"), a = d.parentNode, a.removeChild(d), DOM.updateClass("ago_summary", "id", "ago_routine_" + p)
        );
        k(PAGE[10]);
        OBJ.iterateArray([2, 4, 3, 5, 6, 7, 10], function (b) {
                             var d;
                             if (d = a.querySelector("#ago_routine_" + b)) {
                                 if (DOM.setClassGroup(d.parentNode, null, "selected", b === p ? "selected" :
                                                                                       ""
                                     ), DOM.setClassGroup(d, null, "on", PAGE[b].status ? "on" : "off"), 3 !== b && 4 !== b && DOM.updateClass(".ago_routine_check", d, "ago_routine_check ago_routine_check_" + PAGE[b].status), 5 === b || 6 === b) {
                                     b = 1 === PAGE[b].last ? HTML.urlTypeIcon(PAGE[b].type || 2, "b") : 2 === PAGE[b].last ? HTML.urlMissionIcon(PAGE[b].mission) : HTML.urlTypeIcon(0), DOM.updateAttribute(".ago_routine_last", d, "src", b)
                                 }
                             }
                         }
        );
        DOM.setStyleDisplay(".ago_info div:nth-child(3)", a, x || 7 === p ? "" : "block");
        DOM.setStyleDisplay(".ago_info div:nth-child(4)", a, 7 === p ? "block" :
                                                             ""
        );
        l = a.querySelector("#ago_details");
        DOM.replaceChildren(l);
        d = DOM.appendTABLE(null, {id: "ago_calc"}, null, PAGE.layout ? [200, 146, 146, 146] : [200, 149, 149, 149]);
        u = DOM.appendTR(d);
        x || w ? DOM.appendTD(u) : g(u, "ago_calc_available_total", "I23");
        v = DOM.appendTR(d);
        m = DOM.appendTD(v);
        r && (DOM.appendA(m, "ago_calc_resource_all", null, {action: 21}), DOM.appendA(m, "ago_calc_resource_most", null, {action: 22})
        );
        DOM.appendA(m, "ago_calc_resource_none", null, {action: 23});
        x && (q = DOM.appendA(m, {id: "ago_calc_plunder"}), OBJ.iterateArray([
                                                                                 50,
                                                                                 75, 100
                                                                             ], function (a) {
                                                                                 DOM.appendSPAN(q, "ago_calc_plunder", a + "%").setAttribute("ago-data", '{"plunder":' + a + "}")
                                                                             }
        )
        );
        m = DOM.appendTR(d);
        DOM.appendTD(m, "ago_calc_spacer");
        DOM.appendTD(m, "ago_calc_spacer").colSpan = 3;
        s = DOM.appendTR(d);
        m = DOM.appendTD(s, "ago_calc_speed");
        q = DOM.appendA(m, {id: "speedLinks"});
        for (n = 1; 10 >= n; n++) {
            m = q.appendChild(document.createElement("span")), m.textContent = 10 * n, m.setAttribute("data-value", n), m.setAttribute("ago-data", '{"speed":' + n + "}");
        }
        n = DOM.appendTR(d, "ago_calc_consumption");
        g(n,
          "ago_calc_consumption_total", "F67"
        );
        t = DOM.appendTR(d, "ago_calc_duration");
        g(t, "ago_calc_duration_total", "F65");
        if (10 === p) {
            for (h(l, PAGE[10], {
                       routine: 10,
                       last: 0
                   }, 0 === PAGE[10].last, 2, PAGE[10].status
            ), m = DOM.appendTD(u, "ago_last"), m.colSpan = 3, m.rowSpan = 6, n = 1; 6 > n; n++) {
                (l = k(PAGE[10 + n])
                ) && h(m, PAGE[10 + n], {
                           routine: 10,
                           last: n
                       }, PAGE[10].last === n, 2, l
                );
            }
        } else if (7 === p) {
            e(u), e(v), e(s), e(n), e(t);
        } else {
            if (r || x || w) {
                f(u, "metal"), f(u, "crystal"), w ? DOM.appendTD(u) : f(u, "deuterium"), c(v, "metal"), c(v, "crystal"), w ? DOM.appendTD(v) :
                                                                                                                         c(v, "deuterium");
            }
            w ? (b(s, "shipC", "209", !1), DOM.appendTD(s, "ago_calc_ships"), DOM.appendTD(s, "ago_calc_ships"), g(n, "ago_calc_consumption_shipC"), DOM.appendTD(n), DOM.appendTD(n), g(t, "ago_calc_duration_shipC"), DOM.appendTD(t), DOM.appendTD(t)
            ) : 5 === p ? (l && (PAGE[5].last ? (1 === PAGE[5].last ? h(l, {
                                                                            mission: PAGE[5].mission,
                                                                            speed: PAGE[5].speed,
                                                                            type: 3,
                                                                            coords: " "
                                                                        }, null, !0
            ) : h(l, PAGE[5], null, !0), DOM.appendA(l, "ago_target_reset btn_blue", null, {
                                                         routine: 5,
                                                         last: -1
                                                     }
            ).textContent = AGO.Label.get("F39")
            ) : h(l, {
                      mission: 3, speed: 10,
                      type: 3, coords: " "
                  }, {routine: 5, last: 1}
            )
            ), DOM.appendTD(u).colSpan = 3, DOM.appendTD(v).colSpan = 3, m = DOM.appendTD(s), m.colSpan = 3, m = DOM.appendTD(n), m.colSpan = 3, m = DOM.appendTD(t), m.colSpan = 3
            ) : 6 === p ? (l && (PAGE[6].last ? (h(l, {
                                                       mission: 8,
                                                       speed: PAGE[6].speed,
                                                       type: 2,
                                                       coords: " "
                                                   }
            ), DOM.appendA(l, "ago_target_reset btn_blue", null, {
                               routine: 6,
                               last: -1
                           }
            ).textContent = AGO.Label.get("F39")
            ) : h(l, {mission: 8, speed: 1, type: 2, coords: " "}, {routine: 6, last: 1})
            ), DOM.appendTD(u).colSpan = 3, DOM.appendTD(v).colSpan = 3, m = DOM.appendTD(s), m.colSpan =
                                                                                              3, m = DOM.appendTD(n), m.colSpan = 3, m = DOM.appendTD(t), m.colSpan = 3
            ) : (b(s, "shipA", "202"), b(s, "shipB", "203"), r && PAGE[2].thirdShip ? b(s, "shipC", PAGE[2].thirdShip, !1) : DOM.appendTD(s, "ago_calc_ships"), g(n, "ago_calc_consumption_shipA"), g(n, "ago_calc_consumption_shipB"), r ? g(n, "ago_calc_consumption_shipC") : DOM.appendTD(n), g(t, "ago_calc_duration_shipA"), g(t, "ago_calc_duration_shipB"), r ? g(t, "ago_calc_duration_shipC") : DOM.appendTD(t)
                )
        }
        DOM.appendChild(a, d);
        d = m = m = m = q = r = w = n = null
    },
    showShortcuts: function () {
        function a(a,
                   b
        ) {
            var c, e;
            b && (c = DOM.appendA(a, {
                                      "class": AGO.Token.getClassHover(b.type, b.owncoords),
                                      rel: AGO.Task.join(b, 0)
                                  }, {click: PAGE.onShortcuts, dblclick: PAGE.onShortcuts}
            ), e = c.appendChild(document.createElement("span")), e.className = "ago_shortcuts_coords", e.textContent = b.galaxy || b.system || b.position ? (b.galaxy || "- "
                                                                                                                                                             ) + ":" + (b.system || " - "
                                                                                                                                                             ) + ":" + (b.position || " -"
                                                                                                                                                             ) : "", e = c.appendChild(document.createElement("span")), e.className = "ago_shortcuts_icon", DOM.appendIMG(e, HTML.urlTypeIcon(b.type), "14px"), e = c.appendChild(document.createElement("span")),
                e.className = "ago_shortcuts_icon", DOM.appendIMG(e, HTML.urlMissionIcon(b.mission), "14px"), e = c.appendChild(document.createElement("span")), e.className = "ago_shortcuts_speed", e.textContent = 0 < b.speed && 10 > b.speed ? 10 * b.speed + "%" : ""
            )
        }

        var e, h, f, c, b, g, k;
        if (e = document.getElementById("inhalt")) {
            h = DOM.appendDIV(null, {id: "ago_shortcuts", ago_display_status: AGO.Option.is("F14") ? 1 : 2});
            f = DOM.appendDIV(h, "ago_shortcuts_header");
            f.addEventListener("click", PAGE.onShortcuts, !1);
            DOM.appendA(f, "ago_display_arrow");
            f = DOM.appendTABLE(h,
                                "ago_shortcuts_content", {width: "637", margin: "0px auto"}, [256, 18, 365]
            );
            f = DOM.appendTR(f);
            c = DOM.appendTD(f, "ago_shortcuts_target");
            DOM.appendSPAN(c, "ago_shortcuts_description", "F40", 10);
            if (b = NMR.minMax(AGO.Option.get("FL2", 2), 0, 6)) {
                for (k = 0; k < b; k++) {
                    PAGE.getRoutine(10 + k, "galaxy") && a(c, PAGE[10 + k]);
                }
                DOM.appendSPAN(c, "ago_shortcuts_space")
            }
            b = "F41 F42 F43 F44 F45 F46 F47 F48 F49".split(" ");
            for (k = 0; k < b.length; k++) {
                (g = AGO.Option.get(b[k], -1)
                ) && a(c, AGO.Task.splitActive(g, 0, 4));
            }
            c = DOM.appendTD(f, "ago_shortcuts_spacer");
            c = DOM.appendTD(f, "ago_shortcuts_own");
            DOM.set(c, null, null, null, {mouseover: PAGE.onShortcuts, mouseout: PAGE.onShortcuts});
            DOM.appendSPAN(c, "ago_shortcuts_description");
            AGO.Planets.iterate(1, function (a) {
                                    var b, e;
                                    b = DOM.appendA(c, {rel: a.coords}, {
                                                        click: PAGE.onShortcuts,
                                                        dblclick: PAGE.onShortcuts
                                                    }
                                    );
                                    DOM.appendSPAN(b, "ago_shortcuts_coords", a.coords);
                                    DOM.appendSPAN(b, "ago_shortcuts_name", a.name);
                                    e = DOM.appendSPAN(b, "ago_shortcuts_moon");
                                    if (a = AGO.Planets.Data[a.moon]) {
                                        DOM.appendIMG(e, a.img || HTML.urlTypeIcon(3), "18px"),
                                            DOM.appendTEXT(e, a.name);
                                    }
                                    e = DOM.appendSPAN(b, "ago_shortcuts_debris");
                                    DOM.appendIMG(e, HTML.urlTypeIcon(2), "18px")
                                }
            );
            DOM.before(e.querySelector("#buttonz .content .footer"), h)
        }
        e = h = f = f = c = b = null
    },
    Display: function () {
        function a(a, b) {
            var d = !a || 0 > b ? "" : a >= b ? "ago_color_green" : "ago_color_palered";
            DOM.updateText("ago_info_capacity", "id", a, 3);
            DOM.updateClass("ago_info_capacity", "id", d)
        }

        function e(a) {
            var d;
            return PAGE.Mission[a] ? (d = 2 === b.type ? 8 === a && b["209"] : 8 === a ? !1 : 15 === a ? 16 === b.position : b.owncoords && (3 > b.owncoords ||
                                                                                                                                             c.stopActiveSelection
            ) ? VAL.check(a, 3, 4) : 6 === a ? b["210"] : 7 === a ? b["208"] : 9 === a ? b["214"] && (3 <= b.owncoords || 3 === b.type
            ) : 4 === a ? b.owncoords : !0
                                     ) ? a : 0 : 0
        }

        function h(a, b) {
            return AGO.Planets.ByCoords[a] ? 2 === b ? 1 : a !== AGO.Acc.coords ? 2 : b === AGO.Acc.type ? 4 : 3 : 0
        }

        var f, c, b, g, k, d, l;
        f = AGO.Units.Data;
        c = PAGE.Next;
        if ((g = document.getElementById("inhalt")
            ) && 7 <= AGO.Init.status) {
            c.routine = k = PAGE.Para.calculator;
            DOM.iterate(g.querySelectorAll(".fleetValues"), function (a) {
                            var b;
                            b = STR.check(NMR.parseIntAbs(a.id));
                            a = +a.value || 0;
                            b in
                            AGO.Item.Ship && (a !== c[b] && AGO.Option.is("F02") && (DOM.updateText("anti_ship_" + b, "id", a ? f[b] - a : 0, 2), DOM.setStyleColor("anti_ship_" + b, "id", "#00B000")
                            ), c[b] = a
                            )
                        }
            );
            c.distance = AGO.Ogame.getFleetDistance(AGO.Acc, c);
            AGO.Task.updateShips(c, c.distance);
            d = 2 !== k || c.resources || AGO.Option.is("F51");
            b = OBJ.create(c);
            b.type = b.type || (3 === k ? PAGE.Type.check(AGO.Option.get("FA1", 2)) : 0
            ) || AGO.Acc.type;
            b.owncoords = h(b.coords, b.type);
            if (b.ships) {
                b.status = PAGE.getRoutine(k, "status");
                16 === b.position ? d && (b.mission = 15, b.type =
                                                          1, b.owncoords && (b.owncoords = 1
                )
                ) : b.ships === b["210"] ? b.owncoords && (3 > b.owncoords || c.stopActiveSelection
                ) ? b.mission = 4 : !b.mission && AGO.Option.is("F53") && (b.mission = 1 === b.ships ? 1 : 6
                ) : b.ships !== b["209"] || c.stopAutoHarvest || c.resources || !AGO.Option.is("F52") || 1 !== PAGE.getRoutine(k) || (b.mission = 8, b.type = 2, b.owncoords && (b.owncoords = h(b.coords, b.type)
                )
                );
                switch (k) {
                    case 2:
                        c.resources ? (b.mission = (b.owncoords ? 0 : 3
                                                   ) || VAL.select(b.mission, 3, 4) || VAL.select(PAGE.Para.mission, 3, 4), b.status = c.capacity >= c.consumption + c.resources ?
                                                                                                                                       3 : 1
                        ) : (b.mission = e(b.mission) || e(PAGE.Para.mission), b.status = 0
                        );
                        break;
                    case 3:
                        b.mission = e(b.mission) || e(1);
                        b.status = 1 !== b.mission && 2 !== b.mission ? 0 : b.status;
                        break;
                    case 4:
                        b.type = b["209"] ? 2 : b.type;
                        b.owncoords && (b.owncoords = h(b.coords, b.type)
                        );
                        b.mission = e(b.mission) || e(8);
                        b.status = 8 !== b.mission ? 0 : b["209"] * AGO.Item["209"].capacity >= c.metal + c.crystal ? 3 : 1;
                        break;
                    case 5:
                        b.mission = e(b.mission) || e(PAGE[5].mission);
                        b.status = 2 > b.owncoords || !VAL.check(b.mission, 3, 4) ? 0 : b.status;
                        break;
                    case 6:
                        b.mission = e(b.mission) ||
                                    e(PAGE[6].mission);
                        break;
                    case 7:
                        b.type = 1;
                        b.owncoords && (b.owncoords = h(b.coords, b.type)
                        );
                        b.mission = e(15);
                        b.status = 15 !== b.mission ? 0 : b.status;
                        break;
                    case 10:
                        l = 10 + (+PAGE[10].last || 0
                        ), b.status = PAGE.getRoutine(l, "status"), b.status && (b.mission = e(b.mission) || e(PAGE[l].mission), c.routine = PAGE[l].routine || 1
                        )
                }
                b.mission || (b.mission = 16 === b.position ? 15 : 2 === b.type && b["209"] ? 8 : e(PAGE[2].mission) || 3
                )
            } else {
                b.status = b.mission = 0;
            }
            b.typeActive = b.type;
            d && b.owncoords && (b.typeActive = 2 === b.type ? b.type : AGO.Planets.GetByCoords(b.coords,
                                                                                                "moon", 6
            ) ? 3 > b.owncoords ? b.type : 1 === AGO.Acc.type ? 3 : 1 : 1
            );
            DOM.updateValue('input[name="mission"]', g, b.mission, 8);
            DOM.updateValue('input[name="type"]', g, b.type, 8);
            DOM.iterateChildren(document.getElementById("ago_type"), function (a) {
                                    var d, c;
                                    c = DOM.getAttribute(a, null, "ago-data", -2).type;
                                    if (d = AGO.Item.Type[c]) {
                                        c === b.type && (d += " selected"
                                        ), 3 === k && c === AGO.Option.get("FA1", 2) && (d += " ago_calc_selected"
                                        ), DOM.updateClass(a, null, d)
                                    }
                                }
            );
            switch (k) {
                case 2:
                    c.resources ? a(c.capacity, c.resources) : c.ships ? a(c.capacity, f.resources) : a(f.capacity, f.resources);
                    DOM.updateText("ago_info_freight", "id", c.resources, 3);
                    break;
                case 4:
                    a(b["209"] * AGO.Item["209"].capacity, c.resources);
                    DOM.updateText("ago_info_freight", "id", c.metal + c.crystal, 3);
                    break;
                case 5:
                    l = PAGE[5].freight;
                    c.ships ? a(c.capacity, l) : a(f.capacity, l);
                    DOM.updateText("ago_info_freight", "id", l, 3);
                    break;
                case 6:
                    l = PAGE[6].freight;
                    c.ships ? a(c.capacity, l) : a(f.capacity, l);
                    DOM.updateText("ago_info_freight", "id", l, 3);
                    break;
                case 7:
                    c.ships ?
                    a(c.capacity, -1) : a(c.capacity, -1);
                    DOM.updateText("ago_info_expo", "id", c.expoints, 3);
                    g = c.expoints >= PAGE[7].points ? "ago_color_green" : "ago_color_palered";
                    DOM.updateClass("ago_info_expo", "id", g);
                    break;
                case 3:
                case 10:
                    c.ships ? a(c.capacity, f.resources) : a(f.capacity, f.resources), DOM.updateText("ago_info_freight", "id", 0, 3)
            }
            c.routine = b.status ? c.routine : 0;
            DOM.updateClass("ago_routine", "id", "ago_routine_status_" + b.status);
            DOM.updateText("ago_info_resources", "id", f.resources, 3);
            DOM.updateText("ago_info_civil",
                           "id", c.shipsCivil, 3
            );
            DOM.updateText("ago_info_combat", "id", c.shipsCombat, 3);
            DOM.updateText("ago_continue_coords", "id", b.coords);
            DOM.updateAttribute("ago_continue_type", "id", "src", HTML.urlTypeIcon(b.typeActive, "b"));
            DOM.updateAttribute("ago_continue_mission", "id", "src", HTML.urlMissionIcon(b.mission));
            l = PAGE.Para.sendingEnabled ? 2 !== k || c.resources ? 2 <= b.status ? 2 : 1 : 2 : 0;
            DOM.updateAttribute("continue", "id", "ago-status", l, 8);
            c.ships || DOM.updateClass("continue", "id", "off");
            PAGE.displayShortcuts(b);
            PAGE.displayCalculator();
            AGO.Init.Messages("Planets", "Action", {mode: "select", coords: b.coords, type: b.typeActive})
        }
        PAGE.lockedDisplay = !1;
        f = c = b = g = k = d = l = g = null
    },
    displayCalculator: function () {
        function a(a, b) {
            DOM.updateText("ago_calc_available_" + a, "id", b, 3);
            DOM.updateClass("ago_calc_available_" + a, "id", 0 > b ? "ago_color_palered" : "")
        }

        function e(a, b) {
            var c, e, g, p, r;
            if (b) {
                e = AGO.Ogame.getFleetDuration(b, f.distance, f.speed);
                g = AGO.Ogame.getShipConsumption(b, f.distance, e);
                p = Math.max(0, Math.ceil(f.resources / AGO.Item[b].capacity));
                if (c = document.getElementById("ago_calc_ships_" + a)) {
                    DOM.updateText(c, null, p, 3) && (r = p ? h[b] >= p ? "ago_color_lightgreen" : "ago_color_palered" : "ago_color_blue", DOM.updateClass(c, null, r)
                    ), c.parentNode.className = b === PAGE[PAGE.Para.calculator].preferShip ? "ago_calc_selected" : "";
                }
                g = p ? Math.round(g * p) + 1 : 0;
                DOM.updateText("ago_calc_consumption_" + a, "id", g, 3) && (r = h.deuterium > g ? "" : "ago_color_palered", DOM.updateClass("ago_calc_consumption_" + a, "id", r)
                );
                DOM.updateText("ago_calc_duration_" + a, "id", e, 18)
            }
        }

        var h, f, c, b, g;
        h = AGO.Units.Data;
        f = PAGE.Next;
        document.getElementById("planet") && 2 === DOM.getAttribute("ago_summary", "id", "ago_display_status", 2) && (g = 0, (c = document.getElementById("speedLinks")
                                                                                                                             ) && !DOM.hasClass(DOM.getChildren(c, f.speed - 1), null, "selected") && DOM.iterateChildren(c, function (a) {
                                                                                                                                                                                                                              a.className = ++g === f.speed ? "selected" : ""
                                                                                                                                                                                                                          }
        ), DOM.updateText("ago_calc_consumption_total", "id", f.consumption, 3), DOM.updateText("ago_calc_duration_total", "id", f.duration, 18), 3 === PAGE.Para.calculator ? (g = 0, b = {
                                                                                                                                                                                               50: 0,
                                                                                                                                                                                               75: 1,
                                                                                                                                                                                               100: 2
                                                                                                                                                                                           }[f.plunder] ||
                                                                                                                                                                                           0, (c = document.getElementById("ago_calc_plunder")
                                                                                                                                                                                              ) && !DOM.hasClass(DOM.getChildren(c, b), null, "selected") && DOM.iterateChildren(c, function (a) {
                                                                                                                                                                                                                                                                                     a.className = b === g++ ? "selected" : ""
                                                                                                                                                                                                                                                                                 }
        ), e("shipA", "202"), e("shipB", "203")
        ) : 4 === PAGE.Para.calculator ? e("shipC", "209") : (a("total", h.resources - f.resources), a("metal", h.metal - f.metal), a("crystal", h.crystal - f.crystal), a("deuterium", h.deuterium - f.deuterium - f.consumption), 2 === PAGE.Para.calculator && (e("shipA", "202"), e("shipB", "203"), e("shipC", PAGE[2].thirdShip)
        ), 5 === PAGE.Para.calculator &&
           DOM.updateText("ago_collect_coords", "id", AGO.Fleet.Get("Routine", "Collect", 6))
        )
        )
    },
    displayShortcuts: function (a) {
        var e;
        (e = document.getElementById("ago_shortcuts")
        ) && DOM.iterateChildren(e.querySelector(".ago_shortcuts_own"), function (e) {
                                     var f, c;
                                     "A" === e.nodeName && (c = e.getAttribute("rel"), f = c === AGO.Acc.coords ? AGO.Token.getClassHighlight(AGO.Acc.type) : "", DOM.setClassGroup(e, null, "ago_highlight", f), f = c === a.coords ? " " + AGO.Token.getClassSelected(a.typeActive, !0) : "", DOM.setClassGroup(e, null, "ago_selected", f)
                                     )
                                 }
        );
        e = null
    },
    Action: function (a) {
        function e(a) {
            var b;
            28 === a.action ? (b = a.id, b in AGO.Item.Resource && (d[b] = 2 !== k.calculator ? 0 : d[b] ? PAGE.lastActive === "ago_calc_resource_" + b ? Math.max(g[b] - d[b], 0) : 0 : g[b], DOM.setValue("ago_calc_resource_" + b, "id", d[b], 8)
            )
            ) : a.action && OBJ.iterate(AGO.Item.Resource, function (b) {
                                            d[b] = 21 === a.action ? AGO.Units.Data[b] : 22 === a.action ? Math.max(AGO.Units.Data[b] - PAGE.Mini[b], 0) : 23 === a.action ? 0 : +a[b] || 0;
                                            DOM.setValue("ago_calc_resource_" + b, "id", d[b], 8)
                                        }
            )
        }

        function h(a) {
            d.ships = 0;
            OBJ.iterate(AGO.Item.Ship,
                        function (b) {
                            if ("212" !== b) {
                                var c;
                                c = 12 === a.action ? Math.max(g[b] - PAGE.Mini[b], 0) : +a[b] || 0;
                                d[b] = Math.min(c, g[b]);
                                d.ships += d[b];
                                c = c ? g[b] - c : 0;
                                g[b] && DOM.updateValue("ship_" + b, "id", d[b], 0, "change");
                                DOM.updateText("anti_ship_" + b, "id", c, 2);
                                DOM.setStyleColor("anti_ship_" + b, "id", 0 > c ? "#E41615" : "#00B000")
                            }
                        }
            )
        }

        function f() {
            function b(c) {
                var f = AGO.Ogame.getShipCapacity(c, a.distance, d.speed);
                g[c] && 0 < f && (a[c] = Math.min(Math.ceil(e / f), g[c]), e -= a[c] * f
                )
            }

            var c, e;
            c = PAGE[2].preferShip;
            19 === a.action && a.id in AGO.Item.Ship &&
            (c = a.id
            );
            d.mission = a.mission || d.mission;
            e = d.resources;
            if (a.recalculate || 19 === a.action) {
                a.speed = d.speed, a.distance = AGO.Ogame.getFleetDistance(AGO.Acc, d), b(c), 0 < e && "203" !== c && b("203"), 0 < e && "202" !== c && b("202"), 0 < e && c !== PAGE[2].thirdShip && PAGE[2].thirdShip && b(PAGE[2].thirdShip), 0 < e && (a[c] += Math.ceil(e / AGO.Ogame.getShipCapacity(c, a.distance, a.speed))
                ), (VAL.check(a.action, 21, 22) || 28 === a.action && "deuterium" === a.id
                   ) && d.deuterium && (AGO.Task.updateShips(a, a.distance), d.deuterium -= a.consumption, DOM.setValue("ago_calc_resource_deuterium",
                                                                                                                        "id", d.deuterium, 8
                )
                   ), a.action = 10, h(a);
            }
            c = e = null
        }

        function c() {
            var b;
            AGO.Task.updateShips(a);
            a.ships && (a.action = 10, a["202"] ? (b = a["202"] - g["202"], 0 < b && (PAGE[3].status = 2, a["202"] = g["202"], a["203"] = Math.ceil(b / 5), a["203"] > g["203"] && (PAGE[3].status = 1
            )
            )
            ) : (b = a["203"] - g["203"], 0 < b && (PAGE[3].status = 2, a["203"] = g["203"], a["202"] = 5 * b, a["202"] > g["202"] && (PAGE[3].status = 1
            )
            )
                                       ), h(a)
            )
        }

        function b() {
            var b, c;
            c = d.metal + d.crystal;
            a.recalculate && (b = AGO.Ogame.getFleetDistance(AGO.Acc, d), b = AGO.Ogame.getShipCapacity("209", b,
                                                                                                        d.speed
            ), a["209"] = Math.ceil(c / b), a.action = 10, h(a)
            )
        }

        var g, k, d, l, m, q;
        g = AGO.Units.Data;
        k = PAGE.Para;
        d = PAGE.Next;
        if ((l = document.getElementById("inhalt")
            ) && AGO.Init.status && OBJ.hasProperties(a)) {
            PAGE.lockedDisplay = !0;
            if (m = PAGE.getRoutine(a.routine) ? a.routine : 0) {
                d.routine = d.mission = d.stopActiveSelection = 0, 1 === PAGE.getRoutine(m) ? (m !== k.calculator && (d.stopAutoHarvest = 2 !== m, d.resources && e({action: 23}), 2 === d.type && (d.type = 0
                )
                ), 2 <= PAGE.getRoutine(k.calculator) && (a.speed = 10, h({action: 10}), AGO.Task.updateCoordsType(a,
                                                                                                                   k.coordstype
                ), 4 <= a.owncoords && (d.type = a.type = 0
                )
                )
                ) : 2 <= PAGE.getRoutine(m) && (d.resources && e({action: 23}), 10 === m ? PAGE.getRoutine(m + (+a.last || 0
                                                                                                           ), "status"
                ) && (PAGE[10].last = +a.last || 0, q = a.target ? 0 : 2, a = AGO.Task.create(PAGE[m + PAGE[10].last], q), AGO.Task.updateResources(a), a.resources && (a.action = 20, e(a)
                ), a.action = 2 === q ? 10 : 0
                                                                                           ) : (PAGE.Init(m, a.last), a = AGO.Task.create(PAGE[m], 2), a.action = 10
                                                                                ), a.speed = a.speed || 10, 10 === a.action && h(a)
                ), k.calculator = m, PAGE.showCalculator();
            } else {
                VAL.check(a.action, 12, 10) && h(a);
                a.mission =
                PAGE.Mission.check(a.mission);
                if (VAL.check(a.action, 41, 42)) {
                    if (a.type || a.mission) {
                        d.stopAutoHarvest = 1;
                    }
                    a.type && (d.stopActiveSelection = 1
                    )
                }
                3 <= a.owncoords && (d.type = 0, 3 > d.owncoords && (a.type = 0
                )
                );
                4 === k.calculator && (a.type = 0
                )
            }
            a.type = PAGE.Type.check(a.type);
            AGO.Task.updateCoords(a, 4);
            OBJ.iterate(AGO.Item.CoordinatesType, function (b) {
                            a[b] && (d[b] = a[b], "type" !== b && (DOM.setValue('input[name="' + b + '"]', l, a[b], 8), DOM.setValue("ago_" + b, "id", a[b])
                            )
                            )
                        }
            );
            AGO.Task.updateCoords(d, 3);
            d.owncoords && (d.owncoords = AGO.Planets.owncoords(d.coords,
                                                                d.type || AGO.Acc.type
            )
            );
            3 > d.owncoords && (d.stopActiveSelection = 0
            );
            a.arrival && (d.coordsMarked = a.coords || "", d.arrivalMarked = +a.arrival || 0
            );
            OBJ.iterateArray([
                                 "holdingtime",
                                 "expeditiontime",
                                 "union",
                                 "retreatAfterDefenderRetreat",
                                 "preferResource"
                             ], function (b) {
                                 d[b] = +a[b] || 0
                             }
            );
            VAL.check(a.plunder, 50, 75, 100) && (d.plunder = a.plunder
            );
            NMR.isMinMax(a.speed, 1, 10) && (d.speed = a.speed, DOM.setValue('input[name="speed"]', l, d.speed, 8)
            );
            VAL.check(a.action, 20, 21, 22, 23, 28) && e(a);
            AGO.Task.updateResources(d);
            a.recalculate = d.coords +
                            ":" + d.speed !== d.previousTarget && d.resources || d.metal + ":" + d.crystal + ":" + d.deuterium !== d.previousResources && ("0:0:0" !== d.previousResources || d.resources
            );
            switch (k.calculator) {
                case 2:
                    f();
                    break;
                case 3:
                    a.stop = a.owncoords && 41 === a.action;
                    c();
                    break;
                case 4:
                    a.stop = 2 !== a.type && 42 === a.action;
                    b();
                    break;
                case 5:
                    a.stop = !d.owncoords || 2 === d.type;
                    d.mission = VAL.select(a.mission, 3, 4) || d.mission;
                    2 <= a.owncoords && 41 === a.action && (PAGE.Init(5, 2, a.coordstype), PAGE.showCalculator()
                    );
                    break;
                case 7:
                    a.stop = VAL.check(a.action, 11,
                                       12
                    );
                    break;
                case 6:
                    d.mission = a.mission || d.mission;
                    break;
                case 10:
                    d.mission = a.mission || d.mission
            }
            if (a.stop) {
                PAGE.Action({routine: 2, action: 13});
                return
            }
        }
        d.previousTarget = d.coords + ":" + d.speed;
        d.previousResources = d.metal + ":" + d.crystal + ":" + d.deuterium;
        PAGE.Display();
        g = k = d = l = m = q = null
    },
    Continue: function () {
        var a;
        DOM.hasClass("continue", "id", "on") && (a = {}, DOM.addClass("continue", "id", "ago_selected_button"), DOM.addClass("ago_routine", "id", "ago_selected"), PAGE.Next.routine = PAGE.Next.routine || PAGE.getRoutine(1, "status"),
            OBJ.iterateFilter(PAGE.Next, function (e) {
                                  a[e] = PAGE.Next[e]
                              }, PAGE.filterContinue
            ), AGO.Fleet.Set("Current", {Task2: JSON.stringify(a)}), window.setTimeout(function () {
                                                                                           AGO.Init.status && (DOM.removeClass("continue", "id", "ago_selected_button"), DOM.removeClass("ago_routine", "id", "ago_selected")
                                                                                           )
                                                                                       }, 1500
        )
        )
    },
    getRoutine: function (a, e) {
        return a && PAGE[a] ? +PAGE[a][e || "group"] || 0 : 0
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
        if (document.activeElement.tagName in {'TEXTAREA':1, 'INPUT':1}) return;
        if (13 ===
            a.keyCode) {
            return DOM.hasClass("continue", "id", "on") ? DOM.click("#continue.on") : (DOM.click("#ago_routine_" + PAGE.Para.calculator), 2 <= PAGE.getRoutine(PAGE.Para.calculator) && 2 <= PAGE.getRoutine(PAGE.Para.calculator, "status") && DOM.click("#continue.on")
            ), !1;
        }
        if (12 !== a.inputType) {
            if (65 === a.keyCode) {
                return DOM.click("#sendall"), !1;
            }
            if (77 === a.keyCode) {
                return DOM.click("span.send_most a"), !1;
            }
            if (81 === a.keyCode) {
                return DOM.click("span.send_none a"), !1;
            }
            if (84 === a.keyCode) {
                return DOM.click("#ago_routine_2"), !1;
            }
            if (82 ===
                a.keyCode) {
                return DOM.click("#ago_routine_4"), !1;
            }
            if (83 === a.keyCode) {
                return DOM.click("#ago_routine_5"), !1;
            }
            if (70 === a.keyCode) {
                return DOM.click("#ago_routine_6"), !1;
            }
            if (69 === a.keyCode) {
                return DOM.click("#ago_routine_7"), !1;
            }
            if (76 === a.keyCode) {
                return DOM.click("#ago_routine_10"), !1
            }
        }
        return 11 !== a.inputType || 38 !== a.keyCode && 40 !== a.keyCode || !AGO.Item.Ship[STR.check(NMR.parseIntAbs(a.target.id))] && !HTML.hasClass(a.target.className, "ago_keys_arrows") ? !0 : DOM.changeInput(a, a.target)
    },
    onSwipe: function (a) {
        "diagUp" ===
        a && DOM.click("span.send_none a");
        "diagDown" === a && DOM.click("span.send_most a");
        "left" === a && DOM.click('#menuTable .menubutton[href*="page=fleet1"]');
        if ("right" === a) {
            PAGE.onKeydown({keyCode: 13})
        }
    },
    onBriefing: function (a) {
        7 <= AGO.Init.status && (a = DOM.getData(a.target, null, 5), "continue" === a.action ? DOM.hasClass("continue", "id", "on") || PAGE.Action({action: 12}) : a.action && PAGE.Action(a)
        )
    },
    onCalculator: function (a) {
        var e, h, f, c;
        e = a && a.target ? a.type : "";
        h = DOM.getData(a.target, null, 2);
        "click" === e && (a.stopPropagation(),
        "ago_display_arrow" === a.target.className && (f = 1 < DOM.getAttribute("ago_summary", "id", "ago_display_status", 2) ? 1 : 2, DOM.setAttribute("ago_summary", "id", "ago_display_status", f, 8), AGO.Option.set("F13", 2 !== f, 1), PAGE.displayCalculator()
        )
        );
        if (7 <= AGO.Init.status && e && OBJ.hasProperties(h)) {
            c = h.id;
            f = h.type || 19 === h.action;
            if (PAGE.timeoutCalculator) {
                window.clearTimeout(PAGE.timeoutCalculator);
            } else if ("click" === e && f) {
                return !0;
            }
            if ("mousedown" === e) {
                if (f) {
                    var b = JSON.stringify(h);
                    PAGE.timeoutCalculator = window.setTimeout(function () {
                                                                   var a,
                                                                       c;
                                                                   PAGE.timeoutCalculator = null;
                                                                   a = OBJ.parse(b);
                                                                   c = a.id;
                                                                   19 === a.action && c in AGO.Item.Ship ? (2 === PAGE.Para.calculator && (AGO.Option.set("F62", "202" === c ? 0 : "203" === c ? 1 : 2, 2), PAGE.Init(2), PAGE.Action(a)
                                                                   ), 3 === PAGE.Para.calculator && (AGO.Option.set("FA2", "202" === c, 1), PAGE.Init(3), PAGE.Action(a)
                                                                   )
                                                                   ) : VAL.check(a.type, 1, 3) && 3 === PAGE.Para.calculator && (c = AGO.Option.get("FA1", 2) === a.type ? 0 : a.type, AGO.Option.set("FA1", c, 2), PAGE.Action(a)
                                                                   )
                                                               }, 1E3
                    )
                }
            } else if (c in AGO.Item.Coordinates) {
                h[c] = f = NMR.parseIntAbs(a.target.value), "focus" ===
                                                            e && f ? (a.target.setAttribute("ago_value", f), f = 0
                                                            ) : "blur" !== e || f ? f && (f = AGO.Task.checkCoordsPart(f, c)
                ) : f = NMR.parseIntAbs(a.target.getAttribute("ago_value")), h[c] !== f && (h[c] = f, a.target.value = STR.check(f)
                ), PAGE.Action(h);
            } else if (c in AGO.Item.Resource) {
                if ("INPUT" === a.target.nodeName) {
                    if ("blur" === e) {
                        PAGE.onActive(a.target.id);
                    }
                    f = NMR.parseIntShortcut(a.target.value);
                    e = "click" !== e || f ? "dblclick" === e ? "" : "blur" !== e || f ? STR.check(f) : "0" : "";
                    PAGE.Next[c] = +e || 0;
                    e !== a.target.value && (a.target.value = e
                    )
                } else {
                    PAGE.Next[c] =
                    DOM.getValue("ago_calc_resource_" + c, "id", 3);
                }
                PAGE.Action(h)
            } else {
                "click" === e && (PAGE.Para.calculator !== h.routine || !PAGE.Next.ships || void 0 !== h.last && h.last !== PAGE[h.routine].last ? (PAGE.Para.calculator === h.routine && 1 === PAGE.getRoutine(h.routine) && (1 === DOM.getAttribute("ago_summary", "id", "ago_display_status", 2) ? (DOM.setAttribute("ago_summary", "id", "ago_display_status", 2, 8), PAGE.displayCalculator()
                ) : 2 !== h.routine || PAGE.Next.ships || PAGE.Next.resources || (h.action = 22
                )
                ), PAGE.Action(h)
                ) : DOM.click("#continue.on")
                )
            }
        }
        e =
        h = f = e = f = c = null
    },
    onShortcuts: function (a) {
        var e, h, f;
        !(h = a && a.target ? a.type : ""
        ) || 7 > AGO.Init.status || ("click" === h && a.currentTarget ? "ago_shortcuts_header" === a.currentTarget.className ? (e = 1 < DOM.getAttribute("ago_shortcuts", "id", "ago_display_status", 2) ? 1 : 2, DOM.setAttribute("ago_shortcuts", "id", "ago_display_status", e, 8), AGO.Option.set("F14", 2 !== e, 1)
        ) : (e = a.currentTarget.rel || "", DOM.hasClass(a.currentTarget.parentNode, null, "ago_shortcuts_own") && (f = "SPAN" === a.target.nodeName ? a.target.className : a.target.parentNode.className,
            e += ":" + ("ago_shortcuts_moon" === f ? 3 : "ago_shortcuts_debris" === f ? 2 : 1
            )
        ), a = AGO.Task.split(e, 2, 4), a.routine = 0, a.action = 41, PAGE.Action(a)
                                                                        ) : "dblclick" === h ? AGO.Option.is("U34") && DOM.click("#continue") : ("A" === a.target.nodeName ? e = a.target : "SPAN" === a.target.nodeName ? (f = a.target.className, e = a.target.parentNode
        ) : "SPAN" === a.target.parentNode.nodeName && (f = a.target.parentNode.className, e = a.target.parentNode.parentNode
        ), e && "A" === e.nodeName && DOM.setClassGroup(e, null, "ago_hover", AGO.Token.getClassHover("ago_shortcuts_moon" ===
                                                                                                      f ? 3 : "ago_shortcuts_debris" === f ? 2 : 1, "own"
                                                        )
        )
        )
        )
    },
    onActive: function (a) {
        PAGE.lastActive = a;
        window.setTimeout(function () {
                              PAGE.lastActive = ""
                          }, 150
        )
    }
};
AGO.Task.updateShips = function (a, e) {
    var h;
    OBJ.is(a) && (a.consumption = 1, a["212"] = 0, a.ships = a.shipsCivil = a.shipsCombat = a.capacity = a.expoints = a.minspeed = 0, OBJ.iterate(AGO.Item.Ship, function (e) {
                                                                                                                                                      var c;
                                                                                                                                                      if (c = a[e]) {
                                                                                                                                                          if (e in AGO.Item.ShipCivil ? a.shipsCivil += c : a.shipsCombat += c, a.ships += c, a.capacity += c * AGO.Item[e].capacity, a.expoints += (AGO.Item[e].metal + AGO.Item[e].crystal
                                                                                                                                                                                                                                                                                                    ) / 200 * c, c = AGO.Ogame.getShipSpeed(e), !a.minspeed || c < a.minspeed) {
                                                                                                                                                              a.minspeed = c, h = e
                                                                                                                                                          }
                                                                                                                                                      }
                                                                                                                                                  }
    ), e && (a.duration = AGO.Ogame.getFleetDuration(h, e, a.speed), OBJ.iterate(AGO.Item.Ship,
                                                                                 function (f) {
                                                                                     a[f] && (a.consumption += a[f] * AGO.Ogame.getShipConsumption(f, e, a.duration)
                                                                                     )
                                                                                 }
    ), a.consumption = Math.round(a.consumption)
    )
    )
};