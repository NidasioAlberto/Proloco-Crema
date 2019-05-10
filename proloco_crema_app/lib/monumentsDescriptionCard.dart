import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'allTranslations.dart';
import 'package:url_launcher/url_launcher.dart';

class MonumentDescriptionCard extends StatefulWidget {

  Function show;
  DocumentSnapshot data;

  MonumentDescriptionCard({Key key, this.show, this.data}) : super(key: key);

  @override
  _MonumentDescriptionCardState createState() {
    return _MonumentDescriptionCardState();
  }
}

class _MonumentDescriptionCardState extends State<MonumentDescriptionCard>{
  
  DocumentSnapshot data;

  @override
  void initState(){
    super.initState();
    data = widget.data;
  }

  _launchURL() async {
    String destination = data['address']['geopoint'].latitude.toString()+','+data['address']['geopoint'].longitude.toString();
    print(destination);
      const url = 'https://www.google.com/maps/dir/?api=1&origin=&destination=';
      String sito = url+destination +'&travelmode=walking';
      if (await canLaunch(sito)) {
        await launch(sito);
      } else {
        throw 'Could not launch $sito';
      }
    }

  @override
  Widget build(BuildContext context) {
    return Container(
      margin:EdgeInsets.symmetric(horizontal: 16),
      height: 400,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(8))
      ),
      child: Stack(
        children: <Widget>[
          Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.local_airport),
                tooltip: allTranslations.text('travel_tooltip'),
                splashColor: Colors.transparent,
                highlightColor: Colors.transparent,
                onPressed: () =>_launchURL(),
              ),
              IconButton(
                icon: Icon(Icons.close),
                onPressed:() {
                  setState(() {
                    widget.show();
                  });
                },
              ),
            ],
          ),
          Column (
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
              Image.network(widget.data['photoUrl'], width: 128, height: 128),
              Container(
                child: Text(widget.data['title'], style: TextStyle(fontSize: 24)),
                margin: EdgeInsets.fromLTRB(8, 8, 0, 0),
              ),
              Container(
                child: Text(widget.data['address']['title'], style: TextStyle(fontSize: 14)),
                margin: EdgeInsets.fromLTRB(8, 8, 0, 0),
              ),
              Container(
                child: Text(widget.data['descriptions'][widget.data['defaultDescription']]['it'], style: TextStyle(fontSize: 14)),
                margin: EdgeInsets.fromLTRB(8, 8, 0, 0),
              )
            ],
          )
        ],
      )
    );
  }
}