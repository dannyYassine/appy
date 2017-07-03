if [[ $(git diff --name-status master origin/master) ]]; then
    echo "there are files"
else
    echo "no files found"
fi