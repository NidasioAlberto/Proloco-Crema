import 'package:flutter/material.dart';
import 'allTranslations.dart';

class TopBar extends StatefulWidget {
  Function onRoutesButtonClicked;
  Function onMonumentsButtonClicked;
  Function onHelpButtonClicked;

  TopBar({Key key, this.onRoutesButtonClicked,this.onMonumentsButtonClicked,this.onHelpButtonClicked}) : super(key: key);

  @override
  _TopBarState createState() {
    return _TopBarState();
  }
}

class _TopBarState extends State<TopBar> {

  @override
  void initState() {
    super.initState();
  }

  @override
  Widget build(BuildContext context) {

    
    return new Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      mainAxisAlignment: MainAxisAlignment.end,
      children: <Widget>[
        Container(
          width: 155,
          padding: EdgeInsets.all(4),
          margin: EdgeInsets.all(16),
          decoration: BoxDecoration(
            color: Colors.white,
            borderRadius: BorderRadius.all(Radius.circular(8))
          ),
          child: Stack(
            children: <Widget>[
              //topBarContent,
              Row(
                mainAxisSize: MainAxisSize.max,
                mainAxisAlignment: MainAxisAlignment.end,
                crossAxisAlignment: CrossAxisAlignment.center,
                children: <Widget>[
                  IconButton(
                    icon: Icon(Icons.help),
                    tooltip: allTranslations.text('help_tooltip'),
                    splashColor: Colors.transparent,
                    highlightColor: Colors.transparent,
                    onPressed: () => widget.onHelpButtonClicked() ,
                  ),
                  IconButton(
                    icon: Icon(Icons.directions_run),
                    tooltip: allTranslations.text('route_tooltip'),
                    splashColor: Colors.transparent,
                    highlightColor: Colors.transparent,
                    onPressed: () => widget.onRoutesButtonClicked() ,
                  ),
                  IconButton(
                    icon: Icon(Icons.account_balance),
                    tooltip: allTranslations.text('place_tooltip'),
                    splashColor: Colors.transparent,
                    highlightColor: Colors.transparent,
                    onPressed: () => widget.onMonumentsButtonClicked(),
                  )
                ],
              ),
            ],
          )
        )
      ],
    );
  }
}