'use strict'
document.addEventListener('DOMContentLoaded', function (event) {
  InformationMessage()
  RecupererInformation()
})

function InformationMessage () {
  const date = new Date()
  const heure = date.getHours()

  let nbFruit = 0
  for (let i = 0; i <= heure; i++) {
    nbFruit = nbFruit + (5 / 24)
  }

  nbFruit = Math.round((nbFruit) * 100) / 100

  const message = ('<B>Information :</B> Vous devriez avoir consommer ' + nbFruit + ' fruits et légumes à cette heure de la journée.')

  // Affiche le message.
  document.getElementById('Information').innerHTML = message
}

// Récupère le nombre de l'égumes et de fruits consomer a une journée.
function NombreLegumesConsommer (joursX, tableauNBLegumesConsomer) {
  const nbLegumesConsomer = prompt('combien de légumes vous avez consomer au jour?' + joursX)
  tableauNBLegumesConsomer[joursX] = nbLegumesConsomer
  return nbLegumesConsomer
}

// Récupère le nombre de minute d'exercice a une journée.
function NombreMinuteExercices (joursX, tableauNBMinuteExercices) {
  const minuteExercice = prompt('combien de minutes d’exercice avez vous fait au jour?' + joursX)
  tableauNBMinuteExercices[joursX] = minuteExercice
  return minuteExercice
}

// recupérer nombre de minute et nombre de fruits et legumes consommer par jours.
function RecupererInformation () {
  const tableauNBLegumesConsomer = []
  const tableauNBMinuteExercices = []
  let joursX = 1
  let nbLegumesConsomer = 0
  let minuteExercice = 0
  let nbJour = 0

  do {
    nbLegumesConsomer = NombreLegumesConsommer(joursX, tableauNBLegumesConsomer)

    if (nbLegumesConsomer === 'stop') {
      joursX += 1
      continue
    }

    minuteExercice = NombreMinuteExercices(joursX, tableauNBMinuteExercices)

    joursX += 1
  } while (minuteExercice !== 'stop' && nbLegumesConsomer !== 'stop')
  nbJour = (parseInt(joursX) - 1)

  GenererResultats(tableauNBLegumesConsomer, tableauNBMinuteExercices, nbJour)
}

