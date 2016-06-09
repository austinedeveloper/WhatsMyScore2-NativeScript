import {PageControl} from "../../decorators/pageControl";
import {Component, Input, ChangeDetectionStrategy} from '@angular/core';
import {ICompetitiorScoreLine} from "../../models/models.d";
import {Logger} from "../../providers/logger";

@PageControl({
    selector: 'competitor-result-row-header',
    changeDetection: ChangeDetectionStrategy.Detached,
    template: `
        <GridLayout class="header" columns="*,*,*,*,*,*">

            <Label text="E1" textWrap="true" col="0"></Label>
            <Label text="E2" textWrap="true" col="1"></Label>
            <Label text="E3" textWrap="true" col="2"></Label>
            <Label text="E4" textWrap="true" col="3"></Label>
            <Label text="E5" textWrap="true" col="4"></Label>
            <Label text="DIFF" textWrap="true" col="5"></Label>
            
        </GridLayout>  
    `,
    styleUrls: ["./pages/templates/competitor.results.css"]
})
export class CompetitorResultRowHeader{
  
}

@PageControl({
  selector: 'competitor-result-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <GridLayout class="result" columns="*,*,*,*,*,*">

        <Label class="invalid" [text]="model.Form1" textWrap="true" col="0"></Label>
        <Label [text]="model.Form2" textWrap="true" col="1"></Label>
        <Label [text]="model.Form3" textWrap="true" col="2"></Label>
        <Label [text]="model.Form4" textWrap="true" col="3"></Label>
        <Label [text]="model.Form5" textWrap="true" col="4"></Label>
        <Label [text]="model.Difficulty" textWrap="true" col="5"></Label>
        
    </GridLayout>   

    <GridLayout class="result" columns="*,*,*">
        <Label [text]="'ToF: ' + model.Bonus" textWrap="true" col="0" *ngIf="model.Bonus"></Label>
        <Label [text]="'Penalty: ' + model.Penalty" textWrap="true" col="1" *ngIf="model.Penalty"></Label>
        <Label [text]="'Total: ' + model.Total" textWrap="true" col="2"></Label>
    </GridLayout>
  `,
  styleUrls: ["./pages/templates/competitor.results.css"]
})
export class CompetitorResultRow {
    private model : ICompetitiorScoreLine; 

    @Input()
    public set scoreline(value : ICompetitiorScoreLine){
        this.model = value;
        this.logger.NotifyObjectProperties(value);
    }

    constructor(private logger: Logger) {

    }
}