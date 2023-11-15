![separe](https://github.com/studoo-app/.github/blob/main/profile/studoo-banner-logo.png)
# ISAAC - Interactive System for Assignment and Assessment in Class
[![Version](https://img.shields.io/badge/Version-1.0.0-blue)]()  

## Description

ISAAC et une application visant à assigner de manière aléatoire des élèves aux questions composant un travail.

## Fonctionnement

Le fonctionnement de l'application repose sur 2 fichiers renvoyant des objets javascript JSON, 
ces fichiers doivent être crées dans un dossier `/data`

### Modèle de fichier de classe `/data/groups.js`

```javascript
const groups = [
    {
        id:"classe1",
        label:"Class 1",
        students:[
            "Jean Bon",
            "..."
        ]
    },
    {
        id:"class2",
        label:"Classe 2",
        students:[
            "Noam Baroukh",
            "..."
        ]
    }
]
export default groups
```

### Modèle de fichier de classe `/data/works.js`

```javascript
const works = [
    {
        id:"work1",
        label:"Work 1",
        questions:[
            "intitulé de la question 1",
            "..."
        ]
    },
    {
        id:"work2",
        label:"Work 2",
        questions:[
            "Mission 1 - Question 1",
            "..."
        ]
    }
]
export default works
```