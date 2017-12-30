/////////////////Spec///////////////////////
//given a google spreadsheet of issue dates, generates folders and appropriate docs for each issue in a given drive
//each folder should have permissions as specified in a "Permissions" google sheet (or maybe not... see README)
//each issue folder will be named N_issueNumber_ and have a spreadsheet of the same title inside
//there will also be a schedule and inshort google doc
//there will be fields for article title, author, byline, word count, and editing status
//depending on editing status, emails will be sent to section editors, writers, Copy, EIC, prod

//WOOT:can make template sheets in top level drive, when copied, scripts are preserved.


//Given a Google Drive Account
//A spreadsheet in the top level directory will contain info about issue numbers, dates, and special notes (MasterSpreadsheet)
//A script attached to this master spreadsheet will generate a folder for each issue.
    //Inside each folder there will be a master spread sheet for content for the issue
//Inside the top level directory, there will be a folder for each Content Dept
    //Inside each of these folders will be a folder for each issue
        //Inside each of these folders will be a spreadsheet for that department
        //The spreadsheet will have fields like author, byline, link, and editing status
        //The spreadsheets will contain logic (or the topmost level spreadsheet will have logic that)
        //Enables email reminders to be sent based on edit status (and whether a link has been provided...)
        //If there are recurring docs like sports blitz and inshorts, these docs should be created
        //and linked to in the issue folder. Would be cool if these were templated and had useful
        //reference links at the top of the doc

/////////////////End of Spec///////////////////////


//precondition: the MasterSpreadSheet should have the following form: Issue Number, Issue Date, Special Notes
//precondition: there exists a spreadsheet called "eic_sheet_template" that has the master sheet template
//Also assumes there is a sectionSpreadsheet named "section_spreadsheet_template"
function issueGenereration() {

    //look up spreadsheet by name
    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to
    var issueSheet = ss.getSheetByName("issues"); //ss.getSheets()[0];
    var departmentsSheet = ss.getSheetByName("departments"); //ss.getSheets()[1];
    var configSheet =  ss.getSheetByName("config"); //ss.getSheers()[2];

    var volumeNumber_root = configSheet.getSheetValues(1,1,1,1)[0][1];//this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet

    //TODO: do a check to make sure this file exists and throw a useful error if not
    //https://developers.google.com/apps-script/reference/drive/file-iterator
    //this assumes that there is exactly one file of the name of the stuff in the strings
    var eicIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet
    var sectionSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
    var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
    var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();

    //assumes there is exactly one folder in the drive by the name V136_root (or more generally, volumeNumber_root)
    var volumeFolder_root = DriveApp.getFoldersByName(volumeNumber).next(); //get volumeNumber_root from config sheet


    //makes section folders and returns a dictionary mapping each section to a Folder object
    var sectionFolders = makeSectionFolders();

    //go to sheet, get all the issues and make an object for each issue with number, date, and notes
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

    //for each issue, make a folder with the name being the number of the issue, maintain a list
    //of these issue_folders. For each folder, make an eic_spread_sheet
        //the issue object should be updated to have an id for the folder and eic_spreadsheet associated with it
    //generate each of the department folders, top level "News"
}

//precondition: issueSpreadsheet has 3 columns in this order: issueDate, issueNumber, issueNotes
//this means it expects 3 columns and a row for each issue
function getAllIssues(issueSpreadsheet){
    //getSheetValues(startRow, startColumn, numRows, numColumns)
    var sr = 2;
    var sc = 1;
    var numRows = issueSpreadsheet.getLastRow();
    var numColumns = 3; //assert equals issueSpreadsheet.getLastColumn()?

    //a two-dimension array Object[][]
    var allIssuesInfo = issueSpreadsheet.getSheetValues(sr,sc,numRows,numColumns);

    //a dictionary of Issue "objects" containing all the info about each issue
    var allIssues = [];

    for (var row = 1; row <= numRows; row++){
        //each row is an issue
        var issueDate = allIssuesInfo[row][1];
        var issueNumber = allIssuesInfo[row][2];
        var issueInfo = allIssuesInfo[row][3];

        var issue = {
            "date":issueDate,
            "number":issueNumber,
            "info":issueInfo
        };
        allIssue.push(issue);
    }
    return allIssues;
}


/*
    Takes in a parent directory (the volume folder) and the issueNum (a string) to call the new folder
    Creates said named folder in the parent folder
    Adds the spreadsheet based off of the master spreadsheet template
 */
function makeMasterIssueFolder(parent,issueNum){
    //creates the new folder and returns it
    folderMade = parent.createFolder(issueNum);

    //make a copy of the MasterIssueSpreadsheet and name it after current issue (issueNum)
    makeMasterIssueSpreadsheet(issueNum,folderMade);
}

function makeFolderInVolume(parent, folderName){
    folderMade = parent.createFolder(folderName);
}

function makeMasterIssueSpreadsheet(issueNum, destinationFolder){
    //https://developers.google.com/apps-script/reference/drive/file#makeCopy(String,Folder)
    eicIssueSpreadsheetTemplate.makeCopy(issueNum+"_eic_master_spreadsheet",destinationFolder);
}

function makeIssueNotesDoc(){
    //takes the issue notes as input and creates a doc titled
    //"issueNum Issue Notes" and puts it in the folder
}







//Resources used:
//https://developers.google.com/sheets/api/quickstart/apps-script
//https://github.com/danthareja/node-google-apps-script
//https://developers.google.com/drive/v3/web/folder
//https://stackoverflow.com/questions/11910734/google-apps-script-how-do-i-create-a-file-in-a-folder