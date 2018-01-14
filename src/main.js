
function startVolume(){
  //the URL of the Master Sheet
  var ss = SpreadsheetApp.openByUrl("https://docs.google.com/spreadsheets/d/1O7fhTRFU7hp2WhzvhQ90UZek0VNDMKciy66tP1JTPwE/edit#gid=0");

  //Get templates
  var eicIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next();
  var sectionIssueSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
  var sectionPhotoSpreadsheet = DriveApp.getFilesByName("section_photo_spreadsheet_template").next();
  var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
  var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();
  var issueNotesTemplate = DriveApp.getFilesByName("issue_notes_template").next();

  //package them nicely :)
  var templates = {
      "eicIssueSheet":eicIssueSpreadsheetTemplate,
      "sectionIssueSheet": sectionIssueSpreadsheet,
      "sectionPhotoSheet":sectionPhotoSpreadsheet,
      "inshort":inshortTemplate,
      "sportsBlitz":sportsBlitzTemplate,
      "issueNotes":issueNotesTemplate
  };

  var volume = new Volume(ss, templates);
  return volume;
}

volume = startVolume();
var eicSheet = volume.eic_copy_sheet;
//Make triggers
//Note: We are limited to having 20 triggers per script

function pullFromSectionWithParams(issueNum,volume, eicIssueSheet){
    //Will is a dictionary mapping issueNum {Strings}: [[spreadsheet, section],[spreadsheet, section]]
    var allSheetsByIssue = volume.allSheetsByIssue;

    //MailApp.sendEmail("kjmoore@mit.edu", "allSheetsByIssue", JSON.stringify(allSheetsByIssue["news"].keys()));

    //go through each Section, go to the issue number of the active sheet's issue
    thisIssueSheets = allSheetsByIssue[issueNum]; //format: [[spreadsheet, section],[spreadsheet, section]]

    var sheetContents;
    //go through each section + its sheet for a given issue
    for (var i in thisIssueSheets){
        var section = thisIssueSheets[i];
        var secSheet = section[0];
        var secName = section[1];
        //retrieve all contents
        //getRange(row, column, numRows, numColumns).getValues() ==> returns Object[][]
      var nr = secSheet.getLastRow();
      var nc = secSheet.getLastColumn();
        sheetContents = secSheet.getSheets()[0].getRange(2,1,nr, nc);
        sheetContentsValues = sheetContents.getValues();

        var sectionRowIndexInEicSheet = findSectionRowInEicSheet("N"+issueNum, secName, eicIssueSheet);

        //for each row that will need to be copied, insert a blank row
        eicIssueSheet.insertRowsAfter(sectionRowIndexInEicSheet, sheetContentsValues.length);

        //copyValuesToRange(destinationSheet, column, columnEnd, row, rowEnd)

        //sheetContents.copyValuesToRange(eicIssueSheet.getSheetByName("N"+issueNum), 2, secSheet.getLastColumn()+1, startRow, endRow);

        var startRow = sectionRowIndexInEicSheet+1;
        var startCol = 2 ;
        var numRow = sheetContentsValues.length;
        var numCol = secSheet.getSheets()[0].getLastColumn();
        var eicRange = eicIssueSheet.getSheetByName("N"+issueNum).getRange(startRow,startCol, numRow, numCol);

        var l = eicRange.getValues();

        eicRange.setValues(sheetContentsValues);
    }
     return sheetContents;
}

function findSectionRowInEicSheet(issueNumber, sectionName, eicSheet){
    //find the section in the EIC sheet (getSheetValues of that sheet, search until we find the section name, keep track of index?)
    //getRange(row, column, numRows)
    var startRow = 1;
    var column = 1;
    var numRows = eicSheet.getLastRow();
    var firstColumn = eicSheet.getSheetByName(issueNumber).getRange(startRow, column, numRows).getValues();

    for(var rowNum in firstColumn){
      if(firstColumn[rowNum][0].toLowerCase() == sectionName[0].toLowerCase()){
        return rowNum;
      }
    }
    //this should never happen, but if there is no sectionName cell in the eicSheet,
    //the function will just return the index of the last row with content in the sheet
    return eicSheet.getLastRow();
}

function triggerFunction (){
  //MailApp.sendEmail("kjmoore@mit.edu", "I've been triggered!'", volume);
  for(var i in volume.allIssueObjects){

      issueNum = volume.allIssueObjects[i].num;
      //MailApp.sendEmail("kjmoore@mit.edu", "test", JSON.stringify(volume));
      sheetContents = pullFromSectionWithParams(issueNum, volume, eicSheet);
      //MailApp.sendEmail("kjmoore@mit.edu", "test2", "lol");
  }
  //MailApp.sendEmail("kjmoore@mit.edu", "I am contents", sheetContents);
}

function main(){
  //Make "onOpen" trigger (also seems to work on refresh!)
  ScriptApp.newTrigger('triggerFunction')
    .forSpreadsheet(eicSheet)
    .onOpen()
    .create();
}




//Resources used:
//https://developers.google.com/sheets/api/quickstart/apps-script
//https://github.com/danthareja/node-google-apps-script
//https://developers.google.com/drive/v3/web/folder
//https://developers.google.com/apps-script/reference/drive/file-iterator
//https://stackoverflow.com/questions/11910734/google-apps-script-how-do-i-create-a-file-in-a-folder
//
//
//