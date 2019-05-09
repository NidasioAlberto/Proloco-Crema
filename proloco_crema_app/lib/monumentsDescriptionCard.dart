import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class MonumentDescriptionCard extends StatefulWidget {

  Function show;
  DocumentSnapshot data;

  MonumentDescriptionCard({Key key, this.show,this.data}) : super(key: key);

  @override
  _MonumentDescriptionCardState createState(){
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

  @override
  Widget build(BuildContext context){
    return Container(
      margin:EdgeInsets.symmetric(horizontal: 16),
      height: 400,
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.all(Radius.circular(8))
      ),
      child: Stack(
        children: <Widget>[
          new Row(
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.end,
            children: <Widget>[
              IconButton(
                icon: Icon(Icons.location_searching),
                onPressed:(){
                  widget.show();
                  setState(() {
                    
                  });
                },
              )
            ],
          ),
          new Row(
            children: <Widget>[
              Text(data['title'])
            ],
          )
        ],
      )
    );
  }
}