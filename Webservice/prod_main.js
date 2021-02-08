
var url = "../DAO/facturadetallesDAO.php";
var url_pro = "../DAO/productosDAO.php";
const array = new Array();
var subtotal = 0;
var appProductos = new Vue({
  el: "#appFacturas",
  data: {
    productos: [], //Aquí almacenaremos los productos de nuestra BD
    totalF: 0,
    search:'', //Variable para las busquedas
    elementosporPagina:10,//Serie de variables para la paginación
    datosPaginados:[],
    paginaActual:1
  },
  mounted(){ //Carga inicial Core de vue para cuando carga dicha página
    this.getDataPagina(1);
  },
  methods: { 
    totalPaginas(){//Serie de funciones que nos ayudaran por medio de paginate de VUE a llevar un ordenamiento (de 10 por pagina en este caso)
    return Math.ceil(this.productos.length / this.elementosporPagina);//con estetica de nuestros datos mostrados en tabla
    },
    getDataPagina(noPagina){
      this.listarproductos();
     //Tocó implementar el setTimeOut debido a que no cargaba la lista en la tabla apenas entraba uno
     setTimeout(() => {
      this.paginaActual = noPagina;
      this.datosPaginados = [];
    let ini = (noPagina * this.elementosporPagina)-this.elementosporPagina;
    let fin = (noPagina * this.elementosporPagina);
    // for (let index = ini; index < fin; index++) {
    //   this.datosPaginados.push(this.productos[index]); 
    // }
    this.datosPaginados = this.productos.slice(ini,fin); //Mostrará los productos en dicha página que estemos ubicados, llevandolos por orden
    //10-20-30 -> 10-20, 20-30.. en este caso seria así
     }, 600);
    },
    getPreviousPage(){
    if(this.paginaActual > 1){
      this.paginaActual--;
    }
    this.getDataPagina(this.paginaActual);
    },
    getNextPage(){
      if(this.paginaActual < this.totalPaginas()){
        this.paginaActual++;
      }
      this.getDataPagina(this.paginaActual);
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
  btnEditar: async function (id, nombre, cantidad, precio) {
    await Swal.fire({
      title: "Editar",
      html:
        '<label for="name">Nombre</label>' +
        '<input id="name" class="mt-1 mb-1 swal2-input" value="' +
        nombre + '">'+
        '<label for="precio">Precio</label>' +
          '<input id="precio_producto" type="number" min="1" class="swal2-input" value="' +
          precio +'">'+
          '<label for="cantidad">Cantidad</label>' +
          '<input id="cantidad_producto" type="number" min="1" class="swal2-input" value="'+
          cantidad+'">',
      focusConfirm: false,
      showCancelButton: true,
    }).then((result) => {
      if (result.value) {
        (nombre = document.getElementById("name").value),
          (precio = document.getElementById("precio_producto").value),
          (cantidad=document.getElementById('cantidad_producto').value)
          this.editarProducto(id, nombre, precio,cantidad);
        Swal.fire("¡Actualizado!", "El producto fue actualizado", "success");
      }
    }); //verdaderamente no es aconsejable editar las facturas despues de creadas o eliminarlas
  },
       //Procedimientos
    //Procedimiento para listar
    listarproductos: function () {
     // let id = obtenerID_URL(window.location.href);
      axios.post(url_pro, { opcion: 4 }).then((response) => {
        this.productos = response.data;
        console.log(this.productos);
        //var nuewData = {...this.productos,paginate: ['people']};
      });
    
    },
    editarProducto: function (id,nombre, precio,cantidad) {
      axios
        .post(url_pro, {
          opcion: 7,
          ID: id,
          nombre: nombre,
          precio: precio,
          cantidad:cantidad
        })
        .then((response) => {
          this.listarproductos();
        });
    },
    borrarFactura: function(id){
      axios.post(url_pro, { opcion: 6, ID: id }).then((response) => {
        this.listarproductos();
      });
        },
  },
  created: function () {
    
  },
  computed: {
    filteredProductos:function(){
      let valor;
    if(this.search ==""){
      valor = this.datosPaginados;
    }else{
      valor = this.productos;
    }
      return valor.filter((producto)=>{
        let com = producto.prod_nombre.toLowerCase();
        let search = this.search.toLowerCase();
        return com.match(search)//Función para poder buscar y traer el producto
      })//solicitado por el nombre
    },
    totalproductos() {
      this.totalF = 0;
      for (producto of this.productos) {
        this.totalF++;
      }
      return this.totalF;
    },
  },
});
function obtenerID_URL(urL) {
  //Obtenemos el id mandado por medio de la URL
  let id = urL.substring(urL.lastIndexOf("=") + 1);
  return id;
}

 function Generarexcel(id){
  var printContents=document.getElementById(id).innerHTML;
  var originalContents = document.body.innerHTML;//obtenemos todo el contenido
  document.body.innerHTML = printContents;
  window.print();
  document.body.innerHTML = originalContents;
    
 }
 $(document).ready(function () {//para generar excel por medio de la biblioteca generada de js-excel-generator
  $("#generar-excel").click(function () {
  excel = new ExcelGen({
    "src_id": "Tabla",
    "show_header": true,
    "type": "table"
  });
      excel.generate();
  });
});
