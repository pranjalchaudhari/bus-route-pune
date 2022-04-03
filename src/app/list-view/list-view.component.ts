import { SelectionModel } from '@angular/cdk/collections';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IRoutes } from '../interface/bus-routing.interface';
import { BusRoutingService } from '../services/bus-route.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-list-view',
  templateUrl: './list-view.component.html',
  styleUrls: ['./list-view.component.scss']
})
export class ListViewComponent implements OnInit {
  public routesData!: Array<IRoutes>;
  @Output() selectedRoutes: EventEmitter<Array<IRoutes>>= new EventEmitter();
  @Output() deleteRowEvent: EventEmitter<any>= new EventEmitter();
  @Output() editRowEvent: EventEmitter<any>= new EventEmitter();
  displayedColumns: string[] = ['select','routeId', 'name', 'direction', 'status', 'listOfStops','editDelete'];
  public dataSource: any;
  selection = new SelectionModel<IRoutes>(true, []);
  constructor(private busRoutingService : BusRoutingService) { }

  ngOnInit(): void {
    this.subscribeToRouteData();
  }
  private subscribeToRouteData(){
    this.busRoutingService.getRouteState().subscribe((data:Array<IRoutes>)=>{
      this.routesData = data;
      this.dataSource =  new MatTableDataSource<IRoutes>(this.routesData);
      console.log(this.routesData);
    });
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: IRoutes): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.routeId! + 1}`;
  }
  public rowSelection(row:any,id: any){
    this.selectedRoutes.emit(this.selection.selected);
  }
  public allRowsSelected(){
    this.selectedRoutes.emit(this.selection.selected);
  }
  public deleteRow(row:any){
    this.deleteRowEvent.emit(row);
  }
  public editRow(row:any){
    row.updateId += '1';
    this.editRowEvent.emit(row);
  }

}
