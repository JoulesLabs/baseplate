<?php

namespace App\Exceptions;

use App\Infrastructure\Exceptions\BaseExceptionHandler;
use Exception;
use Throwable;
use Illuminate\Database\QueryException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Validation\ValidationException;

class Handler extends ExceptionHandler
{
    private static $exceptionCodes = [
        Response::HTTP_BAD_REQUEST,
        Response::HTTP_UNAUTHORIZED,
        Response::HTTP_PAYMENT_REQUIRED,
        Response::HTTP_FORBIDDEN,
        Response::HTTP_NOT_FOUND,
        Response::HTTP_METHOD_NOT_ALLOWED,
        Response::HTTP_NOT_ACCEPTABLE,
        Response::HTTP_REQUEST_TIMEOUT,
        Response::HTTP_TOO_MANY_REQUESTS,
        Response::HTTP_UNPROCESSABLE_ENTITY,
        Response::HTTP_INTERNAL_SERVER_ERROR,
        Response::HTTP_NOT_IMPLEMENTED,
        Response::HTTP_BAD_GATEWAY,
        Response::HTTP_GATEWAY_TIMEOUT
    ];

    private static $defaultExceptionMessage = 'Sorry something went wrong.';

    private static $defaultExceptionCode = 422;
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * @param Request $request
     * @param Throwable $exception
     * @return \Symfony\Component\HttpFoundation\Response
     */
    public function render($request, Throwable $exception)
    {
        $message = $exception->getMessage();
        $content = null;

        if($exception instanceof ValidationException) {
            $content = $exception->errors();
        } elseif ($exception instanceof QueryException) {
            $message = $exception->errorInfo[2] ?? self::$defaultExceptionMessage;
            $content = $message;
        } else {
            $content = $message;
        }

        if(config('app.env') === 'production') {
            $meta = [
                'file'        => $exception->getFile(),
                'line'        => $exception->getLine(),
            ];
            $content = array_merge(is_array($content) ? $content : [],$meta);
        }

        $details = $exception instanceof BaseExceptionHandler ? $exception->details : self::$defaultExceptionMessage;

        if ( !$content )
            $content = self::$defaultExceptionMessage;

        if ( !$message )
            $message = self::$defaultExceptionMessage;

        $httpCode = $exception->getCode();

        if(in_array($httpCode,self::$exceptionCodes,true) === false)
            $httpCode = self::$defaultExceptionCode;

        return res()
                ->status(false)
                ->message($message)
                ->details($details)
                ->content($content,'errors')
                ->code($httpCode)
                ->send();
    }
}
