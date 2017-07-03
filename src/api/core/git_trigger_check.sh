
branch=$1
MUST_TRIGGER=""

verifyTrigger () {
    git fetch
    MUST_TRIGGER=$(git diff --name-status $branch `origin/$branch`)
    if [ "$MUST_TRIGGER" = "" ]
    then
        exit 1
    else
        exit 0
    fi
}

verifyTrigger
