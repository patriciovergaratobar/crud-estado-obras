<?php

class EstadosObraPersistence{

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM estadosObras WHERE estadosObrasId =  '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
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
        $query = "SELECT * FROM estadosObras";
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
                    " VALUES ('".$data['titulo']."', '".$data['fecha']."','".$data['comentario']."', '".$data['obraId']."') ";
        $result = $link->query($queryInsert);
        $link->close();
        return $result ;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE estadosObras SET ".
        "titulo= '".$data['titulo']."', ".
        "fecha= '".$data['fecha']."', ".
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