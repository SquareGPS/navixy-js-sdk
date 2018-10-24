# Navixy API JS SDK

## Usage:

```
const API = new Navixy.Api({
      user:{
         login:'demo@navixy.com',
         password:'demo'
      },
      domain:'demo.navixy.com'
})

API.tracker.list().then(list => console.log(list))
```
