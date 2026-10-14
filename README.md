# Élégance Ivoire — boutique de mode féminine

Site vitrine statique (HTML, CSS, JavaScript) avec :
- catalogue de 6 produits **de démonstration** ;
- filtres par catégorie et tri par prix ;
- panier, quantités et sous-total en FCFA ;
- formulaire de commande, tailles, coordonnées et quartier ;
- choix Wave ou paiement à la livraison ;
- instructions Wave et copie du numéro ;
- génération d'un récapitulatif de commande à transmettre par WhatsApp ;
- mise en page responsive et animations glassmorphism.

## Lancer sur Windows
1. Décompresse `elegance_ivoire.zip`.
2. Ouvre le dossier `elegance_ivoire`.
3. Double-clique sur `index.html` pour prévisualiser dans Chrome.
4. Pour modifier le site, ouvre `index.html`, `styles.css` et `app.js` dans VS Code.

## Avant de vendre
1. Remplace les articles d'exemple dans `app.js` par tes vrais produits, photos, prix et tailles.
2. Vérifie le numéro Wave dans `app.js` et dans `index.html`.
3. Le numéro WhatsApp est actuellement configuré en format international ivoirien dans `app.js`. Vérifie qu'il correspond au compte WhatsApp qui doit recevoir les commandes.
4. Confirme les frais de livraison avec la cliente avant de valider la commande.
5. Vérifie manuellement la réception de chaque transfert Wave. Le site ne reçoit aucune notification de paiement et ne peut pas confirmer automatiquement une transaction.
6. Le site ne possède pas de base de données, d'espace administrateur, de stock synchronisé ni d'historique serveur. Les commandes sont préparées dans WhatsApp ; aucune commande n'est sauvegardée côté serveur.
7. Les photos externes nécessitent une connexion Internet. Utilise tes propres photos ou des images dont tu as le droit d'utilisation avant publication commerciale.

## Publier gratuitement avec GitHub Pages
GitHub Pages peut héberger les fichiers HTML/CSS/JS statiques. Consulte le guide officiel :
https://docs.github.com/fr/pages/getting-started-with-github-pages/creating-a-github-pages-site

1. Crée un dépôt GitHub public, par exemple `elegance-ivoire`.
2. Envoie **le contenu du dossier** dans le dépôt, de façon à ce que `index.html` soit à la racine.
3. Dans le dépôt, ouvre **Settings → Pages**.
4. Dans **Build and deployment**, choisis **Deploy from a branch**, branche `main` et dossier `/(root)`, puis clique **Save**.
5. Attends la publication, puis ouvre l'adresse affichée dans la section Pages.

> Les sites GitHub Pages sont publics. Ne publie jamais de mots de passe, clés privées ou données confidentielles dans le dépôt.

## Fichiers
- `index.html` : structure et contenu
- `styles.css` : style premium, glassmorphism et responsive
- `app.js` : catalogue, panier, formulaire et WhatsApp
