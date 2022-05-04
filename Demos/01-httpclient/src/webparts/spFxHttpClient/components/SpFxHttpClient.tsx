// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from './SpFxHttpClient.module.scss';
import { ISpFxHttpClientProps } from './ISpFxHttpClientProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpFxHttpClient extends React.Component<ISpFxHttpClientProps, {}> {
  public render(): React.ReactElement<ISpFxHttpClientProps> {
    return (
      <section className={`${styles.spFxHttpClient} ${this.props.hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <img src={this.props.apolloMissionImage.links[0].href} />
          <div><strong>Title:</strong> {this.props.apolloMissionImage.data[0].title}</div>
          <div><strong>Keywords:</strong></div>
          <ul>
            {this.props.apolloMissionImage &&
              this.props.apolloMissionImage.data[0].keywords.map((keyword) =>
                <li key={keyword}>
                  {keyword}
                </li>
              )
            }
          </ul>
        </div>
      </section>
    );
  }
}
