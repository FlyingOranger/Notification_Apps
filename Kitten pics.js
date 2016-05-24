/* This Crawler checks to see if there are any new posts on r/aww, 
   with "kitten" in their title, and with a score of at least 50
   
   We save the last 4 posts we've found, because if some posts are really close in score,
   they can overtake eachother and you'll have lots of notifications of something you might 
   have seen already.
   
*/

/* If you're not familiar with the Reddit API and JSON, do these following steps:

    1) open https://www.reddit.com/r/pics.json in your web browser
    2) Copy all the scrambled text you see on screen with Ctrl-A, Ctrl-C
    3) open http://jsonprettyprint.com/ and paste the scrambled text in there

    What you see is a regular JSON response from Reddit

* In order to make coding a little easier, Flying Oranger only passes the most important information to this function
    by advancing to the JSON response's data.children field, and each child advanced to the child.data field

    Long story short, this means that `data` is an array of reddit posts.

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

    helper.first 
        - Boolean that refers to if this is the first time that this notification app has been called.
        
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
 
module.exports = {
    
    path : "/r/aww/search",
    
    queries : {       
        "q": "kitten",
        "sort": "new",
        "restrict_sr": "on",
        "t": "all"
    },
    
    settings: {
        Puppy: false,
        "Run on start": false
    },

    interval: 5,

    cb: function(data, helper){
        
        
        // change our search to puppies
        if (helper.settings.Puppy)
            module.exports.queries.q = "puppy";
        else
            module.exports.queries.q = "kitten";
        
        // Always check to see if there are any posts
        if ( data.length > 0){

            // get the last posts we have found
            var lastPosts = helper.get('last-posts');

            // if this is the first time, and we haven't found any posts, set it to an empty array
            if (lastPosts == null)
                lastPosts = [];

            // go through all the posts
            for (var post of data){

                if (post.score >= 200){

                    // Is this post's ID in last 4 posts?
                    if (lastPosts.indexOf(post.id) < 0){

                        // it is, so add it to the beginning of our array 
                        lastPosts.unshift(post.id);
                        lastPosts.length = 4; // and by making the length 4, we chop off any remaining items

                        // save lastPosts for next time
                        helper.set('last-posts', lastPosts);

                        // notify the user that there is a new kitten/puppy post over 50!
                        // but only if this isn't the first time this app is run,
                        // depending on the user's preference
                        // this avoids a bunch of notifications on startup
                        if (!post.first || helper.settings["run on start"])
                            helper.notify( helper.settings.Puppy ? "New Puppy!": "New Kitten!", post.url);
                    }

                    // make sure to exit, or else we'll call helper.more by accident
                    return;
                }
            }

            // we went through all the posts but didn't find any over 50... get some more posts
            helper.more();
        }
    }
};