<?php

class EstadosObraController {

    function getById($id) {

        return EstadosObraPersistence::getById($id);
    }

    function getAllByObraId($id) {

        return EstadosObraPersistence::getAllByObraId($id);
    }

    function getAll() {

        return EstadosObraPersistence::getAll();
    }

    function create($data) {

        if ($data['titulo'] == null || $data['fecha'] == null || $data['comentario'] == null || $data['obraId'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = EstadosObraPersistence::create($data);
        return array('status' => $isOk, 'action' => 'create', 'message' => 'created');
    }

    function update($data) {

        if ($data['estadosObrasId'] == null || $data['titulo'] == null || $data['fecha'] == null || $data['comentario'] == null || $data['obraId'] == null ) {
            return array('status' => 'false', 'action' => 'update', 'message' => 'Null');
        }
        $isOk = EstadosObraPersistence::update($data);
        return array('status' => $isOk, 'action' => 'update', 'message' => 'update');
    }

    function delete($id) {

        $isOk = EstadosObraPersistence::delete($id);
        return array('status' => $isOk, 'action' => 'delete', 'message' => 'delete');
    }
}