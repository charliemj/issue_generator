function getVolumeFolder(){
    //assumes there is exactly one folder in the drive by the name V136_root (or more generally, volumeNumber_root)
    var volumeFolder = DriveApp.getFoldersByName(volumeNumber).next(); //get volumeNumber_root from config sheet
    return volumeFolder;
}

function getAllSectionStrings(){}

function getSectionFolderByName(section){}

function getIssueInformationFromIssueNum(issueNum){}

function getFolderBySectionAndIssueNum(section, issueNum){}

function getTemplates(){}

function getVolumeNumber(){
    var volumeNumber = volumeNumber_root.replace("_root", "");//extract just the volume number
    return volumeNumber;
}

//precondition: issueSpreadsheet has 3 columns in this order: issueDate, issueNumber, issueNotes
//this means it expects 3 columns and a row for each issue
/**
 * Extracts info about all issues of a Volume of The Tech from a Google Sheet
 * @param {Sheet} issueSpreadsheet a Sheet containing issue numbers, dates, and info for an entire Tech Volume
 * @return {List} allIssues  a list of issueObjects
 */
function extractIssuesFromSheet(issueSpreadsheet){
    var startRow = 2;
    var startColumn = 1;
    var numRows = issueSpreadsheet.getLastRow();
    var numColumns = 3; //TODO: assert equals issueSpreadsheet.getLastColumn()?
    //a two-dimension array Object[][]
    var allIssuesInfo = issueSpreadsheet.getSheetValues(startRow,startColumn,numRows,numColumns);

    //a dictionary of Issue "objects" containing all the info about each issue
    var allIssueObjects = [];

    //extract all issues and make Issue objects
    for (var row = 1; row <= numRows; row++){
        //each row is an issue
        var issueDate = allIssuesInfo[row][1];
        var issueNum = allIssuesInfo[row][2];
        var issueInfo = allIssuesInfo[row][3];
        //create Issue object
        var issue = {
            "date":issueDate,
            "number":issueNum,
            "info":issueInfo
        };
        allIssue.push(issue);
    }
    return allIssueObjects;
}