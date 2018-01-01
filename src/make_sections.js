//Makes Section Folders (for the top level directory)
//Returns a dictionary mapping section name strings to their Folder objects
//Right now would need to manually add new sections
/**
 * [makeSectionFolders description]
 * @return {[type]} [description]
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

//puts an issue folder in a section folder and returns the sectionIssueFolder
/**
 * [makeSectionIssueFolder description]
 * @param  {Folder} sectionFolder   [description]
 * @param  {String} dept     [description]
 * @param  {String} issueNum [description]
 * @param {String} issueInfo [description]
 * @return {Folder}          [description]
 */
function makeSectionIssueFolder(sectionFolder,dept,issueNum, issueInfo){
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
 * @param  {String} issueNum     [description]
 * @param  {Folder} volumeFolder [description]
 * @param  {String} section      [description]
 * @return {[type]}              [description]
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
 * @param  {String} issueNum       the issue number
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
 * [makeIssueNotesDoc description]
 * @param  {String} issueNum          [description]
 * @param  {Folder} destinationFolder [description]
 * @return {[type]} [description]
 */
function makeIssueNotesDoc(content, issueNum, destinationFolder){
    //takes the issue notes as input and creates a doc titled
    //"issueNum Issue Notes" and puts it in the folder
    var name = issueNum+" special notes";
    issueNotesDoc = DocumentApp.create(name);
    issueNotesDoc.appendParagraph(content);

    //transform the Document into a Blob that DriveApp can work with
    fileIssueNotesDoc = DriveApp.destinationFolder.createFile(issueNotesDoc);
}

//creates the content spreadsheet for a particular section's issue folder
/**
 * [makeSectionSpreadsheet description]
 * @param  {String} issueNum          [description]
 * @param  {String} dept              [description]
 * @param  {Folder} destinationFolder [description]
 * @return {[type]}                   [description]
 */
function makeSectionSpreadsheet(issueNum, dept, destinationFolder){
    sectionSheet = sectionSpreadsheet.copy(issueNum+"_"+dept, destinationFolder);
    sectionSheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    return sectionSheet;
}

//creates the photo spreadsheet for a particular section's issue folder
/**
 * [makeSectionPhotoSpreadsheet description]
 * @param  {String} issueNum          [description]
 * @param  {String} dept              [description]
 * @param  {Folder} destinationFolder [description]
 * @return {[type]}                   [description]
 */
function makeSectionPhotoSpreadsheet(issueNum, dept, destinationFolder){
    sectionPhotoSpreadsheet.copy(issueNum+"_"+dept, destinationFolder);
    sectionPhotoSpreadsheet.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
}

//////////////////////////////////////////////
//////////Generates each section//////////////
//////////////////////////////////////////////




