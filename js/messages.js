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
                        PAGE.allMessages = {};
                        var content = document.getElementById(tab.getAttribute('aria-controls'));
                        DOM.iterate(DOM.queryAll('.msg', content), function (message) { PAGE.allMessages[message.dataset.msgId] = message; });
                        PAGE.addButtons(PAGE.messageTabEvents[tab.id], content);
                        
                        if (typeof PAGE[PAGE.messageTabEvents[tab.id]] === 'function') {
                            PAGE[PAGE.messageTabEvents[tab.id]].call(tab, content);
                        }
                        
                        PAGE.reviseContent();
                        break;
                    }
                }
            }
        });
    },
    
    addButtons: function (tabName, tabContent) {
        tabContent = DOM.query('.tab_ctn', tabContent) || tabContent;
        var divButtons = DOM.appendDIV(null, 'agoButtons');
        tabContent.insertBefore(divButtons, DOM.query('.tab_inner', tabContent));
        var divContent =    '<table class="anti_msg_buttons" style="table-layout: fixed;"><tr>';
        
        if (tabName === 'onViewFleetsEsp') {
            divContent +=       '<td style="width: 35px;"><input class="anti_msg_buttons tooltipRight" title="' + AGO.Label.get('M80').replace('$subject', '\'' + AGO.Label.get('M86') + '\'') + '" value="S" type="button" style="color: #ff9600;" name="delEspAction"></td>' +
                                '<td style="width: 35px;"><input class="anti_msg_buttons" value="< S" type="button" style="color: #660011;" name="delEspLoot"></td>' +
                                '<td style="width: 10px;">&nbsp;</td>';
        } 
        
        if (tabName) {
            divContent +=       '<td style="width: 35px;"><input class="anti_msg_buttons tooltipRight" title="Delete all shown messages" value="X" type="button" style="color: #660011;" name="delShown"></td>';
        }
        divContent +=       '</tr></table>';

        divButtons.appendChild(DOM.parse(divContent));
                                   
        DOM.iterate(DOM.queryAll('.anti_msg_buttons tr td input', tabContent), function addListenerBtns(e) {
            e.addEventListener('click', PAGE.runBtnFunction, false);
        });
    },
    
    runBtnFunction: function (e) {
        var delay = 100;
        OBJ.iterate(PAGE.allMessages, function doAction (msgID) {
            if ( (e.target.name === 'delEspAction' && DOM.query('.espionageDefText', PAGE.allMessages[msgID])) || 
                 (e.target.name === 'delEspLoot' && DOM.query('.compacting', PAGE.allMessages[msgID]) && PAGE.allMessages[msgID].dataset.lucrative === '0') ||
                 (e.target.name === 'delShown')
                ) { setTimeout(DOM.click('.js_actionKill', PAGE.allMessages[msgID]), delay); delay += 400; }
        });
    },

    onViewFleetsEsp: function (tabContent) {
        DOM.iterate(DOM.queryAll('.msg', tabContent), function (message) {
            DOM.addEventsAll('.msg_head, .msg_content', message, { click: function () { PAGE.toggleFoldMessage(message); } });
            PAGE.toggleFoldMessage(message);
        });
        
        PAGE.parseMessagesEsp(this, tabContent);
        PAGE.getSpyReportMap();
        PAGE.sortSpyReports();
        PAGE.shrinkSpyReports(this, tabContent);
        PAGE.showSpyReportOverview(this, tabContent);
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
    
    toggleFoldMessage: function (message) {
        if (!message.classList.contains('ago_folded')) {
            var arrayHideElements = ['msg_sender', 'msg_sender_label', 'msg_actions'];
            if (!DOM.query('.espionageDefText', message)) arrayHideElements.push('msg_content');
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
            var p = {};
            OBJ.copy(message.dataset, p);
            var activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
            
            DOM.updateStyle('.msg_title', message, 'width', '450px');
            DOM.query('.msg_title', message).innerHTML += ' (' + AGO.Label.get('I70') + ': ' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>)';
            
            var lootWeight = 'normal';
            var lootColor = '';
            p.loot >= (1E3 * AGO.Option.get('M36')) ? ( lootColor = '#ff9600', lootWeight = 'bold' ) : '0';
            
            var fleetWeight = 'normal';
            var fleetColor = '';
            if (p.fleet !== '-1') {
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
            if (p.defense !== '-1') {
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
                message.id = message.dataset.msgId;
                
                var p = {};
                p.playerName = STR.trim(DOM.query('[class^="status_abbr_"]', message).lastChild.data);
                p.status = DOM.query('[class^="status_abbr_"]', message).className.match(/status_abbr_(.+)/)[1];
                p.honorRank = (a = DOM.query('.honorRank', message)) ? a.classList[1] : '';
                p.activity = DOM.getText('.msg_content font', message, 2) || '-';
                p.coords = DOM.getText('.msg_head > .msg_title > .txt_link', message).split('[')[1].split(']')[0];
                p.galaxy = p.coords.split(':')[0];
                p.system = p.coords.split(':')[1];
                p.position = p.coords.split(':')[2];
                p.isMoon = DOM.query('.msg_head .msg_title .moon', message) ? 1 : 0;
                p.activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
                
                p.loot = NMR.parseIntRess(DOM.getAttribute('.tooltipRight', message, 'title', ''));
                p.metal = NMR.parseIntRess(DOM.queryAll('.resspan', message)[0].textContent);
                p.crystal = NMR.parseIntRess(DOM.queryAll('.resspan', message)[1].textContent);
                p.deut = NMR.parseIntRess(DOM.queryAll('.resspan', message)[2].textContent);
                p.plunder = DOM.queryAll('.compacting', message)[2].textContent.match(/: ([0-9]+)%/)[1]/100;
                p.loot >= (1E3 * AGO.Option.get('M36')) ? p.lucrative = '1' : p.lucrative = '0';
                
                p.fleet = DOM.getAttribute('.tooltipLeft', message, 'title', '');
                p.defense = DOM.getAttribute('.tooltipRight', DOM.queryAll('.compacting', message)[3], 'title', '');
                
                if (p.fleet !== '') {
                    p.fleet = NMR.parseIntAbs(p.fleet);
                    if(p.fleet >= (1E3 * AGO.Option.get('M37'))) {
                        p.lucrative = 1;
                    }
                } else
                    p.fleet = -1;
                
                if (p.defense !== '')
                    p.defense = NMR.parseIntAbs(p.defense);
                else
                    p.defense = -1;
                
                console.log(this);
                p.date = AGO.Time.convertLocal(DOM.getText('.msg_head .msg_date', message));
                p.age = AGO.Time.ogameTime - AGO.Time.parse(DOM.getText('.msg_head .msg_date', message)).getTime();
                    
                OBJ.copy(p, message.dataset);
                PAGE.compactMessage(message);
            }
        });
    },
    
    getSpyReportMap: function () {
        var i = 0;
        PAGE.spyReports = {};
        OBJ.iterate(PAGE.allMessages, function (msgId) {
            if (DOM.query('.compacting', PAGE.allMessages[msgId])) {
                PAGE.spyReports[i] = PAGE.allMessages[msgId].dataset;
                i++;
            }
        });
        PAGE.spyReportsKeys = Object.keys(PAGE.spyReports);
    },
    
    sortSpyReports: function (by) {
        by = by || 'loot';
        PAGE.spyReportsKeys.sort(function(a,b){return PAGE.spyReports[b][by] - PAGE.spyReports[a][by]});
        console.log(PAGE.spyReports);
        console.log(PAGE.spyReportsKeys);
    },

    showSpyReportOverview: function (tab, tabContent) {
        var contentWrap = DOM.query('.tab_ctn', tabContent) || tabContent;
        if (a = DOM.query('#agoSpyReportOverview', contentWrap)) contentWrap.removeChild(a);
        var tableWrap = DOM.appendDIV(null, '');
        tableWrap.id = 'agoSpyReportOverview';
        contentWrap.insertBefore(tableWrap, contentWrap.firstChild);

        var table = DOM.parse('' +
            '<table>' +
            '   <thead>' +
            '       <tr class="spyHeader">' +
            '           <th></th>' +
            '           <th id="spyHeadCoord" data-sort="coord">' + AGO.Label.get("Coord") + '</th>' +         // TODO: add lang var; there is in EN_menu.json but i can't import it
            '           <th id="spyHeadAge" data-sort="age">' + AGO.Label.get('Age') + '</th>' +                 // TODO: add lang var (not existing currently)
            '           <th id="spyHeadPlayer" data-sort="playerName">' + AGO.Label.get('I70') + ' (<span style="color:#99CC00;font-weight:normal;">' + AGO.Label.get('Activity') + '</span>)</th>' +   // TODO: add lang var; there is in EN_menu.json but i can't import it
            '           <th id="spyHeadLoot" data-sort="loot">' + AGO.Label.get('M24') + '</th>' +
            '           <th id="spyHeadFleet" data-sort="fleet">' + AGO.Label.get('T40') + '</th>' +
            '           <th id="spyHeadDef" data-sort="defense">' + AGO.Label.get('Defense') + '</th>' + // TODO: add lang var (not existing currently)
            '           <th>' + AGO.Label.get('Actions') + '</th>' +            // TODO: add lang var (not existing currently)
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   </tbody>' +
            '</table>');
        tableWrap.appendChild(table);
        
        DOM.addEvents('#agoSpyReportOverview .spyHeader', tableWrap, { click: function (e) { 
                                                                                if (!e || !e.target || !e.target.id) return; 
                                                                                PAGE.sortSpyReports(e.target.dataset.sort);
                                                                                PAGE.showSpyReportOverview(tab, tabContent);
                                                                            } });

        var tableBody = DOM.query('tbody', table);
        OBJ.iterate(PAGE.spyReports, function (id) {
            var p = {}; OBJ.copy(PAGE.spyReports[PAGE.spyReportsKeys[id]], p);
            var message = document.getElementById(p.msgId);

            var player = '' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>';

            var row = DOM.appendTR(tableBody);
            row.classList.add('row');
            if (id%2 === 1) row.classList.add('even');
            
            var cellSelect = DOM.appendTD(row);
            cellSelect.classList.add('select');
            
            var cellCoords = DOM.appendTD(row);
                var linkCoords = document.createElement('a');
                linkCoords.classList.add('txt_link');
                linkCoords.href = '#' + p.msgId;
                linkCoords.innerHTML = p.coords + (p.isMoon === '1' ? ' <figure class="planetIcon moon tooltip js_hideTipOnMobile" title=""></figure>' : '');
            cellCoords.appendChild(linkCoords);
            
            var cellAge = DOM.appendTD(row);
            cellAge.style.textAlign = 'left';
                var spanAge = document.createElement('span');
                spanAge.classList.add('tooltipRight');
                spanAge.title = p.date;
                spanAge.innerHTML = AGO.Time.formatTime(p.age / 1000, true);
            cellAge.appendChild(spanAge);
            
            var cellPlayer = DOM.appendTD(row);
            cellPlayer.style.textAlign = 'left';
            cellPlayer.innerHTML = player + (parseInt(p.activity) > 0 ? ' (<span style="color: ' + p.activityColor + ';">' + p.activity + '</span>)' : '');
            
            var cellLoot = DOM.appendTD(row);
            cellLoot.style.textAlign = 'right';
                var spanLoot = DOM.appendSPAN(cellLoot);
                spanLoot.classList.add('tooltipCustom');
                spanLoot.title = STR.formatNumber(p.metal * p.plunder) + '<br />' + STR.formatNumber(p.crystal * p.plunder) + '<br />' + STR.formatNumber(p.deut * p.plunder);
                spanLoot.textContent = AGO.Option.is('M53') ? STR.shortNumber(p.loot, 1) : STR.formatNumber(p.loot);
            
            var rowFleet = DOM.appendTD(row, null, p.fleet !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.fleet, 1) : STR.formatNumber(p.fleet)) : 'no data');
            rowFleet.style.textAlign = 'right';
            var rowDefense = DOM.appendTD(row, null, p.defense !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.defense, 1) : STR.formatNumber(p.defense)) : 'no data');
            rowDefense.style.textAlign = 'right';
            var rowActions = DOM.appendTD(row);
            rowActions.innerHTML = '<a href="/game/index.php?page=fleet1&amp;galaxy=' + p.galaxy + '&amp;system=' + p.system + '&amp;position=' + p.position + '&amp;type=1&amp;mission=1" class="spyTableIcon">A</a>';
            tableBody.appendChild(row);
        });
    },

    onViewFleetsCombat: function (tabContent) {
        // ...
    }
    
    
};
