import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IRoutes } from '../interface/bus-routing.interface';
import { RouteFormComponent } from '../route-form/route-form.component';
import * as XLSX from 'xlsx';
import { BusRoutingService } from '../services/bus-route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() addButtonClicked: EventEmitter<any> = new EventEmitter();
  public routeDataToExport: Array<IRoutes> = []
  public excelExportData: Array<any> = []
  constructor(
    public dialog: MatDialog,
    private busRoutingService : BusRoutingService
  ) { }

  ngOnInit(): void {
    this.subscribeToRouteData();
  }
  private subscribeToRouteData(){
    this.busRoutingService.getRouteState().subscribe((data:Array<IRoutes>)=>{
      this.routeDataToExport = data;
    })
  }
  public addRoute(){
    this.addButtonClicked.emit();
  }
  public exportData():void{
    this.excelExportData = [];
    if(this.routeDataToExport.length == 0){
      alert('No Data to export. Add routes to export data.');
      return;
    }
    for(const route of this.routeDataToExport){
      let stops = [];
      for(const stop of route.listOfStops!){
        stops.push(JSON.stringify(stop));
      }
      let exportDataObject = {
        ID: route.routeId,
        Name: route.name,
        Direction: route.direction,
        Status: route.status,
        Stops: stops.toString(),
      };
      this.excelExportData.push(exportDataObject);

    }
    const workSheet = XLSX.utils.json_to_sheet(this.excelExportData);
    const workBook: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workBook, workSheet, 'data');
    XLSX.writeFile(workBook, 'routes.xlsx');
  }
  // public uploadData(){
  //   var workbook = XLSX.readFile('./src/assets/uploadRoutes.xlsx');
  //   var sheet_name_list = workbook.SheetNames;
  //   var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
  //   console.log(xlData);
  // }

}
