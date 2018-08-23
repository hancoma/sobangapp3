/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var telephone_number; // 전화번호 전역 함수 
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
     //  window.plugins.sim.getSimInfo(successCallback, errorCallback);
       document.addEventListener("backbutton", exit_show, false);
        app.receivedEvent('deviceready');

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    
            app.onmain();
    },

    onmain : function() {

         var reg_id=device.uuid;
       // 기기 번호 검출 
          console.log('Received Event: ' + reg_id);

          push = PushNotification.init({
    android: {
        senderID: "443120016956"
    },
    browser: {
        pushServiceURL: 'http://push.api.phonegap.com/v1/push'
    },
    ios: {
        alert: "true",
        badge: "true",
        sound: "true"
    },
    windows: {}
});
          PushNotification.hasPermission(function(data) {
    if (data.isEnabled) {
        console.log('isEnabled');
    }
});


push.on('registration', function(data) {
    console.log(data.registrationId);
   // alert(data.registrationId);
    json_call(data.registrationId);
   var ref = cordova.InAppBrowser.open('http://sobangapp.cafe24.com/', '_blank', 'location=no');
   ref.addEventListener('exit', function(event) { exit_show(); });
});

push.on('notification', function(data) {
//  alert(data.message);
 // display_call_info(data.message);
  alert_msg("알람",data.message);
 
 
    
   
});

push.on('error', function(e) {
    // e.message
    alert_msg("경고",e.message);
});


  

        
    }

};
  



function json_call(reg_id) {
      var reg_id=reg_id;
      var deviceid=device.uuid;
       
         $.post("http://ku4h.com/gcm_reg_app3.php",
   {
    reg_id:reg_id,
    deviceid:deviceid
   },
   function(data){
    var data;
    
   //  alert("ok");
   })
       } 


function alert_msg(title,msg) {
    var title=title;
    var msg=msg;
   navigator.notification.alert(
    msg,  // message
    alertDismissed,         // callback
    title,            // title
    '확인'                  // buttonName
);
}
 
// 종류
function exit_show() {
navigator.notification.confirm("종료하시겠습니까? ", onConfirm, "확인", "예,아니요"); 
}

function onConfirm(button) {
    if(button==2){//If User selected No, then we just do nothing
        var ref = cordova.InAppBrowser.open('http://sobangapp.cafe24.com/', '_blank', 'location=no');
          ref.addEventListener('exit', function(event) { exit_show(); });
    }else{
        navigator.app.exitApp();// Otherwise we quit the app.
    }
}