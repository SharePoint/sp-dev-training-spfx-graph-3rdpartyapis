// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';

import * as strings from 'SpFxHttpClientWebPartStrings';
import SpFxHttpClient from './components/SpFxHttpClient';
import { ISpFxHttpClientProps } from './components/ISpFxHttpClientProps';

import { HttpClient, HttpClientResponse } from '@microsoft/sp-http';

export interface ISpFxHttpClientWebPartProps {
  description: string;
}

export default class SpFxHttpClientWebPart extends BaseClientSideWebPart<ISpFxHttpClientWebPartProps> {

  public render(): void {
    if (!this.renderedOnce) {
      this._getApolloImage()
        .then(response => {
          const element: React.ReactElement<ISpFxHttpClientProps > = React.createElement(
            SpFxHttpClient,
            {
              apolloMissionImage: response.collection.items[0]
            }
          );
  
          ReactDom.render(element, this.domElement);
        });
    }
  }

  private _getApolloImage(): Promise<any> {
    return this.context.httpClient.get(
      `https://images-api.nasa.gov/search?q=Apollo%204&media_type=image`,
      HttpClient.configurations.v1
    )
    .then((response: HttpClientResponse) => {
      return response.json();
    })
    .then(jsonResponse => {
      return jsonResponse;
    }) as Promise<any>;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
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
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
