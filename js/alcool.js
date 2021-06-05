'use strict'
document.addEventListener('DOMContentLoaded', function (event) {
  document.getElementById('soumettre').addEventListener('click', RecupererDonner)
})

// Récupérer tout les donnés.
function RecupererDonner () {
  let dateNaissance = new Date()
  const tableauNBConsommations = []

  const nom = document.getElementById('nom').value
  const prenom = document.getElementById('prenom').value
  dateNaissance = document.getElementById('datenaissance').value
  const nbJoursAnalyser = document.getElementById('nbJoursAnalyser').value
  const sexe = document.getElementById('sexe').value
  const situationParticuliere = document.getElementById('situationparticuliere').value

  NbConsommationsAlcool(nbJoursAnalyser, tableauNBConsommations)
  GenererDonner(nom, prenom, dateNaissance, nbJoursAnalyser, sexe, situationParticuliere, tableauNBConsommations)
}

// Récupère le nombre de consommation d'alcool par jour.
function NbConsommationsAlcool (nbJour, tableauNBConsommations) {
  for (let i = 0; i < nbJour; i++) {
    tableauNBConsommations[i] = prompt('combien de de consommations avez vous pris au jour?' + (i + 1))
  }
}

// Génere tous les données.
function GenererDonner (nom, prenom, dateNaissance, nbJoursAnalyser, sexe, situationParticuliere, tableauNBConsommations) {
  if (nom === '') {
    nom = 'nom'
  }
  if (prenom === '') {
    prenom = 'Prénom'
  }

  document.getElementById('genereNom').innerHTML = nom
  document.getElementById('generePrenom').innerHTML = prenom
  document.getElementById('genereAge').innerHTML = Age(dateNaissance)
  document.getElementById('genereJours').innerHTML = nbJoursAnalyser
  document.getElementById('genereSemaine').innerHTML = NbSemaine(nbJoursAnalyser)
  document.getElementById('genereMoyenne').innerHTML = Moyenne(tableauNBConsommations, nbJoursAnalyser)
  document.getElementById('nbConsomSemain').innerHTML = NbConsommationSemaine(nbJoursAnalyser, tableauNBConsommations)
  document.getElementById('genereRecommandation1').innerHTML = RecommandationSemaine(sexe)
  document.getElementById('genereMax').innerHTML = RecommandationMaxJour(sexe, situationParticuliere)
  document.getElementById('genereRecommandation2').innerHTML = RecommandationJourner(sexe)
  document.getElementById('genereRatioExcedent').innerHTML = RatioExcedent(tableauNBConsommations, nbJoursAnalyser, sexe)
  document.getElementById('genereRatioSansAlcool').innerHTML = RatioSansAlcool(tableauNBConsommations, nbJoursAnalyser)
  document.getElementById('genereMessage').innerHTML = Message(tableauNBConsommations, nbJoursAnalyser, sexe)
}

// Trouve la recomandation maximal de consomation d'alcool par jour en fonction du sexe.
function RecommandationMaxJour (sexe, situationParticuliere) {
  if (sexe === 'Homme') {
    return 4
  } else if (sexe === 'Femme') {
    return 3
  } else if (sexe === 'Autre') {
    return 0
  } else if (situationParticuliere === true) {
    return 0
  }
}

// Trouve la recomandation maximal de consomation d'alcool par semaine en fonction du sexe.
function RecommandationSemaine (sexe) {
  if (sexe === 'Homme') {
    return 15
  } else if (sexe === 'Femme') {
    return 10
  } else if (sexe === 'Autre') {
    return 0
  }
}

// Trouve la recomandation de consomation d'alcool par jour en fonction du sexe.
function RecommandationJourner (sexe) {
  if (sexe === 'Homme') {
    return 3
  } else if (sexe === 'Femme') {
    return 2
  } else if (sexe === 'Autre') {
    return 0
  }
}

// Ratio des jours qui exedent la consomation recommander.
function RatioExcedent (tableauNBConsommations, nbJoursAnalyser, sexe) {
  let nbJoursExcedent = 0
  if (sexe === 'Autre') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      if (tableauNBConsommations[i] === '0') {
        nbJoursExcedent = parseInt(nbJoursExcedent + 1)
      }
    }
  } else if (sexe === 'Homme') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      if (tableauNBConsommations[i] === '4') {
        nbJoursExcedent = parseInt(nbJoursExcedent + 1)
      }
    }
  } else if (sexe === 'Femme') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      if (tableauNBConsommations[i] === '3') {
        nbJoursExcedent = parseInt(nbJoursExcedent + 1)
      }
    }
  }
  return (Math.round((((nbJoursExcedent / nbJoursAnalyser) * 100)) * 100) / 100)
}

