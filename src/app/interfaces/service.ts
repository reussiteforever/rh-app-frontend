import { Departement } from "./departement"

export interface Service {
    id: number,
    codeService: string,
    libelleService: string,
    DepartementId: string,
    state: number
}