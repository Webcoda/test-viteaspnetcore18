// ..\UmbracoCMS\Models\PrecinctModel.cs
export interface PrecinctModel {
    ID: number;
    name: string;
    URL: string;
}

// ..\UmbracoCMS\Models\PrecinctModel.cs
export interface PrecinctQueryModel {
    precincts: PrecinctModel[];
    remaining: number;
}

// ..\UmbracoCMS\Models\Pipeline\LocationModel.cs
export interface LocationModel {
    lat: number;
    lng: number;
}

// ..\UmbracoCMS\Models\Pipeline\ProjectModel.cs
export interface ProjectModel {
    projectName: string;
    cluster: string;
    estimatedValue: string;
    procurementStrategy: string;
    currentPhase: string;
    estimatedProcurement: string;
    estimatedConstruction: string;
    localGovernmentArea: string;
    contact: string;
    projectURL: string;
    tooltip: string;
    location: LocationModel;
    shape: LocationModel[];
    type: string;
}
