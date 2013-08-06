var mailer = require('nodemailer');

var K_MAILTO_FROM       = 'mailto.from',
    K_MAILTO_SERVICE    = 'mailto.service',
    K_SMTP_HOST         = 'smtp.host',
    K_SMTP_PORT         = 'smtp.port',
    K_SMTP_SSL          = 'smtp.use-ssl',
    K_SMTP_IGNORE_TLS   = 'smtp.ignore-tls',
    K_SMTP_DOMAIN       = 'smtp.domain',
    K_SMTP_USERNAME     = 'smtp.username',
    K_SMTP_PASSWORD     = 'smtp.password';

function checkConfig(fpConfig) {

    var valid = true;

    function checkKey(k) {
        if (!(k in fpConfig)) {
            valid = false;
            process.stderr.write("error: missing required mailto config key '" + k + "'\n");
        }
    }

    checkKey(K_MAILTO_FROM);
    
    return valid;

}

function serverConfig(fpConfig) {

    var cfg = {};

    var map = {
        service             : K_MAILTO_SERVICE,
        host                : K_SMTP_HOST,
        port                : K_SMTP_PORT,
        secureConnection    : K_SMTP_SSL,
        ignoreTLS           : K_SMTP_IGNORE_TLS,
        name                : K_SMTP_DOMAIN
    };

    for (var k in map) {
        if (map[k] in fpConfig) {
            cfg[k] = fpConfig[map[k]];
        }
    }

    if ((K_SMTP_USERNAME in fpConfig) && (K_SMTP_PASSWORD in fpConfig)) {
        cfg.auth = {
            user: fpConfig[K_SMTP_USERNAME],
            pass: fpConfig[K_SMTP_PASSWORD]
        }
    }

    return cfg;

}

function connect(fpConfig) {
    return mailer.createTransport("SMTP", serverConfig(fpConfig));
}

function send(recipients, files, messageOptions, fpConfig, cb) {

    if (!checkConfig(fpConfig)) {
        return false;
    }

    var transport = connect(fpConfig);

    // For now just send one email per recipient
    // TODO: config option for BCC

    var remaining   = recipients.length, 
        status      = [];

    recipients.forEach(function(recipient) {

        var message = {
            from        : fpConfig[K_MAILTO_FROM],
            to          : recipient.address,
            subject     : messageOptions.subject || "File(s) attached",
            text        : 'Sent by friendpipe',
            attachments : []
        };

        files.forEach(function(f) {
            message.attachments.push({
                contents    : f.data,
                contentType : f.mimeType,
                fileName    : f.fileName
            });
        });

        (function(nickname, message) {
            transport.sendMail(message, function(err) {
                console.log(arguments);
                status.push({
                    error       : err,
                    nickname    : nickname,
                    address     : message.to
                });
                if (--remaining === 0) {
                    transport.close();
                    cb(status);
                }
            });
        })(recipient.nickname, message);
        
    });

}

exports.send = send;