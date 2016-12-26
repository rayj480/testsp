
import * as React from 'react';
import * as ReactDom from 'react-dom';
import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
  PropertyPaneTextField, 
  PropertyPaneCheckbox, 
  PropertyPaneDropdown, 
  PropertyPaneToggle
} from '@microsoft/sp-webpart-base';

import * as strings from 'helloWorldStrings';
import HelloWorld, { IHelloWorldProps } from './components/HelloWorld';
import { IHelloWorldWebPartProps } from './IHelloWorldWebPartProps';
import {Environment, EnvironmentType} from '@microsoft/sp-client-base';
import MockHttpCLient from './MockHttpClient';
import styles from './HelloWorld.module.scss';

export interface ISPLists{
  value: ISPList[];
}

export interface ISPList{
  Title: string; 
  Id: string;
}

export default class HelloWorldWebPart extends BaseClientSideWebPart<IHelloWorldWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }
  
  private _renderListAsync(): ISPList[]{
    // local Environment
    if(Environment.type === EnvironmentType.Local){
      this._getMockListData().then((response) => {
        return response.value;
      });
    }
    else if(Environment.type === EnvironmentType.SharePoint ||
            Environment.type === EnvironmentType.ClassicSharePoint){

      this._getListData().then((response) => {
        return response.value;
      });
   }
   return [];
  }

  private _getMockListData(): Promise<ISPLists>{
    return MockHttpCLient.get(this.context.pageContext.web.absoluteUrl)
      .then((data: ISPList[]) => {
        var listData: ISPLists = {value: data};
        return listData;
      }) as Promise<ISPLists>;
  }

  private _getListData(): Promise<ISPLists>{
    return this.context.httpClient.get(this.context.pageContext.web.absoluteUrl + '/_api/web/lists?$filter=Hidden eq false')
      .then((response: Response) => {
        return response.json();
      });
  }

  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(HelloWorld, {
      description: this.properties.description, 
      test: this.properties.test, 
      test1: this.properties.test1, 
      test2: this.properties.test2, 
      test3: this.properties.test3, 
      siteUrl: this.context.pageContext.web.title,
      data: this._renderListAsync()
    });

    ReactDom.render(element, this.domElement);
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }), 
                PropertyPaneTextField('test', {
                  label: "Multi-line text field", 
                  multiline: true
                }), 
                PropertyPaneCheckbox('test1', {
                  text: "Checkbox"
                }), 
                PropertyPaneDropdown('test2', {
                  label: 'Dropdown', 
                  options: [
                    {key: '1', text: 'One'},
                    {key: '2', text: 'Two'},
                    {key: '3', text: 'Three'},
                    {key: '4', text: 'Four'},
                  ]
                }), 
                PropertyPaneToggle('test3', {
                  label: 'Toogle', 
                  onText: "On", 
                  offText: "Off"
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
