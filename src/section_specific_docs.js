/**
 * [makeInshorts description]
 * @param  {[type]} issueNum          [description]
 * @param  {[type]} destinationFolder [description]
 * @return {[type]}                   [description]
 */
function makeInshorts(issueNum, destinationFolder, newsSheet){
    //makes a new Inshorts doc for the issue and puts it in the issue folder
    var inshorts = inshortTemplate.copy(issueNum+"_Inshorts", destinationFolder);
    inshorts.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    //write the editable link to the news spreadsheet
    newsSheet.insertRowAfter(1);
    //assumes the new row is at A2:H2
    var range = newsSheet.getRange("B2:H2");
    var editableLink = inshorts.getUrl();
    var values = ["Inshorts","NA","NA","NA","Inshort","inshort"+volumeNumber+issueNum,editableLink,"not started"];
   // https://developers.google.com/apps-script/reference/spreadsheet/range#setValues(Object)

}

/**
 * [makeSportsBlitz description]
 * @param  {[type]} issueNum          [description]
 * @param  {[type]} destinationFolder [description]
 * @return {[type]}                   [description]
 */
function makeSportsBlitz(issueNum, destinationFolder, sportsSheet){
    sportsBlitz = sportsBlitzTemplate.copy(issueNum+"_SportsBlitz", destinationFolder);
    sportsBlitz.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
    //write the editable link in the sports spreadsheet

}
