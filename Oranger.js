/* This app notifies you if you have any new unread messages,
    which is anytime you log into Reddit and see an orange envelope
    waiting for you.
*/

module.exports = {
    
    scope: "privatemessages",
    path: "/message/unread",
    interval: 10,
    
    cb: function(data, helper){
        
        // always make sure we have posts
        if (data.length > 0){

            // get the latest message, which is the first item in our array
            var latestMessage = data[0];

            // get the last message we've seen, which we saved with our helper
            var lastName = helper.get('last_name');

            // Is the latest message the last message we've seen?
            // also, if we've already seen this message but we're running on startup,
            // let the user know that they have a message again.
            if (latestMessage.id !== lastName || helper.first){

                // houston, we have a new messsage. Save it's ID for later
                helper.set('last_name', latestMessage.id);

                // create the title for our banner
                var title;
                if (latestMessage.subject === "post reply") 
                    title = "Post Reply!";

                else if (latestMessage.subject === "comment reply")
                    title = "Comment Reply!";

                else title = "New Message!";

                // send the notification flying across the screen! 
                // Note: if we already have a notification sitting in the tray
                // with this link, it will fly the banner but not add to the tray
                helper.notify(title, "https://www.reddit.com/message/unread/");

            }
        }
    }
};