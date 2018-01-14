function IssueFolder(sectionName, sectionFolder, issue, volume){
    this.issue = issue;
    this.issueNum = issue.num;
    this.issueDate = issue.date;
    this.issueInfo = issue.info;
    this.sectionName = sectionName;
    this.sectionFolder = sectionFolder;


    function makeIssueFolder(sectionFolder, issueNum){
        //in the section Folder, create a Folder with the name this.issueNum
        folders = sectionFolder.getFoldersByName("N"+issueNum);

        //it is already made
        if (folders.hasNext()){return folders.next();}

        return sectionFolder.createFolder("N"+issueNum);
    }

    this.issueFolder = makeIssueFolder(this.sectionFolder, this.issueNum);

    function makeIssueSheet(issueNum,sectionName,issueFolder){
        name = "N"+issueNum+"_"+sectionName;
        sheets = issueFolder.getFilesByName(name);

        //it's already made
        if (sheets.hasNext()){return SpreadsheetApp.open(sheets.next());}

        sectionSheet = volume.templates.sectionIssueSheet.makeCopy(name, issueFolder);
        sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        sectionSheet = SpreadsheetApp.open(sectionSheet);
        return sectionSheet;
    }

    function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){
        name = "N"+issueNum+" photo spreadsheet for "+section;
        sheets = issueFolder.getFilesByName(name);

        //it's already made
        if (sheets.hasNext()){return SpreadsheetApp.open(sheets.next());}

        photoSheet = volume.templates.sectionPhotoSheet.makeCopy(name, issueFolder);
        photoSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        photoSheet = SpreadsheetApp.open(photoSheet);
        return photoSheet;
    }

    //make spreadsheets and put them in the issue folder
    this.sectionIssueSheet = makeIssueSheet(this.issueNum, this.sectionName, this.issueFolder);
    this.makeSectionPhotoSpreadsheet = makeSectionPhotoSpreadsheet(this.issueNum, this.sectionName, this.issueFolder);


    function makeIssueNotesDoc(volume, issue, issueFolder){
        var name = "N"+issue.num+" special notes";

        docs = issueFolder.getFilesByName(name);

        //it's already made
        if (docs.hasNext()){return}

        var header = "N"+issue.num + " will be published on " + issue.date+"\n";
        issueNotes = volume.templates.issueNotes.makeCopy(name, issueFolder);
        issueNotes.setContent(header+"\n"+issue.info+"\n");
    }

    //add issue notes to the folder
    makeIssueNotesDoc(volume, issue, this.issueFolder);

    //Add any section specific additions to the folder
    if(this.sectionName == "sports"){
        name = "Sports Blitz for N"+this.issueNum;

        blitz = this.issueFolder.getFilesByName(name);
        //it's already made

        if (blitz.hasNext()){}
        else{
            makeSportsBlitz(volume, name, this.issueFolder, this.sectionIssueSheet,this.issueNum);
        }
    }

    if(this.sectionName == "news"){
        name = "Inshorts for N"+this.issueNum;
        inshorts = this.issueFolder.getFilesByName(name);
        //it's already made

        if (inshorts.hasNext()){}
        else{
            makeInshorts(volume, name, this.issueFolder, this.sectionIssueSheet,this.issueNum);
        }
    }
}