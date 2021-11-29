function sendIrucaEntry(member_id, room_code, dt_str) {
  var requestUrl = "https://iruca.co/api/rooms/"+room_code+"/members/"+member_id

  requestBody = mkIrucaPostData('在席') //在席、退社 
  // POSTオプション
  var options = {
    "method":"PUT",
    'headers': {'ContentType': 'application/json'},
    "payload":requestBody,
    muteHttpExceptions: true
  };
  
  var res = UrlFetchApp.fetch( requestUrl , options );
}

function sendIrucaExit(member_id, room_code, dt_str) {
  var requestUrl = "https://iruca.co/api/rooms/"+room_code+"/members/"+member_id

  requestBody = mkIrucaPostData('退社') //在席、退社 
  // POSTオプション
  var options = {
    "method":"PUT",
    'headers': {'ContentType': 'application/json'},
    "payload":requestBody,
    muteHttpExceptions: true
  };
  
  var res = UrlFetchApp.fetch( requestUrl , options );
}

function mkIrucaPostData(status){

  return {
    "status": status,
  }

}