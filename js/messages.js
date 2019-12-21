var $;
AGO.Messages = {
    messageTabEvents: {
        'subtabs-nfFleet20': 'onViewFleetsEsp',
        'subtabs-nfFleet21': 'onViewFleetsCombat',
        'subtabs-nfFleet22': 'onViewFleetsExpedition',
        'subtabs-nfFleet23': 'onViewFleetsUnion',
        'subtabs-nfFleet24': 'onViewFleetsOther',
        'subtabs-nfCommunication10': 'onViewCommunicationMessages',
        'subtabs-nfCommunication14': 'onViewCommunicationInfo',
        'subtabs-nfCommunication12': 'onViewCommunicationCombat',
        'subtabs-nfCommunication11': 'onViewFleetsEsp',
        'subtabs-nfCommunication13': 'onViewCommunicationExpedition',
        'tabs-nfEconomy': 'onViewEconomy',
        'tabs-nfUniverse': 'onViewUniverse',
        'tabs-nfSystem': 'onViewSystem',
        'tabs-nfFavorites': 'onViewFavorites'
    },
    currentTab: "",
    handlingMessageTabEvent: false,

    allMessages: {},
    visibleMessages: {},
    spyReports: {},
    spyReportsKeys: {},

    spyTableData: {
        sortDesc: false,
        sortSequence: 'age',
        checkedMessages: []
    },

    defaultProbeCount: 0,

    Load: function () {
        var a;
        OBJ.hasProperties(a = AGO.Data.getStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", "JSON")) ? AGO.Messages.spyTableData = a : AGO.Data.setStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", AGO.Messages.spyTableData);
    },

    Save: function () {
        AGO.Data.setStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", AGO.Messages.spyTableData);
    },

    Content: function (content) {
        $(content).find(".detail_msg").length && $(content).find(".detail_msg").data("messageType") === 10 && AGO.Messages.addActButtons("probeReport", content);
    },

    Ready: function () {
        $ = "jQuery" in window ? window.jQuery : !0;
        DOM.addObserver(DOM.query('#messages .js_tabs'), {childList: true, subtree: true}, function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.target.id && mutation.target.classList.contains('ui-tabs-panel') && !DOM.query('.tab_inner.ago_improved', mutation.target)) {
                    var tab = DOM.query('#messages .tabs_wrap .tabs_btn .list_item[aria-controls="' + mutation.target.id + '"], ' +
                        '#messages .tabs_wrap .subtabs .list_item[aria-controls="' + mutation.target.id + '"]');

                    if (tab.id !== AGO.Messages.currentTab) {
                        AGO.Messages.currentTab = tab.id;
                        AGO.Messages.allMessages = {};
                        AGO.Messages.spyReports = {};
                    }

                    if (tab && AGO.Messages.messageTabEvents[tab.id]) {
                        DOM.query('.tab_inner', mutation.target).classList.add('ago_improved');
                        AGO.Messages.visibleMessages = {};
                        var content = document.getElementById(tab.getAttribute('aria-controls'));
                        DOM.iterate(DOM.queryAll('.msg', content), function (message) {
                            AGO.Messages.visibleMessages[message.dataset.msgId] = message;
                            AGO.Messages.allMessages[message.dataset.msgId] = message;
                        });

                        if (typeof AGO.Messages[AGO.Messages.messageTabEvents[tab.id]] === 'function') {
                            AGO.Messages[AGO.Messages.messageTabEvents[tab.id]].call(tab, content);
                        }

                        AGO.Messages.addButtons(tab, content);
                        AGO.Messages.reviseContent();
                        break;
                    }
                }
            }
        });

        AGO.Messages.Load();
    },

    formatNumber: function (nmr) {
        nmr = Math.floor(nmr);
        if (AGO.Option.is('M53')) return STR.shortNumber(nmr, 1);
        else return STR.formatNumber(nmr);
    },

    addButtons: function (tab, tabContent) {
        let tabInner = DOM.query('.tab_inner', tabContent);
        var divButtons = DOM.appendDIV(null, 'agoButtons');
        divButtons.id = 'agoButtons';

        var divContent = '<table class="anti_msg_buttons" style="table-layout: fixed;"><tr>';

        if (AGO.Messages.messageTabEvents[tab.id] === 'onViewFleetsEsp') {
            divContent += '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M80').replace('$subject', '\'' + AGO.Label.get('M86') + '\'') + '" value="S" type="button" style="color: #ff9600;" name="delEspAction"></td>' +
                '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M82').replace('$plunder', STR.formatNumber(AGO.Option.get('M36') * 1E3)).replace('$debris', STR.formatNumber(AGO.Option.get('M37') * 1E3)) + '" value="< S" type="button" style="color: #660011;" name="delEspLoot"></td>' +
                '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M92').replace('$defense', STR.formatNumber(AGO.Option.get('M06') * 1E3)) + '" value="> D" type="button" style="color: #660011;" name="delEspDef"></td>' +
                '<td style="width: 10px;">&nbsp;</td>';
        }

        if (AGO.Messages.messageTabEvents[tab.id]) {
            divContent += '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M91') + '" value="X" type="button" style="color: #660011;" name="delShown"></td>';
        }
        divContent += '</tr></table>';

        divButtons.appendChild(DOM.parse(divContent));

        tabInner.parentNode.insertBefore(divButtons, tabInner);

        let spyTable;
        if (spyTable = DOM.query("#agoSpyReportOverview", tabContent))
            spyTable.parentNode.insertBefore(divButtons.cloneNode(true), spyTable);

        DOM.iterate(DOM.queryAll('.anti_msg_buttons tr td input', tabContent), function addListenerBtns(e) {
            e.addEventListener('click', function (e) {
                AGO.Messages.runBtnFunction(e);
                if (AGO.Messages.messageTabEvents[tab.id] === "onViewFleetsEsp" || AGO.Messages.messageTabEvents[tab.id] === "onViewFavorites")
                    AGO.Option.is('M51') && (AGO.Messages.sortSpyReports(AGO.Messages.spyTableData.sortSequence), AGO.Messages.showSpyReportOverview(tab, tabContent));
            }, false);
        });
    },

    ajaxDelete: function (deleteIDs) {
        $.ajax(document.location.protocol + '//' + AGO.Uni.domain + '/game/index.php?page=messages', {
            data: {
                messageId: JSON.stringify(deleteIDs),
                action: "103",
                ajax: "1"
            },
            dataType: "json",
            type: "POST"
        });
    },

    deleteMessage: function (msgID) {
        $("[data-msg-id="+msgID+"]").remove();
        if (AGO.Messages.spyReports[msgID]) delete AGO.Messages.spyReports[msgID];
        if (AGO.Messages.allMessages[msgID]) delete AGO.Messages.allMessages[msgID];
        if (AGO.Messages.visibleMessages[msgID]) delete AGO.Messages.visibleMessages[msgID];
    },

    runBtnFunction: function (e) {
        var deleteIDs = [];
        OBJ.iterate(AGO.Messages.allMessages, function doAction(msgID) {
            if ((e.target.name === 'delEspAction' && AGO.Messages.visibleMessages[msgID] && DOM.query('.espionageDefText', AGO.Messages.allMessages[msgID])) ||
                (e.target.name === 'delEspLoot' && AGO.Messages.spyReports[msgID] && AGO.Messages.spyReports[msgID].lucrative === '0') ||
                (e.target.name === 'delEspDef' && AGO.Messages.spyReports[msgID] && AGO.Messages.spyReports[msgID].defense > AGO.Option.get('M06') * 1E3) ||
                (e.target.name === 'delShown' && (AGO.Messages.spyReports[msgID] || AGO.Messages.visibleMessages[msgID]))
            ) {
                deleteIDs.push(msgID);
                AGO.Messages.deleteMessage(msgID);
            }
        });

        if (deleteIDs.length)
            AGO.Messages.ajaxDelete(deleteIDs);

        document.location.href = '#agoSpyReportOverview';
    },

    onViewFleetsEsp: function (tabContent) {
        DOM.iterate(DOM.queryAll('.msg', tabContent), function (message) {
            DOM.addEventsAll('.msg_head', message, {
                click: function (e) {
                    if (e.target.tagName === 'A' || e.target.classList.contains('js_actionKill')) return;
                    AGO.Messages.toggleFoldMessage(message, e);
                }
            });
            AGO.Option.is('M14') ? AGO.Messages.toggleFoldMessage(message) : 0;
        });

        AGO.Messages.parseMessagesEsp(this, tabContent);
        AGO.Messages.getSpyReportMap();
        AGO.Messages.sortSpyReports(AGO.Messages.spyTableData.sortSequence);
        AGO.Messages.shrinkSpyReports(this, tabContent);
        if (!OBJ.isEmpty(AGO.Messages.spyReports) && AGO.Option.is('M51')) AGO.Messages.showSpyReportOverview(this, tabContent);
        AGO.Messages.addActButtons();
    },

    onViewFavorites: function (tabContent) {
        DOM.iterate(DOM.queryAll('.msg', tabContent), function (message) {
            DOM.addEventsAll('.msg_head', message, {
                click: function (e) {
                    if (e.target.tagName === 'A' || e.target.classList.contains('js_actionKill')) return;
                    AGO.Messages.toggleFoldMessage(message, e);
                }
            });
            AGO.Option.is('M14') ? AGO.Messages.toggleFoldMessage(message) : 0;
        });

        AGO.Messages.parseMessagesEsp(this, tabContent);
        AGO.Messages.getSpyReportMap();
        AGO.Messages.sortSpyReports(AGO.Messages.spyTableData.sortSequence);
        AGO.Messages.shrinkSpyReports(this, tabContent);
        if (!OBJ.isEmpty(AGO.Messages.spyReports) && AGO.Option.is('M51')) AGO.Messages.showSpyReportOverview(this, tabContent);
        AGO.Messages.addActButtons();
    },

    reviseContent: function (tab, tabContent) {
        OBJ.iterate(AGO.Messages.visibleMessages, function (msgId) {
            if (AGO.Option.is('A31')) {
                var spanTime = DOM.query('.msg_head .msg_date', AGO.Messages.visibleMessages[msgId]);
                var msgTime = DOM.getText(spanTime);
                spanTime.setAttribute("original", msgTime);
                spanTime.textContent = AGO.Time.convertLocal(msgTime);
            }
        });
    },

    shrinkSpyReports: function (tab, tabContent) {
        // shrink spy reports
        if (AGO.Option.is("M12")) {
            OBJ.iterate(AGO.Messages.visibleMessages, function (msgId) {
                // TODO: tried to use css, but firefox completely ignores it!?
                var message = AGO.Messages.visibleMessages[msgId];
                if (DOM.query('.compacting', message) || DOM.query('.espionageDefText', message)) {
                    DOM.iterate(DOM.queryAll('.msg_content br'), function (br) {
                        br.parentElement.removeChild(br);
                    });
                }
            });
        }
    },

    addActButtons: function (overlay, content) {
        if (!overlay) {
            OBJ.iterate(AGO.Messages.visibleMessages, function (id) {
                var message = AGO.Messages.visibleMessages[id];
                if (DOM.query('.compacting', message)) {
                    var txtLink = DOM.query('.msg_actions .txt_link', message);
                    var divActBtns = document.createElement('div');
                    divActBtns.classList.add('ago_act_buttons');
                    DOM.query('.msg_actions', message).insertBefore(divActBtns, txtLink);

                    var trashBtn = document.createElement('a');
                    trashBtn.classList.add('icon_nf_link', 'fleft');
                    trashBtn.href = "javascript:void(0);";
                    trashBtn.onclick = function () {
                        AGO.Tools.Action({
                            id: "T5D",
                            api: message.dataset.apiKey
                        });
                    };
                    var trashIcon = document.createElement('span');
                    trashIcon.classList.add('icon_nf', 'icon_trashsim', 'tooltip', 'js_hideTipOnMobile');
                    trashIcon.title = 'TrashSim';
                    trashBtn.appendChild(trashIcon);
                    divActBtns.appendChild(trashBtn);
                }
            });
        } else if (overlay === "probeReport" && content) {
            let data = AGO.Messages.parseDetailedReport(content);

            $(content).find(".msg_actions").append(
                $("<div>", { class: "ago_act_buttons" }).append(
                    $("<a>", { class: "icon_nf_link fleft", href: "javascript:void(0);" }).append(
                        $("<span>", { class: "icon_nf icon_trashsim tooltip js_hideTipOnMobile", title: "TrashSim" })
                    ).click(function () {
                        AGO.Tools.Action({
                            id: "T5D",
                            Task: data
                        });
                    })
                )
            );
        }
    },

    toggleFoldMessage: function (message, e) {
        if (!message.classList.contains('ago_folded')) {
            var arrayHideElements = ['msg_actions'];
            if (!DOM.query('.espionageDefText', message)) arrayHideElements.push('msg_content');
            for (var i = 0; i < arrayHideElements.length; i++)
                DOM.setStyleDisplay('.' + arrayHideElements[i], message, 'none');
            message.classList.add('ago_folded');
        } else if (!e || !e.target.classList.contains('js_actionKill')) {
            var arrayShowElements = ['msg_content', 'msg_actions'];
            for (var i = 0; i < arrayShowElements.length; i++)
                DOM.updateStyle('.' + arrayShowElements[i], message, 'display', '');
            message.classList.remove('ago_folded');
        }
    },

    reviseMessage: function (message) {
        var c;

        if (DOM.query('.compacting', message)) {
            var p = {};
            OBJ.copy(message.dataset, p);
            DOM.updateStyle('.msg_title', message, 'width', '450px');
            DOM.setStyleDisplay('.msg_sender', message, 'none');
            DOM.setStyleDisplay('.msg_sender_label', message, 'none');
            c = DOM.query('.msg_title', message);
            DOM.innerHTML(c, null, (c.innerHTML + ' (' + AGO.Label.get('I70') + ': ' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>)'));

            var activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');

            var lootWeight = 'normal';
            var lootColor = '';
            p.loot >= (1E3 * AGO.Option.get('M36')) ? (lootColor = '#ff9600', lootWeight = 'bold') : '0';

            var fleetWeight = 'normal';
            var fleetColor = '';
            if (p.fleet !== '-1') {
                p.fleet = NMR.parseIntAbs(p.fleet);
                if (p.fleet >= (1E3 * AGO.Option.get('M37'))) {
                    fleetColor = '#ff9600';
                    fleetWeight = 'bold';
                }
            } else {
                p.fleet = 'NO DATA';
                fleetColor = '#ff0000';
            }

            var defenseColor = '';
            if (p.defense !== '-1') {
                p.defense = NMR.parseIntAbs(p.defense);
            } else {
                p.defense = 'NO DATA';
                defenseColor = '#ff0000';
            }

            // #TODO: Loca
            DOM.appendSPAN(DOM.query('.msg_head', message), {
                "class": "agoSpyActivity",
                "style": "color:" + activityColor + ";"
            }, 'A: ' + p.activity);
            DOM.appendSPAN(DOM.query('.msg_head', message), {
                "class": "agoSpyLoot",
                "style": "color:" + lootColor + "; font-weight:" + lootWeight + ""
            }, 'L: ' + STR.shortNumber(p.loot) + '');
            DOM.appendSPAN(DOM.query('.msg_head', message), {
                "class": "agoSpyFleet",
                "style": "color:" + fleetColor + "; font-weight:" + fleetWeight + ""
            }, 'F: ' + STR.shortNumber(p.fleet) + '');
            DOM.appendSPAN(DOM.query('.msg_head', message), {
                "class": "agoSpyDefense",
                "style": "color:" + defenseColor + ";"
            }, 'D: ' + STR.shortNumber(p.defense) + '');

            // #TODO: not finished
            if (AGO.Option.is('M30') && AGO.Option.is('M14') && p.lucrative === '1') AGO.Messages.toggleFoldMessage(message);
        }
    },

    parseMessagesEsp: function (tab, tabContent) {
        OBJ.iterate(AGO.Messages.visibleMessages, function (msgId) {
            var message = AGO.Messages.visibleMessages[msgId],
                c;

            if (DOM.query('.compacting', message)) {
                message.id = 'm' + message.dataset.msgId;

                let defaultProbeCount = DOM.query(".icon_espionage", message).parentNode.getAttribute("onclick").split("(")[1].split(");")[0].split(",")[5];
                AGO.Messages.defaultProbeCount = AGO.Messages.defaultProbeCount || defaultProbeCount;

                var p = {};
                p.apiKey = DOM.getAttribute('.icon_apikey', message, 'title', '').match(/sr-([-a-zA-Z0-9]+)/)[0];
                p.playerName = STR.trim(DOM.query('[class^="status_abbr_"]', message).lastChild.data);
                p.status = DOM.query('[class^="status_abbr_"]', message).className.match(/status_abbr_(.+)/)[1];
                p.honorRank = (a = DOM.query('.honorRank', message)) ? a.classList[1] : '';
                p.activity = DOM.getText('.msg_content font', message, 2) || '-';
                p.coords = (a = DOM.getText('.msg_head > .msg_title > .txt_link', message)) ? a.split('[')[1].split(']')[0] : "::";
                p.galaxy = p.coords.split(':')[0];
                p.system = p.coords.split(':')[1];
                p.position = p.coords.split(':')[2];
                p.isMoon = DOM.query('.msg_head .msg_title .moon', message) ? 1 : 0;
                p.coords += p.isMoon ? ":3" : ":1";
                p.activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
                p.attacking = DOM.query('.icon_attack img', message) ? 1 : 0;

                p.loot = NMR.parseIntRess(DOM.getAttribute('.tooltipRight', message, 'title', ''));
                var a, b = AGO.Option.get('FA3') / 100;
                (a = STR.getMatches(DOM.getAttribute('.tooltipRight', message, 'title', ''), /(?:[=])([0-9]+)(?:["])/g)) ? (p.sc = NMR.parseInt(a[0] * (1 + b)), p.lc = NMR.parseInt(a[1] * (1 + b))) : 0;
                p.probes = Math.ceil(p.loot / AGO.Ogame.getShipCapacity("210") * (1 + b));
                p.metal = NMR.parseIntRess(DOM.queryAll('.resspan', message)[0].textContent);
                p.crystal = NMR.parseIntRess(DOM.queryAll('.resspan', message)[1].textContent);
                p.deut = NMR.parseIntRess(DOM.queryAll('.resspan', message)[2].textContent);

                DOM.iterate(DOM.queryAll('.compacting', message), function (row) {
                    if (row.textContent.match(/%/)) p.plunder = row;
                });
                p.plunder = p.plunder.textContent.match(/: ([0-9]+)%/)[1] / 100;

                p.loot >= (1E3 * AGO.Option.get('M36')) ? p.lucrative = '1' : p.lucrative = '0';

                p.fleet = DOM.getAttribute('.tooltipLeft', message, 'title', '');
                p.defense = DOM.getAttribute(DOM.queryAll('.tooltipRight', message)[1], null, 'title', '');
                if (p.fleet.match('<br />')) {
                    p.dock = p.fleet.split('<br />')[1];
                    p.fleet = p.fleet.split('<br />')[0];
                }

                if (p.fleet !== '') {
                    p.fleet = NMR.parseIntAbs(p.fleet);
                    if (p.fleet >= (1E3 * AGO.Option.get('M37'))) {
                        p.lucrative = 1;
                    }
                } else
                    p.fleet = -1;

                if (p.defense !== '')
                    p.defense = NMR.parseIntAbs(p.defense);
                else
                    p.defense = -1;

                if (p.dock !== '')
                    p.dock = NMR.parseIntAbs(p.dock);

                p.date = AGO.Time.convertLocal(DOM.getText('.msg_head .msg_date', message));
                p.age = AGO.Time.ogameTime - AGO.Time.parse(DOM.getText('.msg_head .msg_date', message)).getTime();

                OBJ.copy(p, message.dataset);
                if (AGO.Option.is('M20')) AGO.Messages.reviseMessage(message);
            }
        });
    },

    getSpyReportMap: function () {
        var i = 0;
        // "M54": "Extend spy table when browsing pages"
        !AGO.Option.is("M54") && (AGO.Messages.spyReports = {});
        OBJ.iterate(AGO.Messages.visibleMessages, function (msgId) {
            if (DOM.query('.compacting', AGO.Messages.visibleMessages[msgId])) {
                AGO.Messages.spyReports[msgId] = AGO.Messages.visibleMessages[msgId].dataset;
                i++;
            }
        });
        AGO.Messages.Count = i;
    },

    sortSpyReports: function (by) {
        let sortByDistance = AGO.Option.get("M38", 1);
        if (AGO.Messages.spyTableData.sortSequence !== by) {
            switch (by) {
                case "coord":
                case "age":
                case "playerName":
                    AGO.Messages.spyTableData.sortDesc = false;
                    break;
                case "loot":
                case "fleet":
                case "defense":
                    AGO.Messages.spyTableData.sortDesc = true;
                    break;
            }
        }

        AGO.Messages.spyTableData.sortSequence = by;
        AGO.Messages.getSpyReportMap();
        AGO.Messages.spyReportsKeys = Object.keys(AGO.Messages.spyReports);

        AGO.Messages.spyReportsKeys.sort(function (a, b) {
            // Default sorting of SORT functions is ascending, if sortDesc is true, a and b are flipped
            if (AGO.Messages.spyTableData.sortDesc) b = [a, a = b][0];

            if (['loot', 'age', 'fleet', 'defense'].indexOf(by) > -1)
                return SORT.byNumber(AGO.Messages.spyReports[a][by], AGO.Messages.spyReports[b][by]);
            else if (by === 'playerName') {
                return SORT.byString(AGO.Messages.spyReports[a][by], AGO.Messages.spyReports[b][by]);
            } else if (by === 'coord') {
                // If the sort by distance setting is on
                if (sortByDistance) {
                    // Sort by distance
                    let result = SORT.byDistance(AGO.Messages.spyReports[a].coords, AGO.Messages.spyReports[b].coords);
                    // If the distance is not equal, then just return, otherwise sort by coord
                    if (result !== 0) {
                        return result;
                    } else {
                        // When sorting by distance, coords should come up in ascending order (1,2,3,4...)
                        // if the distance is the same, it looks better and makes sure the coordinates aren't all mixed
                        // together. Need to basically un-flip the sort because it's normally flipped up above right
                        // after sort function start
                        result = SORT.byCoord(AGO.Messages.spyReports[a].coords, AGO.Messages.spyReports[b].coords);
                        if (AGO.Messages.spyTableData.sortDesc) {
                            return result * -1;
                        } else {
                            return result;
                        }
                        
                    }
                } 
                // If sort by distance is not set, use the old code
                return SORT.byCoord(AGO.Messages.spyReports[a].coords, AGO.Messages.spyReports[b].coords);
            }
        });
        AGO.Messages.Save();
    },

    showSpyReportOverview: function (tab, tabContent) {
        let tabInnerParent = DOM.query(".tab_inner", tabContent).parentNode;
        if ($('#agoSpyReportOverview').length) $('#agoSpyReportOverview').remove();
        if (!AGO.Messages.spyReportsKeys.length) return;
        var tableWrap = DOM.appendDIV(null, '');
        tableWrap.id = 'agoSpyReportOverview';
        tabInnerParent.parentNode.insertBefore(tableWrap, tabInnerParent);
        //$('#agoButtons').clone(true, true).insertBefore('#agoSpyReportOverview');

        var table = DOM.parse('' +
            '<table id="spyTable">' +
            '   <thead>' +
            '       <tr class="spyHeader">' +
            //'           <th></th>' +
            '           <th id="spyHeadCoord" data-sort="coord">' + AGO.Label.get("coords") + '</th>' +         // TODO: add lang var; there is in EN_menu.json but i can't import it
            '           <th id="spyHeadAge" data-sort="age">' + AGO.Label.get('age') + '</th>' +                 // TODO: add lang var (not existing currently)
            '           <th id="spyHeadPlayer" data-sort="playerName">' + AGO.Label.get('player') + ' (<span style="color:#99CC00;font-weight:normal;">' + AGO.Label.get('activity') + '</span>)</th>' +   // TODO: add lang var; there is in EN_menu.json but i can't import it
            '           <th id="spyHeadLoot" data-sort="loot">' + AGO.Label.get('loot') + '</th>' +
            '           <th id="spyHeadFleet" data-sort="fleet">' + AGO.Label.get('fleet') + '</th>' +
            '           <th id="spyHeadDef" data-sort="defense">' + AGO.Label.get('DEF') + '</th>' + // TODO: add lang var (not existing currently)
            '           <th style="width: 84px;">' + AGO.Label.get('actions') + '</th>' +            // TODO: add lang var (not existing currently)
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   </tbody>' +
            '</table>');
        AGO.Messages.spyReportsKeys.length && tableWrap.appendChild(table);

        DOM.addEvents('#agoSpyReportOverview .spyHeader', tableWrap, {
            click: function (e) {
                if (!e || !e.target || !e.target.id) return;
                if (e.target.dataset.sort === AGO.Messages.spyTableData.sortSequence) AGO.Messages.spyTableData.sortDesc = !AGO.Messages.spyTableData.sortDesc;
                AGO.Messages.sortSpyReports(e.target.dataset.sort);
                AGO.Messages.showSpyReportOverview(tab, tabContent);
            }
        });

        var tableBody = DOM.query('tbody', table);
        OBJ.iterate(AGO.Messages.spyReportsKeys, function (id) {
            var f;
            var p = {};
            OBJ.copy(AGO.Messages.spyReports[AGO.Messages.spyReportsKeys[id]], p);
            var message = document.getElementById('m' + p.msgId);
            AGO.Messages.visibleMessages[p.msgId] && (DOM.query(".js_actionKill", message).onclick = function () {
                AGO.Messages.ajaxDelete(p.msgId);
                AGO.Messages.deleteMessage(p.msgId);
                $("#t_" + p.msgId).remove();
                $("#d_" + p.msgId).remove();
                AGO.Messages.refreshSummary();
                AGO.Messages.refreshOddEven();
            });

            var player = '' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>';

            var row = DOM.appendTR(tableBody);
            row.addEventListener('click', function (e) {
                AGO.Messages.tableAddDetails(e, p)
            }, false);
            row.classList.add('row');
            row.id = 't_' + p.msgId;
            if (id % 2 === 1) row.classList.add('even');

            /* var cellSelect = DOM.appendTD(row);
            cellSelect.classList.add('select'); */

            var cellCoords = DOM.appendTD(row);
            var linkCoords = document.createElement('a');
            linkCoords.classList.add('txt_link');
            linkCoords.href = '#m' + p.msgId;
            DOM.innerHTML(linkCoords, null, (p.galaxy + ":" + p.system + ":" + p.position + (p.isMoon === '1' ? ' <figure class="planetIcon moon tooltip js_hideTipOnMobile" title=""></figure>' : '')));
            linkCoords.onclick = function () {
                message.classList.add('highlighted');
                document.addEventListener('click', function toggleHighlight(e) {
                    if (!DOM.isDescendant(message, e.target) && (!e.target.href || !e.target.href.match(p.msgId))) {
                        message.classList.remove('highlighted');
                        document.removeEventListener('click', toggleHighlight, false);
                    } else return;
                }, false);
            };
            cellCoords.appendChild(linkCoords);

            var cellAge = DOM.appendTD(row);
            cellAge.style.textAlign = 'left';
            var spanAge = document.createElement('span');
            spanAge.classList.add('tooltipRight');
            spanAge.title = p.date;
            spanAge.textContent = AGO.Time.formatTime((p.age >= 0 ? p.age : 0) / 1000, true);
            cellAge.appendChild(spanAge);

            var cellPlayer = DOM.appendTD(row);
            cellPlayer.style.textAlign = 'left';
            DOM.innerHTML(cellPlayer, null, (player + (parseInt(p.activity) > 0 ? ' (<span style="color: ' + p.activityColor + ';">' + p.activity + '</span>)' : '')));

            var cellLoot = DOM.appendTD(row);
            cellLoot.style.textAlign = 'right';
            var spanLoot = DOM.appendSPAN(cellLoot);
            spanLoot.classList.add('tooltipCustom');
            spanLoot.title = AGO.Label.get('L091') + ': ' + STR.formatNumber(Math.round(p.metal * p.plunder)) + '<br />' + AGO.Label.get('L092') + ': ' + STR.formatNumber(Math.round(p.crystal * p.plunder)) + '<br />' + AGO.Label.get('L093') + ': ' + STR.formatNumber(Math.round(p.deut * p.plunder));
            spanLoot.textContent = AGO.Option.is('M53') ? STR.shortNumber(p.loot, 1) : STR.formatNumber(p.loot);

            var rowFleet = DOM.appendTD(row, null, p.fleet !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.fleet, 1) : STR.formatNumber(p.fleet)) : 'no data');
            if (p.dock !== "0") {
                rowFleet.classList.add('dock');
                rowFleet.classList.add('tooltipCustom');
                rowFleet.title = 'Dock: ' + STR.formatNumber(p.dock);
            }
            rowFleet.style.textAlign = 'right';

            var rowDefense = DOM.appendTD(row, null, p.defense !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.defense, 1) : STR.formatNumber(p.defense)) : 'no data');
            rowDefense.style.textAlign = 'right';

            var cellActions = DOM.appendTD(row);
            var aDelete = DOM.appendA(cellActions);
            aDelete.classList.add('spyTableIcon');
            aDelete.classList.add('icon', 'icon_delete');
            aDelete.onclick = function () {
                AGO.Messages.ajaxDelete(p.msgId);
                AGO.Messages.deleteMessage(p.msgId);
                $("#t_" + p.msgId).remove();
                $("#d_" + p.msgId).remove();
                AGO.Messages.refreshSummary();
                AGO.Messages.refreshOddEven();
            };

            var aDetails = DOM.appendA(cellActions);
            aDetails.classList.add('icon', 'spyTableIcon', 'icon_minimize', 'overlay');
            aDetails.href = document.location.protocol + '//' + AGO.Uni.domain + '/game/index.php?page=messages&messageId=' + p.msgId + '&tabid=' + tab.dataset.tabid + '&ajax=1';

            var aGalaxy = DOM.appendA(cellActions);
            aGalaxy.classList.add('spyTableIcon');
            aGalaxy.classList.add('icon_galaxy');
            aGalaxy.href = '/game/index.php?' + (AGO.App.isVersion7 ? 'page=ingame&component=galaxy' : 'page=galaxy') + '&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position;
            aGalaxy.textContent = 'G';

            //TO DO
            var aSpy = DOM.appendA(cellActions);
            aSpy.classList.add('spyTableIcon', 'icon', 'icon_eye');
            aSpy.setAttribute('onclick', 'sendShipsWithPopup(6,' + p.galaxy + ',' + p.system + ',' + p.position + ',' + (p.isMoon === '1' ? '3' : '1') + ',' + AGO.Messages.defaultProbeCount + ');return false');
            aSpy.href = '#';


            var aAttack = DOM.appendA(cellActions);
            aAttack.classList.add('spyTableIcon');
            aAttack.classList.add('icon_attack');
            let shipSetting = AGO.Option.get("FA2");
            let ship = "0";
            let shipsToSend = 0;
            let speedSetting = AGO.Option.get("FA4", 10);
            switch (shipSetting) {
                default:
                case 0: ship = "203"; shipsToSend = p.lc; break;
                case 1: ship = "202"; shipsToSend = p.sc; break;
                case 2: ship = "210"; shipsToSend = p.probes; break;
            }
            aAttack.href = '/game/index.php?' + (AGO.App.isVersion7 ? 'page=ingame&component=fleetdispatch' : 'page=fleet1') + '&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position + '&type=' + (p.isMoon === '1' ? '3' : '1') + '&routine=3&am' + ship + "=" + shipsToSend + (shipSetting === 2 ? "&speed=" + speedSetting : "");
            aAttack.textContent = 'A';
            AGO.Option.is('M16') ? aAttack.target = 'ago_fleet_attacks' : 0;
            p.attacking === "1" && aAttack.classList.add('attacking');

            tableBody.appendChild(row);
        });

        if (AGO.Messages.spyReportsKeys.length) {
            var summaryDiv = DOM.appendDIV(tableWrap);
            summaryDiv.classList.add('summary');
            DOM.appendTEXT(summaryDiv, "count: ");
            DOM.appendSPAN(summaryDiv, "summaryCount");
            DOM.appendTEXT(summaryDiv, " | loot: ");
            DOM.appendSPAN(summaryDiv, "summaryLoot");
            DOM.appendTEXT(summaryDiv, " | fleet: ");
            DOM.appendSPAN(summaryDiv, "summaryFleet");
            AGO.Messages.refreshSummary();
        }
    },
    tableAddDetails: function (e, p) {
        var row = $('#t_' + p.msgId);

        if (e.target.tagName == 'A' || getSelection().toString()) return;
        $('.spyTableDetails').parent().remove();
        if ($('tr[details=1]').attr('id') != 't_' + p.msgId) $('tr[details=1]').removeAttr('details');

        if (row.attr('details')) {
            row.removeAttr('details');
            AGO.Messages.refreshOddEven();
            return;
        }

        row.attr('details', '1');

        $('<tr>', {'id': 'd_' + p.msgId}).addClass('row').insertAfter('#t_' + p.msgId)
            .append($('<td>', {'class': 'spyTableDetails', 'colspan': '7'}));
        AGO.Messages.refreshOddEven();
        $('.spyTableDetails').append($('<img>', {
            'height': 16,
            'width': 16,
            'src': 'https://gf3.geo.gfsrv.net/cdne3/3f9884806436537bdec305aa26fc60.gif'
        }));
        AGO.Messages.fetchDetailedReport(p.msgId).then(data => {
            data = AGO.Messages.parseDetailedReport(data);
            $('.spyTableDetails').empty();
            $('<div>', {'class': 'detailsTitle'}).appendTo('.spyTableDetails').text(AGO.Label.get('I27'));
            $('<div>', {'class': 'detailsContent', 'style': 'width: 90%;'}).appendTo('.spyTableDetails').append(
                $('<span>', {'style': 'float: left; width: 33%;'}).text(AGO.Label.get('L091') + ': ' + AGO.Messages.formatNumber(data.metal)),
                $('<span>', {'style': 'float: left; width: 33%;'}).text(AGO.Label.get('L092') + ': ' + AGO.Messages.formatNumber(data.crystal)),
                $('<span>', {'style': 'float: none; width: 33%;'}).text(AGO.Label.get('L093') + ': ' + AGO.Messages.formatNumber(data.deuterium))
            );

            var totalRes = data.metal + data.crystal + data.deuterium;
            if ((totalRes * p.plunder) > (AGO.Option.get('M36') * 1E3)) {
                $('<div>', {'class': 'detailsTitle'}).appendTo('.spyTableDetails').text(AGO.Label.get('M24') + ' - ' + (p.plunder * 100) + '%');
                $('<div>', {'class': 'detailsContent', 'style': 'width: 90%;'}).appendTo('.spyTableDetails');

                var percentCargos = 1 + AGO.Option.get('FA3') / 100;
                for (var f = totalRes * p.plunder, i = 1; f > (AGO.Option.get('M36') * 1E3); (totalRes = totalRes - f, f = totalRes * p.plunder, i++)) {
                    var totalLC = Math.ceil(f / AGO.Ogame.getShipCapacity("203") * percentCargos),
                        totalSC = Math.ceil(f / AGO.Ogame.getShipCapacity("202") * percentCargos),
                        totalProbe = Math.ceil(f / AGO.Ogame.getShipCapacity("210") * percentCargos);
                    let widths = AGO.Uni.probeCargo > 0 ? [12, 22, 5, 15, 7, 18] : [15, 25, 10, 20, 0, 0];
                    let scLinkFloat = "none";
                    let spanProbesLabel = "";
                    let spanProbesCount = "";
                    if (AGO.Uni.probeCargo > 0) {
                        let speedSetting = AGO.Option.get("FA4");
                        spanProbesLabel = $('<span>', {'style': 'float: left; width: ' + widths[4] + '%;'}).text(AGO.Label.get('K210'));
                        spanProbesCount = $('<span>', {'style': 'float: none; width: ' + widths[5] + '%;'}).append(
                            $('<a>', {
                                'class': 'txt_link',
                                'target': AGO.Option.is("M16") ? 'ago_fleet_attacks' : '',
                                'href': '/game/index.php?' + (AGO.App.isVersion7 ? 'page=ingame&component=fleetdispatch' : 'page=fleet1') + '&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position + '&type=' + (p.isMoon === '1' ? '3' : '1') + '&routine=3&am210=' + totalProbe  + "&speed=" + speedSetting
                            }).text(AGO.Messages.formatNumber(totalProbe))
                        );
                        scLinkFloat = "left";
                    }

                    $('.detailsContent').last().append(
                        $('<div>', {'style': 'margin: auto; width: 100%; text-align: left;'}).append(
                            $('<span>', {'style': 'float: left; width: ' + widths[0] + '%;'}).text(AGO.Label.get('M24') + (i == 1 ? '' : ' ' + i)),
                            $('<span>', {'style': 'float: left; width: ' + widths[1] + '%; color: #ff9600'}).text(AGO.Messages.formatNumber(f)),
                            $('<span>', {'style': 'float: left; width: ' + widths[2] + '%;'}).text(AGO.Label.get('K203')),
                            $('<span>', {'style': 'float: left; width: ' + widths[3] + '%;'}).append(
                                $('<a>', {
                                    'class': 'txt_link',
                                    'target': AGO.Option.is("M16") ? 'ago_fleet_attacks' : '',
                                    'href': '/game/index.php?' + (AGO.App.isVersion7 ? 'page=ingame&component=fleetdispatch' : 'page=fleet1') + '&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position + '&type=' + (p.isMoon === '1' ? '3' : '1') + '&routine=3&am203=' + totalLC
                                }).text(AGO.Messages.formatNumber(totalLC))
                            ),
                            $('<span>', {'style': 'float: left; width: ' + widths[2] + '%;'}).text(AGO.Label.get('K202')),
                            $('<span>', {'style': 'float: ' + scLinkFloat + '; width: ' + widths[3] + '%;'}).append(
                                $('<a>', {
                                    'class': 'txt_link',
                                    'target': AGO.Option.is("M16") ? 'ago_fleet_attacks' : '',
                                    'href': '/game/index.php?' + (AGO.App.isVersion7 ? 'page=ingame&component=fleetdispatch' : 'page=fleet1') + '&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position + '&type=' + (p.isMoon === '1' ? '3' : '1') + '&routine=3&am202=' + totalSC
                                }).text(AGO.Messages.formatNumber(totalSC))
                            ), spanProbesLabel, spanProbesCount
                        )
                    );
                }
            }

            for (var type in data.units) {
                if (Object.keys(data.units[type]).length) {
                    var a = {metal: 0, crystal: 0, deuterium: 0};
                    OBJ.iterate(data.units[type], function (id) {
                        a.metal += AGO.Item[id].metal * data.units[type][id];
                        a.crystal += AGO.Item[id].crystal * data.units[type][id];
                        a.deuterium += AGO.Item[id].deuterium * data.units[type][id];
                    });

                    $('<div>', {'class': 'detailsTitle'}).appendTo('.spyTableDetails').text(data['label_' + type]);
                    $('<div>', {'class': 'detailsContent', 'style': 'width: 90%;'}).appendTo('.spyTableDetails').append(
                        $('<div>', {'style': 'margin: auto; width: 100%;'}).append(
                            $('<span>', {'style': 'float: left; width: 33%;'}).text(AGO.Label.get('L091') + ': ' + AGO.Messages.formatNumber(a.metal)),
                            $('<span>', {'style': 'float: left; width: 33%;'}).text(AGO.Label.get('L092') + ': ' + AGO.Messages.formatNumber(a.crystal)),
                            $('<span>', {'style': 'float: none; width: 33%;'}).text(AGO.Label.get('L093') + ': ' + AGO.Messages.formatNumber(a.deuterium))
                        )
                    );
                }
            }

            var debris = {};
            for (var type in data.units) {
                if (OBJ.is(data.units[type]) && Object.keys(data.units[type]).length) {
                    data.units[type] && ('defense' !== type || 'defense' === type && AGO.Uni.defToTF) && (debris[type] = AGO.Ogame.getDebris(data.units[type], AGO.Uni.defToTF));
                }
            }

            if (!$.isEmptyObject(debris)) {
                $('<div>', {'class': 'detailsTitle'}).appendTo('.spyTableDetails').text(AGO.Label.get('M22') + ' - ' + (AGO.Uni.debrisFactor * 100) + '%' + (AGO.Uni.defToTF ? ' & ' + (AGO.Uni.debrisFactorDef * 100) + '%' : ''));
                $('<div>', {'class': 'detailsContent', 'style': 'width: 90%;'}).appendTo('.spyTableDetails');

                var totalDebris = {metal: 0, crystal: 0, recs: 0};
                for (var type in debris) {
                    for (var res in totalDebris) totalDebris[res] += debris[type][res];
                    $('.detailsContent').last().append(
                        $('<div>', {'style': 'margin: auto; width: 100%; text-align: left;'}).append(
                            $('<span>', {'style': 'float: left; width: 21%;'}).text(data['label_' + type]),
                            $('<span>', {'style': 'float: left; width: 30%; color: green;'}).text(AGO.Label.get('K091') + ': ' + AGO.Messages.formatNumber(debris[type].metal)),
                            $('<span>', {'style': 'float: left; width: 30%; color: green;'}).text(AGO.Label.get('K092') + ': ' + AGO.Messages.formatNumber(debris[type].crystal)),
                            $('<span>', {'style': 'float: none; width: 19%; color: green;'}).text(AGO.Messages.formatNumber(debris[type].recs) + ' ' + AGO.Label.get('K209'))
                        )
                    );
                }

                if (Object.keys(debris).length > 1) {
                    $('.detailsContent div').last().append(
                        $('<hr>', {'style': 'border-style: dotted;'}),
                        $('<span>', {'style': 'float: left; width: 21%;'}).text(AGO.Label.get('Total')),
                        $('<span>', {'style': 'float: left; width: 30%; color: green;'}).text(AGO.Label.get('K091') + ': ' + AGO.Messages.formatNumber(totalDebris.metal)),
                        $('<span>', {'style': 'float: left; width: 30%; color: green;'}).text(AGO.Label.get('K092') + ': ' + AGO.Messages.formatNumber(totalDebris.crystal)),
                        $('<span>', {'style': 'float: none; width: 19%; color: green;'}).text(AGO.Messages.formatNumber(totalDebris.recs) + ' ' + AGO.Label.get('K209'))
                    );
                }
            }

            if (!$.isEmptyObject(data.research)) {
                $('<div>', {'class': 'detailsTitle'}).appendTo('.spyTableDetails').text(data['label_research']);
                $('<div>', {'class': 'detailsContent', 'style': 'width: 90%;'}).appendTo('.spyTableDetails').append(
                    $('<div>', {'style': 'margin: auto; width: 100%; float: left;'}).append(
                        $('<span>', {'style': 'float: left; width: 13%; text-align: left;'}).text(AGO.Label.get('M01')),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[109]),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[110]),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[111])
                    ),
                    $('<div>', {'style': 'margin: auto; width: 100%; float: left; margin-top: 10px;'}).append(
                        $('<span>', {'style': 'float: left; width: 13%; text-align: left;'}).text(AGO.Label.get('M02')),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[115]),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[117]),
                        $('<span>', {'style': 'float: left; width: 29%;'}).text(data.research[118])
                    ),
                    $('<div>', {'style': 'margin: auto; width: 100%; float: left; margin-top: 10px;'}).append(
                        $('<span>', {'style': 'float: left; width: 13%; text-align: left;'}).text(AGO.Label.get('M03')),
                        $('<span>', {'style': 'float: left; width: 87%;'}).text(data.research[124] + ' (' + (Math.round(data.research[124] / 2) + 1) + ')')
                    )
                );
            }
        });
    },

    refreshOddEven: function () {
        OBJ.iterate(DOM.queryAll('#spyTable .row'), function (i) {
            var row = DOM.queryAll('#spyTable .row')[i];
            row.classList.remove('even');
            (i % 2 === 1) ? row.classList.add('even') : 0;
        });
    },

    refreshSummary: function () {
        var c, 
            sumLoot = 0, 
            sumMetal = 0, 
            sumCrystal = 0, 
            sumDeut = 0,
            sumFleet = 0;

        OBJ.iterate(AGO.Messages.spyReports, function (id) {
            sumLoot += parseInt(AGO.Messages.spyReports[id].loot);
            // Sum up the individual parts of the loot, multiply with plunder ratio to get the correct numbers
            sumMetal += parseInt(AGO.Messages.spyReports[id].metal * AGO.Messages.spyReports[id].plunder);
            sumCrystal += parseInt(AGO.Messages.spyReports[id].crystal * AGO.Messages.spyReports[id].plunder);
            sumDeut += parseInt(AGO.Messages.spyReports[id].deut * AGO.Messages.spyReports[id].plunder);
            sumFleet += parseInt(((c = AGO.Messages.spyReports[id].fleet) > -1 ? c : 0));
        });

        if (DOM.query("#agoSpyReportOverview .summary")) {
            DOM.query('.summaryCount').textContent = Object.keys(AGO.Messages.spyReports).length;
            DOM.query('.summaryLoot').classList.add('tooltipCustom'); // Adds the tooltip to the item
            // Title is shown as tooltip when hovering the mouse over the number (code grabbed from the table code)
            DOM.query('.summaryLoot').title = AGO.Label.get('L091') + ': ' + STR.formatNumber(Math.round(sumMetal)) + '<br />' + AGO.Label.get('L092') + ': ' + STR.formatNumber(Math.round(sumCrystal)) + '<br />' + AGO.Label.get('L093') + ': ' + STR.formatNumber(Math.round(sumDeut));
            DOM.query('.summaryLoot').textContent = AGO.Option.is('M53') ? STR.shortNumber(sumLoot, 1) : STR.formatNumber(sumLoot);
            DOM.query('.summaryFleet').textContent = AGO.Option.is('M53') ? STR.shortNumber(sumFleet, 1) : STR.formatNumber(sumFleet);
        }
    },

    fetchDetailedReport: async function (msgid) {
        let data = await $.get(AGO.Uni.url + '/game/index.php', {page: 'messages', messageId: msgid, ajax: 1});
        return data;
    },

    parseDetailedReport: function (data) {
        let d = {};
        d.units = {};
        d.metal = NMR.parseIntFormat($(data).find('.resource_list_el').eq(0).attr('title'));
        d.crystal = NMR.parseIntFormat($(data).find('.resource_list_el').eq(1).attr('title'));
        d.deuterium = NMR.parseIntFormat($(data).find('.resource_list_el').eq(2).attr('title'));

        d.coords = {
            galaxy: 0,
            system: 0,
            position: 0
        };

        let coords = $(data).find(".detail_msg_head .msg_title").text().match(/\d{1,2}:\d{1,3}:\d{1,2}/);
        if (coords.length) {
            coords = coords[0].split(":");
            d.coords = {
                galaxy: +coords[0],
                system: +coords[1],
                position: +coords[2]
            };
        }

        var reportLevels = $(data).find('ul.detail_list');
        var levelsMap = {resources: 0, ships: 1, repairorders: 1, defense: 1, buildings: 0, research: 1};
        for (var i = 0; i < reportLevels.length; i++) {
            var level = reportLevels[i].dataset.type;
            if (!levelsMap[level]) continue;
            d['label_' + level] = reportLevels.eq(i).prev().find('.title_txt').text();

            var t = new Object();
            var levelData = $(data).find('ul.detail_list[data-type=' + level + ']');
            for (var j = 0; j < levelData.find('li.detail_list_el').length; j++) {
                var item = levelData.find('span.detail_list_txt').eq(j).text();
                var itemCount = levelData.find('span.fright').eq(j).text();
                t[AGO.Item.getByName(item)] = NMR.parseIntFormat(itemCount);
            }

            if (level !== 'research') d.units[level] = t;
            else d[level] = t;
        }
        return d;
    },

    onViewFleetsCombat: function (tabContent) {
        // ...
    },

    onKeydown: function (b) {
        if (document.activeElement.tagName in {'TEXTAREA': 1, 'INPUT': 1}) return;

        var currentTab = DOM.query('#messages .tabs_wrap .tabs_btn .list_item[aria-selected=true]');
        currentTab = DOM.query('#' + currentTab.getAttribute('aria-controls') + ' .subtabs .list_item[aria-selected=true]');
        currentTab = DOM.query('#' + currentTab.getAttribute('aria-controls'));
        var paginator = DOM.queryAll('.paginator', currentTab);

        switch (b.keyCode) {
            case 39:
                paginator[2].click();
                break;
            case 37:
                paginator[1].click();
                break;
        }
    }
};
