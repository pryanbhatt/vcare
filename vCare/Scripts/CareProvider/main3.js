/*
 * Check out the full guide at
 *   http://developer.onsip.com
 *
 * This sample uses
 *   http://sipjs.com/download/sip-0.6.2.min.js
 *
 * Open multiple copies of this demo to test
 */

// Customizable options here:
// *********************************************
// What room you want to use:
var room = "vcare-room";
// Your OnSIP Network Domain
var domain = 'vcare.onsip.com';
// user for Care provider
var user = 'cp';
// *********************************************

// Set global variables
var conf, myUa, firstAccept, localStream;
var localVideo = document.getElementById('local-video');
var remotes = document.getElementById('remote-video-container');
// Add a new stream
function newRemote(stream) {
    var node = document.createElement('video');
    remotes.appendChild(node);
    node.src = URL.createObjectURL(stream);
    node.play();
    return node;
}
// Remove a stream
function removeRemote(node) {
    node.parentNode.removeChild(node);
}

// Start the session when the start demo button is pressed and getUserMedia is complete
var startDemo = document.getElementById('start-demo');
startDemo.addEventListener('click', function () {
    if (!SIP.WebRTC.isSupported()) {
        alert("WebRTC unsupported!");
    }
    // Get user media call for media stream reuse
    SIP.WebRTC.getUserMedia({
        audio: true,
        video: true
    }, function (stream) {
        // Set the stream to global scope to be used later
        localStream = stream;

        localVideo.src = URL.createObjectURL(stream);
        localVideo.play();

        createMyUa();
        createConfUa();
    }, function () { });
}, false);

function createMyUa() {
    // Create a new UA for this client to use
    myUa = new SIP.UA('guest.' + room + '.' + user + '@' + domain);
    // When the UA is registered send a message to the room asking to be invited
    myUa.once('registered', function () {
        myUa.message(conf.configuration.uri, 'Invite me, please!');
    });
    // Alert the user if registration failed
    myUa.on('registrationFailed', function () {
        alert('Registration Failed');
    });
    // Add a new remote user to the room
    myUa.on('invite', myUaInviteReceived);
}

function myUaInviteReceived(session) {
    // When the new session is setup add the remote stream
    session.once('accepted', function () {
        this.data.remote = newRemote(this.getRemoteStreams()[0]);
    });
    // When a remote user leaves the room
    session.on('bye', function () {
        removeRemote(this.data.remote);
    });
    // When the session is accepted reuse the media stream
    session.accept({
        media: {
            stream: localStream
        }
    });
}

function createConfUa() {
    // Create a new UA for the conference
    conf = new SIP.UA('conf.' + room + '@' + domain);
    conf.on('message', confMessageReceived);
}

function confMessageReceived(message) {

    // Invite someone when they join the conference
    var invite = myUa.invite(message.remoteIdentity.uri.toString(), {
        media: {
            stream: localStream
        }
    });
    // When the invite is accepted on the conference add a new Remote
    invite.on('accepted', function () {
        this.data.remote = newRemote(this.getRemoteStreams()[0]);
    });
    // Remove the stream when someone leaves the conference
    invite.on('bye', function () {
        removeRemote(this.data.remote);
    });
}

// Stop the UA when the window is closed
window.onbeforeunload = function () {
    if (conf) {
        conf.stop();
    }
    if (myUa) {
        myUa.stop();
    }
};