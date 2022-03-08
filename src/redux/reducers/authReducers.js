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

const jwToken = localStorage.getItem('token')
if (jwToken) {
  try {  
    const decoded = jwt_decode(jwToken);
    console.log(decoded)
    // if no error, update initial state
    initialState = {
      id: decoded.id,
      token: jwToken,
      isLogin: true,
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
