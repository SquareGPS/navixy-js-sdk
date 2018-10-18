# Navixy API JS SDK

## Usage:

```
const API = new Navixy.api({
      user:{
         login:'demo@navixy.com',
         password:'demo'
      },
      domain:'demo.navixy.com'
})

API.tracker.list().then(list => console.log(list))
```
