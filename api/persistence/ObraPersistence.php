<?php

class ObraPersistence {

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM obras WHERE obraId =  '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getAllByProyectoId($id) {

        $link = getConnect();
        $query = "SELECT * FROM obras WHERE proyectosId = '".$id."' ";
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
        $query = "SELECT * FROM obras";
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
        $queryInsert = "INSERT INTO obras (nombreObra, direccion, fechaInicio, proyectosId) ".
                    " VALUES ('".$data['nombreObra']."', '".$data['direccion']."','".$data['fechaInicio']."', '".$data['proyectosId']."') ";
        $result = $link->query($queryInsert);
        $link->close();
        return $result ;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE obras SET ".
        "nombreObra= '".$data['nombreObra']."', ".
        "direccion= '".$data['direccion']."', ".
        "proyectosId= '".$data['proyectosId']."', ".
        "fechaInicio = '".$data['fechaInicio']."' ". 
        " WHERE obraId = '".$data['obraId']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($id) {

        $link = getConnect();
        $queryDelete = "DELETE FROM obras WHERE obraId='".$id."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }
}