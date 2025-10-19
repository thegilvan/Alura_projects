
const html = document.querySelector("html")
const focoBtn = document.querySelector(".app__card-button--foco")
const curtoBtn = document.querySelector(".app__card-button--curto")
const longoBtn = document.querySelector(".app__card-button--longo")
const imgMain = document.querySelector(".app__image")
const titulo = document.querySelector(".app__title")
const botoes = document.querySelectorAll(".app__card-button")
const inputFocoMusica = document.querySelector("#alternar-musica")
const startPauseBt = document.querySelector("#start-pause")
const startPauseBtSpan = document.querySelector("#start-pause span")
const startPauseBtImg = document.querySelector("#start-pause img")
const timerContainer = document.querySelector("#timer")



let tempoSegundos = 1500
let intervaloID = null

const playBeep = new Audio("sons/play.wav")
const pauseBeep = new Audio("sons/pause.mp3")
const endBeep = new Audio("sons/beep.mp3")
const musica = new Audio("sons/luna-rise-part-one.mp3")
musica.loop = true

inputFocoMusica.addEventListener("change", () => {
    if (musica.paused) {
        musica.play()
    } else {
        musica.pause()
    }
})

focoBtn.addEventListener("click", () => {
    tempoSegundos = 1500
    alterarContexto("foco")
    focoBtn.classList.add("active")
    showTimer()
})
curtoBtn.addEventListener("click", () => {
    tempoSegundos = 300
    alterarContexto("descanso-curto")
    curtoBtn.classList.add("active")
    showTimer()
})
longoBtn.addEventListener("click", () => {
    tempoSegundos = 900
    alterarContexto("descanso-longo")
    longoBtn.classList.add("active")
    showTimer()
})


function alterarContexto(contexto) {
    botoes.forEach(eachBtn => {
        eachBtn.classList.remove("active")
    })
    imgMain.setAttribute("src", `/imagens/${contexto}.png`)
    html.setAttribute("data-contexto", contexto)
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
            break;
        default:
            break;
    }
}


const contagemRegressiva = () => {
    if (tempoSegundos <= 0) {
        endBeep.play()
        zerar()
        alert("Tempo finalizado")
        return
    }
    tempoSegundos -= 1
    showTimer()
}

startPauseBt.addEventListener("click", startPause)

function startPause() {
    if(intervaloID){
        pauseBeep.play()
        zerar()
        return
    }
    playBeep.play()
    intervaloID = setInterval(contagemRegressiva,1000)
    startPauseBtSpan.textContent = "Pausar"
    startPauseBtImg.src = "imagens/pause.png"
}


function zerar() {
    clearInterval(intervaloID)
    intervaloID=null
    startPauseBtSpan.textContent = "Começar"
    startPauseBtImg.src = "imagens/play_arrow.png"
    
}

function showTimer() {
    const tempo = new Date(tempoSegundos*1000)
    const tempoFormatado = tempo.toLocaleTimeString("pt-BR",{minute: "2-digit",second:"2-digit"})
    timerContainer.innerHTML = `${tempoFormatado}`
}
showTimer()