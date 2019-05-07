import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

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
  
  @override
  void initState(){
    super.initState();
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
                icon: Icon(Icons.close),
                onPressed:() {
                  setState(() {
                    widget.show();
                  });
                },
              )
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