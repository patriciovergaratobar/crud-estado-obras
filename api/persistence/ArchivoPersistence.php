<?php

class ArchivoPersistence{

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM archivos where fotoid =  '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getAllByEstadoId($id) {

        $link = getConnect();
        $query = "SELECT * FROM archivos where estadosObrasId = '".$id."' ";
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
        $query = "SELECT * FROM archivos";
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

        $queryInsert = "INSERT INTO archivos (archivos, comentario, tipoArchivo, estadosObrasId)  ".
                    " VALUES ('".$data['archivos']."', '".$data['comentario']."','".$data['tipoArchivo']."', '".$data['estadosObrasId']."') ";
        $result = $link->query($queryInsert);
        $link->close();
        return $result ;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE archivos SET ".
        "archivos= '".$data['archivos']."', ".
        "comentario= '".$data['comentario']."', ".
        "tipoArchivo= '".$data['tipoArchivo']."', ".
        "estadosObrasId = '".$data['estadosObrasId']."' ". 
        " WHERE fotoid = '".$data['fotoid']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($id) {

        $link = getConnect();
        $queryDelete = "DELETE FROM archivos WHERE fotoid='".$id."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }
}