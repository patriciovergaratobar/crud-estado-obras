<?php

class ProyectoPersistence {

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM proyectos where proyectosId = '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getAllByEmpresaId($id) {

        $link = getConnect();
        $query = "SELECT * FROM proyectos WHERE empresaId = '".$id."' ";
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
        $query = "SELECT * FROM proyectos";
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
        $queryInsert = "INSERT INTO proyectos (nombreProyecto, descripcion,empresaId) ".
                    " VALUES ('".$data['nombreProyecto']."', '".$data['descripcion']."', '".$data['empresaId']."')";
        $result = $link->query($queryInsert);
        $link->close();
        return $result;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE proyectos SET ".
        "nombreProyecto= '".$data['nombreProyecto']."', ".
        "descripcion= '".$data['descripcion']."', ".
        "empresaId = '".$data['empresaId']."' ". 
        " WHERE proyectosId = '".$data['proyectosId']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($id) {

        $link = getConnect();
        $queryDelete = "DELETE FROM proyectos WHERE proyectosId='".$id."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }
}