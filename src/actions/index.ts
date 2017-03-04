import {sonosApi} from "../api";

type Q<T> = { request: T }
type S<T> = { response: T }
type E = { error: Error }

type QEmpty = Q<null>
type QValue = Q<{ value: number }>

type QText = Q<{ text: string }>

export type Action = {
  type: 'INCREMENT_COUNTER',
  delta: number,
} | {
  type: 'RESET_COUNTER',
}

// Async actions...
| ({ type: 'PLAY_TTS_REQUEST'} & QText)
| ({ type: 'PLAY_TTS_SUCCESS'} & QText & S<{}>)
| ({ type: 'PLAY_TTS_ERROR'} & QText & E)

export const incrementCounter = (delta: number): Action => ({
  type: 'INCREMENT_COUNTER',
  delta,
})

export const resetCounter = (): Action => ({
  type: 'RESET_COUNTER',
})

export type ApiActionGroup<_Q, _S> = {
  request: (q?: _Q)         => Action & Q<_Q>
  success: (s: _S, q?: _Q)  => Action & Q<_Q> & S<_S>
  error: (e: Error, q?: _Q) => Action & Q<_Q> & E
}

export const playTTS: ApiActionGroup<{text: string}, {message: string, playedAt: Date}> = {
  request: (request) =>
    ({ type: 'PLAY_TTS_REQUEST', request }),
  success: (response, request) =>
    ({ type: 'PLAY_TTS_SUCCESS', request, response }),
  error: (error, request) =>
    ({ type: 'PLAY_TTS_ERROR',   request, error }),
}

export function play(text: string) {
  return (dispatch) => {
    dispatch(playTTS.request({text}));

    return sonosApi.playText(text)
      .then(resp => resp.body)
      .then(json =>
        dispatch(playTTS.success({message: text, playedAt: new Date()}, {text}))
      )
      .catch(err =>
        dispatch(playTTS.error(err, {text}))
      )
  }
}