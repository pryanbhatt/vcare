// main.js
function setup(camera) {
    var session;
    //user agent configuration
    var configuration = {
        wsServers: 'wss://edge.sip.onsip.com',
        uri: camera + '@vcare.onsip.com',//'helios@vcare.onsip.com',
        authorizationUser: camera,//'Helios',
        password: camera, //'Helios',
        displayName: camera //'Helios'
    };

    var userAgent = new SIP.UA(configuration);

    userAgent.on('invite', function (incomingSession) {
        session = incomingSession;
        session.accept({
            media: {
                render: {
                    remote: {
                        video: document.getElementById('remoteVideo')
                    },
                    local: {
                        video: document.getElementById('localVideo')
                    }
                }
            }
        });
    });
}

