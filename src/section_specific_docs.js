/**
 * Creates an inshort document based off a template and puts it in the issueFolder specified + links to
 * issue spreadsheet
 * @param  {String} issueNum          the issue number
 * @param {Sheet} newsSheet   the news spreadsheet for the given issue
 * @param  {Folder} issueFolder the issue folder the inshorts will be placed in
 * @return returns nothing
 */
function makeInshorts(issueNum, issueFolder, newsSheet){
    //makes a new Inshorts doc for the issue and puts it in the issue folder
    var inshorts = inshortTemplate.copy(issueNum+"_Inshorts", issueFolder);
    inshorts.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with the link can edit
    //write the editable link to the news spreadsheet
    newsSheet.insertRowAfter(1);
    //assumes the new row is at A2:H2
    var range = newsSheet.getRange("B2:H2");
    var editableLink = inshorts.getUrl();
    var values = ["Inshorts","NA","NA","NA","Inshort","inshort-"+volumeNumber+issueNum,editableLink,"not started"];
    // https://developers.google.com/apps-script/reference/spreadsheet/range#setValues(Object)
    range.setValues(values); //writes the values to the sheet
}

/**
 * Creates an sportsBlitz document based off a template and puts it in the issueFolder specified + links to
 * issue spreadsheet
 * @param  {String} issueNum          the issue number
 * @param {Sheet} sportsSheet   the sports spreadsheet for the given issue
 * @param  {Folder} issueFolder the issue folder the sportsblitz will be placed in
 * @return returns nothing
 */
function makeSportsBlitz(issueNum, issueFolder, sportsSheet){
    var sportsBlitz = sportsBlitzTemplate.copy(issueNum+"_SportsBlitz", issueFolder);
    sportsBlitz.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT); //anyone with the link can edit
    //write the editable link in the sports spreadsheet
    sportsSheet.insertRowAfter(1);
    //assumes the new row is at A2:H2
    var range = sportsSheet.getRange("B2:H2");
    var editableLink = sportsBlitz.getUrl();
    var values = ["SportsBlitz","NA","author_name_here","author_byline_here","SportsBlitz","sports-blitz-"+volumeNumber+issueNum,editableLink,"not started"];
    // https://developers.google.com/apps-script/reference/spreadsheet/range#setValues(Object)
    range.setValues(values); //writes the values to the sheet
}
