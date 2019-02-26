AGO.Galaxy = {
    status: 0, enabled: !1, improve: !1, direction: 1, Data: {}, Task: {}, Messages: function (a, b) {
        "Action" === a ? AGO.Galaxy.Action(b) : "Display" === a ? AGO.Galaxy.Display(b) : "sendShips" === a && AGO.Galaxy.sendShips(b)
    }, Run: function () {
        AGO.Option.is("G40") && !AGO.App.OgameMobile && (AGO.Galaxy.enabled = !0, AGO.Galaxy.improve = AGO.Option.is("G41"), AGO.Galaxy.shrink = AGO.Option.get("G42", 2), AGO.Galaxy.status = 5, AGO.Galaxy.Show(), document.getElementById("galaxytable") && AGO.Galaxy.Content()
        )
    }, onKeydown: function (a) {
        if (document.activeElement.tagName in {'TEXTAREA': 1, 'INPUT': 1}) return;
        if (a.keyCode in {13: 1, 32: 1, 65: 1, 68: 1, 81: 1, 69: 1}) {
            if (DOM.getAttribute("#galaxytable", null, "ago-keypressed", "")) return false;
            else DOM.updateAttribute("#galaxytable", null, "ago-keypressed", 1, 8);
        }

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

        var galaxyInput = DOM.query("#galaxyHeader #galaxy_input"),
            systemInput = DOM.query("#galaxyHeader #system_input");
        DOM.addEventsAll([galaxyInput.previousElementSibling, galaxyInput.nextElementSibling, systemInput.previousElementSibling, systemInput.nextElementSibling], null, {click: AGO.Galaxy.clickArrow});

        DOM.addEvents("galaxyContent", "id", {click: AGO.Galaxy.click})
    }, Content: function () {
        var a, b, d, h;
        a = document.getElementById("galaxytable");
        if (AGO.Galaxy.status && a && DOM.updateAttribute(a, null, "ago-status", 1, 8)) {
            b = DOM.getAttribute(a, null, "data-galaxy", 2);
            d = DOM.getAttribute(a, null, "data-system", 2);

            let agoBoxGalaxyIcon = AGO.Option.get("O71");
            if (agoBoxGalaxyIcon === 1) {
                let agoBox = DOM.query("#ago_box");
                if (agoBox && agoBox.style.display !== "none") {
                    let index = 1;
                    DOM.iterateChildren(DOM.query("#ago_box_content", agoBox), function (child) {
                        let data = DOM.query("a:first-child", child).getAttribute("ago-data");
                        data = JSON.parse(data).message.data;
                        if (data.galaxy === b && data.system === d) AGO.Box.Current = index;
                        index++;
                    })
                }
            }

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
                        fleets: +b[0] || 0,
                        fleetsSlots: +b[1] || 0
                    }
                ), AGO.Init.Messages("Panel", "updateTab", {tab: "Flights"})
            );
            if (AGO.Galaxy.improve) {
                for (b = a.querySelectorAll("#galaxyheadbg2 th"), DOM.removeClass(b[0], null, "first"), DOM.addClass(b[1], null, "first"), DOM.updateStyle(b[0], null, "width", "55px"), DOM.updateStyle(b[1], null,
                    "width", "145px"
                ), DOM.updateStyle(b[3], null, "width", "15px"), DOM.updateStyle(b[3], null, "text-align", "left"), DOM.updateStyle(b[4], null, "width", "160px"), DOM.before(b[0], b[1]), b = a.querySelectorAll(".row"), h = 0; h < b.length; h++) {
                    d = b[h], DOM.hasChildren(d) && (DOM.before(d.children[1], d.children[2]), DOM.before(d.children[5], d.children[4])
                    );
                }
            }
            AGO.Galaxy.showRows(a.querySelectorAll(".row"));
            AGO.Galaxy.showHighlight(a.querySelectorAll(".row"));
            AGO.Galaxy.updateDataBase()
        }
    }, showRows: function (rows) {
        let cellAlly, cellPlayer, cellPlanet, cellMoon, cellDebris, cellPosition, cellPlanetName, row, debrisSizeStyle, q, dontFixTooltips;
        debrisSizeStyle = AGO.Option.get("G45", 2);
        dontFixTooltips = AGO.Option.is("G58");
        for (let i = 0; i < rows.length; i++) {
            row = {position: i + 1};
            row.coords = AGO.Galaxy.Data.galaxy + ":" + AGO.Galaxy.Data.system + ":" + row.position;
            row.owncoords = AGO.Planets.owncoords(row.coords, 1);
            row.coordsActive = AGO.Task.cutCoords(AGO.Panel.getActive("Target", "coords", 6));
            row.coordsCurrent = AGO.Galaxy.Task.coords;
            AGO.Galaxy.Data.Row[row.position] = row;

            cellPlanetName = cellPosition = cellDebris = cellMoon = cellPlanet = cellPlayer = cellAlly = void 0;
            DOM.iterateChildren(rows[i], function (cell) {
                let className = cell.className || "";
                if (HTML.hasClass(className, "allytag"))
                    cellAlly = cell;
                else if (HTML.hasClass(className, "playername"))
                    cellPlayer = cell;
                else if (HTML.hasClass(className, "microplanet"))
                    cellPlanet = cell;
                else if (HTML.hasClass(className, "moon"))
                    cellMoon = cell;
                else if (HTML.hasClass(className, "debris"))
                    cellDebris = cell;
                else if (HTML.hasClass(className, "position"))
                    cellPosition = cell;
                else if (HTML.hasClass(className, "planetname"))
                    cellPlanetName = cell;
            });

            if (cellAlly) {
                let showAllyRank = AGO.Option.is("G44");
                let allyTagWrapper = cellAlly.querySelector(".allytagwrapper");
                let allyID = DOM.getAttribute(allyTagWrapper, null, "rel");
                row.allianceId = STR.check(NMR.parseIntFormat(allyID));
                if (allyTagWrapper && row.allianceId) {
                    row.allianceTag = DOM.getTextChild(allyTagWrapper, null, 7);
                    row.allianceTag.length > 7 ? DOM.setText(allyTagWrapper.childNodes[0], null, row.allianceTag.slice(0, -3) + "...") : !1;
                    row.allianceOwn = HTML.hasClass(allyTagWrapper.className, "status_abbr_ally_own") ? 41 : 0;
                    row.allianceColor = AGO.Token.getClass(AGO.Galaxy.getToken("Alliance", row.allianceId) || row.allianceOwn);
                    row.allianceColor && DOM.addClass(cellAlly, null, row.allianceColor);
                    let divTooltip = allyTagWrapper.querySelector(".htmlTooltip");
                    let ulListLinks = allyTagWrapper.querySelector(".htmlTooltip .ListLinks");
                    if (divTooltip && ulListLinks) {
                        row.allianceName = DOM.getText("h1", divTooltip, 7);
                        row.allianceRank = DOM.getText(".rank a", ulListLinks, 2);
                        row.allianceMember = DOM.getText(".members", ulListLinks, 2);
                        DOM.setData(ulListLinks, null, {
                            tab: "Alliance",
                            id: row.allianceId,
                            name: row.allianceName,
                            tag: row.allianceTag
                        });
                        if (showAllyRank) {
                            let anchorRank = DOM.appendA(null, {
                                "class": "ago_galaxy_rank",
                                href: DOM.getAttribute(".rank a", ulListLinks, "href")
                            });
                            let rankClass = ("ago_galaxy_rank " + row.allianceColor).trim();
                            DOM.appendSPAN(anchorRank, rankClass, row.allianceRank + "/" + row.allianceMember);
                            DOM.appendChild(cellAlly, anchorRank);
                        }
                        if (!dontFixTooltips) {
                            DOM.setAttribute(allyTagWrapper, null, "rel", allyID + String.fromCharCode(65 + row.position));
                            DOM.setAttribute(divTooltip, null, "id", allyID + String.fromCharCode(65 + row.position));
                        }
                    }
                }
            }

            if (cellPlayer && !row.owncoords) {
                let showPlayerRank = AGO.Option.is("G43");
                let anchorPlayer = cellPlayer.querySelector("a.tooltipRel");
                let playerID = DOM.getAttribute(anchorPlayer, null, "rel");
                row.playerId = STR.check(NMR.parseIntFormat(playerID));
                if (anchorPlayer && row.playerId) {
                    row.playerBuddy = DOM.hasClass(cellPosition, null, "status_abbr_buddy") ? 51 : 0;
                    row.playerColor = AGO.Token.getClass(AGO.Galaxy.getToken("Player", row.playerId) || row.playerBuddy) || row.allianceColor;
                    row.playerStatus = AGO.Token.getPlayerStatus(".status > span", cellPlayer) || 21;
                    let divTooltip = cellPlayer.querySelector(".htmlTooltip");
                    let ulListLinks = cellPlayer.querySelector(".htmlTooltip .ListLinks");
                    if (divTooltip && ulListLinks) {
                        row.playerName = DOM.getText("h1 span", divTooltip, 7);
                        row.playerRank = DOM.getText(".rank a", ulListLinks, 2);
                        DOM.setData(anchorPlayer, null, {
                            message: {
                                page: "Token",
                                role: "Action",
                                data: {action: "set", tab: "Player", token: 81, id: row.playerId, name: row.playerName}
                            }
                        });
                        DOM.setData(ulListLinks, null, {
                            tab: "Player",
                            id: row.playerId,
                            name: row.playerName
                        });
                        if (showPlayerRank) {
                            let anchorRank = DOM.appendA(null, {
                                "class": "ago_galaxy_rank",
                                href: DOM.getAttribute(".rank a", ulListLinks, "href")
                            });
                            let rankClass = ("ago_galaxy_rank " + row.playerColor).trim();
                            DOM.appendSPAN(anchorRank, rankClass, 1E4 <= row.playerRank ? (Math.floor(row.playerRank/1000)) + " k" : row.playerRank);
                            DOM.appendChild(cellPlayer, anchorRank);
                        }
                        if (!dontFixTooltips) {
                            DOM.setAttribute(anchorPlayer, null, "rel", playerID + String.fromCharCode(65 + row.position));
                            DOM.setAttribute(divTooltip, null, "id", playerID + String.fromCharCode(65 + row.position));
                        }
                    }
                }
            }

            q = 2 !== AGO.Galaxy.behave && !row.allianceOwn && !row.playerBuddy && VAL.check(row.playerStatus, 21, 22, 23, 26, 27, 28);

            if (cellPlanet) {
                row.planetId = DOM.getAttribute(cellPlanet, null, "data-planet-id", 7);
                if (row.planetId) {
                    let divTooltip = cellPlanet.querySelector(".htmlTooltip");
                    let ulListLinks = cellPlanet.querySelector(".htmlTooltip .ListLinks");
                    if (divTooltip && ulListLinks) {
                        row.planetName = DOM.getText("h1 span", divTooltip, 7);
                        if (cellPlanet.querySelector(".activity")) row.planetActivity = DOM.getText(ulListLinks.firstElementChild, null, 2) || 1;
                    }
                    if (!row.owncoords) {
                        DOM.setData(ulListLinks, null, {
                            tab: "Target",
                            id: row.planetId,
                            name: row.playerName,
                            coords: row.coords + ":1"
                        });
                        q && 3 === AGO.Galaxy.behave && DOM.extendClass(cellPlanet, null, "ago_galaxy_espionage");
                    }
                }
            }

            if (cellMoon) {
                row.moonId = DOM.getAttribute(cellMoon, null, "data-moon-id", 7);
                if (row.moonId) {
                    let divTooltip = cellMoon.querySelector(".htmlTooltip");
                    let ulListLinks = cellMoon.querySelector(".htmlTooltip .ListLinks");
                    if (divTooltip && ulListLinks) {
                        row.moonName = DOM.getText("h1 span", divTooltip, 7);
                        if (cellMoon.querySelector(".activity")) row.moonActivity = DOM.getText(ulListLinks.firstElementChild, null, 2) || 1;
                    }
                    if (!row.owncoords) {
                        DOM.setData(ulListLinks, null, {
                            tab: "Target",
                            id: row.planetId,
                            name: row.playerName,
                            coords: row.coords + ":3"
                        });
                        q && 3 === AGO.Galaxy.behave && DOM.extendClass(cellMoon, null, "ago_galaxy_espionage");
                        let anchorMoon = cellMoon.querySelector("a[onclick]");
                        if (q) {
                            let strOnclick = DOM.getAttribute(anchorMoon, null, "onclick", 7).split(");").join(",0,this);");
                            DOM.setAttribute(cellMoon, null, "onclick", strOnclick);
                        }
                        DOM.removeAttribute(anchorMoon, null, "onclick");
                    }
                }
            }

            if (cellDebris) {
                let debrisContent = cellDebris.querySelectorAll(".debris-content");
                row.debrisMetal = DOM.getText(debrisContent[0], null, 2);
                row.debrisCrystal = DOM.getText(debrisContent[1], null, 2);
                row.debrisResources = row.debrisMetal + row.debrisCrystal;
                if (row.debrisResources) {
                    row.highlightDebris = NMR.isGreater(row.debrisResources, AGO.Token.getLimit(95)) ? 95 : NMR.isGreater(row.debrisResources, AGO.Token.getLimit(94)) ? 94 : 0;
                    let debrisField = cellDebris.querySelector("a.tooltipRel div");
                    if (debrisField) {
                        if (1 === debrisSizeStyle) {
                            let debrisSize = Math.max(2 + 3 * (row.debrisResources + "").length - AGO.Galaxy.shrink, 14);
                            debrisSize = Math.min(debrisSize, [30, 28, 26, 24][AGO.Galaxy.shrink]);
                            DOM.set(debrisField, null, {
                                style: "width: " + debrisSize + "px; height: " + debrisSize + "px; background-size: " + debrisSize + "px;"
                            });
                            row.highlightDebris && DOM.set(debrisField, null, {src: HTML.urlImage("galaxy_debris.gif")});
                        } else if (1 < debrisSizeStyle) {
                            let debrisClass = ("ago_galaxy_debris " + AGO.Token.getClass(row.highlightDebris)).trim();
                            let debrisDiv = DOM.appendDIV(null, debrisClass);
                            let debrisBgClass = row.highlightDebris ? "ago_text_background" : "";
                            let debrisBgSpan = DOM.appendSPAN(debrisDiv, debrisBgClass);
                            DOM.appendTEXT(debrisBgSpan, (3 !== debrisSizeStyle || AGO.Galaxy.sameSystem ? STR.formatNumber(row.debrisMetal) : STR.shortNumber(row.debrisMetal, 0)));
                            DOM.append(debrisBgSpan, "br");
                            DOM.appendTEXT(debrisBgSpan, (3 !== debrisSizeStyle || AGO.Galaxy.sameSystem ? STR.formatNumber(row.debrisCrystal) : STR.shortNumber(row.debrisCrystal, 0)));
                            DOM.appendChild(debrisField, debrisDiv);
                            DOM.set(debrisField, null, {style: "background: inherit;"});
                            AGO.Galaxy.improve && DOM.addClass(cellDebris, null, "ago_galaxy_debris_shadow");
                        }
                    }
                    if (!row.owncoords) {
                        DOM.setData(".htmlTooltip .ListLinks", cellDebris, {
                            tab: "Target",
                            id: row.planetId,
                            name: row.playerName,
                            coords: row.coords + ":2"
                        });
                    }
                }
            }

            if (row.planetId) {
                let colorStatusTags = AGO.Option.is("CT0");
                DOM.addClass(rows[i], null, "ago_galaxy_row");
                row.positionColor = AGO.Token.getClass(AGO.Galaxy.getToken("Target", row.planetId)) || row.playerColor;
                row.positionColor && DOM.addClass(cellPosition, null, row.positionColor);
                if (cellPlanetName) {
                    if (row.positionColor) {
                        DOM.addClass(cellPlanetName, null, row.positionColor);
                        DOM.addClass("a", cellPlanetName, row.positionColor);
                        DOM.addClass("span", cellPlanetName, row.positionColor);
                    } else {
                        colorStatusTags && DOM.addClass("a", cellPlanetName, "ago_color_bright");
                    }
                }
            }
        }
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
        m = AGO.Task.cutCoords(AGO.Panel.getActive("Target", "coords", 6));
        f = AGO.Galaxy.Task.coords;
        if (OBJ.is(a) && OBJ.is(AGO.Galaxy.Data.Row)) {
            for (p = 0; p < a.length; p++) {
                if (e = AGO.Galaxy.Data.Row[p + 1], e.planetId || e.debrisResources) {
                    b && (h(a[p], null), DOM.setClassGroup(a[p], null, "ago_selected")
                    ),
                    (g = (g = !e.coords || e.coords !== m && e.coords !== f ? e.playerId && e.playerId === AGO.Panel.getActive("Player", "id", 6) ? "SB" : "" : "SA"
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