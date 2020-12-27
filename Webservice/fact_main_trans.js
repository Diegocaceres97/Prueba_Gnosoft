"use strict";

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var url = "DAO/facturaDAO.php"; //Url que vamos a utilizar para enviar los datos via axios

var url_VO = "Mediador/factura.php";
var url_PRO = "DAO/productosDAO.php";
var subtotal = 0;
var total = 0;
var array = new Array();
var ObjectE = {
  //Objeto en el cual se mantendrá el orden los productos añadidos en el Soft
  nombre: "",
  cantidad: ""
};
var ArrayE = new Array(); //Array para guardar el objeto (Complementario)

var appFacturas = new Vue({
  el: "#appFacturas",
  data: {
    facturas: [],
    nombre: "",
    fecha: "",
    articulo: "",
    cantidad: "",
    valor: "",
    totalF: 0
  },
  methods: {
    //Botones
    //Hacemos uso de SweetAlert2 para las opciones crud
    btnAlta: function () {
      var _agr_pro_fac = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var _this = this;

        var _yield$Swal$fire, formValues;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                LlenarSelect();
                _context.next = 3;
                return Swal.fire({
                  title: "Venta producto",
                  html: '<label for="articulo" class="mt-3" style="display:block">Articulo</label>' + '<select id="opcion" onchange="cargarV()"> <option value="0">Escoge un articulo</option></select>' + '<label for="cantidad" style="display:block">Cantidad</label>' + '<input id="cantidad" type="number" value="1" min="1" class="mb-1 mt-1 swal2-input">' + '<label for="valor" style="display:block" >Valor</label>' + '<input id="valor" type="number" min="1" class="mt-1 swal2-input">' + "<p id=\"sub_fact_act\"><p>",
                  focusConfirm: false,
                  showCancelButton: true,
                  confirmButtonColor: "#1cc88a",
                  cancelButtonColor: "#3085d6",
                  preConfirm: function preConfirm() {
                    return [_this.articulo = document.getElementById("opcion"), _this.articulo = _this.articulo.options[_this.articulo.selectedIndex].text, _this.cantidad = document.getElementById("cantidad").value, _this.valor = document.getElementById("valor").value];
                  }
                });

              case 3:
                _yield$Swal$fire = _context.sent;
                formValues = _yield$Swal$fire.value;

                //this.articulo = this.articulo.options[this.articulo.selectedIndex].text;
                if (this.articulo == "" || this.articulo == "Escoge un articulo" || this.cantidad == "" || this.valor == "") {
                  Swal.fire({
                    type: "info",
                    title: "Datos incompletos"
                  });
                  array.length = 0; //vaciamos el array en caso de que los datos no esten llenos o si clickeamos por fuera

                  subtotal = 0;
                  total = 0;
                  reest_cant_prod();
                } else {
                  Swal.fire({
                    title: "Registro  de productos",
                    text: "¿Deseas registrar más productos?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "¡Sí, claro!",
                    cancelButtonText: "No, hasta acá"
                  }).then(function (result) {
                    if (result.isConfirmed) {
                      //Opcion para registras mas productos
                      agr_pro_fac(); //Nos permite registrar mas productos
                      //Pequeña operacion que disminuira el valor

                      oper_rest_cant_prod(_this.articulo, _this.cantidad);
                      productos("test", "test", _this.articulo, _this.cantidad, _this.valor, 0); //metodo por el cual vamos enviando al dao para el manejo de datos y futura transaccion

                      _this.articulo = ""; //vaciamos los objetos(variables) para evitar que quede información puesta (data)

                      _this.cantidad = "";
                      _this.valor = "";
                    } else {
                      //Pequeña operacion que disminuira el valor
                      // oper_rest_cant_prod(this.articulo,this.cantidad);
                      //Opcion para colocar
                      Ag_pr_Ma(_this.articulo, _this.cantidad);

                      _final(_this.articulo, _this.cantidad, _this.valor, 0);
                    }
                  });
                }

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function agr_pro_fac() {
        return _agr_pro_fac.apply(this, arguments);
      }

      return agr_pro_fac;
    }(),
    btnNP: function () {
      var _nuevo = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _yield$Swal$fire2, formValues;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return Swal.fire({
                  title: "Entrada de productos",
                  html: '<label for="nombre_producto">Producto</label>' + '<input id="nombre_producto" class="swal2-input">' + '<label for="precio">Precio</label>' + '<input id="precio_producto" type="number" min="1" class="swal2-input">' + '<label for="cantidad">Cantidad</label>' + '<input id="cantidad_producto" type="number" min="1" value="1" class="swal2-input">',
                  focusConfirm: false,
                  showCancelButton: true,
                  preConfirm: function preConfirm() {
                    return [nombre_producto = document.getElementById("nombre_producto").value, cantidad_producto = document.getElementById("cantidad_producto").value, precio_producto = document.getElementById("precio_producto").value];
                  }
                });

              case 2:
                _yield$Swal$fire2 = _context2.sent;
                formValues = _yield$Swal$fire2.value;

                if (Boolean(formValues) && Boolean(nombre_producto) && Boolean(precio_producto)) {
                  //Swal.fire(JSON.stringify(formValues))
                  this.AltaProductos(nombre_producto, cantidad_producto, precio_producto);
                  this.LlenarSelect();
                } else {
                  Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Te olvidaste de llenar un dato"
                  });
                }

              case 5:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function nuevo() {
        return _nuevo.apply(this, arguments);
      }

      return nuevo;
    }(),
    btnEditar: function () {
      var _btnEditar = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(id, nombre, fecha, articulo, cantidad, valor) {
        var _this2 = this;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return Swal.fire({
                  title: "Editar",
                  html: '<label for="name">Nombre</label>' + '<input id="name" placeholder="Nombre cliente" class="mt-1 mb-1 swal2-input" value="' + nombre + '">' + '<label for="date">Fecha</label>' + "<br>" + '<input id="date" type="date" class="mb-1 w-100" value="' + fecha + '">',
                  focusConfirm: false,
                  showCancelButton: true
                }).then(function (result) {
                  if (result.value) {
                    nombre = document.getElementById("name").value, fecha = document.getElementById("date").value, _this2.editarFactura(id, nombre, fecha);
                    Swal.fire("¡Actualizado!", "El registro fue actualizado", "success");
                  }
                });

              case 2:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3);
      }));

      function btnEditar(_x, _x2, _x3, _x4, _x5, _x6) {
        return _btnEditar.apply(this, arguments);
      }

      return btnEditar;
    }(),
    btnBorrar: function btnBorrar(id) {
      var _this3 = this;

      Swal.fire({
        title: "¿Está seguro de borrar el registro: " + id + " ?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Borrar"
      }).then(function (result) {
        if (result.value) {
          _this3.borrarFactura(id);

          Swal.fire("¡Eliminado!", "El registro ha sido borrado.", "success");
        }
      });
    },
    btnVer: function btnVer(id) {
      if (id == 0) {
        window.open("./Front/prod_index.php?id=".concat(id), "test0");
      } else {
        window.open("./Front/det_fac_index.php?id=".concat(id), "test");
      }
    },
    //Procedimientos
    //Procedimiento para listar
    listarFacturas: function listarFacturas() {
      var _this4 = this;

      axios.post(url, {
        opcion: 4
      }).then(function (response) {
        _this4.facturas = response.data;
        console.log(_this4.facturas);
      });
    },
    //Procedimiento CREAR
    altaFactura: function altaFactura(data) {
      var _this5 = this;

      axios.post(url, {
        opcion: 1,
        Transaction: data
      }).then(function (response) {
        _this5.listarFacturas(); //estoy en el area arreglar


        console.log(response.data);
      });
      this.nombre = "";
      this.fecha = "";
      this.articulo = "";
      this.cantidad = "";
      this.valor = "";
    },
    //Procedimiento editar
    editarFactura: function editarFactura(id, nombre, fecha) {
      var _this6 = this;

      axios.post(url, {
        opcion: 2,
        id: id,
        nombre: nombre,
        fecha: fecha
      }).then(function (response) {
        _this6.listarFacturas();
      });
    },
    //Procedimiento borrar
    borrarFactura: function borrarFactura(id) {
      var _this7 = this;

      axios.post(url, {
        opcion: 3,
        id: id
      }).then(function (response) {
        _this7.listarFacturas();
      });
    },
    AltaProductos: function AltaProductos(nombre_producto, cantidad_producto, precio_producto) {
      axios.post(url_PRO, {
        opcion: 1,
        nombre: nombre_producto,
        cantidad: cantidad_producto,
        precio: precio_producto
      }).then(function (response) {});
      Swal.fire("Excelente!", "Producto agregado!", "success");
    }
  },
  created: function created() {
    //Creador
    this.listarFacturas();
  },
  computed: {
    //Investigar mas acerca de computado
    totalFactura: function totalFactura() {
      this.totalF = 0;

      var _iterator = _createForOfIteratorHelper(this.facturas),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          factura = _step.value;
          this.totalF++;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      return this.totalF;
    }
  }
});

