/**
 * Created by Martin Neundorfer on 20.08.2018.
 * For LABOR.digital
 */
import $globj from "./$globj";
import { forEach } from "./forEach";
if (typeof window.HELPERS_JS_STOP_BODY_SCROLLING === "undefined")
    window.HELPERS_JS_STOP_BODY_SCROLLING = false;
if (typeof window.HELPERS_JS_STOP_BODY_SCROLLING_POSITION === "undefined")
    window.HELPERS_JS_STOP_BODY_SCROLLING_POSITION = 0;
/**
 * Helper to prevent the body from being scrolled with a fix for the ios 9 safari which is a pain...
 * @param {boolean} state True to stop the scrolling, false to reenable it.
 */
export function stopBodyScrolling(state) {
    let isIos = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);
    // Stop the scrolling
    if (state === true) {
        // Ignore if already stopped
        if (window.HELPERS_JS_STOP_BODY_SCROLLING === true)
            return;
        // Mark as stopped
        window.HELPERS_JS_STOP_BODY_SCROLLING = true;
        // Calculate the body width before we hide the scrollbar
        let oldBodyWidth = $globj.body.width();
        // Disable scrolling
        if (isIos) {
            // Store old position
            window.HELPERS_JS_STOP_BODY_SCROLLING_POSITION = $globj.htmlBody.scrollTop();
            // Stop body scrolling with extra ios fix...
            $globj.htmlBody.css({ "overflow": "hidden", "position": "relative", "height": "100%", "transition": "none" });
        }
        else {
            $globj.body.css({ "overflow": "hidden", "transition": "none" });
        }
        // Calculate difference
        let bodyWidthDiff = $globj.body.width() - oldBodyWidth;
        $globj.body.css({ "padding-right": bodyWidthDiff });
        forEach($("*[data-fixed-body-scrolling-target]"), $o => {
            const type = $o.dataFallback("fixed-body-scrolling-target", "");
            switch (type) {
                case "":
                    $o.css({ "margin-left": -bodyWidthDiff });
                    break;
                case "half":
                    $o.css({ "margin-left": (-bodyWidthDiff) / 2 });
                    break;
                case "right":
                    $o.css({ "margin-right": bodyWidthDiff });
                    break;
                case "rightHalf":
                    $o.css({ "margin-right": (bodyWidthDiff) / 2 });
                    break;
            }
        });
    }
    else {
        // Ignore if already active
        if (window.HELPERS_JS_STOP_BODY_SCROLLING === false)
            return;
        // Reenable body scrolling
        if (isIos) {
            $globj.htmlBody
                .css({ "overflow": "", "padding-right": "", "transition": "", "position": "", "height": "" })
                .scrollTop(window.HELPERS_JS_STOP_BODY_SCROLLING_POSITION);
        }
        else {
            $globj.htmlBody.css({ "overflow": "", "padding-right": "", "transition": "" });
        }
        $("*[data-fixed-body-scrolling-target]").css({ "margin-left": "", "margin-right": "" });
        // Mark as stopped
        window.HELPERS_JS_STOP_BODY_SCROLLING = false;
    }
}
