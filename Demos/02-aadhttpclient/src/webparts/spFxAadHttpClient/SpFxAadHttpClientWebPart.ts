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

import * as strings from 'SpFxAadHttpClientWebPartStrings';
import SpFxAadHttpClient from './components/SpFxAadHttpClient';
import { ISpFxAadHttpClientProps } from './components/ISpFxAadHttpClientProps';

import { IUserItem } from '../../models/IUserItem';
import {
  AadHttpClient,
  HttpClientResponse
} from '@microsoft/sp-http';

export interface ISpFxAadHttpClientWebPartProps {
  description: string;
}

export default class SpFxAadHttpClientWebPart extends BaseClientSideWebPart<ISpFxAadHttpClientWebPartProps> {

  private _isDarkTheme: boolean = false;
  private _environmentMessage: string = '';

  protected get isRenderAsync(): boolean {
    return true;
  }

  public async render(): Promise<void> {
    if (!this.renderedOnce) {
      const results: IUserItem[] = await this._getUsers();

      const element: React.ReactElement<ISpFxAadHttpClientProps> = React.createElement(
        SpFxAadHttpClient,
        {
          userItems: results,
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

  private async _getUsers(): Promise<IUserItem[]> {
    const aadClient: AadHttpClient = await this.context.aadHttpClientFactory
      .getClient('https://graph.microsoft.com');

    const endpoint: string = 'https://graph.microsoft.com/v1.0/users?$top=10&$select=id,displayName,mail';
    const response: HttpClientResponse = await aadClient.get(endpoint, AadHttpClient.configurations.v1);

    if (!response.ok) {
      const responseText = await response.text();
      throw new Error(responseText);
    }

    const responseJson = await response.json();
    return responseJson.value as IUserItem[];
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
