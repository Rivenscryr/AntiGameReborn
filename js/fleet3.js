AGO.Fleet3 = {
    filterContinue: "routine holdingtime expeditiontime union retreatAfterDefenderRetreat metal crystal deuterium preferResource arrivalUnion nameUnion coordsMarked arrivalMarked".split(" "),
    routine: {2: "F60", 3: "FA0", 4: "FH0", 5: "F80", 6: "F90", 7: "F70", 10: "FL0"},
    Messages: function (a, b) {
        "Action" === a ? PAGE.Action(b) : "Continue" === a ? PAGE.Continue() : PAGE.lockedDisplay || "Display" === a && PAGE.Display()
    },
    Read: function () {
        var a, b, c;
        (b = document.getElementById("inhalt")
        ) && AGO.Option.is("F00") && (PAGE.enabled = !0,
            a = PAGE.Para = OBJ.parse(AGO.Fleet.Get("Current", "Task3", 6)), DOM.iterate(document.querySelectorAll('#sendfleet .content > form input[type="hidden"]'), function (b) {
                                                                                             var c, d;
                                                                                             if (c = STR.trim(b.name)) {
                                                                                                 d = NMR.parseIntAbs(c), a[200 < d ? d : c] = +b.value || 0
                                                                                             }
                                                                                         }
        ), b = b.querySelectorAll("#fleetStatusBar li"), 3 <= b.length && (c = STR.trim(DOM.getText(b[1], null).split("]")[1]), a.planetName = 1 === a.type ? c : "", a.moonName = 3 === a.type ? c : "", a.playerHonor = AGO.Ogame.getPlayerHonor(DOM.getAttribute("span.honorRank", b[2], "class")), a.playerStatus =
                                                                                                                                                                                                                                                                                                       AGO.Token.getPlayerStatus('span[class^="status_abbr"]', b[2]) || 21, a.playerName = STR.trim(DOM.getText(b[2], null).split(":")[1])
        ), a.union = a.union2, AGO.Task.updateShips(a), AGO.Task.updateCoords(a, 4), PAGE.Next = OBJ.create(a), b = 5 === a.routine ? "F81" : 6 === a.routine ? "F91" : "F31", PAGE.Mini = AGO.Task.splitActive(AGO.Option.get(b, -1), 1, 0), PAGE.Mini.preferResource = NMR.minMax(PAGE.Mini.preferResource, 1, 3), AGO.Fleet.Set("Current", "Task3", "")
        );
        a = b = b = null
    },
    Run: function () {
        PAGE.enabled && PAGE.Show()
    },
    Ready: function () {
        var a,
            b, c;
        (c = document.getElementById("inhalt")
        ) && PAGE.enabled && (PAGE.lockedDisplay = !0, a = PAGE.Para, AGO.Option.is("F51") && OBJ.iterateArray([
                                                                                                                   15,
                                                                                                                   7,
                                                                                                                   8,
                                                                                                                   6,
                                                                                                                   1,
                                                                                                                   4,
                                                                                                                   3
                                                                                                               ], function (a) {
                                                                                                                   c.querySelector("#missions a.selected") || c.querySelector("#button" + a + ".on") && DOM.click("#missionButton" + a)
                                                                                                               }
        ), b = {
            holdingtime: a.holdingtime,
            expeditiontime: a.expeditiontime,
            retreatAfterDefenderRetreat: a.retreatAfterDefenderRetreat
        }, 2 === a.routine && (b.action = "set", b.metal = a.metal, b.crystal = a.crystal, b.deuterium = a.deuterium
        ), 5 === a.routine && (b.action =
                               "setMost"
        ), PAGE.Action(b), a.owncoords && AGO.Init.Messages("Planets", "Action", {
                                                                mode: "select",
                                                                coords: a.coords,
                                                                type: a.type
                                                            }
        ), DOM.addEvents("#planet h2", null, {click: PAGE.onSummary}), DOM.addEvents("#wrap #resources", null, {click: PAGE.onBriefing}), DOM.addEvents("back", "id", {click: PAGE.Back}), DOM.addEvents("ago_fleet_marked", "id", {click: PAGE.onMarked}), DOM.addEventsAll("#missions .on a", null, {dblclick: PAGE.onMission})
        );
        a = c = b = null
    },
    Timer: function () {
        PAGE.displayUnion();
        PAGE.displayMarked()
    },
    Show: function () {
        var a,
            b, c, e, f, d, g, h;
        a = PAGE.Para;
        if (b = document.getElementById("inhalt")) {
            DOM.extendClass(b, null, "ago ago_improve");
            PAGE.showSummary();
            if (e = b.querySelector("#buttonz .header h2")) {
                DOM.setStyleDisplay(e), DOM.appendChild(e.parentNode, b.querySelector("#missionName"));
            }
            if (e = b.querySelector("#missions")) {
                DOM.iterate(e.querySelectorAll("li.off a"), function (a) {
                                a.onclick = null
                            }
                );
                c = document.createDocumentFragment();
                d = PAGE.Next.arrivalUnion ? null : {display: "none"};
                d = DOM.appendDIV(c, {"class": "ago_fleet_details", id: "ago_fleet_union"},
                                  d
                );
                DOM.appendSPAN(d, "ago_fleet_label");
                DOM.appendSPAN(d, "ago_fleet_duration");
                DOM.appendSPAN(d, "ago_fleet_count");
                DOM.appendSPAN(d, "ago_fleet_arrival");
                d = PAGE.Next.arrivalMarked ? null : {display: "none"};
                d = DOM.appendDIV(c, {"class": "ago_fleet_details ago_panel_remove", id: "ago_fleet_marked"}, d);
                DOM.appendSPAN(d, "ago_fleet_label");
                DOM.appendSPAN(d, "ago_fleet_duration");
                DOM.appendSPAN(d, "ago_fleet_count");
                DOM.appendSPAN(d, "ago_fleet_arrival");
                d = DOM.appendDIV(c, {"class": "ago_fleet_details", id: "ago_fleet_details"});
                if (f = b.querySelector("#duration")) {
                    DOM.setStyleDisplay(f.parentNode), h = DOM.getTextChild(f.parentNode), DOM.appendSPAN(d, "ago_fleet_label", h), DOM.appendSPAN(d, "ago_fleet_duration");
                }
                if (f = b.querySelector("#arrivalTime")) {
                    f.textContent = AGO.Time.convertLocal(f.textContent, "[H]:[i]:[s]"), DOM.setStyleDisplay(f.parentNode.parentNode), DOM.appendSPAN(d, "ago_fleet_name", DOM.getTextChild(f.parentNode.parentNode)), g = DOM.appendSPAN(d, "ago_fleet_arrival"), g.appendChild(f);
                }
                d = DOM.appendDIV(c, {
                                      "class": "ago_fleet_details",
                                      id: "ago_fleet_return"
                                  }
                );
                if (f = b.querySelector("#returnTime")) {
                    DOM.setStyleDisplay(f.parentNode.parentNode), DOM.appendSPAN(d, "ago_fleet_label", (h || ""
                                                                                                       ).split("(")[0] + ":"
                    ), DOM.appendSPAN(d, "ago_fleet_duration"), DOM.appendSPAN(d, "ago_fleet_name", DOM.getTextChild(f.parentNode.parentNode)), DOM.appendSPAN(d, "ago_fleet_arrival").appendChild(f);
                }
                e.parentNode.appendChild(c)
            }
            if ((e = b.querySelector("#roundup ul")
                ) && !AGO.App.OgameMobile) {
                if (f = e.querySelector("#fightAfterRetreat + li span")) {
                    f.className = "value", d = document.createElement("li"),
                        DOM.appendSPAN(d, "value").innerHTML = HTML.getPlayer(a.playerName, a.playerStatus, a.playerHonor), DOM.after(f.parentNode, d);
                }
                if (f = e.querySelector("#consumption")) {
                    DOM.removeChildren(f.parentNode, 3), d = DOM.appendLI(null, {id: "speedLinks"}), DOM.appendSPAN(d, {
                                                                                                                        "class": "value selected",
                                                                                                                        "data-value": a.speed
                                                                                                                    }, 10 * a.speed + " %"
                    ), DOM.after(f.parentNode.parentNode, d);
                }
                c = document.createDocumentFragment();
                DOM.appendChild(c, e.querySelector("#holdtimeline"));
                DOM.appendChild(c, e.querySelector("#expeditiontimeline"));
                DOM.appendChild(c,
                                e.querySelector("#fightAfterRetreat")
                );
                e.appendChild(c)
            }
            (e = b.querySelector("#loadAllResources")
            ) && !AGO.App.OgameMobile && (c = document.createDocumentFragment(), DOM.appendA(c, {
                                                                                                 id: "allresources",
                                                                                                 "class": "ago_fleet_loadAllResources tooltip js_hideTipOnMobile",
                                                                                                 title: e.textContent
                                                                                             }, null, {action: "setAll"}
            ), DOM.appendA(c, {
                               id: "mostresources",
                               "class": "ago_fleet_loadAllResources tooltip js_hideTipOnMobile",
                               title: AGO.Label.get("F38")
                           }, null, {action: "setMost"}
            ), DOM.appendA(c, {
                               id: "noneresources", "class": "ago_fleet_loadAllResources tooltip js_hideTipOnMobile",
                               title: AGO.Label.get("F39")
                           }, null, {action: "setNone"}
            ), DOM.replaceChildren(e, c), OBJ.iterate(AGO.Item.Resource, function (a) {
                                                          if (f = e.parentNode.querySelector("#" + a)) {
                                                              if (c = document.createDocumentFragment(), DOM.appendA(c, "ago_fleet_loadResource ago_fleet_allResource", null, {
                                                                                                                         action: "setAllById",
                                                                                                                         id: a
                                                                                                                     }
                                                                  ), DOM.appendA(c, "ago_fleet_loadResource ago_fleet_mostResource", null, {
                                                                                     action: "setMostById",
                                                                                     id: a
                                                                                 }
                                                                  ), DOM.appendA(c, "ago_fleet_loadResource ago_fleet_noneResource", null, {
                                                                                     action: "setNoneById",
                                                                                     id: a
                                                                                 }
                                                                  ), f.parentNode.parentNode.appendChild(c),
                                                                      g = f.parentNode.parentNode.querySelector(".resourceIcon")) {
                                                                  DOM.setData(g, null, {
                                                                                  action: "toggleById",
                                                                                  id: a
                                                                              }
                                                                  ), DOM.appendSPAN(g, {
                                                                                        "class": "ago_fleet_remaining_resource ago_text_background",
                                                                                        id: "ago_fleet_remaining_" + a
                                                                                    }
                                                                  )
                                                              }
                                                          }
                                                      }
            )
            )
        }
        a = b = c = e = f = d = g = null
    },
    showSummary: function () {
        function a(a, b) {
            return 0 === a ? "ago_color_blue" : a === b ? "ago_color_palered" : a === b - 1 ? "ago_color_orange" : "ago_color_lightgreen"
        }

        var b, c, e, f, d, g, h;
        if (b = document.getElementById("planet")) {
            AGO.Task.updateResources(PAGE);
            c = document.createDocumentFragment();
            e = DOM.appendDIV(c, {id: "ago_summary_fleets"});
            f = AGO.Fleet.Get("Current", "fleets");
            d = AGO.Fleet.Get("Current", "fleetsSlots");
            h = a(f, d);
            e = DOM.appendA(e, {href: AGO.Uni.path + "movement", title: AGO.Label.get("E10"), "class": h + " tooltip"});
            e.textContent = AGO.Label.get("F21") + ": " + f + "/" + d;
            f = AGO.Fleet.Get("Current", "expos");
            d = AGO.Fleet.Get("Current", "exposSlots");
            h = a(f, d);
            DOM.appendSPAN(e, h, AGO.Label.get("F22") + ": " + f + "/" + d);
            e = DOM.appendDIV(c, {id: "ago_summary"});
            f = DOM.appendTABLE(e, null, null, [200, 223, 223]);
            d = DOM.appendTR(f,
                             "ago_summary_header"
            );
            e = DOM.appendTD(d, {id: "ago_summary_routine"});
            e = DOM.appendTD(d, {colspan: 2});
            d = DOM.appendTR(f, "ago_summary_total");
            e = DOM.appendTD(d, null, "I27", 10);
            DOM.appendSPAN(e, {id: "ago_summary_resource"}, PAGE.Para.resources, 3);
            e = DOM.appendTD(d, null, "I28", 10);
            DOM.appendSPAN(e, {id: "ago_summary_civil"}, PAGE.Para.shipsCivil, 3);
            e = DOM.appendTD(d, null, "I29", 10);
            DOM.appendSPAN(e, {id: "ago_summary_combat"}, PAGE.Para.shipsCombat, 3);
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
                    d = DOM.appendTR(f), e = DOM.appendTD(d, null, g.Resource[h], 11), DOM.appendSPAN(e, null, PAGE.Para[g.Resource[h]], 2), e = DOM.appendTD(d, null, g.ShipCivil[h], 11), DOM.appendSPAN(e, null, PAGE.Para[g.ShipCivil[h]], 2), e = DOM.appendTD(d, null, g.ShipCombat[h], 11), DOM.appendSPAN(e, null, PAGE.Para[g.ShipCombat[h]], 2);
                } else {
                    break;
                }
            }
            b.appendChild(c)
        }
        b = c = e = f = d = e = g = f = d = h = h = null
    },
    Display: function () {
        var a, b, c, e, f, d;
        a = PAGE.Next;
        (b = document.getElementById("inhalt")
        ) && 7 <= AGO.Init.status && (d = PAGE.lockedDisplay = !0, PAGE.updateTask(a, 1), a.arrivalUnion = 2 === a.mission ? PAGE.Para.arrivalUnion : 0, a.resources = 0, OBJ.iterate(AGO.Item.Resource, function (b) {
                                                                                                                                                                                          var c;
                                                                                                                                                                                          c = AGO.Units.get(b);
                                                                                                                                                                                          ("deuterium" === b) && (c -= document.getElementById("consumption").textContent.split(" ")[0].split(".").join(""));
                                                                                                                                                                                          a.resources += a[b];
                                                                                                                                                                                          (1.01 * a[b] < c - PAGE.Mini[b]) && (d = !1);
                                                                                                                                                                                          DOM.setText("ago_fleet_remaining_" + b, "id", Math.max(c - a[b], 0), 5)
                                                                                                                                                                                      }
        ), e = a.resources ? d ? "ago_fleet_resources_all" : "ago_fleet_resources_loaded" : "", DOM.updateClass("#naviActions",
                                                                                                                b, e
        ), DOM.setStyleDisplay("aks", "id"), DOM.updateClass("#missionName", b, "missionName " + HTML.classMission(a.mission)), e = 0, 5 === a.mission && (e = Math.max(a.holdingtime, 0), (c = DOM.updateAttribute("#holdtimeline .dropdown a", b, "data-value", e, 8)
                                                                                                                                                                                           ) && DOM.setText(c, null, e, 8)
        ), 15 === a.mission && (e = Math.max(a.expeditiontime, 0), (c = DOM.updateAttribute("#expeditiontimeline .dropdown a", b, "data-value", e, 8)
                                                                   ) && DOM.setText(c, null, e, 8)
        ), a.duration || (a.duration = +AGO.Global.message({role: "getProperty", property: "duration"}) || 1,
            DOM.setText("#ago_fleet_details .ago_fleet_duration", b, a.duration, 18)
        ), DOM.setText("#ago_fleet_return .ago_fleet_duration", b, 2 * a.duration + 3600 * e, 18), f = [
            "",
            "metal",
            "crystal",
            "deuterium"
        ][PAGE.Mini.preferResource], OBJ.iterate(AGO.Item.Resource, function (a) {
                                                     if (c = b.querySelector(".resourceIcon." + a)) {
                                                         DOM[a === f ? "addClass" : "removeClass"](c.parentNode, null, "ago_fleet_preferResource")
                                                     }
                                                 }
        ), DOM.updateText("ago_summary_routine", "id", PAGE.routine[PAGE.Next.routine], 10), PAGE.displayUnion(), PAGE.displayMarked()
        );
        PAGE.lockedDisplay = !1;
        a = b = c = null
    },
    displayUnion: function () {
        var a, b, c, e, f, d;
        a = PAGE.Next;
        b = document.getElementById("ago_fleet_union");
        DOM.hasChildren(b) && (a.displayUnion !== a.arrivalUnion && (a.displayUnion = a.arrivalUnion, DOM.updateText(b.children[0], null, a.nameUnion + " (" + AGO.Label.get("F28") + ")"), DOM.updateStyle(b, null, "display", a.arrivalUnion ? "block" : "none"), AGO.Init.Messages("Events", "highlight", a.arrivalUnion)
        ), a.arrivalUnion && (c = Math.floor(a.arrivalUnion - (AGO.Time.serverTime + AGO.Time.durationRun
                                                              ) / 1E3
        ), 0 <= c && (f = Math.floor(a.duration /
                                     130 * 100
        ), d = Math.floor(1.3 * c), e = a.arrivalUnion - c + d, f = a.duration < c ? 3 : c > f ? 2 : 0 < c ? 1 : 0, DOM.updateText(b.children[1], null, d, 18), a = AGO.Time.formatTime(Math.abs(a.duration - d)) + " / " + AGO.Time.formatTime(Math.abs(c - a.duration)), DOM.updateText(b.children[2], null, a), DOM.updateStyle(b.children[2], null, "color", [
                                                                                                                                                                                                                                                                                                                                       "#FF0000",
                                                                                                                                                                                                                                                                                                                                       "#D43635",
                                                                                                                                                                                                                                                                                                                                       "#FF9600",
                                                                                                                                                                                                                                                                                                                                       "#99CC00"
                                                                                                                                                                                                                                                                                                                                   ][f]
        ), DOM.updateText(b.children[3], null, e, 17, "[d].[m].[y] [H]:[i]:[s]")
        )
        )
        )
    },
    displayMarked: function () {
        var a, b, c, e;
        a = PAGE.Next;
        b = document.getElementById("ago_fleet_marked");
        DOM.hasChildren(b) && (a.displayMarked !== a.arrivalMarked && (a.arrivalMarked = a.displayMarked = 1E3 < a.arrivalMarked ? a.arrivalMarked : 0, DOM.updateText(b.children[0], null, AGO.Label.get("I80") + ": " + (a.coordsMarked || ""
                                                                                                                                                                       )
        ), DOM.updateText(b.children[3], null, a.arrivalMarked, 17, "[d].[m].[y] [H]:[i]:[s]"), DOM.updateStyle(b, null, "display", a.arrivalMarked ? "block" : "none")
        ), a.arrivalMarked && (c = Math.floor(a.arrivalMarked - (AGO.Time.serverTime + AGO.Time.durationRun
                                                                ) / 1E3
        ), e = a.duration < c ? 3 : 0 < c ? 2 : 0, DOM.updateText(b.children[1],
                                                                  null, Math.max(c, 0), 18
        ), DOM.updateText(b.children[2], null, Math.abs(c - a.duration), 18), DOM.updateStyle(b.children[2], null, "color", [
                                                                                                  "#FF0000",
                                                                                                  "#D43635",
                                                                                                  "#FF9600",
                                                                                                  "#99CC00"
                                                                                              ][e]
        )
        )
        )
    },
    Dialog: function (a, b) {
        a && "errorBoxDecision" === b && AGO.Option.is("F18") && 7 === PAGE.Next.mission && AGO.Planets.count >= AGO.Planets.possible && (window.setTimeout(function () {
                                                                                                                                                                DOM.click("#errorBoxDecision a.yes")
                                                                                                                                                            }, 210
        ), window.setTimeout(function () {
                                 DOM.click("#errorBoxDecision a.yes")
                             }, 610
        )
        )
    },
    Action: function (a) {
        function b(a) {
            return AGO.Units.get(a) - ("deuterium" === a ? document.getElementById("consumption").textContent.split(" ")[0].split(".").join("") : 0);
        }

        function c(a, b) {
            DOM.setValue(a, "id", Math.max(b, 0), 8, "keyup")
        }

        function e(a) {
            a = NMR.minMax(a, 1, 3);
            return 1 === a ? ["metal", "crystal", "deuterium"] : 2 === a ? [
                "crystal",
                "deuterium",
                "metal"
            ] : 3 === a ? ["deuterium", "crystal", "metal"] : []
        }

        var f, d, g;
        f = PAGE.Next;
        (d = document.getElementById("inhalt")
        ) && AGO.Init.status && a && (PAGE.lockedDisplay = !0, g = a.action, a.arrival && (f.coordsMarked = a.coords || "", f.arrivalMarked = +a.arrival || 0
        ), a.holdingtime && (DOM.setValue("#holdtimeline select",
                                          d, Math.max(a.holdingtime, 0), 8
        ), AGO.Global.message({role: "updateHoldingOrExpTime"})
        ), a.expeditiontime && (DOM.setValue("#expeditiontimeline select", d, a.expeditiontime, 8), AGO.Global.message({role: "updateHoldingOrExpTime"})
        ), a.retreatAfterDefenderRetreat && DOM.setProperty("#fightAfterRetreat input", d, "checked", !0), a.preferResource && (f = {
            metal: 1,
            crystal: 2,
            deuterium: 3
        }[a.preferResource]
        ) && (PAGE.Mini.preferResource = f
                                                                                                           ), VAL.check(g, "set", "setAll", "setMost", "setNone") ? (OBJ.iterate(AGO.Item.Resource, function (a) {
                                                                                                                                                                                     c(a,
                                                                                                                                                                                       0
                                                                                                                                                                                     )
                                                                                                                                                                                 }
        ), OBJ.iterateArray(e(PAGE.Mini.preferResource), function (d) {
                                var e = "set" === g ? +a[d] || 0 : "setAll" === g ? b(d) : "setMost" === g ? b(d) - (+PAGE.Mini[d] || 0
                                ) : 0;
                                c(d, e)
                            }
        )
        ) : VAL.check(g, "setAllById", "setMostById", "setNoneById") && a.id in AGO.Item.Resource ? (f = "setAllById" === g ? b(a.id) : "setMostById" === g ? b(a.id) - (+PAGE.Mini[a.id] || 0
        ) : 0, c(a.id, f)
        ) : "toggleById" === g && a.id in AGO.Item.Resource && (f = DOM.getValue(a.id, "id", 2), f = 0 === f ? b(a.id) : f < AGO.Units.get(a.id + "Start") ? b(a.id) - f : 0, c(a.id, f)
        ), PAGE.Display()
        );
        f = d = null
    },
    Continue: function () {
        DOM.hasClass("start",
                     "id", "on"
        ) && (DOM.addClass("start", "id", "ago_selected_button"), AGB.message("Units", "Action", {
                                                                                  planet: AGO.Acc.planetId,
                                                                                  tabs: ["Ship"],
                                                                                  action: "remove",
                                                                                  list: [OBJ.create(PAGE.Para)]
                                                                              }
        ), PAGE.updateTask(PAGE.Next, 0), AGO.Fleet.Set("Current", "Routine", PAGE.Next.routine), AGB.message("Fleet", "Action", {
                                                                                                                  tab: "Last",
                                                                                                                  action: "set",
                                                                                                                  data: PAGE.Next,
                                                                                                                  coords: AGO.Acc.coords
                                                                                                              }
        ), window.setTimeout(function () {
                                 AGO.Init.status && DOM.removeClass("start", "id", "ago_selected_button")
                             }, 1500
        )
        )
    },
    Back: function () {
        var a, b;
        b = {};
        a = PAGE.Next;
        DOM.addClass("back",
                     "id", "ago_selected_button"
        );
        PAGE.updateTask(a, 1);
        OBJ.iterateFilter(a, function (c) {
                              b[c] = a[c]
                          }, PAGE.filterContinue
        );
        2 !== a.routine && OBJ.iterate(AGO.Item.Resource, function (a) {
                                           delete b[a]
                                       }
        );
        1 !== a.mission && delete b.retreatAfterDefenderRetreat;
        5 !== a.mission && delete b.holdingtime;
        15 !== a.mission && delete b.expeditiontime;
        AGO.Fleet.Set("Current", {Task2: JSON.stringify(b)});
        a = b = null
    },
    updateTask: function (a, b) {
        var c;
        (c = document.getElementById("inhalt")
        ) && a && (a.holdingtime = DOM.getValue("#holdtimeline select", c, 2) || -1, a.expeditiontime = DOM.getValue("#expeditiontimeline select", c, 2), a.retreatAfterDefenderRetreat = DOM.getProperty("#fightAfterRetreat input", c, "checked") ? 1 : 0, a.mission = DOM.getValue('input[name="mission"]', c, 2), 1 <= b && (a.metal = DOM.getValue("#metal", c, 2), a.crystal = DOM.getValue("#crystal", c, 2), a.deuterium = DOM.getValue("#deuterium", c, 2)
        )
        )
    },
    onKeydown: function (a) {
        if (document.activeElement.classList.contains('chat_box_textarea')) return;
        if (13 === a.keyCode) {
            if (document.activeElement && "A" !== document.activeElement.nodeName && "INPUT" !== document.activeElement.nodeName) {
                return DOM.hasClass("start",
                                    "id", "on"
                ) && DOM.click("#start.on"), !1
            }
        } else {
            if (65 === a.keyCode) {
                return DOM.click("#allresources"), !1;
            }
            if (77 === a.keyCode) {
                return DOM.click("#mostresources"), !1;
            }
            if (81 === a.keyCode) {
                return DOM.click("#noneresources"), !1
            }
        }
        return !0
    },
    onSwipe: function (a) {
        "diagUp" === a && DOM.click("#noneresources");
        "diagDown" === a && DOM.click("#mostresources");
        "left" === a && DOM.click("#back")
    },
    onSummary: function (a) {
        a && a.target && "click" === a.type && a.currentTarget && "H2" === a.target.nodeName && DOM.click("#planet .toggleHeader")
    },
    onMission: function (a) {
        "dblclick" ===
        a.type && AGO.Option.is("U34") && (DOM.setClassGroup(this, null, "ago_selected", AGO.Token.getClassSelected("S5")), DOM.click("#start.on")
        )
    },
    onMarked: function () {
        PAGE.Action({arrival: -1})
    },
    onBriefing: function (a) {
        a && a.target && "click" === a.type && (a = DOM.getData(a.target, null, 2), a.action && PAGE.Action(a)
        )
    }
};