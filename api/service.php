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





$app->run();
