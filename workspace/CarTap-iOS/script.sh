git clone https://dannyyassine@bitbucket.org/dannyyassine/cartap.git

cd cartap

xcodebuild clean test \
  -workspace CarTap.xcworkspace \
  -scheme CarTap \
  -sdk iphonesimulator \
  -destination 'platform=iOS Simulator,name=iPhone 6,OS=10.3' \
  -only-testing:CarTapTests \
  | xcpretty