import 'package:flutter/material.dart';

class TopBar extends StatefulWidget {
  Function onRoutesButtonClicked;

  TopBar({Key key, this.onRoutesButtonClicked}) : super(key: key);

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
    return Container(
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
              Flexible(
                child: Padding(
                  padding: EdgeInsets.only(left: 10.0),
                  child: TextField(
                    decoration: InputDecoration.collapsed(
                      hintText: "Cerca",
                      hintStyle: TextStyle(
                        fontSize: 20
                      )
                    ),
                  ),
                ),
              ),
              IconButton(
                icon: Icon(Icons.directions_run),
                tooltip: "Percorsi",
                splashColor: Colors.transparent,
                highlightColor: Colors.transparent,
                onPressed: () => widget.onRoutesButtonClicked() ,
              ),
              IconButton(
                icon: Icon(Icons.account_balance),
                tooltip: "Monumenti",
                splashColor: Colors.transparent,
                highlightColor: Colors.transparent,
                onPressed: () => print("places"),
              )
            ],
          ),
        ],
      )
    );
  }
}