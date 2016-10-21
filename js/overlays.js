if (!AGO) {
    var AGO = {};
}
AGO.Jumpgate = {
    updateCooldownStatus: 0, Messages: function (a, b) {
        "Continue" === a && AGO.Jumpgate.Continue(b)
    }, Unload: function (a) {
        a && a.target && "DIV" === a.target.nodeName && -1 < (a.target.className || ""
        ).indexOf("ui-dialog") && (AGO.Jumpgate.Timer = null, AGO.Init.Messages("Planets", "Action", {mode: "select"})
        )
    }, onKeydown: function (a, b) {
        if (13 === a.keyCode) {
            return document.activeElement.blur(), DOM.click(".secondcol input.btn_blue", b), !1;
        }
        if (65 === a.keyCode) {
            return DOM.click(".secondcol #sendall", b), !1;
        }
        if (77 === a.keyCode) {
            return DOM.click(".secondcol #sendmost",
                             b
            ), !1;
        }
        if (81 === a.keyCode) {
            return DOM.click(".secondcol .send_none a", b), !1;
        }
        if (38 === a.keyCode || 40 === a.keyCode) {
            if (11 === a.inputType && a.target.id && AGO.Item.Ship[STR.check(NMR.parseIntAbs(a.target.id))]) {
                return DOM.changeInput(a, a.target)
            }
        } else if (112 <= a.keyCode && 123 >= a.keyCode && AGO.Option.is("U32") && !a.cached) {
            return AGO.Jumpgate.Action(AGO.Planets.GetByIndex(a.keyCode - 111, "moon", 6)), !1;
        }
        return !0
    }, Content: function (a) {
        function b(a, b) {
            var c, g;
            c = DOM.appendTR(a, "tooltip");
            c.addEventListener("click", d, !1);
            g = DOM.appendTD(c,
                             "ago_jumpgate_settings_name tooltip", b, 10
            );
            g.title = g.textContent;
            g = DOM.appendTD(c, "ago_jumpgate_settings_status");
            DOM.append(g, "input", {id: "ago_jumpgate_settings_status_" + b, type: "checkbox", rel: b})
        }

        function d(a) {
            var b, c;
            a && a.currentTarget && (b = a.currentTarget.querySelector("input"), c = DOM.getAttribute(b, null, "rel"), b && c && ("INPUT" !== a.target.nodeName && (b.checked = !b.checked
            ), AGO.Option.set(c, b.checked ? 1 : 0, 1), AGO.Global.message({
                                                                               role: "Data",
                                                                               data: {
                                                                                   G33: AGO.Option.is("G33"),
                                                                                   G34: AGO.Option.is("G34")
                                                                               }
                                                                           }
            )
            )
            )
        }

        function c(a) {
            a &&
            AGO.Init.Messages("Panel", "hover", "mouseover" === a.type)
        }

        function f() {
            AGB.message("Units", "List", {action: "summarized"}, function (a) {
                            var b, c;
                            b = document.querySelectorAll("#ago_jumpgate_target > tr");
                            for (k = 0; k < b.length; k++) {
                                c = DOM.getAttribute(b[k], null, "ago-data", -2).data, OBJ.get(a[c], "timeShip") && DOM.updateText("td.ago_jumpgate_target_ships", b[k], OBJ.get(a[c], "ships"), 2)
                            }
                        }
            )
        }

        var e, g, h, k;
        a = a ? a.querySelector("#jumpgate") : null;
        if (AGO.Option.is("G30") && !AGO.App.OgameMobile && DOM.updateAttribute(a, null, "ago-status",
                                                                                1, 8
            )) {
            AGO.Option.is("G31") && DOM.addClass(a, null, "ago_jumpgate_improve");
            AGO.Jumpgate.Mini = AGO.Task.splitActive(AGO.Option.get("G38", -1), 2, -1);
            AGO.Jumpgate.Maxi = {};
            e = a.querySelectorAll(".ship_selection_table .ship_txt_row > a");
            for (k = 0; k < e.length; k++) {
                (h = STR.check(DOM.getAttribute("img", e[k], "class", 3))
                ) && (AGO.Jumpgate.Maxi[h] = DOM.getText(".quantity", e[k].parentNode, 3)
                ), DOM.appendChild(e[k], e[k].parentNode.children[1]);
            }
            e = {planet: AGO.Acc.planetId, tabs: ["Ship"], data: OBJ.create(AGO.Jumpgate.Maxi)};
            AGB.message("Units",
                        "Action", {list: [e]}
            );
            h = DOM.appendSPAN(null, "float_left send_most");
            DOM.appendA(h, {
                            id: "sendmost",
                            "class": "tooltip",
                            title: AGO.Label.get("F37")
                        }, {click: AGO.Jumpgate.setMostShips}
            );
            DOM.after(a.querySelector(".secondcol .send_all"), h);
            AGO.Jumpgate.Target = [];
            if ((e = a.querySelector('#jumpgateForm select[name="zm"]')
                ) && e.options) {
                for (k = 0; k < e.options.length; k++) {
                    h = AGO.Task.trimCoords(e.options[k].textContent), h = AGO.Planets.GetByCoords(h, "index") || 80 + AGO.Jumpgate.Target.length, AGO.Jumpgate.Target[h] = {
                        value: e.options[k].value,
                        text: e.options[k].textContent
                    };
                }
                AGO.Option.is("G32") && (h = document.createElement("option"), h.value = "none", h.textContent = " - ", DOM.prependChild(e, h), a.querySelector("#jumpgateDefaultTargetSelectionForm option[selected]") || (e.selectedIndex = 0
                )
                );
                e.onchange = AGO.Jumpgate.Display
            }
            AGO.Jumpgate.Target.length ? (AGO.Option.is("G31") && (DOM.setStyleDisplay("#jumpgate h4", a), DOM.setStyleDisplay("#selecttarget > .fright", a), g = DOM.appendTABLE(null, {id: "ago_jumpgate_target"}, {width: "378px"}, [
                                                                                                                                                                                      20,
                                                                                                                                                                                      60,
                                                                                                                                                                                      90,
                                                                                                                                                                                      26,
                                                                                                                                                                                      24,
                                                                                                                                                                                      90,
                                                                                                                                                                                      65
                                                                                                                                                                                  ]
            ), g.addEventListener("click",
                                  AGO.Jumpgate.clickTarget, !1
            ), g.addEventListener("dblclick", AGO.Jumpgate.clickTarget, !1), AGO.Planets.iterate(3, function (a, b) {
                                                                                                     if (b && (AGO.Jumpgate.Target[a.index] || b === AGO.Acc.planetId || 1E3 < AGO.Fleet.Get("Cooldown", b, 2)
                                                                                                         )) {
                                                                                                         var d = g, e = a.index, f;
                                                                                                         f = AGO.Jumpgate.Target[e] ? AGO.Token.getClassHover(3, "own") : AGO.Planets.Get("active", "index") === e ? AGO.Token.getClassHighlight(3) + " ago_color_palered" : "ago_color_palered";
                                                                                                         d = DOM.appendTR(d, f, {
                                                                                                                              role: "Task",
                                                                                                                              data: b
                                                                                                                          }
                                                                                                         );
                                                                                                         e = AGO.Option.isAnd("U31", "U32") ? e : "";
                                                                                                         DOM.appendTD(d, "ago_jumpgate_target_shortkey",
                                                                                                                      e
                                                                                                         );
                                                                                                         DOM.appendTD(d, "", AGO.Planets.Data[b].coords);
                                                                                                         DOM.appendTD(d, "ago_jumpgate_target_name", AGO.Planets.Data[AGO.Planets.Data[b].planet].name);
                                                                                                         e = DOM.appendTD(d);
                                                                                                         DOM.appendSPAN(e, "ago_jumpgate_cooldown");
                                                                                                         e = DOM.appendTD(d);
                                                                                                         DOM.appendIMG(e, AGO.Planets.Data[b].img, "16px");
                                                                                                         DOM.appendTD(d, "ago_jumpgate_target_name", AGO.Planets.Data[b].name);
                                                                                                         e = DOM.appendTD(d, {
                                                                                                                              "class": "ago_jumpgate_target_ships ago_color_normal",
                                                                                                                              "ago-data-change": JSON.stringify({
                                                                                                                                                                    page: "Panel",
                                                                                                                                                                    role: "hover"
                                                                                                                                                                }
                                                                                                                              )
                                                                                                                          }, "-"
                                                                                                         );
                                                                                                         e.addEventListener("mouseover",
                                                                                                                            c, !1
                                                                                                         );
                                                                                                         e.addEventListener("mouseout", c, !1)
                                                                                                     }
                                                                                                 }
            ), DOM.prependChild(a.querySelector("#selecttarget"), g), g = DOM.appendTABLE(null, "ago_jumpgate_settings ago_color_normal", {width: "215px"}, [
                                                                                              175,
                                                                                              25
                                                                                          ]
            ), b(g, "G34"), b(g, "G35"), DOM.after(a.querySelector("#selecttarget > .fright"), g), f(), AGO.Jumpgate.updateCooldown(!0), AGO.Jumpgate.Timer = AGO.Jumpgate.updateCooldown
            ), AGO.Global.message({role: "Jumpgate"}), a.parentNode.parentNode.addEventListener("DOMNodeRemoved", AGO.Jumpgate.Unload, !1), AGO.Jumpgate.Display(), AGO.Global.message({
                                                                                                                                                                                           role: "Data",
                                                                                                                                                                                           data: {
                                                                                                                                                                                               G33: AGO.Option.is("G33"),
                                                                                                                                                                                               G34: AGO.Option.is("G34")
                                                                                                                                                                                           }
                                                                                                                                                                                       }
            ), DOM.addEventsAll("#jumpgate .send_none a", null, {click: AGO.Jumpgate.Display}), DOM.disableActiveElement(), DOM.disableAutocomplete()
            ) : (g = document.querySelector("#jumpgateNotReady #cooldown")
                ) && (a = AGO.Time.parseFormatedTime(g.textContent)
                ) && AGO.Fleet.Set("Cooldown", AGO.Planets.GetId("active"), AGO.Time.timestamp() - Math.ceil(3600 / AGO.Uni.speedFleet) + a)
        }
        a = e = g = e = h = null
    }, updateCooldown: function (a) {
        var b, d, c, f = 0;
        if (a || -4 < AGO.Jumpgate.updateCooldownStatus) {
            a =
            document.querySelectorAll("#ago_jumpgate_target > tr");
            for (d = 0; d < a.length; d++) {
                b = DOM.getAttribute(a[d], null, "ago-data", -2).data, c = AGO.Fleet.Get("Cooldown", AGO.Planets.GetId(b), 2), 1E5 < c && (c = 3600 / AGO.Uni.speedFleet - (AGO.Time.timestamp() - c
                ), 0 <= c && (f++, b = a[d].getElementsByClassName("ago_jumpgate_cooldown")[0], 60 >= c && DOM.updateClass(b, null, "ago_jumpgate_cooldown ago_jumpgate_cooldown_seconds"), c = 60 < c ? Math.ceil(c / 60) : Math.floor(c), DOM.updateText(b, null, Math.floor(c))
                )
                );
            }
            AGO.Jumpgate.updateCooldownStatus =
            f || AGO.Jumpgate.updateCooldownStatus - 1
        }
    }, Continue: function (a) {
        var b, d, c, f;
        if ((b = document.getElementById("jumpgate")
            ) && a) {
            d = {};
            d[AGO.Planets.GetId(a)] = AGO.Time.timestamp();
            d[AGO.Planets.GetId("active")] = AGO.Time.timestamp();
            AGO.Fleet.Set("Cooldown", d);
            d = {};
            b = b.querySelectorAll(".ship_selection_table td.ship_input_row > input");
            for (c = 0; c < b.length; c++) {
                (f = NMR.parseIntAbs(b[c].id)
                ) && (d[f] = NMR.parseIntAbs(b[c].value)
                );
            }
            a = [
                {planet: AGO.Acc.planetId, tabs: ["Ship"], action: "remove", data: d}, {
                    planet: a, tabs: ["Ship"],
                    action: "add", data: d
                }
            ];
            AGB.message("Units", "Action", {list: a})
        }
    }, setMostShips: function () {
        var a, b, d = {};
        AGO.Units.activeResources(AGO.Jumpgate.Maxi);
        OBJ.iterate(AGO.Jumpgate.Maxi, function (a) {
                        d[a] = Math.max(AGO.Jumpgate.Maxi[a] - (+AGO.Jumpgate.Mini[a] || 0
                                        ), 0
                        )
                    }
        );
        AGO.Option.is("G35") && (a = Math.ceil(AGO.Jumpgate.Maxi.resources / 25E3), b = Math.max(a - (+AGO.Jumpgate.Maxi["203"] || 0
                                                                                                 ), 0
        ), b = 0 < b ? 5 * b : 0, a > (AGO.Jumpgate.Mini["203"] || 0
        ) && (d["203"] = Math.max(AGO.Jumpgate.Maxi["203"] - a, 0)
                                  ), b > (AGO.Jumpgate.Mini["202"] || 0
        ) && (d["202"] =
              Math.max(AGO.Jumpgate.Maxi["202"] - b, 0)
                                     )
        );
        AGO.Global.message({role: "setMostShips", data: d})
    }, clickTarget: function (a) {
        var b;
        if (a && a.target) {
            if (b = DOM.getAttributeParent(a.target, null, "ago-data", -2, 2), OBJ.copy(DOM.getAttributeParent(a.target, null, "ago-data-change", -2, 1), b), "dblclick" === a.type) {
                AGO.Option.is("U34") && DOM.click("#jumpgate .secondcol input.btn_blue");
            } else if ("Panel" === b.page) {
                if (a = AGO.Planets.Get(b.data, "coordstype", 6)) {
                    AGO.Init.Messages("Panel", "Display", {
                                          tab: "Account",
                                          data: a
                                      }
                    ), AGO.Init.Messages("Panel",
                                         "hover", !0
                    )
                }
            } else {
                "Task" === b.role && AGO.Jumpgate.Action(b.data)
            }
        }
    }, Action: function (a) {
        var b;
        (b = document.getElementById("jumpgate")
        ) && a && (a = b.querySelector('select[name="zm"] option[value="' + a + '"]')
        ) && DOM.setValue(a.parentNode, null, a.value, 0, "change")
    }, Display: function () {
        var a, b, d, c;
        if (a = document.getElementById("jumpgate")) {
            if (b = DOM.getSelectedNode(a.querySelector('select[name="zm"]'))) {
                if ((c = AGO.Planets.Get(+b.value, "coords", 6)
                    ) || "none" === b.value) {
                    d = a.querySelector("#selecttarget .dropdown > a"), DOM.updateAttribute(d,
                                                                                            null, "data-value", b.value
                    ), DOM.updateText(d, null, b.textContent), AGO.Init.Messages("Planets", "Action", {
                                                                                     mode: "select",
                                                                                     coords: c,
                                                                                     type: 3
                                                                                 }
                    );
                }
                AGO.Option.is("G31") && (DOM.iterate(a.querySelectorAll("#ago_jumpgate_target tr"), function (a) {
                                                         DOM.removeClassGroup(a, null, "ago_selected")
                                                     }
                ), +b.value && DOM.setClassGroup('#ago_jumpgate_target tr[ago-data*="' + b.value + '"]', a, "ago_selected", AGO.Token.getClassSelected(3, !0))
                )
            }
            DOM.setProperty("#ago_jumpgate_settings_status_G34", a, "checked", AGO.Option.is("G34"));
            DOM.setProperty("#ago_jumpgate_settings_status_G35",
                            a, "checked", AGO.Option.is("G35")
            )
        }
        a = d = b = null
    }
};
AGO.Phalanx = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Overlay: function (a) {
        var b;
        a && (b = a.parentNode.querySelector(".ui-dialog-title")
        ) && (AGO.Phalanx.coords = AGO.Task.trimCoords(b.textContent), AGO.Option.is("E21") && !AGO.App.OgameMobile && (b.style.paddingRight = "46px", b = DOM.appendSPAN(b.parentNode, "ago_display_arrow"), b.addEventListener("click", AGO.Phalanx.toggleDisplay, !1), a.parentNode.setAttribute("ago_display_status", AGO.Option.get("E23", 2))
        )
        )
    }, Content: function (a) {
        var b, d, c, f, e, g;
        AGO.Phalanx.Data = {};
        a =
        a ? a.querySelector("#phalanxWrap") : null;
        if (AGO.Option.is("E20") && a && !a.getAttribute("ago-status") && !AGO.App.OgameMobile) {
            a.setAttribute("ago-status", 1);
            b = a.querySelectorAll("div.eventFleet > ul, div.partnerInfo > ul");
            AGO.Option.is("E21") && DOM.addClass(a, null, "ago_phalanx_improve");
            for (g = 0; g < b.length; g++) {
                f = c = 0, e = STR.check(NMR.parseIntAbs(b[g].parentNode.id)), d = NMR.parseIntAbs(b[g].parentNode.getAttribute("data-mission-type")), 2 === d && (f = 1, HTML.hasClass(b[g].parentNode.className, "partnerInfo") && (c = STR.check(NMR.parseIntAbs(b[g].parentNode.className)),
                    f = c === e ? 2 : 3, e = "F" + e
                )
                ), AGO.Phalanx.Data[e] = {
                    arrival: NMR.parseIntAbs(b[g].parentNode.getAttribute("data-arrival-time")),
                    mission: d,
                    union:     c || "",
                    unionType: f || 0,
                    reverse:   "true" === b[g].parentNode.getAttribute("data-return-flight")
                }, AGO.Phalanx.parseRow(b[g], AGO.Phalanx.Data[e]), 1 !== AGO.Phalanx.Data[e].unionType && AGO.Phalanx.createDetails(b[g], AGO.Phalanx.Data[e]), b[g].addEventListener("click", AGO.Phalanx.click, !1);
            }
            for (e in AGO.Phalanx.Data) {
                1 === AGO.Phalanx.Data[e].unionType && AGO.Phalanx.createDetails(a.querySelector("div#eventRow-" +
                                                                                                 e + " > ul"
                                                                                 ), AGO.Phalanx.Data[e]
                )
            }
        }
    }, parseRow: function (a, b) {
        var d, c, f;
        for (f = 0; f < a.children.length; f++) {
            if (d = a.children[f], c = a.children[f].className, HTML.hasClass(c, "countDown")) {
                if (c = d.querySelector("span")) {
                    DOM.addClass(c, null, HTML.classMission(b.mission)), DOM.addClass(c, null, "ago_panel_add"), b.fleetType = HTML.hasClass(c.className, "neutral") ? 2 : HTML.hasClass(c.className, "hostile") ? 1 : b.reverse ? 4 : 3, 2 === b.unionType && (c.textContent = AGO.Label.get("E28")
                    )
                }
            } else if (HTML.hasClass(c, "arrivalTime")) {
                c = (d.textContent ||
                     ""
                ).split(" ")[0], d.textContent = AGO.Time.convertLocal(c, "[H]:[i]:[s]");
            } else if (HTML.hasClass(c, "descFleet")) {
                b.descFleet = (d.textContent || ""
                ).trim(), 2 <= b.unionType && (d.textContent = ""
                );
            } else if (HTML.hasClass(c, "missionFleet")) {
                b.missionName = DOM.getText("span", d);
            } else if (HTML.hasClass(c, "originFleet")) {
                if (1 === b.unionType) {
                    d.textContent = b.descFleet;
                } else {
                    if (c = d.querySelector("figure")) {
                        b.typeOrigin = HTML.hasClass(c.className, "moon") ? 3 : HTML.hasClass(c.className, "tf") ? 2 : 1
                    }
                }
            } else if (HTML.hasClass(c, "coordsOrigin")) {
                if (c =
                    d.querySelector("a")) {
                    b.coordsOrigin = AGO.Task.trimCoords(c.textContent), b.owncoordsOrigin = AGO.Planets.owncoords(b.coordsOrigin, b.typeOrigin), b.owncoordsOrigin ? (DOM.addClass(c, null, AGO.Token.getClassSelection(b.typeOrigin)), 3 <= b.owncoordsOrigin && DOM.extendClass(d, null, AGO.Token.getClassHighlight(b.typeOrigin))
                    ) : b.coordsOrigin === AGO.Phalanx.coords && DOM.addClass(c, null, "ago_color_blue")
                }
            } else if (HTML.hasClass(c, "detailsFleet")) {
                if ((c = d.querySelector("span")
                    ) && 1 !== b.unionType) {
                    d = b;
                    c = c.title;
                    var e = void 0,
                        g = void 0, h = g = void 0;
                    if (c) {
                        e = c.split("<td>");
                        for (h = 1; h < e.length; h++) {
                            if (g = (e[h].split("</td>", 1)[0] || ""
                                ).replace(/\:/g, "").trim(), g = AGO.Item.getByName(g)) {
                                d[g] = NMR.parseIntAbs(e[h].split(">", 3)[2]), d[g] && 2 <= d.unionType && AGO.Phalanx.Data[d.union] && (AGO.Phalanx.Data[d.union][g] = (AGO.Phalanx.Data[d.union][g] || 0
                                                                                                                                                                        ) + d[g]
                                );
                            }
                        }
                        "metal"in d ? AGO.Task.updateResources(d) : d.resources = -1;
                        AGO.Task.updateShips(d)
                    }
                }
            } else if (HTML.hasClass(c, "destFleet")) {
                if (c = d.querySelector("figure")) {
                    b.type = HTML.hasClass(c.className, "moon") ?
                             3 : HTML.hasClass(c.className, "tf") ? 2 : 1
                }
            } else {
                HTML.hasClass(c, "destCoords") && (c = d.querySelector("a")
                ) && (b.coords = AGO.Task.trimCoords(c.textContent), b.owncoords = AGO.Planets.owncoords(b.coords, b.type), b.owncoords ? (DOM.addClass(c, null, AGO.Token.getClassSelection(b.type)), 3 <= b.owncoords && DOM.extendClass(d, null, AGO.Token.getClassHighlight(b.type))
                ) : b.coords === AGO.Phalanx.coords && DOM.addClass(c, null, "ago_color_blue")
                )
            }
        }
    }, createDetails: function (a, b) {
        function d(a, b) {
            function c(a, b, d, e) {
                a = DOM.appendTD(a);
                b && d &&
                (DOM.appendSPAN(a, "ago_phalanx_label", b, e), 0 > d ? DOM.appendTEXT(a, "-----") : DOM.appendTEXT(a, d, 2)
                )
            }

            var d, f, n, l, m;
            n = AGO.Option.is("E22") ? 12 : 11;
            l = {ShipCivil: [], ShipCombat: [], Resource: []};
            d = a.appendChild(document.createElement("table"));
            f = DOM.appendTR(d);
            c(f, "I28", b.shipsCivil || "0", 10);
            c(f, "I29", b.shipsCombat || "0", 10);
            c(f, "I27", b.resources || "0", 10);
            OBJ.iterate(l, function (a) {
                            OBJ.iterate(AGO.Item[a], function (c) {
                                            0 < b[c] && l[a].push(c)
                                        }
                            )
                        }
            );
            for (m = 0; 9 > m; m++) {
                if (l.ShipCivil[m] || l.ShipCombat[m] || l.Resource[m]) {
                    f = DOM.appendTR(d),
                        c(f, l.ShipCivil[m], b[l.ShipCivil[m]], n), c(f, l.ShipCombat[m], b[l.ShipCombat[m]], n), c(f, l.Resource[m], b[l.Resource[m]], n);
                } else {
                    break;
                }
            }
            d = f = null
        }

        var c, f;
        AGO.Option.is("E21") && a && (c = document.createElement("li"), c.className = "ago_phalanx_activity", 1 === b.fleetType ? DOM.appendIMG(c, "/cdn/img/galaxy/activity15.gif") : 2 === b.fleetType && (b.owncoords ? DOM.appendIMG(c, "/cdn/img/galaxy/activity.gif") : b.owncoordsOrigin || 1 === b.unionType || (c.textContent = b.descFleet[0], c.title = b.descFleet, c.className += " tooltip"
        )
        ), DOM.prependChild(a,
                            c
        ), c = document.createDocumentFragment(), f = DOM.appendDIV(c, "ago_phalanx_left"), 2 > b.unionType && DOM.appendSPAN(f, HTML.classMission(b.mission), b.missionName), f = DOM.appendDIV(c, "ago_phalanx_fleet"), d(f, b), f = DOM.appendDIV(c, "ago_phalanx_right"), a.parentNode.appendChild(c), c = c = f = null
        )
    }, toggleDisplay: function (a) {
        var b;
        a.target && (a = document.getElementById("phalanxWrap")
        ) && (b = "1" === a.parentNode.parentNode.parentNode.getAttribute("ago_display_status") ? 2 : 1, a.parentNode.parentNode.parentNode.setAttribute("ago_display_status", b), AGO.Option.set("E23",
                                                                                                                                                                            b, 2
        )
        )
    }, click: function (a) {
        var b;
        a && a.target && (HTML.hasClass(a.target.parentNode.className, "countDown") || HTML.hasClass(a.target.className, "countDown")
        ) && (a = NMR.parseIntAbs(a.target.id), a = AGO.Phalanx.Data[a]
        ) && (b = {
            action: "set",
            tab: "Target",
            marked: 2,
            token: 81,
            time: a.arrival
        }, b.coords = a.reverse ? a.coordsOrigin + ":" + a.typeOrigin : a.coords + ":" + a.type, AGO.Init.Messages("Token", "Action", b)
        )
    }
};
AGO.Techtree = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Content: function (a) {
        (a = a ? a.querySelector("div.techtree") : null
        ) && !a.hasAttribute("ago-status") && a.setAttribute("ago-status", 1)
    }
};
AGO.Buddies = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Content: function (a) {
        var b, d;
        if ((a = a ? a.querySelector("#buddylist") : null
            ) && DOM.updateAttribute(a, null, "ago-status", 1, 8) && AGO.Option.is("D20")) {
            for (a = a.querySelectorAll("tr"), d = 0; d < a.length; d++) {
                if (b = NMR.parseIntAbs(STR.getParameter("to", DOM.getAttribute('a[href*="page=writemessage"]', a[d], "href")))) {
                    b = {
                        page: "Panel", role: "Action", data: {
                            mode: "set",
                            tab: "Player",
                            token: 81,
                            id: b,
                            coords: AGO.Task.trimCoords(DOM.getText("td:nth-child(6) a", a[d])),
                            name: AGO.Task.valid(DOM.getText("td:nth-child(2) span",
                                                             a[d]
                                                 )
                            )
                        }
                    }, DOM.set(a[d], null, null, null, {click: AGO.Buddies.click}), DOM.addClass("td:nth-child(2)", a[d], "ago_action"), DOM.setData("td:nth-child(2)", a[d], b)
                }
            }
        }
    }, click: function (a) {
        a && a.target && a.currentTarget && (a = DOM.getData(a.target, null, 2), AGO.Init.Messages(a.page, a.role, a.data)
        )
    }
};
AGO.Notices = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Content: function (a) {
        (a = a ? a.querySelector("#notizen") : null
        ) && !a.hasAttribute("ago-status") && a.setAttribute("ago-status", 1)
    }
};
AGO.Search = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Content: function (a, b, d, c, f) {
        b = +STR.getParameter("method", f) || 0;
        if ((a = a ? a.querySelector(".searchresults") : null
            ) && DOM.updateAttribute(a, null, "ago-status", 1, 8) && (2 === b || 3 === b
            ) && AGO.Option.is("D20")) {
            for (a = a.querySelectorAll("tr"), c = 0; c < a.length; c++) {
                if (f = NMR.parseIntAbs(STR.getParameter("to", DOM.getAttribute(".action a", a[c], "href")))) {
                    b = AGO.Task.valid(DOM.getText("td.userName", a[c])), d = AGO.Task.trimCoords(DOM.getText("td.position a", a[c])), DOM.set(a[c],
                                                                                                                                               null, null, null, {click: AGO.Search.click}
                    ), f = {
                        message: {
                            page: "Token",
                            role: "Action",
                            data: {action: "set", tab: "Player", token: 81, id: f, name: b, coords: d}
                        }
                    }, DOM.addClass("td.userName", a[c], "ago_action"), DOM.setData("td.userName", a[c], f), f = {
                        message: {
                            page: "Token",
                            role: "Action",
                            data: {action: "set", tab: "Target", token: 81, name: b, coords: d}
                        }
                    }, DOM.setData("td.position", a[c], f)
                }
            }
        }
    }, click: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), a.message && AGO.Init.Messages(a.message.page, a.message.role, a.message.data)
        )
    }
};