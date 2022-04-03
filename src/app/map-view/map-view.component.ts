import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as L from 'leaflet';
import { IRoutes } from '../interface/bus-routing.interface';
import { BusRoutingService } from '../services/bus-route.service';
// import "leaflet/dist/images/marker-shadow.png";
// import "leaflet/dist/images/marker-icon-2x.png";

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit, OnChanges {
  @Input() selectedRoutes!: Array<IRoutes>;
  private map!: L.Map;
  private centroid: L.LatLngExpression = [18.5204, 73.8567]; //Pune


  constructor() { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges):void{
    if(changes && changes.selectedRoutes && changes.selectedRoutes.currentValue){
      this.addPinsWithRouteToMap(changes.selectedRoutes.currentValue);
    }
  }
  

  private initMap(): void {
    this.map = L.map('map', {
      center: this.centroid,
      zoom: 11
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 10,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
    tiles.addTo(this.map);
  
  }
  private addPinsWithRouteToMap(input: Array<any>){
    if(this.map){
      this.map.remove();
    }
    this.initMap();
    if(input && input.length){
      input.map((item:any)=>{
        if(item.listOfStops.length){
          item.listOfStops.map((stop:any,index:any)=>{
            if(item.listOfStops[index+1]){
              let startPin: L.LatLngExpression = [parseFloat(item.listOfStops[index].latitude),parseFloat(item.listOfStops[index].longitude)];
              let endPin: L.LatLngExpression = [parseFloat(item.listOfStops[index+1].latitude),parseFloat(item.listOfStops[index+1].longitude)];
              
              let startMarker = L.marker(startPin);
              let endMarker = L.marker(endPin);

              let start = new L.LatLng(parseFloat(item.listOfStops[index].latitude),parseFloat(item.listOfStops[index].longitude));
              let end = new L.LatLng(parseFloat(item.listOfStops[index+1].latitude),parseFloat(item.listOfStops[index+1].longitude));
              let pathDirection = [start,end]
              let path = L.polyline(pathDirection,{
                color: item.status == 'active' ? 'green' : 'red',
                weight: 3,
                opacity: 0.5,
                smoothFactor: 1
              })

              path.addTo(this.map);
              startMarker.addTo(this.map);
              endMarker.addTo(this.map);
              console.log(this.map);
            }
          })
        }
      })
    }
  }
}
