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
        //AGB.message("DataBase", "GetPlanet", { keyUni: AGO.App.keyUni, coords: "1:206:9" }, function (a) { console.log(a); });
        var content = document.getElementById(this.getAttribute('aria-controls'));
        DOM.iterate(DOM.queryAll('.msg', content), function (message) {
            PAGE.allMessages[message.dataset.msgId] = message;
            DOM.addEventsAll('.msg_head, .msg_content', message, { click: function () { PAGE.toggleFoldMessage(message); } });
            PAGE.toggleFoldMessage(message);
        });
        
        PAGE.parseMessagesEsp(this, content);
        PAGE.shrinkSpyReports(this, content);
        PAGE.addEspButtons(this, content);
        //PAGE.createSpyReportOverview(this, content);
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
        var divButtons = DOM.appendDIV(null, 'agoButtons');
        tabContent.insertBefore(divButtons, tabContent.firstChild);
        
        var divContent = DOM.parse('<table class="anti_msg_buttons" style="table-layout: fixed;"><tr><td style="width: 35px;"><input class="anti_msg_buttons" value="S" type="button" style="color: #ff9600;"></td><td style="width: 45px;"><input class="anti_msg_buttons" value="< S" type="button" style="color: #660011;"></td><td style="width: 35px;"><input class="anti_msg_buttons" value="X" type="button" style="color: #660011;"></td></tr></table>');
        divButtons.appendChild(divContent);
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
            p.loot >= (1E3 * AGO.Option.get('M36')) ? ( lootColor = '#ff9600', lootWeight = 'bold' ) : 0;
            
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

            // #TODO: Loca
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyActivity", "style":"color:"+activityColor+";" }, 'A: ' + p.activity);
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyLoot", "style":"color:"+lootColor+"; font-weight:"+lootWeight+"" }, 'L: ' + STR.shortNumber(p.loot) + '');
            DOM.appendSPAN(DOM.query('.msg_head', message), { "class":"agoSpyFleet", "style":"color:"+fleetColor+"; font-weight:"+fleetWeight+"" }, 'F: ' + STR.shortNumber(p.fleet) + '');
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
                
                p.loot = DOM.getAttribute('.tooltipRight', message, 'title', '').match(/: ([^<]+)*/)[1];
                // Thanks to vulca for code
                if (p.loot.match(/^[0-9]{1,3}\.[0-9]{3}$/))
                    p.loot = p.loot.replace('.', '');
                else if(p.loot.match(/^([0-9]{1,3}(\.|,))?[0-9]{1,3}(Md|Bn|Mrd)/))
                    p.loot = p.loot.replace(/,/g,'.').replace(/Md|Bn|Mrd/g,'')*1000000000;
                else if(p.loot.match(/^([0-9]{1,3}(\.|,))?[0-9]{1,3}(M|m)/))
                    p.loot = p.loot.replace(/,/g,'.').replace(/(M|m)/g,'')*1000000;
                
                p.fleet = DOM.getAttribute('.tooltipLeft', message, 'title', '');
                p.defense = DOM.queryAll('.tooltipRight', message)[1].getAttribute('title');
                
                OBJ.copy(p, message.dataset);
                PAGE.compactMessage(message);
            }
        });
    },

    createSpyReportOverview: function (tab, tabContent) {
        var tableWrap = DOM.appendDIV(null, 'tab_inner ctn_with_trash agoSpyReportOverview');
        tabContent.insertBefore(tableWrap, tabContent.firstChild);

        var table = DOM.parse('<table>' +
            '   <thead>' +
            '       <tr>' +
            '           <th></th>' +
            '           <th>coordinates</th>' +         // TODO: add lang var
            '           <th>age</th>' +                 // TODO: add lang var
            '           <th>player (activity)</th>' +   // TODO: add lang var
            '           <th>' + AGO.Label.get('M24') + '</th>' +
            '           <th>' + AGO.Label.get('M22') + '</th>' +
            '           <th>actions</th>' +             // TODO: add lang var
            '       </tr>' +
            '   </thead>' +
            '   <tbody>' +
            '   </tbody>' +
            '</table>');
        tableWrap.appendChild(table);

        var tableBody = DOM.query('tbody', table);
        OBJ.iterate(PAGE.spyReports, function (msgId) {
            var message = PAGE.spyReports[msgId];

            var player = DOM.query('.msg_content > div:first-child > span:nth-child(2)', message);

            var row = DOM.appendTR(tableBody);
            var rowSelect = DOM.appendTD(row);
            var rowCoords = DOM.appendTD(row).appendChild(DOM.query('.msg_content > div:first-child > span:nth-child(4) a', message).cloneNode(true));
            var rowAge = DOM.appendTD(row).appendChild(DOM.parse('<span class="tooltipRight" title="' + DOM.getText('.msg_head .msg_date') + '">' + AGO.Time.formatTime(message.dataset.age / 1000, true) + '</span>'));
            var rowPlayer = DOM.appendTD(row).appendChild(player.cloneNode(true)).appendChild(player.nextSibling.cloneNode(true));
            var rowLoot = DOM.appendTD(row, null, AGO.Option.is('M53') ? STR.shortNumber(message.dataset.loot, 1) : STR.formatNumber(message.dataset.loot));
            var rowDebris = DOM.appendTD(row);
            var rowActions = DOM.appendTD(row);

            row.dataset.msgId = msgId;
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
