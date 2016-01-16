if (!AGB) {
    var AGB = {};
}
AGB.Panel = {
    Data: {}, Messages: function (a, b, c) {
        "Set" === a ? AGB.Panel.Set(b) : "ListAccount" === a && AGB.Panel.ListAccount(b, c)
    }, Init: function (a, b) {
        var c, d, e, f;
        if (f = AGB.App.getPlayer(a)) {
            AGB.Panel.Data[f] = {}, c = AGB.Panel.Data[f], d = OBJ.parse(b[AGB.Data.getKey(f, "Panel", "Data")]), d.version !== AGB.Data.get("Panel", "Data", "version") && (d = {}
            ), AGB.Data.iterate("Panel", function (a, b) {
                                    a.tab && (c[b] = {}, "label"in a && (c[b].label = a.label || ""
                                    ), 2 <= a.tab && (e = OBJ.is(d[b]) ? d[b] : [], c[b].status = +e[0] || 0, c[b].data = STR.check(e[1])
                                    )
                                    )
                                }
            )
        }
    },
    Save: function (a) {
        var b, c, d;
        c = AGB.App.getPlayer(a);
        b = AGB.Panel.Data[c];
        AGB.Data.isStatus(c) && b && (a.backup || b.changed
        ) && (delete b.changed, d = {version: AGB.Data.get("Panel", "Data", "version")}, AGB.Data.iterate("Panel", function (a, b) {
                                                                                                              2 <= a.tab && (d[b] = [
                                                                                                                  AGB.Panel.get(c, b, "status"),
                                                                                                                  AGB.Panel.get(c, b, "data", 6)
                                                                                                              ]
                                                                                                              )
                                                                                                          }
        ), a.save && (a.save[c + "_Panel_Data"] = JSON.stringify(d)
        ), a.backup && AGB.Data.isBackup(c, "Panel", "Data", 2) && (a.backup.Panel_Data = JSON.stringify(d)
        )
        )
    }, Cache: function (a, b) {
        var c;
        c = AGB.App.getPlayer(a);
        AGB.Panel.Data[c] &&
        (AGB.Panel.Data[c].Cache = b
        )
    }, ListAccount: function (a, b) {
        var c, d, e;
        d = AGB.App.getPlayer(a);
        c = AGB.Panel.Data[d];
        d && c && (e = {
            tab: "Account",
            statusColor: {}
        }, e.Units = a.planet && "account" !== a.planet ? AGB.Units.SummarizePosition(a) : AGB.Units.SummarizeAccount(a), AGB.Units.iterate(d, function (a, b) {
                                                                                                                                                var c = e.statusColor, d = +a.timeShip, h = +a.timeResource, g;
                                                                                                                                                d ? (d = AGB.Time.timestampMinute() - d, g = 3600 < d ? 4 : 60 < d ? 5 : 6
                                                                                                                                                ) : h && (d = AGB.Time.timestampMinute() - h, g = 3600 < d ? 1 : 60 < d ? 2 : 3
                                                                                                                                                );
                                                                                                                                                c[b] = AGB.Styles.colorStatusUnits[g || 0] || ""
                                                                                                                                            }
        )
        );
        b && b(e)
    },
    Set: function (a) {
        var b, c;
        c = AGB.App.getPlayer(a);
        b = AGB.Panel.Data[c];
        if (c && b && (c = AGB.Panel.getTab(a)
            ) && a.key) {
            if (OBJ.is(a.value) || b[c][a.key] !== a.value) {
                b.changed = !0, AGB.Data.Change();
            }
            b[c][a.key] = a.value
        }
    }, get: function (a, b, c, d) {
        a = a && AGB.Panel.Data[a] && b && AGB.Panel.Data[a][b] && c ? AGB.Panel.Data[a][b][c] : "";
        return 6 === d ? STR.check(a) : +a || 0
    }, getActive: function (a, b, c, d) {
        var e;
        a && AGB.Panel.Data[a] && b && AGB.Panel.Data[a][b] && c && (e = OBJ.get(AGB.Panel.Data[a][b].active, c)
        );
        return 6 === d ? STR.check(e) : +e || 0
    }, getTab: function (a) {
        return a.tab &&
               OBJ.is(AGB.Panel.Data[a.keyPlayer][a.tab]) ? a.tab : ""
    }
};
AGB.Box = {
    Data: {}, Messages: function (a, b, c) {
        "List" === a && AGB.Box.List(b, c)
    }, Init: function (a) {
        var b;
        if (a = AGB.App.getPlayer(a)) {
            AGB.Box.Data[a] = {}, b = AGB.Box.Data[a], AGB.Data.iterate("Box", function (a, d) {
                                                                            a.tab && (b[d] = {}
                                                                            )
                                                                        }
            )
        }
    }, List: function (a, b) {
        var c;
        (c = AGB.App.getPlayer(a, "copy")
        ) && AGB.Box.Data[c] ? AGB.DataBase.GetPlayer(a, function (d) {
                                                          d = d || {};
                                                          d.tab = a.tab;
                                                          d.id = a.id;
                                                          AGB.Box.Data[c].Cache = d;
                                                          b && b(d)
                                                      }
        ) : b && b()
    }
};