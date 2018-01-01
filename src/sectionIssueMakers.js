/**
 * Puts an issueFolder into a sectionFolder and returns the Section's issueFolder
 * @param  {Folder} sectionFolder  the top level section Folder
 * @param  {String} section     the section
 * @param  {String} issueNum the issue number
 * @param {String} issueInfo any additional info about the issue
 * @return {Dictionary} issueFolderObject a dict of the issueFolder Folder and the associated Sheet objects
 */
function makeSectionIssueFolder(sectionFolder, section, issueNum, issueInfo){
    sectionIssueFolder = sectionFolder.createFolder(issueNum);
    sectionSheet = makeSectionIssueSpreadsheet(issueNum, dept, sectionIssueFolder);
    issueNotes = makeIssueNotesDoc(issueInfo, issueNum, sectionIssueFolder);
    photoSheet = makeSectionPhotoSpreadsheet(issueNum, dept, sectionIssueFolder);

    var issueFolderObject = {"issueFolder":sectionIssueFolder,
                        "sectionSheet":sectionSheet,
                        "issueNotes":issueNotes,
                        "photoSheet":photoSheet
                    };
    return issueFolderObject; //returns the issue folder
}


/**
 * Populates the section issue folders with spreadsheets
 * @param  {String} issueNum   the issue number
 * @return  does not return anything
 */
function populateSectionIssueFolders(issueNum){
   for(var i = 0; i < sectionFolders.length; i++){
        var section = sectionFolders[i].name;
        //TODO  sectionFolders[i].issueInfo problem
        makeSection(issueNum, parentFolder, sectionFolders[i].issueInfo, section);
    }
}

/**
 * Creates the content spreadsheet for a particular section's issue folder
 * @param  {String} issueNum     the issue number
 * @param  {String} section      the section
 * @param  {Folder} issueFolder  the issue folder the Sheet will be placed in
 * @return {Sheet} returns the sectionSheet
 */
function makeSectionIssueSpreadsheet(issueNum, section, issueFolder){
    sectionSheet = sectionSpreadsheet.copy(issueNum+"_"+section, issueFolder);
    sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
    return sectionSheet;
}

/**
 * Creates the photo spreadsheet for a particular section's issue folder
 * @param  {String} issueNum     the issue number
 * @param  {String} section      the section
 * @param  {Folder} issueFolder  the issue folder the Sheet will be placed in
 * @return {Sheet} returns the photoSheet
 */
function makeSectionPhotoSpreadsheet(issueNum, section, issueFolder){
    sectionPhotoSpreadsheet.copy(issueNum+"_"+section, issueFolder);
    sectionPhotoSpreadsheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with link can edit
}

/**
 * Creates a Google Doc with any special notes about the issue, stores the Doc
 * in the Issue folder
 * @param {String} content the text content describing any special things about the issue
 * @param  {String} issueNum   the issue number
 * @param  {Folder} issueFolder the issue folder the new Doc will be stored in
 * @return returns nothing
 */
function makeIssueNotesDoc(content, issueNum, issueFolder){
    //takes the issue notes as input and creates a doc titled
    //"issueNum Issue Notes" and puts it in the folder
    var name = issueNum+" special notes";
    issueNotesDoc = DocumentApp.create(name);
    issueNotesDoc.appendParagraph(content);

    //transform the Document into a Blob that DriveApp can work with
    //Creates a file in the issueFolder of the issue notes
    fileIssueNotesDoc = DriveApp.issueFolder.createFile(issueNotesDoc);
}