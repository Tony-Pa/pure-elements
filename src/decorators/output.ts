export interface IOutputProps {
  eventName?: string;
  bubbles?: boolean;
  cancelable?: boolean;
  composed?: boolean;
}

export interface IOutput extends IOutputProps {
  prop: string;
}

export function Output(eventName?: string | IOutputProps) {
  return (target: any, prop: string) => {
    const props: IOutputProps = typeof eventName === 'string' ? { eventName } : eventName ?? { eventName: prop };

    validateEventName(props.eventName!);

    target.constructor.$$outputs = [...(target.constructor.$$outputs || []), { ...props, prop }];
  };
}

/**
 * Helper function for validating the name of the event
 *
 * This function assumes that the name of the event has been determined prior to calling it
 *
 * @param eventName the name of the event
 */
const validateEventName = (eventName: string): void => {
  // this regex checks for a string that begins with a capital letter - e.g. 'AskJeeves', 'Zoo', 'Spotify'
  if (/^[A-Z]/.test(eventName)) {
    const messageText = [
      `In order to be compatible with all event listeners on elements, the event name `,
      `cannot start with a capital letter. `,
      `Please lowercase the first character for the event to best work with all listeners.`,
    ].join('');
    console.warn(messageText);
    return;
  }

  // this regex checks for a string that begins 'on', followed by a capital letter - e.g. 'onAbout', 'onZing', 'onBlur'
  if (/^on[A-Z]/.test(eventName)) {
    const suggestedEventName = eventName[2].toLowerCase() + eventName.slice(3);
    const messageText = `Events decorated with @Event() should describe the actual DOM event name, not the handler. In other words "${eventName}" would be better named as "${suggestedEventName}".`;
    console.warn(messageText);
    return;
  }

  if (DOM_EVENT_NAMES.has(eventName.toLowerCase())) {
    const messageText = `The event name conflicts with the "${eventName}" native DOM event name.`;
    console.warn(messageText);
    return;
  }
};

