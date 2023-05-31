import { Fonction } from "./fonction";
import { Personne } from "./personne";
import { Service } from "./service";
import { TypeStage } from "./typestage";

export interface Stage {
    id: number,
    dateDebut: Date,
    dateFin: Date,
    responsableStage: string,
    idTypeStage: TypeStage,
    idPersonne: Personne,
    idService: Service,
    idFonction: Fonction,
    state: number
}
