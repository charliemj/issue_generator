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
        //Will is a dictionary mapping issueNum {Strings}: [[spreadsheet, section],[spreadsheet, section]]
        var allSheetsByIssue = volume.allSheetsByIssue;

        //go through each Section, go to the issue number of the active sheet's issue
        thisIssueSheets = allSheetsByIssue.issueNumberActive; //format: [[spreadsheet, section],[spreadsheet, section]]

        var eicIssueSheet = activeSheetForTrigger;

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