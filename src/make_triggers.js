//BEST PLAN: attach triggers to Master Folders to pull content, AND every 5 minutes it pulls
//TODO: need a way to detect changes to the master spreadsheet which will propagate updated
//notes and/or additional issues and respective folders to all the dept folders + sheets


//https://developers.google.com/apps-script/reference/script/spreadsheet-trigger-builder#onChange()


//We are limited to having 20 triggers per script
//Game plan: we are going to have just the eic spreadsheet, no folders for issues
//each issue will be a sheet in the spreadsheet


var ssForTrigger = SpreadsheetApp.getActive();//get by issue?
var activeSheetForTrigger = ssForTrigger.getActiveSheet();
var issueNumberActive = activeSheetForTrigger.getSheetName();

function pullFromSectionWithParams(issueNumberActive,volume){
  //Will is a dictionary mapping issueNum {Strings}: [[spreadsheet, section],[spreadsheet, section]]
  var allSheetsByIssue = volume.allSheetsByIssue;

  //go through each Section, go to the issue number of the active sheet's issue
  thisIssueSheets = allSheetsByIssue.issueNumberActive; //format: [[spreadsheet, section],[spreadsheet, section]]

  //var eicIssueSheet = ;

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

//TODO
function findSectionRowInEicSheet(sectionName, eicSheet){
  //find the section in the EIC sheet (getSheetValues of that sheet, search until we find the section name, keep track of index?)
  //getRange(row, column, numRows)
  var startRow = 1;
  var column = 1;
  var numRows = eicSheet.getLastRow();
  var firstColumn = eicSheet.getRange(startRow, column, numRows).getValues();

  for(var rowNum in firstColumn){
    if(firstColumn[rowNum][0] == sectionName){
      return rowNum;
    }
  }
  //this should never happen, but if there is no sectionName cell in the eicSheet,
  //the function will just return the index of the last row with content in the sheet
  return eicSheet.getLastRow();
}

function triggerFunction(){
  pullFromSectionWithParams(issueNumberActive, volume);
}


ScriptApp.newTrigger('triggerFunction')
  .forSpreadsheet(eicIssueSheet)
  .onOpen()
  .create();

ScriptApp.newTrigger('triggerFunction')
      .forSpreadsheet(eicIssueSheet)
      .timeBased()
      .everyMinutes(5)
      .create();











function emailsToEditors(){
  //sends an email each Thursday informing editors of upcoming issue
  //and links and such
}


//TODO make photospreadsheet triggers
//
//
//
//
//