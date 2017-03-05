import { combineReducers } from 'redux'
import { Action } from '../actions/index';

export namespace Store {

  export type Counter = { value: number }
  export type MessageLog = {
    isLoading: boolean,
    messages: {
      message: string,
      playedAt: Date
    }[]
  }

  export type All = {
    counter: Counter,
    messageLog: MessageLog
  }
}

const initialState: Store.Counter = {
  value: 0,
}

function counter (state: Store.Counter = initialState, action: Action): Store.Counter {
  const { value } = state
  switch (action.type) {
    case 'INCREMENT_COUNTER':
      const newValue = value + action.delta
      return { value: newValue }
    case 'RESET_COUNTER':
      return { value: 0 }
  }

  return state
}

const initialLogState: Store.MessageLog = {
  isLoading: false,
  messages: []
}
function messageLog (state: Store.MessageLog = initialLogState, action: Action): Store.MessageLog {
  const { messages } = state;
  switch (action.type) {
    case 'PLAY_TTS_REQUEST':
      return {messages: state.messages, isLoading: true};
    case 'PLAY_TTS_SUCCESS':
      const {message, playedAt} = action.response as {message: string, playedAt: Date};
      const newValue = messages.concat({message, playedAt})
      return {messages: newValue, isLoading: false};
    case 'PLAY_TTS_ERROR':
      return {messages: state.messages, isLoading: false};
  }
    return state
}

export const reducers = combineReducers<Store.All>({
  counter,
  messageLog
})