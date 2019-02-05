import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:proloco_crema_app/topbar.dart';
import 'settings.dart';
//import 'top_bar.dart';

bool isFocused = false;

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
              mapType: MapType.normal
            ),
          ),
          GestureDetector(
            onTap: (){
              FocusScope.of(context).requestFocus(new FocusNode());
            },
          ),
          SafeArea(
            child: TopBar(),
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