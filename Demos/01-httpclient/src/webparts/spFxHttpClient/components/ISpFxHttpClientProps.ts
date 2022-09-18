// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import { INasaItem } from "../../../models/INasaImageSearchResponse";

export interface ISpFxHttpClientProps {
  apolloMissionImage: INasaItem;
  isDarkTheme: boolean;
  environmentMessage: string;
  hasTeamsContext: boolean;
  userDisplayName: string;
}
