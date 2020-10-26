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
    <title>Document</title>
    <!--Css custom-->
    <link rel="stylesheet" href="../main.css">
</head>
<body>
<header>
<h2 class="text-center text-dark"><span class="badge badge-success">CRUD CON VUE.JS</span></h2>
</header>
<div id="appFacturas">
<div class="container">
<div class="row">
<div class="col">

</div>
<div class="col text-right">
<h5>Total productos: <span class="badge badge-success">{{totalproductos}}</span></h5>
</div>
</div>
<div class="row mt-5">
<div class="col-lg-12">
    <table class="table table-striped"> <!--Stripped muestra une efecto entre filas-->
    <thead>
    <tr>
    <th>Id detalle</th>
    <th>Id factura</th>
    <th>Nombre articulo</th>
    <th>Cantidad</th>
    <th>Valor</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(deta_fact,indice) of productos">
    <td>{{deta_fact.detallesfactura_pk}}</td>
    <td>{{deta_fact.defa_fact_fk}}</td>
    <td>{{deta_fact.defa_detalle}}</td>
    <td>{{deta_fact.defa_cantidad}}</td>
    <td>{{deta_fact.defa_valor}}</td>
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
<script src="../Webservice/deta_fact_main.js"></script>
   
</body>
</html>