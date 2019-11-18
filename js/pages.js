AGO.Overview = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    },
    Run: function () {
        AGO.Option.is("B01") && (AGO.Overview.enabled = true, AGO.Overview.improve = 1 === AGO.Acc.type);
        AGO.Overview.Show();
        AGO.Building.showConstructions()
    },
    Interactive: function () {
        AGO.Units.activeProduction();
        AGO.Overview.Timer();
        AGO.Building.displayConstructions()
    },
    Complete: function () {
        window.setTimeout(function () {
            var a = document.getElementById("Rentabilite_mines");
            a && DOM.updateAttribute(a.parentNode, null, "ago-status", 1, 8) && DOM.set(a.parentNode, null, null, null, {
                click: function () {
                    DOM.addEvents("ordre_table", "id", {click: AGO.Overview.infocompte})
                }
            })
        }, 500);
    }, infocompte: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), OBJ.is(a) && (a.id = a.id + "", a.level = 0, a.type = 1, a.coords = AGO.Task.trimCoords(a.coords), AGO.Task.updateCoords(a, 2, AGO.Task.splitCoords(a.coords)), AGO.Init.Messages("Panel", "Action", {
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
                return document.location.href = AGO.Uni.path + "overview", false;
            }
            if (32 === a.keyCode) {
                return DOM.click("#planet #moon a, #planet #planet_as_moon a"), a.preventDefault(), false;
            }
        }
        return true;
    },
    Show: function () {
        var a, b, c, d;
        // B02: Show finish time
        // TODO: Finish times are not shown yet
        AGO.Option.is("B02") && DOM.extendClass(AGO.App.isVersion7 ? "middle" : "inhalt", "id", "ago_mode_construction");
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
                        b.className = c >= g ? "overmark" : c >= .9 * g ? "middlemark" : "", DOM.innerHTML(b, null, (0 < e && c < g ? '<span class="undermark">(+' + STR.formatNumber(Math.floor(3600 * e)) + ") </span>" : '<span class="overmark">(0) </span>'
                        ) + STR.formatNumber(c) + " / " + STR.formatNumber(g));
                    }
                    (b = document.getElementById("ago_overview_storagetime_" +
                            a
                        )
                    ) && !AGO.Overview.storage && (a = 0 < e && c < g ? Math.floor((g - d
                        ) / e
                        ) : 0, b.textContent = a ? AGO.Time.format(AGO.Time.getFinishTime(a)) : "\u2009"
                    )
                }
            ), AGO.Overview.storage = !0
        )
    }
};
AGO.Building = {
    Data: {},
    Messages: function (a, b) {
        "Display" === a ? AGO.Building.Display() : "Action" === a && AGO.Building.Action(b)
    },
    Read: function () {
        if (AGO.App.isVersion7) {
            let techs, techLevel, techID;
            techs = document.querySelectorAll(".maincontent #technologies li");
            for (let i = 0; i < techs.length; i++) {
                techID = AGO.Item.valid(techs[i].dataset.technology);
                techLevel = +techs[i].querySelector('.level, .amount').dataset.value;
                techID && AGO.Units.set(techID, techLevel);
            }

            if (AGO.App.page === "shipyard" && AGO.Option.is("B05")) {
                document.querySelector("#shipyard #technologies").classList.add("ago_center")
            }
        } else {
            var a, b, c, d;
            a = document.querySelectorAll("#inhalt #buttonz li");
            for (d = 0; d < a.length; d++) {
                b = a[d].querySelector('.buildingimg a[id^="details"]'), (c = AGO.Item.valid(DOM.getAttribute(b, null, "ref", 7))
                ) && AGO.Units.set(c, DOM.getTextChild(".ecke .level", b, 3));
            }
        }

        OBJ.set(AGO.Units.Data, "page", AGO.App.page);
        "research" === AGO.App.page && AGO.Notify.set("Problem", -12);
    },
    Run: function () {
        AGO.Option.is("B00") && (AGO.Building.enabled = true);
        AGO.Building.Show();
        AGO.Building.showConstructions()
    },
    Interactive: function () {
        AGO.Building.displayConstructions()
    },
    onKeydown: function (a) {
        if (12 !== a.inputType) {
            // A or M
            if (65 === a.keyCode || 77 === a.keyCode) {
                AGO.App.isVersion7 ? DOM.click("#technologydetails .ago_items_shortcut #ago_items_number[ago-data]") : DOM.click("#detail .ago_items_shortcut #ago_items_number[ago-data]");
                return false;
            }

            // Q
            if (81 === a.keyCode) {
                AGO.App.isVersion7 ? DOM.setValue("#technologydetails #build_amount", null, "", 0, "click") : DOM.setValue("#detail #number", null, "", 0, "click");
                return false;
            }
        }

        return 11 !== a.inputType || 38 !== a.keyCode && 40 !== a.keyCode || (AGO.App.isVersion7 && "build_amount" !== a.target.id || "number" !== a.target.id) ? true : DOM.changeInput(a, a.target)
    },
    Show: function () {
        if (AGO.App.isVersion7) {
            let mainContent;
            // B21: Show name or details over images
            let showName = VAL.check(AGO.Option.get("B21", 2), 1, 3);
            let showDetails = VAL.check(AGO.Option.get("B21", 2), 2, 3);
            if (mainContent = DOM.query(".maincontent")) {
                // B02: Show finish time
                let className = (showName ? " ago_mode_name" : "") + (AGO.Option.is("B02") ? " ago_mode_construction" : "");
                DOM.extendClass(mainContent, null, className);
                let techButtons = mainContent.querySelectorAll("#technologies li");
                for (let k = 0; k < techButtons.length; k++) {
                    let spanSprite = techButtons[k].querySelector("span.sprite");
                    let techID;
                    if (techID = AGO.Item.valid(techButtons[k].dataset.technology)) {
                        let targetLevel = DOM.getTextChild("span.targetlevel", spanSprite, 3);
                        if (AGO.Building.enabled) {
                            // If deconstructing
                            if (0 < targetLevel && targetLevel < AGO.Units.get(techID) && 200 > +techID) {
                                DOM.addClass(".targetlevel", spanSprite, "overmark");
                                DOM.addClass(".countdown", spanSprite, "overmark");
                            }

                            if (showName) {
                                let techLabel = DOM.getAttribute(techButtons[k], null, "aria-label", 7) || AGO.Label.get(techID, 11);
                                DOM.appendSPAN(spanSprite, "ago_items_textName ago_items_text ago_text_background", techLabel);
                            }

                            // TODO: fix this shit
                            if (!(showDetails && techButtons[k].dataset.status === "on" && AGO.Option.is("commander")) || targetLevel && showName || !VAL.check(AGO.App.page, "shipyard", "defense") && "212" !== techID) {

                            } else {
                                let maxForMet = (AGO.Units.get("metal") || 1) / (AGO.Item[techID].metal || 0);
                                let maxForCrys = (AGO.Units.get("crystal") || 1) / (AGO.Item[techID].crystal || 0);
                                let maxForDeut = (AGO.Units.get("deuterium") || 1) / (AGO.Item[techID].deuterium || 0);
                                let maxPossible = STR.formatNumber(Math.floor(Math.min(Math.min(maxForMet, maxForCrys), maxForDeut)));
                                maxPossible && VAL.check(techID, "407", "408") && (maxPossible = 1);
                                DOM.appendSPAN(spanSprite, "ago_items_textCount ago_items_text ago_text_background", maxPossible);
                            }

                            if (VAL.check(AGO.App.page, "shipyard", "defense") && techButtons[k].dataset.status === "active") {
                                let targetAmountSpan = DOM.query(".targetamount", spanSprite);
                                let newWidth = Math.min(targetAmountSpan.dataset.value.length * 8 + 5, 75);
                                targetAmountSpan.style.width = newWidth + "px";
                                let targetAmount = STR.formatNumber(targetAmountSpan.dataset.value);
                                DOM.setText(targetAmountSpan, null, targetAmount);
                            }

                            // B04: Show unnecessary and useful research levels
                            // TODO: workaround greyscale filter somehow
                            if (AGO.Option.is("B04") && "research" === AGO.App.page) {
                                if (Math.abs(AGO.Item.Research[techID]) > AGO.Units.get(techID))
                                    DOM.addClass(".level", spanSprite, "ago_color_palered");
                                else
                                    0 > AGO.Item.Research[techID] && DOM.addClass(".level", spanSprite, "ago_color_lightgreen");
                            }
                        }
                    }
                }
            }
        } else {
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
                            ) || g && c || !VAL.check(AGO.App.page, "shipyard", "defense") && "212" !== f || (e = (AGO.Units.get("metal") || 1) / (AGO.Item[f].metal || 0
                                ), g = (AGO.Units.get("crystal") || 1) / (AGO.Item[f].crystal || 0
                                ), h = (AGO.Units.get("deuterium") || 1) / (AGO.Item[f].deuterium || 0
                                ), (e = STR.formatNumber(Math.floor(Math.min(Math.min(e, g), h)))
                                ) && VAL.check(f, "407", "408") && (e = 1
                                ), DOM.appendSPAN(b, "ago_items_textCount ago_items_text ago_text_background", e)
                            ), AGO.Option.is("B04") && "research" === AGO.App.page && (Math.abs(AGO.Item.Research[f]) > AGO.Units.get(f) ? DOM.addClass(".level", b, "ago_color_palered") : 0 > AGO.Item.Research[f] && DOM.addClass(".level", b, "ago_color_lightgreen")
                            )
                        )
                    }
                }
            }
        }
    },
    Content: function (a, b, c) {
        function fillFragment (fragment, label, id, className) {
            if (label) {
                fragment = DOM.appendLI(fragment, className);
                DOM.append(fragment, "strong").textContent = label + ":";
                let span = DOM.appendSPAN(fragment, {"class": AGO.App.isVersion7 ? "value" : "time", id: id});
                DOM.appendSPAN(span);
            }
        }

        if (AGO.App.isVersion7) {
            let description = DOM.query("div.description");
            let content = DOM.updateAttribute(".content", null, "ago-status", 1, 8);

            if (AGO.Building.enabled && content && description) {
                let wrapper = content.parentNode.parentNode.parentNode;
                let techSpriteDiv;

                if (techSpriteDiv = wrapper.querySelector("div.sprite")) {
                    DOM.appendChild(content, techSpriteDiv.querySelector("a.abort_link"));
                    DOM.appendChild(description, techSpriteDiv.querySelector(".technology_tree"));

                    // B11: Show detailed resource information
                    AGO.Option.is("B11") && DOM.replaceChildren(techSpriteDiv, DOM.create("div", {id: "ago_items_resource"}, null, {click: AGO.Building.clickSummary}));
                }

                let prodInfo = content.querySelector("div.information ul");
                let techID = AGO.Item.valid(DOM.query("#technologydetails").dataset.technologyId);

                if (prodInfo && techID) {
                    if (AGO.Building.Data[techID]) {
                        200 < techID && "212" !== techID && DOM.setValue("#build_amount", content, AGO.Building.Data[techID].level);
                    } else {
                        AGO.Building.Data[techID] = {
                            type: AGO.Acc.type,
                            id: techID,
                            time: AGO.Time.parseFormatedTime(DOM.getTextChild("li.build_duration time", prodInfo))
                        };

                        AGO.Task.updateCoords(AGO.Building.Data[techID], 2);

                        if (200 > techID) {
                            AGO.Building.Data[techID].level = AGO.Units.get(techID);
                            AGO.Building.Data[techID].increase = 1;
                            AGO.Building.updateConstruction(AGO.Building.Data[techID]);
                            AGO.Building.Data[techID].time /= AGO.Building.Data[techID].metal + AGO.Building.Data[techID].crystal;

                            // B11: Show detailed resource information
                            // B12: Show after next level, when already in construction
                            if (AGO.Option.is("B11") && AGO.Option.is("B12")) {
                                let targetLevel;
                                targetLevel = (targetLevel = DOM.getAttribute("#technologies li.technology[data-technology=\"" + techID + "\"] .targetlevel", null, "data-value", 7)) ? NMR.parseIntAbs(targetLevel) - AGO.Building.Data[techID].level : 0;
                                AGO.Building.Data[techID].increase = 2 * targetLevel || 1;
                            }
                        } else {
                            AGO.Building.Data[techID].level = 1;
                        }

                        AGO.Building.updateConstruction(AGO.Building.Data[techID]);
                    }

                    DOM.iterateChildren(prodInfo, function (child) {
                        let labelText, labelChild = DOM.query("strong", child);
                        (labelText = DOM.getTextChild(labelChild)) && DOM.updateTextChild(labelChild, null, labelText.slice(0, 32));
                    });

                    if (AGO.Option.is("commander") && VAL.check(techID, "1", "2", "3", "212", "217")) {
                        DOM.addClass(prodInfo, null, "ago_items_compact");
                    }

                    DOM.set("li.build_duration .value", prodInfo, {
                        id: "ago_items_duration",
                        original: DOM.getTextChild("li.build_duration .value", prodInfo)
                    });

                    let energy;
                    energy = (energy = DOM.query("li.additional_energy_consumption", prodInfo)) ? energy : DOM.query("li.energy_production", prodInfo);
                    energy = energy ? energy.querySelector(".value") : null;

                    let docFrag = document.createDocumentFragment();

                    if (VAL.check(techID, "1", "2", "3", "217")) {
                        if (VAL.check(techID, "1", "2", "3")) {
                            let amortisationDIV = DOM.appendDIV(null, "capacity amortisation");
                            DOM.append(amortisationDIV, "p").textContent = AGO.Label.get("B19");
                            DOM.appendSPAN(amortisationDIV, {class: "description"});
                            DOM.prependChild(description, amortisationDIV);
                        }

                        if (energy) {
                            DOM.setAttribute(energy, null, "id", "ago_items_energy");
                            DOM.appendSPAN(energy, "undermark");

                            let prodFragment = document.createDocumentFragment();
                            // Production
                            fillFragment(prodFragment, AGO.Label.get("B17"), "ago_items_production");
                            DOM.before(energy.parentNode, prodFragment);

                            // Solar satellites needed
                            fillFragment(docFrag, AGO.Label.get("212", 1), "ago_items_number");
                        }
                    } else if (VAL.check(techID, "4", "12", "212")) {
                        energy && DOM.setAttribute(energy, null, "id", "ago_items_production");

                        if ("212" === techID) {
                            // B18: "Energy needed"
                            0 > AGO.Units.get("energy") && fillFragment(docFrag, AGO.Label.get("B18"), "ago_items_energy");
                            let labelAmount = DOM.getTextChild(".content > .information > span.amount", wrapper).split(":")[0];
                            fillFragment(docFrag, labelAmount || AGO.Label.get(techID, 1), "ago_items_number", "ago_items_shortcut");
                        }

                        // F67: "Consumption"
                        "12" === techID && fillFragment(docFrag, AGO.Label.get("F67"), "ago_items_detail")
                    } else if (VAL.check(techID, "22", "23", "24", "44")) {
                        DOM.extendClass(description, null, "ago_storage");
                        VAL.check(techID, "22", "23", "24") && fillFragment(docFrag, DOM.getTextChild(".capacity > span.label", description), "ago_items_detail");
                    } else if ("42" === techID) {
                        fillFragment(docFrag, " ", "ago_items_detail");
                    } else if (200 < techID) {
                        if (techID in AGO.Item.Ship || AGO.Uni.defToTF && techID in AGO.Item.Defense) {
                            // L082: "Debris field"
                            fillFragment(docFrag, AGO.Label.get("L082"), "ago_items_detail");
                            let labelAmount = DOM.getTextChild(".content > .information > span.amount", wrapper).split(":")[0];
                            fillFragment(docFrag, labelAmount || AGO.Label.get(techID, 1), "ago_items_number", "ago_items_shortcut");
                        }
                    }

                    prodInfo.appendChild(docFrag);
                    DOM.appendSPAN(content, {id: "ago_items_finish"});
                    AGO.Building.Display();
                }

                // B20: Show x10 button in shipyard and defense
                AGO.Option.is("B20") && DOM.addClass(".build-it_wrap", content, "x10");

                DOM.addEvents("input#build_amount", null, {
                    keyup: function () {
                        AGO.Building.Display();
                        if (AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense")) {
                            AGO.Building.checkInput();
                        }
                    },
                    blur: function () {
                        window.setTimeout(function () {
                            AGO.Building.Display();
                            if (AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense")) {
                                AGO.Building.checkInput();
                            }
                        }, 200);
                    }
                });

                AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense") && AGO.Building.checkInput();
                DOM.addEventsAll(".content .information ul", null, {click: AGO.Building.clickInfo});
                DOM.disableActiveElement();
                DOM.disableAutocomplete();
            }
            e = g = description = g = e = description = null
        } else {
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
                b && f && (AGO.Building.Data[f] ? (200 < f && "212" !== f && DOM.setValue("#number", a, AGO.Building.Data[f].level)) : (AGO.Building.Data[f] = {
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
                            ) && DOM.updateTextChild(a, null, k.slice(0, 32));
                        }
                    ), AGO.Option.is("commander") ? (VAL.check(f, "1", "2", "3", "212") && DOM.addClass(b,
                            null, "ago_items_compact"
                        ), g = DOM.getChildren(b, 2)
                    ) : g = DOM.getChildren(b, 1), DOM.set("li:first-child .time", b, {
                            id: "ago_items_duration",
                            original: DOM.getTextChild(g)
                        }
                    ), h = g ? g.querySelector(".time") : null, g = document.createDocumentFragment(), VAL.check(f, "1", "2", "3") ? (e = DOM.appendDIV(null, "capacity_display"), DOM.append(e, "p").textContent = AGO.Label.get("B19"), DOM.appendDIV(e, {id: "remainingresources"}), DOM.prependChild(c, e), h && (DOM.setAttribute(h, null, "id", "ago_items_energy"), DOM.appendSPAN(h, "undermark"), c = document.createDocumentFragment(),
                                fillFragment(c, AGO.Label.get("B17"), "ago_items_production"), DOM.before(h.parentNode, c), fillFragment(g, AGO.Label.get("212", 1), "ago_items_number")
                        )
                    ) : VAL.check(f, "4", "12", "212") ? (h && DOM.setAttribute(h, null, "id", "ago_items_production"), "212" === f && (0 > AGO.Units.get("energy") && fillFragment(g, AGO.Label.get("B18"), "ago_items_energy"), k = DOM.getTextChild("#content > span.level", e).split(":")[0], fillFragment(g, k || AGO.Label.get(f, 1), "ago_items_number", "ago_items_shortcut")
                        ), "12" === f && fillFragment(g, AGO.Label.get("F67"), "ago_items_detail")
                    ) : VAL.check(f, "22", "23", "24") ?
                        fillFragment(g, DOM.getTextChild(".capacity_display > p", c), "ago_items_detail") : "42" === f ? fillFragment(g, " ", "ago_items_detail") : 200 < f && ((f in AGO.Item.Ship || AGO.Uni.defToTF && f in AGO.Item.Defense
                            ) && fillFragment(g, AGO.Label.get("L082"), "ago_items_detail"), k = DOM.getTextChild("#content > span.level", e).split(":")[0], fillFragment(g, k || AGO.Label.get(f, 1), "ago_items_number", "ago_items_shortcut")
                        ), b.appendChild(g), DOM.appendSPAN(a, {id: "ago_items_finish"}), AGO.Building.Display()
                );
                AGO.Option.is("B20") && DOM.addClass(".build-it_wrap", a, "x10");

                DOM.addEvents("#detail #number", null, {
                    keyup: function () {
                        AGO.Building.Display();
                        if (AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense")) {
                            AGO.Building.checkInput();
                        }
                    },
                    blur: function () {
                        window.setTimeout(function () {
                            AGO.Building.Display();
                            if (AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense")) {
                                AGO.Building.checkInput();
                            }
                        }, 200);
                    }
                });
                AGO.Option.is("B20") && (AGO.App.page === "shipyard" || AGO.App.page === "defense") && AGO.Building.checkInput();
                DOM.addEventsAll("#content ul.production_info", null, {click: AGO.Building.clickInfo});
                DOM.disableActiveElement();
                DOM.disableAutocomplete();
            }
            e = g = c = g = e = c = null
        }
    },
    Display: function () {
        if (AGO.App.isVersion7) {
            let d, e;
            let wrapper = document.getElementById("technologydetails");
            let techID = AGO.Item.valid(wrapper.dataset.technologyId);

            if (AGO.Building.enabled && wrapper && techID) {
                let task = OBJ.create(AGO.Building.Task);
                delete AGO.Building.Task;

                if (task.id === techID) {
                    if (200 < techID) {
                        "level" in task && DOM.setValue("#build_amount", wrapper, task.level)
                    } else {
                        "level" in task && (AGO.Building.Data[techID].level = task.level);
                        "increase" in task && (AGO.Building.Data[techID].increase = task.increase);
                        "range" in task && (AGO.Building.Data[techID].range = task.range);
                    }
                }

                200 < techID && (AGO.Building.Data[techID].level = DOM.getValue("#build_amount", wrapper, 2));

                let tech = OBJ.create(AGO.Building.Data[techID]);
                AGO.Building.updateConstruction(tech);
                AGO.Task.updateResources(tech);
                AGO.Task.updateStandardUnits(tech);

                if (0 > tech.increase) {
                    tech.difference = Math.max(tech.level + tech.increase + 1, 0);
                    tech.current = Math.max(tech.level + tech.increase - tech.range, 0);
                } else if (0 < tech.increase) {
                    tech.difference = Math.max(tech.level + tech.increase - 1, 0);
                    tech.current = tech.level + tech.increase + tech.range;
                } else {
                    tech.current = tech.difference = tech.level;
                }

                AGO.Building.updateSummary(tech);

                if (tech.duration) {
                    DOM.updateText("ago_items_duration", "id", tech.duration, 19);
                    DOM.updateText("ago_items_finish", "id", AGO.Time.format(AGO.Time.getFinishTime(tech.duration)));
                }

                if (VAL.check(techID, "1", "2", "3")) {
                    let energyConsumption = AGO.Ogame.getConsumptionEnergy(techID, tech.current) - AGO.Ogame.getConsumptionEnergy(techID, tech.difference);
                    let energyLeft = AGO.Units.get("energy") - energyConsumption;
                    AGO.Building.updateValue("ago_items_energy", energyConsumption, energyLeft);

                    let solSatsNeeded = 0 <= energyLeft ? 0 : Math.ceil(-energyLeft / AGO.Ogame.getProductionEnergy("212", 1));
                    let solSatsText = "[" + AGO.Label.get("K072").toLowerCase() + ". " + solSatsNeeded + "]";
                    AGO.Building.updateValue("ago_items_number", "", solSatsText, {type: "task", tab: "212", data: solSatsNeeded});

                    let currentProd = AGO.Ogame.getProductionResources(techID, tech.current);
                    let deltaProd = currentProd - AGO.Ogame.getProductionResources(techID, tech.difference);
                    AGO.Building.updateValue("ago_items_production", currentProd, deltaProd);

                    let amortisation = AGO.Ogame.getAmortisation(techID, tech, deltaProd);
                    DOM.updateText(".amortisation .description", wrapper, amortisation, 19);
                }
                else if (VAL.check(techID, "4", "12")) {
                    let energyProd = AGO.Ogame.getProductionEnergy(techID, tech.current);
                    let deltaEnergy = energyProd - AGO.Ogame.getProductionEnergy(techID, tech.difference);
                    AGO.Building.updateValue("ago_items_production", energyProd, deltaEnergy);

                    if ("12" === techID) {
                        let deutConsumption = AGO.Ogame.getConsumptionDeuterium(techID, tech.current);
                        let consumptionDelta = deutConsumption - AGO.Ogame.getConsumptionDeuterium(techID, tech.difference);
                        AGO.Building.updateValue("ago_items_detail", deutConsumption, consumptionDelta);
                    }
                }
                else if ("212" === techID) {
                    let newTotalSatEnergy = AGO.Ogame.getProductionEnergy(techID, tech.level + AGO.Units.get("212"));
                    let thisSatEnergy = AGO.Ogame.getProductionEnergy(techID, tech.level);
                    AGO.Building.updateValue("ago_items_production", newTotalSatEnergy, thisSatEnergy);

                    let neededText, neededData;
                    if (0 > AGO.Units.get("energy")) {
                        let newTotalEnergy = Math.ceil(AGO.Units.get("energy") + AGO.Ogame.getProductionEnergy("212", tech.level));
                        let currentEnergy = Math.abs(AGO.Units.get("energy"));
                        AGO.Building.updateValue("ago_items_energy", currentEnergy, newTotalEnergy);

                        let neededSats = Math.ceil(Math.abs(AGO.Units.get("energy")) / AGO.Ogame.getProductionEnergy("212", 1));
                        neededText = "[" + AGO.Label.get("K072").toLowerCase() + ". " + neededSats + "]";
                        neededData = {type: "task", tab: "212", data: neededSats};
                    } else {
                        neededText = neededData = "";
                    }

                    AGO.Building.updateValue("ago_items_number", AGO.Building.Data[techID].level + AGO.Units.get(techID), neededText, neededData);
                }
                else if ("217" === techID) {
                    let energyConsumption = AGO.Uni.resourceBuggyEnergyConsumptionPerUnit * tech.level;
                    let newTotalEnergy = Math.ceil(AGO.Units.get("energy") - energyConsumption);
                    AGO.Building.updateValue("ago_items_energy", energyConsumption, newTotalEnergy);
                }
                else if (VAL.check(techID, "22", "23", "24")) {
                    // Current means currently shown level, not currently built level
                    let currentStorage = AGO.Ogame.getStorageCapacity(tech.current);
                    let difference = currentStorage - AGO.Ogame.getStorageCapacity(tech.difference);
                    AGO.Building.updateValue("ago_items_detail", currentStorage, difference);
                }
                else if ("42" === techID) {
                    let range = tech.current * tech.current;
                    let lower = AGO.Acc.system - range + 1;
                    lower = lower < 1 && AGO.Uni.donutSystem ? AGO.Uni.systems - Math.abs(lower) : Math.max(lower, 1);
                    lower = range > AGO.Uni.systems/2 && AGO.Uni.donutSystem ? 1 : lower;
                    let higher = AGO.Acc.system + range - 1;
                    higher = higher > AGO.Uni.systems && AGO.Uni.donutSystem ? higher - AGO.Uni.systems : Math.min(higher, AGO.Uni.systems);
                    higher = range > AGO.Uni.systems/2 && AGO.Uni.donutSystem ? AGO.Uni.systems : higher;
                    let rangeCoords = range ? "(" + AGO.Acc.galaxy + ":" + lower + " - " + AGO.Acc.galaxy + ":" + higher + ")" : "";
                    AGO.Building.updateValue("ago_items_detail", range, rangeCoords);
                }
                else if (200 < techID) {
                    if (techID in AGO.Item.Ship || AGO.Uni.defToTF && techID in AGO.Item.Defense) {
                        let fleet = {};
                        fleet[techID] = Math.max(AGO.Building.Data[techID].level, 1);

                        let debris = AGO.Ogame.getDebris(fleet, true);
                        let moonChance = "(" + Math.min(Math.floor(debris.total / 1E4) / 10, 20) + "%)";
                        AGO.Building.updateValue("ago_items_detail", debris.total, moonChance);
                    }
                    
                    let maxString, data = (maxString = DOM.getText("button.maximum", wrapper, 7)) ? {type: "task", tab: techID, data: NMR.parseIntAbs(maxString)} : null;
                    AGO.Building.updateValue("ago_items_number", AGO.Building.Data[techID].level + AGO.Units.get(techID), maxString, data);
                }

                let premiumButton;
                if (premiumButton = DOM.query("a.build-it_premium", wrapper)) {
                    DOM.before(premiumButton, DOM.append(null, "p", "premium_info"))
                }
            }
        } else {
            var a, b, c, d, e;
            a = document.getElementById("detail");
            c = AGO.Item.valid(DOM.getValue('input[name="type"]', a, 7));
            if (AGO.Building.enabled && a && c) {
                if (b = OBJ.create(AGO.Building.Task), delete AGO.Building.Task, b.id === c && (200 < c ? "level" in b && DOM.setValue("#number", a, b.level) : ("level" in b && (AGO.Building.Data[c].level = b.level
                        ), "increase" in
                        b && (AGO.Building.Data[c].increase = b.increase
                        ), "range" in b && (AGO.Building.Data[c].range = b.range
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
                    e = b.current * b.current;
                    let lower = AGO.Acc.system - e + 1;
                    lower = lower < 1 && AGO.Uni.donutSystem ? AGO.Uni.systems - Math.abs(lower) : Math.max(lower, 1);
                    lower = e > AGO.Uni.systems/2 ? 1 : lower;
                    let higher = AGO.Acc.system + e - 1;
                    higher = higher > AGO.Uni.systems && AGO.Uni.donutSystem ? higher - AGO.Uni.systems : Math.min(higher, AGO.Uni.systems);
                    higher = e > AGO.Uni.systems/2 ? AGO.Uni.systems : higher;
                    d = e ? "(" + AGO.Acc.galaxy + ":" + lower + " - " + AGO.Acc.galaxy + ":" + higher + ")" : "";
                    AGO.Building.updateValue("ago_items_detail", e, d);
                } else if (200 < c) {
                    if (c in AGO.Item.Ship || AGO.Uni.defToTF && c in AGO.Item.Defense) {
                        b = {}, b[c] = Math.max(AGO.Building.Data[c].level, 1), b = AGO.Ogame.getDebris(b, !0), d = "(" + Math.min(Math.floor(b.total / 1E4) / 10, 20) + "%)", AGO.Building.updateValue("ago_items_detail", b.total, d);
                    }
                    b = (d = DOM.getText("#maxlink", a, 7)
                    ) ? {type: "task", tab: c, data: NMR.parseIntAbs(d)} : null;
                    AGO.Building.updateValue("ago_items_number", AGO.Building.Data[c].level + AGO.Units.get(c), d, b)
                }
            }
        }
    },
    checkInput: function () {
        let number = (AGO.App.isVersion7 ? DOM.getValue("input#build_amount", null, 2) : DOM.getValue("#number", null, 2)) || 1;
        let type = AGO.App.isVersion7 ? DOM.query("#technologydetails").dataset.technology : DOM.getValue("input[name=type]");

        if (type) {
            let maxMet, maxCrys, maxDeut, maxUnits;
            maxMet = (AGO.Units.get("metal") || 1) / (AGO.Item[type].metal || 0);
            maxCrys = (AGO.Units.get("crystal") || 1) / (AGO.Item[type].crystal || 0);
            maxDeut = (AGO.Units.get("deuterium") || 1) / (AGO.Item[type].deuterium || 0);
            maxUnits = Math.floor(Math.min(Math.min(maxMet, maxCrys), maxDeut));

            if (number > 0 && number * 10 <= maxUnits) {
                if (!DOM.query("#build-x10")) AGO.Building.addButton();
            } else if (DOM.query("#build-x10")) {
                AGO.Building.removeButton();
            }
        }
    },
    addButton: function () {
        let docFrag = document.createDocumentFragment();
        let buildButton = DOM.appendA(docFrag, {class: "build-it", id: "build-x10"}, null, {iteration: 0});
        DOM.appendSPAN(buildButton, null, "x10");
        DOM.after(AGO.App.isVersion7 ? DOM.query("button.upgrade") : DOM.query(".build-it"), docFrag);
        DOM.addEvents("#build-x10", null, {
            click: function doBuild() {
                DOM.query("#build-x10").removeEventListener("click", doBuild);
                let number = AGO.App.isVersion7 ? DOM.getValue("input#build_amount", null, 2) : DOM.getValue("#number", null, 2);
                let type = DOM.getValue("input[name=type]");
                let token = DOM.getValue("input[name=token]");

                AGO.Building.doBuild(number, type, token);
            }
        });
    },
    removeButton: function () {
        let x10Button = DOM.query("#build-x10");
        if (x10Button) x10Button.remove();
    },
    doBuild: function (number, type, token) {
        let iteration = DOM.getData("#build-x10").iteration;
        DOM.setText("#build-x10 span", null, iteration + "/10");

        let stopBuild = false;
        DOM.addEvents("#build-x10", null, {
            click: function () {
                stopBuild = true;
            }
        });

        let request = new XMLHttpRequest();
        request.open('POST', AGO.Uni.url + '/game/index.php?page=' + AGO.App.page + '&deprecated=1', true);
        request.responseType = "document";
        request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        request.onload = function () {
            iteration++;
            DOM.setData("#build-x10", null, {iteration: iteration});
            DOM.setText("#build-x10 span", null, iteration + "/10");

            let token = DOM.getValue("input[name=token]", request.responseXML);
            if (iteration < 10 && !stopBuild) {
                AGO.Building.doBuild(number, type, token);
            } else {
                setTimeout(function () {
                    DOM.setText("#build-x10 span", null, "OK");
                    document.location.reload();
                }, 500);
            }
        };
        request.onerror = function () {
            DOM.setStyleColor("#build-x10 span", null, "#ff0000");
        };
        request.send("token=" + token + "&modus=1&type=" + type + "&menge=" + number);
    },
    updateSummary: function (a) {
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
                ), DOM.appendSPAN(h, "ago_items_resource_value", Math.ceil(m / AGO.Ogame.getShipCapacity(p)),
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
                        DOM.appendSPAN(h, "ago_items_resource_value", Math.ceil(m / AGO.Ogame.getShipCapacity(a)), 3)
                    }
                )
            ), DOM.replaceChildren(c, d), c = d = e = g = h = null
        }
    },
    updateValue: function (a, b, c, d) {
        if (a = document.getElementById(a)) {
            "string" === typeof b ? DOM.updateTextChild(a, null, b) : DOM.updateTextChild(a, null, b || "0", b ? 4 : 0);
            d && DOM.setData(a, null, d);
            if ("string" === typeof c) {
                DOM.updateText("span", a, c)
            } else {
                b = c ? (0 < c ? "(+" : "(") + STR.formatNumber(Math.ceil(c), !0) + ")" : "(0)";
                (b = DOM.updateText("span", a, b)) && DOM.updateClass(b, null, HTML.classStatus(c))
            }
        }
    },
    Action: function (a) {
        if (OBJ.is(a) && AGO.Item.valid(a.id)) {
            let b = AGO.App.isVersion7 ? DOM.query('#technologydetails').dataset.technologyId : DOM.getValue('#planet input[name="type"]', null, 7);
            AGO.Building.Task = a;

            if (b === a.id)
                AGO.Building.Display();
            else
                AGO.App.isVersion7 ? DOM.click('#technologies li.technology[data-technology="' + a.id + '"] .icon') : DOM.click('#buttonz a.detail_button[ref="' + a.id + '"]');
        }
    }, clickTooltip: function (a) {
        a && a.target && (a = DOM.getData(a.target, null, 2), a.option && (AGO.Option.set(a.option, a.data, 2), AGO.Global.message({role: "hideAll"}), AGO.Building.Display()
            )
        )
    },
    clickInfo: function (e) {
        if (e && e.target) {
            let data = DOM.getData(e.target, null, 2);
            "task" === data.type && AGO.Building.Action({id: data.tab, level: +data.data});
        }
    },
    clickSummary: function (a) {
        if (AGO.App.isVersion7) {
            var b, c;
            if (a && a.target) {
                c = DOM.query('#technologydetails').dataset.technologyId;
                a = DOM.getData(a.target, null, 2);
                OBJ.is(a.message) && AGO.Init.Messages(a.message.page, a.message.role, a.message.data);
                if ("setting" === a.type) {
                    AGO.Option.set(a.data, AGO.Option.is(a.data) ? 0 : 1, 1);
                    AGO.Building.Display();
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
                        ), DOM.setValue("#build_amount", null, AGO.Building.Data[c].level, 8);
                    }
                    AGO.Building.Display()
                }
            }
        } else {
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
                    ), DOM.appendSPAN(g, {
                        id: "ago_construction_" + c,
                        "class": "ago_construction_finishtime"
                    }, "\u2009")
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
                            let nextLevelRes = Math.floor(AGO.Item[b][f] * Math.pow(AGO.Item[b].factor, h - 1));
                            a[f] += "124" === b ? Math.round(nextLevelRes / 100) * 100 : nextLevelRes;
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
    },
    Ready: function () {
        DOM.addObserver(DOM.query("#inhalt"), {childList: true}, function (mutations) {
            for (let i = 0; i < mutations.length; i++) {
                let mutation = mutations[i];
                if (mutation.target.id && mutation.target.id === "inhalt" && mutation.addedNodes && mutation.addedNodes.length) {
                    OBJ.iterate(mutation.addedNodes, function (node) {
                        if (mutation.addedNodes[node].id === "div_traderImportExport") AGO.Trader.onImportExport();
                    });
                }
            }
        });
    },
    onImportExport: function () {
        DOM.addObserver(DOM.query("#div_traderImportExport .bargain_text"), {
            childList: true,
            characterData: true
        }, function () {
            AGO.Trader.checkImportExportState();
        });

        AGO.Trader.checkImportExportState();
    },
    checkImportExportState: function (node, callback) {
        node = node ? node : document;
        if (DOM.query("#div_traderImportExport .bargain_text", node).textContent !== "" && DOM.query("#div_traderImportExport .bargain.import_bargain.take", node).classList.contains("hidden")) {
            AGO.Trader.updateNextItem(DOM.query("#div_traderImportExport .bargain_text", node).textContent, callback);
        } else {
            AGO.Option.set("nextItem", -1);
        }
    },
    updateNextItem: function (bargainText, callback) {
        if (!bargainText) {
            let req = new XMLHttpRequest;
            req.open("POST", "https://" + AGO.Uni.domain + "/game/index.php?page=traderOverview", true);
            req.responseType = "document";
            req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            req.onerror = req.onload = function () {
                if (200 === +req.status && req.responseXML) {
                    AGO.Trader.checkImportExportState(req.responseXML, callback);
                    -1 === AGO.Option.get("nextItem", 0) && "function" === typeof callback && callback(1);
                }
            };
            req.send("show=importexport&ajax=1");

            return;
        }

        let nextItem;
        if (nextItem = bargainText.match(/\d+:\d+/)) {
            nextItem = nextItem[0] + ":00";
        } else {
            nextItem = "00:00:00";
        }

        let ogameTime = AGO.Time.parseDateTime(AGO.Time.formatTimestamp(AGO.Time.ogameTime / 1000));
        let day = ogameTime.getDate();
        let month = ogameTime.getMonth() + 1;
        let year = ogameTime.getFullYear();

        if (nextItem === "00:00:00") day++;

        let dateString = day + "." + month + "." + year + " " + nextItem;
        AGO.Option.set("nextItem", AGO.Time.parseDateTime(dateString).getTime());

        "function" === typeof callback && callback(0);
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