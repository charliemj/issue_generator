function Section(volume, sectionName){
    this.sectionName = sectionName;
    this.sectionFolder = volume.makeFolderInVolume(volume.volumeFolder, this.sectionName);

    var makeAllIssuesInSection = function(){
        //makes a sectionIssueFolder for each issue
        var allIssueFolders = [];
        for(var i in allIssueObjects){
            var issue = allIssueObjects[i];
            var sectionIssueFolder = new issueFolder(this, issue);
            allIssueFolders.push(sectionIssueFolder);
        }
        return allIssueFolders;
    };

    this.allSectionIssueFolders = makeAllIssuesInSection();
}