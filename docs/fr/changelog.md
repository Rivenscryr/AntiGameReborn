---
redirect_from: "/changelog/"
lang: fr
page: changelog
---

## Changelog
### Version 6.8.5
* [Feature] Spy table is now extended when browsing through pages
* [Bugfix/Polishing] Improved loading buddies/alliance members into the shareReport
overlay
* [Feature] Added button to delete reports with defense over a limit
* [Feature] Native TrashSim support
* [Polishing] TrashSim link in the panel prefills your own techs, ships and
universe settings
* [Bugfix] Negative age in the spy table
* [Feature] Bonus cargo capacity from Hyperspace Tech should be considered correctly
(please test and report errors)
* [Polishing] Reworked and updated links in AGR menu (homepage, support threads,
Discord link, donations)
* [Polishing] TrashSim buttons in espionage reports now have the correct language
* [Polishing] Added TrashSim button to the full espionage report overlay

### Version 6.8.3.3
* [Polishing] Added option to choose function galaxy icon in coords box (AGR Menu -> Main view)
* [Misc] Mise à jour de la bibliothèque DOMPurify vers la dernière version

### Version 6.8.3.2
* [Localization] Quelques mots français
* [Bugfix] Correction de CSS dans la Galaxie
* [Polishing] Désactive le raccourci Ctrl + flèche dans les champs textes
* [Polishing] Ajout de l'option pour désactiver le raccourci Ctrl + flèche
* [Bugfix] Routine de collecte ne fonctionne plus après un déménagement
* [Bugfix] Data gets corrupted if there are buildings in queue in empire view
* [Feature] Buddies and alliance members are shown in share report overlay
* [Bugfix] Lanx range dans les univers circulaires
* [Feature] The galaxy icon (top left) in coords box cycles through coords

### Version 6.8.3.1
* [Bugfix] Firefox didn't get along with the workaround for Chrome bug
* [Bugfix] AGR broke when using a jumpgate if AGR didn't have the jumpgate levels yet

### Version 6.8.3
* [Polishing] Started unminifying code
* [Feature] Added base frame for native TrashSim support
* [Polishing] Removed non-functional Scripts button/fair play policy/version check completely
* [Bugfix] Wrong calculation of max. buildable units (affecting x10 button)
* [Feature/Bugfix] Correct calculation of jump gate cooldowns with level higher than 1
* [Feature] Ability to scroll through planets/moons with Ctrl + Arrow keys
* [Bugfix] Temporary workaround for Chrome 71 bug
* [Feature] Added 30/40/50% to "Send more ships" option
* [Bugfix] Removed non-functional Chatbar options

### Version 6.8.0.1
* [Feature] Bouton x10 button dans Chantier spatial et Défense

### Version 6.8.0
* [Misc] Extension renommée en AntiGameReborn
* [Bugfix] The spy table now works fully with UniverseView installed
* [Bugfix] Fixed a bug that occured when using the alternative redirection when sending fleets

### Version 6.7.2.3
* [Polishing] Sanitized innerHTML assignments
* [Polishing] donutGalaxy and probing from Galaxy view improvement
* [Feature] Redirection after sending a fleet can be changed to "movement" (AGO Menu -> Fleets)

### Version 6.7.2.1
* [Bugfix] Hotfix pour Firefox
* [Bugfix] La capacité de chargement sur la page flotte 2 est maintenant affichée correctement (et non comme NaN)
* [Bugfix] The speed adjustment when probing from galaxy view now recognizes donut unis correctly (again)

### Version 6.7.2
* [Bugfix] OGame not recognizing fleet after using auto-switch planets on Collect and Fleetsave routines
* [Bugfix] Not being able to send a fleet after auto-switch of planets
* [Bugfix/Polishing] Some optimizations and small bugfixes
* [Feature] Added research to the detailed report view in the spy table (https://i.imgur.com/C5ORpwX.png)
* [Feature] Added spy table to Favorites and Shared spy reports
* [Feature] Merchant button is highlighted if there is a new item in Import/Export
* [Bugfix] Fix for galaxy shortcuts; using AGO shortcuts now goes through systems/galaxies one by one
* [Bugfix] Global deuterium save factor is now implemented in the Deuterium consumption calculation
* [Bugfix] Fix for using AGO together with UniverseView
* [Bugfix] Fix for fleet selection for amounts >10 million

### Version 6.7.0
* [Bugfix] Correction de la vue Empire
* [Bugfix] Les noms des mines sont affichés correctement (pas en tant que Géologue, etc.)
* [Feature] Spying out of the messages page also has the same speed adjustment as the galaxy view