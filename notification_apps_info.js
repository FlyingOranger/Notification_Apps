/* This is the file where you declare all your functions that will check reddit, 
    and then notify you if something has happened.
*/
module.exports = {

/* Here are instructions on how to add your own!
    
    So lets say you want to know when there's a new post to your subreddit...
        and lets say your subreeddit is r/testpost
        
    So we navigate to https://www.reddit.com/r/testpost/new/
        
    Because scanning this subreddit doesn't have anything to do with our own reddit acount,
      we can ignore "scope" 
          
    Now we create our own object, and add it to the notification_apps object just below us

    new_testpost: {
        account: false  // this doesn't access our account at all 
        path: /r/testpost/new/  please place two / around the r, like /r/
    },
    
    Now you create a file in the notification_apps directory, with the same name as your app
        In this case, new_testpost.js
    
    This file is called with all the JSON data from your reddit api request.
        I highly recommend looking through an example of either oranger.js or kitten_pics.js
        for a further explaination of how to write this file.
        
    That's it, you're done!
    
    Notes: 
    
    - If our path ended with a question mark and values, like : /r/testpost/top?t=year&sort=top
        we would also add an object like
            queries: {
                t: "year",
                sort: "top"
            }
        You can see an example of this in kitten_pics
        
    - If your app needs to access your account, you need to find your URL at https://www.reddit.com/dev/api
        and then add the requried scope (that thing in the green box ) to the scope array
            For example, at https://www.reddit.com/dev/api#GET_about_log, we would need to add "modlog" to the scope
        
*/
    
    "scope": [
        "privatemessages"
    ],
    
    "notification_apps": {
        
        "oranger": {
            "account": true,
            "path": "/message/unread"
        },
        
        "kitten pics":{
            "account": false,
            "path": "/r/aww/search",
            "queries": {
                
                "q": "kitten",
                "sort": "new",
                "restrict_sr": "on",
                "t": "all"
                
            }
        },
    }
}
