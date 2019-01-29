import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  Function(bool) mapChange;

  Settings({Key key, this.mapChange}) : super(key: key);

  @override
  State<StatefulWidget> createState() => SettingsState();
}

class SettingsState extends State<Settings> with TickerProviderStateMixin {
  AnimationController _controller;
  Animation _animation;

  bool _areOpened = false;

  //impostazione mappa stellite / mappa normale
  bool mapSatellite = false;
  IconData mapIcon = Icons.layers_clear;

  Animation<RelativeRect> panelAnimation;
  
  @override
  void initState() {
    super.initState();

    _controller = AnimationController(vsync: this, value: 1.0, duration: Duration(milliseconds: 250));

    _animation = CurvedAnimation(
      parent: _controller,
      curve: Interval(0.0, 1.0, curve: Curves.ease),
    );
  }

  _showSettings() {
    if(_areOpened) {
      print('reverse');
      _controller.reverse();
    } else {
      print('forward');
      _controller.forward();
    }
    _areOpened = !_areOpened;
  }

  @override
  Widget build(BuildContext context) {
    return Row(
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        ScaleTransition(
          scale: _animation,
          alignment: FractionalOffset.center,
          //rect: panelAnimation,
          child: Container(
            height: 50,
            margin: EdgeInsets.symmetric(horizontal: 16.0),
            decoration: BoxDecoration(
              color: Colors.amber,
              borderRadius: BorderRadius.all(Radius.circular(25))
            ),
            child: Row(
              children: <Widget>[
                IconButton(
                  icon: Text(
                    "IT",
                    style: TextStyle(
                      fontWeight: FontWeight.bold,
                      fontSize: 16.0
                    )
                  ),
                  tooltip: "Lingua",
                  onPressed: () {},
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4),
                ),
                IconButton(
                  icon: Icon(Icons.volume_up),
                  tooltip: "Audio",
                  onPressed: () {},
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4),
                ),
                IconButton(
                  icon: Icon(mapIcon),
                  tooltip: "Tipo mappa",
                  onPressed: () {
                    setState(() {
                      if(mapSatellite) {
                        mapSatellite = false;
                        mapIcon = Icons.layers_clear;
                      } else {
                        mapSatellite = true;
                        mapIcon = Icons.layers;              
                      }
                      widget.mapChange(mapSatellite);
                    });
                  },
                ),
              ],
            )
          ),
        ),
        FloatingActionButton(
          child: Icon(Icons.settings),
          onPressed: _showSettings,
          tooltip: "Impostazioni",
        ),
      ],
    );
  }
}