var scriptProp =  PropertiesService.getScriptProperties().getProperties();
const TRELLO_API_URL = 'https://api.trello.com/';
const TRELLO_USER_ID = scriptProp.TRELLO_USER_ID;
const TRELLO_KEY = scriptProp.TRELLO_API_KEY;
const TRELLO_TOKEN = scriptProp.TRELLO_TOKEN;
const TRELLO_LIST_COMP_ID = scriptProp.TRELLO_LIST_ID_COMPLETED;
const TRELLO_BOARD_ID = scriptProp.TRELLO_BOARD_ID
const TRELLO_TAG_IRUCA_COMPLETED_ID = scriptProp.TRELLO_TAG_IRUCA_COMPLETED_ID

/*
 ボード一覧をログに表示する（調査用）
*/
function main() {
  Logger.log('ボード一覧');
  let boards = getBoards()
  for (let i = 0; i < boards.length; i++){
    Logger.log(boards[i].id);
    Logger.log(boards[i].name);
  }
}

/*
 ボード一覧取得するメソッド
*/
function getBoards() {

  let params = {
    'method': 'GET',
    'headers': {'ContentType': 'application/json'},
  };
  let url = TRELLO_API_URL + '1/members/' + TRELLO_USER_ID + '/boards'
          + '?key=' + TRELLO_KEY
          + '&token=' + TRELLO_TOKEN;
  
  let result = UrlFetchApp.fetch(url, params).getContentText();
  return JSON.parse(result);
}


/*
 指定のidのカードに、trello連携完了ラベルをつけて更新する
*/
function updateLabelOfCard(id){
  //Trello連携完了ラベルをつける
  labelCompletedId = TRELLO_TAG_IRUCA_COMPLETED_ID

  let requestUrl = TRELLO_API_URL + '1/cards/'+ id
          + '?key=' + TRELLO_KEY
          + '&token=' + TRELLO_TOKEN;

  var options = {
    'method' : 'put',
    'payload' : {
      'idLabels': labelCompletedId
    }
  }

  Logger.log(UrlFetchApp.fetch(requestUrl, options));

}

/*
 ラベルを取得する（調査用）
*/
function getLabels(){

  let params = {
    'method': 'GET',
    'headers': {'ContentType': 'application/json'},
  };

  let url = TRELLO_API_URL + '1/lists/' + TRELLO_LIST_COMP_ID + '/cards'
          + '?key=' + TRELLO_KEY
          + '&token=' + TRELLO_TOKEN;
  let result = UrlFetchApp.fetch(url, params).getContentText();
  json = JSON.parse(result)
  for (i = 0 ; i < json.length ; i++ ){
    Logger.log( json[i].name)
    Logger.log( json[i].idLabels)
    
    if (name == json[i].name){
      return json[i].id
    }
  }
  return null;
}