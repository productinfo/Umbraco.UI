import { UUIEvent } from '../../event/UUIEvent';
import { UUIOverlayElement } from './uui-overlay.element';

export class UUIOverlayEvent extends UUIEvent<{}, UUIOverlayElement> {
  public static readonly CHANGE = 'change';
}
