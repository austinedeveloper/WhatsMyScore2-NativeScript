import {Http, Response} from "@angular/http";
import {ICompetition, IGrade} from "../../models/models";

import {CompetitionCache} from "./competitionCache";
import {GradeCache} from "./gradeCache";
import {Injectable} from "@angular/core";
import {Logger} from "../logger";
import { Observable } from "rxjs/Rx";
import {Settings} from "../routes/routes";

@Injectable()
export class GradeService {
    constructor(private http: Http, private logger: Logger,
        private competitionCache : CompetitionCache,
        private gradeCache: GradeCache) {
        logger.Notify("ProviderService created");
    }

    public Get(competitionId: number, gradeId: number): Observable<Response> {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + "/Api/Competitions/" + competitionId;
        route += "/Group/" + gradeId;

        let promise = this.http.get(route);

        this.logger.NotifyResponse(promise);

        promise.map(response => response.json()).subscribe((grade : IGrade) => {
            this.gradeCache.Grade = grade;
        });

        return promise;
    }

    public List(competitionId: number) {
        let base: string = Settings.WebApiBaseUrl;
        let route: string = base + "/Api/Competition/" + competitionId + "/Grades";

        let promise = this.http.get(route);

        this.logger.NotifyResponse(promise);


        promise.map(response => response.json()).subscribe((grades : Array<IGrade>) => {
            this.competitionCache.Grades = grades;
        });

        return promise;
    }

}