import 'package:flutter/material.dart';

class MonumentDescriptionCard extends StatefulWidget {
  @override
  _MonumentDescriptionCardState createState(){
    return _MonumentDescriptionCardState();
  }
}

class _MonumentDescriptionCardState extends State<MonumentDescriptionCard>{
  
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
    );
  }
}