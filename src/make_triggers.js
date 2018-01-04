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
  var allSheetsByIssue = volume.allSheetsByIssue;
  //go through each Section, go to that issueNum
  //copy all it's contents to the appropriate section
  //of the EIC spreadsheet
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