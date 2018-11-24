<?php

class ObraController {

    function getById($id) {

        return ObraPersistence::getById($id);
    }

    function getAllByProyectoId($id) {

        return ObraPersistence::getAllByProyectoId($id);
    }

    function getAll() {

        return ObraPersistence::getAll();
    }

    function create($data) {

        if ($data['nombreObra'] == null || $data['direccion'] == null || $data['fechaInicio'] == null || $data['proyectosId'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = ObraPersistence::create($data);
        return array('status' => $isOk, 'action' => 'create', 'message' => 'created');
    }

    function update($data) {
        
        if ($data['obraId'] == null || $data['nombreObra'] == null || $data['direccion'] == null || $data['fechaInicio'] == null || $data['proyectosId'] == null ) {
            return array('status' => 'false', 'action' => 'update', 'message' => 'Null');
        }
        $isOk = ObraPersistence::update($data);
        return array('status' => $isOk, 'action' => 'update', 'message' => 'update');
    }

    function delete($id) {

        $isOk = ObraPersistence::delete($id);
        return array('status' => $isOk, 'action' => 'delete', 'message' => 'delete');
    }
}