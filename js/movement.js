AGO.Movement = {
    Messages: function (b, a) {
        AGO.dummy = b + a
    }, Read: function () {
        var b;
        (b = document.getElementById("inhalt")
        ) && (b = b.querySelector(".fleetStatus")
        ) && AGO.Fleet.Set("Current", {
                               fleets: DOM.getText(".fleetSlots .current", b, 3),
                               fleetsSlots: DOM.getText(".fleetSlots .all", b, 3),
                               expos: DOM.getText(".expSlots .current", b, 3),
                               exposSlots: DOM.getText(".expSlots .all", b, 3)
                           }
        );
        PAGE.routine = AGO.Fleet.Get("Current", "Routine");
        AGO.Fleet.Set("Current", "Routine", "");
    }, Run: function () {
        AGO.Option.is("E10") && !AGO.App.OgameMobile &&
        (AGO.Movement.enabled = !0, AGO.Movement.improve = AGO.Option.is("E11"), AGO.Movement.Show()
        )
    }, onKeydown: function (b) {
        return 13 === b.keyCode && AGO.Option.is("E14") ? (5 === PAGE.routine || 6 === PAGE.routine ? AGO.Init.Messages("Planets", "Action", {
                                                                                                                            scroll: "down",
                                                                                                                            type: AGO.Acc.type
                                                                                                                        }
        ) : DOM.click('#menuTable .menubutton[href*="page=fleet1"]'), !1
        ) : !0
    }, onSwipe: function (b) {
        "right" === b && DOM.click('#menuTable .menubutton[href*="page=fleet1"]')
    }, Show: function () {
        var b, a, c, d, f, g, h, e;
        if (b = document.getElementById("inhalt")) {
            d = 0;
            a =
            b.querySelectorAll('.fleetDetails[id^="fleet"]');
            for (e = 0; e < a.length; e++) {
                if (c = NMR.parseIntAbs(a[e].id), f = +a[e].getAttribute("data-arrival-time") || 0, g = +a[e].getAttribute("data-mission-type") || 0, h = "true" === a[e].getAttribute("data-return-flight"), c && f && g) {
                    d = Math.max(c, d);
                    AGO.Movement.expandFleet(a[e], c, g, h);
                    AGO.Movement.addReversalTimeBox(a[e], c, g, h);
                    if (f = DOM.getAttribute(".destinationCoords", a[e], "title")) {
                        c = DOM.appendSPAN(null, "ago_movement_targetName", f), DOM.after(a[e].querySelector(".mission"), c);
                    }
                    if (c = a[e].querySelector(".absTime")) {
                        f = (c.textContent || ""
                        ).split(" ")[0], c.textContent = AGO.Time.convertLocal(f, "[H]:[i]:[s]");
                    }
                    if (c = a[e].querySelector(".nextabsTime")) {
                        f = (c.textContent || ""
                        ).split(" ")[0], c.textContent = AGO.Time.convertLocal(f, "[H]:[i]:[s]");
                    }
                    2 === g && a[e].querySelector("span.fedAttack") && DOM.setAttribute(".reversal .icon_link img", a[e], "src", HTML.urlImage("icon_return_red.png"))
                }
            }
            d && (c = b.querySelector(".fleetDetails#fleet" + d)
            ) && "true" !== c.getAttribute("data-return-flight") && (a = c.querySelector(".originData figure.moon") ?
                                                                         3 : 1, DOM.setAttribute(c, null, "ago-movement-last", a), b = b.querySelector(".fleetStatus .fleetSlots")
            ) && (c = DOM.appendSPAN(null, "ago_movement_recall"), a = AGO.Option.is("E13") ? "" : "ago_movement_recall_active", a = DOM.appendA(c, a, {
                                                                                                                                                     click: AGO.Movement.clickRecallLast,
                                                                                                                                                     mouseover: AGO.Movement.changeRecallLast,
                                                                                                                                                     mouseout: AGO.Movement.changeRecallLast
                                                                                                                                                 }
            ), DOM.appendSPAN(a, "icon icon_recall"), DOM.appendSPAN(a, "", " " + AGO.Label.get("E17")), DOM.after(b, c)
            );
            if (1 < AGO.Time.status && (b = document.querySelectorAll("#inhalt .reversal .tooltipHTML, #inhalt .starStreak .tooltipHTML")
                ) &&
                b.length) {
                for (c = 0; c < b.length; c++) {
                    a = (b[c].getAttribute("title") || ""
                    ).split("|"), a[1] && (a[1] = AGO.Time.convertLocal(a[1].replace(/<br>/g, " ").trim()), b[c].setAttribute("title", a[0] + "| " + a[1])
                    );
                }
            }
            window.setInterval(AGO.Movement.updateReversalClock, 200)
        }
    }, addReversalTimeBox: function (b, a, c, d) {
        if (d) {
            DOM.setAttribute(b, null, "ago_events_reverse", 1);
        } else if (a = DOM.getAttribute(".starStreak .origin img", b, "title"), a = a.split("|"), a[1] && (a = AGO.Time.parse(a[1].replace(/<br>/g, " ").trim())
            )) {
            a.setTime(a.getTime() + AGO.Time.timeZoneDelta),
                DOM.appendSPAN(b, {
                                   "class": "ago_movement_reversalTime",
                                   title: a.getTime()
                               }
                ), AGO.Movement.updateReversalClock()
        }
    }, updateReversalClock: function () {
        var b, a, c, d;
        b = document.querySelectorAll("#inhalt .ago_movement_reversalTime");
        for (d = 0; d < b.length; d++) {
            if (a = DOM.getAttribute(b[d], null, "title", 2)) {
                c = new Date, c.setTime(2 * (c.getTime() - AGO.Time.localTimeDelta
                                        ) - a - AGO.Time.timeZoneDelta
                ), DOM.updateText(b[d], null, AGO.Time.format(c))
            }
        }
    }, expandFleet: function (b, a, c, d) {
        var f;
        if (AGO.Movement.improve && (a = AGO.Movement.getDetails(document.getElementById("bl" +
                                                                                         a
                                                                 )
            )
            )) {
            f = DOM.appendDIV(null, "ago_movement_details " + HTML.classMission(c));
            f.innerHTML = a.ships + "<br/><br/>" + a.cargo;
            if (c = b.querySelector(".starStreak .route")) {
                DOM.setStyleDisplay(c), DOM.before(c, f);
            }
            (c = DOM.getText(".mission", b, 7)
            ) && d && (c += b.querySelector(".nextMission") ? " (" + c.charAt(0) + ")" : " (" + AGO.Label.get("E18") + ")", DOM.setText(".mission", b, c)
            );
            d = 11 * (Math.ceil((a.ships + a.cargo
                                ).length / 50
            ) + 1
            ) - 32;
            0 < d && (AGO.Styles.set("#" + b.id + ".fleetDetails.detailsOpened { height: " + (74 + d
                                     ) + "px; }"
            ), AGO.Styles.set("#" +
                              b.id + ".fleetDetails.detailsOpened .starStreak{ height: " + (50 + d
                              ) + "px; }"
            )
            )
        }
    }, getDetails: function (b) {
        if (b) {
            var a = {ships: "", cargo: ""}, c = "";
            b = b.getElementsByTagName("td");
            for (var d = 0; d < b.length; d++) {
                "2" === b[d].colSpan ? (a.ships = c, c = ""
                ) : ("value" !== b[d].className && "" !== c && (c += " "
                ), c += b[d].innerHTML
                );
            }
            a.cargo = c;
            a.ships = STR.check(a.ships).replace(/ {2}/g, "");
            a.cargo = STR.check(a.cargo).replace(/ {2}/g, "");
            return a
        }
        return null
    }, changeRecallLast: function (b) {
        var a;
        b && b.currentTarget && AGO.Option.is("E13") && (a = b.currentTarget.querySelector("span:nth-child(2)"),
            "mouseover" === b.type ? AGO.Movement.recallTimeout = window.setTimeout(function () {
                                                                                        a && AGO.Movement.recallTimeout && DOM.updateClass(a.parentNode, null, "ago_movement_recall_active")
                                                                                    }, 800
            ) : (window.clearTimeout(AGO.Movement.recallTimeout), DOM.updateClass(a.parentNode), AGO.Movement.recallTimeout = null
            )
        )
    }, clickRecallLast: function (b) {
        b && b.currentTarget && "ago_movement_recall_active" === b.currentTarget.className && DOM.click("#inhalt > .fleetDetails[ago-movement-last] .reversal > .icon_link")
    }
};