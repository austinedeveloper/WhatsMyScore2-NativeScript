import 'rxjs/add/operator/max';
import 'rxjs/add/operator/distinct';

import * as Models from "../../../models/models";
import * as Rx from "rxjs";

import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

import {AppRoutingService} from "../../../context/router.context";
import {ClubService} from "../../../providers/leagues/club";
import {CompetitionCache} from '../../../providers/leagues/competitionCache';
import {CompetitionNav} from "../../nav/competition.nav";
import {CompetitionService} from "../../../providers/leagues/competitions";
import {CompetitorResult} from "../../templates/competitor.results";
import {CompetitorService} from "../../../providers/leagues/competitors";
import {GradeService} from "../../../providers/leagues/grade";
import {Logger} from "../../../providers/logger";

@Component({
    selector: "grade-competitors-page",
    template: `
        <nx-drawer>
            <competition-nav drawer-aside-left></competition-nav>
            <nx-nav>
                <label class="nx-header-title" [text]="'Competitors' | Title" style="horizontal-align:center"></label>
                <ion-icon nav-right nav="true" icon="ion-android-favorite"></ion-icon>
            </nx-nav>

            <StackLayout class="inset">
                <nx-list>

                    <PullToRefresh [pull-list-view] 
                        (refreshStarted)="refreshStarted($event)"
                        (refreshCompleted)="refreshCompleted()">
                        <ListView [items]="list" [pull-to-animate]>
                            <template let-item="item">
                        
                                <competitor-result [competitor]="item"></competitor-result>
                       
                            </template>
                        </ListView>
                    </PullToRefresh>


                </nx-list>
            </StackLayout>
      
        </nx-drawer>
    `,
    providers: [CompetitionService, GradeService, ClubService, CompetitorService],
    //changeDetection: ChangeDetectionStrategy.OnPush
})
export class GradeCompetitorsPage implements OnInit {
    constructor(
        private logger: Logger,
        private gradeService: GradeService,
        private competitorService: CompetitorService,
        private context: AppRoutingService,
        private cache: CompetitionCache) {
        this.logger.Notify("grade list page started");
    }

    public list: Models.ICompetitorContext[] = [];

    public onLoaded($event) : void {

    }
    public onItemLoading($event) : void{

    }
    public onItemTap($event): void {

    }

    //action to 
    public gradeSearch($event: any) {
        this.logger.Notify("Search passed to region");
        this.logger.Notify($event);
        //this.logger.Notify("Search Term in Regions Page: " + $event.Value);
    }

    public ngOnInit() {
        this.logger.Notify("grade-page ngOnInit");
        //time to load the data

        this.loadDetail();
    }

    public loadDetail() {
        let obseravable = this.competitorService
            .ListGradeCompetitors(this.context.CompetitionId, this.context.GradeId);

        //this.logger.NotifyResponse(obseravable);

        obseravable.map(e => e.json())
            .map((e : Models.ICompetitor[]) => { 
                let contexts = e.map(item => {
                    return {
                        Expanded : false,
                        Competitor : item
                    }
                });
                return contexts;
            })
            .subscribe((e : Models.ICompetitorContext[]) => {
                this.list = e.sort((a,b) => {
                    return a.Competitor.FinalRank - b.Competitor.FinalRank;               
                });
                //let max = Rx.Observable.from(this.list).map(e => e.StartGroup).max();
            });

        return obseravable;
    }

    public refreshStarted(args: any){
        this.logger.Notify("Grade: refresh starting");
        this.loadDetail().subscribe(() => {
            args.completed();
        });
    }
    public refreshCompleted(){
        this.logger.Notify("Grade: refresh completed");
    }

}