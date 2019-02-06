# Navixy API JS SDK

## Usage:
With client login and password:
```
const API = new Navixy.Api({
      user:{
         login:'demo@navixy.com',
         password:'demo'
      },
      domain:'demo.navixy.com'
})

API.tracker.list().then(list => console.log(list))
API.request('user/settings').then(settings => console.log(settings))
```

With [hash](https://developers.navixy.com/#/api/resources/user/?id=auth):

```
const API = new Navixy.Api({
      user:{
        hash: '<client-key>'
      }
})

API.tracker.list().then(list => console.log(list))
```

You can change the auth hash dynamically:

```
const API = new Navixy.Api()

// List of the First Client trackers
API.setHash('<first-client-key>').tracker.list().then(list => console.log(list))

 // List of the Second Client trackers
API.setHash('<second-client-key>').tracker.list().then(list => console.log(list))
```

You can call any Navixy API request: (see [DOCs](https://developers.navixy.com/#/api/getting-started/))


