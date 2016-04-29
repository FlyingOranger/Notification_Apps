module.exports = {
    
    "scope": [
        "privatemessages"
    ],
    
    "crawlers": {
        
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
                "t": "all",
                "limit": 50
                
            }
        }
    }
}
