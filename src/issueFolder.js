function IssueFolder(sectionName, sectionFolder, issue, volume){
    Logger.log("start IssueFolder");
    this.issue = issue;
    this.issueNum = issue.num;
    this.issueDate = issue.date;
    this.issueInfo = issue.info;
    this.sectionName = sectionName;
    this.sectionFolder = sectionFolder;

    var allSectionFolderContents = this.sectionFolder.getFolders();
    var sectionFolderNamesToDriveFolders = {};
    while(allSectionFolderContents.hasNext()){
        var folder = allSectionFolderContents.next();
        sectionFolderNamesToDriveFolders[folder.getName()] = folder;
    }

    Logger.log("folder map complete");
    function makeIssueFolder(sectionFolder, issueNum){
        //in the section Folder, create a Folder with the name this.issueNum
        //folders = sectionFolder.getFoldersByName("N"+issueNum);

        var name = "N"+issueNum;

        //it is already made
        if(name in sectionFolderNamesToDriveFolders){return SpreadsheetApp.open(sectionFolderNamesToDriveFolders[name]);}

        return sectionFolder.createFolder(name);
    }

    this.issueFolder = makeIssueFolder(this.sectionFolder, this.issueNum);

    Logger.log("made issue folder");

    var allIssueFolderContents = this.issueFolder.getFiles();
    var fileNamesToDriveFiles = {};
    while(allIssueFolderContents.hasNext()){
        var file = allIssueFolderContents.next();
        fileNamesToDriveFiles[file.getName()] = file;
    }

    Logger.log("file map complete");

    function makeIssueSheet(issueNum,sectionName,issueFolder){
        name = "N"+issueNum+"_"+sectionName;
        //Logger.log("start getFileByName");
        //Logger.log("end getFileByName");
        //it's already made

        if(name in fileNamesToDriveFiles){return SpreadsheetApp.open(fileNamesToDriveFiles[name]);}

        sectionSheet = volume.templates.sectionIssueSheet.makeCopy(name, issueFolder);
        //sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        sectionSheet = SpreadsheetApp.open(sectionSheet);
        return sectionSheet;
    }

    function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){

        name = "N"+issueNum+" photo spreadsheet for "+section;
        sheets = issueFolder.getFilesByName(name);

        //it's already made
        if(name in fileNamesToDriveFiles){return SpreadsheetApp.open(fileNamesToDriveFiles[name]);}

        photoSheet = volume.templates.sectionPhotoSheet.makeCopy(name, issueFolder);
        //photoSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        photoSheet = SpreadsheetApp.open(photoSheet);
        return photoSheet;
    }

    //make spreadsheets and put them in the issue folder
    this.sectionIssueSheet = makeIssueSheet(this.issueNum, this.sectionName, this.issueFolder);
    Logger.log("section issue sheet complete");
    this.makeSectionPhotoSpreadsheet = makeSectionPhotoSpreadsheet(this.issueNum, this.sectionName, this.issueFolder);

    Logger.log("Photo complete");

    function makeIssueNotesDoc(volume, issue, issueFolder){
        var name = "N"+issue.num+" special notes";

        //it's already made
        if(name in fileNamesToDriveFiles){return;}

        var header = "N"+issue.num + " will be published on " + issue.date+"\n";
        issueNotes = volume.templates.issueNotes.makeCopy(name, issueFolder);
        issueNotes.setContent(header+"\n"+issue.info+"\n");
    }

    //add issue notes to the folder
    makeIssueNotesDoc(volume, issue, this.issueFolder);
    Logger.log("issue notes complete");
    //Add any section specific additions to the folder
    if(this.sectionName == "sports"){
        name = "Sports Blitz for N"+this.issueNum;

        blitz = this.issueFolder.getFilesByName(name);
        //it's already made

        if(name in fileNamesToDriveFiles){}
        else{
            makeSportsBlitz(volume, name, this.issueFolder, this.sectionIssueSheet,this.issueNum);
        }
    }

    Logger.log("sports complete");

    if(this.sectionName == "news"){
        name = "Inshorts for N"+this.issueNum;
        inshorts = this.issueFolder.getFilesByName(name);
        //it's already made

       if(name in fileNamesToDriveFiles){}
        else{
            makeInshorts(volume, name, this.issueFolder, this.sectionIssueSheet,this.issueNum);
        }
    }
    Logger.log("end IssueFolder");
}