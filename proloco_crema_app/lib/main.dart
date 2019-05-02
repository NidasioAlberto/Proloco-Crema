import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'topbar.dart';
import 'settings.dart';
import 'routescard.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'allTranslations.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'monumentscard.dart';
import 'monumentsDescriptionCard.dart';

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
  bool pathsCardVisible = false;
  bool monumentsCardVisible =false;
  bool monumentsDescriptionCardVisible = false;

  void _onMapCreated(GoogleMapController controller) {
    _controller = controller;
    print('map created');
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
  
  String language = allTranslations.currentLanguage;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Stack(
        children: <Widget>[
          GoogleMap(
            onMapCreated: _onMapCreated,
            options: GoogleMapOptions(
              mapType: MapType.normal,
              cameraPosition:  CameraPosition(
                target:  LatLng(45.364171, 9.682941),
                zoom: 11.0,
              ),
            ),
          ),
          
          SafeArea(
            child: Column(
              children: <Widget>[
                TopBar(onRoutesButtonClicked: () {
                    setState(() {
                      pathsCardVisible = !pathsCardVisible; 
                      monumentsCardVisible = false;
                      
                    });
                  },
                  onMonumentsButtonClicked: (){
                    setState(() {
                      monumentsCardVisible = !monumentsCardVisible;
                      pathsCardVisible = false;
                    });
                  },
                ),
                Visibility(
                  child: RouteCard(addMarker:(DocumentSnapshot ds){
                    _controller.moveCamera(CameraUpdate.newLatLng(LatLng(ds['address']['geopoint'].latitude, ds['address']['geopoint'].longitude)));
                    pathsCardVisible = false;
                    _controller.clearMarkers();
                    setState(() {
                      
                    });
                    _controller.addMarker(
                      MarkerOptions(
                        position: LatLng(ds['address']['geopoint'].latitude, ds['address']['geopoint'].longitude),
                        draggable: false,
                        infoWindowText: InfoWindowText(ds['title'], ds['descriptions'][0][language]),
                      )
                    );
                  }),
                  visible: pathsCardVisible,
                ),
                Visibility(
                  child: MonumentsCard(placeMarker:(DocumentSnapshot ds){
                   _controller.moveCamera(CameraUpdate.newLatLng(LatLng(ds['address']['geopoint'].latitude, ds['address']['geopoint'].longitude)));
                    monumentsCardVisible = false;
                    _controller.clearMarkers();
                    setState(() {
                      
                    });
                    _controller.addMarker(
                      MarkerOptions(
                        position: LatLng(ds['address']['geopoint'].latitude, ds['address']['geopoint'].longitude),
                        draggable: false,
                        infoWindowText: InfoWindowText(ds['title'], ds['descriptions'][0][language]),
                      ),
                    );
                  }),
                  visible: monumentsCardVisible,
                ),
                Visibility(
                  child: MonumentDescriptionCard(),
                  visible: monumentsDescriptionCardVisible,
                )
              ],
            )
          ),
        ],
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

      }, languageChange: (language){
        this.language = language;
        setState((){});
      }),
    );
  }
}