// Génère les résultats et les affiches.
function GenererResultats (tableauNBLegumesConsomer, tableauNBMinuteExercices, nbJour) {
  let defisLegumeResp = Boolean(false)
  let defisExerciceResp = Boolean(false)

  // Nombre de jours.
  document.getElementById('nbJours').innerHTML = nbJour - 1

  // fruits et légumes
  // Moyenne de fruits et légumes par jour :
  let moyenneLegumme = 0
  for (let i = 1; i < tableauNBLegumesConsomer.length - 1; i++) {
    moyenneLegumme = parseInt(moyenneLegumme) + parseInt(tableauNBLegumesConsomer[i])
  }
  moyenneLegumme = (moyenneLegumme / (parseInt(nbJour) - 1))
  moyenneLegumme = Math.round((moyenneLegumme) * 100) / 100

  // Affiche la moyenne de fruits et légumes consomé par jour.
  document.getElementById('moyenneFruitJours').innerHTML = moyenneLegumme

  // Minimum de fruits et légumes par jour : Recommandation :
  let minNBLegumes = 1000
  for (let i = 1; i < tableauNBLegumesConsomer.length - 1; i++) {
    if (tableauNBLegumesConsomer[i] < minNBLegumes) {
      minNBLegumes = parseInt(tableauNBLegumesConsomer[i])
    }
  }

  // Affiche le nombre de fruits et légumes minimal consomé.
  document.getElementById('minimumLegum').innerHTML = minNBLegumes

  // ratio jours respectent le défis légumes et fruits
  let ratioDefLegResp = 0
  for (let i = 1; i < parseInt(nbJour); i++) {
    if (tableauNBLegumesConsomer[i] >= 5) {
      ratioDefLegResp = ratioDefLegResp + 1
    }
  }
  ratioDefLegResp = (ratioDefLegResp / (parseInt(nbJour) - 1)) * 100
  ratioDefLegResp = Math.round((ratioDefLegResp) * 100) / 100

  // Affiche le ratio du nombre de jours respectent le défi fruits et légumes.
  document.getElementById('ratioLegumeDefisRespect').innerHTML = ratioDefLegResp + ' %'

  // vérification si le défis est respecter
  if (ratioDefLegResp === 100) {
    defisLegumeResp = true
  }

  // affichage des jours fruits et légumes
  let listJoursFruitsLegume = ''
  for (let i = 1; i < parseInt(nbJour); i++) {
    listJoursFruitsLegume = (listJoursFruitsLegume + 'Jour ' + (i) + ': ' + tableauNBLegumesConsomer[i] + '<br />')
  }

  // Affiche la liste des jours avec le nombre de fruits et légumes consomer.
  document.getElementById('joursLegumes').innerHTML = listJoursFruitsLegume

  // Exercices
  // Calcule la moyenne de minutes d’exercice par jour.
  let moyenneExercice = 0
  for (let i = 1; i < tableauNBMinuteExercices.length - 1; i++) {
    moyenneExercice = parseInt(moyenneExercice) + parseInt(tableauNBMinuteExercices[i])
  }
  moyenneExercice = (moyenneExercice / (parseInt(nbJour) - 1))
  moyenneExercice = Math.round((moyenneExercice) * 100) / 100

  // Affiche le temps moyen d'exercice par jours.
  document.getElementById('moyenneExercice').innerHTML = moyenneExercice

  // Minimum de minutes d’exercice par jour : Recommandation :
  let minTempExercice = 1000
  for (let i = 1; i < tableauNBMinuteExercices.length; i++) {
    if (tableauNBMinuteExercices[i] < minTempExercice) {
      minTempExercice = parseInt(tableauNBMinuteExercices[i])
    }
  }

  // Affiche le temps minimum d'exercice (en minutes).
  document.getElementById('minimumTempExercice').innerHTML = minTempExercice

  // ratio jours respectent le défi exercice
  let ratioDefExerResp = 0
  for (let i = 1; i < parseInt(nbJour); i++) {
    if (tableauNBMinuteExercices[i] >= 30) {
      ratioDefExerResp = ratioDefExerResp + 1
    }
  }
  ratioDefExerResp = ((ratioDefExerResp / (parseInt(nbJour) - 1)) * 100)
  ratioDefExerResp = Math.round((ratioDefExerResp) * 100) / 100

  // Affiche le ratio du nombre de jours ou le défis d'exercice est respecter.
  document.getElementById('ratioExerciceDefisRespect').innerHTML = ratioDefExerResp + ' %'

  // vérification si le défis est respecter (Exercice). Si oui defisExerciceResp --> true.
  if (ratioDefExerResp === 100) {
    defisExerciceResp = true
  }

  // Crée la variable et récupère ca valeur, pour afficher la liste des jours et le temps d'exercice.
  let listJoursExercices = ''
  for (let i = 1; i < parseInt(nbJour); i++) {
    listJoursExercices = (listJoursExercices + 'Jour ' + (i) + ': ' + tableauNBMinuteExercices[i] + '<br />')
  }

  // Affiche la liste des jours avec le temps d'exercice.
  document.getElementById('joursExercice').innerHTML = listJoursExercices

  // Appelle la function AlertDefisEstRelever, en lui passant defisExerciceResp et defisLegumeResp en paramètre.
  AlertDefisEstRelever(defisExerciceResp, defisLegumeResp)
}

// Affiche la bonne alerte et le bon message en fonction si le défi est réussi ou non.
function AlertDefisEstRelever (defisExerciceResp, defisLegumeResp) {
  if (defisExerciceResp === true && defisLegumeResp === true) {
    // Affiche le message
    document.getElementById('messageAlert').innerHTML = 'Le défis est relever'
    // Affiche le bon style de l'alerte.
    document.getElementById('alertdiv').className = 'alert alert-info textCentre topSpace'
  } else {
    // Affiche le message
    document.getElementById('messageAlert').innerHTML = "Le défis n'est pas  relever"
    // Affiche le bon style de l'alerte.
    document.getElementById('alertdiv').className = 'alert alert-danger textCentre topSpace'
  }
}
