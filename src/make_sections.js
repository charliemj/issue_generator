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
                    "CampusLife":campusLife,
                    "sports":sports};


    return sectionFolders;
}

//puts an issue folder in a section folder and returns the sectionIssueFolder
/**
 * [makeSectionIssueFolder description]
 * @param  {Folder} parent   [description]
 * @param  {String} dept     [description]
 * @param  {String} issueNum [description]
 * @return {Folder}          [description]
 */
function makeSectionIssueFolder(parent,dept,issueNum){
    sectionIssueFolder = parent.createFolder(issueNum);
    makeSectionSpreadsheet(issueNum, dept, sectionIssueFolder);
    makeSectionPhotoSpreadsheet(issueNum, dept, sectionIssueFolder);
    return sectionIssueFolder; //returns the issue folder
}

//Populates the section issue folders with spreadsheets
/**
 * [populateSectionIssueFolders description]
 * @param  {String} issueNum       [description]
 * @param  {Dictionary} sectionFolders [description]
 * @return {[type]}                [description]
 */
function populateSectionIssueFolders(issueNum, sectionFolders){
    genSports(issueNum, sectionFolders.sports);
    genArts(issueNum, sectionFolders.arts);
    genNews(issueNum, sectionFolders.news);
    genFeatures(issueNum, sectionFolders.features);
    genOpinion(issueNum, sectionFolders.opinion);
    genFun(issueNum, sectionFolders.fun);
    genPhoto(issueNum, sectionFolders.photo);
    genCampusLife(issueNum, sectionFolders.campusLife);
    genScience(issueNum, sectionFolders.science);
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
    sectionSpreadsheet.copy(issueNum+"_"+dept, destinationFolder);
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
}

//////////////////////////////////////////////
//////////Generates each section//////////////
//////////////////////////////////////////////

/**
 * [genSports description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genSports(issueNum, parent){
    var dept = "sports";
    sectionIssueFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeSportsBlitz("Sports Blitz for "+issueNum, sectionIssueFolder);
    //TODO: connect Sports Blitz with the spreadsheet
}

/**
 * [genArts description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genArts(issueNum, parent){
    var dept = "arts";
    makeSectionIssueFolder(parent,dept,issueNum);
    //arts spreadsheet might be good to note any embargo
}

/**
 * [genNews description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genNews(issueNum, parent){
    var dept = "news";
    madeFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeInshorts("Inshorts for "+issueNum, madeFolder);
    //TODO: connect inshorts with the spreadsheet
}

/**
 * [genScience description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genScience(issueNum, parent){
    var dept = "science";
    makeSectionIssueFolder(parent,dept,issueNum);
}

/**
 * [genCampusLife description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genCampusLife(issueNum, parent){
    var dept = "campus_life";
    makeSectionIssueFolder(parent,dept,issueNum);
}

/**
 * [genOpinion description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genOpinion(issueNum, parent){
    var dept = "opinion";
    makeSectionIssueFolder(parent,dept,issueNum);
}

/**
 * [genPhoto description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genPhoto(issueNum, parent){
    var dept = "photo";
    makeSectionIssueFolder(parent,dept,issueNum);
}

/**
 * [genFun description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genFun(issueNum, parent){
    var dept = "fun";
    makeSectionIssueFolder(parent,dept,issueNum);
}

/**
 * [genFeatures description]
 * @param  {String} issueNum [description]
 * @param  {Folder} parent   [description]
 * @return {[type]}          [description]
 */
function genFeatures(issueNum, parent){
    var dept = "features";
    makeSectionIssueFolder(parent,dept,issueNum);
}


