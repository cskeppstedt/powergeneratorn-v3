console.info('hello world!')

function fetchProphecy () {
  return fetch('/prophecy').then((result) => {
    return result.json()
  })
}

function renderProphecy (prophecy) {
  const root = document.getElementById('root')
  const fragment = document.createDocumentFragment()

  prophecy.sentences
    .map((sentence) => {
      const paragraph = document.createElement('p')
      paragraph.textContent = sentence
      return paragraph
    })
    .forEach((paragraph) => fragment.appendChild(paragraph))

  root.innerHTML = ''
  root.appendChild(fragment)
}

function newProphecy () {
  return fetchProphecy().then(renderProphecy)
}

document.getElementById('new-prophecy').addEventListener('click', newProphecy)

newProphecy()

