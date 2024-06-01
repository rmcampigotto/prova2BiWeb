document.addEventListener('DOMContentLoaded', () => {
    getApiDefault()
})

async function getApiDefault() {
    const result = await fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    const resultJson = await result.json()
    const items = resultJson.items

    const li = document.querySelector(".news")

    items.forEach(element => {
        const div = document.createElement('div')
        div.className = "divNoticia"

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

        let publichDate = new Date(ano, mes, dia)
        let actualDate = new Date(Date.now())

        let dataMilisegundos = Math.abs(actualDate.getTime() - publichDate.getTime())
        let diferenca = Math.ceil(dataMilisegundos / (1000 * 60 * 60 * 24))

        if(diferenca == 0){
            data.textContent = 'Publicado hoje'
        } else if (diferenca == 1){
            data.textContent = 'Publicado Ontem'
        } else {
            data.textContent = `Publicado há ${diferenca} dias`
        }

        // FALTA COLOCAR A IMAGEM, MAS TEM QUE VERIFICAR COM O SATIN, NÃO ENTENDI COM USA O VALOR QUE RETORNA DA API

        const botao = document.createElement('button')
        botao.className = "leiaMais"
        const link = document.createElement('a')
        link.href = element.link
        link.textContent = "Leia mais"
        botao.appendChild(link)

        div.appendChild(titulo)
        div.appendChild(resumo)
        div.appendChild(editora)
        div.appendChild(data)
        div.appendChild(botao)
        li.appendChild(div)

    });

}

// const botao = document.querySelector(".pesquisar")

// botao.addEventListener("click", async () => {

//     const input = document.querySelector(".search")
//     const param = input.textContent

//     console.log(param)

//     const result = await fetch(`https://servicodados.ibge.gov.br/api/v3/noticias/?busca=${param}`)
//     const resultJson = await result.json()
//     const items = resultJson.items

//     const li = document.querySelector(".news")

//     items.forEach(element => {
//         const div = document.createElement('div')
//         div.className = "divNoticia"

//         const titulo = document.createElement('p')
//         titulo.className = "noticiaTitulo"
//         titulo.textContent = element.titulo

//         const resumo = document.createElement('p')
//         resumo.className = "noticiaResumo"
//         resumo.textContent = element.introducao

//         const editora = document.createElement('p')
//         editora.className = "noticiasEditora"
//         editora.textContent = `#${element.editorias}`

//         const data = document.createElement('p')
//         data.className = "dataPubli"
//         let dia = element.data_publicacao.slice(0, 2)
//         let mes = element.data_publicacao.slice(3, 5)
//         let ano = element.data_publicacao.slice(6, 10)

//         let publichDate = new Date(ano, mes, dia)
//         let actualDate = new Date(Date.now())

//         let dataMilisegundos = Math.abs(actualDate.getTime() - publichDate.getTime())
//         let diferenca = Math.ceil(dataMilisegundos / (1000 * 60 * 60 * 24))

//         if(diferenca == 0){
//             data.textContent = 'Publicado hoje'
//         } else if (diferenca == 1){
//             data.textContent = 'Publicado Ontem'
//         } else {
//             data.textContent = `Publicado há ${diferenca} dias`
//         }

//         // FALTA COLOCAR A IMAGEM, MAS TEM QUE VERIFICAR COM O SATIN, NÃO ENTENDI COM USA O VALOR QUE RETORNA DA API

//         const botao = document.createElement('button')
//         botao.className = "leiaMais"
//         const link = document.createElement('a')
//         link.href = element.link
//         link.textContent = "Leia mais"
//         botao.appendChild(link)

//         div.appendChild(titulo)
//         div.appendChild(resumo)
//         div.appendChild(editora)
//         div.appendChild(data)
//         div.appendChild(botao)
//         li.appendChild(div)
//     })
// })