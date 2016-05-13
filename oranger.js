/* This app notifies you if you have any new unread messages,
    which is anytime you log into Reddit and see an orange envelope
    waiting for you.
*/

module.exports = function( data, helper){

/* If you're not familiar with the Reddit API and JSON, do these following steps:

    1) open https://www.reddit.com/r/pics.json in your web browser
    2) Copy all the scrambled text you see on screen with Ctrl-A, Ctrl-C
    3) open http://jsonprettyprint.com/ and paste the scrambled text in there

    What you see is a regular JSON response from Reddit

* In order to make coding a little easier, Flying Oranger only passes the most important information to this function
    by advancing to the JSON response's data.children field, and each child advanced to the child.data field

    Long story short, this means that data is an array of reddit posts.

* So if you accessed the first post, at say data[0], it would look like this:
{
    id:         a unique id just for this post,
    score:      reddit's score for this post,
    is_self:    true / false,
    title:      the title of this post,
    url:        link of this post

    there are more as well, just do the beginning instructinos to find what information there is
}

* Also to make coding easier, this function is provided with a helper object

    helper.set( dataName, dataToSave )
        - Saves dataToSave inbetween requests, with the specified dataName

    helper.get( dataName )
        - Returns the dataToSave inbetween requests from the specified dataName

    helper.more() 
        - Calls your function again, but with 100 more posts

    helper.notify( Title, Link )
        - Makes the orange envelope fly across your screen! 
            - Title is what is shown in flying banner along with notification in task bar
            - Link is what is your browser opens to when the user clicks on the notification
                - If link is empty, then only the banner flies and no notification is put in the task tray
                - If the link matches another link already in the task tray, 
                    then the banner is flown but not added to the tray (avoid duplicates)
*/   


    // always make sure we have posts
    if (data.length > 0){
        
        // get the latest message, which is the first item in our array
        var latestMessage = data[0];
        
        // get the last message we've seen, which we saved with our helper
        var lastName = helper.get('last_name');
        
        // Is the latest message the last message we've seen?
        if (latestMessage.id !== lastName){
            
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
};