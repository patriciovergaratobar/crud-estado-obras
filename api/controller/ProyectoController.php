<?php


class ProyectoController {

    function getById($id) {

        return ProyectoPersistence::getById($id);
    }

    function getAllByEmpresaId($id) {

        return ProyectoPersistence::getAllByEmpresaId($id);
    }

    function getAll() {

        return ProyectoPersistence::getAll($id);
    }

    function create($data) {

        if ($data['nombreProyecto'] == null || $data['descripcion'] == null || $data['empresaId'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = ProyectoPersistence::create($data);
        return array('status' => $isOk, 'action' => 'create', 'message' => 'created');
    }

    function update($data) {

        if ( $data['proyectosId'] == null || $data['nombreProyecto'] == null || $data['descripcion'] == null || $data['empresaId'] == null ) {
            return array('status' => 'false', 'action' => 'update', 'message' => 'Null');
        }
        $isOk = ProyectoPersistence::update($data);
        return array('status' => $isOk, 'action' => 'update', 'message' => 'update');
    }

    function delete($id) {

        $isOk = ProyectoPersistence::delete($id);
        return array('status' => $isOk, 'action' => 'delete', 'message' => 'delete');
    }
}