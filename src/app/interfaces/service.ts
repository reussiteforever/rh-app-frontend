import { Departement } from "./departement"

export interface Service {
    id: number,
    codeService: string,
    libelleService: string,
    idDepartement: Departement,
    state: number
}