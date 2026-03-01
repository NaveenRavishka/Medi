import mediAPI from "../api/api";
import CreateDataContext from "./CreateDataContext"

const AuthReducer = (state, action)=>{
    switch(action.type){
        case 'login':
            return {...state, LoginData : action.payload};
        case 'login_status':
            return {...state, LoginStatus:action.payload};
        case "clear_login_status":
            return { ...state, LoginStatus: "" };    
        
        case 'register':
            return { ...state , RegisterData: action.payload}; 
        case 'register_Status':
            return {...state,Registerstatus:action.payload};
   case "clear_register_status":
            return { ...state, Registerstatus: "" };
     default:
        return state;       
    }


};


const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

const UserLogin = dispatch => async({ email,password})=>{
    try{
     let data = {email :email, password:password}
     
     const response = await mediAPI.post("/api/auth/login", data,config);
        dispatch({ type: "login_status", payload: response.status });
        dispatch({ type: "login", payload: response.data });

    }catch(e){
        console.log(e);
            dispatch({ type: "login_status", payload: 400 });
    }
}

const clearLoginStatus = dispatch => () => {
    dispatch({ type: "clear_login_status" });
};

const RegisterUser = dispatch => async ({name,age,sex,address,phone,email,password})=>{
     try {
    // Convert age to integer
    const intAge = parseInt(age, 10);

    const data = {
      name,
      age: intAge,
      sex,
      address,
      phone,
      email,
      password
    }

    const  response = await mediAPI.post("/api/auth/signup",data,config);

        dispatch({ type: "register_Status", payload: response.status });
        dispatch({ type: "register", payload: response.data });
}
catch(e) {
    console.log(e);
      dispatch({ type: "login_status", payload: 400 });
}   
}

const clearUserRegisterStatus = dispatch => () => {
    dispatch({ type: "clear_register_status" });
};



export const {Provider , Context}=CreateDataContext(
    AuthReducer,
    {
        UserLogin,
        RegisterUser,
        clearLoginStatus,
        clearUserRegisterStatus
    },{
        LoginData:[],
        LoginStatus:"",
        RegisterData:[],
        Registerstatus:""

    }
)