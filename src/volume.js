//a volume has a number, a folder,
//issues, sections

function Volume(masterSpreadsheet){
    var VolumeObject = {"eicIssueFolders":null,
                        "sectionFolders":null,
                        "volumeNumber":null
     };

    var issueSheet = ss.getSheetByName("issues");
    var departmentsSheet = ss.getSheetByName("departments");
    var configSheet =  ss.getSheetByName("config");


}