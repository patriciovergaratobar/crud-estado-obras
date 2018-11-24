<?php

class UserPersistence {

    /**
     * Valida el token.
     */
    function validateToken($toke) {

        $link = getConnect();
        $queryToken = "SELECT * FROM user where token = '". $toke ."' limit 1";
        $result = $link->query($queryToken);
        $isValido = ($result->num_rows == 1);
        $result->close();
        $link->close();
        return $isValido;
    }

    /**
     * Funcion para hacer login.
     */
    function doLogin($rut, $pass) {

        $link = getConnect();

        $queryLogIn = "SELECT ". basicColumUser() ." FROM user where rut = '". $rut ."' and password = '". $pass     ."' limit 1";
 
        $resultLogIn = $link->query($queryLogIn);

        while ($row = mysqli_fetch_assoc($resultLogIn)) { $loginResponse = $row; }

        if ($resultLogIn->num_rows == 1) {

            $newToken = base64_encode((string)microtime());//Crear token

            $queryNewToken = "UPDATE user SET token = '".$newToken."' WHERE rut = '".$rut."'";
            $statudLogin = $link->query($queryNewToken);

            $resultLogIn->close(); //Se libera
            $link->close();
            return array('user' => $loginResponse, 'token' => $newToken, 'login' => $statudLogin);
        } else {

            $resultLogIn->close(); //Se libera
            $link->close();
            return array('login' => 'OFF');
        }        
    }

    /**
     * Funcion que realiza un log out del usuario.
     */
    function logOut($token) {

        $link = getConnect();
        $queryClearSession = "UPDATE user SET token = 'CLOSE' WHERE token = '".$token."';";
        $result = $link->query($queryClearSession);
        $link->close();
        return $result;
    }

    /**
     * Funcion que entrega un usuario segun su correo.
     */
    function userByRut($rut) {

        $link = getConnect();
        $query = "SELECT ". basicColumUser() ." FROM user where rut= '". $rut ."' limit 1";
        $result = $link->query($query);
        while ($row = mysqli_fetch_assoc($result)) { $loginResponse = $row; }
        $result->close();
        $link->close();
        return $loginResponse;
    }

    function getAllUser() {

        $link = getConnect();
        $query = "SELECT ". basicColumUser() ." FROM user";
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
        $queryInsert = "INSERT INTO user (rut,email,password,createtime,nombre,apellido,tipoPerfil,activo,empresaId) VALUES ".
                        " ('".$data['rut']."' , '".$data['email']."' , '".$data['password']."', now(), '".$data['nombre']."' ,'".$data['apellido']."' , '".$data['tipoPerfil']."' , ".$data['activo']." , ".$data['empresaId']." )";
        $result = $link->query($queryInsert);
        $link->close();
        return $result;
    }

    function update($data) {

        $link = getConnect();
        $queryUpdate = "UPDATE user SET ".
        "rut= '".$data['rut']."', ".
        "email= '".$data['email']."', ".
        "password = '".$data['password']."', ".
        "nombre = '".$data['nombre']."', ".
        "apellido = '".$data['apellido']."', ".
        "tipoPerfil ='".$data['tipoPerfil']."', ".
        "activo = '".$data['activo']."', ".
        "empresaId = '".$data['empresaId']."' ". 
        " WHERE rut = '".$data['rut']."' ";
        $result = $link->query($queryUpdate);
        $link->close();
        return $result;
    }

    function delete($rut) {

        $link = getConnect();
        $queryDelete = "DELETE FROM user WHERE rut='".$rut."'";
        $result = $link->query($queryDelete);
        $link->close();
        return $result;
    }

}
?>