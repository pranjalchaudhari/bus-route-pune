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
  private routeAlreadyAddedToMap: Array<any> = [];
  private routesData: Array<IRoutes> = [];
  @Input() selectedRoutes!: Array<IRoutes>;
  @Input() selectionStatus: any;
  private map!: L.Map;
  private centroid: L.LatLngExpression = [18.5204, 73.8567]; //Pune


  constructor(private busRoutingService : BusRoutingService) { }

  ngOnInit(): void {
    this.initMap();
    this.subscribeToRouteData();
  }
  ngOnChanges(changes: SimpleChanges):void{
    if(changes && changes.selectedRoutes && changes.selectedRoutes.currentValue){
      this.addPinsWithRouteToMap(changes.selectedRoutes.currentValue);
    }
    // if(changes && changes.selectionStatus && changes.selectionStatus.currentValue && !changes.selectionStatus.currentValue.selected){
    //   this.removeFromMap(changes.selectionStatus.currentValue.row);
    // }
  }
  private subscribeToRouteData(){
    this.busRoutingService.getRouteState().subscribe((data:Array<IRoutes>)=>{
      this.routesData = data;
    });
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
    if(input && input.length){
      input.map((item:any)=>{
        const isAlreadyAdded = this.routeAlreadyAddedToMap.findIndex((routeId:any)=>{return routeId == item.routeId});
        if(item.listOfStops.length && isAlreadyAdded == -1){
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
          this.routeAlreadyAddedToMap.push(item.routeId);
        }
      })
    }
  }
  // private removeFromMap(removeRoute:any){
    
  //   removeRoute.listOfStops.map((stop:any,index:any)=>{
  //     if(removeRoute.listOfStops[index+1]){
  //       this.map.eachLayer((layer:any)=>{
  //         console.log(layer);
  //         if(layer._layers && layer._layers[Object.keys(layer._layers)[0]]._latlngs){
  //           for (const indexStr in layer._layers[Object.keys(layer._layers)[0]]._latlngs){
  //             let index = parseInt(indexStr);
  //             if(
  //               layer._layers[Object.keys(layer._layers)[0]]
  //               && layer._layers[Object.keys(layer._layers)[0]]._latlngs[index+1] 
  //               && layer._layers[Object.keys(layer._layers)[0]]._latlngs[index].lat == removeRoute.listOfStops[index].latitude 
  //               && layer._layers[Object.keys(layer._layers)[0]]._latlngs[index].lng == removeRoute.listOfStops[index].longitude
  //               && layer._layers[Object.keys(layer._layers)[0]]._latlngs[index+1].lat == removeRoute.listOfStops[index+1].latitude 
  //               && layer._layers[Object.keys(layer._layers)[0]]._latlngs[index+1].lng == removeRoute.listOfStops[index+1].longitude
  //               ){
  //                 layer.remove(this.map);
  //             }
  //           }
  //         }
  //         if(layer._latlng && layer._latlng.lat == removeRoute.listOfStops[index].latitude && layer._latlng.lng == removeRoute.listOfStops[index].longitude){
  //           layer.remove();
  //         }
  //         if(layer._latlng && layer._latlng.lat == removeRoute.listOfStops[index+1].latitude && layer._latlng.lng == removeRoute.listOfStops[index+1].longitude){
  //           layer.remove();
  //         }
  //         return this.map
  //       })
  //     }
  //   })

  // }
}
