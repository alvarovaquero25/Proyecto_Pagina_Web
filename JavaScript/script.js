document.addEventListener("DOMContentLoaded", init);
var dataset;
var totalCarrito = 0;
function init() {
    fetch('/Json/inicio.json')
        .then((response) => response.json())
        .then((data) => {
            dataset = data.productos;
            creartarjeta_inicio(dataset)
        });
}
function creartarjeta_inicio(resultados) {
    var id_tarjeta = document.getElementById("row");
    id_tarjeta.innerHTML = "";
    resultados.forEach(function(element, index) {
        var div_tarjeta = document.createElement("div");
        div_tarjeta.className = "col-xxl-3 col-md-3 col-12 ";
        div_tarjeta.innerHTML = `
            <div class="card" style="width: 18rem;">
                <img src=${element.imagen}>
                <div>
                    <h5 class="card-title">${element.nombre}</h5>
                    <p class="card-text">${element.precio}</p>
                    <p class="card-text">${element.tipo}</p>
                    <p class="card-text">${element.descripción}</p>
                    <a href="#" class="btn btn-primary" onclick="agregarcarrito(${index})">Añadir al carrito</a>
                </div>
            </div>
        `;
        id_tarjeta.appendChild(div_tarjeta);
    });
}
function agregarcarrito(index) {
    if (index >= 0 && index < dataset.length) {
        var element = dataset[index];
        carritoProductos.push({ nombre: element.nombre, precio: element.precio });
        totalCarrito += element.precio;
        actualizarCarrito();
    }
}
function actualizarCarrito() {
    var carrito = $("#carrito");
    carrito.empty();

    carritoProductos.forEach(function (producto) {
        var li = $("<li>").text(producto.nombre + " , " + producto.precio);
        carrito.append(li);
    });

    // Mostrar el total en el carrito
    carrito.append($("<li>").text("Total: $" + totalCarrito.toFixed(2)));
}
function borrarcarro() {
    carritoProductos = [];
    totalCarrito = 0;
    actualizarCarrito();
}

function buscarproducto() {
    var buscador = $('#buscador').val().toLowerCase();
    var resultados = dataset.filter(function (producto) {
        return producto.tipo.toLowerCase().includes(buscador);
    });
    var id_tarjeta = $("#row");
    id_tarjeta.empty();
    creartarjeta_inicio(resultados);
}