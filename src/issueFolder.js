function IssueFolder (Section, issue, volume){
    this.issue = issue;
    this.issueNum = issue.number;
    this.issueDate = issue.date;
    this.issueInfo = issue.info;
    this.sectionName = Section.sectionName;
    this.Section = Section;

    function makeIssueFolder(){
        return this.Section.sectionFolder.createFolder(this.issueNum);
    }

    this.issueFolder = makeIssueFolder();

    function makeIssueSheet(issueNum,sectionName,issueFolder){

        sectionSheet = sectionSpreadsheet.copy(issueNum+"_"+sectionName, issueFolder);
        sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit

        //updates the Volumes allSheetsByIssue dict with this sections issueNum sheet
        volume.allSheetsByIssue.issueNum.push([sectionSheet,sectionName]);

        return sectionSheet;
    }

    function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){
        sectionPhotoSpreadsheet.copy(issueNum+"_"+section, issueFolder);
        sectionPhotoSpreadsheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
        return sectionPhotoSpreadsheet;
    }

    //make spreadsheets and put them in the issue folder
    this.sectionIssueSheet = makeIssueSheet(this.issueNum, this.sectionName, this.issueFolder);
    this.makeSectionPhotoSpreadsheet = makeSectionPhotoSpreadsheet(this.issueNum, this.sectionName, this.issueFolder);

    function makeIssueNotesDoc(content, issueNum, issueFolder){
        //takes the issue notes as input and creates a doc titled
        //"issueNum Issue Notes" and puts it in the folder
        var name = issueNum+" special notes";
        issueNotesDoc = DocumentApp.create(name);
        var header = this.issueNum + " will be publised on " + this.issueDate+"\n";
        issueNotesDoc.appendParagraph(header);
        issueNotesDoc.appendParagraph(content+"\n");

        //transform the Document into a Blob that DriveApp can work with
        //Creates a file in the issueFolder of the issue notes
        fileIssueNotesDoc = DriveApp.issueFolder.createFile(issueNotesDoc);
    }

    //add issue notes to the folder
    makeIssueNotesDoc(this.issueInfo,this.issueNum, this.issueFolder);

    //Add any section specific additions to the folder
    if(this.sectionName == "sports"){
        makeSportsBlitz("Sports Blitz for "+this.issueNum, this.issueFolder, this.sectionIssueSheet);
    }

    if(this.sectionName == "news"){
        makeInshorts("Inshorts for "+this.issueNum, this.issueFolder, this.sectionIssueSheet);
    }
}