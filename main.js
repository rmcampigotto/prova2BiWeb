document.addEventListener('DOMContentLoaded', () => {
    getApiDefault()
    botaoDialog()
    history.replaceState(null, "", "http://127.0.0.1:3001/index.html?tipo=noticia&qtd=10")
    controls.createListeners()
})

async function criaList(list, items) {
    items.forEach(element => {
        const divNoticia = document.createElement('div')
        divNoticia.className = "divNoticia"

        const divFull = document.createElement('div')
        divFull.className = "divFull"

        const titulo = document.createElement('p')
        titulo.className = "noticiaTitulo"
        titulo.textContent = element.titulo

        const resumo = document.createElement('p')
        resumo.className = "noticiaResumo"
        resumo.textContent = element.introducao

        const editora = document.createElement('p')
        editora.className = "noticiasEditora"
        const editoras = (element.editorias).split(';')
        editoras.forEach(edit => {
            editora.textContent = editora.textContent + `#${edit} `
        })

        const data = document.createElement('p')
        data.className = "dataPubli"

        let dia = element.data_publicacao.slice(0, 2)
        let mes = element.data_publicacao.slice(3, 5)
        let ano = element.data_publicacao.slice(6, 10)
        let hora = element.data_publicacao.slice(11, 13)
        let minuto = element.data_publicacao.slice(14, 16)
        let segundo = element.data_publicacao.slice(17, 19)

        let publichDate = new Date(ano, mes, dia, hora, minuto, segundo)
        let actualDate = new Date(Date.now())

        let dataMilisegundos = actualDate.getTime() - publichDate.getTime()
        let diferenca = Math.ceil(dataMilisegundos / (1000 * 60 * 60 * 24))

        diferenca = diferenca + 30

        if (diferenca == 0) {
            data.textContent = 'Publicado hoje'
        } else if (diferenca == 1) {
            data.textContent = 'Publicado Ontem'
        } else {
            data.textContent = `Publicado há ${diferenca} dias`
        }

        const imagens = JSON.parse(element.imagens)
        const divImagens = document.createElement('div')
        divImagens.className = "divImagem"
        const imagem = document.createElement('img')
        imagem.src = "https://agenciadenoticias.ibge.gov.br/" + imagens.image_intro

        const botao = document.createElement('button')
        botao.className = "leiaMais"
        const link = document.createElement('a')
        link.href = element.link
        link.textContent = "Leia mais"
        botao.appendChild(link)

        divImagens.appendChild(imagem)
        divNoticia.appendChild(titulo)
        divNoticia.appendChild(resumo)
        divNoticia.appendChild(editora)
        divNoticia.appendChild(data)
        divNoticia.appendChild(botao)
        divFull.appendChild(divImagens)
        divFull.appendChild(divNoticia)
        //list.appendChild(divFull)

        listaPages.data.push(divFull)

    })
    state.totalPages = Math.ceil(items.length / perPage)
    listaPages.update()
}

function addParamUrl(paramName, paramValue) {

    const urlParams = new URLSearchParams(window.location.search)

    if (urlParams.has(paramName)) {
        urlParams.delete(paramName)
    }
    urlParams.append(paramName, paramValue)

    const novaURL = `${location.origin}${location.pathname}?${urlParams.toString()}`

    history.replaceState(null, "", novaURL)

}

async function callApiParams() {

    const urlParams = new URLSearchParams(window.location.search);
    const urlReturn = new URLSearchParams()

    const tipo = urlParams.get("tipo")
    const qtd = urlParams.get("qtd")
    const busca = urlParams.get("busca")
    const de = urlParams.get("de")
    const ate = urlParams.get("ate")

    if (tipo != "" && tipo != null) {
        urlReturn.append("tipo", tipo)
    }
    if (qtd != "" && qtd != null) {
        urlReturn.append("qtd", qtd)
    }
    if (busca != "" && busca != null) {
        urlReturn.append("busca", busca)
    }
    if (de != "" && de != null) {
        urlReturn.append("de", de)
    }
    if (ate != "" && ate != null) {
        urlReturn.append("ate", ate)
    }

    return `https://servicodados.ibge.gov.br/api/v3/noticias?${urlReturn.toString()}`
}

async function getApiDefault() {
    const url = await callApiParams()
    const result = await fetch(url)
    const resultJson = await result.json()
    const items = resultJson.items

    const li = document.querySelector(".news")

    await criaList(li, items)

}

