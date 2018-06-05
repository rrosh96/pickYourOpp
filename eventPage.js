
var contextMenuItem = {
    "id": "spendMoney",
    "title": "SpendMoney",
    "contexts":["selection"]
};

//
// Create a context menu item with the above details - 
// id-  is important for comparison to know whether user has clicked on out extn
// contexts - lots of contexts are available. here we are using the text selection context
// 
chrome.contextMenus.create(contextMenuItem);

// funciton to check whether given text is an integer.
function isInt(value){
    return !isNaN(value) &&
            parseInt(Number(value)) == value &&
            !isNaN(parseInt(value,10));
}

//
// Add a Listener to the click event for our extension in the Context menu.
//
chrome.contextMenus.onClicked.addListener(function(clickData){
    if(clickData.menuItemId === "spendMoney" && clickData.selectionText){
        if(isInt(clickData.selectionText)){
            chrome.storage.sync.get(['total', 'limit'], function(budget){
                var newTotal = 0;
                if(budget.total){
                    newTotal += parseInt(budget.total);
                }

                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({'total': newTotal}, function(){
                    if(newTotal >= budget.limit){
                        var notifOptions = {
                            type : "basic",
                            iconUrl : "icon48.png",
                            title: "Limit Reached",
                            message : "Hey! You have reached your expenditure limit"
                        }
                        chrome.notifications.create('limitReached', notifOptions);
                    }
                })

            })

        }else {
            // Setting a random error code - for debug.
            chrome.storage.sync.set({'total': 499});
        }
    }else {
        // setting a random error code - for debug.
        chrome.storage.sync.set({'total': 399});
    }
    
});
//
// Whenever the Total Changes update the badge in the icon
//
chrome.storage.onChanged.addListener(function(changes, storageName){
    //
    // Create a badge for our extension
    //
    chrome.browserAction.setBadgeText({"text": changes.total.newValue.toString()});
})