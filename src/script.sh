
if [ -d "swish-ios" ]; then
	# Delete Folder
	rm -rf "swish-ios"
fi

git clone -b next "https://dannyyassine@bitbucket.org/dannyyassine/swish-ios.git"

cd "swish-ios"

. xcode_build_fabric.sh
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    