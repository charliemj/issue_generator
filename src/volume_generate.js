/////////////////Spec///////////////////////
//given a google spreadsheet of issue dates, generates folders and appropriate docs for each issue in a given drive
//each folder should have permissions as specified in a "Permissions" google sheet
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


//the MasterSpreadSheet should have the following form: Issue Number, Issue Date, Special Notes
//precondition: there exists a spreadsheet called "eic_sheet_template" that has the master sheet template
function issueGenereration() {

    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to
    var issueSheet = ss.getSheets()[0]; //could also do ss.getSheetByName("issues");
    var departmentsSheet = ss.getSheets()[1]; //could also do ss.getSheetByName("departments");
    var configSheet = ss.getSheers()[2]; //could also do ss.getSheetByName("config");

    var folderId = configSheet.getSheetValues(1,1,1,1)[0][1];//this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet

    //TODO: do a check to make sure this file exists and throw a useful error if not
    //https://developers.google.com/apps-script/reference/drive/file-iterator
    var masterIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet

    var volumeFolder = DriveApp.getFolderById(folderId); //get folderId from config sheet

    //go to sheet, get all the issues and make an object for each issue with number, date, and notes
    var allIssues = getAllIssues(issueSheet);
    var allIssueNumbers = [];
    for (var i = 0; i < allIssues.length; i++){
        var issue = allIssues[i];
        var issueNum = issue.number;
        allIssueNumbers.push(issueNum);
        var issueDate = issue.date;
        var issueInfo = issue.info;

        //make a folder with that Issue Number and a doc with Notes

        makeMasterIssueFolder(volumeFolder,issueNum);

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

//TODO: need a way to detect changes to the master spreadsheet which will propagate updated
//notes and/or additional issues and respective folders to all the dept folders + sheets


//all of these need to be linked back to the Master Spreadsheet for the given issue
//whenever a spreadsheet is updated in the below categories, the master spreadsheet should
//be updated. Basically insert a row below section head?
function genSports(){}
function genArts(){
    //arts spreadsheet might be good to note any embargo
}
function genNews(){
    //for each issue, create a folder named the number of the issue
    //inside each folder have a dept_spreadsheet
}
function genScience(){}
function genCampusLife(){}
function genOpinion(){}
function genPhoto(){} //photospread sheet
function genFun(){}
function genFeatures(){}



function makeMasterIssueFolder(parent,name){
    //https://developers.google.com/drive/v3/web/folder
    //https://stackoverflow.com/questions/11910734/google-apps-script-how-do-i-create-a-file-in-a-folder

    //creates the new folder and returns it
    folderMade = parent.createFolder(name);

    //make a copy of the MasterIssueSpreadsheet and name it after current issue (name)
    makeMasterIssueSpreadsheet(name,folderMade);
}

function makeMasterIssueSpreadsheet(name, destination){
    //https://developers.google.com/apps-script/reference/drive/file#makeCopy(String,Folder)
    masterIssueSpreadsheetTemplate.makeCopy(name+"_eic_master_spreadsheet",destination);
}

function makeIssueSpreadsheet(name, dept){}

function makeInshort(){
    //make a copy of the Inshort doc
    //and add it to current folder
    //write the editable link to the news spreadsheet
}

function makeSportsBlitz(){
    //make a copy of the Blitz doc
    //add it to current folder
    //write the editable link in the sports spreadsheet
}









//Resources used:
//https://developers.google.com/sheets/api/quickstart/apps-script