function EicCopySheet(volume){
    //make EicCopySheet
    eicCopySheet = sectionSpreadsheet.copy("EIC Copy Sheet for "+volume.volumeNumber, volume.volumeFolder);
    eicCopySheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

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
        eicCopySheet.insertSheet(issueNum, i+1, {template: templateSheet}); //insertSheet(sheetName, sheetIndex)
    }
}