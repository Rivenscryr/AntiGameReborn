AGO.Overview = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }, Run: function () {
        AGO.Option.is("B01") && (AGO.Overview.enabled = !0, AGO.Overview.improve = 1 === AGO.Acc.type
        );
        AGO.Overview.Show();
        AGO.Building.showConstructions()
    }, Interactive: function () {
        AGO.Units.activeProduction();
        AGO.Overview.Timer();
        AGO.Building.displayConstructions()
    }, Complete: function () {
        window.setTimeout(function () {
                              var a = document.getElementById("Rentabilite_mines");
                              a && DOM.updateAttribute(a.parentNode, null, "ago-status", 1, 8) && DOM.set(a.parentNode, null,
                                                                                                          null, null, {
                                      click: function () {
                                          DOM.addEvents("ordre_table", "id", {click: AGO.Overview.infocompte})
                                      }
                                  }
                              )
                          }, 500
        )
    }, infocompte: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), OBJ.is(a) && (a.level = 0, a.type = 1, a.coords = AGO.Task.trimCoords(a.coords), AGO.Task.updateCoords(a, 2, AGO.Task.splitCoords(a.coords)), AGO.Init.Messages("Panel", "Action", {
                                                                                                                                                                                                                                  action: "set",
                                                                                                                                                                                                                                  tab: "Construction",
                                                                                                                                                                                                                                  value: a
                                                                                                                                                                                                                              }
        )
        )
        )
    }, onKeydown: function (a) {
        if (!a.inputType && !a.cached) {
            if (13 === a.keyCode) {
                return document.location.href = AGO.Uni.path + "overview",
                    !1;
            }
            if (32 === a.keyCode) {
                return DOM.click("#planet #moon a, #planet #planet_as_moon a"), a.preventDefault(), !1
            }
        }
        return !0
    }, Show: function () {
        var a, b, c, d;
        AGO.Option.is("B02") && DOM.extendClass("inhalt", "id", "ago_mode_construction");
        if (a = document.getElementById("detailWrapper")) {
            AGO.Overview.enabled && (a = a.querySelector("#planetDetails table tbody")
            ) && 1 === AGO.Acc.type && (b = document.createDocumentFragment(), OBJ.iterate(AGO.Item.Resource, function (a) {
                                                                                               c = DOM.appendTR(b);
                                                                                               d = DOM.appendTD(c, "desc", a, 11);
                                                                                               d = DOM.appendTD(c,
                                                                                                                "data"
                                                                                               );
                                                                                               DOM.appendSPAN(d, {id: "ago_overview_production_" + a});
                                                                                               c = DOM.appendTR(b);
                                                                                               d = DOM.appendTD(c, "desc");
                                                                                               d = DOM.appendTD(c, "data");
                                                                                               DOM.appendSPAN(d, {
                                                                                                                  "class": "ago_overview_storagetime",
                                                                                                                  id: "ago_overview_storagetime_" + a
                                                                                                              }, "\u2009"
                                                                                               )
                                                                                           }
            ), DOM.prependChild(a, b)
            ), (b = document.getElementById("moveCountdown")
               ) && AGO.Option.is("B02") && (c = "moveProgress" === b.parentNode.id ? b.parentNode.parentNode : b.parentNode, DOM.appendSPAN(c, {id: "ago_construction_move"})
               );
        }
        a = a = c = d = null
    }, Timer: function () {
        AGO.Overview.enabled && 1 === AGO.Acc.type &&
        (OBJ.iterate(AGO.Item.Resource, function (a) {
                         var b, c, d, e, g;
                         c = AGO.Units.get(a);
                         g = AGO.Units.get(a + "Storage");
                         e = AGO.Units.get(a + "Production");
                         d = AGO.Units.get(a + "Start");
                         if (b = document.getElementById("ago_overview_production_" + a)) {
                             b.className = c >= g ? "overmark" : c >= .9 * g ? "middlemark" : "", b.innerHTML = (0 < e && c < g ? '<span class="undermark">(+' + STR.formatNumber(Math.floor(3600 * e)) + ") </span>" : '<span class="overmark">(0) </span>'
                                                                                                                ) + STR.formatNumber(c) + " / " + STR.formatNumber(g);
                         }
                         (b = document.getElementById("ago_overview_storagetime_" +
                                                      a
                         )
                         ) && !AGO.Overview.storage && (a = 0 < e && c < g ? Math.floor((g - d
                                                                                        ) / e
                         ) : 0, b.innerHTML = a ? AGO.Time.format(AGO.Time.getFinishTime(a)) : "\u2009"
                         )
                     }
        ), AGO.Overview.storage = !0
        )
    }
};
AGO.Building = {
    Data: {}, Messages: function (a, b) {
        "Display" === a ? AGO.Building.Display() : "Action" === a && AGO.Building.Action(b)
    }, Read: function () {
        var a, b, c, d;
        a = document.querySelectorAll("#inhalt #buttonz li");
        for (d = 0; d < a.length; d++) {
            b = a[d].querySelector('.buildingimg a[id^="details"]'), (c = AGO.Item.valid(DOM.getAttribute(b, null, "ref", 7))
                                                                     ) && AGO.Units.set(c, DOM.getTextChild(".ecke .level", b, 3));
        }
        OBJ.set(AGO.Units.Data, "page", AGO.App.page);
        "research" === AGO.App.page && AGO.Notify.set("Problem", -12)
    }, Run: function () {
        AGO.Option.is("B00") &&
        (AGO.Building.enabled = !0
        );
        AGO.Building.Show();
        AGO.Building.showConstructions()
    }, Interactive: function () {
        AGO.Building.displayConstructions()
    }, onKeydown: function (a) {
        if (12 !== a.inputType) {
            if (65 === a.keyCode || 77 === a.keyCode) {
                return DOM.click("#detail .ago_items_shortcut #ago_items_number[ago-data]"), !1;
            }
            if (81 === a.keyCode) {
                return DOM.setValue("#detail #number", null, "", 0, "click"), !1
            }
        }
        return 11 !== a.inputType || 38 !== a.keyCode && 40 !== a.keyCode || "number" !== a.target.id ? !0 : DOM.changeInput(a, a.target)
    }, Show: function () {
        var a,
            b, c, d, e, g, h, f, k;
        c = VAL.check(AGO.Option.get("B21", 2), 1, 3);
        d = VAL.check(AGO.Option.get("B21", 2), 2, 3);
        if (a = document.getElementById("inhalt")) {
            for (b = (c ? " ago_mode_name" : ""
                     ) + (AGO.Option.is("B02") ? " ago_mode_construction" : ""
                     ), DOM.extendClass(a, null, b), a = a.querySelectorAll("#buttonz li"), k = 0; k < a.length; k++) {
                if (b = a[k].querySelector('.buildingimg a[id^="details"]'), f = AGO.Item.valid(DOM.getAttribute(b, null, "ref", 7))) {
                    g = DOM.getTextChild(".eckeoben span", b, 3), AGO.Building.enabled && (0 < g && g < AGO.Units.get(f) && 200 > +f &&
                                                                                           (DOM.updateClass(".eckeoben span", b, "overmark"), DOM.addClass(".timeLink span", b.parentNode, "overmark")
                                                                                           ), c && (e = DOM.getText("span.textlabel", b, 7) || AGO.Label.get(f, 11), DOM.appendSPAN(b, "ago_items_textName ago_items_text ago_text_background", e)
                    ), !(d && DOM.hasClass(a[k], null, "on") && AGO.Option.is("commander")
                    ) || g && c || !VAL.check(AGO.App.page, "shipyard", "defense") && "212" !== f || (e = AGO.Units.get("metal") / (AGO.Item[f].metal || 1
                    ), g = AGO.Units.get("crystal") / (AGO.Item[f].crystal || 1
                    ), h = AGO.Units.get("deuterium") / (AGO.Item[f].deuterium ||
                                                         1
                    ), (e = STR.formatNumber(Math.floor(Math.min(Math.min(e, g), h)))
                       ) && VAL.check(f, "407", "408") && (e = 1
                       ), DOM.appendSPAN(b, "ago_items_textCount ago_items_text ago_text_background", e)
                       ), AGO.Option.is("B04") && "research" === AGO.App.page && (Math.abs(AGO.Item.Research[f]) > AGO.Units.get(f) ? DOM.addClass(".level", b, "ago_color_palered") : 0 > AGO.Item.Research[f] && DOM.addClass(".level", b, "ago_color_lightgreen")
                    )
                    )
                }
            }
        }
    }, Content: function (a, b, c) {
        function d(a, b, c, d) {
            b && (a = DOM.appendLI(a, d, b), c = DOM.appendSPAN(a, {"class": "time", id: c}),
                DOM.appendSPAN(c)
            )
        }

        var e, g, h, f, k;
        c = document.getElementById("description");
        a = DOM.updateAttribute("content", "id", "ago-status", 1, 8);
        if (AGO.Building.enabled && a && c) {
            e = a.parentNode.parentNode.parentNode;
            if (g = e.querySelector("div.pic")) {
                DOM.appendChild(a, g.querySelector("a.abort_link")), DOM.appendChild(c, g.querySelector("a.techtree_link")), AGO.Option.is("B11") && DOM.replaceChildren(g, DOM.create("div", {id: "ago_items_resource"}, null, {click: AGO.Building.clickSummary}));
            }
            b = a.querySelector("ul.production_info");
            f = AGO.Item.valid(DOM.getValue('input[name="type"]', e, 7));
            b && f && (AGO.Building.Data[f] ? 200 < f && "212" !== f && DOM.setValue("#number", a, AGO.Building.Data[f].level) : (AGO.Building.Data[f] = {
                type: AGO.Acc.type,
                id: f,
                time: AGO.Time.parseFormatedTime(DOM.getTextChild("li:first-child .time", b))
            }, AGO.Task.updateCoords(AGO.Building.Data[f], 2), 200 > f ? (AGO.Building.Data[f].level = AGO.Units.get(f), AGO.Building.Data[f].increase = 1, AGO.Building.updateConstruction(AGO.Building.Data[f]), AGO.Building.Data[f].time /= AGO.Building.Data[f].metal +
                                                                                                                                                                                                                                                AGO.Building.Data[f].crystal, AGO.Option.is("B11") && AGO.Option.is("B12") && (g = (g = DOM.getTextChild("#buttonz .buildingimg a#details" + f + " .eckeoben span", null, 7)
                                                                                                                                                                                                                                                                                                                                   ) ? NMR.parseIntAbs(g) - AGO.Building.Data[f].level : 0, AGO.Building.Data[f].increase = 2 * g || 1
            )
            ) : AGO.Building.Data[f].level = 1, AGO.Building.updateConstruction(AGO.Building.Data[f])
            ), DOM.iterateChildren(b, function (a) {
                                       (k = DOM.getTextChild(a)
                                       ) && DOM.updateTextChild(a, null, k.slice(0, 32))
                                   }
            ), AGO.Option.is("commander") ? (VAL.check(f, "1", "2", "3", "212") && DOM.addClass(b,
                                                                                                null, "ago_items_compact"
            ), g = DOM.getChildren(b, 2)
            ) : g = DOM.getChildren(b, 1), DOM.set("li:first-child .time", b, {
                                                       id: "ago_items_duration",
                                                       original: DOM.getTextChild(g)
                                                   }
            ), h = g ? g.querySelector(".time") : null, g = document.createDocumentFragment(), VAL.check(f, "1", "2", "3") ? (e = DOM.appendDIV(null, "capacity_display"), DOM.append(e, "p").textContent = AGO.Label.get("B19"), DOM.appendDIV(e, {id: "remainingresources"}), DOM.prependChild(c, e), h && (DOM.setAttribute(h, null, "id", "ago_items_energy"), DOM.appendSPAN(h, "undermark"), c = document.createDocumentFragment(),
                d(c, AGO.Label.get("B17"), "ago_items_production"), DOM.before(h.parentNode, c), d(g, AGO.Label.get("212", 1), "ago_items_number")
            )
            ) : VAL.check(f, "4", "12", "212") ? (h && DOM.setAttribute(h, null, "id", "ago_items_production"), "212" === f && (0 > AGO.Units.get("energy") && d(g, AGO.Label.get("B18"), "ago_items_energy"), k = DOM.getTextChild("#content > span.level", e).split(":")[0], d(g, k || AGO.Label.get(f, 1), "ago_items_number", "ago_items_shortcut")
            ), "12" === f && d(g, AGO.Label.get("F67"), "ago_items_detail")
            ) : VAL.check(f, "22", "23", "24") ?
                d(g, DOM.getTextChild(".capacity_display > p", c), "ago_items_detail") : "42" === f ? d(g, " ", "ago_items_detail") : 200 < f && ((f in AGO.Item.Ship || AGO.Uni.defToTF && f in AGO.Item.Defense
                                                                                                                                                  ) && d(g, AGO.Label.get("L082"), "ago_items_detail"), k = DOM.getTextChild("#content > span.level", e).split(":")[0], d(g, k || AGO.Label.get(f, 1), "ago_items_number", "ago_items_shortcut")
            ), b.appendChild(g), DOM.appendSPAN(a, {id: "ago_items_finish"}), AGO.Building.Display()
            );
            DOM.addEvents("#detail #number", null, {
                              keyup: AGO.Building.Display, blur: function () {
                                  window.setTimeout(AGO.Building.Display,
                                                    200
                                  )
                              }
                          }
            );
            DOM.addEventsAll("#content ul.production_info", null, {click: AGO.Building.clickInfo});
            DOM.disableActiveElement();
            DOM.disableAutocomplete()
        }
        e = g = c = g = e = c = null
    }, Display: function () {
        var a, b, c, d, e;
        a = document.getElementById("detail");
        c = AGO.Item.valid(DOM.getValue('input[name="type"]', a, 7));
        if (AGO.Building.enabled && a && c) {
            if (b = OBJ.create(AGO.Building.Task), delete AGO.Building.Task, b.id === c && (200 < c ? "level"in b && DOM.setValue("#number", a, b.level) : ("level"in b && (AGO.Building.Data[c].level = b.level
                ), "increase"in
                   b && (AGO.Building.Data[c].increase = b.increase
                   ), "range"in b && (AGO.Building.Data[c].range = b.range
                )
                )
                ), 200 < c && (AGO.Building.Data[c].level = DOM.getValue("#number", a, 2)
                ), b = OBJ.create(AGO.Building.Data[c]), AGO.Building.updateConstruction(b), AGO.Task.updateResources(b), AGO.Task.updateStandardUnits(b), 0 > b.increase ? (b.difference = Math.max(b.level + b.increase + 1, 0), b.current = Math.max(b.level + b.increase - b.range, 0)
                ) : 0 < b.increase ? (b.difference = Math.max(b.level + b.increase - 1, 0), b.current = b.level + b.increase + b.range
                ) : b.current =
                    b.difference = b.level, AGO.Building.updateSummary(b), b.duration && (DOM.updateText("ago_items_duration", "id", b.duration, 19), DOM.updateText("ago_items_finish", "id", AGO.Time.format(AGO.Time.getFinishTime(b.duration)))
                ), VAL.check(c, "1", "2", "3")) {
                e = AGO.Ogame.getConsumptionEnergy(c, b.current) - AGO.Ogame.getConsumptionEnergy(c, b.difference), d = AGO.Units.get("energy") - e, AGO.Building.updateValue("ago_items_energy", e, d), e = 0 <= d ? 0 : Math.ceil(-d / AGO.Ogame.getProductionEnergy("212", 1)), d = "[" + AGO.Label.get("K072").toLowerCase() +
                                                                                                                                                                                                                                                                                       ". " + e + "]", AGO.Building.updateValue("ago_items_number", "", d, {
                                                                                                                                                                                                                                                                                                                                    type: "task",
                                                                                                                                                                                                                                                                                                                                    tab: "212",
                                                                                                                                                                                                                                                                                                                                    data: e
                                                                                                                                                                                                                                                                                                                                }
                ), e = AGO.Ogame.getProductionResources(c, b.current), d = e - AGO.Ogame.getProductionResources(c, b.difference), AGO.Building.updateValue("ago_items_production", e, d), d = AGO.Ogame.getAmortisation(c, b, d), DOM.updateText("#remainingresources", a, d, 19);
            } else if (VAL.check(c, "4", "12")) {
                e = AGO.Ogame.getProductionEnergy(c, b.current), d = e - AGO.Ogame.getProductionEnergy(c, b.difference), AGO.Building.updateValue("ago_items_production", e,
                                                                                                                                                  d
                ), "12" === c && (e = AGO.Ogame.getConsumptionDeuterium(c, b.current), d = e - AGO.Ogame.getConsumptionDeuterium(c, b.difference), AGO.Building.updateValue("ago_items_detail", e, d)
                );
            } else if ("212" === c) {
                e = AGO.Ogame.getProductionEnergy(c, b.level + AGO.Units.get("212")), d = AGO.Ogame.getProductionEnergy(c, b.level), AGO.Building.updateValue("ago_items_production", e, d), 0 > AGO.Units.get("energy") ? (d = Math.ceil(AGO.Units.get("energy") + AGO.Ogame.getProductionEnergy("212", b.level)), e = Math.abs(AGO.Units.get("energy")), AGO.Building.updateValue("ago_items_energy",
                                                                                                                                                                                                                                                                                                                                                                                    e, d
                ), e = Math.ceil(Math.abs(AGO.Units.get("energy")) / AGO.Ogame.getProductionEnergy("212", 1)), d = "[" + AGO.Label.get("K072").toLowerCase() + ". " + e + "]", b = {
                    type: "task",
                    tab: "212",
                    data: e
                }
                ) : d = b = "", AGO.Building.updateValue("ago_items_number", AGO.Building.Data[c].level + AGO.Units.get(c), d, b);
            } else if (VAL.check(c, "22", "23", "24")) {
                e = AGO.Ogame.getStorageCapacity(b.current), d = e - AGO.Ogame.getStorageCapacity(b.difference), AGO.Building.updateValue("ago_items_detail", e, d);
            } else if ("42" === c) {
                d = (e = b.current * b.current
                    ) ? "(" + AGO.Acc.galaxy +
                        ":" + Math.max(AGO.Acc.system - e + 1, 1) + " - " + AGO.Acc.galaxy + ":" + Math.min(AGO.Acc.system + e - 1, AGO.Uni.systems) + ")" : "", AGO.Building.updateValue("ago_items_detail", e, d);
            } else if (200 < c) {
                if (c in AGO.Item.Ship || AGO.Uni.defToTF && c in AGO.Item.Defense) {
                    b = {}, b[c] = Math.max(AGO.Building.Data[c].level, 1), b = AGO.Ogame.getDebris(b, !0), d = "(" + Math.min(Math.floor(b.total / 1E4) / 10, 20) + "%)", AGO.Building.updateValue("ago_items_detail", b.total, d);
                }
                b = (d = DOM.getText("#maxlink", a, 7)
                    ) ? {type: "task", tab: c, data: NMR.parseIntAbs(d)} : null;
                AGO.Building.updateValue("ago_items_number", AGO.Building.Data[c].level + AGO.Units.get(c), d, b)
            }
        }
    }, updateSummary: function (a) {
        function b(a, b, c, d, e) {
            var f;
            f = JSON.stringify({type: "setting", data: d});
            a = DOM.append(a, "ul", e);
            b = DOM.appendLI(a, {"class": "tooltip", title: AGO.Label.get(d), "ago-data": f}, b);
            DOM.appendSPAN(b, "ago_items_resource_value", c, 2, 0);
            return a
        }

        var c, d, e, g, h, f, k, l, p, n, m;
        if (c = document.getElementById("ago_items_resource")) {
            d = document.createDocumentFragment(), e = DOM.appendDIV(d, "ago_items_resource_header"),
                a.reserved = 1, n = 0 > a.increase ? "ago_icon_reserved_red tooltip" : "ago_icon_reserved tooltip", DOM.appendA(e, {
                                                                                                                                    "class": n,
                                                                                                                                    title: AGO.Label.get("I0T")
                                                                                                                                }, null, {
                                                                                                                                    message: {
                                                                                                                                        page: "Panel",
                                                                                                                                        role: "Action",
                                                                                                                                        data: {
                                                                                                                                            action: "set",
                                                                                                                                            tab: "Construction",
                                                                                                                                            value: a
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
            ), DOM.appendA(e, "icon icon_skip_back", null, '{"type":"decreaseRange"}'), DOM.appendA(e, "icon icon_rewind", null, '{"type":"decrease"}'), 200 > a.id ? (n = HTML.classStatus(a.increase), l = a.level + a.increase, l = (p = VAL.status(a.increase, -1 * a.range, 0, a.range)
                                                                                                                                                                                                                                       ) ? l + "-" + (l + p
            ) : l
            ) : (n = HTML.classStatus(1),
                l = a.level
                                                                                                                                                         ), DOM.appendSPAN(e, n, l, 8), DOM.appendA(e, "icon icon_fastforward", null, '{"type":"increase"}'), DOM.appendA(e, "icon icon_skip", null, '{"type":"increaseRange"}'), a.reserved = 0, DOM.appendA(e, {
                                                                                                                                                                                                                                                                                                                                                                  "class": "icon icon_info tooltip",
                                                                                                                                                                                                                                                                                                                                                                  title: AGO.Label.get("I0T")
                                                                                                                                                                                                                                                                                                                                                              }, null, {
                                                                                                                                                                                                                                                                                                                                                                  message: {
                                                                                                                                                                                                                                                                                                                                                                      page: "Panel",
                                                                                                                                                                                                                                                                                                                                                                      role: "Action",
                                                                                                                                                                                                                                                                                                                                                                      data: {
                                                                                                                                                                                                                                                                                                                                                                          action: "set",
                                                                                                                                                                                                                                                                                                                                                                          tab: "Construction",
                                                                                                                                                                                                                                                                                                                                                                          value: a
                                                                                                                                                                                                                                                                                                                                                                      }
                                                                                                                                                                                                                                                                                                                                                                  }
                                                                                                                                                                                                                                                                                                                                                              }
            ), f = {}, k = {}, l = AGO.Option.is("B31") ? " (" + AGO.Label.get([
                                                                                   "B36",
                                                                                   "B37",
                                                                                   "B38"
                                                                               ][AGO.Option.get("B35", 2)]
            ) + ")" : "", m = AGO.Option.is("B31") ? a.standardunits : a.resources,
                e = b(d, AGO.Label.get("I3A") + l, m, "B31"), OBJ.iterate(AGO.Item.Resource, function (b) {
                                                                              f[b] = AGO.Units.get(b);
                                                                              0 < a[b] && (f[b] -= a[b], k[b] = 0 > f[b] ? Math.abs(f[b]) : 0, h = DOM.appendLI(e, "", b, 11), DOM.appendSPAN(h, "ago_items_resource_value", a[b], 2)
                                                                              )
                                                                          }
            ), AGO.Task.updateResources(k), AGO.Task.updateStandardUnits(k), m = AGO.Option.is("B31") ? k.standardunits : k.resources, e = b(d, AGO.Label.get("I39") + l, m, "B31"), OBJ.iterate(AGO.Item.Resource, function (a) {
                                                                                                                                                                                                     h = DOM.appendLI(e, "", a, 11);
                                                                                                                                                                                                     n = 0 > f[a] ? "ago_color_palered" : "ago_color_lightgreen";
                                                                                                                                                                                                     DOM.appendSPAN(h, "ago_items_resource_value " + n, f[a], 2)
                                                                                                                                                                                                 }
            ), l = AGO.Label.get("F24") + (AGO.Option.is("B15") ? " (" + AGO.Label.get("I39") + ")" : ""
            ), m = AGO.Option.is("B15") ? k.resources : a.resources, e = b(d, l, m, "B15", "ago_items_resource_cargo"), 0 < m && (p = AGO.Item.check(AGO.Option.get("B16", 2), AGO.Item.ShipTransport, "203"), h = DOM.appendLI(e, {
                                                                                                                                                                                                                                    "class": "ago_items_resource_cargo tooltipRel tooltipClose tooltipRight",
                                                                                                                                                                                                                                    rel: "ago_items_resource_cargo"
                                                                                                                                                                                                                                }, p, 11
            ), DOM.appendSPAN(h, "ago_items_resource_value", Math.ceil(m / AGO.Item[p].capacity),
                              3
            ), e = DOM.appendDIV(d, {
                                     "class": "htmlTooltip",
                                     id: "ago_items_resource_cargo"
                                 }, {display: "none"}
            ), DOM.append(e, "h1").textContent = l, DOM.appendDIV(e, "splitLine"), g = DOM.append(e, "ul", "ListLinks"), g.addEventListener("click", AGO.Building.clickTooltip, !1), OBJ.iterate(AGO.Item.ShipTransport, function (a) {
                                                                                                                                                                                                     h = DOM.appendLI(g, {
                                                                                                                                                                                                                          "ago-data": JSON.stringify({
                                                                                                                                                                                                                                                         option: "B16",
                                                                                                                                                                                                                                                         data: a
                                                                                                                                                                                                                                                     }
                                                                                                                                                                                                                          )
                                                                                                                                                                                                                      }, a, 11
                                                                                                                                                                                                     );
                                                                                                                                                                                                     DOM.appendSPAN(h, "ago_items_resource_value", Math.ceil(m / AGO.Item[a].capacity), 3)
                                                                                                                                                                                                 }
            )
            ), DOM.replaceChildren(c, d), c = d = e = g = h = null
        }
    }, updateValue: function (a,
                              b, c, d
    ) {
        if (a = document.getElementById(a)) {
            "string" === typeof b ? DOM.updateTextChild(a, null, b) : DOM.updateTextChild(a, null, b || "0", b ? 4 : 0), d && DOM.setData(a, null, d), "string" === typeof c ? DOM.updateText("span", a, c) : (b = c ? (0 < c ? "(+" : "("
                                                                                                                                                                                                                       ) + STR.formatNumber(Math.ceil(c), !0) + ")" : "(0)", (b = DOM.updateText("span", a, b)
                                                                                                                                                                                                                                                                             ) && DOM.updateClass(b, null, HTML.classStatus(c))
            )
        }
    }, Action: function (a) {
        var b;
        OBJ.is(a) && AGO.Item.valid(a.id) && (b = DOM.getValue('#planet input[name="type"]', null, 7), AGO.Building.Task = a, a.id === b ? AGO.Building.Display() :
                                                                                                                              DOM.click('#buttonz a.detail_button[ref="' + a.id + '"]')
        )
    }, clickTooltip: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), a.option && (AGO.Option.set(a.option, a.data, 2), AGO.Global.message({role: "hideAll"}), AGO.Building.Display()
        )
        )
    }, clickInfo: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), "task" === a.type && AGO.Building.Action({
                                                                                                           id: a.tab,
                                                                                                           level: +a.data
                                                                                                       }
        )
        )
    }, clickSummary: function (a) {
        var b, c;
        if (a && a.target) {
            if (c = DOM.getValue('#detail input[name="type"]', null, 7), a = DOM.getData(a.target, null, 2), OBJ.is(a.message) &&
                                                                                                             AGO.Init.Messages(a.message.page, a.message.role, a.message.data), "setting" === a.type) {
                AGO.Option.set(a.data, AGO.Option.is(a.data) ? 0 : 1, 1), AGO.Building.Display();
            } else if (c && AGO.Building.Data[c]) {
                if (200 > c) {
                    if (b = {increase: 1, decrease: -1}[a.type] || 0) {
                        AGO.Building.Data[c].increase += b;
                    }
                    (b = {increaseRange: 1, decreaseRange: -1}[a.type] || 0
                    ) && AGO.Building.Data[c].increase && (AGO.Building.Data[c].range += b
                    )
                } else if (b = {
                                   increase: 1,
                                   decrease: -1,
                                   increaseRange: 10,
                                   decreaseRange: -10
                               }[a.type] || 0) {
                    AGO.Building.Data[c].level = Math.max(AGO.Building.Data[c].level +
                                                          b, 1
                    ), DOM.setValue("#detail #number", null, AGO.Building.Data[c].level, 8);
                }
                AGO.Building.Display()
            }
        }
    }, showConstructions: function () {
        function a(a, c) {
            var d, e, g;
            (d = document.getElementById(a)
            ) && (e = d.parentNode.parentNode.parentNode.children
            ) && 3 < e.length && ((g = e[1].querySelector("td.desc")
                                  ) && 3 === +g.firstChild.nodeType && (g.firstChild.textContent = STR.check(g.firstChild.textContent).replace(/niveau/g, "")
                                  ), "shipyard" === c ? (g = document.getElementById("shipSumCount7"), DOM.addClass(g, null, "ago_color_limegreen"), DOM.appendChild(e[0].querySelector("th"),
                                                                                                                                                                     g
            ), DOM.set("td.building", e[1], {
                           valign: "",
                           rowspan: "3"
                       }
            ), d = DOM.appendTR(null, "data"), g = DOM.appendTD(d, "desc"), DOM.appendSPAN(g, {
                                                                                               id: "ago_construction_" + c,
                                                                                               "class": "ago_construction_finishtime"
                                                                                           }, "\u2009"
            ), DOM.after(e[2], d), (g = e[2].querySelector("br")
                                   ) && g.parentNode.removeChild(g)
            ) : (g = "building" === c && 0 > AGO.Planets.Get("active", "construction") ? " ago_color_palered" : "", DOM.addClass(d, null, "ago_construction_time" + g), g && DOM.addClass(".level", e[1], g), g = d.parentNode, g.className = "desc", DOM.appendChild(e[2].querySelector("td"),
                                                                                                                                                                                                                                                                      d
            ), DOM.appendSPAN(g, {id: "ago_construction_" + c, "class": "ago_construction_finishtime"}, "\u2009")
                                     )
            )
        }

        AGO.Option.is("B02") && (a("Countdown", "building"), a("researchCountdown", "research"), a("shipAllCountdown7", "shipyard")
        )
    }, displayConstructions: function () {
        function a(a, b) {
            DOM.setText("ago_construction_" + a, "id", AGO.Time.format(AGO.Time.getFinishTime(b)))
        }

        var b, c, d, e, g;
        if (AGO.Option.is("B02") && (b = AGO.Init.Script()
            )) {
            if ((c = b.match(/baulisteCountdown\(getElementByIdWithCache\(["']\w+["']\)\,\s*\d*/gi)
                ) && c.length) {
                for (g =
                     0; g < c.length; g++) {
                    d = c[g].match(/["'](\w+)["']\)\,\s*(\d*)/i), e = d[1], d = NMR.parseIntAbs(d[2]), "Countdown" === e && a("building", d), "researchCountdown" === e && a("research", d), "moveCountdown" === e && a("move", d);
                }
            }
            (c = b.match(/shipCountdown\((\s*getElementByIdWithCache\(["']\w+["']\)\,)+(\s*\d*\,){3,3}/i)
            ) && c.length && a("shipyard", NMR.parseIntFormat(c[2]))
        }
    }, updateConstruction: function (a) {
        var b, c, d, e, g, h, f;
        if (OBJ.is(a) && AGO.Item.valid(a.id)) {
            if (b = a.id, OBJ.copy({
                                       metal: 0,
                                       crystal: 0,
                                       deuterium: 0,
                                       resources: 0,
                                       duration: 0
                                   },
                                   a
                ), b in AGO.Item.Ship || b in AGO.Item.Defense) {
                for (f in OBJ.copy({
                                       level: Math.max(a.level, 1),
                                       increase: 0,
                                       range: 0,
                                       duration: a.time * Math.max(a.level, 1)
                                   }, a
                ), AGO.Item.Resource) {
                    AGO.Item[b][f] && (a[f] = AGO.Item[b][f] * a.level, a.resources += a[f]
                    );
                }
            } else if (AGO.Item[b].factor) {
                a.increase = b in AGO.Item.Research ? Math.max(a.increase || 0, 0) : Math.max(a.increase || 0, -1 * a.level);
                a.range = a.reserved ? 0 : 0 > a.increase ? Math.max(Math.min(a.level + a.increase, a.range || 0), 0) : Math.max(a.range || 0, 0);
                0 > a.increase ? (d = Math.max(a.level + a.increase,
                                               0
                ), c = Math.max(d - a.range, 0), e = 4 * AGO.Units.get("121")
                ) : (0 < a.increase ? (c = a.level + a.increase, d = c + a.range
                ) : c = d = a.level, e = 0
                );
                a.start = c;
                a.stop = d;
                g = {metal: 0, crystal: 0};
                for (f in AGO.Item.Resource) {
                    if (AGO.Item[b][f]) {
                        for (h = c; h <= d; h++) {
                            a[f] += Math.floor(AGO.Item[b][f] * Math.pow(AGO.Item[b].factor, h - 1));
                        }
                        g[f] = a[f];
                        e && (a[f] = Math.floor(a[f] - a[f] / 100 * e)
                        );
                        a.resources += a[f]
                    }
                }
                a.duration = Math.floor((g.metal + g.crystal
                                        ) * a.time
                )
            }
        }
    }
};
AGO.Resources = AGO.Station = AGO.Research = AGO.Shipyard = AGO.Defense = AGO.Building;
AGO.ResourcesSettings = {
    Run: function () {
        AGO.ResourcesSettings.Show()
    }, Show: function () {
        function a(a) {
            a && (a = DOM.getAttribute(a.currentTarget, null, "rel"), DOM.setAll("#inhalt table.list td > select", null, null, null, null, {value: a}), DOM.click('#inhalt .factorbutton input[type="submit"]', null)
            )
        }

        var b;
        if (b = document.getElementById("inhalt")) {
            if (b = b.querySelector(".factorbutton")) {
                DOM.set(b.parentNode, null, null, {
                            width: "580px",
                            padding: "8px"
                        }
                ), DOM.append(b, "input", {"class": "btn_blue", type: "button", value: "0%", rel: "0"},
                              {marginLeft: "12px"}, {click: a}
                ), DOM.append(b, "input", {
                                  "class": "btn_blue",
                                  type: "button",
                                  value: "100%",
                                  rel: "100"
                              }, {marginLeft: "12px"}, {click: a}
                );
            }
        }
        b = b = null
    }
};
AGO.Trader = {
    Content: function () {
        DOM.disableActiveElement();
        DOM.disableAutocomplete()
    }
};
AGO.Alliance = {
    Content: function (a, b, c) {
        "allianceoverview" === a && DOM.updateAttribute("allyMemberlist", "id", "ago-status", 1, 8) && (DOM.click("#link11.opened"), DOM.click("#link12.closed")
        );
        DOM.disableActiveElement();
        DOM.disableAutocomplete()
    }
};