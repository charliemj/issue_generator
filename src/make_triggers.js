//BEST PLAN: attach triggers to Master Folders to pull content, AND every 5 minutes it pulls
//TODO: need a way to detect changes to the master spreadsheet which will propagate updated
//notes and/or additional issues and respective folders to all the dept folders + sheets


//https://developers.google.com/apps-script/reference/script/spreadsheet-trigger-builder#onChange()


//when MasterSpreadSheet is opened, it pulls content from corresponding Section Sheets
function createTriggerOnOpenMasterSpreadSheet(sheet){
    ScriptApp.newTrigger("pullFromSection")
    .forSpreadsheet(sheet)
    .onOpen()
    .create();
}

//Will pull from each section and put into eicIssueSpreadSheet every 5 minutes
function createTimeDrivenTriggers() {
  // Trigger every 5 minutes.
  ScriptApp.newTrigger('pullFromSection')
      .timeBased()
      .everyMinutes(5)
      .create();
}

function pullFromSection(issueNum){
    //go to each section and then that section's issueNum folder and spreadsheet
    //make sure all the stuff is pulled
    //update the MasterSheet of that issueNum with all the content pulled
}