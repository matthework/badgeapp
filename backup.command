#!/bin/bash
#this is a comment-the first line sets bash as the shell script

SCRIPT_DIR="$( cd "$( dirname "$0" )" && pwd )"
echo "$SCRIPT_DIR"

cd $SCRIPT_DIR;

mkdir $(date '+%Y.%m.%d');

cd $(date '+%Y.%m.%d');

mongoexport -h ds017664-a1.mlab.com:17664 -d heroku_58200141 -c badge -u badge -p badgeps -o badge.json;

mongoexport -h ds017664-a1.mlab.com:17664 -d heroku_58200141 -c badgeset -u badge -p badgeps -o badgeset.json

mongoexport -h ds017664-a1.mlab.com:17664 -d heroku_58200141 -c staff -u badge -p badgeps -o staff.json

mongoexport -h ds017664-a1.mlab.com:17664 -d heroku_58200141 -c tier -u badge -p badgeps -o tier.json

exit;