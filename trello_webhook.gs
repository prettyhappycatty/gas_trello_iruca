var scriptProp =  PropertiesService.getScriptProperties().getProperties();
var trelloKey = scriptProp.TRELLO_API_KEY;
var trelloToken = scriptProp.TRELLO_TOKEN;
var callbackUrl = "https://script.google.com/macros/s/xxxxx/exec";
var boardId = scriptProp.BOARD_ID;

/*
 Webページのバージョンを変えるときに、WebhookのURLを塗り替える
 動作要件：公開されているWEBページが、全員に公開以外であること
*/
function clearAndCreateWebhook(){
  id = getWebhook()
  if (id){
    deleteWebhook(id)
  }
  createWebhook()
}

/*
 Webhookを登録するメソッド
*/
function createWebhook(){
  var requestUrl = 'https://api.trello.com/1/tokens/' + trelloToken + '/webhooks/?key=' + trelloKey;
  var options = {
    'method' : 'post',
    'headers': {'ContentType': 'application/json'},
    'payload' : {
      'description': 'Webhook of Trello',
      'callbackURL': callbackUrl,
      'idModel': boardId
    },
    'muteHttpExceptions' : true
  }
  Logger.log(UrlFetchApp.fetch(requestUrl, options));
}

/*
 Webhookを取得するメソッド
*/
function getWebhook(){
  var requestUrl = 'https://api.trello.com/1/tokens/' + trelloToken + '/webhooks/?key=' + trelloKey;

  var options = {
    'method' : 'get',
    'payload' : {
    }
  }
  ret = UrlFetchApp.fetch(requestUrl, options)
  json = JSON.parse(ret)
  return json[0].id
}

/*
 特定のidのWebhookを削除するメソッド
*/
function deleteWebhook(id){
  var requestUrl = 'https://api.trello.com/1/tokens/' + trelloToken + '/webhooks/'+id+'?key=' + trelloKey;
  Logger.log(requestUrl)

  var options = {
    'method' : 'delete',
    'payload' : {
    }
  }
  ret = UrlFetchApp.fetch(requestUrl, options)
  Logger.log(ret);
}
