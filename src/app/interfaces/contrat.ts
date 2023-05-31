import { Fonction } from "./fonction";
import { Personne } from "./personne";
import { Service } from "./service";
import { TypeContrat } from "./typecontrat";

export interface Contrat {
    id: number,
    dateDebut: Date,
    dateFin: Date,
    idTypeContrat: TypeContrat,
    idPersonne: Personne,
    idService: Service,
    idFonction: Fonction,
    state: number
}