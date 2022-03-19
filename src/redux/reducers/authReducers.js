import { AddBoxSharp } from "@mui/icons-material";
import jwt_decode from "jwt-decode";

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
  id: '',
  token: '',
  isLogin: false,
  name: '',
  businessName: '',
  photo: '',
  address: '',
  email: '',
};

const jwToken = localStorage.getItem('token')
if (jwToken) {
  try {
    console.log('TOKEN FOUND 👍, checking validity...')
    const decoded = jwt_decode(jwToken);

    const dtDiff = Math.round(decoded.exp - Date.now() / 1000)

    let loginState;
    if (dtDiff > 0) {
      
      console.log(`Nice, token will still be valid for the next ${timeSince(dtDiff)} 🤗`)
      loginState = true;
    }
    else {
      console.log(`Oh no.. token has expired ${timeSince(Math.abs(dtDiff))} ago 😮😬`)
      loginState = true;
    }
    // if no error, update initial state
    initialState = {
      id: decoded.id,
      token: jwToken,
      isLogin: loginState,
      name: decoded.userName,
      businessName: decoded.userName,
      photo: '',
      address: '',
      email: '',
    }
  } catch (err) {
    console.log(err)
  }
} else {
  console.log('jwToken not exist is localStorage')
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
        id: '',
        token: '',
        name: '',
        businessName: '',
        photo: '',
        address: '',
        email: '',
        isLogin: false,
      };
    default:
      return state;
  }
};

export default authReducers;