function _final(_x7, _x8, _x9) {
  return _final2.apply(this, arguments);
}

function _final2() {
  _final2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(articulo, cantidad, valor) {
    var _yield$Swal$fire3, formValuesD, Toast;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            oper_rest_cant_prod(articulo, cantidad); //Agregamos el "ultimo producto" que seria en este caso al ya añadir un nombre y fecha
            //Registro de nombre y fecha de la factura a crear

            _context4.next = 3;
            return Swal.fire({
              title: "Datos esenciales",
              html: '<label for="nombre">Nombre</label>' + '<input id="nombre" placeholder="Nombre cliente" class="mt-1 mb-1 swal2-input">' + '<label for="fecha">Fecha</label>' + "<br>" + '<input id="fecha" type="date" class="mb-1 w-100">',
              focusConfirm: false,
              preConfirm: function preConfirm() {
                return [nombre = document.getElementById("nombre").value, fecha = document.getElementById("fecha").value];
              }
            });

          case 3:
            _yield$Swal$fire3 = _context4.sent;
            formValuesD = _yield$Swal$fire3.value;

            if (formValuesD && Boolean(nombre) && Boolean(fecha)) {
              productos(nombre, fecha, articulo, cantidad, valor, 1);
              Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000
              });
              Toast.fire({
                type: "success",
                title: "¡Factura agregada!"
              });
            } else {
              Swal.fire({
                type: "info",
                title: "Datos incompletos"
              });
              array.length = 0;
              subtotal = 0;
              total = 0;
              reest_cant_prod();
            }

          case 6:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _final2.apply(this, arguments);
}

