function main(){
    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to

    //Get templates
    var eicIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet
    var sectionIssueSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
    var sectionPhotoSpreadsheet = DriveApp.getFilesByName("section_photo_spreadsheet_template").next();
    var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
    var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();

    var templates = {
        "eicIssueSheet":eicIssueSpreadsheetTemplate,
        "sectionIssueSheet": sectionIssueSpreadsheet,
        "sectionPhotoSheet":sectionPhotoSpreadsheet,
        "inshort":inshortTemplate,
        "sportsBlitz":sportsBlitzTemplate
    };

    var volume = new Volume(ss);

    //Make triggers
    //Note: We are limited to having 20 triggers per script

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

    //Make "onOpen" trigger
    ScriptApp.newTrigger('triggerFunction')
      .forSpreadsheet(eicIssueSheet)
      .onOpen()
      .create();

    //Make timed trigger
    ScriptApp.newTrigger('triggerFunction')
          .forSpreadsheet(eicIssueSheet)
          .timeBased()
          .everyMinutes(5)
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