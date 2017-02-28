import {AppRoutingService, IClubRoute, ICompetitionRoute, IGradeRoute, IRegionRoute} from "../../context/router.context";
import {Component, Injectable, OnInit} from '@angular/core';
import {IClub, ICompetitionGrades, IGrade} from "../../models/models";
import {Observable, Subject, Subscription} from 'rxjs/Rx';

import {ClubService} from "./club";
import {CompetitionCache} from './competitionCache';
import {CompetitionService} from "./competitions";
import {GradeService} from "./grade";
import {GroupedObservable} from "rxjs/operator/groupBy";
import {Logger} from "../../providers/logger";

@Injectable()
export class DisplayService
{
    constructor(
        private logger: Logger,
        private context: AppRoutingService,
        private competitionCache: CompetitionCache,
        private gradeService : GradeService,
        private clubService : ClubService)
    {
    }
    
    public GetOrderedClubs(context: IClubRoute, refresh: boolean){
        let clubResults : Observable<IClub>;
        let useCache = this.competitionCache.Clubs && this.competitionCache.Clubs.length;
        
        clubResults = useCache 
            ? Observable.from(this.competitionCache.Clubs) 
            : this.clubService.List(this.context.ClubId).map(e=> e.json());
            
        let grouped = clubResults.groupBy(e=> e.Letter, e=> e).map(group => {
            let clubs : IClub[] = [];
            
            group.subscribe(k => {
                
            });
            
        });
    }
    
    public GetOrderedGrades(context: IGradeRoute, refresh: boolean){        
       
        let gradeResults : Observable<IGrade>;
        let useCache = this.competitionCache.Grades && this.competitionCache.Grades.length;
        
        gradeResults = useCache 
            ? Observable.from(this.competitionCache.Grades)
            : this.gradeService.List(this.context.CompetitionId).map(e=> e.json());

        let grouped = gradeResults.groupBy(e=> e.Discipline, e=> e).map(group=> { 
            let grades : IGrade[] = [];

            group.subscribe(k => {
                grades.push(k);
            }, (error) => {}, () => {
                let orderedGrades = grades.sort((a,b) => 
                    a.ClassName.toLowerCase() < b.ClassName.toLowerCase() ? -1 : a.ClassName > b.ClassName ? 1 : 0
                );
                grades = orderedGrades;
            });

            return {
                Discipline : group.key,
                Grades : grades
            }
        });

        return grouped.toArray();
    }
    
    
}