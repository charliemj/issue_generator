/**
 * Creates the EIC-Copy level folder for a given issueNum
 * Inside the folder is a spreadsheet specific to the issueNum
 * @param  {Folder} volumeFolder   the Volume-level Folder
 * @param  {String} issueNum the issue number
 * @return returns nothing
 */
function makeMasterIssueFolder(volumeFolder, issueNum){
    issueFolder = volumeFolder.createFolder(issueNum);
    makeMasterIssueSpreadsheet(issueNum,issueFolder);
}

/**
 * Makes a folder of name folderName inside the parent directory
 * @param  {Folder} parentFolder   the parent folder
 * @param  {String} folderName the new folder's name
 * @return returns nothing
 */
function makeFolderInVolume(parentFolder, folderName){
    folderMade = parentFolder.createFolder(folderName);
}

/**
 * Makes a copy of the EIC spreadsheet, titles it appropriately, and then saves it in the issueFolder
 * @param  {String} issueNum     the issue number
 * @param  {Folder} issueFolder the issueFolder the sheet will be placed in
 * @return returns nothing
 */
function makeMasterIssueSpreadsheet(issueNum, issueFolder){
    eicIssueSpreadsheetTemplate.makeCopy(issueNum+"_eic_master_spreadsheet", issueFolder);
}