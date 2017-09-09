# quad
A simple clean theme for web-greeter with a procedurally generated background. Try out the live version to see for yourself!

![Alt text](screenshot.png?raw=true "Optional Title")
## Installation
Download the latest release, extract and run `$ sudo ./install.sh`. You will then need to set `webkit_theme=quad` in `/etc/lightdm/lightdm/lightdm-webkit2-greeter.conf`

## Installation from source
Requires `node` and `npm` to be installed.

First clone the repo `git clone git@github.com:jackdeadman/quad.git`

Then run `sudo ./install.sh`

Then update the theme in `/etc/lightdm/lightdm/lightdm-webkit2-greeter.conf`

## Developing
To make the developing experience more enjoyable the theme can be deployed in a browser as well as natively. To run the theme
in a browser run `npm run dev` this will start a webserver, the resulting page can be viewed at `http://localhost:8000`. This
command also starts a `livereload` server, if the livereload extension is enabled the webpage will automatically update on changes made to the source files.

To test the theme natively run `sudo ./install.sh --dev` this will install the theme and then open a window showing the theme.
See <https://github.com/jackdeadman/web-greeter> for more details on how to setup web-greeter for debugging.
