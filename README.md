# Intro-to-react


# Good to know

1. ***htmlFor*** differs from ***for*** because of reserved keywords in javascript (for loop). Same is the case with ***class*** and ***className***.
2. htmlFor is used to make UI more interactive (Clicking on label will autofocus the input)

# Components

>**Note : Use PascalCase in naming a component in react**

<br>There are two types of components in react, **Simple** and **Class**. In Simple components, there is only an arrow function which is being returned.
```
const HelloWorld = () => {
    return (  
        <div>
            <h1>Hello World !!</h1>
        </div>
    );
}
 
export default HelloWorld;
```

# Controlled vs unControlled Components

>**Note : File input are read only so they cannot be set programmatically**

Form elements (input,textarea etc) differ from other DOM elements in the aspect that they have their own inner state. React also has its own state management system. If you bind the states with the inputs its called controlled component.
```
const [name,setName] = useState("faiez")
<input
    value={name}
    onChange=((e) => setName(e.target.value))
/>
```
If we use the internal states of the form elements ,its called uncontrolled components because react is not controlling them. In this case, we usually use useRef to get the value.
```
const nameRef = useRef()
//nameRef.current.value = current value
<input
    ref=nameRef
/>

```

# Events

When calling an event, donot use the parenthesis of a function in the "onClick" attribute as it will invoke the function once. If args need to be passed then use an arrow function as below

```
 const Home = () => {

  const handleClick = (e) => {
    console.log('hello ninjas', e);
  }

  const handleClickAgain = (name, e) => {
    console.log('hello ' + name, e.target);
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
      <button onClick={(e) => handleClickAgain('mario', e)}>Click me again</button>
    </div>
  );
}
 
export default Home;
```
# Use-State hooks

To bind a variable to display dynamic values, we need use state hooks.

```
import { useState } from "react";

const Home = () => {
  //name and age are dynamic variables that are updated on Click me button
  const [name, setName] = useState('mario');
  const [age, setAge] = useState(25);

  const handleClick = () => {
    setName('luigi');
    setAge(30);
  }

  return (
    <div className="home">
      <h2>Homepage</h2>
      <p>{ name } is { age } years old</p>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
}
 
export default Home;
```

# Props
Send props from parent component to child components by sending them as an argument from the parent component like this
```
<Parent prop1={variable} prop2="hello world" />
```
Child component
```
//method 1
const child = {props} =>{
  let v1=props.prop1
  let v2=props.prop2
}

//method 2
const child = {{prop1,prop2}} =>{
  let v1=props.prop1
  let v2=props.prop2
}

```
Functions can also passed as props using the same way and can be invoked from the child. 

**Note: When using a use state setFunction, create an arrow function and use the set function in that arrow function and pass the arrow function as a prop**
```
const handleDelete = (id) => {
  const newBlogs = blogs.filter(blog => blog.id !== id);
  setBlogs(newBlogs);
}
return (
  <div className="home">
    <BlogList handleDelete={handleDelete} />
  </div>
);
```

# React Redux
Tutorial -> https://www.youtube.com/watch?v=5yEG6GhoJBs&t=1016s 
### Getting started

Component dispatches action

Actions are sent to store

Reducers process actions & update store

Store is propagated back to componets



Actions -> is a plain JS object, dispatched to reducers to update state (describe state changes)
Reducers -> Pure functions that update the state

```
Pure function: same input produces same output and no side effects

func add(a,b){
return a+b
}
```

Middleware intercept actions before they reach reducers enabling asunc logic etc.

# Setup (with persists)

main.js
```
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
       <App />
    </PersistGate>
</Provider>
```

create a store folder with following architecture

![image](https://github.com/user-attachments/assets/f89bb639-cd8a-4c5f-965a-8af80e536399)

store.js
```

const persistConfig = {
  key: "root",
  storage,
};

const combinedPersistedReducer = combineReducers({
  userReducer: userSlice.reducer,
});

const persistedReducer = persistReducer(
  persistConfig,
  combinedPersistedReducer
);

const rootReducer = combineReducers({
  persistedRoot: persistedReducer,
  //apis to not persist
  [authApi.reducerPath]: authApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      // getDefaultMiddleware({
      //   serializableCheck: {
      //     ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      //   },
      // }).concat(
      authMiddleware,
      authApi.middleware
    ),
});

export const persistor = persistStore(store);

```

userslice.jsx
```
// redux/userSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:  null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = { ...action.payload };
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const selectUser = (state) => state.persistedRoot.userReducer.user;

export const { setUser, logout } = userSlice.actions;

export default userSlice;
```

store should be setup with these minilmalist settings for user authentication

