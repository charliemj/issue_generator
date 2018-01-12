function Volume(ss, templates){
    //gets Sheets
    this.issueSheet = ss.getSheetByName("issues");
    this.sectionsSheet = ss.getSheetByName("sections");
    this.configSheet =  ss.getSheetByName("config");
    this.templates = templates;

    //this is magic-numbered such that the spreadsheet ID is
    //in the 1,2 position of the sheet
    var volumeNumber_root = this.configSheet.getSheetValues(1,1,2,2)[0][1];
    this.volumeNumber = volumeNumber_root.replace("_root", "");//extract just the volume number (I name this with _root to avoid potential clashes with other "V138"-named folders/files)

    this.volumeFolder = DriveApp.getFoldersByName(this.volumeNumber+"_root").next();


    this.makeFolderInVolume = function(volumeFolder, sectionName){
        folders = volumeFolder.getFoldersByName(sectionName);

        //it is already made
        if (folders.hasNext()){return folders.next();}

        return volumeFolder.createFolder(sectionName);
    };
     //returns list of departments as strings
    var sections = this.sectionsSheet.getSheetValues(1,1,this.sectionsSheet.getLastRow(),1);

    //fill Volume folder with Section Folders for each section
    this.sectionFolders = {}; //I'm calling this before I have allIssueObjects, which is wrong, I really need
    //to make some functions....
    for (var i in sections){
        var sectionName = sections[i];
      //Logger.log(sectionName);
        var sectionObject = new Section(this, sectionName);
        this.sectionFolders[sectionName] = sectionObject;
    }

  //Logger.log(this.sectionFolders);

  //creates and returns list of issue objects
    var allIssueObjects = extractIssuesFromSheet(this.issueSheet);
    this.allIssueObjects = allIssueObjects;
    //Will be a dictionary mapping issueNum {Strings}: [[spreadsheet, section],[spreadsheet, section]]
    this.allSheetsByIssue = {};



    for(var ii = 0; ii<allIssueObjects.length; ii++){
        //populate the issue dict with an empty list for each issue number
        this.allSheetsByIssue[allIssueObjects[ii].number] = []; //so this list is never being populated...
        thisIssue = this.allSheetsByIssue[allIssueObjects[ii].number];
        for(var secIndex in sections){
            var dept = sections[secIndex];

            //relies on this iterating over issues in order
            //var issueNumInt = precisionRound(parseInt(allIssueObjects[ii].number.replace("N","")),-1);

          //Logger.log(this.sectionFolders[dept]);
            var deptSheet = this.sectionFolders[dept].allSectionIssuesFolder[ii+1].sectionIssueSheet;
        }
        //what was the plan here?derp
        //I thihnk
        //want to go to each section and get sheets for that issue
    }




    //make the eicCopy master sheet

    this.eic_copy_sheet = EicCopySheet(this);

    //populate sectionFolders
    for (var j in sections){
        var sectionName = sections[j];
        var sectionObject = this.sectionFolders[sectionName];
        sectionObject.makeAllIssuesInSection();
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
    for (var row = 0; row < numRows-1; row++){
        //each row is an issue
        var issueDate = allIssuesInfo[row][0];
        var issueNum = allIssuesInfo[row][1];
        var issueInfo = allIssuesInfo[row][2];
        //create Issue object
        var issue = {
            "date":issueDate,
            "number":issueNum,
            "info":issueInfo
        };
        allIssueObjects.push(issue);
    }
    return allIssueObjects;
}