function botaoDialog() {

    let updateButton = document.querySelector(".filtro");
    let closeButton = document.querySelector(".fecharDialog")
    let favDialog = document.querySelector("dialog");

    closeButton.addEventListener("onclick", function () {
        favDialog.close()
    })

    updateButton.addEventListener("click", function () {
        favDialog.showModal();
    });

}

async function searchFilter() {

    const ul = document.querySelector(".listaNews")
    const listOld = document.querySelector(".news")
    ul.removeChild(listOld)

    const listNew = document.createElement("li")
    listNew.className = "news"
    ul.appendChild(listNew)

    const tipo = document.querySelector("#tipo")
    const qtd = document.querySelector("#qtde")
    const dataInicial = document.querySelector("#de")
    const dataFinal = document.querySelector("#ate")
    const input = document.querySelector(".search")

    const tipoChoice = (tipo.options[tipo.selectedIndex].text).toLowerCase()
    const qtdChoice = (qtd.options[qtd.selectedIndex].text)
    const busca = input.value
    const de = dataInicial.value
    const ate = dataFinal.value

    if (tipoChoice != "" && tipoChoice != null && tipoChoice != 'selecione') {
        addParamUrl("tipo", tipoChoice)
    }
    if (qtdChoice != "") {
        addParamUrl("qtd", qtdChoice)
    }
    if (busca != "") {
        addParamUrl("busca", busca)
    }
    if (de != "") {
        addParamUrl("de", de)
    }
    if (ate != "") {
        addParamUrl("ate", ate)
    }

    const url = await callApiParams()

    const result = await fetch(url)
    const resultJson = await result.json()
    const items = resultJson.items

    await criaList(listNew, items)

}

async function buttonSearch() {

    const ul = document.querySelector(".listaNews")
    const listOld = document.querySelector(".news")

    ul.removeChild(listOld)

    const listNew = document.createElement("li")
    listNew.className = "news"

    ul.appendChild(listNew)

    const tipo = document.querySelector("#tipo")
    const qtd = document.querySelector("#qtde")
    const dataInicial = document.querySelector("#de")
    const dataFinal = document.querySelector("#ate")
    const input = document.querySelector(".search")

    const tipoChoice = (tipo.options[tipo.selectedIndex].text).toLowerCase()
    const qtdChoice = (qtd.options[qtd.selectedIndex].text)
    const busca = input.value
    const de = dataInicial.value
    const ate = dataFinal.value

    if (tipoChoice != "" && tipoChoice != null && tipoChoice != 'selecione') {
        addParamUrl("tipo", tipoChoice)
    }
    if (qtdChoice != "") {
        addParamUrl("qtd", qtdChoice)
    }
    if (busca != "") {
        addParamUrl("busca", busca)
    }
    if (de != "") {
        addParamUrl("de", de)
    }
    if (ate != "") {
        addParamUrl("ate", ate)
    }

    const url = await callApiParams()

    const result = await fetch(url)
    const resultJson = await result.json()
    const items = resultJson.items

    await criaList(listNew, items)

}

//PAGINAÇÃO
let perPage = 10
const state = {
    page: 1,
    perPage,
    totalPages: 0
}

const controls = {
    next() {
        state.page++

        if (state.page > state.totalPages) {
            state.page--
        }
        listaPages.update()
    },
    prev() {
        state.page--

        if (state.page < 1) {
            state.page++
        }
        listaPages.update()
    },
    goTo(page) {

        if (page < 1) {
            page = 1
        }

        state.page = page

        if (page > state.totalPages) {
            state.page = state.totalPages
        }
        listaPages.update()
    },
    createListeners() {
        document.querySelector('.first').addEventListener('click', () => {
            this.goTo(1)
        })
        document.querySelector('.last').addEventListener('click', () => {
            this.goTo(state.totalPages)
        })
        document.querySelector('.next').addEventListener('click', () => {
            this.next()
        })
        document.querySelector('.prev').addEventListener('click', () => {
            this.prev()
        })
    }
}

const listaPages = {
    data: new Array(),
    create(item) {
        const list = document.querySelector(".news")

        list.appendChild(item)
    },
    update() {
        const list = document.querySelector(".news")
        list.innerHTML = ""

        let page = state.page - 1
        let start = page * state.perPage
        let end = start + state.perPage

        const paginatedItems = this.data.slice(start, end)

        paginatedItems.forEach( element => {
            listaPages.create(element)
        })
    }
}