# PushApp
create a file firebaseKey.ts and add your Firebase Key in there (see firebaseKey.sample.ts)

## For android
https://stackoverflow.com/questions/56231223/cannot-find-symbol-import-com-google-firebase-iid-firebaseinstanceidservice-erro

Remove Nampespace Implementation

###Add 

in app.gradle
```
classpath 'com.android.tools.build:gradle:3.4.2'
classpath 'com.google.gms:google-services:4.2.0'
```

In project.properties
```
cordova.system.library.2=com.google.firebase:firebase-core:16.0.8
cordova.system.library.3=com.google.firebase:firebase-messaging:17.5.0
cordova.system.library.4=com.google.firebase:firebase-config:16.4.1
cordova.system.library.5=com.google.firebase:firebase-perf:16.2.4
cordova.system.library.6=androidx.annotation:annotation:1.0.0
```

Change gradle wrapper to 5.1.1





