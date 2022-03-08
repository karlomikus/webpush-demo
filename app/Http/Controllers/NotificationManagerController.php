<?php

declare(strict_types=1);

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Notifications\NewUserActivity;

class NotificationManagerController extends Controller
{
    public function subscribe(Request $req)
    {
        $user = User::find(1);

        $subscription = $user->updatePushSubscription(
            $req->post('endpoint'),
            $req->post('public_key'),
            $req->post('auth_token'),
            $req->post('encoding'),
        );

        return response()->json(['message' => 'Subscribed!']);
    }

    public function unsubscribe(Request $req)
    {
        $user = User::find(1);

        $user->deletePushSubscription($req->post('endpoint'));

        return response()->json(['message' => 'Unsubscribed!']);
    }

    public function send()
    {
        $user = User::find(1);
        $user->notify(new NewUserActivity());

        return redirect('/');
    }
}
