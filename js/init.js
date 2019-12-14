if (-1 < window.navigator.userAgent.indexOf("Firefox")) {
    AGO.isFirefox = true;
    AGO.isPhone = -1 < window.navigator.userAgent.indexOf("Mobile");
    AGO.isTablet = -1 < window.navigator.userAgent.indexOf("Tablet");
    AGO.isMobile = AGO.isPhone || AGO.isTablet;
} else if (-1 < window.navigator.userAgent.indexOf("Chrome")) {
    AGO.isChrome = true;
}

if (-1 < window.navigator.userAgent.indexOf("OPR/"))
    AGO.isOpera = true;

AGO.Page = {
    Messages: function (a, b) {
        AGO.dummy = a + b
    }
};

let PAGE = {};

const AGB = {
    message: function (page, role, para, response) {
        if (para) {
            para.keyPlayer = AGO.App.keyPlayer;
            if ("function" === typeof response) {
                chrome.runtime.sendMessage("", {page: page, role: role, para: para}, null, response);
            } else {
                chrome.runtime.sendMessage("", {page: page, role: role, para: para});
            }
        }
    },
    // TODO: Find a solution for synchronous requests
    Resource: function (a) {
        var b;
        if (a = STR.check(a)) {
            try {
                return b = new XMLHttpRequest, b.open("GET", chrome.extension.getURL(a), false), b.overrideMimeType("text/plain"), b.send(null), b.responseText || ""
            } catch (c) {
            }
        }
        return ""
    }, Log: function (a, b) {
        (AGO.App.beta || b) && console.log("AntiGameReborn:  " + a)
    }
};

