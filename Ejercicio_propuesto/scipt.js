const URL_BASE = 'http://127.0.0.1:5000'

async function ver_juegos(juegos) {
    let games = ""

    juegos.forEach(item => {
        games += `
        <div class="col me-3" style="background-color: #eee; border-radius: 5px; padding: 1rem">
            <img src="${item.thumbnail}" alt="" width="150px">
            <p>ID: ${item.id}</p>
            <p>Nombre: ${item.title}</p>
            <p>Fecha de lazamiento: ${item.release_date}</p>
            <p>Plataforma: ${item.platform}</p>
            <p>Categoria: ${item.genre}</p>
            <p>Publicado por: ${item.publisher}</p>
        </div>
        `
        document.getElementById('games').innerHTML = games
    });
}

async function consulta_juegos() {
    try {
        const promesa = await fetch(`${URL_BASE}/games`)
        const response = await promesa.json()
        ver_juegos(response)
    } catch (error) {
        console.error(error)
    }
}

