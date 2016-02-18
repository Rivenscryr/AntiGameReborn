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
    
    spyTableData: {
        sortDesc: false,
        sortSequence: 'age',
        checkedMessages: []
    },
    
    Load: function () {
        var a; OBJ.hasProperties(a = AGO.Data.getStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", "JSON")) ? AGO.Messages.spyTableData = a : AGO.Data.setStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", AGO.Messages.spyTableData);
    },
    
    Save: function () {
        AGO.Data.setStorage(AGO.App.keyPlayer + "_SPY_TABLE_DATA", AGO.Messages.spyTableData);
    },

    Ready: function () {
        DOM.addObserver(DOM.query('#messages .js_tabs'), { childList: true, subtree: true }, function (mutations) {
            for (var i = 0; i < mutations.length; i++) {
                var mutation = mutations[i];
                if (mutation.target.id && mutation.target.classList.contains('ui-tabs-panel') && !DOM.query('.tab_inner.ago_improved', mutation.target)) {
                    var tab = DOM.query('#messages .tabs_wrap .tabs_btn .list_item[aria-controls="' + mutation.target.id + '"], ' +
                                        '#messages .tabs_wrap .subtabs .list_item[aria-controls="' + mutation.target.id + '"]');

                    if (tab && AGO.Messages.messageTabEvents[tab.id]) {
                        DOM.query('.tab_inner', mutation.target).classList.add('ago_improved');
                        AGO.Messages.allMessages = {};
                        var content = document.getElementById(tab.getAttribute('aria-controls'));
                        DOM.iterate(DOM.queryAll('.msg', content), function (message) { AGO.Messages.allMessages[message.dataset.msgId] = message; });
                        AGO.Messages.addButtons(AGO.Messages.messageTabEvents[tab.id], content);
                        
                        if (typeof AGO.Messages[AGO.Messages.messageTabEvents[tab.id]] === 'function') {
                            AGO.Messages[AGO.Messages.messageTabEvents[tab.id]].call(tab, content);
                        }
                        
                        AGO.Messages.reviseContent();
                        break;
                    }
                }
            }
        });
        
        AGO.Messages.Load();
    },
    
    addButtons: function (tabName, tabContent) {
        tabContent = DOM.query('.tab_ctn', tabContent) || tabContent;
        var divButtons = DOM.appendDIV(null, 'agoButtons');
        divButtons.id = 'agoButtons';
        tabContent.insertBefore(divButtons, DOM.query('.tab_inner', tabContent));
        var divContent =    '<table class="anti_msg_buttons" style="table-layout: fixed;"><tr>';
        
        if (tabName === 'onViewFleetsEsp') {
            divContent +=       '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M80').replace('$subject', '\'' + AGO.Label.get('M86') + '\'') + '" value="S" type="button" style="color: #ff9600;" name="delEspAction"></td>' +
                                '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M82').replace('$plunder', '\'' + AGO.Option.get('M36')*1E3 + '\'').replace('$debris', '\'' + AGO.Option.get('M37')*1E3 + '\'') + '" value="< S" type="button" style="color: #660011;" name="delEspLoot"></td>' +
                                '<td style="width: 10px;">&nbsp;</td>';
        } 
        
        if (tabName) {
            divContent +=       '<td style="width: 35px;"><input class="anti_msg_buttons tooltipCustom" title="' + AGO.Label.get('M91') + '" value="X" type="button" style="color: #660011;" name="delShown"></td>';
        }
        divContent +=       '</tr></table>';

        divButtons.appendChild(DOM.parse(divContent));
                                   
        DOM.iterate(DOM.queryAll('.anti_msg_buttons tr td input', tabContent), function addListenerBtns(e) {
            e.addEventListener('click', AGO.Messages.runBtnFunction, false);
        });
    },
    
    runBtnFunction: function (e) {
        var delay = 100;
        OBJ.iterate(AGO.Messages.allMessages, function doAction (msgID) {
            if ( (e.target.name === 'delEspAction' && DOM.query('.espionageDefText', AGO.Messages.allMessages[msgID])) || 
                 (e.target.name === 'delEspLoot' && DOM.query('.compacting', AGO.Messages.allMessages[msgID]) && AGO.Messages.allMessages[msgID].dataset.lucrative === '0') ||
                 (e.target.name === 'delShown')
                ) { setTimeout(DOM.click('.js_actionKill', AGO.Messages.allMessages[msgID]), delay); delay += 400; }
        });
        document.location.href = '#agoSpyReportOverview'; 
    },

    onViewFleetsEsp: function (tabContent) {
        DOM.iterate(DOM.queryAll('.msg', tabContent), function (message) {
            DOM.addEventsAll('.msg_head', message, { click: function (e) { if (e.target.tagName === 'A' || e.target.classList.contains('js_actionKill')) return; AGO.Messages.toggleFoldMessage(message, e); } });
            AGO.Option.is('M14') ? AGO.Messages.toggleFoldMessage(message) : 0;
        });
        
        AGO.Messages.parseMessagesEsp(this, tabContent);
        AGO.Messages.getSpyReportMap();
        AGO.Messages.sortSpyReports(AGO.Messages.spyTableData.sortSequence);
        AGO.Messages.shrinkSpyReports(this, tabContent);
        AGO.Messages.addActButtons(this, tabContent);
        if (!OBJ.isEmpty(AGO.Messages.spyReports) && AGO.Option.is('M51')) AGO.Messages.showSpyReportOverview(this, tabContent);
    },
    
    reviseContent: function (tab, tabContent) {
        OBJ.iterate(AGO.Messages.allMessages, function (msgId) {
            if (AGO.Option.is('A31')) {
                var spanTime = DOM.query('.msg_head .msg_date', AGO.Messages.allMessages[msgId]);
                var msgTime = DOM.getText(spanTime);
                spanTime.textContent = AGO.Time.convertLocal(msgTime);
            }
        });
    },

    shrinkSpyReports: function (tab, tabContent) {
        // shrink spy reports
        if (AGO.Option.is("M12")) {
            OBJ.iterate(AGO.Messages.allMessages, function (msgId) {
                // TODO: tried to use css, but firefox completely ignores it!?
                var message = AGO.Messages.allMessages[msgId];
                if (DOM.query('.compacting', message)) {
                    DOM.iterate(DOM.queryAll('.msg_content br'), function (br) {
                        br.parentElement.removeChild(br);
                    });
                }
            });
        }
    },
    
    addActButtons: function (tab, tabContent) {
        var playerTechs =   {0:
                                [{research:{
                                        109: {level: AGO.Units.Data['109']},
                                        110: {level: AGO.Units.Data['110']},
                                        111: {level: AGO.Units.Data['111']},
                                        115: {level: AGO.Units.Data['115']},
                                        117: {level: AGO.Units.Data['117']},
                                        118: {level: AGO.Units.Data['118']}
                                }}]
                            };
        
        var prefillTechs = window.btoa(JSON.stringify(playerTechs));
        OBJ.iterate(AGO.Messages.allMessages, function (id) {
            var message = AGO.Messages.allMessages[id];
            if (DOM.query('.compacting', message)) {
                var txtLink = DOM.query('.msg_actions .txt_link', message);
                var divActBtns = document.createElement('div');
                divActBtns.classList.add('ago_act_buttons');
                DOM.query('.msg_actions', message).insertBefore(divActBtns, txtLink);
                
                var trashBtn = document.createElement('a');
                trashBtn.classList.add('icon_nf_link', 'fleft');
                trashBtn.href = 'https://trashsim.universeview.be/?SR_KEY=' + message.dataset.apiKey + '&utm_source=ogame&utm_medium=ago&utm_content=espionage%20message&utm_campaign=simulate' + '#prefill=' + prefillTechs;
                trashBtn.target = '_blank';
                    var trashIcon = document.createElement('span');
                    trashIcon.classList.add('icon_nf', 'icon_trashsim', 'tooltip', 'js_hideTipOnMobile');
                    trashIcon.title = 'TrashSim';
                    trashBtn.appendChild(trashIcon);
                divActBtns.appendChild(trashBtn);
            }
        });
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
        
        if (c = DOM.query('.espionageDefText', message)) {
            DOM.query('.txt_link', c).innerHTML += ' (' + message.dataset.playerName + ')';
            DOM.updateStyle('.msg_content', message, 'display', '');
        } else if (DOM.query('.compacting', message)) {
            var p = {};
            OBJ.copy(message.dataset, p);
            DOM.updateStyle('.msg_title', message, 'width', '450px');
            DOM.setStyleDisplay('.msg_sender', message, 'none');
            DOM.setStyleDisplay('.msg_sender_label', message, 'none');
            DOM.query('.msg_title', message).innerHTML += ' (' + AGO.Label.get('I70') + ': ' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>)';

            var activityColor = DOM.getAttribute('.msg_content font', message, 'color', '');
            
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
            
            // #TODO: not finished
            if (AGO.Option.is('M30') && AGO.Option.is('M14') && p.lucrative === '1') AGO.Messages.toggleFoldMessage(message);
        }
    },

    parseMessagesEsp: function (tab, tabContent) {
        OBJ.iterate(AGO.Messages.allMessages, function (msgId) {
            var message = AGO.Messages.allMessages[msgId],
                c;
            
            if (c = DOM.query('.espionageDefText', message)) {
                var b = {};
                b.txtLink = DOM.query('.txt_link', c);
                b.planetName = DOM.getText(b.txtLink);
                b.coords = b.planetName.split('[')[1].split(']')[0];

                AGB.message("DataBase", "GetPlanet", { keyUni: AGO.App.keyUni, coords: b.coords },    function (a) { 
                                                                                                        message.dataset.playerName = a.playerName;
                                                                                                        AGO.Messages.reviseMessage(message);
                                                                                                      });
            } else if (DOM.query('.compacting', message)) {
                message.id = 'm' + message.dataset.msgId;
                
                var p = {};
                p.apiKey = DOM.getAttribute('.icon_apikey', message, 'title', '').match(/sr-([-a-zA-Z0-9]+)/)[0];                
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
                var a; (a = STR.getMatches(DOM.getAttribute('.tooltipRight', message, 'title', ''), /(?:[:]) ([0-9]+)/g)) ? (p.sc = a[1], p.lc = a[2]) : 0;
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
                
                p.date = AGO.Time.convertLocal(DOM.getText('.msg_head .msg_date', message));
                p.age = AGO.Time.ogameTime - AGO.Time.parse(DOM.getText('.msg_head .msg_date', message)).getTime();
                    
                OBJ.copy(p, message.dataset);
                AGO.Option.is('M20') ? AGO.Messages.reviseMessage(message) : 0;
            }
        });
    },
    
    getSpyReportMap: function () {
        var i = 0;
        AGO.Messages.spyReports = {};
        OBJ.iterate(AGO.Messages.allMessages, function (msgId) {
            if (DOM.query('.compacting', AGO.Messages.allMessages[msgId])) {
                AGO.Messages.spyReports[i] = AGO.Messages.allMessages[msgId].dataset;
                i++;
            }
        });
    },
    
    sortSpyReports: function (by) {
        if (AGO.Messages.spyTableData.sortSequence != by) {
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
        
        AGO.Messages.spyReportsKeys.sort(function(a,b) {
            if(!AGO.Messages.spyTableData.sortDesc) b = [a, a = b][0];
            
            if (['loot', 'age', 'fleet', 'defense'].indexOf(by) > -1)
                return AGO.Messages.spyReports[b][by] - AGO.Messages.spyReports[a][by];
            else if (by === 'playerName') {
                var textA = AGO.Messages.spyReports[a][by].toUpperCase();
                var textB = AGO.Messages.spyReports[b][by].toUpperCase();
                return (textB < textA) ? -1 : (textB > textA) ? 1 : 0;
            } else if (by === 'coord') {
                var galaxyA = AGO.Messages.spyReports[a]['galaxy'];
                var galaxyB = AGO.Messages.spyReports[b]['galaxy'];
                var systemA = AGO.Messages.spyReports[a]['system'];
                var systemB = AGO.Messages.spyReports[b]['system'];
                var positionA = AGO.Messages.spyReports[a]['position'];
                var positionB = AGO.Messages.spyReports[b]['position'];
                return galaxyB - galaxyA || systemB - systemA || positionB - positionA;
            }
        });
        AGO.Messages.Save();
    },

    showSpyReportOverview: function (tab, tabContent) {
        var contentWrap = DOM.query('.tab_ctn', tabContent) || tabContent;
        if (a = DOM.query('#agoSpyReportOverview', contentWrap)) contentWrap.removeChild(a);
        var tableWrap = DOM.appendDIV(null, '');
        tableWrap.id = 'agoSpyReportOverview';
        contentWrap.insertBefore(tableWrap, contentWrap.firstChild);

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
            '           <th style="width: 66px;">' + AGO.Label.get('actions') + '</th>' +            // TODO: add lang var (not existing currently)
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   </tbody>' +
            '</table>');
        tableWrap.appendChild(table);
        
        DOM.addEvents('#agoSpyReportOverview .spyHeader', tableWrap, { click: function (e) { 
            if (!e || !e.target || !e.target.id) return; 
            if (e.target.dataset.sort === AGO.Messages.spyTableData.sortSequence) AGO.Messages.spyTableData.sortDesc = !AGO.Messages.spyTableData.sortDesc;
            AGO.Messages.sortSpyReports(e.target.dataset.sort);
            AGO.Messages.showSpyReportOverview(tab, tabContent);
        } });

        var tableBody = DOM.query('tbody', table);
        OBJ.iterate(AGO.Messages.spyReports, function (id) {
            var p = {}; OBJ.copy(AGO.Messages.spyReports[AGO.Messages.spyReportsKeys[id]], p);
            var message = document.getElementById('m' + p.msgId);

            var player = '' + (p.honorRank !== '' ? '<span class="honorRank ' + p.honorRank + '">&nbsp;</span>' : '') + '<span class="status_abbr_' + p.status + '">' + (p.playerName || '') + '</span>';

            var row = DOM.appendTR(tableBody);
            row.classList.add('row');
            row.id = 't_' + p.msgId;
            if (id%2 === 1) row.classList.add('even');
            
            /* var cellSelect = DOM.appendTD(row);
            cellSelect.classList.add('select'); */
            
            var cellCoords = DOM.appendTD(row);
                var linkCoords = document.createElement('a');
                linkCoords.classList.add('txt_link');
                linkCoords.href = '#m' + p.msgId;
                linkCoords.innerHTML = p.coords + (p.isMoon === '1' ? ' <figure class="planetIcon moon tooltip js_hideTipOnMobile" title=""></figure>' : '');
                linkCoords.onclick = function () {
                    message.classList.add('highlighted');
                    document.addEventListener('click', function toggleHighlight (e) { 
                        if (!DOM.isDescendant(message, e.target) && (!e.target.href || !e.target.href.match(p.msgId))) {
                            message.classList.remove('highlighted');
                            document.removeEventListener('click', toggleHighlight, false);
                        } else return;
                    }, false);
                }
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
                spanLoot.title = AGO.Label.get('L091') + ': ' + STR.formatNumber(Math.round(p.metal * p.plunder)) + '<br />' + AGO.Label.get('L092') + ': ' + STR.formatNumber(Math.round(p.crystal * p.plunder)) + '<br />' + AGO.Label.get('L093') + ': ' + STR.formatNumber(Math.round(p.deut * p.plunder));
                spanLoot.textContent = AGO.Option.is('M53') ? STR.shortNumber(p.loot, 1) : STR.formatNumber(p.loot);
            
            var rowFleet = DOM.appendTD(row, null, p.fleet !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.fleet, 1) : STR.formatNumber(p.fleet)) : 'no data');
            rowFleet.style.textAlign = 'right';
            
            var rowDefense = DOM.appendTD(row, null, p.defense !== '-1' ? (AGO.Option.is('M53') ? STR.shortNumber(p.defense, 1) : STR.formatNumber(p.defense)) : 'no data');
            rowDefense.style.textAlign = 'right';
            
            var cellActions = DOM.appendTD(row);            
                var aDelete = DOM.appendA(cellActions);
                aDelete.classList.add('spyTableIcon');
                DOM.query('#m' + p.msgId) ? aDelete.classList.add('icon', 'icon_delete') : aDelete.appendChild(document.createTextNode('-'));
                aDelete.addEventListener('click', function () { DOM.query('.js_actionKill', message) ? DOM.click('.js_actionKill', message) : !0; }, false);
                DOM.query('.js_actionKill', message).onclick = function deleteMessage (e) { 
                    DOM.query('#spyTable tbody').removeChild(DOM.query('#t_' + p.msgId));
                    OBJ.deleteWhere(AGO.Messages.spyReports, 'msgId', p.msgId);
                    OBJ.deleteWhere(AGO.Messages.allMessages, 'id', 'm' + p.msgId);
                    AGO.Messages.refreshSummary();
                    OBJ.iterate(DOM.queryAll('#spyTable .row'), function (id) {
                        var row = DOM.queryAll('#spyTable .row')[id];
                        row.classList.remove('even');
                        (id%2 === 1) ? row.classList.add('even') : 0; 
                    });
                };
                
                var aDetails = DOM.appendA(cellActions);
                aDetails.classList.add('icon', 'spyTableIcon', 'icon_minimize', 'overlay');
                aDetails.href = document.location.protocol + '//' + AGO.Uni.domain + '/game/index.php?page=messages&messageId='+ p.msgId + '&tabid=' + tab.dataset.tabid + '&ajax=1';
            
                var aGalaxy = DOM.appendA(cellActions);
                aGalaxy.classList.add('spyTableIcon');
				aGalaxy.classList.add('spyTabletwoOtherIcons');
                aGalaxy.href = '/game/index.php?page=galaxy&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position;
                aGalaxy.textContent = 'G';
            
                var aAttack = DOM.appendA(cellActions);
                aAttack.classList.add('spyTableIcon');
				aAttack.classList.add('spyTabletwoOtherIcons');
                aAttack.href = '/game/index.php?page=fleet1&galaxy=' + p.galaxy + '&system=' + p.system + '&position=' + p.position + '&type=' + (p.isMoon === '1' ? '3' : '1') + '&mission=1' + (AGO.Option.is('FA2') ? '&am202=' + p.sc : '&am203=' + p.lc);
                aAttack.textContent = 'A';
                AGO.Option.is('M16') ? aAttack.target = 'ago_fleet_attacks' : 0;
                DOM.query('.icon_attack img', message) ? aAttack.classList.add('attacking') : 0;
                
            tableBody.appendChild(row);
        });
        
        var summaryDiv = DOM.appendDIV(tableWrap);
        summaryDiv.classList.add('summary');
        summaryDiv.innerHTML = 'count: <span id="summaryCount"></span> | loot: <span id="summaryLoot"></span> | fleet: <span id="summaryFleet"></span>';
        AGO.Messages.refreshSummary();
    },
    
    refreshSummary: function () {
        var c, sumLoot = 0,
            sumFleet = 0;
            
        OBJ.iterate(AGO.Messages.spyReports, function (id) {
            sumLoot += parseInt(AGO.Messages.spyReports[id].loot);
            sumFleet += parseInt(((c = AGO.Messages.spyReports[id].fleet) > -1 ? c : 0));
        });        
        
        DOM.query('#summaryCount').textContent = Object.keys(AGO.Messages.spyReports).length;
        DOM.query('#summaryLoot').textContent = AGO.Option.is('M53') ? STR.shortNumber(sumLoot, 1) : STR.formatNumber(sumLoot);
        DOM.query('#summaryFleet').textContent = AGO.Option.is('M53') ? STR.shortNumber(sumFleet, 1) : STR.formatNumber(sumFleet);
    },

    onViewFleetsCombat: function (tabContent) {
        // ...
    },
    
    onKeydown: function (b) {
        if (document.activeElement.tagName in {'TEXTAREA':1, 'INPUT':1}) return;
        
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
