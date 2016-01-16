AGO.Websim = {
    ships: "202 203 204 205 206 207 208 209 210 211 212 213 214 215 401 402 403 404 405 406 407 408".split(" "),
    Data: [],
    Interactive: function () {
        AGO.Websim.isAntigame = Boolean("antigame" === STR.getParameter("ref", document.location.href));
        for (var b = 0; 16 > b; b++) {
            AGO.Websim.Data[b] = {
                attacker: 0,
                defender: 0,
                count_attacker: 0,
                count_defender: 0
            };
        }
        AGO.Websim.Show();
        AGO.Websim.ShowResult(!0);
        AGO.Websim.ShowTarget();
        AGO.Websim.ShowTitle();
        AGO.Websim.CalculateFleet()
    },
    Show: function () {
        function b(a, b) {
            var c = document.getElementsByName("ship_" +
                                               a + "_" + b + "_b"
            )[0];
            c && (c.addEventListener("change", AGO.Websim.CalculateFleet, !1), c.addEventListener("keyup", AGO.Websim.CalculateFleet, !1)
            )
        }

        var a = document.getElementById("aswift_0_anchor");
        a && (a.parentNode.parentNode.style.display = "none"
        );
        for (a = document.getElementById("overlay").nextSibling; a;) {
            "TABLE" === a.nodeName ? (a.style.minWidth = "900px", a = null
            ) : a = a.nextSibling;
        }
        var c = document.querySelector("input[type=reset]");
        c && (DOM.set(c, null, null, {
                          padding: "3px",
                          marginRight: "24px"
                      }
        ), DOM.set(c.parentNode.querySelectorAll("input")[1],
                   null, null, {padding: "3px", margin: "0px 10px", minWidth: "150px"}
        )
        );
        if (a = document.getElementById("del_techs")) {
            AGO.Websim.isAntigame && (a.checked = STR.getParameter("del_techs", document.location.href)
            );
            var d = NMR.parseInt(STR.getParameter("uni_speed", document.location.href)) || 1, c = document.createElement("tr");
            c.innerHTML = "<td>" + AGO.Label.get("X04") + '</td><td><input id="uni_speed" size="3" maxlength="2" value="' + d + '"></td>';
            a = a.parentNode.parentNode.parentNode;
            a.insertBefore(c, a.childNodes[3])
        }
        c = document.createElement("tr");
        c.innerHTML = '<td style="padding: 10px 0px;">' + AGO.Label.get("X02") + '</td><td align="center"><div id="anti_units_attacker" style="width:50px; text-align: left; padding: 5px 10px;"></div></td><td align="left" id="anti_retreat_ratio" style="width:50px; white-space: nowrap;"></td><td align="center"><div id="anti_units_defender" style="width:50px; text-align: left; padding: 5px 10px;"></div></td><td></td>';
        (a = document.querySelector("#shiptable tbody")
        ) && a.insertBefore(c, a.childNodes[1]);
        for (c = 0; 13 >= c; c++) {
            b("a",
              c
            );
        }
        for (c = 0; 13 >= c; c++) {
            b("d", c);
        }
        a = document.querySelectorAll("input[type=button], input[type=reset]");
        for (c = 0; c < a.length; c++) {
            a[c].addEventListener("click", function () {
                                      window.setTimeout(AGO.Websim.CalculateFleet, 10)
                                  }, !1
            );
        }
        (a = document.querySelector("input[onclick^=sim_ip_attack]")
        ) && a.addEventListener("click", function () {
                                    window.setTimeout(AGO.Websim.ShowResult, 330)
                                }, !1
        )
    },
    ShowTitle: function () {
        var b = "";
        AGO.Websim.isAntigame && (b = STR.getParameter("enemy_status", document.location.href), b = "honorableTarget" === b ?
                                                                                                    "#FFFF66" : "inactive" === b ? "#6E6E6E" : "#FFFFFF", b = '<span style="padding: 0 50px;">' + STR.getParameter("uni", document.location.href) + "</span>" + STR.getParameter("enemy_name", document.location.href) + ' <span style="color: white;">[' + STR.getParameter("enemy_pos", document.location.href) + ']</span> -  <span style="color: ' + b + ';">' + STR.getParameter("enemy_player", document.location.href) + "</span> - " + decodeURI(STR.getParameter("report_time", document.location.href))
        );
        var b = b + ('<a href="javascript:void(0)" id="ago_routine_harvest" style="float: right; background-color: #344566; border: 1px solid #415680; padding: 3px; margin: 0 10px;" title=" ' +
                     AGO.Label.get("X01") + '">AGO ' + AGO.Label.get("F05") + "  " + AGO.Label.get("FH0") + "</a>"
            ), b = b + ('<a href="javascript:void(0)" id="ago_routine_attack" style="float: right; background-color: #344566; border: 1px solid #415680; padding: 3px;" title=" ' + AGO.Label.get("X01") + '">AGO ' + AGO.Label.get("F05") + "  " + AGO.Label.get("FA0") + "</a>"
            ), a = document.getElementById("acs");
        a && (DOM.append(a.parentNode, "span", null, {
                             color: "#6F9FC8",
                             fontSize: "14px"
                         }
        ).innerHTML = b, DOM.set("ago_routine_attack", "id", null, null, {click: AGO.Websim.SetAttack}),
            DOM.set("ago_routine_harvest", "id", null, null, {click: AGO.Websim.SetHarvest})
        )
    },
    ShowTarget: function () {
        function b(a) {
            var b = document.querySelector("input[name=" + a + "]");
            if (b) {
                var c = b.cloneNode(!0);
                c.name = "original_" + a;
                b.parentNode.appendChild(c).addEventListener("change", AGO.Websim.CalculateResourse, !1);
                b.parentNode.style.minWidth = "112px";
                b.parentNode.previousSibling.style.minWidth = "70px";
                b.style.display = "none"
            }
        }

        function a(a, b) {
            return '<input type="radio" name="plunder_ratio" value="' + a + '"' + (a === b ? ' checked="checked"' :
                                                                                   ""
                ) + ">" + a + "% "
        }

        var c = +STR.getParameter("plunder_perc", document.location.href) || 50, d = document.getElementById("enemy_pos");
        if (d) {
            var e = d.parentNode.parentNode.querySelectorAll("td");
            e[4].innerHTML = AGO.Label.get("X03") + ":";
            e[5].innerHTML = a(50, c) + a(75, c) + a(100, c);
            c = d.parentNode.appendChild(document.createElement("input"));
            c.id = "enemy_type";
            c.type = "checkbox";
            c.checked = Boolean("3" === STR.getParameter("enemy_type", document.location.href));
            d.parentNode.appendChild(document.createTextNode(" M"))
        }
        DOM.addEvents("input[name=plunder_ratio]",
                      null, {click: AGO.Websim.CalculateResourse}
        );
        b("enemy_metal");
        b("enemy_crystal");
        b("enemy_deut");
        AGO.Websim.CalculateResourse();
        DOM.set("#read_field + input", null, null, null, {click: AGO.Websim.ReadResourse});
        DOM.addEvents("read_field", "id", {
                          click: function () {
                              this.value = ""
                          }
                      }
        )
    },
    ReadResourse: function () {
        window.setTimeout(function () {
                              AGO.Websim.CalculateResourse(null, !0)
                          }, 500
        )
    },
    CalculateResourse: function (b, a) {
        function c(b) {
            var c = document.querySelector("input[name=original_" + b + "]");
            c && (b = document.querySelector("input[name=" +
                                             b + "]"
            ), a && (c.value = STR.check(b.value)
            ), b.value = STR.check(Math.floor(NMR.parseInt(c.value) * e))
            )
        }

        var d = document.querySelectorAll("input[name=plunder_ratio]"), e = 3 === d.length ? d[2].checked ? 2 : d[1].checked ? 1.5 : 1 : 1;
        a && (a = 100 < document.querySelector("#read_field").value.length
        );
        c("enemy_metal");
        c("enemy_crystal");
        c("enemy_deut")
    },
    ShowResult: function (b) {
        var a, c = document.getElementById("result_table");
        if (c) {
            DOM.removeObserver(AGO.Websim.ObserverObject);
            var d = c.querySelector("table");
            d.style.display = "none";
            for (var e =
                d.getElementsByTagName("tr"), d = [], n, p, q, h = 0; h < e.length; h++) {
                var r = e[h].firstChild.innerHTML, m = e[h].lastChild.innerHTML, f, g = h, k = m;
                f = {};
                var l = k.split(", ");
                2 === l.length ? (f.flag = !0, f.metal = STR.trim(l[0].split(" ")[0]), f.crystal = STR.trim(l[1].split(" ")[0]), g = l[1].split(" ~ "), 2 === g.length && (l[1] = g[0], f.info = "~ " + g[1]
                ), g = k.split(" ("), 2 === g.length && (l[1] = g[0], f.info = g[1].split(")")[0]
                ), 3 === g.length && (l[1] = "", f.metal_perc = g[1].split(")")[0], f.crystal_perc = g[2].split(")")[0], n = g[0].split(" ")[1], p = g[1].split(" ")[2]
                ),
                    k = l[1].split(" "), f.deuterium = 3 <= k.length ? k[k.length - 2] : 0
                ) : 8 === g && (f.flag = !0, f.deuterium = STR.trim(k.split(" ")[0]), q = k.split(" ")[1]
                );
                k = '<td style="min-width: 80px; text-align: right; padding: 0px 6px; color: ' + (6 === h || 7 === h ? "#FF9600" : 2 === h ? "#008000" : 4 === h ? "#FF0000" : ""
                ) + ';">';
                f.flag && !b ? (2 === h && (a = OBJ.create(f)
                ), m = k + STR.check(f.metal) + '</td><td width="30">' + STR.check(f.metal_perc) + "</td>" + k + STR.check(f.crystal) + '</td><td width="30">' + STR.check(f.crystal_perc) + "</td>" + k + STR.check(f.deuterium) + '</td><td style="min-width: 80px; padding: 0px 8px; white-space: nowrap;">' +
                       STR.check(f.info) + "</td>"
                ) : (9 === h && (f = NMR.minMax(NMR.parseInt(document.getElementById("uni_speed").value), 1, 100), m = AGO.Time.formatTime(Math.ceil(AGO.Time.parseTime(m) / f)) + " h"
                ), m = '<td colspan="6" width="400">' + (b ? "" : m
                ) + "</td>"
                );
                d.push("<tr" + ("none" === e[h].style.display ? ' style="display: none;"' : ""
                       ) + '><td style="padding: 2px 15px 2px 5px; white-space: nowrap;">' + r + "</td>" + m + "</tr>"
                )
            }
            b = document.getElementById("anti_result_table");
            b || (b = c.appendChild(document.createElement("table")), b.id = "anti_result_table"
            );
            a = {metal_debris: OBJ.get(a, "metal"), crystal_debris: OBJ.get(a, "crystal")};
            DOM.setData(b, null, a);
            a = d[3];
            d[3] = '<tr><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">' + n + '</td><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">' + p + '</td><td style="text-align: right; padding: 10px 6px 2px 5px;" colspan="2">' + q + "</td><td></td></tr>" + d[2];
            d[2] = a;
            b.innerHTML = d.join("");
            AGO.Websim.ObserverObject = DOM.addObserver(document.getElementById("result_table"), {childList: !0}, AGO.Websim.Observer)
        }
    },
    Observer: function (b) {
        for (var a in b) {
            b[a].addedNodes && "result_table" === b[a].target.id && AGO.Websim.ShowResult()
        }
    },
    CalculateFleet: function () {
        function b(a) {
            return 100 > a ? STR.check(a).substring(0, 4) : STR.check(Math.floor(a))
        }

        var a, c, d, e = document.getElementById("acs").selectedIndex;
        AGO.Websim.Data[e] = {attacker: 0, defender: 0, count_attacker: 0, count_defender: 0};
        for (a = 0; 13 >= a; a++) {
            if (c = document.getElementsByName("ship_a_" + a + "_b")[0]) {
                d = NMR.parseInt(c.value), c.value = STR.check(d), 0 < d && (AGO.Websim.Data[e].count_attacker +=
                                                                             d, AGO.Websim.Data[e].attacker += AGO.Item[AGO.Websim.ships[a]].retreat * d
                );
            }
        }
        for (a = 0; 13 >= a; a++) {
            if (c = document.getElementsByName("ship_d_" + a + "_b")[0]) {
                d = NMR.parseInt(c.value), c.value = STR.check(d), 0 < d && (13 >= a && (AGO.Websim.Data[e].count_defender += d
                ), AGO.Websim.Data[e].defender += AGO.Item[AGO.Websim.ships[a]].retreat * d
                );
            }
        }
        var n = e = d = c = 0;
        for (a = 0; 16 > a; a++) {
            c += +AGO.Websim.Data[a].attacker || 0, d += +AGO.Websim.Data[a].defender || 0, e += +AGO.Websim.Data[a].count_attacker || 0, n += +AGO.Websim.Data[a].count_defender || 0;
        }
        document.getElementById("anti_units_attacker").innerHTML =
        STR.check(e);
        document.getElementById("anti_units_defender").innerHTML = STR.check(n);
        a = "white";
        e = "";
        c && d && (c > d ? (e = b(c / d) + "&nbsp; : &nbsp;1", a = c < 3 * d ? "#008000" : c < 5 * d ? "#FFFF00" : "#FF4B00"
        ) : (e = "1&nbsp; : &nbsp;" + b(d / c), a = "#FF0000"
                   )
        );
        c = document.getElementById("anti_retreat_ratio");
        c.innerHTML = e;
        c.style.color = a
    },
    SetAttack: function () {
        var b, a, c;
        b = AGO.Task.splitCoords(DOM.getValue("enemy_pos", "id", 7));
        b.type = DOM.getProperty("enemy_type", "id", "checked") ? 3 : 1;
        b.mission = 1;
        b.routine = 3;
        b.metal = DOM.getValue('input[name="original_enemy_metal"]',
                               null, 3
        );
        b.crystal = DOM.getValue('input[name="original_enemy_crystal"]', null, 3);
        b.deuterium = DOM.getValue('input[name="original_enemy_deut"]', null, 3);
        for (c = 0; 13 >= c; c++) {
            (a = DOM.getValue('input[name="ship_a_' + c + '_b"]', null, 3)
            ) && (b[AGO.Websim.ships[c]] = a
            );
        }
        AGB.message("Background", "Set", {key: "Fleet_Task", value: JSON.stringify(b)})
    },
    SetHarvest: function () {
        var b;
        b = AGO.Task.splitCoords(DOM.getValue("enemy_pos", "id", 7));
        b.type = 2;
        b.mission = 8;
        b.routine = 4;
        var a = DOM.getData("anti_result_table", "id", 1);
        b.metal = NMR.parseIntAbs(a.metal_debris);
        b.crystal = NMR.parseIntAbs(a.crystal_debris);
        b.deuterium = 0;
        AGB.message("Background", "Set", {key: "Fleet_Task", value: JSON.stringify(b)})
    }
};
AGO.Osimulate = {
    ships: "202 203 204 205 206 207 208 209 210 211 212 213 214 215 401 402 403 404 405 406 407 408".split(" "),
    Interactive: function () {
        AGO.Osimulate.Show()
    },
    Show: function () {
        var b, a, c;
        if (b = document.getElementById("cmdSimulate")) {
            b = b.parentNode;
            a = b.cloneNode(!0);
            if (c = a.querySelector("button")) {
                c.title = AGO.Label.get("X01"), c.innerHTML = "<span>AGO " + AGO.Label.get("F05") + "  " + AGO.Label.get("FA0") + "</span>", c.addEventListener("click", AGO.Osimulate.SetAttack, !1), b.parentNode.insertBefore(a, b.parentNode.childNodes[6]);
            }
            a = b.cloneNode(!0);
            if (c = a.querySelector("button")) {
                c.title = AGO.Label.get("X01"), c.innerHTML = "<span>AGO " + AGO.Label.get("F05") + "  " + AGO.Label.get("FH0") + "</span>", c.addEventListener("click", AGO.Osimulate.SetHarvest, !1), b.parentNode.insertBefore(a, b.parentNode.childNodes[7])
            }
        }
    },
    SetAttack: function () {
        var b, a, c, d;
        b = AGO.Task.splitCoords(DOM.getValue("txtCoords", "id", 7));
        b.mission = 1;
        b.routine = 3;
        b.metal = DOM.getValue("input#numMetallo", null, 3);
        b.crystal = DOM.getValue("input#numCristallo", null, 3);
        b.deuterium = DOM.getValue("input#numDeuterio",
                                   null, 3
        );
        if (a = DOM.getText("#atk-tabs > ul > li.ui-tabs-active a", null, 7)) {
            for (d = 0; 13 >= d; d++) {
                (c = DOM.getValue("num" + d + a, "id", 3)
                ) && (b[AGO.Osimulate.ships[d]] = c
                );
            }
            AGB.message("Background", "Set", {key: "Fleet_Task", value: JSON.stringify(b)})
        }
    },
    SetHarvest: function () {
        var b, a, c;
        a = AGO.Task.splitCoords(DOM.getValue("enemy_pos", "id", 7));
        a.type = 2;
        a.mission = 8;
        a.routine = 4;
        if (b = document.getElementById("tdMediaDetriti")) {
            c = STR.check(b.innerHTML), b = (c.split("locMetal2")[1] || ""
            ).split("<span")[0], a.metal = NMR.parseIntAbs(c.split("<")[0]),
                a.crystal = NMR.parseIntAbs(b);
        }
        a.deuterium = 0;
        AGB.message("Background", "Set", {key: "Fleet_Task", value: JSON.stringify(a)})
    }
};