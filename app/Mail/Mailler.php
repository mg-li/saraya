<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\CustomerReservation;

class Mailler extends Mailable
{
    use Queueable, SerializesModels;

    public $template;
    public $subject;
    public $customerReservation;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(String $template, String $subject, CustomerReservation $customerReservation)
    {
        $this->template = $template;
        $this->subject = $subject;
        $this->customerReservation = $customerReservation;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->from('system@H2.com')
                    ->subject($this->subject)
                    ->text($this->template);
    }
}
