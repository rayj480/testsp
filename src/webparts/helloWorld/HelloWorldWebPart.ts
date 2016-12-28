
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
  


  public render(): void {
    const element: React.ReactElement<IHelloWorldProps> = React.createElement(HelloWorld, {
      description: this.properties.description, 
      test: this.properties.test, 
      test1: this.properties.test1, 
      test2: this.properties.test2, 
      test3: this.properties.test3, 
      context: this.context
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
