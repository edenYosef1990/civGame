export type EventHandler<T extends object> = (
  actionName: string,
  params: any,
  currentState: T
) => T | null;

export function on<T extends object>(
  matchingActionName: string,
  eventHandler: (params: any, currentState: T) => T
): EventHandler<T> {
  return (actionName: string, params: any, currentState: T) => {
    if (actionName !== matchingActionName) return null;
    return eventHandler(params, currentState);
  };
}

export class StateManagmentSelector {
  constructor(public propertyName: string) {}

  private _isChangedSinceLastRead: boolean = false;
  public get isChangedSinseLastRead(): boolean {
    if (this._isChangedSinceLastRead == false) return false;
    this._isChangedSinceLastRead = false;
    return true;
  }

  public flagValueAsChanged() {
    this._isChangedSinceLastRead = true;
  }
}

export class StateManagmentStore<T extends object> {
  currentState: T;
  eventHandlers: EventHandler<T>[];
  selectors: { [propertyName: string]: StateManagmentSelector };

  constructor(initState: T, ...eventHandlers: EventHandler<T>[]) {
    this.currentState = initState;
    this.eventHandlers = eventHandlers;
    this.selectors = {};
  }

  execute(actionName: string, params: any) {
    for (let eventHandler of this.eventHandlers) {
      let res = eventHandler(actionName, params, this.currentState);
      if (res === null) continue;
      else {
        let diff = getDiff(this.currentState, res);
        if (Object.keys(diff).length === 0) return;
        this.currentState = res;
        for (const propertyName in diff) {
          const propertyNamesStr = propertyName.toString();
          if (this.selectors[propertyNamesStr] == undefined) continue;
          this.selectors[propertyNamesStr].flagValueAsChanged();
        }
      }
    }
  }

  getSelector<K extends keyof T>(propertyName: K) {
    const propertyNamesStr = propertyName.toString();
    if (this.selectors[propertyNamesStr] == undefined) {
      let selector = new StateManagmentSelector(propertyNamesStr);
      this.selectors[propertyNamesStr] = selector;
    }
    return this.selectors[propertyNamesStr];
  }
}

function getDiff<T extends object>(oldValue: T, newValue: T): Partial<T> {
  let diffObject: Partial<T> = {};
  for (const key in oldValue) {
    if (oldValue[key] !== newValue[key]) {
      diffObject[key] = newValue[key];
    }
  }
  return diffObject;
}

