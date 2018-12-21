<?php

class EmpresaPersistence {

    function getById($id) {

        $link = getConnect();
        $query = "SELECT * FROM empresas where empresaId = '". $id ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getByRut($rut) {

        $link = getConnect();
        $query = "SELECT * FROM empresas where rutEmpresa = '". $rut ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $response = $row; }
        $result->close();
        $link->close();
        return $response;
    }

    function getAll() {

        $link = getConnect();
        $query = "SELECT * FROM empresas";
        $result = $link->query($query);
        while($row = mysqli_fetch_assoc($result)){

           $response[] = $row; 
        }
        $result->close();
        $link->close();
        return $response;
    }

    /**
     * Funcion que crea una cuenta nueva.
     */
    function create($data) {

        $link = getConnect();
        
        $queryInsert = "INSERT INTO empresas (nombreEmpresa,logo,rutEmpresa,direccion) ".
                    " VALUES ('".$data['nombreEmpresa']."', '".$data['logo']."', '".$data['rutEmpresa']."', '".$data['direccion']."')";
        $result = $link->query($queryInsert);
        $link->close();
        return $result;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE empresas SET ".
        "nombreEmpresa= '".$data['nombreEmpresa']."', ".
        "logo= '".$data['logo']."', ".
        "rutEmpresa = '".$data['rutEmpresa']."', ".
        "direccion = '".$data['direccion']."' ". 
        " WHERE empresaId = '".$data['empresaId']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($id) {

        $link = getConnect();
        $queryDelete = "DELETE FROM empresas WHERE empresaId='".$id."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }
}