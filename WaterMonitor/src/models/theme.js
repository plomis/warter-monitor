

export default {
  namespace: 'theme',
  state: {
    mode: 'light'
  },
  effects: {

  },
  reducers: {
    // 需要渲染
    update( state, { payload }) {
      return Object.assign( {}, state, payload );
    }
  }
};
