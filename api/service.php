<?php 
require 'guide.php';


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

$configuration = [
    'settings' => [
        'displayErrorDetails' => true,
    ],
];
$c = new \Slim\Container($configuration);
$app = new \Slim\App($c);

/**
 * WS hace login.
 */

$app->post('/login', 
function (Request $request, Response $response) {

    $login = $request->getParsedBody();
    $rut = $login['rut'];
    $pass = $login['pass'];
    $response = $response->withJson(UserController::doLogin($rut, $pass));
    return $response;
});

/**
 * WS hace logout
 */
$app->delete('/logout/{token}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $token = $args['token'];
            $response = $response->withJson(UserController::logOut($token));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});

$app->get('/user', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $response = $response->withJson(UserController::getAll());
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/user/id/{rut}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $rut = $args['rut'];
        $response = $response->withJson(UserController::getById($rut));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->post('/user/create', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(UserController::create($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->put('/user/update', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(UserController::update($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->delete('/user/delete/{rut}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $rut = $args['rut'];
            $response = $response->withJson(UserController::delete($rut));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});


/**
 * 
 * 
 * EMPRESA WS 
 * 
 * 
 */

$app->get('/empresa', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $response = $response->withJson(EmpresaController::getAll());
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/empresa/id/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(EmpresaController::getById($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->post('/empresa/create', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(EmpresaController::create($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->put('/empresa/update', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(EmpresaController::update($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->delete('/empresa/delete/{id}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $id = $args['id'];
            $response = $response->withJson(EmpresaController::delete($id));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});


/**
 * 
 * Proyectos WS
 * 
 */

$app->get('/proyecto', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $response = $response->withJson(ProyectoController::getAll());
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/proyecto/id/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(ProyectoController::getById($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/proyecto/empresa/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(ProyectoController::getAllByEmpresaId($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->post('/proyecto/create', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(ProyectoController::create($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->put('/proyecto/update', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(ProyectoController::update($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->delete('/proyecto/delete/{id}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $id = $args['id'];
            $response = $response->withJson(ProyectoController::delete($id));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});


/**
 * 
 * Obras WS 
 * 
 * 
 */
$app->get('/obra', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $response = $response->withJson(ObraController::getAll());
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/obra/id/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(ObraController::getById($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/obra/proyecto/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(ObraController::getAllByProyectoId($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->post('/obra/create', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(ObraController::create($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->put('/obra/update', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(ObraController::update($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->delete('/obra/delete/{id}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $id = $args['id'];
            $response = $response->withJson(ObraController::delete($id));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});


/**
 * 
 * 
 * Estados Obras WS
 * 
 */
$app->get('/estados', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $response = $response->withJson(EstadosObraController::getAll());
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/estados/id/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(EstadosObraController::getById($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->get('/estados/obra/{id}', function (Request $request, Response $response, array $args) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {

        $id = $args['id'];
        $response = $response->withJson(EstadosObraController::getAllByObraId($id));
        return $response;
    } else {

        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->post('/estados/create', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(EstadosObraController::create($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->put('/estados/update', 
function (Request $request, Response $response) {

    $token_header = $request->getHeaderLine('authorization-x');
    if (UserController::validateToken($token_header)) {
        $data = $request->getParsedBody();
        $response = $response->withJson(EstadosObraController::update($data));
        return $response;
    } else {
        return $response->withStatus(203)
                        ->withHeader('Content-Type', 'text/html')
                        ->write('203 Non-Authoritative Information. (authorization-x)');
    }
});

$app->delete('/estados/delete/{id}', 
    function (Request $request, Response $response, array $args) {
        $token_header = $request->getHeaderLine('authorization-x');
        if (UserController::validateToken($token_header)) {

            $id = $args['id'];
            $response = $response->withJson(EstadosObraController::delete($id));
            return $response;
        } else {
            return $response->withStatus(203)
                            ->withHeader('Content-Type', 'text/html')
                            ->write('203 Non-Authoritative Information. (authorization-x)');
        }
});


$app->run();
