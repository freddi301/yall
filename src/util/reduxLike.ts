export type ActionHandler<State, Payload> = (state: State, arg: Payload) => State;
export type ActionHandlers<State> = { [index: string]: ActionHandler<State, any> };

export type Action<Type, Payload> = { type: Type; payload: Payload };
export type ActionCreator<Type, Payload> = (arg: Payload) => Action<Type, Payload>;
export type ActionCreators = { [index: string]: ActionCreator<any, any> };

type ActionCreatorsFrom<Handlers extends ActionHandlers<any>> = {
  [Type in keyof Handlers]: ActionCreator<Type, ExtractPayoladType<Handlers[Type]>>
};

type ExtractPayoladType<T extends ActionHandler<any, any>> = T extends ActionHandler<any, infer Payload> ? Payload : any;

export const actionsOf = <State, Handlers extends ActionHandlers<State>>(handlers: Handlers): ActionCreatorsFrom<Handlers> => {
  const actionsCreators: ActionCreatorsFrom<Handlers> = {} as ActionCreatorsFrom<Handlers>;
  const actionCreator = (type: string) => (payload: any) => ({ type, payload });
  Object.keys(handlers).forEach(type => (actionsCreators[type] = actionCreator(name)));
  return actionsCreators;
};

export const reducerOf = <State, Handlers extends ActionHandlers<State>>(handlers: Handlers) => <
  Name extends keyof Handlers,
  Payload extends ExtractPayoladType<Handlers[Name]>
>(
  state: State,
  action: Action<Name, Payload>
): State => {
  return handlers[action.type](state, action.payload);
};
