---
lang: de
page: changelog
layout: changelog
title: Changelog
---
### Version 7.1.0.2
* [Bugfix] Fix fürs Erweitern der Spiotabelle beim Blättern

### Version 7.1.0.1
* [Bugfix] "Transport" Button im Konstruktionen-Panel führte zu einer Error-Seite (die Ress werden leider trotzdem nicht automatisch eingeladen)
* [Bugfix] Einige Fixes für die Eventliste, aber immer noch buggy (Danke an @inc0 für die Mitarbeit)
* [Bugfix] Spionieren aus der Spiotabelle sendet nun die korrekte Anzahl an Spios

### Version 7.1.0
* [Feature] Option um Schiffe in der Schiffswerft zu zentrieren und untereinander anzuzeigen
* [Polishing] Zivile Schiffe und Militärschiffe werden im Sprungtor-Overlay visuell getrennt
* [Bugfix] CSS Fix im Techdetails-Overlay
* [Bugfix] Fix für die Ressanzeige in der Übersicht
* [Bugfix] Flottenroutinen funktionieren halbwegs, bitte immer vorsichtig sein und eure Flotten zweimal checken ob auch alles geklappt hat wie es sollte; volle Funktionalität ist noch nicht wiederhergestellt!
* [Bugfix] Koords-Box führt nicht mehr zu einem Error (Danke an @l0rd)
* [Bugfix] Fix für das manuelle Neuladen der Eventliste

### Version 7.0.0.2
* [Bugfix] Dummheit.

### Version 7.0.0.1
* [Bugfix] Planetenliste CSS Fix
* [Bugfix] Falsche Links in Spiotabelle
* [Bugfix] Falsche Rohstofflabels

### Version 7.0.0
* [Bugfix/Polishing/Feature] Anpassung einiger Features an 7.0.0
* [Bugfix/Polishing/Feature] Neue Schiffe mit AGR bekannt gemacht
* [Bugfix] Rundungsfehler bei Astro

### Version 6.8.8
* [Feature] Koordinaten im "Ziel"-Tab (Panel) und in der Spiotabelle können nun nach Entfernung sortiert werden (in Zusammenarbeit mit @Horcon)
* [Polishing] Ogniter entfernt
* [Feature] Stattdessen native Unterstützung für mmorpg-stat hinzugefügt
* [Feature] Variable Entfernung in der Flottensaven-Routine
* [Polishing] Unterstützung für Explizite Nullen in Task/Routine Einstellungen
* [Bugfix] Bug im Hintergrundprozess gefixt, der zum Verlust von Daten führte
* [Polishing] Tooltip mit Zusammensetzung der Rohstoffe in der "Total"-Zeile der Spiotabelle (Danke an @Horcon)
* [Bugfix] Kleiner Bug in der Sammeln-Routine
* [Misc] Spenden-Button im AGR-Menü

### Version 6.8.5.3
* [Polishing] Hyperspacetech-Unterstützung in TrashSim-Links

### Version 6.8.5.2
* [Feature] Spiosonden können nun neben GTs und KTs als Standardschiff gewählt werden zum Angreifen
* [Feature] Spiotabelle unterstützt jetzt Sonden in Spioraid-Unis
* [Feature] Standardgeschwindigkeit für Sonden wählbar (Danke an @Horcon für diese 3 Features)
* [Bugfix] Buttons im Nachrichtenmenü entfernen jetzt wie gehabt die gewünschten Nachrichten
* [Polishing] Löschen von Nachrichten verbessert
* [Polishing] Hyperraumtechnik ist jetzt eine "nützliche" Forschung
* [Bugfix] Berichte mit negativem Alter wurden falsch sortiert
* [Bugfix] Benötigte Transporter im Konstruktionen-Tab und in der Detailansicht von Forschungen/Gebäuden berücksichtigen jetzt Hyperraumtechnik
* [Polishing] Buttons zum Filtern von Berichten werden jetzt auch über der Spiotabelle angezeigt
* [Bugfix] Spionieren aus der Spiotabelle funktioniert jetzt wieder in Opera

### Version 6.8.5
* [Feature] Spionagetabelle wird nun beim umblättern erweitern (muss im Menü 
aktiviert werden)
* [Bugfix/Polishing] Laden von Buddys/Allymitgliedern im Teilen-Popup verbessert
* [Feature] Button zum Löschen von Berichten mit Verteidigung über einer bestimmten
Grenze hinzugefügt
* [Feature] Nativer TrashSim-Support
* [Polishing] TrashSim-Link im Panel füllt eigene Techs + Schiffe + Uni-Settings
automatisch aus
* [Bugfix] Negative Zeit in der Spionagetabelle
* [Feature] Bonus-Lagerkapazität von der Hyperspacetechnik sollte nun überall
berücksichtigt werden (bitte Fehler unbedingt melden)
* [Polishing] Die Links im AGR-Menü wurden überarbeitet und aktualisiert (Homepage, 
Support-Threads, Discord-Link, Spenden)
* [Polishing] Beim Klick auf den TrashSim-Button in Spioberichten wird automatisch
die korrekte Sprache gewählt
* [Polishing] TrashSim-Button im Vollbericht-Popup

