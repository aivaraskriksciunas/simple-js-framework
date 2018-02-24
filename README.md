# simple-js-framework
A very basic Vue.js like JavaScript framework written from scratch.

All the code is stored in `simpleton.js`. `index.html` is for testing. Currently, not many features are supported.

Some of the supported featuress are:
- interpolation
- class binding
- conditional attributes
- attribute binding
- click events
- two-way data binding

I made this framework just for fun, and I decided to put it on github for inspiration. Do whatever you want with it.

### Short tutorial
Initialize your framework at the bottom of the page, after including `simpleton.js` file
```
<script>
Simpleton( {
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
<div sl-class.className="booleanVariable"></div>
```

Conditional attributes
```
<div sl-if="boolean"></div>
```

Attribute binding:
```
<input sl-bind.type="variable">
```

Click binding:
```
<button sl-on="functionName"></button>
```

Two way data-binding: 
```
<input sl-model="variable" type='text'>
```
