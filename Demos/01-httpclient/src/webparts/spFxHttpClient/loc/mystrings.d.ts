declare interface ISpFxHttpClientWebPartStrings {
  PropertyPaneDescription: string;
  BasicGroupName: string;
  DescriptionFieldLabel: string;
  AppLocalEnvironmentSharePoint: string;
  AppLocalEnvironmentTeams: string;
  AppSharePointEnvironment: string;
  AppTeamsTabEnvironment: string;
}

declare module 'SpFxHttpClientWebPartStrings' {
  const strings: ISpFxHttpClientWebPartStrings;
  export = strings;
}
