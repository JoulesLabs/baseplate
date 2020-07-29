<?php


namespace App\Data\Auth;

use Spatie\DataTransferObject\DataTransferObject;

class Token extends DataTransferObject
{
    /**
     * @var string
     */
    public $token;
    /**
     * @var int
     */
    public $expires;
    /**
     * @var string
     */
    public $token_type;

    public static function make(string $token,int $expires)
    {
        return new self([
            'token'      => $token,
            'expires'    => $expires,
            'token_type' => 'bearer'
        ]);
    }
}
