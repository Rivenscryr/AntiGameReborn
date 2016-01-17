var $;
AGO.Messages = {
    messageTabEvents: {
        'subtabs-nfFleet20':         'onViewFleetsEsp',
        'subtabs-nfFleet21':         'onViewFleetsCombat',
        'subtabs-nfFleet22':         'onViewFleetsExpedition',
        'subtabs-nfFleet23':         'onViewFleetsUnion',
        'subtabs-nfFleet24':         'onViewFleetsOther',
        'subtabs-nfCommunication10': 'onViewCommunicationMessages',
        'subtabs-nfCommunication14': 'onViewCommunicationInfo',
        'subtabs-nfCommunication12': 'onViewCommunicationCombat',
        'subtabs-nfCommunication11': 'onViewCommunicationSpy',
        'subtabs-nfCommunication13': 'onViewCommunicationExpedition',
        'tabs-nfEconomy':            'onViewEconomy',
        'tabs-nfUniverse':           'onViewUniverse',
        'tabs-nfSystem':             'onViewSystem',
        'tabs-nfFavorites':          'onViewFavorites'
    },
    handlingMessageTabEvent: false,

    allMessages: {},
    spyReports: {},
    spyReportsKeys: {},

    Ready: function () {
        DOM.addObserver(DOM.query('#messages .js_tabs'), { childList: true, subtree: true }, function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.target.id && mutation.target.classList.contains('ui-tabs-panel') && !DOM.query('.tab_inner.ago_improved', mutation.target)) {
                    var tab = DOM.query('#messages .tabs_wrap .tabs_btn .list_item[aria-controls="' + mutation.target.id + '"], ' +
                                        '#messages .tabs_wrap .subtabs .list_item[aria-controls="' + mutation.target.id + '"]');

                    if (tab && PAGE.messageTabEvents[tab.id]) {
                        DOM.query('.tab_inner', mutation.target).classList.add('ago_improved');
                        if (typeof PAGE[PAGE.messageTabEvents[tab.id]] === 'function') {
                            PAGE[PAGE.messageTabEvents[tab.id]].call(tab);
                        }
                        break;
                    }
                }
            }
        });
    },

    onViewFleetsEsp: function () {
        var content = document.getElementById(this.getAttribute('aria-controls'));
        DOM.iterate(DOM.queryAll('.msg', content), function (message) {
            PAGE.allMessages[message.dataset.msgId] = message;
            DOM.addEventsAll('.msg_head, .msg_content', message, { click: function () { PAGE.toggleFoldMessage(message); } });
            PAGE.toggleFoldMessage(message);
        });
        
        PAGE.parseMessagesEsp(this, content);
        PAGE.getSpyReportMap();
        PAGE.reviseContent(this, content);
        PAGE.shrinkSpyReports(this, content);
        PAGE.addEspButtons(this, content);
        PAGE.showSpyReportOverview(this, content);
    },
    
    reviseContent: function (tab, tabContent) {
        OBJ.iterate(PAGE.allMessages, function (msgId) {
            if (AGO.Option.is('A31')) {
                var spanTime = DOM.query('.msg_head .msg_date', PAGE.allMessages[msgId]);
                var msgTime = DOM.getText(spanTime);
                spanTime.innerHTML = AGO.Time.convertLocal(msgTime);
            }
        });
    },

    shrinkSpyReports: function (tab, tabContent) {
        // shrink spy reports
        var shrinkFactor = AGO.Option.get("M12", 2);
        if (shrinkFactor > 0) {
            OBJ.iterate(PAGE.allMessages, function (msgId) {
                // TODO: tried to use css, but firefox completely ignores it!?
                var message = PAGE.allMessages[msgId];
                if (DOM.query('.compacting', message)) {
                    DOM.iterate(DOM.queryAll('.msg_content br'), function (br) {
                        br.parentElement.removeChild(br);
                    });
                    DOM.iterate(DOM.queryAll('.msg_content div'), function (div) {
                        div.style.marginTop = (1 - shrinkFactor / 4) + 'rem';
                    });
                }
            });
        }
    },
        
    addEspButtons: function (tab, tabContent) {
        var runBtnFunction = function (e) {
            OBJ.iterate(PAGE.allMessages, function doAction (msgId) {
                if ( (e.target.name === 'delEspAction' && DOM.query('.espionageDefText', PAGE.allMessages[msgId])) || 
                     (e.target.name === 'delEspLoot' && DOM.query('.compacting', PAGE.allMessages[msgId]) && PAGE.allMessages[msgId].dataset.lucrative === '0') ||
                     (e.target.name === 'delShown')
                    ) {
                    DOM.click('.js_actionKill', PAGE.allMessages[msgId]);
                }
            });
        };
        
        var divButtons = DOM.appendDIV(null, 'agoButtons');
        tabContent.insertBefore(divButtons, tabContent.firstChild);
        
        var divContent = DOM.parse('<table class="anti_msg_buttons" style="table-layout: fixed;"><tr>' +
                                        '<td style="width: 35px;"><input class="anti_msg_buttons" value="S" type="button" style="color: #ff9600;" name="delEspAction"></td>' +
                                        '<td style="width: 45px;"><input class="anti_msg_buttons" value="< S" type="button" style="color: #660011;" name="delEspLoot"></td>' +
                                        '<td style="width: 35px;"><input class="anti_msg_buttons" value="X" type="button" style="color: #660011;" name="delShown"></td>' +
                                   '</tr></table>');
                                   
        divButtons.appendChild(divContent);
        DOM.iterate(DOM.queryAll('.anti_msg_buttons tr td input', tabContent), function addListenerBtns(e) {
            e.addEventListener('click', runBtnFunction, false);
        });
    },
    
    toggleFoldMessage: function (message) {
        if (!message.classList.contains('ago_folded')) {
            var arrayHideElements = ['msg_content', 'msg_sender', 'msg_sender_label', 'msg_actions'];
            if (DOM.query('.espionageDefText', message)) arrayHideElements.splice(arrayHideElements.indexOf('msg_content'), 1);
            for (var i = 0; i < arrayHideElements.length; i++)
                DOM.setStyleDisplay('.' + arrayHideElements[i], message, 'none');
            message.classList.add('ago_folded');
        } else {
            var arrayShowElements = ['msg_content', 'msg_actions'];
            for (var i = 0; i < arrayShowElements.length; i++)
                DOM.updateStyle('.' + arrayShowElements[i], message, 'display', '');
            message.classList.remove('ago_folded');
        }
    },

    compactMessage: function (message) {
        var c;
        
        if (c = DOM.query('.espionageDefText', message)) {
            DOM.query('.txt_link', c).innerHTML += ' (' + message.dataset.playerName + ')';
            DOM.updateStyle('.msg_content', message, 'display', '');
        } else if (DOM.query('.compacting', message)) {
            var p = message.dataset;
            var activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
            
            DOM.updateStyle('.msg_title', message, 'width', '450px');
            DOM.query('.msg_title', message).innerHTML += ' (' + AGO.Label.get('I70') + ': ' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>)';
            
            var lootWeight = 'normal';
            var lootColor = '';
            p.loot >= (1E3 * AGO.Option.get('M36')) ? ( lootColor = '#ff9600', lootWeight = 'bold' ) : '0';
            
            var fleetWeight = 'normal';
            var fleetColor = '';
            if (p.fleet !== '') {
                p.fleet = NMR.parseIntAbs(p.fleet);
                if(p.fleet >= (1E3 * AGO.Option.get('M37'))) {
                    fleetColor = '#ff9600';
                    fleetWeight = 'bold';
                }
            } else {
                p.fleet = 'NO DATA';
                fleetColor = '#ff0000';
            }
            
            var defenseColor = '';
            if (p.defense !== '') {
                p.defense = NMR.parseIntAbs(p.defense);
            } else {
                p.defense = 'NO DATA';
                defenseColor = '#ff0000';
            }
            
            // #TODO: Loca
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyActivity", "style":"color:"+activityColor+";" }, 'A: ' + p.activity);
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyLoot", "style":"color:"+lootColor+"; font-weight:"+lootWeight+"" }, 'L: ' + STR.shortNumber(p.loot) + '');
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyFleet", "style":"color:"+fleetColor+"; font-weight:"+fleetWeight+"" }, 'F: ' + STR.shortNumber(p.fleet) + '');
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyDefense", "style":"color:"+defenseColor+";" }, 'D: ' + STR.shortNumber(p.defense) + '');
        }
    },

    parseMessagesEsp: function (tab, tabContent) {
        OBJ.iterate(PAGE.allMessages, function (msgId) {
            var message = PAGE.allMessages[msgId],
                c;
            
            if (c = DOM.query('.espionageDefText', message)) {
                var b = {};
                b.txtLink = DOM.query('.txt_link', c);
                b.planetName = DOM.getText(b.txtLink);
                b.coords = b.planetName.split('[')[1].split(']')[0];

                AGB.message("DataBase", "GetPlanet", { keyUni: AGO.App.keyUni, coords: b.coords },    function (a) { 
                                                                                                        message.dataset.playerName = a.playerName;
                                                                                                        PAGE.compactMessage(message);
                                                                                                      });
            } else if (DOM.query('.compacting', message)) {
                var p = {};
                p.playerName = STR.trim(DOM.query('[class^="status_abbr_"]', message).lastChild.data);
                p.status = DOM.query('[class^="status_abbr_"]', message).className.match(/status_abbr_(.+)/)[1];
                p.honorRank = (a = DOM.query('.honorRank', message)) ? a.classList[1] : '';
                p.activity = DOM.getText('.msg_content font', message, 2) || '-';
                p.coords = DOM.getText('.msg_head > .msg_title > .txt_link', message).split('[')[1].split(']')[0];
                p.isMoon = DOM.query('.msg_head .msg_title .moon', message) ? 1 : 0;
                p.activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
                
                p.loot = DOM.getAttribute('.tooltipRight', message, 'title', '').match(/: ([^<]+)*/)[1];
                // Thanks to vulca for code
                if (p.loot.match(/^[0-9]{1,3}\.[0-9]{3}$/))
                    p.loot = p.loot.replace('.', '');
                else if(p.loot.match(/^([0-9]{1,3}(\.|,))?[0-9]{1,3}(Md|Bn|Mrd)/))
                    p.loot = p.loot.replace(/,/g,'.').replace(/Md|Bn|Mrd/g,'')*1000000000;
                else if(p.loot.match(/^([0-9]{1,3}(\.|,))?[0-9]{1,3}(M|m)/))
                    p.loot = p.loot.replace(/,/g,'.').replace(/(M|m)/g,'')*1000000;
                p.loot >= (1E3 * AGO.Option.get('M36')) ? p.lucrative = '1' : p.lucrative = '0';
                
                p.fleet = DOM.getAttribute('.tooltipLeft', message, 'title', '');
                p.defense = DOM.queryAll('.compacting', message)[3];
                p.defense = DOM.getAttribute('.tooltipRight', p.defense, 'title', '');
                
                if (p.fleet !== '') {
                    p.fleet = NMR.parseIntAbs(p.fleet);
                    if(p.fleet >= (1E3 * AGO.Option.get('M37'))) {
                        p.lucrative = 1;
                    }
                }
                
                p.date = AGO.Time.convertLocal(DOM.getText('.msg_head .msg_date', message));
                p.age = AGO.Time.ogameTime - AGO.Time.parse(DOM.getText('.msg_head .msg_date', message)).getTime();
                    
                OBJ.copy(p, message.dataset);
                PAGE.compactMessage(message);
            }
        });
    },
    
    getSpyReportMap: function () {
        var i = 0;
        OBJ.iterate(PAGE.allMessages, function (msgId) {
            if (DOM.query('.compacting', PAGE.allMessages[msgId])) {
                PAGE.spyReports[i] = PAGE.allMessages[msgId].dataset;
                i++;
            }
        });
        PAGE.spyReportsKeys = Object.keys(PAGE.spyReports);
        PAGE.sortSpyReports();
    },
    
    sortSpyReports: function (by) {
        by = by || 'loot';
        /* PAGE.spyReportsKeys.sort(function(a,b){return PAGE.spyReports[b][by] - PAGE.spyReports[a][by]});
        console.log(PAGE.spyReports);
        console.log(PAGE.spyReportsKeys);
        PAGE.showSpyReportOverview(); */
    },

    showSpyReportOverview: function (tab, tabContent) {
        var contentWrap = DOM.query('.content', document);
        var tableWrap = DOM.appendDIV(null, '');
        tableWrap.id = 'agoSpyReportOverview';
        contentWrap.insertBefore(tableWrap, contentWrap.firstChild);

        var table = DOM.parse('<table>' +
            '   <thead>' +
            '       <tr class="header">' +
            '           <th></th>' +
            '           <th id="spyHeadCoord" data-sort="coord">coordinates</th>' +         // TODO: add lang var
            '           <th id="spyHeadAge" data-sort="age">age</th>' +                 // TODO: add lang var
            '           <th id="spyHeadPlayer" data-sort="playerName">player (<span style="color:#99CC00;font-weight:normal;">activity</span>)</th>' +   // TODO: add lang var
            '           <th id="spyHeadLoot" data-sort="loot">loot</th>' +
            '           <th id="spyHeadFleet" data-sort="fleet">fleet</th>' +
            '           <th id="spyHeadDef" data-sort="defense">DEF</th>' +
            '           <th>actions</th>' +             // TODO: add lang var
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   </tbody>' +
            '</table>');
        tableWrap.appendChild(table);
        
        DOM.addEvents('#agoSpyReportOverview .header', tableWrap, { click: function (e) { 
                                                                                if (!e || !e.target || !e.target.id) return; 
                                                                                PAGE.sortSpyReports(e.target.dataset.sort);
                                                                            } });

        var tableBody = DOM.query('tbody', table);
        OBJ.iterate(PAGE.spyReports, function (id) {
            var p = PAGE.spyReports[PAGE.spyReportsKeys[id]];
            console.log(id%2);

            var player = '' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>';

            var row = DOM.appendTR(tableBody);
            row.classList.add('row');
            if (id%2 === 1) row.classList.add('even');
            var rowSelect = DOM.appendTD(row);
            var rowCoords = DOM.appendTD(row);
            rowCoords.innerHTML = p.coords + (p.isMoon === '1' ? ' <figure class="planetIcon moon tooltip js_hideTipOnMobile" title=""></figure>' : '');
            var rowAge = DOM.appendTD(row);
            rowAge.appendChild(DOM.parse('<span class="tooltipRight" title="' + p.date + '">' + AGO.Time.formatTime(p.age / 1000, true) + '</span>'));
            rowAge.style.textAlign = 'left';
            var rowPlayer = DOM.appendTD(row);
            rowPlayer.innerHTML = player + (parseInt(p.activity) > 0 ? ' (<span style="color: ' + p.activityColor + ';">' + p.activity + '</span>)' : '');
            rowPlayer.style.textAlign = 'left';
            var rowLoot = DOM.appendTD(row, null, AGO.Option.is('M53') ? STR.shortNumber(p.loot, 1) : STR.formatNumber(p.loot));
            rowLoot.style.textAlign = 'right';
            var rowDebris = DOM.appendTD(row);
            rowDebris.style.textAlign = 'right';
            var rowDefense = DOM.appendTD(row);
            rowDefense.style.textAlign = 'right';
            var rowActions = DOM.appendTD(row);
            tableBody.appendChild(row);
        });
    },

    onViewFleetsCombat: function () {
        var content = document.getElementById(this.getAttribute('aria-controls'));
        DOM.iterate(DOM.queryAll('.msg', content), function (message) {
            var apiKey = DOM.getAttribute('.msg_actions .icon_apikey', message, 'title', '');
            if (apiKey && (apiKey.substring(0, 3) === 'cr-')) {
                PAGE.combatReports[message.dataset.msgId] = message;
            }
        });
    }
};
