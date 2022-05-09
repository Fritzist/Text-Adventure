const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}


const textNodes = [
    {
        id: 1,
        text: "Du bist in einem Verlassenen Haus aufgewacht und siehst vor dir eine seltsame Flasche mit etwas trinkbaren in sich.",
        options: [
            {
                text: "Nimm die seltsame Flasche mit",
                setState: { seltsameFlasche: true },
                nextText: 2
            },
            {
                text: "Lass die Flasche liegen",
                nextText: 2
            }
        ]
    },
    {
        id: 2,
        text: "Nachdem du dich entschieden hast, bist du aus dem Haus gelaufen und nach langer Zeit hast du ein Dorf mit vielen Händler getroffen. Du gehst zu den Leuten hin und guckst sich deren Sachen an. Einer fragt dich ob du eine seltsame Flasche hast und bietet dir etwas Wertvolles an. Ein anderer fragt auch nach der seltsamen Flasche und bietet dir ein Feuerzeug an.",
        options: [
            {
                text: "Tausch gegen einen WertvollenGegenstand",
                requiredState: (currentState) => currentState.seltsameFlasche,
                setState: { seltsameFlasche: false, wertvollerGegenstand: true },
                nextText: 3
            },
            {
                text: "Tausch gegen das Feuerzeug",
                requiredState: (currentState) => currentState.seltsameFlasche,
                setState: { seltsameFlasche: false, feuerzeug: true },
                nextText: 3
            },
            {
                text: "Ignoriere die Händler",
                nextText: 3
            }
        ]
    },
    {
        id: 3,
        text: "Du bist weiter gelaufen und wirst müde, aber hast keine Schlafmöglichkeit.",
        options: [
            {
                text: "Du gehst zurück ins Dorf un tauschst deinen Wertvollengegenstand für ein Schlafplatz.",
                requiredState: (currentState) => currentState.wertvollerGegenstand,
                setState: { wertvollerGegenstand: false, schlafplatz: true},
                nextText: 4
            },
            {
                text: "Du schläfst in einem Wald und machst dir ein Lagerfeuer mit deinem Feuerzeug.",
                requiredState: (currentState) => currentState.feuerzeug,
                setState: { feuerzeug: false, schlafplatz: true},
                nextText: 4,
            },
            {
                text: "Du schläfst in einem Wald.",
                nextText: 80
            }
        ]    
    },
    {
        id: 4,
        text: "Du hast gut geschlafen und willst weiter gehen, aber du bekommst Hunger und hast nichts mehr dabei",
        options:[
            {
                text: "Du gehst in dem Dorf betteln",
                requiredState: (currentState) => currentState.schlafplatz,
                setState: { betteln: true, schlafplatz: false},
                nextText: 5
            },
            {
                text: "Du läufst weiter bis du etwas findest",
                requiredState: (currentState) => currentState.schlafplatz,
                setState: { hunger: true, schlafplatz: false},
                nextText: 6,
            }
        ]
    },
    {
        id: 5,
        text: "Du bist wieder in dem Dorf und setzt dich an die Straße um zu betteln",
        options: [
            {
                text: "Leute nach Geld fragen",
                requiredState: (currentState) => currentState.betteln,
                setState: { fragen: true},
                nextText: 7,
            },
            {
                text: "Warten/Musik machen um Geld zu bekommen",
                requiredState: (currentState) => currentState.betteln,
                setState: { musik: true},
                nextText: 8,
            }
        ]
    },
    {
        id: 6,
        text: "Du findest ein Haus und siehst die Besitzer das Haus verlassen",
        options: [
            {
                text: "Du gehst in das Haus und klaust wertvollen Sachen und Sachen die du brauchst",
                requiredState: (currentState) => currentState.hunger,
                setState: { klauen: true},
                nextText: 9,
            },
            {
                text: "Du wartest bis die Besitzer wieder zurück kommen und fragst sie nach Geld und Essen",
                requiredState: (currentState) => currentState.hunger,
                setState: { besitzerW: true, hunger: false},
                nextText: 10,
            }
        ]
    },
    {
        id: 7,
        text: "Du hast nicht viel geld bekommen.",
        options: [
            {
                text: "Du bist müde und gehst schlafen an der Straße",
                requiredState: (currentState) => currentState.fragen,
                setState: { müde: true},
                nextText: 81,
            },
            {
                text: "Du gehst in einen Wald",
                requiredState: (currentState) => currentState.fragen,
                setState: { wald: true},
                nextText: 11,
            }                
        ]
    },
    {
        id: 8,
        text: "Du hast viel geld verdient",
        options: [
            {
                text: "Du gehst essen",
                requiredState: (currentState) => currentState.musik,
                setState: { musik: false},
                nextText: 83,
            }
        ]
    },
    {
        id: 9,
        text: "Du hast alles geklaut was du brauchst, aber die Besitzer sehen dich",
        options: [
            {
                text: "Wegrennen",
                requiredState: (currentState) => currentState.klauen,
                setState: { wegrennen: true, klauen: false},
                nextText: 12,
            },
            {
                text: "Stehen bleiben und den Besitzern alles erklären",
                requiredState: (currentState) => currentState.klauen,
                setState: { stehenBleiben: true, klauen: false},
                nextText: 13,
            }
        ]
    },
    {
        id: 10,
        text: "Die Besitzer geben dir alles und behandeln dich wie ein Kind und sie lassen dich bei ihnen leben",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 11,
        text: "Du bist im Wald angekommen, aber hast Hunger und bist Müde",
        options: [
            {
                text: "Beeren suchen",
                requiredState: (currentState) => currentState.wald,
                setState: { wald: false},
                nextText: 82,
            },
            {
                text: "Im Wald schlafen",
                requiredState: (currentState) => currentState.wald,
                setState: { wald: false},
                nextText: 80,
            }
        ]
    },
    {
        id: 12,
        text: "Du hast einen Schatz gefunden im Haus gefunen der sehr Wertvoll ist und verkaufst ihn, nun bist du Reich und hast ein schönes leben",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 13,
        text: "Du erzählst den besitzern alles, aber sie rufen die Polizei und lassen dich verhaften",
        options: [
            {
                text: "Wegrennen",
                nextText: 12,
            },
            {
                text: "Stehen bleiben",
                nextText: 14,
            }
        ]
    },
    {
        id: 14,
        text: "Du wurdest verhaftet und hast Lebenslängliche Haft bekommen.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 80,
        text: "Du wurdest in der Nacht von Wilden tieren angegriffen und aufgegessen.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 81,
        text: "Mitten in der Nacht wirst du von einer Gruppe Verbrechern angegriffen. Sie klauen dir alles und erstechen dich.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 82,
        text: "Du hast leckere Beeren gefunden und sie gegessen. Kurz dannach ging es dir nicht gut und merkst, das die Beeren vergiftet waren. Kurz darauf stirbst du.",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
    {
        id: 83,
        text: "Du hast in einem Restaurante gegessen und warst der 1000000 Kunde, dadurch hast du ein Lotto ticket bekommen, mit dem du 69Millionen € gewinnst",
        options: [
            {
                text: "Restart",
                nextText: -1,
            }
        ]
    },
]


startGame()