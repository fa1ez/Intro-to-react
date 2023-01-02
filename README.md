# Intro-to-react


Initialization
```
npx create-react-app projectname
#if node module is not present
npm install
npm run start
```
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

