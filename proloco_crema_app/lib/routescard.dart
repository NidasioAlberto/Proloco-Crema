import 'package:flutter/material.dart';

class RouteCard extends StatefulWidget {
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
    );
  }
}