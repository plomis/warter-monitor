
import fs from 'flystore';
import React from 'react';
import shortid from 'js-shortid';
import memoize from 'lodash.memoize';
import request from '../request';


// bridge 用来跳转
// propsCache 存储新旧 Props 在渲染时判断

const ID = shortid.gen();
const state = {};
const modelCache = {};
const bridge = fs( `${ID}-action` );
const propsCache= fs( `${ID}-connect` );


function getPropsKey( uniqueID ) {
  return function( key ) {
    return `${uniqueID}.${key}`;
  }
}


const getFuncs = memoize( function( namespace ) {
  return {

    put( action ) {
      const model = modelCache[namespace];
      if ( model.effects[action.type]) {
        return model.effects[action.type]( action, getFuncs( namespace ));
      }
      const newState = model.reducers[action.type]( state[namespace], action );
      if ( state[namespace] !== newState ) {
        state[namespace] = newState;
        bridge.dispense( 'rerender' );
      }
      return action;
    },

    call( action ) {
      const model = modelCache[namespace];
      if ( model.effects[action.type]) {
        return model.effects[action.type]( action, getFuncs( namespace ));
      }
    },

    select( map ) {
      return map( state );
    }

  };
});

export function loadModel( model ) {
  state[model.namespace] = model.state;
  modelCache[model.namespace] = model;
  const actionBridge = fs( model.namespace );
  const getKey = getPropsKey( model.namespace );
  model.bridge = actionBridge;
  Object.keys( model.reducers ).forEach(( key ) => {
    const reducer = model.reducers[key];
    actionBridge.watch( getKey( key ), ( action ) => {
      const newState = reducer( state[model.namespace], action );
      if ( newState !== state[model.namespace]) {
        state[model.namespace] = newState;
        bridge.dispense( 'rerender' );
      }
    });
  });
  Object.keys( model.effects ).forEach(( key ) => {
    const effect = model.effects[key];
    actionBridge.watch( getKey( key ), ( action ) => {
      effect( action, getFuncs( model.namespace ));
    });
  });
}


export const connect = ( mapStateToProps ) => ( Component ) => {

  class Connector extends React.Component {

    constructor( props ) {
      super( props );
      this.state = {};
      this.abortRequests = null;
      this.unique = shortid.gen();
      this.handlers = null;
      if ( mapStateToProps ) {
        this.state = mapStateToProps( state, props );
      }
    }

    componentDidMount() {
      propsCache.set( this.unique, this.state );
      this.watcher = bridge.watch( 'rerender', () => {
        let newProps = {};
        if ( mapStateToProps ) {
          newProps = mapStateToProps( state, this.props ) || {};
        }
        const prevProps = propsCache.get( this.unique );
        const needUpdate = Object.keys( newProps ).map(
          ( key ) => newProps[key] !== prevProps[key]
        ).some( bool => bool );
        if ( needUpdate ) {
          propsCache.set( this.unique, newProps );
          this.setState( newProps );
        }
      });
    }

    componentWillUnmount() {
      if ( this.watcher ) {
        this.watcher.clear();
        this.watcher = null;
      }
      if ( this.handlers ) {
        this.handlers();
        this.watcher = null;
      }
      if ( this.abortRequests ) {
        this.abortRequests();
        this.abortRequests = null;
      }
    }

    handleDispatch = ( action ) => {
      bridge.dispatch({ request: this.handleRequest, ...action });
    };

    handleEffects = ( namespace, effects ) => {
      if ( modelCache[namespace] ) {
        const actionBridge = modelCache[namespace].bridge;
        const getKey = getPropsKey( namespace );
        Object.keys( effects ).forEach(( key ) => {
          const effect = effects[key];
          const watcher = actionBridge.watch( getKey( key ), ( action ) => {
            effect( action, getFuncs( namespace ));
          });
          const older = this.handlers;
          this.handlers = () => {
            if ( older ) older();
            watcher.clear();
          }
        });
      }
    };

    handleReducers = ( namespace, reducers ) => {
      if ( modelCache[namespace] ) {
        const actionBridge = modelCache[namespace].bridge;
        const getKey = getPropsKey( namespace );
        Object.keys( reducers ).forEach(( key ) => {
          const reducer = reducers[key];
          const watcher = actionBridge.watch( getKey( key ), ( action ) => {
            const newState = reducer( state[namespace], action );
            if ( newState !== state[namespace]) {
              state[namespace] = newState;
              bridge.dispense( 'rerender' );
            }
          });
          const older = this.handlers;
          this.handlers = () => {
            if ( older ) older();
            watcher.clear();
          }
        });
      }
    };

    handleRequest = ( url, config = {}) => {
      let cancel = null;
      const CancelToken = request.CancelToken;
      const abortRequests = this.abortRequests;
      config.cancelToken = new CancelToken( function executor( cancel ) {
        this.abortRequests = () => {
          abortRequests();
          cancel();
        };
      });
      return request( url, config );
    };


    render() {
      return (
        <Component
          {...this.props}
          {...this.state}
          effect={this.handleEffects}
          reducer={this.handleReducers}
          dispatch={this.handleDispatch} />
      );
    }
  }

  if ( Component.navigationOptions ) {
    Connector.navigationOptions = Component.navigationOptions;
  }

  return Connector;
}
