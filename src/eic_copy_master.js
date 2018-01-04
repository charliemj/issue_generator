function EicCopySheet(volume){
    //make EicCopySheet
    eicCopySheet = sectionSpreadsheet.copy("EIC Copy Sheet for "+volume.volumeNumber, volume.volumeFolder);
    eicCopySheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

    var allIssueNums = Object.keys(volume.allSheetsByIssue).sort(compareNumbers);

    function compareNumbers(a, b) {
        return parseInt(a.replace("n","")) - parseInt(b.replace("n",""));
    }

    //for each issue, name a sheet in the spreadsheet

    for(var i=0; i<allIssueNums.length; i++){
        issueNum = allIssueNums[i];
        eicCopySheet.insertSheet(issueNum, i); //insertSheet(sheetName, sheetIndex)
    }
}