AGO.Init = {
    status: 0,
    active: false,
    KeydownCache: [],
    timing: Date.now(),
    loop: 0,
    Messages: function (module, role, data) {
        if (AGO.Init.status || "Continue" === role) {
            if (Array.isArray(module)) {
                module = -1 < module.indexOf(AGO.App.Page) ? AGO.App.Page : "";
            }

            if ("Init" === module) {
                if ("Timer" === role)
                    window.setTimeout(AGO.Init.Timer, 0);
                else if ("Content" === role)
                    AGO.Init.Content(data);
                else if ("Ready" === role)
                    AGO.Init.Ready();
                else if ("Tooltip" === role)
                    AGO.Init.Tooltip(data);
            } else if (module && AGO[module] && "function" === typeof AGO[module].Messages) {
                AGO[module].Messages(role, data);
            }
        }
    },
    Start: function () {
        // While initializing, AGO goes through different states depending on the document state
        // 0 = App not started yet, call AGO.App.Start()
        // 1 = Start: App has been started (basic information parsed to identify the account), start observers, load
        //     options from AGB and set some styles
        // 2 = Init: head has been added to DOM, body is present, data for the account is retrieved from AGB, Init
        //     functions are called
        // 3 = N/A
        // 4 = Read: body has been added to DOM, right menu is available, Read functions are called;
        //     these typically (surprise!) read stuff from the page, like planets, resources, officers etc.
        // 5 = Run: Read functions have been called; calling Run functions if AGO is running on the OGame main app
        //     (i.e. not on Empire or tools sites for example)
        // 6 = Interactive: document.readyState is "complete" or "interactive", i.e. DOMContentLoaded is emitted,
        //     calling Interactive functions
        // 7 = Ready: Global script said that document is ready; calling Ready functions
        // 8 = Complete: Ready functions have been called; calling Complete functions
        //
        // Every page object can have Read, Run, Interactive, Ready and Complete functions that are called at the
        // corresponding state
        AGO.Init.status = 0;
        if (document.location && document.location.href && document.documentElement) {
            AGO.App.Start();

            if (20 < AGO.Notify.problem) {
                document.addEventListener("DOMContentLoaded", AGO.Main.Run, false);
            } else if (AGO.App.mode) {
                AGO.Init.status = 1;
                AGO.Init.active = document.hasFocus();
                AGO.Observer.Start();

                if (AGO.App.reload) {
                    AGO.Observer.Head(function () {
                        AGO.App.Init();
                        AGO.Init.Init();
                    });
                } else {
                    AGO.Option.Start();
                    AGO.Styles.Start();
                    AGO.Option.is("O04") && (document.title = AGO.App.title);
                    AGO.Observer.Head(function () {
                        AGO.App.Init();
                        AGO.Styles.Init();
                    });
                    AGO.Init.Init();
                }
            }
        } else {
            300 > ++AGO.Init.loop && window.setTimeout(AGO.Init.Start, AGO.Init.loop)
        }
    },
    Init: function () {
        AGB.message("App", "Start", {
            page: AGO.App.page,
            mode: AGO.App.mode,
            keyCom: AGO.App.keyCom,
            keyUni: AGO.App.keyUni,
            keyPlayer: AGO.App.keyPlayer,
            accountId: AGO.App.playerId,
            abbrCom: AGO.Uni.lang,
            abbrUni: AGO.Uni.abbr,
            urlUni: AGO.Uni.url,
            reload: AGO.App.reload
        }, function (data) {
            AGO.Observer.Head(function () {
                if (data && AGO.App.mode && 1 === AGO.Init.status) {
                    AGO.Init.status = 2;
                    AGO.App.reload = AGO.App.reload || data.reload;
                    AGO.App.Page = data.Page;
                    AGO.Background.Data = data.Background || {};
                    AGO.Label.Init(data.Label);
                    if (3 <= AGO.App.mode && data.keyPlayer === AGO.App.keyPlayer) {
                        OBJ.copy(data.App, AGO.App);
                        OBJ.copy(data.Uni, AGO.Uni);
                        AGO.Data.Init();
                        AGO.Option.Init(data.Option);
                        AGO.Item.Init(data.Item);
                        AGO.Panel.Init(data.Panel);
                        AGO.DataBase.Init(data.DataBase);
                        AGO.Box.Init(data.Box);
                        AGO.Token.Init(data.Token);
                        AGO.Units.Init(data.Units);
                        AGO.Fleet.Init(data.Fleet);
                        AGO.App.reload && AGO.App.Save();
                        AGO.App.upgradeAvailable = NMR.parseVersion(AGO.App.versionAGO) < NMR.parseVersion(AGO.App.versionUpdate);
                    }
                    data = null;
                    AGO.Observer.Body(AGO.Init.Read, AGO.isChrome && 3 <= AGO.App.mode);
                }
            });
        });
    },
    Read: function () {
        if (2 === AGO.Init.status) {
            if (AGO[AGO.App.Page]) {
                AGO.Init.status = 4;

                AGO.App.hasMCO = DOM.query("#characterclass") && true;
                AGO.Option.set("isVersion7", AGO.App.isVersion7);

                PAGE = AGO.Page = AGO[AGO.App.Page];

                if (AGO.App.Ogame) {
                    AGO.Global.Read();
                    AGO.Styles.Load();
                    AGO.Planets.Read();
                    if (AGO.Planets.status) {
                        AGO.App.mode = 5;
                        AGO.App.OgameMain = true;
                        AGO.Time.Read();
                        AGO.Units.Read();
                        AGO.Main.Read();
                        "function" === typeof PAGE.Read && PAGE.Read();
                    }
                }
                AGO.Init.Run()

            } else if (100 > ++AGO.Init.loop) {
                AGB.Log("Init - Read - waiting for page script - loaded " + AGO.App.Page, true);
                window.setTimeout(AGO.Init.Read, AGO.Init.loop);
            }
        }
    },
    Run: function () {
        if (4 === AGO.Init.status) {
            AGO.Init.status = 5;

            if (AGO.App.OgameMain) {
                AGO.App.beta && DOM.setStyleColor("playerName", "id", AGO.App.reload ? "#FF9600" : "#008000");
                AGO.Units.Run();
                AGO.Planets.Run();
                AGO.Time.Run();
                AGO.Events.Run();
                "function" === typeof PAGE.Run && PAGE.Run();
                AGO.Panel.Run();
                AGO.Notify.Run();
                AGO.Main.Run();
                //AGO.Option.is("O60") && AGO.Chat.Run()
            }

            AGO.Observer.Interactive(AGO.Init.Interactive)
        }
    },
    Interactive: function () {
        if (5 === AGO.Init.status) {
            AGO.Init.status = 6;
            AGO.Global.Interactive();
            "function" === typeof PAGE.Interactive && PAGE.Interactive();

            if (AGO.App.Ogame) {
                AGO.Observer.mutationObject = DOM.addObserver(document.body, {childList: true}, AGO.Observer.Mutation);
                AGO.Global.message({role: "Ready"});

                if (AGO.App.OgameMain) {
                    if (AGO.App.reload) {
                        AGO.Label.Update();
                        AGO.Units.Update();
                    }

                    AGB.message("App", "Update", {reload: AGO.App.reload});
                    AGO.Notify.set("Notify");
                }
            } else {
                window.setTimeout(AGO.Init.Ready, 20);
            }
        }
    },
    Ready: function () {
        if (6 === AGO.Init.status) {
            AGO.Init.status = 7;
            AGO.App.OgameMain && AGO.Events.Ready();
            "function" === typeof PAGE.Ready && PAGE.Ready();

            // "U31": "Use keyboard shortcuts"
            // If keys are pressed before Init status is 7, they are cached and executed when AGO is ready
            AGO.Option.is("U31") && OBJ.iterateArray(AGO.Init.KeydownCache, AGO.Init.onKeydown);

            if (AGO.App.Ogame) {
                DOM.disableActiveElement();
                DOM.disableAutocomplete();
            }

            window.setTimeout(AGO.Init.Complete, 1);
        }
    },
    Complete: function () {
        if (7 === AGO.Init.status) {
            if (!AGO.App.OgameMain || AGO.Units.status) {
                AGO.Init.status = 8;
                "function" === typeof PAGE.Complete && PAGE.Complete();
                AGO.App.OgameMain && AGO.Main.Complete();
            } else {
                100 > ++AGO.Init.loop && window.setTimeout(AGO.Init.Complete, AGO.Init.loop);
            }
        }
    },
    // Refreshes AGO with the current Data for Background, Option, Fleet, Box and Panel from background process
    // Important for example when playing with multiple tabs and switching between those
    // Called by "focus" event listener defined by AGO.Observer.Start()
    Refresh: function () {
        if (7 <= AGO.Init.status && AGO.App.OgameMain) {
            AGB.message("App", "Refresh", {}, function (data) {
                if (AGO.Init.status && data) {
                    AGO.Background.Data = data.Background || {};
                    AGO.Option.Init(data.Option);
                    AGO.Fleet.Init(data.Fleet);
                    AGO.Box.Init(data.Box, true);
                    AGO.Panel.Init(data.Panel, true);
                }
            });
        }
    },
    // Content is called whenever an AJAX request is successful
    // Called by $(document).ajaxSuccess() by AGO.Ready() in the AGO in-page script (global.js)
    Content: function (data) {
        let overlay;
        if (5 < AGO.Init.status && data && data.page) {
            let page = data.page;
            let targetPAGE;
            if (targetPAGE = AGO[OBJ.get(AGO.App.Overlay, page)]) {
                if ("function" === typeof targetPAGE.Content) {
                    if (!AGO.Init.activeOverlay) {
                        overlay = document.querySelectorAll("body > .ui-dialog .ui-dialog-content");
                        if (overlay.length) {
                            AGO.Init.activeOverlay = {
                                element: overlay[overlay.length - 1].id,
                                page: DOM.getAttribute(overlay[overlay.length - 1], null, "data-page").toLowerCase()
                            };
                        }
                    }

                    if (AGO.Init.activeOverlay && AGO.Init.activeOverlay.element && page === AGO.Init.activeOverlay.page && (overlay = document.getElementById(AGO.Init.activeOverlay.element)))
                        targetPAGE.Content(overlay, AGO.Init.activeOverlay.element, page, data.url, data.para);
                }
            } else if (targetPAGE = AGO[OBJ.get(AGO.App.Content, page)]) {
                "function" === typeof targetPAGE.Content && targetPAGE.Content(page, data.url, data.para, data.response)
            }
        }
    },
    // This is called whenever an overlay is opened, it executes the Overlay function of the corresponding app that
    // is defined in AGO.App.Overlay; note that this is done the second the overlay is opened and does NOT wait for
    // the content to be loaded. Use Content function of the corresponding app if you need to wait for the content
    // to load.
    // Called by AGO.Observer.Mutation()
    Overlay: function (content, c) {
        if (5 < AGO.Init.status && content) {
            let page = DOM.getAttribute(content, null, "data-page").toLowerCase();
            AGO.Init.activeOverlay = {
                element: content.id,
                page: page
            };

            if (page) {
                let targetApp = OBJ.get(AGO.App.Overlay, page);
                targetApp && AGO[targetApp] && "function" === typeof AGO[targetApp].Overlay && AGO[targetApp].Overlay(content, content.id, page, c)
            } else {
                "function" === typeof PAGE.Dialog && PAGE.Dialog(content, content.id);
            }
        }
    },
    Tooltip: function (data) {
        if (AGO.Menu && document.getElementById("ago_menu") && "function" === typeof AGO.Menu.Tooltip) {
            AGO.Menu.Tooltip(data);
        } else {
            "function" === typeof PAGE.Tooltip && PAGE.Tooltip(data);
        }
    }, onKeydown: function (a) {
        var b, c, d, e;
        e = true;
        AGO.App.Ogame && AGO.Init.activeOverlay && (b = document.querySelectorAll("body > .ui-dialog .ui-dialog-content"), b.length ? (c = b[b.length -
                1], d = DOM.getAttribute(c, null, "data-page").toLowerCase(), AGO.Init.activeOverlay = {
                    element: c.id,
                    page: d
                }
            ) : AGO.Init.activeOverlay = null
        );
        AGO.Init.activeOverlay ? (b = OBJ.get(AGO.App.Overlay, d)
        ) && AGO[b] && "function" === typeof AGO[b].onKeydown && (e = AGO[b].onKeydown(a, c)
        ) : (AGO.Menu && document.getElementById("ago_menu") ? e = AGO.Menu.onKeydown(a) : "function" === typeof PAGE.onKeydown && (e = PAGE.onKeydown(a)
            ), e && AGO.App.OgameMain && (e = AGO.Main.onKeydown(a)
            )
        );
        if (false === e && !a.cached) {
            try {
                a.preventDefault()
            } catch (g) {
            }
        }
        return e
    }, onSwipe: function (a, b) {
        if (AGO.Init.touch && a) {
            if (10 > b && "function" === typeof PAGE.onSwipe) {
                PAGE.onSwipe(a, b);
            } else if ("function" === typeof AGO.Main.onSwipe) {
                AGO.Main.onSwipe(a, b)
            }
        }
    },
    Select: function () {
        let strSelection;
        if ("getSelection" in window) {
            let objSelection = window.getSelection();
            objSelection.rangeCount && (strSelection = objSelection.toString());
        }

        if (!strSelection && document.activeElement) {
            let activeElement = document.activeElement;
            if ("TEXTAREA" === activeElement.tagName || "INPUT" === activeElement.tagName && "text" === activeElement.type) {
                strSelection = (activeElement.value || "").substring(activeElement.selectionStart, activeElement.selectionEnd);
            }
        }

        if (strSelection && 5 <= strSelection.length && (!AGO.App.OgameMain || 60 > strSelection.length)) {
            let target = AGO.Task.parseTarget(strSelection, 1);
            if (target.coords || target.time) {
                if (AGO.App.OgameMain) {
                    // "I81": "Autocopy marked coordinates and times as target."
                    if (AGO.Option.is("I81")) {
                        let message = {
                            action: "set",
                            tab: "Target",
                            token: 81,
                            coords: target.coordstype || target.coords,
                            time: target.time,
                            marked: 1
                        };
                        AGO.Init.Messages("Token", "Action", message);
                    }
                } else {
                    target = STR.check(target.coordstype || target.coords) + "|" + STR.check(target.time);
                    AGB.message("Background", "Set", {
                        key: "Panel_Target",
                        value: target
                    });
                }
            }
        }
    }, Timer: function () {
        5 < AGO.Init.status && AGO.App.OgameMain && (AGO.Time.Display(), AGO.Planets.Timer(), 1 === AGO.Acc.type && AGO.Units.Timer(), PAGE.Timer && PAGE.Timer(), AGO.Jumpgate && AGO.Jumpgate.Timer &&
            AGO.Jumpgate.Timer(), AGO.Main.updateTitle()
        )
    }, Timing: function (a) {
        a ? AGB.Log(a + (Date.now() - AGO.Init.timing - (Date.now() - AGO.Init.timingRange
            )
        ) + "   + " + (Date.now() - AGO.Init.timingRange
        ) + " -- " + document.readyState
        ) : AGO.Init.timingRange = Date.now()
    },
    Location: function (page, delay) {
        window.setTimeout(function () {
            document.location.href = AGO.Uni.path + (page || "overview");
        }, delay || 300);
    }, Valid: function (a, b) {
        var c;
        AGO.Init.status && "function" === typeof a && (c = new XMLHttpRequest, c.open("GET", AGO.Uni.url + "/game/index.php?page=fetchTechs&ajax=1",
                true
            ), c.overrideMimeType("text/html"), c.onerror = c.onload = function () {
                AGO.Init.status && (200 === +c.status && STR.check(c.responseText)[0] === String.fromCharCode(123) ? a() : "function" === typeof b && b()
                )
            }, c.send(null)
        )
    }, Script: function (type) {
        if (!AGO.Init.ogameScript) {
            let scriptElements = AGO.App.isVersion7 ? DOM.queryAll("#resourcesbarcomponent > script") : DOM.queryAll("#box > script", document.getElementById("boxBG"));
            for (let i = 0; i < scriptElements.length; i++) {
                if (!scriptElements[i].src && -1 < (scriptElements[i].innerHTML || "").indexOf("reloadResources")) {
                    AGO.Init.ogameScript = scriptElements[i];
                    break;
                }
            }
            AGO.Init.ogameScript = AGO.Init.ogameScript || -1
        }

        let start, end, scriptText;
        scriptText = AGO.Init.ogameScript.innerHTML;
        if (OBJ.is(AGO.Init.ogameScript) && "production" === type) {
            start = scriptText.indexOf("reloadResources");
            if (0 < start) {
                start = scriptText.indexOf("{", start);
                end = scriptText.indexOf(");", start);
                if (end > start)
                    return scriptText.slice(start, end) || "";
                else
                    return "";
            }
        } else {
            return scriptText;
        }
    }
};
AGO.Background = {
    Data: {}, Get: function (a, b) {
        var c;
        c = a ? AGO.Background.Data[a] : "";
        return 6 === b ? STR.check(c) : +c || 0
    }, Set: function (a, b) {
        a && (AGO.Background.Data[a] = b, AGB.message("Background", "Set", {key: a, value: b})
        )
    }
};
AGO.Observer = {
    head: [null], 
	body: [null], 
	interactive: [null], 
	mousedown: null, 
	Start: function () {
        let cachedOnReadyStateChange = document.onreadystatechange;
        document.onreadystatechange = function () {
            if ("interactive" === document.readyState) {
                AGO.Observer.Call(AGO.Observer.body);
                AGO.Observer.Call(AGO.Observer.interactive);
            }
            try {
                cachedOnReadyStateChange()
            } catch (err) {
            }
        };

        document.addEventListener("DOMContentLoaded", function c() {
            document.removeEventListener("DOMContentLoaded", c, false);
            AGO.Observer.Call(AGO.Observer.body);
            AGO.Observer.Call(AGO.Observer.interactive);
        }, false);

        window.addEventListener("blur", function () {
            AGO.Init.active = false;
        }, false);

        window.addEventListener("focus", function () {
            if (!AGO.Init.active) {
                AGO.Init.active = true;
                7 <= AGO.Init.status && AGO.Init.Refresh();
            }
        }, false);

        window.addEventListener("beforeunload", function () {
            DOM.removeObserver(AGO.Observer.mutationObject);
            AGO.Init.status = 0
        }, false);

        window.addEventListener("keydown", AGO.Observer.onKeydown, true);

        window.addEventListener("ago_global_send", function (event) {
            let detail = OBJ.parse(event ? event.detail : "");
            detail.page && AGO.Init.Messages(detail.page, detail.role, detail.data)
        }, false);

        chrome.runtime.onMessage.addListener(function (message) {
            message && message.player === AGO.App.keyPlayer && AGO.Init.Messages(message.page, message.role, message.data)
        });

        // With AGO.Observer.set() an observer for "mousedown" event can be set. This is done for the little popup
        // windows in the menu to make any click outside of the popup hide it. When setting the "mousedown" observer
        // an id and an action is defined. The event listener below checks on every mousedown event if an observer
        // is defined, then if the click was made on the element with the defined id or one of its children. If so, it
        // aborts. If not, it checks if the defined action is a function, then calls that function and resets the
        // observer.
        document.addEventListener("mousedown", function (event) {
            let d;
            if (AGO.Observer.mousedown) {
                event = event.target;
                for (d = 0; 9 > d; d++) {
                    if (event) {
                        if (event.id === AGO.Observer.mousedown.id) {
                            break;
                        } else {
                            event = event.parentNode;
                        }
                    } else {
                        d = 9;
                        break;
                    }
                }

                if (9 === d) {
                    event = AGO.Observer.mousedown.action;
                    AGO.Observer.set("mousedown");
                    "function" === typeof event && event()
                }
            }
        }, false);

        document.addEventListener("mouseup", function (a) {
            a.keyCode || a.altKey || a.ctrlKey || a.shiftKey || a.metaKey || AGO.Init.Select();
        }, false);

        document.addEventListener("touchstart", function (a) {
            var d, e;
            AGO.Observer.area = 0;
            a && a.target && 1 === a.touches.length && (AGO.Observer.startX = AGO.Observer.pageX = e = a.touches[0].pageX, AGO.Observer.startY = AGO.Observer.pageY = a.touches[0].pageY, d = Math.floor((+document.body.clientWidth || 1
                ) / 2
                ), 40 > a.touches[0].screenX || DOM.findParent(a.target, null, "ago_panel", 8) ? AGO.Observer.area = 12 : AGO.Observer.area = e > d - 335 && e < d + 335 ? 950 > window.innerWidth ? 0 : DOM.findParent(a.target,
                    null, "inhalt", 9
                ) ? 1 : 0 : e > d + 330 && DOM.findParent(a.target, null, "planetList", 9) ? 15 : e < d - 280 && DOM.findParent(a.target, null, "links", 9) ? 11 : 0, AGO.Observer.area && (window.setTimeout(function () {
                            10 > Math.abs(AGO.Observer.startX - AGO.Observer.pageX) && 10 > Math.abs(AGO.Observer.startY - AGO.Observer.pageY) && (AGO.Observer.area = 0
                            )
                        }, 120
                    ), window.clearTimeout(AGO.Observer.touchTimeout), AGO.Observer.touchTimeout = window.setTimeout(function () {
                            AGO.Observer.area = 0
                        }, 1E3
                    )
                )
            )
        }, false);

        document.addEventListener("touchmove", function (a) {
            var d,
                e;
            AGO.Observer.area && (AGO.Observer.pageX = a.touches[0].pageX, AGO.Observer.pageY = a.touches[0].pageY, !window.scrollX || 0 < AGO.Observer.startX - AGO.Observer.pageX
            ) && (d = Math.abs(AGO.Observer.startX - AGO.Observer.pageX) + 1, e = Math.abs(AGO.Observer.startY - AGO.Observer.pageY) + 1, (d = 1 === AGO.Observer.area && (3 < d || 3 < e
                    ) && .35 > d / e
                ) ? AGO.Observer.area = 0 : a.preventDefault()
            )
        }, false);

        document.addEventListener("touchend", AGO.Observer.onSwipe, false);
        document.addEventListener("touchcancel", AGO.Observer.onSwipe, false)
    },
    Head: function (a) {
        function b(a) {
            var b;
            OBJ.iterate(a, function (e) {
                    "HTML" === a[e].target.nodeName && a[e].addedNodes.length && "BODY" === a[e].addedNodes[0].nodeName && a[e].addedNodes[0].childNodes.length && (b = true)
                }
            );
            b && AGO.Observer.Call(AGO.Observer.head)
        }

        AGO.Init.status && (document.body || true === AGO.Observer.head[0] ? a() : (AGO.Observer.head[0] || (AGO.Observer.head[0] = DOM.addObserver(document, {
                            childList: true,
                            subtree: true
                        }, b
                    )
                ), AGO.Observer.head.push(a)
            )
        )
    }, Body: function (a, b) {
        function c(a) {
            var b, c;
            for (b in a) {
                if (a[b].target && "box" === a[b].target.id && "boxBG" === a[b].target.parentNode.id) {
                    for (var f = 0; f < a[b].addedNodes.length; f++) {
                        "SCRIPT" === a[b].addedNodes[f].nodeName &&
                        document.getElementById("rechts") && (c = true
                        );
                    }
                }
                if (c) {
                    AGO.Observer.Call(AGO.Observer.body);
                    break
                }
            }
        }

        AGO.Init.status && ("complete" === document.readyState || "interactive" === document.readyState || true === AGO.Observer.body[0] ? a() : (b && !AGO.Observer.body[0] && (AGO.Observer.body[0] = DOM.addObserver(document, {
                            childList: true,
                            subtree: true
                        }, c
                    )
                ), AGO.Observer.body.push(a)
            )
        )
    },
    Interactive: function (a) {
        AGO.Init.status && ("complete" === document.readyState || "interactive" === document.readyState || true === AGO.Observer.interactive[0] ? a() : AGO.Observer.interactive.push(a)
        )
    },
    // Calls all the callback functions that are stored in the callbackArray and sets first element to true while
    // reducing the array to the first element; this marks the array consisting of callbacks as done and will
    // prevent any further calls
    Call: function (callbackArray) {
        let cache;
        if (AGO.Init.status && callbackArray && "object" === typeof callbackArray && true !== callbackArray[0]) {
            cache = callbackArray[0];
            callbackArray[0] = true;
            cache && DOM.removeObserver(cache);
            for (let i = 1; i < callbackArray.length; i++) {
                if ("function" === typeof callbackArray[i]) {
                    callbackArray[i]();
                }
            }
            callbackArray.length = 1
        }
    }, set: function (a, b, c) {
        AGO.Observer[a] = b && c ? {id: b, action: c} : null
    }, onKeydown: function (a) {
        if (!(!a || !a.keyCode || a.altKey || a.ctrlKey && (37 > a.keyCode || 40 < a.keyCode
            )
        ) && AGO.Option.is("U31")) {
            112 <= a.keyCode && 123 >= a.keyCode && AGO.Option.is("U32") && (a.stopPropagation(), a.preventDefault()
            );
            if (7 > AGO.Init.status) {
                return AGO.Init.KeydownCache.push({
                        cached: true,
                        keyCode: a.keyCode,
                        shiftKey: a.shiftKey,
                        ctrlKey: a.ctrlKey
                    }
                ), false;
            }
            a.target && (a.inputType = "TEXTAREA" === a.target.nodeName ? 12 : "INPUT" === a.target.nodeName && "text" === a.target.type ? 11 : 0
            );
            return AGO.Init.onKeydown(a)
        }
        return true
    },
    // Mutation observer that looks for overlays and calls AGO.Init.Overlay with the content of the overlay
    Mutation: function (mutations) {
        let b;
        for (let i in mutations) {
            if ("BODY" === mutations[i].target.nodeName && mutations[i].addedNodes) {
                for (let d = 0; d < mutations[i].addedNodes.length; d++) {
                    if ("DIV" === mutations[i].addedNodes[d].nodeName && (b = mutations[i].addedNodes[d], "dialog" === b.getAttribute("role"))) {
                        AGO.Init.Overlay(b.querySelector(".ui-dialog-content"));
                        return;
                    }
                }
            }
        }
    },
    onSwipe: function () {
        var a, b, c, d;
        window.clearTimeout(AGO.Observer.touchTimeout);
        AGO.Init.touch && AGO.Observer.area && (a = AGO.Observer.startY - AGO.Observer.pageY, c = AGO.Observer.startX - AGO.Observer.pageX, d = Math.abs(c || 1) / Math.abs(a || 1), .35 > d ? 1 < AGO.Observer.area && (-100 >= a ? b = "down" : 100 <= a && (b = "up"
                )
            ) : 3 < d ? (a = 10 > AGO.Observer.area ? 80 : 40, c <= -a ? b = "right" : c >= a && (b = "left"
                )
            ) : .6 < d && 1.4 > d && (-70 >= a ? b = "diagDown" : 70 <= a && (b = "diagUp"
                )
            ), AGO.Init.onSwipe(b, AGO.Observer.area)
        )
    }
};
AGO.Global = {
    Read: function () {
        AGO.App.Ogame && AGO.Global.message({
            role: "Read",
            data: {
                page: AGO.App.page
            }
        })
    },
    Interactive: function () {
        AGO.App.Ogame && AGO.Global.message({
                role: "Interactive", data: {
                    commander: AGO.Option.is("commander"),
                    galaxy: AGO.Acc.galaxy,
                    page: AGO.App.page,
                    timeStatus: AGO.Time.status,
                    timeZoneDelta: AGO.Time.timeZoneDelta,
                    galaxies: AGO.Uni.galaxies,
                    donutGalaxy: AGO.Uni.donutGalaxy,
                    U60: AGO.Option.is("U60"),
                    U61: AGO.Option.isAnd("U60", "U61"),
                    U62: AGO.Option.get("U62", 2),
                    U65: AGO.Option.get("U65", 2),
                    U66: AGO.Option.get("U66", 2),
                    U67: AGO.Option.get("U67", 2),
                    B21: AGO.Option.get("B21", 2),
                    G30: AGO.Option.is("G30"),
                    O51: AGO.Planets.improve,
                    O53: AGO.Planets.enabled && AGO.Option.is("O53"),
                    F00: AGO.Option.is("F00"),
                    F02: AGO.Option.get("F02", 2),
                    F19: AGO.Option.get("F19")
                }
            }
        )
    }, message: function (a, b) {
        var c;
        if (a && (window.dispatchEvent(new window.CustomEvent("ago_global", {detail: JSON.stringify(a)})), "getProperty" === a.role || b
        )) {
            c = DOM.getAttribute("ago_global_data", "id", "ago-data-" + (a.property || b
            )
            );
            try {
                return JSON.parse(c)
            } catch (d) {
                return ""
            }
        }
    }
};
AGO.App = {
    page: "",
    Page: "",
    pathSkin: "",
    title: "",
    mode: 0,
    beta: 0,
    versionOGame: "",
    // These overlays are linked to the here defined apps. As far as defined the Overlay and Content functions of
    // these apps are called when the overlays that are listed here are opened. See AGO.Init.Overlay() and
    // AGO.Init.Content()
    Overlay: {
        jumpgatelayer: "Jumpgate",
        techtree: "Techtree",
        phalanx: "Phalanx",
        showmessage: "Showmessage",
        buddies: "Buddies",
        notices: "Notices",
        search: "Search",
        sharereportoverlay: "ShareReport",
        messages: "Messages"
    },
    // These are the apps linked to background AJAX calls. As far as defined the Content functions of these apps
    // are called on a successful AJAX call. See AGO.Init.Content().
    Content: {
        resources: "Resources", // #MCO
        technologydetails: "Resources",
        station: "Station",
        traderoverview: "Trader",
        research: "Research",
        shipyard: "Shipyard",
        defense: "Defense",
        galaxycontent: "Galaxy",
        allianceoverview: "Alliance",
        alliancemanagement: "Alliance",
        alliancebroadcast: "Alliance",
        allianceapplications: "Alliance",
        premium: "Premium",
        shop: "Shop",
        eventlist: "Events",
        fetcheventbox: "Fleet",
        minifleet: "Fleet",
        tutorialmission: "Tutorial",
        messages: "Messages",
        highscorecontent: "Highscore"
    },
    // Very first start of AGO, gets basic information (current page, uni lang, uni number). Also defines keyPlayer
    // which consists of community, uni number and player ID (ex. AGO_DE_UNI148_100800). This is used as indicator
    // to identify the specific account when communicating with AGB (background process).
    Start: function () {
        AGO.App.pathSkin = chrome.extension.getURL("/skin/");
        AGO.App.versionAGO = chrome.runtime.getManifest().version;
        AGO.App.name = STR.check(chrome.runtime.getManifest().name);
        AGO.App.beta = -1 < AGO.App.name.indexOf("Alpha") ? 3 : -1 < AGO.App.name.indexOf("Beta") ? 1 : 0;
        AGO.Uni.domain = document.location.hostname.toLowerCase();
        AGO.Uni.url = document.location.protocol + "//" + AGO.Uni.domain;


        if (document.location.href.match(/https:\/\/.+\.ogame.gameforge.com\/game\/index\.php\?+.*page=*/i)) {
            let page = STR.getParameter("page", document.location.href).toLowerCase();
            AGO.App.page = page === "standalone" || page === "ingame" ? STR.getParameter("component", document.location.href).toLowerCase() : page;

            if (page === "ingame") {
                switch (AGO.App.page) {
                    case "supplies":
                        AGO.App.page = "resources";
                        break;
                    case "facilities":
                        AGO.App.page = "station";
                        break;
                    case "defenses":
                        AGO.App.page = "defense";
                        break;
                }
            }

            // if planet is changed while on fleet2 or fleet3, user lands on fleet1 page even though url shows page=fleet2/3
            // TODO: Fix for fleetdispatch
            if (0 === AGO.App.page.indexOf("fleet") && -1 === AGO.App.page.indexOf("fleetdispatch") && STR.getParameter("cp", document.location.href))
                AGO.App.page = "fleet1";

            AGO.Uni.path = document.location.href.split("?")[0] + ("ingame" === page ? "?page=ingame&component=" : "?page="); // #MCO

            let domainParts = AGO.Uni.domain.split(".");
            let serverParts = (domainParts[0] || "").split("-");
            AGO.Uni.lang = (serverParts[1] || "EN").toUpperCase();  // DE
            AGO.Uni.number = NMR.parseIntAbs(serverParts[0]);   // 148

            if (AGO.Uni.number) {
                AGO.App.mode = 3;
                AGO.Uni.abbr = "UNI" + AGO.Uni.number;  // UNI148
                AGO.App.keyCom = "AGO_" + AGO.Uni.lang; // AGO_DE
                AGO.App.keyUni = AGO.App.keyCom + "_" + AGO.Uni.abbr;  // AGO_DE_UNI148
                OBJ.copy(OBJ.parse(AGO.Data.getStorage(AGO.App.keyUni + "_App")), AGO.App);

                AGO.App.title = AGO.App.title || AGO.Uni.lang + " " + AGO.Uni.number;

                if (!AGO.App.playerId || STR.getParameter("relogin", document.location.href.toLowerCase()))
                    AGO.App.login = AGO.App.reload = true;
                else
                    AGO.App.keyPlayer = AGO.App.keyUni + "_" + AGO.App.playerId;
            }

            AGO.App.disabled && AGO.Notify.set("Problem", 21);
            4 !== domainParts.length && AGO.Notify.set("Problem", 31);
        } else {
            // AGO on tools sites
            // TODO: AGO doesn't have permissions on these sites, look through all external sites and filter out outdated ones
            AGO.App.page = -1 < AGO.Uni.domain.indexOf("speedsim.net") ? "websim" : -1 < AGO.Uni.domain.indexOf("osimulate.com") ? "osimulate" : "";

            if (AGO.App.page) {
                AGO.Uni.lang = (STR.getParameter("uni", document.location.href).split("_")[0] || "EN").toUpperCase();
                AGO.App.keyCom = "AGO_" + AGO.Uni.lang;
                AGO.App.mode = 2;
            }
        }
    },
    Init: function () {
        var a, b, c;
        a = document.head.getElementsByTagName("meta");
        for (c = 0; c < a.length; c++) {
            if (a[c].name) {
                switch (b = a[c].getAttribute("content"), a[c].name) {
                    case "ogame-player-name":
                        AGO.Acc.name = b;
                        break;
                    case "ogame-planet-coordinates":
                        AGO.Acc.coords = b;
                        break;
                    case "ogame-planet-type":
                        AGO.Acc.type = "moon" === b ? 3 : 1;
                        break;
                    case "ogame-planet-id":
                        AGO.Acc.planetId = b;
                        break;
                    case "ogame-planet-name":
                        AGO.Acc.planetName = b;
                        break;
                    case "ogame-player-id":
                        AGO.Acc.playerId = b;
                        break;
                    case "ogame-version":
                        AGO.App.versionOGame = b;
                        break;
                    case "ogame-session":
                        AGO.Acc.session = b;
                        break;
                    case "ogame-timestamp":
                        AGO.Acc.timestamp =
                            +b || 0;
                        break;
                    case "AntiGameOrigin":
                        AGO.App.twice = true
                }
            }
        }

        AGO.App.isVersion7 = NMR.parseVersion(AGO.App.versionOGame) >= 7000000;
        AGO.App.init = true;
        AGO.App.mode = AGO.App.twice ? 0 : 2 === AGO.App.mode ? 2 : AGO.Acc.playerId && AGO.Acc.session ? 4 : 3;
        if (4 <= AGO.App.mode) {
            if (!AGO.App.login && AGO.App.playerId && AGO.App.playerId !== AGO.Acc.playerId) {
                AGO.Init.status = AGO.App.mode = 0, AGO.Data.setStorage(AGO.App.keyUni + "_App", "");
            } else {
                AGO.App.Ogame = true;
                OBJ.copy(AGO.Task.splitCoords(AGO.Acc.coords), AGO.Acc);
                AGO.Acc.coordstype = AGO.Acc.coords + ":" + AGO.Acc.type;
                AGO.App.keyPlayer = AGO.App.keyUni + "_" + AGO.Acc.playerId;
                AGO.App.OgameMobile = !DOM.hasClass(document.body, null, "no-touch");
                if (AGO.App.login || AGO.App.playerId !== AGO.Acc.playerId || AGO.App.session !== AGO.Acc.session) {
                    AGO.App.reload = true, AGO.App.playerId = AGO.Acc.playerId, AGO.App.Save(), AGB.Log("App - Login:   Com: " + AGO.Uni.lang + "   Uni: " + AGO.Uni.number + "   Player: " + AGO.Acc.playerId + "   Session: " + AGO.Acc.session, true);
                }
                a = document.createDocumentFragment();
                DOM.append(a, "meta", {
                        content: AGO.App.versionAGO,
                        name: "AntiGameOrigin",
                        id: "ago_global_data",
                        "ago-data-key": AGO.App.keyPlayer
                    }
                );
                DOM.append(a, "script", {type: "text/javascript"}).textContent = AGB.Resource("js/global.js");
                document.head.appendChild(a)
            }
        }
    },
    Save: function (data) {
        OBJ.copy(data, AGO.App);
        AGO.Data.setStorage(AGO.App.keyUni + "_App", {
            disabled: AGO.App.disabled,
            playerId: AGO.Acc.playerId,
            session: AGO.Acc.session,
            title: AGO.Uni.lang + " " + (AGO.Uni.name || AGO.Uni.number || "")
        });
    }
};
AGO.Uni = {
    status: 0,
    path: "",
    url: "",
    domain: "",
    lang: "",
    abbr: "",
    number: 0,
    name: "",
    speed: 1,
    speedFleet: 1,
    galaxies: 50,
    systems: 499,
    positions: 16,
    rapidFire: 1,
    acs: 1,
    defToTF: 0,
    debrisFactor: .3,
    repairFactor: .7,
    newbieProtectionLimit: 0,
    newbieProtectionHigh: 0,
    topScore: 0,
    donutGalaxy: 0,
    donutSystem: 0,
    probeCargo: 0,
    globalDeuteriumSaveFactor: 1,
    cargoHyperspaceTechMultiplier: 2,
    resourceBuggyEnergyConsumptionPerUnit: 50
};
AGO.Acc = {name: "", coords: "", type: 0, playerId: "", planetId: "", session: "", timestamp: 0};
AGO.Data = {
    Init: function () {
        AGO.App.reload && AGO.Data.removeStorage(AGO.App.keyPlayer + "_Fleet_Current")
    }, Remove: function (a) {
        function b(a) {
            OBJ.iterate(window.localStorage, function (b) {
                    b && 0 === b.indexOf(a || "AGO_") && (window.localStorage.removeItem(b), AGB.Log("Delete - localstorage  - " + b, true)
                    )
                }
            )
        }

        AGB.Log("Delete - ############ - " + a, true);
        AGB.message("Data", "Remove", {mode: a}, function (c) {
                c && (b("ago" === a ? "AGO_" : AGO.App.keyPlayer), b(AGO.App.keyUni), AGO.Init.Location("", 600)
                )
            }
        )
    },
    setStorage: function (key, data) {
        if (key) {
            try {
                window.localStorage[key] = OBJ.is(data) ? JSON.stringify(data) : data || "";
            } catch (e) {
                AGB.Log("Data - Error set localstorage", true);
            }
        }
    },
    getStorage: function (key, json) {
        if (key) {
            if (json) {
                try {
                    return JSON.parse(window.localStorage[key] || "{}")
                } catch (e) {
                    return {}
                }
            } else {
                return window.localStorage[key] || "";
            }
        }
        return json ? {} : ""
    }, removeStorage: function (a) {
        a && (window.localStorage[a] = ""
        )
    }
};

window.top === window.self && AGO.Init.Start();