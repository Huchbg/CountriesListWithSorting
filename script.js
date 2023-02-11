const downArrow = '<i class="fa-solid fa-arrow-down-long"></i>'
const upArrow = '<i class="fa-solid fa-arrow-up-long"></i>'

const [PopUp, PopDown, NameUp, NameDown, CapitalUp, CapitalDown] = Sort()
const conectingObjectCards = {}
const connectingObjectStats = {}

const inputT = document.querySelector(".inputText")
const btnName = document.querySelector(".btnName")
const btnCap = document.querySelector(".btnCapital")
const btnPop = document.querySelector(".btnPopulation")
const feed = document.querySelector(".feed")
const cardsContainer = document.querySelector(".cardsContainer")
const statisticsContainer = document.querySelector(".StatisticsDiv")

DisplayNameDown()

DisplayStat()

btnName.addEventListener("click", () => {
  onbtnClick("Name")
})
btnCap.addEventListener("click", () => {
  onbtnClick("Capital")
})
btnPop.addEventListener("click", () => {
  onbtnClick("Population")
})

inputT.addEventListener("input", (e) => {
  onInput(e.target.value)
})

function onInput(a) {
  let numOf = 0
  for (const coutry of countries_data) {
    let toContinue = false
    if (coutry.name.toLocaleLowerCase().includes(a.toLocaleLowerCase())) {
      toContinue = true
    }

    if (toContinue == false) {
      if (coutry.capital != undefined) {
        if (
          coutry.capital.toLocaleLowerCase().includes(a.toLocaleLowerCase())
        ) {
          toContinue = true
        }
      }
    }

    if (toContinue == false) {
      for (const lang of coutry.languages) {
        if (lang.toLocaleLowerCase().includes(a.toLocaleLowerCase())) {
          toContinue = true
          break
        }
      }
    }
    if (toContinue) {
      numOf++
    }
    conectingObjectCards[coutry.name.toLocaleLowerCase()].classList.toggle(
      "hide",
      !toContinue
    )

    connectingObjectStats[coutry.name.toLocaleLowerCase()].classList.toggle(
      "hide",
      !toContinue
    )
  }
  feed.textContent = numOf + "  coutries satisfied the search criteria"
}
function onbtnClick(name) {
  const spanName = document.querySelector(".arrowName")
  const spanCapital = document.querySelector(".arrowCap")
  const spanPopulation = document.querySelector(".arrowPop")
  if (name == "Name") {
    spanPopulation.innerHTML = ""
    spanCapital.innerHTML = ""
    btnPop.dataset.active = "no"
    btnCap.dataset.active = "no"

    inputT.dataset.search = "name"
    if (btnName.dataset.active == "no") {
      btnName.dataset.active = "down"
      DisplayNameDown()
      spanName.innerHTML = downArrow
    } else if (btnName.dataset.active == "down") {
      btnName.dataset.active = "up"
      DisplayNameUp()
      spanName.innerHTML = upArrow
    } else if (btnName.dataset.active == "up") {
      btnName.dataset.active = "down"
      DisplayNameDown()
      spanName.innerHTML = downArrow
    }
  }
  if (name == "Capital") {
    inputT.dataset.search = "capital"
    spanName.innerHTML = ""
    spanPopulation.innerHTML = ""
    btnPop.dataset.active = "no"
    btnName.dataset.active = "no"

    if (btnCap.dataset.active == "no") {
      btnCap.dataset.active = "down"
      DisplayCapDow()
      spanCapital.innerHTML = downArrow
    } else if (btnCap.dataset.active == "down") {
      btnCap.dataset.active = "up"
      DisplayCapUp()
      spanCapital.innerHTML = upArrow
    } else if (btnCap.dataset.active == "up") {
      btnCap.dataset.active = "down"
      DisplayCapDow()
      spanCapital.innerHTML = downArrow
    }
  }
  if (name == "Population") {
    inputT.dataset.search = "population"
    spanName.innerHTML = ""
    spanCapital.innerHTML = ""
    btnCap.dataset.active = "no"
    btnName.dataset.active = "no"

    if (btnPop.dataset.active == "no") {
      btnPop.dataset.active = "down"
      spanPopulation.innerHTML = downArrow
      DisplayPopDown()
    } else if (btnPop.dataset.active == "down") {
      btnPop.dataset.active = "up"
      spanPopulation.innerHTML = upArrow
      DisplayPopUp()
    } else if (btnPop.dataset.active == "up") {
      btnPop.dataset.active = "down"
      spanPopulation.innerHTML = downArrow
      DisplayPopDown()
    }
  }
  onInput(inputT.value)
}

