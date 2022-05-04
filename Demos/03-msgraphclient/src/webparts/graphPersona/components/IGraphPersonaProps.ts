// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { MSGraphClient } from '@microsoft/sp-http';

export interface IGraphPersonaProps {
  graphClient: MSGraphClient;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
