var url = "DAO/facturaDAO.php"; //Url que vamos a utilizar para enviar los datos via axios
var url_VO = "Mediador/factura.php";
var subtotal = 0;
var total = 0;
const array = new Array();
var appFacturas = new Vue({
  el: "#appFacturas",
  data: {
    facturas: [],
    nombre: "",
    fecha: "",
    articulo: "",
    cantidad: "",
    valor: "",
    totalF: 0,
  },
  methods: {
    //Botones
    //Hacemos uso de SweetAlert2 para las opciones crud
    btnAlta: async function agr_pro_fac() {
      const { value: formValues } = await Swal.fire({
        title: "Compra producto",
        html:
          '<label for="articulo" class="mt-3" style="display:block">Articulo</label>' +
          '<input id="articulo" class="mb-1 mt-1 swal2-input">' +
          '<label for="cantidad" style="display:block">Cantidad</label>' +
          '<input id="cantidad" type="number" value="1" min="1" class="mb-1 mt-1 swal2-input">' +
          '<label for="valor" style="display:block" >Valor</label>' +
          '<input id="valor" type="number" min="1" class="mt-1 swal2-input">' +
          `<p id="sub_fact_act"><p>`,
        focusConfirm: false,
        showCancelButton: true,
        confirmButtonColor: "#1cc88a",
        cancelButtonColor: "#3085d6",
        preConfirm: () => {
          return [
            (this.articulo = document.getElementById("articulo").value),
            (this.cantidad = document.getElementById("cantidad").value),
            (this.valor = document.getElementById("valor").value),
          ];
        },
      });

      if (this.articulo == "" || this.cantidad == "" || this.valor == "") {
        Swal.fire({
          type: "info",
          title: "Datos incompletos",
        });
        array.length = 0; //vaciamos el array en caso de que los datos no esten llenos o si clickeamos por fuera
        subtotal = 0;
        total = 0;
      } else {
        Swal.fire({
          title: "Registro  de productos",
          text: "¿Deseas registrar más productos?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "¡Sí, claro!",
          cancelButtonText: "No, hasta acá",
        }).then((result) => {
          if (result.isConfirmed) {
            agr_pro_fac(); //Nos permite registrar mas productos
            productos(
              "test",
              "test",
              this.articulo,
              this.cantidad,
              this.valor,
              0
            ); //metodo por el cual vamos enviando al dao para el manejo de datos y futura transaccion
            this.articulo = ""; //vaciamos los objetos(variables) para evitar que quede información puesta (data)
            this.cantidad = "";
            this.valor = "";
          } else {
            final(this.articulo, this.cantidad, this.valor, 0);
          }
        });
      }
    },
    btnEditar: async function (id, nombre, fecha, articulo, cantidad, valor) {
      await Swal.fire({
        title: "Editar",
        html:
          '<label for="name">Nombre</label>' +
          '<input id="name" placeholder="Nombre cliente" class="mt-1 mb-1 swal2-input" value="' +
          nombre +
          '">' +
          '<label for="date">Fecha</label>' +
          "<br>" +
          '<input id="date" type="date" class="mb-1 w-100" value="' +
          fecha +
          '">',
        focusConfirm: false,
        showCancelButton: true,
      }).then((result) => {
        if (result.value) {
          (nombre = document.getElementById("name").value),
            (fecha = document.getElementById("date").value),
            this.editarFactura(id, nombre, fecha);
          Swal.fire("¡Actualizado!", "El registro fue actualizado", "success");
        }
      }); //verdaderamente no es aconsejable editar las facturas despues de creadas o eliminarlas
    },
    btnBorrar: function (id) {
      Swal.fire({
        title: "¿Está seguro de borrar el registro: " + id + " ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Borrar",
      }).then((result) => {
        if (result.value) {
          this.borrarFactura(id);
          Swal.fire("¡Eliminado!", "El registro ha sido borrado.", "success");
        }
      });
    },
    btnVer: function (id) {
      window.open(`./Front/det_fac_index.php?id=${id}`, "test");
    },
    //Procedimientos
    //Procedimiento para listar
    listarFacturas: function () {
      axios.post(url, { opcion: 4 }).then((response) => {
        this.facturas = response.data;
        console.log(this.facturas);
      });
    },

    //Procedimiento CREAR
    altaFactura: function (data) {
      axios.post(url, { opcion: 1, Transaction: data }).then((response) => {
        this.listarFacturas();
        //estoy en el area arreglar
        console.log(response.data);
      });
      this.nombre = "";
      this.fecha = "";
      this.articulo = "";
      this.cantidad = "";
      this.valor = "";
    },

    //Procedimiento editar
    editarFactura: function (id, nombre, fecha) {
      axios
        .post(url, {
          opcion: 2,
          id: id,
          nombre: nombre,
          fecha: fecha,
        })
        .then((response) => {
          this.listarFacturas();
        });
    },
    //Procedimiento borrar
    borrarFactura: function (id) {
      axios.post(url, { opcion: 3, id: id }).then((response) => {
        this.listarFacturas();
      });
    },
  },
  created: function () {
    this.listarFacturas();
  },
  computed: {
    totalFactura() {
      this.totalF = 0;
      for (factura of this.facturas) {
        this.totalF++;
      }
      return this.totalF;
    },
  },
});
async function final(articulo, cantidad, valor) {
  const { value: formValuesD } = await Swal.fire({
    title: "Datos esenciales",
    html:
      '<label for="nombre">Nombre</label>' +
      '<input id="nombre" placeholder="Nombre cliente" class="mt-1 mb-1 swal2-input">' +
      '<label for="fecha">Fecha</label>' +
      "<br>" +
      '<input id="fecha" type="date" class="mb-1 w-100">',
    focusConfirm: false,
    preConfirm: () => {
      return [
        (nombre = document.getElementById("nombre").value),
        (fecha = document.getElementById("fecha").value),
      ];
    },
  });

  if (formValuesD&&Boolean(nombre)&&Boolean(fecha)) {
    productos(nombre, fecha, articulo, cantidad, valor, 1);
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
    });
    Toast.fire({
      type: "success",
      title: "¡Factura agregada!",
    });
   }else {
    Swal.fire({
      type: "info",
      title: "Datos incompletos",
    });
    array.length = 0;
    subtotal = 0;
    total=0;
  }
}
function productos(nombre, fecha, articulo, cantidad, valor, opt) {
  subtotal = Number(subtotal + cantidad * valor); //subtotal de los articulos de la factura * la cantidad
  total = subtotal + Number(subtotal) * 0.19; //total de los articulos de la factura con el iva
  //Comprobamos que los datos no esten vacios de nuevo
  sub_tot_producto();
  if (
    Boolean(nombre) ||
    Boolean(fecha) ||
    Boolean(articulo) ||
    Boolean(cantidad) ||
    Boolean(valor)
  ) {
    const det_tra = `INSERT INTO detallesfactura(defa_fact_fk,defa_detalle,defa_cantidad,defa_valor) VALUES ('ID','${articulo}','${cantidad}','${valor}');`;
    array.push(det_tra);
    if (opt == 1) {
      axios.post(url, { opcion: 5 }).then((response) => {
        //buscamos por medio de un metodo en el DAO el último id de las facturas
        let id = response.data;
        axios
          .post(url_VO, {
            Valor: array,
            Nombre: nombre,
            Fecha: fecha,
            Subtotal: subtotal,
            Total: total,
            ID: id,
          })
          .then((response) => {
            //alert(response.data);
            array.length = 0; //vaciamos array
            subtotal = 0;
            total = 0;
            appFacturas.altaFactura(
              response.data,
              nombre,
              fecha,
              articulo,
              cantidad,
              valor
            );
            // return response.data;
          });
      });
    }
  } else {
    Swal.fire({
      type: "info",
      title: "Datos incompletos",
    });
    array.length = 0; //vaciamos array
    subtotal = 0;
    total = 0;
  }
}
function sub_tot_producto() {
  //Metodo que sirve para mostrarle el subtotal y el total que llevan en lo que va de sus compras (factura)
  if (document.getElementById("sub_fact_act")) {
    if (Boolean(subtotal) || Boolean(total)) {
      document.getElementById(
        "sub_fact_act"
      ).innerText = `Subtotal factura: ${subtotal}\n Total(con iva):${total}`;
    }
  }
}
