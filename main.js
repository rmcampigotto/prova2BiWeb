document.addEventListener('DOMContentLoaded', () => {
    getApiDefault()
})

async function getApiDefault() {
    const result = await fetch("https://servicodados.ibge.gov.br/api/v3/noticias/?qtd=10")
    const resultJson = await result.json()
    const items = resultJson.items

    items.forEach(element => {

    });

}