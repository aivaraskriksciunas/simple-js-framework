# simple-js-framework
A very basic Vue.js like JavaScript framework written from scratch.

All the code is stored in `framework.js`. `index.html` is for testing. Currently, not many features are supported.

Some of the supported featuress are:
- interpolation
- class binding
- click events
- two-way data binding

I made this framework just for fun, and I decided to put it on github for inspiration. Do whatever you want with it.

### Short tutorial
Initialize your framework at the bottom of the page, after including `framework.js` file
```
<script>
Framework( {
  el: "#app", // Framework Container
  data: {
    // Your variables and functions go here
  }
);
</script>
```

Interpolation works by using double curly braces: `{{yourVariable}}` 

Class binding: 
```
<div fw-class.className="booleanVariable"></div>
```

Click binding:
```
<button fw-on="functionName"></button>
```

Two way data-binding: 
```
<input fw-model="variable" type='text'>
```
