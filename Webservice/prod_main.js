var url = "../DAO/facturadetallesDAO.php";
var url_pro = "../DAO/productosDAO.php";
const array = new Array();
var subtotal = 0;
var appProductos = new Vue({
  el: "#appFacturas",
  data: {
    productos: [],
    totalF: 0,
  },
  methods: { 
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
       //Procedimientos
    //Procedimiento para listar
    listarproductos: function () {
     // let id = obtenerID_URL(window.location.href);
     
      axios.post(url_pro, { opcion: 4 }).then((response) => {
        this.productos = response.data;
        console.log(this.productos);
      });
    
    },
    borrarFactura: function(id){
      axios.post(url_pro, { opcion: 6, ID: id }).then((response) => {
        this.listarproductos();
      });
        },
  },
  created: function () {
    this.listarproductos();
  },
  computed: {
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
