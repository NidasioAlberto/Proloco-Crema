import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'allTranslations.dart';

class MonumentsCard extends StatefulWidget {
  @override
  _MonumentsCardState createState(){
    return _MonumentsCardState();
  }
}

class _MonumentsCardState extends State<MonumentsCard>{
  @override
  void initState(){
    super.initState();
  }
  
  String language = allTranslations.currentLanguage;

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
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection('Places').orderBy('title').snapshots(),
      builder: (context, snapshot) {
        switch(snapshot.hasData){
          case true:return ListView.builder(
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
                        Text(snapshot.data.documents[index]['title']),
                        Text(snapshot.data.documents[index]['descriptions'][0][language],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 0.75)),
                      ],
                    )
                  ],
                ),
              ),
              ),
            );            
          },
          itemCount: snapshot.data.documents.length,
        );
        default: return Container(
          height: 35,
          child: new Row(
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: <Widget>[
                  Text('Loading...'),
                ],
              )
            ],
          ),
        );
        }
      },
    );
  }
}