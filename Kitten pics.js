/* This Crawler checks to see if there are any new posts on r/aww, 
   with "kitten" in their title, and with a score of at least 50
   
   We save the last 4 posts we've found, because if some posts are really close in score,
   they can overtake eachother and you'll have lots of notifications of something you might 
   have seen already.
   
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
        Puppy: false
    },

    interval: 60,

    cb: function(data, helper){
        
        // change our search to puppies
        if (helper.settings.Puppy && module.exports.queries.q === "kitten"){
            module.exports.queries.q = "puppy";
            return;
        }
        else if (!helper.settings.Puppy && module.exports.queries.q === "puppy"){
            module.exports.queries.q = "kitten";
            return;
        }
        
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
                        // if it's the first time, don't fly a banner because it's slightly annoying
                        helper.notify( helper.settings.Puppy ? "New Puppy!": "New Kitten!", post.url, !helper.first);
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