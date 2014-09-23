// main.js
function called(dev) {
    var session;
    //user agent configuration
    var configuration = {
        wsServers: 'wss://edge.sip.onsip.com',
        uri: dev + '@vcare.onsip.com',//'helios@vcare.onsip.com',
        authorizationUser: dev,//'Helios',
        password: dev, //'Helios',
        displayName: dev //'Helios'
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

