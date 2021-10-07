# Un crud

## Stack technique
Côté front :
* React.js
* Lottie (pour ajouter des animations ae)
* Socket.io client


Côté back :
* Node.js (ESM)
* Serveur express
* Mongo
* Mongoose (ORM)
* Socket.io
* JWT
* Puppeteer (Pour scraper les sites)

## Installation du front
Se rendre dans le dossier `front` et lancer les commandes suivantes :
#### Installer les dépendances
```bash
$ yarn 
```

#### Lancer le serveur de développement
```bash
$ yarn dev
```

Pour build le projet et le servir en local sur la machine vous pouvez lancer la commande suivante : 
```bash
$ yarn build && yarn serve
```

## Installation du back
Avoir docker d'installé sur sa machine (une version récente svp)
Lancer le projet :
```bash
$ docker compose up --build --force-recreate
```

/!\ Patience si vous avez une mauvaise co, pretez attention aux logs pour que le serveur ai fini d'installer toutes les dépendances.

Pour scraper les données et remplir la db:
```bash
$ yarn scrape
```
Si vous êtes curieux vous pourrez trouver le fichier qui se charge de cette opération dans [ce repertoire](./back/helpers/scrape.js)