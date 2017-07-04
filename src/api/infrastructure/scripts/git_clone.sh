
branch=$1
repo=$2

gitClone () {
    git clone -b $branch $repo job
}

gitClone
