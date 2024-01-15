document.addEventListener("DOMContentLoaded", init);
var dataset;
var totalCarrito = 0;
function init() {
    fetch('/src/Json/inicio.json')
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
        div_tarjeta.className = "col-xxl-4 col-md-4 col-12 d-flex align-items-center";
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
    var carrito = $("#carrito");
    if (index >= 0 && index < dataset.length) {
        var element = dataset[index];
        var li = $("<li>").text(element.nombre + " , " + element.precio);
        carrito.append(li);
    }
}
function borrarcarro() {
    var total = $("#total");
    total.nextAll().remove();
    totalCarrito = 0; 
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
function calcularTotalCarrito() {
    var carrito = $("#carrito");
    var total = 0;
    carrito.find("li").each(function () {
        var producto = dataset.find(function (element) {
            return element.nombre === productoNombre;
        });

        if (producto) {
            total += parseFloat(producto.precio);
        }
    });

    return total;
}