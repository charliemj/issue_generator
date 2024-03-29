function EicCopySheet(volume){
    //make EicCopySheet
    Logger.log("start EicCopySheet");
    name = "EIC Copy Sheet for "+volume.volumeNumber;
    sheet = volume.volumeFolder.getFilesByName(name);
    if (sheet.hasNext()){return SpreadsheetApp.open(sheet.next());}

    eicCopySheet = volume.templates.eicIssueSheet.makeCopy("EIC Copy Sheet for "+volume.volumeNumber, volume.volumeFolder);
    eicCopySheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

    eicCopySheet = SpreadsheetApp.open(eicCopySheet); //converts Drive File object to Spreadsheet

    var allIssueNums = Object.keys(volume.allSheetsByIssue).sort(compareNumbers);

    function compareNumbers(a, b) {
        return parseInt(a.replace("n","")) - parseInt(b.replace("n",""));
    }

    //for each issue, name a sheet in the spreadsheet
    var templateSheet = eicCopySheet.getSheetByName("template");

    //make the sheets for each issue inside the EIC Spreadsheet
    for(var i=0; i<allIssueNums.length; i++){
        issueNum = allIssueNums[i];
        //i+1 because the 0th sheet is the template sheet
        eicCopySheet.insertSheet("N"+issueNum, i+1, {template: templateSheet}); //insertSheet(sheetName, sheetIndex)
    }
    Logger.log("end EicCopySheet");
    return eicCopySheet;
}