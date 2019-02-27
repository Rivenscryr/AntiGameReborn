var $;
AGO.Empire = {
    Units: [], Messages: function (l, a) {
        AGO.dummy = l + a
    }, Ready: function () {
        AGO.Empire.enabled = AGO.Option.is("G20");
        AGO.Empire.improve = AGO.Option.isAnd("G20", "G21");
        $ = "jQuery" in window ? window.jQuery : null;
        AGO.Empire.Show()
    }, Show: function () {
        var l, a, c, e, d, k, f, n, b = {}, m = AGO.Item.create(["Ship", "Defense", "Mining", "Station", "Research"]);
        AGO.Empire.improve && (l = 180 + 106 * $(".planet").length, DOM.set("mainWrapper", "id", null, {width: l + "px"})
        );
        if (l = document.querySelector(".planet.summary")) {
            b = {
                metal: DOM.getText("div.metal", l,
                    2
                ), crystal: DOM.getText("div.crystal", l, 2), deuterium: DOM.getText("div.deuterium", l, 2), capacity: 0
            };
            AGO.Task.updateResources(b);
            e = {1: "metal", 2: "crystal", 3: "deuterium"};
            a = l.querySelectorAll(".supply.groupsupply > div");
            for (k = 0; k < a.length; k++) {
                for (f in e) {
                    DOM.hasClass(a[k], null, f) && (n = DOM.getAttribute(a[k], null, "title"), b[e[f] + "Production"] = NMR.parseIntAbs(/.*\>([0-9.]+)\<.*\>([0-9.]+)\<.*\>([0-9.]+)\<.*/.exec(n)[1])
                    );
                }
            }
            AGO.Empire.improve && DOM.setText(".items.groupitems + div", l, b.resources, 3)
        }
        if (AGO.Empire.improve) {
            DOM.iterate(document.querySelectorAll(".planet .resources .deuterium"),
                function (a) {
                    DOM.removeClass(a, null, "box-end")
                }
            );
            if (a = document.querySelector("div.header")) {
                if (a = a.querySelector(".deuterium")) {
                    DOM.removeClass(a, null, "catbox-end"), c = DOM.appendLI(null, "catbox-end"), DOM.appendSPAN(c, null, "F23", 10), DOM.after(a, c);
                }
            }
            a = $("div.header");
            for (f in m) {
                0 === a.find("li." + f).length && delete m[f]
            }
        }
        $(".planet").not(".summary").each(function () {
                var a, e, g, f, h;
                f = STR.check(DOM.getAttribute(this, null, "id", 3));
                h = {
                    metal: DOM.getText(".metal span", this, 2),
                    crystal: DOM.getText(".crystal span", this,
                        2
                    ),
                    deuterium: DOM.getText(".deuterium span", this, 2),
                    energy: DOM.getText('div.planetDataTop span[class$="mark"]', this, 2),
                    capacity: 0
                };
                AGO.Task.updateResources(h);
                AGO.Empire.improve && DOM.setText(".items.groupitems + div", this, h.resources, 3);
                for (g in m) {
                    if (a = $(this).find("div." + g).get(0)) {
                        if (g in AGO.Item.Ship || g in AGO.Item.Defense) {
                            a = a.childNodes.length > 1 ? a.childNodes[0] : a;
                            h[g] = DOM.getText(a, null, 3);
                            g in AGO.Item.Ship && AGO.Ogame.getShipCapacity(g) && h[g] && (h.capacity += h[g] * AGO.Ogame.getShipCapacity(g));
                        } else if (g in AGO.Item.Mining || g in AGO.Item.Station || g in AGO.Item.Research) {
                            if (e = a.querySelector("span.disabled")) {
                                h[g] = DOM.getText(e, null, 3);
                                AGO.Empire.improve && "199" !== g && "212" !== g && -1 === DOM.getText(e).indexOf("-") && AGO.Empire.appendTooltip(e, g, h, b)
                            } else {
                                h[g] = DOM.getText("a", a, 3);
                            }
                        }
                    }
                }

                AGO.Empire.Units.length || AGO.Empire.Units.push({
                        planet: "account",
                        tabs: ["Research"],
                        data: OBJ.create(h)
                    }
                );
                AGO.Empire.Units.push({
                        planet: f,
                        tabs: [
                            "Resource",
                            "Mining",
                            "Station",
                            "Ship",
                            "Defense"
                        ],
                        data: OBJ.create(h)
                    }
                );
                b.capacity += h.capacity;
                AGO.Empire.improve && (a = this.querySelector(".deuterium")
                ) && (c = DOM.appendDIV(null,
                        "odd box-end"
                    ), d = h.capacity < h.resources ? "disabled" : "", DOM.appendSPAN(c, d, h.capacity, 3), DOM.after(a, c)
                )
            }
        );
        AGO.Empire.Units.length && AGB.message("Units", "Action", {list: AGO.Empire.Units}, function () {
                AGO.Units.status = 1
            }
        );
        AGO.Empire.improve && (c = DOM.appendDIV(null, "odd box-end"), d = b.capacity < b.resources ? "disabled" : "", DOM.appendSPAN(c, d, b.capacity, 3), DOM.after(l.querySelector(".deuterium"), c)
        );
    }, appendTooltip: function (l, a, c, e) {
        var d, k, f, n, b, m;
        b = c[a];
        d = AGO.Item[a].metal ? Math.floor(AGO.Item[a].metal * Math.pow(AGO.Item[a].factor,
            b
        )
        ) : 0;
        k = AGO.Item[a].crystal ? Math.floor(AGO.Item[a].crystal * Math.pow(AGO.Item[a].factor, b)) : 0;
        f = AGO.Item[a].deuterium ? Math.floor(AGO.Item[a].deuterium * Math.pow(AGO.Item[a].factor, b)) : 0;
        n = "1" === a || "2" === a ? 10 : "3" === a ? 20 : 0;
        n = Math.ceil(n * (b + 1
        ) * Math.pow(1.1, b + 1)
        ) - Math.ceil(n * b * Math.pow(1.1, b));
        a = '<div style="text-align:center">' + ('<span style="font-size:1.8em;font-weight:bold;">' + AGO.Label.get(a, 1) + "</span><br/>"
        );
        a = a + ('<span style="font-size:1.5em;font-weight:bold;">next level: ' + (b + 1
                ) + "</span><br/>"
            ) +
            "<br />";
        b = Math.floor((d + k + f
        ) / 1E3
        );
        a += '<span style="text-decoration:underline;font-weight:bold;">costs </span>';
        a += '(<span style="text-decoration:underline;font-style:italic;">' + STR.formatNumber(b) + " points</span>)";
        a += '<span style="text-decoration:underline;font-weight:bold;">:</span><br/>';
        0 < d && (a += '<span style="color:#FFCC00">metal: ' + STR.formatNumber(d) + "</span><br/>"
        );
        0 < k && (a += '<span style="color:#FFCC00">crystal: ' + STR.formatNumber(k) + "</span><br/>"
        );
        0 < f && (a += '<span style="color:#FFCC00">deuterium: ' +
                STR.formatNumber(f) + "</span><br/>"
        );
        0 < n && (a += '<span style="color:#FFCC00">energy: ' + STR.formatNumber(n) + "</span><br/>"
        );
        a += '<span style="font-size:0.9em;">(small cargo: ' + STR.formatNumber(Math.ceil((d + k + f
            ) / AGO.Ogame.getShipCapacity("202")
            )
        ) + " or large cargo: " + STR.formatNumber(Math.ceil((d + k + f
            ) / AGO.Ogame.getShipCapacity("203")
            )
        ) + ")</span><br/>";
        a += "<br />";
        a += '<span style="text-decoration:underline;font-weight:bold;">ressources needed (planet):</span><br/>';
        m = 0;
        b = d - c.metal;
        0 < b && (a += "metal: " + STR.formatNumber(b) + "<br/>", m += b
        );
        b = k - c.crystal;
        0 < b && (a += "crystal: " +
                STR.formatNumber(b) + "<br/>", m += b
        );
        b = f - c.deuterium;
        0 < b && (a += "deuterium: " + STR.formatNumber(b) + "<br/>", m += b
        );
        0 < m && (a += '<span style="font-size:0.9em;">(small cargo: ' + STR.formatNumber(Math.ceil(m / AGO.Ogame.getShipCapacity("202"))) + " or large cargo: " + STR.formatNumber(Math.ceil(m / AGO.Ogame.getShipCapacity("203"))) + ")</span><br/>"
        );
        0 < n && n > c.energy && (a += "<br />", b = n - c.energy, a += '<span style="text-decoration:underline;font-weight:bold;">energy needed:</span> ' + STR.formatNumber(b) + "<br/>"
        );
        0 < d - e.metal || 0 < k - e.crystal || 0 < f - e.deuterium ? (c = 0, a += "<br />", a += '<span style="text-decoration:underline;font-weight:bold;">ressources needed (account):</span><br/>',
                b = d - e.metal, 0 < b && (a += "metal: " + STR.formatNumber(b) + "<br/>", 0 < e.metalProduction && (d = b / e.metalProduction, d > c && (c = d
                    )
                )
            ), b = k - e.crystal, 0 < b && (a += "crystal: " + STR.formatNumber(b) + "<br/>", 0 < e.crystalProduction && (d = b / e.crystalProduction, d > c && (c = d
                    )
                )
            ), b = f - e.deuterium, 0 < b && (a += "deuterium: " + STR.formatNumber(b) + "<br/>", 0 < e.deuteriumProduction && (d = b / e.deuteriumProduction, d > c && (c = d
                    )
                )
            ), 0 < c && (a += "<br />", a += '<span style="text-decoration:underline;font-weight:bold;">you will have enough ressources<br/>in your account in:</span><br/>',
                    a += '<span style="color:orange;font-weight:bold;font-size:1.2em;">' + AGO.Time.formatTime(Math.floor(3600 * c), !0) + "</span><br/>", b = new Date(1E3 * (AGO.Acc.timestamp + Math.ceil(3600 * c)
                )
                ), a += '<span style="color:#CCCCCC;font-size:1.0em;">' + b.toLocaleString() + "</span><br/>"
            )
        ) : (a += "<br />", a += '<span style="color:lime;font-weight:bold;font-size:1.2em;">there are enough ressources<br/>in your account</span><br/>'
        );
        a += "</div>";
        DOM.setAttribute(l, null, "title", a);
        DOM.addClass(l, null, "tooltipRight");
    }
};