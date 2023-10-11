export interface AccountStateModel{
    locations: LocationModel[];
}
export type LocationModel = {
    locationName: string;
    location: string;
}