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
        text: "Du bist in einem Verlassenen Haus aufgewacht und siehst vor dir eine seltsame Flasche mit etwas trinkbaren in sich und ein Feuerzeug. Außerdem steht vor dir ein Schild auf dem steht, das du nur eine Sache mitnehmen darfst. Wähle weise",
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
    }
]


startGame()