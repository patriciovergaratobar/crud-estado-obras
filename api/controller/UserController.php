<?php

class UserController {

    /**
     * Metodo que valida el token.
     */
    function validateToken($toke) {

        return UserPersistence::validateToken($toke);
    }

    /**
     * Funcion que se encarga de hacer login.
     * 
     */
    function doLogin($rut, $pass) {

        return UserPersistence::doLogin($rut, $pass);
    }

    /**
     * Funcion que hace el log out de la sesion del usuario.
     * 
     */
    function logOut($token) {

        $result = UserPersistence::logOut($token);
        return array('logOut' => $result);
    }

    function getAll() {
        
        $result = UserPersistence::getAllUser();
        return $result;
    }

    function getById($id) {
        
        $result = UserPersistence::userByRut($id);
        return $result;
    }

    /**
     * Funcion que crea una cuenta nueva.
     */
    function create($data) {

        if ($data['rut'] == null || $data['email'] == null || $data['password'] == null || $data['nombre'] == null || $data['apellido'] == null || $data['tipoPerfil'] == null || $data['activo'] == null || $data['empresaId'] == null) {
            return array('status' => 'false', 'action' => 'signIn', 'message' => 'Null');
        }

        $userByRut = UserPersistence::userByRut($data['rut']);
        if ($userByRut == null || $userByRut['rut'] == null) {

            $isOk = UserPersistence::create($data);
            return array('status' => $isOk, 'action' => 'signIn', 'message' => 'created');
        } else {

            return array('status' => 'false', 'action' => 'signIn', 'message' => 'exists');
        }
    }

    function update($data) {

        if ($data['rut'] == null || $data['email'] == null || $data['password'] == null || $data['nombre'] == null || $data['apellido'] == null || $data['tipoPerfil'] == null || $data['activo'] == null || $data['empresaId'] == null) {
            return array('status' => 'false', 'action' => 'signIn', 'message' => 'Null');
        }
        $isOk = UserPersistence::update($data);
        return array('status' => $isOk, 'action' => 'signIn', 'message' => 'update');
    }

    function delete($rut) {

        $isOk = UserPersistence::delete($rut);
        return array('status' => $isOk, 'action' => 'signIn', 'message' => 'delete');
    }


}
