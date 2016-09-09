window.addEventListener("ago_global", function (b) {
                            var a;
                            try {
                                a = JSON.parse(b.detail || "{}")
                            } catch (c) {
                                a = {}
                            }
                            switch (a.role) {
                                case "Interactive":
                                    AGO.Interactive(a.data);
                                    break;
                                case "Ready":
                                    AGO.Ready();
                                    break;
                                case "Data":
                                    if (a.data) {
                                        for (var d in a.data) {
                                            a.data.hasOwnProperty(d) && (AGO.Data[d] = a.data[d]
                                            );
                                        }
                                    }
                                    break;
                                case "setProperty":
                                    a.property && (window[a.property] = a.value
                                    );
                                    break;
                                case "getProperty":
                                    a.property && AGO.setData(a.property, JSON.stringify(window[a.property]));
                                    break;
                                case "sendShips":
                                    window.sendShips(a.mission,
                                                     a.galaxy, a.system, a.position, a.type, 0, a.message
                                    );
                                    break;
                                case "reloadEvents":
                                    $.get("/game/index.php?page=eventList&ajax=1", function (a) {
                                              $("#eventboxContent").html(a)
                                          }
                                    );
                                    break;
                                case "hideAll":
                                    try {
                                        window.Tipped.hideAll()
                                    } catch (f) {
                                    }
                                    break;
                                case "Jumpgate":
                                    AGO.Jumpgate();
                                    break;
                                case "setMostShips":
                                    a.data && window.setMaxIntInput("#jumpgateForm", a.data);
                                    break;
                                case "updateVariablesTimes":
                                    window.updateVariables();
                                    window.updateTimesFleet2();
                                    break;
                                case "setType":
                                    window.setTType(a.value);
                                    window.modifyPlanetName();
                                    window.checkOk();
                                    break;
                                case "checkOk":
                                    window.checkOk();
                                    break;
                                case "maximalSpeed":
                                    b = window.speed;
                                    a = window.duration;
                                    d = window.consumption;
                                    window.speed = 10;
                                    do {
                                        if (window.duration = window.getDuration(), window.consumption = window.getConsumption(), 1 < window.speed && (window.consumption > window.tankSpace || window.consumption > window.currentDeuterium
                                            )) {
                                            window.speed--;
                                        } else {
                                            break;
                                        }
                                    } while (1);
                                    AGO.setData("maximalSpeed", JSON.stringify(window.speed));
                                    window.speed = b;
                                    window.duration = a;
                                    window.consumption = d;
                                    break;
                                case "updateTimesFleet3":
                                    window.updateTimesFleet3();
                                    break;
                                case "updateHoldingOrExpTime":
                                    window.updateHoldingOrExpTime();
                                    window.updateVariables();
                                    break;
                                case "executeAction":
                                    a.msgIds && window.executeAction(a.msgIds, a.actionMode)
                            }
                        }, !1
);
var AGO = {
    Data: {}, Uni: {}, message: function (b, a, c) {
        window.dispatchEvent(new window.CustomEvent("ago_global_send", {
                                                        detail: JSON.stringify({
                                                                                   page: b || "",
                                                                                   role: a || "",
                                                                                   data: c || ""
                                                                               }
                                                        )
                                                    }
                             )
        )
    }, setData: function (b, a) {
        var c = document.getElementById("ago_global_data");
        c && c.setAttribute("ago-data-" + b, a || "")
    }, getData: function (b) {
        var a = document.getElementById("ago_global_data");
        if (a) {
            return a.getAttribute("ago-data-" + b) || ""
        }
    }, Interactive: function (b) {
        var a, c, d;
        AGO.Data = b || {};
        AGO.Tooltip();
        AGO.Data.F00 && AGO.Fleet();
        if (a = 1 < AGO.Data.timeStatus ?
                AGO.Data.timeZoneDelta : 0) {
            c = window.getFormatedDate, window.getFormatedDate = function (b, e) {
                return c(b + a, e)
            };
        }
        d = window.toggleMaxShips;
        window.toggleMaxShips = function (a, b, c) {
            var k;
            if ("#shipsChosen" === a && AGO.Data.F00 || "#jumpgateForm" === a && AGO.Data.G30) {
                k = (k = document.querySelector(a + " #ship_" + b)
                    ) ? +k.value || 0 : 0, 0 < k && k !== c && (c -= k
                );
            }
            d(a, b, c)
        };
        window.shipsendingDone = 1;
        window.sendShips = function (a, b, c, d, h, l, m) {
            function n(a) {
                window.shipsendingDone = 1;
                "undefined" !== typeof a.newToken && (window.miniFleetToken = a.newToken
                );
                try {
                    window.displayMiniFleetMessage(a.response)
                } catch (b) {
                }
            }

            m = m || "";
            1 === +window.shipsendingDone && (window.shipsendingDone = 0, c = {
                mission: a,
                galaxy: b,
                system: c,
                position: d,
                type: h,
                shipCount: l,
                token: window.miniFleetToken
            }, 6 === +a && (b = Math.abs(AGO.Data.galaxy - b), AGO.Uni.donutGalaxy ? (b > (AGO.Uni.galaxies/2) ? b = Math.abs(b - AGO.Uni.galaxies) : '') : '', c.speed = 6 <= b ? 1 : 5 <= b ? 2 : 4 <= b ? 4 : 3 <= b ? 6 : 2 <= b ? 9 : 10
            ), $.ajax(window.miniFleetLink, {
                          data: c,
                          dataType: "json",
                          type: "POST",
                          success: n
                      }
            ), AGO.message("Page", "sendShips", {mission: a, mode: "start", message: m})
            )
        }
    }, Ready: function () {
        $(document).ready(function () {
                              AGO.message("Init",
                                          "Ready"
                              );
                              window.timerHandler && window.timerHandler.appendCallback(function () {
                                                                                            AGO.message("Init", "Timer")
                                                                                        }
                              )
                          }
        );
        $(document).ajaxSuccess(function (b, a, c) {
                                    b = decodeURIComponent(c.url || "").replace(/\?/g, "&").split("&page=")[1];
                                    b = (b || ""
                                    ).toLowerCase().split("&")[0].split("#")[0];
                                    AGO.message("Init", "Content", {
                                                    page: b,
                                                    url: c.url,
                                                    para: c.data,
                                                    response: "fetcheventbox" === b || "minifleet" === b ? a.responseText || "" : ""
                                                }
                                    )
                                }
        );
        var serverURL = window.location.origin;
        serverURL += "/api/serverData.xml";
        $.ajax({
            type: "GET",
            url: serverURL,
            dataType: "xml",
            success: function (data) {
                AGO.Uni.galaxies = $('serverData', data).find('galaxies').text();
                AGO.Uni.donutGalaxy = $('serverData', data).find('donutGalaxy').text();
            }
        });
    }, Tooltip: function () {
        function b(a, b) {
			a = a.replace(/\s+/g, " ");
            return b ? -1 < (" " + (a || ""
            ).toLowerCase() + " "
            ).indexOf(" " + b.toLowerCase().trim() +
                      " "
            ) : !1
        }

        var a;
        AGO.TooltipQueue = 0;
        a = window.getTooltipOptions;
        window.getTooltipOptions = function (c) {
            function d(a) {
                AGO.TooltipQueue++;
                $(a).attr("ago-tooltip", AGO.TooltipQueue);
                AGO.message("Init", "Tooltip", AGO.TooltipQueue)
            }

            var f, e, g, k, h, l, m;
            f = a(c);
            e = $(c).attr("class") || "";
            k = AGO.Data.U60;
            h = AGO.Data.U61;
            l = !1;
            m = +AGO.Data.U62 || 0;
            g = AGO.Data.page;
            -1 < e.indexOf("ago_menu_help") ? (k = !0, m = Math.max(m, 5), f.hideOthers = !0, f.maxWidth = Math.max(Math.min(600, window.innerWidth - 30), 0), e.indexOf("ago_menu_help_label" > -1) ?
                                                                                                                                                               f.hook = {
                                                                                                                                                                   target: "topleft",
                                                                                                                                                                   tooltip: "bottomleft"
                                                                                                                                                               } : (f.hideOn = [
                {
                    element: "target",
                    event: "mouseleave"
                },
                {
                    element: "tooltip",
                    event: "mouseleave"
                }
            ], f.hook = {target: "leftmiddle", tooltip: "rightmiddle"}
                                                                                                                                                               ), d(c)
            ) : b(e, "planetlink") ? (l = h, AGO.Data.O51 && (f.hook = {target: "leftmiddle", tooltip: "rightmiddle"}
            )
            ) : b(e, "moonlink") ? (l = h, AGO.Data.O51 && (f.hook = {target: "rightmiddle", tooltip: "leftmiddle"}
            )
            ) : b(e, "constructionIcon") ? AGO.Data.O53 && (l = k
            ) : (k || "galaxy" === g
                ) && b(e, "tooltipClose") ? ("galaxy" === g ? (m = +AGO.Data.U67 || 0, (b(e, "microplanet") ||
                                                                                        b(e, "moon") && (AGO.Data.commander || !b(e, "ago_galaxy_espionage")
                                                                                        )
                                                                                       ) && $("#galaxytable.ago_galaxy_espionage").length && (l = k
                                                                                       ), d(c)
            ) : m = +AGO.Data.U66 || 0, AGO.Data.U65 && (f.hideAfter = Math.max(100 * (+AGO.Data.U65 || 0
                                                                                ), 300
            ), f.hideDelay = f.hideAfter, f.hideOthers = !0
            )
                ) : k && ("overview" === g ? b(e, "tooltipLeft") && $(c).parent().hasClass("planetMoveStart") ? h = !0 : b(e, "tooltipBottom") && (c = $(c).parent().attr("id"), "moon" === c || "planet_as_moon" === c
            ) && (l = h
                                                                                                                         ) : "resources" === g || "station" === g || "research" === g || "shipyard" === g || "defense" ===
                                                                                                                                                                                                             g ? b(e, "slideIn") ? h = 1 === AGO.Data.B21 || 3 === AGO.Data.B21 : b(e, "tooltip") && "resources" === $(c).parent().attr("id") ? h = !1 : "maxlink" === $(c).attr("id") && (l = h
            ) : "fleet1" === g ? -1 < ($(c).attr("onclick") || ""
            ).indexOf("toggleMaxShips") && (h = 1 === AGO.Data.F02 || 3 === AGO.Data.F02
                                 ) : "fleet2" !== g && "fleet2" !== g && "movement" !== g && ("galaxy" === g ? b(e, "activity ") ? h = !0 : $(c).parent().hasClass("buildingimg") && (h = !1
            ) : "galaxy" === g ? h = !1 : "messages" === g ? "button" === $(c).attr("type") && (h = !1
            ) : h = !1
            ), b(e, "tooltip") && (l = h
            )
            );
            l ? f.showOn = !1 : k && (f.showDelay =
                                      Math.max(100 * m, 100)
            );
            return f
        }
    }, Jumpgate: function () {
        var b, a;
        b = window.jumpToTarget;
        window.jumpToTarget = function () {
            AGO.Data.G34 ? document.location.href = document.location.href.split("?")[0] + "?page=fleet1" : b()
        };
        a = window.jumpgateDone;
        window.jumpgateDone = function (b) {
            var d;
            try {
                d = JSON.parse(b)
            } catch (f) {
                d = {}
            }
            d.status && AGO.message("Jumpgate", "Continue", d.targetMoon);
            d.status && AGO.Data.G33 ? (d.errorbox = {}, a(JSON.stringify(d)), window.jumpToTarget()
            ) : a(b)
        }
    }, Fleet: function () {
        if ("fleet1" === AGO.Data.page) {
            var b = window.checkShips;
            window.checkShips = function (a, c, d) {
                b(a, c, d);
                AGO.message("Page", "Display")
            };
            var a = window.clearInput;
            window.clearInput = function (b, c, d) {
                a(b, c, d);
                AGO.message("Page", "Display")
            }
        } else if ("fleet2" === AGO.Data.page) {
            var c = window.updateVariables;
            window.updateVariables = function (a, b, d) {
                c(a, b, d);
                window.updateTimesFleet2()
            };
            a = window.clearInput;
            window.clearInput = function (b, c, d) {
                try {
                    b && b.value && b.setAttribute("ago_value", b.value)
                } catch (e) {
                }
                a(b, c, d)
            };
            var d = window.setTType;
            window.setTType = function (a) {
                if (a) {
                    try {
                        AGO.setData("type",
                                    a
                        ), AGO.message("Page", "clickType"), a = +AGO.getData("type") || 0
                    } catch (b) {
                    }
                    a && d(a)
                } else {
                    d()
                }
            };
            var f = window.checkOk;
            window.checkOk = function () {
                f();
                AGO.message("Page", "Display")
            };
            var e = window.shortLinkChange;
            window.shortLinkChange = function (a, b, c) {
                e(a, b, c);
                a && window.handleUnion()
            };
            window.getFreeStorage = function () {
                return window.storageCapacity;
            }
        } else if ("fleet3" === AGO.Data.page) {
            c = window.updateVariables;
            window.updateVariables =
            function () {
                c();
                AGO.message("Page", "Display")
            };
            var g = window.checkRessourceByType;
            window.checkRessourceByType = function (a) {
                window[a + "OnPlanet"] = parseInt(($("#resources_" + a).text() || ""
                                                  ).replace(/[^\d\-]/g, ""), 10
                );
                g(a)
            }
        }
        var k = window.trySubmit;
        window.trySubmit = function () {
            try {
                document.activeElement.blur()
            } catch (a) {
            }
            k();
            window.validated && AGO.message("Page", "Continue")
        }
    }
};