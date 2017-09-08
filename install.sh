#!/usr/bin/env bash
set -e
theme_loc='/usr/share/lightdm-webkit/themes/jack-simple'

echo 'Removing existing theme...'
rm -rf "$theme_loc"
echo 'Building...'
npm run build
cp -r dist "$theme_loc"

if [ "$1" == "--dev" ]
then
    lightdm-webkit2-greeter
fi
