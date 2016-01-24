import { Component } from 'angular2/core'
import { EventData } from "data/observable"

const _reflect: any = Reflect;

/*
<Page xmlns="http://www.nativescript.org/tns.xsd" loaded="pageLoaded">
  <StackLayout>
    <Label text="Loading..." cssClass="title"/>
  </StackLayout>
</Page>
*/

export interface IPageConfig {
    selector?: string;
    onLoaded? : (args: EventData) => void;
    onNavigatingTo? : (arg: EventData) => void;
    
    templateUrl?: string;
    //template?: string;
    directives?: any[];
    providers?: any[];
}

export function Page(config: IPageConfig={})
{
    return (cls) =>
    {
        var annotations = _reflect.getMetadata('annotations', cls) || [];
        var componentConfig: any = config;

        //componentConfig.selector = 'main';

        //componentConfig.host = config.host || {};
        //componentConfig.host['[hidden]'] = '_hidden';
        //componentConfig.host['[class.tab-subpage]'] = '_tabSubPage';

        annotations.push(new Component(componentConfig));

        _reflect.defineMetadata('annotations', annotations, cls);

        return cls;
    }
}