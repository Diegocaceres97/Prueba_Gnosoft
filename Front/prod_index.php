<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <!--Bootstrap css-->
    <link rel="stylesheet" href="../Fachada/bootstrap/dist/css/bootstrap.min.css">
   <!--Sweet alert-->
   <link rel="stylesheet" href="../Fachada/plugins/sweetalert2/sweetalert2.min.css">
   <!--Font awesome-->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    <title>Productos</title>
    <!--Css custom-->
    <link rel="stylesheet" href="../main.css">
</head>
<body>
<header>
<h2 class="text-center text-dark"><span class="badge badge-success">PRODUCTOS</span></h2>
</header>
<div id="appFacturas">
<div class="container">
<div class="row">
<div class="col">
<button onclick="Generarexcel('tabla')" class="btn btn-success" title="Imprimir"><i class="fas fa-print"></i> </button>
<button class="btn btn-success" id="generar-excel" title="Generar excel"><i class="fas fa-file-csv"></i> </button>
</div>
<div class="col text-right">
<h5>Total productos: <span class="badge badge-success">{{totalproductos}}</span></h5>
</div>
</div>
<div class="row mt-5" id="tabla">
<div class="col-lg-12">
    <table class="table table-striped" id="Tabla"> <!--Stripped muestra une efecto entre filas-->
    <thead>
    <tr>
    <th>Nombre</th>
    <th>Cantidad</th>
    <th>Precio_Unidad</th>
    <th>Fecha</th>
    <th>Total_precio</th>
    <th>Historial_Cant</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(prod,indice) of productos">
    <td>{{prod.prod_nombre}}</td>
    <td>{{prod.prod_cantidad}}</td>
    <td>{{prod.prod_precio}}</td>
    <td>{{prod.prod_fecha}}</td>
    <td>{{Number(prod.prod_cantidad)*Number(prod.prod_precio)}}</td>
    <td>{{prod.prod_hist_cant}}</td>
    <td>
    <button class="btn btn-secondary" title="Editar" @click="btnEditar(prod.productos_pk,prod.prod_nombre,
    prod.prod_cantidad,prod.prod_precio)"> <i class="fas fa-pencil-alt"></i>
    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(prod.productos_pk)">
    <i class="fas fa-trash-alt"></i></button>
    </td>
    </tr>
    </tbody>
    </table>
</div>
</div>
</div>
</div>
<!--Jquery,Popper.js, bootstrap.js-->
<script src="../Fachada/jquery/jquery-3.5.1.min.js"></script>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="../Fachada/bootstrap/dist/js/bootstrap.min.js"></script>
<!--Vue JS-->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!--Axios-->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!--Sweetalert2-->
<script src="../Fachada/plugins/sweetalert2/sweetalert2.min.js"></script>
<!--Codigo custom-->
<script src="../Webservice/prod_main.js"></script>
<!--Para generar excel scripts necesarios-->
    <script type="text/javascript" src="../Fachada/jszip.js"></script>
    <script type="text/javascript" src="../Fachada/FileSaver.js"></script>
    <script type="text/javascript" src="../Fachada/excel-gen.js"></script>
</body>
</html>