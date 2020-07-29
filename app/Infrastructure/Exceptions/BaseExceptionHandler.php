<?php

namespace App\Infrastructure\Exceptions;

use Throwable;

class BaseExceptionHandler extends \Exception
{
    public $details;

    public function __construct($message = "", string $details = null,$code = 0, Throwable $previous = null)
    {
        $this->details = $details;

        parent::__construct($message, $code, $previous);
    }
}
