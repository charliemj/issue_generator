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


//the MasterSpreadSheet should have the following form: Issue Number, Issue Date, Special Notes
//precondition: there exists a spreadsheet called "eic_sheet_template" that has the master sheet template
//Also assumes there is a sectionSpreadsheet named "section_spreadsheet_template"
function issueGenereration() {

    //look ss by name
    var ss = SpreadsheetApp.getActiveSpreadsheet(); //gets the SpreadSheet this script is attached to
    var issueSheet = ss.getSheets()[0]; //could also do ss.getSheetByName("issues");
    var departmentsSheet = ss.getSheets()[1]; //could also do ss.getSheetByName("departments");
    var configSheet = ss.getSheers()[2]; //could also do ss.getSheetByName("config");

    var folderId = configSheet.getSheetValues(1,1,1,1)[0][1];//this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet

    //TODO: do a check to make sure this file exists and throw a useful error if not
    //https://developers.google.com/apps-script/reference/drive/file-iterator
    var masterIssueSpreadsheetTemplate = DriveApp.getFilesByName("eic_sheet_template").next(); //the master spreadsheet
    var sectionSpreadsheet = DriveApp.getFilesByName("section_spreadsheet_template").next();
    var inshortTemplate = DriveApp.getFilesByName("inshort_template").next();
    var sportsBlitzTemplate = DriveApp.getFilesByName("sports_blitz_template").next();

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

        makeMasterIssueFolder(volumeFolder,issueNum);

        //makeFolderInVolume(parent, folderName) and genSports(issueNum, parent)
        var sports = makeFolderInVolume(volumeFolder,"Sports");
        genSports(issueNum, sports);
        var arts = makeFolderInVolume(volumeFolder,"Arts");
        genArts(issueNum, arts);
        var news = makeFolderInVolume(volumeFolder,"News");
        genNews(issueNum, news);
        var features = makeFolderInVolume(volumeFolder,"Features");
        genFeatures(issueNum, features);
        var opinion = makeFolderInVolume(volumeFolder,"Opinion");
        genOpinion(issueNum, opinion);
        var fun = makeFolderInVolume(volumeFolder,"Fun");
        genFun(issueNum, fun);
        var photo = makeFolderInVolume(volumeFolder,"Photo");
        genPhoto(issueNum, photo);
        var campusLife = makeFolderInVolume(volumeFolder,"Campus Life");
        genCampusLife(issueNum, campusLife);
        var science = makeFolderInVolume(volumeFolder,"Science");
        genScience(issueNum, science);

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


//for updating master on update of section: https://developers.google.com/apps-script/guides/triggers/events
//https://developers.google.com/apps-script/guides/triggers/#onedit
//
//
///// would want the below trigger on each of the sectionIssue sheets
// // var sheet = SpreadsheetApp.getActive();
//  ScriptApp.newTrigger("myFunction") //<-- in this function do the chaining
//    .forSpreadsheet(sheet)
//    .onOpen()
//    .create();

//++
//BEST PLAN: attach triggers to Master Folders to pull content, AND every 5 minutes it pulls

function pullFromSection(issueNum){
    //go to each section and then that section's issueNum folder and spreadsheet
    //make sure all the stuff is pulled
    //update the MasterSheet of that issueNum with all the content pulled
}

//https://developers.google.com/apps-script/reference/script/spreadsheet-trigger-builder#onChange()
function createTriggerOnOpenMasterSpreadSheet(sheet){
    //when MasterSpreadSheet is opened, it pulls content from corresponding Section Sheets
    ScriptApp.newTrigger("pullFromSection")
    .forSpreadsheet(sheet)
    .onOpen()
    .create();
}

function createTimeDrivenTriggers() {
  // Trigger every 5 minutes.
  ScriptApp.newTrigger('pullFromSection')
      .timeBased()
      .everyMinutes(5)
      .create();
}


//all of these need to be linked back to the Master Spreadsheet for the given issue
//whenever a spreadsheet is updated in the below categories, the master spreadsheet should
//be updated. Basically insert a row below section head?
function genSports(issueNum, parent){
    var dept = "sports";
    madeFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeSportsBlitz("Sports Blitz for "+issueNum, madeFolder);
    //TODO: connect Sports Blitz with the spreadsheet
}

function genArts(issueNum, parent){
    var dept = "arts";
    makeSectionIssueFolder(parent,dept,issueNum);
    //arts spreadsheet might be good to note any embargo
}

function genNews(issueNum, parent){
    var dept = "news";
    madeFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeInshorts("Inshorts for "+issueNum, madeFolder);
    //TODO: connect inshorts with the spreadsheet
}

function genScience(issueNum, parent){
    var dept = "science";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genCampusLife(issueNum, parent){
    var dept = "campus_life";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genOpinion(issueNum, parent){
    var dept = "opinion";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genPhoto(issueNum, parent){
    var dept = "photo";
    makeSectionIssueFolder(parent,dept,issueNum);
} //photospread sheet

function genFun(issueNum, parent){
    var dept = "fun";
    makeSectionIssueFolder(parent,dept,issueNum);
}
function genFeatures(issueNum, parent){
    var dept = "features";
    makeSectionIssueFolder(parent,dept,issueNum);
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
    masterIssueSpreadsheetTemplate.makeCopy(issueNum+"_eic_master_spreadsheet",destinationFolder);
}

function makeSectionIssueFolder(parent,dept,issueNum){
    folderMade = parent.createFolder(issueNum);
    makeSectionSpreadsheet(issueNum,dept,folderMade);
}

function makeSectionSpreadsheet(issueNum, dept, destinationFolder){
    sectionSpreadsheet.copy(issueNum+"_"+dept, destinationFolder);
}

function makeIssueNotesDoc(){}

function makeInshorts(issueNum, destinationFolder){
    //make a copy of the Inshort doc
    //and add it to current folder
    //write the editable link to the news spreadsheet
}

function makeSportsBlitz(issueNum, destinationFolder){
    //make a copy of the Blitz doc
    //add it to current folder
    //write the editable link in the sports spreadsheet
}









//Resources used:
//https://developers.google.com/sheets/api/quickstart/apps-script
//https://developers.google.com/drive/v3/web/folder
//https://stackoverflow.com/questions/11910734/google-apps-script-how-do-i-create-a-file-in-a-folder