document.addEventListener('DOMContentLoaded', () => {
    getApiDefault()
    filtro()
})

async function getApiDefault() {
    const result = await fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    const resultJson = await result.json()
    const items = resultJson.items

    const li = document.querySelector(".news")

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
        li.appendChild(divFull)

    });

}

function filtro() {

    let updateButton = document.querySelector(".filtro");
    let favDialog = document.querySelector("dialog");

    updateButton.addEventListener("click", function () {
        favDialog.showModal();
    });

}

async function buttonSearch() {

    const list = document.querySelector(".news")
    list.remove

    const input = document.querySelector(".search")
    const param = input.value

    const result = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=5&busca=${param}`)
    const resultJson = await result.json()
    const items = resultJson.items

    const li = document.querySelector(".news")

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
        li.appendChild(divFull)

    })

}

