var $;
AGO.Messages = {
    getTooltip: function (b, a) {
        b = AGO.Label.get(b);
        a = a && AGO.Option.is("U31") ? "&lt;span class=&quot;anti_shortcut&quot;&gt;" + a + "&lt;/span&gt;&nbsp;&nbsp;" : "";
        return b || a ? ' class="tooltip js_hideTipOnMobile" title="' + a + b + '"' : ""
    }, Messages: function (b, a) {
        "Status" === b ? a && AGO.Messages.clickTooltip(a.id, a.value, a.mode) : "sendShips" === b ? AGO.Messages.sendShips(a) : "toggleSpiohelper" === b ? AGO.Spiohelper.changeActive(a) : "changeStatus" === b && AGO.Messages.foldSpyreports("", a || "0")
    }, Interactive: function () {
        AGO.Messages.enabled = !0;
        AGO.Messages.shrink = AGO.Option.get("M12", 2);
        $ = "jQuery"in window ? window.jQuery : null;
        AGO.Spiohelper.Run();
        AGO.Messages.Content()
    }, Content: function (b, a, c) {
        AGO.Messages.shrink && (b = {
            1: {top: 3, bot: 6},
            2: {top: 2, bot: 4},
            3: {top: 1, bot: 2},
            4: {top: 0, bot: 0}
        }, a = b[AGO.Messages.shrink].top, AGO.Styles.set("#netz .contentz #showSpyReportsNow table th.area { padding: 4px 0px;} #netz #inhalt .contentz td { padding-top: " + a + "px; padding-bottom: " + b[AGO.Messages.shrink].bot + "px; } #messagebox .spy td { padding-top: " + a + "px; padding-bottom: " +
                                                          a + "px; }"
        )
        );
        if ((b = document.getElementById("inhalt")
            ) && !STR.getParameter("naviSwitch", c) && (c = b.querySelector("#messageContent form[name=delMsg]")
            ) && !c.hasAttribute("ago-status")) {
            c.setAttribute("ago-status", 1);
            c = c.querySelector("#mailz");
            AGO.Spiohelper.ShowContent();
            AGO.ShowmessageEspionage.ShowContent(c);
            if (1 < AGO.Time.status) {
                b = c.querySelectorAll("tr.entry td.date");
                for (a = 0; a < b.length; a++) {
                    b[a].setAttribute("original", b[a].textContent), b[a].textContent = AGO.Time.convertLocal(b[a].textContent);
                }
                AGO.Messages.changeTimeSpyreport(c)
            }
            AGO.Option.is("M04") &&
            AGO.Messages.addButtons();
            1 <= AGO.Option.get("M30", 2) && 5 > AGO.Option.get("M30", 2) && AGO.Messages.foldSpyreports(null, AGO.Option.get("M30", 2))
        }
    }, clickTooltip: function (b, a, c) {
    }, addButtons: function () {
        function b(a, b, c, e, h, k) {
            return 87 > b || 90 < b || h ? (c = AGO.Label.get(c), h && (c = c.replace("$subject", "'" + h + "'")
            ), '<input type="button" value="' + a + '" style="color: ' + (k || "#660011"
            ) + ';"' + AGO.Messages.getTooltip(c, e) + ' name="' + b + '">'
            ) : ""
        }

        var a;
        a = +AGO.Global.message({role: "getProperty", property: "aktCat"}) || 0;
        if (0 < a && 3 !==
                     a && 1 !== a && 0 < $(".selectContainer").length) {
            a = AGO.Label.get("M82").replace("$plunder", STR.formatNumber(1E3 * AGO.Option.get("M36", 2))).replace("$debris", STR.formatNumber(1E3 * AGO.Option.get("M37", 2)));
            var c = AGO.Label.get("M83") + " " + AGO.Option.get("M05", 2) + (100 > AGO.Option.get("M05", 2) ? " " + AGO.Label.get("L210") : ""
                );
            a = '<table class="anti_msg_buttons" style="width: 100%; table-layout: fixed;"><tr><td style="width: 0px;"></td><td style="width: 45px;">' + b("V", 81, "M81", "V", "", "#00B000") + '</td><td style="width: 71px;">' +
                b("< S", 82, a, "<") + b("< C", 83, c, "C") + '</td><td style="width: 71px;">' + b("E", 84, "M84", "E", "", "#191970") + b("P", 85, "M85", "P", "", "#CFCBC2") + '</td><td style="width: 71px;">' + b("S", 86, "M80", "S", AGO.Label.get("M86"), "#FF9600") + b("R", 87, "M80", "R", AGO.Label.get("M87")) + '</td><td style="width: 160px;">' + b("1", 88, "M80", "1", AGO.Option.get("M88", 6)) + b("2", 89, "M80", "2", AGO.Option.get("M89", 6)) + b("3", 90, "M80", "3", AGO.Option.get("M90", 6)) + '<span style="display: inline-block; width: 15px"> </span>' + b("X", 91, "M91",
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          "DEL"
            ) + '</td><td class="anti_msg_arrows" style="width: 30%;"></td><td class="anti_msg_fold" style="width: 30px; text-align: right;">';
            c = AGO.ShowmessageEspionage.count && AGO.Option.is("M30") ? '<a href="javascript:void(0);"><img src="/cdn/img/layout/fleetCloseAll.gif"></a>' : "";
            a = a + c + "</td></tr></table>";
            $("form[name=delMsg]").before(a).after(a);
            DOM.addEventsAll(".anti_msg_buttons input", null, {click: AGO.Messages.ButtonEvents});
            DOM.addEventsAll(".anti_msg_fold a", null, {click: AGO.Messages.foldSpyreports});
            $(".selectContainer").clone(!0).prependTo(".anti_msg_arrows:first").find("div").css("float", "left")
        }
    }, changeTimeCombatreport: function (b) {
        var a, c, d, f;
        $(".battlereport h3 ~ div.textCenter", b).each(function () {
                                                           a = STR.trim($(this).html());
                                                           20 < a.length && (c = a.lastIndexOf("("), 1 < c && (d = a.substring(c + 1).split(")").join("")
                                                           ) && 20 > d.length && (f = AGO.Time.convertLocal(d, "[d].[m].[Y] [H]:[i]:[s]"), $(this).html(a.substring(0, c + 1) + f + ")")
                                                                                                     )
                                                           )
                                                       }
        )
    }, changeTimeSpyreport: function (b) {
        var a, c, d, f;
        $("table.material.spy th.area",
          b
        ).each(function () {
                   (a = STR.trim($(this).html())
                   ) && 20 < a.length && (c = a.lastIndexOf(" ", a.length - 11), (d = a.substring(c + 1)
                                                                                 ) && 20 > d.length && (f = AGO.Time.convertLocal(d, "[m]-[d] [H]:[i]:[s]"), $(this).html(a.substring(0, c + 1) + f)
                                                                                 )
                   )
               }
        )
    }, foldSpyreports: function (b, a) {
        a || (a = (+$("td.anti_msg_fold").attr("status") || 0
                  ) + 1, 5 < a && (a = 1
        )
        );
        $("td.anti_msg_fold").attr("status", a);
        $("#section2").attr("ago_display_status", a);
        $(".anti_msg_fold a img").attr("src", "/cdn/img/layout/" + (5 === a ? "fleetCloseAll.gif" : "fleetOpenAll.gif"
                                       )
        );
        $('#messageContent tr[id^="spioDetails_"]').each(function (b) {
                                                             1 ===
                                                             a || 5 > a && $(this).hasClass("smallplunder") ? $(this).hide() : $(this).show();
                                                             b = $(".fleetdefbuildings.spy", this).eq(2).find("tr:not(:first-child)");
                                                             2 === a || 3 === a ? b.hide() : b.show();
                                                             b = $(".fleetdefbuildings.spy", this).eq(3).find("tr:not(:first-child)");
                                                             2 === a ? b.hide() : b.show()
                                                         }
        )
    }, ButtonEvents: function (b) {
        b && b.target && "button" === b.target.type && AGO.Messages.HandleButtons(+b.target.getAttribute("name"), b.shiftKey)
    }, onKeydown: function (b) {
        AGB.Log("AGO.Messages.onKeydown " + b.keyCode, !0);
        if (!b.inputType && !b.cached) {
            var a =
                0, c = 0, d = 0;
            switch (b.keyCode) {
                case 37:
                    a = b.shiftKey ? 1 : 2;
                    break;
                case 39:
                    a = b.shiftKey ? 4 : 3;
                    break;
                case 65:
                    d = 1;
                    break;
                case 81:
                    d = -1;
                    break;
                case 86:
                    c = 81;
                    break;
                case 46:
                    c = 91;
                    break;
                case 60:
                    c = 82;
                    break;
                case 67:
                    c = 83;
                    break;
                case 69:
                    c = 84;
                    break;
                case 80:
                    c = 85;
                    break;
                case 83:
                    c = 86;
                    break;
                case 82:
                    c = 87;
                    break;
                case 49:
                    c = 88;
                    break;
                case 50:
                    c = 89;
                    break;
                case 51:
                    c = 90;
                    break;
                case 70:
                    return AGO.Messages.foldSpyreports(), !1
            }
            if (a && (2 === a || 3 === a || "SELECT" !== document.activeElement.nodeName
                )) {
                return AGO.Messages.HandleArrows(a);
            }
            if (d) {
                return AGO.Messages.HandleSelect(d);
            }
            if (c) {
                return AGO.Messages.HandleButtons(c, b.shiftKey)
            }
        }
        return !0
    }, HandleArrows: function (b) {
        var a = document.querySelectorAll(".selectContainer a");
        return 4 <= a.length ? (DOM.click(a[b - 1]), !1
        ) : !0
    }, HandleSelect: function (b) {
        DOM.updateProperty("#mailz .first .checker", null, "checked", 1 !== b, 1);
        DOM.click("#mailz .first .checker")
    }, HandleButtons: function (b, a) {
        if (0 === $(".anti_msg_buttons").length) {
            return !0;
        }
        AGO.Global.message({role: "hideAll"});
        var c = !1;
        $("#mailz input.checker").each(function () {
                                           this.checked && (c = !0
                                           )
                                       }
        );
        var d = [], f;
        87 === b && (f = AGO.Label.get("M87")
        );
        88 === b && (f = AGO.Option.get("M88", 6)
        );
        89 === b && (f = AGO.Option.get("M89", 6)
        );
        90 === b && (f = AGO.Option.get("M90", 6)
        );
        f = STR.trim(f);
        $("#mailz tr.trigger").each(function () {
                                        var g = 91 === b || f && 0 === STR.trim($(this).find("td.subject").text()).indexOf(f) || 81 === b && $(this).hasClass("new") || 82 === b && $(this).hasClass("smallplunder") || 86 === b && 0 < $(this).find("td.subject span.espionagereport").length || 84 === b && 0 < $(this).find("td.subject a").attr("href").indexOf("&cat=8") || 85 === b &&
                                                                                                                                                                                                                                                                                                                                                                                 0 < $(this).find("td.subject a").attr("href").indexOf("&cat=6");
                                        if (83 === b || 84 === b) {
                                            var e = STR.trim($(this).find("td.subject span[class^=combatreport_ididattack_]").text());
                                            if (e) {
                                                e = STR.check(e.split("(")[1]).split(":");
                                                if (83 === b && 3 === e.length && 0 === NMR.parseIntFormat(e[1])) {
                                                    var h = NMR.parseIntFormat(e[2]), k = AGO.Option.get("M05", 2);
                                                    100 > k ? 0 === h % 1E3 && h <= 1E3 * k && (g = !0
                                                    ) : h <= k && (g = !0
                                                    )
                                                }
                                                84 === b && 1 === e.length && (g = !0
                                                )
                                            }
                                        }
                                        a && $(this).hasClass("new") && (g = !1
                                        );
                                        c && !$("input.checker", this).get(0).checked && (g = !1
                                        );
                                        g && d.push($(this).attr("id").toString().replace(/\D/g,
                                                                                          ""
                                                    )
                                        )
                                    }
        );
        0 < d.length && AGO.Global.message({role: "executeAction", msgIds: d, actionMode: 81 === b ? 412 : 407});
        return !1
    }, sendShips: function (b) {
        b && ("start" === b.mode ? (AGO.Messages.sendShipsMessage = 6 === b.mission ? b.message : 0, b = "#FF4B00"
        ) : b = b.success ? "#99CC00" : "#D43635", AGO.Messages.sendShipsMessage && DOM.setStyleColor('.defenseattack .anti_sim_button[rel="' + AGO.Messages.sendShipsMessage + '"]', null, b)
        )
    }
};
AGO.Showmessage = {
    Messages: function (b, a) {
        AGO.dummy = b + a
    }, Content: function (b, a, c, d, f) {
        $ = "jQuery"in window ? window.jQuery : null;
        a = (c = b ? b.querySelector(".showmessage") : null
            ) ? c.querySelector(".messagebox") : null;
        if (c && !c.hasAttribute("ago-status") && (c.setAttribute("ago-status", 1), b = DOM.getAttribute("span.ui-dialog-title", b.parentNode, "id", 3), c.setAttribute("ago_show", b), a && b
            )) {
            if (1 < AGO.Time.status && (c = a.querySelectorAll(".infohead tr:last-child td")
                ) && c.length) {
                for (d = 0; d < c.length; d++) {
                    c[d].setAttribute("original",
                                      c[d].textContent
                    ), c[d].textContent = AGO.Time.convertLocal(c[d].textContent);
                }
            }
            a.querySelector(".note > .battlereport") ? 1 < AGO.Time.status && AGO.Messages.changeTimeCombatreport(a) : a.querySelector(".note > .material.spy") ? (AGO.ShowmessageEspionage.ShowContent(a, b), 1 < AGO.Time.status && AGO.Messages.changeTimeSpyreport(a)
            ) : a.querySelector(".note > .other.newMessage") ? AGO.Showmessage.addQuoteButton(a, b) : a.querySelector(".note > .tooltipHTML.player:first-child") ? (AGO.Showmessage.showAlliance(a, b), AGO.Showmessage.addQuoteButton(a,
                                                                                                                                                                                                                                       b
            )
            ) : a.querySelector(".note > span.tooltip:first-child") && (b = $(".textWrapper .note", a), b.length && (a = $("span.tooltip", b).attr("title")
            ) && $(b).append('<p style="padding: 15px;">' + a + "</p>")
            )
        }
    }, onKeydown: function (b, a) {
        function c(a, b) {
            var c = (b || document
            ).querySelectorAll('.contentPageNavi a[href*="showmessage"]');
            2 <= c.length && DOM.click(c[a])
        }

        if (12 !== b.inputType && !b.cached) {
            if (37 === b.keyCode) {
                return c(0, a), !1;
            }
            if (39 === b.keyCode) {
                return c(1, a), !1;
            }
            if (46 === b.keyCode) {
                return DOM.click(".showMsgNavi .delete a", a),
                    !1
            }
        }
        return !0
    }, addQuoteButton: function (b, a) {
        if (0 < $(".answerHeadline", b).length) {
            var c = '<li class="ago_messages_quote"><a class="dark_highlight_tablet ago_messages_quote" title="Quote this message" href="javascript:void(0);" rel="' + a + '"><span class="icon icon_recall float_left"></span><span class="text">quote</span></a></li>';
            $("ul.toolbar > li.delete", b).after(c);
            $("a.ago_messages_quote").click(AGO.Showmessage.addQuote)
        }
    }, addQuote: function () {
        var b = $(this).attr("rel");
        if (b && (b = $('body > .ui-dialog .showmessage[ago_show="' +
                        b + '"]'
            ), b.length
            )) {
            var a = STR.trim($(".note", b).text()), c = a.indexOf(":"), a = "[background color=#1C232C][list]\n[*]" + a.substring(0, c + 1) + "[p]\n" + a.substring(c + 1) + "\n[/list][/background]";
            $(".answerForm textarea", b).val(a)
        }
    }, showAlliance: function (b, a) {
        var c = $(".textWrapper, textWrapperSmall", b);
        0 < c.length && ($(c).after('<div class="answerHeadline open">     answer        <a href="javascript:void(0);" class="openCloseForm"></a></div><div class="answerForm"><form action="index.php?page=allianceBroadcast" method="post"><input type="hidden" value="200" name="empfaenger"><div class="answerText"><textarea class="mailnew" name="text" tabindex="3"></textarea></div><div class="submit_answer"><span class="count textBeefy">(<span class="cntChars">0</span> / 2000)</span><span class="buttonbox" style="float: right;"><input type="submit" name="submitMail" value="Send" class="btn_blue float_right" tabindex="4"></span><br class="clearfloat"></div></form></div>'),
            $("form", b).attr("ago_show", a).submit(function () {
                                                        $.post($(this).attr("action"), $(this).serialize() + "&ajax=1");
                                                        var a = $(this).attr("ago_show");
                                                        $("span#ui-id-" + a).parent().find(".ui-dialog-titlebar-close").click();
                                                        return !1
                                                    }
            ), $(".openCloseForm", b).click(function (a) {
                                                $(".answerForm", this.parentNode.parentNode).toggle()
                                            }
        )
        )
    }
};
AGO.ShowmessageEspionage = {
    ShowContent: function (b, a) {
        var c;
        AGO.ShowmessageEspionage.count = 0;
        if (AGO.Option.is("M20") || AGO.Option.is("M04") || AGO.Option.is("M14") || 1 === AGO.Option.get("M30", 2)) {
            $(".material.spy", b).each(function (b) {
                                           AGO.ShowmessageEspionage.count++;
                                           b = $(this).parent();
                                           var f = $("th.area .rank_bandit1, th.area .rank_bandit2, th.area .rank_bandit3", this).length ? 2 : $("th.area .status_abbr_honorableTarget", this).length ? 1 : 0, g = AGO.ShowmessageEspionage.Activity(b, f), e = AGO.ShowmessageEspionage.CalculatePlunder(this,
                                                                                                                                                                                                                                                                                                          f
                                           ), h = AGO.ShowmessageEspionage.CalculateDebris(b), k;
                                           if (a) {
                                               k = $(this).parent().parent().parent().parent().attr("data-message-id");
                                           } else if (k = $(this).parent().parent().parent().attr("id")) {
                                               var l = "tr#TR" + k.replace(/spioDetails_/, "");
                                               e.enough || h.enough || $(l + ", tr#" + k).addClass("smallplunder");
                                               AGO.Option.is("M20") && AGO.ShowmessageEspionage.ShowTitle(l, e, h, g)
                                           }
                                           c = NMR.parseIntAbs(k);
                                           AGO.Option.is("M20") && (AGO.ShowmessageEspionage.ShowDebris(this, h), AGO.ShowmessageEspionage.ShowPlunder(this, e, f)
                                           );
                                           AGO.ShowmessageEspionage.SimulatorButtons(b.get(0),
                                                                                     c
                                           )
                                       }
            ), DOM.addEventsAll(".anti_send_ships", null, {click: AGO.ShowmessageEspionage.SendShips}), AGO.ShowmessageEspionage.count ? AGO.Option.set("Reports", 0) : document.querySelectorAll('#messageContent #mailz a.overlay[href*="cat=7"]').length && AGO.Option.set("Reports", 1);
        }
        AGO.Option.is("M16") && $(".defenseattack.spy .attack a", b).attr("target", "ago_fleet_attacks")
    }, SendShips: function (b) {
        if (b && b.target && b.target.name) {
            var a = b.target.parentNode.parentNode.parentNode.parentNode.parentNode;
            if (a && (a = a.querySelector("a.btn_blue[href]")
                )) {
                var c =
                    a.href, d = STR.check(a.href).split("&mission=1");
                d.length && ("am209" === b.target.name ? (d = d[0] + "&mission=8" + STR.check(d[1]), d = d.split("&type="), d = d[0] + "&type=2" + d[1].substring(1), d += "&routine=4"
                ) : d = STR.check(a.href) + "&routine=3", a.href = d + "&" + STR.check(b.target.name) + "=" + NMR.parseIntAbs(b.target.innerHTML), DOM.click(a), a.href = c
                )
            }
        }
    }, ShowTitle: function (b, a, c, d) {
        a = '<span class="anti_spy_info" style="color: ' + (a.enough ? "#FF9600" : "#848484"
        ) + ';" title="' + AGO.Label.get("M24") + '">' + STR.shortNumber(a.total, 0) + ' </span><span class="anti_spy_info" style="color: ' +
            (c.enough ? "#00B000" : "#848484"
            ) + ';" title="' + AGO.Label.get("M22") + '">' + STR.shortNumber(c.total, 0) + ' </span>&nbsp;&nbsp;&nbsp;<span style="color: red;" title="' + d.title + '">' + (d.time || "  "
            ) + " </span>";
        $(b).find("td.from").html(a)
    }, CalculatePlunder: function (b, a) {
        var c = $(".fragment td", b);
        if (5 <= c.length) {
            var d = 2 === a ? 1 : 1 === a ? .75 : .5, f = Math.floor(NMR.parseIntAbs(c.eq(1).text()) * d), g = Math.floor(NMR.parseIntAbs(c.eq(3).text()) * d), c = Math.floor(NMR.parseIntAbs(c.eq(5).text()) * d), e = f + g + c, h = 0 < e && e >= 1E3 * AGO.Option.get("M36",
                                                                                                                                                                                                                                                                           2
                );
            return {metal: f, crystal: g, deuterium: c, total: e, ratio: d, enough: h}
        }
        return {metal: 0, crystal: 0, deuterium: 0, total: 0, ratio: 0, enough: !1}
    }, CalculateDebris: function (b) {
        var a, c = {};
        $(".fleetdefbuildings.spy:lt(" + (AGO.Uni.defToTF ? 2 : 1
          ) + ") td.key", b
        ).each(function (b) {
                   (a = AGO.Item.getByName(STR.trim(this.textContent))
                   ) && (c[a] = NMR.parseIntAbs($(this).next().text())
                   )
               }
        );
        return AGO.Ogame.getDebris(c, !0)
    }, Activity: function (b, a) {
        var c = $(".aktiv.spy .area", b).text() || "", d = $('.aktiv.spy font[color="red"]', b).text() || "",
            f = '<span style="float: left; color: ' + (d ? "#FF0000" : "#848484"
                ) + ';" title="' + c + '">&nbsp;&nbsp;' + (d || "--"
                ) + " </span>", g = $(".material.spy .area", b).attr("plunder_status", a);
        0 < g.length && g.html(f + g.html());
        AGO.Option.is("M14") && $(".aktiv.spy", b).hide();
        return {title: c, time: d}
    }, ShowPlunder: function (b, a, c) {
        if (a.enough) {
            var d = 0;
            c = "";
            for (var f = AGO.Option.get("FA3", 2); ;) {
                d++;
                var g = Math.max(a.total, Math.min(.75 * (2 * a.metal + a.crystal + a.deuterium
                                                   ), 2 * a.metal + a.deuterium
                                 )
                    ), g = f ? g * (1 + f / 100
                    ) : g, e = "203", h = "202", k = 25E3,
                    l = 5E3;
                AGO.Option.is("FA2") && (e = "202", h = "203", k = 5E3, l = 25E3
                );
                c += '<tr><td class="key">' + AGO.Label.get("M24") + " " + (1 < d ? d : ""
                ) + '</td><td class="value"><span style="color: #FF9600;" title="' + AGO.Label.get("L091") + ": " + STR.formatNumber(a.metal) + " - " + AGO.Label.get("L092") + ": " + STR.formatNumber(a.crystal) + " - " + AGO.Label.get("L093") + ": " + STR.formatNumber(a.deuterium) + '">' + STR.formatNumber(a.total) + '</span></td><td class="key">' + AGO.Label.get("K" + h) + (f ? " (+" + f + "%)" : ""
                     ) + '</td><td class="value"><a class="anti_send_ships" href="javascript:void(0)" name="am' +
                     h + '">' + STR.formatNumber(Math.ceil(g / l)) + '</a></td><td class="key">' + AGO.Label.get("K" + e) + (f ? " (+" + f + "%)" : ""
                ) + '</td><td class="value"><a class="anti_send_ships" href="javascript:void(0)" name="am' + e + '">' + STR.formatNumber(Math.ceil(g / k)) + "</a></td>";
                g = 1 - a.ratio;
                a.metal = Math.floor(a.metal * g);
                a.crystal = Math.floor(a.crystal * g);
                a.deuterium = Math.floor(a.deuterium * g);
                a.total = a.metal + a.crystal + a.deuterium;
                a.enough = 0 < a.total && a.total >= 1E3 * AGO.Option.get("M36", 2);
                if (!a.enough || d >= AGO.Option.get("M28", 2)) {
                    break
                }
            }
            a =
            '<tr><th colspan="6" class="area">' + AGO.Label.get("M24") + " - " + Math.floor(100 * a.ratio) + " %</th></tr>";
            $(b).after('<table class="anti_spy">' + a + c + "</table>")
        }
    }, ShowDebris: function (b, a) {
        if (a.enough) {
            var c = '<tr><th colspan="6" class="area">' + AGO.Label.get("M22") + '</th></tr><tr><td class="key">' + AGO.Label.get("L091") + '</td><td class="value" style="color: #00B000;">' + STR.formatNumber(a.metal) + '</td><td class="key">' + AGO.Label.get("L092") + '</td><td class="value" style="color: #00B000;">' + STR.formatNumber(a.crystal) +
                    '</td><td class="key">' + AGO.Label.get("K209") + '</td><td class="value"><a class="anti_send_ships" href="javascript:void(0)" name="am209">' + STR.formatNumber(Math.ceil(a.total / 2E4)) + "</a></td></tr>";
            $(b).after('<table class="anti_spy">' + c + "</table>")
        }
    }, SimulatorButtons: function (b, a) {
        function c(a, b, c) {
            return 9 === a || AGO.Option.is(b) ? '<td class="attack"><a class="btn_blue anti_sim_button" name="' + a + '" rel="' + c + '">' + AGO.Label.get(b) + "</a></td>" : ""
        }

        var d = 1 === (+(($(".defenseattack.spy a.btn_blue", b).eq(0).attr("href") ||
                          ""
                         ).split("&type=")[1] || ""
        ).split("&")[0] || 0
        ) || AGO.Option.is("commander") ? c(9, "LM06", a) : "";
        AGO.Option.is("T00") && (d += c(3, "T5A", a) + c(1, "T5B", a) + c(2, "T5C", a)
        );
        $(".defenseattack.spy .attack", b).attr("colspan", "1").after(d);
        for (var d = b.querySelectorAll(".anti_sim_button"), f = 0; f < d.length; f++) {
            DOM.set(d[f], null, null, null, {click: AGO.ShowmessageEspionage.clickButton})
        }
    }, clickButton: function (b) {
        var a, c, d, f, g;
        b && (b.preventDefault(), b.target && b.target.name && (a = +b.target.name || 0, c = [
            "",
            "T5B",
            "T5C",
            "T5A"
        ][a], d = b.target.parentNode.parentNode.parentNode.parentNode.parentNode,
            f = +(d.innerHTML.split('plunder_status="')[1] || ""
            ).charAt(0) || 0, g = b.target.getAttribute("rel"), c ? AGO.ShowmessageEspionage.sendSimulate(c, d, f, b.shiftKey || b.ctrlKey) : 9 === a && AGO.ShowmessageEspionage.sendEspionage(a, d, g)
        )
        )
    }, sendEspionage: function (b, a, c) {
        b = ($('.material.spy .area a[target="_parent"]', a).text() || ""
        ).replace(/[^\d:]/g, "").split(":");
        a = +(($(".defenseattack.spy a.btn_blue", a).eq(0).attr("href") || ""
              ).split("&type=")[1] || ""
        ).split("&")[0] || 0;
        var d = {type: a, mission: 6, role: "sendShips"};
        d.galaxy =
        +b[0] || 0;
        d.system = +b[1] || 0;
        d.position = +b[2] || 0;
        d.message = c || 0;
        AGO.Task.checkCoords(d.galaxy, d.system, d.position) && (1 === a || AGO.Option.is("commander")
        ) && AGO.Global.message(d)
    }, sendSimulate: function (b, a, c, d) {
        var f, g, e, h, k;
        f = {};
        g = $(".material.spy .fragment td", a);
        5 <= g.length && (f.metal = NMR.parseIntAbs(g.eq(1).text()), f.crystal = NMR.parseIntAbs(g.eq(3).text()), f.deuterium = NMR.parseIntAbs(g.eq(5).text())
        );
        g = $(".material.spy .area", a).html() || "";
        e = $('.material.spy .area span[class*="status_abbr"]', a);
        f.coords =
        ($('.material.spy .area a[target="_parent"]', a).text() || ""
        ).replace(/[^\d:]/g, "");
        f.type = $(".material.spy .area figure", a).hasClass("moon") ? 3 : 1;
        f.name = (g.split("</figure>")[1] || ""
        ).split("<a")[0].split("<span")[0].trim();
        f.detail = e.text();
        f.status = e.attr("class").split("us_abbr_")[1];
        f.time = ($(".material.spy .area", a).text() || ""
        ).split((e.text() || ""
                ) + ")"
        )[1];
        f.plunder = 2 === c ? 100 : 1 === c ? 75 : 50;
        $(".fleetdefbuildings.spy:nth(3) td.key", a).each(function (a) {
                                                              f.timeResearch = 1;
                                                              h = AGO.Item.getByName(STR.trim($(this).text()));
                                                              if ("109" === h || "110" === h || "111" === h) {
                                                                  f[h] = NMR.parseIntAbs($(this).next().text())
                                                              }
                                                          }
        );
        $(".fleetdefbuildings.spy:lt(2) td.key", a).each(function (a) {
                                                             h = AGO.Item.getByName(STR.trim($(this).text()));
                                                             k = NMR.parseIntAbs($(this).next().text());
                                                             h && k && (f[h] = k
                                                             )
                                                         }
        );
        AGO.Tools.Action({id: b, shiftKeys: d, Task: f})
    }
};
AGO.Spiohelper = {
    Save: function () {
        AGO.Data.setStorage(AGO.App.keyPlayer + "_Messages_Espionage", AGO.Spiohelper.data)
    }, changeActive: function (b) {
        b && !AGO.Spiohelper.status && (AGO.Spiohelper.Run(), AGO.Spiohelper.ShowContent()
        );
        AGO.Spiohelper.changeDisplay(b || !1)
    }, changeDisplay: function (b) {
        var a;
        if (a = document.getElementById("spioHelper")) {
            a = $("table", a), b = b && b.target ? !a.is(":visible") : b, AGO.Option.set("M52", b, 1), b ? a.show() : a.hide()
        }
    }, Run: function () {
        if (AGO.Option.is("M51")) {
            AGO.Spiohelper.status = 5;
            AGO.Spiohelper.DATA =
            {
                UNI: $("meta[name=ogame-universe]").attr("content"),
                T1: "sort",
                T2: "summary of espionage reports",
                T3: "coordinates",
                T4: "age",
                T5: "player (<span style='color:#99CC00;font-weight:normal;'>activity</span>)",
                T6: "loot",
                T7: "DF",
                T8: "DEF",
                T9: "jump to spy report",
                T10: "max. $1 " + $.trim($("div#countColonies .textCenter").text()).split(" ")[1],
                T11: $('ul#menuTable a.menubutton[href$="page=galaxy"] .textlabel').text() + ": show position $1",
                T12: "count",
                T13: "no data",
                T14: "actions",
                T15: "check/uncheck all",
                T16: "invested resources",
                T17: "points",
                T18: "check/uncheck report",
                T20: "add",
                T21: "save",
                T22: $('ul#menuTable a.menubutton[href$="page=fleet1"] .textlabel').text(),
                T23: $('ul#menuTable a.menubutton[href$="page=defense"] .textlabel').text(),
                T28: "minimize/maximize table"
            };
            AGO.Spiohelper.data = AGO.Data.getStorage(AGO.App.keyPlayer + "_Messages_Espionage", "JSON");
            if (void 0 === AGO.Spiohelper.data.SORT || $.isEmptyObject(AGO.Spiohelper.data.SORT)) {
                AGO.Spiohelper.data.SORT = {
                    REL: "age",
                    INVERSE: !1
                }, AGO.Spiohelper.Save();
            }
            AGO.Spiohelper.BEVORZUGT =
            AGO.Option.is("FA2") ? ["A202", "A203"] : ["A203", "A202"];
            void 0 !== AGO.Spiohelper.data.CHECKED && $.isArray(AGO.Spiohelper.data.CHECKED) || (AGO.Spiohelper.data.CHECKED = [], AGO.Spiohelper.Save()
            );
            AGO.Spiohelper.DFPERCENT = AGO.Uni.debrisFactor || .3;
            AGO.Spiohelper.TECH = {
                A109: [AGO.Label.get("L109")],
                A110: [AGO.Label.get("L110")],
                A111: [AGO.Label.get("L111")],
                A115: [AGO.Label.get("L115")],
                A117: [AGO.Label.get("L117")],
                A118: [AGO.Label.get("L118")],
                A124: [AGO.Label.get("L124")],
                A202: [
                    AGO.Label.get("L202"), 2E3, 2E3, 0, "f",
                    5E3
                ],
                A203: [AGO.Label.get("L203"), 6E3, 6E3, 0, "f", 25E3],
                A204: [AGO.Label.get("L204"), 3E3, 1E3, 0, "f", 50],
                A205: [AGO.Label.get("L205"), 6E3, 4E3, 0, "f", 100],
                A206: [AGO.Label.get("L206"), 2E4, 7E3, 2E3, "f", 800],
                A207: [AGO.Label.get("L207"), 45E3, 15E3, 0, "f", 1500],
                A208: [AGO.Label.get("L208"), 1E4, 2E4, 1E4, "f", 7500],
                A209: [AGO.Label.get("L209"), 1E4, 6E3, 2E3, "f", 2E4],
                A210: [AGO.Label.get("L210"), 0, 1E3, 0, "f"],
                A211: [AGO.Label.get("L211"), 5E4, 25E3, 15E3, "f", 500],
                A212: [AGO.Label.get("L212"), 0, 2E3, 500, "f"],
                A213: [
                    AGO.Label.get("L213"),
                    6E4, 5E4, 15E3, "f", 2E3
                ],
                A214: [AGO.Label.get("L214"), 5E6, 4E6, 1E6, "f", 1E6],
                A215: [AGO.Label.get("L215"), 3E4, 4E4, 15E3, "f", 750],
                A502: [AGO.Label.get("L502")],
                A503: [AGO.Label.get("L503")],
                A401: [AGO.Label.get("L401"), 2E3, 0, 0, "d", 20],
                A402: [AGO.Label.get("L402"), 1500, 500, 0, "d", 20],
                A403: [AGO.Label.get("L403"), 6E3, 2E3, 0, "d", 80],
                A404: [AGO.Label.get("L404"), 2E4, 15E3, 2E3, "d", 350],
                A405: [AGO.Label.get("L405"), 2E3, 6E3, 0, "d", 80],
                A406: [AGO.Label.get("L406"), 5E4, 5E4, 3E4, "d", 1E3],
                A407: [
                    AGO.Label.get("L407"), 1E4, 1E4, 0, "d",
                    200
                ],
                A408: [AGO.Label.get("L408"), 5E4, 5E4, 0, "d", 1E3]
            };
            $.fn.sortElements = function () {
                var b = [].sort;
                return function (a, c) {
                    c = c || function () {
                        return this
                    };
                    var d = this.map(function () {
                                         var a = c.call(this), b = a.parentNode, d = b.insertBefore(document.createTextNode(""), a.nextSibling);
                                         return function () {
                                             if (b === this) {
                                                 throw Error("You can't sort elements if any one is a descendant of another.");
                                             }
                                             b.insertBefore(this, d);
                                             b.removeChild(d)
                                         }
                                     }
                    );
                    return b.call(this, a).each(function (a) {
                                                    d[a].call(c.call(this))
                                                }
                    )
                }
            }()
        }
    }, ShowContent: function () {
        var b,
            a;
        if (5 <= AGO.Spiohelper.status) {
            if (AGO.Spiohelper.data.LOOT = {
                    m: 0,
                    k: 0,
                    d: 0,
                    s: 0
                }, AGO.Spiohelper.data.DF = {m: 0, k: 0, s: 0}, b = $('tr[id^="spioDetails_"]'), 0 < b.size()) {
                var c = [];
                b.each(function () {
                           var a = AGO.Spiohelper.parseBericht($(this));
                           null !== a && c.push(a)
                       }
                );
                var d = AGO.Spiohelper.ausgabe(c);
                $("input#checkAll.checker").click(function () {
                                                      $(this).is(":checked") ? (d.find("th.checkAll").addClass("checked"), d.find("td.checkSingle").addClass("checked"), AGO.Spiohelper.addAllCheck(d)
                                                      ) : (d.find("th.checkAll").removeClass("checked"),
                                                          d.find("td.checkSingle").removeClass("checked"), AGO.Spiohelper.removeAllCheck(d)
                                                      )
                                                  }
                );
                d.find("th.checkAll").addClass("sh_pointer").click(function () {
                                                                       $(this).hasClass("checked") ? (DOM.updatePropertyAll('input[type="checkbox"].checker', null, "checked", !1, 1), d.find("th.checkAll").removeClass("checked"), d.find("td.checkSingle").removeClass("checked"), AGO.Spiohelper.removeAllCheck(d)
                                                                       ) : (DOM.updatePropertyAll('input[type="checkbox"].checker', null, "checked", !0, 1), d.find("th.checkAll").addClass("checked"), d.find("td.checkSingle").addClass("checked"),
                                                                           AGO.Spiohelper.addAllCheck(d)
                                                                       )
                                                                   }
                );
                $('input[type="checkbox"].checker').not(":first").click(function () {
                                                                            var a = $(this).attr("id");
                                                                            $(this).is(":checked") ? (d.find("td." + a).addClass("checked"), AGO.Spiohelper.addCheck(a)
                                                                            ) : (d.find("td." + a).removeClass("checked"), AGO.Spiohelper.removeCheck(a)
                                                                            )
                                                                        }
                );
                d.find("td.checkSingle").addClass("sh_pointer").click(function () {
                                                                          var a = /([0-9]+)/.exec($(this).attr("class"))[1];
                                                                          $(this).hasClass("checked") ? (DOM.updateProperty('input.checker[id="' + a + '"]', null, "checked", !1, 1), $(this).removeClass("checked"),
                                                                              AGO.Spiohelper.removeCheck(a)
                                                                          ) : (DOM.updateProperty('input.checker[id="' + a + '"]', null, "checked", !0, 1), $(this).addClass("checked"), AGO.Spiohelper.addCheck(a)
                                                                          )
                                                                      }
                );
                $("a.attackIconButton").click(function () {
                                                  var a = $(this).closest("tr").find("td.checkSingle");
                                                  if (!a.hasClass("checked")) {
                                                      var b = /([0-9]+)/.exec(a.attr("class"))[1];
                                                      DOM.updateProperty('input.checker[id="' + b + '"]', null, "checked", !0, 1);
                                                      a.addClass("checked");
                                                      AGO.Spiohelper.addCheck(b)
                                                  }
                                              }
                );
                if (0 < AGO.Spiohelper.data.CHECKED.length) {
                    for (b = 0; b < AGO.Spiohelper.data.CHECKED.length; b++) {
                        a =
                        AGO.Spiohelper.data.CHECKED[b];
                        var f = $("input#" + a + ".checker"), g = d.find("td." + a);
                        0 < f.length && 0 < g.length ? (DOM.updateProperty('input.checker[id="' + a + '"]', null, "checked", !0, 1), d.find("td." + a).addClass("checked")
                        ) : AGO.Spiohelper.removeCheck(a)
                    }
                    AGO.Spiohelper.data.CHECKED.length === c.length && (DOM.updateProperty("input#checkAll.checker", null, "checked", !0, 1), d.find("th.checkAll").addClass("checked")
                    )
                }
                var e = AGO.Spiohelper.data.SORT.INVERSE;
                d.show().find("table th").not('[rel="check"]').not('[rel="actions"]').addClass("sh_pointer").click(function () {
                                                                                                                       d.find("table tr").not(":first").removeClass("even");
                                                                                                                       var a = $(this), b = a.index(), c = a.attr("rel");
                                                                                                                       a.closest("table").find("td").filter(function () {
                                                                                                                                                                return $(this).index() === b
                                                                                                                                                            }
                                                                                                                       ).sortElements(function (a, b) {
                                                                                                                                          $(a).text() === AGO.Spiohelper.DATA.T13 ? a = -1 : (a = $("span", a).attr("data-value") || $(a).text(), a = AGO.Spiohelper.prepareForSorting(c, a)
                                                                                                                                          );
                                                                                                                                          $(b).text() === AGO.Spiohelper.DATA.T13 ? b = -1 : (b = $("span", b).attr("data-value") || $(b).text(), b = AGO.Spiohelper.prepareForSorting(c, b)
                                                                                                                                          );
                                                                                                                                          return (isNaN(a) || isNaN(b) ? a > b : +a > +b
                                                                                                                                                 ) ? e ? -1 : 1 : e ? 1 : -1
                                                                                                                                      }, function () {
                                                                                                                                          return this.parentNode
                                                                                                                                      }
                                                                                                                       );
                                                                                                                       d.find("table tr").not(":first").filter(":even").addClass("even");
                                                                                                                       AGO.Spiohelper.data.SORT.REL = c;
                                                                                                                       AGO.Spiohelper.data.SORT.INVERSE = e;
                                                                                                                       AGO.Spiohelper.Save();
                                                                                                                       e = !e
                                                                                                                   }
                );
                d.find("table tr").first().find('[rel="' + AGO.Spiohelper.data.SORT.REL + '"]').click();
                d.find("a.sh_arrow_minmax").click(AGO.Spiohelper.changeDisplay)
            } else if (b = $("#tab-msg li#1").hasClass("aktiv"), a = $("#section2 .mailWrapper a#7"), b && (0 < a.length && a.hasClass("active") || 0 === a.length
                )) {
                if (0 < AGO.Spiohelper.data.CHECKED.length) {
                    for (b = 0; b < AGO.Spiohelper.data.CHECKED.length; b++) {
                        a = AGO.Spiohelper.data.CHECKED[b], f =
                                                            $("input#" + a + ".checker"), 0 === f.length && AGO.Spiohelper.removeCheck(a);
                    }
                }
                AGO.Spiohelper.data.SORT.REL = "age";
                AGO.Spiohelper.data.SORT.INVERSE = !1;
                AGO.Spiohelper.Save()
            }
        }
    }, parseBericht: function (b) {
        try {
            var a = {
                ID: b.attr("id").replace(/spioDetails_/, ""),
                R1: NMR.parseIntFormat(b.find("table.material table td:eq(1)").html()),
                R2: NMR.parseIntFormat(b.find("table.material table td:eq(3)").html()),
                R3: NMR.parseIntFormat(b.find("table.material table td:eq(5)").html()),
                R4: NMR.parseIntFormat(b.find("table.material table td:eq(7)").html()),
                FDB: b.find("table.fleetdefbuildings").length
            };
            a.ACTIONS = $("tr#TR" + a.ID + ".entry td.actions a");
            var c = /\[(\d+:\d+:\d+)\][^\(]*\([^\(\s]+\s+[\']*([^\']+)[\']*\)/.exec(b.find("table.material tr:eq(0) th").html());
            a.COORDS = c[1];
            a.SPIELER = c[2];
            a.SPIELERNAME = (b.find('.material.spy .area span[class*="status_abbr"]').text() || ""
            ).trim();
            c = /([0-9]+):([0-9]+):([0-9]+)/.exec(a.COORDS);
            a.GALAXY = "http://" + AGO.Spiohelper.DATA.UNI + "/game/index.php?page=galaxy&galaxy=" + c[1] + "&system=" + c[2] + "&planet=" + c[3];
            var d = b.prev().find("td.date").html();
            a.DATE = AGO.Time.convertLocal(d);
            a.AGE = AGO.Time.ogameTime - AGO.Time.parse(d).getTime();
            a.FACTOR = $("th.area .rank_bandit1, th.area .rank_bandit2, th.area .rank_bandit3", b).length ? 1 : $("th.area .status_abbr_honorableTarget", b).length ? .75 : .5;
            a.ACTIVITY = b.find("table.aktiv font").html();
            a.ACTIVITY = a.ACTIVITY ? ' (<span style="color:#99CC00;">' + a.ACTIVITY + "</span>)" : "";
            c = b.find("table.defenseattack tr:eq(1) td.attack a");
            a.ATTACK = c.attr("href");
            a.ATTACKTITLE = c.html();
            a.MOON = !1;
            -1 !== a.ATTACK.indexOf("&type=3&") &&
            (a.MOON = !0
            );
            a.LOOT = {
                m: Math.round(a.R1 * a.FACTOR),
                k: Math.round(a.R2 * a.FACTOR),
                d: Math.round(a.R3 * a.FACTOR),
                s: 0
            };
            a.LOOT.s = a.LOOT.m + a.LOOT.k + a.LOOT.d;
            AGO.Spiohelper.data.LOOT.m += a.LOOT.m;
            AGO.Spiohelper.data.LOOT.k += a.LOOT.k;
            AGO.Spiohelper.data.LOOT.d += a.LOOT.d;
            AGO.Spiohelper.data.LOOT.s += a.LOOT.s;
            var f = a.FACTOR * Math.max(a.R1 + a.R2 + a.R3, Math.min(.75 * (2 * a.R1 + a.R2 + a.R3
                                                                     ), 2 * a.R1 + a.R3
                                        )
                ), g = AGO.Option.get("FA3", 2), g = g ? 1 + g / 100 : 1;
            a.SHIPS = [];
            a.EXTRASHIPS = [];
            for (c = 0; c < AGO.Spiohelper.BEVORZUGT.length; c++) {
                var e = Math.ceil(f /
                                  AGO.Spiohelper.TECH[AGO.Spiohelper.BEVORZUGT[c]][5]
                ), h = Math.ceil(f * g / AGO.Spiohelper.TECH[AGO.Spiohelper.BEVORZUGT[c]][5]);
                a.SHIPS.push(e);
                a.EXTRASHIPS.push(h - e)
            }
            a.FLEET = {m: 0, k: 0, d: 0, s: 0, p: 0};
            a.DEFENCE = {m: 0, k: 0, d: 0, s: 0, p: 0};
            a.DEF = 0;
            a.FLEETLIST = [];
            a.DEFENCELIST = [];
            b.find("table.fleetdefbuildings td.key").each(function () {
                                                              var b = $.trim($(this).text()), c = NMR.parseIntAbs($(this).next().text()), d;
                                                              for (d in AGO.Spiohelper.TECH) {
                                                                  AGO.Spiohelper.TECH[d][0] == b && (a[d] = [], a[d].push(c), 1 < AGO.Spiohelper.TECH[d].length &&
                                                                                                                              (a[d].push(c * AGO.Spiohelper.TECH[d][1]), a[d].push(c * AGO.Spiohelper.TECH[d][2]), a[d].push(c * AGO.Spiohelper.TECH[d][3]), "f" === AGO.Spiohelper.TECH[d][4] ? (a.FLEET.m += c * AGO.Spiohelper.TECH[d][1], a.FLEET.k += c * AGO.Spiohelper.TECH[d][2], a.FLEET.d += c * AGO.Spiohelper.TECH[d][3], a.FLEETLIST.push([
                                                                                                                                                                                                                                                                                                                                                                                                                                                           AGO.Spiohelper.TECH[d][0],
                                                                                                                                                                                                                                                                                                                                                                                                                                                           c
                                                                                                                                                                                                                                                                                                                                                                                                                                                       ]
                                                                                                                              )
                                                                                                                              ) : "d" === AGO.Spiohelper.TECH[d][4] && (a.DEFENCE.m += c * AGO.Spiohelper.TECH[d][1], a.DEFENCE.k += c * AGO.Spiohelper.TECH[d][2], a.DEFENCE.d += c * AGO.Spiohelper.TECH[d][3], a.DEF += c * AGO.Spiohelper.TECH[d][5],
                                                                                                                                  a.DEFENCELIST.push([
                                                                                                                                                         AGO.Spiohelper.TECH[d][0],
                                                                                                                                                         c
                                                                                                                                                     ]
                                                                                                                                  )
                                                                                                                              )
                                                                                                                              )
                                                                  )
                                                              }
                                                          }
            );
            a.FLEET.s = a.FLEET.m + a.FLEET.k + a.FLEET.d;
            a.FLEET.p = Math.floor(a.FLEET.s / 1E3);
            a.DEFENCE.s = a.DEFENCE.m + a.DEFENCE.k + a.DEFENCE.d;
            a.DEFENCE.p = Math.floor(a.DEFENCE.s / 1E3);
            a.DEBRISFIELD = {
                m: Math.round(a.FLEET.m * AGO.Spiohelper.DFPERCENT),
                k: Math.round(a.FLEET.k * AGO.Spiohelper.DFPERCENT),
                s: 0
            };
            a.DEBRISFIELD.s = a.DEBRISFIELD.m + a.DEBRISFIELD.k;
            AGO.Spiohelper.data.DF.m += a.DEBRISFIELD.m;
            AGO.Spiohelper.data.DF.k += a.DEBRISFIELD.k;
            AGO.Spiohelper.data.DF.s += a.DEBRISFIELD.s;
            a.RECS = Math.ceil(a.DEBRISFIELD.s / 2E4);
            var k = a.SHIPS[0];
            AGO.Option.is("FA3") && (k += a.EXTRASHIPS[0]
            );
            a.ATTACK += "&routine=3&am" + NMR.parseIntAbs(AGO.Spiohelper.BEVORZUGT[0]) + "=" + k;
            return a
        } catch (l) {
            return null
        }
    }, ausgabe: function (b) {
        var a, c = $("<div/>").attr("id", "spioHelper").hide();
        $("#messageContent").prepend(c);
        var d = $("<table/>").attr("cellspacing", "0").attr("cellpadding", "0").hide().appendTo(c);
        AGO.Option.is("M52") && d.show();
        var f = $("<tr/>").addClass("header").appendTo(d);
        $("<th/>").width(18).attr("rel",
                                  "check"
        ).attr("title", AGO.Spiohelper.DATA.T15).addClass("checkAll").addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel", "coords").text(AGO.Spiohelper.DATA.T3).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel", "age").text(AGO.Spiohelper.DATA.T4).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel", "player").html(AGO.Spiohelper.DATA.T5).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel",
                        "loot"
        ).text(AGO.Spiohelper.DATA.T6).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel", "df").text(AGO.Spiohelper.DATA.T7).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").attr("rel", "def").text(AGO.Spiohelper.DATA.T8).attr("title", AGO.Spiohelper.DATA.T1).addClass("tooltip").appendTo(f);
        $("<th/>").width(84).attr("rel", "actions").text(AGO.Spiohelper.DATA.T14).appendTo(f);
        for (var g = 0; g < b.length; g++) {
            var e = b[g], h = $("<tr/>").addClass("row").appendTo(d);
            0 === g % 2 && h.addClass("even");
            a = $("<td/>").addClass(e.ID).addClass("checkSingle").appendTo(h);
            $("<div/>").css({
                                width: "16px",
                                height: "16px"
                            }
            ).attr("title", AGO.Spiohelper.DATA.T18).addClass("tooltip").appendTo(a);
            a = $("<td/>").addClass("sh_textCenter").appendTo(h);
            a = $("<a/>").css("display", "block").attr("href", "#TR" + e.ID).attr("title", AGO.Spiohelper.DATA.T9).text(e.COORDS).addClass("tooltip").appendTo(a);
            e.MOON && $("<img/>").attr("src", "http://" + AGO.Spiohelper.DATA.UNI + "/cdn/img/galaxy/moon_a.gif").addClass("moon").appendTo(a);
            a = $("<td/>").appendTo(h);
            $("<span/>").text(AGO.Time.formatTime(e.AGE / 1E3, !0)).attr("title", e.DATE).attr("data-value", e.AGE).addClass("tooltipRight").appendTo(a);
            var k = $("<td/>").appendTo(h);
            a = AGO.Spiohelper.DATA.T13;
            e.A124 && (a = AGO.Spiohelper.DATA.T10.replace(/\$1/, 1 + Math.ceil(NMR.parseInt(e.A124[0]) / 2))
            );
            var l = "javascript:AGO_Data('" + e.SPIELERNAME + "',1,2);";
            $("<a/>").html(e.SPIELER + e.ACTIVITY).attr("title", a).attr("href", l).addClass("tooltipRight").appendTo(k);
            k = $("<td/>").addClass("sh_textRight").appendTo(h);
            l = AGO.Option.is("M53") ? STR.shortNumber(e.LOOT.s, 1) : STR.formatNumber(e.LOOT.s);
            a = '|<table cellspacing="0" cellpadding="10" style="border:0;">';
            for (var m = 0; m < AGO.Spiohelper.BEVORZUGT.length; m++) {
                var n = STR.formatNumber(e.SHIPS[m]);
                AGO.Option.is("FA3") && (n += " (+ " + e.EXTRASHIPS[m] + ")"
                );
                a += '<tr><td style="padding-right:10px;">' + AGO.Spiohelper.TECH[AGO.Spiohelper.BEVORZUGT[m]][0] + ': </td><td class="sh_textRight">' + n + "</td></tr>"
            }
            a += '<tr><td colspan="2" style="height:5px;"></td></tr>';
            a += '<tr><td style="padding-right:10px;">' +
                 AGO.Spiohelper.DATA.T6 + ': </td><td class="sh_textRight" style="color:#99CC00;">' + 100 * e.FACTOR + "%</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.LOOT.m) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.LOOT.k) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L093") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.LOOT.d) +
                 "</td></tr>";
            a += "</table>";
            0 === e.LOOT.s && (a = ""
            );
            $("<span/>").html(l).attr("title", a).attr("data-value", e.LOOT.s).addClass("tooltipHTML").appendTo(k);
            k = $("<td/>").addClass("sh_textRight").appendTo(h);
            l = AGO.Option.is("M53") ? STR.shortNumber(e.DEBRISFIELD.s, 1) : STR.formatNumber(e.DEBRISFIELD.s);
            a = '|<table cellspacing="0" cellpadding="10" style="border:0;">';
            a += '<tr><td style="padding-right:10px;">' + AGO.Spiohelper.TECH.A209[0] + ': </td><td class="sh_textRight">' + STR.formatNumber(e.RECS) + "</td></tr>";
            a +=
            '<tr><td colspan="2" style="height:5px;"></td></tr>';
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.DEBRISFIELD.m) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.DEBRISFIELD.k) + "</td></tr>";
            a += '<tr><td colspan="2" style="height:15px;"></td></tr>';
            a += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + AGO.Spiohelper.DATA.T16 +
                 "</td></tr>";
            a += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.FLEET.m) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.FLEET.k) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L093") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.FLEET.d) +
                 "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Spiohelper.DATA.T17 + ': </td><td class="sh_textRight" style="color:#99CC00;">' + STR.formatNumber(e.FLEET.p) + "</td></tr>";
            if (0 < e.FLEETLIST.length) {
                for (a += '<tr><td colspan="2" style="height:15px;"></td></tr>', a += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + AGO.Spiohelper.DATA.T22 + "</td></tr>", a += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>', m = 0; m < e.FLEETLIST.length; m++) {
                    n = e.FLEETLIST[m],
                        a += '<tr><td style="padding-right:10px;">' + n[0] + ': </td><td class="sh_textRight">' + STR.formatNumber(n[1]) + "</td></tr>";
                }
            }
            a += "</table>";
            0 === e.DEBRISFIELD.s && (a = ""
            );
            1 > e.FDB && (l = AGO.Spiohelper.DATA.T13
            );
            $("<span/>").html(l).attr("title", a).attr("data-value", e.DEBRISFIELD.s).addClass("tooltipHTML").appendTo(k);
            k = $("<td/>").addClass("sh_textRight").appendTo(h);
            l = AGO.Option.is("M53") ? STR.shortNumber(e.DEF, 1) : STR.formatNumber(e.DEF);
            a = '|<table cellspacing="0" cellpadding="10" style="border:0;">';
            a += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' +
                 AGO.Spiohelper.DATA.T16 + "</td></tr>";
            a += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>';
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.DEFENCE.m) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(e.DEFENCE.k) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L093") + ': </td><td class="sh_textRight">' +
                 STR.formatNumber(e.DEFENCE.d) + "</td></tr>";
            a += '<tr><td style="padding-right:10px;">' + AGO.Spiohelper.DATA.T17 + ': </td><td class="sh_textRight" style="color:#99CC00;">' + STR.formatNumber(e.DEFENCE.p) + "</td></tr>";
            if (0 < e.DEFENCELIST.length) {
                for (a += '<tr><td colspan="2" style="height:15px;"></td></tr>', a += '<tr><td colspan="2" style="color:#6F9FC8;font-weight:bold;font-size:11px;">' + AGO.Spiohelper.DATA.T23 + "</td></tr>", a += '<tr><td colspan="2"><div class="splitLine" style="min-height:1px;" /></td></tr>', m =
                                                                                                                                                                                                                                                                                                      0; m < e.DEFENCELIST.length; m++) {
                    n = e.DEFENCELIST[m], a += '<tr><td style="padding-right:10px;">' + n[0] + ': </td><td class="sh_textRight">' + STR.formatNumber(n[1]) + "</td></tr>";
                }
            }
            a += "</table>";
            0 === e.DEFENCE.s && (a = ""
            );
            2 > e.FDB && (l = AGO.Spiohelper.DATA.T13
            );
            $("<span/>").html(l).attr("title", a).attr("data-value", e.DEF).addClass("tooltipHTML").appendTo(k);
            a = f.find('[rel="def"]').index();
            h = $("<td/>").addClass("sh_textCenter").insertAfter(h.find("td:eq(" + a + ")"));
            h = $("<div/>").css("display", "inline-block").appendTo(h);
            e.ACTIONS.appendTo(h);
            a = AGO.Spiohelper.DATA.T11.replace(/\$1/, e.COORDS);
            $("<a/>").attr("href", e.GALAXY).attr("title", a).text("G").addClass("SHicon").addClass("tooltip").appendTo(h);
            e = $("<a/>").attr("href", e.ATTACK).attr("title", e.ATTACKTITLE).text("A").addClass("attackIconButton").addClass("SHicon").addClass("tooltip").appendTo(h);
            AGO.Option.is("M16") && e.attr("target", "ago_fleet_attacks")
        }
        b = '<span style="padding: 3px;">' + AGO.Spiohelper.DATA.T12 + ": " + b.length + " | " + AGO.Spiohelper.DATA.T6 + ': <span id="SHsummaryLOOT">' +
            STR.formatNumber(AGO.Spiohelper.data.LOOT.s) + "</span> | " + AGO.Spiohelper.DATA.T7 + ': <span id="SHsummaryDF">' + STR.formatNumber(AGO.Spiohelper.data.DF.s) + '</span></span><a href="javascript:void(0);" class="sh_arrow_minmax"><img src="/cdn/img/layout/fleetCloseAll.gif"></a>';
        $("<div/>").width(600).height(20).html(b).addClass("summary").prependTo(c);
        0 < AGO.Spiohelper.data.LOOT.s && (a = '|<table cellspacing="0" cellpadding="10" style="border:0;">' + ('<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") +
                                                                                                                ': </td><td class="sh_textRight">' + STR.formatNumber(AGO.Spiohelper.data.LOOT.m) + "</td></tr>"
        ), a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(AGO.Spiohelper.data.LOOT.k) + "</td></tr>", a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L093") + ': </td><td class="sh_textRight">' + STR.formatNumber(AGO.Spiohelper.data.LOOT.d) + "</td></tr>", a += "</table>", $("#SHsummaryLOOT").attr("title", a).addClass("tooltipHTML").css("cursor", "help")
        );
        0 < AGO.Spiohelper.data.DF.s && (a = '|<table cellspacing="0" cellpadding="10" style="border:0;">' + ('<tr><td style="padding-right:10px;">' + AGO.Label.get("L091") + ': </td><td class="sh_textRight">' + STR.formatNumber(AGO.Spiohelper.data.DF.m) + "</td></tr>"
        ), a += '<tr><td style="padding-right:10px;">' + AGO.Label.get("L092") + ': </td><td class="sh_textRight">' + STR.formatNumber(AGO.Spiohelper.data.DF.k) + "</td></tr>", a += "</table>", $("#SHsummaryDF").attr("title", a).addClass("tooltipHTML").css("cursor", "help")
        );
        return c
    },
    addCheck: function (b) {
        -1 === AGO.Spiohelper.data.CHECKED.indexOf(b) && (AGO.Spiohelper.data.CHECKED.push(b), AGO.Spiohelper.Save()
        )
    }, removeCheck: function (b) {
        0 < AGO.Spiohelper.data.CHECKED.length && (b = AGO.Spiohelper.data.CHECKED.indexOf(b), -1 !== b && (AGO.Spiohelper.data.CHECKED.splice(b, 1), AGO.Spiohelper.Save()
        )
        )
    }, addAllCheck: function (b) {
        b.find("td.checkSingle").each(function () {
                                          var a = /([0-9]+)/.exec($(this).attr("class"))[1];
                                          AGO.Spiohelper.addCheck(a)
                                      }
        )
    }, removeAllCheck: function (b) {
        b.find("td.checkSingle").each(function () {
                                          var a =
                                              /([0-9]+)/.exec($(this).attr("class"))[1];
                                          AGO.Spiohelper.removeCheck(a)
                                      }
        )
    }, prepareForSorting: function (b, a) {
        var c, d;
        return "coords" === b ? (c = 0, d = /([0-9]+):([0-9]+):([0-9]+)/.exec(a), null !== d && (c = NMR.parseInt(("00" + d[1]
                                                                                                                  ).slice(-2) + ("000" + d[2]
                                                                                                                  ).slice(-3) + ("00" + d[3]
                                                                                                                  ).slice(-2)
        )
        ), c
        ) : "age" === b ? NMR.parseIntFormat(a) : "player" === b ? (c = a.replace(/\s\([0-9]+\)/g, ""), c = $.trim(c.toLowerCase())
        ) : "loot" === b || "df" === b || "def" === b ? NMR.parseIntFormat(a) : a
    }
};