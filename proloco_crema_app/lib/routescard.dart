import 'package:flutter/material.dart';
import 'package:cloud_firestore/cloud_firestore.dart';
import 'allTranslations.dart';

class RouteCard extends StatefulWidget {

  Function addMarker,clearMarker;

  RouteCard({Key key, this.addMarker, this.clearMarker}) : super(key: key);

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

    Future function(String spl) async{
      DocumentSnapshot ds = await Firestore.instance.collection('Places').document(spl).get();
      print(ds['title']);
      widget.addMarker(ds); 
      return null;     
    }

    void _markers(AsyncSnapshot<QuerySnapshot> s, int i){
      widget.clearMarker();
      for(int j = 0; j<s.data.documents[i]['places'].length;j++){
        String p=s.data.documents[i]['places'][j].path; 
        List<String> split = p.split('/');
        print(split[1]);
        function(split[1]);
      }
    }

    return StreamBuilder<QuerySnapshot>(
      stream: Firestore.instance.collection('Paths').orderBy('title').snapshots(),
      builder: (context, snapshot) {
        if(snapshot.hasData){
          return ListView.builder(
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
                        Text(snapshot.data.documents[index]['title'][language], style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 1.25)),
                        Text(snapshot.data.documents[index]['description'][language],style: DefaultTextStyle.of(context).style.apply(fontSizeFactor: 0.95)),
                      ],
                    )
                  ],
                ),
              ),
              onTap:() => _markers(snapshot,index),
              ),
            );
          },
          itemCount: snapshot.data.documents.length,
        );
        }else{
          return Container(
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