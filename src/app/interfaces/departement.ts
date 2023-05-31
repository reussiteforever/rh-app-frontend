import { Site } from "./site";

export interface Departement {
    id: number,
    codeDepartement: string,
    libelleDepartement: string,
    idSite: Site,
    state: number
}