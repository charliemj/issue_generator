function triggerFunction (){
        for(var i in volume.allIssueObjects){
            issueNum = volume.allIssueObjects[i].num;
            Logger.log(issueNum,volume, eicSheet);
            pullFromSectionWithParams(issueNum, volume, eicSheet);
        }
    }


// function triggerFunction (){
//   MailApp.sendEmail("kjmoore@mit.edu", "I work", "out sometimes");
// //        for(var i in volume.allIssueObjects){
// //            issueNum = allIssueObjects[i].number;
// //            pullFromSectionWithParams(issueNum, volume, eicSheet);
// //        }
//     }


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

    //go through each Section, go to the issue number of the active sheet's issue
    thisIssueSheets = allSheetsByIssue[issueNum]; //format: [[spreadsheet, section],[spreadsheet, section]]

    //go through each section + its sheet for a given issue
    for (var s = 0; s < thisIssueSheets.length; s++){
        section = thisIssueSheets[s];
        secSheet = section[0];
        secName = section[1];
        //retrieve all contents
        //getRange(row, column, numRows, numColumns).getValues() ==> returns Object[][]
        var sheetContents = secSheet.getRange(2,1,secSheet.getLastRow(), secSheet.getLastColumn()).getValues();

        var sectionRowIndexInEicSheet = findSectionRowInEicSheet(secName, eicIssueSheet);
        //for each row that will need to be copied, insert a blank row
        for(var i=0; i<sheetContents.length; i++){ //does sheetContents have a length method? POTENTIAL BUG
          eicIssueSheet.insertRows(sectionRowIndexInEicSheet);//inserts one row after this index
        }

        //copyValuesToRange(destinationSheet, column, columnEnd, row, rowEnd)
        var startRow = sectionRowIndexInEicSheet+1;
        var endRow = startRow + sheetContents.length;//starRow plus the number of new rows added
        sheetContents.copyValuesToRange(eicIssueSheet, 1, secSheet.getLastColumn(), startRow, endRow);
    }
}

function findSectionRowInEicSheet(sectionName, eicSheet){
    //find the section in the EIC sheet (getSheetValues of that sheet, search until we find the section name, keep track of index?)
    //getRange(row, column, numRows)
    var startRow = 1;
    var column = 1;
    var numRows = eicSheet.getLastRow();
    var firstColumn = eicSheet.getRange(startRow, column, numRows).getValues();

    for(var rowNum in firstColumn){
        if(firstColumn[rowNum][0].toLowerCase() == sectionName.toLowerCase()){
        return rowNum;
        }
    }
    //this should never happen, but if there is no sectionName cell in the eicSheet,
    //the function will just return the index of the last row with content in the sheet
    return eicSheet.getLastRow();
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