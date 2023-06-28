import { IUserItem } from '../../../models/IUserItem';

export interface ISpFxAadHttpClientProps {
  userItems: IUserItem[];
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
