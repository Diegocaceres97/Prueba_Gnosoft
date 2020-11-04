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
    //Procedimientos
    
    //Procedimiento para listar
    listarproductos: function () {
      let id = obtenerID_URL(window.location.href);
      axios.post(url, { opcion: 1, ID: id }).then((response) => {
        this.productos = response.data;
        console.log(this.productos);
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