const DOM_EVENT_NAMES: Set<string> = new Set(
  [
    'CheckboxStateChange',
    'DOMContentLoaded',
    'DOMMenuItemActive',
    'DOMMenuItemInactive',
    'DOMMouseScroll',
    'MSManipulationStateChanged',
    'MSPointerHover',
    'MozAudioAvailable',
    'MozGamepadButtonDown',
    'MozGamepadButtonUp',
    'MozMousePixelScroll',
    'MozOrientation',
    'MozScrolledAreaChanged',
    'RadioStateChange',
    'SVGAbort',
    'SVGError',
    'SVGLoad',
    'SVGResize',
    'SVGScroll',
    'SVGUnload',
    'SVGZoom',
    'abort',
    'afterprint',
    'afterscriptexecute',
    'alerting',
    'animationcancel',
    'animationend',
    'animationiteration',
    'animationstart',
    'appinstalled',
    'audioend',
    'audioprocess',
    'audiostart',
    'auxclick',
    'beforeinstallprompt',
    'beforeprint',
    'beforescriptexecute',
    'beforeunload',
    'beginEvent',
    'blur',
    'boundary',
    'broadcast',
    'busy',
    'callschanged',
    'canplay',
    'canplaythrough',
    'cardstatechange',
    'cfstatechange',
    'change',
    'chargingchange',
    'chargingtimechange',
    'checking',
    'click',
    'command',
    'commandupdate',
    'compassneedscalibration',
    'complete',
    'compositionend',
    'compositionstart',
    'compositionupdate',
    'connected',
    'connecting',
    'connectionInfoUpdate',
    'contextmenu',
    'copy',
    'cut',
    'datachange',
    'dataerror',
    'dblclick',
    'delivered',
    'devicechange',
    'devicemotion',
    'deviceorientation',
    'dialing',
    'disabled',
    'dischargingtimechange',
    'disconnected',
    'disconnecting',
    'downloading',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'durationchange',
    'emptied',
    'enabled',
    'end',
    'endEvent',
    'ended',
    'error',
    'focus',
    'focusin',
    'focusout',
    'fullscreenchange',
    'fullscreenerror',
    'gamepadconnected',
    'gamepaddisconnected',
    'gotpointercapture',
    'hashchange',
    'held',
    'holding',
    'icccardlockerror',
    'iccinfochange',
    'incoming',
    'input',
    'invalid',
    'keydown',
    'keypress',
    'keyup',
    'languagechange',
    'levelchange',
    'load',
    'loadeddata',
    'loadedmetadata',
    'loadend',
    'loadstart',
    'localized',
    'lostpointercapture',
    'mark',
    'message',
    'messageerror',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseout',
    'mouseover',
    'mouseup',
    'mousewheel',
    'mozbrowseractivitydone',
    'mozbrowserasyncscroll',
    'mozbrowseraudioplaybackchange',
    'mozbrowsercaretstatechanged',
    'mozbrowserclose',
    'mozbrowsercontextmenu',
    'mozbrowserdocumentfirstpaint',
    'mozbrowsererror',
    'mozbrowserfindchange',
    'mozbrowserfirstpaint',
    'mozbrowsericonchange',
    'mozbrowserloadend',
    'mozbrowserloadstart',
    'mozbrowserlocationchange',
    'mozbrowsermanifestchange',
    'mozbrowsermetachange',
    'mozbrowseropensearch',
    'mozbrowseropentab',
    'mozbrowseropenwindow',
    'mozbrowserresize',
    'mozbrowserscroll',
    'mozbrowserscrollareachanged',
    'mozbrowserscrollviewchange',
    'mozbrowsersecuritychange',
    'mozbrowserselectionstatechanged',
    'mozbrowsershowmodalprompt',
    'mozbrowsertitlechange',
    'mozbrowserusernameandpasswordrequired',
    'mozbrowservisibilitychange',
    'moztimechange',
    'msContentZoom',
    'nomatch',
    'notificationclick',
    'noupdate',
    'obsolete',
    'offline',
    'online',
    'orientationchange',
    'overflow',
    'pagehide',
    'pageshow',
    'paste',
    'pause',
    'play',
    'playing',
    'pointercancel',
    'pointerdown',
    'pointerenter',
    'pointerleave',
    'pointerlockchange',
    'pointerlockerror',
    'pointermove',
    'pointerout',
    'pointerover',
    'pointerup',
    'popstate',
    'popuphidden',
    'popuphiding',
    'popupshowing',
    'popupshown',
    'progress',
    'push',
    'pushsubscriptionchange',
    'ratechange',
    'readystatechange',
    'received',
    'repeatEvent',
    'reset',
    'resize',
    'resourcetimingbufferfull',
    'result',
    'resume',
    'resuming',
    'scroll',
    'seeked',
    'seeking',
    'select',
    'selectionchange',
    'selectstart',
    'sent',
    'show',
    'slotchange',
    'smartcard-insert',
    'smartcard-remove',
    'soundend',
    'soundstart',
    'speechend',
    'speechstart',
    'stalled',
    'start',
    'statechange',
    'statuschange',
    'stkcommand',
    'stksessionend',
    'storage',
    'submit',
    'suspend',
    'timeout',
    'timeupdate',
    'touchcancel',
    'touchend',
    'touchenter',
    'touchleave',
    'touchmove',
    'touchstart',
    'transitioncancel',
    'transitionend',
    'transitionrun',
    'transitionstart',
    'underflow',
    'unload',
    'updateready',
    'userproximity',
    'ussdreceived',
    'visibilitychange',
    'voicechange',
    'voiceschanged',
    'volumechange',
    'vrdisplayactivate',
    'vrdisplayblur',
    'vrdisplayconnect',
    'vrdisplaydeactivate',
    'vrdisplaydisconnect',
    'vrdisplayfocus',
    'vrdisplaypresentchange',
    'waiting',
    'wheel',
  ].map((e) => e.toLowerCase()),
);