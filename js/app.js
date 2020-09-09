// Variables

const carrito = document.querySelector('#carrito')
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito')
const listaCursos = document.querySelector('#lista-cursos')
let articulosCarrito = []


// Agregar eventos
cargarEventListeners()
function cargarEventListeners(){
    // Agregar curso al dar click en 'Agregar curso'
    listaCursos.addEventListener('click', agregarCurso)

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso)

    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [] // reseteamos el arreglo del carrito
        limpiarHTML()
    })
}

// Funciones
function agregarCurso(event){
    event.preventDefault()
    if(event.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = event.target.parentElement.parentElement
        leerDatosDelCurso(cursoSeleccionado)
    }
}

// Elimina un curso del carrito
function eliminarCurso(event) {
    console.log(event.target.classList)
    if(event.target.classList.contains('borrar-curso')){
        // console.log(event.tar.getAttribute('data-id'))
        const cursoId = event.target.getAttribute('data-id')

        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId)

        carritoHTML()
    }
}


// Lee el contenido del HTML al que le dimos click y extraer la info
function leerDatosDelCurso(curso) {
    const informacionDelCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }
    console.log(informacionDelCurso)
    //Revisa si un elemento ya existe en el carito
    const existe = articulosCarrito.some(curso => curso.id === informacionDelCurso.id)
    console.log(existe)

    if(existe){
        // Actualizamos la cantidad
        const cursos = articulosCarrito.map(curso => {
            if(curso.id === informacionDelCurso.id){
                curso.cantidad++
                return curso //retorna el objeto con la cantidad actualizada
            } else {
                return curso //Retorna los objetos que no son los duplicados
            }
        })
        articulosCarrito = [...cursos]
    } else {
        //Agrega elementos al arreglo de carrito
        articulosCarrito = [...articulosCarrito, informacionDelCurso]
        console.log('xd0')
    }

    // Agrega elementos al arreglo de carrito
    console.log(articulosCarrito)
    carritoHTML()
}


// Muestra el carrito de compras en el HTML
function carritoHTML(){
    // Limpiar el HTML
    limpiarHTML()

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach(curso => {
        const {imagen, titulo, cantidad, precio, id} = curso
        const row = document.createElement('tr')
        row.innerHTML = `
        <td>
            <img src="${imagen}" width="100">
        </td>
        <td>
            ${titulo}
        </td>
        <td>
            ${precio}
        </td>
        <td>
            ${cantidad}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        `;

        // Agrega el HTML del carrito en el tbody
        contenedorCarrito.appendChild(row)
    })
}

// Elimina los cursos del table body
function limpiarHTML() {
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}