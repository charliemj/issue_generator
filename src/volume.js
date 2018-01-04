function Volume(ss){
    //gets Sheets
    this.issueSheet = ss.getSheetByName("issues");
    this.sectionsSheet = ss.getSheetByName("sections");
    this.configSheet =  ss.getSheetByName("config");

    //this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet
    var volumeNumber_root = configSheet.getSheetValues(1,1,1,1)[0][1];
    this.volumeNumber = volumeNumber_root.replace("_root", "");//extract just the volume number

    //creates and returns list of issue objects
    var allIssueObjects = extractIssuesFromSheet(this.issueSheet);

    //Will be a dictionary mapping issueNum {Strings}: [[spreadsheet, section],[spreadsheet, section]]
    this.allSheetsByIssue = {};

    for(var ii; ii<allIssueObjects.length; ii++){
        //populate the issue dict with an empty list for each issue number
        this.allSheetsByIssue[allIssueObjects.number] = [];
    }

    //returns list of departments as strings
    var sections = this.sectionsSheet.getSheetValues(1,1,this.sectionsSheet.getLastRow(),1)[0];

    //creates and returns the volumeFolder object
    this.volumeFolder = DriveApp.getFoldersByName(this.volumeNumber).next(); //get volumeNumber_root from config sheet

    /**
     * Creates and returns a Folder placed in the Volume Folder
     * @param  {Folder} volumeFolder   the Volume folder
     * @param  {String} sectionName the new folder's name
     * @return the new Folder
    */
    this.makeFolderInVolume = function(volumeFolder, sectionName){
        return volumeFolder.createFolder(sectionName);
    };

    //fill Volume folder with Section Folders for each section (including eic_copy)
    this.sectionFolders = {};
    for (var i in sections){
        var sectionName = sections[i];
        var sect = new Section(this, sectionName);
        this.sectionFolders.sectionName = sect;
    }

    this.eic_copyFolder = this.sectionFolders["eic_copy"];

    //populate eicFolder and sectionFolders
    for (var j in sections){
        section = sections[j];
        sectionFolder = sections.section;
        section.makeAllIssuesInSection();
    }

    //All the Folders have been made and populated with Sheets + Docs
    //Time to attach Triggers and link Section sheets to the EIC sheet

    function pullFromSections(issueNum){

    }
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