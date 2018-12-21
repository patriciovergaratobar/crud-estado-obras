<?php

class EstadosObraPersistence{

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM estadosObras  as e inner join obras as o on e.obraId = o.obraId WHERE estadosObrasId =  '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getComentariosById($id) {

        $link = getConnect();
        $query = "SELECT c.comentariosEstadosId, c.fecha, c.visto, c.comentario, c.estadoId, c.rutUser, u.nombre, u.apellido  FROM comentariosEstados as c inner join user as u on u.rut = c.rutUser WHERE c.estadoId =  '". $id ."'";
        $result = $link->query($query);
        while($row = mysqli_fetch_assoc($result)){

           $response[] = $row; 
        }
        $result->close();
        $link->close();
        return $response;
    }

    function createComentario($data) {

        $link = getConnect();
        $queryInsert = "INSERT INTO comentariosEstados ( comentario, estadoId, rutUser, fecha, visto )  ".
                    " VALUES ('".$data['comentario']."', '".$data['estadoId']."', '".$data['rutUser']."', '".$data['fecha']."', '".$data['visto']."') ";
        $result = $link->query($queryInsert);
        $link->close();
        return $result ;
    }

    function updateComentario($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE comentariosEstados SET ".
        "visto= '".$data['visto']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function getAllByObraId($id) {

        $link = getConnect();
        $query = "SELECT * FROM estadosObras WHERE obraId = '".$id."' ";
        $result = $link->query($query);
        while($row = mysqli_fetch_assoc($result)){

           $response[] = $row; 
        }
        $result->close();
        $link->close();
        return $response;
    }

    function getAll() {

        $link = getConnect();
        $query = "SELECT * FROM estadosObras as estado inner join obras as o on o.obraId = estado.obraId inner join proyectos as pro on pro.proyectosId = o.proyectosId inner join empresas as empresa on empresa.empresaId = pro.empresaId";
        $result = $link->query($query);
        while($row = mysqli_fetch_assoc($result)){

           $response[] = $row; 
        }
        $result->close();
        $link->close();
        return $response;
    }

    function create($data) {

        $link = getConnect();
        $queryInsert = "INSERT INTO estadosObras ( titulo, fecha, comentario, obraId)  ".
                    " VALUES ('".$data['titulo']."', '".date_format(date_create($data['fecha']),"Y-m-d")."','".$data['comentario']."', '".$data['obraId']."') ";
        $result = $link->query($queryInsert);
        $link->close();
        return $result ;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE estadosObras SET ".
        "titulo= '".$data['titulo']."', ".
        "fecha= '".date_format(date_create($data['fecha']),"Y-m-d")."', ".
        "comentario= '".$data['comentario']."', ".
        "obraId = '".$data['obraId']."' ". 
        " WHERE estadosObrasId = '".$data['estadosObrasId']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($id) {

        $link = getConnect();
        $queryDelete = "DELETE FROM estadosObras WHERE estadosObrasId='".$id."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }
}