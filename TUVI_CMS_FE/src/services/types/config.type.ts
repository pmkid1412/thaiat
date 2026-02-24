export type ConfigItem = {
  code: string;
  name: string;
  valueType: string;
  value: string;
  description: string;
}

export type ConfigResponse = ConfigItem[]

export type UpdateConfigRequest = {
  code: string;
  value: string;
}