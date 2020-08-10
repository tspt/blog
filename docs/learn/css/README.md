`#1`
`score: 600.39`
```html
<div class="container-01"></div>
<style>
  body {
    margin: 0;
  }
  .container-01 {
    width: 400px;
    height: 300px;
    background: #5d3a3a;
  }
  .container-01:before {
    display: block;
    content: '';
    width: 200px;
    height: 200px;
    background: #b5e0ba;
  }
</style>
```


`#2`
`score: 600.08`
```html
<div class="container-02">
  <div class="c-item"></div>
  <div class="c-item"></div>
  <div class="c-item"></div>
  <div class="c-item"></div>
</div>
<style>
  body {
    margin: 0;
  }
  .container-02 {
    width: 400px;
    height: 300px;
    background: #62374e;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
  }
  .container-02 .c-item {
    margin: 50px;
    width: 50px;
    height: 50px;
    background: #fdc57b;
  }
</style>
```

`#3`
```html
<div></div>
<style>
  body {
    margin: 0;
    background: #6592CF;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 75px auto;
    width: 300px;
    height: 150px;
    background: #243D83;
  }
  div:before, div:after {
    content: '';
    border-radius: 50%;
  }
  div:before {
    width: 150px;
    height: 150px;
    border: 50px solid #6592CF;
  }
  div:after {
    position: absolute;
    border: 25px solid #EEB850;
  }
</style>
```


`#4`
```html

```