function Sort() {
  const PopUp = countries_data
    .slice()
    .sort((a, b) => b.population - a.population)
  const PopDown = countries_data
    .slice()
    .sort((a, b) => a.population - b.population)
  const NameUp = countries_data.slice().sort((a, b) => {
    if (a.name > b.name) {
      return -1
    }
    if (a.name < b.name) {
      return 1
    }
    return 0
  })
  const NameDown = countries_data.slice().sort((a, b) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
    return 0
  })
  const CapitalUp = countries_data.slice().sort((a, b) => {
    if (a.capital > b.capital) {
      return -1
    }
    if (a.capital < b.capital) {
      return 1
    }
    return 0
  })
  const CapitalDown = countries_data.slice().sort((a, b) => {
    if (a.capital > b.capital) {
      return 1
    }
    if (a.capital < b.capital) {
      return -1
    }
    return 0
  })

  return [PopUp, PopDown, NameUp, NameDown, CapitalUp, CapitalDown]
}
//---

function DisplayStat() {
  const totalPopulation = countries_data.reduce((sum, a) => {
    return sum + a.population
  }, 0)
  const Firstrow = document
    .querySelector("[data-temlate-rowPopulation]")
    .content.cloneNode(true).children[0]
  const firstName = Firstrow.querySelector(".NameOFcO")
  const Firstbar = Firstrow.querySelector(".Bar")
  const totalpop = Firstrow.querySelector(".PopulationC")
  firstName.textContent = "World"
  Firstbar.style.width = "100%"
  totalpop.textContent = totalPopulation.toLocaleString("en-US")
  statisticsContainer.appendChild(Firstrow)

  for (let i = 0; i < PopUp.length; i++) {
    const namL = PopUp[i].name.toLocaleLowerCase()

    const row = document
      .querySelector("[data-temlate-rowPopulation]")
      .content.cloneNode(true).children[0]
    const Name = row.querySelector(".NameOFcO")
    const bar = row.querySelector(".Bar")
    const pop = row.querySelector(".PopulationC")
    Name.textContent = PopUp[i].name
    pop.textContent = PopUp[i].population.toLocaleString("en-US")
    bar.style.width = `${(PopUp[i].population / totalPopulation) * 100}%`
    connectingObjectStats[namL] = row
    statisticsContainer.appendChild(row)
  }
}

//--------
function DisplayNameDown() {
  cardsContainer.innerHTML = ""
  for (const coutry of NameDown) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)

    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
function DisplayNameUp() {
  cardsContainer.innerHTML = ""
  console.log(NameDown)
  for (const coutry of NameUp) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)
    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
function DisplayPopDown() {
  cardsContainer.innerHTML = ""
  for (const coutry of PopDown) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)
    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
function DisplayPopUp() {
  cardsContainer.innerHTML = ""
  for (const coutry of PopUp) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)
    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
function DisplayCapDow() {
  cardsContainer.innerHTML = ""
  for (const coutry of CapitalDown) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)
    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
function DisplayCapUp() {
  cardsContainer.innerHTML = ""
  for (const coutry of CapitalUp) {
    const [card, name, image, capital, langlages, population] =
      createCoutryCard()
    name.textContent = coutry.name
    image.src = coutry.flag
    capital.textContent = "Capital: " + coutry.capital

    langlages.textContent = "Langauges: " + coutry.languages.join(",")
    population.textContent =
      "Population: " + coutry.population.toLocaleString("en-US")
    cardsContainer.appendChild(card)
    conectingObjectCards[coutry.name.toLocaleLowerCase()] = card
  }
}
//---------

function createCoutryCard() {
  const card = document
    .querySelector("[data-temlate-cartCoutry]")
    .content.cloneNode(true).children[0]

  const name = card.querySelector(".CoutryName")
  const image = card.querySelector(".image")
  const capital = card.querySelector(".CoutryCapital")
  const langlages = card.querySelector(".coutryLans")
  const population = card.querySelector(".CoutryPopulation")
  return [card, name, image, capital, langlages, population]
}
