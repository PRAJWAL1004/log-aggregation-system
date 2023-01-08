lwt({event: 'boot'});
var AWS = require('aws-sdk');
var DDB = new AWS.DynamoDB.DocumentClient();
var TABLE = 'table-name';
exports.handler = function (ev, ctxt) {
  lwt({event: 'invoke', data: ev});
  switch (ev.fn) {
    case 'PUT':
      lwt({event: 'put', data: ev})
      DDB.put({TableName: TABLE, Item: ev.data}, dcb);
      break;
    case 'GET':
      lwt({event: 'get', data: ev})
      DDB.get({TableName: TABLE, Key: {id: ev.id}}, dcb);
      break;
    default:
      var e = {event: 'unknowncmd', data: ev};
      lwt(e);
      ctxt.fail(e);
      break;
  }
  function dcb (err, data) { 
    if (err) { 
      var e = {event: 'error', data: err};
      lwt(e); return ctxt.fail(e);
    }
    ctxt.done(null, {event: 'resp', data: data})
  }
};
function lwt(e) {e.timestamp = Date.now(); console.log(JSON.stringify(e));}