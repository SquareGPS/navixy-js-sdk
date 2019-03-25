# Navixy API JS SDK

[DEMO](https://squaregps.github.io/navixy-js-sdk/examples/list/)

## Installation
With NPM
```
npm i navixy-js-sdk -s
```

Script tag
```
<script src="https://unpkg.com/navixy-js-sdk/dist/navixy-js-sdk.js"></script>
```

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

You can call any Navixy API requests: (see [DOCs](https://developers.navixy.com/#/api/getting-started/))

## Request method

```API.request(<request-name>, [<parameters>], [<root-property>])```
Arguments:
- request-name - full request name e.g. 'trackers/list' (see [DOCs](https://developers.navixy.com/#/api/getting-started/))
- parameters [Optional] - object with request parameters
- root property [Optional] - string name of root property of answer

### Example:
```
API.request('tracker/counter/value/get', {
   tracker_id: 12345,
   type: 'odometer'
}, 'value').then(odometer => console.log(odometer)) // 18.9

/* full answer
{
    "success": true,
    "value": 18.9  // float. last value of counter
}
*/
``` 


