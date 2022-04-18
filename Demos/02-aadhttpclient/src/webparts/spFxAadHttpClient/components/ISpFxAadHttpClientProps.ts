// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { IUserItem } from '../../../models/IUserItem';

export interface ISpFxAadHttpClientProps {
  userItems: IUserItem[];
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}