import 'package:flutter/material.dart';

class HelpCard extends StatefulWidget {

  @override
  _HelpCardState createState() {
    return _HelpCardState();
  }
}

class _HelpCardState extends State<HelpCard>{

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
            mainAxisAlignment: MainAxisAlignment.start,
          ),
          Column(
            
            crossAxisAlignment: CrossAxisAlignment.start,
            mainAxisAlignment: MainAxisAlignment.start,
            children: <Widget>[
                  Row(
                    children: <Widget>[
                      Icon(Icons.directions_run),
                      Text("Premi questa icona per vedere una lista di tutti i percorsi disponibili",style: TextStyle(fontSize: 10)),
                    ],
                  ),
                  Row(
                    children: <Widget>[
                      Icon(Icons.account_balance),
                      Text("Premi questa icona per vedere la lista di tutti i monumenti disponibili",style: TextStyle(fontSize: 10))
                    ],                    
                  ),
                  Row(
                    children: <Widget>[
                      Icon(Icons.local_airport),
                      Text("Premi questa icona dopo aver toccato un monumento sulla mappa per \n viaggiare alla sua posizione",style: TextStyle(fontSize:10)),
                    ],                    
                  )
            ],
          )          
        ],
      )
    );
  }
}