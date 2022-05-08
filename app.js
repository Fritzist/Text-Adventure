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
                text: "Du schläfst in einem Wald und machst dir ein Laerfeuer mit deinem Feuerzeug.",
                requiredState: (currentState) => currentState.feuerzeug,
                setState: { feuerzeug: false, schlafplatz: true}
            },
            {
                text: "Du schläfst in einem Wald.",
                nextText: 80
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
    }
]


startGame()