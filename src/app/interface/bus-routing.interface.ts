export interface IRoutes{
    name?: string;
    direction?: string;
    routeId?:number;
    status?:string;
    listOfStops?: Array<IStops>
}
export interface IStops{
    stopId?:string;
    stopName?:string;
    latitude?:string;
    longitude?:string;
}