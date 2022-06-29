var labelName = "YourCustomGmailLabel";

function CustomEmailForwarder(){
    initLabels();
    var threads = getThreads();
    getEmailData(threads);
    
    removeThreadsFromLabel(threads);
}

//Grabs All Emails With Custom Label
function getThreads(){
    return getGmailLabel().getThreads();
}

function getMessages(threads){
    return GmailApp.getMessagesForThreads(threads);
}

//Pulls Subject & Attachment From Each Individual Email In Thread
function getEmailData(threads){
    var messages = getMessages(threads);
    for (var i = 0 ; i < messages.length; i++) {
        for (var j = 0; j < messages[i].length; j++) {
            var attachments = messages[i][j].getAttachments();
            //Forwards Email With Subject / Attachment            
            for (var k = 0; k < attachments.length; k++) {
              sendNewEmail(messages[i][j].getSubject(), attachments[k])
              Logger.log('Message "%s" contains the attachment "%s" (%s bytes)',
              messages[i][j].getSubject(), attachments[k].getName(), attachments[k].getSize());
            }
        }
    }
}

//Removes Labels From Current Gmail Thread
function removeThreadsFromLabel(threads){
    getGmailLabel().removeFromThreads(threads);
}

function sendNewEmail(subject, blob){
  return MailApp.sendEmail('YourEmail', subject, '', {attachments: [blob]});
}

function getGmailLabel(){
    return GmailApp.getUserLabelByName(labelName);
}

function initLabels(){
    var label = null;

    try{
        label = getGmailLabel();
    }
    catch(e){
        Logger.log(e.getCause());
    }

    if(!label){
        GmailApp.createLabel(labelName);
    }
}

