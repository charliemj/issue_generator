function IssueFolder(Section, issue, volume){
    this.issue = issue;
    this.issueNum = issue.number;
    this.issueDate = issue.date;
    this.issueInfo = issue.info;
    this.sectionName = Section.sectionName;
    this.sectionFolder = Section.sectionFolder;


    function makeIssueFolder(){
        //in the section Folder, create a Folder with the name this.issueNum
        folders = this.sectionFolder.getFoldersByName(this.issueNum);

        //it is already made
        if (folders.hasNext()){return folders.next();}

        return this.sectionFolder.createFolder(this.issueNum);
    }

    this.issueFolder = makeIssueFolder();

    function makeIssueSheet(issueNum,sectionName,issueFolder){
        name = issueNum+"_"+sectionName;
        sheets = issueFolder.getFilesByName(name);

        //it's already made
        if (sheets.hasNext()){return sheets.next();}

        this.sectionSheet = volume.templates.sectionIssueSheet.makeCopy(name, issueFolder);
        sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

        //updates the Volumes allSheetsByIssue dict with this sections issueNum sheet
        volume.allSheetsByIssue[issueNum].push([sectionSheet,sectionName]);

        return this.sectionSheet;
    }

    function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){
        name = issueNum+" photo spreadsheet for "+section;
        sheets = issueFolder.getFilesByName(name);

        //it's already made
        if (sheets.hasNext()){return sheets.next();}

        photoSheet = volume.templates.sectionPhotoSheet.makeCopy(name, issueFolder);
        photoSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        return photoSheet;
    }

    //make spreadsheets and put them in the issue folder
    this.sectionIssueSheet = makeIssueSheet(this.issueNum, this.sectionName, this.issueFolder);
    this.makeSectionPhotoSpreadsheet = makeSectionPhotoSpreadsheet(this.issueNum, this.sectionName, this.issueFolder);


    function makeIssueNotesDoc(volume, issue, issueFolder){
        var name = issue.number+" special notes";

        docs = issueFolder.getFilesByName(name);

        //it's already made
        if (docs.hasNext()){return}

        var header = issue.number + " will be published on " + issue.date+"\n";
        issueNotes = volume.templates.issueNotes.makeCopy(name, issueFolder);
        issueNotes.setContent(header+"\n"+issue.info+"\n");
    }

    //add issue notes to the folder
    makeIssueNotesDoc(volume, issue, this.issueFolder);

    //Add any section specific additions to the folder
    if(this.sectionName == "sports"){
        name = "Sports Blitz for "+this.issueNum;

        blitz = this.issueFolder.getFilesByName(name);
        //it's already made

        if (blitz.hasNext()){}
        else{
            makeSportsBlitz(volume, name, this.issueFolder, SpreadsheetApp.open(this.sectionIssueSheet));
        }
    }

    if(this.sectionName == "news"){
        name = "Inshorts for "+this.issueNum;
        inshorts = this.issueFolder.getFilesByName(name);
        //it's already made

        if (inshorts.hasNext()){}
        else{
            makeInshorts(volume, name, this.issueFolder, SpreadsheetApp.open(this.sectionIssueSheet));
        }
    }
}