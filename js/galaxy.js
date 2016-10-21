AGO.Galaxy = {
    status: 0, enabled: !1, improve: !1, direction: 1, Data: {}, Task: {}, Messages: function (a, b) {
        "Action" === a ? AGO.Galaxy.Action(b) : "Display" === a ? AGO.Galaxy.Display(b) : "sendShips" === a && AGO.Galaxy.sendShips(b)
    }, Run: function () {
        AGO.Option.is("G40") && !AGO.App.OgameMobile && (AGO.Galaxy.enabled = !0, AGO.Galaxy.improve = AGO.Option.is("G41"), AGO.Galaxy.shrink = AGO.Option.get("G42", 2), AGO.Galaxy.status = 5, AGO.Galaxy.Show(), document.getElementById("galaxytable") && AGO.Galaxy.Content()
        )
    }, onKeydown: function (a) {
        if (document.activeElement.tagName in {'TEXTAREA':1, 'INPUT':1}) return;
        // Enter key pressed
        if (a.keyCode === 13 && !a.cached) {
            AGO.Galaxy.direction = 0;
            (a.inputType === 12) && document.activeElement.blur();
            DOM.click("#galaxyHeader .btn_blue[onclick=\"submitForm();\"]");
            return false;
        }

        if (a.inputType !== 12 && !a.cached) {
            // Space key pressed
            if (a.keyCode === 32 && AGO.Option.is("U33")) {
                if (AGO.Galaxy.direction === -2) { // prev gala
                    DOM.click(DOM.query("#galaxyHeader #galaxy_input").previousElementSibling);
                } else if (AGO.Galaxy.direction === -1) { // prev sys
                    DOM.click(DOM.query("#galaxyHeader #system_input").previousElementSibling);
                } else if (AGO.Galaxy.direction === 1) { // next sys
                    DOM.click(DOM.query("#galaxyHeader #system_input").nextElementSibling);
                } else if (AGO.Galaxy.direction === 2) { // next gala
                    DOM.click(DOM.query("#galaxyHeader #galaxy_input").nextElementSibling);
                } else { // reload
                    DOM.click("#galaxyHeader .btn_blue[onclick=\"submitForm();\"]");
                }
                return false;
            }

            // one of the Arrow keys pressed
            // remember navigation direction to use with Space key
            (a.keyCode === 40) && (AGO.Galaxy.direction = -2); // down (prev gala)
            (a.keyCode === 37) && (AGO.Galaxy.direction = -1); // left (prev sys)
            (a.keyCode === 39) && (AGO.Galaxy.direction = 1);  // right (next sys)
            (a.keyCode === 38) && (AGO.Galaxy.direction = 2);  // up (next gala)

            // a or d key pressed
            if (a.keyCode === 65) {
                AGO.Galaxy.direction = -2;
                DOM.click(DOM.query("#galaxyHeader #galaxy_input").previousElementSibling);
                return false;
            }
            if (a.keyCode === 68) {
                AGO.Galaxy.direction = 2;
                DOM.click(DOM.query("#galaxyHeader #galaxy_input").nextElementSibling);
                return false;
            }
            
            // q or e key pressed
            if (a.keyCode === 81) {
                AGO.Galaxy.direction = -1;
                DOM.click(DOM.query("#galaxyHeader #system_input").previousElementSibling);
                return false;
            }
            if (a.keyCode === 69) {
                AGO.Galaxy.direction = 1;
                DOM.click(DOM.query("#galaxyHeader #system_input").nextElementSibling);
                return false;
            }
        }

        return true;
    }, onSwipe: function (a) {
        AGO.App.OgameMobile || ("left" === a && DOM.click(".galaxy_icons.solarsystem.tooltip + .prev"), "right" === a && DOM.click("#system_input + .next")
        )
    }, Show: function () {
        var a;
        AGO.Galaxy.shrink && DOM.extendClass("inhalt", "id", "ago_shrink ago_shrink_" + AGO.Galaxy.shrink);
        if (a = STR.splitParameter(document.location.search)) {
            a.galaxy && (AGO.Galaxy.Task.galaxy = +a.galaxy || 0
            ), a.system && (AGO.Galaxy.Task.system = +a.system || 0
            ), a.position &&
               (AGO.Galaxy.Task.position = +a.position || 0
               ), a.planet && (AGO.Galaxy.Task.position = +a.planet || 0
            );
        }
        AGO.Task.updateCoords(AGO.Galaxy.Task, 1);

        var galaxyInput = DOM.query("#galaxyHeader #galaxy_input"), systemInput = DOM.query("#galaxyHeader #system_input");
        DOM.addEventsAll([ galaxyInput.previousElementSibling, galaxyInput.nextElementSibling, systemInput.previousElementSibling, systemInput.nextElementSibling ], null, { click: AGO.Galaxy.clickArrow });

        DOM.addEvents("galaxyContent", "id", {click: AGO.Galaxy.click})
    }, Content: function () {
        var a, b, d, h;
        a = document.getElementById("galaxytable");
        if (AGO.Galaxy.status && a && DOM.updateAttribute(a, null, "ago-status", 1, 8)) {
            b = DOM.getAttribute(a, null, "data-galaxy",
                                 2
            );
            d = DOM.getAttribute(a, null, "data-system", 2);
            AGO.Galaxy.sameSystem = b === AGO.Galaxy.Data.galaxy && d === AGO.Galaxy.Data.system;
            AGO.Galaxy.Data = {galaxy: b, system: d, Row: []};
            AGO.Galaxy.behave = AGO.Option.is("G51") || AGO.Init.mobile ? AGO.Option.is("G52") ? 3 : AGO.isMobile ? 2 : 1 : 0;
            AGO.Galaxy.behave && (3 === AGO.Galaxy.behave && DOM.extendClass(a, null, "ago_galaxy_espionage"), b = {
                update: "reload",
                setting: {id: "G52", mode: "toggle"}
            }, DOM.setData('th.first', a, b), DOM.setData("th.text_moon", a, b), (b = 3 === AGO.Galaxy.behave ? "#008000" :
                                                                                             2 === AGO.Galaxy.behave ? "#656977" : ""
                                                                                        ) && DOM.updateStyle('th.first', a, "color", b), DOM.updateStyle("th.text_moon", a, "color", b)
            );
            b = DOM.getText("#slotValue", a, 7).split("/");
            +b[1] && (AGO.Fleet.Set("Current", {
                                        fleets:      +b[0] || 0,
                                        fleetsSlots: +b[1] || 0
                                    }
            ), AGO.Init.Messages("Panel", "updateTab", {tab: "Flights"})
            );
            if (AGO.Galaxy.improve) {
                for (b = a.querySelectorAll("#galaxyheadbg2 th"), DOM.removeClass(b[0], null, "first"), DOM.addClass(b[1], null, "first"), DOM.updateStyle(b[0], null, "width", "55px"), DOM.updateStyle(b[1], null,
                                                                                                                                "width", "145px"
                ), DOM.updateStyle(b[3], null, "width", "15px"), DOM.updateStyle(b[3], null, "text-align", "left"),  DOM.updateStyle(b[4], null, "width", "160px"), DOM.before(b[0], b[1]), b = a.querySelectorAll(".row"), h = 0; h < b.length; h++) {
                    d = b[h], DOM.hasChildren(d) && (DOM.before(d.children[1], d.children[2]), DOM.before(d.children[5], d.children[4])
                    );
                }
            }
            AGO.Galaxy.showRows(a.querySelectorAll(".row"));
            AGO.Galaxy.showHighlight(a.querySelectorAll(".row"));
            DOM.updateAttribute(a, null, "ago-loaded", 1, 8);
            AGO.Galaxy.updateDataBase()
        }
    }, showRows: function (a) {
        var b, d, h, e, g, p, m, f, n, k, l, c, s, q, t, r;
        s = AGO.Option.get("G45", 2);
        t = AGO.Option.is("G58");
        for (r = 0; r < a.length; r++) {
            c =
            {position: r + 1};
            c.coords = AGO.Galaxy.Data.galaxy + ":" + AGO.Galaxy.Data.system + ":" + c.position;
            c.owncoords = AGO.Planets.owncoords(c.coords, 1);
            c.coordsActive = AGO.Task.cutCoords(AGO.Panel.GetActive("Target", "coords", 6));
            c.coordsCurrent = AGO.Galaxy.Task.coords;
            AGO.Galaxy.Data.Row[c.position] = c;
            m = p = g = e = h = d = b = void 0;
            DOM.iterateChildren(a[r], function (a) {
                                    var c = a.className || "";
                                    HTML.hasClass(c, "allytag") ? b = a : HTML.hasClass(c, "playername") ? d = a : HTML.hasClass(c, "microplanet") ? h = a : HTML.hasClass(c, "moon") ? e = a : HTML.hasClass(c,
                                                                                                                                                                                                              "debris"
                                    ) ? g = a : HTML.hasClass(c, "position") ? p = a : HTML.hasClass(c, "planetname") && (m = a
                                    )
                                }
            );
            b && (f = b.querySelector(".allytagwrapper"),
			q = DOM.getAttribute(f, null, "rel"), 
			c.allianceId = STR.check(NMR.parseIntFormat(q)), 
			f && c.allianceId && (c.allianceTag = DOM.getTextChild(f, null, 7), 
			c.allianceTag.length > 7 ? DOM.setText(f.childNodes[0], null, c.allianceTag.slice(0, -3) + "...") : !1,
			c.allianceOwn = HTML.hasClass(f.className, "status_abbr_ally_own") ? 41 : 0, 
			c.allianceColor = AGO.Token.getClass(AGO.Galaxy.getToken("Alliance", c.allianceId) || c.allianceOwn), 
			c.allianceColor && DOM.addClass(b, null, c.allianceColor), 
			n = f.querySelector(".htmlTooltip"),
            k = f.querySelector(".htmlTooltip .ListLinks"), 
			n && k && (c.allianceName = DOM.getText("h1", n, 7), 
			c.allianceRank = DOM.getText(".rank a", k, 2), 
			c.allianceMember = DOM.getText(".members", k, 2), 
			l = {
                tab: "Alliance",
                id: c.allianceId,
                name: c.allianceName,
                tag: c.allianceTag
            }, 
			DOM.setData(k, null, l), 
			AGO.Option.is("G44") && (k = DOM.appendA(null, {
                                                                                     "class": "ago_galaxy_rank",
                                                                                     href: DOM.getAttribute(".rank a", k, "href")
                                                                                 }
            ), l = ("ago_galaxy_rank " + c.allianceColor
            ).trim(), DOM.appendSPAN(k, l, c.allianceRank + "/" + c.allianceMember), DOM.appendChild(b,
                                                                                                     k
            )
            ), t || (DOM.setAttribute(f, null, "rel", q + String.fromCharCode(65 + c.position)), DOM.setAttribute(n, null, "id", q + String.fromCharCode(65 + c.position))
            )
            )
            )
            );
            d && !c.owncoords && (f = d.querySelector("a.tooltipRel"), q = DOM.getAttribute(f, null, "rel"), c.playerId = STR.check(NMR.parseIntFormat(q)), f && c.playerId && (c.playerBuddy = DOM.hasClass(p, null, "status_abbr_buddy") ? 51 : 0, c.playerColor = AGO.Token.getClass(AGO.Galaxy.getToken("Player", c.playerId) || c.playerBuddy) || c.allianceColor, c.playerStatus = AGO.Token.getPlayerStatus(".status > span",
                                                                                                                                                                                                                                                                                                                                                                                                                   d
            ) || 21, n = d.querySelector(".htmlTooltip"), k = d.querySelector(".htmlTooltip .ListLinks"), n && k && (c.playerName = DOM.getText("h1 span", n, 7), c.playerRank = DOM.getText(".rank a", k, 2), l = {
                message: {
                    page: "Token",
                    role: "Action",
                    data: {action: "set", tab: "Player", token: 81, id: c.playerId, name: c.playerName}
                }
            }, DOM.setData(f, null, l), l = {
                tab: "Player",
                id: c.playerId,
                name: c.playerName
            }, DOM.setData(k, null, l), AGO.Option.is("G43") && (k = DOM.appendA(null, {
                                                                                     "class": "ago_galaxy_rank",
                                                                                     href: DOM.getAttribute(".rank a", k, "href")
                                                                                 }
            ), l = ("ago_galaxy_rank " +
                    c.playerColor
            ).trim(), l = DOM.appendSPAN(k, l, 1E4 <= c.playerRank ? "10 k" : c.playerRank), DOM.appendChild(d, k)
            ), t || (DOM.setAttribute(f, null, "rel", q + String.fromCharCode(65 + c.position)), DOM.setAttribute(n, null, "id", q + String.fromCharCode(65 + c.position))
            )
            )
            )
            );
            q = 2 !== AGO.Galaxy.behave && !c.allianceOwn && !c.playerBuddy && VAL.check(c.playerStatus, 21, 22, 23, 26, 27, 28);
            h && (c.planetId = DOM.getAttribute(h, null, "data-planet-id", 7), c.planetId && (n = h.querySelector(".htmlTooltip"), k = h.querySelector(".htmlTooltip .ListLinks"),
            n && k && (c.planetName = DOM.getText("h1 span", n, 7), h.querySelector(".activity") && (c.planetActivity = DOM.getText(k.firstElementChild, null, 2) || 1
            )
            ), c.owncoords || (l = {
                tab: "Target",
                id: c.planetId,
                name: c.playerName,
                coords: c.coords + ":1"
            }, DOM.setData(k, null, l), q && (3 === AGO.Galaxy.behave && DOM.extendClass(h, null, "ago_galaxy_espionage")
            )
            )
            )
            );
            e && (c.moonId = DOM.getAttribute(e, null, "data-moon-id", 7), c.moonId && (n = e.querySelector(".htmlTooltip"),
                k = e.querySelector(".htmlTooltip .ListLinks"), n && k && (c.moonName = DOM.getText("h1 span", n, 7), e.querySelector(".activity") && (c.moonActivity = DOM.getText(k.firstElementChild, null, 2) || 1
            )
            ), c.owncoords || (l = {
                tab: "Target",
                id: c.planetId,
                name: c.playerName,
                coords: c.coords + ":3"
            }, DOM.setData(k, null, l), q && 3 === AGO.Galaxy.behave && DOM.extendClass(e, null, "ago_galaxy_espionage"), (f = e.querySelector("a[onclick]"), q && (n = DOM.getAttribute(f, null, "onclick", 7).split(");").join(",0,this);"), DOM.setAttribute(e,
                                                                                                                                                                                                                                                                                              null, "onclick", n
            )
            ), DOM.removeAttribute(f, null, "onclick")
            )
            )
            )
            );
            if (g && (l = g.querySelectorAll(".debris-content"), c.debrisMetal = DOM.getText(l[0], null, 2), c.debrisCrystal = DOM.getText(l[1], null, 2), c.debrisResources = c.debrisMetal + c.debrisCrystal, c.debrisResources
                )) {
                c.highlightDebris = NMR.isGreater(c.debrisResources, AGO.Token.getLimit(95)) ? 95 : NMR.isGreater(c.debrisResources, AGO.Token.getLimit(94)) ? 94 : 0;
                if (f = g.querySelector("a.tooltipRel div")) {
                    1 === s ? (n = Math.max(2 + 3 * (c.debrisResources + ""
                                            ).length - AGO.Galaxy.shrink,
                                            14
                    ), n = Math.min(n, [30, 28, 26, 24][AGO.Galaxy.shrink]), DOM.set(f, null, {
																						 style: "width: " + n + "px; height: " + n + "px; background-size: " + n + "px;"
                                                                                     }
                    ), c.highlightDebris && DOM.set(f, null, {src: HTML.urlImage("galaxy_debris.gif")})
                    ) : 1 < s && (l = ("ago_galaxy_debris " + AGO.Token.getClass(c.highlightDebris)
                    ).trim(), k = DOM.appendDIV(null, l), l = c.highlightDebris ? "ago_text_background" : "", l = DOM.appendSPAN(k, l), l.innerHTML = (3 !== s || AGO.Galaxy.sameSystem ? STR.formatNumber(c.debrisMetal) : STR.shortNumber(c.debrisMetal, 0)
                                                                                                                                                      ) + "<br/>" + (3 !== s || AGO.Galaxy.sameSystem ? STR.formatNumber(c.debrisCrystal) :
                                                                                                                                                                     STR.shortNumber(c.debrisCrystal, 0)
                                                                                                                                                      ), DOM.appendChild(f, k), DOM.set(f, null, {style: "background: inherit;"}), AGO.Galaxy.improve && DOM.addClass(g, null, "ago_galaxy_debris_shadow")
                    );
                }
                c.owncoords || (l = {
                    tab: "Target",
                    id: c.planetId,
                    name: c.playerName,
                    coords: c.coords + ":2"
                }, DOM.setData(".htmlTooltip .ListLinks", g, l)
                )
            }
            c.planetId && (DOM.addClass(a[r], null, "ago_galaxy_row"), c.positionColor = AGO.Token.getClass(AGO.Galaxy.getToken("Target", c.planetId)) || c.playerColor, c.positionColor && DOM.addClass(p, null, c.positionColor), m && (c.positionColor ?
                                                                                                                                                                                                                                          (DOM.addClass(m, null, c.positionColor), DOM.addClass("a", m, c.positionColor), DOM.addClass("span", m, c.positionColor)
                                                                                                                                                                                                                                          ) : AGO.Option.is("CT0") && DOM.addClass("a", m, "ago_color_bright")
            )
            )
        }
        f = k = l = f = null
    }, updateDataBase: function () {
        var a, b, d;
        b = {Player: {}, Planet: {}};
        for (d = 1; d < AGO.Galaxy.Data.Row.length; d++) {
            a = AGO.Galaxy.Data.Row[d], a.playerId ? (b.Player[a.playerId] = {
                I: +a.playerId,
                N: a.playerName,
                s: a.playerStatus
            }, a.allianceId && (b.Player[a.playerId].aI = +a.allianceId
            ), b.Planet[a.coords] = a.moonId ? {
                I: +a.playerId, pI: +a.planetId,
                pN: a.planetName, c: a.coords, mI: +a.moonId, mN: a.moonName
            } : {I: +a.playerId, pI: +a.planetId, pN: a.planetName, c: a.coords}
            ) : b.Planet[a.coords] = null;
        }
        AGB.message("DataBase", "Set", {keyUni: AGO.App.keyUni, data: b})
    }, Display: function (a) {
        var b;
      if (b = document.getElementById("galaxyHeader")) {
            a && "update" === a.update ? (a = b.querySelectorAll(".row"), AGO.Galaxy.showHighlight(a, "update")
            ) : DOM.click("#galaxyHeader .btn_blue")
        }
    }, showHighlight: function (a, b) {
        function d(a, b, d, c) {
            d && ("string" === typeof d ? (DOM.addClass(a, b, "ago_highlight"),
                DOM.updateStyle(a, b, "backgroundColor", d)
            ) : c || DOM.updateStyle(a, b, "opacity", d)
            )
        }

        function h(a, b) {
            DOM.updateStyle(a, b, "backgroundColor", "inherit");
            DOM.updateStyle(a, b, "opacity", "inherit");
            DOM.removeClass(a, b, "ago_highlight")
        }

        var e, g, p, m, f;
        m = AGO.Task.cutCoords(AGO.Panel.GetActive("Target", "coords", 6));
        f = AGO.Galaxy.Task.coords;
        if (OBJ.is(a) && OBJ.is(AGO.Galaxy.Data.Row)) {
            for (p = 0; p < a.length; p++) {
                if (e = AGO.Galaxy.Data.Row[p + 1], e.planetId || e.debrisResources) {
                    b && (h(a[p], null), DOM.setClassGroup(a[p], null, "ago_selected")
                    ),
                    (g = (g = !e.coords || e.coords !== m && e.coords !== f ? e.playerId && e.playerId === AGO.Panel.GetActive("Player", "id", 6) ? "SB" : "" : "SA"
                         ) && AGO.Token.getColor(g) ? g : ""
                    ) && DOM.extendClass(a[p], null, AGO.Token.getClassSelected(g)), e = AGO.Token.getColorOpacity(AGO.Galaxy.highlight(e)), d(a[p], null, e, g)
                }
            }
        }
    }, highlight: function (a) {
        function b(a, b, d, p) {
            var m, f;
            if (m = AGO.Token.getCondition(b)) {
                f = AGO.Token.getLimit(b), f = 1 === m && !p || 2 === m && NMR.isLesser(a.allianceRank, f) || 5 === m && "Player" === d || 6 === m && NMR.isLesser(a.playerRank, f) || 10 === m &&
                                                                                                                                                                                       "Target" === d || 13 === m && NMR.isGreater(a.debrisResources, f) || 16 === m && (NMR.isLesser(a.planetActivity, f) || NMR.isLesser(a.moonActivity, f)
                );
            }
            return f ? b : 0
        }

        var d;
        OBJ.is(a) && (AGO.Option.is("CE0") && (d = b(a, 99, "", !0) || b(a, 96, "", !0) || b(a, 98, "", !a.planetActivity && !a.moonActivity) || b(a, 97, "", !a.planetActivity && !a.moonActivity) || b(a, 95, "", !a.debrisResources) || b(a, 94, "", !a.debrisResources) || 0
        ), !d && AGO.Option.is("CT0") && (d = b(a, AGO.Galaxy.getToken("Target", a.planetId), "Target") || b(a, AGO.Galaxy.getToken("Player", a.playerId),
                                                                                                             "Player"
        ) || b(a, a.playerBuddy, "Player") || b(a, a.playerStatus, "Player") || b(a, AGO.Galaxy.getToken("Alliance", a.allianceId), "Alliance") || b(a, a.allianceOwn, "Alliance")
        )
        );
        return d || 0
    }, getToken: function (a, b) {
        return a && b && AGO.Token.Data[a] && AGO.Token.Data[a][b] ? +STR.check(AGO.Token.Data[a][b]).split("|")[0] || 0 : 0
    }, Tooltip: function (a) {
        var b;
        if (a = document.querySelector('#galaxytable .tooltipRel[ago-tooltip="' + a + '"]')) {
            if (a = "TD" === a.nodeName ? a : a.parentNode, a = a.querySelector(".galaxyTooltip .ListLinks")) {
                b = DOM.getData(a,
                                null, 1
                ), b.tab && (a.addEventListener("click", AGO.Galaxy.click, !1), AGO.Galaxy.appendTooltipToken(a, b), AGO.Galaxy.appendTooltipSearch(a, b)
                )
            }
        }
    }, appendTooltipToken: function (a, b) {
        function d(a) {
            var d, f;
            AGO.Token.getColor(a) && (d = OBJ.create(b), d.action = e === a ? "remove" : "set", d.token = a, f = AGO.Token.getClass(a) + (e === a ? " ago_selected" : ""
            ), DOM.appendA(DOM.appendLI(h), f, null, {
                               message: {
                                   page: "Token",
                                   role: "Action",
                                   data: d
                               }
                           }
            ).textContent = AGO.Token.getLabel(a)
            )
        }

        var h, e, g;
        if (a && OBJ.is(b)) {
            h = document.createDocumentFragment();
            DOM.appendDIV(h, "splitLine");
            DOM.appendA(DOM.appendLI(h), null, null, {
                            message: {
                                page: "Token",
                                role: "Action",
                                data: {
                                    action: "set",
                                    tab: b.tab,
                                    token: 81,
                                    id: b.id,
                                    name: b.name,
                                    tag: b.tag,
                                    coords: b.coords
                                }
                            }
                        }
            ).textContent = AGO.Label.get("DT1");
            DOM.append(h, "li", null, {lineHeight: "6px"}).textContent = "\u2009";
            if (AGO.Option.is("CT0")) {
                e = AGO.Galaxy.getToken(b.tab, b.id);
                if ("Alliance" === b.tab) {
                    for (g = 42; 50 > g; g++) {
                        d(g);
                    }
                }
                if ("Player" === b.tab) {
                    for (g = 52; 60 > g; g++) {
                        d(g);
                    }
                    DOM.append(h, "li", null, {lineHeight: "6px"}).textContent = "\u2009"
                }
                if ("Player" ===
                    b.tab || "Target" === b.tab) {
                    for (g = 61; 80 > g; g++) {
                        d(g)
                    }
                }
            }
            a.appendChild(h)
        }
    }, appendTooltipSearch: function (a, b) {
        var d, h, e;
        if (AGO.Option.is("T00") && b.id && ("Alliance" === b.tab || "Player" === b.tab
            )) {
            d = document.createDocumentFragment();
            DOM.appendDIV(d, "splitLine");
            for (e = 0; e < AGO.Tools.List.length; e++) {
                var g = "T1" + AGO.Tools.List[e], p = void 0, m = void 0;
                AGO.Option.is(g) && (h = !0, p = {
                    message: {
                        page: "Tools",
                        role: "Action",
                        data: {id: g, Search: OBJ.create(b)}
                    }
                }, m = AGO.Option.getPair(g)[0] || AGO.Label.get(g), DOM.appendA(DOM.appendLI(d),
                                                                                 "", null, p
                ).textContent = m
                )
            }
            h && a.appendChild(d)
        }
    }, getActivityTooltip: function () {
        return ""
    }, getDebrisTooltip: function () {
        return ""
    }, get: function (a, b) {
        if (b) {
            if (!a) {
                return AGO.Galaxy.Data[b] || 0;
            }
            if (OBJ.is(AGO.Galaxy.Data.Row) && OBJ.is(AGO.Galaxy.Data.Row[a])) {
                return AGO.Galaxy.Data.Row[a][b]
            }
        }
        return 0
    }, Action: function (a) {
        var b, d, h, e;
        b = AGO.Galaxy.Data;
        AGO.Galaxy.status && b && OBJ.get(a, "id") && (h = {
            Alliance: "allianceId",
            Player: "playerId",
            Target: "planetId"
        }[a.tab], OBJ.iterateArray(b.Row, function (b) {
                                       OBJ.get(b, h) === a.id &&
                                       (e = "update"
                                       )
                                   }
        ), "Target" === a.tab && (AGO.Galaxy.Task = {}, d = AGO.Galaxy.Task, AGO.Task.cutSystem(a.id) === b.galaxy + ":" + b.system && (e = "update"
        ), "set" === a.action || "select" === a.action
        ) && (e = "update", AGO.Task.updateCoords(d, 4, a), d.galaxy && d.galaxy !== b.galaxy && (e = "reload", DOM.setValue("galaxy_input", "id", d.galaxy)
        ), d.system && d.system !== b.system && (e = "reload", DOM.setValue("system_input", "id", d.system)
        )
           ), e && (e = 80 < a.token ? e : "set" === a.action || "remove" === a.action ? "reload" : e, AGO.Galaxy.Display({update: e})
        )
        )
    }, click: function (a) {
        var b;
        a && a.target && a.currentTarget && (DOM.click(".close-tooltip", a.currentTarget.parentNode.parentNode.parentNode), b = DOM.getData(a.target, null, 2), b.setting && ("toggle" === b.setting.mode && (b.setting.value = !AGO.Option.get(b.setting.id, 1)
        ), AGO.Option.set(b.setting.id, b.setting.value, 1)
        ), b.message && ("Tools" === b.message.page && OBJ.set(b.message.data, "shiftKeys", a.shiftKey || a.ctrlKey), AGO.Init.Messages(b.message.page, b.message.role, b.message.data)
        ), b.update && AGO.Galaxy.Display(b)
        )
    }, clickArrow: function (a) {
        if (a && a.currentTarget) {
            if (a.currentTarget.nextElementSibling.id === "galaxy_input") {
                AGO.Galaxy.direction = -2;  // prev gala
            } else if (a.currentTarget.nextElementSibling.id === "system_input") {
                AGO.Galaxy.direction = -1;  // prev sys
            } else if (a.currentTarget.previousElementSibling.id === "system_input") {
                AGO.Galaxy.direction = 1;   // next sys
            } else if (a.currentTarget.previousElementSibling.id === "galaxy_input") {
                AGO.Galaxy.direction = 2;   // prev sys
            } else {
                AGO.Galaxy.direction = 0;   // reload
            }
        }
    }, sendShips: function (a) {
        var b, d;
        b = AGO.Fleet.Get("Current", "fleets");
        d = AGO.Fleet.Get("Current", "fleetsSlots");
        DOM.setStyleColor("#galaxytable #slots", null, "start" === a.mode ? "#FF4B00" : d && b >= d ? "#D43635" : "#00B000")
    }
};