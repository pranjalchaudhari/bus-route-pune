import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import {IRoutes, IStops} from '../interface/bus-routing.interface';
import { BusRoutingService } from '../services/bus-route.service';

@Component({
  selector: 'app-route-form',
  templateUrl: './route-form.component.html',
  styleUrls: ['./route-form.component.scss']
})
export class RouteFormComponent implements OnInit {
  @Input() currentRouteId!: number;
  @Input() prefillData: any;
  @Output() closeDialog: EventEmitter<any> = new EventEmitter();
  @Output() emitRoutData: EventEmitter<IRoutes> = new EventEmitter();
  public selectedStops: Array<string> = [];
  public route: IRoutes = {
    name:'',
    status:'',
    direction:'',
    listOfStops: []
  };
  public stops: Array<IStops> = this.busRoutingService.getBusStopsData();
  @Input() addUpdateText: string = 'Add';

  constructor(private busRoutingService : BusRoutingService) { }

  ngOnInit(): void {
    if(this.prefillData){
      this.route = {
        name: this.prefillData.name,
        status: this.prefillData.status,
        direction: this.prefillData.direction,
        listOfStops: this.prefillData.listOfStops,
        routeId: this.prefillData.routeId
      };
      this.selectedStops = [];
      this.prefillData.listOfStops.map((stop:any)=>{
        this.selectedStops.push(stop.stopId)
      })
    }
  }

  public addRouteDetails(): void{
    if(!this.route.direction || !this.route.name || !this.route.status || !this.selectedStops.length){
      alert('All fileds are reqiured.');
      return;
    }else if(this.selectedStops.length == 1){
      alert('Select at least 2 stops.');
      return;
    }
    this.route.listOfStops = [];
    this.route.routeId = this.route.routeId ? this.route.routeId : this.currentRouteId;
    this.selectedStops.map((id:any)=>{
      this.stops.map((stop:IStops)=>{
        if(stop.stopId == id){
          this.route.listOfStops?.push(stop);
        }
      })
    })
    this.closeDialog.emit();
    this.emitRoutData.emit(this.route);
    this.resetRouteData();
  }
  private resetRouteData(){
    this.route = {
      name:'',
      status:'',
      direction:'',
      listOfStops: []
    };
  }
}
