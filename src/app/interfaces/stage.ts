import { Fonction } from "./fonction";
import { Personne } from "./personne";
import { Service } from "./service";
import { TypeStage } from "./typestage";

export interface Stage {
    id: number,
    dateDebut: string,
    dateFin: string,
    responsableStage: string,
    TypeStageId: string,
    PersonneId: string,
    ServiceId: string,
    FonctionId: string,
    state: number
}
