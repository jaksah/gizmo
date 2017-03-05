import * as React from 'react';
import * as Redux from 'redux';
import { connect } from 'react-redux'

import { play } from '../actions'
import { Store } from '../reducers'


interface OwnProps {
  label: string
}

interface ConnectedState {
  messageLog: Store.MessageLog
}

interface ConnectedDispatch {
  play: (text: string) => void
}

const mapStateToProps = (state: Store.All, ownProps: OwnProps): ConnectedState => ({
    messageLog: state.messageLog,
});

const mapDispatchToProps = (dispatch: Redux.Dispatch<Store.All>): ConnectedDispatch => ({
  play: (text: string) => {
    dispatch(play(text))
  },
});

class PageComponent extends React.Component<ConnectedState & ConnectedDispatch & OwnProps, undefined> {
    _onClickIncrement = () => {
        this.props.play("Vad sägs om att gå till stan nu?")
    }

    render () {
        const { messageLog, label } = this.props
        return (
            <div>
                <label>{label}</label>
                <button ref='increment' onClick={this._onClickIncrement}>click me!</button>
                <div>
                    {messageLog.messages.map((m, i) => <div key={i}>{m.message} - {m.playedAt.toString()}</div>)}
                </div>
                {messageLog.isLoading && <div>Loading...</div>}
            </div>
        );
    }
}

export const Page: React.ComponentClass<OwnProps> = connect(mapStateToProps, mapDispatchToProps)(PageComponent);
