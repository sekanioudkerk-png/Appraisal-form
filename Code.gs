/**
 * Google Apps Script – receives appraisal submissions from the web form
 * and appends them as a new row in a Google Sheet (opens/exports as Excel).
 *
 * Setup: see README.md, Option B.
 * Sheet tab must be named "Appraisals" and row 1 must hold the headers
 * (copy them from row 1 of PacRim_Appraisals.xlsx).
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Appraisals");
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    var row = headers.map(function (h) { return data[h] === undefined ? "" : data[h]; });
    sheet.appendRow(row);
    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
