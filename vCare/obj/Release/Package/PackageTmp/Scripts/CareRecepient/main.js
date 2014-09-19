// main.js
(function () {
    var session;
    //user agent configuration
    var configuration = {
        wsServers: 'wss://edge.sip.onsip.com',
        uri: 'phoenix@vcare.onsip.com',//'helios@vcare.onsip.com',
        authorizationUser: 'Phoenix',//'Helios',
        password: 'Phoenix', //'Helios',
        displayName: 'Phoenix' //'Helios'
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

