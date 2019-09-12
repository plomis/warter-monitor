package com.watermonitor;

import com.facebook.react.ReactActivity;

// SplashScreen
import android.os.Bundle; // here
import org.devio.rn.splashscreen.SplashScreen; // here

// react-mavigation
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView;

public class MainActivity extends ReactActivity {

  @Override
  protected void onCreate( Bundle savedInstanceState ) {
    SplashScreen.show( this, R.style.SplashScreenTheme );  // here
    super.onCreate( savedInstanceState );
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "WaterMonitor";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegate( this, getMainComponentName()) {
      @Override
      protected ReactRootView createRootView() {
        return new RNGestureHandlerEnabledRootView( MainActivity.this );
      }
    };
  }

}
