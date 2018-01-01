//precondition: the MasterSpreadSheet should have the following form: Issue Number, Issue Date, Special Notes
//precondition: there exists a spreadsheet called "eic_sheet_template" that has the master sheet template
//Also assumes there is a sectionSpreadsheet named "section_spreadsheet_template"
/**
 * Generates a complete Volume and corresponding section folders with folders
 * for each issue of The Tech. Each issueFolder has a spreadsheet which links to a
 * Master EIC spreadsheet to keep track of content for each section of the paper.
 * @return returns nothing
 */
function generateVolume() {
    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to
    var issueSheet = ss.getSheetByName("issues");
    var departmentsSheet = ss.getSheetByName("departments");
    var configSheet =  ss.getSheetByName("config");

    var volumeNumber_root = configSheet.getSheetValues(1,1,1,1)[0][1];//this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet

    var volumeNumber = getVolumeNumber();


    //TODO: do a check to make sure this file exists and throw a useful error if not
    //this assumes that there is exactly one file of the name of the stuff in the strings

    //Get templates
    var eicIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet
    var sectionSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
    var sectionPhotoSpreadsheet = DriveApp.getFilesByName("section_photo_spreadsheet_template").next();
    var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
    var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();

    var volumeFolder = getVolumeFolder();

    //makes section folders and returns a list of Section Objects which have a Folder and Name
    var sectionFolders = makeSectionFolders();

    //TODO: reformat the layout of this object
    var allIssueObjects = extractIssuesFromSheet(issueSheet);

    var allIssueNumbers = [];
    //for each issue, make an Issue Object and create corresponding section Issue folders
    for (var i = 0; i < allIssueObjects.length; i++){
        var issue = allIssueObjects[i];
        var issueNum = issue.number;
        allIssueNumbers.push(issueNum);
        var issueDate = issue.date;
        var issueInfo = issue.info;
        makeMasterIssueFolder(volumeFolder,issueNum);
        populateSectionIssueFolders(issueNum, sectionFolders);
    }
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