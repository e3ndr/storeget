var CORS_PROXY = "https://cors-anywhere.herokuapp.com/";
var DOWNLOAD_PROXY = "https://yacdn.org/proxy/";

async function downloadAll(links) {
    getAnchors(links).then((anchors) => {
        Array.from(anchors).forEach((anchor) => {
            anchor.style = "display: none;";
			anchor.href = DOWNLOAD_PROXY + anchor.href;

            document.body.appendChild(anchor);

            anchor.click();
            anchor.remove();
        });
    });
}

async function getAnchors(links) {
    var anchors = [];

    for (var link of Object.entries(links)) {
        anchors.push(await getAnchor(link));
    }

    return anchors;
}

async function getAnchor(link) {
    return new Promise((resolve) => {
        var name = link[0];
        var url = link[1];
        var anchor = document.createElement("a");

        anchor.setAttribute("download", name);
        anchor.innerText = name;
        anchor.href = url;

        resolve(anchor);
    });
}

async function getLinks(url, platform = "x86") {
    return new Promise((resolve) => {
        var request = "type=url&ring=RP&lang=en-US&url=" + url;

        httpPost(CORS_PROXY + "https://store.rg-adguard.net/api/GetFiles", request).then((text) => {
            var links = {};

            if (!text.includes("an empty list")) {
                var html = document.createElement("html");

                html.innerHTML = text;

                Array.from(html.getElementsByTagName("a")).forEach((element) => {
                    var name = element.innerText;
                    var href = element.href;

                    if (name.endsWith(".appx") && name.includes("_" + platform + "_")) {
                        links[name] = href;
                    }
                });
            }

            resolve(links);
        });
    });
}

function isSupported() {
    return Boolean(fetch) && Boolean(Promise);
}

async function httpPost(url, body, type = "application/x-www-form-urlencoded") {
    return new Promise((resolve) => {
        const headers = {
            "Content-Type": type
        };

        const options = {
            method: "POST",
            body: body,
            headers: new Headers(headers),
        };

        fetch(url, options).then((response) => {
            response.text().then((text) => {
                resolve(text);
            });
        });
    });
}
