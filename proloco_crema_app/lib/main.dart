import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'settings.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'allTranslations.dart';

Future main() async {
  await allTranslations.init();

  runApp(new MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'City Tour',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
      ],
      supportedLocales: allTranslations.supportedLocales(),
      home: new MainPage(),
    );
  }
}

class MainPage extends StatefulWidget {
  MainPage({Key key}) : super(key: key);

  @override
  MainPageState createState() => new MainPageState();
}

class MainPageState extends State<MainPage> {
  GoogleMapController _controller;

  void _onMapCreated(GoogleMapController controller) {
    _controller = controller;
    print('map created');
  }

  void _onSettingsButtonPressed() {
    print('settings button pressed');
  }

  @override
    void initState(){
        super.initState();

        // Initializes a callback should something need 
        // to be done when the language is changed
        allTranslations.onLocaleChangedCallback = _onLocaleChanged;
    }

    _onLocaleChanged() async {
        // do anything you need to do if the language changes
        print('Language has been changed to: ${allTranslations.currentLanguage}');
    }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: GoogleMap(
        onMapCreated: _onMapCreated,
        options: GoogleMapOptions(
          mapType: MapType.normal
        ),
      ),
      floatingActionButton: Settings(mapChange: (mapSatellite) {
        setState(() {
          if(mapSatellite) {
            _controller..updateMapOptions(GoogleMapOptions(
              mapType: MapType.satellite
            ));
            print("map changed to satellite view");
          } else {
            _controller..updateMapOptions(GoogleMapOptions(
              mapType: MapType.normal
            ));
            print("map changed to normal view");
          }
        });
      }, audioChange: (audiooff){

      }),
    );
  }
}