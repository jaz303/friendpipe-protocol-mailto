# friendpipe-protocol-mailto

SMTP email support for [friendpipe](https://github.com/jaz303/friendpipe).

## Installation

First, ensure `friendpipe` is installed. Then:

	$ npm install -g friendpipe-protocol-mailto

## Configuration

	$ friend set mailto.from jason@onehackoranother.com
	$ friend set smtp.service Gmail
	$ friend set smtp.username example@gmail.com
	$ friend set smtp.password XXXXXXX

### Supported configuration keys

Configure these with `$ friend set key value`.

  * `mailto.from`: from address
  * `smtp.service`: preconfigured SMTP service, such as `Gmail` or `Hotmail`. See [Nodemailer](https://github.com/andris9/Nodemailer) documentation for further information
  * `smtp.username`: auth username.
  * `smtp.password`: auth password. __Warning__: currently stored as cleartext!

The following options are not required if using a preconfigured service via the `smtp.service` option.

  * `smtp.host`
  * `smtp.port`
  * `smtp.use-ssl`
  * `smtp.ignore-tls`
  * `smtp.domain`
