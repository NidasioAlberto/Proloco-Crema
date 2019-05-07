import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'allTranslations.dart';

class MonumentsCard extends StatefulWidget {

  Function placeMarker;

  MonumentsCard({Key key, this.placeMarker}) : super(key: key);

  @override
  _MonumentsCardState createState(){
    return _MonumentsCardState();
  }
}

class _MonumentsCardState extends State<MonumentsCard> {
  @override
  void initState(){
    super.initState();
  }
  
  String language = allTranslations.currentLanguage;

  @override
  Widget build(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16),
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
        if(snapshot.hasData) {
          return ListView.builder(
            itemBuilder: (contextt ,index) {
              if(snapshot.data.documents[index]['photoUrl'] != null) {
                return ListTile(
                  leading: Image.network(snapshot.data.documents[index]['photoUrl'], width: 48, height: 48),
                  title: Text(snapshot.data.documents[index]['title'], style: TextStyle(fontSize: 16)),
                  subtitle: Text(snapshot.data.documents[index]['descriptions'][0][language], style: TextStyle(fontSize: 14)),
                  onTap: () => sendUserToMonument(snapshot,index),
                  dense: true,
                );
              } else {
                return ListTile(
                  title: Text(snapshot.data.documents[index]['title'], style: TextStyle(fontSize: 16)),
                  subtitle: Text(snapshot.data.documents[index]['descriptions'][0][language], style: TextStyle(fontSize: 14)),
                  onTap: () => sendUserToMonument(snapshot,index),
                  dense: true,
                );
              }
              /*return Card(
                child: InkWell(
                  child: Container(
                  height: 40,
                  child: Row(
                    children: <Widget>[
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(snapshot.data.documents[index]['title'], style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 1.25)),
                          Text(snapshot.data.documents[index]['descriptions'][0][language],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 0.95)),
                        ],
                      )
                    ],
                  ),
                ),
                onTap:() => sendUserToMonument(snapshot,index),
                ),
              );*/
            },
            itemCount: snapshot.data.documents.length,
          );
        } else {
          return Container(
          height: 35,
          child:  Row(
            children: <Widget>[
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
              )
            ],
          ),
        );
        }
      },
    );
  }

  sendUserToMonument(AsyncSnapshot<QuerySnapshot> s,int i) async {
    String p = s.data.documents[i].documentID;
    print(s.data.documents[i].documentID);
    DocumentSnapshot ds = await Firestore.instance.collection('Places').document(p).get();
    widget.placeMarker(ds); 
    return null;
  }
}