import 'package:flutter/material.dart';

class Settings extends StatefulWidget {
  Function(bool) mapChange;
  Function(bool) audioChange;

  Settings({Key key, this.mapChange, this.audioChange}) : super(key: key);

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

  //impostazione audio off / audio on
  bool audiooff= false;
  IconData audioIcon = Icons.volume_off;

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
                PopupMenuButton<String>(
                  icon: Icon(Icons.language),
                  tooltip: "Lingua",
                  onSelected: (result) => print(result),
                  itemBuilder: (BuildContext context) => <PopupMenuEntry<String>>[
                    const PopupMenuItem(
                      value: "en",
                      child: Text('English'),
                    ),
                    const PopupMenuItem(
                      value: "it",
                      child: Text('Italiano'),
                    ),
                  ],
                ),
                Padding(
                  padding: EdgeInsets.symmetric(horizontal: 4),
                ),
                IconButton(
                  icon: Icon(audioIcon),
                  tooltip: "Audio",
                  onPressed: () {
                    setState(() {
                      if(audiooff) {
                        audiooff = false;
                        audioIcon = Icons.volume_off;
                      } else {
                        audiooff = true;
                        audioIcon = Icons.volume_up;              
                      }
                      widget.audioChange(audiooff);
                    });
                  },
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