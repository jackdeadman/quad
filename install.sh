#!/usr/bin/env bash
set -e
theme_loc='/usr/share/lightdm-webkit/themes/quad'

echo 'Removing existing theme...'
rm -rf "$theme_loc"
cp -r ./ "$theme_loc"

