
import moment from 'moment';

export default {
  namespace: 'balance',
  state: {
    beginDate: moment().add( -29, 'day' ).format( 'YYYY-MM-DD' ),
    endDate: moment().format( 'YYYY-MM-DD' )
  },
  effects: {
  },
  reducers: {
    update( state, { payload }) {
      return { ...state, ...payload };
    }
  }
};
