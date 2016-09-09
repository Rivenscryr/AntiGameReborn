var DOM = {
    query: function (a, b) {
        return "string" === typeof a ? b ? "object" === typeof b ? b.querySelector(a) : "id" === b ? document.getElementById(a) : document.getElementById(b) ? document.getElementById(b).querySelector(a) : null : document.querySelector(a) : a
    }, queryAll: function (a, b) {
        return "string" === typeof a ? (b || document
        ).querySelectorAll(a) : a && "object" === typeof a && "length"in a ? a : []
    }, findParent: function (a, b, c, d) {
        if ((a = DOM.query(a, b)
            ) && c) {
            for (d = d || 0; a && 0 <= d;) {
                if (a.id === c) {
                    return a;
                }
                d--;
                a = a.parentNode
            }
        }
        return null
    }, isDescendant: function (parent, child) {
        var node = child.parentNode;
        while (node != null) {
            if (node == parent) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
    }, iterate: function (a,
                          b
    ) {
        var c;
        if (a && "object" === typeof a && "length"in a) {
            for (c = 0; c < a.length; c++) {
                a[c] && b(a[c])
            }
        }
    }, iterateChildren: function (a, b) {
        if (a) {
            for (var c = a.firstChild; c; c = c.nextSibling) {
                1 === c.nodeType && b(c)
            }
        }
    }, hasChildren: function (a) {
        return a && a.children ? a.children.length : 0
    }, getChildren: function (a, b) {
        return a && a.children ? a.children[b] : null
    }, getSelectedNode: function (a) {
        return a && a.options && "selectedIndex"in a ? a.options[a.selectedIndex] : null
    }, getChildnodeByName: function (a, b) {
        if (a && a.children) {
            for (var c = 0; c < a.children.length; c++) {
                if (a.children[c].tagName ===
                    b) {
                    return a.children[c];
                }
            }
        }
        return null
    }, prependChild: function (a, b) {
        a && b && (a.childNodes.length ? a.insertBefore(b, a.childNodes[0]) : a.appendChild(b)
        )
    }, appendChild: function (a, b) {
        a && b && a.appendChild(b)
    }, before: function (a, b) {
        a && b && a.parentNode.insertBefore(b, a)
    }, after: function (a, b) {
        a && b && (a.nextElementSibling ? a.parentNode.insertBefore(b, a.nextElementSibling) : a.parentNode.appendChild(b)
        )
    }, replaceChildren: function (a, b) {
        if (a) {
            for (; a.firstChild;) {
                a.removeChild(a.firstChild);
            }
            b && a.appendChild(b)
        }
    }, removeChildren: function (a,
                                 b
    ) {
        var c;
        if (a) {
            for (c = 0; c < a.childNodes.length; c++) {
                b && a.childNodes[c].nodeType !== b || a.removeChild(a.childNodes[c])
            }
        }
    }, create: function (a, b, c, d, e) {
        var f;
        a = document.createElement(a);
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (f in b) {
                    b.hasOwnProperty(f) && a.setAttribute(f, b[f]);
                }
            }
        }
        if (c) {
            for (f in c) {
                c.hasOwnProperty(f) && (a.style[f] = c[f]
                );
            }
        }
        if (d) {
            for (f in d) {
                d.hasOwnProperty(f) && a.addEventListener(f, d[f], !1);
            }
        }
        if (e) {
            for (f in e) {
                e.hasOwnProperty(f) && (a[f] = e[f]
                );
            }
        }
        return a
    }, parse: function (html) {
        // based on jQuery.buildFragment()
        //
        // jQuery JavaScript Library v1.11.3
        // http://jquery.com/
        //
        // Copyright 2005, 2014 jQuery Foundation, Inc. and other contributors
        // Released under the MIT license
        // http://jquery.org/license
        var rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
            rtagName = /<([\w:]+)/,
            rhtml = /<|&#?\w+;/,
            wrapMap = {
                option: [ 1, "<select multiple='multiple'>", "</select>" ],
                legend: [ 1, "<fieldset>", "</fieldset>" ],
                area: [ 1, "<map>", "</map>" ],
                param: [ 1, "<object>", "</object>" ],
                thead: [ 1, "<table>", "</table>" ],
                tr: [ 2, "<table><tbody>", "</tbody></table>" ],
                col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
                td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
                _default: [ 0, "", "" ]
            },
            nodes = [];
        wrapMap.optgroup = wrapMap.option, wrapMap.th = wrapMap.td,
        wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;

        if (!rhtml.test(html)) {
            // Convert non-html into a text node
            return document.createTextNode(html);
        } else {
            // Convert html into DOM nodes
            var tmp = document.createElement('div');

            // Deserialize a standard representation
            var tag = (rtagName.exec(html) || ["", ""])[1].toLowerCase();
            var wrap = wrapMap[tag] || wrapMap._default;

            tmp.innerHTML = wrap[1] + html.replace(rxhtmlTag, "<$1></$2>" ) + wrap[2];

            // Descend through wrappers to the right content
            var j = wrap[0] + 1;
            while (j--) {
                tmp = tmp.lastChild;
            }

            return tmp;
        }
    }, append: function (a, b, c, d, e, f, g) {
        var h;
        a = a ? a.appendChild(document.createElement(b)) :
            document.createElement(b);
        if (c) {
            if ("string" === typeof c) {
                a.className = c;
            } else {
                for (h in c) {
                    c.hasOwnProperty(h) && a.setAttribute(h, c[h]);
                }
            }
        }
        if (d) {
            for (h in d) {
                d.hasOwnProperty(h) && (a.style[h] = d[h]
                );
            }
        }
        if (e) {
            for (h in e) {
                e.hasOwnProperty(h) && a.addEventListener(h, e[h], !1);
            }
        }
        if (f) {
            for (h in f) {
                f.hasOwnProperty(h) && (a[h] = f[h]
                );
            }
        }
        g && a.setAttribute("ago-data", JSON.stringify(g));
        return a
    }, appendDIV: function (a, b, c) {
        var d;
        a = a ? a.appendChild(document.createElement("div")) : document.createElement("div");
        if (b) {
            if ("string" === typeof b) {
                a.className =
                b;
            } else {
                for (d in b) {
                    b.hasOwnProperty(d) && a.setAttribute(d, b[d]);
                }
            }
        }
        if (c) {
            for (d in c) {
                c.hasOwnProperty(d) && (a.style[d] = c[d]
                );
            }
        }
        return a
    }, appendTABLE: function (a, b, c, d) {
        var e;
        a = a ? a.appendChild(document.createElement("table")) : document.createElement("table");
        a.style.tableLayout = "fixed";
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (e in b) {
                    b.hasOwnProperty(e) && a.setAttribute(e, b[e]);
                }
            }
        }
        if (c) {
            for (e in c) {
                c.hasOwnProperty(e) && (a.style[e] = c[e]
                );
            }
        }
        if (d) {
            for (b = a.appendChild(document.createElement("colgroup")), e = 0; e < d.length; e++) {
                b.appendChild(document.createElement("col")).style.width =
                d[e] + "px";
            }
        }
        return a
    }, appendTR: function (a, b, c) {
        var d;
        a = a ? a.appendChild(document.createElement("tr")) : document.createElement("tr");
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (d in b) {
                    b.hasOwnProperty(d) && a.setAttribute(d, b[d]);
                }
            }
        }
        c && a.setAttribute("ago-data", "string" === typeof c ? c : JSON.stringify(c));
        return a
    }, appendTD: function (a, b, c, d, e) {
        var f;
        a = a ? a.appendChild(document.createElement("td")) : document.createElement("td");
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (f in b) {
                    b.hasOwnProperty(f) &&
                    a.setAttribute(f, b[f]);
                }
            }
        }
        if (c = HTML.setText(c, d, e)) {
            a.textContent = c;
        }
        return a
    }, appendLI: function (a, b, c, d, e) {
        var f;
        a = a ? a.appendChild(document.createElement("li")) : document.createElement("li");
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (f in b) {
                    b.hasOwnProperty(f) && a.setAttribute(f, b[f]);
                }
            }
        }
        if (c = HTML.setText(c, d, e)) {
            a.textContent = c;
        }
        return a
    }, appendSPAN: function (a, b, c, d, e) {
        var f;
        a = a ? a.appendChild(document.createElement("span")) : document.createElement("span");
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (f in b) {
                    b.hasOwnProperty(f) &&
                    a.setAttribute(f, b[f]);
                }
            }
        }
        if (c = HTML.setText(c, d, e)) {
            a.textContent = c;
        }
        return a
    }, appendTEXT: function (a, b, c, d) {
        (b = HTML.setText(b, c, d)
        ) && a.appendChild(document.createTextNode(b))
    }, appendIMG: function (a, b, c) {
        var d;
        a = a ? a.appendChild(document.createElement("img")) : document.createElement("img");
        if (b) {
            if ("string" === typeof b) {
                a.src = b;
            } else {
                for (d in b) {
                    b.hasOwnProperty(d) && a.setAttribute(d, b[d]);
                }
            }
        }
        if (c) {
            if ("string" === typeof b) {
                a.style.width = a.style.height = c;
            } else {
                for (d in c) {
                    c.hasOwnProperty(d) && (a.style[d] = c[d]
                    );
                }
            }
        }
        return a
    },
    appendA: function (a, b, c, d, e) {
        var f;
        a = a ? a.appendChild(document.createElement("a")) : document.createElement("a");
        if (b) {
            if ("string" === typeof b) {
                a.className = b, a.href = "javascript:void(0)";
            } else {
                for (f in b.href || (b.href = "javascript:void(0)"
                ), b) {
                    b.hasOwnProperty(f) && a.setAttribute(f, b[f]);
                }
            }
        } else {
            a.href = "javascript:void(0)";
        }
        d && a.setAttribute("ago-data", "string" === typeof d ? d : JSON.stringify(d));
        if (c) {
            for (f in c) {
                c.hasOwnProperty(f) && a.addEventListener(f, c[f], !1);
            }
        }
        e && a.setAttribute("disabled", "disabled");
        return a
    }, appendSELECT: function (a,
                               b, c, d, e
    ) {
        var f;
        a = a ? a.appendChild(document.createElement("select")) : document.createElement("select");
        if (b) {
            if ("string" === typeof b) {
                a.className = b;
            } else {
                for (f in b) {
                    b.hasOwnProperty(f) && a.setAttribute(f, b[f]);
                }
            }
        }
        if (e) {
            for (f in e) {
                e.hasOwnProperty(f) && a.addEventListener(f, e[f], !1);
            }
        }
        for (f in c) {
            c.hasOwnProperty(f) && (b = a.appendChild(document.createElement("option")), b.value = f, b.textContent = AGO.Label.get(c[f]).replace(/&lt;/g, "<"), d === f && (a.selectedIndex = a.options.length - 1
            )
            );
        }
        return a
    }, appendSCRIPT: function (a, b) {
        var c;
        a && (c = document.createElement("script"), c.setAttribute("type", "text/javascript"), c.textContent = "string" === typeof a ? a : "(" + a.toString() + ")();", document.head.appendChild(c), b && document.head.removeChild(c)
        )
    }, set: function (a, b, c, d, e, f) {
        var g;
        if (a = DOM.query(a, b)) {
            if (c) {
                for (g in c) {
                    c.hasOwnProperty(g) && a.setAttribute(g, c[g]);
                }
            }
            if (d) {
                for (g in d) {
                    d.hasOwnProperty(g) && (a.style[g] = d[g]
                    );
                }
            }
            if (e) {
                for (g in e) {
                    e.hasOwnProperty(g) && a.addEventListener(g, e[g], !1);
                }
            }
            if (f) {
                for (g in f) {
                    f.hasOwnProperty(g) && (a[g] = f[g]
                    )
                }
            }
        }
    }, setAll: function (a,
                         b, c, d, e, f
    ) {
        b = DOM.queryAll(a, b);
        for (a = 0; a < b.length; a++) {
            DOM.set(b[a], null, c, d, e, f)
        }
    }, getText: function (a, b, c) {
        a = DOM.query(a, b);
        return HTML.getText(a ? a.textContent : "", c)
    }, getTextChild: function (a, b, c) {
        var d;
        if ((b = DOM.query(a, b)
            ) && b.childNodes) {
            for (a = 0; a < b.childNodes.length && (3 !== +b.childNodes[a].nodeType || !(d = (b.childNodes[a].nodeValue || ""
            ).trim()
            )
            ); a++) {
                ;
            }
        }
        return HTML.getText(d, c)
    }, setText: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            9 === d ? a.innerHTML = c || "" : a.textContent = HTML.setText(c, d, e)
        }
    }, updateText: function (a,
                             b, c, d, e
    ) {
        if (a = DOM.query(a, b)) {
            if (c = HTML.setText(c, d, e), c !== a.textContent) {
                return a.textContent = c, a;
            }
        }
        return null
    }, updateTextChild: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            if (c = HTML.setText(c, d, e), 3 === +a.firstChild.nodeType) {
                if (c !== a.firstChild.textContent) {
                    return a.firstChild.textContent = c, a
                }
            } else {
                return DOM.prependChild(a, document.createTextNode(c)), a;
            }
        }
        return null
    }, getAttribute: function (a, b, c, d) {
        a = DOM.query(a, b);
        return HTML.getText(a ? a.getAttribute(c) : "", d)
    }, setAttribute: function (a, b, c, d, e) {
        (a = DOM.query(a,
                       b
        )
        ) && a.setAttribute(c, HTML.setValue(d, e))
    }, removeAttribute: function (a, b, c) {
        (a = DOM.query(a, b)
        ) && a.removeAttribute(c)
    }, updateAttribute: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            if (d = HTML.setValue(d, e), a.getAttribute(c) !== d) {
                return a.setAttribute(c, d), a;
            }
        }
        return null
    }, setData: function (a, b, c) {
        (a = DOM.query(a, b)
        ) && c && a.setAttribute("ago-data", "string" === typeof c ? c : JSON.stringify(c))
    }, getData: function (a, b, c) {
        return DOM.getAttributeParent(a, b, "ago-data", -2, c)
    }, getAttributeParent: function (a, b, c, d, e) {
        if (a = DOM.query(a,
                          b
            )) {
            for (e = e || 0; a && 0 <= e;) {
                if (a.hasAttribute(c)) {
                    return DOM.getAttribute(a, null, c, d);
                }
                e--;
                a = a.parentNode
            }
        }
        return HTML.getText("", d)
    }, getProperty: function (a, b, c, d) {
        a = DOM.query(a, b);
        return HTML.getText(a ? a[c] : "", d)
    }, setProperty: function (a, b, c, d, e) {
        (a = DOM.query(a, b)
        ) && (a[c] = HTML.setValue(d, e)
        )
    }, updateProperty: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            if (d = HTML.setValue(d, e), a[c] !== d) {
                return a[c] = d, a
            }
        }
    }, updatePropertyAll: function (a, b, c, d, e) {
        b = DOM.queryAll(a, b);
        for (a = 0; a < b.length; a++) {
            DOM.updateProperty(b[a], null,
                               c, d, e
            )
        }
    }, getValue: function (a, b, c) {
        a = DOM.query(a, b);
        return HTML.getText(a ? a.value : "", c)
    }, setValue: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            a.value = HTML.setValue(c, d), e && DOM.trigger(a, null, e)
        }
    }, updateValue: function (a, b, c, d, e) {
        if (a = DOM.query(a, b)) {
            if (c = HTML.setValue(c, d), c !== a.value) {
                return a.value = c, e && DOM.trigger(a, null, e), a;
            }
        }
        return null
    }, hasClass: function (a, b, c) {
        return (a = DOM.query(a, b)
               ) ? HTML.hasClass(a.className, c) : !1
    }, updateClass: function (a, b, c) {
        return (a = DOM.query(a, b)
               ) && a.className !== (c || ""
        ) ? (a.className =
             c || "", a
               ) : null
    }, addClass: function (a, b, c) {
        (b = DOM.query(a, b)
        ) && c && (a = (" " + (b.className || ""
        ).toLowerCase() + " "
        ).indexOf(" " + c.toLowerCase().trim() + " "), -1 === a && (b.className = (b.className ? b.className + " " : ""
                                                                                  ) + c
        )
        )
    }, extendClass: function (a, b, c) {
        (a = DOM.query(a, b)
        ) && c && (a.className = ((a.className || ""
                                  ) + " " + c
        ).trim()
        )
    }, removeClass: function (a, b, c) {
        var d;
        (b = DOM.query(a, b)
        ) && c && (d = (" " + (b.className || ""
        ).toLowerCase() + " "
        ).indexOf(" " + c.toLowerCase().trim() + " "), -1 < d && (a = 0 < d ? b.className.slice(0, d).trim() : "", c = b.className.slice(d +
                                                                                                                                         c.length
        ).trim(), b.className = a + (a && c ? " " : ""
        ) + c
        )
        )
    }, removeClassGroup: function (a, b, c) {
        (a = DOM.query(a, b)
        ) && c && (c = (a.className || ""
        ).replace(new RegExp("(^|\\s)" + c + "(\\w|_)*", "g"), " ").trim(), c !== a.className && (a.className = c
        )
        )
    }, setClassGroup: function (a, b, c, d) {
        (a = DOM.query(a, b)
        ) && c && (c = (a.className || ""
                       ).replace(new RegExp("(^|\\s)" + c + "(\\w|_)*", "g"), " ").trim() + (d ? " " + d : ""
                       ), c !== a.className && (a.className = c
        )
        )
    }, setStyleColor: function (a, b, c) {
        if (a = DOM.query(a, b)) {
            a.style.color = c || ""
        }
    }, setStyleDisplay: function (a,
                                  b, c
    ) {
        if (a = DOM.query(a, b)) {
            a.style.display = c || "none"
        }
    }, updateStyle: function (a, b, c, d) {
        return (a = DOM.query(a, b)
               ) && a.style[c] !== (d || ""
        ) ? (a.style[c] = d || "", a
               ) : null
    }, addObserver: function (a, b, c) {
        var d;
        a && c && (d = new window.MutationObserver(c)
        ) && d.observe(a, b || {childList: !0});
        return d
    }, removeObserver: function (a) {
        try {
            a && a.disconnect && a.disconnect()
        } catch (b) {
        }
    }, click: function (a, b) {
        DOM.trigger(a, b, "click")
    }, trigger: function (a, b, c) {
        (b = DOM.query(a, b)
        ) && c && ("click" === c || "mouseup" === c || "mousedown" === c || "mouseover" ===
                                                                            c || "mouseout" === c ? (a = document.createEvent("MouseEvents"), a.initMouseEvent(c, !0, !0, window, 0, 0, 0, 0, 0, !1, !1, !1, !1, 0, null), b.dispatchEvent(a)
                   ) : "change" === c || "focus" === c || "blur" === c ? (a = document.createEvent("HTMLEvents"), a.initEvent(c, !0, !1), b.dispatchEvent(a)
        ) : "keyup" === c && (a = document.createEvent("KeyboardEvent"), "initKeyboardEvent"in a ? a.initKeyboardEvent("keyup", !0, !0, window, !1, !1, !1, !1, 0, 0) : a.initKeyEvent("keyup", !0, !0, window, !1, !1, !1, !1, 0, 0), b.dispatchEvent(a)
        )
        )
    }, addEvents: function (a, b, c) {
        var d;
        if (a =
            DOM.query(a, b)) {
            for (d in c) {
                c.hasOwnProperty(d) && a.addEventListener(d, c[d], !1)
            }
        }
    }, addEventsAll: function (a, b, c) {
        var d;
        b = DOM.queryAll(a, b);
        for (a = 0; a < b.length; a++) {
            for (d in c) {
                c.hasOwnProperty(d) && b[a].addEventListener(d, c[d], !1)
            }
        }
    }, setFocus: function (a, b) {
        var c = DOM.query(a, b);
        c && c.focus()
    }, disableAutocomplete: function () {
        AGO.Option.is("U41") && window.setTimeout(function () {
                                                      DOM.setAll("form", null, {autocomplete: "off"})
                                                  }, 0
        )
    }, disableActiveElement: function (a) {
        if (AGO.Init.mobile && document.activeElement) {
            if ("TEXTAREA" ===
                document.activeElement.tagName || "INPUT" === document.activeElement.tagName && "text" === document.activeElement.type) {
                if (VAL.check(AGO.App.page, "fleet1", "fleet2")) {
                    DOM.setFocus("continue", "id");
                } else if ("fleet3" === AGO.App.page) {
                    DOM.setFocus("start", "id");
                } else {
                    try {
                        document.activeElement.blur()
                    } catch (b) {
                    }
                }
            } else {
                a || window.setTimeout(DOM.disableActiveElement, 30, !0)
            }
        }
    }, changeInput: function (a, b) {
        var c, d;
        return a && b && (!AGO.isFirefox || AGO.Option.is("U41")
        ) ? (c = a.shiftKey && a.ctrlKey ? 1E3 : a.ctrlKey ? 100 : a.shiftKey ? 10 : 1, d = DOM.getValue(b,
                                                                                                         null, 2
        ), d = 38 === a.keyCode ? d + c : d - c, DOM.setValue(b, null, Math.max(d, 0)), DOM.trigger(b, null, "keyup"), !1
               ) : !0
    }
}, HTML = {
    getText: function (a, b) {
        if (1 === b) {
            return Boolean(a);
        }
        if (2 === b) {
            return NMR.parseIntFormat(a);
        }
        if (3 === b) {
            return NMR.parseIntAbs(a);
        }
        if (7 === b) {
            return (a || ""
            ).trim();
        }
        if (-2 === b) {
            try {
                return JSON.parse(a || "{}")
            } catch (c) {
                return {}
            }
        } else {
            return a || ""
        }
    }, setText: function (a, b, c) {
        b && (a = 2 === b ? STR.formatNumber(a) : 4 === b ? STR.formatNumber(a, !0) : 5 === b ? STR.shortNumber(a) : 3 === b ? a ? STR.formatNumber(a) : "0" : 7 === b ? STR.trim(a) :
                                                                                                                                                               8 === b ? STR.zero(a) : 10 === b ? AGO.Label.get(a) : 11 === b ? AGO.Label.get(a, 1) : 12 === b ? AGO.Label.get(a, 2) : 15 === b ? AGO.Time.format(a, c) : 16 === b ? AGO.Time.format(a, c, !0) : 17 === b ? AGO.Time.formatTimestamp(a, c) : 18 === b ? AGO.Time.formatTime(a) : 19 === b ? AGO.Time.formatTime(a, !0) : a
        );
        return a ? a + "" : ""
    }, setValue: function (a, b) {
        b && (a = 1 === b ? Boolean(a) : 7 === b ? STR.trim(a) : 8 === b ? STR.zero(a) : -2 === b ? JSON.stringify(a || {}) : a
        );
        return a ? a + "" : ""
    }, urlImage: function (a) {
        return AGO.App.pathSkin + "ago/images/" + a
    }, urlMissionIcon: function (a) {
        return AGO.App.pathSkin +
               "ago/images/task/mission-" + (a || 0
            ) + ".gif"
    }, urlTypeIcon: function (a, b) {
        return AGO.App.pathSkin + "ago/images/task/type-" + (a || 0
            ) + (b || "a"
               ) + ".gif"
    }, hasClass: function (a, b) {
		a = a.replace(/\s+/g, " ");
        return b ? -1 < (" " + (a || ""
        ).toLowerCase() + " "
        ).indexOf(" " + b.toLowerCase().trim() + " ") : !1
    }, classMission: function (a) {
        return "ago_color_M" + STR.trimZero(a, 2)
    }, classType: function (a) {
        return AGO.Styles.classType[a] || ""
    }, classStatus: function (a) {
        return 0 < a ? "ago_color_lightgreen" : 0 > a ? "ago_color_palered" : "ago_color_orange"
    }, classStatusData: function (a) {
        return AGO.Styles.classStatusData[(a ||
                                           0
                                          ) + 2] || ""
    }, colorStatusData: function (a) {
        return AGO.Styles.colorStatusData[(a || 0
                                          ) + 2] || ""
    }, color: function (a, b) {
        return !a || 4 !== a.length && 7 !== a.length ? "" : 0 < b && 100 > b ? (a = 7 === a.length ? parseInt(a.substring(1, 3), 16) + "," + parseInt(a.substring(3, 5), 16) + "," + parseInt(a.substring(5, 7), 16) : parseInt(a.substring(1, 2), 16) + "," + parseInt(a.substring(2, 3), 16) + "," + parseInt(a.substring(3, 4), 16), "rgba(" + a + (10 > b ? ",0.0" : ",0."
        ) + b + ")"
        ) : a
    }, getPlayer: function (a, b, c) {
        return (c ? '<span class="honorRank ' + AGO.Ogame.getHonorClass(c) + '">&nbsp;</span>' :
                ""
               ) + '<span class="' + AGO.Token.getClass(b) + '">' + (a || ""
               ) + "</span>"
    }
}, OBJ = {
    parse: function (a) {
        if (a && "object" === typeof a) {
            return a;
        }
        try {
            return JSON.parse(a || "{}")
        } catch (b) {
            return {}
        }
    }, split: function (a, b) {
        var c = {}, d, e, f;
        d = STR.check(a).split(b || ";");
        for (f = 0; f < d.length; f++) {
            e = (d[f] || ""
            ).split("="), e[0] && (c[e[0]] = e[1] || ""
            );
        }
        return c
    }, create: function (a) {
        var b = {}, c;
        if (a && "object" === typeof a) {
            for (c in a) {
                "object" !== typeof a[c] && (b[c] = a[c]
                );
            }
        }
        return b
    }, createKey: function (a, b) {
        var c = {};
        a && (c[a] = b
        );
        return c
    }, copy: function (a,
                       b
    ) {
        var c;
        if (a && "object" === typeof a && b && "object" === typeof b) {
            for (c in a) {
                "object" !== typeof a[c] && (b[c] = a[c]
                )
            }
        }
    }, is: function (a) {
        return a && "object" === typeof a
    }, hasProperties: function (a) {
        return a && "object" === typeof a && Object.keys(a).length
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
    }, iterateFilter: function (a, b, c) {
        if (a && "object" === typeof a) {
            for (var d in a) {
                a.hasOwnProperty(d) &&
                -1 !== c.indexOf(d) && b(d)
            }
        }
    }, iterateArray: function (a, b) {
        Array.isArray(a) && a.forEach(b)
    }, deleteWhere: function (obj, key, value) {
        if (obj && "object" === typeof obj) {
            for (var i in obj) {
                obj.hasOwnProperty(i) && obj[i][key] === value && delete obj[i]
            }
        }
    }, isEmpty: function (object) {
        for(var key in object) {
            if(object.hasOwnProperty(key)){
                return false;
            }
        }
        return true;
    }
}, VAL = {
    choose: function (a) {
        return 0 < a ? arguments[a] : ""
    }, select: function (a) {
        for (var b = 1; b < arguments.length; b++) {
            if (a === arguments[b]) {
                return arguments[b]
            }
        }
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
}, NMR = {
    minMax: function (a, b, c) {
        return Math.max(Math.min(+a || 0, c), b)
    }, isMinMax: function (a, b, c) {
        return +a >= b && +a <= c
    }, isGreater: function (a,
                            b
    ) {
        return 0 < +b && +a >= +b
    }, isLesser: function (a, b) {
        return 0 < +a && +b >= +a
    }, parseInt: function (a) {
        return "string" === typeof a ? parseInt(a, 10) : "number" === typeof a ? Math.floor(a) : 0
    }, parseIntFormat: function (a) {
        return "string" === typeof a ? +a.replace(/[^\d\-]/g, "") || 0 : "number" === typeof a ? Math.floor(a) : 0
    }, parseIntAbs: function (a) {
        return "string" === typeof a ? +a.replace(/[^\d]/g, "") || 0 : "number" === typeof a ? Math.floor(Math.abs(a)) : 0
    }, parseVersion: function (a) {
        return (a = /(\d+)\D*(\d*)\D*(\d*)\D*(\d*)/.exec(a ? a.toString() : "")
               ) ?
               parseInt(("00" + a[1]
                        ).slice(-2) + ("00" + a[2]
                        ).slice(-2) + ("00" + a[3]
                        ).slice(-2) + ("00" + a[4]
                        ).slice(-2), 10
               ) : 0
    }, parseIntShortcut: function (a) {
        a = STR.check(a).toLowerCase();
        return (-1 < a.indexOf("k") ? 1E3 : 1
               ) * parseInt(a.replace(/[^\d]/g, ""), 10)
    }, parseIntRess: function (a) {
        var r;
        a = STR.trim((a.match(/: ([^<]+)*/) ? a.match(/: ([^<]+)*/)[1] : a));
        if (a.match(/^[0-9]{1,3}\.[0-9]{3}$/))
            a = a.replace('.', '');
        else if((r = new RegExp('^([0-9]{1,3}(\.|,))?[0-9]{1,3}(' + AGO.Label.is("KU0B") + ')')) && a.match(r))
            a = a.replace(/,/g,'.').replace(AGO.Label.is("KU0B"),'')*1000000000;
        else if((r = new RegExp('^([0-9]{1,3}(\.|,))?[0-9]{1,3}(' + AGO.Label.is("KU0M") + ')')) && a.match(r))
            a = a.replace(/,/g,'.').replace(AGO.Label.is("KU0M"),'')*1000000;
        return parseInt(a);
    }
}, STR = {
    check: function (a) {
        return "string" === typeof a ? a : "number" === typeof a && a ? a + "" : ""
    }, trim: function (a) {
        return "string" === typeof a ? a.trim() : "number" === typeof a && a ? a + "" : ""
    }, zero: function (a) {
        return a ? "string" === typeof a ? a : "number" === typeof a ? a + "" : "0" : "0"
    }, trimZero: function (a,
                           b
    ) {
        a = "0000" + a;
        return a.substr(a.length - b)
    }, formatNumber: function (a, b) {
        var c = "";
        if (a) {
            b && (1E9 <= Math.abs(a) ? (a = Math.floor(a / 1E6), c = "\u2009" + AGO.Label.is("KU0M")
            ) : 1E6 <= Math.abs(a) && (a = Math.floor(a / 1E3), c = "\u2009" + AGO.Label.is("KU0K")
            )
            );
            for (var d = [], e = Math.abs(+a || 0) + ""; ;) {
                var f = e.slice(-3);
                if (f) {
                    d.unshift(f), e = e.substr(0, e.length - f.length);
                } else {
                    break
                }
            }
            return (0 > a ? "-" : ""
                   ) + d.join(AGO.Label.is("KU0S")) + c
        }
        return 0
    }, shortNumber: function (a, b) {
        var c, d;
        c = 2 === b ? 1 : 1 === b ? 10 : 100;
        if (1E9 <= a) {
            c = Math.ceil(a / 1E7 / c) + "", d =
                                             AGO.Label.is("KU0B");
        } else if (1E6 <= a) {
            c = Math.ceil(a / 1E4 / c) + "", d = AGO.Label.is("KU0M");
        } else if (1E3 <= a) {
            c = Math.ceil(a / 10 / c) + "", d = AGO.Label.is("KU0K");
        } else {
            return a ? a : "0";
        }
        return b ? c.substr(0, c.length - b) + AGO.Label.is("KU0S") + c.substr(c.length - b) + "\u2009" + d : c + "\u2009" + d
    }, getParameter: function (a, b) {
        var c = decodeURIComponent(b || "").replace(/\?/g, "&").split("&" + a + "=")[1];
        return c ? c.split("&")[0].split("#")[0] || "" : ""
    }, addParameter: function (a, b) {
        b = STR.trim(b);
        return a && b ? "&" + a + "=" + encodeURI(b) :
               ""
    }, splitParameter: function (a) {
        var b, c, d;
        if (a = decodeURIComponent(a || "").replace(/\?/g, "&").split("#")[0]) {
            for (b = {}, a = a.split("&"), d = 0; d < a.length; d++) {
                c = (a[d] || ""
                ).split("="), c[0] && (b[c[0]] = c[1] || ""
                );
            }
        }
        return b
    }, getMatches: function (string, regex, index) {
        index || (index = 1); // default to the first capturing group
        var matches = [];
        var match;
        while (match = regex.exec(string))
            matches.push(match[index]);
        return matches;
    }
};