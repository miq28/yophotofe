import jwt_decode from "jwt-decode";
import log from '../../utils/logger';

function timeSince(seconds) {
  const intervals = [
    { label: 'year', seconds: 31536000 },
    { label: 'month', seconds: 2592000 },
    { label: 'day', seconds: 86400 },
    { label: 'hour', seconds: 3600 },
    { label: 'minute', seconds: 60 },
    { label: 'second', seconds: 1 }
  ];
  
  const interval = intervals.find(i => i.seconds < seconds);
  const count = Math.floor(seconds / interval.seconds);
  return `${count} ${interval.label}${count !== 1 ? 's' : ''}`;
}


let initialState = {
  id: null,
  membership: null,
  role: null,
  token: null,
  token_exp: null,
  token_status: null,
  isLogin: null,
  name: null,
  businessName: null,
  photo: null,
  address: null,
  email: null
}

let tokenStatusState;
let isLoginState;
const jwToken = localStorage.getItem('token')
if (jwToken) {
  try {
    log.info('TOKEN FOUND 👍, checking validity...')
    const decoded = jwt_decode(jwToken);

    const dtDiff = Math.round(decoded.exp - Date.now() / 1000)

    
    if (dtDiff > 0) {
      
      log.info(`Nice, token will still be valid for the next ${timeSince(dtDiff)} 🤗`)
      tokenStatusState = 'VALID';
      isLoginState = true;
    }
    else {
      log.warn(`Oh no.. token has expired ${timeSince(Math.abs(dtDiff))} ago 😮😬`)
      tokenStatusState = 'EXPIRED';
      isLoginState = false;
    }
    // if no error, update initial state
    initialState = {
      id: decoded.id,
      membership: decoded.membership,
      role: decoded.role,
      token: jwToken,
      token_exp: decoded.exp,
      token_status: tokenStatusState,
      isLogin: isLoginState,
      name: decoded.name,
      businessName: decoded.name,
      photo: decoded.avatar,
      address: decoded.address,
      email: decoded.email,
    }
  } catch (err) {
    log.info(err)
  }
} else {
  log.info('jwToken not exist is localStorage')
}

const authReducers = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload, isLogin: true };
    case 'TOKENEXPIRED':
      return { ...state, ...action.payload, isLogin: false };
    case 'LOGOUT':
      return {
        ...state,
        id: null,
        membership: null,
        role: null,
        token: null,
        token_exp: null,
        token_status: null,
        name: null,
        businessName: null,
        photo: null,
        address: null,
        email: null,
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducers;
