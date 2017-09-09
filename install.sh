#!/usr/bin/env bash
set -e
theme_loc='/usr/share/lightdm-webkit/themes/quad'

echo 'Removing existing theme...'
rm -rf "$theme_loc"
echo 'Building...'
npm run build
chown -R $(whoami) dist
cp -r dist "$theme_loc"

if [ "$1" == "--dev" ]
then
    lightdm-webkit2-greeter
fi
