function makeSections(){
    //MAKE SECTIONS
    //makeFolderInVolume(parent, folderName) and genSports(issueNum, parent)
    var sports = makeFolderInVolume(volumeFolder,"Sports");
    genSports(issueNum, sports);
    var arts = makeFolderInVolume(volumeFolder,"Arts");
    genArts(issueNum, arts);
    var news = makeFolderInVolume(volumeFolder,"News");
    genNews(issueNum, news);
    var features = makeFolderInVolume(volumeFolder,"Features");
    genFeatures(issueNum, features);
    var opinion = makeFolderInVolume(volumeFolder,"Opinion");
    genOpinion(issueNum, opinion);
    var fun = makeFolderInVolume(volumeFolder,"Fun");
    genFun(issueNum, fun);
    var photo = makeFolderInVolume(volumeFolder,"Photo");
    genPhoto(issueNum, photo);
    var campusLife = makeFolderInVolume(volumeFolder,"Campus Life");
    genCampusLife(issueNum, campusLife);
    var science = makeFolderInVolume(volumeFolder,"Science");
    genScience(issueNum, science);
}

function makeSectionIssueFolder(parent,dept,issueNum){
    folderMade = parent.createFolder(issueNum);
    makeSectionSpreadsheet(issueNum,dept,folderMade);
}

function makeSectionSpreadsheet(issueNum, dept, destinationFolder){
    sectionSpreadsheet.copy(issueNum+"_"+dept, destinationFolder);
}


//all of these need to be linked back to the Master Spreadsheet for the given issue
//whenever a spreadsheet is updated in the below categories, the master spreadsheet should
//be updated. Basically insert a row below section head?
function genSports(issueNum, parent){
    var dept = "sports";
    madeFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeSportsBlitz("Sports Blitz for "+issueNum, madeFolder);
    //TODO: connect Sports Blitz with the spreadsheet
}

function genArts(issueNum, parent){
    var dept = "arts";
    makeSectionIssueFolder(parent,dept,issueNum);
    //arts spreadsheet might be good to note any embargo
}

function genNews(issueNum, parent){
    var dept = "news";
    madeFolder = makeSectionIssueFolder(parent,dept,issueNum);
    makeInshorts("Inshorts for "+issueNum, madeFolder);
    //TODO: connect inshorts with the spreadsheet
}

function genScience(issueNum, parent){
    var dept = "science";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genCampusLife(issueNum, parent){
    var dept = "campus_life";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genOpinion(issueNum, parent){
    var dept = "opinion";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genPhoto(issueNum, parent){
    var dept = "photo";
    makeSectionIssueFolder(parent,dept,issueNum);
}

function genFun(issueNum, parent){
    var dept = "fun";
    makeSectionIssueFolder(parent,dept,issueNum);
}
function genFeatures(issueNum, parent){
    var dept = "features";
    makeSectionIssueFolder(parent,dept,issueNum);
}
