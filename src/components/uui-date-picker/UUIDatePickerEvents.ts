import { UUIEvent } from '../../event/UUIEvent';
import { UUIDatePickerElement } from './uui-date-picker.element';

export class UUIDatePickerEvent extends UUIEvent<{}, UUIDatePickerElement> {
  public static readonly CHANGE = 'change';
}
