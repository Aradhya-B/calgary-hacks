export async function keywordToWikipediaMap(keywords) {
    var extractResponse;
    var res = {};
    var url =  "https://en.wikipedia.org/w/api.php?origin=*&format=json&exintro&explaintext";
    var linksUrl = "https://en.wikipedia.org/w/api.php?origin=*&action=opensearch&profile=engine_autoselect&limit=5&format=json";   
    var params = {
        action: "query",
        prop: "extracts", // specifies we want article extract
        exsentences: "5", // number of sentences in the extract returned, can change this to be characters instead
        redirects: "1" // soft matching of title name
    };

    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    for (var i = 0; i < keywords.length; ++i) {
        var currUrl = url.slice();
        var currLinks = linksUrl.slice();

        currUrl = currUrl + "&" + "titles=" + keywords[i];
        currLinks = currLinks + "&" + "search=" + keywords[i];
        
        var page = await getJson(currUrl);
        page = page["query"]["pages"];
        var extract;
        for (var key in page) {
            if (page.hasOwnProperty(key)) {
                extract = page[key]["extract"];
            }
        }

        var links = await getJson(currLinks);
        if (typeof extract !== 'undefined') {
            res[keywords[i]] = [extract, links[3]];
        }
    }
    return res;
}

async function getJson(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data;
}