// main.js
function callDevice(dev) {
    var session;

    var endButton = document.getElementById('endCall');
    endButton.addEventListener("click", function () {
        session.bye();
        alert("Call Ended");
    }, false);

    //Creates the anonymous user agent so that you can make calls
    var userAgent = new SIP.UA({
        traceSip: true
    });

    //here you determine whether the call has video and audio
    var options = {
        media: {
            constraints: {
                audio: true,
                video: true
            },
            render: {
                remote: {
                    video: document.getElementById('remoteVideo')
                },
                local: {
                    video: document.getElementById('localVideo')
                }
            }
        }
    };
    //makes the call
    //session = userAgent.invite('sip:helios@vcare.onsip.com', options); // 
    session = userAgent.invite('sip:' + device + '@vcare.onsip.com', options);
}