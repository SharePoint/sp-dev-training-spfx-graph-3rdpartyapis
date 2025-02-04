import * as React from 'react';
import styles from './SpFxHttpClient.module.scss';
import type { ISpFxHttpClientProps } from './ISpFxHttpClientProps';
import { escape } from '@microsoft/sp-lodash-subset';

export default class SpFxHttpClient extends React.Component<ISpFxHttpClientProps, {}> {
  public render(): React.ReactElement<ISpFxHttpClientProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;

    return (
      <section className={`${styles.spFxHttpClient} ${this.props.hasTeamsContext ? styles.teams : ''}`}>
        <div>
          <img src={this.props.apolloMissionImage.links[0].href} />
          <div><strong>Title:</strong> {escape(this.props.apolloMissionImage.data[0].title)}</div>
          <div><strong>Keywords:</strong></div>
          <ul>
            {this.props.apolloMissionImage &&
              this.props.apolloMissionImage.data[0].keywords.map((keyword: string) =>
                <li key={keyword}>
                  {escape(keyword)}
                </li>
              )
            }
          </ul>
        </div>
      </section>
    );
  }
}
