// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import { IReadonlyTheme } from '@microsoft/sp-component-base';

import * as strings from 'SpFxHttpClientWebPartStrings';
import SpFxHttpClient from './components/SpFxHttpClient';
import { ISpFxHttpClientProps } from './components/ISpFxHttpClientProps';

import {
  HttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';

import { INasaImageSearchResponse } from '../../models/INasaImageSearchResponse';

export interface ISpFxHttpClientWebPartProps {
  description: string;
}

export default class SpFxHttpClientWebPart extends BaseClientSideWebPart<ISpFxHttpClientWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected get isRenderAsync(): boolean {
    return true;
  }
  
  public async render(): Promise<void> {
    if (!this.renderedOnce) {
      const response: INasaImageSearchResponse = await this._getApolloImage();
  
      const element: React.ReactElement<ISpFxHttpClientProps> = React.createElement(
        SpFxHttpClient,
        {
          apolloMissionImage: response.collection.items[0],
          isDarkTheme: this._isDarkTheme,
          environmentMessage: this._environmentMessage,
          hasTeamsContext: !!this.context.sdks.microsoftTeams,
          userDisplayName: this.context.pageContext.user.displayName
        }
      );
  
      ReactDom.render(element, this.domElement);
    }
  
    this.renderCompleted();
  }
  
  protected renderCompleted(): void {
    super.renderCompleted();
  }

  private async _getApolloImage(): Promise<INasaImageSearchResponse> {
    const response: HttpClientResponse = await this.context.httpClient.get(
      `https://images-api.nasa.gov/search?q=Apollo%204&media_type=image`,
      HttpClient.configurations.v1
    );
  
    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }
  
    const responseJson = await response.json();
    return responseJson as INasaImageSearchResponse;
  }

  protected onInit(): Promise<void> {
    this._environmentMessage = this._getEnvironmentMessage();

    return super.onInit();
  }

  private _getEnvironmentMessage(): string {
    if (!!this.context.sdks.microsoftTeams) { // running in Teams
      return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentTeams : strings.AppTeamsTabEnvironment;
    }

    return this.context.isServedFromLocalhost ? strings.AppLocalEnvironmentSharePoint : strings.AppSharePointEnvironment;
  }

  protected onThemeChanged(currentTheme: IReadonlyTheme | undefined): void {
    if (!currentTheme) {
      return;
    }

    this._isDarkTheme = !!currentTheme.isInverted;
    const {
      semanticColors
    } = currentTheme;

    if (semanticColors) {
      this.domElement.style.setProperty('--bodyText', semanticColors.bodyText || null);
      this.domElement.style.setProperty('--link', semanticColors.link || null);
      this.domElement.style.setProperty('--linkHovered', semanticColors.linkHovered || null);
    }

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
