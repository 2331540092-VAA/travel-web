<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;
use App\Models\Booking;

class BookingSuccessMail extends Mailable
{
    use Queueable, SerializesModels;

    public $booking;
    public $tour;

    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct(Booking $booking, $tour = null)
    {
        $this->booking = $booking;
        $this->tour = $tour;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->subject('Xác nhận đặt dịch vụ thành công - Travel SE Asia')
                    ->view('emails.booking_success');
    }
}
