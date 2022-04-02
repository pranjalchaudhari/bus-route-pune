import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoutes } from '../interface/bus-routing.interface';
import { RouteFormComponent } from '../route-form/route-form.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit,OnChanges {
  @Input() updateRouteData: any;
  @Input() currentRouteId!: number;
  @Output() emitDataToAppComponent: EventEmitter<IRoutes> = new EventEmitter();
  @Output() updateRowData: EventEmitter<IRoutes> = new EventEmitter();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ngOnChanges(changes: SimpleChanges):void{
    if(changes && changes.updateRouteData && changes.updateRouteData.currentValue && changes.updateRouteData.currentValue[0] != undefined){
      this.updateRoute(changes.updateRouteData.currentValue[0]);
    }
  }
  public addRoute(input: string){
    const dialogRef = this.dialog.open(RouteFormComponent);
    dialogRef.componentInstance.currentRouteId = this.currentRouteId; 
    dialogRef.componentInstance.closeDialog.subscribe(()=>{
      dialogRef.close();
    })
    dialogRef.componentInstance.emitRoutData.subscribe((data: IRoutes)=>{
      this.emitDataToAppComponent.emit(data);
    })
  }
  public updateRoute(data:any){
    const dialogRef = this.dialog.open(RouteFormComponent);
    dialogRef.componentInstance.prefillData = data;
    dialogRef.componentInstance.emitRoutData.subscribe((data: IRoutes)=>{
      this.updateRowData.emit(data);
    })

  }

}
