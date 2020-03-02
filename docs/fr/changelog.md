---
redirect_from: "/changelog/"
lang: fr
page: changelog
layout: changelog
title: Changelog
---
### Version 6.8.5
* [Fonction] La table des espionnages est maintenant étendue lors de la navigation dans les pages
* [Bugfix/Interface] Amélioration du chargement des amis/membres de l'alliance dans le partage.
* [Fonction] Ajout du bouton pour supprimer les rapports avec une défense supérieur à une limite
* [Fonction] Support natif de TrashSim 
* [Interface] Le lien TrashSim préremplit vos technos, vaisseaux et les paramètres de l'univers
* [Bugfix] Age négatif dans le tableau d'espionnage
* [Fonction] Le bonus sur la capacité de transport provenant de la technologie Hyperespace devrait être pris en compte correctement
(tester et remonter les erreurs s'il vous plait)
* [Interface] Modification et mise à jour des liens dans le menu AGR (page d'accueil, topic de support,
lien Discord, donations)
* [Interface] Le bouton TrashSim dans le rapport d'espionnage est dans la bonne langue
* [Interface] Ajout du bouton TrashSim au rapport d'espionnage complet

### Version 6.8.3.3
* [Interface] Ajout d'une option pour choisir l'icône de la fonction galaxie dans la boîte de coordonnées (Menu AGR -> Vue principale)
* [Divers] Mise à jour de la bibliothèque DOMPurify vers la dernière version

### Version 6.8.3.2
* [Traduction] Quelques mots français
* [Bugfix] Correction de CSS dans la Galaxie
* [Interface] Désactive le raccourci Ctrl + flèche dans les champs textes
* [Interface] Ajout de l'option pour désactiver le raccourci Ctrl + flèche
* [Bugfix] Routine de collecte ne fonctionne plus après un déménagement
* [Bugfix] Les données sont corrompues s'il y a des bâtiments en file d'attente en vue empire.
* [Fonction] Les amis et les membres de l'alliance sont représentés dans le partage de rapport.
* [Bugfix] Correction de la portée de la phalange dans les univers circulaires
* [Fonction] L'icône de la galaxie (en haut à gauche) dans la boîte des coordonnées fait défiler les coordonnées.

### Version 6.8.3.1
* [Bugfix] Firefox ne s'entendait pas avec la solution de contournement pour le bug Chrome
* [Bugfix] AGR ne fonctionnait plus lors de l'utilisation d'une porte de saut si AGR n'avait pas encore les niveaux de la porte de saut.

### Version 6.8.3
* [Interface] Commencé à déminifier le code
* [Fonction] Ajout d'un cadre de base pour le support natif de TrashSim
* [Interface] Suppression des scripts non fonctionnels bouton/politique de fair-play/vérification complète de la version
* [Bugfix] Mauvais calcul du nombre maximum d'unités pouvant être construites (affectant le bouton x10)
* [Fonction/Bugfix] Calcul correct des temps de recharge des portes de saut avec un niveau supérieur à 1
* [Fonction] Possibilité de faire défiler les planètes/lune avec les touches Ctrl + Flèche
* [Bugfix] Solution de contournement temporaire pour le bug de Chrome 71
* [Fonction] Ajouté 30/40/50% à l'option "Envoyer plus de vaisseaux
* [Bugfix] Suppression des options non fonctionnelles de la barre de dialogue

### Version 6.8.0.1
* [Fonction] Bouton x10 button dans Chantier spatial et Défense

### Version 6.8.0
* [Divers] Extension renommée en AntiGameReborn
* [Bugfix] La table d'espionnage fonctionne maintenant complètement avec UniverseView installé.
* [Bugfix] Correction d'un bogue survenu lors de l'utilisation de la redirection alternative lors de l'envoi de flottes.

### Version 6.7.2.3
* [Interface] Nettoyage des assignements innerHTML
* [Interface] Amélioration pour les univers circulaires et sondage depuis la page Galaxie
* [Fonction] La redirection après l'envoi d'une flotte peut être changée en "mouvement" (Menu AGO -> Flottes)

### Version 6.7.2.1
* [Bugfix] Hotfix pour Firefox
* [Bugfix] La capacité de chargement sur la page flotte 2 est maintenant affichée correctement (et non comme NaN)
* [Bugfix] L'ajustement de la vitesse lors du sondage à partir de la vue de la galaxie reconnaît maintenant correctement les univers circulaires (à nouveau) 

### Version 6.7.2
* [Bugfix] OGame ne reconnaît pas la flotte après l'utilisation du changement automatique des planètes sur les routines de collectes et de sauvetage de flotte
* [Bugfix] Ne pas être capable d'envoyer une flotte après le changement automatique des planètes
* [Bugfix/Interface] Quelques optimisations et petites corrections de bugs
* [Fonction] Ajouté la recherche à la vue détaillée du rapport dans le tableau d'espionnage (https://i.imgur.com/C5ORpwX.png)
* [Fonction] Ajout d'une table d'espionnage aux Favoris et rapports d'espionnage partagés
* [Fonction] Le bouton Marchand est mis en surbrillance s'il y a un nouvel élément dans Import/Export.
* [Bugfix] Correction des raccourcis pour les galaxies ; l'utilisation des raccourcis AGO passe maintenant par les systèmes/galaxies un par un
* [Bugfix] Le facteur global d'économie de deutérium est maintenant implémenté dans le calcul de la consommation de deutérium.
* [Bugfix] Correction de l'utilisation de l'AGO avec UniverseView
* [Bugfix] Correction pour la sélection de flotte pour des montants >10 millions

### Version 6.7.0
* [Bugfix] Correction de la vue Empire
* [Bugfix] Les noms des mines sont affichés correctement (pas en tant que Géologue, etc.)
* [Fonction] Espionner depuis la page des message a également le même ajustement de vitesse que celui de la vue galaxie
