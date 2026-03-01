import mediAPI from "../api/api";
import CreateDataContext from "./CreateDataContext"

const AuthReducer = (state, action)=>{
    switch(action.type){
        case 'login':
            return {...state, LoginData : action.payload};
        case 'login_status':
            return {...state, LoginStatus:action.payload};
        
        case 'register':
            return { ...state , RegisterData: action.payload}; 
        case 'register_Status':
            return {...state,Registerstatus:action.payload};

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

const RegisterUser = dispatch => async ({name,age,sex,address,phone,email,passowrd})=>{
    try{
    let data = {
    name:name,
    age:age,
    address:address,
    phone:phone,
    email:email,
    passowrd:passowrd,
    sex:sex
    }

    const  response = await mediAPI.post("/api/auth/signup",data,config);

        dispatch({ type: "register_Status", payload: response.status });
        dispatch({ type: "register", payload: response.data });
}
catch(e) {
    console.log(e)
}   
}
export const {Provider , Context}=CreateDataContext(
    AuthReducer,
    {
        UserLogin
    },{
        LoginData:[],
        LoginStatus:"",
    }
)