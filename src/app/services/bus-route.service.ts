import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IRoutes, IStops } from "../interface/bus-routing.interface";

@Injectable()
export class BusRoutingService{
    constructor(){}
    private stateSubject: BehaviorSubject<any> = new BehaviorSubject([]);

    public getRouteState(){
      return this.stateSubject.asObservable();
    }

    public setRoutes(data: any){
      let previousData = this.stateSubject.getValue();
      previousData.push(data);
      this.stateSubject.next(previousData);
    }

    public deleteRoute(data:any){
      let previousData = this.stateSubject.getValue();
      previousData = previousData.filter((route:any)=>{return route.routeId != data.routeId});
      this.stateSubject.next(previousData);      
    }
    public updateRoute(data:any){
      let previousData = this.stateSubject.getValue();
      previousData = previousData.map((route:any)=>{
        if(route.routeId == data.routeId){
          route.name = data.name
          route.direction = data.direction
          route.status = data.status
          route.listOfStops = data.listOfStops
        }
        return route
      });
      this.stateSubject.next(previousData);      
    }

    public getBusStopsData(): Array<IStops>{
        return  [
            {
              stopId: '1',
              stopName: 'Pune Station',
              latitude: '18.52882457206646', 
              longitude: '73.87441305147425'
            },
            {
              stopId: '2',
              stopName: 'Nanded City',
              latitude: '18.456963960235004', 
              longitude: '73.80096835431911'
            },
            {
              stopId: '3',
              stopName: 'Swargate',
              latitude: '18.500670739741143', 
              longitude: '73.85879712685747'
            },
            {
              stopId: '4',
              stopName: 'Katraj',
              latitude: '18.454666965112256', 
              longitude: '73.85800214386545'
            },
            {
              stopId: '5',
              stopName: 'Kothrud',
              latitude: '18.510476092429126', 
              longitude: '73.81615706226236'
            },
            {
              stopId: '6',
              stopName: 'Hinjewadi',
              latitude: '18.591558898195338', 
              longitude: '73.73885084083452'
            },
            {
              stopId: '7',
              stopName: 'Viman Nagar',
              latitude: '18.561363946108468', 
              longitude: '73.91782923881625'
            },
            {
              stopId: '8',
              stopName: 'Pune International Airport',
              latitude: '18.57816329986075', 
              longitude: '73.90875586523997'
            },
            {
              stopId: '9',
              stopName: 'Pimpri',
              latitude: '18.629729680445195', 
              longitude: '73.8027470930906'
            },
            {
              stopId: '10',
              stopName: 'Magarpatta City',
              latitude: '18.514734231398304', 
              longitude: '73.93260809030797'
            },
          ]

    }
}