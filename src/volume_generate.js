//precondition: the MasterSpreadSheet should have the following form: Issue Number, Issue Date, Special Notes
//precondition: there exists a spreadsheet called "eic_sheet_template" that has the master sheet template
//Also assumes there is a sectionSpreadsheet named "section_spreadsheet_template"

/**
 * [generateVolume description]
 * @return {[type]} [description]
 */
function generateVolume() {

    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to
    var issueSheet = ss.getSheetByName("issues");
    var departmentsSheet = ss.getSheetByName("departments");
    var configSheet =  ss.getSheetByName("config");

    var volumeNumber_root = configSheet.getSheetValues(1,1,1,1)[0][1];//this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet

    var volumeNumber = volumeNumber_root.replace("_root", "");

    //TODO: do a check to make sure this file exists and throw a useful error if not
    //this assumes that there is exactly one file of the name of the stuff in the strings

    //Get templates
    var eicIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet
    var sectionSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
    var sectionPhotoSpreadsheet = DriveApp.getFilesByName("section_photo_spreadsheet_template").next();
    var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
    var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();

    //assumes there is exactly one folder in the drive by the name V136_root (or more generally, volumeNumber_root)
    var volumeFolder = DriveApp.getFoldersByName(volumeNumber).next(); //get volumeNumber_root from config sheet

    //makes section folders and returns a dictionary mapping each section to a Folder object
    var sectionFolders = makeSectionFolders();

    var allIssues = getAllIssues(issueSheet);
    var allIssueNumbers = [];
    //for each issue, make an Issue Object and create corresponding section Issue folders
    for (var i = 0; i < allIssues.length; i++){
        var issue = allIssues[i];
        var issueNum = issue.number;
        allIssueNumbers.push(issueNum);
        var issueDate = issue.date;
        var issueInfo = issue.info;
        makeMasterIssueFolder(volumeFolder,issueNum);
        populateSectionIssueFolders(issueNum, sectionFolders);
    }
}

//precondition: issueSpreadsheet has 3 columns in this order: issueDate, issueNumber, issueNotes
//this means it expects 3 columns and a row for each issue
/**
 * [getAllIssues description]
 * @param  {[type]} issueSpreadsheet [description]
 * @return {[type]}                  [description]
 */
function getAllIssues(issueSpreadsheet){
    var startRow = 2;
    var startColumn = 1;
    var numRows = issueSpreadsheet.getLastRow();
    var numColumns = 3; //assert equals issueSpreadsheet.getLastColumn()?
    //a two-dimension array Object[][]
    var allIssuesInfo = issueSpreadsheet.getSheetValues(startRow,startColumn,numRows,numColumns);

    //a dictionary of Issue "objects" containing all the info about each issue
    var allIssues = [];

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
    return allIssues;
}

/*
    Takes in a parent directory (the volume folder) and the issueNum (a string)
    Creates an issueNum-named folder in the parent folder
    Adds a spreadsheet based off of the master spreadsheet template to that issue folder
 */
/**
 * [makeMasterIssueFolder description]
 * @param  {Folder} parent   [description]
 * @param  {String} issueNum [description]
 * @return {[type]}          [description]
 */
function makeMasterIssueFolder(parent,issueNum){
    //creates the new folder and returns it
    folderMade = parent.createFolder(issueNum);
    //make a copy of the MasterIssueSpreadsheet and name it after current issue (issueNum)
    makeMasterIssueSpreadsheet(issueNum,folderMade);
}

//makes a folder of name folderName inside the parent directory
/**
 * [makeFolderInVolume description]
 * @param  {Folder} parent     [description]
 * @param  {String} folderName [description]
 * @return {[type]}            [description]
 */
function makeFolderInVolume(parent, folderName){
    folderMade = parent.createFolder(folderName);
}

//makes a copy of the EIC spreadsheet, titles it appropriately, and then saves it in the destinationFolder
/**
 * [makeMasterIssueSpreadsheet description]
 * @param  {String} issueNum          [description]
 * @param  {Folder} destinationFolder [description]
 * @return {[type]}                   [description]
 */
function makeMasterIssueSpreadsheet(issueNum, destinationFolder){
    eicIssueSpreadsheetTemplate.makeCopy(issueNum+"_eic_master_spreadsheet",destinationFolder);
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