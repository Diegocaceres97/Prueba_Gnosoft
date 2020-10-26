<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, shrink-to-fit=no">
    <title>PRUEBA</title>
    <!--Bootstrap css-->
    <link rel="stylesheet" href="Fachada/bootstrap/dist/css/bootstrap.min.css">
   <!--Sweet alert-->
   <link rel="stylesheet" href="Fachada/plugins/sweetalert2/sweetalert2.min.css">
   <!--Font awesome-->
   <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.1/css/all.min.css" integrity="sha512-+4zCK9k+qNFUR5X+cKL9EIR+ZOhtIloNl9GIKS57V1MyNsYpYcUrUeQc9vNfzsWfV28IaLL3i96P9sdNyeRssA==" crossorigin="anonymous" />
    
    <!--Css custom-->
    <link rel="stylesheet" href="main.css">
</head>
<body>
<header>
<h2 class="text-center text-dark"><span class="badge badge-success">Facturación</span></h2>
</header>
<div id="appFacturas">
<div class="container">
<div class="row">
<div class="col">
<button @click="btnAlta" class="btn btn-success" title="Nuevo"><i class="fas fa-plus-circle fa-2xs"></i> </button>
</div>
<div class="col text-right">
<h5>Total facturas: <span class="badge badge-success">{{totalFactura}}</span></h5>
</div>
</div>
<div class="row mt-5">
<div class="col-lg-12">
    <table class="table table-striped"> <!--Stripped muestra une efecto entre filas-->
    <thead>
    <tr>
    <th>Id</th>
    <th>Nombre</th>
    <th>Fecha</th>
    <th>Subtotal</th>
    <th>Iva</th>
    <th class="text-center">Total</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(factura,indice) of facturas">
    <td>{{factura.facturas_pk}}</td>
    <td>{{factura.fact_nombre}}</td>
    <td>{{factura.fact_fecha}}</td>
    <td>{{factura.fact_subtotal}}</td>
    <td>{{factura.fact_iva}} %</td>
    <td>
    <div class="col-md-8">
    <input type="number" v-model.number="factura.fact_total" class="form-control text-right" disabled>
    </div>
    </td>
    <td>
    <div class="btn-group" role="group">
    <button class="btn btn-secondary" title="Editar" @click="btnEditar(factura.facturas_pk,factura.fact_nombre,
    factura.fact_fecha,factura.fact_subtotal,factura.fact_iva,factura.fact_total)"> <i class="fas fa-pencil-alt"></i>
    </button>
    <button class="btn btn-danger" title="Eliminar" @click="btnBorrar(factura.facturas_pk)">
    <i class="fas fa-trash-alt"></i></button>
    <button class="btn btn-primary" title="Ver productos" @click="btnVer(factura.facturas_pk)" >
    <i class="fas fa-eye"></i></button>
    </div>
    </td>
    </tr>
    </tbody>
    </table>
</div>
</div>
</div>
</div>
<!--Jquery,Popper.js, bootstrap.js-->
<script src="Fachada/jquery/jquery-3.5.1.min.js"></script>
<script src="https://unpkg.com/@popperjs/core@2"></script>
<script src="Fachada/bootstrap/dist/js/bootstrap.min.js"></script>
<!--Vue JS-->
<script src="https://cdn.jsdelivr.net/npm/vue@2/dist/vue.js"></script>
<!--Axios-->
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
<!--Sweetalert2-->
<script src="Fachada/plugins/sweetalert2/sweetalert2.min.js"></script>
<!--Codigo custom-->
<script src="Webservice/fact_main.js"></script>
   
</body>
</html>