// Ratio des jours sans alcool.
function RatioSansAlcool (tableauNBConsommations, nbJoursAnalyser) {
  let nbJoursSansAlcool = 0
  for (let i = 0; i < nbJoursAnalyser; i++) {
    if (tableauNBConsommations[i] === '0') {
      nbJoursSansAlcool = parseInt(nbJoursSansAlcool) + 1
    }
  }
  return ((Math.round((nbJoursSansAlcool / nbJoursAnalyser) * 100) * 100) / 100)
}

// Nombres de semaines complète.
function NbSemaine (nbJoursAnalyser) {
  return Math.floor(nbJoursAnalyser / 7)
}

// Message de si ont respecte les recomendation ou non.
function Message (tableauNBConsommations, nbJoursAnalyser, sexe) {
  let respRecoSemaineConso = Boolean(false)
  let respRecoJoursConso = Boolean(false)

  let totalConsoSem = 0
  let maxConsoJour = 0
  if (sexe === 'Homme') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      totalConsoSem = parseInt(tableauNBConsommations[i]) + parseInt(totalConsoSem)
      if (parseInt(maxConsoJour) <= parseInt(tableauNBConsommations[i])) {
        maxConsoJour = parseInt(tableauNBConsommations[i])
      }
    }
    // vérification si la consomation par semaine respect la recomandation
    if (parseInt(totalConsoSem) <= 15) {
      respRecoSemaineConso = true
    }
    // vérification si la consomation par jour respect la recomandation
    if (parseInt(maxConsoJour) <= 3) {
      respRecoJoursConso = true
    }
  } else if (sexe === 'Femme') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      totalConsoSem = parseInt(tableauNBConsommations[i]) + parseInt(totalConsoSem)
      if (parseInt(maxConsoJour) <= parseInt(tableauNBConsommations[i])) {
        maxConsoJour = parseInt(tableauNBConsommations[i])
      }
    }
    // vérification si la consomation par semaine respect la recomandation
    if (parseInt(totalConsoSem) <= 10) {
      respRecoSemaineConso = true
    }
    // vérification si la consomation par jour respect la recomandation
    if (parseInt(maxConsoJour) <= 2) {
      respRecoJoursConso = true
    }
  } else if (sexe === 'Autre') {
    for (let i = 0; i < nbJoursAnalyser; i++) {
      totalConsoSem = parseInt(tableauNBConsommations[i]) + parseInt(totalConsoSem)
      if (parseInt(maxConsoJour) <= parseInt(tableauNBConsommations[i])) {
        maxConsoJour = parseInt(tableauNBConsommations[i])
      }
    }
    // vérification si la consomation par semaine respect la recomandation
    if (parseInt(totalConsoSem) <= 0) {
      respRecoSemaineConso = true
    }
    // vérification si la consomation par jour respect la recomandation
    if (parseInt(maxConsoJour) <= 0) {
      respRecoJoursConso = true
    }
  }

  if (respRecoSemaineConso === true && respRecoJoursConso === true) {
    return 'Vous respectez les recommandations'
  } else {
    return 'Vous ne respectez pas les recommandations'
  }
}

// calcule l'âge de l'utilisateur.
function Age (dateNaissance) {
  const date = new Date()
  const annee = date.getFullYear()
  const anneeNaissance = dateNaissance.substring(0, 4)
  let age = (annee - anneeNaissance)

  if (age === annee) {
    age = 0
  }

  return age
}

// Calcule la moyenne de consomation.
function Moyenne (tableauNBConsommations, nbJoursAnalyser) {
  let moyenne = 0
  for (let i = 0; i < nbJoursAnalyser; i++) {
    moyenne = parseInt(moyenne) + parseInt(tableauNBConsommations[i])
  }
  moyenne = (moyenne / nbJoursAnalyser)
  moyenne = Math.round((moyenne) * 100) / 100
  return moyenne
}

// Calcule le nombre de consomation par semaine.
function NbConsommationSemaine (nbJoursAnalyser, tableauNBConsommations) {
  let nbVerres = 0
  for (let i = 0; i < nbJoursAnalyser; i++) {
    nbVerres = nbVerres + parseInt(tableauNBConsommations[i])
  }

  nbVerres = (nbVerres - (nbVerres / nbJoursAnalyser))
  return nbVerres
}
