//Note: Right now would need to manually add new sections below
/**
 * Makes Section Folders (for the top level directory) for each section
 * @return {List} Returns a list of Section objects which have a Folder and a Name
 */
function makeSectionFolders(){

    var sectionFolders = [];

    var sportsFolder = makeFolderInVolume(volumeFolder,"Sports");
    var sports = {"folder":sportsFolder, "name":"sports"};
    sectionFolders.push(sports);

    var artsFolder = makeFolderInVolume(volumeFolder,"Arts");
    var arts = {"folder":artsFolder, "name":"arts"};
    sectionFolders.push(arts);

    var newsFolder = makeFolderInVolume(volumeFolder,"News");
    var news = {"folder":newsFolder, "name":"news"};
    sectionFolders.push(news);

    var featuresFolder = makeFolderInVolume(volumeFolder,"Features");
    var features = {"folder":featuresFolder, "name":"features"};
    sectionFolders.push(features);

    var opinionFolder = makeFolderInVolume(volumeFolder,"Opinion");
    var opinion = {"folder":opinionFolder, "name":"opinion"};
    sectionFolders.push(opinion);

    var funFolder = makeFolderInVolume(volumeFolder,"Fun");
    var fun = {"folder": funFolder, "name":"fun"};
    sectionFolders.push(fun);

    var photoFolder = makeFolderInVolume(volumeFolder,"Photo");
    var photo = {"folder":photoFolder, "name":"photo"};
    sectionFolders.push(photo);

    var campusLifeFolder = makeFolderInVolume(volumeFolder,"Campus Life");
    var campusLife = {"folder":campusLifeFolder, "name":"Campus Life"};
    sectionFolders.push(campusLife);

    var scienceFolder = makeFolderInVolume(volumeFolder,"Science");
    var science = {"folder":scienceFolder, "name":"science"};
    sectionFolders.push(science);

    return sectionFolders;
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

    //Add any section specific additions
    if(section == "sports"){
        makeSportsBlitz("Sports Blitz for "+issueNum, sectionIssueFolder, sectionIssueSheet);
    }

    if(section == "news"){
        makeInshorts("Inshorts for "+issueNum, sectionIssueFolder, sectionIssueSheet);
    }
}


