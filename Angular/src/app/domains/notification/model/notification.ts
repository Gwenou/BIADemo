import { OptionDto } from 'src/app/shared/bia-shared/model/option-dto';

export interface Notification {
  id: number;
  title: string;
  description: string;
  type: OptionDto;
  read: boolean;
  createdDate: string;
  createdBy: OptionDto | null;
  siteId: number;
  notifiedPermissions: OptionDto[];
  notifiedUsers: OptionDto[];
  jData: string;
  // teamIds
}

export enum NotificationType {
  Task = 1,
  Info = 2,
  Success = 3,
  Warning = 4,
  Error = 5
}