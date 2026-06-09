import mediAPI from "../api/api";
import CreateDataContext from "./CreateDataContext"

const SavePredictReducer = ( state,  action  )=>{
    switch(action.type){

        case 'savePredict':
            return{...state, SaveData : action.payload};
        case 'savePredict_status':
            return{...state, SavedataStatus:action.payload};
        case 'clear_savePredict_staus':
            return{...state, SavedataStatus:""};        

    }
};

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}

const SavePredictData = dispatch => async ({ age,sex,cp,trestbps,chol,fbs,
    restecg,thalach,exang,oldpeak,slope,ca,thal,prediction,probability

})=>{
    try {

const data ={
    age:age, 
  sex: sex, 
  cp: cp,
  trestbps:trestbps,
  chol:chol ,
  fbs: fbs,
  restecg:restecg, 
  thalach:thalach ,
  exang:exang ,
  oldpeak:oldpeak ,
  slope:slope ,
  ca: ca,
  thal: thal,
  prediction:prediction ,
  probability:probability 
}

const response = await mediAPI.post("/api/patient/saveprediction",data,config);

dispatch ({ type :"savePredict_status" ,  payload:response.status});
dispatch ({  type :"savePredict" , payload:response.data});
    }
    catch(e){
        console.log(e);
        dispatch({type : "savePredict_status", payload : 400})
    }
};


const clearsaveStatus = dispatch => () => {
    dispatch({ type: "clear_savePredict_staus" });
};

export const {Provider , Context}=CreateDataContext(
    SavePredictReducer,
    {
        SavePredictData,
        clearsaveStatus
    },{
        SaveData:[],
        SavedataStatus:"",
       

    }
)