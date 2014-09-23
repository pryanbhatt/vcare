// main.js
(function () {
    var session;
    //user agent configuration
    var configuration = {
        wsServers: 'wss://edge.sip.onsip.com',
        uri: '1@vcare.onsip.com',//'helios@vcare.onsip.com',
        authorizationUser: '1',//'Helios',
        password: '1', //'Helios',
        displayName: '1' //'Helios'
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
})();

