import events from 'events';
import winNotifier from './listeners/windows-notifier.js';

const emitter = new events.EventEmitter();

export default emitter;

export function registerEvents() {
  winNotifier();
}