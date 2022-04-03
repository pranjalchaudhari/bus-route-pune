import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoutes } from './interface/bus-routing.interface';
import { RouteFormComponent } from './route-form/route-form.component';
import { BusRoutingService } from './services/bus-route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  public totalRoutes: Array<IRoutes> = [];
  public selectedRoutes: Array<IRoutes> = [];
  public updateRouteData: any;
  constructor(
    private busRoutingService : BusRoutingService,
    public dialog: MatDialog,
   ) { }

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
    this.busRoutingService.setRoutes(data);
  }
  public selectedRoutesToDisplay(data:any){
    this.selectedRoutes = data;
  }
  public deleteRowEvent(data:any){
    this.busRoutingService.deleteRoute(data);
    
  }
  // public editRowEvent(data:any){
  //   this.updateRouteData = data;
  // }
  public updateRow(data:any){
    this.busRoutingService.updateRoute(data);
  }
  public openAddRouteModal(){
    const dialogRef = this.dialog.open(RouteFormComponent);
    dialogRef.componentInstance.currentRouteId = this.totalRoutes.length + 1;
    dialogRef.componentInstance.addUpdateText = 'Add';
    dialogRef.componentInstance.closeDialog.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.emitRoutData.subscribe((data: IRoutes)=>{
      this.addRoutes(data);
    })
  }
  public openEditRouteModal(data:any){
    const dialogRef = this.dialog.open(RouteFormComponent);
    dialogRef.componentInstance.prefillData = data;
    dialogRef.componentInstance.addUpdateText = 'Update';
    dialogRef.componentInstance.emitRoutData.subscribe((data: IRoutes)=>{
      this.updateRow(data);
    })
    dialogRef.componentInstance.closeDialog.subscribe(()=>{
      dialogRef.close();
    })

  }
}
