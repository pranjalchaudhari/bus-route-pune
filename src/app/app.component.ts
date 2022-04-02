import { Component, OnInit } from '@angular/core';
import { IRoutes } from './interface/bus-routing.interface';
import { BusRoutingService } from './services/bus-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public totalRoutes: Array<IRoutes> = [];
  public selectedRoutes: Array<IRoutes> = [];
  public selectionStatus: any;
  public updateRouteData: any;
  constructor(private busRoutingService : BusRoutingService) { }

  ngOnInit(): void {
    this.subscribeToRoutesData();
  }
  
  private subscribeToRoutesData(){
    this.busRoutingService.getRouteState()
    .subscribe((route:Array<IRoutes>)=>{
      this.totalRoutes = route;
    })
  }

  public addRoutes(data:any){
    console.log('adddiiinngg',data)
    this.busRoutingService.setRoutes(data);
  }
  public selectedRoutesToDisplay(data:any){
    this.selectedRoutes = data;
  }
  public emitSelectionStatus(data:any){
    this.selectionStatus = data;
  }
  public deleteRowEvent(data:any){
    this.busRoutingService.deleteRoute(data);
    
  }
  public editRowEvent(data:any){
    this.updateRouteData = data;
  }
  public updateRow(data:any){
    this.busRoutingService.updateRoute(data);
  }
}
