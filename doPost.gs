/*
 Trello上で何かしらの変更が発生した時に毎回実行される
*/
function doPost(e){
  var contents = JSON.parse(e.postData.contents);

  logSpreadsheet(contents)
  var actionType = contents.action.type;
  var destinationList = contents.action.data.listAfter;
  
  // 変更がカードの移動でない場合にリターン
  if(actionType !== 'updateCard' || !destinationList) { return; }
  
  var scriptProp =  PropertiesService.getScriptProperties().getProperties();
  var irucaMemberId = scriptProp.IRUCA_MEMBER_ID;
  var irucaRoomId = scriptProp.IRUCA_ROOM_ID;
  
  
  var cardName = contents.action.data.card.name;
  var cardId = contents.action.data.card.id;
  var listName = destinationList.name;
  var shortLink = 'https://trello.com/c/' + contents.action.data.card.shortLink;
  var movedUser = contents.action.memberCreator.fullName;

  today_str = getTodayStr()
  logSpreadsheet(today_str)
  logSpreadsheet(irucaMemberId + irucaRoomId + movedUser + cardName + cardId + listName)

  //「勤怠報告（出勤）」が「完了」リストに移動された場合の処理
  if (cardName == "勤怠報告（出勤）" & listName == "完了"){
    sendIrucaEntry(irucaMemberId, irucaRoomId, today_str)
    updateLabelOfCard(cardId)
  }

  //「勤怠報告（退勤）」が「完了」リストに移動された場合の処理
  if (cardName == "勤怠報告（退勤）" & listName == "完了"){
    sendIrucaExit(irucaMemberId, irucaRoomId, today_str)
    updateLabelOfCard(cardId)
  }
}

/*
 今日の日付文字列を作成するメソッド
*/
function getTodayStr(){
  var date = new Date();
  var today_str = Utilities.formatDate(date, 'Asia/Tokyo', 'yyyy/MM/dd')
  Logger.log(today_str)
  return today_str
}

/*
 スプレッドシートの新規行にログを追加できるメソッド
*/
function logSpreadsheet(memo){
  // 現在開いているスプレッドシートを取得
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName("request")
  let lastRow = sheet.getLastRow();

  // 指定したセルの値を変更する
  sheet.getRange(lastRow+1,1).setValue(memo);
}

function testLogSpreadsheet(){
  logSpreadsheet("test")
}