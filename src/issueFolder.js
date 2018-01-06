function IssueFolder(Section, issue, volume){
    this.issue = issue;
    this.issueNum = issue.number;
    this.issueDate = issue.date;
    this.issueInfo = issue.info;
    this.sectionName = Section.sectionName;
    this.sectionFolder = Section.sectionFolder;


    function makeIssueFolder(){
        //in the section Folder, create a Folder with the name this.issueNum
        return this.sectionFolder.createFolder(this.issueNum);
    }

    this.issueFolder = makeIssueFolder();

    function makeIssueSheet(issueNum,sectionName,issueFolder){

        sectionSheet = volume.templates.sectionIssueSheet.makeCopy(issueNum+"_"+sectionName, issueFolder);
        sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

        //updates the Volumes allSheetsByIssue dict with this sections issueNum sheet
        volume.allSheetsByIssue[issueNum].push([sectionSheet,sectionName]);

        return sectionSheet;
    }

    function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){
        photoSheet = volume.templates.sectionPhotoSheet.makeCopy(issueNum+" photo spreadsheet for "+section, issueFolder);
        photoSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        return photoSheet;
    }

    //make spreadsheets and put them in the issue folder
    this.sectionIssueSheet = makeIssueSheet(this.issueNum, this.sectionName, this.issueFolder);
    this.makeSectionPhotoSpreadsheet = makeSectionPhotoSpreadsheet(this.issueNum, this.sectionName, this.issueFolder);

    // function makeIssueNotesDoc(volume, content, issueNum, issueFolder){
    //     //takes the issue notes as input and creates a doc titled
    //     //"issueNum Issue Notes" and puts it in the folder
    //     var name = issueNum+" special notes";
    //     issueNotesDoc = DocumentApp.create(name);
    //     var header = this.issueNum + " will be published on " + this.issueDate+"\n";
    //     issueNotesDoc.appendParagraph(header);
    //     issueNotesDoc.appendParagraph(content+"\n");

    //     //transform the Document into a Blob that DriveApp can work with
    //     issueNotesDoc = issueNotesDoc.getBlob();

    //     txtcontent = header + content;
    //     //Creates a file in the issueFolder of the issue notes
    //     fileIssueNotesDoc = DriveApp.issueFolder.createFile(name, txtcontent);//https://developers.google.com/apps-script/reference/drive/folder#createFile(BlobSource)


    // }

    function makeIssueNotesDoc(volume, issue, issueFolder){
        var name = issue.number+" special notes";
        var header = issue.number + " will be published on " + issue.date+"\n";
        issueNotes = volume.templates.issueNotes.makeCopy(name, issueFolder);
        issueNotes.setContent(header+"\n"+issue.info+"\n");
    }

    //add issue notes to the folder
    makeIssueNotesDoc(volume, issue, this.issueFolder);

    //Add any section specific additions to the folder
    if(this.sectionName == "sports"){
        makeSportsBlitz(volume, "Sports Blitz for "+this.issueNum, this.issueFolder, SpreadsheetApp.open(this.sectionIssueSheet));
    }

    if(this.sectionName == "news"){
        makeInshorts(volume,"Inshorts for "+this.issueNum, this.issueFolder, SpreadsheetApp.open(this.sectionIssueSheet));
    }
}