function productos(nombre, fecha, articulo, cantidad, valor, opt) {
  //Funcion para poder ir agregando productos ala factura y DetaFact
  subtotal = Number(subtotal + cantidad * valor); //subtotal de los articulos de la factura * la cantidad
  // total = subtotal + Number(subtotal) * 1; //total de los articulos de la factura con el iva
  //Comprobamos que los datos no esten vacios de nuevo

  sub_tot_producto();

  if (Boolean(nombre) || Boolean(fecha) || Boolean(articulo) || Boolean(cantidad) || Boolean(valor)) {
    var det_tra = "INSERT INTO detallesfactura(defa_fact_fk,defa_detalle,defa_cantidad,defa_valor) VALUES ('ID','".concat(articulo, "','").concat(cantidad, "','").concat(valor, "');");
    array.push(det_tra); //Borramos el objeto con la info general para mantener una 'integridad referencial'

    BorrarObjetos();
    Ag_pr_Ma(articulo, cantidad);

    if (opt == 1) {
      axios.post(url, {
        opcion: 5
      }).then(function (response) {
        //buscamos por medio de un metodo en el DAO el último id de las facturas
        var id = response.data;
        axios.post(url_VO, {
          Valor: array,
          Nombre: nombre,
          Fecha: fecha,
          Subtotal: subtotal,
          //Total: total,
          ID: id
        }).then(function (response) {
          //alert(response.data);
          array.length = 0; //vaciamos array

          subtotal = 0;
          total = 0;
          ArrayE.length = 0; //Vaciamos el array contenedor copia al ser agregada la factura

          appFacturas.altaFactura(response.data, //este response vendría siendo la transacción armada para mandar como tal en bloque
          nombre, fecha, articulo, cantidad, valor); // return response.data;
        });
      });
    }
  } else {
    Swal.fire({
      type: "info",
      title: "Datos incompletos"
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
      document.getElementById("sub_fact_act").innerText = "total factura: ".concat(subtotal); //Arreglado para ya no mostrar el total + el iva
    }
  }
}

function tomar(array) {
  //Cargamos la lista de los productos de la base de datos
  array.forEach(function (elemento) {
    //para cada dato en la tabla creamos un option
    var miSelect = document.getElementById("opcion");
    var aTag = document.createElement("option");
    aTag.setAttribute("value", elemento.productos_pk); //y creamos el atributo value para cada dato (asi se nos facilita la obtencion del id)

    aTag.innerHTML = elemento.prod_nombre;
    miSelect.appendChild(aTag);
  });
}

function cargarV() {
  //Funcion creada para mostrar precios y demas cuando selecciona
  document.getElementById("cantidad").value = 1;
  var valor_option = document.getElementById("opcion");
  axios.post(url_PRO, {
    opcion: 4,
    ID: valor_option.value
  }).then(function (response) {
    //Por medio del value del option que es el ID se busca el producto en especifico
    var respuesta = response.data;

    var _iterator2 = _createForOfIteratorHelper(respuesta),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var value = _step2.value;
        document.getElementById("valor").value = value.prod_precio;
        document.getElementById("cantidad").setAttribute("max", value.prod_cantidad);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  });
}

function LlenarSelect() {
  //Llenamos el select con los productos disponibles
  axios.post(url_PRO, {
    opcion: 3
  }).then(function (response) {
    tomar(response.data);
  });
}

function BorrarObjetos() {
  ObjectE.nombre = "";
  ObjectE.cantidad = "";
  console.error(ObjectE);
}

function Ag_pr_Ma(articulo, cantidad) {
  //Funcion en la que va agregando los datos al objeto y al array para tratarlos en caso de que 
  //no se complete la opcion de generar factura o que no resulte exitosa la operacion
  var objeto = Object.assign({}, ObjectE); //Copiamos la referencia del objeto por medio del assign
  // (se guardará como un objeto único en su información con alta integridad referencial)

  objeto.nombre = articulo;
  objeto.cantidad = cantidad;
  ArrayE.push(objeto);
  console.info(objeto); //console.warn(ArrayE);
}

function reest_cant_prod() {
  //Funcion para reestablecer los productos que se quitaron de productos al agregarlos en factura (cantidad)
  var _iterator3 = _createForOfIteratorHelper(ArrayE),
      _step3;

  try {
    for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
      var datos = _step3.value;
      console.warn("Nombre articulo: " + datos.nombre + " Cantidad:" + datos.cantidad);
      axios.post(url_PRO, {
        opcion: 5,
        nombre: datos.nombre,
        cantidad: datos.cantidad,
        decision: 1 //en base a esta decision no restara si no sumará lo quitado en lo que iba de la factura

      }).then(function (response) {});
    }
  } catch (err) {
    _iterator3.e(err);
  } finally {
    _iterator3.f();
  }

  ArrayE.length = 0; //Limpiamos el array 
}

function oper_rest_cant_prod(articulo, cantidad) {
  //Funcion para ir rebajando la cantidad en la BD cuando añade un articulo a la factura
  axios.post(url_PRO, {
    opcion: 5,
    nombre: articulo,
    cantidad: cantidad,
    decision: 0
  }).then(function (response) {});
}
