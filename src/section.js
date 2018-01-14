function Section(volume, sectionName){
    Logger.log("start Section");
    this.sectionName = sectionName;
    this.sectionFolder = volume.makeFolderInVolume(volume.volumeFolder, this.sectionName);

    function makeAllIssuesInSection (sectionFolder, sectionName){
        //makes a sectionIssueFolder for each issue
        var allIssueFolders = [];
      //Logger.log(volume.allIssueObjects);
        for(var i in volume.allIssueObjects){
          //Logger.log(i);
            var issue = volume.allIssueObjects[i];
            var sectionIssueFolder = new IssueFolder(sectionName, sectionFolder, issue, volume);
            //Logger.log(sectionIssueFolder);
            allIssueFolders.push(sectionIssueFolder);
        }
        return allIssueFolders;
    }

    //Logger.log("Trying to make issue folders....");

    this.allSectionIssueFolders = makeAllIssuesInSection(this.sectionFolder, this.sectionName);
    Logger.log("end Section");
}