function doPost(e) {
  // ID for the spreadsheet
  var spreadSheetId = '1aGvCwvs9JHZh4V7juxsWOypPVEx32DdkGK3MdqO2w7c';

  // Check if there is post data, parse it if there is
  if (e && e.postData) {
    var jsonData = JSON.parse(e.postData.getDataAsString());
    var resource = {
      "majorDimension": "ROWS",
      "values": [[new Date(), jsonData.firstName, jsonData.email, jsonData.phoneNumber, jsonData.frequency, jsonData.bedrooms, jsonData.bathrooms, jsonData.source]]
    };
    var optionalArgs = {valueInputOption: "USER_ENTERED"};
    Sheets.Spreadsheets.Values.append(resource, spreadSheetId, "Sheet1!A:G", optionalArgs);
  }

  // Send back a normal response
  var response = JSON.stringify({
    status: "OK"
  });
  return ContentService.createTextOutput(response).setMimeType(ContentService.MimeType.JAVASCRIPT);
}

