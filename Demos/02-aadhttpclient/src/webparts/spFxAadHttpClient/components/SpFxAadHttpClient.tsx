// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as React from 'react';
import styles from './SpFxAadHttpClient.module.scss';
import { ISpFxAadHttpClientProps } from './ISpFxAadHttpClientProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpFxAadHttpClient extends React.Component<ISpFxAadHttpClientProps, {}> {
  public render(): React.ReactElement<ISpFxAadHttpClientProps> {
    return (
      <div className={styles.spFxAadHttpClient}>
        <div className={styles.container}>
          <div className={styles.row}>
            <div className={styles.column}>
              <span className={styles.title}>AadHttpClient Demo</span>
            </div>
          </div>

          <div className={styles.row}>
            <div><strong>Mail:</strong></div>
            <ul className={styles.list}>
              {this.props.userItems &&
                this.props.userItems.map((user) =>
                  <li key={user.id} className={styles.item}>
                    <strong>ID:</strong> {user.id}<br />
                    <strong>Email:</strong> {user.mail}<br />
                    <strong>DisplayName:</strong> {user.displayName}
                  </li>
                )
              }
            </ul>
          </div>

        </div>
      </div>
    );
  }
}