### Version 6.8.3.3
* [Polishing] Option hinzugefügt für Funktion des Galaxie-Icons in der Koords-Box (AGR-Menü -> Hauptansicht)
* [Misc] DOMPurify Library auf die neuste Version geupdatet

### Version 6.8.3.2
* [Lokalisation] Einige französische Übersetzungen eingefügt
* [Bugfix] CSS Fixes in der Galaxie
* [Polishing] Strg + Pfeiltasten Shortcut wird in Textfeldern deaktiviert
* [Polishing] Strg + Pfeiltasten Shortcut kann in den Einstellungen deaktiviert werden
* [Bugfix] Sammeln-Routine funktionierte nach Umsiedlung nicht mehr
* [Bugfix] Gebäude im Bau in der Imperiumsansicht verfälschte Daten
* [Feature] Buddys und Allianz-Mitglieder werden im Teilen-Overlay angezeigt
* [Bugfix] Phalanx-Reichweite in donutSystem Unis
* [Feature] Das Galaxie-Icon (oben links) in der Koords-Box wechselt durch die Koords des Spielers

### Version 6.8.3.1
* [Bugfix] Firefox mochte den Workaround für den Chrome 71 Bug nicht
* [Bugfix] AGR funktionierte nicht mehr, wenn man ein Sprungtor benutzt hat, bevor AGR die Sprungtorlevel eingelesen hatte

### Version 6.8.3
* [Polishing] Code angefangen zu "entminifyn"
* [Feature] Grundgerüst für nativen TrashSim Support hinzugefügt
* [Polishing] Nicht-funktionalen Scripts button/Fair Play Mechanismus/Versionsüberprüfung komplett entfernt
* [Bugfix] Falsche Berechnung der baubaren Units (hat auch den x10 Button beeinflusst)
* [Feature/Bugfix] Cooldown für Sprungtore mit Level > 1 wird nun korrekt berechnet
* [Feature] Man kann nun mit Strg + Pfeiltasten durch Planeten/Monde scrollen
* [Bugfix] Temporärer Workaround für Chrome 71 Bug
* [Feature] 30/40/50% zur "Sende mehr Schiffe" Option hinzugefügt
* [Bugfix] Nicht-funktionale Chatbar Optionen entfernt

### Version 6.8.0.1
* [Feature] x10 Button in der Schiffswerft und bei Verteidigungsanlagen hinzugefügt

### Version 6.8.0
* [Misc] Addon zu AntiGameReborn umbenannt
* [Bugfix] Die Spiotabelle ist nun mit UniverseView kompatibel
* [Bugfix] Fehler bei der alternativen Weiterleitung nach Flottenversand behoben

### Version 6.7.2.3
* [Polishing] innerHTML Zuweisungen entschärft
* [Polishing] donutGalaxy und Spionieren aus der Galaxie-Ansicht verbessert
* [Feature] Weiterleitung nach Flottenversand kann verändert werden (AGO Menü -> Flotten)

### Version 6.7.2.1
* [Bugfix] Hotfix für Firefox
* [Bugfix] Ladekapazität auf Fleet2 wird nicht mehr als NaN angezeigt
* [Bugfix] Die automatische Geschwindigkeitsanpassung beim Spionieren aus der Galaxie-Ansicht berücksichtigt nun wieder Donut-Settings

### Version 6.7.2
* [Bugfix] OGame erkennt Flotten nicht, nachdem die Routinen Saven oder Sammeln in Verbindung mit dem automatischen Planetenwechsel genutzt wurden
* [Bugfix] Erste Flottenseite muss nach automatischem Planetenwechsel mehrmals ausgefüllt werden
* [Bugfix/Polishing] Einige Optimierungen und Bugfixes
* [Feature] Forschungen zur detaillierten Ansicht in der Spiotabelle hinzugefügt (https://i.imgur.com/C5ORpwX.png)
* [Feature] Spiotabelle zu Favoriten und Geteilte Spionageberichte hinzugefügt
* [Feature] Händler-Button wird hervorgehoben, wenn im Import/Export ein noch nicht abgeholtes Item liegt
* [Bugfix] Fix für die Tastenkürzel in der Galaxie; die AGO-Tastenkürzel gehen jetzt ein System nach dem anderen weiter
* [Bugfix] Der globale Deuteriumsavefaktor wird nun in der Deutverbrauch-Rechnung mitberücksichtigt
* [Bugfix] Probleme mit UniverseView auf der Nachrichtenseite behoben
* [Bugfix] Fix bei der Fleetauswahl wenn mehr als 10 Millionen Schiffe eines Typs vorhanden sind

### Version 6.7.0
* [Bugfix] Imperiumansicht gefixt
* [Bugfix] Namen von Minen werden richtig angezeigt (und nicht als Geologe etc.)
* [Feature] Spionieren aus den Nachrichten heraus hat dieselbe Speedanpassung wie aus der Galaxie-Ansicht auch
