//BEST PLAN: attach triggers to Master Folders to pull content, AND every 5 minutes it pulls
//TODO: need a way to detect changes to the master spreadsheet which will propagate updated
//notes and/or additional issues and respective folders to all the dept folders + sheets


//https://developers.google.com/apps-script/reference/script/spreadsheet-trigger-builder#onChange()



/**
 * Creates Trigger s.t. when eicIssueSpreadSheet is opened, it pulls content from corresponding Section Sheets
 * @param  {Sheet} eicIssueSheet the given eicIssueSpreadsheet that is opened
 * @return returns nothing
 */
function createTriggerOnOpenEicIssueSpreadSheet(eicIssueSheet){
    ScriptApp.newTrigger("pullFromSection")
    .forSpreadsheet(sheet)
    .onOpen()
    .create();
}


/**
 * Creates Trigger s.t. it will pull from each section and put into eicIssueSpreadSheet every 5 minutes
 * @return returns nothing
 */
function createTimeDrivenTriggersForEICSheet() {
  // Trigger every 5 minutes.
  ScriptApp.newTrigger('pullFromSection')
      .timeBased()
      .everyMinutes(5)
      .create();
}

/**
 * [pullFromSection description]
 * @param  {[type]} issueNum [description]
 * @return {[type]}          [description]
 */
function pullFromSection(issueNum){
    //go to each section and then that section's issueNum folder and spreadsheet
    //for section in sectionFolders
    for(var i = 0; i < sectionFolders.length; i++){
        var section = sectionFolders[i];
        //I'm not convinced the type of sectionFolders supports indexing
        //like I want here
    }
    //make sure all the stuff is pulled
    //update the MasterSheet of that issueNum with all the content pulled
}


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