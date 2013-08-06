# friendpipe-protocol-mailto

## Supported configuration options

Configure these with `$ friend set key value`.

  * `mailto.from`: from address
  * `mailto.service`: preconfigured SMTP service, such as `Gmail` or `Hotmail`. See [Nodemailer](https://github.com/andris9/Nodemailer) documentation for further information
  * `smtp.username`: SMTP username.
  * `smtp.password`: SMTP. __Warning__: currently stored as cleartext!

The following options are not required if using a preconfigured service via the `mailto.service` option.

  * `smtp.host`
  * `smtp.port`
  * `smtp.use-ssl`
  * `smtp.ignore-tls`
  * `smtp.domain`
