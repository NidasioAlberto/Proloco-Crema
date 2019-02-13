import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'topbar.dart';
import 'settings.dart';
import 'routescard.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'City Tour',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
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

  void _onMapCreated(GoogleMapController controller) {
    _controller = controller;
    print('map created');
  }

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
          GestureDetector(
            onTap: (){
              FocusScope.of(context).requestFocus(new FocusNode());                
            },
          ),
          SafeArea(
            child: Column(
              children: <Widget>[
                TopBar(onRoutesButtonClicked: () {
                    setState(() {
                      pathsCardVisible = !pathsCardVisible; 
                    });
                  },
                ),
                Visibility(
                  child: RouteCard(addMarker:(){
                    _controller.addMarker(
                      MarkerOptions(
                        position: LatLng(45.355139, 9.683000),
                      )
                    );
                  }),
                  visible: pathsCardVisible,
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
      },),
    );
  }
}