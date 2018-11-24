<?php

class ArchivoController{

    function getById($id) {

        return ArchivoPersistence::getById($id);
    }

    function getImagenById($id) {
        $dataFile = ArchivoPersistence::getById($id);
      
        return $dataFile['archivos'];
    }

    function getAllByEstadoId($id) {

        return ArchivoPersistence::getAllByEstadoId($id);
    }

    function getAll() {

        return ArchivoPersistence::getAll();
    }

    function create($data) {

        if ($data['archivos'] == null || $data['comentario'] == null || $data['tipoArchivo'] == null || $data['estadosObrasId'] == null ) {
            return array('status' => 'false', 'action' => 'create', 'message' => 'Null');
        }
        $isOk = ArchivoPersistence::create($data);
        return array('status' => $isOk, 'action' => 'create', 'message' => 'created');
    }

    function update($data) {

        if ($data['fotoid'] == null || $data['archivos'] == null || $data['comentario'] == null || $data['tipoArchivo'] == null || $data['estadosObrasId'] == null ) {
            return array('status' => 'false', 'action' => 'update', 'message' => 'Null');
        }
        $isOk = ArchivoPersistence::update($data);
        return array('status' => $isOk, 'action' => 'update', 'message' => 'update');
    }

    function delete($id) {

        $isOk = ArchivoPersistence::delete($id);
        return array('status' => $isOk, 'action' => 'delete', 'message' => 'delete');
    }
}