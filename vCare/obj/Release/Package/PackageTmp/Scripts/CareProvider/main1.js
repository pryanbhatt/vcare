// main.js
function call(device) {
    var session1;
    var session2;

    var endButton = document.getElementById('endCall');
    endButton.addEventListener("click", function () {
        session1.bye();
        session2.bye();
        alert("Call Ended");
    }, false);

    //Creates the anonymous user agent so that you can make calls
    var userAgent1 = new SIP.UA({
        traceSip: true
    });

    var userAgent2 = new SIP.UA({
        traceSip: true
    });

    //here you determine whether the call has video and audio
    var options1 = {
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

    var options2 = {
        media: {
            constraints: {
                audio: true,
                video: true
            },
            render: {
                remote: {
                    video: document.getElementById('remoteVideo1')
                },
                local: {
                    video: document.getElementById('localVideo1')
                }
            }
        }
    };
    //makes the call
    //session = userAgent.invite('sip:1@vcare.onsip.com', options);
    session = userAgent1.invite('sip:1@vcare.onsip.com', options1);
    session = userAgent2.invite('sip:2@vcare.onsip.com', options2);

}

