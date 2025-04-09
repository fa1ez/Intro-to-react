
const authMiddleware = (store) => (next) => (action) => {
    // const navigate = useNavigate(); 
    console.log("store middle",store.getState()?.persistedRoot?.userReducer);
    
    // if(!store.getState()){
    //   navigate("/")
    // }
      return next(action);
};

export default authMiddleware;
