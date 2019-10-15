package com.download;

import android.app.DownloadManager;
import android.app.DownloadManager.Request;
import android.content.Context;
import android.app.Activity;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Environment;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;


public class DownloadApk extends ReactContextBaseJavaModule {

    public static String description;

    DownloadManager downManager;
    Activity myActivity;

    public DownloadApk( ReactApplicationContext reactContext ) {
        super( reactContext );
    }

    @Override
    public String getName() {
        return "DownloadApk";
    }

    @ReactMethod
    public void downloading( String url, String title, String description ) {

        DownloadApk.description = description;

        myActivity = getCurrentActivity();
        downManager = ( DownloadManager ) myActivity.getSystemService( Context.DOWNLOAD_SERVICE );
        Uri uri = Uri.parse( url );
        DownloadManager.Request request = new Request( uri );


        // request.setAllowedNetworkTypes(DownloadManager.Request.NETWORK_MOBILE | DownloadManager.Request.NETWORK_WIFI);
        // 设置允许使用的网络类型，这里是wifi可以
        request.setAllowedNetworkTypes( Request.NETWORK_WIFI );

        // 设置通知栏标题
        request.setNotificationVisibility( Request.VISIBILITY_VISIBLE );
        request.setMimeType( "application/vnd.android.package-archive" );
        if ( title == null || "".equals( title )) {
            request.setTitle( "更新" );
        } else {
            request.setTitle( title );
        }
        if ( description == null || "".equals( description )) {
            description = "最新版安装包";
        }

        request.setDescription( description );
        request.setAllowedOverRoaming( false );

        // 设置文件存放目录
        request.setDestinationInExternalFilesDir( myActivity, Environment.DIRECTORY_DOWNLOADS, description );

        long downloadid = downManager.enqueue( request );
        SharedPreferences sPreferences = myActivity.getSharedPreferences( "ggfw_download", 0 );
        sPreferences.edit().putLong( "ggfw_download_apk", downloadid ).commit();
    }
}
