import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';

class RouteCard extends StatefulWidget {

  Function addMarker;

  RouteCard({Key key, this.addMarker}) : super(key: key);

  @override
  _RouteCardState createState(){
    return _RouteCardState();
  }
}

class _RouteCardState extends State<RouteCard>{
  @override
  void initState(){
    super.initState();
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
      child: _buildBody(context),
    );
  }

  Widget _buildBody(BuildContext context) {
    int i = 0;
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection('Paths').orderBy('title').snapshots(),
      builder: (context, snapshot) {
        return ListView.builder(
          itemBuilder: ( contextt ,index){
            return new Card(
              child: InkWell(
                child: new Container(
                height: 35,
                child: new Row(
                  children: <Widget>[
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(snapshot.data.documents[index]['title']['it']),
                        Text(snapshot.data.documents[index]['description']['it'],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 0.75)),
                      ],
                    )
                  ],
                ),
              ),
              onTap:() => widget.addMarker(),
              ),
            );
          },
          itemCount: snapshot.data.documents.length,
        );
      },
    );
  }
}