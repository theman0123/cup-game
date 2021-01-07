aws s3 rm s3://cup-game --recursive
aws s3 cp ./webpack/dist s3://cup-game/ --recursive
aws s3 cp ./assets s3://cup-game/assets --recursive
