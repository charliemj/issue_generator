//given a google spreadsheet of issue dates, generates folders and appropriate docs for each issue in a given drive
//each folder should have permissions as specified in a "Permissions" google sheet
//each issue folder will be named N_issueNumber_ and have a spreadsheet of the same title inside
//there will also be a schedule and inshort google doc
//there will be fields for article title, author, byline, word count, and editing status
//depending on editing status, emails will be sent to section editors, writers, Copy, EIC, prod

//WOOT:can make template sheets in top level drive, when copied, scripts are preserved.


//Given a Google Drive Account
//A spreadsheet in the top level directory will contain info about issue numbers, dates, and special notes
//A script attached to this master spreadsheet will generate a folder for each issue.
    //Inside each folder there will be a master spread sheet for content for the issue
//Inside the top level dir, there will be a folder for each Content Dept
    //Inside each of these folders will be a folder for each issue
        //Inside each of these folders will be a spreadsheet for that department
        //The spreadsheet will have fields like author, byline, link, and editing status
        //The spreadsheets will contain logic (or the topmost level spreadsheet will have logic that)
        //Enables email reminders to be sent based on edit status (and whether a link has been provided...)
        //If there are recurring docs like sports blitz and inshorts, these docs should be created
        //and linked to in the issue folder. Would be cool if these were templated and had useful
        //reference links at the top of the doc