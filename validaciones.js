const formulario = document.getElementById("formPropiedades");
const precioCLP = document.getElementById("precioCLP");
const precioUF = document.getElementById("precioUF");

precioCLP.addEventListener("input", function () {
    let valorCLP = Number(precioCLP.value);
    let valorUF = valorCLP / 39000;
    precioUF.value = valorUF.toFixed(2);

});

formulario.addEventListener("submit", function (e) {

    e.preventDefault();
    let tipo = document.getElementById("tipoPropiedad").value;
    let descripcion = document.getElementById("descripcion").value;
    let banos = document.getElementById("banos").value;
    let dormitorios = document.getElementById("dormitorios").value;
    let areaTerreno = document.getElementById("areaTerreno").value;
    let areaConstruida = document.getElementById("areaConstruida").value;
    let fecha = document.getElementById("fechaPublicacion").value;
    let visita = document.getElementById("visita").value;
    let bodega = document.getElementById("bodega").checked;
    let estacionamiento = document.getElementById("estacionamiento").checked;
    let logia = document.getElementById("logia").checked;
    let cocina = document.getElementById("cocina").checked;
    let antejardin = document.getElementById("antejardin").checked;
    let patio = document.getElementById("patio").checked;
    let piscina = document.getElementById("piscina").checked;

    if (
        tipo === "" ||
        descripcion === "" ||
        banos === "" ||
        dormitorios === "" ||
        areaTerreno === "" ||
        areaConstruida === "" ||
        precioCLP.value === "" ||
        precioUF.value === "" ||
        fecha === "" ||
        visita === ""
    ) {

        Swal.fire({
            icon: "error",
            title: "Campos incompletos",
            text: "Debe completar todos los campos"
        });
        return;
    }

    if (
        banos < 0 ||
        dormitorios < 0 ||
        areaTerreno < 0 ||
        areaConstruida < 0
    ) {

        Swal.fire({
            icon: "error",
            title: "Datos inválidos",
            text: "No puede ingresar números negativos"
        });
        return;
    }

    if (
        !bodega &&
        !estacionamiento &&
        !logia &&
        !cocina &&
        !antejardin &&
        !patio &&
        !piscina
    ) {

        Swal.fire({
            icon: "error",
            title: "Características",
            text: "Debe seleccionar al menos una característica"
        });
        return;
    }

    let fotos = document.getElementById("fotografias").files;
    if (fotos.length < 1 || fotos.length > 10) {
        Swal.fire({
            icon: "error",
            title: "Fotografías inválidas",
            text: "Debe ingresar entre 1 y 10 imágenes"
        });
        return;
    }

    const lista = document.getElementById("listaPropiedades");
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
        <h3>${tipo}</h3>
        <p>${descripcion}</p>
        <p>Baños: ${banos}</p>
        <p>Dormitorios: ${dormitorios}</p>
        <p>Área Terreno: ${areaTerreno} m²</p>
        <p>Área Construida: ${areaConstruida} m²</p>
        <p>Precio CLP: $${precioCLP.value}</p>
        <p>Precio UF: ${precioUF.value}</p>
        <p>Visita: ${visita}</p>
        <button class="eliminar">Eliminar</button>
    `;

    lista.appendChild(card);
    const galeriaPreview = document.getElementById("galeriaPreview");
    galeriaPreview.innerHTML = "";

    for (let i = 0; i < fotos.length; i++) {
        const imagen = document.createElement("img");
        imagen.src = URL.createObjectURL(fotos[i]);
        galeriaPreview.appendChild(imagen);
    }
    card.querySelector(".eliminar").addEventListener("click", function () {

        Swal.fire({
            title: "¿Eliminar propiedad?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar"
        }).then((result) => {
            if (result.isConfirmed) {
                card.remove();
                Swal.fire(
                    "Eliminado",
                    "La propiedad fue eliminada",
                    "success"
                );
            }
        });
    });

    Swal.fire({
        icon: "success",
        title: "Propiedad registrada correctamente"
    });
    formulario.reset();
    precioUF.value = "";
    galeriaPreview.innerHTML = "";

});