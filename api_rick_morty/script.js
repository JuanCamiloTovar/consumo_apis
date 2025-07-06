const url = "https://rickandmortyapi.com/api/character"

function visualizar(personajes){
    let card = "";
    if (personajes.results.length > 1 ){
        personajes.results.forEach(perso => {
            card += `
            <div class="card col m-2 p-3">
                <img src="${perso.image}" alt="" width="200" height="200">
                <ul>
                    <li><strong>Nombre: </strong> ${perso.name}</li>
                    <li><strong>Estado: </strong> ${perso.status}</li>
                    <li><strong>Especie: </strong> ${perso.species}</li>
                    <li><strong>Genero: </strong> ${perso.gender}</li>
                </ul>
            </div>
            `;
        });
    }else{
        const perso = personajes.results
        const container_prin = document.getElementById('cards-container');
        container_prin.remove();
        const conta = document.getElementById('container');
        const nue_eleme = document.createElement('div');
        nue_eleme.classList.add('row','cards-container','p-3');
        conta.appendChild(nue_eleme)
        card += `
            <div class="card col m-2 p-3">
                <img src="${perso.image}" alt="" width="200" height="200">
                <ul>
                    <li><strong>Nombre: </strong> ${perso.name}</li>
                    <li><strong>Estado: </strong> ${perso.status}</li>
                    <li><strong>Especie: </strong> ${perso.species}</li>
                    <li><strong>Genero: </strong> ${perso.gender}</li>
                </ul>
            </div>
            `
        }
    document.querySelector('.cards-container').innerHTML = card;
}

async function consulta(){
    try{
        let perso = document.getElementById('personaje').value;
        function convertir_primera_let(frase) {
            return frase.replace(/\b\w/g, function(l){ return l.toUpperCase() });
        }

        let character = convertir_primera_let(perso)

        const response = await fetch(url);
        const personajes = await response.json();
        const personajeEncontrado = personajes.results.find(item => item.name == character);
        if (personajeEncontrado) {
            visualizar({ "results": personajeEncontrado});
        } else {
            console.log("Personaje no encontrado");
        }

    } catch (error){
        console.error(error)
    }
}

// FUNCION PARA QUE CARGUEN TODOS LOS PERSONAJES DE RICK AND MORTY

async function personajes(){
    try{
        const response = await fetch(url);
        const personajes = await response.json()
        console.log(personajes)
        visualizar(personajes);
    } catch{
        console.error(error)
    }
}


// function personajes(){
//     fetch(url).then(response => {
//         console.log("termina con estado " + response.status)
//         return response.json()
//     }).then(personajes => {
//         console.log(personajes)
//     }).catch(err => {
//         console.error(err)
//     })
// }

