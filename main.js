document.addEventListener('DOMContentLoaded', () => {
    getApiDefault()
    filtro()
})

async function getApiDefault() {
    const result = await fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    const resultJson = await result.json()
    const items = resultJson.items

    const li = document.querySelector(".news")

    criaList(li, items)

}

function filtro() {

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

async function searchFilter(){

    const ul = document.querySelector(".listaNews")
    const listOld = document.querySelector(".news")

    ul.removeChild(listOld)

    const listNew = document.createElement("li")
    listNew.className = "news"

    ul.appendChild(listNew)

    const input = document.querySelector(".search")
    const param = input.value

    const tipo = document.querySelector("#tipo")
    const tipoChoice = (tipo.options[tipo.selectedIndex].text).toLowerCase()
    const qtd = document.querySelector("#qtde")
    const qtdChoice = (qtd.options[qtd.selectedIndex].text)

    if(tipoChoice == 'selecione'){
        return getApiDefault()
    }

    let url = `https://servicodados.ibge.gov.br/api/v3/noticias/?tipo=${tipoChoice}&qtd=${qtdChoice}`

    const dataInicial = document.querySelector("#de")
    const dataFinal = document.querySelector("#ate")
    const de = dataInicial.value
    const ate = dataFinal.value

    if(de != ''){
        url = url + `&de=${de}`
    }
    if(ate != ''){
        url = url + `&ate=${ate}`
    }

    const result = await fetch(url)
    const resultJson = await result.json()
    const items = resultJson.items

    criaList(listNew, items)

}

async function buttonSearch() {

    const ul = document.querySelector(".listaNews")
    const listOld = document.querySelector(".news")

    ul.removeChild(listOld)

    const listNew = document.createElement("li")
    listNew.className = "news"

    ul.appendChild(listNew)

    const input = document.querySelector(".search")
    const param = input.value

    const result = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=50&busca=${param}`)
    const resultJson = await result.json()
    const items = resultJson.items

    criaList(listNew, items)

}

function criaList(list, items){
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
        editora.textContent = `#${element.editorias}`

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
        list.appendChild(divFull)

    })
}