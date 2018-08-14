if (!AGB) {
    var AGB = {};
}
AGB.Time = {
    timestamp: function () {
        return Math.floor(Date.now() / 1E3)
    }, timestampMinute: function () {
        return Math.floor((Date.now() - 1381E9
        ) / 6E4
        )
    }, timestampMinuteConvert: function (a) {
        return 1E3 < a ? 60 * (+a || 0
        ) + 1381E6 : 0
    }
};
var VAL = {
    choose: function (a) {
        return 0 < a ? arguments[a] : ""
    }, check: function (a) {
        for (var b = 1; b < arguments.length; b++) {
            if (a === arguments[b]) {
                return !0;
            }
        }
        return !1
    }, status: function (a, b, c, d) {
        return 0 > a ? b : 0 < a ? d : c
    }
}, OBJ = {
    is: function (a) {
        return a && "object" === typeof a
    }, get: function (a, b) {
        return a && "object" === typeof a && b in a ? a[b] : ""
    }, set: function (a, b, c) {
        a && "object" === typeof a && (a[b] = c
        )
    }, iterate: function (a, b) {
        if (a && "object" === typeof a) {
            for (var c in a) {
                a.hasOwnProperty(c) && b(c)
            }
        }
    }, iterateArray: function (a, b) {
        Array.isArray(a) &&
        a.forEach(b)
    }, create: function (a) {
        var b = {}, c;
        if (a && "object" === typeof a) {
            for (c in a) {
                "object" !== typeof a[c] && "function" !== typeof a[c] && (b[c] = a[c]
                );
            }
        }
        return b
    }, createKey: function (a, b) {
        var c = {};
        a && (c[a] = b
        );
        return c
    }, createFilter: function (a, b) {
        var c = {}, d;
        if (a && "object" === typeof a) {
            for (d in a) {
                a.hasOwnProperty(d) && "object" !== typeof a[d] && (!b || d in b
                ) && (c[d] = a[d]
                );
            }
        }
        return c
    }, copy: function (a, b) {
        var c;
        if (a && "object" === typeof a && b && "object" === typeof b) {
            for (c in a) {
                "object" !== typeof a[c] && (b[c] = a[c]
                )
            }
        }
    }, parse: function (a) {
        if (a &&
            "object" === typeof a) {
            return a;
        }
        try {
            return JSON.parse(a || "{}")
        } catch (b) {
            return {}
        }
    }, parseCopy: function (a, b) {
        var c, d;
        if (a && b) {
            try {
                c = a && "object" === typeof a ? a : JSON.parse(a || "{}")
            } catch (e) {
                c = null
            }
            if (c) {
                for (d in c) {
                    "object" !== typeof c[d] && (b[d] = c[d]
                    )
                }
            }
        }
    }, split: function (a) {
        var b = {}, c, d;
        a = STR.check(a).split(";");
        for (d = 0; d < a.length; d++) {
            c = (a[d] || ""
            ).split("="), c[0] && (b[c[0]] = c[1] || ""
            );
        }
        return b
    }
}, STR = {
    is: function (a) {
        return Boolean(a && "string" === typeof a)
    }, check: function (a) {
        return "string" === typeof a ? a : "number" === typeof a &&
        a ? a + "" : ""
    }, trim: function (a) {
        return "string" === typeof a ? a.trim() : "number" === typeof a && a ? a + "" : ""
    }, zero: function (a) {
        return a ? "string" === typeof a ? a : "number" === typeof a ? a + "" : "0" : "0"
    }, trimZero: function (a, b) {
        a = "0000" + a;
        return a.substr(a.length - b)
    }, compare: function (a, b) {
        return "string" === typeof a && "string" === typeof a ? a.length === b.length && a === b : !1
    }, getAttribute: function (a, b) {
        return "string" === typeof a ? ((a.split(" " + b + '="')[1] || ""
            ).split('"')[0] || ""
        ).trim() : ""
    }, getParameter: function (a, b) {
        var c = decodeURIComponent(b ||
            ""
        ).replace(/\?/g, "&").split("&" + a + "=")[1];
        return c ? c.split("&")[0].split("#")[0] || "" : ""
    }, addUrlPara: function (a, b) {
        var c = encodeURI(STR.check(b).trim());
        return a && c ? "&" + a + "=" + c : ""
    }, hash: function (a) {
        var b, c = 0;
        if ("string" === typeof a && 0 < a.length) {
            for (b = 0; b < a.length; b++) {
                c = (c << 5
                ) - c + a.charCodeAt(b), c &= c;
            }
        }
        return c
    }
}, NMR = {
    minMax: function (a, b, c) {
        return Math.max(Math.min(+a || 0, c), b)
    }, isMinMax: function (a, b, c) {
        return +a >= b && +a <= c
    }, parseInt: function (a) {
        return "string" === typeof a ? parseInt(a, 10) : "number" === typeof a ?
            Math.floor(a) : 0
    }, parseIntFormat: function (a) {
        return "string" === typeof a ? +a.replace(/[^\d\-]/g, "") || 0 : "number" === typeof a ? Math.floor(a) : 0
    }, parseIntAbs: function (a) {
        return "string" === typeof a ? +a.replace(/[^\d]/g, "") || 0 : "number" === typeof a ? Math.floor(Math.abs(a)) : 0
    }
};