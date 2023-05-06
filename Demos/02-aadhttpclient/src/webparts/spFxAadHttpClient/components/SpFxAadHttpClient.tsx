import * as React from 'react';
import styles from './SpFxAadHttpClient.module.scss';
import { ISpFxAadHttpClientProps } from './ISpFxAadHttpClientProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpFxAadHttpClient extends React.Component<ISpFxAadHttpClientProps, {}> {
  public render(): React.ReactElement<ISpFxAadHttpClientProps> {
    const {
      userItems,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.spFxAadHttpClient} ${hasTeamsContext ? styles.teams : ''}`}>
        <div className={styles.welcome}>
          <img alt="" src={isDarkTheme ? require('../assets/welcome-dark.png') : require('../assets/welcome-light.png')} className={styles.welcomeImage} />
          <h2>Well done, {escape(userDisplayName)}!</h2>
          <div>{environmentMessage}</div>
        </div>
        <div className={styles.mail}>
          <div><strong>Mail:</strong></div>
          <ul>
            {userItems && userItems.map((user) =>
              <li key={user.id}>
                <strong>ID:</strong> {user.id}<br />
                <strong>Email:</strong> {user.mail}<br />
                <strong>DisplayName:</strong> {user.displayName}
              </li>
            )
            }
          </ul>
        </div>
      </section>
    );
  }
}
