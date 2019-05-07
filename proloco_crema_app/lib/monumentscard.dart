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

    Future function(AsyncSnapshot<QuerySnapshot> s,int i) async{
      String p=s.data.documents[i].documentID;
      print(s.data.documents[i].documentID);
      DocumentSnapshot ds = await Firestore.instance.collection('Places').document(p).get();
      widget.placeMarker(ds); 
      return null;
    }

/*
    

    void _markers(AsyncSnapshot<QuerySnapshot> s, int i){
      for(int j = 0; j<s.data.documents[i]['places'].length;j++){
        String p=s.data.documents[i]['places'][j].path; 
        List<String> split = p.split('/');
        print(split[1]);
        function(split[1]);
      }
    }
*/
    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection('Places').orderBy('title').snapshots(),
      builder: (context, snapshot) {
        switch(snapshot.hasData){
          case true:return ListView.builder(
          itemBuilder: ( contextt ,index){
              return new Card(
              child: InkWell(
                child: new Container(
                height: 40,
                child: new Row(
                  children: <Widget>[
                    Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
<<<<<<< HEAD
                        Text(snapshot.data.documents[index]['title'],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 1.25)),
=======
                        Text(snapshot.data.documents[index]['title'], style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 1.25)),
>>>>>>> 8220dfc11b86e58ccaad557cb99a404088d0e2bd
                        Text(snapshot.data.documents[index]['descriptions'][0][language],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 0.95)),
                      ],
                    )
                  ],
                ),
              ),
              onTap:() => function(snapshot,index),
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