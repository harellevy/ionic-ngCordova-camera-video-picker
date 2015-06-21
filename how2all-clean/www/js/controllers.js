angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
.controller('VideoUploadCtrl', ['$scope', '$ionicSideMenuDelegate', '$ionicModal', '$cordovaCamera', '$timeout', '$cordovaFileTransfer',
  function($scope, $ionicSideMenuDelegate, $ionicModal, $cordovaCamera, $timeout, $cordovaFileTransfer){
  document.addEventListener("deviceready", function () {

    var options = {
      destinationType: 1,
      sourceType: 0,
      mediaType: 1
    };
    $scope.videoState = false;
var upload_options = {};

    $scope.takeVideo = function(){
      console.log('takevideo');
        $cordovaCamera.getPicture(options).then(function (imageURI) {
          onImageSuccess(imageURI);

          function onImageSuccess(fileURI) {
            createFileEntry(fileURI);
          }

          function createFileEntry(fileURI) {
            //window.resolveLocalFileSystemURL(fileURI, copyFile, fail);
          }

          $scope.uploadFile('http://10.0.0.3:3000/s',imageURI, upload_options, true);

          //function copyFile(fileEntry) {
          //  var name = fileEntry.fullPath.substr(fileEntry.fullPath.lastIndexOf('/') + 1);
          //  var newName = makeid() + name;
          //  image.name = newName;
          //
          //  window.resolveLocalFileSystemURL(cordova.file.dataDirectory, function(fileSystem2) {
          //      fileEntry.copyTo(
          //        fileSystem2,
          //        newName,
          //        onCopySuccess,
          //        fail
          //      );
          //    },
          //    fail);
          //  //upload to S3
          //  upload(image);
          //}

          // 6
          //function onCopySuccess(entry) {
          //  $scope.$apply(function () {
          //    $scope.images.push(entry.nativeURL);
          //  });
          //}
          //
          //function fail(error) {
          //  console.log("fail: " + error.code);
          //}

          console.log(imageURI);
          $scope.playingVideo = imageURI;
          $cordovaCamera.cleanup().then(); // only for FILE_URI
        }, function (err) {
          // error
        });
    };


    // Create video player with selected video
    $scope.createVideoTag = function(element,src){
      if (!src) {
        src = 'file://media/external/documents/document/video:11457';
      }

      console.log(src);

      $(element).append('<video src="'+ src +'" controls></video>');
      console.dir($(element).html());
    };
    //$cordovaCamera.cleanup().then(); // only for FILE_URI


    // file upload
    $scope.uploadFile = function(server, fileUri){
      if (!upload_options)
        var upload_options = {};
      $cordovaFileTransfer.upload(server, fileUri, upload_options)
        .then(function(result) {
          // Success!
          console.log(result);
        }, function(err) {
          console.error(err);
        }, function (progress) {
          // constant progress updates
        });
    };



  }, false);
}])
.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
});