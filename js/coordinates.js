var AGO = {
    Select: function () {
        var a, c;
        "getSelection"in window && (a = window.getSelection(), a.rangeCount && (c = a.toString()
        )
        );
        !c && document.activeElement && (a = document.activeElement, "TEXTAREA" === a.tagName || "INPUT" === a.tagName && "text" === a.type
        ) && (c = (a.value || ""
        ).substring(a.selectionStart, a.selectionEnd)
        );
        c && 5 <= c.length && 60 > c.length && (c = AGO.parseTarget(c, 1), c.coords || c.time
        ) && (c = AGO.check(c.coordstype || c.coords) + "|" + AGO.check(c.time), AGO.Memory(c)
        )
    }, parseTarget: function (a) {
        var c = {}, b, d;
        if (a = AGO.check(a)) {
            (b = a.match(/([^\d:]|\b)t\s{0,2}\d{1,2}:\d{1,3}:\d{1,2}(:\d)*([^\d:]|\b)/i)
            ) &&
            b[0] && (d = b[0], a = ""
            ), (b = a.match(/([^\d:]|\b)\d{1,2}\.\d{1,2}(\.\d{2}|\.\d{4})*([^\d:]|\b)/)
               ) && b[0] && (d = b[0] + " " + a.split(b[0])[1], a = a.split(b[0])[0]
               ), (b = a.match(/([^\d:]|\b)\d{1,2}:\d{1,3}:\d{1,2}(:\d)*([^\d:]|\b)/)
                  ) && b[0] && (d || a.split(b[0]), AGO.updateCoordsType(c, b[0].replace(/[^\d:]/g, ""))
                  );
        }
        return c
    }, updateCoordsType: function (a, c) {
        var b;
        if (c = AGO.check(c)) {
            b = c.split(":"), 1 <= +b[3] && 3 >= +b[3] && (a.type = +b[3] || 0
            ), AGO.checkCoords(+b[0], +b[1], +b[2]) && (a.galaxy = +b[0] || 0, a.system = +b[1] || 0, a.position = +b[2] ||
                                                                                                                   0, a.coords = a.galaxy + ":" + a.system + ":" + a.position
            )
        }
    }, checkCoords: function (a, c, b) {
        return 1 <= a && 50 >= a && 1 <= c && 499 >= c && 1 <= b && 17 >= b
    }, Memory: function (a) {
        console.log("Memory " + a);
        "chrome"in window ? chrome.runtime.sendMessage("", {
                                                           page: "Background",
                                                           role: "Set",
                                                           para: {key: "Panel_Target", value: a}
                                                       }
        ) : API.Messages("Background", "Set", JSON.stringify({key: "Panel_Target", value: a}))
    }, check: function (a) {
        return "string" === typeof a ? a : "number" === typeof a ? a + "" : ""
    }
};
document.addEventListener("mouseup", function () {
                              AGO.Select()
                          }, !1
);