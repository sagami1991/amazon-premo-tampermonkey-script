function myFunction() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const threads = GmailApp.search('label:amazon-premo');
  var row = 2;
  const column = 3;
  if (sheet.getRange(row,column).getValue()) {
    Browser.msgBox("C列2行目にすでにデータがあるので終了します");
    return;
  } 
   
  threads.forEach(function(thread) {
    var msgs = thread.getMessages();
    var msg = msgs[0];
    var body = msg.getBody();
    var matches = body.match(/https:\/\/link3\.kessai.info\/JLP\/JLPcon.+/);
    Logger.log(matches);
    if (matches) {
      sheet.getRange(row,column).setValue(matches[0]);
      row++;
    }
  })
}
