/**
 * Created by Martin Neundorfer on 30.08.2018.
 * For LABOR.digital
 */
/**
 * True if the browser can reach the internet, false if not
 */
let onlineState = false;
/**
 * The timestamp of the last time this script ran
 */
let lastCheck = 0;
/**
 * Checks if the client is currently online or not
 */
export function checkOnlineState() {
    return new Promise(resolve => {
        if (lastCheck > (Date.now() - (60 * 10 * 1000))) {
            resolve(onlineState);
            return;
        }
        $.ajax("http://laboranten.net/_extern/labor-javascript-online-check/", {
            method: "GET",
            timeout: 500,
            cache: false
        }).done(() => {
            lastCheck = Date.now();
            onlineState = true;
            resolve(true);
        }).fail(() => {
            lastCheck = 0;
            onlineState = false;
            resolve(false);
        });
    });
}
