<?php

class EmpresaController {

    function getById($id) {

        return EmpresaPersistence::getById($id);
    }

    function getAll() {

        return EmpresaPersistence::getAll();
    }

    function create($data) {

        if ($data['nombreEmpresa'] == null || $data['logo'] == null || $data['rutEmpresa'] == null || $data['direccion'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = EmpresaPersistence::create($data);
        return array('status' => $isOk, 'action' => 'create', 'message' => 'created');
    }

    function update($data) {

        if ($data['empresaId'] == null || $data['nombreEmpresa'] == null || $data['logo'] == null || $data['rutEmpresa'] == null || $data['direccion'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = EmpresaPersistence::update($data);
        return array('status' => $isOk, 'action' => 'update', 'message' => 'update');
    }

    function delete($id) {

        $isOk = EmpresaPersistence::delete($id);
        return array('status' => $isOk, 'action' => 'delete', 'message' => 'delete');
    }

}