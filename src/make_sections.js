//Right now would need to manually add new sections below
/**
 * Makes Section Folders (for the top level directory) for each section
 * @return {Dictionary} Returns a dictionary mapping section name strings to their Folder objects
 */
function makeSectionFolders(){
    var sports = makeFolderInVolume(volumeFolder,"Sports");
    var arts = makeFolderInVolume(volumeFolder,"Arts");
    var news = makeFolderInVolume(volumeFolder,"News");
    var features = makeFolderInVolume(volumeFolder,"Features");
    var opinion = makeFolderInVolume(volumeFolder,"Opinion");
    var fun = makeFolderInVolume(volumeFolder,"Fun");
    var photo = makeFolderInVolume(volumeFolder,"Photo");
    var campusLife = makeFolderInVolume(volumeFolder,"Campus Life");
    var science = makeFolderInVolume(volumeFolder,"Science");

    sectionFolders = {"science":science,
                        "news":news,
                        "arts":arts,
                        "features":features,
                        "opinion":opinion,
                        "fun":fun,
                        "photo":photo,
                        "campusLife":campusLife,
                        "sports":sports};

    return sectionFolders;
}

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
    sectionSheet = makeSectionSpreadsheet(issueNum, dept, sectionIssueFolder);
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
 * Creates a section Folder for each section in the Volume directory
 * The Folder is populated by methods within this method to include
 * A spreadsheet and any accompanying documents/sheets
 * @param  {String} issueNum     the issue number
 * @param  {Folder} volumeFolder the volume Folder
 * @param  {String} section      the section
 * @return returns nothing
 */
function makeSection(issueNum, volumeFolder, section){

    sectionIssueFolderObject = makeSectionIssueFolder(volumeFolder,section,issueNum);

    sectionIssueFolder = sectionIssueFolderObject.issueFolder;
    sectionIssueSheet = sectionIssueFolderObject.sectionSheet;

    if(section == "sports"){
        makeSportsBlitz("Sports Blitz for "+issueNum, sectionIssueFolder, sectionIssueSheet);
    }

    if(section == "news"){
        makeInshorts("Inshorts for "+issueNum, madeFolder, sectionIssueSheet);
    }
}


/**
 * Populates the section issue folders with spreadsheets
 * @param  {String} issueNum   the issue number
 * @param  {Dictionary} sectionFolders section names mapped to Section Folders
 * @return  does not return anything
 */
function populateSectionIssueFolders(issueNum, sectionFolders){
   for(var i = 0; i < sectionFolders.length; i++){
        var section = sectionFolders[i];
        makeSection(issueNum, parentFolder, sectionFolders[i].issueInfo, section);
    }
}

/**
 * Creates a Google Doc with any special notes about the issue, stores the Doc
 * In the Issue folder
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
    fileIssueNotesDoc = DriveApp.issueFolder.createFile(issueNotesDoc);
}

/**
 * Creates the content spreadsheet for a particular section's issue folder
 * @param  {String} issueNum     the issue number
 * @param  {String} section      the section
 * @param  {Folder} issueFolder  the issue folder the Sheet will be placed in
 * @return {Sheet} returns the sectionSheet
 */
function makeSectionSpreadsheet(issueNum, sectiond, issueFolder){
    sectionSheet = sectionSpreadsheet.copy(issueNum+"_"+section, issueFolder);
    sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
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
    sectionPhotoSpreadsheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
}

