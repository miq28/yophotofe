import jwt_decode from "jwt-decode";

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

// const jwToken = localStorage.getItem('token')
// if (jwToken) {
//   try {
//     console.log('TOKEN FOUND 👍, checking validity...')
//     const decoded = jwt_decode(jwToken);
//     // console.log(decoded)

//     let loginState;
//     if (Date.now() <= decoded.exp) {
//       console.log(`Nice, token will still be valid for the next ${Math.round(decoded.exp - Date.now() / 1000)} seconds 🤗`)
//       loginState = true;
//     }
//     else {
//       console.log('Oh no.. token has expired 😮😬')
//       loginState = false;
//     }
//     // if no error, update initial state
//     initialState = {
//       id: decoded.id,
//       token: jwToken,
//       isLogin: loginState,
//       name: decoded.userName,
//       businessName: decoded.userName,
//       photo: '',
//       address: '',
//       email: '',
//     }
//   } catch (err) {
//     console.log(err)
//   }
// } else {
//   console.log('jwToken not exist is localStorage')
// }

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
