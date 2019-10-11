
const isNum = function( c ) {
  return c >= 48 && c <= 57;
};
const isLower = function( c ) {
  return c >= 97 && c <= 122;
};
const isUpper = function( c ) {
  return c >= 65 && c <= 90;
};
const isSymbol = function( c ) {
  return !( isLower( c ) || isUpper( c ) || isNum( c ));
};
const isLetter = function( c ) {
  return isLower( c ) || isUpper( c );
};
const makePass = () => ({
  num: 0,
  lower: 0,
  upper: 0,
  symbol: 0,
  MNS: 0,
  rep: 0,
  repC: 0,
  consecutive: 0,
  sequential: 0,
  len() {
    return this.num + this.lower + this.upper + this.symbol;
  },
  require() {
    let re = this.num > 0 ? 1 : 0;
    re += this.lower > 0 ? 1 : 0;
    re += this.upper > 0 ? 1 : 0;
    re += this.symbol > 0 ? 1 : 0;
    if ( re > 2 && this.len() >= 8 ) {
      return re + 1;
    }
    return 0;

  },
  score() {
    let sum = 0;
    sum += 4 * this.len();
    if ( this.lower > 0 ) {
      sum += 2 * ( this.len() - this.lower );
    }
    if ( this.upper > 0 ) {
      sum += 2 * ( this.len() - this.upper );
    }
    if ( this.num != this.len()) {
      sum += 4 * this.num;
    }
    sum += 6 * this.symbol;
    sum += 2 * this.MNS;
    sum += 2 * this.require();
    if ( this.len() == this.lower + this.upper ) {
      sum -= this.len();
    }
    if ( this.len() == this.num ) {
      sum -= this.num;
    }
    sum -= this.repC;
    sum -= 2 * this.consecutive;
    sum -= 3 * this.sequential;
    sum = sum < 0 ? 0 : sum;
    sum = sum > 100 ? 100 : sum;
    return sum;
  },
  level() {
    const s = this.score();
    if ( s >= 80 ) {
      return 'VERY_STRONG';
    } else if ( s >= 60 ) {
      return 'STRONG';
    } else if ( s >= 40 ) {
      return 'GOOD';
    } else if ( s >= 20 ) {
      return 'WEAK';
    }
    return 'VERY_WEAK';
  },
  levelText() {
    const levels = { VERY_STRONG: '非常强', STRONG: '强', GOOD: '好', WEAK: '弱', VERY_WEAK: '非常弱' };
    return levels[this.level()];
  },
  levelNum() {
    const level = this.level();
    return level === 'VERY_WEAK'
      ? 1 : level === 'WEAK'
      ? 2 : level === 'GOOD'
      ? 3 : level === 'STRONG'
      ? 4 : level === 'VERY_STRONG'
      ? 5 : 6;
  },
  clear() {
    this.num = 0;
    this.lower = 0;
    this.upper = 0;
    this.symbol = 0;
    this.MNS = 0;
    this.rep = 0;
    this.repC = 0;
    this.consecutive = 0;
    this.sequential = 0;
  }
});

export default function( val ) {
  const pass = makePass();
  for ( let i = 0; i < val.length; i++ ) {
    const c = val.charCodeAt( i );
    if ( isNum( c )) {
      pass.num++;
      if ( i != 0 && i != val.length - 1 ) {
        pass.MNS ++;
      }
      if ( i > 0 && isNum( val.charCodeAt( i - 1 ))) {
        pass.consecutive ++;
      }
    } else if ( isLower( c )) {
      pass.lower++;
      if ( i > 0 && isLower( val.charCodeAt( i - 1 ))) {
        pass.consecutive ++;
      }
    } else if ( isUpper( c )) {
      pass.upper++;
      if ( i > 0 && isUpper( val.charCodeAt( i - 1 ))) {
        pass.consecutive ++;
      }
    } else {
      pass.symbol++;
      if ( i != 0 && i != val.length - 1 ) {
        pass.MNS ++;
      }
    }
    let exists = false;
    for ( let j = 0; j < val.length; j++ ) {
      if ( val[i] == val[j] && i != j ) {
        exists = true;
        pass.repC += Math.abs( val.length / ( j - i ));
      }
    }
    if ( exists ) {
      pass.rep++;
      const unique = val.length - pass.rep;
      pass.repC = ( unique ) ? Math.ceil( pass.repC / unique ) : Math.ceil( pass.repC );
    }
    if ( i > 1 ) {
      const last1 = val.charCodeAt( i - 1 );
      const last2 = val.charCodeAt( i - 2 );
      if ( isLetter( c )) {
        if ( isLetter( last1 ) && isLetter( last2 )) {
          const v = val.toLowerCase();
          const vi = v.charCodeAt( i );
          const vi1 = v.charCodeAt( i - 1 );
          const vi2 = v.charCodeAt( i - 2 );
          if (( vi - vi1 ) == ( vi1 - vi2 ) && Math.abs( vi - vi1 ) == 1 ) {
            pass.sequential ++;
          }
        }
      } else if ( isNum( c )) {
        if ( isNum( last1 ) && isNum( last2 )) {
          if (( c - last1 ) == ( last1 - last2 ) && Math.abs( c - last1 ) == 1 ) {
            pass.sequential ++;
          }
        }
      } else if ( isSymbol( last1 ) && isSymbol( last2 )) {
        if (( c - last1 ) == ( last1 - last2 ) && Math.abs( c - last1 ) == 1 ) {
          pass.sequential ++;
        }
      }
    }
  }
  return pass;
}
